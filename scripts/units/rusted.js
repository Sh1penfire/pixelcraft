const refresh = require("libs/refresh")
const fc = require("libs/fc")
const theAislol = require("libs/theAislol")
const statuses = require("libs/statuses")
//Surge shockwave but delta
const LandFx = new Effect(25, e => {
    Draw.color(Color.white, Color.valueOf("#a9d8ff"), e.fin());
    Lines.stroke(e.fout() * 6); 
    Lines.circle(e.x, e.y, e.fin() * 25); 
    Lines.stroke(e.fout() * 10); 
    Lines.circle(e.x, e.y, e.fin() * 15); 
    Angles.randLenVectors(e.id, 15, e.finpow() * 30, e.rotation, 360, (x, y) => {
        Fill.circle(e.x + x, e.y + y, e.fout() * 1.5);
    });
});

const menderPlace = new Effect(45, e => {
    e.x = Math.round(e.x/8) * 8, e.y = Math.round(e.y/8) * 8
    Draw.color(Pal.surge)
    Draw.alpha(e.fout());
    Lines.square(e.x, e.y, e.fin() * 35);
})

const menderRemoveSmall = new Effect(45, e => {
    Draw.color(Color.white, Pal.surge, 0.75)
    Lines.stroke(e.fout() * 3);
    Lines.square(e.x, e.y, e.fin() * 9);
})

const menderRemove = new Effect(45, e => {
    Draw.color(Color.valueOf("#ff7070"))
    Lines.stroke(e.fout() * 2);
    Lines.square(e.x, e.y, e.fin() * 12);
    Draw.alpha(1);
    Angles.randLenVectors(e.id, 5, e.fin() * 15, (x, y) => {
        Fill.square(e.x + x, e.y + y, e.fout() * 1.5 + 0.75);
    });
})

const menderDestroy = new Effect(35, e => {
    Draw.color(Pal.heal);
    Lines.stroke(e.fout() * e.fout());
    Lines.circle(e.x, e.y, e.finpow() * 7.5);
})

const rustydart = extendContent(UnitType, "rustydart", {});
rustydart.constructor = () => extend(UnitEntity, {});
rustydart.defaultController = () => extend(BuilderAI, {});

const rustyjavalin = extend(UnitType, "rustyjavalin", {
        load(){
            this.super$load();
            this.region = Core.atlas.find(this.name);
        }
});
rustyjavalin.constructor = () => extend(UnitEntity, {
    update(){
        this.super$update();
        if(this.lightn > 0){
            this.lightn = this.lightn - 0.1;
        }
        else{
            this.lightn = 0;
        }
    },
    collision(b){
        if(this.lightn < 0.1 && b.damage >= 0){
            let temp = 0
            while(temp <  5 + Mathf.random(4)){
                Lightning.create(this.team, Color.valueOf("#a9d8ff"), 10 * Vars.state.rules.unitDamageMultiplier, this.x, this.y, b.rotation() + 180 + Mathf.range(10), 10  + Mathf.range(5));
                temp++
            }
            Sounds.spark.at(this.x, this.y);
            this.impulse(Mathf.range(300), Mathf.range(300));
            this.lightn = 2
            this.apply(StatusEffects.overclock, this.lightn * 60);
        }
    },
    classId: () => rustyjavalin.classId
});
rustyjavalin.abilities.add(new MoveLightningAbility(6.4 * Vars.state.rules.unitDamageMultiplier, 10, 0.05, 10, 3, 6, Color.valueOf("#a9d8ff"), "pixelcraft-rustyjavalin-full"));
rustyjavalin.defaultController = theAislol.swarmAI;
refresh(rustyjavalin);

const rustytrident = extend(UnitType, "rustytrident", {})
rustytrident.constructor = () => extend(UnitEntity, {
    update(){
    this.super$update()
        let h = rustytrident.weapons.get(0).bullet
        h.fragBullet = menderSpawn
        h.fragBullets = 1
        h.fragVelocityMax = 0
    },
    classId: () => rustytrident.classId
})
rustytrident.defaultController = () => extend(RepairAI, {});
refresh(rustytrident);

