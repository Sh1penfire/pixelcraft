const fc = require("libs/fc");
const statuses = require("libs/statuses");

function shootTo(Bullet, Origin, Target, inacurracy){
    //essentualy artillery bullet code but not at all, since this shoots a bullet from a bullet.
    Bullet.create(Origin.owner, Origin.team, Origin.x, Origin.y, Origin.angleTo(Target) + Mathf.range(inacurracy), 1, Mathf.dst(Origin.x, Origin.y, Target.x, Target.y)/Bullet.lifetime/Bullet.speed + 0.1);
}

function shootTo2(Bullet, ShootX, ShootY, Origin){
    //essentualy artillery bullet code but not at all, since this shoots a bullet from a bullet.
    Bullet.create(Origin.owner, Origin.team, Origin.x, Origin.y, Origin.angleTo(ShootX, ShootY), 1, Mathf.dst(Origin.x, Origin.y, ShootX, ShootY)/Bullet.lifetime/Bullet.speed + 0.1);
}

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
bioShot.status = statuses.seeded;
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

            Units.nearbyEnemies(b.team, b.x - 24, b.y - 24, 48, 48, u =>{
                if(u.isGrounded() == true){
                    u.damage(1);
                    u.apply(statuses.groveCurse, 360);
                }
            });
                Units.nearby(b.team, b.x - 24, b.y - 24, 48, u =>{
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
    healPercent: 0.03,
    width: 0,
    length: 0,
    lifetime: 1200,
    speed: 2.5,
    buildingDamageMultiplier: 0,
    collides: false,
    update(b){
        this.super$update(b);
        if(Mathf.chance(Time.delta)){
                let target0 = null
                let tempVar = Units.findDamagedTile(b.team, b.x, b.y);
                if(tempVar != null){
                    if(Mathf.dst(b.x, b.y, tempVar.x, tempVar.y) < 128){
                        target0 = tempVar
                    }
                }
                let target1 = Units.closest(b.team, b.x, b.y, 92, u => u.damaged() && u.checkTarget(true, true));
                let target2 = Units.closestEnemy(b.team, b.x, b.y, 92, u => u.checkTarget(true, true));
                let target3 = Units.closest(b.team, b.x, b.y, 92, u => u.checkTarget(true, true));    
            
                let target5 = null
                let tempVar2 = Units.findDamagedTile(b.owner.team, b.owner.x, b.owner.y);
                if(tempVar2 != null){
                    if(Mathf.dst(b.owner.x, b.owner.y, tempVar.x, tempVar.y) < b.owner.range()){
                        target5 = tempVar2
                    }
                }
            
                if(target1 != null && target1.damaged()){
                    target1.heal(0.1);
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target1), 0.1));
                    b.time = b.time + 0.01
                }
                else if(target3 != null){
                    let target4 = Units.closestEnemy(b.team, target3.x, target3.y, 256, u => u.checkTarget(true, true));
                    if(target4 != null){
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target3), 0.1));
                        target4.damageContinuousPierce(1.5 - Mathf.dst(b.x, b.y, b.owner.x, b.owner.y)/256);
                    }
                    else if(target0 != null){
                        target0.heal(target0.maxHealth/3000);
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target3), 0.1));
                    }
                    else{
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target3), 0.1));
                    }
                }
                else if(target2 != null){
                    target2.damageContinuousPierce(0.25);
                    target2.apply(statuses.groveCurse, 360);
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target2), 0.1));
                }
                else if(target0 != null){
                    target0.heal(target0.maxHealth/8000);
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target0), 0.1));
                }
                else if(target5 != null){
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target5), 0.2));
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
    let target0 = null
    let tempVar = Units.findDamagedTile(b.team, b.x, b.y);
    if(tempVar != null){
        if(Mathf.dst(b.x, b.y, tempVar.x, tempVar.y) < 128){
            target0 = tempVar
        }
    }
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
        else if(target0 != null){
            Lines.line(b.x, b.y, target3.x, target3.y);
            Fill.circle(target3.x, target3.y, 2);
            Lines.line(b.x, b.y, target0.x, target0.y);
            Fill.circle(target0.x, target0.y, 2);
            Lines.stroke(1);
            Lines.spikes(b.x, b.y, b.fin() * 3, 1 + Math.abs(fc.helix(20, 5, b.fout())), 4, 45);
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
    else if(target0 != null){
        Lines.line(b.x, b.y, target0.x, target0.y);
        Fill.circle(target0.x, target0.y, 2);
        Lines.stroke(1);
        Lines.spikes(b.x, b.y, b.fin() * 3, 1 + Math.abs(fc.helix(20, 5, b.fout())), 4, 45);
    }
}
});
bioShot3.despawnEffect = grove;
bioShot3.hitEffect = grove;
bioShot3.status = statuses.groveCurse;

