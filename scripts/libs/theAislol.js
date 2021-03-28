const fc = require("libs/fc")

const swarmAI = () => extend(FlyingAI, {
    updateMovement(){
        let ability = this.unit.abilities.find(a => a instanceof RepairFieldAbility)
        if(ability != null && this.target == null && this.command() != UnitCommand.idle){
            let target = Units.closest(this.unit.team, this.unit.x, this.unit.y, this.unit.type.range * 6, u => u.damaged() && u != this.unit);
            if(target != null){
                this.moveTo(target, target.hitSize/2 * 1.1 + ability.range);
                this.unit.lookAt(target);
            }
            else this.super$updateMovement();
        }
        else this.super$updateMovement();
    },
    findTarget(x, y, range, air, ground){
        let t = null
        let targ1 = null
        this.targetAlly = Units.closest(this.unit.team, x, y, range * 6, u => fc.validateNearby(u, range * 2) && u.damaged());
        this.targetAlly2 = Units.closest(this.unit.team, x, y, range * 6, u => fc.validateNearby(u, range * 2));
            
        if(this.targetAlly != null) targ1 = Units.closestEnemy(this.unit.team, this.targetAlly.x, this.targetAlly.y, range * 2, u => u.checkTarget(air, ground));
                
        else if(this.targetAlly2 != null) targ1 = Units.closestTarget(this.unit.team, this.targetAlly2.x, this.targetAlly2.y, range * 2.5, u => u.checkTarget(air, ground), t => ground);
            
        let targ2 = Units.closestTarget(this.unit.team, x, y, range * 2, u => u.checkTarget(air, ground), t => ground);
        if(targ1 != null && targ2 != null){
            if(Mathf.dst(targ1.x, targ1.y, this.unit.x, this.unit.y) < Mathf.dst(targ2.x, targ2.y, this.unit.x, this.unit.y) * 5 || targ1 == targ2){
                t = targ1
            }
            else{
                t = targ2
            }
        }
        if(t != null){
            return t;
        }
        else{
        let result = null
        if(ground) result = this.targetFlag(x, y, BlockFlag.generator, true);
        if(result != null) return result;
            
        if(ground) result = this.targetFlag(x, y, BlockFlag.core, true);
        if(result != null) return result;
        }
    }
});
                
module.exports = {
    swarmAI: swarmAI
};