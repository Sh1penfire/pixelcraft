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
Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 3);
}}) 
Angles.randLenVectors(e.id, 20, 3 * e.fin(), e.rotation, 360,d);
});

const firehitFx = new Effect(15, e => {
    Draw.color(Color.orange, Color.red, e.fin());
    Lines.stroke(e.fin() * 2);
    const d = new Floatc2({get(x, y){
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 2 + 0);
    }}) 
    Angles.randLenVectors(e.id, 25, 1 + 60 * e.fin(), e.rotation, 25,d);
});

const hellfire = extendContent(StatusEffect, "hellfire", {});

hellfire.speedMultiplier = 0.8;
hellfire.armorMultiplier = 0.75;
hellfire.damage = 1;
hellfire.effect = hellfireFX;
hellfire.color = Color.white;

const flCoalfrag = extend(LiquidBulletType, {});
const flCoal = extend(ArtilleryBulletType, {});
flCoal.speed = 5;
flCoal.damage = 10;
flCoal.width = 5;
flCoal.height = 8;
flCoal.innacuracy = 6;
flCoal.lifetime = 75;
flCoal.shootSound = Sounds.flame2;
flCoal.shootEffect = firehitFx;
flCoal.despawnEffect = Fx.none;
flCoal.hitEffect = Fx.none;
flCoal.collides = true;
flCoal.collidesTiles = true;
flCoal.ammoMultiplier = 10;
flCoal.pierce = true;
flCoal.homing = true;
flCoal.fragBullets = 3;
flCoal.fragBullet = flCoalfrag;

flCoalfrag.liquid = Liquids.oil;
flCoalfrag.speed = 4;
flCoalfrag.damage = 5;
flCoalfrag.width = 5;
flCoalfrag.height = 5;
flCoalfrag.lifetime = 7;
flCoalfrag.despawnEffect = Fx.none;
flCoalfrag.hitEffect = Fx.fire;
flCoalfrag.status = hellfire;


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
flPixelite.hitEffect = Fx.fire;
flPixelite.status = hellfire;
flPixelite.ammoMultiplier = 10;
flPixelite.pierce = true;

const helgravator = extendContent(ItemTurret, "flamethrower3",{
  init(){
        this.ammo( Vars.content.getByName(ContentType.item,"coal"), flCoal)
      //Vars.content.getByName(ContentType.item."pixelcraft-pixelite"), flPixelite );
    this.super$init();
  },

  icons(){
    return [
      Core.atlas.find("block-3"),
      Core.atlas.find("pixelcraft-flamethrower3")
    ];
  }
});
helgravator.innacuracy = 24;
