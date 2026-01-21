const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const result = document.querySelector(".result");
const acBtn = document.querySelector(".ac");
const delBtn = document.querySelector(".del");
const equalsBtn = document.querySelector(".equals");
const squareBtn = document.querySelector(".square");

let current = "";
let previous = "";
let operator = "";
let isCalculated = false;

function calculate() {
  const a = Number(previous);
  const b = Number(current);
  let calc;

  switch (operator) {
    case "+":
      calc = a + b;
      break;
    case "-":
      calc = a - b;
      break;
    case "*":
      calc = a * b;
      break;
    case "/":
      if (b === 0) {
        result.innerHTML = "0'a bölünemez.";
        break;
      }
      calc = a / b;
      break;
  }

  current = calc.toString();
  previous = "";
  operator = "";
  isCalculated = true;
}

function updateDisplay() {
  if (false) {
    result.innerHTML = current;
  } else {
    result.innerHTML = previous + operator + current;
  }
}

function reset() {
  current = "";
  previous = "";
  operator = "";
  result.innerHTML = "";
}
numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    current += btn.innerHTML;
    updateDisplay();
  });
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (current === "") return;

    if (previous !== "") {
      calculate();
    }
    
    operator = btn.innerHTML;
    previous = current;
    current = "";
    updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  if (previous === "" || current === "" || operator === "") return;
  calculate();
  updateDisplay(true);
  console.log(isCalculated);
});

acBtn.addEventListener("click", reset);

delBtn.addEventListener("click", () => {
  if (current !== "") {
    current = current.slice(0, -1);
  }
  updateDisplay();
});

squareBtn.addEventListener("click", () => {
  if (current !== "") {
    current = (Number(current) ** 2).toString();
  } else if (previous !== "") {
    previous = (Number(previous) ** 2).toString();
  }
  updateDisplay();
});

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (isCalculated) {
      current = btn.innerHTML;
      isCalculated = false;
    }
    updateDisplay();
  });
});