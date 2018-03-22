//------------------------------------------------------------------------------------------------------
// spawnQueen
var CreepType = require('CreepType');
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
        var harvesters = cUtility.FilterCreeps(CreepType.harvester);
        var builders = cUtility.FilterCreeps(CreepType.builder);
        var haulers = cUtility.FilterCreeps(CreepType.hauler);

        //------------------------------------------------------------
        // Ensure minimums are met...
        if (CheckMins(CreepType.harvester)
            || CheckMins(CreepType.builder)
            || CheckMins(CreepType.hauler)) 
        {
            for(var types = 0; types < CreepType.length; types += 1)
            {
                CheckAndSpawnMin(CreepType[CreepType[types]]);
            }
        }
        else {
            // suicide all stems.
            var stems = cUtility.FilterCreeps(CreepType.stem);

            for(var stem in stems) 
            {
                var stem = Game.creeps[stem];
                if(!!stem) 
                {
                    stem.suicide();
                }
            }

            // plenty of screeps, ensure that we reach limits.

            
            for(var types = 0; types < CreepType.length; types += 1)
            {
                console.log("type: " + CreepType[CreepType[types]]);
                CheckAndSpawnMin(CreepType[CreepType[types]]);
            }
        }

        if (Spawner().spawning) {
            var spawningCreep = Game.creeps[Spawner().spawning.name];
            SpawnerSay(spawningCreep.memory.role, 1);
        }
        
        var roomEnergy = Game.rooms[Spawner().room.name].energyAvailable;
        SpawnerSay(Spawner().room.name + ' energy: ' + roomEnergy, 0);
    }
}
