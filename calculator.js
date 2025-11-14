// Basic Calculator Script
const display = document.getElementById("display");

let expression = "";

function updateDisplay() {
  display.textContent = expression || "0";
}

// Add click listeners to all buttons
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    switch (value) {
      case "C": // Clear
        expression = "";
        break;

      case "=": // Evaluate
        try {
          let evalExpr = expression
            .replace(/÷/g, "/")
            .replace(/×/g, "*")
            .replace(/−/g, "-")
            .replace(/π/g, Math.PI);

          expression = String(eval(evalExpr));
        } catch {
          expression = "Error";
        }
        break;

      case "√":
        try {
          expression = String(Math.sqrt(eval(expression)));
        } catch {
          expression = "Error";
        }
        break;

      case "^":
        expression += "**";
        break;

      case "Auto Loan":
        alert("Auto Loan calculator not implemented yet.");
        break;

      case "Insurance":
        alert("Insurance calculator not implemented yet.");
        break;

      default:
        expression += value;
    }

    updateDisplay();
  });
});
