userChoice = [];
gameChoice = [];
choices = [1,2,3,4];
// xxx = true;
let one = document.getElementById("btn1");
let two = document.getElementById("btn2");
let three = document.getElementById("btn3");
let four = document.getElementById("btn4");
let start = document.getElementById("startbtn");


function randomSequence(){
  gameChoice.push(Math.floor((Math.random() * 4) + 1));
}

function testChoice(){
  for(i=0; i<userChoice.length; i++){
    if(userChoice[i] === gameChoice[i] && userChoice.length < gameChoice.length){
      console.log("win");
    }
    else if(userChoice[i] === gameChoice[i] && userChoice.length === gameChoice.length){
      userChoice = [];
      playGameChoice();
    }
    else{console.log("You Lose")}
  }
}

function waitUserChoice(){

  function clickOne(){
    userChoice.push(1);
    console.log(1);
    testChoice();
  }

  function clickTwo(){
    userChoice.push(2);
    console.log(2);
    testChoice();
  }

  function clickThree(){
    userChoice.push(3);
    console.log(3);
    testChoice();
  }

  function clickFour(){
    userChoice.push(4)
    console.log(4);
    testChoice();
  }

  one.onclick = clickOne;
  two.onclick = clickTwo;
  three.onclick = clickThree;
  four.onclick = clickFour;

}

function playGameChoice(){

  randomSequence();

  for (i=0; i<gameChoice.length; i++){

      switch(gameChoice[i]){

        case 1:
        setTimeout(() => {
          one.classList.add("clicked");
          setTimeout(() => {one.classList.remove("clicked")}, 500);
        }, i*1000);
        break;

        case 2:
        setTimeout(() => {
          two.classList.add("clicked");
          setTimeout(() => {two.classList.remove("clicked")}, 500);
        }, i*1000);
        break;

        case 3:
        setTimeout(() => {
          three.classList.add("clicked");
          setTimeout(() => {three.classList.remove("clicked")}, 500);
        }, i*1000);
        break;

        case 4:
        setTimeout(() => {
          four.classList.add("clicked");
          setTimeout(() => {four.classList.remove("clicked")}, 500);
        }, i*1000);
        break;

      }

  }

  waitUserChoice();

}

function startGame(){
  playGameChoice();
}

start.onclick = startGame;
