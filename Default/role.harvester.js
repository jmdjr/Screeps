//------------------------------------------------------------------------------------------------------
// role.harvester
var cUtility = require("creepUtility");
var CreepType = cUtility.CreepType;

var sources = [];
var takenSources = [];
var perSource = 2;

var SourcesNotAtLimit = function(creep) 
{
    var s = Array.from(sources, c => c.id);
    return s.filter(id => typeof takenSources[id] == 'undefined' || takenSources[id] <= perSource);
}

module.exports = 
{
    run: function(creep) 
    {
        if(sources == []) 
        {
            sources = _.toArray(creep.room.find(FIND_SOURCES));
        }

        var availables = SourcesNotAtLimit(creep);

        if(availables.length > 0)
        {
            creep.memory.target = cUtility.FindClosest(creep, availables);

            if(typeof takenSources[creep.memory.target] === 'undefined') 
            {
                takenSources[creep.memory.target] = 1;
            }
            else 
            {
                takenSources[creep.memory.target] += 1;
            }
        }

        var target = Game.getObjectById(creep.memory.target);
        cUtility.MoveToDo(creep, target, true);
    }
};