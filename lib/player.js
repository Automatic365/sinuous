function Player(x, y, radius, context) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.context = context;
  this.score = 0;
  this.currentLifeCount = [1, 2, 3];
}

Player.prototype.draw = function() {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  this.context.fillStyle = 'blue';
  this.context.fill();
  return this;
};

Player.prototype.update = function() {
  var player = this;
  document.addEventListener("mousemove", function(e) {
    player.x = e.clientX - 240;
    player.y = e.clientY - 10;
  });
  if (this.currentLifeCount.length > 0) {
    this.score++;
  }
  return this;
};

Player.prototype.deductLife = function() {
  this.currentLifeCount.pop();
};

Player.prototype.lives = function() {
  return this.currentLifeCount.length;
};

Player.prototype.updateScore = function() {
  this.context.font = '20px Exo';
  this.context.fillStyle = 'white';
  this.context.fillText("Score: " + this.score, 50, 50);
};

Player.prototype.showLives = function() {
  this.context.font = '20px Exo';
  this.context.fillStyle = 'white';
  this.context.fillText("Lives: " + this.currentLifeCount.length, 340, 50);
};

module.exports = Player;
