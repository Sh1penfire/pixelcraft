const statuses = require("libs/statuses");
const fc = require("libs/fc");
/*
//defining blocks for the tech tree and in general ordering
Vars.world.setSectorRules = () => {
    this.super$setSectorRules()
    let floorc = new ObjectIntMap();
    entries = floorc.entries.toArray;
    entries.sort(cons(e => -e.value));
    let floors = [entries.size]
    for(let i = 0; i < entries.size; i++){
        floors[i] = entries.get(i).key;
    }
    let hasBio = !(floors[0].name.contains("ice") || floors[0].name.contains("snow")) && (floors[0].name.contains("grass") || floors[0].name.contains("dirt") || floors[0].name.contains("water"));   
    if(hasBio && !state.rules.weather.contains(cons(e => e instanceof weathers.seedStorm))) state.rules.weather.add(new WeatherEntry(weathers.seedStorm));
}
*/

const corosiveLingeringFx = new Effect(120, e => {
  Draw.color(Pal.plastanium, Color.white, Pal.plastanium, e.fin());
  Draw.alpha(1 - 0.25 * e.fin());
  Fill.circle(e.x, e.y, e.fout() * 4);
  Draw.alpha(1);
  Angles.randLenVectors(e.id, 25 , e.finpow() * 35, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 2 + Math.sin(e.fin() * 4 * Math.PI));
    Fill.circle(e.x + x, e.y + y, e.fout() * 4 + Math.sin(e.fin() * 4 * Math.PI));
  })
});

const limeuceSplash = new Effect(75, e => {
    Draw.color(Color.white, Pal.plastanium, Color.valueOf("#c4cf6f"), e.fin());
    Angles.randLenVectors(e.id, 7 , e.finpow() * 15 + 6, e.rotation, 360, (x, y) => {
        Fill.circle(e.x + x, e.y + y, e.fout() * 2 + Math.sin(e.fin() * 3 * Math.PI));
    })
});

const stone = extend(Item, "stone", {});
const rust = extend(Item, "rust", {});
const magnitine = extend(Item, "magnitine", {});
const ceramic = extend(Item, "ceramic", {});
const bionorb = extend(Item, "bionorb", {});
const pixelite = extend(Item, "pixelite", {});
const uberite = extend(Item, "uberite", {});
const feromagnet = extend(Item, "feromagnet", {});
const bionite = extend(Item, "bionite", {});
const tinormium = extend(Item, "tinormium", {});
const stelarcrim = extend(Item, "stelarcrim", {});
const rubble = extend(Item, "rubble", {})

const voidicsm = extend(Liquid, "voidicsm", {
    tempretature: 0,
    heatCapacity: 1,
    viscocity: 0.5,
    effect: statuses.blackout,
    color: Pal.darkMetal
});

const limeuce = extend(Liquid, "limeuce", {
    effect: statuses.groveCurse
});

const corosiveLingering = extend(BombBulletType, {
    update(b){
        if(Mathf.chance(Time.delta)){
            corosiveExpl.create(b.owner, b.team, b.x, b.y, 0, 0);
        }
    },
    lifetime: 120,
    hitSound: Sounds.none
});

const corosiveExpl = extend(BombBulletType, {
    splashDamageRadius: 25,
    splashDamage: 0,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    lifetime: 0,
    status: StatusEffects.corroded,
    hitSound: Sounds.none
});

const limeuceLSplash = extend(LiquidBulletType, {
    splashDamageRadius: 15,
    splashDamage: 10,
    damage: 21,
    liquid: limeuce,
    lifetime: 20,
    status: statuses.groveCurse,
    statusDuration: 1280,
    collides: true,
    collidesAir: true,
    collidesGround: true,
    buildingDamageMultiplier: 3.35,
    hitSound: Sounds.none
});

/*
    getReplacement(req, requests){
        let cont = p => requests.contains(o => o.x == req.x + p.x && o.y == req.y + p.y && (req.block instanceof ironConveyor || req.block instanceof Junction));
        return cont.get(Geometry.d4(req.rotation)) &&
            cont.get(Geometry.d4(req.rotation - 2)) &&
            req.tile() != null &&
            req.tile().block() instanceof ironConveyor &&
            Mathf.mod(req.tile().build.rotation - req.rotation, 2) == 1 ? Blocks.junction : this;
    }*/

const ironConveyor = extend(Conveyor, "iron-conveyor", {});
ironConveyor.buildType = () => extend(Conveyor.ConveyorBuild,  ironConveyor, {
    /*getReplacement(){
        this.super$getReplacement()
    },*/
    unitOn(b){
        if(b.team == this.team){
            this.super$unitOn(b);
        }
        else{
            b.apply(StatusEffects.corroded, 1)
        }
    }
});



const magnitineConveyor = extend(Conveyor, "magnitine-conveyor", {});
magnitineConveyor.buildType = () => extend(Conveyor.ConveyorBuild,  magnitineConveyor, {
    unitOn(b){
        if(b.team == this.team){
            this.super$unitOn(b);
        }
        else{
            b.apply(StatusEffects.corroded, 1)
        }
    }
});

