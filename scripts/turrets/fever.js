const statuses = require("libs/statuses");

const shootEffectFlame = new Effect(60, e => {
  Draw.color(Pal.lightPyraFlame, Color.orange, Pal.darkPyraFlame, e.fin());
  Angles.randLenVectors(e.id, 25, e.finpow() * 145, e.rotation, 3, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 2);
  })
});

const shootEffectFlameGreen = new Effect(60, e => {
  Draw.color(Color.valueOf("#ced671"), Color.white, Pal.darkMetal, e.fin());
  Angles.randLenVectors(e.id, 25, e.finpow() * 145, e.rotation, 3, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 2);
  })
});

const explosion1 = extend(BombBulletType, {});
explosion1.splashDamageRadius = 35;
explosion1.splashDamage = 25;
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
explosion2.splashDamage = 35;
explosion2.lifetime = 0;
explosion2.incendAmount = 3;
explosion2.status = statuses.hellfire;
explosion2.statusDuration = 900;
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
landMine.splashDamage = 75;
landMine.lifetime = 120;
landMine.drag = 0.05;
landMine.incendAmount = 5;
landMine.despawnEffect = Fx.explosion;
landMine.hitEffect = Fx.explosion;

const groveExplosion = extend(BombBulletType, {});
groveExplosion.splashDamageRadius = 35;
groveExplosion.splashDamage = 5;
groveExplosion.lifetime = 0;
groveExplosion.status = statuses.groveCurse;
groveExplosion.statusDuration = 900;
groveExplosion.despawnEffect = Fx.none;
groveExplosion.hitEffect = Fx.none;
groveExplosion.hitSound = Sounds.none;

const flamingGrove = extend(BombBulletType, {
    update(b){
        if(Mathf.random() < 0.05){
                groveExplosion.create(b.owner, b.team, b.x + Mathf.random(40) - 20, b.y + Mathf.random(40) - 20, Mathf.random(360), Mathf.random(3));
                Fx.explosion.at(b.x, b.y);
        }
    }
});
flamingGrove.width = 0;
flamingGrove.heigh = 0;
flamingGrove.splashDamageRadius = 15;
flamingGrove.splashDamage = 15;
flamingGrove.lifetime = 240;
flamingGrove.drag = 0.05;
flamingGrove.despawnEffect = Fx.explosion;
flamingGrove.hitEffect = Fx.explosion;

const flBlast = extend(MissileBulletType, {
    drawLight(b){}
});

flBlast.damage = 150;
flBlast.splashDamage = 50;
flBlast.splashDamageRadius = 25;
flBlast.speed = 2.5;
flBlast.homingPower = 0;
flBlast.pierce = true;
flBlast.pierceBuilding = true;
flBlast.lifetime = 60;
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
flBlast.hitSound = Sounds.none;

const flPyra = extend(MissileBulletType, {
    hit(b){
        this.super$hit;
        landMine.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(0));
    },
    drawLight(b){},
    draw(b){
        Draw.color(Pal.lightPyraFlame, Color.orange, Pal.darkPyraFlame, b.fin());
        Fill.circle(b.x, b.y, 0.65 + b.fout() * 2);
    }
});

flPyra.damage = 114;
flPyra.speed = 6.5;
flPyra.drag = 0.045;
flPyra.homingPower = 0;
flPyra.pierce = true;
flPyra.pierceBuilding = true;
flPyra.lifetime = 60;
flPyra.hitSize = 4;
flPyra.collides = true;
flPyra.collidesAir = true;
flPyra.trailEffect = Fx.none;
flPyra.trailChance = 1;
flPyra.hitEffect = Fx.explosion;
flPyra.despawnEffect = Fx.none;
flPyra.shootEffect = shootEffectFlame;
flPyra.hitSound = Sounds.none;

const flBionorb = extend(MissileBulletType, {
    hit(b){
        this.super$hit;
        flamingGrove.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(0));
    },
    drawLight(b){},
    draw(b){
        Draw.color(Color.valueOf("#ced671"), Color.white, Pal.darkMetal, b.fin());
        Fill.circle(b.x, b.y, 0.65 + b.fout() * 2);
    }
});

flBionorb.damage = 25;
flBionorb.speed = 6.5;
flBionorb.drag = 0.045;
flBionorb.homingPower = 0;
flBionorb.pierce = true;
flBionorb.pierceBuilding = true;
flBionorb.lifetime = 60;
flBionorb.hitSize = 4;
flBionorb.collides = true;
flBionorb.collidesAir = true;
flBionorb.status = statuses.groveCurse;
flBionorb.trailEffect = Fx.none;
flBionorb.trailChance = 1;
flBionorb.hitEffect = Fx.explosion;
flBionorb.despawnEffect = Fx.none;
flBionorb.shootEffect = shootEffectFlameGreen;
flBionorb.hitSound = Sounds.none;

const fever = extendContent(ItemTurret, "flamethrower4",{
  init(){
    this.ammo(
        Vars.content.getByName(ContentType.item,"pixelcraft-pixelite"), flBlast,
        Vars.content.getByName(ContentType.item,"pyratite"), flPyra,
        Vars.content.getByName(ContentType.item,"pixelcraft-bionorb"), flBionorb
    );
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

fever.buildType = () => extendContent(ItemTurret.ItemTurretBuild, fever, {
    shoot(type){
        
        let limitationX = Math.cos(this.rotation/180 * Math.PI) * 5;
        let limitationY = Math.sin(this.rotation/180 * Math.PI) * 5;
        
        type.create(this, this.team, this.x + limitationX, this.y + limitationY, this.rotation + Mathf.range(3));
        
        Sounds.flame2.at( this.x + limitationX, this.y + limitationY);
        
        type.shootEffect.at(this.x + limitationX, this.y + limitationY, this.rotation);
        
        this.useAmmo();
        this.heat = 1;
    },
});