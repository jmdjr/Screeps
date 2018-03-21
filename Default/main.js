var roleRunners = {};
roleRunners["harvester"] = require('role.harvester');
roleRunners["upgrader"] = require('role.upgrader');
roleRunners["builder"] = require('role.builder');
roleRunners["stem"] = require('role.stem');
roleRunners["hauler"] = require('role.hauler');

var spawnQueen = require('spawn.queen');

module.exports.loop = function () 
{    

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
