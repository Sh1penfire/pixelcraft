// Obligatory comment line for no reason at all
const fc = require("libs/fc");
const statuses = require("libs/statuses");
//shoot effect for puver
const puverShoot = new Effect(30, e => {
  Draw.color(Color.valueOf("0A01b7"), Color.valueOf("56D7CA"), e.fslope());
  Draw.alpha(0.5);
  Fill.circle(e.x, e.y, e.fslope() * 5);
  Draw.color(Color.blue, Color.valueOf("0A01b7"), Color.valueOf("0A01b7"), e.fin());
  Angles.randLenVectors(e.id, 8, e.finpow() * 25, e.rotation, 10, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.5);
  })
});



//Charge effect for puver
/*
const puverCharge = new Effect(30, e => {
  Draw.color(Color.black, Color.white, e.fin());
  Lines.stroke(e.fin() * 2);
  Lines.circle(e.x, e.y, e.fout() * 10);
});
*/

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
const blast = new Effect(25, e => {
  Draw.color(Color.valueOf("0A01b7"), Color.valueOf("56D7CA"), e.fin());
  Lines.stroke(e.fin() * 2);
  Lines.circle(e.x, e.y, e.fout() * 2);
});


//makes the shot of puver
const shot = extend(MissileBulletType, {
    update(b){
        shotTrail.at(b.x, b.y);
        blastShot.create(b.owner, b.team, b.x, b.y, fc.rotationFC(b.rotation(), 90), fc.helix(7, 3, b.fin()));
        blastShot.create(b.owner, b.team, b.x, b.y, fc.rotationFC(b.rotation(), -90), fc.helix(7, 3, b.fin() ));
    },
    absorbable: false
});

//makes frag bullets
const blastShot = extend(BasicBulletType, {
    absorbable: false
});

//extends off the puver hjson file
const puver = extendContent(PowerTurret, "electricTurret3b1", {
  icons(){
    return [
      Core.atlas.find("block-2"),
      Core.atlas.find("pixelcraft-electricTurret3b1")
    ];
  }
});

//givving things stats

//givving puver it's stats (Some are predefined in the puver.hjson file
puver.recoil = 1;
puver.restitution = 0.015;
puver.shootType = shot;
//chargeTime = 30;
//chargeEffects = 5;
//chargeMaxDelay = 10;
//chargeEffect = puverCharge;
//chargeBeginEffect = Fx.none;

//stats of bullet shot by puver
shot.damage = 25;
shot.speed = 3;
shot.lifetime = 35;
shot.knockback = 5;
shot.pierce = true;
shot.pierceBuilding = true;
shot.width = 0;
shot.height = 0;
shot.hitSize = 4
shot.collides = true;
shot.collidesTiles = true;
shot.hitEffect = Fx.none;
shot.despawnEffect = shotHit;
shot.shootEffect = puverShoot;
shot.hitSound = Sounds.none;
//shot.smokeEffect = puverSmoke;

//now stats of frag bullet
blastShot.damage = 1;
blastShot.speed = 3;
blastShot.lifetime = 5;
blastShot.knockback = 2;
blastShot.pierce = true;
blastShot.pierceBuilding = true;
blastShot.width = 0;
blastShot.height = 0;
blastShot.hitSize = 4;
blastShot.collides = true;
blastShot.collidesTiles = true;
blastShot.hitEffect = blast;
blastShot.despawnEffect = blast;
blastShot.shootEffect = puverShoot;
blastShot.smokeEffect = Fx.smokeCloud;
blastShot.status = statuses.ionisedStatus;
