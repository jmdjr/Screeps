//------------------------------------------------------------------------------------------------------
// spawnQueen

var ScreepType = {
    stem: {
        signature: [CARRY, CARRY, WORK, MOVE, MOVE],
        limit: 3,
        min: 2,
        name: "stem",
        memory: { role: 'stem' }
    },

    hauler: {
        signature: [CARRY, CARRY, WORK, MOVE, MOVE],
        limit: 3,
        min: 2,
        name: "hauler",
        memory: { role: 'hauler' }
    },

    builder: {
        signature: [CARRY, WORK, WORK, MOVE],
        limit: 3,
        min: 1,
        name: "builder",
        memory: { role: 'builder', building: false }
    },
    harvester: {
        signature: [WORK, WORK, MOVE, MOVE],
        limit: 3,
        min: 1,
        name: "harvester",
        memory: { role: 'harvester' }
    }
}

var Spawner = function () { return Game.spawns['queen']; }

var checkScreep = function (st, name) {
    return Spawner().spawnCreep(st.signature, name, { memory: st.memory, dryRun: true });
}

var spawnScreep = function (st, name) {

    if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
    }

    return Spawner().spawnCreep(st.signature, name, { memory: st.memory });
}

var filterForScreeps = function (st) {
    return _.filter(Game.creeps, (creep) => creep.memory.role === st.memory.role);
}

var CheckMins = function (st) {
    var screeps = filterForScreeps(st);
    return screeps.length < st.min;
}

var CheckAndSpawnMin = function (st) {
    var screeps = filterForScreeps(st);
    var name = st.name + Game.time;

    if (screeps.length < st.min) {
        spawnScreep(st, name);
    }
}

var CheckAndSpawnLimit = function (st) {
    var screeps = filterForScreeps(st);
    var name = st.name + Game.time;

    if (screeps.length < st.limit) {
        spawnScreep(st, name);
    }
}

var SpawnerSay = function(text) {
    Spawner().room.visual.text(
        text,
        Spawner().pos.x + 1,
        Spawner().pos.y,
        { align: 'left', opacity: 0.8 })
}

module.exports =
{
    run: function () {
        var harvesters = filterForScreeps(ScreepType.harvester);
        var builders = filterForScreeps(ScreepType.builder);
        var haulers = filterForScreeps(ScreepType.hauler);

        //------------------------------------------------------------
        // Ensure minimums are met...
        if (CheckMins(ScreepType.harvester)
            || CheckMins(ScreepType.builder)
            || CheckMins(ScreepType.hauler)) 
        {
            CheckAndSpawnMin(ScreepType.stem);
            CheckAndSpawnMin(ScreepType.harvester);
            CheckAndSpawnMin(ScreepType.hauler);
            CheckAndSpawnMin(ScreepType.builder);
        }
        else {
            // suicide all stems.
            var stems = filterForScreeps(ScreepType.stem);
            for(var stem in stems) 
            {
                console.log(stem)
                var stem = Game.creeps[stem];
                if(!!stem) 
                {
                    stem.suicide();
                }
            }
            // plenty of screeps, ensure that we reach limits.
            CheckAndSpawnMin(ScreepType.harvester);
            CheckAndSpawnLimit(ScreepType.builder);
            CheckAndSpawnMin(ScreepType.hauler);
        }

        if (Spawner().spawning) {
            var spawningCreep = Game.creeps[Spawner().spawning.name];
            SpawnerSay(spawningCreep.memory.role);
        }
        
        var roomEnergy = Game.rooms[Spawner().room.name].energyAvailable;
        SpawnerSay(Spawner().room.name + ' energy: ' + roomEnergy);
    }
}
