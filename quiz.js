const round1 = [
    {
        question: "How many days makes a week ?",
        optionA: "10 days",
        optionB: "14 days",
        optionC: "5 days",
        optionD: "7 days",
        correctOption: "optionD"
    },

    {
        question: "How many players are allowed on a soccer pitch ?",
        optionA: "10 players",
        optionB: "11 players",
        optionC: "9 players",
        optionD: "12 players",
        correctOption: "optionB"
    },

    {
        question: "Who was the first President of USA ?",
        optionA: "Donald Trump",
        optionB: "Barack Obama",
        optionC: "Abraham Lincoln",
        optionD: "George Washington",
        correctOption: "optionD"
    },

    {
        question: "30 days has ______ ?",
        optionA: "January",
        optionB: "December",
        optionC: "June",
        optionD: "August",
        correctOption: "optionC"
    // }
];

const round2 = [
    {
        question: "Which is the longest river in the world ?",
        optionA: "River Nile",
        optionB: "Long River",
        optionC: "River Niger",
        optionD: "Lake Chad",
        correctOption: "optionA"
    },

    {
        question: "_____ is the hottest Continent on Earth ?",
        optionA: "Oceania",
        optionB: "Antarctica",
        optionC: "Africa",
        optionD: "North America",
        correctOption: "optionC"
    },

    {
        question: "Which country is the largest in the world ?",
        optionA: "Russia",
        optionB: "Canada",
        optionC: "Africa",
        optionD: "Egypt",
        correctOption: "optionA"
    },

    {
        question: "Which of these numbers is an odd number ?",
        optionA: "Ten",
        optionB: "Twelve",
        optionC: "Eight",
        optionD: "Eleven",
        correctOption: "optionD"
    }
];

const round3 = [    
    {
        question: "Where is the world tallest building located ?",
        optionA: "Africa",
        optionB: "California",
        optionC: "Dubai",
        optionD: "Italy",
        correctOption: "optionC"
    },

    {
        question: "The longest river in the United Kingdom is ?",
        optionA: "River Severn",
        optionB: "River Mersey",
        optionC: "River Trent",
        optionD: "River Tweed",
        correctOption: "optionA"
    },


    {
        question: "How many permanent teeth does a dog have ?",
        optionA: "38",
        optionB: "42",
        optionC: "40",
        optionD: "36",
        correctOption: "optionB"
    },

    {
        question: "Which national team won the football World cup in 2018 ?",
        optionA: "England",
        optionB: "Brazil",
        optionC: "Germany",
        optionD: "France",
        correctOption: "optionD"
    }
];


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0
var myInterval;
var roundNumber = 1;
var team1Score = 0;
var team2Score = 0;
var team3Score = 0;
var team4Score = 0;
var enableNext = true;


// function for displaying next question in the array to dom
function NextQuestion(index) {

    var team1ScoreEl = document.getElementById('team1-score');
    var team2ScoreEl = document.getElementById('team2-score');
    var team3ScoreEl = document.getElementById('team3-score');
    var team4ScoreEl = document.getElementById('team4-score');

    team1ScoreEl.textContent = team1Score;

    team2ScoreEl.textContent = team2Score;

    team3ScoreEl.textContent = team3Score;

    team4ScoreEl.textContent = team4Score;


    let currentQuestion = {};
    // handleQuestions()
    if(roundNumber ==1){
       currentQuestion = round1[index];
    }
    if(roundNumber ==2){
        currentQuestion = round2[index];
    }
    if(roundNumber ==3){
        currentQuestion = round3[index];
    }

    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
    document.getElementById("questionStart").play();
    document.getElementById('option-one').addEventListener("click", function(){
        document.getElementById("answerLock").play();   
    });
    document.getElementById('option-two').addEventListener("click", function(){
        document.getElementById("answerLock").play();   
    });
    document.getElementById('option-three').addEventListener("click", function(){
        document.getElementById("answerLock").play();   
    });
    document.getElementById('option-four').addEventListener("click", function(){
        document.getElementById("answerLock").play();   
    });   

    enableNext = false;
    
    
    var countdownNumberEl = document.getElementById('countdown-number');
    var countdown = 30;

    countdownNumberEl.textContent = countdown;
    document.getElementById("countdownTimer").play();

    if (roundNumber !=3) {
        myInterval = setInterval(function() {
          countdown = --countdown <= 0 ? "" : countdown;
          if(countdown.length <= 0) {
            document.getElementById("passAns").play();

          }

          countdownNumberEl.textContent = countdown;
        }, 1000);    
    }
    
    

}


function checkForAnswer() {
    var countdownNumberEl = document.getElementById('countdown-number');
    clearInterval(myInterval);
    document.getElementById("countdownTimer").pause();
    document.getElementById("countdownTimer").currentTime = 0;
    countdownNumberEl.textContent = "";


    // const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    let currentQuestion ;
    // handleQuestions()
    if(roundNumber ==1){
       currentQuestion = round1[indexNumber];
    }
    if(roundNumber ==2){
        currentQuestion = round2[indexNumber];
    }
    if(roundNumber ==3){
        currentQuestion = round3[indexNumber];
    }
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById("correctAns").play();
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById("wrongAns").play();
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
        enableNext = true;
    })


}

function showAnswerToQuestion() {
    checkForAnswer();
}



