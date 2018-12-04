// A Room.
module.exports = {
    Room: function(data) {
        console.log("this possibly works");
    },

    RealizeRoom: function(data) {
        return new this.Room(data);
    }
}