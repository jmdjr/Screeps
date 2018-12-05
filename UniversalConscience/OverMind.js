
var Room = require('Room');
var OverMind = {};
module.exports = OverMind;

OverMind.Memory = {
    IsAwake: false,
    Rooms: [],
    Objectives: []
}

OverMind.AddAllAvailableRooms = function () {
    for (const i in Game.rooms) {
        var room = new Room(Game.rooms[i]);
        this.Memory.Rooms.push(room.name);
    }
}

OverMind.Print = function () {
};

OverMind.Awaken = function () {
    if (!Memory.OverMind) {
        console.log("Overmind Awakens");
        Memory.Overmind = this.Memory;

        this.AddAllAvailableRooms();
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
        console.log(room);
        Room.run.call(room);
    }
};