var roleRunners = {};
var cUtility = require('creepUtility');

for(var name in cUtility.CreepOrder)
{
    roleRunners[cUtility.CreepOrder[name]] = require('role.' + cUtility.CreepOrder[name]);
}

module.exports = roleRunners;