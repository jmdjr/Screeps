
var OMSystem = require('OverMind');
var primaryObjectives = require('PrimaryObjective');

// the overmind has just 
var Overmind = new OMSystem();
console.log(Overmind.Memory.IsAwake);
Overmind.Awaken();



Memory.Test = {
    test1: 99
    , test2: function() {console.log("test2");}
}

module.exports.loop = function () {
    // Overmind.Think();
}