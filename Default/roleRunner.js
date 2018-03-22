var roleRunners = {};
roleRunners["harvester"] = require('role.harvester');
roleRunners["upgrader"] = require('role.upgrader');
roleRunners["builder"] = require('role.builder');
roleRunners["stem"] = require('role.stem');
roleRunners["hauler"] = require('role.hauler');


module.exports = roleRunners;