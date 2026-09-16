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


// DOM

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");


// Calculator state

let displayValue = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;


// Display

function updateDisplay() {
    display.textContent = displayValue;
}


// Number input

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


// Operator

function selectOperator(nextOperator) {

    const inputValue = Number(displayValue);

    // If there is already an operation waiting,
    // calculate it before storing the new operator.
    if (operator !== null && waitingForSecondNumber === false) {

        const result = operate(
            operator,
            firstNumber,
            inputValue
        );

        displayValue = String(result);
        firstNumber = result;

    } else {

        firstNumber = inputValue;

    }

    operator = nextOperator;
    waitingForSecondNumber = true;

    updateDisplay();
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

    firstNumber = result;
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


// Buttons

buttons.forEach(button => {

    const value = button.textContent;

    if (/^\d$/.test(value)) {

        button.addEventListener("click", () => {
            inputNumber(value);
        });

    }

    else if (["+", "-", "*", "/"].includes(value)) {

        button.addEventListener("click", () => {
            selectOperator(value);
        });

    }

    else if (value === "=") {

        button.addEventListener("click", calculate);

    }

    else if (value === "C") {

        button.addEventListener("click", clearCalculator);

    }

});


updateDisplay();