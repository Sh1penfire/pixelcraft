const BasicShoot = extend(BasicBulletType, {
});
BasicShoot.damage = 3;
BasicShoot.speed = 2;
BasicShoot.lifetime = 35;

const duoed = extendContent(ItemTurret, "Duoed", {
        this.super$init();
        generateIcons: function(){
            return [
                core.atlas.find("pixelcraft-duoed")
            ];
        }
});
doued.reloadTime = 15;
doued.shootEffect = duost;
doued.shootType = BasicShoot;
doued.size = 3;


const duost = newEffect(40, e => {
    Draw.color(Color.black, Color.orange, e.fin());
    Lines.circle(e.x, e.y, e.fslope() * 2 + 1);
})
