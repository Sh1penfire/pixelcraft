const beacon = extend(LightBlock, "shiny-beacon", {})
/*
beacon.buildType = extend(LightBlock.LightBlockBuild, {
    updateTile(b){
        this.super$updateTile(b);
        print("nou");
        Drawf.light(this.team, this.x, this.y, this.radius * Math.min(this.smoothTime, 2), Tmp.c1.set(this.color), 45);
    }
});
*/