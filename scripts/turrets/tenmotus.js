const statuses = require("libs/statuses");
const fc = require("libs/fc");
const extras = require("extras/voidicsm");
const bombs = require("blocks/bombs")
const firinDistance = 5;

const cryoexplosion = new Effect(45, e => {
    Draw.color(Color.cyan, Color.valueOf("6ecdec"), e.fin());
    Angles.randLenVectors(e.id, 55, e.finpow() * 75, e.rotation, 360, (x, y) => {
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
    Draw.z(Layer.bullet)
    Lines.stroke(Math.abs(fc.helix(7, 3, e.fout())));
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * firinDistance,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * firinDistance);
});

const magTrail = new Effect(15, e => {
    Draw.color(Color.white, Color.valueOf("c0c2d3"), e.fin());
    Draw.z(Layer.bullet)
    Lines.stroke(Math.abs(fc.helix(3, 3, e.fout())));
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * firinDistance,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * firinDistance);
});

const shadowWave = new Effect(50, e => {
    Draw.color(Color.black, Pal.darkMetal, e.fout());
    Lines.stroke(e.fout() * 6); 
    Lines.circle(e.x, e.y, e.fin() * 25); 
});

const darknessTrail = new Effect(30, e => {
  Draw.color(Color.black, Pal.darkMetal, e.fin());
    Draw.z(Layer.bullet)
    Lines.stroke(Math.abs(fc.helix(7, 5, e.fout())));
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * firinDistance,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * firinDistance);
});

const shadowShot = new Effect(15, e => {
    Draw.color(Color.black, Color.black, e.fin());
    Angles.randLenVectors(e.id, 5, e.finpow() * 8, e.rotation, 360, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 2);
    
  })
});

const prismaticWave = new Effect(50, e => {
  Draw.color(Color.white, Pal.darkMetal, e.fin());
    Lines.stroke(e.fout() * 6); 
    Lines.circle(e.x, e.y, e.fin() * 25); 
});

const prismaticTrail = new Effect(30, e => {
  Draw.color(Color.white, Pal.darkMetal, e.fin());
    Draw.z(Layer.bullet)
    Lines.stroke(Math.abs(fc.helix(7, 5, e.fout())));
    Lines.line(e.x,
               e.y,
               e.data.x + Math.cos(e.data.rotation/180 * Math.PI) * firinDistance,
               e.data.y + Math.sin(e.data.rotation/180 * Math.PI) * firinDistance);
});

const freezingShotFrag = extend(BasicBulletType, {
	damage: 5,
	lifetime: 100,
    despawnEffect: cryoShot,
    hitEffect: cryoShot,
    buildingDamageMultiplier: 0.5,
    status: StatusEffects.freezing
});
freezingShotFrag.frontColor = Color.cyan;
freezingShotFrag.backColor = Color.cyan;

const freezingShot = extend(PointBulletType, {
    speed: 32,
    lifeimte: 0,
    damage: 340,
    splashDamageRadius: 35,
    hitEffect: cryoexplosion,
    despawnEffect: cryoShot,
    trailEffect: cryoTrail,
    shootEffect: cryoShot,
    trailSpacing: 2,
    fragBullet: freezingShotFrag,
    fragBullets: 1,
    collides: true,
    collidesAir: true,
    collidesGround: true,
    buildingDamageMultiplier: 0.5,
    setStats(){
    this.super$setStats();
    this.stats.add(Stat.splashDamage, "115");
    this.stats.add(Stat.splashDamageRadius, "45");
    },
    cryoSplash(b){
        cryoexplosion.at(b.x, b.y);
        bombs.prisBullets[5].create(b.owner, b.team, b.x, b.y, b.rotation() + Mathf.range(180), 0)
        Puddles.deposit(Vars.world.tileWorld(b.x, b.y), Liquids.cryofluid, 30);
        let rad = 20;
        Units.nearby(b.x - rad * 4, b.y- rad * 4, rad * 8, rad * 8, cons(u => {
            if(!u.isDead) {
                Puddles.deposit(Vars.world.tileWorld(b.x, b.y), Liquids.cryofluid, 1);
                if(u.team != b.team){
                    u.apply(statuses.slushFall, 900 - Mathf.dst(b.x, b.y, u.x, u.y)/180 * 900);
                    u.damageContinuousPierce(50 - Mathf.dst(b.x, b.y, u.x, u.y)/180 * 50);
                }
            }
        }));
    },
    hit(b){
        this.cryoSplash(b);
    },
    despawned(b){
        this.cryoSplash(b);
    }
});

const magnetineFrag = extend(BasicBulletType, {
	damage: 25,
	lifetime: 100,
	shrinkY: 1,
	homingRange: 100,
	homingPower: 10,
    buildingDamageMultiplier: 0
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
	collidesTiles: true,
    buildingDamageMultiplier: 0.25
});
fragShot.frontColor = Color.valueOf("ffffff");
fragShot.backColor = Color.valueOf("ffffff");
fragShot.shootEffect = Fx.none;
fragShot.smokeEffect = Fx.none;
fragShot.hitEffect = Fx.hitBulletBig;
fragShot.despawnEffect = Fx.none;
fragShot.ammoUseEffect = Fx.none;

