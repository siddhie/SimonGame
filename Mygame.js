
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];


let started = false;
let level = 0;



function nextsequence() {

    level++;
    $("h1").text("level " + level);
    let randomNumber = Math.floor(Math.random() * 4); //0-3.99999999
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // 1. Use jQuery to select the button with the same id as the randomChosenColour
    //2.Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step
    $("." + randomChosenColour).fadeOut(50).fadeIn(50);
    soundPlay(randomChosenColour);


}



$(document).click(function (event) {

    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    soundPlay(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function soundPlay(color) {
    let sound = new Audio("sounds/" + color + ".mp3");
    sound.play();

}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");

    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");

    }, 100);
}


$(document).keydown(function () {

    if (started === false) { 
        nextsequence(); 
        started = true;
    }

})


function checkAnswer(currentLevel){
     if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

         console.log("success");

        if(userClickedPattern.length == gamePattern.length)
         {
         setTimeout(function (){
         nextsequence();
        }, 1000);
        userClickedPattern = [];
        }
        }
    
    
        else{
            
            console.log("wrong");
            let wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            
            setTimeout(function(){
                $("body").removeClass("game-over");
                
            }, 200);
            startOver();
        }
}

function startOver(){
    started= false;
    level= 0;
    gamePattern= [];

}