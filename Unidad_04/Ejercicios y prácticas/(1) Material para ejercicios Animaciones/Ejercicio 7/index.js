let counter = 0;
let timer = 0;
const mainContainer = document.getElementById("mainContainer");

/**
 * Resolves a hexadecimal color by getting random indexes's values and adding a # at the beginning
 * @returns A color in hexadecimal
 */
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
 * Add child divs function and callbacks to iterate until the counter in callAnimate reaches 4
 */
const animationFunction = () => {
    var newDiv = document.createElement("div");
    newDiv.style.height = "50px";
    newDiv.style.backgroundColor = randomColor();
    newDiv.style.margin = "5px";
    mainContainer.appendChild(newDiv);
    counter++;
}

/**
 * We create a timeout function in order to use the same timeout for all the iterations,
 * this way we don't create a new timeout in each iteraction in the callAnimate function.
 * 
 * @param {*} f The provided function as the executed code when the 1000ms timeout expires
 */
const timeoutFunction = (f) => {
    timer = setTimeout(f, 1000);
}

/**
 * This is the 'main' function. Calls timeoutFunction to always use to the same timeout and then resolves
 * the a promise with the provided function which will be called back from animationFunction function.
 * @param {*} callback 
 */
const callAnimate = async (callback) => {
    let promise1 = new Promise(res => {
        timeoutFunction(() => {
            res(callback());
        });
    });

    if (counter < 5) {
        await promise1;
        callAnimate(animationFunction);
    } else {
        counter = 0;
        clearDiv();
        clearTimeout(timer);
        callAnimate(animationFunction);
    }
}

/**
 * Onclick container functionality
 */
mainContainer.onclick = () => {
    counter = 0;
    clearDiv();
    clearTimeout(timer);
    callAnimate(animationFunction);
};

// First call of the program
callAnimate(animationFunction);