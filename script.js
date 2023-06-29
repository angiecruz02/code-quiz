var timer = document.getElementById("timer");
var interval;
var currentQuestionIndex = 0;
var highScores = [];
var currentInitials = "";
var questionsArray = [
  {
    questionText: "Commonly used data types DO Not include: ",
    correctAnswerIndex: "2",
    options: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
  },
  {
    questionText:
      "The condition in an if/ else statement is enclosed with ___________. ",
    correctAnswerIndex: "2",
    options: [
      "1. Quotes",
      "2. Curly brackets",
      "3. Parenthesis",
      "4. Square brackets",
    ],
  },
  {
    questionText: "Arrays in JavaScript can be used to store ____________. ",
    correctAnswerIndex: "3",
    options: [
      "1. Numbers and strings",
      "2. Other arrays",
      "3. Booleans",
      "4. All of the above",
    ],
  },
  {
    questionText:
      "String values must be enclosed within ___________ when begin assigned to variables",
    correctAnswerIndex: "2",
    options: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parenthesis"],
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is: ",
    correctAnswerIndex: "3",
    options: [
      "1. JavaScript",
      "2. Terminal/bash",
      "3. For loops",
      "4. Console log",
    ],
  },
];

function startTimer() {
  interval = setInterval(decrementTime, 1000);
}

function decrementTime(numOfSeconds) {
  var count = numOfSeconds;
  if (!count) {
    count = 1;
  }
  var num = timer.innerText;
  if (num === "0") {
    clearInterval(interval);
    return;
  }
  timer.innerText = num - count;
}

function evaluate(answer, index) {
  var correctAnswer = questionsArray[index].correctAnswerIndex;
  return answer == correctAnswer;
}
function submitAnswer(answer, currentQuestionIndex) {
  // clear previous result
  document.getElementById("result").replaceChildren([]);
  //evaluate answer
  var result = evaluate(answer, currentQuestionIndex);
  //display result if correct or wrong
  // create p element
  var paragraph = document.createElement("p");
var currentScore = Number(timer.innerText)
  if (result === true) {
    // update p element with inner text correct
    paragraph.innerText = "Correct!";
  } else {
    // update p element with inner text wrong
    paragraph.innerText = "Wrong!";
    timer.innerText = currentScore - 10
  }
  // append it to result section
  document.getElementById("result").appendChild(paragraph);
  // deletes previous answer options
  document.getElementById("content").replaceChildren([]);

  //go to next question
  goToNextQuestion(currentQuestionIndex + 1);
}

function beginQuiz() {
  startTimer();
  // deleting quiz-intro element from the html
  document.getElementById("quiz-intro").remove();
  goToNextQuestion(0);
}

function goToNextQuestion(questionIndex) {
  if (questionIndex > 4) {
    showResult();
    // clear previous result
    document.getElementById("result").replaceChildren([]);
    return;
  }
  var currentQuestion = questionsArray[questionIndex];
  // update the title-heading element inner text to the currentQuestion questionText
  document.getElementById("title-heading").innerText =
    currentQuestion["questionText"];
  // delete start button
  startButton.remove();

  // create option buttons and add them to html and we are going to use a loop for it
  var answerOptions = currentQuestion["options"];
  for (var i = 0; i < answerOptions.length; i++) {
    var optionText = answerOptions[i];
    var answerButton = createButton(
      optionText,
      `submitAnswer(${i}, ${questionIndex})`
    );
    document.getElementById("content").appendChild(answerButton);
  }
}

function showResult() {
  // stop timer
  clearInterval(interval);
  var score = timer.innerText;
  // replace title heading with all done
  document.getElementById("title-heading").innerText = "All done!";
  // create a paragraph element saying "your final score is + score"
  var paragraph = document.createElement("p");
  paragraph.innerText = `Your final score is ${score}`;
  // append it to content section
  document.getElementById("content").appendChild(paragraph);
  // create a div container and give it ID initial-input-container
  var initialContainer = document.createElement("div");
  initialContainer.setAttribute("id", "initial-input-container");
  // append it to content section
  document.getElementById("content").appendChild(initialContainer);
  // create paragraph element, enter initials
  var initialParagraph = document.createElement("p");
  initialParagraph.innerText = `Enter initials`;
  // append it to initial-input-container div
  document
    .getElementById("initial-input-container")
    .appendChild(initialParagraph);
  // create an input element with ID initial-input
  var inputElement = document.createElement("input");
  inputElement.setAttribute("id", "initial-input");
  //add an on change handler to input element
  inputElement.setAttribute("onchange", "saveInitials()");
  //append it to initial-input-container
  document.getElementById("initial-input-container").appendChild(inputElement);
  //create a button sumbit with ID submit and add onclick attribute with value saveHighScore(score)
  var submitButton = document.createElement("button");
  //set inner text to submit
  submitButton.innerText = "Submit";
  submitButton.setAttribute("onclick", "saveHighScore()");
  // append it to initial input container
  document.getElementById("initial-input-container").appendChild(submitButton);
}

function saveInitials() {
  var initials = document.getElementById("initial-input").value;
  currentInitials = initials;
}

function saveHighScore() {
  var initials = document.getElementById("initial-input").value;
  var scoreEntry = `${initials} - ${timer.innerText}`;
  highScores.push(scoreEntry);
  // call function showHighScores()
  showHighScores();
}

function showHighScores() {
  document.getElementById("content").replaceChildren([]);
  // update tittle heading to high scores
  document.getElementById("title-heading").innerText = "High scores";

  //show a list of paragraphs of high scores
  for (var i = 0; i < highScores.length; i++) {
    var highScoreEntry = highScores[i];
    // create paragraph element
    var paragraph = document.createElement("p");
    paragraph.innerText = highScoreEntry;
    //set inner text of paragraph element to high score entry
    // append highscore entry to content section
    document.getElementById("content").appendChild(paragraph);
  }
}

// createButton("start", "beginQuiz()")

function createButton(buttonText, onclickValue) {
  var currentButton = document.createElement("button"); // creating button element
  currentButton.innerText = buttonText; // adding text to the button
  currentButton.setAttribute("onclick", onclickValue); // set the button on click to call onclickValue
  return currentButton;
}
// build start button

var startButton = createButton("start", "beginQuiz()");

// add button to HTML
document.getElementById("content").appendChild(startButton);
