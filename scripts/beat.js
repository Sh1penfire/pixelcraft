// Obligatory comment line for no reason at all

//shoot effect for beat
const beatShoot = new Effect(30, e => {
  Draw.color(Color.valueOf("05700b"), Color.valueOf("acfbb0"), e.fin());
  Lines.stroke(e.fout()*2);
  Lines.circle(e.x, e.y, e.fin() * 4);
});

//effect when bullet hits a target
const shotHit = new Effect(20, e => {
  Draw.color(Color.valueOf("05700b"), Color.valueOf("acfbb0"), e.fin());
  Lines.stroke(e.fout()*1);
  Lines.circle(e.x, e.y, e.fin() * 3);
});


//makes the shot of beat
const beatShot = extend(LaserBoltBulletType, {});
                                               
const healedStatusFX = new Effect(10, e => {
Draw.color(Color.yellow, Color.green, e.fin());
Lines.stroke(e.fin() * 1);
Lines.circle(e.x, e.y, e.fslope() * 5);
});

const healed = extendContent(StatusEffect, "healed", {});

healed.speedMultiplier = 1.2;
healed.armorMultiplier = 0.75;
healed.damage = -1.0;
healed.effect = healedStatusFX;
healed.color  = Color.green;

//extends off the beat hjson file
const beat = extendContent(PowerTurret, "beat", {
  icons(){
    return [
      Core.atlas.find("block-2"),
      Core.atlas.find("pixelcraft-puver")
    ];
  }
});

//givving things stats

//givving beat it's stats (Some are predefined in the puver.hjson file
beat.recoil = 1;
beat.restitution = 0.015;
beat.shootType = shot;

//stats of bullet shot by puver
shot.damage = 25;
shot.speed = 5;
shot.lifetime = 50;
shot.knockback = 2;
shot.width = 5;
shot.height = 6;
shot.collides = true;
shot.collidesTiles = true;
shot.hitEffect = shotHit;
shot.despawnEffect = Fx.none;
shot.shootEffect = beatShoot;
