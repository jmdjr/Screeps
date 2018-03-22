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
                cUtility.MoveToDo(creep, (c, t) => c.transfer(t, RESOURCE_ENERGY), targets[0], false);
            }
        }
    }
};