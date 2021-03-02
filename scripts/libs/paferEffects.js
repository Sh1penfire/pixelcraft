//effect when bullet breaks
const shotHit = new Effect(40, e => {
  Draw.color(Color.valueOf("5d6ffe"), Color.valueOf("56D7CA"), e.fin());
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

const shotHit2 = new Effect(40, e => {
  Draw.color(Color.valueOf("fc4336"), Color.valueOf("91160d"), e.fin());
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
  Draw.color(Color.valueOf("5d6ffe"), Color.valueOf("56D7CA"), e.fin());
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

const explosions2 = new Effect(120, e => {
  Draw.color(Color.valueOf("fc4336"), Color.valueOf("91160d"), e.fin());
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
  Draw.color(Color.valueOf("5d6ffe"), Color.valueOf("56D7CA"), e.fin());
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

module.exports = {
    shotHit: shotHit,
    shotHit2: shotHit2,
    explosions: explosions,
    explosions2: explosions2,
    shootFX: shootFX
};