const highScores = JSON.parse(localStorage.getItem("scoreList")) ?? [];
const highScoreList = document.getElementById("highscores");

highScoreList.innerHTML = highScores
  .map((scoreList) => `<li>${scoreList.userName} - - - ${scoreList.level}`)
  // .map((scoreList) => '<tr>')
  .join('');
