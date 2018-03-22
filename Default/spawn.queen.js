//------------------------------------------------------------------------------------------------------
// spawnQueen

var ScreepType = require('ScreepType');
var cUtility = require('creepUtility');

var Spawner = function () { return Game.spawns['queen']; }

var checkScreep = function (st, name) {
    return Spawner().spawnCreep(st.signature, name, { memory: st.memory, dryRun: true });
}

var spawnScreep = function (st, name) {

    if (!Game.creeps[name]) {
        delete Memory.creeps[name];
    }

    return Spawner().spawnCreep(st.signature, name, { memory: st.memory });
}


var CheckMins = function (st) {
    var screeps = cUtility.FilterCreeps(st);
    return screeps.length < st.min;
}

var CheckAndSpawnMin = function (st) {
    var screeps = cUtility.FilterCreeps(st);
    var name = st.name + Game.time;

    if (screeps.length < st.min) {
        spawnScreep(st, name);
    }
}

var CheckAndSpawnLimit = function (st) {
    var screeps = cUtility.FilterCreeps(st);
    var name = st.name + Game.time;

    if (screeps.length < st.limit) {
        spawnScreep(st, name);
    }
}

var SpawnerSay = function(text, line) {
    Spawner().room.visual.text(
        text,
        Spawner().pos.x + 1,
        Spawner().pos.y + line,
        { align: 'left', opacity: 0.8 })
}

module.exports =
{
    run: function () {
        var harvesters = cUtility.FilterCreeps(ScreepType.harvester);
        var builders = cUtility.FilterCreeps(ScreepType.builder);
        var haulers = cUtility.FilterCreeps(ScreepType.hauler);

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
            var stems = FilterCreeps(ScreepType.stem);
            for(var stem in stems) 
            {
                var stem = Game.creeps[stem];
                if(!!stem) 
                {
                    stem.suicide();
                }
            }

            // plenty of screeps, ensure that we reach limits.
            CheckAndSpawnLimit(ScreepType.harvester);
            CheckAndSpawnLimit(ScreepType.builder);
            CheckAndSpawnLimit(ScreepType.hauler);
        }

        if (Spawner().spawning) {
            var spawningCreep = Game.creeps[Spawner().spawning.name];
            SpawnerSay(spawningCreep.memory.role, 1);
        }
        
        var roomEnergy = Game.rooms[Spawner().room.name].energyAvailable;
        SpawnerSay(Spawner().room.name + ' energy: ' + roomEnergy, 0);
    }
}
