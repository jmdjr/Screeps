
var ROOM = require('Room');

module.exports =
{
    OverMind: {
        Memory: {
            IsAwake: false,
            Rooms: []
        },
        AddAllAvailableRooms:function() {
            for(const i in Game.rooms) {
                var loadedRoom = Game.rooms[i];

                this.Memory.Rooms.push(new ROOM(loadedRoom));
                loadedRoom.memory = {
                    Objective: "Test"
                }
            }
        },
        Print: function() {
            console.log(this.Memory.IsAwake);
        },
    },

    // First things first
    InitializeOM: function() {
        if(!Memory.OverMind) {
            Memory.OverMind = this.OverMind.Memory;
            console.log("initialize overmind");
            
            this.OverMind.AddAllAvailableRooms();
            this.OverMind.Memory.IsAwake = true;
        }
        else
        {
            this.OverMind.Memory = Memory.OverMind;
            this.OverMind.AddAllAvailableRooms();
            console.log("overmind remembers");
        }
    },

}