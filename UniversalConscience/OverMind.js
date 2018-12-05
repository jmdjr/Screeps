
var Room = require('Room');


var OverMind = function () {
    this.Memory = {
        IsAwake: false,
        Rooms: [],
        Objectives: []
    }
}

module.exports = OverMind;

OverMind.prototype = {
    AddAllAvailableRooms: function () {
        for (const i in Game.rooms) {
            this.Memory.Rooms.push(new Room(Game.rooms[i]));
        }
    },

    Print: function () {

    },

    InitializeOM: function () {
        if (!Memory.OverMind) {
            Memory.OverMind = this.Memory;
            console.log("initialize overmind");

            this.AddAllAvailableRooms();
            this.DistributeOrders();
            this.Memory.IsAwake = true;
        }
        else {
            this.Memory = Memory.OverMind;
            // this.DistributeOrders();
            console.log("overmind remembers");
        }
    },

    DistributeOrders: function() {
        // console.log("distributing orders");
    },

    run: function() {
        console.log("tick");
    } 
};