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
    Fill.circle(e.x + x, e.y + y, e.fout() * 1.8)
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
    Draw.color(Color.orange, Color.red, e.fin());
    Fill.circle(e.x, e.y, e.fslope() * 4);
    Fill.circle(e.x, e.y, e.fout() * 2);
    Draw.color(Color.orange, Color.red, e.fin());
    Lines.stroke(e.fslope() * 2);
    Lines.circle(e.x, e.y, e.fin() * 6);
    Draw.color(Color.white, Color.orange, e.fin());
    Lines.stroke(e.fin() * 2); 
});

//spore fire's fx
const sporefireFx = new Effect(20, e => {
    Draw.color(Color.blue, Color.purple, e.fin());
    Fill.circle(e.x, e.y, e.fslope() * 4);
    Fill.circle(e.x, e.y, e.fout() * 2);
    Draw.color(Color.purple, Color.white, e.fin());
    Lines.stroke(e.fslope() * 2);
    Lines.circle(e.x, e.y, e.fin() * 6);
    Draw.color(Color.white, Color.purple, e.fin());
    Lines.stroke(e.fin() * 2); 
});

//helgravator's coal status
const hellfire = extend(StatusEffect, "hellfire", {});

hellfire.speedMultiplier = 0.8;
hellfire.armorMultiplier = 0.75;
hellfire.damage = 1;
hellfire.effect = hellfireFX;
hellfire.color = Color.white;

//helgravator's spore status
const sporefire = extend(StatusEffect, "sporefire", {});

sporefire.speedMultiplier = 0.6;
sporefire.armorMultiplier = 0.75;
sporefire.damage = 0.1;
sporefire.effect = sporefireFx;
sporefire.color = Color.white;

//wind struck effect
const windsweptFx = new Effect(25, e => {
Draw.color(Color.white, Color.white, e.fin());
    Lines.stroke(e.fin() * 1);
    Lines.circle(e.x, e.y, e.fin() * 0.5);
    Lines.line(
        e.x + Mathf.sin(e.fout() * 2) * e.fout() * -20 + Mathf.sin(e.fout() * 2),
        e.y + Mathf.cos(e.fout() * 2) * e.fout() * -20 + Mathf.sin(e.fout() * 2),
        e.x + Mathf.sin(e.fout() * 2) * e.fout() * 20 + Mathf.cos(e.fout() * 2),
        e.y + Mathf.cos(e.fout() * 2) * e.fout() * 20 + Mathf.cos(e.fout() * 2)
    );
    Lines.line(
        e.x + Mathf.cos(e.fout() * 2) * e.fout() * -20 + Mathf.cos(e.fout() * 2),
        e.y + Mathf.sin(e.fout() * 2) * e.fout() * 20 + Mathf.cos(e.fout() * 2),
        e.x + Mathf.cos(e.fout() * 2) * e.fout() * 20 + Mathf.sin(e.fout() * 2),
        e.y + Mathf.sin(e.fout() * 2) * e.fout() * -20 + Mathf.sin(e.fout() * 2)
    );
});

// meep teach me how  work unit.impulse(Tmp.v3.set(unit).sub(this.x, this.y).nor().scl(type.knockback * 80f));

//windswept status effect
const windswept = extend (StatusEffect ,"windswept", {
    update(unit, time){
    this.super$update(unit, time);
     //unit.impulse(Tmp.v1.set(unit.x + 1 - Mathf.random(2), unit.y) + 1 - Mathf.random(2));
     //print(Tmp.v3.set);
     //print(unit.impulse);
    }
});

windswept.speedMultiplier = 0.8
windswept.damage = 0.08
windswept.effect = windsweptFx;

const blackoutFx = new Effect(35, e => {
    Draw.color(Color.black, Color.black, e.fin());
    Fill.circle(e.x, e.y, e.fout() * 3);
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
        let unitHpc = unit.health/unit.maxHealth;
        if(unitHpc > 0.5){
        unit.damageContinuousPierce(unit.maxHealth/2000 * unitHpc);
        }
        else if(unitHpc < 0.01){
            voidic.at(unit.x, unit.y);
            unit.remove();
            unit.destroy();
            unit.health = Number.MAX_VALUE * -1;
            unit.maxHealth = Number.MAX_VALUE * -1;
                }
        
        else if(unitHpc < 0.1){
            unit.damageContinuousPierce(unit.health/60 + 6);
        }

        else if(unitHpc < 0.2){
            unit.damageContinuousPierce(unit.maxHealth/6000);
        }
        
        else{ 
            unit.damageContinuousPierce(unit.maxHealth/600);
        }
    }
});
blackout.damage = 0;
blackout.effect = blackoutFx;

    module.exports = {
    ionisedStatus: ionisedStatus,
    chargedEffect: chargedEffect,
    hellfire: hellfire, 
    sporefire: sporefire,
    windswept: windswept,
    blackout: blackout
};