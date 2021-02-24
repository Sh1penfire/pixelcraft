const fc = require("libs/fc")

const swarmAI = () => extend(FlyingAI, {
    findTarget(x, y, range, air, ground){
        let t = null
        let targ1 = null
        let targetAlly = Units.closest(this.unit.team, x, y, range * 6, u => fc.validateNearby(u, range * 2) && u.damaged());
        let targetAlly2 = Units.closest(this.unit.team, x, y, range * 6, u => fc.validateNearby(u, range * 2));
        if(targetAlly != null){
            targ1 = Units.closestTarget(this.unit.team, targetAlly.x, targetAlly.y, range * 2, u => u.checkTarget(air, ground), t => ground);
        }
        else{if(targetAlly2 != null){
                targ1 = Units.closestTarget(this.unit.team, targetAlly2.x, targetAlly2.y, range * 2.5, u => u.checkTarget(air, ground), t => ground);
            }
        }
        let targ2 = Units.closestTarget(this.unit.team, x, y, range * 2, u => u.checkTarget(air, ground), t => ground);
        if(targ1 != null && targ2 != null){
            if(Mathf.dst(targ1.x, targ1.y, this.unit.x, this.unit.y) < Mathf.dst(targ2.x, targ2.y, this.unit.x, this.unit.y) * 5 || targ1 == targ2){
                t = targ1
                StatusEffects.overclock.effect.at(x, y);
            }
            else{
                t = targ2
            }
        }
        if(t != null){
            return t;
        }
        else{
            return this.super$findTarget(x, y, range, air, ground)
        }
    }
});
                
module.exports = {
    swarmAI: swarmAI
};