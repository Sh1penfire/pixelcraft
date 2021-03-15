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
  Angles.randLenVectors(e.id, 25 , e.finpow() * 30, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 2 + Math.sin(e.fin() * 3 * Math.PI));
    Fill.circle(e.x + x, e.y + y, e.fout() * 4 + Math.sin(e.fin() * 3 * Math.PI));
  })
});

const stone = extend(Item, "stone", {});
const rust = extend(Item, "iron", {});
const magnitine = extend(Item, "magnitine", {});
const bionorb = extend(Item, "bionorb", {});
const pixelite = extend(Item, "pixelite", {});
const uberite = extend(Item, "uberite", {});
const feromagnet = extend(Item, "feromagnet", {});
const bionite = extend(Item, "bionite", {});
const tinormium = extend(Item, "tinormium", {});
const stelacrim = extend(Item, "stelacrim", {});
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

const ironDrill = extend(Drill, "iron-drill", {});
ironDrill.buildType = () => extend(Drill.DrillBuild, ironDrill, {});

const magnitineDrill = extend(Drill, "magnitine-drill", {});
magnitineDrill.buildType = () => extend(Drill.DrillBuild, magnitineDrill, {});

const neromagnetDrill = extend(Drill, "neromagnet-drill", {});
neromagnetDrill.buildType = () => extend(Drill.DrillBuild, neromagnetDrill, {});

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

const corrodedEffect = new Effect(35, e =>{
    Draw.color(Pal.plastanium, Color.white, Pal.plastanium, e.fin());
    Fill.circle(e.x, e.y, e.fout() * 1.25);
    Draw.color(Color.white, Color.white, Pal.plastanium, e.fin());
    Fill.circle(e.x, e.y, e.fout() * 1);
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

module.exports = {
    ironDrill: ironDrill,
    magnitineDrill: magnitineDrill,
    neromagnetDrill: neromagnetDrill,
    voidicsm: voidicsm
};
