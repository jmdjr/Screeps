
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
            console.log("Overmind Awakens");
            Memory.OverMind = this.Memory;

            this.AddAllAvailableRooms();
            this.DistributeOrders();
            this.Memory.IsAwake = true;
        }
        else {
            console.log("overmind remembers");
            this.Memory = Memory.OverMind;

            this.DistributeOrders();
        }
    },

    DistributeOrders: function() {

    },

    Think: function() {
        for(var room in this.Memory.Rooms)
        {
            Room.run.call(room);
        }
    } 
};