  const Game = require('./game');
  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

  function defaultScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '55px Exo';
    context.fillStyle = 'red';
    context.fillText("Sinuous", 300, 175);
    context.font = '20px Exo';
    context.fillText("Directions:", 175, 275);
    context.fillText("* Avoid red enemy dots and the grey boarder", 175, 325);
    context.fillText("* Collide with green dots for +1 life", 175, 360);
    context.fillText("* Place your cursor so that it is hidden inside the boarder", 175, 395);
    context.fillText("* Use your trackpad or mouse to move the blue player ball", 175, 430);
    context.fillText("* Click within the browser window so that it is your active page", 175, 465);
    context.fillText("* Slap the SPACEBAR to begin.", 175, 500);
  }
  defaultScreen();

  document.onkeydown = function(e){
   if(e.code === "Space"){
     new Game(canvas, context);
   }
  };
