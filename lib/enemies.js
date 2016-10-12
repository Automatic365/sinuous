var canvas;
var canvasContext;
var ballX = 750;
var ballSpeedX = 15;
var ballY = 50;
var ballSpeedY = 10;

window.onload = function() {
  canvas = document.getElementById('game');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);


  function moveEverything() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(ballX < 0){
      ballX = 800
      ballSpeedX = -ballSpeedX
    }
    if(ballX > canvas.width){
      ballSpeedX = -ballSpeedX
    }
    if(ballY < 0){
      ballSpeedY = -ballSpeedY
    }
    if(ballY > canvas.height){
      ballY = 0
      ballSpeedY = -ballSpeedY
    }
  }

  function drawEverything() {
    colorRect(0,0,canvas.width,canvas.height, 'black');
    colorRect(0,210,10,100, 'white');
    colorCircle(ballX, ballY, 10, 'white')
  }

  function colorRect(x,y,width,height,drawColor){
    canvasContext.fillStyle = drawColor
    canvasContext.fillRect(x,y,width,height)
  }

  function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
  }
}


module.exports = Enemy;
