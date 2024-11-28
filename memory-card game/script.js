const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;

function flipCard(e){
    let clickedCard = e.target //getting user clicked card
    
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add('flip');
        if(!cardOne){
        // return the cardone value to the clickboard
        return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        
        let cardOneImg = cardOne.querySelector("img").src,
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg,cardTwoImg);
    }
}

function matchCards(img1,img2){
    if(img1 == img2){
    matchedCard++; //increment value by one
    // if matchedCard value is that means user has matched all the cards (8*2 = 16cards)
        if(matchedCard == 8) {
        setTimeout(() => {
            return shuffuleCard();  //shuffling the card after 1 second
        }, 1000);
    }

    cardOne.removeEventListener("click",flipCard)
    cardTwo.removeEventListener("click",flipCard)
    cardOne = cardTwo = ""; //setting both card values to blank
    disableDeck = false;
    return; 
    }

    // if two cards not matched
    setTimeout(() => {
        // adding shake class after 400 milli seconds
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        // removing shake and flip class after 1200 milli seconds
        cardOne.classList.remove("shake","flip");
        cardTwo.classList.remove("shake","flip");
        cardOne = cardTwo = ""; //setting both card values to blank
        disableDeck = false;
    }, 1200);
}

function shuffuleCard(){
    // setting all the values to default
    matchedCard = 0;
    disableDeck = false;
    cardOne = cardTwo = "";

    // creating array of 16 items and each item is repeated twice
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); //sorting the array randomly

    // removing flip class to all cards and passing random image to each card
    cards.forEach((card,index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
        
    });

}

shuffuleCard();

// adding event to all cards

cards.forEach(card => {
    // card.classList.add("flip");
    card.addEventListener("click", flipCard);
});
