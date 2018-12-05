
var Room = require('Room');


var OverMind = function (objectives) {
    this.Memory = {
        IsAwake: false,
        Rooms: [],
        Objectives: objectives
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

    Awaken: function () {
        if (!Memory.OverMind) {
            Memory.OverMind = this.Memory;
            console.log("Overmind Awakens");

            this.AddAllAvailableRooms();
            this.DistributeOrders();
            this.Memory.IsAwake = true;
        }
        else {
            this.Memory = Memory.OverMind;
            this.DistributeOrders();
            console.log("overmind remembers");
        }
    },

    DistributeOrders: function() {

    },

    Think: function() {
        for(var room in this.Memory.Rooms)
        {
            room.run();
        }
    } 
};