/*jshint esversion: 11 */
let userChoice = [];
let gameChoice = [];
let userTurn = document.getElementById("userturn");
let computerTurn = document.getElementById("computerturn");
let level = 1;
let one = document.getElementById("redbutton");
let two = document.getElementById("greenbutton");
let three = document.getElementById("bluebutton");
let four = document.getElementById("yellowbutton");
let start = document.getElementById("startbtn");
let reset = document.getElementById("resetbtn");
let btn1Sound = new Audio("assets/sounds/btn1Sound.mp3");
let btn2Sound = new Audio("assets/sounds/btn2Sound.mp3");
let btn3Sound = new Audio("assets/sounds/btn3Sound.mp3");
let btn4Sound = new Audio("assets/sounds/btn4Sound.mp3");
let gameOverSound = new Audio("assets/sounds/gameoverSound.mp3");
let gameOverMsg = document.getElementById("gameover");
let levelHeader = document.getElementById("levelheader");
let levelNumber = document.getElementById("levelnumber");
let submit = document.getElementById("submitname");
let submittedMsg = document.getElementById("scoresubmitted");
let form = document.getElementById("enterdetails");
let name = document.getElementById("namefield");
const no_of_scores = 3;
let i;

// https://stackoverflow.com/questions/43762363/how-to-store-an-array-of-objects-in-local-storage


// https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68=
// https://stackoverflow.com/questions/17087636/how-to-save-data-from-a-form-with-html5-local-storage

/* checks whether the score achieved is greater than the lowest score in localstorage, if it is, the form is displayed to take the score, on click pushScore is activated
pushScore takes the name from the form field, the score achieved and pushes it in to scoreList locally */

function checkScores(){

  function pushScore(){

    levelHeader.classList.add("hidden");
    submittedMsg.classList.remove("hidden");
    form.classList.add("hidden");
    let userName = name.value;
    const newScore = {level, userName};
    scoreList.push(newScore);
    scoreList.sort((a, b) => b.level - a.level);
    scoreList.splice(no_of_scores);
    localStorage.setItem("scoreList", JSON.stringify(scoreList));

  }

  const scoreList = JSON.parse(localStorage.getItem("scoreList")) ?? [];
  const lowestScore = scoreList[no_of_scores - 1]?.level ?? 0;

  if (level > lowestScore){
    form.classList.remove("hidden");
    // pushScore();
    submit.onclick = pushScore;
  }

}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
// https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage

/* generates random number between 1 and 4 and pushes it to gameChoice array */

function randomSequence(){
  gameChoice.push(Math.floor((Math.random() * 4) + 1));
}

/* created for consistent code and animaation, used specifically for user clicks of simon buttons */

function animate(button){
  setTimeout(() => {
    button.classList.add("clicked");
    setTimeout(() => {button.classList.remove("clicked");}, 200);
  }, 100);
}

/* begins the game */

function startClicked(){
  animate(start);
  startGame();
}

/* refreshes the page if the reset button is clicked */

function resetClicked(){
  animate(reset);
  window.location.reload();
  if (event.keyCode == 13) {
  event.preventDefault();
}
}

/* ends the game, activated if user makes an incorrect choice; empties both userChoice and gameChoice arrays */

function gameOver(){
  gameOverMsg.classList.remove("hidden");
  one.classList.add("hidden");
  two.classList.add("hidden");
  three.classList.add("hidden");
  four.classList.add("hidden");
  reset.classList.remove("hidden");
  userTurn.classList.add("hidden");
  computerTurn.classList.add("hidden");

  gameOverSound.play();
  setTimeout(checkScores, 1000);
}

/* tests array equality by iteration */

