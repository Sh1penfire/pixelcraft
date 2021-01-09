const statuses = require("libs/statuses");
const fc = require("libs/fc");
const extras = require("extras/voidicsm");

const cryoexplosion = new Effect(45, e => {
    Draw.color(Color.cyan, Color.valueOf("6ecdec"), e.fin());
    Angles.randLenVectors(e.id, 25, e.finpow() * 75, e.rotation, 360, (x, y) => {
    Puddles.deposit(Vars.world.tileWorld(e.x + x, e.y + y), Liquids.cryofluid, 1);
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.5);
  })
});

const cryoShot = new Effect(45, e => {
    Draw.color(Color.cyan, Color.valueOf("6ecdec"), e.fin());
    Angles.randLenVectors(e.id, 15, e.finpow() * 5, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 1.5);
  })
});

const cryoTrail = new Effect(20, e => {
  Draw.color(Color.cyan, Color.valueOf("6ecdec"), e.fin());
  Lines.stroke(3 * e.fout());
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * 15,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * 15);
});

const magTrail = new Effect(15, e => {
    Draw.color(Color.white, Color.valueOf("c0c2d3"), e.fin());
    Lines.stroke(Math.abs(fc.helix(7, 3, e.fout())));
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * 15,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * 15);
});

const shadowWave = new Effect(50, e => {
    Draw.color(Color.black, Pal.darkMetal, e.fout());
    Lines.stroke(e.fout() * 6); 
    Lines.circle(e.x, e.y, e.fin() * 25); 
});

const darknessTrail = new Effect(30, e => {
  Draw.color(Color.black, Pal.darkMetal, e.fin());
  Lines.stroke(5 * e.fout());
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * 15,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * 15);
});

const shadowShot = new Effect(15, e => {
    Draw.color(Color.black, Color.black, e.fin());
    Angles.randLenVectors(e.id, 5, e.finpow() * 8, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 2);
    
  })
});

const freezingShot = extend(PointBulletType, {
    speed: 32,
    lifeimte: 20,
    damage: 250,
    splashDamage: 115,
    splashDamageRadius: 35,
    hitEffect: cryoexplosion,
    trailEffect: cryoTrail,
    shootEffect: cryoShot,
    trailSpacing: 2,
    collides: true,
    collidesAir: true,
    collidesGround: true,});

const magnetineFrag = extend(BasicBulletType, {
	damage: 5,
	splashDamage: 5,
	splashDamageRadius: 20,
	lifetime: 100,
	shrinkY: 1,
	homingRange: 100,
	homingPower: 10
});
magnetineFrag.frontColor = Color.valueOf("ffffff");
magnetineFrag.backColor = Color.valueOf("ffffff");
magnetineFrag.hitEffect = Fx.none;
magnetineFrag.despawnEffect = Fx.none;

const fragShot = extend(PointBulletType, {
	speed: 32,
	damage: 10,
    ammoMultiplier: 10,
    reloadMultiplier: 60,
	lifetime: 20,
    fragBullet: magnetineFrag,
	fragBullets: 5,
    trailEffect: magTrail,
    trailSpacing: 2,
	collides: true,
	collidesAir: true,
	collidesTiles: true
});
fragShot.frontColor = Color.valueOf("ffffff");
fragShot.backColor = Color.valueOf("ffffff");
fragShot.shootEffect = Fx.shootSmall;
fragShot.hitEffect = Fx.hitBulletBig;
fragShot.despawnEffect = Fx.none;
fragShot.ammoUseEffect = Fx.none;

const placeholdert = extend(BasicBulletType, {});
placeholdert.status = statuses.blackout;

const blackoutShot = extend(BombBulletType, {
    speed: 32,
    lifeimte: 20,
    damage: 450,
    splashDamage: 90,
    splashDamageRadius: 35,
    fragBullet: placeholdert,
    hitEffect: shadowWave,
    trailEffect: darknessTrail,
    shootEffect: shadowShot,
    trailSpacing: 2,
    collides: true,
    collidesAir: true,
    collidesGround: true,
});
blackoutShot.status = statuses.blackout;
blackoutShot.statusDuration = 3600;

const railgun3 = extendContent(ItemTurret, "railgun3", {
    init() {
    this.ammo(
        Vars.content.getByName(ContentType.item,"titanium"), freezingShot,
        Vars.content.getByName(ContentType.item,"pixelcraft-magnitine"), fragShot,
        Vars.content.getByName(ContentType.item,"pixelcraft-feromagnet"), blackoutShot
    );
    this.super$init();
  }
});


railgun3.buildType = () => extendContent(ItemTurret.ItemTurretBuild, railgun3, {
    shoot(type){
        let timer = 1

        let limitationX = Math.cos(this.rotation/180 * Math.PI) * this.range();
        let limitationY = Math.sin(this.rotation/180 * Math.PI) * this.range();
        
        let fireDst = Mathf.dst(this.x, this.y, fc.rangeLimit(this.targetPos.x - this.x, limitationX) + this.x, fc.rangeLimit(this.targetPos.y - this.y, limitationY) + this.y);
        
        type.create(this, this.team, fc.rangeLimit(this.targetPos.x - this.x, limitationX) + this.x, fc.rangeLimit(this.targetPos.y - this.y, limitationY) + this.y, this.rotation, 0);
        
        type.trailEffect.at(fc.rangeLimit(this.targetPos.x - this.x, limitationX) + this.x, fc.rangeLimit(this.targetPos.y - this.y, limitationY) + this.y, 0, this);
        
        if(type.fragBullet != null){
            while (timer < 5){
            type.fragBullet.create(this, this.team,
                               this.x + Math.cos(this.rotation/180 * Math.PI) * 15,
                               this.y + Math.sin(this.rotation/180 * Math.PI) * 15, this.rotation - timer * 5, fireDst/type.fragBullet.lifetime/timer);
            
            type.fragBullet.create(this, this.team,
                               this.x + Math.cos(this.rotation/180 * Math.PI) * 15,
                               this.y + Math.sin(this.rotation/180 * Math.PI) * 15, this.rotation + timer * 5, fireDst/type.fragBullet.lifetime/timer);
            timer++;
            }
        }
        
        this.effects();
        this.useAmmo();
        
    }
});
