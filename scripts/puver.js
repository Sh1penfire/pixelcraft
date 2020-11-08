// Obligatory comment line for no reason at all
/*
const blastShot = extend(BasicBulletType, {
blastShot.damage = 3;
blastShot.speed = 3;
blastShot.lifetime = 35;
 });
*/

const puverShoot = newEffect(40, e => {
Draw.color(Color.black, Color.orange, e.fin());
Lines.stroke(e.fin() * 2);
Lines.circle(e.x, e.y, e.fout() * 2);
});

const puver = extendContent(PowerTurret, "Puver", {
  generateIcons(){
    return[
      Core.atlas.find("block-3"),
      Core.atlas.find("pixelcraft-strand")
    ]
  }
}
puver.shootEffect = charge;
puver.recoil = 1;
puver.restitution = 0.015;
puver.shootType = extend(BasicBulletType, {
blastShot.damage = 3;
blastShot.speed = 3;
blastShot.lifetime = 35;
 });

puver.shootType.damage = 15;
puver.shootType.speed = 2;
puver.shootType.lifetime = 50;
puver.shootType.knockback = 1;
puver.shootType.collides = true;
puver.shootType.collidesTiles = false;
puver.shootType.hitEffect = Fx.none;
puver.shootType.despawnEffect = Fx.none;
puver.shootType.shootEffect = Fx.none;
puver.shootType.smokeEffect = Fx.none;
