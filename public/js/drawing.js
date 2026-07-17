// =========================
// Canvas
// =========================

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 600;

// =========================
// Drawing State
// =========================

let drawing = false;

let lastX = 0;
let lastY = 0;

// =========================
// Mouse Position
// =========================

function getMousePosition(event) {

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {

        x: (event.clientX - rect.left) * scaleX,

        y: (event.clientY - rect.top) * scaleY

    };

}

// =========================
// Draw Line
// =========================

function drawLine(x0, y0, x1, y1, color, size) {

    ctx.beginPath();

    ctx.moveTo(x0, y0);

    ctx.lineTo(x1, y1);

    ctx.strokeStyle = color;

    ctx.lineWidth = size;

    ctx.lineCap = "round";

    ctx.stroke();

}

// =========================
// Mouse Down
// =========================

canvas.addEventListener("mousedown", (event) => {

    drawing = true;

    const pos = getMousePosition(event);

    lastX = pos.x;
    lastY = pos.y;

});

// =========================
// Mouse Move
// =========================

canvas.addEventListener("mousemove", (event) => {

    if (!drawing) return;

    const pos = getMousePosition(event);

    const currentX = pos.x;
    const currentY = pos.y;

    drawLine(
        lastX,
        lastY,
        currentX,
        currentY,
        currentColor,
        currentBrushSize
    );

    sendDraw({

        x0: lastX,
        y0: lastY,

        x1: currentX,
        y1: currentY,

        color: currentColor,

        size: currentBrushSize

    });

    lastX = currentX;
    lastY = currentY;

});

// =========================
// Mouse Up
// =========================

window.addEventListener("mouseup", () => {

    drawing = false;

});

// =========================
// Mouse Leave
// =========================

canvas.addEventListener("mouseleave", () => {

    drawing = false;

});