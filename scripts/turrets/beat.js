// Obligatory comment line for no reason at all

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

const pulse = extend(PowerTurret, "healingTurret1", {})
pulse.beamAlpha = 1
pulse.buildType = () => extend(PowerTurret.PowerTurretBuild, pulse, {
    setLastP(){
        //used to set target last position
        if(this.target != null){
            //stands for last position x and last position y
            this.LTPx = this.target.x
            this.LTPy = this.target.y
        }
    },
    updateTile(){
        this.setLastP();
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
        let TempTarget = Units.closestEnemy(this.team, this.x, this.y, this.range(), u => u.checkTarget(true, true));
        let TempTarget2 = null
        let tempVar = Units.findDamagedTile(this.team, this.x, this.y);
        if(tempVar != null){
            if(Mathf.dst(this.x, this.y, tempVar.x, tempVar.y) < this.range()){
                TempTarget2 = tempVar
            }
        }
        if(TempTarget != null){
            this.target = TempTarget;
            this.shootingBuilding = false
        }
        else if(TempTarget2 != null){
            this.target = TempTarget2;
            if(this.isControlled() != true || this.logicControlled() != true){
                this.shootingBuilding = true
            }
            else{
                this.shootingBuilding = false
            }
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
            if(Units.closestEnemy(this.team, this.x, this.y, this.range(), u => u.checkTarget(true, true) || TempTarget != null)){
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
        if(this.shootingBuilding != false && this.target != null && this.logicControlled() != true && this.isControlled() != true){
            this.target.heal(this.target.maxHealth/type.healPercent);
            Fx.healBlockFull.at(this.target.x, this.target.y, this.target.block.size, Color.valueOf("#82f48f"))
            this.beamAlpha = 1;
            this.setLastP()
        }
        else{
            this.super$shoot(type);
        }
    },
    draw(){
        this.super$draw();
        Draw.color(Color.valueOf("#62ac7d"), Color.valueOf("#82f48f"), this.beamAlpha)
        Draw.alpha(this.beamAlpha);
        Lines.stroke(this.beamAlpha * this.beamAlpha)
        Lines.line(this.x, this.y, this.LTPx, this.LTPy);
    }
})
//the beat hjson file modifies beat, as this just defines it
const beat = extendContent(PowerTurret, "healingTurret2", {
  icons(){
    return [
      Core.atlas.find("block-1"),
      Core.atlas.find("pixelcraft-healingTurret2")
    ];
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
