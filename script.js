// Select display and buttons
const input = document.getElementById("input");
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; // Stores typed input
let memory = 0;        // Stores memory value (for MR, MC, M+, M-)

// Update display
function updateDisplay(value) {
  input.value = value;
}

// Handle calculator actions
function handleAction(action) {
  switch (action) {
    case "clear": // C
      currentInput = "";
      updateDisplay("");
      break;

    case "sqrt": // √
      if (currentInput) {
        currentInput = Math.sqrt(eval(currentInput)).toString();
        updateDisplay(currentInput);
      }
      break;

    case "percent": // %
      if (currentInput) {
        currentInput = (eval(currentInput) / 100).toString();
        updateDisplay(currentInput);
      }
      break;

    case "mr": // Memory Recall
      currentInput = memory.toString();
      updateDisplay(currentInput);
      break;

    case "mc": // Memory Clear
      memory = 0;
      break;

    case "mplus": // Memory Add
      if (currentInput) memory += eval(currentInput);
      break;

    case "mminus": // Memory Subtract
      if (currentInput) memory -= eval(currentInput);
      break;

    case "sign": // ± Toggle
      if (currentInput) {
        currentInput = (eval(currentInput) * -1).toString();
        updateDisplay(currentInput);
      }
      break;

    case "equal": // =
      try {
        currentInput = eval(currentInput).toString();
        updateDisplay(currentInput);
      } catch {
        updateDisplay("Error");
        currentInput = "";
      }
      break;
  }
}

// Handle numeric/operator values
function handleValue(value) {
  currentInput += value;
  updateDisplay(currentInput);
}

// Event listener for button clicks
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const value = btn.dataset.value;
    let action = btn.dataset.action;

    // Special fix for ± button (no dataset in HTML)
    if (btn.innerHTML === "±" || btn.innerHTML.includes("177")) {
      action = "sign";
    }

    // Special fix for = button
    if (value === "=") {
      action = "equal";
    }

    if (action) {
      handleAction(action);
    } else if (value) {
      handleValue(value);
    }
  });
});

// ✅ Keyboard support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    // Numbers (0-9)
    handleValue(e.key);
  } else if (["+", "-", "*", "/", "."].includes(e.key)) {
    // Operators and decimal point
    handleValue(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    handleAction("equal");
  } else if (e.key === "Backspace") {
    // Delete last character
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (e.key.toLowerCase() === "c") {
    // Press C to clear
    handleAction("clear");
  }
});