//bionite shots are more aggresive and do less healing with more damage
const bioShot4 = extend(BasicBulletType, {
    healPercent: 0.01,
    width: 0,
    length: 0,
    lifetime: 2400,
    speed: 2.5,
    buildingDamageMultiplier: 0,
    collides: false,
    despawned(b){
        this.super$despawned(b);
        bioShot2.create(b.owner, b.team, b.x, b.y, b.rotation(), 0);
    },
    update(b){
        this.super$update(b);
        if(Mathf.chance(Time.delta)){
                let target0 = null
                let tempVar = Units.findDamagedTile(b.team, b.x, b.y);
                if(tempVar != null){
                    if(Mathf.dst(b.x, b.y, tempVar.x, tempVar.y) < 128){
                        target0 = tempVar
                    }
                }
                let target1 = Units.closest(b.team, b.x, b.y, 128, u => u.damaged() && u.checkTarget(true, true));
                let target2 = Units.closestEnemy(b.team, b.x, b.y, 256, u => u.checkTarget(true, true));
                let target3 = Units.closest(b.team, b.x, b.y, 128, u => u.checkTarget(true, true));
            
                let target5 = null
                let tempVar2 = Units.findDamagedTile(b.owner.team, b.owner.x, b.owner.y);
                if(tempVar2 != null){
                    if(Mathf.dst(b.owner.x, b.owner.y, tempVar.x, tempVar.y) < b.owner.range()){
                        target5 = tempVar2
                    }
                }
            
                if(target1 != null && target1.damaged()){
                    target1.heal(0.05);
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target1), 0.1));
                    b.time = b.time + 0.01
                }
                else if(target3 != null){
                    let target4 = Units.closestEnemy(b.team, target3.x, target3.y, 256, u => u.checkTarget(true, true));
                    if(target4 != null){
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target4), 0.1));
                        target4.damageContinuousPierce(2 - Mathf.dst(b.x, b.y, b.owner.x, b.owner.y)/256);
                    }
                    else if(target0 != null){
                    target0.heal(target0.maxHealth/9000);
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target3), 0.1));
                    }
                    else{
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target3), 0.05));
                    }
                }
                else if(target2 != null){
                    target2.damageContinuousPierce(0.5);
                    target2.apply(statuses.groveCurse, 360);
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target2), 0.2));
                }
                else if(target0 != null){
                        target0.heal(target0.maxHealth/10000);
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target0), 0.2));
                        }
                else if(target5 != null){
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target5), 0.2));
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
    Draw.color(Color.valueOf("#acb674"), Color.white, Math.abs(fc.helix(20, 1, b.fout())))
    Fill.circle(b.x, b.y, 2);
    Lines.stroke(0.5 + Math.abs(fc.helix(20, 1, b.fout())));
    let target0 = null
    let tempVar = Units.findDamagedTile(b.team, b.x, b.y);
        if(tempVar != null){
            if(Mathf.dst(b.x, b.y, tempVar.x, tempVar.y) < 128){
                target0 = tempVar
            }
        }
    let target1 = Units.closest(b.team, b.x, b.y, 128, u => u.damaged() && u.checkTarget(true, true));
    let target2 = Units.closestEnemy(b.team, b.x, b.y, 256, u => u.checkTarget(true, true));
    let target3 = Units.closest(b.team, b.x, b.y, 128, u => u.checkTarget(true, true));
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
        else if(target0 != null){
            Lines.line(b.x, b.y, target3.x, target3.y);
            Fill.circle(target3.x, target3.y, 2);
            Lines.line(b.x, b.y, target0.x, target0.y);
            Fill.circle(target0.x, target0.y, 2);
            Lines.stroke(1);
            Lines.spikes(b.x, b.y, b.fin() * 3, 1 + Math.abs(fc.helix(20, 5, b.fout())), 4, 45);
        }
        else{
            Lines.line(b.x, b.y, target3.x, target3.y);
            Fill.circle(target3.x, target3.y, 2);
            Lines.stroke(1);
            Lines.spikes(b.x, b.y, b.fin() * 3, 1 + Math.abs(fc.helix(20, 5, b.fout())), 4, 45);
        }
    }
    else if(target2 != null){
        Lines.line(b.x, b.y, target2.x, target2.y);
        Fill.circle(target2.x, target2.y, 2);
    }
    else if(target0 != null){
        Lines.line(b.x, b.y, target0.x, target0.y);
        Fill.circle(target0.x, target0.y, 2);
    }
}
});
bioShot4.despawnEffect = grove;
bioShot4.hitEffect = grove;
bioShot4.status = statuses.groveCurse;

