const fc = require("libs/fc")
const statuses = require("libs/statuses")
const voidicsm = require("extras/voidicsm")

let orangeCol = Color.valueOf("#c78356");
orangeCol.a = 0.2;

const oreRust = extend(OreBlock, "ore-iron", {
    itemDrop: voidicsm.rust
});

const basaltChar = extend(Floor, "basalt-char", {
    lightColor: orangeCol
});

const basaltCraters = extend(Floor, "basalt-craters", {});

const stormsand = extend(Floor, "stormsand", {
    status: statuses.blackout
});

const dryGrass = extend(Floor, "dryGrass", {
    status: statuses.seeded
});


module.exports = {
    oreRust: oreRust,
    stormsand: stormsand,
    dryGrass: dryGrass,
    basaltChar: basaltChar,
    basaltCraters: basaltCraters
}