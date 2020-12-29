const titaniumbullet = extend(ShrapnelBulletType,{});

titaniumbullet.length = 380;
titaniumbullet.width = 30;
titaniumbullet.lifetime = 20;
titaniumbullet.damage = 100;
titaniumbullet.ammoMultiplier = 1;
titaniumbullet.hitEffect = Fx.hitLancer;
titaniumbullet.shootEffect = Fx.lightningShoot;
titaniumbullet.toColor = Pal.lancerLaser;
titaniumbullet.fromColor = Color.valueOf("7DE7FFFF");

const graphitebullet = extend(ShrapnelBulletType,{});

graphitebullet.length = 50;
graphitebullet.width = 30;
graphitebullet.damage = 300;
graphitebullet.lifetime = 20;
graphitebullet.ammoMultiplier = 2;
graphitebullet.hitEffect = Fx.hitLancer;
graphitebullet.shootEffect = Fx.lightningShoot;
graphitebullet.toColor = Pal.lancerLaser;
graphitebullet.fromColor = Color.white;


const sporeShotFx = new Effect(20, e => {
  for (var i = 0; i < 4; i++) {
    Draw.color(Pal.spore,
        Pal.sap, e.fin()),
      Angles.randLenVectors(e.id, 4, 15 * e.finpow(), e.rotation, 10, (x, y) => {
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fin() * 3 + 1);
      });
  }
});
const sporeFx = new Effect(15,e => {
   for(var i = 0; i < 4 ; i++){
     Draw.color(Pal.spore,
     Pal.sap, e.fin()),
    Angles.randLenVectors(e.id, 7, 25 * e.finpow(), e.rotation, 50, (x, y) => {
      Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fin() * 5  + 2 );
    });
   }
});
const sporebullet = extend(ShrapnelBulletType ,{
  
});

sporebullet.length = 200;
sporebullet.width = 10;
sporebullet.damage = 200;
sporebullet.lifetime = 20;
sporebullet.ammoMultiplier = 2;
sporebullet.toColor =  Pal.spore;
sporebullet.shootEffect = sporeShotFx;
sporebullet.hitEffect = sporeFx;
sporebullet.fromColor = Pal.sapBullet;
sporebullet.smokeEffect = sporeFx;

const vanilaTurret1 = extendContent(ItemTurret, "vanilaTurret1", {
  init(){
    this.ammo(
      Items.titanium,titaniumbullet,
      Items.sporePod,sporebullet,
      Items.graphite,graphitebullet
      );
      this.super$init();
  }
});
