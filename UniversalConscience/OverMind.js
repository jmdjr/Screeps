
var Cell = require('Cell');
var OverMind = {};
module.exports = OverMind;

OverMind.Memory = {
    IsAwake: false,
    Cells: [],
    Objectives: []
}

OverMind.AddAllAvailableCells = function () {
    for (const i in Game.rooms) {
        var cell = new Cell(Game.rooms[i]);
        this.Memory.Cells.push(cell.name);
    }
}

OverMind.Print = function () {
};

OverMind.Awaken = function () {
    if (!Memory.OverMind) {
        console.log("Overmind Awakens");
        Memory.Overmind = this.Memory;

        this.AddAllAvailableCells();
        this.DistributeOrders();
        this.Memory.IsAwake = true;
    }
    else {
        console.log("overmind remembers");
        this.Memory = Memory.Overmind;

        this.DistributeOrders();
    }
};

OverMind.DistributeOrders = function () {

};

OverMind.Think = function () {
    console.log("thinking...");
    for (var idx in Game.rooms) {
        var room = Game.rooms[idx];
        Cell.run.call(room);
    }
};