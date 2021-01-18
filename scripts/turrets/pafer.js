const Pfx = require("libs/paferEffects");

const lightning = extend(LightningBulletType, {});
lightning.damage = 10;
lightning.lightningLength = 7;

const seekerFrag = extend(BasicBulletType, {});
seekerFrag.damage = 10;
seekerFrag.homingPower = 0.1;
seekerFrag.buildingDamageMultiplier = 0.25;
seekerFrag.frontColor = Color.valueOf("86baf9");
seekerFrag.backColor = Color.valueOf("719df4");
seekerFrag.pierce = false;
seekerFrag.hitShake = 0;
seekerFrag.drag = 0.05;
seekerFrag.hitSound = Sounds.none;
seekerFrag.pierce = false;
seekerFrag.collidesAir = true;
seekerFrag.reflectable = false;
seekerFrag.hittable = false;
seekerFrag.absorbable = false;

const seeker = extend(BasicBulletType, {});
seeker.damage = 20;
seeker.homingPower = 0.05;
seeker.buildingDamageMultiplier = 0.25;
seeker.frontColor = Color.valueOf("86baf9");
seeker.backColor = Color.valueOf("719df4");
seeker.pierce = false;
seeker.hitShake = 0;
seeker.drag = 0.03;
seeker.hitSound = Sounds.none;
seeker.pierce = false;
seeker.collidesAir = true;
seeker.reflectable = false;
seeker.hittable = false;
seeker.absorbable = false;

const redSeeker = extend(BasicBulletType, {});
redSeeker.damage = 5;
redSeeker.homingPower = 0.01;
redSeeker.homingPower = 0.01;
redSeeker.buildingDamageMultiplier = 0.25;
redSeeker.frontColor = Color.white;
redSeeker.backColor = Color.red;
redSeeker.pierce = false;
redSeeker.hitShake = 0;
redSeeker.drag = 0.05;
redSeeker.hitSound = Sounds.none;
redSeeker.pierce = false;
redSeeker.collidesAir = true;
redSeeker.reflectable = false;
redSeeker.hittable = false;
redSeeker.absorbable = false;

const balloLight = extend(ArtilleryBulletType, {
    update(b){
        if(Mathf.chance(Time.delta)){
                    var target = Units.closestEnemy(b.team, b.x, b.y, 160, u => u.checkTarget(true, true));
                    if(target != null){
                        seeker.create(b.owner, b.team, b.x, b.y, b.angleTo(target), 8);
                    }
                    else{
                        seeker.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(3));
                    }
            lightning.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(360));
            
        }
    },
    draw(b){
        
    }
});
balloLight.lifeimte = 160;
balloLight.collidesAir = true;
balloLight.reflectable = false;
balloLight.hittable = false;
balloLight.absorbable = false;

const balloCross = extend(ArtilleryBulletType, {
    update(b){
        if(Mathf.chance(Time.delta)){
                    var target = Units.closestEnemy(b.team, b.x, b.y, 160, u => u.checkTarget(true, true));
                    if(target != null){
                        redSeeker.create(b.owner, b.team, b.x, b.y, b.angleTo(target) - 90 * b.fout(), 6);
                        redSeeker.create(b.owner, b.team, b.x, b.y, b.angleTo(target) + 90 * b.fout(), 6);
                    }
                    else{
                        redSeeker.create(b.owner, b.team, b.x, b.y, b.fout() * 360 - b.rotation(), 4);
                        redSeeker.create(b.owner, b.team, b.x, b.y, b.fin() * 360 - b.rotation(), 4);
                    }
            lightning.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(360));
            
        }
    },
    draw(b){
        
    }
});
balloCross.lifeimte = 120;
balloCross.collidesAir = true;
balloCross.reflectable = false;
balloCross.hittable = false;
balloCross.absorbable = false;

const transition = extend(ArtilleryBulletType, {
    update(b){
        if(Mathf.chance(Time.delta * 0.25)){
            this.super$update(b);
                var target = Units.closestEnemy(b.team, b.x, b.y, 160, u => u.checkTarget(true, true));
                if(target != null){
                    seekerFrag.create(b.owner, b.team, b.x, b.y, b.angleTo(target) + Mathf.range(25 * b.fout()), 8);
                }
        }
        
    },
    despawned(b){
    Pfx.explosions.at(b.x, b.y);
    balloLight.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(0));
    },
    draw(e){
    }
});

