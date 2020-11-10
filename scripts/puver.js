// Obligatory comment line for no reason at all

//shoot effect of puver
const puverShoot = new Effect(40, e => {
  Draw.color(Color.black, Color.white, e.fin());
  Lines.stroke(e.fout() * 2);
  Lines.circle(e.x, e.y, e.fin() * 10);
});

//effect when bullet breaks
const shotHit = new Effect(40, e => {
  Draw.color(Color.black, Color.orange, e.fin());
  Lines.stroke(e.fout() * 2);
  Fill.circle(e.x, e.y, e.fin() * 7);
});

//frag effect
const blast = new Effect(40, e => {
  Draw.color(Color.black, Color.orange, e.fin());
  Lines.stroke(e.fin() * 2);
  Lines.circle(e.x, e.y, e.fout() * 7);
});

//makes the shot of puver
const shot = extend(BasicBulletType, {});

//makes frag bullets
const blastShot = extend(BasicBulletType, {});

//extends off the puver hjson file
const puver = extendContent(PowerTurret, "puver", {
  icons(){
    return [
      Core.atlas.find("block-3"),
      Core.atlas.find("pixelcraft-strand")
    ];
  }
});

//givving things stats

//givving puver it's stats (Some are predefined in the puver.hjson file
puver.recoil = 1;
puver.restitution = 0.015;
puver.shootType = shot;

//stats of bullet shot by puver
shot.damage = 15;
shot.speed = 3;
shot.lifetime = 35;
shot.knockback = 5;
shot.width = 3;
shot.height = 5;
shot.fragBullets = 5;
shot.fragBullet = blastShot;
shot.collides = true;
shot.collidesTiles = true;
shot.hitEffect = shotHit;
shot.despawnEffect = Fx.none;
shot.shootEffect = puverShoot;
shot.smokeEffect = Fx.none;

//now stats of frag bullet
blastShot.damage = 5;
blastShot.speed = 3;
blastShot.lifetime = 35;
blastShot.knockback = 5;
blastShot.width = 3;
blastShot.height = 5;
blastShot.collides = true;
blastShot.collidesTiles = true;
blastShot.hitEffect = blast;
blastShot.despawnEffect = blast;
blastShot.shootEffect = puverShoot;
blastShot.smokeEffect = Fx.none;
