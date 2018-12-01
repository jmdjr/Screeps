
module.exports =
{
    OverMind: {
        IsAwake: false,
        Rooms: [],
        Print: function() {
        }
    },
    // First thing, WakeUp
    InitializeOM: function() {
        if(!Memory.OverMind) {
            Memory.OverMind = this.OverMind;
            console.log("initialize overmind");
            this.OverMind.Print();
        }
        else
        {
            this.OverMind = Memory.OverMind;
            console.log("reload remembered overmind");
            this.OverMind.Print();
        }
    },

}