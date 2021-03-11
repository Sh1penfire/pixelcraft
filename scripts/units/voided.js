const refresh = require("libs/refresh")
const fc = require("libs/fc")
const theAislol = require("libs/theAislol")
const statuses = require("libs/statuses")

const voidExplosion = new Effect(65, e => {
    Draw.color(Color.black, Color.black, e.fout());
    Lines.stroke(e.fout() * 6); 
    
    let alpha = 1 -Math.sin(e.fout() * Math.PI + Math.PI/3)
    
    Draw.alpha(alpha)
    
    Lines.stroke(e.fout() * 2 + Math.sin(e.fin() * 4 * Math.PI))
    
    let scaling = -Math.sin(e.fout() * e.fout() * Math.PI + Math.PI/3)
    
    let fromColor = Color.valueOf("#9c7ae1"), toColor = Color.valueOf("#231841")
    fromColor.a = alpha, toColor.a = alpha
    
    Fill.light(e.x, e.y, 15, scaling * e.data[0], fromColor, toColor)
    
    Lines.circle(e.x, e.y, scaling * e.data[0]); 
    
    Angles.randLenVectors(e.id, e.data[3] , -scaling *  e.data[1] + e.data[2], e.rotation, 360, (x, y) => {
        Draw.color(Color.valueOf("#9c7ae1"), Color.valueOf("#231841"), Math.abs(x/30) * Math.abs(y/30) * e.fout())
        Fill.circle(e.x + x, e.y + y, e.fout() * 1.2 + Math.sin(e.fin() * 4 * Math.PI));
    });
    Angles.randLenVectors(e.id, e.data[3] , -scaling *  e.data[1] + e.data[2], e.rotation, 360, (x, y) => {
        Draw.color(Color.valueOf("#9c7ae1"), Color.valueOf("#231841"), Math.abs(x/30) * Math.abs(y/30) * e.fout())
        Fill.square(e.x + x, e.y + y, e.fout() * 2 + Math.sin(e.fin() * 4 * Math.PI));
    });
});

const voidPop = new Effect(75, e => {
    
    let fromColor = Color.valueOf("#9c7ae1"), toColor = Color.valueOf("#231841")
    fromColor.a = e.data[3] * e.fout() * e.fout(), toColor.a = e.data[3] * e.fout() * e.fout()
    
    Draw.color(fromColor, toColor, e.fout())
    
    Fill.light(e.data[0].x, e.data[0].y, e.data[1], e.data[2], fromColor, toColor);
    Angles.randLenVectors(e.id, 6, e.fin() * e.fin() *  e.data[2] + 2, e.rotation, 360, (x, y) => {
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fout() * 5);
    });
});

const voidicExplosionB = extend(BombBulletType, {
    darkSplash(b){
        let rad = b.owner.hitSize + 35;
        Units.nearby(b.x - rad * 4, b.y- rad * 4, rad * 8, rad * 8, cons(u => {
            if(!u.isDead && Mathf.dst(b.x, b.y, u.x, u.y) < b.owner.hitSize + 35){
                u.apply(statuses.blackout, 360);
                u.damageContinuousPierce(b.owner.maxHealth/10);
            }
        }));
    },
    hit(b){
        this.darkSplash(b);
    },
    despawned(b){
        this.darkSplash(b);
        this.super$despawned(b);
    },
    lifetime: 0,
    despawnEffect: Fx.none,
    status: statuses.blackout
});

