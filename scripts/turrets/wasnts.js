// this is what i could get from project unity's code -QmelZ
const colors = [
    "2700ff", "8f00ff", "80ff00", "006b80", "66aa0b", "00ffcc", "91c4ff", "cbd97f", "ffaa5f"
];

const endgame = new Effect(32, e => {
    Draw.color(Color.valueOf(colors[Mathf.round(Mathf.random() * 8)]));
    Lines.stroke(1.2);
    Lines.line(e.x, e.y, e.data.x, e.data.y);
});

const wasnts = extend(Block, "wasnts", {
    localizedName: "wasnt's",
    description: "never was.",
    buildVisibility: BuildVisibility.shown,
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

wasnts.buildType = () => extend(Building, {
    updateTile(){
        Groups.unit.each(u => {
            if(u.team != this.team){
                endgame.at(this.x, this.y, 0, u);
                u.destroy();
            };
        });
    }
});
