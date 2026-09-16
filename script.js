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


// DOM elements

const display = document.querySelector(".display");

const numberButtons = document.querySelectorAll(
    ".buttons button"
);

const operatorButtons = document.querySelectorAll(
    ".buttons button"
);

const equalsButton = [...document.querySelectorAll(".buttons button")]
    .find(button => button.textContent === "=");

const clearButton = [...document.querySelectorAll(".buttons button")]
    .find(button => button.textContent === "C");


// Calculator state

let displayValue = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;


// Display

function updateDisplay() {
    display.textContent = displayValue;
}


// Numbers

function inputNumber(number) {

    if (waitingForSecondNumber) {
        displayValue = number;
        waitingForSecondNumber = false;
    } else if (displayValue === "0") {
        displayValue = number;
    } else {
        displayValue += number;
    }

    updateDisplay();
}


// Operators

function selectOperator(selectedOperator) {

    firstNumber = Number(displayValue);
    operator = selectedOperator;

    waitingForSecondNumber = true;
}


// Equals

function calculate() {

    if (
        firstNumber === null ||
        operator === null ||
        waitingForSecondNumber
    ) {
        return;
    }

    const secondNumber = Number(displayValue);

    const result = operate(
        operator,
        firstNumber,
        secondNumber
    );

    displayValue = String(result);

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;

    updateDisplay();
}


// Clear

function clearCalculator() {

    displayValue = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;

    updateDisplay();
}


// Number buttons

numberButtons.forEach(button => {

    const value = button.textContent;

    if (/^\d$/.test(value)) {

        button.addEventListener("click", () => {
            inputNumber(value);
        });

    }

});


// Operator buttons

numberButtons.forEach(button => {

    const value = button.textContent;

    if (["+", "-", "*", "/"].includes(value)) {

        button.addEventListener("click", () => {
            selectOperator(value);
        });

    }

});


// Equals

equalsButton.addEventListener("click", calculate);


// Clear

clearButton.addEventListener("click", clearCalculator);


updateDisplay();