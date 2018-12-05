// the collection of Tasks and Orders needed to fulfill the objectives.

var TaskGroup = {
    ROOM: function(structureType, sequence) {
        this.requiredStructure = structureType;
        this.runSequence = sequence;
        this.activeSequenceId = 0;
        this.data = null; // the raw data that is used by the sequence; Defined at design.
        this.IsComplete = false;
    },
    MINION: function(minionBody, path, structureType, sequence) {
        this.requiredBody = minionBody;
        this.optimalPath = path;
        this.targetStructure = structureType;
        this.runSequence = sequence;
        this.activeSequenceId = 0;
        this.data = null;  // any additional relevant data used by the task.
        this.IsComplete = false;
    }
}

module.exports = TaskGroup;

var Task = function() { }

Task.prototype = {
    run: function(reference, data){
        if(runSequence[this.activeSequenceId](reference, data)) {
            this.activeSequenceId += 1;
        }
    }
}

TaskGroup.ROOM.prototype = Task.prototype;
TaskGroup.MINION.prototype = Task.prototype;

