
var Task = require('Task');

var Minion = function(data) {
    this.raw = data;
    this.name = data.name;
    this.Tasks = [];
    this.ActiveTaskId = 0;
    this.RunningTasks = false;
}

Minion.prototype = {
    run: function() {
        if(!this.RunningTasks && this.Tasks.length > 0) {
            this.ActiveTaskId = 0;
        }
    }
}


module.exports = Minion;