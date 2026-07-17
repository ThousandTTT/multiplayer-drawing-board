// =========================
// Toolbar
// =========================

const colorPicker = document.getElementById("colorPicker");
const brushSlider = document.getElementById("brushSize");

const eraserBtn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear");

// =========================
// Chat
// =========================

const chatInput = document.getElementById("chatInput");
const sendMessageBtn = document.getElementById("sendMessage");

// =========================
// Drawing Settings
// =========================

let currentColor = "#000000";
let currentBrushSize = 3;

// =========================
// Color Picker
// =========================

colorPicker.addEventListener("input", () => {

    currentColor = colorPicker.value;

});

// =========================
// Brush Size
// =========================

brushSlider.addEventListener("input", () => {

    currentBrushSize = Number(brushSlider.value);

});

// =========================
// Eraser
// =========================

eraserBtn.addEventListener("click", () => {

    currentColor = "#FFFFFF";

    colorPicker.value = "#FFFFFF";

});

// =========================
// Clear Board
// =========================

clearBtn.addEventListener("click", () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sendClearBoard();

});

// =========================
// Send Chat
// =========================

function sendCurrentMessage() {

    const message = chatInput.value.trim();

    if (message === "") return;

    sendChatMessage(message);

    chatInput.value = "";

    chatInput.focus();

}

// =========================
// Send Button
// =========================

sendMessageBtn.addEventListener("click", () => {

    sendCurrentMessage();

});

// =========================
// Enter Key
// =========================

chatInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        sendCurrentMessage();

    }

});