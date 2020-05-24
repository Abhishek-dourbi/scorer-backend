const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Tournament', 'Series', 'Exhibition'],
        required: true
    },
    numberOfOvers: {
        type: Number,
        default: 10
    },
    winningTeam: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['Ongoing', 'Completed', 'Abandoned', 'Tie']
    },
    completed: {
        type: Boolean,
        default: false
    },
    numberOfTeams: {
        type: Number,
        required: true
    },
    numberOfMatches: {
        type: Number
    },
    teams: [
        {
            name: {
                type: String,
                required: true
            },
            matchesPlayed: {
                type: Number,
                default: 0
            },
            matchesWon: {
                type: Number,
                default: 0
            },
            matchesLost: {
                type: Number,
                default: 0
            },
            points: {
                type: Number,
                default: 0
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
                    }
                }
            ],
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

eventSchema.virtual('matches', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'eventId'
})

const event = mongoose.model('Event', eventSchema);

module.exports = event;
