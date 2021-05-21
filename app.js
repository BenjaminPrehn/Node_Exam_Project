const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const authentication = require('./middelware/authentication.js');
require('./database/mongoose');

const userRouter = require('./routers/user');
const projectsRouter = require('./routers/projects');

const app = express(); 
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

app.use(userRouter);
app.use(projectsRouter);

const login = fs.readFileSync(__dirname + "/public/login.html", "utf-8");
const create = fs.readFileSync(__dirname + "/public/create.html", "utf-8");
const home = fs.readFileSync(__dirname + "/public/home/home.html", "utf-8");
const projects = fs.readFileSync(__dirname + "/public/projects/projects.html", "utf-8");
const profile = fs.readFileSync(__dirname + "/public/profile/profile.html", "utf-8");
const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");

app.get("/login", (req, res) => {
    res.send(login);
});

app.get("/create", (req, res) => {
    res.send(create);
});

app.get("/", authentication, (req, res) => {
    res.send(header + home + footer);
});

app.get("/projects", authentication, (req, res) => {
    res.send(header + projects + footer);
});

app.get("/profile", authentication, (req, res) => {
    res.send(header + profile + footer);
});

app.listen(port, (error) => {
    if (error) {
        console.log('There was an issue starting your application');
    }
    console.log('The app is running on port:', port);
})