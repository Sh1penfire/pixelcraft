const statuses = require("libs/statuses");

const corrodedEffect = new Effect(35, e =>{
    Draw.color(Pal.plastanium, Color.white, Pal.plastanium, e.fin());
    Fill.circle(e.x, e.y, e.fout() * 1);
});

StatusEffects.corroded.effect = corrodedEffect;

Bullets.fragPlastic.status = StatusEffects.corroded;
Bullets.fragPlasticFrag.status = StatusEffects.corroded;
Bullets.artilleryPlastic.status = StatusEffects.corroded;
Bullets.artilleryPlasticFrag.status = StatusEffects.corroded;
Bullets.standardThorium.status = StatusEffects.corroded;
Bullets.standardThoriumBig.status = StatusEffects.corroded;

const voidicsm = extend(Liquid, "voidicsm", {
    tempretature: 0,
    heatCapacity: 1,
    viscocity: 0.5
});
voidicsm.effect = statuses.blackout;
voidicsm.color = Pal.darkMetal;

module.exports = {
    voidicsm: voidicsm
};
