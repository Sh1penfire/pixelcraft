const statuses = require("libs/statuses");
const fc = require("libs/fc");
const extras = require("extras/voidicsm");
const bombs = require("blocks/bombs")
const voidicsm = require("extras/voidicsm");
const firinDistance = 5;

const darknessTrail = new Effect(35, e => {
  Draw.color(Color.black, Pal.darkMetal, e.fin());
    Draw.z(Layer.bullet);
    Lines.stroke(Math.abs(fc.helix(8, 5, e.fout())));
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * firinDistance,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * firinDistance);
});

const darkestTrail = new Effect(65, e => {
    Draw.color(Color.black, Pal.darkMetal, e.fin());
    Draw.z(Layer.bullet)
    Lines.stroke(Math.abs(fc.helix(10, 12, e.fout())));
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * firinDistance,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * firinDistance);
});

const shadowShot = new Effect(45, e => {
    Draw.color(Color.black, Color.black, e.fin());
    Angles.randLenVectors(e.id, 5, e.finpow() * 8, e.rotation, 360, (x, y) => {
        Fill.circle(e.x + x, e.y + y, 2 - e.finpow() * 2);
    })
    Draw.color(Color.black, Pal.darkMetal, e.fout());
    Lines.stroke(e.fslope() * 3); 
    Lines.circle(e.x, e.y, e.finpow() * 12.5); 
});
//essentualy just compressed blackout voided status effect code
const shadowHit = new Effect(65, e => {
    Draw.color(Color.black, Color.black, e.fout());
    Lines.stroke(e.fout() * 6); 
    let alpha = 1 -Math.sin(e.fout() * Math.PI + Math.PI/3);
    Draw.alpha(alpha);
    Lines.stroke(e.fout() * 2 + Math.sin(e.fin() * 4 * Math.PI));
    let scaling = -Math.sin(e.fout() * e.fout() * Math.PI + Math.PI/3);
    let fromColor = Color.valueOf("#9c7ae1"), toColor = Color.valueOf("#231841");
    fromColor.a = alpha, toColor.a = alpha;
    let multi = 75;
    Fill.light(e.x, e.y, 10, scaling * multi, fromColor, toColor);
    Drawf.light(Team.derelict, e.x, e.y, scaling, Color.valueOf("#9c7ae1"), scaling);
    Lines.circle(e.x, e.y, Math.sin(e.fin() * 9) * 25); 
    Lines.circle(e.x, e.y, e.fin() * 50);
    Angles.randLenVectors(e.id, Math.round(multi/3) , -scaling *  multi/2.25 + multi/1.8, e.rotation, 360, (x, y) => {
        Draw.color(Color.valueOf("#9c7ae1"), Color.valueOf("#231841"), Math.abs(x/30) * Math.abs(y/30) * e.fout())
        Fill.circle(e.x + x, e.y + y, e.fout() * 1.2 + Math.sin(e.fin() * 4 * Math.PI));
    });
    Angles.randLenVectors(e.id, Math.round(multi/3) , -scaling *  multi/2.25 + multi/1.8, e.rotation, 360, (x, y) => {
        Draw.color(Color.valueOf("#9c7ae1"), Color.valueOf("#231841"), Math.abs(x/30) * Math.abs(y/30) * e.fout())
        Fill.square(e.x + x, e.y + y, e.fout() * 2 + Math.sin(e.fin() * 4 * Math.PI));
    });
})

const lightTrail = new Effect(25, e => {
  Draw.color(Color.white, Pal.darkMetal, e.fin());
    Draw.z(Layer.bullet);
    Lines.stroke(Math.abs(fc.helix(6, 4, e.fout())));
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * firinDistance,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * firinDistance);
});

const brightestTrail = new Effect(125, e => {
    Draw.color(Color.white, Pal.darkMetal, e.fin());
    Draw.z(Layer.bullet)
    Lines.stroke(Math.abs(fc.helix(7, 10, e.fout())));
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * firinDistance,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * firinDistance);
});

const brightShoot = new Effect(25, e => {
    Draw.color(Color.white, Pal.darkMetal, e.fin());
    Lines.stroke(e.fout() * 3)
    Lines.circle(e.x, e.y, e.finpow() * 45)
    const d = new Floatc2({get(x, y){
        Lines.stroke(e.fout());
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x,y), e.fslope() * 8);
     }})
    Angles.randLenVectors(e.id, 17, e.fin() * 55, e.rotation, 360, d)
});

