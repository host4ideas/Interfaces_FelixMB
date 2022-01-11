const leftInput = $("#left").get(0);
const rightInput = $("#right").get(0);
const topInput = $("#top").get(0);
const bottomInput = $("#bottom").get(0);
const draggableSquare = $("#draggableSquare").eq(0);

const moveElement = (direction, pixels) => {
    console.log("test");
    draggableSquare.css(direction, `+=15`)
}

rightInput.onclick = () => setTimeout(moveElement, 1000, "left", "15");
leftInput.onclick = () => setTimeout(moveElement, 1000, "right", "15");
