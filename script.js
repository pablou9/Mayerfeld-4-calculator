function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {

    switch (operator) {

        case "+":
            return add(a, b);

        case "-":
            return subtract(a, b);

        case "*":
            return multiply(a, b);

        case "/":
            return divide(a, b);

        default:
            return null;
    }
}


// Display
const display = document.querySelector(".display");

// Store the value currently shown on the display
let displayValue = "0";


// Update the calculator display
function updateDisplay() {
    display.textContent = displayValue;
}


// Add a number to the display
function inputNumber(number) {

    if (displayValue === "0") {
        displayValue = number;
    } else {
        displayValue += number;
    }

    updateDisplay();
}


// Select all number buttons
const numberButtons = document.querySelectorAll(".buttons button");


// Add event listeners to number buttons
numberButtons.forEach(button => {

    if (!isNaN(button.textContent)) {

        button.addEventListener("click", () => {
            inputNumber(button.textContent);
        });

    }

});


updateDisplay();