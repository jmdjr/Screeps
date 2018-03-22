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

name = "roadpaver";
CreepType.push(name);
CreepType[name] = 
{
    signature: [CARRY, WORK, MOVE],
    limit: 3,
    min: 1,
    name: name,
    memory: { role: name, target: null }
};

name = "hauler";
CreepType.push(name);
CreepType[name] = 
{
    signature: [CARRY, CARRY, WORK, MOVE, MOVE],
    limit: 4,
    min: 2,
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
    CreepOrder: ['stem', 'harvester', 'hauler', 'roadpaver', 'builder', 'upgrader', 'repairer' ],
    GrabSomeEnergy: function (creep) 
    {
        return this.GrabFromSources(creep) ||  this.GrabFromSources(creep);
    },

    GrabFromDroppedEnergy: function (creep) {
        var sources = creep.room.find(FIND_DROPPED_RESOURCES);
        if(sources.length > 0)
        {
            var targets = this.FindClosest(creep, sources);
            if(creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return true;
        }
    },

    GrabFromSources: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if(sources.length > 0) 
        {
            var targets = this.FindClosest(creep, sources);
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
    },
    MoveToDo: function(creep, action, target, args, visualize) 
    {
        var show = visualize ? {visualizePathStyle: {stroke: '#ffaa00'}} : {};

        if(target != null && action.call(creep, target) == ERR_NOT_IN_RANGE) 
        {
            creep.moveTo(target, show);
        }
    }
}