const weathers = require("extras/weathers")

const seeds = new Effect(25, e => {
    Draw.color(Pal.plastaniumFront, Pal.plastaniumBack, e.fin());
    Lines.stroke(e.fout() * 3)
    Lines.circle(e.x, e.y, e.fin() * 27)
    Lines.stroke(e.fslope() * 1)
    Lines.circle(e.x, e.y, e.fslope() * 15)
    const d = new Floatc2({get(x, y){
    Lines.stroke(e.fout());
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x,y), e.fslope() * 10);
     }})
    Angles.randLenVectors(e.id, 30, e.fin() * 30, e.rotation, 360,d)
    Angles.randLenVectors(e.id, 10, e.fin() * 15, e.rotation, 360,d)
});

let seedLaunchFx = new Effect(50, e => {
    Draw.color(Pal.engine);

    e.scaled(25, f => {
        Lines.stroke(f.fout() * 2);
        Lines.circle(e.x, e.y, 4 + f.finpow() * 30);
    });

    Lines.stroke(e.fout() * 2);

    Angles.randLenVectors(e.id, 24, e.finpow() * 50, (x, y) => {
        let ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 4 + 1);
    });
})
        
const seedExtractor = extendContent(GenericCrafter, "seed-extractor",{});
seedExtractor.craftEffect = seeds;

const bioDrill = extendContent(GenericCrafter, "bioDrill", {});
bioDrill.craftEffect = seeds;

const bioFormerAni = new DrawAnimation();
bioFormerAni.frameCount = 9;
bioFormerAni.frameSpeed = 30;
const bioFormer = extendContent(GenericCrafter,"bioFormer",{});
bioFormer.craftEffect = seeds;
bioFormer.drawer = bioFormerAni;

const bioPressAni = new DrawAnimation();
const bioPress = extendContent(GenericCrafter,"bioPress",{});
bioPress.craftEffect = seeds;
bioPress.drawer = bioPressAni;

const bioniteMixer = extendContent(GenericCrafter,"bioniteMixer",{});
bioniteMixer.craftEffect = seeds;

const bioMender = extendContent(MendProjector, "bioMender", {});

const placeWeatherSeed = extend(Wall, "place-seed-weather", {
    load(){
        this.region = Core.atlas.find("seed-storm")
    },
    icons(){
        return[
            Core.atlas.find("seed-storm")
        ]
    },
    buildVisibility: BuildVisibility.shown,
    category: Category.turret
});
placeWeatherSeed.buildType = () => extend(Wall.WallBuild, placeWeatherSeed, {
    placed(){
        let tile = Vars.world.tile(this.tileX(), this.tileY());
        if(weathers.seedStorm.isActive() != true) Call.createWeather(weathers.seedStorm, 0.1, 6000, 17.5 - Mathf.random(35), 17.5 - Mathf.chance(35));
        seedLaunchFx.at(this.x, this.y);
        tile.setBlock(Blocks.air);
    }
});
