//------------------------------------------------------------------------------------------------------
// spawnQueen
var cUtility = require('creepUtility');
var CreepType = cUtility.CreepType;
var CreepOrder = cUtility.CreepOrder;

var Spawner = function () { return _.first(_.toArray(Game.spawns)); }

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
        return true;
    }

    return false;
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

var spawnTypeId = 0;

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
            if(spawnTypeId < CreepOrder.length)
            {
                if(!CheckAndSpawnMin(CreepType[CreepOrder[spawnTypeId]]))
                {
                    spawnTypeId += 1;
                }
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
