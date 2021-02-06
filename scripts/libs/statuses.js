const fc = require("libs/fc");

//ionised status effect's fx
const ionisedStatusFX = new Effect(24, e => {
    Draw.color(Color.white, Color.black, e.fin());
    Lines.stroke(e.fin() * 1);
    Lines.circle(e.x, e.y, e.fslope() * 5);
});

//puver's status effect
const ionisedStatus = extend(StatusEffect, "ionisedStatus", {});

ionisedStatus.speedMultiplier = 0.5;
ionisedStatus.armorMultiplier = 0.5;
ionisedStatus.damage = 0.2;
ionisedStatus.effect = ionisedStatusFX;
ionisedStatus.color  = Color.white;

//charged status Fx 
const chargedEffectFX = new Effect(27, (e) => {
  Angles.randLenVectors(e.id, 2, 1 + e.fin() * 10, (x, y) => {
    Draw.color(Color.white, Color.valueOf("0A01b7"), e.fslope());
    Fill.circle(e.x + x, e.y + y, e.fout() * 1.8);
    Draw.color(Color.valueOf("0A01b7"), Color.valueOf("56D7CA"), e.fslope());
    Fill.circle(e.x + x, e.y + y, e.fout() * 1.5)
  });
});

//psion's status effect
const chargedEffect = extend(StatusEffect, "chargedEffect", {});

chargedEffect.speedMultiplier = 0.3;
chargedEffect.armorMultiplier = 0.1;
chargedEffect.damage = 0.3;
chargedEffect.effect = chargedEffectFX;
chargedEffect.color  = Color.white;

//helfire's fx
const hellfireFX = new Effect(20, e => {
    Draw.alpha(e.fout())
    Draw.color(Color.orange, Color.red, e.fin());
    Fill.circle(e.x, e.y, e.fslope() * 2);
    Fill.circle(e.x, e.y, e.fout() * 1);
    Draw.color(Color.orange, Color.red, e.fin());
    Lines.stroke(e.fslope() * 1);
    Lines.circle(e.x, e.y, e.fin() * 3);
    Draw.color(Color.white, Color.orange, e.fin());
    Lines.stroke(e.fin() * 1); 
});

//spore fire's fx
const sporefireFx = new Effect(20, e => {
    Draw.color(Pal.spore, Color.purple, e.fin());
    Fill.circle(e.x, e.y, e.fslope() * 2);
    Fill.circle(e.x, e.y, e.fout() * 1);
});

const extraFireSporeFx = new Effect(25, e => {
    Draw.color(Color.blue, Color.white, e.fin());
    Fill.circle(e.x, e.y, e.fslope() * 2);
    Fill.circle(e.x, e.y, e.fout() * 1);
});

//helgravator's coal status
const hellfire = extend(StatusEffect, "hellfire", {
    update(unit, time){
        this.super$update(unit, time);
        if(Mathf.chance(0.1 * Time.delta)){
            Fires.create(Vars.world.tileWorld(unit.x,unit.y));
            let rad = 3;
            Units.nearby(unit.team, unit.x - rad * 8 * 4, unit.y - rad * 4, rad * 8, rad * 8, cons(u => {
            if(Mathf.dst(unit.x, unit.y, u.x, u.y) < 40){
                if(!u.isDead){
                    if(u.team = unit.team){
                        u.apply(hellfire, time * 0.9);
                    }
                }
                }
            }));
        }
    }
});
    
hellfire.speedMultiplier = 0.8;
hellfire.armorMultiplier = 0.75;
hellfire.damage = 1;
hellfire.effect = hellfireFX;
hellfire.color = Color.white;

//helgravator's spore status
const sporefire = extend(StatusEffect, "sporefire", {
    update(unit, time){
        this.super$update(unit, time);
            if(Mathf.chance(0.1 * Time.delta)){
            if(unit.statuses.size > 0){
                for(let i = 0; i < unit.statuses.size; i++){
                    let Cs = unit.statuses.get(i).effect;
                    if(Cs == sporefireC){
                        unit.heal(0.1);
                    }
                    else{
                        if(Cs == StatusEffects.sapped){
                            unit.apply(StatusEffects.sporeSlowed, time);
                            unit.damageContinuousPierce(0.01);
                            extraFireSporeFx.at(unit.x + Tmp.v1.x, unit.y + Tmp.v1.y);
                        }
                        else if(Cs == StatusEffects.sporeSlowed){
                            unit.apply(StatusEffects.sapped, time);
                            unit.damageContinuousPierce(0.01);
                        }
                    }
                }
            }
        }
    }
});

