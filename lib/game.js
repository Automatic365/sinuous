Game.prototype.drawScore = function(context){
  context.fillStyle = 'black';
  context.fillText('score: ' + this.player.score, 50, 50)
}
