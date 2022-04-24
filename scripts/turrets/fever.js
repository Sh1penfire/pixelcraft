const statuses = require("libs/statuses");
const bombs = require("blocks/bombs")

const shootEffectFlame = new Effect(60, e => {
  Draw.color(Pal.lightPyraFlame, Color.orange, Pal.darkPyraFlame, e.fin());
  Angles.randLenVectors(e.id, 25, e.finpow() * 145, e.rotation, 3, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 2);
  })
});

const shootEffectFlameGreen = new Effect(60, e => {
  Draw.color(Color.valueOf("#ced671"), Color.white, Pal.darkMetal, e.fin() * 0.25);
  Angles.randLenVectors(e.id, 25, e.finpow() * 145, e.rotation, 3, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 2);
  })
});

const liquid1 = extend(LiquidBulletType, {})
liquid1.liquid = Liquids.oil;
liquid1.damage = 0;
liquid1.lifetime = 1;
liquid1.knockback = 0;
liquid1.puddleSize = 3;
liquid1.despawnEffect = Fx.none;
liquid1.hitEffect = Fx.none;
liquid1.fragBullet = Bullets.standardCopper;

const explosion1 = extend(BombBulletType, {
splashDamageRadius: 35,
splashDamage: 65,
lifetime: 0,
incendAmount: 3,
status: statuses.hellfire,
statusDuration: 900,
despawnEffect: Fx.none,
hitEffect: Fx.none,
fragBullets: 10,
fragBullet: liquid1,
hitSound: Sounds.none
});


const landMine = extend(BombBulletType, {
    update(b){
        if(Mathf.random() < 0.05){
                Tmp.v1.set(b.x + Mathf.random(40) - 20, b.y + Mathf.random(40) - 20, Mathf.random(360));
                Damage.dynamicExplosion(Tmp.v1.x, Tmp.v1.y, 50, 69, 15, this.splashDamageRadius, this.splashDamage, true, b.team, Fx.explosion);
                Puddles.deposit()
        }
    },
    draw(b){
        //don't draw
    }
});
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
    drawLight(b){},
    draw(b){
        Draw.color(Pal.lightPyraFlame, Color.orange, Pal.darkPyraFlame, b.fin());
        Fill.circle(b.x, b.y, b.fout() * 4);
    }
});

flBlast.damage = 750;
flBlast.splashDamage = 250;
flBlast.splashDamageRadius = 55;
flBlast.speed = 6.5;
flBlast.drag = 0.045;
flBlast.homingPower = 0;
flBlast.reloadMultiplier = 0.15;
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
flBlast.fragBullets = 1;
flBlast.fragBullet = bombs.prisBullets[1];
flBlast.hitEffect = Fx.explosion;
flBlast.despawnEffect = Fx.none;
flBlast.shootEffect = shootEffectFlame;
flBlast.hitSound = Sounds.none;

const flPyra = extend(MissileBulletType, {
    damage: 114,
    speed: 6.5,
    drag: 0.045,
    homingPower: 0,
    pierce: true,
    pierceBuilding: true,
    lifetime: 60,
    hitSize: 4,
    collides: true,
    collidesAir: true,
    trailEffect: Fx.none,
    trailChance: 1,
    hitEffect: Fx.explosion,
    despawnEffect: Fx.none,
    shootEffect: shootEffectFlame,
    hitSound: Sounds.none,
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



const flBionorb = extend(MissileBulletType, {
  damage: 25,
  speed: 6.5,
  drag: 0.045,
  homingPower: 0,
  pierce: true,
  pierceBuilding: true,
  lifetime: 60,
  hitSize: 4,
  collides: true,
  collidesAir: true,
  status: statuses.groveCurse,
  trailEffect: Fx.none,
  trailChance: 1,
  hitEffect: Fx.explosion,
  despawnEffect: Fx.none,
  hootEffect: shootEffectFlameGreen,
  hitSound: Sounds.none,
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


const fever = extendContent(ItemTurret, "flamethrower4" ,{
  shootSound: Sounds.flame2,
   inaccuracy: 3,
  rotateSpeed: 6,
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

fever.buildType = () => extendContent(ItemTurret.ItemTurretBuild, fever, {
    shoot(type){
        let limitationX = Math.cos(this.rotation/180 * Math.PI) * 5;
        let limitationY = Math.sin(this.rotation/180 * Math.PI) * 5;
        
        type.create(this, this.team, this.x + limitationX, this.y + limitationY, this.rotation + Mathf.range(3));
        
        Sounds.flame2.at( this.x + limitationX, this.y + limitationY);
        
        type.shootEffect.at(this.x + limitationX, this.y + limitationY, this.rotation);
        
        this.useAmmo();
        this.heat = 1;
    }
});

module.exports = {
    fever: fever
};

Vars.mods.getScripts().runConsole(

)
