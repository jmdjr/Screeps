
module.exports =
{
    OverMind: {
        IsAwake: false,
        Rooms: []
    },
    // First thing, WakeUp
    InitializeOM: function() {
        if(!Memory.OverMind) {
            Memory.OverMind = this.OverMind;
            console.log("initialize overmind");
        }
        else
        {
            this.OverMind = Memory.OverMind;
            console.log("reload remembered overmind");
        }
    },

}