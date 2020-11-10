// Obligatory comment line for no reason at all
//Put effects at the top of the script so they load in first.
const puverShoot = new Effect(40, e => {
    Draw.color( Color.white, Color.black, e.fout());
    Lines.stroke(e.fin() *2); 
    Lines.circle(e.x, e.y, e.fout() * 25 * Mathf.random()); 
});
//then put the bullets after the effects so they load before the turret
const blastShot = extend(BasicBulletType, {});
blastShot.damage = 3;
blastShot.speed = 3;
blastShot.lifetime = 35;
blastShot.knockback = 99999999999999999999999999999999999999999999999999999;
blastShot.collides = true;
blastShot.collidesTiles = false;
blastShot.hitEffect = Fx.none;
blastShot.despawnEffect = Fx.none;
blastShot.shootEffect = Fx.puverShoot;
blastShot.smokeEffect = Fx.none;


//then laod the turret
const puver = extendContent(PowerTurret, "puver", {
  icons(){
    return [
      Core.atlas.find("block-3"),
      Core.atlas.find("pixelcraft-strand")
    ];
  }
});
puver.recoil = 1;
puver.restitution = 0.015;
puver.shootType = blastShot;
