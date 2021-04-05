const statuses = require("libs/statuses");

const fireShoot = new Effect(25, e => {
  Draw.color(Pal.lightPyraFlame, Color.orange, Pal.darkPyraFlame, e.fin());
  Angles.randLenVectors(e.id, 21, e.finpow() * 100, e.rotation, 20, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 2.65);
  })
});

const sporeShoot = new Effect(25, e => {
  Draw.color(Pal.spore, Color.purple, Color.white , e.fin());
  Angles.randLenVectors(e.id, 10, e.finpow() * 100, e.rotation, 24, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 2.65);
  })
});

const firelandFx = new Effect(20, e => {
  Draw.color(Pal.lightPyraFlame, Color.orange, Pal.darkPyraFlame, e.fin());
  Angles.randLenVectors(e.id, 2, e.finpow() * 5, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 2.65);
  })
});

const flCoalfrag = extend(LiquidBulletType, {
    liquid: Liquids.oil,
    orbSize: 1.25,
    puddleSize: 4,
    speed: 4,
    damage: 2.5,
    lifetime: 15,
    knockback: 0,
    despawnEffect: Fx.none,
    hitEffect: firelandFx,
    status: statuses.hellfire,
    fragBullet: Bullets.standardCopper
});

const flCoal = extend(BasicBulletType, {
    speed: 17,
    damage: 15,
    hitSize: 6,
    width: 0,
    height: 0,
    inaccuracy: 20,
    lifetime: 3,
    knockback: 0,
    shootSound: Sounds.flame2,
    shootEffect: fireShoot,
    despawnEffect: Fx.none,
    hitEffect: firelandFx,
    status: statuses.hellfire,
    trailEffect: Fx.none,
    collides: true,
    collidesTiles: true,
    colidesAir: true,
    ammoMultiplier: 2,
    pierce: true,
    fragBullets: 1,
    fragCone: 10,
    fragBullet: flCoalfrag,
});

const flPyra = extend(BasicBulletType, {
    speed: 17,
    damage: 25,
    hitSize: 8,
    width: 0,
    height: 0,
    inaccuracy: 25,
    lifetime: 3,
    knockback: 0.05,
    shootSound: Sounds.flame2,
    shootEffect: fireShoot,
    despawnEffect: Fx.none,
    hitEffect: firelandFx,
    status: statuses.hellfire,
    trailEffect: Fx.none,
    collides: true,
    collidesTiles: true,
    colidesAir: true,
    ammoMultiplier: 6,
    pierce: true,
    fragBullets: 2,
    fragCone: 7.5,
    fragBullet: flCoalfrag,
});

const flBio = extend(BasicBulletType, {
    speed: 5,
    damage: 25,
    hitSize: 8,
    width: 0,
    height: 0,
    inaccuracy: 25,
    lifetime: 20,
    knockback: 0.1,
    shootSound: Sounds.flame2,
    shootEffect: fireShoot,
    despawnEffect: Fx.none,
    hitEffect: firelandFx,
    status: statuses.groveCurse,
    trailEffect: Fx.none,
    collides: true,
    collidesTiles: true,
    colidesAir: true,
    ammoMultiplier: 2,
    pierce: true,
});

const flSpore = extend(BasicBulletType, {
    speed: 5,
    damage: 5,
    hitSize: 6,
    width: 0,
    height: 0,
    inaccuracy: 20,
    lifetime: 16,
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
helgravator.ammo(Items.coal, flCoal, Items.pyratite, flPyra, Items.sporePod, flSpore);
//Thanks for the help with effects Puppycat :)