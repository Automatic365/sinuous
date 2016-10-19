  const Game = require('./game');
  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

  function defaultScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '50px Acens';
    context.fillStyle = 'red';
    context.fillText("Sinuous", 250, 235);
    context.fillText("Click the canvas to play.", 175, 290);
  }
  defaultScreen();

  canvas.onclick = function() {
    new Game(canvas, context);
   };
