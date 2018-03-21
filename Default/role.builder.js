//------------------------------------------------------------------------------------------------------
// role.builder
module.exports = {
        run: function(creep) {
            
            if(!creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

                if(targets.length) {
                    creep.memory.target = targets[0].id;

                    target = Game.getObjectById(creep.memory.target.id);

                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    else 
                    {
                        creep.memory.building = true;
                    }
                }
            }
            else
            {
                var target = Game.getObjectById(creep.memory.target.id);
                
                if(target == null 
                    || target.progress == target.progressTotal) 
                {
                    creep.memory.building = false;
                }
                else if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // else {
            //     var sources = creep.room.find(FIND_SOURCES);
            //     if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            //     }
            // }
        }
    };