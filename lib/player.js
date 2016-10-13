function Player(x, y, radius, context) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.context = context  ;
}

Player.prototype.draw = function() {
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  this.context.fillStyle = 'blue';
  this.context.fill();
  return this;
};

Player.prototype.update = function() {
  var player = this
  document.addEventListener("mousemove", function(e) {
    player.x = e.clientX - 240;
    player.y = e.clientY - 10;
  });
  return this;
};

module.exports = Player;
