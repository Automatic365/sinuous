var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

function Enemy(x, y, width, height, xspeed, yspeed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
}

Enemy.prototype.draw = function () {
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
};

Enemy.prototype.update = function () {
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

var blocks = [];

blocks.push(new Enemy(710, 50, 10, 10, 15, 17));
blocks.push(new Enemy(720, 150, 10, 10, 13, 18));
blocks.push(new Enemy(730, 200, 10, 10, 11, 20));
blocks.push(new Enemy(740, 250, 10, 10, 9, 22));

blocks.push(new Enemy(750, 550, 5, 5, 17, 15));
blocks.push(new Enemy(750, 157, 5, 5, 19, 13));
blocks.push(new Enemy(790, 210, 5, 5, 21, 11));
blocks.push(new Enemy(800, 500, 5, 5, 23, 9));

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  blocks.forEach(function (block) {
    block.draw();
    block.update();
   });
  requestAnimationFrame(gameLoop);
});
