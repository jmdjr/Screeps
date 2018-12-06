
var Cell = require('Cell');
var OverMind = {};
module.exports = OverMind;

OverMind._Memory = {
    IsAwake: false,
    Cells: [],
    Objectives: []
}

OverMind.AddAllAvailableCells = function () {
    console.log("Adding Cells");
    for (const i in Game.rooms) {
        var cell = new Cell(Game.rooms[i]);
        this._Memory.Cells.push(cell.name);
    }
}

OverMind.Print = function () {

}

OverMind.Awaken = function () {
    var test = !Memory.Overmind;
    console.log(test);
    if (test) {
        console.log("Overmind Awakens");
        Memory.Overmind = this._Memory;

        this.AddAllAvailableCells();
        this.DistributeOrders();
        this._Memory.IsAwake = true;
    }
    else {
        console.log("overmind remembers");
        this.DistributeOrders();
    }
}

OverMind.DistributeOrders = function () {
    console.log("assigning Orders");
    var cell = this.FindAvailableCell();
    
    if(!cell) { return; }

    var order = this.NextAvailableOrder();

    Cell.AssignNewOrder.call(cell, order);
}

OverMind.NextAvailableOrder = function() {
    return ;
}


OverMind.FindAvailableCell = function() {
    
    var cell = null;

    if(this._Memory.Cells.length > 0)
    {
        cell = Memory.Rooms[this._Memory.Cells[0]];
    }

    console.log(cell);
    return cell;
}

OverMind.Think = function () {
    console.log("thinking...");
    for (var idx in Game.rooms) {
        var room = Game.rooms[idx];
        Cell.run.call(room);
    }
};