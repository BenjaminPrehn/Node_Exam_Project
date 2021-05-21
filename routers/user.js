const express = require('express');
const router = new express.Router();
const authentication = require('../middelware/authentication.js');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const User = require('../models/user');


// Create a new user
router.post("/users/create", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        
        res.status(201).redirect("/login")
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login a user
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.cookie("auth_token", token);
        res.redirect("/");
    } catch (error) {
        res.status(400).send();
    }
});

// Logout a user
router.post("/users/logout", authentication, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.clearCookie("auth_token");
        res.redirect("/login");

    } catch (error) {
        res.status(500).send();
    }
});

// Get user profile
router.get("/users/me", authentication, (req, res) => {
    res.send(req.user);
});

module.exports = router;