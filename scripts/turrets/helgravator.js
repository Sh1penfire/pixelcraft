const hellfireFX = new Effect(20, e => {
Draw.color(Color.orange, Color.red, e.fin());
Fill.circle(e.x, e.y, e.fslope() * 4);
Fill.circle(e.x, e.y, e.fout() * 2);
Draw.color(Color.orange, Color.red, e.fin());
Lines.stroke(e.fslope() * 2);
Lines.circle(e.x, e.y, e.fin() * 6);
Draw.color(Color.white, Color.orange, e.fin());
Lines.stroke(e.fin() * 2); 
});

const sporefireFx = new Effect(20, e => {
Draw.color(Color.blue, Color.purple, e.fin());
Fill.circle(e.x, e.y, e.fslope() * 4);
Fill.circle(e.x, e.y, e.fout() * 2);
Draw.color(Color.purple, Color.white, e.fin());
Lines.stroke(e.fslope() * 2);
Lines.circle(e.x, e.y, e.fin() * 6);
Draw.color(Color.white, Color.purple, e.fin());
Lines.stroke(e.fin() * 2); 
});


const firehitFx = new Effect(20, e => {
  Draw.color(Pal.lightPyraFlame, Color.orange, Pal.darkPyraFlame, e.fin());
  Angles.randLenVectors(e.id, 10, e.finpow() * 60, e.rotation, 10, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 2);
  })
});

const sporeShoot = new Effect(20, e => {
  Draw.color(Pal.spore, Color.purple, Color.white , e.fin());
  Angles.randLenVectors(e.id, 10, e.finpow() * 100, e.rotation, 24, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 2);
  })
});

const firelandFx = new Effect(20, e => {
  Draw.color(Pal.lightPyraFlame, Color.orange, Pal.darkPyraFlame, e.fin());
  Angles.randLenVectors(e.id, 3, e.finpow() * 5, e.rotation, 3, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 0.4);
  })
});

const hellfire = extendContent(StatusEffect, "hellfire", {});

hellfire.speedMultiplier = 0.8;
hellfire.armorMultiplier = 0.75;
hellfire.damage = 1;
hellfire.effect = hellfireFX;
hellfire.color = Color.white;

const sporefire = extendContent(StatusEffect, "sporefire", {});

sporefire.speedMultiplier = 0.6;
sporefire.armorMultiplier = 0.75;
sporefire.damage = 0.1;
sporefire.effect = sporefireFx;
sporefire.color = Color.white;

const flCoalfrag = extend(LiquidBulletType, {});
const flCoal = extend(BasicBulletType, {});
flCoal.speed = 20;
flCoal.damage = 60;
flCoal.hitSize = 6;
flCoal.width = 1;
flCoal.height = 1;
flCoal.inaccuracy = 15;
flCoal.lifetime = 5;
flCoal.knockback = 0;
flCoal.shootSound = Sounds.flame2;
flCoal.shootEffect = firehitFx;
flCoal.despawnEffect = Fx.none;
flCoal.hitEffect = Fx.none;
flCoal.trailEffect = Fx.none;
flCoal.collides = true;
flCoal.collidesTiles = true;
flCoal.colidesAir = true;
flCoal.ammoMultiplier = 10;
flCoal.pierce = true;
flCoal.incendAmount = 1;
flCoal.fragBullets = 2;
flCoal.fragBullet = flCoalfrag;

const flSpore = extend(BasicBulletType, {});
flSpore.speed = 5;
flSpore.damage = 4;
flSpore.hitSize = 6;
flSpore.width = 0;
flSpore.height = 0;
flSpore.inaccuracy = 15;
flSpore.lifetime = 20;
flSpore.knockback = 0;
flSpore.shootSound = Sounds.flame2;
flSpore.shootEffect = sporeShoot;
flSpore.despawnEffect = Fx.none;
flSpore.hitEffect = Fx.none;
flSpore.status = sporefire;
flSpore.trailEffect = Fx.none;
flSpore.collides = true;
flSpore.collidesTiles = true;
flSpore.colidesAir = true;
flSpore.ammoMultiplier = 10;
flSpore.pierce = true;
flSpore.pierceBuilding = true;

flCoalfrag.liquid = Liquids.oil;
flCoalfrag.speed = 4;
flCoalfrag.damage = 5;
flCoalfrag.width = 5;
flCoalfrag.height = 5;
flCoalfrag.lifetime = 1;
flCoalfrag.knockback = 0;
flCoalfrag.despawnEffect = Fx.none;
flCoalfrag.hitEffect = firelandFx;
flCoalfrag.status = hellfire;
flCoalfrag.fragBullet = Bullets.standardCopper;
//this will make the bullet always spawn a puddle even if it dosn't hit it's target.
const helgravator = extendContent(ItemTurret, "flamethrower3",{
  init(){
    this.super$init();
  },
  icons(){
    return [
      Core.atlas.find("block-3"),
      Core.atlas.find("pixelcraft-flamethrower3")
    ];
  }
});
helgravator.innacuracy = 24;
helgravator.shots = 5;
helgravator.shootSound = Sounds.flame2;
helgravator.ammo(Vars.content.getByName(ContentType.item,"coal"), flCoal,Vars.content.getByName(ContentType.item,"spore-pod"), flSpore)
//Thanks for the help with effects Puppycat :)