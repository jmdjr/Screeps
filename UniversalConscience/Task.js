// the collection of Tasks and Orders needed to fulfill the objectives.

var Task = {
    ROOM: function(structureType, run) {
        this.requiredStructure = structureType;
        this.run = run;
    },
    MINION: function(minionBody, path, structureType, run) {
        this.requiredBody = minionBody;
        this.optimalPath = path;
        this.targetStructure = structureType;
        this.run = run;
    }
}

module.exports = Task;