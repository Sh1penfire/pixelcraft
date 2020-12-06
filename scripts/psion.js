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

const chargedEffectFX = new Effect(27, (e) => {
  Draw.color(Color.valueOf("0A01b7"), Color.valueOf("56D7CA"), e.fslope());
  Angles.randLenVectors(e.id, 2, 1 + e.fin() * 10, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 3 + 0.3)
  });
});

const blast = new Effect(25, e => {
  Draw.color(Color.valueOf("#4499he"), Color.valueOf("#3eabe6"), e.fin());
  Lines.stroke(e.fin() * 2);
  Lines.circle(e.x, e.y, e.fout() * 2);
});

const shotTrail = new Effect(10, e => {
  Draw.color(Color.valueOf("#4499he"), Color.white, e.fin());
  Lines.stroke(e.fout() * 2);
  Lines.circle(e.x, e.y, e.fin() * 4);
});

//effect when bullet breaks
const shotHit = new Effect(40, e => {
  Draw.color(Color.white, Color.valueOf("#3eabe6"), e.fin());
  Lines.stroke(e.fout() * 2);
  Fill.circle(e.x, e.y, e.fin() * 7);
});

const chargedEffect = extendContent(StatusEffect, "chargedEffect", {});

chargedEffect.speedMultiplier = 0.3;
chargedEffect.armorMultiplier = 0.1;
chargedEffect.damage = .3;
chargedEffect.effect = chargedEffectFX;
chargedEffect.color  = Color.white;


const ion = extend(BasicBulletType, {});
//reusing the puver code
const shot = extend(MissileBulletType, {
    update(b){
        if(Mathf.random(1) < 0.85){
            shotTrail.at(b.x, b.y);
            ion.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(2));
        }
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
shot.speed = 4;
shot.lifetime = 45;
shot.knockback = 1;
shot.pierce = true;
shot.homingPower = 1.0;
shot.homingRange = 10.0;
shot.width = 0;
shot.height = 0;
shot.hitSize = 4
shot.collides = true;
shot.collidesTiles = true;
shot.hitEffect = shotHit;
shot.despawnEffect = shotHit;
shot.shootEffect = psionShoot;

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
ion.status = chargedEffect;