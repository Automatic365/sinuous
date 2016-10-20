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

  function createGameElements(number, collection, Object) {
    for (var i = 0; i < number; i++) {
      collection.push(new Object(
        getRandomInput(600, 799),
        getRandomInput(0, 600),
        getRandomInput(3, 6),
        Math.random() * 3,
        Math.random() * 3,
        context,
        canvas
      ));
    }
  }
  createGameElements(70, enemies, Enemy);
  createGameElements(1, powerups, Powerup);

  function collisionDetectionEnemy(player, enemies) {
    enemies.forEach(function(enemy, index, enemies) {
      var xDistance = player.x - enemy.x;
      var yDistance = player.y - enemy.y;
      var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
      if (distance < player.radius + enemy.radius) {
        contextStyle("red");
        enemies.splice(index, 1);
        player.deductLife();
      }
    });
  }

  function collisionDetectionPowerup(player, powerups, createGameElements) {
    powerups.forEach(function(powerup, index, powerups) {
      var xDistance = player.x - powerup.x;
      var yDistance = player.y - powerup.y;
      var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
      if (distance < player.radius + powerup.radius) {
        contextStyle(powerup.color);
        powerups.splice(index, 1);
        createGameElements(1, powerups, Powerup);
        oneUp();
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
    context.fillText("GAME OVER", 250, 75);
    context.fillText("YOUR FINAL SCORE:", 175, 150);
    context.fillText(player.score, 330, 225);
    context.fillText("HIGH SCORE:", 245, 300);
    context.fillText(localStorage.highScore, 330, 375);
    context.fillText("Slap the spacebar to replay.", 100, 450);
    document.onkeydown = function(e){
      if(e.code === "Space"){
        document.location.reload();
      }
    };
  }

  function levelUP(enemies) {
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].xspeed *= 1.15;
      enemies[i].yspeed *= 1.15;
    }
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

  function drawAndUpdateElements(collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].draw().update();
    }
  }

  function drawAndUpdatePlayerStats(player) {
    player.draw().update();
    player.updateScore();
    player.showLives();
  }

  requestAnimationFrame(function gameLoop() {
    contextStyle("black");
    drawAndUpdateElements(powerups);
    drawAndUpdateElements(enemies);
    drawAndUpdatePlayerStats(player);
    collisionDetectionEnemy(player, enemies);
    collisionDetectionPowerup(player, powerups, createGameElements);
    collisionDetectionCanvas();
    if (player.lives() === 0) { gameOver(player); }
    levels(enemies, context);
    currentLevel(context);
    requestAnimationFrame(gameLoop);
  });
}

module.exports = Game;
