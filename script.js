class Calculator {
    constructor(previousOperandandTextElement, currentOperandandTextElement) {
        this.previousOperandandTextElement = previousOperandandTextElement;
        this.currentOperandandTextElement = currentOperandandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';


    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        // this.currentOperand = this.currentOperand.toString().slice(1, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.coumpute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''

    }
    coumpute() {
        let computation
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = '';
        this.previousOperand = '';
    }
    /////corner case//////////
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });//for comma's
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }

    }
    ///////////////////////////
    updatetoDisplay() {
        if (this.currentOperand !== null) {

            this.currentOperandandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        }
        else {
            this.currentOperandandTextElement = '0';
        }
        if (this.operation !== null) {

            this.previousOperandandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandandTextElement = '';
        }

    }
}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandandTextElement, currentOperandandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updatetoDisplay();
    })
})

// Attach event listener for keyboard events outside the loop
document.addEventListener('keydown', event => {
    // Iterate over each number button
    numberButtons.forEach(button => {
        // Check if the key pressed matches the button's text content
        if (event.key === button.innerText) {
            // Call appropriate methods on calculator object
            calculator.appendNumber(button.innerText);
            calculator.updatetoDisplay();
        }
    });
});


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updatetoDisplay();
    })
})
// Attach event listener for keyboard events outside the loop
document.addEventListener('keydown', event => {
    // Iterate over each operation button
    operationButtons.forEach(button => {
        // Check if the key pressed matches the button's text content
        if (event.key === button.innerText) {
            // Call appropriate methods on calculator object
            calculator.chooseOperation(button.innerText);
            calculator.updatetoDisplay();
        }
    });
});
equalsButton.addEventListener('click', button => {
    calculator.coumpute();
    calculator.updatetoDisplay();
})
document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        calculator.coumpute();
        calculator.updatetoDisplay();
    }
})


allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updatetoDisplay();
})


document.addEventListener('keydown', event => {
    if (event.key === 'Delete') {
        calculator.clear();
        calculator.updatetoDisplay();
    }
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updatetoDisplay();
})
document.addEventListener('keydown', event => {
    // Check if the key pressed is the delete key
    if (event.key === 'Backspace') {
        calculator.delete();
        calculator.updatetoDisplay();
    }
});


















/////////////////////////not yet implemented////////////////
// allClearButton.addEventListener('click',handleClear);
// document.addEventListener('keydown',handleClear);

// function handleClear(event){
//     if(event.type === 'click' || (event.key === 'keyup' && event.key === 'Delete')){
//         calculator.clear();
//         calculator.updatetoDisplay();
//     }
// }

// deleteButton.addEventListener('click',handleDelete);
// deleteButton.addEventListener('keypress',handleDelete);


// function handleDelete(event){
//     if(event.type === 'click' || (event.type === 'keypress' && event.key === 'Delete')){
//         calculator.delete();
//         calculator.updatetoDisplay();
//     }
// }
////////////////////////////////////////////////////