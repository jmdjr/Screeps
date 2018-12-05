
var OMSystem = require('OverMind');
var primaryObjectives = require('PrimaryObjective');

// the overmind has just 
// var Overmind = new OMSystem();
// Overmind.Awaken();



Memory.Test = {
    test1: {name: "Test 1"}
}

var test2 = function() {
    console.log(`${this.name} is only a test...`);
}

test2.call(Memory.Test);

module.exports.loop = function () {
    // Overmind.Think();
}