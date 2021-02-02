let stone = Vars.content.getByName(ContentType.item, "pixelcraft-stone");
let stone = Vars.content.getByName(ContentType.item, "pixelcraft-iron");
let blocks = Seq.with(
    Blocks.basalt,
    Blocks.charr,
    Blocks.craters,
    Blocks.stone
);

blocks.get(0).itemDrop = stone;
blocks.get(1).itemDrop = Items.coal;
blocks.get(2).itemDrop = iron;
blocks.get(3).itemDrop = stone;

blocks.each(e => e.playerUnmineable = true);
