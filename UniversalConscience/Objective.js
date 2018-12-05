// the collection of Tasks and Orders needed to fulfill the objectives.
var Order = require('Order');

var Objective = function() {
    this.Orders = [];
}

module.exports = Objective;