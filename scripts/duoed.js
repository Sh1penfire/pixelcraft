// Obligatory comment line for no reason at all
const BasicShoot = extend(BasicBulletType, {
BasicShoot.damage = 3;
BasicShoot.speed = 2;
BasicShoot.lifetime = 35;
});

const duost = newEffect(40, e => {
Draw.color(Color.black, Color.orange, e.fin());
Lines.stroke(e.fin() * 2);
Lines.circle(e.x, e.y, e.fslope() * 2);
});
const duoed = extendContent(ItemTurret, "Duoed", {
        this.super$init({;
        generateIcons: function(){
            return [
                core.atlas.find("block-3")
                core.atlas.find("pixelcraft-strand")
            ]};
        Blocks.duoed.put(Vars.content.getByName(ContentType.item,"copper"),BasicShoot);

this.stats.remove(BlockStat.size);
this.stats.add(BlockStat.size, "3");
doued.reloadTime = 15;
doued.shootEffect = duost;
doued.shootType = BasicShoot;

});
});

