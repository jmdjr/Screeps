//------------------------------------------------------------------------------------------------------
// spawnQueen
var ScreepType = [];

var name = "stem";
ScreepType.push(name);
ScreepType[name] = 
{
    signature: [CARRY, CARRY, WORK, MOVE, MOVE],
    limit: 3,
    min: 2,
    name: name,
    memory: { role: name, target: null }
};

name = "hauler";
ScreepType.push(name);
ScreepType[name] = 
{
    signature: [CARRY, CARRY, WORK, MOVE, MOVE],
    limit: 3,
    min: 2,
    name: name,
    memory: { role: name, target: null }
};

name = "upgreader";
ScreepType.push(name);
ScreepType[name] = 
{
    signature: [CARRY, WORK, MOVE],
    limit: 3,
    min: 1,
    name: name,
    memory: { role: name, target: null }
};

name = "repairer";
ScreepType.push(name);
ScreepType[name] = 
{
    signature: [CARRY, WORK, MOVE],
    limit: 3,
    min: 1,
    name: name,
    memory: { role: name, target: null }
};

name = "builder";
ScreepType.push(name);
ScreepType[name] = 
{
    signature: [CARRY, WORK, WORK, MOVE],
    limit: 3,
    min: 1,
    name: name,
    memory: { role: name, target: null, building: false }
};

name = "harvester";
ScreepType.push(name);
ScreepType[name] = 
{
    signature: [WORK, WORK, MOVE, MOVE],
    limit: 2,
    min: 1,
    name: name,
    memory: { role: name, target: null }
};

var startScreeps = ["harvester", "hauler", "builder"];

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

var filterForScreeps = function (st) {
    console.log("filter: " + st);
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
        var harvesters = filterForScreeps(ScreepType.harvester);
        var builders = filterForScreeps(ScreepType.builder);
        var haulers = filterForScreeps(ScreepType.hauler);

        //------------------------------------------------------------
        // Ensure minimums are met...
        if (CheckMins(ScreepType.harvester)
            || CheckMins(ScreepType.builder)
            || CheckMins(ScreepType.hauler)) 
        {
            for(var types in ScreepType)
            {
                CheckAndSpawnMin(ScreepType[types]);
            }
        }
        else {
            // suicide all stems.
            var stems = filterForScreeps(ScreepType.stem);
            
            for(var stem in stems) 
            {
                var stem = Game.creeps[stem];
                if(!!stem) 
                {
                    stem.suicide();
                }
            }

            // plenty of screeps, ensure that we reach limits.

            
            for(var types = 0; types < ScreepType.length; types += 1)
            {
                console.log("type: " + ScreepType[ScreepType[types]]);
                CheckAndSpawnMin(ScreepType[ScreepType[types]]);
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
