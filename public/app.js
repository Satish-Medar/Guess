let btn1 = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");
let btn3 = document.querySelector(".btn3");
let btn4 = document.querySelector(".btn4");
let btns = document.querySelectorAll(".time_btns");
let time_selected;
console.log(btns);
let num = null;
btn1.addEventListener("click", () => {
  time_selected = btn1.id;
  timer(time_selected);
  for (let btn of btns) {
    btn.classList.add("disabled");
  }
});
btn2.addEventListener("click", () => {
  time_selected = btn2.id;
  timer(time_selected);
  for (let btn of btns) {
    btn.classList.add("disabled");
  }
});
btn3.addEventListener("click", () => {
  time_selected = btn3.id;
  timer(time_selected);
  for (let btn of btns) {
    btn.classList.add("disabled");
  }
});
btn4.addEventListener("click", () => {
  time_selected = btn4.id;
  timer(time_selected);
  for (let btn of btns) {
    btn.classList.add("disabled");
  }
});

function timer(time_selected) {
  let timeLeft = time_selected * 60; // change to 5 * 60 for 5 minutes
  console.log(timeLeft);
  let time = timeLeft * 1000;
  const timerDisplay = document.getElementById("timer");

  const countdown = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // Add leading zero to seconds if needed
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let strong = document.getElementById("duration-label");
    strong.textContent = "";
    timerDisplay.textContent = `Number will be displayed in ${minutes}:${seconds}`;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(countdown);

      timerDisplay.innerHTML =
        "<strong>Select the duration to reveal the lucky number:</strong> 00:00";
    }
  }, 1000);

  setTimeout(() => {
    number();
    for (let btn of btns) {
      btn.classList.remove("disabled");
    }
  }, time + 1000);
}

function number() {
  let number = Math.floor(Math.random() * 99);
  let rand_number = document.getElementById("number");

  // Display it in the UI
  setTimeout(() => {
    rand_number.innerHTML = `<h5>Number is: XX</h5>`;
  }, 3000);
  rand_number.innerHTML = `<h5>Number is: ${number}</h5>`;

  // Send it to backend
  fetch("/set-number", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ winningNumber: number }),
  });
}
