const Enemy = require('./enemy');
const Player = require('./player');
const Powerup = require('./powerup');

function Game(canvas, context){
  var player = new Player(400, 550, 5, context);
  var enemies = [];
  var powerups = [];

  function getRandomInput(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var createEnemies = function(number, enemies) {
    for (var i = 0; i < number; i++) {
      enemies.push(new Enemy(
        getRandomInput(600, 799),
        getRandomInput(0, 600),
        getRandomInput(3, 6),
        Math.random() * 3,
        Math.random() * 3,
        context,
        canvas
      ));
    }
  };
  createEnemies(70, enemies);

  var createPowerups = function(number, powerups) {
    for (var i = 0; i < number; i++) {
      powerups.push(new Powerup(
        getRandomInput(600, 799),
        getRandomInput(0, 600),
        6,
        Math.random() * 3,
        Math.random() * 3,
        context,
        canvas,
        'green'
      ));
    }
  };
  createPowerups(1, powerups);

  function collisionDetectionEnemy(player, enemies) {
    for (var i = 0; i < enemies.length; i++){
      // enemies.forEach(function(enemy, index, enemies) {
      var xDistance = player.x - enemies[i].x;
      var yDistance = player.y - enemies[i].y;
      var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
      if (distance < player.radius + enemies[i].radius) {
        contextStyle("red");
        enemies.splice(i, 1);
        player.deductLife();
      }
    }
  }

  function collisionDetectionPowerup(player, powerups) {
    powerups.forEach(function(powerup, index, powerups) {
      var xDistance = player.x - powerup.x;
      var yDistance = player.y - powerup.y;
      var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
      if (distance < player.radius + powerup.radius) {
        contextStyle(powerup.color);
        powerups.splice(index, 1);
        createPowerups(1, powerups);
        if(powerup.color === 'green'){
          oneUp();
        }
      }
    });
  }

  function oneUp(){
    player.currentLifeCount.push(1);
  }

  function collisionDetectionCanvas() {
    if (player.x <= 0 || player.x >= 800) {
      contextStyle("red");
      gameOver(player);
      player.currentLifeCount.length = 0;
    } else if (player.y <= 0 || player.y >= 600) {
      contextStyle("red");
      gameOver(player);
      player.currentLifeCount.length = 0;
    }
  }

  function contextStyle(input) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = input;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function gameOver(player) {
    saveScore();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '50px Exo';
    context.fillStyle = 'red';
    context.fillText("GAME OVER", 250, 235);
    context.fillText("YOUR FINAL SCORE:", 175, 290);
    context.fillText(player.score, 350, 345);
    context.fillText("HIGH SCORE:", 250, 450);
    context.fillText(localStorage.highScore, 350, 505);
    context.fillText("Click the canvas to play.", 175, 385);
    canvas.onclick = function() {
       restartGame();
    };
  }

  Game.prototype.restartGame = function(){
    player = new Player(400, 550, 5, context);
    enemies = [];
    powerups = [];
    createEnemies();
    createPowerups();
  }

  function levelUP(enemies) {
    enemies.forEach(function (enemy) {
      enemy.xspeed *= 1.15;
      enemy.yspeed *= 1.15;
    });
  }

  function levels(enemies) {
    if (player.score === 1500) { levelUP(enemies); }
    if (player.score === 3000) { levelUP(enemies); }
    if (player.score === 4500) { levelUP(enemies); }
    if (player.score === 6000) { levelUP(enemies); }
    if (player.score === 7500) { levelUP(enemies); }
  }

  function currentLevel(context) {
    if (player.score > 7500) {
      drawLevel(context, 6);
    } else if (player.score > 6000 ) {
      drawLevel(context, 5);
    } else if (player.score > 4500 ) {
      drawLevel(context, 4);
    } else if (player.score > 3000 ) {
      drawLevel(context, 3);
    } else if (player.score > 1500 ) {
      drawLevel(context, 2);
    } else {
      drawLevel(context, 1);
    }
  }

  function saveScore() {
    if (!localStorage.highScore || player.score > localStorage.highScore) {
      localStorage.highScore = player.score;
    }
  }


  function drawLevel(context, level) {
    context.font = '20px Exo';
    context.fillStyle = 'white';
    context.fillText("Level: " + level, 675, 50);
  }

  function drawAndUpdateEnemies(enemies) {
    console.log(enemies.length);
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].draw().update();
    }
  }

  requestAnimationFrame(function gameLoop() {
    contextStyle("black");
    drawAndUpdateEnemies(enemies);
    powerups.forEach(function (powerup) { powerup.draw().update(); });
    player.draw().update();
    player.updateScore();
    player.showLives();
    collisionDetectionEnemy(player, enemies);
    collisionDetectionPowerup(player, powerups);
    collisionDetectionCanvas();
    if (player.lives() === 0) { gameOver(player); }
    levels(enemies, context);
    if (player.score < 7500){currentLevel(context);}
    requestAnimationFrame(gameLoop);
  });
}



module.exports = Game;
