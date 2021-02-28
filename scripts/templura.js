// Just a little note to not forget Pixellandia :D
//I won't forget :)
const templura = extend(Planet, "templura", Planets.sun, 3, 3, {
    generator: new SerpuloPlanetGenerator(),
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

const ancientGrotto = extend(SectorPreset, "ancient-grotto", templura, 6, {
    captureWave: 14,
    description: "A grove full of rust. Collect rust and stone.",
    localizedName: "Ancient Grotto",
    difficulty: 1,
    alwaysUnlocked: true
});

const loggery = extend(SectorPreset, "loggery", templura, 23, {
    captureWave: 26,
    localizedName: "Loggery",
    difficulty: 3
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
    description: "A smell of char lingers...\n The diralect used a superweapon here \nThe usage of it brought downfall to their conquest to concour the planet \nnow all that remains is their tech",
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

const dessertWastelands = extend(SectorPreset, "dessert-wastelands", templura, 15, {
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

const trionCentral = extend(SectorPreset, "trion-central", templura, 55, {
    localizedName: "Trion Central",
    description: "Capital crux base dedicated to researching rediscover technology.  Use rusty tau units. Take out the core.",
    difficulty: 9
})

module.exports = {
    templura: templura,
    ancientGrotto: ancientGrotto,
    loggery: loggery,
    rustedValley: rustedValley,
    shatteredGlacier: shatteredGlacier,
    crossroads: crossroads,
    dunescapeCrags: dunescapeCrags,
    sinkhole: sinkhole,
    frozenFalls: frozenFalls,
    dessertWastelands: dessertWastelands,
    birthplace: birthplace,
    trionCentral: trionCentral
}
