let drillItem = {
    //returns a new drillDropHandler with params Block[] mineableBlocks, Item item;
    constructor(mineableBlocks, item){
        this.mineableBlocks = mineableBlocks;
        this.item = item;
    },
    //returns the item if mineableBlocks contains the tile's block. Otherwise, return null. If mineableBlocks only contains air, always return.
    checkDrop(tile){
        if((this.mineableBlocks.length == 1 && this.mineableBlocks[0] == Blocks.air) || this.mineableBlocks.includes(tile)) return this.item;
    },
    mineableBlocks: [Blocks.air],
    item: Items.copper
}

let drillDropHandler = {
    //returns a new drillDropHandler with params drillItem[] tileReward, drillItem[] deepTileReward, Bool canDeep;
    constructor(tileReward, deepTileReward, canDeep){
        this.tileReward = tileReward;
        this.deepTileReward = deepTileReward;
    },
    //returns the item that you can mine from the tile input.
    checkDrop(tile){
        let tileDrop = tile.drop();
    },
    tileReward: [],
    deepTileReward: []
}