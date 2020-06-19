const express = require('express');
const Match = require('../models/match');
const Event = require('../models/event');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/match', auth, async (req, res) => {
    const {eventId, firstTeamName, secondTeamName} = req.body;
    const event = Event.findById(eventId);

    const matchesPlayed = event.matches.filter(match => (match.firstTeamName === firstTeamName && match.secondTeamName === secondTeamName) || (match.secondTeamName === firstTeamName && match.firstTeamName === secondTeamName))

    if(event.type === "Tournament" && event.header === "Double" && matchesPlayed.length === 2 && event.status !== "Knockout") {
        res.status(400).send({error: `All matches between ${firstTeamName} and ${secondTeamName} has been completed`});
        return ;
    }

    if(event.type === "Tournament" && event.header === "Single" && matchesPlayed.length === 1 && event.status !== "Knockout") {
        res.status(400).send({error: `All matches between ${firstTeamName} and ${secondTeamName} has been completed`});
        return ;
    }

    const match = new Match({
        ...req.body,
        eventId
    });

    try {
        await match.save();
        res.status(201).send(match);
    } catch (e) {
        res.status(400).send(e);
    }
});