const blink = extend(UnitType, "blink", {
    load(){
        this.super$load()
        let blinkImmunities = [StatusEffects.wet, StatusEffects.burning, StatusEffects.melting, StatusEffects.corroded, statuses.blackout];
        for (var i in blinkImmunities){
            blink.immunities.add(blinkImmunities[i]);
        }
    },
    //haha no light goes br
    drawLight(unit){}
});
blink.constructor = () => extend(MechUnit, {
    damage(number){
        if(number > 0){
            if(this.vShield >= 1){
                this.DR = 1;
                this.vShield--;
                this.eAlpha = 1;
                if(this.vShield < 1 && !this.sBroken){
                    this.sBroken = true;
                    this.vRecharge = 0;
                    voidPop.at(this.x, this.y, 0, [this, 5, this.hitSize + 3, this.eAlpha]);
                }
                else this.vRecharge += 0.01;
            }
            else{
                this.DR = Mathf.slerpDelta(this.DR, 0, 0.01);
                this.vShield = 0;
            }
            if(number < this.type.health * 12.5){
                number = number * (1 - this.DR);
            }
            else{
                number = number * (1 - this.DR * 0.5);
            }
        }
        else this.eAlpha = 1;
        
        if(number > 0) this.super$damage(number);
        else this.hitTime = 1;
    },
    update(){
        if(Mathf.chance(Time.delta)){
            this.super$update();
            this.healFract(this.HPS/6000);
            this.DR = Mathf.slerpDelta(this.DR, 0, 0.01);
            if(!this.sBroken) this.vShield = Mathf.slerpDelta(this.vShield, this.sLimit, 0.001);
            this.eAlpha = Mathf.slerpDelta(this.eAlpha, 0, 0.01);
            if(this.vRecharge < 1 && this.sBroken) this.vRecharge += 0.005;
            else if(this.sBroken) this.sBroken = false;
            this.dCol1.a = this.vShield/2.15 * this.eAlpha *  Mathf.clamp(Math.round(this.vShield), 0, 1), this.dCol2.a = this.eAlpha *  Mathf.clamp(Math.round(this.vShield), 0, 1);
        }
    },
    draw(){
        this.super$draw();
        if(this.eAlpha > 0) Fill.light(this.x, this.y, 5, this.hitSize * 1.25, this.dCol1, this.dCol2);
        Draw.color(Color.valueOf("#9c7ae1"),Color.valueOf("#231841"), Mathf.clamp(this.vShield, 0, 1));
        Draw.alpha(this.vShield);
        Lines.circle(this.x, this.y, this.hitSize + 3);
    },
    killed(){
        this.super$killed();
        voidExplosion.at(this.x, this.y, this.rotation, [this.hitSize * 4, 3, 5, 4]);
        voidicExplosionB.create(this, this.team, this.x, this.y, this.rotation, 0, 0);
    },
    classId: () => blink.classId,
    dCol1: Color.valueOf("#9c7ae1"),
    dCol2: Color.valueOf("#231841"),
    eAlpha: 0,
    vShield: 1,
    sLimit: 1.5,
    DR: 0,
    HPS: 0.05,
    sRecharge: 1,
    sBroken: false
});
//dCol1 & 2 are the colors used for the shield and effect
//eAlpha is the effect alpha of the effects and unit's void shield
//vSheild is the amount of charge is stored in the unit to activate the void shield
//sLimit is how many shields the unit can store. If below 1, unit can't store void shields
//DR is the percentage of damage the unit negates. Starts at 0, and raises when the shield is activated.
refresh(blink);

//I should make a lib... -_-
const nescience = extend(UnitType, "nescience", {
    load(){
        this.super$load()
        let nescienceImmunities = [StatusEffects.wet, StatusEffects.burning, StatusEffects.melting, StatusEffects.corroded, statuses.blackout];
        for (var i in nescienceImmunities){
            nescience.immunities.add(nescienceImmunities[i]);
        }
    },
    drawLight(unit){}
});
nescience.constructor = () => extend(MechUnit, {
    damage(number){
        if(number > 0){
            if(this.vShield >= 1){
                this.DR = 1;
                this.vShield--;
                this.eAlpha = 1;
                if(this.vShield < 1 && !this.sBroken){
                    this.sBroken = true;
                    this.vRecharge = 0;
                    voidPop.at(this.x, this.y, 0, [this, 5, this.hitSize + 3, this.eAlpha]);
                }
                else this.vRecharge += 0.01;
            }
            else{
                this.DR = Mathf.slerpDelta(this.DR, 0, 0.01);
                this.vShield = 0;
            }
            if(number < this.type.health * 12.5){
                number = number * (1 - this.DR);
            }
            else{
                number = number * (1 - this.DR * 0.5);
            }
        }
        else this.eAlpha = 1;
        
        if(number > 0) this.super$damage(number);
        else this.hitTime = 1;
    },
    update(){
        if(Mathf.chance(Time.delta)){
            this.super$update();
            this.healFract(this.HPS/6000);
            this.DR = Mathf.slerpDelta(this.DR, 0, 0.01);
            if(!this.sBroken) this.vShield = Mathf.slerpDelta(this.vShield, this.sLimit, 0.001);
            this.eAlpha = Mathf.slerpDelta(this.eAlpha, 0, 0.01);
            if(this.vRecharge < 1 && this.sBroken) this.vRecharge += 0.005;
            else if(this.sBroken) this.sBroken = false;
            this.dCol1.a = this.vShield/2.15 * this.eAlpha *  Mathf.clamp(Math.round(this.vShield), 0, 1), this.dCol2.a = this.eAlpha *  Mathf.clamp(Math.round(this.vShield), 0, 1);
        }
    },
    draw(){
        this.super$draw();
        if(this.eAlpha > 0) Fill.light(this.x, this.y, 5, this.hitSize * 1.25, this.dCol1, this.dCol2);
        Draw.color(Color.valueOf("#9c7ae1"),Color.valueOf("#231841"), Mathf.clamp(this.vShield, 0, 1));
        Draw.alpha(this.vShield);
        Lines.circle(this.x, this.y, this.hitSize + 3);
    },
    killed(){
        this.super$killed();
        voidExplosion.at(this.x, this.y, this.rotation, [this.hitSize * 4, 3, 5, 4]);
        voidicExplosionB.create(this, this.team, this.x, this.y, this.rotation, 0, 0);
    },
    classId: () => nescience.classId,
    dCol1: Color.valueOf("#9c7ae1"),
    dCol2: Color.valueOf("#231841"),
    eAlpha: 0,
    vShield: 2,
    sLimit: 2.75,
    DR: 0,
    HPS: 0.1,
    sRecharge: 1,
    sBroken: false
});
refresh(nescience);