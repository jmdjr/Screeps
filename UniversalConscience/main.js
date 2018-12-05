
var Overmind = require('OverMind');
var primaryObjectives = require('PrimaryObjective');
var Room = require('Room');

// the overmind has just 
Overmind.Awaken();
Memory.Overmind.Objectives = primaryObjectives;

module.exports.loop = function () {
    Overmind.Think();
}