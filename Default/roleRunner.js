var roleRunners = {};
var cUtility = require('creepUtility');

for(var names in cUtility.CreepOrder)
{
    roleRunners[name] = require('role.' + name);
}

module.exports = roleRunners;