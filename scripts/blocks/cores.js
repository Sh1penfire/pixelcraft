const fc = require("libs/fc")

//defined in js to allow the tech tree to acces the core-refraction block during script loading instaid of having to run the code after client loading
const coreRefraction = extend(CoreBlock, "core-refraction", {});

const coreLaunchpad = extend(CoreBlock, "core-launchpad", {});

coreLaunchpad.buildType = () => extend(CoreBlock.CoreBuild, coreLaunchpad, {
    collision(b){
        this.super$collision(b);
        b.remove()
        if(b.damage > 0 && b.team != null) lDamagedTeam = b.team
    },
    update(){
        if(this.team == Team.derelict){
            let unit1 = fc.fcNearbyEnemy(this.team, this.x, this.y, this.block.size * 8 + 92);
            print(this.block.size * 8 + 92)
            if(unit1 != null){
                this.tile.setBlock(coreLaunchpad, unit1.team);
                Fx.placeBlock.at(this.tile, this.block.size);
            }
        }
    },
    unitOn(b){
        if(this.team == Team.derelict && b != null & b.team != null && !Vars.state.isCampaign()){
            this.health = 0;
            this.tile.setBlock(coreLaunchpad, b.team);
            Fx.placeBlock.at(this.tile, this.block.size);
        }
    },
    killed(){
        this.super$killed();
        if (!Vars.state.isCampaign()){
            this.tile.setBlock(coreLaunchpad, !Vars.state.pvp && this.team != Team.derelict ? lDamagedTeam : Team.derelict);
        }
    },
    lDamagedTeam: Team.derelict
});

module.exports = {
    coreRefraction: coreRefraction
}