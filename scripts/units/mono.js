const healFrag = extend(BasicBulletType, {
    damage: 0.3,
    speed: 2,
    healPercent: 1,
    collidesTeam: true,
    width: 1,
    height: 2,
    frontColor: Color.valueOf("b7f35e"),
    backColor: Color.valueOf("b7f35e")
});

const healBullet = extend(MissileBulletType, {
    frontColor: Color.valueOf("b7f35e"),
    backColor: Color.valueOf("b7f35e"),
    trailColor: Color.valueOf("b7f35e"),
    damage: 1,
    speed: 4,
    width: 5,
    height: 8,
    lifetime: 10,
    fragBullets: 3,
    hitSound: Sounds.none,
    healPercent: 2,
    collidesTeam: true,
    fragBullet: healFrag
});

const healWeapon = extend(Weapon, "heal-weapon", {
    reload: 30,
    alternate: true,
    ejectEffect: Fx.casing2,
    top: false,
    shootSound: Sounds.shoot,
    x: 1,
    y: -0.5,
    rotate: false,
    bullet: healBullet
});

UnitTypes.mono.weapons.add(healWeapon);
