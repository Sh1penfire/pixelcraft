extendContent(GenericCrafter, "depixeliser", {
	draw(tile){
		Draw.rect(this.region, tile.drawx(), tile.drawy());

		Draw.color(this.outputLiquid.liquid.color);
		Draw.alpha(tile.entity.liquids.get(this.outputLiquid.liquid) / this.liquidCapacity);
		Draw.rect(Core.atlas.find(this.name + "-liquid"), tile.drawx(), tile.drawy());
		Draw.color();
        //Draw.rect(Core.atlas.find(this.name + "-rotator"),tile.drawx(),tile.drawy(), -6 * tile.ent().totalProgress);
		//Draw.rect(Core.atlas.find(this.name + "-top"), tile.drawx(), tile.drawy());
	},
    generateIcons(){
        return [
            Core.atlas.find(this.name),
            //Core.atlas.find(this.name + "-spinner"),
            //Core.atlas.find(this.name + "-top"),
        ];
    }
});
//I'm going to test this loading liquid, once it works I will move on to the top and spinner
