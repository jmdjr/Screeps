//------------------------------------------------------------------------------------------------------
// role.hauler
module.exports = 
{
    run: function(creep) 
    {
        if(creep.carry.energy < creep.carryCapacity) 
        {
            var sources = creep.room.find(FIND_DROPPED_RESOURCES);
            if(creep.pickup(sources[0]) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
            else
            {
                creep.say("grabbing energy");
            }
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
                        && structure.energy < structure.energyCapacity;
                }
            });

            var hungryCreeps = _.filter(Game.creeps, (c) => { c.memory.role != 'hauler' && c.energy < c.energyCapacity });

            targets = targets.concat(hungryCreeps);
            if(targets.length > 0)
            {
                // check if my current target is 
                for(var target in targets) 
                {
                    target = targets[target];
                    if(target.energy < target.energyCapacity) 
                    {
                        creep.memory.target = target.id;
                        break;
                    }
                }
            }

            if(creep.memory.target != null)
            {
                var target = Game.getObjectById(creep.memory.target);
                if(target && creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    creep.say(target.name);
                }
            }
        }
    }
};