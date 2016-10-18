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
    context.font = '50px Acens';
    context.fillStyle = 'red';
    context.fillText("GAME OVER", 250, 235);
    context.fillText("YOUR FINAL SCORE", 175, 290);
    context.fillText(player.score, 350, 345);
  }

  function levelUP(enemies) {
    enemies.forEach(function (enemy) {
      enemy.xspeed *= 1.15
      enemy.yspeed *= 1.15
    });
  }

  function levels(enemies, context) {
    if (player.score === 1500) { levelUP(enemies) }
    if (player.score === 3000) { levelUP(enemies) }
    if (player.score === 4500) { levelUP(enemies) }
    if (player.score === 6000) { levelUP(enemies) }
    if (player.score === 7500) { levelUP(enemies) }
  }

  function currentLevel(context) {
    if (player.score > 7500) {
      drawLevel(context, 6)
    } else if (player.score > 6000 ) {
      drawLevel(context, 5)
    } else if (player.score > 4500 ) {
      drawLevel(context, 4)
    } else if (player.score > 3000 ) {
      drawLevel(context, 3)
    } else if (player.score > 1500 ) {
      drawLevel(context, 2)
    } else {
      drawLevel(context, 1)
    }
  }

  function drawLevel(context, level) {
    context.font = '20px Acens';
    context.fillStyle = 'white';
    context.fillText("Level: " + level, 675, 50);
  }

  requestAnimationFrame(function gameLoop() {
    contextStyle("black");
    enemies.forEach(function (enemy) { enemy.draw().update(); });
    player.draw().update();
    player.updateScore();
    collisionDetectionEnemy(player, enemies);
    collisionDetectionCanvas();
    if (player.lives() === 0) { gameOver(player); }
    levels(enemies, context);
    currentLevel(context);
    requestAnimationFrame(gameLoop);
  });
}

module.exports = Game;
