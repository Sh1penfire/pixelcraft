const shortCooldown = 20;

const explosion1 = extend(BombBulletType, {});
explosion1.splashDamageRadius = 25;
explosion1.splashDamage = 25;
explosion1.lifetime = 0;
explosion1.incendAmount = 0;
explosion1.despawnEffect = Fx.explosion;

const explosion2 = extend(BombBulletType, {});
explosion2.splashDamageRadius = 45;
explosion2.splashDamage = 10;
explosion2.lifetime = 0;
explosion2.incendAmount = 25;
explosion2.despawnEffect = Fx.fire;

const explosion3 = extend(BombBulletType, {});
explosion3.splashDamageRadius = 35;
explosion3.splashDamage = 85;
explosion3.lifetime = 0;
explosion3.incendAmount = 0;
explosion3.despawnEffect = Fx.blastExplosion ;


const bombT1m1 = extendContent(ShockMine, "bombT1m1", {
      icons(){
    return [
      Core.atlas.find("pixelcraft-mineT1m1")
    ];
  },
  setStats(){
    this.super$setStats();
    this.stats.add(Stat.range, "25");
    this.stats.add(Stat.damage, "25");
    }
});

bombT1m1.buildType = () => extendContent(ShockMine.ShockMineBuild, bombT1m1, {
	unitOn(b){
        if(b.team != this.team){
            explosion1.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
            Fx.explosion.at(this.x, this.y)
            this.kill()
        }
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
    this.stats.add(Stat.damage, "10");
    }
});

bombT1m2.buildType = () => extendContent(ShockMine.ShockMineBuild, bombT1m2, {
	unitOn(b){
        if(b.team != this.team){
            if (this.timer.get(0, shortCooldown)) {
                explosion2.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
                Fx.fire.at(this.x, this.y);
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
    this.stats.add(Stat.damage, "85");
    }
});

bombT1m3.buildType = () => extendContent(ShockMine.ShockMineBuild, bombT1m3, {
	unitOn(b){
        if(b.team != this.team){
            if (this.timer.get(0, shortCooldown)) {
                explosion3.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(2));
                Fx.blastExplosion.at(this.x, this.y);
                this.damage(this.maxHealth / 5);
            }
        }
    }
});
