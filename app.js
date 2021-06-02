const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const authentication = require('./middelware/authentication.js');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/chat-users');
require('./database/mongoose');
require('dotenv').config();

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const userRouter = require('./routers/user');
const projectsRouter = require('./routers/projects');

const port = process.env.PORT;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

app.use(userRouter);
app.use(projectsRouter);


const login = fs.readFileSync(__dirname + "/public/login.html", "utf-8");
const create = fs.readFileSync(__dirname + "/public/create.html", "utf-8");
const room = fs.readFileSync(__dirname + "/public/room/room.html", "utf-8");
const chat = fs.readFileSync(__dirname + "/public/chat/chat.html", "utf-8");
const projects = fs.readFileSync(__dirname + "/public/projects/projects.html", "utf-8");
const profile = fs.readFileSync(__dirname + "/public/profile/profile.html", "utf-8");
const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");

// Socket IO on connect
io.on("connection", (socket) => {
    console.log("A socket connected with id", socket.id);

    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage("Chat-Bot", "Welcome to the chat!"))

    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit("message", formatMessage("Chat-Bot", `${user.username} joined the chat!`));


    // Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });


    // Listen for chatMessage
    socket.on("chatMessage", (message) => {

        const user = getCurrentUser(socket.id);

        io.to(user.room).emit("message", formatMessage(user.username, message));
    })

    // Runs when a client disconnects
    socket.on("disconnect", () => {

        const user = userLeave(socket.id);

        if(user) {
            io.to(user.room).emit("message", formatMessage("Chat-bot", `${user.username} has left the chat`));

            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

app.get("/login", (req, res) => {
    res.send(login);
});

app.get("/create", (req, res) => {
    res.send(create);
});

app.get("/", authentication, (req, res) => {
    res.send(header + projects + footer);
});

app.get("/room", authentication, (req, res) => {
    res.send(header + room + footer);
});

app.get("/chat", authentication, (req, res) => {
    res.send(chat);
});

app.get("/profile", authentication, (req, res) => {
    res.send(header + profile + footer);
});

server.listen(port, (error) => {
    if (error) {
        console.log('There was an issue starting your application');
    }
    console.log('The app is running on port:', port);
})