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
	const questionNumber = $('.question-number');
	const questionArea = $('.question-area');

	if (currentQuestion < STORE.length){
		questionNumber.html()
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

//textual feedback for wrong answer
function answerIsWrong(){
	console.log('WRONG!');
	$('.feedback').html(`<strong>WRONG!</strong> The correct answer is: ${STORE[currentQuestion].correctAnswer}`)
	incorrectScore++;
}

//textual feedback for right answer
function answerIsRight(){
	console.log('Answer is Correct!');
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
	questionNumber.html(`Question ${currentQuestion+1} of 10`);
}

function endGame(){
	$('#endgame-container').removeClass("hidden");
	$('.end-score').html(`You scored ${correctScore} out of 10 points`);
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
	$('#quiz-container').on('click', '.js-submit-button', function (event){
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
		$('#quiz-container').removeClass("hidden");
		currentQuestion++;
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
