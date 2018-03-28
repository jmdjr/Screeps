//------------------------------------------------------------------------------------------------------
// role.secretary

var cUtility = require('creepUtility');
var ledger = [];
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
                var closest = cUtility.FindClosest(creep, targets);
                if(closest.length > 0)
                {
                    creep.memory.target = closest[0].id;
                }
            }
        }

        if(creep.memory.target != null && creep.memory.delivering) 
        {
            var target = Game.getObjectById(creep.memory.target);

            if(target && target.carry.energy >= target.carryCapacity)
            {
                creep.memory.target = null;
                creep.memory.delivering = false;
            }
            
            cUtility.MoveToDo(creep, (c, t) => c.transfer(t, RESOURCE_ENERGY), Game.getObjectById(creep.memory.target), false);


        }
        
        if(!creep.memory.delivering && creep.memory.target == null)
        {
            cUtility.GrabFromDroppedEnergy(creep);
        }
    }
};