

const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;
let body = document.querySelector('body');


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (noClicking === true) {
    return;
  }
  if (event.target.classList.contains('flipped')){
    return;
  }

  let selectedCard = event.target;
  selectedCard.style.backgroundColor = selectedCard.classList[0];

  if (card1 === null || card2 === null){
    selectedCard.classList.add('flipped');
    card1 = card1 || selectedCard;
    card2 = selectedCard === card1 ? null : selectedCard;
  }

  if (card1 && card2) {
    noClicking = true;
    let junt1 = card1.className;
    let junt2 = card2.className;

    if (junt1 === junt2){
      cardsFlipped += 2;
      showScore();
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped')
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 250)
    }
  }
  
  if (cardsFlipped === COLORS.length) {
    makeRestartBtn();
    setTimeout(function(){alert('YOU WIN!!!!!!')}, 500)
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function makeRestartBtn() {
  let restart = document.createElement('button');
  restart.innerText = 'Restart';
  body.appendChild(restart);
  restart.addEventListener('click', function(event) {
    restartGame();
    restart.remove();
    score.innerText = 'Score: 0'
  })
}

function showScore(){
  let score = document.querySelector('#score');
  score.innerText = `Score: ${cardsFlipped}`;
}

function restartGame() {
  removeAllChildNodes(gameContainer);
  shuffle(COLORS)
  createDivsForColors(shuffledColors);
  noClicking = false;
  cardsFlipped = 0;
  card1 = null;
  card2 = null;
}

let startBtn = document.querySelector('#start');

startBtn.addEventListener('click', function(event) {
  createDivsForColors(shuffledColors);
  event.target.remove();
})




// when the DOM loads


/* */