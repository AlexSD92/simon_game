// https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68

userChoice = [];
gameChoice = [];
choices = [1,2,3,4];
let level = 1;
let one = document.getElementById("btn1");
let two = document.getElementById("btn2");
let three = document.getElementById("btn3");
let four = document.getElementById("btn4");
let start = document.getElementById("startbtn");
let btn1Sound = new Audio("assets/sounds/btn1Sound.mp3");
let btn2Sound = new Audio("assets/sounds/btn2Sound.mp3");
let btn3Sound = new Audio("assets/sounds/btn3Sound.mp3");
let btn4Sound = new Audio("assets/sounds/btn4Sound.mp3");
let gameOverSound = new Audio("assets/sounds/gameOverSound.mp3");
let gameOverMsg = document.getElementById("gameover");


function randomSequence(){ // generates random number between 1 and 4 and pushes it to gameChoice array
  gameChoice.push(Math.floor((Math.random() * 4) + 1));
}

function gameOver(){ // ends the game, activated if user makes an incorrect choice; empties both userChoice and gameChoice arrays
  gameOverMsg.classList.remove("hidden");
  one.classList.add("hidden");
  two.classList.add("hidden");
  three.classList.add("hidden");
  four.classList.add("hidden");
  // userChoice = [];
  // gameChoice = [];
  gameOverSound.play();
}

function testChoice(){ // tests array equality by iteration

  for (i=0;i<userChoice.length;i++){
      if(userChoice.length < gameChoice.length){
          if(userChoice[i] === gameChoice[i]){
              console.log("win");
          }
          else if(userChoice[i] !== gameChoice[i]){
              console.log("<game over");
              gameOver();
          }
      }
      else if(userChoice.length === gameChoice.length){
          if(userChoice[i] === gameChoice[i]){
              console.log("next round");

          }
          else if(userChoice[i] !== gameChoice[i]){
              console.log("=game over");
              gameOver();
          }
      }
  }
}



function animate(button){ // created for consistent code and animaation, used specifically for user clicks of simon buttons
  setTimeout(() => {
    button.classList.add("clicked");
    setTimeout(() => {button.classList.remove("clicked")}, 200);
  }, 100);
}

function waitUserChoice(){ // waits for the user choice, calls testChoice() on each user click of simon button and tests userChoice against gameChoice

  userChoice = [];

  function clickOne(){
    userChoice.push(1);
    console.log(1);
    animate(one)
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
    userChoice.push(4)
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

function playGameChoice(){ // plays the games turn, animations in place for each gameChoice made, calls waitUserChoice at the end

  randomSequence();

  for (i=0; i<gameChoice.length; i++){

      switch(gameChoice[i]){

        case 1:
        setTimeout(() => {
          one.classList.add("clicked");
          btn1Sound.play();
          setTimeout(() => {one.classList.remove("clicked")}, 500);
        }, i*1000);
        break;

        case 2:
        setTimeout(() => {
          two.classList.add("clicked");
          btn2Sound.play();
          setTimeout(() => {two.classList.remove("clicked")}, 500);
        }, i*1000);
        break;

        case 3:
        setTimeout(() => {
          three.classList.add("clicked");
          btn3Sound.play();
          setTimeout(() => {three.classList.remove("clicked")}, 500);
        }, i*1000);
        break;

        case 4:
        setTimeout(() => {
          four.classList.add("clicked");
          btn4Sound.play();
          setTimeout(() => {four.classList.remove("clicked")}, 500);
        }, i*1000);
        break;

      }

  }

  waitUserChoice();

}

function startGame(){ // tied to start.onclick, initiates playGameChoice() after 1 second
  setTimeout(() => {
    playGameChoice();
  }, 1000)
}

start.onclick = startGame; // is this appropriate?
