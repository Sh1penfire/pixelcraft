const UniversalFieldAbility = extend(Ability, "Ability", {
    StatusFieldAbility(){}
    new UniversalFieldAbility = ("effect", duration, reload, range){
    }

    @Override
    public void update(Unit unit){
        timer += Time.delta;

        if(timer >= reload){
            Units.nearby(unit.team, unit.x, unit.y, range, other -> {
                other.apply(effect, duration);
            });

            activeEffect.at(unit);

            let timer = 0;
        }
    }
}
/*
    var effect = extend(StatusEffect,"effect",{})
    public float duration = 60, reload = 100, range = 20;
    public Effect applyEffect = Fx.heal;
    public Effect activeEffect = Fx.overdriveWave;
*/
