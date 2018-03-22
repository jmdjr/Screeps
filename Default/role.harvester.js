//------------------------------------------------------------------------------------------------------
// role.harvester
var cUtility = require("creepUtility");
var CreepType = cUtility.CreepType;

var takenSources = [];
var perSource = 2;

var SourcesNotAtLimit = function(creep) 
{
    var sources = _.toArray(creep.room.find(FIND_SOURCES));
    var s = Array.from(sources, c => c.id);
    return s.filter(id => typeof takenSources[id] == 'undefined' || takenSources[id] <= perSource);
}

module.exports = 
{
    run: function(creep) 
    {

        var availables = SourcesNotAtLimit(creep);

        if(availables.length > 0)
        {
            availables = Array.from(availables, a => Game.getObjectById(a));
            var target = cUtility.FindClosest(creep, availables)[0];

            if(typeof takenSources[target.id] === 'undefined') 
            {
                takenSources[target.id] = 1;
            }
            else 
            {
                takenSources[target.id] += 1;
            }
            
            creep.memory.target = target.id;
        }

        var target = Game.getObjectById(creep.memory.target);
        cUtility.MoveToDo(creep, creep.harvest, target, true);
    }
};