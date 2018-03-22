var ScreepType = {
    stem: {
        signature: [CARRY, CARRY, WORK, MOVE, MOVE],
        limit: 3,
        min: 2,
        name: "stem",
        memory: { role: 'stem', target: null }
    },

    hauler: {
        signature: [CARRY, CARRY, WORK, MOVE, MOVE],
        limit: 3,
        min: 2,
        name: "hauler",
        memory: { role: 'hauler', target: null }
    },

    builder: {
        signature: [CARRY, WORK, WORK, MOVE],
        limit: 3,
        min: 1,
        name: "builder",
        memory: { role: 'builder', building: false, target: null }
    },
    harvester: {
        signature: [WORK, WORK, MOVE, MOVE],
        limit: 2,
        min: 1,
        name: "harvester",
        memory: { role: 'harvester', target: null }
    }
}