//unable to get this to work
function returnMendre(){
        print({
        lifetime: 120,
        update(owner){
            if(this.timer == 'undefined'){
                this.timer = 0
            }
            this.lifetime -= 1
            if(this.lifetime <= 0){
                this.despawned(owner)
            }
        },
        despawned(owner){
            owner.data = null
        },
        obj(){
            return this
        }
    });
};

const menderSpawn = extend(BombBulletType, {
    despawned(b){
        b.x = Math.round(b.x/8) * 8, b.y = Math.round(b.y/8) * 8;
        menderBullet.create(b.owner, b.team, b.x + 8, b.y, b.rotation());
        menderBullet.create(b.owner, b.team, b.x - 8, b.y, b.rotation());
        menderBullet.create(b.owner, b.team, b.x, b.y + 8, b.rotation());
        menderBullet.create(b.owner, b.team, b.x, b.y - 8, b.rotation());
        menderRemoveSmall.at(b.x + 8, b.y);
        menderRemoveSmall.at(b.x - 8, b.y);
        menderRemoveSmall.at(b.x, b.y + 8);
        menderRemoveSmall.at(b.x, b.y - 8);
        menderPlace.at(b.x, b.y);
    },
    lifetime: 0,
    reflectable: false,
    hittable: false
})

const menderBullet = extend(BasicBulletType, {
    lifetime: 260,
    drag: 1,
    healPercent: 2,
    hitSize: 4.5,
    buildingDamageMultiplier: 0,
    damage: 35,
    collidesAir: false,
    splashDamage: 0,
    splashDamageRadius: 50,
    despawnEffect: Fx.none,
    hitSound: Sounds.none,
    update(b){
        if(Mathf.chance(Time.delta)){
            b.x = Math.round(b.x/8) * 8, b.y = Math.round(b.y/8) * 8;
            this.hitBullet(b, b.hitSize)
            if(Math.abs(fc.helix(b.lifetime/30, 1, 1, b.fout())) > 0.95){
                Vars.indexer.eachBlock(b.team, b.x, b.y, 50, other => other.damaged(), other => {
                other.heal(other.maxHealth/100 * 0.001 + 0.05);
                    if(Mathf.chance(0.1)){
                        Fx.healBlockFull.at(other.x, other.y, other.block.size, Pal.heal);
                    }
                });
            }
        };
        this.super$update(b);
    },
    draw(b){
        let bDamage = b.damage
        Draw.color(Color.white);
        Draw.z(Layer.block - 1);
        Draw.alpha(b.fout()/2 + 0.5);
        Draw.rect(Core.atlas.find("pixelcraft-bioMender"), b.x, b.y, 0);
        Draw.color(Color.white, b.team.color, bDamage/b.type.damage * 0.25 + 0.75);
        Draw.z(Layer.effect);
        Draw.alpha(1);
        Draw.rect(Core.atlas.find("pixelcraft-bioMender-top"), b.x, b.y, 0);
        Draw.color(Color.valueOf("#ccd28d"));
        Draw.alpha(Math.sin(b.fslope() * b.fslope() * Math.PI));
        Draw.z(Layer.block - 1);
        Lines.square(b.x, b.y, b.fin() * 4);
        Draw.alpha(0.1);
        Lines.square(b.x, b.y, 4.1);
    },
    despawned(b){
        this.super$despawned(b);
        if(b.damage <= 0){
            Sounds.explosion.at(b.x, b.y)
            Fx.explosion.at(b.x, b.y)
            Fx.blockExplosionSmoke.at(b.x, b.y);
            menderDestroy.at(b.x, b.y)
            Effect.scorch(b.x, b.y, 1);
        }
        else{
            menderRemove.at(b.x, b.y)
            Sounds.pew.at(b.x, b.y)
        }
    },
    hitBullet(b1, range){
        //haha yes, stolen from segment
        let intBullet = Groups.bullet.intersect(b1.x - range, b1.y - range, range*2, range*2).min(b => b.team != b1.team, b => b.dst2(b1));
        if(intBullet){
            //usefull in a second
            let pDamage = intBullet.type.damage, pSplash = intBullet.type.splashDamage;
            intBullet.damage -= b1.damage
            b1.damage -= pDamage
            if(pSplash){
                b1.damage -= pSplash
            }
            if(intBullet.damage <= 0){
                intBullet.remove();
            };
        }
        let mendBn = Groups.bullet.intersect(b1.x - range, b1.y - range, range*2, range*2).min(b => b.team == b1.team && b.type == b1.type && b != b1, b => b.dst2(b1));
        if(mendBn){
            if(mendBn.fout() > b1.fout()){
                b1.remove()
            }
            else{
                mendBn.remove()
            }
        }
        if(b1.damage <= 0.0001){
            b1.remove();
        };
    }
});

