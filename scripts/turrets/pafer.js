const Pfx = require("libs/paferEffects");

const lightning = extend(LightningBulletType, {
    damage: 5,
    lightningLength: 7
});

const seekerFrag = extend(BasicBulletType, {
    damage: 10,
    homingPower: 0.1,
    buildingDamageMultiplier: 0.25,
    frontColor: Color.valueOf("86baf9"),
    backColor: Color.valueOf("719df4"),
    hitShake: 0,
    drag: 0.05,
    hitSound: Sounds.none,
    pierce: false,
    collidesAir: true,
    reflectable: false,
    hittable: false,
    absorbable: false
});
const seeker = extend(BasicBulletType, {
    damage: 20,
    homingPower: 0.05,
    buildingDamageMultiplier: 0.25,
    frontColor: Color.valueOf("86baf9"),
    backColor: Color.valueOf("719df4"),
    hitShake: 0,
    drag: 0.03,
    hitSound: Sounds.none,
    pierce: false,
    collidesAir: true,
    reflectable: false,
    hittable: false,
    absorbable: false
});

const redSeeker = extend(BasicBulletType, {
    damage: 5,
    homingPower: 0.01,
    buildingDamageMultiplier: 0.25,
    frontColor: Color.white,
    backColor: Color.red,
    hitShake: 0,
    drag: 0.05,
    hitSound: Sounds.none,
    pierce: false,
    collidesAir: true,
    reflectable: false,
    hittable: false,
    absorbable: false
});

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
    draw(b){},
    lifeimte: 160,
    collidesAir: true,
    reflectable: false,
    hittable: false,
    absorbable: false
});


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
    draw(b){},
    lifeimte: 120,
    collidesAir: true,
    reflectable: false,
    hittable: false,
    absorbable: false
});

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
    draw(b){},
    lifeimte: 40,
    collidesAir: true,
    reflectable: false,
    hittable: false,
    absorbable: false
});

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
    draw(b){},
lifeimte: 40,
collidesAir: true,
reflectable: false,
hittable: false,
absorbable: false
});

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
    draw(b){
        Draw.color(Color.white, ballColours[0], b.fslope());
        Fill.circle(b.x, b.y, 3);
        Draw.color(Color.valueOf("0A01b7"), Color.valueOf("56D7CA"), b.fslope());
        Fill.circle(b.x, b.y, 2);
    },
    damage: 250,
    splashDamage: 100,
    homingRange: 20,
    homingPower: 0.1,
    speed: 2,
    lifetime: 400,
    trailEffect: Fx.none,
    shootEffect: Pfx.shootFX,
    collidesTiles: true,
    collidesAir: true,
    reflectable: false,
    hittable: false,
    absorbable: false
});

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
    draw(b){
        Draw.color(Color.white, ballColours[1], b.fslope());
        Fill.circle(b.x, b.y, 3);
        Draw.color(Color.valueOf("0A01b7"), Color.valueOf("ff341c"), b.fslope());
        Fill.circle(b.x, b.y, 2);
    },
    damage: 250,
    splashDamage: 100,
    homingRange: 100,
    homingPower: 1,
    speed: 2,
    lifetime: 400,
    trailEffect: Fx.none,
    shootEffect: Pfx.shootFX,
    collidesTiles: true,
    collidesAir: true,
    reflectable: false,
    hittable: false,
    absorbable: false
});

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
    this.region = Core.atlas.find(this.name);
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
        
        shot2.create(this, this.team, this.x + Math.cos(rot1/180 * Math.PI) * shootOffset,  this.y + Math.sin(rot1/180 * Math.PI) * shootOffset, this.rotation - 5, shot2.speed * 0.5);
        shot2.create(this, this.team, this.x - Math.cos(rot1/180 * Math.PI) * shootOffset, this.y - Math.sin(rot1/180 * Math.PI) * shootOffset, this.rotation + 5, shot2.speed * 0.5);
    },
    draw(){
        let rot1 = this.rotation - 90;
        let shootOffset = this.heat * 5 - 0.05;
        Draw.rect(electricTurret5b1.baseRegion, this.x, this.y, 0);
        
        if(this.heat > 0.01){
        
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
        else{
            Draw.rect(electricTurret5b1.region, this.x, this.y, this.rotation - 90);
        }
    }
});