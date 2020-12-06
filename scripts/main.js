//require("abilities")
require("puver");
require("beat");
require("helgravator");
require("bombs");
require("purpleNavals");
require("templura");

// Flooded Vally
var floodedVally = SectorPreset("flooded-vally", Planets.serpulo, 206);
floodedVally.localizedName = "Flooded Vally";
floodedVally.difficulty = 10;
floodedVally.alwaysUnlocked = true;

// Colored mod name h
if(!Vars.headless){
    Core.app.post(() => {
        const h = Vars.mods.locateMod("pixelcraft").meta;
        h.name = "[red]Pi[yellow]xel[orange]craft";
  });
}