const rustyAlpha = extend(UnitType, "rustyalpha", {});
rustyAlpha.constructor = () => extend(MechUnit, {});

const rustyDelta = extend(UnitType, "rustydelta", {});
rustyDelta.constructor = () => extend(MechUnit, {
        onLandE(){
        let temp = 0
        while(temp <  5 + Mathf.random(4)){
            Lightning.create(this.team, Color.valueOf("#a9d8ff"), 10 * Vars.state.rules.unitDamageMultiplier, this.x, this.y, Mathf.random(360), 8);
            temp++
        }
        Sounds.spark.at(this.x, this.y);
        LandFx.at(this.x, this.y);
    },
    update(){
        if(this.elevation == 1){
            this.Charge = 1
        }
        else if(this.Charge == 1){
            this.Charge = 0
            this.onLandE()
        }
        this.super$update();
    },
    killed(){
        this.super$killed()
        this.onLandE()
    },
    classId: () => rustyDelta.classId
})
refresh(rustyDelta)

//const omegaWeapon1 = extend()

const rustyOmega = extend(UnitType, "rustyomega", {});
rustyOmega.constructor = () => extend(MechUnit, {
    update(){
        this.super$update()
        if(this.setUp != true || Mathf.chance(0.01)){
            
            this.setUp = true
            
            for(let i = 0; i < this.mounts.length; i++){
                let mount = this.mounts[i];
                let weapon = mount.weapon;
                if(!fc.statusCheck(this, StatusEffects.boss) && weapon.name == "pixelcraft-none"){
                    print(this.mounts[i].weapon.name)
                    this.mounts.splice(i, 1)
                }
            }
            rustyOmega.weapons.get(1).bullet.fragBullet.status = statuses.windswept
            rustyOmega.weapons.get(2).bullet.fragBullet = rustyOmega.weapons.get(1).bullet.fragBullet
            rustyOmega.immunities.add(statuses.windswept)
        }
    },
    classId: () => rustyOmega.classId,
    setUp: false
});
refresh(rustyOmega)

const shard = extend(UnitType, "shard", {});
shard.constructor = () => extend(UnitEntity, {
    update(){
        this.super$update()
        this.chargeTimer = Mathf.slerpDelta(this.chargeTimer, 1, 0.01)
    },
    collision(bullet){
        if(bullet.type.reflectable && !bullet.pierce && this.reflectionCharge > bullet.type.damage && this.chargeTimer){
            bullet.type.create(this, this.team, this.x, this.y, this.angleTo(bullet), 1, bullet.fout())
            this.reflectionCharge = Mathf.slerpDelta(this.reflectionCharge, 0, bullet.type.damage)
            this.chargeTimer = 0
        }
        else{
            this.reflectionCharge = Mathf.slerpDelta(this.reflectionCharge, this.chargeCap, bullet.type.damage)
        }
    },
    classId: () => shard.classId,
    chargeCap: 55,
    reflectionCharge: 0,
    chargeTimer: 1
})
shard.defaultController = theAislol.swarmAI
refresh(shard)

const capsule = extend(UnitType, "capsule", {});
capsule.constructor = () => extend(UnitEntity, {
    collision(bullet){
        if(bullet.type.reflectable && !bullet.pierce && this.reflectionCharge > bullet.type.damage){
            bullet.type.create(this, this.team, this.x, this.y, this.angleTo(bullet), 1, bullet.fout())
            this.reflectionCharge = Mathf.slerpDelta(this.reflectionCharge, 0, bullet.type.damage)
        }
        else{
            this.reflectionCharge = Mathf.slerpDelta(this.reflectionCharge, this.chargeCap, bullet.type.damage)
        }
    },
    classId: () => capsule.classId,
    chargeCap: 125,
    reflectionCharge: 0
})
capsule.defaultController = theAislol.swarmAI
capsule.abilities.add(new RepairFieldAbility(10, 250, 55))
refresh(capsule)