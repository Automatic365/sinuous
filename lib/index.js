const Enemy = require('./enemy');
const Player = require('./player');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var enemies = [];
var smallEnemies = [];

const timesDo = x=> f=> {
  if (x > 0) {
    f()
    timesDo (x - 1) (f)
  }
}

function getRandomInput(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

timesDo(50)(() => enemies.push(new Enemy(getRandomInput(600, 799), getRandomInput(0, 600), 5, getRandomInput(1, 7), getRandomInput(1, 4), context, canvas)));
timesDo(20)(() => smallEnemies.push(new Enemy(getRandomInput(600, 799), getRandomInput(0, 600), 3, getRandomInput(1, 7), getRandomInput(1, 4), context, canvas)));

var player = new Player(400, 550, 5, context);

debugger

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  enemies.forEach(function (enemy) {
    enemy.draw().update();
   });
  smallEnemies.forEach(function (enemy) {
    enemy.draw().update();
   });
  player.draw().update();
  requestAnimationFrame(gameLoop);
});
