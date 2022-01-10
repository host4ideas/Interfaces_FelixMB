const leftInput = $("#left");
const rightInput = $("#right").get(0);
const topInput = $("#top").get(0);
const bottomInput = $("#bottom").get(0);
const draggableSquare = $("#draggableSquare").eq(0);

rightInput.onclick = () => setTimeout(draggableSquare.moveElement, 1000, "left", "15");
leftInput.onclick = () => setTimeout(draggableSquare.moveElement, 1000, "right", "15");

const moveElement = (direction, pixels) => {
    this.css(direction, `+=${pixels}`)
}