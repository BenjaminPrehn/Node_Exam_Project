const express = require('express');
const authentication = require('../middelware/authentication.js');

const Projects = require('../models/project');

const router = new express.Router();

router.post("/projects", authentication, async (req, res) => {
    const projects = new Projects({
        ...req.body,
        owner: req.user._id
    });

    try {
        await projects.save();
        res.status(201).send(projects);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;