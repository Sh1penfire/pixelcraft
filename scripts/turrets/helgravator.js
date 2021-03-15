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
const flCoal = extend(BasicBulletType, {
    speed: 20,
    damage: 60,
    hitSize: 6,
    width: 1,
    height: 1,
    inaccuracy: 15,
    lifetime: 5,
    knockback: 0,
    shootSound: Sounds.flame2,
    shootEffect: firehitFx,
    despawnEffect: Fx.none,
    hitEffect: Fx.none,
    status: statuses.hellfire,
    trailEffect: Fx.none,
    collides: true,
    collidesTiles: true,
    colidesAir: true,
    ammoMultiplier: 10,
    pierce: true,
    fragBullets: 2,
    fragBullet: flCoalfrag,
});

const flSpore = extend(BasicBulletType, {
    speed: 5,
    damage: 0,
    hitSize: 6,
    width: 0,
    height: 0,
    inaccuracy: 15,
    lifetime: 20,
    knockback: 0,
    shootSound: Sounds.flame2,
    shootEffect: sporeShoot,
    despawnEffect: Fx.none,
    hitEffect: Fx.none,
    status: statuses.sporefire,
    trailEffect: Fx.none,
    collides: true,
    collidesTiles: true,
    colidesAir: true,
    ammoMultiplier: 10,
    pierce: true,
    pierceBuilding: true
});

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
helgravator.ammo(Vars.content.getByName(ContentType.item,"coal"), flCoal,Vars.content.getByName(ContentType.item,"spore-pod"), flSpore);
//Thanks for the help with effects Puppycat :)