//called when the next button is called
function handleNextQuestion() {


    if (!enableNext) {
        document.getElementById('option-modal').style.display = "flex"
        return
    }

    if(roundNumber == 1 && round1.length == indexNumber){
        document.getElementById('round2-modal').style.display = "flex"
        document.getElementById("gameStart").play();
        unCheckRadioButtons()
        resetOptionBackground();
        return;
    }
    if(roundNumber == 2 && round2.length == indexNumber){
        document.getElementById('round3-modal').style.display = "flex"
        document.getElementById("gameStart").play();
        unCheckRadioButtons()
        resetOptionBackground();
        return;
    }
    if(roundNumber == 3 && round3.length == indexNumber){
        handleEndGame();
    }
    // checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 100) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 500);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let winnerName = "";
    let maxScore = 0;
    if(team1Score > maxScore){
        maxScore = team1Score;
    }
    if(team2Score > maxScore){
        maxScore = team2Score;
    }
    if(team3Score > maxScore){
        maxScore = team3Score;
    }
    if(team4Score > maxScore){
        maxScore = team4Score;
    }

    if (team1Score == maxScore){
        winnerName = winnerName + " Team1,";
    }
    if (team2Score == maxScore){
        winnerName = winnerName + " Team2,";
    }
    if (team3Score == maxScore){
        winnerName = winnerName + " Team3,";
    }
    if (team4Score == maxScore){
        winnerName = winnerName + " Team4,";
    }

    winnerName = winnerName.slice(0, winnerName.length-1);

    var winnerNameEl = document.getElementById('winner-name');
    winnerNameEl.textContent = winnerName;

    document.getElementById('final-modal').style.display = "flex";
    var team1fScoreEl = document.getElementById('team1-fscore');
    team1fScoreEl.textContent = team1Score;

    document.getElementById('final-modal').style.display = "flex";
    var team2fScoreEl = document.getElementById('team2-fscore');
    team2fScoreEl.textContent = team2Score;

    document.getElementById('final-modal').style.display = "flex";
    var team3fScoreEl = document.getElementById('team3-fscore');
    team3fScoreEl.textContent = team3Score;

    document.getElementById('final-modal').style.display = "flex";
    var team4fScoreEl = document.getElementById('team4-fscore');
    team4fScoreEl.textContent = team4Score;

    

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}

//function to close intro modal
function closeIntroModal() {
    document.getElementById('intro-modal').style.display = "none";
    document.getElementById('round1-modal').style.display = "flex";
    document.getElementById("gameStart").play();
}

//function to close intro modal
function OnStartQuiz() {
    document.getElementById('intro-modal').style.display = "flex"
}

//function to close intro modal
function closeRound1Modal() {
    document.getElementById('round1-modal').style.display = "none"
    NextQuestion(indexNumber)
    document.getElementById('decreaseTeam1Score').style.display = "none"
    document.getElementById('decreaseTeam2Score').style.display = "none"
    document.getElementById('decreaseTeam3Score').style.display = "none"
    document.getElementById('decreaseTeam4Score').style.display = "none"        
}

//function to close intro modal
function closeRound2Modal() {
    document.getElementById('round2-modal').style.display = "none"
    document.getElementById('decreaseTeam1Score').style.display = "flex"
    document.getElementById('decreaseTeam2Score').style.display = "flex"
    document.getElementById('decreaseTeam3Score').style.display = "flex"
    document.getElementById('decreaseTeam4Score').style.display = "flex"
    roundNumber = 2;
    indexNumber = 0;
    NextQuestion(indexNumber)
}

//function to close intro modal
function closeRound3Modal() {
    document.getElementById('round3-modal').style.display = "none"
    document.getElementById('countdown').style.display = "none"
    roundNumber = 3;
    indexNumber = 0;
    NextQuestion(indexNumber)
}

//function to increase team1 score
function increaseTeam1Score() {
    var team1ScoreEl = document.getElementById('team1-score');
    team1Score += 20; 
    team1ScoreEl.textContent = team1Score;
}

//function to decrease team1 score
function decreaseTeam1Score() {
    var team1ScoreEl = document.getElementById('team1-score');
    team1Score -= 10; 
    team1ScoreEl.textContent = team1Score;
}


//function to increase team2 score
function increaseTeam2Score() {
    var team2ScoreEl = document.getElementById('team2-score');
    team2Score += 20; 
    team2ScoreEl.textContent = team2Score;
}

//function to decrease team2 score
function decreaseTeam2Score() {
    var team2ScoreEl = document.getElementById('team2-score');
    team2Score -= 10; 
    team2ScoreEl.textContent = team2Score;
}


//function to increase team3 score
function increaseTeam3Score() {
    var team3ScoreEl = document.getElementById('team3-score');
    team3Score += 20; 
    team3ScoreEl.textContent = team3Score;
}

//function to decrease team3 score
function decreaseTeam3Score() {
    var team3ScoreEl = document.getElementById('team3-score');
    team3Score -= 10; 
    team3ScoreEl.textContent = team3Score;
}


//function to increase team1 score
function increaseTeam4Score() {
    var team4ScoreEl = document.getElementById('team4-score');
    team4Score += 20; 
    team4ScoreEl.textContent = team4Score;
}

//function to decrease team1 score
function decreaseTeam4Score() {
    var team4ScoreEl = document.getElementById('team4-score');
    team4Score -= 10; 
    team4ScoreEl.textContent = team4Score;
}



