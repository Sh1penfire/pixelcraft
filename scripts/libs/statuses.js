const fc = require("libs/fc");

//ionised status effect's fx
const ionisedStatusFX = new Effect(24, e => {
    Draw.color(Color.white, Color.black, e.fin());
    Lines.stroke(e.fin() * 1);
    Lines.circle(e.x, e.y, e.fslope() * 5);
});

//puver's status effect
const ionisedStatus = extend(StatusEffect, "ionisedStatus", {
    isHidden(){
        return false
    },
    localizedName: "Ionised",
    speedMultiplier: 0.9,
    armorMultiplier: 0.5,
    damage: 0.2,
    effect: ionisedStatusFX,
    color: Color.cyan
});

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
const chargedEffect = extend(StatusEffect, "chargedEffect", {
    isHidden(){
        return false
    },
    localizedName: "Charged",
   speedMultiplier: 0.8,
   armorMultiplier: 0.3,
   damage: 0.3,
   effect: chargedEffectFX,
   color: Color.blue
});


const warmth = extend(StatusEffect, "warmth", {
    isHidden(){
        return false
    },
    localizedName: "Warmth",
    speedMultiplier: 1.5,
    healthMultiplier: 1.15,
    reloadMultiplier: 1.15,
    effect: Fx.freezing,
    effectChance: 0.07
});

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
    isHidden(){
        return false
    },
    localizedName: "Hellfire",
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
    isHidden(){
        return false
    },
    localizedName: "Sporefire",
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
sporefire.damage = 0.075;
sporefire.effect = sporefireFx;
sporefire.color = Color.white;

const sporefireC = extend(StatusEffect, "sporefireC", {})
sporefireC.speedMultiplier = 1.2;
sporefireC.damage = 0;
sporefireC.effect = sporefireFx;
sporefireC.color = Color.white;

//wind struck effect
const windsweptFx = new Effect(15, e => {
Draw.color(Pal.darkMetal, Color.valueOf("#ecdede"), Pal.darkMetal, e.fin());
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
    isHidden(){
        return false
    },
    localizedName: "Windswept",
    update(unit, time){
        this.super$update(unit, time);
        unit.impulse(Angles.trnsx(unit.rotation, Mathf.range(8 * unit.type.hitSize/2), 0), Angles.trnsy(unit.rotation, Mathf.range(8 * unit.type.hitSize/2), 0));
        unit.rotation = unit.rotation + Mathf.range(1);
    },
    speedMultiplier: 0.725,
    dragMultiplier: 0.65,
    damage: 0.0,
    effect: windsweptFx,
    color: Color.valueOf("#ecdede")
});


const blackoutFx = new Effect(35, e => {
    Draw.color(Color.black, Color.black, e.fin());
    Angles.randLenVectors(e.id, 2 , e.finpow() * 3, e.rotation, 360, (x, y) => {
        Fill.circle(e.x + x, e.y + y, e.fout() * 1 + Math.sin(e.fin() * 2 * Math.PI));
        Fill.circle(e.x + x, e.y + y, e.fout() * 1.2 + Math.sin(e.fin() * 2 * Math.PI));
    });
    Draw.reset();
    Draw.color(Color.valueOf("#9c7ae1"), Color.valueOf("#231841"), e.fin());
    Draw.alpha(0.35 * e.fout())
    Angles.randLenVectors(e.id, 2 , e.finpow() * 5, e.rotation, 360, (x, y) => {
        Fill.circle(e.x + x, e.y + y, e.fout() * 1 + Math.sin(e.fin() * 2 * Math.PI));
    });
});

const lingeringVoidic = new Effect(1800, e => {
    Draw.color(Color.valueOf("#9c7ae1"), Color.valueOf("#231841"), e.fout());
    
    Draw.alpha(e.fout() - 0.15)
    
    let region = e.data[0];
    
    let hitSize = e.data[1];
    
    if(region != null) Draw.rect(region, e.x, e.y, e.rotation - 90)
    
    Draw.color();
    
    Drawf.light(Team.derelict, e.x, e.y, hitSize, Color.valueOf("#9c7ae1"), e.fout() * 0.65);
})

