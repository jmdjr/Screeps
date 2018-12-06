// the collection of Tasks and Orders needed to fulfill the objectives.

var Task = function(data, action) {
    this.data = data;
    this.action = action;
}

module.exports = Task;


Task.prototype = {
    run: function(context) {
        this.action(context);
    }
}
