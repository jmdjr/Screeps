
var OM = require('OverMind');

// the overmind has just 
if(!OM.IsAwake)
{
    console.log("test awake");
    OM.IsAwake = true;
}

module.exports.loop = function () {
    //Overmind needs to look at rooms, and try and work towards completing their objectives.
    // - look at first room
    //    - room report current objective (upgrading: needs a constant upgrader with energy flowing to them.)
    //       - upgrader 

    console.log("tick");
}