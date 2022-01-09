/* pulls highscores from local storage and displays them under id highscores
displayed in descending order of score, then alphabetically */

const highScores = JSON.parse(localStorage.getItem("scoreList")) ?? [];
const highScoreList = document.getElementById("highscores");

highScoreList.innerHTML = highScores
  .map((scoreList) => `<li>${scoreList.userName} - ${scoreList.level}`)
  .join('');
