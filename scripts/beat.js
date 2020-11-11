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
const shot = extend(LaserBoltBulletType, {});
        
//make effects of overload
const overloadFX = new Effect(10, e => {
Draw.color(Color.yellow, Color.white, e.fin());
Draw.alpha(e.fout());
Fill.circle(e.x, e.y, e.fslope() * 2);
});

const overload = extendContent(StatusEffect, "overload", {});

overload.speedMultiplier = .8;
overload.armorMultiplier = 0.9;
overload.damage = 0.2;
overload.effect = overloadFX;
overload.color  = Color.green;

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

//stats of bullet shot by beat
shot.damage = 5;
shot.speed = 5;
shot.lifetime = 50;
shot.knockback = 2;
shot.width = 2;
shot.height = 4;
shot.collides = true;
shot.collidesTiles = true;
shot.hitEffect = shotHit;
shot.despawnEffect = Fx.none;
shot.shootEffect = beatShoot;
shot.status = overload;
shot.healPercent = 2;