const voidic = new Effect(65, e => {
    
    Draw.color(Color.black, Color.black, e.fout());
    
    Lines.stroke(e.fout() * 6); 
    
    let alpha = 1 -Math.sin(e.fout() * Math.PI + Math.PI/3);
    
    Lines.stroke(e.fout() * 2 + Math.sin(e.fin() * 4 * Math.PI));
    
    let scaling = -Math.sin(e.fout() * e.fout() * Math.PI + Math.PI/3);
    
    let fromColor = Color.valueOf("#9c7ae1"), toColor = Color.valueOf("#231841");
    fromColor.a = alpha, toColor.a = alpha;
    
    let multi = e.data + 15;
    
    Draw.alpha(alpha);
    
    Fill.light(e.x, e.y, 15, scaling * multi, fromColor, toColor);
    
    Lines.circle(e.x, e.y, Math.sin(e.fin() * 9) * 25); 
    Lines.circle(e.x, e.y, e.fin() * 50);
    Angles.randLenVectors(e.id, Math.round(multi/3) , -scaling *  multi/2.25 + multi/1.8, e.rotation, 360, (x, y) => {
        Draw.color(Color.valueOf("#9c7ae1"), Color.valueOf("#231841"), Math.abs(x/30) * Math.abs(y/30) * e.fout())
        Fill.circle(e.x + x, e.y + y, e.fout() * 1.2 + Math.sin(e.fin() * 4 * Math.PI));
    });
    Angles.randLenVectors(e.id, Math.round(multi/3) , -scaling *  multi/2.25 + multi/1.8, e.rotation, 360, (x, y) => {
        Draw.color(Color.valueOf("#9c7ae1"), Color.valueOf("#231841"), Math.abs(x/30) * Math.abs(y/30) * e.fout())
        Fill.square(e.x + x, e.y + y, e.fout() * 2 + Math.sin(e.fin() * 4 * Math.PI));
    });
});

//does around 0 damage per second... or does it.
let blackoutBaseDamage = 0;

