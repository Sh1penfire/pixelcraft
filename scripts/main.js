//require("abilities")
require("turrets/puver");
require("turrets/psion");
require("turrets/pafer")
require("turrets/beat");
require("turrets/helgravator");
require("turrets/fever");
require("bombs");
require("whiteGround");
require("purpleNavals");
require("templura");
require("blocks/pixel-com");
require("blocks/bioFormer");

var floodedVally = SectorPreset("floodedVally", Planets.serpulo, 206);
floodedVally.localizedName = "Flooded Vally";
floodedVally.difficulty = 10;
floodedVally.alwaysUnlocked = true;



/*
const landfill = extendContent(Wall, "landfill", {
  icons() {
    return [Core.atlas.find(this.modName + this.name)];
  },
  canPlaceOn(tile) {
    return (
      tile != null && (tile.floor().isDeep() || tile.floor().liquidDrop != null)
    );
  },
});

landfill.size = 1;
landfill.health = 10;
landfill.floating = true;
landfill.category = Category.effect;
landfill.buildVisibility = BuildVisibility.shown;

landfill.buildType = () => 
  extendContent(Wall.WallBuild, landfill, {
    placed() {
      var tile = Vars.world.tile(this.tileX(), this.tileY());
      tile.setBlock(Blocks.air);
      tile.setFloor(Blocks.dirt);
      Vars.renderer.minimap.reset();
      Vars.renderer.minimap.updateAll();
      Vars.renderer.blocks.floor.clearTiles();
    },
  });
*/