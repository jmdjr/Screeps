// A Room.

var Order = require('Order');
var Task = require('Task');

var Room = function(data) {
    this.raw = data;
    this.name = data.name;
    this.sources = data.find(FIND_SOURCES); 
    this.spawns = data.find(FIND_MY_SPAWNS);
    this.controller = data.controller;
    // this.Orders = 
}


module.exports = Room;