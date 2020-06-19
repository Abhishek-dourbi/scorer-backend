const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Tournament', 'Series', 'Exhibition'],
        required: true
    },
    name: {
        type: String,
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
        enum: ['League', 'Completed', 'Abandoned', 'Tie', 'NotStarted', 'Knockout'],
        default: 'NotStarted'
    },
    completed: {
        type: Boolean,
        default: false
    },
    numberOfTeams: {
        type: Number,
        required: true
    },
    knockoutMatches: {
        type: Number,
        default: 0
    },
    numberOfMatches: {
        type: Number,
        required: true
    },
    header: {
        type: String,
        enum: ['Single', 'Double'],
        default: 'Single'
    },
    fixtures: {},
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
}, {
    timestamps: true
});

eventSchema.virtual('matches', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'eventId'
})

const event = mongoose.model('Event', eventSchema);

module.exports = event;
