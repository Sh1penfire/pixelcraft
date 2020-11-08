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
  icons(){
    return[
      Core.atlas.find("block-3"),
      Core.atlas.find("pixelcraft-strand")
    ]
  }
}

duoed.size = 2;
duoed.reloadTime = 15;
duoed.shootEffect = duost;
doued.ammo.add(Items.copper, BasicShoot);
