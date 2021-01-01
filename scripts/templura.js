// Just a little note to not forget Pixellandia :D

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
templura.meshLoader = () => extend(HexMesh, templura, 2, {});

const rustedValley = extend(SectorPreset, "rusted-valley", templura, 1, {
    captureWave: 50,
    localizedName: "Rusted Valley",
    difficulty: 3,
    alwaysUnlocked: true
});

const shatteredGlacier = extend(SectorPreset, "shattered-glacier", templura, 2, {
    captureWave: 36,
    localizedName: "Shattered Glacier",
    difficulty: 5,
    alwaysUnlocked: true
});
    
const crossroads = extend(SectorPreset, "crossroads", templura, 26, {
    captureWave: 45,
    localizedName: "Crossroads",
    difficulty: 7,
    alwaysUnlocked: true
});

const dunescapeCrags = extend(SectorPreset, "dunescape-crags", templura, 27, {
    captureWave: 100,
    localizedName: "Dunescape Crags",
    difficulty: 10,
    alwaysUnlocked: true
});
