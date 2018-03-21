//------------------------------------------------------------------------------------------------------
// spawnQueen

var ScreepType = {
    stem: {
        signature: [CARRY, WORK, MOVE],
        limit: 3,
        min: 2,
        name: "stem",
        memory: {role: 'stem'}
    },

    hauler: {
        signature: [CARRY, CARRY, WORK, MOVE, MOVE],
        limit: 5,
        min: 2,
        name: "hauler",
        memory: {role: 'hauler'}
    },
    
    builder: {
        signature: [CARRY, CARRY, WORK, MOVE, MOVE],
        limit: 3,
        min: 1,
        name: "builder",
        memory: {role: 'builder', building: false}
    },
    harvester: {
        signature: [WORK, WORK, WORK, MOVE, MOVE],
        limit: 3,
        min: 1,
        name: "harvester",
        memory: {role: 'harvester'}
    }
}

var Spawner = function() {return Game.spawns['queen']; }

var checkScreep = function(screepType, name) {
    return Spawner().spawnCreep(screepType.signature, name, {memory: screepType.memory, dryRun: true});
}

var spawnScreep = function(screepType, name) {
    
    if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
    }

    return Spawner().spawnCreep(screepType.signature, name, {memory: screepType.memory});
}

var filterForScreeps = function(ScreepType) {
    return _.filter(Game.creeps, (creep) => creep.memory.role == ScreepType.memory.role);
}

var CheckMins = function(ScreepType) 
{
    var screeps = filterForScreeps(ScreepType);
    return screeps.length < ScreepType.min;
}

var CheckAndSpawnMin = function(ScreepType) 
{
    var screeps = filterForScreeps(ScreepType);
    var name = ScreepType.name + Game.time;

    if(screeps.length < ScreepType.min) 
    {
        spawnScreep(ScreepType, name);
    }
}

var spawnQueen = 
{
    run: function() 
    {
        var harvesters = filterForScreeps(ScreepType.harvester);
        var builders = filterForScreeps(ScreepType.builders);
        var haulers = filterForScreeps(ScreepType.haulers);

        //------------------------------------------------------------
        // Ensure minimums are met...
        if(CheckMins(ScreepType.harvester)
            || CheckMins(ScreepType.builder)
            || CheckMins(ScreepType.hauler))
        {
            CheckAndSpawnMin(ScreepType.stem);
            CheckAndSpawnMin(ScreepType.harvester);
            CheckAndSpawnMin(ScreepType.hauler);
            CheckAndSpawnMin(ScreepType.builder);
        }
        else
        {
            // plenty of screeps, ensure that we reach limits.
        }
        
        if(Spawner().spawning) { 
            var spawningCreep = Game.creeps[Spawner().spawning.name];
            Spawner().room.visual.text(
                spawningCreep.memory.role,
                Spawner().pos.x + 1, 
                Spawner().pos.y, 
                {align: 'left', opacity: 0.8});
        }
    
    }
}

module.exports = spawnQueen;