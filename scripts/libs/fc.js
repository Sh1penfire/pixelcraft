//failsafe for rotation
function rotationFC(p1, p2){
    let angle = p1;
    angle = angle + p2;
    while(angle > 360){
        angle = angle - 360;
    };
    while(angle < 0){
        angle = angle + 360;
    };
    return angle;
};

//helix structure
function helix(helixes, magnitude, scaling, base){
    if(base == null){
        base = scaling
    }
    scaling = Math.abs(scaling);
    return Mathf.sin(base * helixes * 3.142) * scaling * magnitude;
};

// XD 
function holex(holexs, magnitude, scaling) {
  scaling = Math.abs(scaling);
  return Mathf.cos(scaling * helixes * 3.142) * scaling * magnitude;
};

function slash(rotationTimes, radius, scaling, inOutTimes){
    let pos = 0;
    if(inOutTimes < 0){
        pos = Mathf.sin(scaling * 3.142 * rotationTimes) * scaling * radius
    }
    else{
        pos = Mathf.sin(scaling * 3.142 * rotationTimes) * scaling * radius * Mathf.sin(scaling * inOutTimes * 3.142)
    };
    return pos;
};

function clash(rotationTimes, radius, scaling, inOutTimes){
    let pos = 0;
    if(inOutTimes < 0){
        pos = Mathf.cos(scaling * 3.142 * rotationTimes) * scaling * radius
    }
    else{
        pos = Mathf.cos(scaling * 3.142 * rotationTimes) * scaling * radius * Mathf.cos(scaling * inOutTimes * 3.142)
    };
    return pos;
};

//clans.mp4

function rangeLimit(number, constraint){
    let MIN = Math.abs(constraint) * -1;
    let MAX = Math.abs(constraint);
    let parsed = parseInt(number);
    return Math.min(Math.max(parsed, MIN), MAX);
};


function optionalRotatorX(Timer,speed,startRotator,distanceCenter,positionX){
    let rotatorX = positionX + Mathf.sin(Timer * speed + startRotator) * distanceCenter
    return rotatorX
}

function optionalRotatorY(Timer, spaeed, startRotator, distanceCenter, positionY) {
    let rotatorY = positionY + Mathf.cos(Timer * speed + startRotator) * distanceCenter
    return rotatorY
}

function rangeLimit(number, constraint){
    let MIN = Math.abs(constraint) * -1;
    let MAX = Math.abs(constraint);
    let parsed = parseInt(number);
    return Math.min(Math.max(parsed, MIN), MAX);
};

function rangeLimit2(number, constraintMin, constraintMax){
    let MIN = constraintMin;
    let MAX = constraintMax;
    let parsed = parseInt(number);
    return Math.min(Math.max(parsed, MIN), MAX);
};
//status effect checker
function statusCheck(unit, Status){
    let returnVar = false
    for(let i = 0; i < unit.statuses.size; i++){
        if(unit.statuses.get(i).effect == Status){
            returnVar = true;
        }
    }
    return returnVar
}

//returns status
function returnStatus(unit, Status){
    for(let i = 0; i < unit.statuses.size; i++){
        if(unit.statuses.get(i).effect == Status){
            return unit.statuses.get(i).effect
        }
    }
}

//checks for if the unit has an enemy nearby. this code is stupid and I have no words.
function validateNearby(unit, range){
    let returnVar = false
    let target = Units.closestTarget(unit.team, unit.x, unit.y, range, u => u.checkTarget(true, true))
    if(target != null){
        returnVar = true
    }
    return returnVar
}

function fcNearbyEnemy(team, x, y, range){
        let result = null;
        let cdist = 0;

        Units.nearbyEnemies(team, x - range, y - range, range*2, range*2, e => {
            if(e.dead) return;

            let dst2 = e.dst2(x, y);
            if(dst2 < range * range && (result == null || dst2 < cdist)){
                result = e;
                cdist = dst2;
            }
        });

        return result;
}

module.exports = {
    rotationFC: rotationFC,
    helix: helix,
    slash: slash, 
    clash: clash,
    rangeLimit2: rangeLimit2,
    rangeLimit: rangeLimit,
    optionalRotatorX: optionalRotatorX,
    optionalRotatorY: optionalRotatorY,
    statusCheck: statusCheck,
    returnStatus: returnStatus,
    validateNearby: validateNearby,
    fcNearbyEnemy: fcNearbyEnemy
};
