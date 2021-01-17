const fc = require("libs/fc");
const statuses = require("libs/statuses");


const bioShot = extend(ArtilleryBulletType, {
    speed: 2.5,
    lifetime: 50,
    width: 8,
    height: 8,
    splashDamage: 15,
    splashDamageRadius: 24,
    ammoMultiplier: 5
});
bioShot.status = statuses.groveCurse;
bioShot.despawnEffect = Fx.explosion;
bioShot.hitEffect = Fx.explosion;
bioShot.frontColor = Color.valueOf("ced671");
bioShot.backColor = Color.valueOf("b8bf68");
bioShot.frontColor = Color.valueOf("ced671");

const basicTurret2b2 = extend(ItemTurret, "basicTurret2b2", {
    init(){
    this.ammo(
        Vars.content.getByName(ContentType.item,"pixelcraft-bionorb"), bioShot
    );
    this.super$init();
    }
});