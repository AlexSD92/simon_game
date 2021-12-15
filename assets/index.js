userChoice = [];
gameChoice = [];
choices = [1,2,3,4];
// xxx = true;
let one = document.getElementById("btn1");
let two = document.getElementById("btn2");
let three = document.getElementById("btn3");
let four = document.getElementById("btn4");
let start = document.getElementById("startbtn");


function randomSequence(){ // generates random number between 1 and 4 and pushes it to gameChoice array
  gameChoice.push(Math.floor((Math.random() * 4) + 1));
}

function gameOver(){ // ends the game, activated if user makes an incorrect choice; empties both userChoice and gameChoice arrays
  userChoice = [];
  gameChoice = [];
}

function testChoice(){ // tests array equality by iteration
  for(i=0; i<=userChoice.length; i++){ // iterates through array and compares userChoice to gameChoice by individual array objects
    if(userChoice[i] === gameChoice[i] && userChoice.length < gameChoice.length){
      console.log("win");
    }
    else if(userChoice[i] === gameChoice[i] && userChoice.length === gameChoice.length){ // calls playGameChoice after one second to initial game turn
      userChoice = [];
      setTimeout(() => {playGameChoice()}, 1000);
    }
    else{console.log("You Lose"); gameOver();} // if user choice is incorrect at any stage, gameOver
  }
}

function animate(button){ // created for consistent code and animaation, used specifically for user clicks of simon buttons
  setTimeout(() => {
    button.classList.add("clicked");
    setTimeout(() => {button.classList.remove("clicked")}, 200);
  }, 100);
}

function waitUserChoice(){ // waits for the user choice, calls testChoice() on each user click of simon button and tests userChoice against gameChoice

  function clickOne(){
    userChoice.push(1);
    console.log(1);
    animate(one)
    testChoice();
  }

  function clickTwo(){
    userChoice.push(2);
    console.log(2);
    animate(two);
    testChoice();
  }

  function clickThree(){
    userChoice.push(3);
    console.log(3);
    animate(three);
    testChoice();
  }

  function clickFour(){
    userChoice.push(4)
    console.log(4);
    animate(four);
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

function startGame(){ // tied to start.onclick, initiates playGameChoice() after 1 second
  setTimeout(() => {
    playGameChoice();
  }, 1000)
}

start.onclick = startGame; // is this appropriate?
