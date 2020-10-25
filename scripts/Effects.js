
const healedStatus = extendContent(StatusEffect, "healed", {	
	init(){
	}
});
healedStatus.speedMultiplier = 2;
healedStatus.armorMultiplier = .5;
healedStatus.damage = -1;
healedStatus.effect = healedStatusFX;
healedStatus.colour  = Color.green;
                                                            
const healedStatusFX = newEffect(24, e => {
	Draw.color(Color.valueOf("#639d2a").shiftHue(Mathf.random(100)), Color.valueOf("#639d2a").shiftHue(Mathf.random(200)), Mathf.random());
	Draw.mixcol(Color.valueOf("#639d2a"), Mathf.random());
    Fill.circle(e.x, e.y, e.fout() * 2 * Mathf.random());
});
