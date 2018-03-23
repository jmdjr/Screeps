//------------------------------------------------------------------------------------------------------
// role.upgrader
var cUtility = require('creepUtility');

module.exports = 
{
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) 
        {
            creep.memory.upgrading = false;
            creep.say('harvest');
        }
        
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity)
        {
            creep.memory.upgrading = true;
            creep.say('upgrade');
        }

        if(creep.memory.upgrading) 
        {
            if(!cUtility.MoveToDo(creep, (c, t) => c.upgradeController(t), target, true))
            {
                cUtility.MakeRoad(creep);
            }
        }
        else 
        {
            cUtility.GrabSomeEnergy(creep);
        }
    }
};