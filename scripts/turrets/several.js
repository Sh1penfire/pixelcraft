const fc = require("libs/fc");
const statuses = require("libs/statuses");
const voidicsm = require("extras/voidicsm");

const shotFx = new Effect(20, e => {
  Draw.color(Color.valueOf("E06FFFFF"), Color.lightGray, e.fout()); 
  Fill.circle(e.x, e.y, e.fout() + 1 * 2);
});

const ironBullet = extend(BasicBulletType, {
    draw(e){
        Draw.color(Color.white, Color.white, e.fin());
        Lines.stroke(e.fin() * 1);
        Lines.circle(e.x, e.y, e.fin() * 0.5);
    },
    speed: 4,
    damage: 4,
    knockback: -1,
    width: 3,
    height: 6,
    shrinkY: 1,
    pierce: true,
    pierceBuilding: true,
    statusDuration: 60,
    homingPower: 0.05,
    shootEffect: Fx.shootSmall,
    smokeEffect: Fx.shootSmallSmoke,
    lifetime: 25
});
ironBullet.hitEffect = Fx.none;
ironBullet.despawnEffect = Fx.none;
ironBullet.status = statuses.windswept;
ironBullet.statusDuration = 540;

const magnitineBullet = extend(BasicBulletType, {
    draw(e){
        Draw.color(Color.white, Color.white, e.fin());
        Lines.stroke(e.fout() * 2);
        Lines.circle(e.x, e.y, e.fin() * 1);
    },
    speed: 4,
    damage: 6,
    knockback: -1,
    width: 5,
    height: 8,
    shrinkY: 1,
    pierce: true,
    pierceBuilding: true,
    statusDuration: 150,
    homingPower: 0.05,
    shootEffect: Fx.shootSmall,
    smokeEffect: Fx.shootSmallSmoke,
    lifetime: 18
});

magnitineBullet.hitEffect = Fx.none;
magnitineBullet.despawnEffect = Fx.none;
magnitineBullet.status = statuses.windswept;
magnitineBullet.statusDuration = 540;

const stormBullet = extend(BasicBulletType, {
    draw(e){
        Draw.color(Color.white, Color.orange, e.fin());
        Lines.stroke(e.fout() * 2);
        Lines.circle(e.x, e.y, e.fin() * 1);
    },
    speed: 4,
    damage: 0,
    knockback: -2,
    width: 5,
    height: 8,
    shrinkY: 1,
    pierce: true,
    pierceBuilding: true,
    statusDuration: 150,
    homingPower: 0.05,
    shootEffect: Fx.shootSmall,
    smokeEffect: Fx.shootSmallSmoke,
    lifetime: 18
});

stormBullet.hitEffect = Fx.none;
stormBullet.despawnEffect = Fx.none;
stormBullet.status = statuses.blackout;

const ironShot = extend(BasicBulletType, {
    draw(e){
    Draw.color(Color.white, Color.white, e.fin());
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, e.fin() * 3);
    },
    update(b){
        if(Mathf.chance(Time.delta)){
            ironBullet.create(b.owner, b.team, b.x, b.y, b.rotation() + 65 * b.fout() - Mathf.random(130) * b.fout(), 1 );
        }
    }
});
ironShot.knockback = 2;
ironShot.damage = 8;
ironShot.lifeimte = 10;
ironShot.collides = true;
ironShot.pierce = true;
ironShot.pierceBuilding = true;
ironShot.speed = 1.2;

const magnitineShot = extend(BasicBulletType, {
    draw(e){
    Draw.color(Color.white, Color.white, e.fin());
    Lines.stroke(e.fin() * 2);
    Lines.circle(e.x, e.y, e.fin() * 4);
    },
    update(b){
        if(Mathf.chance(Time.delta)){
            magnitineBullet.create(b.owner, b.team, b.x, b.y, b.rotation() + 55 * b.fout() - Mathf.random(110) * b.fout(), 1.25 );
        }
    }
});
magnitineShot.knockback = 3;
magnitineShot.damage = 8;
magnitineShot.lifeimte = 10;
magnitineShot.collides = true;
magnitineShot.pierce = true;
magnitineShot.pierceBuilding = true;
magnitineShot.speed = 1.6;

const stormShot = extend(BasicBulletType, {
    draw(e){
    Draw.color(Color.white, Color.white, e.fin());
    Lines.stroke(e.fin() * 2);
    Lines.circle(e.x, e.y, e.fin() * 4);
    },
    update(b){
        if(Mathf.chance(Time.delta)){
            stormBullet.create(b.owner, b.team, b.x, b.y, b.rotation() + 55 * b.fout() - Mathf.random(110) * b.fout(), 1.25 );
        }
    }
});
stormShot.knockback = 3;
stormShot.damage = 0;
stormShot.lifeimte = 10;
stormShot.collides = true;
stormShot.pierce = true;
stormShot.pierceBuilding = true;
stormShot.speed = 1.6;

const basicTurret4b1 = extendContent(ItemTurret, "basicTurret4b1", {
    size: 3,
    rotationSpeed: 6,
    reloadTime: 15,
    init() {
    this.ammo(
        voidicsm.rust, ironShot,
        voidicsm.magnitine, magnitineShot,
        Vars.content.getByName(ContentType.item,"sand"), stormShot
    );
    this.super$init();
  }
});


/////
