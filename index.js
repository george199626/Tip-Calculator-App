"use strict";

const buttonFivePercent = document.querySelector("#btn5");
const buttonTenPercent = document.querySelector("#btn10");
const buttonFifteenPercent = document.querySelector("#btn15");
const buttonQuarterPercent = document.querySelector("#btn25");
const buttonHalfPercent = document.querySelector("#btn50");
const customInput = document.querySelector("#custom-percent");
const peopleInput = document.querySelector("#people-number-input");
const billInput = document.querySelector("#bill-input");
const resetButton = document.querySelector(".reset-button");

const error = document.querySelector("#error")
const tipResult = document.querySelector("#tip-result")
const totalResult = document.querySelector("#total-result")
let observer = 0;

 

function activeoff() {
    buttonFivePercent.classList.remove("active");
    buttonTenPercent.classList.remove("active");
    buttonFifteenPercent.classList.remove("active");
    buttonQuarterPercent.classList.remove("active");
    buttonHalfPercent.classList.remove("active");
}

function isWholeNumber(n) {
    const result = n - Math.floor(n);
    if (result !==0) {
        return false;
    } else {
        return true;
    }
}

const calculateTip = function(percent) {
    const bill = billInput.value;
    const tip = (bill*percent)/100;
    const personNumber = peopleInput.value;
    if(personNumber!=='0') {
    error.classList.add("hidden");
    const a = Math.ceil((tip/personNumber)*100)/100;
    
    if(isWholeNumber(a)) {
        tipResult.textContent = "$" + a + ".00";
    } else {
        tipResult.textContent = "$" + a;
    }

    const total = Number(tip) + Number(bill);
    const b = Math.ceil((total/personNumber)*100)/100;
    
    if(isWholeNumber(b)) {
        totalResult.textContent = "$" + b + ".00";
    } else {
        totalResult.textContent = "$" + b
    }
} else {
        error.classList.remove("hidden");
    }
}

const mainFunction = function(a,active) {
    activeoff();
    observer=a;
    active.classList.add("active");
    if((billInput.value !== "") && (peopleInput.value !== "")) {
        calculateTip(observer);
    } 
}

const mainInput = function() {
    if((peopleInput.value !== "")&&(billInput.value !== "")) {
        if (observer !==0 ) {       
        calculateTip(observer);
        } else {
            calculateTip(customInput.value);
        }
    } else {
        tipResult.textContent = "$0.00";
        totalResult.textContent="$0.00";
    }
}

buttonFivePercent.addEventListener('click', function() {
    mainFunction(5,buttonFivePercent);
})
buttonTenPercent.addEventListener('click', function() {
    mainFunction(10,buttonTenPercent);
});
buttonFifteenPercent.addEventListener('click', function() {
    mainFunction(15,buttonFifteenPercent);
});
buttonQuarterPercent.addEventListener('click', function() {
    mainFunction(25,buttonQuarterPercent);
});
buttonHalfPercent.addEventListener('click', function() {
    mainFunction(50,buttonHalfPercent);
});
customInput.addEventListener('input', function() {
    observer=0;
    activeoff();
    if(customInput.value !== "" && (billInput.value !== "") && (peopleInput.value !== "")) {
        calculateTip(customInput.value);
    } else {
        calculateTip(0);
    }
})
peopleInput.addEventListener('input', function(){
    mainInput();
})
billInput.addEventListener('input', function() {
    mainInput();
})

//Reset Everything
resetButton.addEventListener('click', function() {
    activeoff();
    observer=0;
    document.querySelector("#tip-result").textContent = "$0.00";
    document.querySelector("#total-result").textContent="$0.00";
    billInput.value = "";
    peopleInput.value = "";
    customInput.value = ""})