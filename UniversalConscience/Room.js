// A Room.

var Order = require('Order');
var Task = require('Task');

var Room = function (data) {
    this.raw = data;
    this.name = data.name;
    this.sources = data.find(FIND_SOURCES);
    this.spawns = data.find(FIND_MY_SPAWNS);

    this.controller = data.controller;
    this.
    this.Tasks = [];
    this.ActiveTaskId = 0;
}

module.exports = Room;

Room.prototype = {
    run: function() {

    }
}



Room.TASKS = {
    SpawnMinion: function (data) {
        var task = new Task.ROOM(STRUCTURE_SPAWN, [
            function (data) {
                if (data.structure.spawnCreep(data.MinionBody, data.MinionName)) {

                }
            }
        ]);

        task.data = data;
        return task;
    }
}