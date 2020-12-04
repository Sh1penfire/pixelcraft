//require("abilities")
require("puver");
require("beat");
require("helgravator")
require("purpleNavals")


var rustedValley = SectorPreset("rustedValley", Planets.serpulo, 97);
rustedValley.captureWave = 35;
rustedValley.name = "Rusted Valley";
rustedValley.difficulty = 3;
rustedValley.alwaysUnlocked = true;

var shatteredGlacier = SectorPreset("shatteredGlacier", Planets.serpulo, 64);
shatteredGlacier.captureWave = 35;
shatteredGlacier.name = "shatteredGlacier";
shatteredGlacier.difficulty = 5;
shatteredGlacier.alwaysUnlocked = true;

var floodedVally = SectorPreset("floodedVally", Planets.serpulo, 206);
floodedVally.name = "floodedVally";
floodedVally.difficulty = 10;
floodedVally.alwaysUnlocked = true;