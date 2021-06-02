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
        res.cookie("auth_token", token, { maxAge: 21600000 });
        res.redirect("/");
    } catch (error) {
        res.status(400).send(`<h1> Wrong Credentials</h1> <a href='/login'><h2> Try again please </h2></a> <p> ${error} </p>`);
        
    }
});

// Get user profile
router.get("/users/me", authentication, (req, res) => {
    res.send(req.user);
});

// Update a user
router.post("/users/meUpdate", authentication, async (req, res) => {
    const updates = Object.keys(req.body);

    try{
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });

        await req.user.save();

        res.redirect("/profile");
     
    } catch (error) {
        res.status(400).send(error);
    }
});

// Logout a user
router.post("/users/logout", authentication, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        // res.clearCookie("auth_token");

        res.clearCookie("auth_token").redirect("/login");

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

// Logout all user sessions
router.post("/users/logoutAllSessions", authentication, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.clearCookie("auth_token");
        res.redirect("/login");
    } catch (error) {
        res.status(500).send();
    }
    
});

// Delete an account from the database
router.delete("/users/me", authentication, async (req, res) => {
    try {
        await req.user.remove();

        res.clearCookie("auth_token").send("/login");

    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;