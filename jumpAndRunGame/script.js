let character = document.getElementById("character");
let characterBottom = parseInt(
  window.getComputedStyle(character).getPropertyValue("bottom")
);
let characterRight = parseInt(
  window.getComputedStyle(character).getPropertyValue("right")
);
let characterWidth = parseInt(
  window.getComputedStyle(character).getPropertyValue("width")
);
let ground = document.getElementById("ground");
let groundHeight = parseInt(
  window.getComputedStyle(ground).getPropertyValue("height")
);
let isJumping = false;
let upTime;
let downTime;
let displayScore = document.getElementById('score');
let score = 0;
let gameOverMessage = document.querySelector('.gameOverMessage');
let gamePaused = false; // To track if the game is paused

let startButton = document.getElementById('startButton');
let startScreen = document.getElementById('startScreen'); // Game start screen

// Score update interval, which we will start after the game begins
let scoreInterval;

// Function to start the game
function startGame() {
  // Hide the start screen and show the game area
  startScreen.style.display = 'none';

  // Start the game
  score = 0;  // Reset score to zero when game starts
  displayScore.innerText = score;
  gamePaused = false;
  gameOverMessage.style.display = 'none'; // Hide game over message

  // Start score update timer
  scoreInterval = setInterval(showScore, 100);

  // Start generating obstacles
  generateObstacle();
}

// Function to update score
function showScore() {
  if (!gamePaused) { // Update score only if the game is not paused
    score++;
    displayScore.innerText = score;
  }
}

function jump() {
  if (isJumping || gamePaused) return; // Do nothing if the game is paused

  upTime = setInterval(() => {
    if (characterBottom >= groundHeight + 250) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        if (characterBottom <= groundHeight + 10) {
          clearInterval(downTime);
          isJumping = false;
        }
        characterBottom -= 10;
        character.style.bottom = characterBottom + "px";
      }, 20);
    }
    characterBottom += 10;
    character.style.bottom = characterBottom + "px";
    isJumping = true;
  }, 20);
}

function generateObstacle() {
  if (gamePaused) return; // Stop generating obstacles if the game is paused

  let obstacles = document.querySelector(".obstacles");
  let obstacle = document.createElement("div");
  obstacle.setAttribute("class", "obstacle");
  obstacles.appendChild(obstacle);

  let randomTimeout = Math.floor(Math.random() * 1000) + 1000;
  let obstacleRight = -30;
  let obstacleBottom = 100;
  let obstacleWidth = 30;
  let obstacleHeight = Math.floor(Math.random() * 50) + 50;
  obstacle.style.backgroundColor = `rgb(${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;

  function moveObstacle() {
    if (gamePaused) return; // Stop moving obstacles if the game is paused
    
    obstacleRight += 5;
    obstacle.style.right = obstacleRight + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    obstacle.style.width = obstacleWidth + "px";
    obstacle.style.height = obstacleHeight + "px";

    if (
      characterRight >= obstacleRight - characterWidth &&
      characterRight <= obstacleRight + obstacleWidth &&
      characterBottom <= obstacleBottom + obstacleHeight
    ) {
        endGame();
    }
  }

  let obstacleInterval = setInterval(moveObstacle, 20);
  let obstacleTimeout = setTimeout(generateObstacle, randomTimeout);
}

function endGame() {
    gamePaused = true; // Pause the game
    clearInterval(upTime); // Stop jump intervals
    clearInterval(downTime); // Stop down intervals

    // Stop generating obstacles
    let obstacles = document.querySelector(".obstacles");
    let allObstacles = obstacles.getElementsByClassName("obstacle");
    for (let i = 0; i < allObstacles.length; i++) {
      clearInterval(allObstacles[i].interval); // Clear any ongoing obstacle movement
    }

    // Stop the score interval when the game ends
    clearInterval(scoreInterval);

    // Show Game Over message
    gameOverMessage.style.display = 'block';
    gameOverMessage.innerHTML = `Game Over!<br>Your score is : ${score}`;

    // After 1.5 minutes (90 seconds), reload the game
    setTimeout(() => {
        location.reload(); // Reload the page
    }, 2000); // 1.5 minutes (90 seconds)
}

function control(e) {
  if (e.key == "ArrowUp" || e.key == " ") {
    jump();
  }
}

document.addEventListener("keydown", control);

// Start button event listener
startButton.addEventListener("click", startGame);
