const highScores = JSON.parse(localStorage.getItem(scoreList)) ?? [];
const highScoreList = document.getElementById("highscores");

highScoreList.innerHTML = highScores
  .map((score) => `<li>${score.score} - ${score.name}`)
  .join('');
