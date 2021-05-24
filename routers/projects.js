const express = require('express');
const authentication = require('../middelware/authentication.js');

const Projects = require('../models/project');

const router = new express.Router();

// Create a new project
router.post("/projects", authentication, async (req, res) => {
    const projects = new Projects({
        ...req.body,
        owner: req.user._id
    });

    try {
        await projects.save();
        res.status(201).redirect("/projects");
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all projects  
router.get("/projects/all", authentication, async (req, res) => {
    try{
        // const projects = await Projects.find({ });
        // res.send(projects)

        await req.user.populate({
            path: "projects",
            options: {

            }
        }).execPopulate();
        res.send(req.user.projects);

    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

// Delete a single project
router.delete("/projects/:id", authentication, async (req, res) => {
    try {
        const project = await Projects.findOneAndDelete({ _id: req.params.id, owner: req.user._id});

        if(!project) {
            return res.status(404).send();
        }

        res.send(project)
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;