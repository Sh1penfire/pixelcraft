const statuses = require("libs/statuses")

const frostWave = new Effect(20, e => {
    Draw.color(Color.white, Color.white, e.fin());
    Lines.stroke(e.fout() * 5)
    Lines.circle(e.x, e.y, e.fin() * 27)
    const d = new Floatc2({get(x, y){
    Lines.stroke(e.fout());
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x,y), e.fslope() * 10);
     }})
    Angles.randLenVectors(e.id, 2, e.fin() * 30, e.rotation, 360,d)
    Angles.randLenVectors(e.id, 4, e.fin() * 15, e.rotation, 360,d)
});


const fragment = extend(BasicBulletType, {});
fragment.damage = 10;
fragment.lifetime = 100;
fragment.drag = 0.01;
fragment.frontColor = Color.valueOf("b6cad6");
fragment.backColor = Color.valueOf("d7e0e5");
fragment.hitEffect = Fx.hitLancer;
fragment.status = StatusEffects.freezing;
fragment.statusDuration = 2400;
fragment.despawnEffect = Fx.freezing;

const fragmentBomb = extend(BombBulletType, {});
fragmentBomb.splashDamageRadius = 0;
fragmentBomb.splashDamage = 0;
fragmentBomb.width = 0;
fragmentBomb.height = 0;
fragmentBomb.lifetime = 0;
fragmentBomb.status = StatusEffects.freezing;
fragmentBomb.despawnEffect = frostWave;
fragmentBomb.hitEffect = frostWave;
fragmentBomb.hitSound = Sounds.none;
fragmentBomb.fragBullets = 10;
fragmentBomb.fragBullet = fragment;

//Meep help please, I can't understand why this dosn't work aaaaaaaa
function shardUnit(name, DC, DR, type, build){
    const unit = extendContent(type, name, {});
    unit.constructor = bt => {
        bt = extendContent(build, {
            damage(amount){
                amount = amount - amount * DR;
                if(amount > this.maxHealth * DC){
                    amount = this.maxHealth * DC;
                }
                this.super$damage(amount);
            },
            killed(){
                Fx.explosion.at(this.x, this.y)
                fragmentBomb.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
                this.dead = true;
            }
        });
        return bt;
    }
    unit.abilities.add(new StatusFieldAbility(StatusEffects.freezing, 360, 360, 60));
    unit.abilities.add(new StatusFieldAbility(statuses.warmth, 360, 360, 60));
    return unit;
};

const cryFac = extendContent(UnitFactory, "cryFac", {});

shardUnit("crystal", 0.95, 0.1, UnitType, MechUnit);
/*
const crystal = extendContent(UnitType, "crystal", {});
crystal.constructor = () => extend(MechUnit, {
    damage(amount){
        if(amount > this.maxHealth - 1){
            amount = this.maxHealth - 1;
            this.super$damage(amount);
        }
    },
    killed(){     
        Fx.explosion.at(this.x, this.y)
        fragmentBomb.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
        this.dead = true;
    }
});
*/

const stalactite = extendContent(UnitType, "stalactite", {});
stalactite.constructor = () => extend(MechUnit, {
    killed(){     
        Fx.explosion.at(this.x, this.y)
        fragmentBomb.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
        this.dead = true;
    }
});
stalactite.abilities.add(new StatusFieldAbility(StatusEffects.freezing, 360, 360, 60));
stalactite.abilities.add(new StatusFieldAbility(statuses.warmth, 360, 360, 60));

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "pixelcraft-crystal"), Vars.content.getByName(ContentType.unit, "pixelcraft-stalactite")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));


const stalagmite = extendContent(UnitType, "stalagmite", {});
stalagmite.constructor = () => extend(MechUnit, {
    killed(){     
        Fx.explosion.at(this.x, this.y)
        fragmentBomb.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
        this.dead = true;
    }
});
stalagmite.abilities.add(new StatusFieldAbility(StatusEffects.freezing, 360, 360, 60));
stalagmite.abilities.add(new StatusFieldAbility(statuses.warmth, 360, 360, 60));

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "pixelcraft-stalactite"), Vars.content.getByName(ContentType.unit, "pixelcraft-stalagmite")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));