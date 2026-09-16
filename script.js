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


function roundResult(result) {
    return Math.round(result * 100000000) / 100000000;
}


function operate(operator, a, b) {

    let result;

    switch (operator) {

        case "+":
            result = add(a, b);
            break;

        case "-":
            result = subtract(a, b);
            break;

        case "*":
            result = multiply(a, b);
            break;

        case "/":

            if (b === 0) {
                return "Nice try! You can't divide by zero 😎";
            }

            result = divide(a, b);
            break;

        default:
            return null;
    }

    return roundResult(result);
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

    if (operator !== null && waitingForSecondNumber === false) {

        const result = operate(
            operator,
            firstNumber,
            inputValue
        );

        displayValue = String(result);

        if (typeof result === "number") {
            firstNumber = result;
        }

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

    if (typeof result === "number") {
        firstNumber = result;
    } else {
        firstNumber = null;
    }

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