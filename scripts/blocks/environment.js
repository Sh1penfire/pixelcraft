const voidicsm = require("extras/voidicsm")
let blocks =[
    Blocks.basalt,
    Blocks.charr,
    Blocks.craters,
    Blocks.stone
];
let itemDrop =[
voidicsm.stone,
Items.coal,
voidicsm.rust,
voidicsm.stone
]
///havin some fun in code, so no
let no = 0
blocks.each(e => {
    blocks[no].itemDrop = itemDrop[no]
    no++
    e.playerUnmineable = true
});
