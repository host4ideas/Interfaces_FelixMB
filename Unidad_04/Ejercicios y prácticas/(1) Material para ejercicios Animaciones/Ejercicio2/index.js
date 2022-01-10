let counter = 0;
let timer = 0;
const showCounter = document.getElementById("showCounter");
const inputCounter = document.getElementById("inputCounter");
const startCounter = document.getElementById("startCounter");
const stopCounter = document.getElementById("stopCounter");

const main = () => {
    startCounter.onclick = () => {
        timer = setInterval(reducer, 1000, inputCounter.value)
        showCounter.innerText = inputCounter.value;
        counter = inputCounter.value;
    };
    stopCounter.onclick = () => {
        clearInterval(timer);
    };
};

const reducer = (counterValue) => {
    showCounter.innerText = counter;
    counter < 1 ? clearInterval(timer) : counter--
};

main();