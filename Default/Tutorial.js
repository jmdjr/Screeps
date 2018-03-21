
//Game.spawns['queen'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' );

var roleRunners = {};
roleRunners["harvester"] = require('role.harvester');
roleRunners["upgrader"] = require('role.upgrader');
roleRunners["builder"] = require('role.builder');

var spawnQueen = require('spawn.queen');


module.exports.loop = function () 
{    
    for(var name in Game.rooms) 
    {
        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }

    spawnQueen.run();

    for(var name in Game.creeps)
    {
        var creep = Game.creeps[name];
        var role = roleRunners[creep.memory.role];

        if(typeof role !== 'undefined') 
        {
            role.run(creep);
        }
    }
}



// var roleHarvester = require('role.harvester');
// var roleUpgrader = require('role.upgrader');
// var roleBuilder = require('role.builder');

// module.exports.loop = function () {
//     var towers = Game.spawns['queen'].room.find(FIND_STRUCTURES, {
//         filter: (structure) => {
//             return structure.structureType == STRUCTURE_TOWER;
//         }
//     });

//     var tower = Game.getObjectById('9ce47d10a7dacf98e525a83b');
    
//     if(tower) {
//         var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
//             filter: (structure) => structure.hits < structure.hitsMax
//         });
//         if(closestDamagedStructure) {
//             tower.repair(closestDamagedStructure);
//         }

//         var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
//         if(closestHostile) {
//             tower.attack(closestHostile);
//         }
//     }

//     for(var name in Game.creeps) {
//         var creep = Game.creeps[name];
//         if(creep.memory.role == 'harvester') {
//             roleHarvester.run(creep);
//         }
//         if(creep.memory.role == 'upgrader') {
//             roleUpgrader.run(creep);
//         }
//         if(creep.memory.role == 'builder') {
//             roleBuilder.run(creep);
//         }
//     }










//------------------------------------------------------------------------------------------------------
// spawnQueen

var harvester = [WORK, WORK, WORK, MOVE, MOVE];
var minHarvesters = 2;

var builder = [WORK, MOVE, CARRY];
var minBuilders = 3;

var hauler = [CARRY, CARRY, WORK, MOVE, MOVE];
var minhaulers = 5;

var Spawner = function() {return Game.spawns['queen']; }

// var checkBigH = function(nextName) { return Spawner().spawnCreep(harvester, nextName, {memory: {role: 'harvester'}, dryRun: true}); }
// var spawnBigH = function(nextName) { return Spawner().spawnCreep(harvester, nextName, {memory: {role: 'harvester'}}); }

var checkH = function(nextName) { return Spawner().spawnCreep(harvester, nextName, {memory: {role: 'harvester'}, dryRun: true}); }
var spawnH = function(nextName) { return Spawner().spawnCreep(harvester, nextName, {memory: {role: 'harvester'}}); }

var spawnQueen = 
{
    run: function() 
    {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;

        if(harvesters < minHarvesters) 
        {
            var nextName = 'Harvester' + Game.time;
    
            console.log('Spawning new harvester: ' + nextName);
            
            if(checkBigH(nextName) == OK)
            {
                spawnBigH(nextName);
            }
            else if(checkH(nextName) == OK)
            {
                spawnH(nextName);
            }
        }
        
        if(Game.spawns['queen'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['queen'].spawning.name];
            Game.spawns['queen'].room.visual.text(
                '🛠️ ' + spawningCreep.memory.role,
                Game.spawns['queen'].pos.x + 1, 
                Game.spawns['queen'].pos.y, 
                {align: 'left', opacity: 0.8});
        }
    
    }
}

module.exports = spawnQueen;


//------------------------------------------------------------------------------------------------------

Game.spawns['queen'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1', { memory: { role: 'harvester' } } );

Game.spawns['queen'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], 'HarvesterBig', { memory: { role: 'harvester' } } );
//------------------------------------------------------------------------------------------------------
// role.harvester
var roleHarvester = 
{
    run: function(creep) 
    {
        if(creep.carry.energy < creep.carryCapacity) 
        {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else 
        {
            var targets = creep.room.find(FIND_STRUCTURES, 
            {
                filter: (structure) => 
                {
                    return (structure.structureType == STRUCTURE_EXTENSION 
                            || structure.structureType == STRUCTURE_TOWER
                            || structure.structureType == STRUCTURE_SPAWN) 
                        && structure.energy < structure.energyCapacity;
                }
            });

            if(targets.length > 0)
            {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};
    
module.exports = roleHarvester;
//------------------------------------------------------------------------------------------------------


Game.spawns['queen'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1', { memory: { role: 'upgrader' } } );
//------------------------------------------------------------------------------------------------------
// role.upgrader
var roleUpgrader = 
{
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
    
module.exports = roleUpgrader;
//------------------------------------------------------------------------------------------------------


Game.spawns['queen'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1', { memory: { role: 'builder', building: false } } );
//------------------------------------------------------------------------------------------------------
// role.builder
var roleBuilder = {
    
        /** @param {Creep} creep **/
        run: function(creep) {
    
            if(creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
                creep.say('🚧 build');
            }
    
            if(creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    };
    
module.exports = roleBuilder;


//------------------------------------------------------------------------------------------------------
// Defending tower.

Game.spawns['queen'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );