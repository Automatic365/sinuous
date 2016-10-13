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

module.exports = Player;
