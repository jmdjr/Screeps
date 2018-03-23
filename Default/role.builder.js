//------------------------------------------------------------------------------------------------------
// role.builder
var cUtility = require("creepUtility");
var CreepType = cUtility.CreepType;

module.exports = {
        run: function(creep) 
        {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

            if(targets.length > 0) {

                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                else 
                {
                    creep.memory.building = true;
                }
            }
        }
    };