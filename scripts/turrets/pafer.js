const chargedEffectFX = new Effect(60, (e) => {
  Angles.randLenVectors(e.id, 2, 1 + e.fin() * 10, (x, y) => {
    Draw.color(Color.white, Color.valueOf("0A01b7"), e.fslope());
    Fill.circle(e.x + x, e.y + y, e.fout() * 1.8)
    Draw.color(Color.valueOf("0A01b7"), Color.valueOf("56D7CA"), e.fslope());
    Fill.circle(e.x + x, e.y + y, e.fout() * 1.5)
  });
});

//effect when bullet breaks
const shotHit = new Effect(40, e => {
  Draw.color(Color.white, Color.valueOf("#86baf9"), e.fin());
    Lines.stroke(e.fslope() * 3);
    Lines.line(
        e.x + Mathf.sin(e.fout() * 2) * e.fout() * -20,
        e.y + Mathf.cos(e.fout() * 2) * e.fout() * -20,
        e.x + Mathf.sin(e.fout() * 2) * e.fout() * 20,
        e.y + Mathf.cos(e.fout() * 2) * e.fout() * 20
    );
    Lines.line(
        e.x + Mathf.cos(e.fout() * 2) * e.fout() * -20,
        e.y + Mathf.sin(e.fout() * 2) * e.fout() * 20,
        e.x + Mathf.cos(e.fout() * 2) * e.fout() * 20,
        e.y + Mathf.sin(e.fout() * 2) * e.fout() * -20
    );
});

const explosions = new Effect(120, e => {
  Draw.color(Color.white, Color.valueOf("#86baf9"), e.fin());
    Lines.stroke(e.fslope() * 4);
    Lines.line(
        e.x + Mathf.sin(e.fout() * 2) * e.fin() * -50,
        e.y + Mathf.cos(e.fout() * 2) * e.fin() * -50,
        e.x + Mathf.sin(e.fout() * 2) * e.fin() * 50,
        e.y + Mathf.cos(e.fout() * 2) * e.fin() * 50
    );
    Lines.line(
        e.x + Mathf.cos(e.fout() * 2) * e.fin() * -50,
        e.y + Mathf.sin(e.fout() * 2) * e.fin() * 50,
        e.x + Mathf.cos(e.fout() * 2) * e.fin() * 50,
        e.y + Mathf.sin(e.fout() * 2) * e.fin() * -50
    );
    Lines.stroke(e.fslope() * 8);
    Lines.line(
        e.x + Mathf.sin(e.fout() * 4) * e.fin() * -30,
        e.y + Mathf.cos(e.fout() * 4) * e.fin() * -30,
        e.x + Mathf.sin(e.fout() * 4) * e.fin() * 30,
        e.y + Mathf.cos(e.fout() * 4) * e.fin() * 30
    );
    Lines.line(
        e.x + Mathf.cos(e.fout() * 4) * e.fin() * -30,
        e.y + Mathf.sin(e.fout() * 4) * e.fin() * 30,
        e.x + Mathf.cos(e.fout() * 4) * e.fin() * 30,
        e.y + Mathf.sin(e.fout() * 4) * e.fin() * -30
    );
});