const brightHit = new Effect(125, e => {
    Draw.alpha(e.finpow())
    Draw.color(Color.white, Pal.darkMetal, e.fin());
    Lines.stroke(e.fslope() * e.fslope() * 5);
    Lines.circle(e.x, e.y, 125);
    Lines.stroke(e.fslope() * 3);
    Lines.circle(e.x, e.y, e.finpow() * 125);
    Draw.alpha(e.fout());
    Angles.randLenVectors(e.id, 5, e.fin() * 15, e.rotation, 360, (x, y) => {
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x,y), e.fslope() * 5);
    });
});

const stormTrail = new Effect(25, e => {
    Draw.color(Color.valueOf("#8083ae"), Color.valueOf("#737fae"), e.fin());
    let dx = e.data.x - e.x, dy = e.data.y - e.y;
    let stroket = Math.abs(fc.helix(6, 2, e.fout()))
    Draw.z(Layer.bullet);
    for(let i = 0; i < 5; i ++){
        Fill.circle(e.x + dx, e.y + dy, (1 - e.finpow()) * 5)
    }
    Lines.stroke(stroket);
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * firinDistance,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * firinDistance);
});

const delugeTrail = new Effect(125, e => {
    Draw.color(Color.valueOf("#9b94c5"), Color.valueOf("#8083ae"), e.fin());
    let dx = e.data.x - e.x, dy = e.data.y - e.y;
    let stroket = Math.abs(fc.helix(7, 4, e.fout()))
    Draw.z(Layer.bullet);
    for(let i = 0; i < 5; i ++){
        Fill.circle(e.x + dx/i, e.y + dy/i, e.fslope() * e.fslope() * (i + stroket));
    }
    Lines.stroke(stroket);
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * firinDistance,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * firinDistance);
});

const stormShoot = new Effect(25, e => {
    Draw.color(Color.valueOf("#8083ae"), Color.valueOf("#737fae"), e.fin());
    Lines.stroke(e.fout() * 3)
    Lines.circle(e.x, e.y, e.finpow() * 25)
    const d = new Floatc2({get(x, y){
        Lines.stroke(e.fout());
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x,y), e.fslope() * 8);
     }})
    Angles.randLenVectors(e.id, 17, e.fin() * 55, e.rotation, 360, d)
});

const stormHit = new Effect(125, e => {
    Draw.color(Color.valueOf("#8083ae"), Color.valueOf("#737fae"), e.fin());
    Draw.alpha(e.finpow())
    Lines.stroke(e.fslope() * e.fslope() * 5);
    Lines.stroke(e.fslope() * 3);
    Lines.circle(e.x, e.y, e.finpow() * 55);
    Draw.alpha(e.fout());
    Angles.randLenVectors(e.id, 10, e.finpow() * 55, e.rotation, 360, (x, y) => {
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x,y), e.fslope() * 5);
    });
});

const blackoutShot = extend(PointBulletType, {
    speed: 0,
    lifeimte: 0,
    damage: 100,
    splashDamage: 45,
    splashDamageRadius: 75,
    hitSound: Sounds.release,
    hitEffect: shadowShot,
    trailEffect: darknessTrail,
    shootEffect: shadowShot,
    status: StatusEffects.corroded,
    statusDuration: 175,
    collides: true,
    collidesAir: true,
    collidesGround: true,
    darkSplash(b){
        shadowShot.at(b.x, b.y);
        Effect.shake(0.5, 2, b);
        Puddles.deposit(Vars.world.tileWorld(b.x, b.y), voidicsm.voidicsm, 30);
        let rad = this.splashDamageRadius/8;
        Units.nearby(b.x - rad * 4, b.y- rad * 4, rad * 8, rad * 8, cons(u => {
            if(!u.isDead) {
                Puddles.deposit(Vars.world.tileWorld(b.x, b.y), voidicsm.voidicsm, 1);
                u.apply(statuses.blackout, 25);
                if(u.health >= this.splashDamage){
                    u.damageContinuousPierce(this.splashDamage);
                }
                else u.damageContinuousPierce(u.health - 1)
            }
        }));
    },
    hit(b){
        this.darkSplash(b);
    },
    despawned(b){
        this.darkSplash(b);
    }
});

