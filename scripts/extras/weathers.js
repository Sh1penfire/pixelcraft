const fc = require("libs/fc")
const statuses = require("libs/statuses");
const voidicsm = require("extras/voidicsm")
const bombs = require("blocks/bombs")

const groveDrop = new Effect(110, e => {
    Draw.color(Color.valueOf("#ced671"), Color.white, Pal.darkMetal, e.fin());
    Draw.alpha(e.fout())
    Fill.circle(e.x, e.y, e.fout());
    Lines.spikes(e.x, e.y, e.fin() * 1, e.fin() * 15, 3, e.fin() * 2);
});

const groveSeedling = extend(BasicBulletType, {
    draw(b){
        Draw.color(Color.valueOf("#ced671"), Color.white, Pal.darkMetal, b.fin());
        Draw.alpha(0.75 + Math.sin(b.fin() * Math.PI * 3) * 0.25);
        Lines.spikes(b.x, b.y, b.fin() * 1, b.fout() * 10, 3, 0);
    },
    drawLight(b){
        //no.
    },
    despawned(b){
        if(!b.absorbed) this.explode(b);
        this.super$despawned(b);
    },
    hit(b, x, y){
        if(!b.absorbed) this.explode(b);
        this.super$hit(b, b.x, b.y);
    },
    explode(b){
        Units.nearby(b.x - 15, b.y - 15, 30, 30, cons(u => {
            if (!u.hovering) u.apply(statuses.groveCurse, 360)
            u.damage(5);
        }));
        groveDrop.at(b.x, b.y);
    },
    hitSound: Sounds.none,
    lifetime: 300,
    speed: 1,
    collides: true,
    collidesGround: true,
    collidesTiles: true,
    collidesAir: false,
    hitSize: 7.5,
    drag: 0.0075,
    homingPower: 0.025,
    homingRange: 160,
    status: statuses.groveCurse,
    statusDuration: 1200,
    buildingDamageMultiplier: 7.5
});

const groveSeed = extend(BasicBulletType, {
    draw(b){
        Draw.color(Color.valueOf("#ced671"), Color.white, Pal.darkMetal, b.fin());
        Draw.alpha(0.75 + Math.sin(b.fin() * Math.PI * 3) * 0.25);
        Lines.spikes(b.x, b.y, b.fin() * 1, b.fout() * 3, 3, 0);
    },
    drawLight(b){
        //no.
    },
    hitSound: Sounds.none,
    lifetime: 300,
    speed: 0.2,
    hitSize: 4,
    homingPower: 0.05,
    homingRange: 200,
    hitEffect: groveDrop,
    despawnEffect: groveDrop,
    status: statuses.groveCurse,
    statusDuration: 600,
    buildingDamageMultiplier: 5
});

const magmaeDropae = extend(ArtilleryBulletType, {
    drawLight(b){
        //fine, have some light
        //promethious sounds
        //then the world was born anew
        //derelict thrived
        //crux came
        //derelict died
        //*and then sharded showed up* yeah
        //and wiped them all out
        //ok I have nothing else to say
        Drawf.light(b.team, b, b.hitSize * b.fout() + 3, Color.orange, b.fout() * (1 + fc.helix(3.5, 0.5, b.fout())));
    },
    despawned(b){
        if(!b.absorbed) this.explode(b);
        this.super$despawned(b);
    },
    hit(b, x, y){
        if(!b.absorbed) this.explode(b);
        this.super$hit(b, b.x, b.y);
    },
    explode(b){
        Units.nearby(b.x - 15, b.y - 15, 30, 30, cons(u => {
            if (!u.hovering) u.apply(StatusEffects.melting, 360)
            u.damage(25 + b.damage);
        }));
        Puddles.deposit(Vars.world.tileWorld(b.x, b.y), Liquids.oil, 65);
        bombs.prisBullets[1].createNet(Team.derelict, b.x, b.y, 0, 25, 0, 0)
    },
    hitSound: Sounds.none,
    lifetime: 300,
    speed: 2,
    collides: true,
    collidesGround: true,
    collidesTiles: true,
    collidesAir: true,
    drag: -0.01,
    width: 12,
    height: 12,
    hitSize: 7.5,
    drag: 0.0075,
    status: statuses.hellfire,
    statusDuration: 1200,
    buildingDamageMultiplier: 7.5
});

