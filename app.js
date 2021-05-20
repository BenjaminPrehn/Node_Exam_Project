const express = require('express');
const fs = require('fs');
require('./database/mongoose');

const userRouter = require('./routers/user');


const app = express(); 
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(userRouter);

const login = fs.readFileSync(__dirname + "/public/login.html", "utf-8");
const create = fs.readFileSync(__dirname + "/public/create.html", "utf-8");

app.get("/login", (req, res) => {
    res.send(login);
});

app.get("/create", (req, res) => {
    res.send(create);
});

app.listen(port, (error) => {
    if (error) {
        console.log('There was an issue starting your application');
    }
    console.log('The app is running on port:', port);
})