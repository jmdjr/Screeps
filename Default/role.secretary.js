//------------------------------------------------------------------------------------------------------
// role.secretary

var cUtility = require('creepUtility');
var target = null;
module.exports = 
{
    run: function(creep) 
    {
        if(creep.carry.energy == 0) 
        {
            creep.memory.target = null;
            creep.memory.delivering = false;
        }
        else if(creep.carry.energy >= creep.carryCapacity)
        {
            creep.memory.delivering = true;
        }
            
        if(creep.memory.delivering && creep.memory.target == null) 
        {
            var hungryCreeps = creep.room.find(FIND_MY_CREEPS, { filter: (c) =>  { return c.memory.role != 'hauler' && (c.carry[RESOURCE_ENERGY] < c.carryCapacity); } });
            
            var targets = _.toArray(hungryCreeps);

            if(targets != null)
            {
                creep.memory.target = cUtility.FindClosest(creep, targets)[0];
            }
        }

        if(creep.memory.target != null && creep.memory.delivering) 
        {
            cUtility.MoveToDo(creep, (c, t) => c.transfer(t, RESOURCE_ENERGY), creep.memory.target, false);
        }
    }
};