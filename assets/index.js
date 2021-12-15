userChoice = [];
gameChoice = [];
choices = [1,2,3,4];
let one = document.getElementById("btn1");
let two = document.getElementById("btn2");
let three = document.getElementById("btn3");
let four = document.getElementById("btn4");
let start = document.getElementById("startbtn");

function clickOne(){
  userChoice.push(1);
  console.log(1);
}

function clickTwo(){
  userChoice.push(2);
  console.log(2);
}

function clickThree(){
  userChoice.push(3);
  console.log(3);
}

function clickFour(){
  userChoice.push(4)
  console.log(4);
}

function randomSequence(){
  gameChoice.push(Math.floor((Math.random() * 4) + 1));
}

function playGameChoice(){

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

}

function startGame(){
  randomSequence();
  playGameChoice();
}

one.onclick = clickOne;
two.onclick = clickTwo;
three.onclick = clickThree;
four.onclick = clickFour;

start.onclick = startGame;
