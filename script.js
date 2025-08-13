document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  console.log(display);
  const buttons = document.querySelectorAll(".btn");

  let currentInput = "";

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (value === "C") {
        currentInput = "";
        display.value = "";
      } 
      else if (value === "=") {
        try {
          currentInput = eval(currentInput).toString();
          display.value = currentInput;
        } catch {
          display.value = "Error";
          currentInput = "";
        }
      } 
       else if(value === "%"){
        if (currentInput) {
          currentInput = (parseFloat(currentInput) / 100).toString();
          display.value = currentInput;
        }

       }
        else if (value === "√") {
            if (currentInput) {
                currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                display.value = currentInput;
            }
        } 
        else if (value === "x²") {
            if (currentInput) {
                currentInput = Math.pow(parseFloat(currentInput), 2).toString();
                display.value = currentInput;
            }
        }
        else {
            currentInput += value;
            display.value = currentInput;
        }
    });
  });
});