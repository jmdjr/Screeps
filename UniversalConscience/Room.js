// A Room.
module.exports = {

    RealizeRoom: function(data) {
        return new this.Room(data);
    },

    Room: function(data) {
        console.log(data.name);
        this.name = data.name;
        this.raw = data;
        this.sources = data.find(FIND_SOURCES) ; // FIND_SOURCES

        console.log(this.sources.join())
    },
}