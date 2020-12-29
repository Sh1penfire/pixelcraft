const shortCooldown = 20;
const smallCooldown = 30;
const mediumCooldown = 60;
const longCooldown = 120;
const extrememlyLongCooldown = 480;

const fromColor = [Color.red, Color.orange, Color.yellow, Color.green, Color.blue, Color.purple];
const toColor = [Pal.health, Pal.lightOrange, Pal.missileYellow, Pal.plastaniumBack, Pal.lancerLaser, Pal.spore];

const prismiumFX = new Effect(50, e => {
  for(let h in fromColor){
    Draw.color(fromColor[h], toColor[h], e.fin());
    Angles.randLenVectors(e.id, 1, e.finpow() * h * 2, e.rotation, 360, (x, y) => {
      Fill.circle(e.x + x, e.y + y, e.fout() * 1.5);
      Fill.circle(e.x + x, e.y + y * -1, e.fout() * 1.5);
      Fill.circle(e.x + x * -1, e.y + y * -1, e.fout() * 1.5);
      Fill.circle(e.x + x * -1, e.y + y, e.fout() * 1.5);
      Draw.alpha(1 * e.fout())
      Fill.circle(e.x, e.y, e.fin() * 2 * h); 
    });
  };
});

const prismiumShockwave = new Effect(480, e => {
  for(let h in fromColor){
    Draw.color(fromColor[h], toColor[h], e.fin());
    Lines.stroke(e.fout() * 5); 
    Lines.circle(e.x, e.y, e.fin() * 5 * h + 24 * e.fin()); 
  };
});

const prismiumExplosion = new Effect(25, e => {
  for(let h in fromColor){
    Draw.color(fromColor[h], toColor[h], e.fin());
        Angles.randLenVectors(e.id, 1, e.finpow() * h * 4, e.rotation, 360, (x, y) => {
      Fill.circle(e.x + x, e.y + y, e.fout() * 2.5);
      Fill.circle(e.x + x, e.y + y * -1, e.fout() * 2.5);
      Fill.circle(e.x + x * -1, e.y + y * -1, e.fout() * 2.5);
      Fill.circle(e.x + x * -1, e.y + y, e.fout() * 2.5);
        });
      Draw.alpha(0.5 * e.fout())
      Fill.circle(e.x, e.y, e.fin() * 3 * h); 
  };
});

const plastDust = new Effect(55, e => {
    Draw.color(Pal.plastaniumFront, Pal.plastaniumBack, e.fin());
    const d = new Floatc2({get(x, y){
    Lines.stroke(e.fout());
        Lines.lineAngle(e.x + x, e.y + y, 360, e.fout() * 4);
     }})
    Angles.randLenVectors(e.id, 35, e.fin() * 25, e.rotation, 360,d)
});

const blastShockwave = new Effect(45, e => {
    Draw.color(Color.red, Color.yellow, e.fslope());
    Lines.stroke(e.fout() * 4); 
    Lines.circle(e.x, e.y, e.fin() * 35); 
    Lines.stroke(e.fout() * 8); 
    Lines.circle(e.x, e.y, e.fin() * 25); 
    Draw.color(Color.white, Color.black, e.fslope());
    Lines.stroke(e.fout() * 3); 
    Lines.circle(e.x, e.y, e.fin() * 45); 
});

const fireBlast = new Effect(25, e => {
    Draw.color(Color.orange, Color.yellow, e.fslope());
    Lines.stroke(e.fout() * 3); 
    Lines.circle(e.x, e.y, e.fin() * 45); 
    Lines.stroke(e.fout() * 6); 
    Lines.circle(e.x, e.y, e.fin() * 55); 
    Draw.color(Color.red, Color.orange, e.fslope());
    Lines.stroke(e.fout() * 3); 
    Lines.circle(e.x, e.y, e.fin() * 45); 
    Angles.randLenVectors(e.id, 35, e.finpow() * 30, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.5);
  })
});

const sporeCooldown = new Effect(90, e => {
    Draw.color(Color.purple, Pal.spore, e.fslope());
    Lines.stroke(e.fout() * 6); 
    Lines.circle(e.x, e.y, e.fin() * 15); 
    Lines.stroke(e.fout() * 3); 
    Lines.circle(e.x, e.y, e.fin() * 25); 
    Angles.randLenVectors(e.id, 25, e.finpow() * 30, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.5);  
  })
});


