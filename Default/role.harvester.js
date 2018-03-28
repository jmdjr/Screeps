//------------------------------------------------------------------------------------------------------
// role.harvester
var cUtility = require("creepUtility");
var CreepType = cUtility.CreepType;

Memory.takenSources = [];
var perSource = 2;

var SourcesNotAtLimit = function(creep) 
{
    var sources = _.toArray(creep.room.find(FIND_SOURCES));
    var s = Array.from(sources, c => c.id);
    return s.filter(id => typeof Memory.takenSources[id] == 'undefined' || Memory.takenSources[id] <= perSource);
}

var AddTakenSource = function(list, id) 
{
    if(typeof list[id] === 'undefined') 
    {
        list.push(id);
        list[id] = 1;
    }
    else 
    {
        list[id] += 1;
    }

    return list;
}

module.exports = 
{
    run: function(creep) 
    {
        if(Memory.takenSources == []) 
        {
            Memory.takenSources = _.toArray(cUtility.FilterCreeps(CreepType.harvest));

            if(Memory.takenSources.length > 0)
            {
                var ids = Memory.takenSources.from((a) => a.memory.target);
                Memory.takenSources = [];

                for(var id in ids) 
                {
                    Memory.takenSources = AddTakenSource(Memory.takenSources, id);
                }
            }

            console.log(Memory.takenSources);
        }

        var availables = SourcesNotAtLimit(creep);

        console.log(availables);
            
        if(availables.length > 0 && creep.memory.target == null)
        {
            availables = Array.from(availables, a => Game.getObjectById(a));
            var targets = cUtility.FindClosest(creep, availables);
            console.log(Memory.takenSources);

            if(targets.length > 0) 
            {
                creep.memory.target = targets[0].id;
                AddTakenSource(Memory.takenSources, creep.memory.target)
            }
        }

        var target = Game.getObjectById(creep.memory.target);
        if(!cUtility.MoveToDo(creep, (c, t) => c.harvest(t), target, true))
        {
            cUtility.MakeRoad(creep);
        }
    }
};