const blackestShot = extend(PointBulletType, {
    speed: 32,
    lifeimte: 0,
    damage: 450,
    //makes the turrwt shoot much much faster.
    homingPower: 10,
    splashDamageRadius: 55,
    hitSound: Sounds.release,
    hitEffect: shadowHit,
    despawnEffect: shadowShot,
    trailEffect: darkestTrail,
    shootEffect: shadowShot,
    fragBullet: blackoutShot,
    fragBullets: 11,
    status: statuses.blackout,
    statusDuration: 3600,
    collides: true,
    collidesAir: true,
    collidesGround: true,
    setStats(){
    this.super$setStats();
    this.stats.add(Stat.splashDamage, "115");
    this.stats.add(Stat.splashDamageRadius, "45");
    },
    darkSplash(b){
        shadowShot.at(b.x, b.y);
        Effect.shake(6, 8, b);
        Puddles.deposit(Vars.world.tileWorld(b.x, b.y), voidicsm.voidicsm, 30);
        let rad = this.splashDamageRadius/8;
        Units.nearby(b.x - rad * 4, b.y- rad * 4, rad * 8, rad * 8, cons(u => {
            if(!u.isDead) {
                Puddles.deposit(Vars.world.tileWorld(b.x, b.y), voidicsm.voidicsm, 1);
                u.apply(statuses.blackout, 45);
                if(u.health >= this.damage/7){
                    u.damageContinuousPierce(this.damage/7);
                }
                else u.damageContinuousPierce(u.health);
            }
        }));
    },
    hit(b){
        this.darkSplash(b);
    },
    despawned(b){
        this.darkSplash(b);
    }
});

const brightShot = extend(PointBulletType, {
    speed: 0,
    lifeimte: 0,
    damage: 150,
    splashDamage: 25,
    splashDamageRadius: 95,
    hitSound: Sounds.explosion,
    hitEffect: brightShoot,
    trailEffect: lightTrail,
    shootEffect: brightShoot,
    status: statuses.prismium,
    statusDuration: 180,
    collides: true,
    collidesAir: true,
    collidesGround: true,
    buildingDamageMultiplier: 0.35,
    darkSplash(b){
        brightShoot.at(b.x, b.y);
        Effect.shake(2.5, 4, b);
        let rad = this.splashDamageRadius/8;
        Units.nearby(b.x - rad * 4, b.y- rad * 4, rad * 8, rad * 8, cons(u => {
            if(!u.isDead) {
                if(u.health >= this.splashDamage){
                    u.damage(this.splashDamage);
                }
                else u.damageContinuousPierce(u.health);
            }
        }));
    },
    hit(b){
        this.darkSplash(b);
    },
    despawned(b){
        this.darkSplash(b);
    }
});

const brightestShot = extend(PointBulletType, {
    speed: 32,
    lifeimte: 0,
    damage: 750,
    splashDamageRadius: 125,
    hitSound: Sounds.explosion,
    hitEffect: brightHit,
    despawnEffect: brightShoot,
    trailEffect: brightestTrail,
    shootEffect: brightShoot,
    fragBullet: brightShot,
    status: statuses.prismium,
    statusDuration: 450,
    fragBullets: 20,
    collides: true,
    collidesAir: true,
    collidesGround: true,
    buildingDamageMultiplier: 0.7,
    setStats(){
    this.super$setStats();
    this.stats.add(Stat.splashDamage, "115");
    this.stats.add(Stat.splashDamageRadius, "45");
    },
    darkSplash(b){
        brightShoot.at(b.x, b.y);
        Effect.shake(8, 12, b);
        let rad = this.splashDamageRadius/8;
        Units.nearby(b.x - rad * 4, b.y- rad * 4, rad * 8, rad * 8, cons(u => {
            if(!u.isDead) {
                if(u.health >= this.damage/7){
                    u.damage(this.damage/7);
                }
                else u.damageContinuousPierce(u.health - 1)
            }
        }));
    },
    hit(b){
        this.darkSplash(b);
    },
    despawned(b){
        this.darkSplash(b);
    }
});


const stormShot = extend(PointBulletType, {
    speed: 0,
    lifeimte: 0,
    damage: 95,
    splashDamage: 15,
    splashDamageRadius: 45,
    hitSound: Sounds.explosion,
    hitEffect: stormShoot,
    trailEffect: stormTrail,
    shootEffect: stormShoot,
    collides: true,
    collidesAir: true,
    collidesGround: true,
    darkSplash(b){
        stormShoot.at(b.x, b.y);
        Effect.shake(2.5, 4, b);
        let rad = this.splashDamageRadius/8;
        Units.nearby(b.x - rad * 4, b.y- rad * 4, rad * 8, rad * 8, cons(u => {
            if(!u.isDead) {
                if(u.health >= this.splashDamage){
                    u.damage(this.splashDamage);
                }
                else u.damageContinuousPierce(u.health);
            }
        }));
    },
    hit(b){
        this.darkSplash(b);
    },
    despawned(b){
        this.darkSplash(b);
    }
});