transition.lifeimte = 40;
transition.collidesAir = true;
transition.reflectable = false;
transition.hittable = false;
transition.absorbable = false;

const spreading = extend(ArtilleryBulletType, {
    update(b){
        if(Mathf.chance(Time.delta * 0.25)){
            this.super$update(b);
                var target = Units.closestEnemy(b.team, b.x, b.y, 160, u => u.checkTarget(true, true));
                if(target != null){
                    redSeeker.create(b.owner, b.team, b.x, b.y, b.angleTo(target) + Mathf.range(25 * b.fout()), 8);
                }
        }
        
    },
    despawned(b){
    Pfx.explosions2.at(b.x, b.y);
    balloCross.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(0));
    },
    draw(e){
    }
});

spreading.lifeimte = 40;
spreading.collidesAir = true;
spreading.reflectable = false;
spreading.hittable = false;
spreading.absorbable = false;

const Random = Mathf.round(Mathf.random(1));
const ballShots = [transition, spreading];
const ballShotsEffects = [Pfx.shotHit, Pfx.shotHit2];
const ballColours = [Color.valueOf("0A01b7"), Color.valueOf("ff341c")];

const shot = extend(MissileBulletType, {
    update(b){
        if(Mathf.chance(Time.delta)){
            var target = Units.closestEnemy(b.team, b.x, b.y, 120, u => u.checkTarget(true, true));
            //Units.bestTarget(b.team, b.x, b.y, 30, u => u.checkTarget(true, true), 1);
            this.super$update(b);
            if(Mathf.dst(b.x, b.y, b.owner.x, b.owner.y) > 400){
                var rotato = b.rotation() - b.owner.angleTo(b.x, b.y);
                rotato = rotato * 2;
                if(Mathf.chance(0.1)){
                    b.vel.setAngle(b.rotation() * 180 - rotato);
                }
            }
            if(target != null){
                this.hit(b);
                b.remove();
            }
        }
    },
    hit(b){
    ballShots[0].create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(0));
    ballShotsEffects[0].at(b.x, b.y);
    },
    draw(e){
        Draw.color(Color.white, ballColours[0], e.fslope());
        Fill.circle(e.x, e.y, 3);
        Draw.color(Color.valueOf("0A01b7"), Color.valueOf("56D7CA"), e.fslope());
        Fill.circle(e.x, e.y, 2);
    }
});

shot.damage = 250;
shot.splashDamage = 100;
shot.homingRange = 20
shot.homingPower = 0.1;
shot.speed = 2;
shot.lifetime = 400;
shot.trailEffect = Fx.none;
shot.shootEffect = Pfx.shootFX;
shot.trailSpacing = 5;
shot.collidesTiles = true;
shot.collidesAir = true;
shot.reflectable = false;
shot.hittable = false;
shot.absorbable = false;

const shot2 = extend(MissileBulletType, {
    update(b){
        if(Mathf.chance(Time.delta)){
            var target = Units.closestEnemy(b.team, b.x, b.y, 45, u => u.checkTarget(true, true));
            this.super$update(b);
            if(Mathf.dst(b.x, b.y, b.owner.x, b.owner.y) > 400){
                var rotato = b.rotation() - b.owner.angleTo(b.x, b.y);
                rotato = rotato * 2;
                if(Mathf.chance(0.1)){
                    b.vel.setAngle(b.rotation() * 180 - rotato);
                }
            }
            if(target != null){
                this.hit(b);
                b.remove();
            }
        }
    },
    hit(b){
    ballShots[1].create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(0));
    ballShotsEffects[1].at(b.x, b.y);
    },
    draw(e){
        Draw.color(Color.white, ballColours[1], e.fslope());
        Fill.circle(e.x, e.y, 3);
        Draw.color(Color.valueOf("0A01b7"), Color.valueOf("ff341c"), e.fslope());
        Fill.circle(e.x, e.y, 2);
    }
});

shot2.damage = 250;
shot2.splashDamage = 100;
shot2.homingRange = 100
shot2.homingPower = 1;
shot2.speed = 2;
shot2.lifetime = 400;
shot2.trailEffect = Fx.none;
shot2.shootEffect = Pfx.shootFX;
shot2.trailSpacing = 5;
shot2.collidesTiles = true;
shot2.collidesAir = true;
shot2.reflectable = false;
shot2.hittable = false;
shot2.absorbable = false;


