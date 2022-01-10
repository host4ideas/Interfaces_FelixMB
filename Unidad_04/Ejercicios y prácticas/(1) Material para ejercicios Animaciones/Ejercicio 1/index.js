let clicked = false;
let timer;
let counter = 0;
const mainContainer = document.getElementById("mainContainer");

const randomColor = () => {
    var colores = Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += colores[Math.floor(Math.random() * 15)];
    }
    return color;
}

const main = () => {
    timer = setInterval(() => timeOutFunction(), 1000);
}

const timeOutFunction = () => {

    var newDiv = document.createElement("div");

    newDiv.id = counter++;
    newDiv.style.height = "50px";
    newDiv.style.backgroundColor = randomColor();
    newDiv.style.margin = "5px";

    newDiv.onclick = () => {
        if (clicked) {
            // Restart timeout
            clicked = false;
            counter = 0;
            // Remove all the childs
            while (mainContainer.firstChild) {
                mainContainer.removeChild(mainContainer.firstChild);
            }
            main();
        } else {
            // Stop timeout
            clicked = true;
            counter = 0;
            clearInterval(timer);
        }
    };

    mainContainer.appendChild(newDiv);
}

main();