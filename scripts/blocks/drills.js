
const ironDrill = extend(Drill, "iron-drill", {
    getDrop(tile){
        let tileDrop = tile.drop();
        if(tileDrop == null && (tile.floor() == Blocks.stone || tile.floor() == Blocks.basalt)) return stone;
        else return tileDrop
    },
    canMine(tile){
        if(tile == null) return false;
        else if(this.getDrop(tile) != null) return this.getDrop(tile).hardness <= this.tier;
    }
});
ironDrill.buildType = () => extend(Drill.DrillBuild, ironDrill, {});

const magnitineDrill = extend(Drill, "magnitine-drill", {
    getDrop(tile){
        let tileDrop = tile.drop();
        if(tileDrop == null && (tile.floor() == Blocks.stone || tile.floor() == Blocks.basalt)) return stone;
        else return tileDrop
    },
    canMine(tile){
        if(tile == null) return false;
        else if(this.getDrop(tile) != null) return this.getDrop(tile).hardness <= this.tier;
    }
});
magnitineDrill.buildType = () => extend(Drill.DrillBuild, magnitineDrill, {});

const neromagnetDrill = extend(Drill, "neromagnet-drill", {
    getDrop(tile){
        let tileDrop = tile.drop();
        if(tileDrop == null && (tile.floor() == Blocks.stone || tile.floor() == Blocks.basalt)) return stone;
        else return tileDrop
    },
    canMine(tile){
        if(tile == null) return false;
        else if(this.getDrop(tile) != null) return this.getDrop(tile).hardness <= this.tier;
    }
});
neromagnetDrill.buildType = () => extend(Drill.DrillBuild, neromagnetDrill, {});

let blocksm = [
    [Blocks.stone, Blocks.basalt],
    [Blocks.grass, Blocks.dirt, Blocks.mud],
    [Blocks.moss, Blocks.sporeMoss]
];
let itemsm = [stone, bionorb, Items.sporePod];

const excavator = extend(Drill, "excavator", {
    getDrop(tile){
        return this.dropHandler.checkDrop(tile);
    },
    canMine(tile){
        if(tile == null) return false;
        else if(this.getDrop(tile) != null) return this.getDrop(tile).hardness <= this.tier;
    },
    dropHandler: new drillDropHandler(excavatorRewardList, deepExcavatorRewardList, true);
});
excavator.buildType = () => extend(Drill.DrillBuild, excavator, {});
