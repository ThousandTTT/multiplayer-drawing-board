// =========================
// Socket.IO
// =========================

const socket = io();

// =========================
// Join Room
// =========================

function joinSocketRoom(roomCode) {

    socket.emit("join-room", {

        room: roomCode,

        username: currentUsername

    });

}

// =========================
// Send Drawing
// =========================

function sendDraw(data) {

    socket.emit("draw", data);

}

// =========================
// Receive Drawing
// =========================

socket.on("draw", (data) => {

    drawLine(

        data.x0,
        data.y0,

        data.x1,
        data.y1,

        data.color,
        data.size

    );

});

// =========================
// Clear Board
// =========================

function sendClearBoard() {

    socket.emit("clear-board");

}

socket.on("clear-board", () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

});

// =========================
// Chat
// =========================

const chatMessages = document.getElementById("chatMessages");

function addMessage(username, message) {

    const div = document.createElement("div");

    div.className = "chat-message";

    div.innerHTML = `<strong>${username}:</strong> ${message}`;

    chatMessages.appendChild(div);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}

function addSystemMessage(message) {

    const div = document.createElement("div");

    div.className = "system-message";

    div.textContent = message;

    chatMessages.appendChild(div);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}

function sendChatMessage(message) {

    socket.emit("chat-message", message);

}

socket.on("chat-message", (data) => {

    addMessage(

        data.username,

        data.message

    );

});

socket.on("system-message", (data) => {

    addSystemMessage(

        data.message

    );

});