const blackout = extend (StatusEffect, "blackout", {
    isHidden(){
        return false
    },
    localizedName: "Blackout",
    description: "Does percentile damage based on the aflicted's status effects",
    details: "Shreds a unit from the inside, slowly turning it into Voidicsm, which leaks out of the now hollow shell that it came from.",
    update(unit, time){
        this.super$update(unit, time);
        let multiplier = -1;
        let damageAmount = 0;
        let damageMulti = 1;
        if(unit.statuses.size > 0){
            for(let i = 0; i < unit.statuses.size; i++){
                if(unit.statuses.get(i).effect == prismium){
                    multiplier = multiplier + multiplier;
                    damageMulti = damageMulti * 2;
                }
                else if(unit.statuses.get(i).effect !== StatusEffects.boss){
                    multiplier = multiplier + damageMulti;
                    damageMulti = damageMulti * 0.5;
                }
                else{
                    multiplier = multiplier + damageMulti;
                    damageMulti = damageMulti * 0.1
                }
            }
        }
        
        if(unit.maxHealth == Infinity){
            if(Number.isNaN(unit.type.health) || unit.type.health == Number.MAX_VALUE || unit.type.health == Infinity) unit.maxHealth = 133769;
            else unit.maxHealth = unit.type.health;
        }
        if(unit.health == Infinity || Number.isNaN(unit.health)) unit.health = unit.maxHealth;
        
        let unitHpc = unit.health/unit.maxHealth;
        
        
        if(unitHpc < 0.05 || unit.dead){
            voidic.at(unit.x, unit.y, 0, unit.hitSize);
            lingeringVoidic.at(unit.x, unit.y, unit.rotation, [unit.type.region, unit.type.hitSize + 5]);
            unit.x = -Number.MAX_VALUE;
            unit.y = -Number.MAX_VALUE;
            Groups.unit.remove(unit);
            unit.destroy();
            unit.remove();
            damageAmount = unit.maxHealth;
            unit.maxHealth = -Number.MAX_VALUE;
            Log.info("say hai!");
            unit = null;
            return null;
        }
        
        else if(unitHpc > 0.5) damageAmount = unit.maxHealth/1000;
        
        else if(unitHpc < 0.1) damageAmount = unit.maxHealth/60 + 6;
        else if(unitHpc < 0.2) damageAmount = unit.maxHealth/4000;
        else if(unitHpc < 0.5) damageAmount = unit.maxHealth/3000;
        else damageAmount = unit.maxHealth/2000;
        
        Puddles.deposit(Vars.world.tileWorld(unit.x + 5 - Mathf.random(10), unit.y + 5 - Mathf.random(10)), Vars.content.getByName(ContentType.liquid, "pixelcraft-voidicsm"), 10 - 10 * unitHpc);
        let uHealth = unit.health;
        let trueDamage = (damageAmount + blackoutBaseDamage) * multiplier * Time.delta;
        if(trueDamage == 0) return null;
        unit.damagePierce(trueDamage);
        if(unit.health == uHealth){
            unit.health -= damageAmount * multiplier + blackoutBaseDamage;
        }
        Log.info(damageAmount);
        Log.info(unitHpc);
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
    isHidden(){
        return false
    },
    localizedName: "Prismium",
    speedMultiplier: 1,
    healthMultiplier: 1,
    damageMultiplier: 0.75,
    damage: 0.5,
    effect: prismiumStatusFX,
    effectChance: 0.09,
    update(unit, time){
        this.super$update(unit, time);
    }
});
prismium.color = Color.white;

const seededFX = new Effect(35, e =>{
    Draw.color(Color.white, Pal.plastanium, Pal.darkMetal, e.fin());
    Fill.circle(e.x, e.y, e.fout() * 1.25);
    Fill.circle(e.x, e.y, e.fout() * 1);
});

//light corrosion status effect
const seeded = extend (StatusEffect ,"seeded", {
    isHidden(){
        return false
    },
    localizedName: "Seeded",
    speedMultiplier: 0.86,
    dragMultiplier: 1.35,
    damage: 0.0,
    effect: seededFX,
    color: Pal.plastanium
});

const groveCurseFx = new Effect(20, e => {
    Draw.color(Color.valueOf("#ced671"), Color.white, Pal.darkMetal, e.fin());
    Fill.circle(e.x, e.y, e.fout());
    Lines.spikes(e.x, e.y, e.fin() * 1, e.fout() * 3, 3, e.fin() * 2);
});

const groveSpread = new Effect(15, e => {
    Draw.color(Color.valueOf("#ced671"), Color.white, Pal.darkMetal, e.fin());
    let oex = e.x + (e.data.x - e.x) * e.fin(), oey = e.y + (e.data.y - e.y) * e.fin()
    Lines.stroke(Math.abs(fc.helix(7, 5, e.fout())));
    Lines.line(oex, oey, e.data.x, e.data.y);
    Lines.circle(oex, oey, Math.abs(fc.helix(4, 2, e.fout())))
    Lines.circle(e.data.x, e.data.y, Math.abs(fc.helix(10, 2, e.fout())))
});

const groveCurse = extend(StatusEffect, "groveCurse", {
    isHidden(){
        return false
    },
    localizedName: "Grove Curse",
    update(unit, time){
        this.super$update(unit, time);
        if(Mathf.chance(0.1 * Time.delta)){
            let corrodiply = false;
            let explodeUnit = false;
            if(unit.statuses.size > 0){
                if(fc.statusCheck(unit, seeded)){
                    unit.apply(StatusEffects.corroded, 360)
                    corrodiply = true
                }
                else corrodiply = false
                if(fc.statusCheck(unit, StatusEffects.burning) || fc.statusCheck(unit, StatusEffects.melting)){
                    unit.apply(windswept, time);
                    unit.apply(StatusEffects.burning, time)
                    unit.damageContinuousPierce(0.05);
                    Fires.create(Vars.world.tileWorld(unit.x,unit.y));
                    unit.damageContinuousPierce(time * this.damage * 3);
                    Fx.blastExplosion.at(unit.x, unit.y, unit.rotation);
                    unit.unapply(groveCurse);
                }
            }
            let rad = corrodiply ? 12 : 6
            let u1 = Units.closest(unit.team, unit.x, unit.y, rad * 8, u => !u.hasEffect(groveCurse) || (!u.hasEffect(groveCurse) && corrodiply))
            if(u1 != null) if(!u1.isDead && (!u1.hasEffect(groveCurse) || (!u1.hasEffect(groveCurse) && corrodiply))){
                if(Mathf.chance(corrodiply ? 0.325 : 0.075)){
                    if(corrodiply == true){
                        u1.apply(seeded, time * 0.9);
                    }
                    u1.apply(groveCurse, time * 0.9);
                    groveSpread.at(unit.x, unit.y, 0, u1)
                }
            }
            if(corrodiply == true){
                let u2 = Units.closestEnemy(unit.team, unit.x, unit.y, rad * 8, u => !u.hasEffect(groveCurse) || (!u.hasEffect(groveCurse) && corrodiply))
                if(u2 != null) if(!u2.isDead && (!u2.hasEffect(groveCurse) || (!u2.hasEffect(groveCurse) && corrodiply))){
                    if(Mathf.chance(0.35)){
                        u2.apply(seeded, time * 0.9);
                        u2.apply(groveCurse, time * 0.9);
                        groveSpread.at(unit.x, unit.y, 0, u2)
                    }
                }
            }
        }
    }
});
groveCurse.damage = 0.1;
groveCurse.effect = groveCurseFx;

const lingeringCryo = new Effect(75, e =>{
    Draw.color(Color.white, Color.valueOf("#b6cad6"), e.fin());
    Draw.alpha(0.55 * e.fslope())
    Draw.z(Layer.bullet)
    Angles.randLenVectors(e.id, 2, e.finpow() * 5, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fslope() * 1.5);
  })
})

