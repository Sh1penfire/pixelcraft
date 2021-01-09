const statuses = require("libs/statuses");

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
