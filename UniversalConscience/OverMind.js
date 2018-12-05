
var Room = require('Room');
var OverMind = {};
module.exports = OverMind;

OverMind.Memory = {
    IsAwake: false,
    Rooms: [],
    Objectives: objectives
}

OverMind.AddAllAvailableRooms = function () {
    for (const i in Game.rooms) {
        this.Memory.Rooms.push(new Room(Game.rooms[i]));
    }
}

OverMind.Print = function () {
};

OverMind.Awaken = function () {
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
};

OverMind.DistributeOrders = function () {

};

OverMind.Think = function () {
    console.log("thinking...");
    // for(var indx = 0; indx < this.Memory.Rooms; ++indx)
    // {
    // var room = this.Memory.Rooms[0];
    // console.log(room);
    // Room.run.call(room);
    // }
};