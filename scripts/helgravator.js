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

