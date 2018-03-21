var roleRunners = {};
roleRunners["harvester"] = require('role.harvester');
roleRunners["upgrader"] = require('role.upgrader');
roleRunners["builder"] = require('role.builder');

var spawnQueen = require('spawn.queen');


module.exports.loop = function () 
{    
    for(var name in Game.rooms) 
    {
        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }

    spawnQueen.run();

    for(var name in Game.creeps)
    {
        var creep = Game.creeps[name];
        var role = roleRunners[creep.memory.role];

        if(typeof role !== 'undefined') 
        {
            role.run(creep);
        }
    }
}
