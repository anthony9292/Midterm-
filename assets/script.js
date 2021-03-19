var game = {
state: {

startButton: $("#start-Button"), 
gameContainer: $("#game"), 
scoreNumber: $("#score-number"),
questionsView: $(".questions"),
gameEndView: $("#game-end"),
gameEndViewTimesUp: $("#game-end-times-up"),
gameEndText: $("#game-end-text"),
timeOutText: $("#time-out-text"),
gauge: $("#gauge"),
questions: $(".question"),
answers: $(".answer"),
timer: $("#timer"),
indicators: $(".indicator"),
numberOfQuestions: $(".question").length,
questionsAnswered: 0,
correctAnswers: 0
  },

Int: function() {

  game.registerEventHandlers();

},

registerEventHandlers: function() {

    game.state.answers.on("click touch", function(e) { 
          //e.preventDefualt()
          game.checkAnswer($(this));
        

});
   game.state.startButton.on("click touch", function(e) {

     e.preventDefualt();
     game.start();
   });

},

start: function() { 

game.state.gameContainer.addClass("show");
$("html, body").animate(    

{  

  scrollTop: game.state.gameContainer.offset().top -10


},
400,
game.startTimer()
);

game.start.startButton.unbind("click touch");

},

startTimer: function() {

var zeroFill = function(units) {

return units <10 ? "0" + units + "" : units;

};

var count = 0; 

var interval = window.setInterval(function() { 
var centisecondsRemaining = 2000 - count; 
var min = Math.floor(centisecondsRemaining / 100 / 60);
var sec = zeroFill(math.floor(centisecondsRemaining / 100 % 60));
var cs = zeroFill(centisecondsRemaining % 100);
game.state.timer.text(min + ":" + sec + ":" + cs);
count++;
if(centisecondsRemaining ===0) {
clearInterval(interval);
//game.endGame()
game.timesUp();

}

 if(game.questionsAnswered ===game.state.numberOfQuestions) {
   clearInterval(interval);

 }
}, 10);
}

checkAnswer: function(answer) { 
   if(answer)



}



}

}