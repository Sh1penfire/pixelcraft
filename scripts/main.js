require("fc");
require("turrets/wan't");
require("turrets/Sx.quad");
require("turrets/bictfuse");
require("turrets/puver");
require("turrets/psion");
require("turrets/pafer")
require("turrets/beat");
require("turrets/helgravator");
require("turrets/fever");
require("blocks/bombs");
require("units/whiteGround");
require("units/purpleNavals");
require("templura");
require("blocks/pixel-com");
require("blocks/bioFormer");
require("units/mono");
require("turrets/wasnts");
//require("turrets/wave");

var floodedVally = SectorPreset("floodedVally", Planets.serpulo, 206);
floodedVally.localizedName = "Flooded Vally";
floodedVally.difficulty = 10;
floodedVally.alwaysUnlocked = true;

/*
some code stuf
const fireSpawn = extend(StatusEffect, "fireSpawn", {
  update(unit, time){
  if(Mathf.chance(0.1 * Time.delta)){
    this.super$update;
    print(unit.x);
    };
  }
});

fireSpawn.effect = Fx.fire;

UnitTypes.crawler.abilities.add(new StatusFieldAbility(fireSpawn, 360, 360, 60));
Vars.content.bullets().each(e => {
    if(e instanceof LiquidBulletType){
        e.fragBullet = e
    };
});

const motar = extend(TractorBeamTurret, "motar", {});
motar.targetsAir = false;
motar.buildType = () => extend(TractorBeamTurret.TractorBeamBuild, motar, {
    updateTile(){
        Groups.unit.each(e => {
            this.super$updateTile();
            var target = Units.closestEnemy(this.team, this.x, this.y, 100, u => u.checkTarget(true, true));
            print(target);
            if(target != null){
                target.health = target.health - 1;
            }
        });
    }
});


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
