const rusted = require("units/rusted");
let never = Number.MAX_VALUE;

function pUnit(str){
    return Vars.content.getByName(ContentType.unit, "pixelcraft-" + str);
};

function genSpawnGroup(object){
    if (object.type == null) object.type = pUnit("rustyalpha")
    object.end = object.end > 2147483647 ? 2147483647 : object.end;
    return Object.assign(new SpawnGroup, object);
}

const pWaves = extend(Waves, {
    get(){
        let spawns = Seq.with(
            genSpawnGroup({
                type: pUnit("crystal"),
                unitScaling: 2,
                max: 3 
            }),
            genSpawnGroup({
                type: pUnit("rustyalpha"),
                begin: 4,
                end: 13,
                unitAmount: 2,
                unitScaling: 1.5
            }),
            genSpawnGroup({
                type: pUnit("shard"),
                begin: 12,
                end: 16,
                unitScaling: 1
            }),
            genSpawnGroup({
                type: pUnit("crystal"),
                begin: 11,
                unitScaling: 1.7,
                spacing: 3,
                max: 4,
                shieldScaling: 25
            })
            /*

            new SpawnGroup(pulsar){{
                begin = 13;
                spacing = 3;
                unitScaling = 0.5f;
                max = 25;
            }},

            new SpawnGroup(mace){{
                begin = 7;
                spacing = 3;
                unitScaling = 2;

                end = 30;
            }},

            new SpawnGroup(dagger){{
                begin = 12;
                unitScaling = 1;
                unitAmount = 4;
                spacing = 2;
                shieldScaling = 20f;
                max = 14;
            }},

            new SpawnGroup(mace){{
                begin = 28;
                spacing = 3;
                unitScaling = 1;
                end = 40;
                shieldScaling = 20f;
            }},

            new SpawnGroup(spiroct){{
                begin = 45;
                spacing = 3;
                unitScaling = 1;
                max = 10;
                shieldScaling = 30f;
                shields = 100;
                effect = StatusEffects.overdrive;
            }},

            new SpawnGroup(pulsar){{
                begin = 120;
                spacing = 2;
                unitScaling = 3;
                unitAmount = 5;
                effect = StatusEffects.overdrive;
            }},

            new SpawnGroup(flare){{
                begin = 16;
                unitScaling = 1;
                spacing = 2;
                shieldScaling = 20f;
                max = 20;
            }},

            new SpawnGroup(quasar){{
                begin = 82;
                spacing = 3;
                unitAmount = 4;
                unitScaling = 3;
                shieldScaling = 30f;
                effect = StatusEffects.overdrive;
            }},

            new SpawnGroup(pulsar){{
                begin = 41;
                spacing = 5;
                unitAmount = 1;
                unitScaling = 3;
                effect = StatusEffects.shielded;
                max = 25;
            }},

            new SpawnGroup(fortress){{
                begin = 40;
                spacing = 5;
                unitAmount = 2;
                unitScaling = 2;
                max = 20;
                shieldScaling = 30;
            }},

            new SpawnGroup(nova){{
                begin = 35;
                spacing = 3;
                unitAmount = 4;
                effect = StatusEffects.overdrive;
                items = new ItemStack(Items.blastCompound, 60);
                end = 60;
            }},

            new SpawnGroup(dagger){{
                begin = 42;
                spacing = 3;
                unitAmount = 4;
                effect = StatusEffects.overdrive;
                items = new ItemStack(Items.pyratite, 100);
                end = 130;
                max = 30;
            }},

            new SpawnGroup(horizon){{
                begin = 40;
                unitAmount = 2;
                spacing = 2;
                unitScaling = 2;
                shieldScaling = 20;
            }},

            new SpawnGroup(flare){{
                begin = 50;
                unitAmount = 4;
                unitScaling = 3;
                spacing = 5;
                shields = 100f;
                shieldScaling = 10f;
                effect = StatusEffects.overdrive;
                max = 20;
            }},

            new SpawnGroup(zenith){{
                begin = 50;
                unitAmount = 2;
                unitScaling = 3;
                spacing = 5;
                max = 16;
                shieldScaling = 30;
            }},

            new SpawnGroup(nova){{
                begin = 53;
                unitAmount = 2;
                unitScaling = 3;
                spacing = 4;
                shieldScaling = 30;
            }},

            new SpawnGroup(atrax){{
                begin = 31;
                unitAmount = 4;
                unitScaling = 1;
                spacing = 3;
                shieldScaling = 10f;
            }},

            new SpawnGroup(scepter){{
                begin = 41;
                unitAmount = 1;
                unitScaling = 1;
                spacing = 30;
                shieldScaling = 30f;
            }},

            new SpawnGroup(reign){{
                begin = 81;
                unitAmount = 1;
                unitScaling = 1;
                spacing = 40;
                shieldScaling = 30f;
            }},

            new SpawnGroup(antumbra){{
                begin = 120;
                unitAmount = 1;
                unitScaling = 1;
                spacing = 40;
                shieldScaling = 30f;
            }},

            new SpawnGroup(vela){{
                begin = 100;
                unitAmount = 1;
                unitScaling = 1;
                spacing = 30;
                shieldScaling = 30f;
            }},

            new SpawnGroup(corvus){{
                begin = 145;
                unitAmount = 1;
                unitScaling = 1;
                spacing = 35;
                shieldScaling = 30f;
                shields = 100;
            }},

            new SpawnGroup(horizon){{
                begin = 90;
                unitAmount = 2;
                unitScaling = 3;
                spacing = 4;
                shields = 40f;
                shieldScaling = 30f;
            }},

            new SpawnGroup(toxopid){{
                begin = 210;
                unitAmount = 1;
                unitScaling = 1;
                spacing = 35;
                shields = 1000;
                shieldScaling = 35f;
            }})*/
        )
        return spawns;
    },
    generate(difficulty, rand, attack){
        let species = [
        [pUnit("crystal"), pUnit("stalactite"), pUnit("stalagmite"), pUnit("rustyomega"), pUnit("rustyomega")],
        [pUnit("blink"), pUnit("nescience"), pUnit("deluge"), pUnit("inscience"), pUnit("inscience")],
        [pUnit("rustyalpha"), pUnit("rustydelta"), pUnit("rustytau"), pUnit("rustyomega"), pUnit("rustyomega")],
        [pUnit("shard"), pUnit("capsule"), pUnit("rustyjavalin"), rand.chance(0.5) ? pUnit("insuculur") : pUnit("insuculur"), rand.chance(0.1) ? pUnit("insuculur") : pUnit("insuculur")]
        ];
        //wait it's all inseculur?
        //ALWAYS HAS BEEEEEEEEEEEEEN
        
        //required progression:
        //- extra periodic patterns

        let out = Seq.with();

        //Define the wave cap
        let cap = 150;

        let shieldStart = 30, shieldsPerWave = 20 + difficulty * 30;
        let scaling = [1, 2, 3, 4, 5];
        
        let createProgression = (start, tier, intervielf) => {
            //main sequence
            let curSpecies = species[Mathf.round(Mathf.random(3))];
            let curTier = 0 + tier;

            for(let i = start - 1; i < cap; i++){
                let f = Math.abs(i - 1);
                let next = rand.random(8, 16) + Mathf.lerp(5, 0, difficulty) + curTier * 4;

                let shieldAmount = Math.max((i - shieldStart) * shieldsPerWave, 0);
                let space = start == 0 ? 1 : rand.random(1, 2);
                let ctier = curTier;

                //main progression
                out.add(genSpawnGroup({
                    type: curSpecies[Math.min(curTier, curSpecies.length - 2)],
                    unitAmount: f == start ? 1 : 4 / scaling[ctier],
                    begin: f,
                    end: f + next >= cap ? never : f + next,
                    max: difficulty * 2 + 3,
                    unitScaling: (difficulty < 0.4 ? rand.random(1.5, 3) : rand.random(1, 4)) * scaling[ctier],
                    shields: shieldAmount,
                    shieldScaling: shieldsPerWave,
                    spacing: space
                }));

                //small chance to switch species
                if(rand.chance(0.3)){
                    curSpecies = Structs.random(species);
                }
                
                //extra progression that tails out, blends in
                out.add(genSpawnGroup({
                    type: curSpecies[Math.min(curTier, curSpecies.length - 2)],
                    unitAmount: 3 / scaling[ctier],
                    begin: f + next + intervielf,
                    end: f + next + intervielf + rand.random(6, 10),
                    max: 6,
                    unitScaling: rand.random(1, 2),
                    spacing: rand.random(2, 4),
                    shields: shieldAmount/2,
                    shieldScaling: shieldsPerWave
                }));

                i += next + intervielf + 1;
                if(curTier < 3 || (rand.chance(0.02) && difficulty > 0.8)){
                    curTier ++;
                }

                //do not spawn bosses
                curTier = Math.min(curTier, 3);
            }
        };
        //todo: add random stronger waves
        
        createProgression(0, 0, 1);
        createProgression(3, 0, 6);
        let step = 4 + rand.random(2);

        while(step <= cap){
            //increase starting tier after awhile
            createProgression(step, Math.round(step/cap * 2) + 1, 9 - difficulty/2);
            step += rand.random(15, 30) * Mathf.lerp(1, 0.5, difficulty);
        }

        let bossWave = rand.random(50, 70) * Mathf.lerp(1, 0.7, difficulty);
        let bossSpacing = rand.random(25, 40) * Mathf.lerp(1, 0.6, difficulty);

        let bossTier = difficulty < 0.6 ? 3 : 4;
        
        //main boss progression
        out.add(genSpawnGroup({
            type: Structs.random(species)[bossTier],
            unitAmount: 1,
            begin: bossWave,
            spacing: bossSpacing,
            end: never,
            max: 16,
            unitScaling: bossSpacing,
            shieldScaling: shieldsPerWave,
            effect: StatusEffects.boss
        }));

        //alt boss progression
        out.add(genSpawnGroup({
            type: Structs.random(species)[bossTier],
            unitAmount: 1,
            begin: bossWave + rand.random(3, 5) * bossSpacing,
            spacing: bossSpacing,
            end: never,
            max: 16,
            unitScaling: bossSpacing,
            shieldScaling: shieldsPerWave,
            effect: StatusEffects.boss
        }));

        let finalBossStart = 120 + rand.random(30);

        //final boss waves
        out.add(genSpawnGroup({
            type: Structs.random(species)[bossTier],
            unitAmount: 1,
            begin: finalBossStart,
            spacing: bossSpacing/2,
            end: never,
            unitScaling: bossSpacing,
            shields: 500,
            shieldScaling: shieldsPerWave * 4,
            effect: StatusEffects.boss
        }));

        //final boss waves (alt)
        out.add(genSpawnGroup({
            type: Structs.random(species)[bossTier],
            unitAmount: 1,
            begin: finalBossStart + 15,
            spacing: bossSpacing/2,
            end: never,
            unitScaling: bossSpacing,
            shields: 500,
            shieldScaling: shieldsPerWave * 4,
            effect: StatusEffects.boss
        }));

        //add tridents to heal the base.
        if(attack && difficulty >= 0.2){
            let amount = Mathf.random(1, 3 + difficulty * 2);
            for(let i = 0; i < amount; i++){
                let wave = Mathf.random(1, 7);
                out.add(genSpawnGroup({
                    type: pUnit("rustytrident"),
                    unitAmount: difficulty > 0.7 ? Math.abs(difficulty/2) - 2 : 1,
                    begin: wave,
                    end: wave,
                    max: 16
                }));
            }
        }
        //shift back waves on higher difficulty for a harder start
        let shift = Math.max(difficulty * 5 - 5, 0);

        out.forEach(group => {
            if (group.type == null){
                out.remove(group)
                return;
            }
            group.begin -= shift;
            group.end -= shift;
            group.begin = group.begin < 0 ? 0 : Mathf.round(group.begin);
            group.end = group.end < 0 ? Math.abs(shift) : Mathf.round(group.begin);
            print(group.type);
            print(group.begin);
            print(group.max);
            print(group.spacing);
            print(group.unitScaling);
            print(group.unitAmount);
            print(group.shieldScaling);
        });

        return out;
    }
});

module.exports = {
    pUnit: pUnit,
    waves: pWaves
}