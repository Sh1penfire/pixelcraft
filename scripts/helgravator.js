const flPixelite = extend(BasicBulletType, {});
flPixelite.speed = 4;
flPixelite.splashDamage = 20;
flPixelite.damage = 30;
flPixelite.splashDamageRadius = 16;
flPixelite.width = 12;
flPixelite.height = 24;
init(){
	this.super$init();
	Blocks.flamethrower3.put(Vars.content.getByName(ContentType.item,"pixelcraft-pixelite"),flPixelite);
}

	//Blocks.flamethrower3.put(Items.pyratite, flPyratite)
