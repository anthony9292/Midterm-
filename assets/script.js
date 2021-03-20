let navBar = document.querySelector('nav');
let highscoreLink = document.getElementById('highscores-link');
let container = document.getElementById('container');
let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start-button');
let title = document.getElementById('title');
let text = document.getElementById ('text');
let quizAnswers = document.getElementById('quiz-answers');
let answerButton = document.getElementsByClassName('answer-button');
let answerMessage = document.getElementById('answer-message');
let inputFields = document.getElementById('input-field');
let initials = document.getElementById('initials');
let submitButton = document.getElementById('submit-button');

//variables
let timerSecs = 0;
let currentQuestion = 0;
let score = 0;
let scoreArray = [];
let timerInterval = false;

//starts quiz
function startQuiz() {
  timerSecs = 50;
  timerDisplay.textContent = timerSecs;

//starts timer countdown
countdown();

//starts  question page
nextQuestion();

startButton.style.display = 'none';
}
// changes to next question
function nextQuestion() {
  //changes the appearence of the page
  container.className = 'results-page mt-5';
  title.textContent = 'Question ' + (currentQuestion + 1);
  title.setAttribute('class', 'h2');
  text.textContent = question[currentQuestion].title;
  text.className = 'h4';
  text.setAttribute('style','border-top: 1xp double #00093, padding-top: 20px')

  //displays the answer button
  quizAnswers.style.display = 'block';

  //takes answers form questions.js, and assigns them one by one to answerButton.
  answerButton[0].textContent = question[currentQuestion].choices[0];
  answerButton[1].textContent = question[currentQuestion].choices[1];
  answerButton[2].textContent = question[currentQuestion].choices[2];
  answerButton[3].textContent = question[currentQuestion].choices[3];

  for (i = 0; i < answerButton.length; i++) {
    answerButton[i].addEventListener('click', checkAnswer);
  }
}

//checks if answer matches input
function checkAnswer(event) {
  //checks if button/answer values are the same
  console.log('User chose : ' + event.target.textContent);
  console.log('Correct answer:' + question[currentQuestion].answer);

  //checks if selected question is correct and increases the score
  if (event.target.textContent === question[currentQuestion].answer) {
    answerMessage.style.display = 'block';
    answerMessage.textContent = 'Correct!';
    answerMessage.className = 'answer-message';
    currentQuestion++;
    score++;

    //function to make message disappear after a set time
    setTimeout(function () {
      answerMessage.style.display = 'none';
    }, 800);

    //funtion to make game end after 5 questions
    if (currentQuestion == question.length) {
      endGame();

      //function if it hasn't reached 5 go to next question
    } else {
      nextQuestion();
    }

    //function if answered incorrect decrease time and move on to next question
  } else {
    currentQuestion++;
    answerMessage.style.display = 'block';
    answerMessage.textContent = 'incorrect!';
    answerMessage.className = 'answer-message';

    //disappears after set time
    setTimeout(function () {
      answerMessage.style.display = 'none';
    }, 800);

    //ends game if timer is less then 5 seconds.
    if (timerSecs < 5) {
      timerSecs -= 5;
      endGame();
      // ends the game if on last question.
    } else if (currentQuestion === 5) {
      endGame();
      //subtracts remaining time and moves on to the next question
    } else {
      timerSecs -= 5;
      nextQuestion();
    }
  }
}

function endGame() {
  quizAnswers.style.display = 'none';
  container.className = 'quiz-page mt-5';
  title.setAttribute('class,h2');
  text.setAttribute('style', 'border-top: 0');
  text.removeAttribute('class');
  text.textContent =
    'Score' + score + '.Enter initials to see high score table';
  inputFields.style.display = 'block';

  if (timerSecs <= 0) {
    title.textContent = 'out of time';
  } else {
    title.textContent = 'finished';
  }

  submitButton.addEventListener('click', storeHighScore);
}

function storeHighScore(event) {
  event.preventDefault();

  if (initials.value.length === 0) {
    return;
  } else {
    newScore = {
      userName: initials.value.trim(),
      userScore: score,
    };
    scoreArray.push(newScore);
    scoreArray.sort((a, b) => b.userScore - a.userScore);

    localStorage.setItem('score', JSON.stringify(scoreArray));

    seeHighScores();
  }
}

function loadHighScore() {
 storedScores = JSON.parse(localStorage.getItem('score'));

 // saves into array if score isn't empty 
 if (storedScores !== null) {
     scoreArray = storedScores;

     // return the new scoreArray value
     return scoreArray;
 }
}

function seeHighScores() { 
 if(timerInterval) { 

 clearInterval(timerInterval);

 };


  container.className = 'score-page mt-5 card bg-light p-4';
  let ul = document.createElement('ul');
  let returnButton = document.createElement('button');
  let clearButton = document.createElement('button');
  returnButton.textContent = 'Back';
  clearButton.textContent = 'Delete high Score';
  container.appendChild(ul);
  container.appendChild(returnButton);
  container.appendChild(clearButton);

  startButton.style.display = 'none';
  navBar.style.visibility = 'hidden';
  title.textContent = 'High Scores';
  text.textContent = '';
  text.setAttribute('style', 'border-top: 0');
  quizAnswers.style.display = 'none';
  inputFields.style.display = 'none';

  for (i = 0; i < scoreArray.length; i++) {
    let score = scoreArray[i].userName + ': ' + scoreArray[i].userName;

    li = document.createElement('li');
    li.textContent = score;
    ul.appendChild(li);
  }

  returnButton.addEventListener('click', function () {
    location = "index.html";
  });

  clearButton.addEventListener('click', function () {
    localStorage.clear();
    ul.innerHTML = '';
  });
}

//countdown timer(starts at timersecs)
function countdown() {
  timerInterval = setInterval(function () {
    timerSecs--;
    timerDisplay.textContent = timerSecs;

    if (timerSecs > 1) {
      timerDisplay.textContent = 0;
      endGame();
      clearInterval(timerInterval);
    }

    if (currentQuestion === 5) {
      timerDisplay.textContent = timerSecs;
      clearInterval(timerInterval);
    }
  }, 1000);
}


function handleFirstTab(e) { 

if (e.keyCode  === 9) { 

document.body.classList.add('user-is-tabbing'); 
window.removeEventListener.apply('keydown', handleFirstTab); 

}

}

//checks if user uses keyboard 
window.addEventListener('keydown', handleFirstTab); 

loadHighScore(); 

// even listener when you click the start button 
startButton.addEventListener('click', startQuiz); 


highscoreLink.addEventListener('click', seeHighScores);