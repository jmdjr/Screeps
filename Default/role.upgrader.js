//------------------------------------------------------------------------------------------------------
// role.upgrader
var cUtility = require('creepUtility');

module.exports = 
{
    run: function(creep) 
    {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE
        || creep.upgradeController(creep.room.controller) == ERR_NOT_ENOUGH_ENERGY) 
        {
            creep.moveTo(creep.room.controller);
            cUitily.MakeRoad(creep);
        }
    }
};