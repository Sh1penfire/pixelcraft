const hellfireFX = new Effect(5, e => {
Draw.color(Color.orange, Color.red, e.fin());
 Draw.alpha(e.fout());
Fill.circle(e.x, e.y, e.fslope() * 5);
});

const hellfire = extendContent(StatusEffect, "hellfire", {});

hellfire.speedMultiplier = 0.8;
hellfire.armorMultiplier = 0.75;
hellfire.damage = .5;
hellfire.effect = hellfireFX;
hellfire.color  = Color.white;


const flPixelite = extend(BasicBulletType, {});
flPixelite.speed = 20;
flPixelite.splashDamage = 5;
flPixelite.damage = 30;
flPixelite.splashDamageRadius = 16;
flPixelite.width = 1;
flPixelite.height = 1;
flPixelite.innacuracy = 15;
flPixelite.lifetime = 5;
flPixelite.shootSound = Sounds.flame2;
flPixelite.shootEffect = Fx.shootPyraFlame;
flPixelite.despawnEffect = Fx.none;
flPixelite.hitEffect = Fx.fire;
flPixelite.status = hellfire;
const helgravator = extendContent(ItemTurret, "flamethrower3",{
  init(){
    this.ammo(Vars.content.getByName(ContentType.item,"pixelcraft-pixelite"), flPixelite);
    this.super$init();
  },

  icons(){
    return [
      Core.atlas.find("block-2"),
      Core.atlas.find("pixelcraft-flamethrower1")
    ];
  }
});


	//Blocks.flamethrower3.put(Items.pyratite, flPyratite)
//    this.ammo(<item>, <bullet>);