sporefire.speedMultiplier = 1;
sporefire.armorMultiplier = 0.75;
sporefire.damage = 0;
sporefire.effect = sporefireFx;
sporefire.color = Color.white;

const sporefireC = extend(StatusEffect, "sporefireC", {})
sporefireC.speedMultiplier = 1.2;
sporefireC.damage = 0;
sporefireC.effect = sporefireFx;
sporefireC.color = Color.white;

//wind struck effect
const windsweptFx = new Effect(15, e => {
Draw.color(Color.white, Color.white, e.fin());
    Lines.stroke(e.fout() * 1);
    Lines.circle(e.x, e.y, e.fin() * 1);
    Lines.line(
        e.x + Mathf.sin(e.fout() * 2) * e.fout() * -3 + Mathf.sin(e.fout() * 2),
        e.y + Mathf.cos(e.fout() * 2) * e.fout() * -3 + Mathf.sin(e.fout() * 2),
        e.x + Mathf.sin(e.fout() * 2) * e.fout() * 3 + Mathf.cos(e.fout() * 2),
        e.y + Mathf.cos(e.fout() * 2) * e.fout() * 3 + Mathf.cos(e.fout() * 2)
    ); 
    Lines.line(
        e.x + Mathf.cos(e.fout() * 2) * e.fout() * -3 + Mathf.cos(e.fout() * 2),
        e.y + Mathf.sin(e.fout() * 2) * e.fout() * 3 + Mathf.cos(e.fout() * 2),
        e.x + Mathf.cos(e.fout() * 2) * e.fout() * 3 + Mathf.sin(e.fout() * 2),
        e.y + Mathf.sin(e.fout() * 2) * e.fout() * -3 + Mathf.sin(e.fout() * 2)
    );
});

// meep teach me how  work unit.impulse(Tmp.v3.set(unit).sub(this.x, this.y).nor().scl(type.knockback * 80f));

//windswept status effect
const windswept = extend (StatusEffect ,"windswept", {
    update(unit, time){
    this.super$update(unit, time);
    unit.impulse(Mathf.range(100), Mathf.range(100));
    unit.rotation = unit.rotation + Mathf.range(5);
    }
});

windswept.speedMultiplier = 0.8;
windswept.damage = 0.08;
windswept.effect = windsweptFx;

const blackoutFx = new Effect(35, e => {
    Draw.color(Color.black, Color.black, e.fin());
  Angles.randLenVectors(e.id, 2 , e.finpow() * 3, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 1 + Math.sin(e.fin() * 2 * Math.PI));
    Fill.circle(e.x + x, e.y + y, e.fout() * 1.2 + Math.sin(e.fin() * 2 * Math.PI));
  })
});

const voidic = new Effect(50, e => {
    Draw.color(Color.black, Color.black, e.fout());
    Lines.stroke(e.fout() * 6); 
    Lines.circle(e.x, e.y, Math.sin(e.fin() * 9) * 25); 
    Lines.circle(e.x, e.y, e.fin() * 50);
});

