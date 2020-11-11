                                                      
const healedStatusFX = new Effect(10, e => {
Draw.color(Color.yellow, Color.green, e.fin());
Lines.stroke(e.fin() * 1);
Lines.circle(e.x, e.y, e.fslope() * 5);
});

const healed = extendContent(StatusEffect, "healed", {});

healed.speedMultiplier = 2;
healed.armorMultiplier = 0.5;
healed.damage = -1.0;
healed.effect = healedStatusFX;
healed.color  = Color.green;
      
