// https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68

userChoice = [];
gameChoice = [];
let level = 1;
let one = document.getElementById("btn1");
let two = document.getElementById("btn2");
let three = document.getElementById("btn3");
let four = document.getElementById("btn4");
let start = document.getElementById("startbtn");
let reset = document.getElementById("resetbtn");
let btn1Sound = new Audio("assets/sounds/btn1Sound.mp3");
let btn2Sound = new Audio("assets/sounds/btn2Sound.mp3");
let btn3Sound = new Audio("assets/sounds/btn3Sound.mp3");
let btn4Sound = new Audio("assets/sounds/btn4Sound.mp3");
let btnWrapper = document.getElementById("btnwrapper");
let gameOverSound = new Audio("assets/sounds/gameOverSound.mp3");
let gameOverMsg = document.getElementById("gameover");
let levelHeader = document.getElementById("levelheader");
let levelNumber = document.getElementById("levelnumber");
// const NO_OF_HIGH_SCORES = 10;
// const HIGH_SCORES = 'highScores';
// const highScoreString = localStorage.getItem(HIGH_SCORES);
// const highScores = JSON.parse(highScoreString) ?? [];

const scoreList = JSON.parse(localStorage.getItem("scoreList") ?? []);
// https://stackoverflow.com/questions/43762363/how-to-store-an-array-of-objects-in-local-storage

const no_of_scores = 10;

// ↓↓↓ https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68=

function pushScore(){

  const userName = prompt("You got a new score! Enter your name:");
  // JSON.stringify(userName);

  const newScore = {level, userName};

  scoreList.push(newScore);

  scoreList.sort((a, b) => b.level - a.level);

  scoreList.splice(no_of_scores);

  localStorage.setItem("scoreList", JSON.stringify(scoreList));

}

function checkScores(){

  const currentScores = JSON.parse(localStorage.getItem(scoreList)) ?? [];
  const lowestScore = scoreList[no_of_scores - 1]?.level ?? 0;

  if (level > lowestScore){
    pushScore();
  }

}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
// https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage

// ↑↑↑ https://michael-karen.medium.com/how-to-save-high-scores-in-local-storage-7860baca9d68=

function randomSequence(){ // generates random number between 1 and 4 and pushes it to gameChoice array
  gameChoice.push(Math.floor((Math.random() * 4) + 1));
}

function animate(button){ // created for consistent code and animaation, used specifically for user clicks of simon buttons
  setTimeout(() => {
    button.classList.add("clicked");
    setTimeout(() => {button.classList.remove("clicked")}, 200);
  }, 100);
}

function startClicked(){
  animate(start);
  startGame();
}

function resetClicked(){
  animate(reset);
  userChoice = [];
  gameChoice = [];
  level = 1;
  levelNumber.innerHTML = level;
  start.classList.remove("hidden");
  reset.classList.add("hidden");
  one.classList.remove("hidden");
  two.classList.remove("hidden");
  three.classList.remove("hidden");
  four.classList.remove("hidden");
  gameOverMsg.classList.add("hidden");
}

function gameOver(){ // ends the game, activated if user makes an incorrect choice; empties both userChoice and gameChoice arrays
  gameOverMsg.classList.remove("hidden");
  one.classList.add("hidden");
  two.classList.add("hidden");
  three.classList.add("hidden");
  four.classList.add("hidden");
  reset.classList.remove("hidden");

  gameOverSound.play();
  checkScores();
}

function testChoice(){ // tests array equality by iteration

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

      else if(userChoice.length === gameChoice.length){
        if(userChoice[userChoice.length - 1] !== gameChoice[gameChoice.length -1]){
            console.log("=game over");
            gameOver();
          }
        else if(userChoice[userChoice.length - 1] === gameChoice[gameChoice.length -1]){
            console.log("next round");
            userChoice = [];
            level++;
            setTimeout(playGameChoice, 2000);
          }
      }



  // for (i=0;i<userChoice.length;i++){
  //     if(userChoice.length < gameChoice.length){
  //       if(userChoice[i] === gameChoice[i]){
  //           console.log("win");
  //       }
  //       else if(userChoice[i] !== gameChoice[i]){
  //         console.log("<game over");
  //         gameOver();
  //       }
  //     }
  //     else if(userChoice.length >= gameChoice.length){
  //       if(userChoice[i] !== gameChoice[i]){
  //           console.log("=game over");
  //           gameOver();
  //         }
  //       else if(userChoice[i] === gameChoice[i]){
  //           console.log("next round");
  //           userChoice = [];
  //           level++;
  //           setTimeout(playGameChoice, 2000);
  //         }
  //     }
  // }
}


function waitUserChoice(){

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
  levelNumber.innerHTML = level;


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
  start.classList.add("hidden");
  levelHeader.classList.remove("hidden");
  levelNumber.innerHTML = level
  setTimeout(() => {
    playGameChoice();
  }, 1000)
}

reset.onclick = resetClicked;
start.onclick = startClicked;
