const Enemy = require('./enemy');
const Player = require('./player');

function Game(){

  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');
  var player = new Player(400, 550, 5, context);
  var enemies = [];

  function getRandomInput(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  drawScore = function(context) {
    context.font = '15px Acens';
    context.fillStyle = 'white';
    context.fillText("Score: " + player.score, 50, 50);
  };

  var createEnemies = function(number, enemies) {
    for (var i = 0; i < number; i++) {
      enemies.push(new Enemy(
        getRandomInput(600, 799),
        getRandomInput(0, 600),
        getRandomInput(3, 6),
        Math.random() * 3,
        Math.random() * 3,
        context,
        canvas
      ))
    }
  }
  createEnemies(70, enemies)

  function collisionDetectionEnemy(player, enemies) {
    enemies.forEach(function(enemy, index, enemies) {
      var xDistance = player.x - enemy.x;
      var yDistance = player.y - enemy.y;
      var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
      if (distance < player.radius + enemy.radius) {
        contextStyle("red")
        enemies.splice(index, 1);
        player.deductLife();
      }
    })
  }

  function collisionDetectionCanvas() {
    if (player.x <= 0 || player.x >= 800) {
      contextStyle("red")
      gameOver(player)
      player.currentLifeCount.length = 0
    } else if (player.y <= 0 || player.y >= 600) {
      contextStyle("red")
      gameOver(player)
      player.currentLifeCount.length = 0
    }
  }

  function contextStyle(input) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = input;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function gameOver(player) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var finalScore = player.score
  }

  function levelUP(enemies) {
    enemies.forEach(function (enemy) {
      enemy.xspeed = enemy.xspeed + (enemy.xspeed * 0.15)
      enemy.yspeed = enemy.yspeed + (enemy.yspeed * 0.15)
    });
  }

  function levels(enemies) {
    if (player.score == 1500) { levelUP(enemies) }
    if (player.score == 3000) { levelUP(enemies) }
    if (player.score == 4500) { levelUP(enemies) }
    if (player.score == 6000) { levelUP(enemies) }
    if (player.score == 6500) { levelUP(enemies) }
  }

  requestAnimationFrame(function gameLoop() {
    contextStyle("black");
    enemies.forEach(function (enemy) { enemy.draw().update(); });
    player.draw().update();
    collisionDetectionEnemy(player, enemies);
    collisionDetectionCanvas();
    if (player.lives() === 0) { gameOver(player); }
    levels(enemies);
    requestAnimationFrame(gameLoop);
    drawScore(context)
  });
}

module.exports = Game;