const tinormiumRails = extend(StackConveyor, "tinormium-conveyor", {});

const itemTrebushe = extend(MassDriver, "trebushet", {});
itemTrebushe.buildType = () => extend(MassDriver.MassDriverBuild, itemTrebushe, {});

const ironDrill = extend(Drill, "iron-drill", {
    getDrop(tile){
        let tileDrop = tile.drop();
        if(tileDrop == null && (tile.floor() == Blocks.stone || tile.floor() == Blocks.basalt)) return stone;
        else return tileDrop
    },
    canMine(tile){
        if(tile == null) return false;
        else if(this.getDrop(tile) != null) return this.getDrop(tile).hardness <= this.tier;
    }
});
ironDrill.buildType = () => extend(Drill.DrillBuild, ironDrill, {});

const magnitineDrill = extend(Drill, "magnitine-drill", {
    getDrop(tile){
        let tileDrop = tile.drop();
        if(tileDrop == null && (tile.floor() == Blocks.stone || tile.floor() == Blocks.basalt)) return stone;
        else return tileDrop
    },
    canMine(tile){
        if(tile == null) return false;
        else if(this.getDrop(tile) != null) return this.getDrop(tile).hardness <= this.tier;
    }
});
magnitineDrill.buildType = () => extend(Drill.DrillBuild, magnitineDrill, {});

const neromagnetDrill = extend(Drill, "neromagnet-drill", {
    getDrop(tile){
        let tileDrop = tile.drop();
        if(tileDrop == null && (tile.floor() == Blocks.stone || tile.floor() == Blocks.basalt)) return stone;
        else return tileDrop
    },
    canMine(tile){
        if(tile == null) return false;
        else if(this.getDrop(tile) != null) return this.getDrop(tile).hardness <= this.tier;
    }
});
neromagnetDrill.buildType = () => extend(Drill.DrillBuild, neromagnetDrill, {});

let blocksm = [
    [Blocks.stone, Blocks.basalt],
    [Blocks.grass, Blocks.dirt, Blocks.mud],
    [Blocks.moss, Blocks.sporeMoss]
];
let itemsm = [stone, bionorb, Items.sporePod];

const excavator = extend(Drill, "excavator", {
    getDrop(tile){
        let tileDrop = tile.drop();
        for(let i = 0; i < itemsm.length; i++){
            if (blocksm[i].includes(tile.floor())) return itemsm[i];
        }
        if(tile.floor().liquidDrop != null){
            if(tile.floor().deep == true) return stone;
            return Items.sand;
        }
        return tileDrop;
    },
    canMine(tile){
        if(tile == null) return false;
        else if(this.getDrop(tile) != null) return this.getDrop(tile).hardness <= this.tier;
    }
});
excavator.buildType = () => extend(Drill.DrillBuild, excavator, {});

const ironWall = extend(Wall, "iron-wall", {});
ironWall.buildType = () => extend(Wall.WallBuild, ironWall, {
    onDestroyed(){
        this.super$onDestroyed();
        corosiveLingeringFx.at(this.x, this.y)
        corosiveLingering.create(this, this.team, this.x, this.y, Mathf.random(360), 0, 1, 1, this);
    }
})

const ironWallLarge = extend(Wall, "large-iron-wall", {});
ironWallLarge.buildType = () => extend(Wall.WallBuild, ironWallLarge, {
    onDestroyed(){
        this.super$onDestroyed();
        corosiveLingeringFx.at(this.x, this.y)
        corosiveLingering.create(this, this.team, this.x, this.y, Mathf.random(360), 0, 1, 1, this);
    }
})

const magWall = extend(Wall, "magnitine-wall", {});
magWall.buildType = () => extend(Wall.WallBuild, ironWall, {
    draw(){
        Draw.reset();
        Draw.z(Layer.groundUnit + 1);
        Draw.rect(this.block.region, this.x, this.y, 0);
    }
});

const magWallLarge = extend(Wall, "large-magnitine-wall", {});
magWallLarge.buildType = () => extend(Wall.WallBuild, ironWallLarge, {
    draw(){
        Draw.reset();
        Draw.z(Layer.groundUnit + 1);
        Draw.rect(this.block.region, this.x, this.y, 0);
    }
});

const bioWall = extend(Wall, "bion-wall", {
    icons(){
        return[
            Core.atlas.find("pixelcraft-" + this.name)
        ]
    },
    load(){
        this.super$load();
        this.sideRegion = Core.atlas.find(this.name + "-edge");
    }
});

bioWall.buildType = () => extend(Wall.WallBuild, bioWall, {
    update(){
        this.super$update();
        if(this.health < this.maxHealth){
            this.heal(this.maxHealth/600);
        }
    },
    draw(){
        Draw.reset();
        Draw.z(Layer.groundUnit + 1);
        Draw.rect(this.block.region, this.x, this.y, 0);
    }
});

