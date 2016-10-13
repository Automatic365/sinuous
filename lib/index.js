// const Enemy = require('./enemy');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


function Enemy(x, y, radius, xspeed, yspeed) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
}

Enemy.prototype.draw = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  context.fillStyle = 'red';
  context.fill();
  return this;
};

Enemy.prototype.update = function() {
  this.x = this.x + this.xspeed;
  this.y = this.y + this.yspeed;
  if (this.x < 0) {
    this.x = 800
    this.xspeed = -this.xspeed
  }
  if (this.x > canvas.width) {
    this.xspeed = -this.xspeed
  }
  if (this.y < 0) {
    this.yspeed = -this.yspeed
  }
  if (this.y > canvas.height) {
    this.y = 0
    this.yspeed = -this.yspeed
  }
  return this;
};

var enemies = [];

enemies.push(new Enemy(710, 50, 10, 15, 17));
enemies.push(new Enemy(720, 150, 10, 13, 18));
enemies.push(new Enemy(730, 200, 10, 11, 20));
enemies.push(new Enemy(740, 250, 10, 9, 22));
enemies.push(new Enemy(750, 550, 5, 17, 15));
enemies.push(new Enemy(750, 157, 5, 19, 13));
enemies.push(new Enemy(790, 210, 5, 21, 11));
enemies.push(new Enemy(800, 500, 5, 23, 9));

function Player(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
}

Player.prototype.draw = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  context.fillStyle = 'blue';
  context.fill();
  return this;
};

Player.prototype.update = function() {
  document.addEventListener("mousemove", function(e) {
    player.x = e.clientX - 240;
    player.y = e.clientY - 10;
  });
  return this;
};

const player = new Player(400, 550, 10);

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
