const hellfireFX = new Effect(20, e => {
Draw.color(Color.orange, Color.red, e.fin());
Fill.circle(e.x, e.y, e.fslope() * 4);
Fill.circle(e.x, e.y, e.fout() * 2);
Draw.color(Color.orange, Color.red, e.fin());
Lines.stroke(e.fslope() * 2);
Lines.circle(e.x, e.y, e.fin() * 6);
Draw.color(Color.white, Color.orange, e.fin());
Lines.stroke(e.fin() * 2);
const d = new Floatc2({get(x, y){
Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 1);
}}) 
Angles.randLenVectors(e.id, 10, 1 * e.fin(), e.rotation, 360,d);
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
hellfire.color = Color.white;


const flCoal = extend(BasicBulletType, {});
flCoal.speed = 20;
flCoal.damage = 10;
flCoal.width = 1;
flCoal.height = 1;
flCoal.innacuracy = 15;
flCoal.lifetime = 5;
flCoal.shootSound = Sounds.flame2;
flCoal.shootEffect = Fx.fire;
flCoal.despawnEffect = Fx.none;
flCoal.hitEffect = firehitFx;
flCoal.status = hellfire;
flCoal.ammoMultiplier = 10;
flCoal.pierce = true;

const flPixelite = extend(BasicBulletType, {});
flPixelite.speed = 20;
flPixelite.damage = 15;
flPixelite.width = 1;
flPixelite.height = 1;
flPixelite.innacuracy = 15;
flPixelite.lifetime = 5;
flPixelite.shootSound = Sounds.flame2;
flPixelite.shootEffect = Fx.fire;
flPixelite.despawnEffect = Fx.none;
flPixelite.hitEffect = firehitFx;
flPixelite.status = hellfire;
flPixelite.ammoMultiplier = 10;
flPixelite.pierce = true;

const helgravator = extendContent(ItemTurret, "flamethrower3",{
  init(){
    this.ammo(Vars.content.getByName(ContentType.item,"coal"), flCoal);
    this.ammo(Vars.content.getByName(ContentType.item,"coal"), flPixelite);
    this.super$init();
  },

  icons(){
    return [
      Core.atlas.find("block-3"),
      Core.atlas.find("pixelcraft-flamethrower3")
    ];
  }
});
