const statuses = require("libs/statuses");

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
flSpore.status = statuses.sporefire;
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
flCoalfrag.status = statuses.hellfire;
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