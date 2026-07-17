// =========================
// Canvas
// =========================

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 600;

// Prevent page scrolling while drawing on touch devices
canvas.style.touchAction = "none";

// =========================
// Drawing State
// =========================

let drawing = false;
let lastX = 0;
let lastY = 0;

// =========================
// Get Pointer Position
// =========================

function getPointerPosition(event) {

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

    ctx.lineJoin = "round";

    ctx.stroke();

}

// =========================
// Pointer Down
// =========================

canvas.addEventListener("pointerdown", (event) => {

    event.preventDefault();

    drawing = true;

    canvas.setPointerCapture(event.pointerId);

    const pos = getPointerPosition(event);

    lastX = pos.x;
    lastY = pos.y;

});

// =========================
// Pointer Move
// =========================

canvas.addEventListener("pointermove", (event) => {

    if (!drawing) return;

    event.preventDefault();

    const pos = getPointerPosition(event);

    drawLine(

        lastX,
        lastY,

        pos.x,
        pos.y,

        currentColor,
        currentBrushSize

    );

    sendDraw({

        x0: lastX,
        y0: lastY,

        x1: pos.x,
        y1: pos.y,

        color: currentColor,

        size: currentBrushSize

    });

    lastX = pos.x;
    lastY = pos.y;

});

// =========================
// Pointer Up
// =========================

function stopDrawing(event) {

    drawing = false;

    try {

        canvas.releasePointerCapture(event.pointerId);

    } catch (e) {}

}

canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointercancel", stopDrawing);
canvas.addEventListener("pointerleave", stopDrawing);

// =========================
// Resize Canvas
// =========================

window.addEventListener("resize", () => {

    // Reserved for future responsive scaling.

});