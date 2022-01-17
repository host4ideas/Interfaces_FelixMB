let clicked = false;
let counter = -1;
let timer;
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
    return new Promise((resolve, reject) => {
        timer = setInterval(() => {
            if (counter < 5) {
                var newDiv = document.createElement("div");

                newDiv.style.height = "50px";
                newDiv.style.backgroundColor = randomColor();
                newDiv.style.margin = "5px";
                counter++;

                newDiv.onclick = () => {
                    if (clicked) {
                        // Restart timeout
                        clicked = false;
                        counter = 0;
                        // Remove all the childs
                        clearDiv();
                        callbackFunction();
                    } else {
                        // Stop timeout
                        clicked = true;
                        counter = 0;
                        clearInterval(timer);
                    }
                };

                mainContainer.appendChild(newDiv);
            }

            resolve();
        }, 1000);
    });
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
    animationFunction().then(result => {
        callbackFunction();
    });
}

// First initialization
callbackFunction();