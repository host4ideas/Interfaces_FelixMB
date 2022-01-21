const inputPixels = $("#mov");
const draggableSquare = $("#draggableSquare");
const cuadradoColision = $("#cuadradoFijo");

// Square movement
const moveElement = (direction, pixels) => {
    var start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;

        // Como queremos un desplazamiento de 200px en 2000 milisegundos, la operación es una regla de tres
        // Por ejemplo, si en 2000 milisegundos son 200px, entonces en 1000 milisegundos serán X
        draggableSquare.css("transform", `translate${direction}(${pixels}px)`);

        if (direction == "X") {
            draggableSquare.css("left", `+=${pixels}`)
        } else {
            draggableSquare.css("top", `+=${pixels}`)
        }

        if (progress < 1000) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);

    // window.requestAnimationFrame(step);

    // draggableSquare.get(0).animate([
    //     { transform: `translate${direction}(${pixels}px)` }
    // ], {
    //     duration: 1000,
    // });
    // setTimeout(() => {
    //     if (direction == "X") {
    //         draggableSquare.css("left", `+=${pixels}`)
    //     } else {
    //         draggableSquare.css("top", `+=${pixels}`)
    //     }
    // }, 1000)
};

$("#left").click(() => moveElement("X", -inputPixels.val()));
$("#right").click(() => moveElement("X", inputPixels.val()));
$("#top").click(() => moveElement("Y", -inputPixels.val()));
$("#bottom").click(() => moveElement("Y", inputPixels.val()));

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
