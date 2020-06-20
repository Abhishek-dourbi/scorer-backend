import express from 'express';
import Event from '../models/event';
import mongoose from 'mongoose';
const router = express.Router();
import auth from '../middlewares/auth';

router.post('/events', auth, async (req, res) => {
    try {
        const {header, type, numberOfTeams, numberOfMatches} = req.body;
        let tourMatches = 0;

        if(type === "Exhibition" && numberOfTeams > 2) {
            res.status(400).send({error: 'No more than 2 teams allowed in an exhibition match'})
            return;
        }

        if(type === "Tournament") {
            if (header === "Single") {
                tourMatches = ((numberOfTeams * (numberOfTeams - 1)) / 2);
            } else {
                tourMatches = (numberOfTeams * (numberOfTeams - 1));
            }
            if (numberOfTeams > 4) {
                tourMatches += 4;
            } else {
                tourMatches += 1;
            }
        }

        const event = new Event({
            ...req.body,
            numberOfMatches: type === "Tournament" ? tourMatches : numberOfMatches,
            owner: req.user._id
        });

        await event.save();
        res.status(201).send(event);
    } catch (e) {
        res.status(400).send(e);
    }
});

export default router;
