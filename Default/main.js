
var roleRunners = require('roleRunner');
var spawnQueen = require('spawn.queen');
// var sUtility = require('structureUtility');

module.exports.loop = function () {
    spawnQueen.run();

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = roleRunners[creep.memory.role];

        if (typeof role !== 'undefined') {
            role.run(creep);
        }
    }
}
