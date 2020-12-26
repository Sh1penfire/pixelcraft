const shootEffectFlame = new Effect(60, e => {
  Draw.color(Pal.lightPyraFlame, Color.orange, Pal.darkPyraFlame, e.fin());
  Angles.randLenVectors(e.id, 25, e.finpow() * 240, e.rotation, 3, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 2);
  })
});

const explosion1 = extend(BombBulletType, {});
explosion1.splashDamageRadius = 35;
explosion1.splashDamage = 45;
explosion1.lifetime = 0;
explosion1.incendAmount = 3;
explosion1.status = StatusEffects.burning;
explosion1.despawnEffect = Fx.none;
explosion1.hitEffect = Fx.none;
explosion1.hitSound = Sounds.none;

const liquid1 = extend(LiquidBulletType, {})
liquid1.liquid = Liquids.oil;
liquid1.damage = 0;
liquid1.lifetime = 1;
liquid1.knockback = 0;
liquid1.puddleSize = 3;
liquid1.despawnEffect = Fx.none;
liquid1.hitEffect = Fx.none;
liquid1.fragBullet = Bullets.standardCopper;

const explosion2 = extend(BombBulletType, {});
explosion2.splashDamageRadius = 35;
explosion2.splashDamage = 80;
explosion2.lifetime = 0;
explosion2.incendAmount = 3;
explosion2.status = StatusEffects.burning;
explosion2.despawnEffect = Fx.none;
explosion2.hitEffect = Fx.none;
explosion2.fragBullets = 10;
explosion2.fragBullet = liquid1;
explosion2.hitSound = Sounds.none;

const explosions = [explosion1,explosion2];
//Mathf.round(Mathf.random(1))
const landMine = extend(BombBulletType, {
    update(b){
        if(Mathf.random() < 0.2){
                explosions[Mathf.round(Mathf.random(1))].create(b.owner, b.team, b.x + Mathf.random(40) - 20, b.y + Mathf.random(40) - 20, Mathf.random(360), Mathf.random(3));
                Fx.explosion.at(b.x, b.y);
        }
    }
});
landMine.width = 0;
landMine.heigh = 0;
landMine.splashDamageRadius = 25;
landMine.splashDamage = 150;
landMine.lifetime = 120;
landMine.drag = 0.05;
landMine.incendAmount = 5;
landMine.despawnEffect = Fx.explosion;
landMine.hitEffect = Fx.explosion;

const flBlast = extend(MissileBulletType, {
    drawLight(b){}
});

flBlast.damage = 300;
flBlast.splashDamage = 100;
flBlast.splashDamageRadius = 25;
flBlast.speed = 16;
flBlast.homingPower = 0;
flBlast.pierce = true;
flBlast.pierceBuilding = true;
flBlast.lifetime = 15;
flBlast.width = 0;
flBlast.height = 0;
flBlast.hitSize = 4;
flBlast.collides = true;
flBlast.collidesAir = true;
flBlast.trailEffect = Fx.none;
flBlast.trailChance = 1;
flBlast.hitEffect = Fx.explosion;
flBlast.despawnEffect = Fx.none;
flBlast.shootEffect = shootEffectFlame;

const flPyra = extend(MissileBulletType, {
    hit(b){
        this.super$hit;
        landMine.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(0));
    },
    drawLight(b){}
});

flPyra.damage = 140;
flPyra.speed = 16;
flPyra.homingPower = 0;
flPyra.pierce = true;
flPyra.pierceBuilding = true;
flPyra.lifetime = 15;
flPyra.width = 0;
flPyra.height = 0;
flPyra.hitSize = 4;
flPyra.collides = true;
flPyra.collidesAir = true;
flPyra.trailEffect = Fx.none;
flPyra.trailChance = 1;
flPyra.hitEffect = Fx.explosion;
flPyra.despawnEffect = Fx.none;
flPyra.shootEffect = shootEffectFlame;

const fever = extendContent(ItemTurret, "flamethrower4",{
  init(){
        //this.ammo( 
            //Vars.content.getByName(ContentType.item,"pyratite"), flPyra
            //Vars.content.getByName(ContentType.item."pixelcraft-pixelite"), flPixelite 
        //);
    this.super$init();
  },

  icons(){
    return [
      Core.atlas.find("block-4"),
      Core.atlas.find("pixelcraft-flamethrower4")
    ];
  }
});
fever.shootSound = Sounds.flame2;
fever.inaccuracy = 3;
fever.rotateSpeed = 6;
fever.ammo(Vars.content.getByName(ContentType.item,"blast-compound"), flBlast,Vars.content.getByName(ContentType.item,"pyratite"), flPyra )