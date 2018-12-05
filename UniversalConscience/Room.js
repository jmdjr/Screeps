// A Room.

var Order = require('Order');
var Task = require('Task');

var Room = function (data) {
    this.raw = data;
    this.name = data.name;
    this.sources = data.find(FIND_SOURCES);
    this.spawns = data.find(FIND_MY_SPAWNS);

    this.controller = data.controller;
    this.Tasks = [];
    this.ObjectiveId = 0;
    this.ActiveTaskId = 0;

    data.Memory = this;
}


Room.run = function() {
        console.log(`${this.name} is completing tasks...` );
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


module.exports = Room;