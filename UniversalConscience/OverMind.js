
module.exports =
{
    OverMind: {
        Memory: {
            IsAwake: false,
            Rooms: []
        },
        AddAllAvailableRooms:function() {
            for(const i in Game.rooms) {
                var room = Game.rooms[i];
                this.Memory.Rooms.push(room);
                room.Memory = {
                    Objective: "Testing..."
                };
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
            // console.log("initialize overmind");
            
            this.OverMind.AddAllAvailableRooms();
            this.OverMind.Memory.IsAwake = true;
        }
        else
        {
            this.OverMind.Memory = Memory.OverMind;
            // console.log("overmind remembers");
        }
    },

}