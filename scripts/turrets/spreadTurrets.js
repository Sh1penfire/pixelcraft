const fc = require("libs/fc");
const voidicsm = require("extras/voidicsm");

const spreadTurret1 = extendContent(ItemTurret, "spreadTurret1", {});

spreadTurret1.buildType = () => extend(ItemTurret.ItemTurretBuild, spreadTurret1, {
    shoot(type){
        let timer = 0;
        while(timer < 8){
            type.create(this, this.team, this.x, this.y, this.rotation + 45 * timer, type.speed);
            timer++
        }
        this.effects();
        this.useAmmo();
        }
});

const spreadTurret2 = extendContent(ItemTurret, "spreadTurret2", {});

spreadTurret2.buildType = () => extend(ItemTurret.ItemTurretBuild, spreadTurret2, {
    shoot(type){
        let var1 = 0;
        let timer = 0;
        while(timer < 2){
        type.create(this, this.team, this.x, this.y, this.rotation + 45 * var1, type.speed * 1.6);
        var1++
        type.create(this, this.team, this.x, this.y, this.rotation + 45 * var1, type.speed);
        var1++
        type.create(this, this.team, this.x, this.y, this.rotation + 45 * var1, type.speed * 1.2);
        var1++
        type.create(this, this.team, this.x, this.y, this.rotation + 45 * var1, type.speed * 0.8);
        var1++
        timer++
        }
        this.effects();
        this.useAmmo();
        }
});

const spreadTurret3 = extendContent(ItemTurret, "spreadTurret3", {});

spreadTurret3.buildType = () => extend(ItemTurret.ItemTurretBuild, spreadTurret3, {
    shoot(type){
        let timer = 0;
        while(timer < 8){
            type.create(this, this.team, this.x, this.y, this.rotation + 45 * timer, type.speed);
            type.create(this, this.team, this.x, this.y, this.rotation + 45 * timer, type.speed * 0.8);
            type.create(this, this.team, this.x, this.y, this.rotation + 45 * timer, type.speed * 1.2);
            timer++
        }
        this.effects();
        this.useAmmo();
        }
});

const ironShotback = extend(BasicBulletType, {
    damage: 45,
    speed: 1,
    pierce: true,
    homingPower: 0.03,
    lifetime: 125,
    statusDuration: 60,
    shrinkY: 1,
    update(b){
        if(Mathf.chance(Time.delta)){
            this.super$update(b);
            b.vel.setAngle(b.rotation() - 3 * b.fin());
        }
    },
    despawned(b){
        
    }
});

const ironShot4 = extend(BasicBulletType, {
    damage: 45,
    speed: 1,
    pierce: true,
    homingPower: 0.03,
    lifetime: 125,
    statusDuration: 60,
    fragBullet: ironShotback,
    fragBullets: 0,
    despawned(b){
        ironShotback.create(b.owner, b.team, b.x, b.y, b.rotation() + 180, 1);
    },
    update(b){
        if(Mathf.chance(Time.delta)){
            this.super$update(b);
            b.vel.setAngle(b.rotation() - 4 * b.fin() + 2);
        }
    }
});

const magnitineShotback = extend(BasicBulletType, {
    damage: 75,
    speed: 1,
    pierce: true,
    homingPower: 0.03,
    lifetime: 125,
    statusDuration: 60,
    shrinkY: 1,
    update(b){
        if(Mathf.chance(Time.delta)){
            this.super$update(b);
            b.vel.setAngle(b.rotation() - 1);
        }
    },
    despawned(b){
        
    }
});

magnitineShotback.width = 15;
magnitineShotback.heigh = 12;

const magnitineShot4 = extend(BasicBulletType, {
    damage: 75,
    speed: 1,
    pierce: true,
    homingPower: 0.03,
    lifetime: 125,
    statusDuration: 60,
    fragBullet: magnitineShotback,
    fragBullets: 0,
    despawned(b){
        magnitineShotback.create(b.owner, b.team, b.x, b.y, b.rotation() + 180, 1);
    },
    update(b){
        if(Mathf.chance(Time.delta)){
            this.super$update(b);
            b.vel.setAngle(b.rotation() + 1);
        }
    }
});

magnitineShot4.width = 15;
magnitineShot4.length = 12;

const spreadTurret4 = extendContent(ItemTurret, "spreadTurret4", {
      init(){
    this.ammo(
        voidicsm.rust, ironShot4,
        voidicsm.magnitine, magnitineShot4
    );
    this.super$init();
  },
  setStats(){
    this.super$setStats();
  }
});

spreadTurret4.buildType = () => extend(ItemTurret.ItemTurretBuild, spreadTurret4, {
    shoot(type){
        let timer = 0;
        while(timer < 8){
            type.create(this, this.team, this.x, this.y, this.rotation + 45 * timer, type.speed * 1.25);
            type.fragBullet.create(this, this.team, this.x, this.y, this.rotation + 45 * timer + 22.5, type.speed * 0.75);
            timer++
        }
        this.effects();
        this.useAmmo();
        }
});