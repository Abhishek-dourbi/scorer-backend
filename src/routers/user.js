const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');
const router = new express.Router();
const auth = require('../middlewares/auth');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
   try {
       const user = await User.findByCredentials(req.body.email, req.body.password);
       const token = await user.generateAuthToken();
       if(user) {
           res.send({user, token});
       }
   } catch (e) {
       res.status(400).send(e);
   }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.get('/users/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        res.send(user);
    } catch (e) {
        if(e instanceof mongoose.CastError) {
            res.status(404).send("User doesn't exists");
        }
        res.status(400).send(e);
    }
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'password', 'email', 'age'];
    const isValidOperation = updates.every((ele) => allowedUpdates.includes(ele));

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'});
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });     // Won't work with mongoose schema middlewares
        res.send(req.user);
    } catch (e) {
        if(e instanceof mongoose.CastError) {
            res.status(404).send("User doesn't exists");
        }
        res.status(400).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        if(e instanceof mongoose.CastError) {
            res.status(404).send("User doesn't exists");
        }
        res.status(500).send(e);
    }
});

module.exports = router;
