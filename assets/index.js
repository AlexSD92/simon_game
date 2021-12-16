userChoice = [];
gameChoice = [];
choices = [1,2,3,4];
let one = document.getElementById("btn1");
let two = document.getElementById("btn2");
let three = document.getElementById("btn3");
let four = document.getElementById("btn4");
let start = document.getElementById("startbtn");
let x = new Boolean(true);
let btn1Sound = new Audio("assets/sounds/btn1Sound.mp3");
let btn2Sound = new Audio("assets/sounds/btn2Sound.mp3");
let btn3Sound = new Audio("assets/sounds/btn3Sound.mp3");
let btn4Sound = new Audio("assets/sounds/btn4Sound.mp3");
let gameOverSound = new Audio("assets/sounds/gameOverSound.mp3");


function randomSequence(){ // generates random number between 1 and 4 and pushes it to gameChoice array
  gameChoice.push(Math.floor((Math.random() * 4) + 1));
}

function gameOver(){ // ends the game, activated if user makes an incorrect choice; empties both userChoice and gameChoice arrays
  userChoice = [];
  gameChoice = [];
  // gameOverSound.play();
}

function testChoice(){ // tests array equality by iteration
  for(i=0; i<=userChoice.length; i++){ // iterates through array and compares userChoice to gameChoice by individual array objects
    if(userChoice.length < gameChoice.length){
      if(userChoice[i] === gameChoice.slice(0, userChoice.length)[i]){
        console.log("win");
      }
      else{console.log("lose"); x = Boolean(false);}
    }
    else if(userChoice.length === gameChoice.length){
      if(userChoice[i] === gameChoice.slice(0, userChoice.length)[i]){
        console.log("win");
        userChoice = [];
        setTimeout(() => {playGameChoice()}, 2000);
      }
      else{console.log("lose"); x = Boolean(false);}
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

while(x === true){
  testChoice();
}

  function clickOne(){
    userChoice.push(1);
    console.log(1);
    animate(one)
    btn1Sound.play();
    // testChoice();
  }

  function clickTwo(){
    userChoice.push(2);
    console.log(2);
    animate(two);
    btn2Sound.play();
    // testChoice();
  }

  function clickThree(){
    userChoice.push(3);
    console.log(3);
    animate(three);
    btn3Sound.play();
    // testChoice();
  }

  function clickFour(){
    userChoice.push(4)
    console.log(4);
    animate(four);
    btn4Sound.play();
    // testChoice();
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
