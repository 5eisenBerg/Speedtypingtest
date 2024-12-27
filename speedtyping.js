let speedTypingTest = document.getElementById("speedTypingTest");
let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let result = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");
let activeTimer = null;

function setTimer(i) {
    if (activeTimer) {
        clearInterval(activeTimer);
    }
    timer.textContent = "";
    let counter = i;
    timer.textContent = String(counter);
    activeTimer = setInterval(function() {
        counter += 1;
        timer.textContent = String(counter);

    }, 1000);
}

function displayQuote(radomQuote) {
    speedTypingTest.classList.remove("d-none");
    spinner.classList.add("d-none");
    quoteDisplay.textContent = radomQuote;
}

function getData() {
    let options = {
        method: "GET"
    };
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let radomQuote = jsonData.content;
            displayQuote(radomQuote);
        });
}

resetBtn.addEventListener("click", function() {
    quoteInput.value = "";
    setInterval(setTimer(0), 1000);
    speedTypingTest.classList.add("d-none");
    spinner.classList.remove("d-none");
    getData();

});

submitBtn.addEventListener("click", function() {
    if (quoteDisplay.textContent === quoteInput.value) {
        clearInterval(activeTimer);
        result.textContent = "You typed In " + timer.textContent + " Seconds";
    } else {
        result.textContent = "You typed Incorrect sentence";
    }
});
setInterval(setTimer(0), 1000);
getData();