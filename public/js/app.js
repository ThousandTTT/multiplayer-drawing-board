// =========================
// Multiplayer Drawing Board
// App Initialization
// =========================

console.log("====================================");
console.log(" Multiplayer Drawing Board Started ");
console.log("====================================");

// =========================
// Clear Chat
// =========================

function clearChat() {

    const chatMessages = document.getElementById("chatMessages");

    if (chatMessages) {

        chatMessages.innerHTML = "";

    }

}

// =========================
// Notify Current Room
// =========================

function updateRoomTitle() {

    if (currentRoom !== "") {

        console.log("Current Room:", currentRoom);

    }

}

// =========================
// Wrap Original joinRoom()
// =========================

const originalJoinRoom = joinRoom;

joinRoom = function(roomCode) {

    clearChat();

    originalJoinRoom(roomCode);

    updateRoomTitle();

};

// =========================
// App Ready
// =========================

window.addEventListener("load", () => {

    console.log("Application Ready");

});