const surgeShockwave = new Effect(50, e => {
    Draw.color(Color.white, Pal.surge, e.fin());
    Lines.stroke(e.fout() * 6); 
    Lines.circle(e.x, e.y, e.fin() * 25); 
    Lines.stroke(e.fout() * 10); 
    Lines.circle(e.x, e.y, e.fin() * 15); 
    Angles.randLenVectors(e.id, 10, e.finpow() * 30, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.5);
        
  })
});


      
const prismium = new StatusEffect("prismium");
prismium.speedMultiplier = 1;
prismium.healthMultiplier = 1;
prismium.damageMultiplier = 0.75;
prismium.damage = 0.5;
prismium.effect = prismiumFX;
prismium.color = Color.white;

const cryoSpray = new Effect(35, e => {
    Draw.color(Color.cyan, Color.valueOf("6ecdec"), e.fin());
    Angles.randLenVectors(e.id, 25, e.finpow() * 30, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.5);
  })
});

const plastExplFrag = extend(BasicBulletType, {});
plastExplFrag.damage = 15;
plastExplFrag.width = 6;
plastExplFrag.height = 8;
plastExplFrag.pierce = true;
plastExplFrag.lifetime = 25;
plastExplFrag.incendAmount = 0;
plastExplFrag.despawnEffect = Fx.none;
plastExplFrag.hitEffect = Fx.none;
plastExplFrag.shrinkY = 1;
plastExplFrag.backColor = Pal.plastaniumBack;
plastExplFrag.frontColor = Pal.plastaniumFront;

const explosionFrag2 = extend(BasicBulletType, {});
explosionFrag2.damage = 15;
explosionFrag2.width = 6;
explosionFrag2.height = 8;
explosionFrag2.pierce = true;
explosionFrag2.knockback = 5;
explosionFrag2.lifetime = 25;
explosionFrag2.incendAmount = 0;
explosionFrag2.despawnEffect = Fx.none;
explosionFrag2.hitEffect = Fx.none;
explosionFrag2.shrinkY = 1;
explosionFrag2.backColor = Color.white;
explosionFrag2.frontColor = Pal.surge;

const sporeFrag = extend(BasicBulletType, {});
sporeFrag.damage = 1;
sporeFrag.width = 6;
sporeFrag.height = 8;
sporeFrag.pierce = true;
sporeFrag.knockback = -1;
sporeFrag.status = StatusEffects.sporeSlowed;
sporeFrag.lifetime = 25;
sporeFrag.incendAmount = 0;
sporeFrag.despawnEffect = Fx.none;
sporeFrag.hitEffect = Fx.none;
sporeFrag.shrinkY = 1;
sporeFrag.backColor = Color.purple;
sporeFrag.frontColor = Pal.spore

const sporeCluster = extend(BombBulletType, {
    update(b){
        if(Mathf.random(1) < 0.5){
            sporeFrag.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(2));
        }
    }
});
sporeCluster.splashDamageRadius = 15;
sporeCluster.splashDamage = 10;
sporeCluster.width = 0;
sporeCluster.height = 0;
sporeCluster.lifetime = 60;
sporeCluster.status = StatusEffects.sapped;
sporeCluster.despawnEffect = Fx.none;
sporeCluster.hitEffect = Fx.none;
sporeCluster.hommingPower = 1;
sporeCluster.fragBullets = 15;
sporeCluster.fragBullet = sporeFrag;
sporeCluster.hitSound = Sounds.none;


const cryoLiquid = extend(LiquidBulletType, {});
cryoLiquid.liquid = Liquids.cryofluid;
cryoLiquid.lifetime = 10;
cryoLiquid.fragBullet = Bullets.standardCopper;

const cryoGush = extend(LiquidBulletType, {});
cryoGush.liquid = Liquids.cryofluid;
cryoGush.lifetime = 35;
cryoGush.fragBullet = Bullets.standardCopper;

const lightning1 = extend(LightningBulletType, {});
lightning1.damage = 25;
lightning1.lightningLength = 8;
lightning1.lifetime = 50;
lightning1.lightningColor = Pal.surge;

const lightning2 = extend(LightningBulletType, {});
lightning2.damage = 25;
lightning2.lightningLength = 10;
lightning2.lifetime = 50;
lightning2.lightningColor = Color.yellow;

