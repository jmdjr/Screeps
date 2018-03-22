//------------------------------------------------------------------------------------------------------
// role.hauler

var cUtility = require('creepUtility');
var target = null;
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
                    return (structure.structureType == STRUCTURE_EXTENSION 
                            || structure.structureType == STRUCTURE_TOWER
                            || structure.structureType == STRUCTURE_SPAWN
                            || structure.structureType == STRUCTURE_STORAGE
                            || structure.structureType == STRUCTURE_CONTAINER) 
                            && (structure.energy < structure.energyCapacity 
                        || (structure.store && structure.store.energy < structure.store.energyCapacity));
                }
            });

            targets = _.toArray(targets);

            var hungryCreeps = creep.room.find(FIND_MY_CREEPS, { filter: (c) =>  { return c.memory.role != 'hauler' && (c.carry[RESOURCE_ENERGY] < c.carryCapacity); } });
            
            targets = targets.concat(_.toArray(hungryCreeps));
            // console.log(targets.join(', '));

            if(targets != null)
            {
                var target = cUtility.FindClosest(creep, targets)[0];
                if(target && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(target/*, { visualizePathStyle: { stroke: '#ffffff' } }*/);
                }
            }
        }
    }
};