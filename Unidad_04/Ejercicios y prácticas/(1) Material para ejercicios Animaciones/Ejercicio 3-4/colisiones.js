const leftInput = $("#left").get(0);
const rightInput = $("#right").get(0);
const topInput = $("#top").get(0);
const bottomInput = $("#bottom").get(0);
const inputPixels = $("#mov").get(0);
const draggableSquare = $("#draggableSquare");
const cuadradoColision = $("#cuadradoFijo");

// Square movement
const moveElement = (direction, pixels) => {
    draggableSquare.css(direction, `+=${pixels}`)
}
rightInput.onclick = () => setTimeout(moveElement, 1000, "left", inputPixels.value);
leftInput.onclick = () => setTimeout(moveElement, 1000, "left", -inputPixels.value);
topInput.onclick = () => setTimeout(moveElement, 1000, "top", -inputPixels.value);
bottomInput.onclick = () => setTimeout(moveElement, 1000, "top", inputPixels.value);

// Drag and drop code
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("square", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var squareID = ev.dataTransfer.getData("square");
    const square = $(`#${squareID}`);
    square.css("top", event.clientY);
    square.css("left", event.clientX);
    // Si la posicion del cuadrado
    if (cuadradoColision.css("top") < square.css("top")
    && cuadradoColision.css("top") + cuadradoColision.css("height") > square.css("top")
    && cuadradoColision.css("left") < square.css("left")
    && cuadradoColision.css("left") + cuadradoColision.css("width") > square.css("left")) {
        $(`#${squareID}`).css("background-color", "red");
    }
}
