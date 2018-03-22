// utility functions for accessing, assessing and parsing creeps
var CreepType = [];
var name = '';

name = "repairer";
CreepType.push(name);
CreepType[name] = 
{
    signature: [CARRY, WORK, MOVE],
    limit: 3,
    min: 1,
    name: name,
    memory: { role: name, target: null }
};

name = "upgrader";
CreepType.push(name);
CreepType[name] = 
{
    signature: [CARRY, CARRY, CARRY, WORK, MOVE],
    limit: 3,
    min: 1,
    name: name,
    memory: { role: name, target: null }
};

name = "builder";
CreepType.push(name);
CreepType[name] = 
{
    signature: [CARRY, WORK, WORK, MOVE],
    limit: 3,
    min: 1,
    name: name,
    memory: { role: name, target: null, building: false }
};

name = "hauler";
CreepType.push(name);
CreepType[name] = 
{
    signature: [CARRY, CARRY, WORK, MOVE, MOVE],
    limit: 4,
    min: 1,
    name: name,
    memory: { role: name, target: null }
};

name = "harvester";
CreepType.push(name);
CreepType[name] = 
{
    signature: [WORK, WORK, MOVE, MOVE],
    limit: 4,
    min: 2,
    name: name,
    memory: { role: name, target: null }
};

name = "stem";
CreepType.push(name);
CreepType[name] = 
{
    signature: [CARRY, CARRY, WORK, MOVE, MOVE],
    limit: 3,
    min: 1,
    name: name,
    memory: { role: name, target: null }
};


module.exports = {
    FilterCreeps: function (st) {
        return _.filter(Game.creeps, (creep) => creep.memory.role === st.memory.role);
    },

    CreepType: CreepType,
    CreepOrder: ['stem', 'harvester', 'hauler', 'builder', 'upgrader', 'repairer' ],
    GrabSomeEnergy: function (creep) 
    {
        var sources = creep.room.find(FIND_DROPPED_RESOURCES);
        if(sources.length > 0)
        {
            var targets = FindClosest(creep, sources);
            if(creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return true;
        }

        sources = creep.room.find(FIND_SOURCES);
        if(sources.length > 0) 
        {
            var targets = FindClosest(creep, sources);
            if(creep.harvest(targets[0]))
            {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return true;
        }

        return false;
    },
    FindClosest: function(creep, targets) 
    {
        return _.sortBy(targets, s => creep.pos.getRangeTo(s));
    }
}