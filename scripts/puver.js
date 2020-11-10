// Obligatory comment line for no reason at all

const puverShoot = new Effect(40, e => {
  Draw.color(Color.black, Color.white, e.fin());
  Lines.stroke(e.fout() * 2);
  Lines.circle(e.x, e.y, e.fin() * 10);
});


const blastDespawn = new Effect(40, e => {
  Draw.color(Color.black, Color.orange, e.fin());
  Lines.stroke(e.fin() * 2);
  Lines.circle(e.x, e.y, e.fout() * 7);
});

const blastShot = extend(BasicBulletType, {});

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

blastShot.damage = 3;
blastShot.speed = 3;
blastShot.lifetime = 35;
blastShot.knockback = 5;
blastShot.width = 3;
blastShot.height = 5;
blastShot.collides = true;
blastShot.collidesTiles = true;
blastShot.hitEffect = blastDespawn;
blastShot.despawnEffect = blastDespawn
blastShot.shootEffect = puverShoot;
blastShot.smokeEffect = Fx.none;