const delugeShot = extend(PointBulletType, {
    speed: 32,
    lifeimte: 0,
    damage: 650,
    splashDamageRadius: 55,
    hitSound: Sounds.explosion,
    hitEffect: stormHit,
    despawnEffect: stormShoot,
    trailEffect: delugeTrail,
    shootEffect: stormShoot,
    fragBullet: stormShot,
    fragBullets: 13,
    collides: true,
    collidesAir: true,
    collidesGround: true,
    buildingDamageMultiplier: 1.25,
    setStats(){
    this.super$setStats();
    this.stats.add(Stat.splashDamage, "115");
    this.stats.add(Stat.splashDamageRadius, "45");
    },
    darkSplash(b){
        stormShoot.at(b.x, b.y);
        Effect.shake(8, 12, b);
        let rad = this.splashDamageRadius/8;
        Units.nearby(b.x - rad * 4, b.y- rad * 4, rad * 8, rad * 8, cons(u => {
            if(!u.isDead) {
                if(u.health >= this.damage/7){
                    u.damage(this.damage/7);
                }
                else u.damageContinuousPierce(u.health - 1)
            }
        }));
    },
    hit(b){
        this.darkSplash(b);
    },
    despawned(b){
        this.darkSplash(b);
    }
});
const railgun4 = extendContent(ItemTurret, "railgun4", {
    init() {
    this.ammo(
        Vars.content.getByName(ContentType.item,"pixelcraft-feromagnet"), blackestShot,
        Vars.content.getByName(ContentType.item,"pixelcraft-stelarcrim"), brightestShot,
        Vars.content.getByName(ContentType.item, "pixelcraft-tinormium"), delugeShot
    );
    this.super$init();
  }
});


railgun4.buildType = () => extendContent(ItemTurret.ItemTurretBuild, railgun4, {
    unitSort: (u, x, y) => -u.maxHealth,
    shoot(type){
        let limitationX = Math.cos(this.rotation/180 * Math.PI) * this.range();
        let limitationY = Math.sin(this.rotation/180 * Math.PI) * this.range();
        let tshootX = fc.rangeLimit(this.targetPos.x - this.x, limitationX) + this.x
        let tshootY = fc.rangeLimit(this.targetPos.y - this.y, limitationY) + this.y
        let sRange = type.splashDamageRadius;
        let burstMod = type.homingPower + 1
        
        
        let fireDst = Mathf.dst(this.x, this.y, fc.rangeLimit(this.targetPos.x - this.x, limitationX) + this.x, fc.rangeLimit(this.targetPos.y - this.y, limitationY) + this.y);
        
        type.create(this, this.team, tshootX, tshootY, this.rotation, 0);
        
        type.trailEffect.at(tshootX, tshootY, 0, this);
        
        type.hitEffect.at(tshootX, tshootY, this.rotation, this);
        
        type.hitSound.at(tshootX, tshootY)
        
        if(type.fragBullet != null){
            let unitArr = []
            
            for(let i = 0; i < type.fragBullets; i++){
                Time.run(this.block.burstSpacing * i/burstMod, () => {
                    let cueUnit = Units.closestTarget(this.team, tshootX, tshootY, sRange, u => !unitArr.includes(u), b => !unitArr.includes(b));
                    let hshootX = tshootX + Mathf.random(sRange) - sRange/2, hshootY = tshootY + Mathf.random(sRange) - sRange/2;
                    if(cueUnit != null){
                        //why var? Apparently, it won't save without
                        hshootX = cueUnit.x, hshootY = cueUnit.y;
                        unitArr.push(cueUnit);
                    }
                    cueUnit = null;
                    type.fragBullet.create(this, this.team, hshootX, hshootY, 0, 0);
                    type.fragBullet.trailEffect.at(hshootX, hshootY, 0, this);
                    type.fragBullet.hitSound.at(hshootX, hshootY);
                })
            }
        }
        this.effects();
        this.useAmmo();
    }
});