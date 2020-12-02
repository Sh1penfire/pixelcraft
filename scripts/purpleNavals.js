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

const purpleN1 = extendContent(UnitType, "purpleN1", {});
purpleN1.constructor = () => extend(UnitWaterMove, {});
//Adding the healing field abilities
purpleN1.abilities.add(new StatusFieldAbility(weakHeal, 360, 360, 60));
purpleN1.abilities.add(new RepairFieldAbility(25, 60, 75));

const purpleN2 = extendContent(UnitType, "purpleN2", {});
purpleN2.constructor = () => extend(UnitWaterMove, {});
//Adding the shield field
purpleN2.abilities.add(new StatusFieldAbility(diminishedHeal, 360, 360, 60));
purpleN2.abilities.add(new ShieldRegenFieldAbility(20, 40, 300, 60));

//extends off the cannon hjson file
const purpleN3 = extendContent(UnitType, "purpleN3", {});
purpleN3.constructor = () => extend(UnitWaterMove, {});
//Adding the boost fields
purpleN3.abilities.add(new StatusFieldAbility(heal, 360, 360, 75));
purpleN3.abilities.add(new StatusFieldAbility(MoralBoost, 3600, 360, 75));




