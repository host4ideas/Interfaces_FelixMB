const leftInput = $("#left").get(0);
const rightInput = $("#right").get(0);
const topInput = $("#top").get(0);
const bottomInput = $("#bottom").get(0);
const inputPixels = $("#mov").get(0);
const draggableSquare = $("#draggableSquare");
const cuadradoColision = $("#cuadradoFijo");

// Square movement
const moveElement = (direction, pixels) => {
    draggableSquare.get(0).animate([
        { transform: `translate${direction}(${pixels}px)` }
    ], {
        duration: 1000,
    });
    setTimeout(() => {
        if (direction == "X") {
            draggableSquare.css("left", `+=${pixels}`)
        } else {
            draggableSquare.css("top", `+=${pixels}`)
        }
    }, 1000)
}

rightInput.onclick = () => moveElement("X", inputPixels.value);
leftInput.onclick = () => moveElement("X", -inputPixels.value);
topInput.onclick = () => moveElement("Y", -inputPixels.value);
bottomInput.onclick = () => moveElement("Y", inputPixels.value);

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
    // event.clientX is deprecated
    square.css("top", ev.clientY);
    square.css("left", ev.clientX);
    // Get the four squares
    squareRect = square.get(0).getBoundingClientRect();
    colisionRect = cuadradoColision.get(0).getBoundingClientRect();
    console.log(squareRect);
    console.log(colisionRect);
    // 
    if (colisionRect["top"] < squareRect["top"]
        && colisionRect["bottom"] > squareRect["bottom"]
        && colisionRect["left"] < squareRect["left"]
        && colisionRect["right"] > squareRect["right"]) {
        draggableSquare.css("background-color", "red");
    } else {
        draggableSquare.css("background-color", "greenyellow");
    }
}
