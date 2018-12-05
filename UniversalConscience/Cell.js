// A Room.

var Order = require('Order');
var Task = require('Task');

var Cell = function (data) {
    this.sources = data.find(FIND_SOURCES);
    this.spawns = data.find(FIND_MY_SPAWNS);
    this.Tasks = [];
    this.ObjectiveId = 0;
    this.ActiveTaskId = 0;

    data.memory = this;
}

Cell.run = function() {
        console.log(`${this.name} is completing tasks...` );
}

Cell.TASKS = {
    SpawnMinion: function (data) {
        var task = new Task.CELL(STRUCTURE_SPAWN, [
            function (data) {
                if (data.structure.spawnCreep(data.MinionBody, data.MinionName)) {

                }
            }
        ]);

        task.data = data;
        return task;
    }
}


module.exports = Cell;