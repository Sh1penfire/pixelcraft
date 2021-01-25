const fc = require("libs/fc");
const statuses = require("libs/statuses");

const shotFx = new Effect(20, e => {
  Draw.color(Color.valueOf("E06FFFFF"), Color.lightGray, e.fout()); 
  Fill.circle(e.x, e.y, e.fout() + 1 * 2);
});

const ironBullet = extend(BasicBulletType, {
    speed: 4,
    damage: 4,
    knockback: -1,
    width: 3,
    height: 6,
    shrinkY: 1,
    pierce: true,
    pierceBuilding: true,
    shootEffect: Fx.shootSmall,
    smokeEffect: Fx.shootSmallSmoke,
    lifetime: 25
});
ironBullet.hitEffect = Fx.none;
ironBullet.despawnEffect = Fx.none;
ironBullet.status = statuses.windswept;

const magnitineBullet = extend(BasicBulletType, {
    speed: 4,
    damage: 6,
    knockback: -1,
    width: 5,
    height: 8,
    shrinkY: 1,
    pierce: true,
    pierceBuilding: true,
    shootEffect: Fx.shootSmall,
    smokeEffect: Fx.shootSmallSmoke,
    lifetime: 18
});

magnitineBullet.hitEffect = Fx.none;
magnitineBullet.despawnEffect = Fx.none;
magnitineBullet.status = statuses.windswept;

const ironShot = extend(BasicBulletType, {
    draw(e){},
    update(b){
        if(Mathf.chance(0.5 * Time.delta)){
            ironBullet.create(b.owner, b.team, b.x, b.y, b.rotation() + 45 * b.fout() - Mathf.random(90) * b.fout(), 1 );
        }
    }
});
ironShot.knockback = 2;
ironShot.damage = 8;
ironShot.lifeimte = 5;
ironShot.collides = true;
ironShot.pierce = true;
ironShot.pierceBuilding = true;
ironShot.speed = 1;

const magnitineShot = extend(BasicBulletType, {
    draw(e){},
    update(b){
        if(Mathf.chance(0.7 * Time.delta)){
            magnitineBullet.create(b.owner, b.team, b.x, b.y, b.rotation() + 45 * b.fout() - Mathf.random(90) * b.fout(), 1.25 );
        }
    }
});
magnitineShot.knockback = 3;
magnitineShot.damage = 8;
magnitineShot.lifeimte = 5;
magnitineShot.collides = true;
magnitineShot.pierce = true;
magnitineShot.pierceBuilding = true;
magnitineShot.speed = 1.25;

const basicTurret3b1 = extendContent(ItemTurret, "basicTurret3b1", {  
    init() {
    this.ammo(
        Vars.content.getByName(ContentType.item,"pixelcraft-iron"), ironShot,
        Vars.content.getByName(ContentType.item,"pixelcraft-magnitine"), magnitineShot
    );
    this.super$init();
  }
});


/////
