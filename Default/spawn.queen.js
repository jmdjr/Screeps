//------------------------------------------------------------------------------------------------------
// spawnQueen

var harvester = [WORK, WORK, WORK, MOVE, MOVE];
var minHarvesters = 2;

var builder = [WORK, MOVE, CARRY];
var minBuilders = 3;

var hauler = [CARRY, CARRY, WORK, MOVE, MOVE];
var minhaulers = 5;

var Spawner = function() {return Game.spawns['queen']; }

var checkHarvester = function(nextName) { return Spawner().spawnCreep(harvester, nextName, {memory: {role: 'harvester'}, dryRun: true}); }
var spawnHarvester = function(nextName) { return Spawner().spawnCreep(harvester, nextName, {memory: {role: 'harvester'}}); }

var checkBuilder = function(nextName) { return Spawner().spawnCreep(builder, nextName, {memory: {role: 'harvester'}, dryRun: true}); }
var spawnBuilder = function(nextName) { return Spawner().spawnCreep(builder, nextName, {memory: {role: 'harvester'}}); }

var spawnQueen = 
{
    run: function() 
    {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;

        if(harvesters < minHarvesters) 
        {
            var nextName = 'Harvester' + Game.time;
    
            console.log('Spawning new harvester: ' + nextName);
            
            if(checkBuilder(nextName) == OK)
            {
                spawnBuilder(nextName);
            }
            else if(checkHarvester(nextName) == OK)
            {
                spawnHarvester(nextName);
            }
        }
        
        if(Game.spawns['queen'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['queen'].spawning.name];
            Game.spawns['queen'].room.visual.text(
                '🛠️ ' + spawningCreep.memory.role,
                Game.spawns['queen'].pos.x + 1, 
                Game.spawns['queen'].pos.y, 
                {align: 'left', opacity: 0.8});
        }
    
    }
}

module.exports = spawnQueen;