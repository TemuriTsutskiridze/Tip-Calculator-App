

let bill_input = document.getElementById("bill");
let people_input = document.getElementById("people");
let bill_error = document.getElementById("bill_error");
let people_error = document.getElementById("people_error");
let reset_button = document.getElementById("reset");
let tip_buttons = document.getElementsByClassName("tip_button");
let tip_amount = document.getElementById("tip_amount");
let total = document.getElementById("total");


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
    tip_amount.textContent = "$0.00";
    total.textContent = "$0.00";
}

tip_buttons_array = Array.from(tip_buttons); // I have converted HTMLCollection to an actual array so that I will have access to forEach function
var active_button = null;
tip_buttons_array.forEach(tip_button => {
    bill_input.addEventListener("input", () => {
        tip_button.addEventListener('click', function(event) {
            let tip_button_value = event.target.value;
            let bill = Number(bill_input.value); 
            let people = Number(people_input.value);
            let tip_amount_number, tip_total_number;
    
            debugger
    
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
            if (bill <= 0 || bill_input.value == "") {
                addBillError();
            }
            if (people < 0 || !Number.isInteger(people) || people_input.value == "") {
                addPeopleError();
            }
            if (bill > 0) {
                removeBillError();
            }
            if (people > 0 & Number.isInteger(people)) {
                removePeopleError();
            }
    });
    
        

        
    })
});

reset_button.addEventListener("click", () => {
    bill_input.value = '';
    bill_input.style.border = "none";
    people_input.value = '';
    people_input.style.border = "none";
    bill_error.style.display = "none";
    people_error.style.display = "none";
    for (let i = 0; i < tip_buttons.length; i++) {
        tip_buttons[i].style.background = "#00474B";
    }
    tip_amount.textContent = "$0.00";
    total.textContent = "$0.00";
});

function addBillError() {
    bill_error.style.display = "block";
    bill_input.style.border = "2px solid #E17052";
}

function removeBillError() {
    bill_error.style.display = "none";
    bill_input.style.border = "none";
}

function addPeopleError() {
    people_error.style.display = "block";
    people_input.style.border = "2px solid #E17052";
}

function removePeopleError() {
    people_error.style.display = "none";
    people_input.style.border = "none";
}


// bill_input.addEventListener("input", () => {
//     tip_amount.textContent = `$${bill_input.value}`;
// });



