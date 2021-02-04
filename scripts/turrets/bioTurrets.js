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

const bioShot1 = extend(ArtilleryBulletType, {
    width: 0,
    length: 0,
    lifetime: 360,
    speed: 6,
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


const bioShot3 = extend(BasicBulletType, {
    width: 0,
    length: 0,
    lifetime: 1200,
    speed: 2.5,
    collides: false,
    update(b){
        this.super$update(b);
        if(Mathf.chance(Time.delta)){
                let target1 = Units.closest(b.team, b.x, b.y, 92, u => u.damaged() && u.checkTarget(true, true));
                let target2 = Units.closestEnemy(b.team, b.x, b.y, 92, u => u.checkTarget(true, true));
                let target3 = Units.closest(b.team, b.x, b.y, 92, u => u.checkTarget(true, true));
                if(target1 != null && target1.damaged()){
                    target1.heal(0.1);
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target1), 0.1));
                    b.time = b.time + 0.01
                }
                else if(target3 != null){
                    let target4 = Units.closestEnemy(b.team, target3.x, target3.y, 256, u => u.checkTarget(true, true));
                    if(target4 != null){
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target3), 0.1));
                        target4.damage(3 - Mathf.dst(b.x, b.y, b.owner.x, b.owner.y)/256);
                    }
                    else{
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target3), 0.1));
                    }
                }
                else if(target2 != null){
                    target2.damage(1);
                    target2.apply(statuses.groveCurse, 360);
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target2), 0.1));
                }
                else if(Units.closestEnemy(b.team, b.owner.x, b.owner.y, 400, u => u.checkTarget(true, true)) == null && Units.closest(b.team, b.owner.x, b.owner.y, 400, u => u.damaged() && u.checkTarget(true, true)) == null){
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(b.owner.x, b.owner.y), 0.1));
                }
                else if(Mathf.dst(b.x, b.y, b.owner.x, b.owner.y) > 400){
                    b.vel.setAngle(b.angleTo(b.owner.x, b.owner.y));
                }
            }
        },
    draw(b){
    this.super$draw(b);
    Draw.color(Color.valueOf("#ced671"))
    Fill.circle(b.x, b.y, 2);
    Lines.stroke(0.5 + Math.abs(fc.helix(20, 1, b.fout())));
    let target1 = Units.closest(b.team, b.x, b.y, 92, u => u.damaged() && u.checkTarget(true, true));
    let target2 = Units.closestEnemy(b.team, b.x, b.y, 92, u => u.checkTarget(true, true));
    let target3 = Units.closest(b.team, b.x, b.y, 92, u => u.checkTarget(true, true));
    if(target1 != null && target1.damaged()){
        Lines.line(b.x, b.y, target1.x, target1.y);
        Fill.circle(target1.x, target1.y, 2);
    }
    else if(target3 != null){
        let target4 = Units.closestEnemy(b.team, target3.x, target3.y, 256, u => u.checkTarget(true, true));
        if(target4 != null){
            Lines.line(b.x, b.y, target3.x, target3.y);
            Fill.circle(target3.x, target3.y, 2);
            Lines.line(b.x, b.y, target4.x, target4.y);
            Fill.circle(target4.x, target4.y, 2);
        }
        else{
            Lines.line(b.x, b.y, target3.x, target3.y);
            Fill.circle(target3.x, target3.y, 2);
            Lines.stroke(1);
            Lines.spikes(b.x, b.y, b.fin() * 3, 1 + Math.abs(fc.helix(20, 5, b.fout())), 4, 0);
        }
    }
    else if(target2 != null){
        Lines.line(b.x, b.y, target2.x, target2.y);
        Fill.circle(target2.x, target2.y, 2);
    }
}
});
bioShot3.status = statuses.groveCurse;
bioShot3.despawnEffect = grove;
bioShot3.hitEffect = grove;

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
        let tempTarget = Units.closest(this.team, this.x, this.y, this.range(), u => u.damaged() && u.checkTarget(false, true));
        let tempTarget2 = Units.closestEnemy(this.team, this.x, this.y, this.range(), u => u.checkTarget(false, true));
        if(tempTarget != null){
            this.target = tempTarget;
        }
        else if(tempTarget2 != null){
            this.target = tempTarget2;
        }
    }
});
const basicTurret4b2 = extend(ItemTurret, "basicTurret4b2", {
    init(){
    this.ammo(
        Vars.content.getByName(ContentType.item,"pixelcraft-bionorb"), bioShot3
    );
    this.super$init();
    }
});
basicTurret4b2.buildType = () => extend(ItemTurret.ItemTurretBuild, basicTurret4b2, {
    validateTarget(){
        if(this.target != null){
            if(Units.closest(this.team, this.x, this.y, this.range(), u => u.damaged() && u.checkTarget(true, true)) != null || Units.closestEnemy(this.team, this.x, this.y, this.range(), u => u.checkTarget(true, true)) != null){
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
        let tempTarget = Units.closest(this.team, this.x, this.y, this.range(), u => u.damaged() && u.checkTarget(true, true));
        let tempTarget2 = Units.closest(this.team, this.x, this.y, this.range(), u => u.checkTarget(true, true));
        let tempTarget3 = Units.closestEnemy(this.team, this.x, this.y, this.range(), u => u.checkTarget(true, true));
        if(tempTarget != null){
                this.target = tempTarget;       
        }
        else if(tempTarget2 != null){
            let tempTarget4 = Units.closestEnemy(this.team, tempTarget2.x, tempTarget2.y, 200, u => u.checkTarget(true, true));
            if(tempTarget4 != null){
                this.target = tempTarget2;
            }
            else if(tempTarget3 != null){
            this.target = tempTarget3;
        }
        }
        else if(tempTarget3 != null){
            this.target = tempTarget3;
        }
    }
});