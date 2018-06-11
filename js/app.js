'use strict'

let currentQuestion = 0;
let correctScore = 0;
let incorrectScore = 0;

//game starts
function startGame(){
	$('#start-container').addClass("hidden");
	$('#quiz-container').removeClass("hidden");
	$('.score-board').removeClass("hidden");
	render();
}


//display answer choices
function renderAnswerChoices(){
	$('.js-answer-choices').html(generateAnswerChoices());
	console.log('`displayAnswerChoices` running')
}

function renderQuestion(){
	const questionArea = $('.question-area');
  $('.question-number').html(`Question ${currentQuestion+1} of 10`);

	if (currentQuestion < STORE.length){
		questionArea.html(`${STORE[currentQuestion].question}`);

		console.log(`Current question is: ${STORE[currentQuestion].question}`);
		console.log('`generateCurrentQuestion` runnning.');
	} else {
		updateScore();
		$('#quiz-container').addClass("hidden");
		endGame();
	}
}

//get all answer choices
function generateAnswerChoices(){
  if (currentQuestion < STORE.length){
  	return `
  	    <label class="answerChoice">
  	    	<input type="radio" name="option" value="${STORE[currentQuestion].answers[0]}" required>${STORE[currentQuestion].answers[0]}
  	    </label>
  	    <label class="answerChoice">
  	    	<input type="radio" name="option" value="${STORE[currentQuestion].answers[1]}" required>${STORE[currentQuestion].answers[1]}
  	    </label>
  	    <label class="answerChoice">
  	    	<input type="radio" name="option" value="${STORE[currentQuestion].answers[2]}" required>${STORE[currentQuestion].answers[2]}
  	    </label>
  	    <label class="answerChoice">
  	    	<input type="radio" name="option" value="${STORE[currentQuestion].answers[3]}" required>${STORE[currentQuestion].answers[3]}
  	    </label>
  	`
  }
}

//textual feedback for wrong answer
function answerIsWrong(){
	console.log('WRONG!');
  $('#feedback-container').addClass("wrong-answer");
	$('.feedback').html(`<strong>WRONG!</strong><br>The correct answer is ${STORE[currentQuestion].correctAnswer}`)
	incorrectScore++;
}

//textual feedback for right answer
function answerIsRight(){
	console.log('Answer is Correct!');
  $('#feedback-container').addClass("right-answer");
	$('.feedback').html(`${STORE[currentQuestion].correctAnswer} is <strong>CORRECT!</strong>`)
	correctScore++;
}

//check for correct answer
function checkCorrectAnswer(){
	let userAnswer = $('input:checked').val();
	let correctAnswer = `${STORE[currentQuestion].correctAnswer}`;
	if (userAnswer === correctAnswer){
		answerIsRight();
	} else {
		answerIsWrong();
	}

}
//show current question and scores
function updateScore(){
	$('.scores').html(`Correct: ${correctScore}, Incorrect: ${incorrectScore}`);
}

function updateQuestionNumber(){
  currentQuestion++;
  $('.question-number').html(`Question ${currentQuestion+1} of 10`);
}

function endGame(){
  if (correctScore >= 8){
    $('#end-image').attr("src", "img/sushi_party.png");
    $('#end-image').attr("alt", "cartoon sushi and ice cream celebration");
    $('.end-score').html(`Congratulations Sushi Master! <br> You scored ${correctScore} out of 10 points`);
  } else {
    $('#end-image').attr("src", "img/beach_salmon.png");
    $('#end-image').attr("alt", "cartoon salmon sushi on the beach");
    $('.end-score').html(`Do you know what you're eating? <br> You only scored ${correctScore} out of 10 points.`);
  }
  $('#endgame-container').removeClass("hidden");
}



// EVENT HANDLERS

//user click play button
function handleStart(){
	$('#start-container').on('click', '.js-play-button', startGame)
}

//new game (play again)
function newGame(){
	$('#endgame-container').on('click', '.js-restart-button', function(event){
		location.reload();
	})
}

//user click to submit answerchoice
function handleSubmit(){
	$('#quiz-container').on('submit', function (event){
		event.preventDefault();
		checkCorrectAnswer();
		$('#quiz-container').addClass("hidden");
		$('#feedback-container').removeClass("hidden");
	})

}

//user click for next question
function handleNext(){
//update question number
	$('#feedback-container').on('click', '.js-next-button', function(event){
		// event.preventDefault();
		console.log('Next question!')
    $('#feedback-container').addClass("hidden");
		$('#feedback-container').removeClass("wrong-answer right-answer");
		$('#quiz-container').removeClass("hidden");
		updateQuestionNumber();
		render();
	});
}

function render(){
	renderQuestion();
	renderAnswerChoices();
	updateScore();
}

function runQuiz(){
	//all the functions to run on load
	console.log('Sushi Quiz ready to roll.');
	handleStart();
	handleSubmit();
	handleNext();
	newGame();
}

$(runQuiz);