const sporeOrbShot = extend(BasicBulletType, {
	damage: 2,
    speed: 3,
	lifetime: 25,
	shrinkY: 0.5,
    homingRange: 100,
    homingPower: 0.1,
    frontColor: Pal.spore,
    backColor: Color.purple,
    hitEffect: statuses.sporefire.effect,
    despawnEffect: statuses.sporefire.effect,
    status: statuses.sporefire
});

const sporeOrbShot2 = extend(BasicBulletType, {
	damage: 2,
    speed: 3,
	lifetime: 20,
	shrinkY: 0.5,
    frontColor: Pal.spore,
    backColor: Color.purple,
    hitEffect: statuses.sporefire.effect,
    despawnEffect: statuses.sporefire.effect,
    status: statuses.sporefire
});

//Spore shots will shoot targets instaid of atatching to them, but can still attach to friendly units. They can also attack enemy blocks. WIP
const bioShot5 = extend(BasicBulletType, {
    width: 0,
    length: 0,
    lifetime: 2400,
    speed: 2.5,
    collides: false,
    despawned(b){
        this.super$despawned(b);
        bioShot2.create(b.owner, b.team, b.x, b.y, b.rotation(), 0);
    },
    update(b){
        this.super$update(b);
        if(Mathf.chance(Time.delta)){
                let target0 = null
                let tempVar = Units.findDamagedTile(b.team, b.x, b.y);
                if(tempVar != null){
                    if(Mathf.dst(b.x, b.y, tempVar.x, tempVar.y) < 128){
                        target0 = tempVar
                    }
                }
                let target1 = Units.closest(b.team, b.x, b.y, 128, u => u.damaged() && u.checkTarget(true, true));
                let target2 = Units.closestTarget(b.team, b.x, b.y, 256, u => u.checkTarget(true, true));
                let target3 = Units.closest(b.team, b.x, b.y, 128, u => u.checkTarget(true, true));
                let target5 = Units.closest(b.team, b.owner.x, b.owner.y, b.owner.range(), u => !fc.statusCheck(u, statuses.sporefireC));
                
                if(target1 != null && target1.damaged()){
                    target1.heal(0.05);
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target1), 0.1));
                    target1.apply(statuses.sporefireC, 360);
                }
                else if(target3 != null){
                    target3.apply(statuses.sporefireC, 360)
                    let target4 = Units.closestTarget(b.team, target3.x, target3.y, 256, u => u.checkTarget(true, true));
                    if(target3.isShooting == true){
                        let limitationX = Math.cos(b.angleTo(target3.aimX, target3.aimY)/180 * Math.PI) * 256;
                        let limitationY = Math.sin(b.angleTo(target3.aimX, target3.aimY)/180 * Math.PI) * 256;
                        
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target3), 0.05));
                        if(Math.abs(fc.helix(15, 1, 1, b.fout())) > 0.95){
                            shootTo2(sporeOrbShot2, fc.rangeLimit(target3.aimX - b.x, limitationX) + target3.x, fc.rangeLimit(target3.aimY - b.y, limitationY) + target3.y, b)
                        }
                    }
                    else if(target4 != null){
                        //lil extra nudge to stay closer
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target3), 0.05));
                        if(Math.abs(fc.helix(25, 1, 1, b.fout())) > 0.9){
                                shootTo(sporeOrbShot, b, target4, 25)
                           }
                    }
                    else{
                        target3.apply(statuses.sporefireC, 720)
                    }
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target3), 0.05));
                }
                else if(target2 != null){
                    if(Math.abs(fc.helix(15, 1, 1, b.fout())) > 0.95){
                        shootTo(sporeOrbShot, b, target2, 25)
                    }
                    b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target2), 0.025));
                }
                else if(Units.closestTarget(b.team, b.owner.x, b.owner.y, 400, u => u.checkTarget(true, true)) == null && Units.closest(b.team, b.owner.x, b.owner.y, 400, u => u.damaged() && u.checkTarget(true, true)) == null){
                    if(target5 != null){
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target5), 0.1));
                    }
                    else{
                        b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(b.owner.x, b.owner.y), 0.1));
                    }
                }
                else if(Mathf.dst(b.x, b.y, b.owner.x, b.owner.y) > 400){
                    b.vel.setAngle(b.angleTo(b.owner.x, b.owner.y));
                }
            }
        },
    draw(b){
    this.super$draw(b);
    Draw.color(Pal.spore, Color.purple, Math.abs(fc.helix(20, 1, b.fout())))
    Fill.circle(b.x, b.y, 2);
    Lines.stroke(0.5 + Math.abs(fc.helix(20, 1, b.fout())));
    let target0 = null
    let tempVar = Units.findDamagedTile(b.team, b.x, b.y);
        if(tempVar != null){
            if(Mathf.dst(b.x, b.y, tempVar.x, tempVar.y) < 128){
                target0 = tempVar
            }
        }
    let target1 = Units.closest(b.team, b.x, b.y, 128, u => u.damaged() && u.checkTarget(true, true));
    let target2 = Units.closestTarget(b.team, b.x, b.y, 256, u => u.checkTarget(true, true));
    let target3 = Units.closest(b.team, b.x, b.y, 128, u => u.checkTarget(true, true));                
    let target5 = Units.closest(b.team, b.owner.x, b.owner.y, b.owner.range(), u => !fc.statusCheck(u, statuses.sporefireC));
    if(target1 != null && target1.damaged()){
        Lines.line(b.x, b.y, target1.x, target1.y);
        Fill.circle(target1.x, target1.y, 2);
    }
    else if(target3 != null){
        let target4 = Units.closestTarget(b.team, target3.x, target3.y, 256, u => u.checkTarget(true, true));
        if(target3.isShooting == true){
            
            let limitationX = Math.cos(b.angleTo(target3.aimX, target3.aimY)/180 * Math.PI) * 256;
            let limitationY = Math.sin(b.angleTo(target3.aimX, target3.aimY)/180 * Math.PI) * 256;
            let DrawingX = fc.rangeLimit(target3.aimX - b.x, limitationX) + target3.x
            let DrawingY = fc.rangeLimit(target3.aimY - b.y, limitationY) + target3.y
            
            Lines.line(b.x, b.y, target3.x, target3.y);
            Fill.circle(target3.x, target3.y, 2);
            Draw.alpha(0.5);
            Lines.line(target3.x, target3.y, DrawingX, DrawingY);
            Fill.circle(DrawingX, DrawingY, 2);
        }
        else if(target4 != null){
            Lines.line(b.x, b.y, target3.x, target3.y);
            Fill.circle(target3.x, target3.y, 2);
            Draw.alpha(0.5);
            Lines.line(b.x, b.y, target4.x, target4.y);
            Fill.circle(target4.x, target4.y, 2);
        }
        else{
            Lines.line(b.x, b.y, target3.x, target3.y);
            Fill.circle(target3.x, target3.y, 2);
            Lines.stroke(1);
            Lines.spikes(b.x, b.y, b.fin() * 3, 1 + Math.abs(fc.helix(20, 5, b.fout())), 4, 45);
        }
    }
    else if(target2 != null){
        Draw.alpha(0.5);
        Lines.line(b.x, b.y, target2.x, target2.y);
        Fill.circle(target2.x, target2.y, 2);
    }
    else if(target5 != null && Units.closestEnemy(b.team, b.owner.x, b.owner.y, 400, u => u.checkTarget(true, true)) == null && Units.closest(b.team, b.owner.x, b.owner.y, 400, u => u.damaged() && u.checkTarget(true, true)) == null){
        Lines.line(b.x, b.y, target5.x, target5.y);
        Fill.circle(target5.x, target5.y, 2);
    }
}
});
bioShot5.despawnEffect = grove;
bioShot5.hitEffect = grove;
bioShot5.status = statuses.sporefireC

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
        Vars.content.getByName(ContentType.item,"pixelcraft-bionorb"), bioShot3,
        Vars.content.getByName(ContentType.item,"pixelcraft-bionite"), bioShot4,
        Vars.content.getByName(ContentType.item,"spore-pod"), bioShot5
    );
    this.super$init();
    }
});
basicTurret4b2.buildType = () => extend(ItemTurret.ItemTurretBuild, basicTurret4b2, {
    validateTarget(){
        let target0 = null
        let tempTarget1 = null
        let tempTarget2 = Units.closestEnemy(this.team, this.x, this.y, this.range(), u => u.checkTarget(true, true))
        let tempVar = Units.findDamagedTile(this.team, this.x, this.y);
        if(!this.ammo.isEmpty()){
            if(tempVar != null && this.peekAmmo().healPercent > 0){
                if(Mathf.dst(this.x, this.y, tempVar.x, tempVar.y) < this.range()){
                    target0 = tempVar
                }
            }
            else if(this.peekAmmo().status == statuses.sporefireC && this.peekAmmo().buildingDamageMultiplier !== 0){
                tempTarget1 = Units.closest(this.team, this.x, this.y, this.range(), u => !fc.statusCheck(u, statuses.sporefireC));
                tempTarget2 = Units.closestTarget(this.team, this.x, this.y, this.range(), u => u.checkTarget(true, true));
            }
        }
        if(this.target != null){
            if(Units.closest(this.team, this.x, this.y, this.range(), u => u.damaged() && u.checkTarget(true, true)) != null || target0 != null || tempTarget1 != null || tempTarget2 != null){
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
        //defining targets
        let target0 = null
        let tempTarget5 = null
        let tempVar = Units.findDamagedTile(this.team, this.x, this.y);
        let tempTarget = Units.closest(this.team, this.x, this.y, this.range(), u => u.damaged() && u.checkTarget(true, true));
        let tempTarget2 = Units.closest(this.team, this.x, this.y, this.range(), u => u.checkTarget(true, true));
        let tempTarget3 = Units.closestEnemy(this.team, this.x, this.y, this.range(), u => u.checkTarget(true, true));
        let tempTarget4 = null
        if(tempTarget2 != null){
            tempTarget4 = Units.closestEnemy(this.team, tempTarget2.x, tempTarget2.y, 200, u => u.checkTarget(true, true));
        }
        if(!this.ammo.isEmpty()){
            if(tempVar != null && this.peekAmmo().healPercent > 0){
                if(Mathf.dst(this.x, this.y, tempVar.x, tempVar.y) < this.range()){
                    target0 = tempVar
                }
            }
            else if(this.peekAmmo().status == statuses.sporefireC && this.peekAmmo().buildingDamageMultiplier !== 0){
                tempTarget5 = Units.closest(this.team, this.x, this.y, this.range(), u => !fc.statusCheck(u, statuses.sporefireC));
                tempTarget3 = Units.closestTarget(this.team, this.x, this.y, this.range(), u => u.checkTarget(true, true));
                if(tempTarget2 != null){
                    tempTarget4 = Units.closestTarget(this.team, tempTarget2.x, tempTarget2.y, 200, u => u.checkTarget(true, true));
                }
            }
        }
        //start the targeting checks
        if(tempTarget != null){
                this.target = tempTarget;
        }
        else if(tempTarget4 != null){
                this.target = tempTarget2;
        }
        else if(tempTarget5 != null){
            this.target = tempTarget5
        }
        else if(tempTarget3 != null){
            this.target = tempTarget3;
        }
        else if(target0 != null){
            this.target = target0
        }
    }
});