//------------------------------------------------------------------------------------------------------
// role.hauler

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

            var hungryCreeps = creep.room.find(FIND_MY_CREEPS, 
            {
                filter: (c) => 
                {
                    return c.memory.role != 'hauler' && (c.carry[RESOURCE_ENERGY] < c.carryCapacity);
                }

            });
            
            targets = targets.concat(_.toArray(hungryCreeps));
            console.log(targets.join(', '));

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
                }
            }
        }
    }
};