const blackout = extend (StatusEffect, "blackout", {
    update(unit, time){
        this.super$update(unit, time);
        let multiplier = -1;
        let damageAmount = 0;
        let damageMulti = 1;
        if(unit.statuses.size > 0){
            for(let i = 0; i < unit.statuses.size; i++){
                    if(unit.statuses.get(i).effect !== StatusEffects.boss){
                        multiplier = multiplier + damageMulti;
                        damageMulti = damageMulti * 0.5;
                    }
                    else if(unit.statuses.get(i).effect == prismium){
                        multiplier = multiplier + multiplier;
                        damageMulti = damageMulti * 2;
                    }
                }
            }
        let unitHpc = unit.health/unit.maxHealth;
        if(Mathf.chance(Time.delta)){
        if(unitHpc > 0.5){
        damageAmount = unit.maxHealth/1000;
        }
        else if(unitHpc < 0.01){
            voidic.at(unit.x, unit.y);
            unit.remove();
            unit.destroy();
            damageAmount = unit.maxHealth;
            }
        else if(unitHpc < 0.1){
            damageAmount = unit.health/60 + 6;
        }

        else if(unitHpc < 0.2){
            damageAmount = unit.maxHealth/4000;
        }
        
        else if(unitHpc < 0.5){
        damageAmount = unit.maxHealth/3000;
        }
        
        else{ 
            damageAmount = unit.maxHealth/2000;
        }
        unit.damageContinuousPierce(damageAmount * multiplier);
        
        Puddles.deposit(Vars.world.tileWorld(unit.x + Mathf.random(10), unit.y + Mathf.random(10)), Vars.content.getByName(ContentType.liquid, "pixelcraft-voidicsm"), 10 - 10 * unitHpc);
    }
    }
});
blackout.damage = 0.00;
blackout.effect = blackoutFx;

const fromColor = [Color.red, Color.orange, Color.yellow, Color.green, Color.blue, Color.purple];
const toColor = [Pal.health, Pal.lightOrange, Pal.missileYellow, Pal.plastaniumBack, Pal.lancerLaser, Pal.spore];

const prismiumStatusFX = new Effect(50, e => {
  for(let h in fromColor){
    Draw.color(fromColor[h], toColor[h], e.fin());
    Angles.randLenVectors(e.id, 1, e.finpow() * h * 2, e.rotation, 360, (x, y) => {
      Fill.circle(e.x + x, e.y + y, e.fout() * 1.5);
      Fill.circle(e.x + x, e.y + y * -1, e.fout() * 1.5);
      Fill.circle(e.x + x * -1, e.y + y * -1, e.fout() * 1.5);
      Fill.circle(e.x + x * -1, e.y + y, e.fout() * 1.5);
    });
  };
});

const prismium = extend(StatusEffect, "prismium", {
    speedMultiplier: 1,
    healthMultiplier: 1,
    damageMultiplier: 0.75,
    damage: 0.5,
    effect: prismiumStatusFX,
    effectChance: 0.09
});
prismium.color = Color.white;

const groveCurseFx = new Effect(25, e => {
    Draw.color(Color.valueOf("#ced671"), Color.white, Pal.darkMetal, e.fin());
    Fill.circle(e.x, e.y, e.fout());
    Lines.spikes(e.x, e.y, e.fin() * 1, e.fout() * 3, 3, e.fin() * 2);
});

const groveCurse = extend(StatusEffect, "groveCurse", {
    update(unit, time){
        this.super$update(unit, time);
        if(Mathf.chance(0.1 * Time.delta)){
            let rad = 3;
            Units.nearby(unit.team, unit.x - rad * 4, unit.y - rad * 4, rad * 8, rad * 8, cons(u => {
            if(Mathf.dst(unit.x, unit.y, u.x, u.y) < 40){
                if(!u.isDead){ if(Mathf.chance(0.05)){u.apply(groveCurse, time * 0.9);}}
                }
            }));
            if(unit.statuses.size > 0){
                for(let i = 0; i < unit.statuses.size; i++){
                    let Cs = unit.statuses.get(i).effect;
                    if(Cs == StatusEffects.burning){
                        unit.apply(windswept, time);
                        unit.apply(StatusEffects.burning, time)
                        unit.damageContinuousPierce(0.05);
                        Fires.create(Vars.world.tileWorld(unit.x,unit.y));
                    }
                }
            }
        }
        }
});
groveCurse.damage = 0.1;
groveCurse.effect = groveCurseFx;

    module.exports = {
    ionisedStatus: ionisedStatus,
    chargedEffect: chargedEffect,
    hellfire: hellfire, 
    sporefire: sporefire,
    sporefireC: sporefireC,
    windswept: windswept,
    blackout: blackout,
    prismium: prismium,
    groveCurse: groveCurse
};