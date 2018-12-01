
module.exports =
{
    OverMind: {
        Memory: {
            IsAwake: false,
            Rooms: [],
            Sources: []
        },
        Print: function() {
            console.log(this.Memory.IsAwake);
        } 
    },

    // First thing, WakeUp
    InitializeOM: function() {
        if(!Memory.OverMind) {
            Memory.OverMind = this.OverMind.Memory;
            console.log("initialize overmind");
            this.OverMind.Print();
            this.OverMind.Memory.IsAwake = true;
        }
        else
        {
            this.OverMind.Memory = Memory.OverMind;
            console.log("overmind remembers");
            this.OverMind.Print();
        }
    },

}