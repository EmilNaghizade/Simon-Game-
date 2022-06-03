var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// Game status
var started = false;
// Level Status
var level = 0;

// If player press the a button the call nextSequence function
$(document).keydown(function(event){
  if (!started ){

    // If game started the change the h1 to the Level 0
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
   
  }
})

// Button Clicked
$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  // Play sound when button clicked
  playSound(userChosenColour)
  // Animation shows up when button clicked
  animatePress(userChosenColour);

  // Call checkAnswer
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
    }else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }    


  

}

function nextSequence() {

  userClickedPattern = [];

  // Inside the nextSequence increase the level status
  level++;

  $("#level-title").text("Level " + level)

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Button flash animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Button sound
  playSound(randomChosenColour);
 
  
}

// 
function playSound(name){

   // Button sound
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();

}


function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    },100);
  

}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}