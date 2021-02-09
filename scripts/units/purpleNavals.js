//Making the status's effect
const MoralBoostFX = new Effect(27, (e) => {
  Draw.color(Pal.spore);
  Angles.randLenVectors(e.id, 2, 1 + e.fin() * 2, (x, y) => {
    Fill.square(e.x + x, e.y + y, e.fout() * 1.5 + 0.75);
  });
  Angles.randLenVectors(e.id, 2, 1 + e.fin() * 10, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 3 + 0.3)
  });
});

const strongHealFX = new Effect(15, (e) => {
  Draw.color(Color.lime, Color.green, e.fout());
  Angles.randLenVectors(e.id, 2, 1 + e.fin() * 10, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 1 + 0.3)
  });
});
//the status effect for the boost field for Cannon
const MoralBoost = new StatusEffect("MoralBoost");
MoralBoost.speedMultiplier = 1.4;
MoralBoost.healthMultiplier = 1.25;
MoralBoost.damageMultiplier = 1.25;
MoralBoost.damage = -0.0;
MoralBoost.effect = MoralBoostFX;
MoralBoost.color = Color.white;

const weakHeal = extend(StatusEffect, "weakHeal", {
  update(unit, time){
    this.super$update(unit, time);
//heals the unit for around 1 hp every second
    unit.heal(0.015);
  }
});

const diminishedHeal = extend(StatusEffect, "diminishedHeal", {
  update(unit, time){
    this.super$update(unit, time);
//heals the unit for around 3 hp every second
    unit.heal(0.025);
  }
});


const heal = extend(StatusEffect, "heal", {
  update(unit, time){
    this.super$update(unit, time);
//heals the unit for 5 hp every second
    unit.heal(0.12);
  }
});

const strongHeal = extend(StatusEffect, "strongHeal", {
  update(unit, time){
    this.super$update(unit, time);
//heals the unit for 30 hp every second
    unit.heal(0.5);
  }
});
strongHeal.speedMultiplier = 1.1;
strongHeal.healthMultiplier = 1.1;
strongHeal.effect = strongHealFX;
strongHeal.color = Color.white;

const spores = extend(BasicBulletType, {});
spores.damage = 10;
spores.lifetime = 100;
spores.drag = 0.01;
spores.status = StatusEffects.sapped;
spores.buildingDamageMultiplier = 10;
spores.homingPower = 0.04;

const sporeExplosion = extend(BombBulletType, {});
sporeExplosion.splashDamage = 25;
sporeExplosion.lifetime = 0;
sporeExplosion.drag = 0.01;
sporeExplosion.status = StatusEffects.sapped;
sporeExplosion.buildingDamageMultiplier = 2;


const purpleN1 = extendContent(UnitType, "purpleN1", {});
purpleN1.constructor = () => extend(UnitWaterMove, {
    killed(){    
        sporeExplosion.create(this, this.team, this.x, this.y, 0, 0);
        let timer = 0;
        while (timer < 8){
            spores.create(this, this.team, this.x, this.y, timer * 45, 1);
            timer++;
        }
        if (timer = 8){
           this.dead = true;
           }
    },
    update(){
        this.super$update();
        this.heal(0.03 - this.health/purpleN1.health * 0.02);   
    }
});
//Adding the healing field abilities
purpleN1.abilities.add(new StatusFieldAbility(weakHeal, 3600, 360, 60));

const purpleN2 = extendContent(UnitType, "purpleN2", {});
purpleN2.constructor = () => extend(UnitWaterMove, {
        killed(){    
        sporeExplosion.create(this, this.team, this.x, this.y, 0, 0);
        let timer = 0;
        while (timer < 8){
            spores.create(this, this.team, this.x, this.y, timer * 45, 1);
            timer++;
        }
        if (timer = 8){
           this.dead = true;
           }
    },
    update(){
        this.super$update();
        this.heal(0.03 - this.health/purpleN1.health * 0.02);   
    }
});
//Adding the shield field
purpleN2.abilities.add(new StatusFieldAbility(diminishedHeal, 3600, 360, 60));
purpleN2.abilities.add(new ShieldRegenFieldAbility(20, 40, 300, 60));

const purpleN3 = extendContent(UnitType, "purpleN3", {});
purpleN3.constructor = () => extend(UnitWaterMove, {
    killed(){     
        let timer = 0;
        while (timer < 3){
            let ax = Math.random(60);
            let ay = Math.random(60);
            Vars.content.getByName(ContentType.unit, "pixelcraft-purpleN1").spawn(this.team,   this.x + ax, this.y + ay);
            timer++;
        }
        if (timer = 3){
           this.dead = true;
           }
    },
    update(){
        this.super$update();
        this.heal(0.03 - this.health/purpleN1.health * 0.02);   
    }
});
//Adding the boost fields
purpleN3.abilities.add(new StatusFieldAbility(heal, 3600, 360, 75));
purpleN3.abilities.add(new StatusFieldAbility(MoralBoost, 3600, 360, 75));


const purpleN4 = extendContent(UnitType, "purpleN4", {});
purpleN4.constructor = () => extend(UnitWaterMove, {});
//Adding the boost fields
purpleN4.abilities.add(new StatusFieldAbility(strongHeal, 3600, 360, 75));
purpleN4.abilities.add(new StatusFieldAbility(MoralBoost, 3600, 360, 75));
purpleN4.abilities.add(new ShieldRegenFieldAbility(20, 40, 300, 60));
purpleN4.abilities.add(new RepairFieldAbility(100, 1000, 100));