const coalExplosion = extend(BombBulletType, {});
coalExplosion.splashDamageRadius = 25;
coalExplosion.splashDamage = 25;
coalExplosion.lifetime = 0;
coalExplosion.incendAmount = 0;
coalExplosion.status = StatusEffects.burning;
coalExplosion.despawnEffect = Fx.explosion;
coalExplosion.hitEffect = Fx.explosion;

const pyraExplosion = extend(BombBulletType, {});
pyraExplosion.splashDamageRadius = 45;
pyraExplosion.splashDamage = 10;
pyraExplosion.lifetime = 0;
pyraExplosion.incendAmount = 25;
pyraExplosion.status = StatusEffects.burning;
pyraExplosion.despawnEffect = Fx.fire;
pyraExplosion.hitEffect = Fx.fire;

const blastExplosion = extend(BombBulletType, {});
blastExplosion.splashDamageRadius = 35;
blastExplosion.splashDamage = 85;
blastExplosion.lifetime = 0;
blastExplosion.incendAmount = 0;
blastExplosion.status = StatusEffects.burning;
blastExplosion.despawnEffect = Fx.blastExplosion;
blastExplosion.hitEffect = Fx.blastExplosion;

const plastExplosion = extend(BombBulletType, {});
plastExplosion.splashDamageRadius = 25;
plastExplosion.splashDamage = 55;
plastExplosion.lifetime = 0;
plastExplosion.incendAmount = 0;
plastExplosion.despawnEffect = plastDust;
plastExplosion.hitEffect = plastDust;
plastExplosion.fragBullets = 25;
plastExplosion.fragBullet = plastExplFrag;

const cryoExplosion = extend(BombBulletType, {
    update(b){
        if(Mathf.random(1) < 0.8){
            cryoLiquid.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(0.5));
        }
    }
});
cryoExplosion.splashDamageRadius = 35;
cryoExplosion.splashDamage = 15;
cryoExplosion.width = 0;
cryoExplosion.height = 0;
cryoExplosion.lifetime = 60;
cryoExplosion.status = StatusEffects.freezing
cryoExplosion.despawnEffect = cryoSpray;
cryoExplosion.hitEffect = cryoSpray;
cryoExplosion.hitSound = Sounds.none;

const cryoLeak = extend(BombBulletType, {
    update(b){
        if(Mathf.random(1) < 0.8){
            cryoGush.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(1));
        }
    }
});
cryoLeak.splashDamageRadius = 35;
cryoLeak.splashDamage = 35;
cryoLeak.width = 0;
cryoLeak.height = 0;
cryoLeak.lifetime = 100;
cryoLeak.status = StatusEffects.freezing
cryoLeak.despawnEffect = cryoSpray;
cryoLeak.hitEffect = cryoSpray;
cryoLeak.hitSound = Sounds.none;

const sporeExplosion = extend(BombBulletType, {});
sporeExplosion.splashDamageRadius = 35;
sporeExplosion.splashDamage = 15;
sporeExplosion.lifetime = 0;
sporeExplosion.incendAmount = 0;
sporeExplosion.despawnEffect = Fx.none;
sporeExplosion.hitEffect = Fx.none;
sporeExplosion.fragBullets = 4;
sporeExplosion.fragBullet = sporeCluster;
sporeExplosion.hitSound = Sounds.none;


const explosion7p1 = extend(BombBulletType, {});
explosion7p1.splashDamageRadius = 25;
explosion7p1.splashDamage = 15;
explosion7p1.lifetime = 0;
explosion7p1.despawnEffect = Fx.none;
explosion7p1.hitEffect = Fx.none;
explosion7p1.fragBullets = 3;
explosion7p1.fragBullet = lightning1;
explosion7p1.hitSound = Sounds.none;

const explosion7p2 = extend(BombBulletType, {});
explosion7p2.splashDamageRadius = 35;
explosion7p2.splashDamage = 15;
explosion7p2.lifetime = 0;
explosion7p2.despawnEffect = Fx.none;
explosion7p2.hitEffect = Fx.none;
explosion7p2.fragBullets = 2;
explosion7p2.fragBullet = lightning2;
explosion7p2.hitSound = Sounds.none;

