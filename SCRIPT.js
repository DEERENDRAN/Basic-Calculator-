const display = document.getElementById('display');

function appendValue(val) {
  display.value += val;
  display.scrollLeft = display.scrollWidth;
}

function clearDisplay() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const result = eval(display.value);
    if (!isFinite(result)) throw new Error("Math Error");
    display.value = result;
    display.scrollLeft = display.scrollWidth;
  } catch (error) {
    display.value = 'Error';
  }
}


function appendPercentage() {
  try {
    let expr = display.value;
    const match = expr.match(/(\d+(\.\d+)?)(?!.*\d)/);
    if (match) {
      const number = match[0];
      const percentValue = parseFloat(number) / 100;
      display.value = expr.slice(0, -number.length) + percentValue;
    }
  } catch {
    display.value = 'Error';
  }
}

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});


