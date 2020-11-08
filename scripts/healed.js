                                                      
const healedStatusFX = newEffect(24, e => {
Draw.color(Color.yellow, Color.green, e.fin());
Lines.stroke(e.fin() * 1);
Lines.circle(e.x, e.y, e.fslope() * 1);
});

const healedStatus = extendContent(StatusEffect, "healed", {});

healedStatus.speedMultiplier = 2;
healedStatus.armorMultiplier = 0.5;
healedStatus.damage = -1.0;
healedStatus.effect = healedStatusFX;
healedStatus.color  = Color.green;
      
