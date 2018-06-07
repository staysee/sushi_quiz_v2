
'use strict'

let questionNumber = 0;
let correctScore = 0;
let incorrectScore = 0;

//game starts
function startGame(){
	$('#start-container').addClass("hidden");
  $('#quiz-container').removeClass("hidden");
  render();
}

//display question
function displayQuestion(){
  const questionNumber = $('.question-number');
  const questionArea = $('.question-area');
  questionArea.html(`${STORE[0].question}`);

  console.log(`Current question is: ${STORE[0].question}`);

}
//display answer choices
function displayAnswerChoices(){
  const
}

function updateScore(){

}

//check for correct answer
function checkCorrectAnswer(){

}
//show current question and scores
function updateScore(){

}

//textual feedback for wrong answer
function answerIsWrong(){

}

//textual feedback for right answer
function answerIsRight(){

}

function render(){

}

// EVENT HANDLERS

//user click play button
function handleStart(){
	$('#start-container').on('click', '.js-play-button', startGame)
}

//new game (play again)
function newGame(){

}

//user click to submit answerchoice
function handleSubmit(){

}

//user click for next question
function handleNext(){
//update question number
}



function createQuiz(){
	//all the functions to run on load
	console.log('app is running');
	handleStart();
}

$(createQuiz);
