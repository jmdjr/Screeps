//------------------------------------------------------------------------------------------------------
// role.harvester
var cUtility = require('creepUtility');

module.exports = 
{
    run: function(creep) 
    {
        if(creep.carry.energy < creep.carryCapacity) 
        {
            cUtility.GrabSomeEnergy(creep);
        }
        else 
        {
            var targets = creep.room.find(FIND_STRUCTURES, 
            {
                filter: (structure) => 
                {
                    return (structure.structureType == STRUCTURE_SPAWN) 
                        && structure.energy < structure.energyCapacity;
                }
            });

            if(targets.length > 0)
            {
                cUtility.MoveToDo(creep, creep.transfer, targets[0], false)
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }


    }
};