// Just a little note to not forget Pixellandia :D
//I won't forget :)
const templuraGen = require("extras/templuraGen")
const templura = extend(Planet, "templura", Planets.sun, 3, 1.45, {
    generator: templuraGen.templura,
    meshLoader: () => new HexMesh(this, 6),
    bloom: true,
    radius: 1,
    accessible: true,
    hasAtmosphere: true,
    atmosphereColor: Color.valueOf("80ff00"),
    atmosphereRadIn: 0.06,
    atmosphereRadOut: 0.09,
    localizedName: "Templura"
});
templura.meshLoader = () => extend(HexMesh, templura, 6, {});

const unfamilierHospitality = extend(SectorPreset, "unfamilier-hospitality", templura, 95, {
    description: "Three friends lie untouched. Two abandoned. One native. Traped, within the compound. Relive their legacy.",
    localizedName: "Unfamilier Hospitality",
    difficulty: 0,
    alwaysUnlocked: true
});

const ancientGrotto = extend(SectorPreset, "ancient-grotto", templura, 6, {
    captureWave: 14,
    description: "A grove full of rust. Collect rust and stone.",
    localizedName: "Ancient Grotto",
    difficulty: 1,
});

const loggery = extend(SectorPreset, "loggery", templura, 23, {
    captureWave: 26,
    localizedName: "Loggery",
    difficulty: 3
});

const plantaeKindoma = extend(SectorPreset, "plantae-kindoma", templura, 72, {
    localizedName: "Plantae Kingdoma",
    description: "A facility established by the crux is present here. Droughts had scared the lands, but water still remains. Dry riverbeds run through the facility, remenant of what had been. \nThere is an enemy base here. Collect sand. Build rusty alphae. Destroy the base.",
    details: "An unknown force resides here, remains of something greater.",
    difficulty: 4
});

const rustedValley = extend(SectorPreset, "rusted-valley", templura, 1, {
    captureWave: 50,
    localizedName: "Rusted Valley",
    difficulty: 3
});

const shatteredGlacier = extend(SectorPreset, "shattered-glacier", templura, 2, {
    captureWave: 36,
    localizedName: "Shattered Glacier",
    difficulty: 5
});
    
const crossroads = extend(SectorPreset, "crossroads", templura, 26, {
    captureWave: 45,
    localizedName: "Crossroads",
    difficulty: 7
});

const dunescapeCrags = extend(SectorPreset, "dunescape-crags", templura, 27, {
    captureWave: 100,
    description: "A smell of char lingers...\n The diralect used a superweapon here \nThe usage of it brought downfall to their conquest to concour the planet \nnow all that remains is their tech. Survive what remains.",
    localizedName: "Dunescape Crags",
    difficulty: 10
});

const sinkhole = extend(SectorPreset, "sinkhole", templura, 14, {
    captureWave: 35,
    localizedName: "Sinkhole",
    difficulty: 6
});

const frozenFalls = extend(SectorPreset, "frozen-falls", templura, 17, {
    localizedName: "Frozen Falls",
    difficulty: 7
});

const desertWastelands = extend(SectorPreset, "desert-wastelands", templura, 15, {
    localizedName: "Dessert Wastelands",
    description: "Water collects here, in a zone reminding of the wastelands. \n There is an enemy base here. Destroy it.",
    difficulty: 8
});

const birthplace = extend(SectorPreset, "birthplace", templura, 24, {
    captureWave: 50,
    description: "Origin of grass. Thorium has deposited here overtime. Slag pools have resurfaced. \n Research thorium technology. Create bionite to enhance your base. Survive.",
    localizedName: "Birthplace",
    difficulty: 8
});

const grasslandGrave = extend(SectorPreset, "grassland-grave", templura, 45, {
    captureWave: 48,
    description: "Resting grounds for most of original mechs when landing. Slag pools are semi abundant. \n There are naval routes here. Build railguns to cover defend area. Survive.",
    details: "Omegas were left behind when escaping, and have gone rogue.",
    localizedName: "Grassland Grave",
    difficulty: 8
});

const basaltGrove = extend(SectorPreset, "basalt-grove", templura, 75, {
    description: "One of the origions of the coruption. Harvest the coal. Prepear yoru defense. Destroy all enemy bases. Crush everything.",
    details: "The coruption of grass and sand is a curious thing.",
    localizedName: "Basalt Grove",
    difficulty: 9
});

const trionCentral = extend(SectorPreset, "trion-central", templura, 55, {
    localizedName: "Trion Central",
    description: "Capital crux base dedicated to researching rediscover technology.  Use rusty tau units. Take out the core.",
    difficulty: 9
});

module.exports = {
    templura: templura,
    unfamilierHospitality: unfamilierHospitality,
    ancientGrotto: ancientGrotto,
    loggery: loggery,
    plantaeKindoma: plantaeKindoma,
    rustedValley: rustedValley,
    shatteredGlacier: shatteredGlacier,
    crossroads: crossroads,
    dunescapeCrags: dunescapeCrags,
    sinkhole: sinkhole,
    frozenFalls: frozenFalls,
    desertWastelands: desertWastelands,
    birthplace: birthplace,
    grasslandGrave: grasslandGrave,
    basaltGrove: basaltGrove,
    trionCentral: trionCentral
};
