// Just a little note to not forget Pixellandia :D
//XD
const templura = new Planet("templura", Planets.sun, 1, 0.5);
templura.generator = new SerpuloPlanetGenerator();
templura.mesh = new HexMesh(templura, 2);
templura.bloom = true;
templura.radius = 1;
templura.accessible = true;
templura.hasAtmosphere = true;
templura.atmosphereColor = Color.valueOf("80ff00");
templura.atmosphereRadIn = 0.02;
templura.atmosphereRadOut = 0.3;
templura.localizedName = "Templura";

const rustedValley = new SectorPreset("rustedValley", templura, 1);
rustedValley.captureWave = 35;
rustedValley.localizedName = "Rusted Valley";
rustedValley.difficulty = 3;
rustedValley.alwaysUnlocked = true;

const shatteredGlacier = new SectorPreset("shatteredGlacier", templura, 2);
shatteredGlacier.captureWave = 35;
shatteredGlacier.localizedName = "Shattered Glacier";
shatteredGlacier.difficulty = 5;
shatteredGlacier.alwaysUnlocked = true;
    
const crossroads = new SectorPreset("crossroads", templura, 26);
crossroads.captureWave = 45;
crossroads.localizedName = "Crossroads";
crossroads.difficulty = 7;
crossroads.alwaysUnlocked = true;

const dunescapeCrags = new SectorPreset("dunescapeCrags", templura, 27);
dunescapeCrags.captureWave = 65;
dunescapeCrags.localizedName = "Dunescape Crags";
dunescapeCrags.difficulty = 9;
dunescapeCrags.alwaysUnlocked = true;

