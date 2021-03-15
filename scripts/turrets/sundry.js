const fc = require("libs/fc");
const statuses = require("libs/statuses");

const shotFx = new Effect(10, e => {
  Draw.color(Color.white, Color.lightGray, e.fin()); 
    Angles.randLenVectors(e.id, 4, e.fin() * 200, e.rotation, 10, (x, y) => {
        Lines.stroke(e.fout() * 2);
        Lines.circle(e.x + x, e.y + y, e.fout());
    })
    Drawf.light(Team.derelict, e.x, e.y, 60 + Mathf.absin(10, 5), Color.white, 0.25);
});

const shotFx2 = new Effect(10, e => {
  Draw.color(Color.orange, Color.orange, e.fin()); 
  Angles.randLenVectors(e.id, 8, e.fin() * 200, e.rotation, 10, (x, y) => {
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x + x, e.y + y, e.fout());
  })
});

const ironBullet = extend(BasicBulletType, {
    draw(e){
        Draw.color(Color.white, Color.white, e.fin());
        Lines.stroke(e.fin() * 1);
        Lines.circle(e.x, e.y, e.fin() * 0.5);
        e.data.draw(Color.white, e.fout() * 2);
    },
    update(b){
        this.super$update(b);
        if(Mathf.chance(Time.delta)){
        b.data.update(b.x, b.y);
        }
    },
    init(b){
        if(!b)return;
        b.data = new Trail(1);
    },
    speed: 40,
    damage: 10,
    knockback: -1,
    width: 3,
    height: 6,
    shrinkY: 1,
    pierce: true,
    pierceBuilding: true,
    statusDuration: 60,
    homingPower: 0.05,
    shootEffect: shotFx,
    smokeEffect: Fx.shootSmallSmoke,
    lifetime: 5
});
ironBullet.hitEffect = Fx.none;
ironBullet.despawnEffect = Fx.none;
ironBullet.status = statuses.windswept;
ironBullet.statusDuration = 540;

const magnitineBullet = extend(BasicBulletType, {
    draw(e){
        Draw.color(Color.white, Color.white, e.fin());
        Lines.stroke(e.fout());
        Lines.circle(e.x, e.y, e.fout() * 2);
        e.data.draw(Color.white, e.fout());
    },
    update(b){
        this.super$update(b);
        if(Mathf.chance(Time.delta)){
        b.data.update(b.x, b.y);
        }
    },
    init(b){
        if(!b)return;
        b.data = new Trail(1);
    },
    speed: 40,
    damage: 16.5,
    knockback: -1,
    width: 5,
    height: 8,
    shrinkY: 1,
    pierce: true,
    pierceBuilding: true,
    statusDuration: 150,
    homingPower: 0.25,
    shootEffect: shotFx,
    smokeEffect: Fx.shootSmallSmoke,
    lifetime: 5
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
        e.data.draw(Color.orange, e.fout() * 2);
    },
    update(b){
        this.super$update(b);
        if(Mathf.chance(Time.delta)){
        b.data.update(b.x, b.y);
        }
    },
    init(b){
        if(!b)return;
        b.data = new Trail(1);
    },
    speed: 40,
    damage: 12.5,
    knockback: -1,
    width: 5,
    height: 8,
    shrinkY: 1,
    pierce: true,
    pierceBuilding: true,
    incendAmount: 1,
    statusDuration: 150,
    shootEffect: shotFx2,
    smokeEffect: Fx.shootSmallSmoke,
    hitEffect: Fx.hitFlameSmall,
    despawnEffect: Fx.fire,
    status: statuses.blackout,
    lifetime: 5
});

const basicTurret5b1 = extendContent(ItemTurret, "basicTurret5b1", {
    shootDst: 25,
    init(){
    this.ammo(
        Vars.content.getByName(ContentType.item,"pixelcraft-iron"), ironBullet,
        Vars.content.getByName(ContentType.item,"pixelcraft-magnitine"), magnitineBullet,
        Vars.content.getByName(ContentType.item,"pixelcraft-ceramic"), stormBullet
    );
    this.super$init();
    }
});


/////
