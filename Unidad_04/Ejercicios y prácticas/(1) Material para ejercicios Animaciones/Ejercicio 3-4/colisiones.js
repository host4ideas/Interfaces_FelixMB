const leftInput = $("#left").get(0);
const rightInput = $("#right").get(0);
const topInput = $("#top").get(0);
const bottomInput = $("#bottom").get(0);
const inputPixels = $("#mov").get(0);
const draggableSquare = $("#draggableSquare").get(0);

const moveElement = (direction, pixels) => {
    draggableSquare.css(direction, `+=${pixels}`)
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log("test");
    ev.dataTransfer.setData("square", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("square");
    $(`#${data}`).css("background-color", "red");
}

rightInput.onclick = () => setTimeout(moveElement, 1000, "left", inputPixels.value);
leftInput.onclick = () => setTimeout(moveElement, 1000, "left", -inputPixels.value);
topInput.onclick = () => setTimeout(moveElement, 1000, "top", -inputPixels.value);
bottomInput.onclick = () => setTimeout(moveElement, 1000, "top", inputPixels.value);

