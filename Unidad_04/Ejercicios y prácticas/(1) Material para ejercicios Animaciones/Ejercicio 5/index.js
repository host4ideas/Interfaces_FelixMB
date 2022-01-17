let counter = 0;
let timer = 0;
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
 * Clear function
 */
const clearDiv = () => {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
};

/**
 * Add child divs function
 */
const animationFunction = () => {
    var newDiv = document.createElement("div");
    newDiv.style.height = "50px";
    newDiv.style.backgroundColor = randomColor();
    newDiv.style.margin = "5px";
    mainContainer.appendChild(newDiv);
    counter++;
    callAnimate(animationFunction);
}

/**
 * We create a timeout function in order to use the same timeout for all the iterations,
 * this way we don't create a new timeout in each iteraction in the callAnimate function
 */
const timeoutFunction = (f) => {
    timer = setTimeout(f, 1000);
}

function callAnimate(callback) {
    if (counter < 5) {
        return new Promise(resolve => {
            timeoutFunction(() => {
                resolve(callback());
            });
        });
    }
}

/**
 * Onclick container funcitonality
 */
mainContainer.onclick = () => {
    counter = 0;
    clearDiv();
    clearTimeout(timer);
    callAnimate(animationFunction);
};

// First call of the program
callAnimate(animationFunction);