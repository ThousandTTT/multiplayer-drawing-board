const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.on("join-room", (data) => {

        if (socket.currentRoom) {
            socket.leave(socket.currentRoom);
        }

        socket.currentRoom = data.room;
        socket.username = data.username;

        socket.join(data.room);

        console.log(`${socket.username} joined ${data.room}`);

        socket.to(data.room).emit("system-message", {
            message: `${socket.username} joined the room`
        });

    });

    socket.on("draw", (data) => {

        if (!socket.currentRoom) return;

        socket.to(socket.currentRoom).emit("draw", data);

    });

    socket.on("clear-board", () => {

        if (!socket.currentRoom) return;

        io.to(socket.currentRoom).emit("clear-board");

    });

    // ==========================
    // CHAT
    // ==========================

    socket.on("chat-message", (message) => {

        if (!socket.currentRoom) return;

        io.to(socket.currentRoom).emit("chat-message", {

            username: socket.username,

            message: message

        });

    });

    socket.on("disconnect", () => {

        if (socket.currentRoom && socket.username) {

            socket.to(socket.currentRoom).emit("system-message", {

                message: `${socket.username} left the room`

            });

        }

        console.log("Disconnected:", socket.id);

    });

});

const PORT = 3000;

server.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});