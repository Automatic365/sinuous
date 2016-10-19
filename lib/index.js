  const Game = require('./game');
  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

  function defaultScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '55px Exo';
    context.fillStyle = 'red';
    context.fillText("Sinuous", 300, 175);
    context.fillText("_______", 290, 176);
    context.font = '20px Exo';
    context.fillText("Directions:", 250, 275);
    context.fillText("_________", 249, 276);
    context.fillText("* Avoid red enemy dots", 250, 300);
    context.fillText("* Avoid the grey boarder", 250, 325);
    context.fillText("* Collide with green dots for +1 life", 250, 350);
    context.fillText("* Place your cursor so that it is hidden inside the boarder", 250, 375);
    context.fillText("* Use your trackpad or mouse to move the blue player ball", 250, 400);
    context.fillText("* Slap the SPACEBAR to begin.", 250, 425);
  }
  defaultScreen();

   document.onkeydown = function(e){
     if(e.code === "Space"){
      new Game(canvas, context);
     }
   };
