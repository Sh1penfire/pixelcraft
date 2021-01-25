const rustydart = extendContent(UnitType, "rustydart", {});
rustydart.constructor = () => extend(UnitEntity, {});
rustydart.defaultController = () => extend(BuilderAI, {});

const rustyjavalin = extend(UnitType, "rustyjavalin", {});
rustyjavalin.HitboxComp = extend(UnitEntity, {});
rustyjavalin.constructor = () => extend(UnitEntity, {
    update(){
        this.super$update();
        if(this.lightn > 0){
            this.lightn = this.lightn - 0.05;
        }
        else{
            this.lightn = 0;
        }
        print(this.lightn);
    },
    collision(b){
        if(this.lightn < 0.1 && b.damage > 0){
            Lightning.create(this.team, Color.valueOf("#a9d8ff"), 10 * Vars.state.rules.unitDamageMultiplier, this.x, this.y, b.rotation() + 180, 8);
            Sounds.spark.at(this.x, this.y);
            this.lightn = 1
        }
    }
});
rustyjavalin.defaultController = () => extend(FlyingAI, {});
rustyjavalin.abilities.add(new MoveLightningAbility(6.4 * Vars.state.rules.unitDamageMultiplier, 10, 0.05, 10, 3, 6, Color.valueOf("#a9d8ff"), "pixelcraft-rustyjavalin-full"));