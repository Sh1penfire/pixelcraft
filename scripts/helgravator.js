const firehitFx = new Effect(10, e => {
  Draw.color(Pal.lightPyraFlame, Color.orange, Pal.darkPyraFlame, e.fin());
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
hellfire.effect = Fx.none;
hellfire.color = Color.white;

const flCoalfrag = extend(LiquidBulletType, {});
const flCoal = extend(BasicBulletType, {});
flCoal.speed = 20;
flCoal.damage = 45;
flCoal.hitSize = 10;
flCoal.width = 1;
flCoal.height = 1;
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
flCoal.fragBullets = 3;
flCoal.fragBullet = flCoalfrag;

flCoalfrag.liquid = Liquids.oil;
flCoalfrag.speed = 4;
flCoalfrag.damage = 5;
flCoalfrag.width = 5;
flCoalfrag.height = 5;
flCoalfrag.lifetime = 1;
flCoalfrag.knockback = 0;
flCoalfrag.puddleSize = 100;
flCoalfrag.despawnEffect = Fx.none;
flCoalfrag.hitEffect = firelandFx;
flCoalfrag.status = hellfire;
flCoalfrag.fragBullet = Bullets.standardCopper;
//this will make the bullet always spawn a puddle even if it dosn't hit it's target.

const flPixelite = extend(BasicBulletType, {});
flPixelite.speed = 20;
flPixelite.damage = 15;
flPixelite.width = 1;
flPixelite.height = 1;
flPixelite.innacuracy = 15;
flPixelite.lifetime = 5;
flPixelite.shootSound = Sounds.flame2;
flPixelite.shootEffect = Fx.fire;
flPixelite.despawnEffect = Fx.none;
flPixelite.hitEffect = Fx.fire;
flPixelite.status = hellfire;
flPixelite.ammoMultiplier = 10;
flPixelite.pierce = true;

const helgravator = extendContent(ItemTurret, "flamethrower3",{
  init(){
        this.ammo( 
            Vars.content.getByName(ContentType.item,"coal"), flCoal
            //Vars.content.getByName(ContentType.item."pixelcraft-pixelite"), flPixelite 
        );
    this.super$init();
  },

  icons(){
    return [
      Core.atlas.find("block-3"),
      Core.atlas.find("pixelcraft-flamethrower3")
    ];
  }
});
helgravator.innacuracy = 16;
helgravator.shots = 10;
helgravator.shootSound = Sounds.flame2;

//Thanks for the help with effects Puppycat :)