function testChoice(){

      /* while userChoice is less than the gameChoice length; if choices are equivalent, the game continues, if they are not, gameOver */

      if(userChoice.length < gameChoice.length){
        for (i=0;i<userChoice.length;i++){
          if(userChoice[i] === gameChoice[i]){
              console.log("win");
          }
          else if(userChoice[i] !== gameChoice[i]){
            console.log("<game over");
            gameOver();
          }
        }
      }

      /* if arrays are equal in length, test for equality; inequality, gameOver, equality, playGameChoice
      user controls are deactivated by removing the event listener for the simon buttons */

      else if(userChoice.length === gameChoice.length){
        if(userChoice[userChoice.length - 1] !== gameChoice[gameChoice.length -1]){
            console.log("=game over");
            gameOver();
          }

        else if(userChoice[userChoice.length - 1] === gameChoice[gameChoice.length -1]){
            console.log("next round");
            userChoice = [];
            one.onclick = null;
            two.onclick = null;
            three.onclick = null;
            four.onclick = null;
            level++;
            setTimeout(playGameChoice, 2000);
          }
      }
}

/* while the userChoice is equivalent to the gameChoice, waitUserchoice is activate
after each userChoice, the choice is tested against the gameChoice array
if at any point the userChoice is incorrect, testChoice calls gameOver */

function waitUserChoice(){

  userTurn.classList.remove("hidden");
  computerTurn.classList.add("hidden");

    function clickOne(){
      userChoice.push(1);
      console.log(1);
      animate(one);
      btn1Sound.play();
      testChoice();
    }

    function clickTwo(){
      userChoice.push(2);
      console.log(2);
      animate(two);
      btn2Sound.play();
      testChoice();
    }

    function clickThree(){
      userChoice.push(3);
      console.log(3);
      animate(three);
      btn3Sound.play();
      testChoice();
    }

    function clickFour(){
      userChoice.push(4);
      console.log(4);
      animate(four);
      btn4Sound.play();
      testChoice();
    }

    one.onclick = clickOne;
    two.onclick = clickTwo;
    three.onclick = clickThree;
    four.onclick = clickFour;

  }

/* plays the games turn, animations in place for each gameChoice made, calls waitUserChoice at the end */

function playGameChoice(){

  randomSequence();
  levelNumber.innerHTML = level;
  userTurn.classList.add("hidden");
  computerTurn.classList.remove("hidden");

  /* while i is less than gameChoice.length, the game switches on the button values 1-4, animating and playing sound accordingly */

  setTimeout(() => {
    for (i=0; i<gameChoice.length; i++){

        switch(gameChoice[i]){

          case 1:
          setTimeout(() => {
            one.classList.add("clicked");
            btn1Sound.play();
            setTimeout(() => {one.classList.remove("clicked");}, 500);
          }, i*1000);
          break;

          case 2:
          setTimeout(() => {
            two.classList.add("clicked");
            btn2Sound.play();
            setTimeout(() => {two.classList.remove("clicked");}, 500);
          }, i*1000);
          break;

          case 3:
          setTimeout(() => {
            three.classList.add("clicked");
            btn3Sound.play();
            setTimeout(() => {three.classList.remove("clicked");}, 500);
          }, i*1000);
          break;

          case 4:
          setTimeout(() => {
            four.classList.add("clicked");
            btn4Sound.play();
            setTimeout(() => {four.classList.remove("clicked");}, 500);
          }, i*1000);
          break;

        }
    }
    setTimeout(() => {waitUserChoice();}, i * 1000);
  }, 500);
}

/* tied to start.onclick, initiates playGameChoice() after 1 second */

function startGame(){
  start.classList.add("hidden");
  computerTurn.classList.remove("hidden");
  levelHeader.classList.remove("hidden");
  levelNumber.innerHTML = level;
  setTimeout(() => {
    playGameChoice();
  }, 1000);
}

reset.onclick = resetClicked;
start.onclick = startClicked;

/* prevents keys from triggering buttons or subitting forms */
/* https://tutorial.eyehunts.com/js/disable-enter-key-on-an-input-field-in-javascript-example-code/ */

document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }
});
