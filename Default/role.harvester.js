//------------------------------------------------------------------------------------------------------
// role.harvester

var SourcesNotHarvested = function(creep) 
{
    var sources = creep.room.find(FIND_SOURCES);
    var taken = Array.from(Game.creeps, c => c.memory.target);
    return sources.filter(item => !taken.includes(item));
}

module.exports = 
{
    run: function(creep) 
    {
        var availables = SourcesNotHarvested(creep);
        creep.memory.target = availables[0];
        
        if(creep.harvest(creep.memory.target) == ERR_NOT_IN_RANGE) 
        {
            creep.moveTo(creep.memory.target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};