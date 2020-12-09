const warmth = extend(StatusEffect, "warmth", {});
warmth.speedMultiplier = 1.5;
warmth.healthMultiplier = 1.15;
warmth.reloadMultiplier = 1.15;
warmth.effect = Fx.freezing;
warmth.effectChance = 0.07;

const fragment = extend(BasicBulletType, {});
fragment.damage = 5;
fragment.frontColor = Color.valueOf("b6cad6");
fragment.backColor = Color.valueOf("d7e0e5");
fragment.hitEffect = Fx.hitLancer;
fragment.despawnEffect = Fx.freezing;

const fragmentBomb = extend(BombBulletType, {});
fragmentBomb.splashDamageRadius = 0;
fragmentBomb.splashDamage = 0;
fragmentBomb.width = 0;
fragmentBomb.height = 0;
fragmentBomb.lifetime = 0;
fragmentBomb.status = StatusEffects.freezing;
fragmentBomb.despawnEffect = Fx.none;
fragmentBomb.hitEffect = Fx.none;
fragmentBomb.hitSound = Sounds.none;
fragmentBomb.fragBullets = 4;
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


Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(crystal, 60 * 8, ItemStack.with(Items.silicon, 25, Items.lead, 15, Items.metaglass, 15)));

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

Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(stalactite, 60 * 8, ItemStack.with(Items.silicon, 25, Items.lead, 15, Items.metaglass, 16)));