const explosion7p3 = extend(BombBulletType, {});
explosion7p3.splashDamageRadius = 10;
explosion7p3.splashDamage = 15;
explosion7p3.lifetime = 0;
explosion7p3.despawnEffect = Fx.none;
explosion7p3.hitEffect = Fx.none;
explosion7p3.fragBullets = 25;
explosion7p3.fragBullet = explosionFrag2;
explosion7p3.hitSound = Sounds.none;

const prismaticBlast = extend(BombBulletType, {});
prismaticBlast.splashDamageRadius = 60;
prismaticBlast.splashDamage = 50;
prismaticBlast.lifetime = 0;
prismaticBlast.status = prismium;
prismaticBlast.despawnEffect = prismiumExplosion;
prismaticBlast.hitEffect = prismiumExplosion;
prismaticBlast.hitSound = Sounds.none;
prismaticBlast.statusDuration = 24000;

const prisBullets = [coalExplosion,pyraExplosion,blastExplosion,plastExplosion,sporeExplosion,cryoExplosion,explosion7p1,explosion7p2,explosion7p3,prismaticBlast];

const prismaticCrystal = extend(BombBulletType, {
    update(b){
        if(Mathf.random() < 0.1){
                prisBullets[ Mathf.round(Mathf.random(9)) ].create(b.owner, b.team, b.x + Mathf.random(80) - 40, b.y + Mathf.random(80) - 40, Mathf.random(360), Mathf.random(0.5));
                prismiumFX.at(b.x, b.y);
        }
    }
});
prismaticCrystal.splashDamageRadius = 25;
prismaticCrystal.splashDamage = 55;
prismaticCrystal.lifetime = 480;
prismaticCrystal.incendAmount = 0;
prismaticCrystal.despawnEffect = prismiumFX;
prismaticCrystal.hitEffect = prismiumFX;
prismaticCrystal.hitSound = Sounds.click;

const bombT1m1 = extendContent(ShockMine, "bombT1m1", {
      icons(){
    return [
      Core.atlas.find("pixelcraft-mineT1m1")
    ];
  },
  setStats(){
    this.super$setStats();
    this.stats.add(Stat.range, "25");
    this.stats.add(Stat.reload, "1")
    this.stats.add(Stat.damage, "25");
    }
});

bombT1m1.buildType = () => extendContent(ShockMine.ShockMineBuild, bombT1m1, {
	unitOn(b){
        if(b.team != this.team){
            if (this.timer.get(0, mediumCooldown)) {
                coalExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
                Fx.fire.at(this.x, this.y);
                this.damage(this.maxHealth / 1.1);
            }
        }
    },
    onDestroyed(){
    this.super$onDestroyed();
    pyraExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
    //this.kill()
    this.remove()
    }
});

const bombT1m2 = extendContent(ShockMine, "bombT1m2", {
  icons(){
    return [
      Core.atlas.find("pixelcraft-mineT1m2")
    ];
  },
  setStats(){
    this.super$setStats();
    this.stats.add(Stat.range, "45");
    this.stats.add(Stat.reload, "3")
    this.stats.add(Stat.damage, "10");
    }
});

bombT1m2.buildType = () => extendContent(ShockMine.ShockMineBuild, bombT1m2, {
	unitOn(b){
        if(b.team != this.team){
            if (this.timer.get(0, shortCooldown)) {
                pyraExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
                fireBlast.at(this.x, this.y);
                this.damage(this.maxHealth / 25);
            }
        }
    }
});

const bombT1m3 = extendContent(ShockMine, "bombT1m3", {
  icons(){
    return [
      Core.atlas.find("pixelcraft-mineT1m3")
    ];
  },
  setStats(){
    this.super$setStats();
    this.stats.add(Stat.range, "35");
    this.stats.add(Stat.reload, "3")
    this.stats.add(Stat.damage, "85");
    }
});

bombT1m3.buildType = () => extendContent(ShockMine.ShockMineBuild, bombT1m3, {
	unitOn(b){
        if(b.team != this.team){
            if (this.timer.get(0, shortCooldown)){
                blastExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
                blastShockwave.at(this.x, this.y);
                this.damage(this.maxHealth / 15);
            }
        }
    }
});

const bombT1m4 = extendContent(ShockMine, "bombT1m4", {
  icons(){
    return [
      Core.atlas.find("pixelcraft-bombT1m4")
    ];
  },
  setStats(){
    this.super$setStats();
    this.stats.add(Stat.range, "25");
    this.stats.add(Stat.reload, "2")
    this.stats.add(Stat.damage, "55");
    }
});

