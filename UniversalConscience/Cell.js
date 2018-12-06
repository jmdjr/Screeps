// A Room.

var Order = require('Order');
var Task = require('Task');

var Cell = function (data) {
    this.sources = data.find(FIND_SOURCES);
    this.spawns = data.find(FIND_MY_SPAWNS);
    this.minions = data.find(FIND_MY_CREEPS);
    
    this.Tasks = [];
    this.ActiveTaskId = 0;
    
    this.ActiveOrder = null;
    data.memory = this;
}

Cell.run = function () {
    if (this.Tasks[this.ActiveTaskId].run(this)) {
        console.log('runned Task...');
    }
}

Cell.CalculateBody = function (minionBody) {
    var cost = 0;
    var body = [];

    for (var char in minionBody) {
        switch (minionBody[char]) {
            case 'M':
                body.push(MOVE);
                cost += BODYPART_COST[MOVE];
                break;
            case 'W':
                body.push(WORK);
                cost += BODYPART_COST[WORK];
                break;
            case 'A':
                body.push(ATTACK);
                cost += BODYPART_COST[ATTACK];
                break;
            case 'C':
                body.push(CARRY);
                cost += BODYPART_COST[CARRY];
                break;
            case 'H':
                body.push(HEAL);
                cost += BODYPART_COST[HEAL];
                break;
            case 'R':
                body.push(RANGED_ATTACK);
                cost += BODYPART_COST[RANGED_ATTACK];
                break;
            case 'T':
                body.push(TOUGH);
                cost += BODYPART_COST[TOUGH];
                break;
            case 'L':
                body.push(CLAIM);
                cost += BODYPART_COST[CLAIM];
                break;
        }
    }

    return {Cost: cost, Body: body};
}

Cell.AssignNewOrder = function(order) {
    this.ActiveOrder = order;
}

Cell.Tasks = {
    SpawnMinion: function (minionBody) {
        var task = new Task({ MinionBody: minionBody },
            function (cell) {
                // convert minionbody string into an array of body parts.

                console.log('Spawn Minion Task');
                
                var calcBody = Cell.CalculateBody(minionBody);
                var name = `${data.MinionBody}_${cell.minions.length}`;

                if (data.structure.spawnCreep(calcBody.Body, name)) {
                    cell.minions.push(name);
                    return true;
                }
                else {
                    return false;
                }
            }
        );
        return task;
    },

    MoveToOpenTarget: function (requiredBody, structureTarget) {
        var task = new Task({},
            function (cell) {
                
            }
        );

        return task;
        // find an available minion that has the required body to move to a source.
    }
}


module.exports = Cell;