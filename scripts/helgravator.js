const flPixelite = extend(BasicBulletType, {});
flPixelite.speed = 4;
flPixelite.splashDamage = 20;
flPixelite.damage = 30;
flPixelite.splashDamageRadius = 16;
flPixelite.width = 12;
flPixelite.height = 24;
const helgravator = extendContent(ItemTurret, "flamethrower3",{
	  icons(){
    return [
      Core.atlas.find("block-2"),
      Core.atlas.find("pixelcraft-flamethrower1")
    ];
  }
helgravator.ammo(Vars.content.getByName(ContentType.item, "pixelcraft-pixelite"), flPixelite);
});



	//Blocks.flamethrower3.put(Items.pyratite, flPyratite)
