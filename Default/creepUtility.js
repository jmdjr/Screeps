// utility functions for accessing, assessing and parsing creeps
var FilterCreeps = function (st) {
    return _.filter(Game.creeps, (creep) => creep.memory.role === st.memory.role);
}