//------------------------------------------------------------------------------------------------------
// role.builder
var cUtility = require("creepUtility");
var CreepType = cUtility.CreepType;

module.exports = {
        run: function(creep) 
        {
            if(creep.memory.building)
            {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length > 0)
                {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    else if(creep.build(targets[0]) != OK)
                    {
                        creep.memory.building = false;
                    }
                }
            }
            else
            {
                if(creep.carry.energy < creep.carryCapacity) 
                {
                    cUtility.GrabSomeEnergy(creep);
                }
                else
                {
                    creep.memory.building = true;
                }
            }
        }
    };