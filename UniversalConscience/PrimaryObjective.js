
var Objective = require('Objective');
var Order = require("Order");
var Cell = require("Cell");

var PrimaryObjective = new Objective();

PrimaryObjective.Orders = [
    ProduceEnergySupplyChain,
];

var ProduceEnergySupplyChain = new Order();
ProduceEnergySupplyChain.Tasks = [
    Cell.Tasks.SpawnMinion("MMMCW")
]

module.exports = PrimaryObjective;