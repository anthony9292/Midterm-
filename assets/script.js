let navBar = document.querySelector('nav');
let highscoreLink = document.getElementById('highscore-link"');
let container = document.getElementById('container');
let timeDisplay = document.getElementById('timer');
let startButton = document.getElementById('start-button');
let title = document.getElementById('title');
let quizAnswers = document.getElementById('quiz-answers');
let answerButton = document.getElementById('answer-button');
let answerMessage = document.getElementById('answer-message');
let inputFields = document.getElementById('input-field');
let initials = document.getElementById('initials');
let submitButton = document.getElementById('submit-button');

//variables
let timerSecs = 0;
let currentQuestion = 0 
let score = 0;
let scoreArray = []
let timerInterval = false;

//starts quiz
function startQuiz() {

  timerSecs = 50;
  timerDisplay.textContent = timerSecs;
   
}
//starts timer countdown
countdown();

//starts  question page 
nextQuestion();

startButton.style.display = 'none';

// changes to next question 
function nextQuestion() { 

//changes the appearence of the page 
container.className = 'results-page mt-5'
title.textContent = 'Question' +(currentQuestion + 1); 
title.setAttribute('class', 'h2')
text.textContent = question[currentQuestion].title;
text.className = 'h4';
text.setAttribute('style', 'border-top: 1xp double #00093, padding-top: 20px')


}

//displays the answer button 
quizAnswers.style.display = 'block';

//takes answers form questions.js, and assigns them one by one to answerButton.
answerButton[0].textContent = question[currentQuestion].choices[0];
answerButton[1].textContent = question[currentQuestion].choices[1];
answerButton[2].textContent = question[currentQuestion].choices[2];
answerButton[3].textContent = question[currentQuestion].choices[3];

for()