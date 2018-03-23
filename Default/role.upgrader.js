//------------------------------------------------------------------------------------------------------
// role.upgrader
var cUtility = require('creepUtility');

module.exports = 
{
    run: function(creep) 
    {
        var err = creep.upgradeController(creep.room.controller);
        if(err == ERR_NOT_IN_RANGE
        || err == ERR_NOT_ENOUGH_ENERGY) 
        {
            creep.moveTo(creep.room.controller);
            cUtility.MakeRoad(creep);
        }
    }
};