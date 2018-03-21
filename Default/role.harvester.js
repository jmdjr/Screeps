//------------------------------------------------------------------------------------------------------
// role.harvester

var SourcesNotHarvested = function(creep) 
{
    var sources = Array.from(creep.room.find(FIND_SOURCES), c => c.id);
    var taken = Array.from(_.filter(Game.creeps, c => c.memory.role === 'harvester'), c => c.memory.target);
    return sources.filter(id => !taken.includes(id));
}

module.exports = 
{
    run: function(creep) 
    {
        if(creep.memory.target == null)
        {
            creep.say('looking for target');
            var availables = SourcesNotHarvested(creep);

            if(availables.length > 0)
            {
                creep.memory.target = availables[0];
                creep.say(creep.memory.target);
            }
        }

        var target = Game.getObjectById(creep.memory.target);
        if(target != null && creep.harvest(target) == ERR_NOT_IN_RANGE) 
        {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};