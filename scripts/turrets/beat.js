// Obligatory comment line for no reason at all

const fc = require("libs/fc")

//shoot effect for beat
const beatShoot = new Effect(30, e => {
  Draw.color(Color.valueOf("05700b"), Color.valueOf("acfbb0"), e.fin());
  Lines.stroke(e.fout()*2);
  Lines.circle(e.x, e.y, e.fin() * 10);
});

//effect when bullet hits a target
const shotHit = new Effect(20, e => {
  Draw.color(Color.valueOf("05700b"), Color.valueOf("acfbb0"), e.fin());
  Lines.stroke(e.fout()*1);
  Lines.circle(e.x, e.y, e.fin() * 12.5);
});


//makes the shoot effect of beat
const shot = extend(LaserBoltBulletType, {});
        
//make effects of overload
const overloadFX = new Effect(40, e => {
Draw.color(Color.yellow, Color.white, e.fin());
Fill.circle(e.x, e.y, e.fslope() * 6);
});

const overload = extendContent(StatusEffect, "overload", {});

overload.speedMultiplier = 1.3;
overload.armorMultiplier = 1.1;
overload.damage = 0.0;
overload.effect = overloadFX;
overload.color  = Color.green;

//extends off the beat hjson file
const beat = extendContent(PowerTurret, "healingTurret2", {
  icons(){
    return [
      Core.atlas.find("block-2"),
      Core.atlas.find("pixelcraft-healingTurret2")
    ];
  }
});
//wait a second, this wasn't here befo-
beat.buildType = () => extend(PowerTurret.PowerTurretBuild, beat, {
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
        if(this.target != null && this.logicControlled() != true && this.isControlled() != true && this.target.team == this.team){
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
        Draw.z(Layer.bullet);
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
//givving things stats

//givving beat it's stats (Some are predefined in the beat.hjson file
beat.recoil = 1;
beat.restitution = 0.015;
beat.shootType = shot;
beat.targetAir = true;
beat.targetGround = true;

//stats of bullet shot by beat
shot.damage = 0;
shot.speed = 5;
shot.lifetime = 50;
shot.knockback = 0;
shot.width = 2;
shot.height = 4;
shot.collides = true;
shot.collidesTiles = true;
shot.hitEffect = shotHit;
shot.despawnEffect = beatShoot
shot.shootEffect = beatShoot;
shot.status = overload;
shot.statusDuration = 900;
shot.pierce = true;
shot.healPercent = 2;
shot.collidesTeam = true;
/*
shot.frontColor = Color.valueOf(05700b);
shot.backColor = Color.valueOf(05700b);
*/