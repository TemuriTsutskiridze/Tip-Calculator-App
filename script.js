"use strict";

const bill_input = document.getElementById("bill");
const people_input = document.getElementById("people");
const buttons = document.querySelectorAll(".tip_button");
const tip_amount_output = document.getElementById("tip_amount");
const total_amount_output = document.getElementById("total");
const custom = document.getElementById("custom");
const bill_error = document.getElementById("bill_error");
const people_error = document.getElementById("people_error");
const reset = document.getElementById("reset");

let bill_value = 0;
let people_value = 0;
let tip_value = 0;
let total = 0;
let tip_amount = 0;

bill_input.addEventListener("input", (event) => {
  bill_value = Number(event.target.value);
  if (bill_value <= 0) {
    bill_error.style.display = "block";
    event.target.style.border = "2px solid #E17052";
  } else {
    bill_error.style.display = "none";
    event.target.style.border = "none";
  }
  calculate();
});

people_input.addEventListener("input", (event) => {
  people_value = Number(event.target.value);
  if (people_value <= 0 || people_value % 1 != 0) {
    people_error.style.display = "block";
    event.target.style.border = "2px solid #E17052";
  } else {
    people_error.style.display = "none";
    event.target.style.border = "none";
  }
  calculate();
});

let active_button = null;
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    active_button?.classList.remove("tip_button_active");
    tip_value = parseInt(button.textContent);
    button.classList.add("tip_button_active");
    active_button = button;
    console.log(active_button);
    calculate();
  });
});

custom.addEventListener("input", (event) => {
  if (Number(event.target.value) > 0 && Number(event.target.value) < 100) {
    active_button?.classList.remove("tip_button_active");
    tip_value = Number(custom.value);
    calculate();
  }
});

reset.addEventListener("click", () => {
  bill_input.value = "";
  bill_input.style.border = "none";
  bill_value = 0;
  people_input.value = "";
  people_input.style.border = "none";
  people_value = 0;
  tip_value = 0;
  active_button.classList.remove("tip_button_active");
  active_button = null;
  custom.value = "";
  bill_error.style.display = "none";
  people_error.style.display = "none";
  tip_amount_output.textContent = `$0.00`;
  total_amount_output.textContent = `$0.00`;
});

function calculate() {
  tip_amount = ((bill_value * (tip_value / 100)) / people_value).toFixed(2);
  total = (
    (bill_value + bill_value * (tip_value / 100)) /
    people_value
  ).toFixed(2);

  if (bill_value <= 0 || people_value <= 0 || people_value % 1 != 0) {
    tip_amount_output.textContent = `$0.00`;
    total_amount_output.textContent = `$0.00`;
  } else {
    tip_amount_output.textContent = `$${tip_amount}`;
    total_amount_output.textContent = `$${total}`;
  }
}
