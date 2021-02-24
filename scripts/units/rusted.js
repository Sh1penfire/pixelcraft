const refresh = require("libs/refresh")
const fc = require("libs/fc")
const theAislol = require("libs/theAislol")
//Surge shockwave but delta
const LandFx = new Effect(25, e => {
    Draw.color(Color.white, Color.valueOf("#a9d8ff"), e.fin());
    Lines.stroke(e.fout() * 6); 
    Lines.circle(e.x, e.y, e.fin() * 25); 
    Lines.stroke(e.fout() * 10); 
    Lines.circle(e.x, e.y, e.fin() * 15); 
    Angles.randLenVectors(e.id, 15, e.finpow() * 30, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 1.5);
  })
});

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
})
rustyjavalin.abilities.add(new MoveLightningAbility(6.4 * Vars.state.rules.unitDamageMultiplier, 10, 0.05, 10, 3, 6, Color.valueOf("#a9d8ff"), "pixelcraft-rustyjavalin-full"));
refresh(rustyjavalin)
rustyjavalin.defaultController = theAislol.swarmAI

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

const shard = extend(UnitType, "shard", {});
shard.constructor = () => extend(UnitEntity, {
    collision(bullet){
        if(bullet.type.reflectable != false && bullet.damage < this.health){
            bullet.type.create(this, this.team, this.x, this.y, bullet.rotation() + 180, 1, bullet.fout())
        }
    },
    classId: () => shard.classId
})
shard.defaultController = theAislol.swarmAI
refresh(shard)

const capsule = extend(UnitType, "capsule", {});
capsule.constructor = () => extend(UnitEntity, {
    collision(bullet){
        if(bullet.type.reflectable != false && bullet.damage < this.health){
            bullet.type.create(this, this.team, this.x, this.y, bullet.rotation() + 180, 1, bullet.fout())
        }
    },
    classId: () => capsule.classId
})
capsule.defaultController = theAislol.swarmAI
capsule.abilities.add(new RepairFieldAbility(10, 250, 55))
refresh(capsule)