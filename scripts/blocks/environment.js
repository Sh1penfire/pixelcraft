let stone = Vars.content.getByName(ContentType.item, "pixelcraft-stone");
let stone = Vars.content.getByName(ContentType.item, "pixelcraft-iron");
let blocks = Seq.with(
    Blocks.basalt,
    Blocks.charr,
    Blocks.craters,
    Blocks.stone
);

blocks[0].itemDrop = stone;
blocks[1].itemDrop = Items.coal;
blocks[2].itemDrop = iron;
blocks[3].itemDrop = stone;

blocks.each(e => e.playerUnmineable = true);
