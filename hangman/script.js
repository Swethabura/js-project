

const hangmanImg = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboard = document.querySelector(".keyboard");
const gameModel = document.querySelector(".game-model");
const playagainBtn = document.querySelector(".play-again");

let currentWord,wrongGuessCount, correctedLetters;
const maxGuesses = 6;

const resetGame = () => {
    // resetting all game variables and ui elements
    wrongGuessCount = 0;
    correctedLetters = [];
    hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText =`${wrongGuessCount} / ${maxGuesses}`;
    keyboard.querySelectorAll("button").forEach(btn => btn.disabled =false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
}

// to select the random word and hint from the word list
const getRandomWord = () => {
    const { Word, Hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = Word;
    // console.log( Word);
    document.querySelector(".hint-text b").innerText = Hint;
    resetGame()

}

const gameOver = (isVictory) => {
    // showing the results status after the 300ms of game
    setTimeout(() => {
        const modelText = isVictory? `You found the word` : `The correct word was`;
        gameModel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");
    },300);
}

// checking the letter existence in the currentword
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        // showing all correct letters on word display
        [...currentWord].forEach((letter,index) => {
            if(letter === clickedLetter){
                correctedLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        // for wrong letter entry updating the hangamn image and increasing the count
        wrongGuessCount++;
        hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText =`${wrongGuessCount} / ${maxGuesses}`;

    // gameover or winning function based on condition
    if(wrongGuessCount==maxGuesses)  return gameOver(false);
    if(correctedLetters.length==currentWord.length)  return gameOver(true);
}

// creating keyboard buttons and even listener 
for(i=97;i<=122;i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i)
    keyboard.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, button.innerText.toLowerCase()));;
}

getRandomWord();

playagainBtn.addEventListener("click", getRandomWord);