const electricTurret5b1 = extendContent(PowerTurret, "electricTurret5b1", {
    icons(){
        return[
        Core.atlas.find("block-4"),
        Core.atlas.find("pixelcraft-electricTurret5b1")
        ];
    },
    load(){
    this.cells = [];
    this.outlinesCells = [];
    this.cellHeat = [];
    this.super$load();
    this.region2 = Core.atlas.find(this.name + "-immage");
    this.cells[0] = Core.atlas.find(this.name + "-wing1");
    this.cells[1] = Core.atlas.find(this.name + "-wing2");
        
    this.region2Outline = Core.atlas.find(this.name + "-immage-outline");
    this.outlinesCells[0] = Core.atlas.find(this.name + "-wing1-outline");
    this.outlinesCells[1] = Core.atlas.find(this.name + "-wing2-outline");
        
    this.cellHeat[0] = Core.atlas.find(this.name + "-wing1-heat");
    this.cellHeat[1] = Core.atlas.find(this.name + "-wing2-heat");
    }
});
electricTurret5b1.recoil = 0.5;
electricTurret5b1.restitution = 0.015;
electricTurret5b1.shootType = shot;
electricTurret5b1.shootShake = 1;
electricTurret5b1.reloadTime = 120;

//Ok look, I ctrl vd a bit much here but at least I can say I know what I'm doing :D
electricTurret5b1.buildType = () => extendContent(PowerTurret.PowerTurretBuild, electricTurret5b1, {
    shoot(type){
        this.super$shoot(type);
        let rot1 = this.rotation - 90;
        let shootOffset = 8 - 0.05;
        
        shot2.create(this, this.team, this.x + Math.cos(rot1/180 * Math.PI) * shootOffset,  this.y + Math.sin(rot1/180 * Math.PI) * shootOffset, this.rotation, shot2.speed * 0.5);
        shot2.create(this, this.team, this.x - Math.cos(rot1/180 * Math.PI) * shootOffset, this.y - Math.sin(rot1/180 * Math.PI) * shootOffset, this.rotation, shot2.speed * 0.5);
    },
    draw(){
        let rot1 = this.rotation - 90;
        let shootOffset = this.heat * 6 - 0.05;
        
        Draw.rect(electricTurret5b1.baseRegion, this.x, this.y, 0);
        
        Draw.rect(electricTurret5b1.region2Outline, this.x, this.y, this.rotation - 90);
        
        Draw.rect(electricTurret5b1.outlinesCells[0], this.x + Math.cos(rot1/180 * Math.PI) * shootOffset,  this.y + Math.sin(rot1/180 * Math.PI) * shootOffset, this.rotation - 90);
        
        Draw.rect(electricTurret5b1.outlinesCells[1], this.x - Math.cos(rot1/180 * Math.PI) * shootOffset, this.y - Math.sin(rot1/180 * Math.PI) * shootOffset, this.rotation - 90);
        
        Draw.z(Layer.turret);

        Draw.rect(electricTurret5b1.cells[0], this.x + Math.cos(rot1/180 * Math.PI) * shootOffset,  this.y + Math.sin(rot1/180 * Math.PI) * shootOffset, this.rotation - 90);
        
        Draw.rect(electricTurret5b1.cells[1], this.x - Math.cos(rot1/180 * Math.PI) * shootOffset, this.y - Math.sin(rot1/180 * Math.PI) * shootOffset, this.rotation - 90);
        
        Draw.alpha(0.5 * this.heat);
        
        Draw.color(Color.valueOf("f08913"), Color.white, this.heat);
        
        Draw.rect(electricTurret5b1.cellHeat[0], this.x + Math.cos(rot1/180 * Math.PI) * shootOffset,  this.y + Math.sin(rot1/180 * Math.PI) * shootOffset, this.rotation - 90);
        
        Draw.rect(electricTurret5b1.cellHeat[1], this.x - Math.cos(rot1/180 * Math.PI) * shootOffset, this.y - Math.sin(rot1/180 * Math.PI) * shootOffset, this.rotation - 90);
        
        Draw.color(Color.white, Color.white, 1);
        
        Draw.rect(electricTurret5b1.region2, this.x, this.y, this.rotation - 90);
    }
});