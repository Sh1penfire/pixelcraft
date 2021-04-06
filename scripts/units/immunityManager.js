const refresh = require("libs/refresh")
const fc = require("libs/fc")
const theAislol = require("libs/theAislol")
const statuses = require("libs/statuses")

/*function shardUnit(name, DC, DR, type, build){
    const unit = extend(type, name, {});
    unit.constructor = () => extend(build, {
        
        });
    }
    return unit;
};*/

Events.on(ClientLoadEvent, b  => {
Units.each(unit => {
        for(let i = 0; i < unit.immunities.length; i++){
            let unitStatus = unit.immunities.get(i);
            if(unitStatus = statuses.blackout){
                unit.immunities.remove(i);
            }
        }
    });
    blink.weapons.get(0).bullet.status = statuses.blackout;
    nescience.weapons.get(0).bullet.status = statuses.blackout;
});