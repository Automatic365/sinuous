function Enemy(x, y, radius, xspeed, yspeed, context, canvas) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.context = context;
  this.canvas = canvas;
}

Enemy.prototype.draw = function () {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  this.context.fillStyle = 'red';
  this.context.fill();
  return this;
};

Enemy.prototype.update = function () {
  this.x = this.x + this.xspeed;
  this.y = this.y + this.yspeed;
  if (this.x < 0) {
    this.x = 800;
    this.xspeed = -this.xspeed;
  }
  if (this.x > this.canvas.width) {
    this.xspeed = -this.xspeed;
  }
  if (this.y < 0) {
    this.yspeed = -this.yspeed;
  }
  if (this.y > this.canvas.height) {
    this.y = 0;
    this.yspeed = -this.yspeed;
  }
  return this;
};

module.exports = Enemy;
