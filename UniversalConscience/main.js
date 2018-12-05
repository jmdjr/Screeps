
var OMSystem = require('OverMind');
var primaryObjectives = require('PrimaryObjective');

// the overmind has just 
var Overmind = new OMSystem(primaryObjectives);
console.log(Overmind.Memory.IsAwake);
// Overmind.Awaken();

module.exports.loop = function () {
    // Overmind.Think();
}