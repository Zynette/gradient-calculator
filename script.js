/*
    Project Name: Gradient Calculator
    Author: Antonette Petallo
    Date: March 2025
    Description: A calculator with dynamic gradients and theme options.
    GitHub: [https://github.com/Zynette]
*/

let currentInput = '';
let memory = 0;

const resultDisplay = document.getElementById('result');
const memoryIndicator = document.getElementById('memory-indicator');
const body = document.body;

// Update display
function updateDisplay() {
    resultDisplay.value = currentInput || '0';
}

// Input values
function inputValue(value) {
    currentInput += value;
    updateDisplay();
    shiftGradient();
}

// Clear display
function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

// Delete last character
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// Calculate result
function calculateResult() {
    try {
        const result = eval(currentInput);
        if (result === Infinity || result === -Infinity) {
            shakeCalculator();
            currentInput = '';
        } else {
            currentInput = result.toString();
            showResultEffect();
        }
    } catch {
        shakeCalculator();
        currentInput = '';
    }
    updateDisplay();
}

// Memory functions
function addToMemory() {
    memory += parseFloat(currentInput) || 0;
    memoryIndicator.style.display = 'inline';
}

function subtractFromMemory() {
    memory -= parseFloat(currentInput) || 0;
    memoryIndicator.style.display = 'inline';
}

function recallMemory() {
    currentInput = memory.toString();
    updateDisplay();
}

// Gradient shift
function shiftGradient() {
    const colors = [getRandomColor(), getRandomColor()];
    body.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
}

// Generate random gradient
function generateRandomGradient() {
    const colors = [getRandomColor(), getRandomColor()];
    body.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
    alert(`Gradient: ${colors[0]} → ${colors[1]}`);
}

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Shake on error
function shakeCalculator() {
    const calculator = document.querySelector('.calculator');
    calculator.classList.add('shake');
    setTimeout(() => calculator.classList.remove('shake'), 500);
}

// Show result effect
function showResultEffect() {
    resultDisplay.classList.add('glow');
    setTimeout(() => resultDisplay.classList.remove('glow'), 1000);
}

// Theme switcher
function changeTheme() {
    const selector = document.getElementById('theme-selector');
    const selectedOption = selector.options[selector.selectedIndex];
    const backgroundImage = selectedOption.getAttribute('data-bg');

    if (backgroundImage) {
        body.style.background = `url(${backgroundImage}) no-repeat center center fixed`;
        body.style.backgroundSize = 'cover';
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key) || ['+', '-', '*', '/', '.'].includes(e.key)) {
        inputValue(e.key);
    } else if (e.key === 'Enter') {
        calculateResult();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});

// Attach to window to make functions globally accessible
window.changeTheme = changeTheme;
window.calculateResult = calculateResult;