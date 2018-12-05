var primaryObjectives = require('PrimaryObjective');
var Overmind = require('OverMind');
var Cell = require('Cell');

// the overmind has just 
Overmind.Awaken();
Memory.Overmind.Objectives = primaryObjectives;

module.exports.loop = function () {
    Overmind.Think();
}