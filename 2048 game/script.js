var board;
let score = 0;
var rows = 4;
var columns = 4;
let gameOverPage = document.querySelector(".gameOverPage");

window.onload = function(){
    setGame();
};

function setGame(){
    board  = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    // board  = [
    //     [2,2,2,2],
    //     [2,2,2,2],
    //     [4,4,8,8],
    //     [4,4,8,8]
    // ]

    for(let r = 0; r < rows; r++){
        for(c = 0; c < columns; c++){
            //creating id's for tiles like 0-0
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function hasEmptyTile(){
    for(r=0;r<rows;r++){
        for(c=0;c<columns;c++){
            if(board[r][c]==0){
                return true;
            }
        }
    }
    return false;
}

function setTwo(){
    if(!hasEmptyTile()){
        return;
    }


    let found = false;
    while(!found){
        // creating random r, c
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let array = [2,4,8];
        if(board[r][c]==0){
            let value = array[Math.floor(Math.random()*array.length)];
            board[r][c] = value;
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText = value;
            tile.classList.add("x"+value);
            found = true;
        }
    }
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList like "tile x2---->x4----> x8"
    tile.classList.add("tile");
    if(num > 0){
        tile.innerText = num;
        if(num<=4096){
            tile.classList.add("x"+ num.toString());
        }else{
            tile.classList.add("x8192");
        }
    }
}

let inputDisabled = false;

// eventlistner to the arrow keys
document.addEventListener("keyup",(e) => {
    if (inputDisabled) return;  // If input is disabled, don't do anything

    if(e.code == "ArrowLeft"){
        slideLeft();
        setTwo();
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }
    else if(e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if(e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    // Update score
    document.getElementById("score").innerText = score;
    

    // Check if the game is over
    if (checkGameOver()) {
        setTimeout(()=>{
       inputDisabled = true;  // Disable input during game over
       gameOverPage.innerText = "Game Over! Starting a new game.";
       gameOverPage.style.display = "block";  // Show Game Over message
    },1000);

    setTimeout(() => {
        resetGame();  // Restart the game if over
        gameOverPage.style.display = "none";  // Hide Game Over message
        inputDisabled = false;  // Re-enable input after reset
    }, 2000);
    }
});

function filterZero(row){
    return row.filter(num => num !==0) //creates a newarray without zeros
}

function slide(row){
    // [0,2,2,2]
    row = filterZero(row);  //get rid of zeros
    // slide
    for(i=0;i<row.length-1;i++){
        if(row[i]==row[i+1]){
            row[i]*=2;
            row[i+1]=0;
            score+= row[i];
        }  //[2,2,2]---->[4,0,2]
    }

    row = filterZero(row);  //[4,2]
    // adding zeros at the end
    while(row.length<columns){
        row.push(0);
    }   //[4,2,0,0]
    return row;
}

function slideLeft(){
    for(let r =0; r< rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideRight(){
    for(let r =0; r< rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for(c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideUp(){
    for(c=0;c<columns;c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // after sliding reassigning the values to row
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2]; 
        // board[3][c] = row[3];   //instaed we can write board[r][c] = row[r]
        for(r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
        
    }
}

function slideDown(){
    for(c=0;c<columns;c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // after sliding reassigning the values to row
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2]; 
        // board[3][c] = row[3];   //instaed we can write board[r][c] = row[r]
        for(r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
        
    }
}

// checking for the gameover condition
function checkGameOver() {
    // Check for empty tiles (if there's any 0 on the board)
    if (hasEmptyTile()) {
        return false;  // Game is not over, there are empty spaces
    }

    // Check for possible merges:
    // Check horizontally (left-right)
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            if (board[r][c] === board[r][c + 1]) {
                return false;  // Tiles can merge horizontally
            }
        }
    }

    // Check vertically (top-down)
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 1; r++) {
            if (board[r][c] === board[r + 1][c]) {
                return false;  // Tiles can merge vertically
            }
        }
    }

    // If no empty tiles and no possible merges, the game is over
    return true;
}


// reset the game and call the setgame function to start
function resetGame() {
    score = 0;
    document.getElementById("score").innerText = score;

    // Reset the board
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // Clear all tiles on the board
    let boardElement = document.getElementById("board");
    boardElement.innerHTML = '';

    // Recreate the game board
    setGame();
}
