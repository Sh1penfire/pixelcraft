const weathers = require("extras/weathers");
const templuraGenerator = require("extras/templuraGen");
const environment = require("blocks/environment");

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

const seedProgress = new Effect(90, e => {
    Draw.color(Pal.plastaniumFront, Pal.plastaniumBack, e.fin());
    Lines.stroke(e.fslope() * 3);
    Lines.swirl(e.x, e.y, 27, e.fslope(), e.fout() * e.fout() * 720);
    Lines.swirl(e.x, e.y, 24 + 3 - (1 - e.fslope()) * 3, e.fslope(), e.fout() * e.fout() * 1100);
})

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

const volatileGenerator = extend(GenericCrafter, "volatile-generator", {
    craftEffect: seeds
});

volatileGenerator.buildType = () => extend(GenericCrafter.GenericCrafterBuild, volatileGenerator, {
    onDestroyed(){
        this.super$onDestroyed();
        Damage.damage(this.x, this.y, 60 * this.tilesize, this.block.health/32);
        for(let i = 0; i < 20; i++){
            Time.run(Mathf.random(5) + i * 2, () => {
                Fx.explosion.at(this.x + Mathf.random(50) - 25, this.y + Mathf.random(50) - 25);
            });
        }
        Time.run(Mathf.random(5) + 40, () => {
            Fx.blastExplosion.at(this.x + Mathf.random(50) - 25, this.y + Mathf.random(50) - 25);
        });
    }
});

const bioniteMixer = extendContent(GenericCrafter,"bioniteMixer",{});
bioniteMixer.craftEffect = seeds;

const bioMender = extendContent(MendProjector, "bioMender", {});

const placeWeatherSeed = extend(ItemSource, "place-seed-weather", {
    buildVisibility: BuildVisibility.shown,
    category: Category.turret,
    breakable: true,
    hasPower: true,
    configurable: true,
    consumesTap: true,
    category: Category.effect
});
placeWeatherSeed.buildType = () => extend(ItemSource.ItemSourceBuild, placeWeatherSeed, {
    buildConfiguration(table) {
        table.button(Icon.play, 
            Styles.clearTransi, run(() => {
            print(Lines.swirl);
                if(!weathers.seedStorm.isActive()){
                    Call.createWeather(weathers.seedStorm, 0.1, 6000, 17.5 - Mathf.random(35), 17.5 - Mathf.chance(35));
                    seedProgress.at(this.x, this.y);
                }
		    })
        ).size(45) 
    }
});
placeWeatherSeed.consumes.power(45.0/60.0);