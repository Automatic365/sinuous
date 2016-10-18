function Powerup(x, y, radius, xspeed, yspeed, context, canvas, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.context = context;
  this.canvas = canvas;
  this.color = color;
}

Powerup.prototype.draw = function() {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  this.context.fillStyle = this.color;
  this.context.fill();
  return this;
};



Powerup.prototype.update = function () {
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

// Powerup.prototype.slowDown = function(){
//
// };
//
// Powerup.prototype.shield = function(){
//
// };
//
// Powerup.prototype.minimizeEnemies = function(){
//
// };
//
// Powerup.prototype.oneUp(context) = function(){
// this.player.currentLifeCount.push(4)
// console.log(player.currentLifeCount.length)
// };

module.exports = Powerup;
