const hellfireFX = new Effect(20, e => {
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
hellfire.color = Color.white;


const flCoal = extend(BasicBulletType, {});
flCoal.speed = 20;
flCoal.damage = 25;
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
const helgravator = extendContent(ItemTurret, "flamethrower3",{
  init(){
    this.ammo(Vars.content.getByName(ContentType.item,"coal"), flCoal);
    this.super$init();
  },

  icons(){
    return [
      Core.atlas.find("block-3"),
      Core.atlas.find("pixelcraft-flamethrower3")
    ];
  }
});
