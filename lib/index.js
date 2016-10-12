var canvas;
var canvasContext;
var ballX = 750;
var ballSpeedX = 15;
var ballY = 50;
var ballSpeedY = 17;

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

  //
  //
  // function Enemy(x, y, width, height, xspeed, yspeed) {
  //   this.x = x;
  //   this.y = y;
  //   this.width = width;
  //   this.height = height;
  //   this.xspeed = xspeed;
  //   this.yspeed = yspeed;
  // }

  function drawEverything() {
    colorRect(0,0,canvas.width,canvas.height, 'black');
    colorCircle(ballX, ballY, 10, 'red')
    colorCircle(752, 52, 10, 'red')
    // colorCircle(ballX, 48, 5, 'red')
    // colorCircle(300, ballY, 5, 'red')
    // colorCircle(ballY, ballX, 10, 'red')
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
