const refresh = require("libs/refresh")
const fc = require("libs/fc")
const theAislol = require("libs/theAislol")
const statuses = require("libs/statuses")

const voidExplosion = new Effect(65, e => {
    Draw.color(Color.black, Color.black, e.fout());
    Lines.stroke(e.fout() * 6);
    let alpha = 1 - Math.sin(e.fout() * Math.PI + Math.PI/3);
    Draw.alpha(alpha);
    Lines.stroke(e.fout() * 2 + Math.sin(e.fin() * 4 * Math.PI));
    let scaling = -Math.sin(e.fout() * e.fout() * Math.PI + Math.PI/3);
    let fromColor = Color.valueOf("#9c7ae1"), toColor = Color.valueOf("#231841");
    fromColor.a = alpha, toColor.a = alpha;
    Fill.light(e.x, e.y, 15, scaling * e.data[0], fromColor, toColor);
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
        let rad = b.owner.hitSize * 2;
        Units.nearby(b.x - rad * 4, b.y- rad * 4, rad * 8, rad * 8, cons(u => {
            if(!u.isDead && Mathf.dst(b.x, b.y, u.x, u.y) < rad && u.team != b.team){
                u.apply(statuses.blackout, 360);
                u.apply(StatusEffects.slow, 360);
                u.damageContinuousPierce(b.owner.maxHealth/10);
            }
            else{
                u.damageContinuousPierce(b.owner.maxHealth/85);
                u.apply(StatusEffects.wet, 360);
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

function voidingUnit(name, type, build, dCol1, dCol2, eAlpha, vShield,
        sLimit, DR, HPS, sRecharge, sBroken, immunities, weaknesses){
    const unit = extend(type, name, {
        load(){
            this.super$load();
            for(var i in immunities){
                unit.immunities.add(immunities[i]);
            }
        },
        init(){
            this.super$init();
        },
        //haha no light goes br
        drawLight(unit){},
        display(unit, table){
            table.table(cons(t => {
                t.left();
                t.add(new Image(this.icon(Cicon.medium))).size(8 * 4).scaling(Scaling.fit);
                t.labelWrap(unit.type.localizedName).left().width(190).padLeft(5);
            })).growX().left();
            table.row();

            table.table(cons(bars => {
                bars.defaults().growX().height(20).pad(4);
                bars.add(new Bar("stat.health", Pal.health, () => unit.health/unit.maxHealth))
                bars.row();
            
                bars.add(new Bar(unit.vstring(), Tmp.c2.set(Color.valueOf("#231841")).lerp(Color.valueOf("#9c7ae1"), unit.shieldChargef()), () =>unit.shieldChargef()));
                bars.row();
            
                unit.abilities.forEach(e => {
                    ability.displayBars(unit, bars);
                });
                bars.row();
            
            })).growX();

            if(unit.controller instanceof LogicAI){
                table.row();
                table.add(Blocks.microProcessor.emoji() + " " + Core.bundle.get("units.processorcontrol")).growX().wrap().left();
                table.row();
                table.label(() => Iconc.settings + " " + unit.flag + "").color(Color.lightGray).growX().wrap().left();
            }
        
            table.row();
        }
    });
    unit.constructor = () => extend(build, {
        damaged(){
            return this.health != this.maxHealth || this.shieldChargef() < 1;
        },
        heal(number){
            if(number != null){
                if(this.health >= this.maxHealth){
                    if(this.vs().vRecharge <= 0.8 && this.vs().sBroken) this.vs().vRecharge += 0.003;
                    else if(this.shieldChargef() < 1){
                        //increase the unit's shield depending on how much the unit is being healed for relative to the unit's health
                        this.vs().vShield = Mathf.clamp(number/this.maxHealth + this.vs().vShield, 0, this.vs().sLimit);
                        //if the unit isn't healing itself from this, or the healing is at the same or lower rate as the unit heals itself, don't display shield
                        if(number > this.type.health/this.HPS/6000 && this.eAlpha < 0.2) this.shieldAlphaf(0.25);
                    }
                }
                else{
                this.health += number;
                this.clampHealth();
                }
            }
            else{
                this.health = this.maxHealth;
            }
        },
        collision(b){
            if(b != null && b.type.healPercent > 0)
            {
                this.hitShield(0.05);
                this.damagePierce(b.type.healPercent * 2 + this.type.armor);
            }
        },
        hitShield(number){
            if(this.vs().vShield >= 1){
                this.vs().DR = 1.1;
                if(this.vs().DR < 1) this.vs().vShield -= number;
                this.shieldAlphaf(number);
                    if(this.vs().vShield < 1 && !this.vs().sBroken){
                        this.vs().sBroken = true;
                        this.vs().vRecharge = 0;
                        voidPop.at(this.x, this.y, 0, [this, 5, this.hitSize + 3, this.eAlpha]);
                    }
                    else this.vs().vRecharge += 0.01;
            }
            else{
                this.vs().DR = Mathf.slerpDelta(this.vs().DR, 0, 0.005);
                this.vs().vShield = 0;
            }
        },
        vs(){
            return this.voidShield;
        },
        shieldAlphaf(number){
            if(number != null) this.vs().eAlpha = Mathf.clamp(this.vs().eAlpha + number, 0, 1);
            else return this.vs().eAlpha;
        },
        shieldCharge(number){
            return this.vs().vShield
        },
        shieldChargef(){
            return this.vs().vShield/this.vs().sLimit;
        },
        vstring(){
            if(this.vs().sBroken === true) return "Shield Shattered"
            else return "Void Shield Charge"
        },
        damage(number){
            if(number > 0){
                this.hitShield(number >= this.type.armor * 5 ? 1 : 0.5);
                if(number < this.type.health * 12.5 || number > this.type.health * 50) number = number * (1 - this.vs().DR);
                else number = number * (1 - this.vs().DR * 0.5);
                this.super$damage(this.vs().DR = Mathf.clamp(number, 0, number));
            }
        else this.shieldAlphaf(1);
            if(number <= 0) this.hitTime = 1;
        },
        apply(status, time){
            if(time == undefined) time = 1
            if(status != StatusEffects.none && status != null && !this.isImmune(status)){
                if(this.weaknesses.includes(status)){
                    time *= 1.25;
                    this.super$apply(status, time);
                }
                else if(status.damage <= 0) this.super$apply(status, time);
                else if(status.permanent == true) this.heal(Math.abs(status.damage) * 60);
                else if((this.vs().DR <= 0.75 && this.vs().vShield <= 1) && status.damage > 0) this.super$apply(status, time);
            }
        },
        update(){
            this.super$update();
            if(Mathf.chance(Time.delta)){
                
                if(this.maxHealth != this.type.health){
                    this.vs().DR = Mathf.clamp(this.vs().DR + 0.1, 0, 1);
                    this.maxHealth = this.type.health;
                }
                
                if(this.damaged()) this.healFract(this.HPS/6000);
                
                this.vs().DR = Mathf.slerpDelta(this.vs().DR, 0, 0.01);
                
                if(!this.vs().sBroken) this.vs().vShield = Mathf.slerpDelta(this.vs().vShield, this.vs().sLimit, 0.001);
                
                this.vs().eAlpha = Mathf.slerpDelta(this.vs().eAlpha, 0, 0.01);
                
                if(this.vs().vRecharge < 1 && this.vs().sBroken) this.vs().vRecharge += 0.003;
                else if(this.vs().sBroken) this.vs().sBroken = false;
                
                this.vs().dCol1.a = this.vs().vShield/2.15 * this.vs().eAlpha *  Mathf.clamp(Math.round(this.vs().vShield), 0, 1);
                
                this.vs().dCol2.a = this.vs().eAlpha *  Mathf.clamp(Math.round(this.vs().vShield), 0, 1);
            }
        },
        draw(){
            this.super$draw();
            if(this.eAlpha > 0) Fill.light(this.x, this.y, 5, this.hitSize * 1.25, this.dCol1, this.dCol2);
            for(let i = 0; i < this.vs().vShield; i++){
                //use this variable instead of vShield when drawing.
                let i2 = (this.vs().vShield - i)/this.vs().sLimit;
                //Size of circle in addition to the unit's hitSize
                let circleSize = (i2 - 1) * 3 * i;
                //clamped from 0 to 1
                let scaling = Mathf.clamp(i2 * this.vs().sLimit, 0, 1);
                Draw.color(Color.valueOf("#9c7ae1"),Color.valueOf("#231841"), scaling);
                Draw.alpha(0.1 + scaling/2 * (circleSize * this.shieldChargef()/(3 * i) != null ? 1 - -circleSize * this.shieldChargef()/(3 * i) : 0.1) * 2);
                if(scaling != 1) Lines.swirl(this.x, this.y, this.hitSize + circleSize, scaling, this.rotation);
                else Lines.circle(this.x, this.y, this.hitSize + circleSize);
            }
        },
        killed(){
            this.super$killed();
            voidExplosion.at(this.x, this.y, this.rotation, [this.hitSize * 4, 3, 5, 4]);
            voidicExplosionB.create(this, this.team, this.x, this.y, this.rotation, 0, 0);
        },
        classId: () => unit.classId,
        voidShield: {
            dCol1: dCol1,
            dCol2: dCol2,
            eAlpha: eAlpha,
            vShield: vShield,
            sLimit: sLimit,
            DR: DR,
            sRecharge: sRecharge,
            sBroken: sBroken
        },
        HPS: HPS,
        weaknesses: weaknesses
        });
    refresh(unit)
    return unit;
};

const blink = voidingUnit("blink", UnitType, MechUnit, Color.valueOf("#9c7ae1"), Color.valueOf("#231841"), 0, 0, 1.5, 0, 0.2, 1, false, [StatusEffects.freezing, StatusEffects.corroded, statuses.windswept, statuses.slushFall, statuses.blackout], [StatusEffects.burning, StatusEffects.melting, statuses.groveCurse, statuses.seeded]);
/*
    dCol1: Color.valueOf("#9c7ae1"),
    dCol2: Color.valueOf("#231841"),
    eAlpha: 0,
    vShield: 1,
    sLimit: 1.5,
    DR: 0,
    HPS: 0.2,
    sRecharge: 1,
    sBroken: false,
    weaknesses: [StatusEffects.burning, StatusEffects.melting, statuses.groveCurse, statuses.seeded],
    immunities: [StatusEffects.freezing, StatusEffects.corroded, statuses.windswept, statuses.slushFall, statuses.blackout]
*/
//dCol1 & 2 are the colors used for the shield and effect
//eAlpha is the effect alpha of the effects and unit's void shield
//vSheild is the amount of charge is stored in the unit to activate the void shield
//sLimit is how many shields the unit can store. If below 1, unit can't store void shields
//DR is the percentage of damage the unit negates. Starts at 0, and raises when the shield is activated.
//HPS is the amount of health the unit regenerates per second
//sBroken and sRecharge are variables used in the breaking and recovery of the shield
//weaknesses are status effects which get applied for 1.25 times longer
const nescience = voidingUnit("nescience", UnitType, MechUnit, Color.valueOf("#9c7ae1"), Color.valueOf("#231841"), 0, 0, 2.75, 0, 0.35, 1, false, [StatusEffects.freezing, StatusEffects.corroded, StatusEffects.sapped, statuses.windswept, statuses.slushFall, statuses.blackout], [StatusEffects.burning, StatusEffects.melting, statuses.groveCurse, statuses.seeded, statuses.hellfire, statuses.sporefire]);

const deluge = voidingUnit("deluge", UnitType, MechUnit, Color.valueOf("#9c7ae1"), Color.valueOf("#231841"), 0, 0, 4.25, 0.8, 0.55, 1, false, [StatusEffects.freezing, StatusEffects.corroded, StatusEffects.sapped, statuses.windswept, statuses.slushFall, statuses.blackout], [StatusEffects.burning, StatusEffects.melting, statuses.groveCurse, statuses.seeded, statuses.hellfire, statuses.sporefire, statuses.slushFall, statuses.prismium]);

const inscience = voidingUnit("inscience", UnitType, MechUnit, Color.valueOf("#9c7ae1"), Color.valueOf("#231841"), 0, 0, 7.25, 0.9, 0.65, 1, false, [StatusEffects.freezing, StatusEffects.corroded, StatusEffects.sapped, statuses.windswept, statuses.slushFall, statuses.blackout], [StatusEffects.burning, StatusEffects.melting, statuses.groveCurse, statuses.seeded, statuses.hellfire, statuses.sporefire, statuses.slushFall, statuses.prismium]);

Events.on(ClientLoadEvent, b  => {
    blink.weapons.get(0).bullet.status = statuses.blackout;
    blink.weapons.get(1).bullet.status = statuses.blackout;
    nescience.weapons.get(0).bullet.status = statuses.blackout;
    nescience.weapons.get(1).bullet.status = statuses.blackout;
    deluge.weapons.get(4).bullet.status = statuses.blackout;
    deluge.weapons.get(5).bullet.status = statuses.blackout;
});