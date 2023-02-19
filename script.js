`use strict`

// references to HTML elements

let bill_input = document.getElementById("bill");
let people_input = document.getElementById("people");
let bill_error = document.getElementById("bill_error");
let people_error = document.getElementById("people_error");
let reset_button = document.getElementById("reset");
let tip_buttons = document.getElementsByClassName("tip_button");
let tip_amount = document.getElementById("tip_amount");
let total = document.getElementById("total");
let custom = document.getElementById("custom");


// functions 

function updateCalculation() {
    let bill = Number(bill_input.value);
    let people = Number(people_input.value);
    let custom_value = Number(custom.value);

    if (bill <= 0) {
        addError(bill_error, bill_input);
    } 
    if (people <= 0 || !Number.isInteger(people)) {
        addError(people_error, people_input)
    }

    if (bill > 0 && people > 0 && Number.isInteger(people)) {
        removeError(bill_error, bill_input);
        removeError(people_error, people_input);
        tip_amount.textContent = `$${(bill * custom_value / 100 / people).toFixed(2)}`;
        total.textContent = `$${((bill + (bill * custom_value / 100)) / people).toFixed(2)}`;
    }
}

function resetForm() {
    bill_input.value = "";
    bill_input.style.border = "none";
    people_input.value = "";
    people_input.style.border = "none";
    bill_error.style.display = "none";
    people_error.style.display = "none";
    for (let i = 0; i < tip_buttons.length; i++) {
        tip_buttons[i].style.background = "#00474B";
    }
    custom.value = "";
    tip_amount.textContent = "$0.00";
    total.textContent = "$0.00";
}

function addError(error, input) {
    error.style.display = "block";
    input.style.border = "2px solid #E17052";
}

function removeError(error, input) {
    error.style.display = "none";
    input.style.border = "none";
}


// eventListeners 

tip_buttons_array = Array.from(tip_buttons); // I have converted HTMLCollection to an actual array so that I will have access to forEach function
var active_button = null;
tip_buttons_array.forEach(tip_button => {
        tip_button.addEventListener('click', function(event) {
            let tip_button_value = event.target.value;
            let bill = Number(bill_input.value); 
            let people = Number(people_input.value);

            if (bill > 0 && people > 0 && Number.isInteger(people))
            {
                if (active_button) {
                    active_button.style.background = "#00474B";
                }
        
                tip_button.style.background = "#26C2AE";
                active_button = tip_button;
        
                tip_amount.textContent = `$${(bill * tip_button_value / 100 / people).toFixed(2)}`;
                total.textContent = `$${((bill + (bill * tip_button_value / 100)) / people).toFixed(2)}`;
            }
    });
});

custom.addEventListener("input", () => {
    let bill = Number(bill_input.value); 
    let people = Number(people_input.value);
    let custom_value = Number(custom.value);

    if (bill > 0 && people > 0 && Number.isInteger(people) && (custom_value > 0 && custom_value < 100))
    {
        tip_amount.textContent = `$${(bill * custom_value / 100 / people).toFixed(2)}`;
        total.textContent = `$${((bill + (bill * custom_value / 100)) / people).toFixed(2)}`;
    }
});

reset_button.addEventListener("click", resetForm);

bill_input.addEventListener("input", updateCalculation);

people_input.addEventListener("input", updateCalculation);