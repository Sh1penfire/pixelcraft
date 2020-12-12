const warmth = extend(StatusEffect, "warmth", {});
warmth.speedMultiplier = 1.5;
warmth.healthMultiplier = 1.15;
warmth.reloadMultiplier = 1.15;
warmth.effect = Fx.freezing;
warmth.effectChance = 0.07;

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

const cryFac = extendContent(UnitFactory, "cryFac", {});

const crystal = extendContent(UnitType, "crystal", {});
crystal.constructor = () => extend(MechUnit, {
    killed(){     
        Fx.explosion.at(this.x, this.y)
        fragmentBomb.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
        this.dead = true;
    }
});
crystal.abilities.add(new StatusFieldAbility(StatusEffects.freezing, 360, 360, 60));
crystal.abilities.add(new StatusFieldAbility(warmth, 360, 360, 60));


const stalactite = extendContent(UnitType, "stalactite", {});
stalactite.constructor = () => extend(MechUnit, {
    killed(){     
        Fx.explosion.at(this.x, this.y)
        fragmentBomb.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0));
        this.dead = true;
    }
});
stalactite.abilities.add(new StatusFieldAbility(StatusEffects.freezing, 360, 360, 60));
stalactite.abilities.add(new StatusFieldAbility(warmth, 360, 360, 60));

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
stalagmite.abilities.add(new StatusFieldAbility(warmth, 360, 360, 60));

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "pixelcraft-stalactite"), Vars.content.getByName(ContentType.unit, "pixelcraft-stalagmite")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
