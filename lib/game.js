const Enemy = require('./enemy');
const Player = require('./player');

function Game(){

  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');
  var enemies = [];

  const timesDo = x=> f=> {
    if (x > 0) {
      f()
      timesDo (x - 1) (f)
    }
  }

  function getRandomInput(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var player = new Player(400, 550, 5, context);

  drawScore = function(context) {
    context.font = '15px Acens';
    context.fillStyle = 'white';
    context.fillText("Score: " + player.score, 50, 50);
  };

  timesDo(70)(() => enemies.push(new Enemy(
    getRandomInput(600, 799),
    getRandomInput(0, 600),
    getRandomInput(3, 6),
    Math.random() * 3.25,
    Math.random() * 3.25,
    context,
    canvas
  )));

  // timesDo(20)(() => enemies.push(new Enemy(
  //   getRandomInput(600, 799),
  //   getRandomInput(0, 600),
  //   3,
  //   Math.random() * 6,
  //   Math.random() * 6,
  //   context,
  //   canvas
  // )));

  var player = new Player(400, 550, 5, context);

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
      // call game over method
    } else if (player.y <= 0 || player.y >= 600) {
      contextStyle("red")
      // call game over method
    }
  }

  function contextStyle(input) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = input;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function gameOver() {
    return console.log("GAME OVER");
  }

  requestAnimationFrame(function gameLoop() {
    contextStyle("black");
    enemies.forEach(function (enemy) { enemy.draw().update(); });
    player.draw().update();
    collisionDetectionEnemy(player, enemies);
    collisionDetectionCanvas();
    if (player.lives() === 0) { gameOver(); }
    requestAnimationFrame(gameLoop);
    drawScore(context)
  });
}

module.exports = Game;
