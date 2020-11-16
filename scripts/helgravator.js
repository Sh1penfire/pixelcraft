const hellfireFX = new Effect(20, e => {
Draw.color(Color.white, Color.white, e.fin());
Fill.circle(e.x, e.y, e.fslope() * 5);
Draw.color(Color.orange, Color.red, e.fin());
Fill.circle(e.x, e.y, e.fslope() * 4);
Fill.circle(e.x, e.y, e.fout() * 2);
});

const firehitFx = new Effect(40, e => {
    Draw.color(Color.orange, Color.red, e.fin());
    Lines.stroke(e.fin() * 2);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 2 + 0);
    }}) 
    Angles.randLenVectors(e.id, 25, 1 + 60 * e.fin(), e.rotation, 360,d);
});

const hellfire = extendContent(StatusEffect, "hellfire", {});

hellfire.speedMultiplier = 0.8;
hellfire.armorMultiplier = 0.75;
hellfire.damage = .5;
hellfire.effect = hellfireFX;
color = Color.white;


const flPixelite = extend(BasicBulletType, {});
flPixelite.speed = 20;
flPixelite.splashDamage = 5;
flPixelite.damage = 1;
flPixelite.splashDamageRadius = 16;
flPixelite.width = 1;
flPixelite.height = 1;
flPixelite.innacuracy = 15;
flPixelite.lifetime = 5;
flPixelite.shootSound = Sounds.flame2;
flPixelite.shootEffect = firehitFx;
flPixelite.despawnEffect = Fx.none;
flPixelite.hitEffect = Fx.none;
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

