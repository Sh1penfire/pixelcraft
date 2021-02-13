// Sto- Copied from routorio.

/*
  * Registers a unit's class for I/O stuff (saves and net)
  * Requires unit.constructor.get() to have classId: () => unit.classId
*/
function register(unit){
EntityMapping.nameMap.put(unit.name, unit.constructor);
unit.classId = -1;
for(let id in EntityMapping.idMap){
    if(!EntityMapping.idMap[id]){
        EntityMapping.idMap[id] = unit.constructor;
        unit.classId = id;
        return;
    }
}
    // Incase you used up all 256 class ids; use the same code for ~250 units you idiot.
    throw new IllegalArgumentException(unit.name + " has no class ID");
};
module.exports = {register: register}