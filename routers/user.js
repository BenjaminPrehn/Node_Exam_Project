const express = require('express');
const router = new express.Router();
const authentication = require('../middelware/authentication.js');

const User = require('../models/user');

// Create a new user
router.post("/users/create", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;