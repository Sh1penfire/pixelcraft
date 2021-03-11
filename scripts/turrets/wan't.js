const fc = require("libs/fc");
const Bombs = require("blocks/bombs");

const Ritual = new Effect(125, (e) => {
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
    Lines.circle(e.x, e.y, e.fin() * 30);
});

const hornyJAIL = extend(StatusEffect, "hornyJAIL", {
  update(unit, time){
    this.super$update(unit, time);
    unit.remove();
  }
});

const begone = extend(BasicBulletType, {
    damage: 100000000,
    speed: 10,
    lifetime: 250,
    pierce: true,
    knockback: 10,
    shrinkY: 1,
    hit(b){
        this.super$hit;
        Ritual.at(b.x, b.y);
        Bombs.prismaticCrystal.create(b.owner, b.team, b.x, b.y, 0, 0);
    },
    update(b){
        Sounds.explosion.at(b.x, b.y);
    },
    collision(unit){
        this.super$collision(unit)
        unit.remove()
    }
});
begone.status = hornyJAIL;
begone.hitEffect = Ritual;

const jokeTurret1 = extendContent(ItemTurret, "jokeTurret1", {  
    init() {
    this.ammo(
        Vars.content.getByName(ContentType.item,"copper"), begone,
    );
    this.super$init();
  }
});