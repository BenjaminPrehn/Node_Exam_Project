const socket = io();

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Get username and Room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

//Join chatroom
socket.emit("joinRoom", {username, room});

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);

})

// Message from server
socket.on("message", message => {
    console.log(message);
    outPutMessage(message);

    if (message.username === "Chat-Bot") {
        document.querySelector(".message").style.backgroundColor = "#99C262";
    }

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get message text
    const message = e.target.elements.message.value;

    // Emit message to server
    socket.emit("chatMessage", message);

    // Clear input
    e.target.elements.message.value = "";
    e.target.elements.message.focus();

});

// Output message to DOM
function outPutMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span class="time-right">${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector(".chat-messages").appendChild(div);

};

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
};

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<p>${user.username} </p>`).join('')}
    `
}