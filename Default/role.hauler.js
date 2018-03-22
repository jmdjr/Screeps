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
                creep.say("grabbing");
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
                        && (structure.energy < structure.energyCapacity 
                        || (structure.store && structure.store.energy < structure.store.energyCapacity));
                }
            });

            var hungryCreeps = creep.room.find(FIND_MY_CREEPS, 
            {
                filter: (c) => 
                {
                    return c.memory.role != 'hauler' && (c.carry.energy < c.carry.energyCapacity);
                }

            });
            
            targets = targets.concat(hungryCreeps);

            targets.forEach(t => 
            {
                if(t.carry && t.carry.energy) 
                {
                    t.energy = t.carry.energy;
                    t.energyCapacity = t.carry.energyCapacity;
                }
                
                if(t.store && t.store.energy)
                {
                    t.energy = t.store.energy;
                    t.energyCapacity = t.store.energyCapacity;
                }
            });

            targets.sort((a, b) => (b.energy / b.energyCapacity) - (a.energy / a.energyCapacity));

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