bombT1m4.buildType = () => extendContent(ShockMine.ShockMineBuild, bombT1m4, {
	unitOn(b){
        if (this.timer.get(0, smallCooldown)) {
        if(b.team != this.team){
                this.damage(this.maxHealth / 30);
            }
            plastExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
            plastDust.at(this.x, this.y);
        }
    }
});

const bombT1m5 = extendContent(ShockMine, "bombT1m5", {
  icons(){
    return [
      Core.atlas.find("pixelcraft-bombT1m5")
    ];
  },
  setStats(){
    this.super$setStats();
    this.stats.add(Stat.range, "25");
    this.stats.add(Stat.reload, "0.5")
    this.stats.add(Stat.damage, "30");
    }
});



bombT1m5.buildType = () => extendContent(ShockMine.ShockMineBuild, bombT1m5, {
	unitOn(b){
        if (this.timer.get(0, longCooldown)) {
        if(b.team != this.team){
                this.damage(this.maxHealth / 10);
            }
            sporeExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(5));
            sporeCooldown.at(this.x, this.y);
        }
    }
});


const bombT1m6 = extendContent(ShockMine, "bombT1m6", {
  icons(){
    return [
      Core.atlas.find("pixelcraft-bombT1m6")
    ];
  },
  setStats(){
    this.super$setStats();
    this.stats.add(Stat.range, "30");
    this.stats.add(Stat.reload, "0.25")
    this.stats.add(Stat.damage, "15");
    }
});
cryoGush
bombT1m6.buildType = () => extendContent(ShockMine.ShockMineBuild, bombT1m6, {
	unitOn(b){
        if (this.timer.get(0, extrememlyLongCooldown)) {
        if(b.team != this.team){
                this.damage(this.maxHealth / 100);
            }
            cryoExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
            cryoSpray.at(this.x, this.y);
        }
    },
    onDestroyed(){
    this.super$onDestroyed();
    cryoLeak.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
    //this.kill()
    this.remove()
    }
});

const bombT1m7 = extendContent(ShockMine, "bombT1m7", {
  icons(){
    return [
      Core.atlas.find("pixelcraft-bombT1m7")
    ];
  },
  setStats(){
    this.super$setStats();
    this.stats.add(Stat.range, "30");
    this.stats.add(Stat.reload, "1")
    this.stats.add(Stat.damage, "125");
    }
});

bombT1m7.buildType = () => extendContent(ShockMine.ShockMineBuild, bombT1m7, {
	unitOn(b){
        if (this.timer.get(0, mediumCooldown)) {
        if(b.team != this.team){
                this.damage(this.maxHealth / 50);
            }
            explosion7p1.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
            explosion7p2.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
            explosion7p3.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
            surgeShockwave.at(this.x, this.y);
            Sounds.spark.at(this.x, this.y);
        }
    }
});

const bombT1m8 = extendContent(ShockMine, "bombT1m8", {
  icons(){
    return [
      Core.atlas.find("pixelcraft-bombT1m8")
    ];
  },
  setStats(){
    this.super$setStats();
    this.stats.add(Stat.range, "55");
    this.stats.add(Stat.reload, "0.125")
    this.stats.add(Stat.damage, "100/12000");
    }
});

bombT1m8.buildType = () => extendContent(ShockMine.ShockMineBuild, bombT1m8, {
	unitOn(b){
        if (this.timer.get(0, extrememlyLongCooldown)) {
        if(b.team != this.team){
                this.damage(this.maxHealth / 5);
            }
            coalExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
            pyraExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
            blastExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
            plastExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
            cryoExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
            sporeExplosion.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
            explosion7p1.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
            explosion7p2.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
            explosion7p3.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
            prismaticCrystal.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
            surgeShockwave.at(this.x, this.y);
            cryoSpray.at(this.x, this.y);
            fireBlast.at(this.x, this.y)
            blastShockwave.at(this.x, this.y)
            sporeCooldown.at(this.x, this.y)
            prismiumShockwave.at(this.x, this.y)
            Sounds.sap.at(this.x, this.y);
            Sounds.spark.at(this.x, this.y);
            Sounds.explosion.at(this.x, this.y);
        }
    }
});
module.exports = {
    prisBullets: prisBullets
};