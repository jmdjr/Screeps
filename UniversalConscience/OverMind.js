
module.exports =
{
    OverMind: {
        Memory: {
            IsAwake: false,
            Rooms: []
        },
        AddAllAvailableRooms:function() {
            for(const i in Game.rooms) {
                // room.Memory = {
                //     Objective: "Testing..."
                // };
                this.Memory.Rooms.push(Game.rooms[i]);
                var testRoom = this.Memory.Rooms[0];
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