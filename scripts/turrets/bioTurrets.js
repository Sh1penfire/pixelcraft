const fc = require("libs/fc");
const statuses = require("libs/statuses");

const thorns = new Effect(25, e=>{
    Draw.z(Layer.blockUnder);
    Draw.color(Color.valueOf("#ced671"), Color.white, Pal.darkMetal, e.fin());
    Lines.spikes(e.x, e.y, e.fin() * 3, e.fout() * 5, 4, e.fin() * 4);
    
    Draw.color(Color.valueOf("#ced671"), Color.valueOf(e.data.team.color), Pal.darkMetal, e.fin());
    Fill.circle(e.x, e.y, e.fout());

});

const grove = new Effect(25, e=>{
    Draw.color(Color.valueOf("#ced671"), Color.white, Pal.darkMetal, e.fin());
    Angles.randLenVectors(e.id, 8, e.finpow() * 25, e.rotation, 25, (x, y) => {
        Fill.circle(e.x, e.y, e.fout());
        Lines.spikes(e.x, e.y, e.fin() * 10, e.fout() * 5, 4, e.fin() * 4);
    });
});

const bioShot = extend(ArtilleryBulletType, {
    speed: 2.5,
    lifetime: 50,
    width: 8,
    height: 8,
    splashDamage: 15,
    splashDamageRadius: 24,
    ammoMultiplier: 5
});
bioShot.status = statuses.groveCurse;
bioShot.despawnEffect = Fx.explosion;
bioShot.hitEffect = Fx.explosion;
bioShot.frontColor = Color.valueOf("ced671");
bioShot.backColor = Color.valueOf("b8bf68");

const basicTurret2b2 = extend(ItemTurret, "basicTurret2b2", {
    init(){
    this.ammo(
        Vars.content.getByName(ContentType.item,"pixelcraft-bionorb"), bioShot
    );
    this.super$init();
    }
});

const bioShot1 = extend(BombBulletType, {
    width: 0,
    length: 0,
    lifetime: 10,
    despawned(b){
        bioShot2.create(b.owner, b.team, b.x, b.y, b.rotation(), 0);
        b.time = 0;
    },
    draw(b){
        
    }
})

const bioShot2 = extend(BombBulletType, {
    speed: 2.5,
    lifetime: 120,
    width: 0,
    height: 0,
    ammoMultiplier: 5,
    update(b){
        if(Mathf.chance(Time.delta)){
            if(Mathf.chance(0.3)){
                thorns.at(b.x + Mathf.range(25), b.y + Mathf.range(25), Mathf.random(360), b);
            }

            Units.nearbyEnemies(b.team, b.x, b.y, 24, 24, u =>{
                if(u.isGrounded() == true){
                    u.damage(1);
                    u.apply(statuses.groveCurse, 360);
                }
            });
                Units.nearby(b.team, b.x, b.y, 24, u =>{
                    if(u.isGrounded() == true){
                        u.heal(0.1);
                    }
                });
            }
        }
});
bioShot2.status = statuses.groveCurse;
bioShot2.despawnEffect = grove;
bioShot2.hitEffect = grove;

const basicTurret3b2 = extend(ItemTurret, "basicTurret3b2", {
    init(){
    this.ammo(
        Vars.content.getByName(ContentType.item,"pixelcraft-bionorb"), bioShot1
    );
    this.super$init();
    }
});

basicTurret3b2.buildType = () => extend(ItemTurret.ItemTurretBuild, basicTurret3b2, {
    validateTarget(){
        if(this.target != null){
            if(Units.closest(this.team, this.x, this.y, this.range(), u => u.damaged() && u.checkTarget(false, true)) != null || Units.closestEnemy(this.team, this.x, this.y, this.range(), u => u.checkTarget(false, true)) != null){
                return true;
            }
            else{
                return false;
            }
        }
        else if(this.isControlled() == true || this.logicControlled() == true){
            return true;
        }
        else{
            return false;
        }
    },
    findTarget(){
        let tempTarget = Units.closestEnemy(this.team, this.x, this.y, this.range(), u => u.checkTarget(false, true));
        let tempTarget2 = Units.closest(this.team, this.x, this.y, this.range(), u => u.damaged() && u.checkTarget(false, true));
        if(tempTarget != null){
            this.target = tempTarget;
        }
        else if(tempTarget2 != null){
            this.target = tempTarget2;
        }
    },
    shoot(type){
        
        let limitationX = Math.cos(this.rotation/180 * Math.PI) * this.range();
        let limitationY = Math.sin(this.rotation/180 * Math.PI) * this.range();
        
        let fireDst = Mathf.dst(this.x, this.y, fc.rangeLimit(this.targetPos.x - this.x, limitationX) + this.x, fc.rangeLimit(this.targetPos.y - this.y, limitationY) + this.y);
        
        type.create(this, this.team, fc.rangeLimit(this.targetPos.x - this.x, limitationX) + this.x, fc.rangeLimit(this.targetPos.y - this.y, limitationY) + this.y, this.rotation, 0);
        
        this.useAmmo();
    }
});