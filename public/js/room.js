// =========================
// Room Management
// =========================

const usernameInput = document.getElementById("username");
const roomCodeInput = document.getElementById("roomCode");

const createRoomBtn = document.getElementById("createRoom");
const joinRoomBtn = document.getElementById("joinRoom");

let currentRoom = "";
let currentUsername = "";

// =========================
// Generate Room Code
// =========================

function generateRoomCode() {

    return Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

}

// =========================
// Join Room
// =========================

function joinRoom(roomCode) {

    currentUsername = usernameInput.value.trim();

    if (currentUsername === "") {

        currentUsername = "Guest";

        usernameInput.value = currentUsername;

    }

    currentRoom = roomCode;

    joinSocketRoom(roomCode);

}

// =========================
// Create Room
// =========================

createRoomBtn.addEventListener("click", () => {

    const room = generateRoomCode();

    roomCodeInput.value = room;

    joinRoom(room);

    alert("Room Created!\n\nRoom Code: " + room);

});

// =========================
// Join Existing Room
// =========================

joinRoomBtn.addEventListener("click", () => {

    const room = roomCodeInput.value.trim();

    if (room === "") {

        alert("Please enter a room code.");

        return;

    }

    joinRoom(room);

});