const placeholdert = extend(BasicBulletType, {
    speed: 1
});
placeholdert.status = statuses.blackout;

const blackoutShot = extend(BombBulletType, {
    speed: 32,
    lifeimte: 20,
    damage: 450,
    fragBullet: placeholdert,
    hitEffect: shadowWave,
    trailEffect: darknessTrail,
    shootEffect: shadowShot,
    trailSpacing: 2,
    collides: true,
    collidesAir: true,
    collidesGround: true,
    buildingDamageMultiplier: 0.35,
    darkSplash(b){
        shadowWave.at(b.x, b.y);
        let rad = 5;
        Units.nearby(b.x - rad * 4, b.y- rad * 4, rad * 8, rad * 8, cons(u => {
            if(!u.isDead) {
                Puddles.deposit(Vars.world.tileWorld(b.x, b.y), Liquids.cryofluid, 1);
                u.apply(statuses.blackout, 360);
                u.damageContinuousPierce(55);
            }
        }));
    },
    hit(b){
        this.darkSplash(b);
    },
    despawned(b){
        this.darkSplash(b);
    }
});
blackoutShot.status = statuses.blackout;
blackoutShot.statusDuration = 3600;

const placeholdert2 = extend(BasicBulletType, {});
placeholdert2.status = statuses.prismium;
placeholdert2.pierce = true;

const lightShot = extend(BombBulletType, {
    speed: 32,
    lifeimte: 20,
    damage: 600,
    fragBullet: placeholdert2,
    fragBullets: 25,
    hitEffect: prismaticWave,
    trailEffect: prismaticTrail,
    shootEffect: prismaticWave,
    trailSpacing: 2,
    buildingDamageMultiplier: 0.75,
    collides: true,
    collidesAir: true,
    collidesGround: true,
    collidesTiles: false,
    lightWave(b){
        prismaticWave.at(b.x, b.y);
        let rad = 4;
        Units.nearby(b.x - rad * 4, b.y- rad * 4, rad * 8, rad * 8, cons(u => {
            if(!u.isDead) {
                Puddles.deposit(Vars.world.tileWorld(b.x, b.y), Liquids.cryofluid, 1);
                u.apply(statuses.prismium, 360);
                u.damageContinuousPierce(100);
            }
        }));
    },
    hit(b){
        this.despawned(b);
        this.lightWave(b);
    },
    despawned(b){
        let timer = 0
        while(timer < 25){
            placeholdert2.create(b.owner, b.team, b.x, b.y, 360/25 * timer, 1);
            timer++
        }
        this.lightWave(b);
    }
})
lightShot.status = statuses.prismium;

const railgun3 = extendContent(ItemTurret, "railgun3", {
    init() {
    this.ammo(
        Vars.content.getByName(ContentType.item,"titanium"), freezingShot,
        Vars.content.getByName(ContentType.item,"pixelcraft-magnitine"), fragShot,
        Vars.content.getByName(ContentType.item,"pixelcraft-feromagnet"), blackoutShot,
        Vars.content.getByName(ContentType.item,"pixelcraft-stelarcrim"), lightShot
    );
    this.super$init();
  }
});


railgun3.buildType = () => extendContent(ItemTurret.ItemTurretBuild, railgun3, {
    unitSort: (u, x, y) => -u.maxHealth,
    shoot(type){
        /*
        Units.findEnemyTile(this.team, this.float x, this.y, this.range(), unitSort{
        if(team == Team.derelict)

        return indexer.findEnemyTile(team, x, y, range, pred);
    }*/
        
        let timer = 1

        let limitationX = Math.cos(this.rotation/180 * Math.PI) * this.range();
        let limitationY = Math.sin(this.rotation/180 * Math.PI) * this.range();
        
        let fireDst = Mathf.dst(this.x, this.y, fc.rangeLimit(this.targetPos.x - this.x, limitationX) + this.x, fc.rangeLimit(this.targetPos.y - this.y, limitationY) + this.y);
        
        type.create(this, this.team, fc.rangeLimit(this.targetPos.x - this.x, limitationX) + this.x, fc.rangeLimit(this.targetPos.y - this.y, limitationY) + this.y, this.rotation, 0);
        
        type.trailEffect.at(fc.rangeLimit(this.targetPos.x - this.x, limitationX) + this.x, fc.rangeLimit(this.targetPos.y - this.y, limitationY) + this.y, 0, this);
        
        type.hitEffect.at(fc.rangeLimit(this.targetPos.x - this.x, limitationX) + this.x, fc.rangeLimit(this.targetPos.y - this.y, limitationY) + this.y, this.rotation, this);
        
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