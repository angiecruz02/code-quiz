var timer = document.getElementById("timer");
var interval;
var questionsArray = [
  {
    questionText: "Commonly used data types DO Not include: ",
    correctAnswerIndex: "2",
    options: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
  },
  {
    questionText: "The condition in an if/ else statement is enclosed with ___________. ",
    correctAnswerIndex: "2",
    options: ["1. Quotes", "2. Curly brackets", "3. Parenthesis", "4. Square brackets"],
  },
  {
    questionText: "Arrays in JavaScript can be used to store ____________. ",
    correctAnswerIndex: "3",
    options: ["1. Numbers and strings", "2. Other arrays", "3. Booleans", "4. All of the above"],
  },
  {
    questionText: "String values must be enclosed within ___________ when begin assigned to variables",
    correctAnswerIndex: "2",
    options: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parenthesis"],
  },
  {
    questionText: "A very useful tool used during development and debugging for printing content to the debugger is: ",
    correctAnswerIndex: "3",
    options: ["1. JavaScript", "2. Terminal/bash", "3. For loops", "4. Console log"],
  },
];

function startTimer() {
  interval = setInterval(decrementTime, 1000);
}

function decrementTime() {
  var num = timer.innerText;
  if (num === "0") {
    console.log("stopTimer");
    clearInterval(interval);
    return;
  }
  timer.innerText = num - 1;
}

function submitAnswer(answer) {
  console.log("answer=", answer);
}

function beginQuiz() {
  console.log("beginQuiz");
  startTimer();
}

// build start button
var startButton = document.createElement("button"); // creating button element
console.log("startButton", startButton);
startButton.innerText = "start"; // adding text to the button
console.log("startValue", startButton.innerText);
startButton.setAttribute("onclick", "beginQuiz()"); // set the button on click to call function beginQuiz
// add button to HTML
document.getElementById("content").appendChild(startButton);
