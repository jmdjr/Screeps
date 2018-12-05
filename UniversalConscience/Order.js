// the collection of Tasks and Orders needed to fulfill the objectives.

var Task = require('Task');

var Order = function() {
    this.Tasks = [];
}

module.exports = Order;