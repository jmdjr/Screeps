//------------------------------------------------------------------------------------------------------
// role.builder
var cUtility = require("creepUtility");
var CreepType = cUtility.CreepType;

module.exports = {
        run: function(creep) 
        {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var closest = cUtility.FindClosest(creep, targets);
            
            if(creep.memory.building)
            {
                if(targets.length > 0)
                {
                    if(creep.build(closest) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveTo(closest, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    else if(creep.build(closest) != OK)
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