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

/**
 * Function with a timeout
 */

const animationFunction = () => {
    var newDiv = document.createElement("div");

    newDiv.style.height = "50px";
    newDiv.style.backgroundColor = randomColor();
    newDiv.style.margin = "5px";
    mainContainer.appendChild(newDiv);
}

/**
 * Clear function
 */

const clearDiv = () => {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
};

const callbackFunction = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("test");
            counter++;
            counter < 5 && animationFunction();
        }, 1000);

        mainContainer.onclick = () => {
            counter = 0;
            clearDiv();
            callbackFunction();
        };
        counter = 0;
        clearDiv();
        callbackFunction();
    })
}

// First initialization
callbackFunction();