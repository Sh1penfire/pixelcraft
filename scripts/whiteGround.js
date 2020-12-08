const warmth = extend(StatusEffect, "warmth", {
    init(){
                this.opposite(StatusEffects.melting, StatusEffects.burning);
        /*
                this.trans(StatusEffects.freezing, this.unit, this.time, this.newTime, result){
                    unit.heal(1)
                    result.set(this, time)
                };
                //no idea hwo to fix this, whenever I leave it uncommented, it just screws it over. Missing ; on the line before (4#)
                */
                
}
});
warmth.speedMultiplier = 1.66666666667;
warmth.healthMultiplier = 1.2;
warmth.damageMultiplier = 1.25;
warmth.damage = 0.0;
warmth.effect = Fx.none;
warmth.color = Color.white;

const crystal = extendContent(UnitType, "crystal", {});
crystal.constructor = () => extend(MechUnit, {
});
crystal.abilities.add(new StatusFieldAbility(StatusEffects.freezing, 3600, 360, 60));
crystal.abilities.add(new StatusFieldAbility(warmth, 3600, 360, 60));