const seedStorm = extend(ParticleWeather, "seed-storm", {
    updateEffect(WeatherState){
        if(this.status != StatusEffects.none){
            if(WeatherState.effectTimer/255 % 1){
                Groups.unit.each(u => {
                    if(u.checkTarget(this.statusAir, this.statusGround)){
                        u.apply(this.status, this.statusDuration);
                    }
                });
            }
        }
        WeatherState.effectTimer += Time.delta;
    },
    update(WeatherState){
        this.super$update(WeatherState);
        let rnx = Mathf.random(1, Vars.world.tiles.width - 1);
        let rny = Mathf.random(1, Vars.world.tiles.height - 1);
        let s = Mathf.clamp(Mathf.sin(WeatherState.effectTimer /(510 * 60)) * Mathf.clamp(WeatherState.intensity * 10, 0, 1) * 3, 0, 10), d = WeatherState.life != Infinity ? 10 * Math.sin(WeatherState.life/(100 * 60)) : 10 * Mathf.sin(WeatherState.effectTimer /(150 * 60));
        let chance = WeatherState.intensity >= 0.11 ? 1 : Mathf.clamp(s/10 + Math.abs(Math.sin(d) * s/10 + Math.sin(d * d * 0.1) * 0.5 - Math.sin(s) * 0.5), 0.1, 1)
        if(Vars.world.buildWorld(rnx * 8, rny * 8) == null && Vars.world.tile(rnx, rny) != null && Mathf.chance(chance)){
            rnx = rnx * 8
            rny = rny * 8
            if(Vars.world.tile(rnx/8, rny/8).block() == Blocks.air){
                statuses.groveCurse.effect.at(rnx, rny)
                //create a moving grove seedling if chance is higher than 0.5 and ajust the movement of the seed depending on chance
                if(chance >= 0.25 && Mathf.chance(chance)){
                    groveSeedling.createNet(Team.derelict, rnx, rny, WeatherState.windVector.angle(), 5, chance * 2, 1.5 - Math.random(0.5))
                    groveDrop.at(rnx, rny)
                }
                groveSeed.createNet(Team.derelict, rnx, rny, Mathf.random(360), chance * 5, chance, chance * 3)
            }
            else groveDrop.at(rnx, rny)
        }
        if(WeatherState.life < WeatherState.fadeTime){
            WeatherState.opacity = Math.min(WeatherState.life / WeatherState.fadeTime, WeatherState.opacity * 10 * chance);
        }else{
            WeatherState.opacity = Mathf.lerpDelta(WeatherState.opacity, 10 * chance, 0.004);
        }
    },
    color: Color.white,
    noiseColor: Color.valueOf("#c4cf6f"),
    particleRegion: "pixelcraft-bionorb",
    drawNoise: true,
    useWindVector: true,
    sizeMax: 8,
    sizeMin: 4,
    minAlpha: 0.1,
    maxAlpha: 0.8,
    density: 1850,
    baseSpeed: 3.45,
    status: statuses.seeded,
    statusDuration: 500,
    opacityMultiplier: 0.45,
    force: 0.15,
    sound: Sounds.wind,
    soundVol: 0.7,
    duration: 2 * Time.toMinutes
});
//corrosiveDownpour.attrs.set(Attribute.spores, 1),
//corrosiveDownpour.attrs.set(Attribute.light, -0.15),

