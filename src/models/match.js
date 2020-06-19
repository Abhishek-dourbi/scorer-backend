const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    firstTeamName: {
        type: String,
        required: true
    },
    secondTeamName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Ongoing', 'Completed', 'Abandoned', 'Tie']
    },
    completed: {
        type: Boolean,
        default: false
    },
    numberOfOvers: {
        type: Number,
        default: 10
    },
    toss: {
        type: String,
        required: true
    },
    teams: [
        {
            name: {
                type: String,
                required: true
            },
            players: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    type: {
                        type: String,
                        enum: ['Batsman', 'Bowler', 'AllRounder', 'Wicketkeeper']
                    },
                    runsScored: {
                        type: Number,
                        default: 0
                    },
                    ballFaced: {
                        type: Number,
                        default: 0
                    },
                    status: {
                        type: String,
                        enum: ['out', 'playing', 'retired']
                    },
                    fours: {
                        type: Number,
                        default: 0
                    },
                    sixes: {
                        type: Number,
                        default: 0
                    },
                    runsConceded: {
                        type: Number,
                        default: 0
                    },
                    wicketsTaken: {
                        type: Number,
                        default: 0
                    },
                    matchesPlayed: {
                        type: Number,
                        default: 0
                    },
                    average: {
                        type: Number,
                        default: 0
                    },
                    strikeRate: {
                        type: Number,
                        default: 0
                    },
                    battingOrder: {
                        type: Number,
                        default: 11
                    },
                    bowlingOrder: {
                        type: Number,
                        default: 11
                    }
                }
            ]
        }
    ],
    firstInningsOvers: [
        {
            over: {
                ball: {
                    type: Number
                },
                batsman: {
                    type: String
                },
                bowler: {
                    type: String
                },
                event: {
                    type: String,
                    enum: ['dot', 'run', 'boundary', 'six', 'wicket', 'wide', 'no', 'leg', 'bye']
                },
                wicket: {
                    type: Boolean
                },
                extras: {
                    type: Boolean
                },
                wicketEvent: {
                    type: String,
                    default: null,
                    enum: ['caught', 'ran', 'caughtBehind', 'caughtAndBowled', 'lbw', null]
                },
                wicketEventThrough: {
                    type: String,
                    default: null
                }
            }
        }
    ],
    secondInningsOvers: [
        {
            over: {
                ball: {
                    type: Number
                },
                batsman: {
                    type: String
                },
                bowler: {
                    type: String
                },
                event: {
                    type: String,
                    enum: ['dot', 'run', 'boundary', 'six', 'wicket', 'wide', 'no', 'leg', 'bye']
                },
                wicket: {
                    type: Boolean
                },
                extras: {
                    type: Boolean
                },
                wicketEvent: {
                    type: String,
                    default: null,
                    enum: ['caught', 'ran', 'caughtBehind', 'caughtAndBowled', 'lbw', null]
                },
                wicketEventThrough: {
                    type: String,
                    default: null
                }
            }
        }
    ],
    firstTeamScore: {
        type: Number,
        default: 0
    },
    secondTeamScore: {
        type: Number,
        default: 0
    },
    firstTeamWickets: {
        type: Number,
        default: 0
    },
    secondTeamWickets: {
        type: Number,
        default: 0
    },
    currentInnings: {
        type: Number,
        enum: [1, 2, null]
    },
    striker: {
        type: String
    },
    nonStriker: {
        type: String
    },
    currentBowler: {
        type: String
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event'
    }
},  {
    timestamps: true
});

const match = mongoose.model(matchSchema);

module.exports = match;
