const express = require('express');
const router = new express.Router();
const authentication = require('../middelware/authentication.js');
const fs = require('fs');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const home = fs.readFileSync(__dirname + "/../public/home.html", "utf-8");
const login = fs.readFileSync(__dirname + "/../public/login.html", "utf-8");

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
        res.send({token});
    } catch (error) {
        res.status(400).send();
    }
});

module.exports = router;