const fc = require("libs/fc");
const statuses = require("libs/statuses");

const psionShoot = new Effect(30, e => {
  Draw.color(Color.valueOf("0A01b7"), Color.valueOf("56D7CA"), e.fslope());
  Draw.alpha(0.5);
  Fill.circle(e.x, e.y, e.fslope() * 5);
  Draw.color(Color.blue, Color.valueOf("0A01b7"), Color.valueOf("0A01b7"), e.fin());
  Angles.randLenVectors(e.id, 8, e.finpow() * 25, e.rotation, 10, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.5);
  })
  Angles.randLenVectors(e.id, 12, e.finpow() * 45, e.rotation, 10, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.5);
  })
});

//trail effect for the shot
const shotTrail = new Effect(10, e => {
  Draw.color(Color.valueOf("0A01b7"), Color.valueOf("56D7CA"), e.fin());
  Lines.stroke(e.fout() * 2);
  Lines.circle(e.x, e.y, e.fin() * 4);
});

//effect when bullet breaks
const shotHit = new Effect(40, e => {
  Draw.color(Color.valueOf("56D7CA"), Color.valueOf("0A01b7"), e.fin());
  Lines.stroke(e.fout() * 2);
  Lines.circle(e.x, e.y, e.fin() * 4);
});

//frag effect
const blast = new Effect(15, e => {
  Draw.color(Color.valueOf("0A01b7"), Color.valueOf("56D7CA"), e.fin());
  Lines.stroke(e.fin() * 2);
  Lines.circle(e.x, e.y, e.fout() * 2);
});

const ion = extend(BasicBulletType, {});
const ionBomb = extend(BasicBulletType, {});
//reusing the puver code
const shot = extend(MissileBulletType, {
    update(b){
        shotTrail.at(b.x, b.y);
        ion.create(b.owner, b.team, b.x, b.y, fc.rotationFC(b.rotation(), 45), fc.helix(5, 2, b.fin() ));
        ion.create(b.owner, b.team, b.x, b.y, fc.rotationFC(b.rotation(), -45), fc.helix(5, 2, b.fin() ));
    }
});

const electricTurret4b1 = extendContent(PowerTurret, "electricTurret4b1", {
  icons(){
    return [
      Core.atlas.find("block-3"),
      Core.atlas.find("pixelcraft-electricTurret4b1")
    ];
  }
});

electricTurret4b1.recoil = 0.5;
electricTurret4b1.restitution = 0.015;
electricTurret4b1.shootType = shot;

shot.damage = 15;
shot.splashDamage = 25;
shot.splashDamageRadius = 24;
shot.speed = 3;
shot.lifetime = 60;
shot.knockback = 1;
shot.pierce = true;
shot.pierceBuilding = true;
shot.homingPower = 1.0;
shot.homingRange = 100.0;
shot.width = 0;
shot.height = 0;
shot.hitSize = 4
shot.collides = true;
shot.collidesTiles = true;
shot.hitEffect = Fx.none;
shot.despawnEffect = shotHit;
shot.shootEffect = psionShoot;
shot.fragBullets = 10;
shot.fragBullet = ion;

ion.damage = 4;
ion.speed = 3;
ion.lifetime = 5;
ion.knockback = 1;
ion.pierce = true;
ion.width = 0;
ion.height = 0;
ion.hitSize = 4;
ion.collides = true;
ion.collidesTiles = false;
ion.hitEffect = blast;
ion.despawnEffect = blast;
ion.smokeEffect = Fx.smokeCloud;
ion.status = statuses.chargedEffect;

ionBomb.damage = 0;
ionBomb.lifetime = 0;
ionBomb.knockback = 1;
ionBomb.width = 0;
ionBomb.height = 0;
ionBomb.hitSize = 0;
ionBomb.collidesTiles = false;
ionBomb.hitEffect = blast;
ionBomb.despawnEffect = blast;
ionBomb.status = statuses.chargedEffect;
ionBomb.fragBullets = 10;
ionBomb.fragBullet = ion;