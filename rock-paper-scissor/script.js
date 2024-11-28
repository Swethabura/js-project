const choiceBtns = document.querySelectorAll(".choice-btn");

let playerResultValue = "";
let cpuResultValue = "";

let playerChoiceText = document.querySelector(".player-choice-text");
let cpuChoiceText = document.querySelector(".cpu-choice-text");
let displayResult = document.querySelector(".title-head");
let scoreWonText = document.querySelector(".score-won-text");
let scoreDrawText = document.querySelector(".score-draw-text");
let scoreLoseText = document.querySelector(".score-lost-text");


const choiceEmoji = {
    rock: "✊",
    paper: "🖐",
    scissors:"✌️"
}

// console.log(choiceEmoji.rock);

// The function to get the choice button when clicked
choiceBtns.forEach(choiceBtn => {
    choiceBtn.addEventListener("click", () => {

        // to prevent the btn for selection during the game
        choiceBtns.forEach(btn => {
            btn.style.pointerEvents = "none";
        });

        displayResult.textContent = "Let's Play!";
        playerChoiceText.textContent = "✊";  //to set rock everytime start the game
        cpuChoiceText.textContent = "✊";

        playerResultValue = choiceBtn.value
    //    console.log(playerResultValue);
        cpuResultValue = getCpuResultValue();

        // console.log("Player: ",playerResultValue);
        // console.log("cpu: ",cpuResultValue);

        // adding animation before announcing the result
        playerChoiceText.classList.add('player-choice-anime');
        cpuChoiceText.classList.add('cpu-choice-anime');
        
        // to show the result after 2 seconds
        setTimeout(() => {
            
            playerChoiceText.textContent = choiceEmoji[playerResultValue];
            cpuChoiceText.textContent = choiceEmoji[cpuResultValue];
            
            playerChoiceText.classList.remove('player-choice-anime');
            cpuChoiceText.classList.remove('cpu-choice-anime');
            showGameResult();

            // turning on the btns after showing the result
            choiceBtns.forEach(btn => {
                btn.style.pointerEvents = "visible"
            });
        },2000);

       
    })
    
});

// function to create randmoize values for cpu

function getCpuResultValue(){
    const cpuOptions = ["rock","paper","scissors"];
    cpuRandomChoice = cpuOptions[Math.floor(Math.random()*cpuOptions.length )];

    return cpuRandomChoice;
    
}

// function to decide the winning or losing or draw
function showGameResult(){
  if(playerResultValue == cpuResultValue){
    displayResult.textContent = "Draw!";
    scoreDrawText.textContent++;
  }else if (
    playerResultValue == "rock" &&
    cpuResultValue  == "scissors"
    ||
    playerResultValue == "paper" &&
    cpuResultValue == "rock"
    || 
    playerResultValue == "scissors" &&
    cpuResultValue == "paper"
  ){
    displayResult.textContent = "You Won!"
    scoreWonText.textContent++;
  }else{
    displayResult.textContent = "You lose!"
    scoreLoseText.textContent++;
  }
}