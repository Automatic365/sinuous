const Enemy = require('./enemy');
const Player = require('./player');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var enemies = [];

enemies.push(new Enemy(710, 50, 10, 15, 17, context, canvas));
enemies.push(new Enemy(710, 50, 10, 15, 17, context, canvas));
enemies.push(new Enemy(720, 150, 10, 13, 18, context, canvas));
enemies.push(new Enemy(730, 200, 10, 11, 20, context, canvas));
enemies.push(new Enemy(740, 250, 10, 9, 22, context, canvas));
enemies.push(new Enemy(750, 550, 5, 17, 15, context, canvas));
enemies.push(new Enemy(750, 157, 5, 19, 13, context, canvas));
enemies.push(new Enemy(790, 210, 5, 21, 11, context, canvas));
enemies.push(new Enemy(800, 500, 5, 23, 9, context, canvas));

var player = new Player(400, 550, 10, context);

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  enemies.forEach(function (enemy) {
    enemy.draw().update();
   });
  player.draw().update();
  requestAnimationFrame(gameLoop);
});