const shootFX = new Effect(25, e => {
  Draw.color(Color.white, Color.valueOf("#86baf9"), e.fin());
    Lines.stroke(e.fslope() * 2);
    Lines.line(
        e.x + Mathf.sin(e.fout() * 2) * e.fin() * -25,
        e.y + Mathf.cos(e.fout() * 2) * e.fin() * -25,
        e.x + Mathf.sin(e.fout() * 2) * e.fin() * 25,
        e.y + Mathf.cos(e.fout() * 2) * e.fin() * 25
    );
    Lines.line(
        e.x + Mathf.cos(e.fout() * 2) * e.fin() * -25,
        e.y + Mathf.sin(e.fout() * 2) * e.fin() * 25,
        e.x + Mathf.cos(e.fout() * 2) * e.fin() * 25,
        e.y + Mathf.sin(e.fout() * 2) * e.fin() * -25
    );
    Lines.stroke(e.fslope() * 8);
    Lines.line(
        e.x + Mathf.cos(e.fout() * 4) * e.fin() * -15,
        e.y + Mathf.sin(e.fout() * 4) * e.fin() * -15,
        e.x + Mathf.cos(e.fout() * 4) * e.fin() * 15,
        e.y + Mathf.sin(e.fout() * 4) * e.fin() * 15
    );
    Lines.line(
        e.x + Mathf.sin(e.fout() * 4) * e.fin() * -15,
        e.y + Mathf.cos(e.fout() * 4) * e.fin() * 15,
        e.x + Mathf.sin(e.fout() * 4) * e.fin() * 15,
        e.y + Mathf.cos(e.fout() * 4) * e.fin() * -15
    );
    Lines.stroke(e.fslope() * 4);
    Lines.line(
        e.x + Mathf.sin(e.fin() * 2) * e.fout() * -50,
        e.y + Mathf.cos(e.fin() * 2) * e.fout() * -50,
        e.x + Mathf.sin(e.fin() * 2) * e.fout() * 50,
        e.y + Mathf.cos(e.fin() * 2) * e.fout() * 50
    );
    Lines.line(
        e.x + Mathf.cos(e.fin() * 2) * e.fout() * -50,
        e.y + Mathf.sin(e.fin() * 2) * e.fout() * 50,
        e.x + Mathf.cos(e.fin() * 2) * e.fout() * 50,
        e.y + Mathf.sin(e.fin() * 2) * e.fout() * -50
    );
    Lines.stroke(e.fslope() * 8);
    Lines.line(
        e.x + Mathf.sin(e.fin() * 4) * e.fout() * -30,
        e.y + Mathf.cos(e.fin() * 4) * e.fout() * -30,
        e.x + Mathf.sin(e.fin() * 4) * e.fout() * 30,
        e.y + Mathf.cos(e.fin() * 4) * e.fout() * 30
    );
    Lines.line(
        e.x + Mathf.cos(e.fin() * 4) * e.fout() * -30,
        e.y + Mathf.sin(e.fin() * 4) * e.fout() * 30,
        e.x + Mathf.cos(e.fin() * 4) * e.fout() * 30,
        e.y + Mathf.sin(e.fin() * 4) * e.fout() * -30
    );
});

const lightning = extend(LightningBulletType, {});
lightning.damage = 10;
lightning.lightningLength = 7;

const seekerFrag = extend(MissileBulletType, {});
seekerFrag.damage = 5;
seekerFrag.homingPower = 0.1;
seekerFrag.frontColor = Color.valueOf("#86baf9");
seekerFrag.backColor = Color.valueOf("#3eabe6");
seekerFrag.trailColor = Color.valueOf("3eabe6");
seekerFrag.pierce = true;
seekerFrag.hitShake = 0;
seekerFrag.drag = 0.05;
seekerFrag.hitSound = Sounds.none;
seekerFrag.fragBullet = lightning;
seekerFrag.fragBullets = 1;

const seeker = extend(MissileBulletType, {});
seeker.damage = 15;
seeker.homingPower = 0.05;
seeker.frontColor = Color.valueOf("#86baf9");
seeker.backColor = Color.valueOf("#3eabe6");
seeker.trailColor = Color.valueOf("3eabe6");
seeker.pierce = true;
seeker.hitShake = 0;
seeker.drag = 0.03;
seeker.hitSound = Sounds.none;
seeker.fragBullet = seekerFrag;
seeker.fragBullets = 2;

const balloLight = extend(ArtilleryBulletType, {
    update(b){
    lightning.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(360));
    seeker.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(3));
    }
});
balloLight.lifeimte = 120;

const shot = extend(PointBulletType, {
    despawned(b){
    shotHit.at(b.x, b.y);
    transition.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(0));
    }
})
shot.damage = 250;
shot.splashDamage = 100;
shot.homingPower = 0.05;
shot.speed = 5;
shot.lifetime = 200;
shot.trailEffect = chargedEffectFX;
shot.shootEffect = shootFX;
shot.trailSpacing = 5;
const transition = extend(ArtilleryBulletType, {
    despawned(b){
    explosions.at(b.x, b.y);
    balloLight.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(0));
    }
})
transition.lifeimte = 40;
transition.despawnEffect = explosions;
const electricTurret5b1 = extendContent(PowerTurret, "electricTurret5b1", {
    icons(){
        return[
        Core.atlas.find("block-4"),
        Core.atlas.find("pixelcraft-electricTurret5b1")
        ];
    }
});
electricTurret5b1.recoil = 0.5;
electricTurret5b1.restitution = 0.015;
electricTurret5b1.shootType = shot;
electricTurret5b1.shootShake = 1;
electricTurret5b1.reloadTime = 120;
