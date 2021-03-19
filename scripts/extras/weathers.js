const statuses = require("libs/statuses");

const seedStorm = extend(ParticleWeather, "seed-storm", {
    color: Color.white,
    noiseColor: Color.valueOf("#c4cf6f"),
    particleRegion: "pixelcraft-bionorb",
    drawNoise: true,
    useWindVector: true,
    sizeMax: 8,
    sizeMin: 4,
    minAlpha: 0.1,
    maxAlpha: 0.8,
    density: 1750,
    baseSpeed: 3.45,
    status: statuses.seeded,
    opacityMultiplier: 0.45,
    force: 0.35,
    sound: Sounds.wind,
    soundVol: 0.7,
    duration: 7 * Time.toMinutes
});
//corrosiveDownpour.attrs.set(Attribute.spores, 1),
//corrosiveDownpour.attrs.set(Attribute.light, -0.15),

const strongStorm = extend(ParticleWeather, "strong-storm", {
    color: Pal.darkMetal,
    noiseColor: Pal.darkMetal,
    particleRegion: "particle",
    noiseLayers: 3,
    drawNoise: true,
    useWindVector: true,
    sizeMax: 4,
    sizeMin: 2,
    minAlpha: 0.1,
    maxAlpha: 0.8,
    density: 3000,
    baseSpeed: 6.45,
    status: statuses.windswept,
    opacityMultiplier: 0.75,
    force: 0.85,
    sound: Sounds.wind,
    soundVol: 1.25,
    duration: 10 * Time.toMinutes
});

module.exports = {
    seedStorm: seedStorm,
    strongStorm: strongStorm
};
