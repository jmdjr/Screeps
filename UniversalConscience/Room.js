// A Room.
module.exports = {

    RealizeRoom: function(data) {
        return new this.Room(data);
    },

    Room: function(data) {
        console.log("this possibly works");
        debugger;
    },
}