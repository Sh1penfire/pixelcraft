let skripts = [
  "extras/templuraGen", "libs/fc", "libs/statuses", "libs/refresh", "extras/voidicsm", "extras/weathers", "blocks/environment", "blocks/teleporter", "turrets/wan't", "turrets/Sx.quad", "turrets/several", "turrets/sundry", "turrets/bictfuse", "turrets/puver", "turrets/psion", "turrets/pafer", "turrets/pulse", "turrets/beat", "turrets/helgravator", "turrets/fever", "turrets/tenmotus", "turrets/persimodem", "turrets/spreadTurrets", "turrets/bioTurrets", "blocks/beacon", "blocks/bombs", "units/whiteGround", "units/rusted", "units/purpleNavals", "units/voided", "templura", "blocks/pixel-com", "blocks/bioFormer", "blocks/cores","units/mono", "turrets/wasnts", "units/pWaves", "turrets/wave", "extras/techTree"
];

skripts.forEach(e => {
  try{
    require(e)
  }catch(c){
    Log.err(c)
  }
});

var floodedVally = extend(SectorPreset, "flooded-vally", Planets.serpulo, 206, {
    localizedName: "Flooded Vally",
    difficulty: 10,
    alwaysUnlocked: true
});

Vars.enableConsole = true;
/*

const autoUpdate = require("autoupdate");
autoUpdate.autoUpdate("pixelcraft", "Sh1penfire/pixelcraft", "main")

*/

/*
const core = extend(Wall, "core", {
    localizedName: "core",
    size: 3,
    description:"place able core able",
    destructible: true,
    update: true,
    category: Category.effect,
    requirements: ItemStack.with(
        Items.copper, 50
    ),
    icons() {
    return[Core.atlas.find("core-shard")]
  }
});

core.buildVisibility = BuildVisibility.shown;

core.buildType = () => extend(Wall.WallBuild, {
placed(){
    var tile = Vars.world.tile(this.tileX(), this.tileY());
    Vars.world.tile(this.tile.x, this.tile.y).setBlock(Team.crux, Blocks.core-shard);
    
}
    });
*/

/*
some code stuf
w

const fireSpawn = extend(StatusEffect, "fireSpawn", {
  update(unit, time){
  if(Mathf.chance(0.1 * Time.delta)){
    this.super$update;
    Fires.create(Vars.world.tileWorld(unit.x,unit.y));
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
