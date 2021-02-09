// this is what i could get from project unity's code -QmelZ
const endgame = extend(Block, "wasnts", {
    localizedName: "wasnt's",
    description: "never was.",
    buildVisibility: BuildVisibility.hidden,
    size: 2,
    destructible: true,
    update: true,
    category: Category.turret,
    requirements: ItemStack.with(
        Items.copper, Number.MIN_VALUE
    ),
    alwaysUnlocked: true,
    inEditor: true,
    icons(){
        return[Core.atlas.find(this.region)]
    }
});

const colors = [
    "2700ff", "8f00ff", "80ff00", "006b80", "66aa0b", "00ffcc", "91c4ff", "cbd97f", "ffaa5f"
];

endgame.buildType = () => extend(Building, {
    updateTile(){
        Groups.unit.each(e => {
            if(e.team != this.team){
                e.destroy();
            };
        });
        Groups.build.each(e => {
            if(e.team != this.team){
                e.kill();
            };
        });
        Groups.bullet.each(e => {
            if(e.team != this.team){
                e.remove();
            };
        });
        Groups.fire.each(e => {
            e.remove();
        });
    }
});
