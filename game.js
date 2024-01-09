var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var first = true;
var level = 0;

$(document).keypress(function() {
        if (first) {
            nextSequence();
            first = false;
        }
});

$(".btn").click(function() {
    console.log("inside");
    if(!first) {
    var userChosenColour = $(this).attr('id');
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    for(var i=0; i<userClickedPattern.length; i++) {
        checkAnswer(i, userChosenColour);
    }
}
});

function playAudio(colour) {
switch (colour) {
    case "blue":
        var audio = new Audio("sounds/blue.mp3");
        audio.play();
        break;
    case "green":
        var audio = new Audio("sounds/green.mp3");
        audio.play();
        break;
    case "red":
        var audio = new Audio("sounds/red.mp3");
        audio.play();
        break;
    case "yellow":
        var audio = new Audio("sounds/yellow.mp3");
        audio.play();
        break;
    case "wrong":
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        break;
}
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");
    setTimeout(function(){
        $('#' + currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel, userChosenColour) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        playAudio(userChosenColour);
        animatePress(userChosenColour);
        console.log("success");
        if (currentLevel+1 === (gamePattern.length)) {
            console.log("finished");
            userClickedPattern = [];
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("failure");
        playAudio("wrong");
        animatePress(userChosenColour);
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
        first = true;
    }
}

function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).animate({opacity: 0});
    playAudio(randomChosenColour);
    $('#' + randomChosenColour).animate({opacity: 1});
}



