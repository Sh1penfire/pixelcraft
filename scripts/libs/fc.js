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
    var pos = 0;
    if(inOutTimes < 0){
        pos = Mathf.sin(scaling * 3.142 * rotationTimes) * scaling * radius
    }
    else{
        pos = Mathf.sin(scaling * 3.142 * rotationTimes) * scaling * radius * Mathf.sin(scaling * inOutTimes * 3.142)
    };
    return pos;
};

function clash(rotationTimes, radius, scaling, inOutTimes){
    var pos = 0;
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
function statusCheck(Unit, Status){
    let returnVar = false
    for(let i = 0; i < Unit.statuses.size; i++){
        if(Unit.statuses.get(i).effect == Status){
            returnVar = true;
        }
    }
    return returnVar
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
    statusCheck: statusCheck
};