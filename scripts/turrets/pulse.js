const fc = require("libs/fc")

const pulse = extend(PowerTurret, "healingTurret1", {
    setStats(){
    this.super$setStats();
    //multiply by 100 to leave two decimal places, then devide by 100 to make value accurate
    this.repairTime = Mathf.round(100 * this.shootType.healPercent * this.reloadTime * 100/60)/100/this.shots
    this.stats.add(Stat.repairTime, this.repairTime.toString() + " Seconds");
    }
})
pulse.beamAlpha = 1
pulse.buildType = () => extend(PowerTurret.PowerTurretBuild, pulse, {
    setLastP(){
        //used to set target last position
        if(this.isShooting()){
            if(this.isControlled() == true || this.logicControlled() == true){
                this.LTPx = this.targetPos.x
                this.LTPy = this.targetPos.y
            }
            else if(this.target != null){
                //stands for last position x and last position y
                this.LTPx = this.target.x
                this.LTPy = this.target.y
            }
        }
    },
    updateTile(){
        this.firinDistance = 4
        this.xEnd = this.x + Math.cos(this.rotation/180 * Math.PI) * this.firinDistance
        this.yEnd = this.y + Math.sin(this.rotation/180 * Math.PI) * this.firinDistance
        if(this.beamAlpha === undefined){
            this.beamAlpha = 0;
        }
        if(this.LTPx === undefined){
            this.LTPx = 0;
        }
        if(this.LTPy === undefined){
            this.LTPy = 0;
        }
        this.beamAlpha = Mathf.slerpDelta(this.beamAlpha, 0, 0.025);
        //run super after to prevent undefined fields
        this.super$updateTile();
    },
    findTarget(){
        let TempTarget = null
        let tempVar = Units.findDamagedTile(this.team, this.x, this.y);
        if(tempVar != null){
            if(Mathf.dst(this.x, this.y, tempVar.x, tempVar.y) < this.range()){
                TempTarget = tempVar
            }
        }
        let TempTarget2 = Units.closestTarget(this.team, this.x, this.y, this.range(), u => u.checkTarget(true, true));
        if(TempTarget != null){
            this.target = TempTarget;
            if(this.isControlled() != true || this.logicControlled() != true){
                this.shootingBuilding = true
            }
            else{
                this.shootingBuilding = false
            }
        }
        else if(TempTarget2 != null){
            this.target = TempTarget2;
            this.shootingBuilding = false
        }
        else{
            this.shootingBuilding = false
        }
    },
    validateTarget(){
        if(this.target != null){
            let TempTarget = null
            let tempVar = Units.findDamagedTile(this.team, this.x, this.y);
            if(tempVar != null){
                if(Mathf.dst(this.x, this.y, tempVar.x, tempVar.y) < this.range()){
                    TempTarget = tempVar;
                }
            }
            if(Units.closestTarget(this.team, this.x, this.y, this.range(), u => u.checkTarget(true, true) || TempTarget != null)){
                return true;
            }
            else if(this.shootingBuilding){
                return true;
            }
            else{
                return false;
            }
        }
        else if(this.isControlled() == true || this.logicControlled() == true){
            return true;
        }
        else{
            return false;
        }
    },
    shoot(type){
        if(this.target != null && this.logicControlled() != true && this.isControlled() != true && this.shootingBuilding != false){
            this.target.heal(this.target.maxHealth/100 * type.healPercent);
            Fx.healBlockFull.at(this.target.x, this.target.y, this.target.block.size, Color.valueOf("#82f48f"))
            this.beamAlpha = 1;
            this.setLastP()
        }
        else{
            let TempBuild = Vars.world.buildWorld(this.targetPos.x, this.targetPos.y)
            if(TempBuild != null){
               if(TempBuild.team == this.team && TempBuild.damaged() && Mathf.dst(TempBuild.x, TempBuild.y, this.x, this.y) < this.range() + 1){
                    TempBuild.heal(TempBuild.maxHealth/100 * type.healPercent)
                    Fx.healBlockFull.at(TempBuild.x, TempBuild.y, TempBuild.block.size, Color.valueOf("#82f48f"))
                    this.beamAlpha = 1;
                    this.setLastP()
               }
                else{
                    this.super$shoot(type);
                }
            }
            else{
                this.super$shoot(type);
            }
        }
            this.recoil = 1;
    },
    draw(){
        this.super$draw();
        if(this.beamAlpha !== undefined){
        Draw.reset()
        Layer.bullet;
        this.pulsate = fc.helix(8, 1, 1, this.beamAlpha * this.beamAlpha) * 0.25 + this.beamAlpha * 0.75
        Draw.color(Color.valueOf("#62ac7d"), Color.valueOf("#82f48f"), this.beamAlpha)
        Draw.alpha(this.beamAlpha);
        Lines.stroke(this.pulsate * 3)
        Lines.line(this.xEnd, this.yEnd, this.LTPx, this.LTPy);
        Fill.circle(this.xEnd, this.yEnd, this.pulsate * 3)
        Fill.circle(this.LTPx, this.LTPy, this.pulsate * 3)
        Draw.color(Color.valueOf("#ffffff"), Color.valueOf("#e8ffd7"), this.beamAlpha)
        Lines.stroke(this.pulsate)
        Lines.line(this.xEnd, this.yEnd, this.LTPx, this.LTPy);
        Fill.circle(this.xEnd, this.yEnd, this.pulsate)
        Fill.circle(this.LTPx, this.LTPy, this.pulsate)
        
        Draw.color(Color.white, Pal.heal, this.beamAlpha * this.beamAlpha);
        Lines.circle(this.xEnd, this.yEnd, 4 - 1.5 * this.beamAlpha * this.beamAlpha);
        }
    }
});