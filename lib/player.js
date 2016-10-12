function Player() {
  this.x = 40
  this.y = 50
  this.width = 50
  this.height = 50
  // this.radius = 10
}

Player.prototype.draw = function() {
  canvasContext.beginPath();
  // this.canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  canvasContext.fillRect(this.x, this.y, this.width, this.height)
  canvasContext.fillStyle = "blue";
  canvasContext.fill();
  canvasContext.closePath();
  return this
}

// var player = new Player
// player.draw()

// Player.prototype.move = function() {
//
// }
module.exports = Player;
