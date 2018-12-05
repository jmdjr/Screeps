
var OMSystem = require('OverMind');
var primaryObjectives = require('PrimaryObjective');
var Room = require('Room');

// the overmind has just 
// var Overmind = new OMSystem();
// Overmind.Awaken();

Memory.Test = {
    name: "Test 1"
}

Memory.Room = new Room(Game.rooms[0]);

Room.run.call(Memory.Test);

module.exports.loop = function () {
    // Overmind.Think();
}