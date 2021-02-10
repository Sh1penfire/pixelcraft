// Just a little note to not forget Pixellandia :D
//I won't forget :)
const templura = extend(Planet, "templura", Planets.sun, 1, 0.5, {
    generator: new SerpuloPlanetGenerator(),
    bloom: true,
    radius: 1,
    accessible: true,
    hasAtmosphere: true,
    atmosphereColor: Color.valueOf("80ff00"),
    atmosphereRadIn: 0.02,
    atmosphereRadOut: 0.3,
    localizedName: "Templura"
});
templura.meshLoader = () => extend(HexMesh, templura, 6, {});

const ancientGrotto = extend(SectorPreset, "ancient-grotto", templura, 6, {
    captureWave: 14,
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
    difficulty: 8
});

const birthplace = extend(SectorPreset, "birthplace", templura, 24, {
    captureWave: 50,
    localizedName: "Birthplace",
    difficulty: 8
});

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
    birthplace: birthplace
}
