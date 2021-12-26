const highScores = JSON.parse(localStorage.getItem("scoreList")) ?? [];
const highScoreList = document.getElementById("highscores");

highScoreList.innerHTML = highScores
  .map((scoreList) => `<li>${scoreList.level} - ${scoreList.userName}`)
  .join('');
