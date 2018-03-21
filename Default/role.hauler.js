//------------------------------------------------------------------------------------------------------
// role.hauler
module.exports = 
{
    run: function(creep) 
    {
        if(creep.carry.energy < creep.carryCapacity) 
        {
            var sources = creep.room.find(FIND_SOURCES);
        }
        else 
        {
            var targets = creep.room.find(FIND_STRUCTURES, 
            {
                filter: (structure) => 
                {
                    return (structure.structureType == STRUCTURE_EXTENSION 
                            || structure.structureType == STRUCTURE_TOWER
                            || structure.structureType == STRUCTURE_SPAWN) 
                        && structure.energy < structure.energyCapacity;
                }
            });

            targets = targets.concat(creep.room.find(FIND_CONSTRUCTION_SITES));

            if(targets.length > 0)
            {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};