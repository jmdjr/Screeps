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
    limit: 3,
    min: 2,
    name: name,
    memory: { role: name, target: null }
};

name = "harvester";
CreepType.push(name);
CreepType[name] = 
{
    signature: [WORK, WORK, MOVE, MOVE],
    limit: 2,
    min: 1,
    name: name,
    memory: { role: name, target: null }
};

name = "stem";
CreepType.push(name);
CreepType[name] = 
{
    signature: [CARRY, CARRY, WORK, MOVE, MOVE],
    limit: 3,
    min: 2,
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
        if(creep.pickup(sources[0]) == ERR_NOT_IN_RANGE) 
        {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    },
    FindClosestSource: function(creep) 
    {
        return _.sortBy(sources, s => creep.pos.getRangeTo(s));
    }
}