const strongStorm = extend(ParticleWeather, "strong-storm", {
    color: Pal.darkMetal,
    noiseColor: Pal.darkMetal,
    particleRegion: "particle",
    noiseLayers: 3,
    drawNoise: true,
    useWindVector: true,
    sizeMax: 8,
    sizeMin: 4,
    minAlpha: 0.1,
    maxAlpha: 0.8,
    density: 1750,
    baseSpeed: 6.25,
    status: statuses.windswept,
    opacityMultiplier: 0.65,
    force: 0.35,
    sound: Sounds.wind,
    soundVol: 1,
    duration: 3 * Time.toMinutes
});

const charringDeluge = extend(ParticleWeather, "charring-deluge", {
    updateEffect(WeatherState){
        if(this.status != StatusEffects.none){
            if(WeatherState.effectTimer % 550 <= 1){
                Groups.unit.each(u => {
                    if(u.checkTarget(this.statusAir, this.statusGround)){
                        u.apply(this.status, this.statusDuration);
                    }
                });
            }
        }
        WeatherState.effectTimer += Time.delta;
    },
    update(WeatherState){
        this.super$update(WeatherState);
        let rnx = Mathf.random(1, Vars.world.tiles.width - 1);
        let rny = Mathf.random(1, Vars.world.tiles.height - 1);
        let s = Mathf.clamp(Mathf.sin(WeatherState.effectTimer /(510 * 60)) * Mathf.clamp(WeatherState.intensity * 10, 0, 1) * 2, 0, 3), d = WeatherState.life != Infinity ? 10 * Math.sin(WeatherState.life/(100 * 60)) : 10 * Mathf.sin(WeatherState.effectTimer/(200 * 60));
        let chance = WeatherState.intensity >= 1.11 ? 1 : Mathf.clamp(s/10 + Math.abs(Math.sin(d) * s/10 + Math.sin(d * d * 0.1) * 0.5 - Math.sin(s) * 0.5), s/4, s * 2 <= 0.5 ? 1 : 0.55)
        if(Vars.world.buildWorld(rnx * 8, rny * 8) == null && Vars.world.tile(rnx, rny) != null && Mathf.chance(chance)){
            rnx = rnx * 8
            rny = rny * 8
            if(Vars.world.tile(rnx/8, rny/8).block() == Blocks.air){
                if(chance >= 0.75 && Mathf.chance(chance)){
                    magmaeDropae.createNet(Team.derelict, rnx + Mathf.random(55), rny + Mathf.random(55), WeatherState.windVector.angle(), 35, chance * chance * 2, 1)
                }
                if(chance >= 0.5) magmaeDropae.createNet(Team.derelict, rnx, rny, WeatherState.windVector.angle(), 15, chance * chance, 1)
                Fires.create(Vars.world.tileWorld(rnx + Mathf.random(55), rny + Mathf.random(55)));
            }
        }
        if(WeatherState.life < WeatherState.fadeTime){
            WeatherState.opacity = Math.min((WeatherState.life / WeatherState.fadeTime) * 25 * chance * chance, WeatherState.opacity);
        }else{
            WeatherState.opacity = Mathf.lerpDelta(WeatherState.opacity, 25 * chance * chance, 0.004);
        }
    },
    color: Color.valueOf("#d2bd84"),
    noiseColor: Color.valueOf("#8a7333"),
    particleRegion: "particle",
    noiseLayers: 3,
    drawNoise: true,
    useWindVector: true,
    sizeMax: 8,
    sizeMin: 4,
    minAlpha: 0.1,
    maxAlpha: 0.4,
    density: 1750,
    baseSpeed: 1.25,
    status: StatusEffects.burning,
    statusDuration: 55,
    statusAir: false,
    opacityMultiplier: 0.25,
    force: 0.35,
    sound: Sounds.wind,
    soundVol: 1,
    duration: Time.toMinutes
});

module.exports = {
    seedStorm: seedStorm,
    strongStorm: strongStorm,
    charringDeluge: charringDeluge
};
