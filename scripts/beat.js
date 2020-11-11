// Obligatory comment line for no reason at all

//shoot effect for beat
const beatShoot = new Effect(30, e => {
  Draw.color(Color.valueOf("05700b"), Color.valueOf("acfbb0"), e.fin());
  Lines.stroke(e.fout()*2);
  Lines.circle(e.x, e.y, e.fin() * 10);
});

//effect when bullet hits a target
const shotHit = new Effect(20, e => {
  Draw.color(Color.valueOf("05700b"), Color.valueOf("acfbb0"), e.fin());
  Lines.stroke(e.fout()*1);
  Lines.circle(e.x, e.y, e.fin() * 12.5);
});


//makes the shoot effect of beat
const shot = extend(LaserBoltBulletType, {});
        
//make effects of overload
const overloadFX = new Effect(40, e => {
Draw.color(Color.yellow, Color.white, e.fin());
Fill.circle(e.x, e.y, e.fslope() * 6);
});

const overload = extendContent(StatusEffect, "overload", {});

overload.speedMultiplier = 1.3;
overload.armorMultiplier = 1.1;
overload.damage = 0.0;
overload.effect = overloadFX;
overload.color  = Color.green;

//extends off the beat hjson file
const beat = extendContent(PowerTurret, "healingTurret2", {
  icons(){
    return [
      Core.atlas.find("block-2"),
      Core.atlas.find("pixelcraft-healingTurret2")
    ];
  }
});

//givving things stats

//givving beat it's stats (Some are predefined in the beat.hjson file
beat.recoil = 1;
beat.restitution = 0.015;
beat.shootType = shot;
beat.targetAir = false;
beat.targetGround = false;

//stats of bullet shot by beat
shot.damage = 0;
shot.speed = 5;
shot.lifetime = 50;
shot.knockback = 0;
shot.width = 2;
shot.height = 4;
shot.collides = true;
shot.collidesTiles = true;
shot.hitEffect = shotHit;
shot.despawnEffect = beatShoot
shot.shootEffect = beatShoot;
shot.status = overload;
shot.statusDuration = 900;
shot.pierce = true;
shot.healPercent = 2;

/*
shot.frontColor = 05700b;
shot.backColor = 05700b;
*/
