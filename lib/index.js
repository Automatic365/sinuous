  const Game = require('./game');
  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

  function defaultScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '55px Acens';
    context.fillStyle = 'red';
    context.fillText("Sinuous", 300, 235);
    context.fillText("Slap the spacebar to begin.", 100, 300);
  }
  defaultScreen();

   document.onkeydown = function(e){
     if(e.code === "Space"){
      new Game(canvas, context);
     }
   };
