const statuses = require("libs/statuses");

//defining blocks for the tech tree and in general ordering

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
const stelacrim = extend(Item, "stelacrim", {});
const rubble = extend(Item, "rubble", {})
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
        if(tileDrop == null && (tile.floor() === Blocks.stone || tile.floor() === Blocks.basalt)) return stone;
        else return tileDrop;
    },
    canMine(tile){
        if(tile == null) return false;
        else if(this.getDrop(tile) != null) return this.getDrop(tile).hardness <= this.tier;
    },
    setBars(){
        this.super$setBars()
        this.bars.add("corrosion", e => new Bar("Corrosion", Pal.plastanium, () => e.cCorrosion()));
    },
    load(){
        this.super$load();
        this.corrosion = 1;
    }
});
neromagnetDrill.buildType = () => extend(Drill.DrillBuild, neromagnetDrill, {
    updateTile(){
        if(this.corrosion == null){
            this.corrosion = neromagnetDrill.corrosion;
        }
        this.super$updateTile();
        this.corrosion = Mathf.slerpDelta(this.corrosion, 0, 0.001);
    },
    damage(number){
        this.super$damage(number);
        this.corrosion = Mathf.slerpDelta(this.corrosion, 1, 0.25);
    },
    cCorrosion(){
        return this.corrosion;
    }
});

const excavator = extend(Drill, "excavator", {
    getDrop(tile){
        let tileDrop = tile.drop();
        if(tileDrop == null && (tile.floor() === Blocks.stone || tile.floor() === Blocks.basalt)) return stone;
        else if(tileDrop == null && (tile.floor() === Blocks.grass || tile.floor() === Blocks.dirt)) return bionorb;
        else if(tileDrop == null && (tile.floor() === Blocks.sporeMoss || tile.floor() === Blocks.moss)) return Items.sporePod;
        else if(tile.floor().liquidDrop != null){
            if(tile.floor().deep == true) return stone
            return Items.sand
        }
        return tileDrop
    },
    canMine(tile){
        if(tile == null) return false;
        else if(this.getDrop(tile) != null) return this.getDrop(tile).hardness <= this.tier;
    },
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
ironWall.buildType = () => extend(Wall.WallBuild, ironWall, {});

const magWallLarge = extend(Wall, "large-magnitine-wall", {});
ironWallLarge.buildType = () => extend(Wall.WallBuild, ironWallLarge, {});

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
        this.super$draw();
        for(let i = 0; i < 4; i++){
            Draw.rect(bioWall.sideRegion, this.x + Angles.trnsx(i * 90, 8, 0), this.y + Angles.trnsy(i * 90, 8, 0), (i - 1) * 90);
        }
    }
});

const bioWallLarge = extend(Wall, "large-bion-wall", {});
bioWallLarge.buildType = () => extend(Wall.WallBuild, bioWallLarge, {
    update(){
        this.super$update();
        if(this.health < this.maxHealth){
            this.heal(this.maxHealth/600);
        }
    }
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

const voidicsm = extend(Liquid, "voidicsm", {
    tempretature: 0,
    heatCapacity: 1,
    viscocity: 0.5
});
voidicsm.effect = statuses.blackout;
voidicsm.color = Pal.darkMetal;

const limeuce = extend(Liquid, "limeuce", {
    effect: statuses.groveCurse
});

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
    stelacrim: stelacrim,
    rubble: rubble,
    ironDrill: ironDrill,
    magnitineDrill: magnitineDrill,
    neromagnetDrill: neromagnetDrill,
    voidicsm: voidicsm,
    limeuce: limeuce
};
