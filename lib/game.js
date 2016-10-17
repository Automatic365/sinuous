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

  timesDo(50)(() => enemies.push(new Enemy(
    getRandomInput(600, 799),
    getRandomInput(0, 600),
    5,
    getRandomInput(1, 10),
    getRandomInput(1, 4),
    context,
    canvas
  )));

  timesDo(20)(() => enemies.push(new Enemy(
    getRandomInput(600, 799),
    getRandomInput(0, 600),
    3,
    getRandomInput(1, 7),
    getRandomInput(1, 4),
    context,
    canvas
  )));

  var player = new Player(400, 550, 5, context);

  function collisionDetection(player, enemies) {

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
    collisionDetection(player, enemies);
    if (player.lives() === 0) { gameOver(); }
    requestAnimationFrame(gameLoop);
    drawScore(context)
  });
}

module.exports = Game;