const bioWallLarge = extend(Wall, "large-bion-wall", {});
bioWallLarge.buildType = () => extend(Wall.WallBuild, bioWallLarge, {
    update(){
        this.super$update();
        if(this.health < this.maxHealth){
            this.heal(this.maxHealth/600);
        }
    },
    draw(){
        Draw.reset();
        Draw.z(Layer.groundUnit + 1);
        Draw.rect(this.block.region, this.x, this.y, 0);
    }
});

const shardlingDoor = extend(Door, "shardling-door", {
    update: true
});

shardlingDoor.buildType = () => extend(Door.DoorBuild, shardlingDoor, {
    hitGrove(b){
        if(this.sTimer >= 0 || (b.type.status != statuses.groveCurse && b.type.status != statuses.seeded)) return;
        for(let i = 0; i < Math.round(Math.random() * 2) + 2; i++){
            limeuceLSplash.create(this, this.team, this.x, this.y, this.angleTo(b) + Math.random() * 5 - 2.5, Math.random(), Math.random());
        }
    },
    collision(b){
        this.hitGrove(b);
        this.damage(b.damage * b.type.buildingDamageMultiplier);
        return true;
    },
    damage(number){
        this.super$damage(this.open ? number * 3 : number);
    },
    unitOn(b){
        if(this.sTimer > 0) return;
        this.sTimer = 1;
        if(fc.statusCheck(b, statuses.groveCurse) && b.team == this.team){
            b.unapply(statuses.groveCurse);
            b.heal(10);
            Fx.healBlockFull.at(this.x, this.y, this.block.size, Pal.heal);
        }
    },
    onDestroyed(){
        this.explosiveness = this.block.baseExplosiveness * (this.open ? 4 : 0.15);
        this.super$onDestroyed();
        Puddles.deposit(Vars.world.tileWorld(this.x, this.y), limeuce, 55);
        for(let i = 0; i < Math.round(Math.random() * 3) + 17 * (this.open ? 2 : 0.75); i++){
            limeuceLSplash.create(this, this.team, this.x, this.y, Math.random() * 360, Math.random(), Math.random());
        }
        limeuceSplash.at(this.x, this.y);
    },
    draw(){
        Draw.reset();
        if(this.open){
            Draw.z(Layer.block);
            let botomRegion = Core.atlas.find(this.block.name + "-botom");
            let coverRegion = Core.atlas.find(this.block.name + "-cover");
            Draw.rect(botomRegion, this.x, this.y, 0);
            Draw.z(Layer.flyingUnit + 0.75);
            Draw.alpha(0.1);
            Draw.rect(coverRegion, this.x, this.y, 0);
            Draw.z(Layer.groundUnit + 1);
            Draw.alpha(0.75);
            Draw.rect(botomRegion, this.x, this.y, 0);
        }
        Draw.reset();
        Draw.z(Layer.groundUnit + 1);
        Draw.rect(this.open ? this.block.openRegion : this.block.region, this.x, this.y, 0);
    },
    update(){
        this.super$update();
        if(this.sTimer > 0) this.sTimer -= 0.01;
    },
    sTimer: 0
});

const corrodedEffect = new Effect(75, e =>{
    Draw.color(Color.white, Pal.plastanium, Pal.darkMetal, e.fin());
    Fill.circle(e.x, e.y, e.fout() * 1.6);
    Draw.color(Color.white, Pal.plastanium, Pal.darkMetal, e.fin());
    Fill.circle(e.x, e.y, e.fout() * 1.25);
});

StatusEffects.corroded.effect = corrodedEffect;

Bullets.fragPlastic.status = StatusEffects.corroded;
Bullets.fragPlastic.statusDuration = 3600;
Bullets.fragPlasticFrag.status = StatusEffects.corroded;
Bullets.fragPlasticFrag.statusDuration = 1600;
Bullets.artilleryPlastic.status = StatusEffects.corroded;
Bullets.fragPlasticFrag.statusDuration = 360;
Bullets.artilleryPlasticFrag.status = StatusEffects.corroded;
Bullets.artilleryPlasticFrag.statusDuration = 60;
Bullets.standardThorium.status = StatusEffects.corroded;
Bullets.artilleryPlasticFrag.statusDuration = 3600;
Bullets.standardThoriumBig.status = StatusEffects.corroded;
Bullets.artilleryPlasticFrag.statusDuration = 7200;

module.exports = {
    stone: stone,
    rust: rust,
    magnitine: magnitine,
    ceramic: ceramic,
    bionorb: bionorb,
    pixelite: pixelite,
    uberite: uberite,
    feromagnet: feromagnet,
    bionite: bionite,
    tinormium: tinormium,
    stelarcrim: stelarcrim,
    rubble: rubble,
    ironDrill: ironDrill,
    magnitineDrill: magnitineDrill,
    neromagnetDrill: neromagnetDrill,
    excavator: excavator,
    voidicsm: voidicsm,
    limeuce: limeuce
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             