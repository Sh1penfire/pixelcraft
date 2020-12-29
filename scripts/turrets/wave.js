const guildedSandFrag = extend(LiquidBulletType, {
    liquid: Vars.content.getByName(ContentType.liquid, "pixelcraft-guilded-sand"),
    damage:1,
    lifetime: 3
});

const guildedSandBullet = extend(LiquidBulletType, {
    speed: 3.5,
    damage: 2,
    lifetime: 35,
    status: StatusEffects.burning,
    homingPower: 60,
    homingRange: 75,
    liquid: Vars.content.getByName(ContentType.liquid, "pixelcraft-guilded-sand"),
    knockback: 2,
    fragBullets: 3,
    fragVelocityMin: 1,
    fragVelocityMax: 3,
    fragBullet: guildedSandFrag
});

Blocks.wave.ammoTypes.put(Vars.content.getByName(ContentType.liquid, "pixelcraft-guilded-sand"), guildedSandBullet);
