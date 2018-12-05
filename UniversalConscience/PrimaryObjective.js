
var Objective = require('Objective');
var Order = require("Order");
var Room = require("Room");

var PrimaryObjective = new Objective();

PrimaryObjective.Orders = [
    ProduceEnergySupplyChain
];

var ProduceEnergySupplyChain = new Order();
ProduceEnergySupplyChain.Tasks = [
    Room.TASKS.SpawnMinion;
]


module.exports = PrimaryObjective;