const magElelvation = extend(StatusEffect, "magElelvation", {
    isHidden(){
        return false
    },
    localizedName: "Magnetic Elevation",
    speedMultiplier: 0,
    dragMultiplier: 0.1,
    damage: 0,
    effect: windsweptFx,
    effectChance: 0.09,
    update(unit, time){
        this.super$update(unit, time)
        let acSTatus = fc.returnStatus(unit, magElelvation)
        if(time > 25){
            if(unit.elevation < 0.9){
                unit.elevation += 0.1
            }
            unit.impulse(Angles.trnsx(unit.baseRotation, unit.type.speed - unit.realSpeed(), 0), Angles.trnsy(unit.baseRotation, unit.type.speed - unit.realSpeed(), 0));
        }
        else if(unit.tileOn() != null && !unit.canPassOn()){
            if(unit.elevation > 0.1){
                unit.elevation -= 0.1
            }
        }
    }
});
prismium.color = Color.white;

const slushFall = extend(StatusEffect, "slushFall", {
    isHidden(){
        return false
    },
    localizedName: "Slushfall",
    update(unit, time){
        let acSTatus = fc.returnStatus(unit, slushFall);
        //past 12 seconds, scl is 1. Anywhere below 12 seconds and scl drops.
        let scl = Mathf.slerpDelta(0, 1, time/720)
        if(acSTatus.dragMultiplier != null) acSTatus.dragMultiplier = 1 - scl * 0.35
        acSTatus.speedMultiplier = 1 - scl
        acSTatus.reloadMultiplier = 1 - scl
        if(fc.statusCheck(unit, StatusEffects.freezing) && !fc.statusCheck(unit, warmth) && this.time < 721){
            this.time = 721
            lingeringCryo.at(unit.x, unit.y)
        }
        if(this.time > 550){
            unit.damageContinuousPierce(0.1)
        }
        let colour1 = Color.valueOf("#b6cad6"), colour2 = Color.valueOf("#6ecdec")
        //Untill I figure out how to change unit vel easly, this is going in the trash
        //unit.vel.set(Mathf.round(Mathf.slerpDelta(0, unit.vel.len, unit.speed/10) * 1000)/1000)
        let slushFallCovering = new Effect(5, e => {
        let colour1 = Color.valueOf("#b6cad6"), colour2 = Color.valueOf("#6ecdec")
        if(fc.statusCheck(unit, blackout)){
           colour1 = Pal.darkMetal, colour2 = Color.black
        }
        Draw.color(colour1, colour2, scl);
        Draw.alpha(scl * e.fslope())
        
        if(unit.dead || unit.health <= 0){
            Puddles.deposit(Vars.world.tileWorld(unit.x, unit.y), Liquids.cryofluid, unit.hitSize * 2);
        }    
        
        let unitRotation = unit.rotation - 90
        let drawingLayer = 0
        if((!unit.isGrounded() && unit.hovering) || unit.flying){
           drawingLayer = Layer.flyingUnit + 1
        }
        else{
           drawingLayer = Layer.groundUnit + 1
        }
        Draw.z(drawingLayer)
        Draw.rect(unit.type.outlineRegion, unit.x, unit.y, unitRotation);
        Draw.rect(unit.type.region, unit.x, unit.y, unitRotation);
        
        Draw.alpha(scl * e.fslope())
        Draw.color(colour1, unit.team.color, scl);
        Draw.rect(unit.type.cellRegion, unit.x, unit.y, unitRotation);
        
        Draw.color(colour1, colour2, scl);
        for(let i = 0; i < unit.mounts.length; i++){
            let mount = unit.mounts[i];
            let weapon = mount.weapon;
            if(weapon.region != Core.atlas.find("none")){
            //Meep I understand this is in a lib but I don't want the mod to have dependancies...
            let weaponRotation = unit.rotation - 90
            if(weapon.rotate){
                weaponRotation = mount.rotation + unit.rotation - 90
            }
            let recoil = -mount.reload/weapon.reload * weapon.recoil;
            let mirrornt = 1
            if(weapon.mirror == true){
                mirrornt = -1
            }
                let wx = unit.x + Angles.trnsx(unitRotation, weapon.x, weapon.y) + Angles.trnsx(weaponRotation, 0, recoil)
                let wy = unit.y + Angles.trnsy(unitRotation, weapon.x, weapon.y) + Angles.trnsy(weaponRotation, 0, recoil)
            
            Draw.alpha(scl * e.fslope())
            
            //when you can't get weapons to show up correctly: :cherrycri:
            //when weapons glitch out: :kindlingship:
            if(weapon.outlineRegion != Core.atlas.find("error")){
                Draw.rect(weapon.outlineRegion, wx, wy, weaponRotation);
            }
            //Fill.circle(wx, wy, scl * 2)
            Draw.rect(weapon.region, wx, wy, weaponRotation);
        }
        }
        }).at(unit.x, unit.y);
        this.super$update(unit, time)
    },
    damage: 0,
    effect: lingeringCryo
});

module.exports = {
    ionisedStatus: ionisedStatus,
    chargedEffect: chargedEffect,
    warmth: warmth,
    hellfire: hellfire, 
    sporefire: sporefire,
    sporefireC: sporefireC,
    windswept: windswept,
    seeded: seeded,
    blackout: blackout,
    prismium: prismium,
    groveCurse: groveCurse,
    magElelvation: magElelvation,
    slushFall: slushFall
};