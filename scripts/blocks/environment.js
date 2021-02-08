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
/*and apparently it no work
let no = 0
blocks.each(e => {
    blocks[no].itemDrop = itemDrop[no]
    no++
    e.playerUnmineable = true
});
*/
blocks[0].playerUnmineable = true
blocks[0].itemDrop = itemDrop[0]
blocks[1].playerUnmineable = true
blocks[1].itemDrop = itemDrop[1]
blocks[2].playerUnmineable = true
blocks[2].itemDrop = itemDrop[2]
blocks[3].playerUnmineable = true
blocks[3].itemDrop = itemDrop[3]
