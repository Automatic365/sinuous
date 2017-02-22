/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	function defaultScreen() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  context.font = '55px Exo';
	  context.fillStyle = 'red';
	  context.fillText("Sinuous", 300, 175);
	  // context.fillText("_______", 290, 176);
	  context.font = '20px Exo';
	  context.fillText("Directions:", 175, 275);
	  context.fillText("* Avoid red enemy dots and the grey border", 175, 325);
	  context.fillText("* Collide with green dots for +1 life", 175, 360);
	  context.fillText("* Place your cursor so that it is hidden inside the boarder", 175, 395);
	  context.fillText("* Use your trackpad or mouse to move the blue player ball", 175, 430);
	  context.fillText("* Click within the browser window so that it is your active page", 175, 465);
	  context.fillText("* Slap the SPACEBAR to begin.", 175, 500);
	}
	defaultScreen();

	document.onkeydown = function (e) {
	  if (e.code === "Space") {
	    new Game(canvas, context);
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Enemy = __webpack_require__(2);
	const Player = __webpack_require__(3);
	const Powerup = __webpack_require__(4);

	function Game(canvas, context) {
	  var player = new Player(400, 550, 5, context);
	  var enemies = [];
	  var powerups = [];

	  function getRandomInput(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	  }

	  function createGameElements(number, collection, Object) {
	    for (var i = 0; i < number; i++) {
	      collection.push(new Object(getRandomInput(600, 799), getRandomInput(0, 600), getRandomInput(3, 6), Math.random() * 3, Math.random() * 3, context, canvas));
	    }
	  }
	  createGameElements(70, enemies, Enemy);
	  createGameElements(1, powerups, Powerup);

	  function collisionDetectionEnemy(player, enemies) {
	    enemies.forEach(function (enemy, index, enemies) {
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
	    powerups.forEach(function (powerup, index, powerups) {
	      var xDistance = player.x - powerup.x;
	      var yDistance = player.y - powerup.y;
	      var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
	      if (distance < player.radius + powerup.radius) {
	        contextStyle(powerup.color);
	        powerups.splice(index, 1);
	        createGameElements(1, powerups, Powerup);
	        if (powerup.color === 'green') {
	          oneUp();
	        }
	      }
	    });
	  }

	  // function collisionDetection(player, collection, createGameElements) {
	  //   collection.forEach(function(element, index, collection) {
	  //     var xDistance = player.x - element.x;
	  //     var yDistance = player.y - element.y;
	  //     var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
	  //     if (distance < player.radius + element.radius && collection === powerups) {
	  //       contextStyle('green');
	  //       collection.splice(index, 1);
	  //       createGameElements(1, powerups, Powerup);
	  //       oneUp();
	  //     } else {
	  //       contextStyle("red");
	  //       enemies.splice(index, 1);
	  //       player.deductLife();
	  //     }
	  //   });
	  // }


	  function oneUp() {
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
	    document.onkeydown = function (e) {
	      if (e.code === "Space") {
	        document.location.reload();
	      }
	    };
	  }

	  function levelUP(enemies) {
	    enemies.forEach(function (enemy) {
	      enemy.xspeed *= 1.15;
	      enemy.yspeed *= 1.15;
	    });
	  }

	  function levels(enemies) {
	    if (player.score === 1500) {
	      levelUP(enemies);
	    }
	    if (player.score === 3000) {
	      levelUP(enemies);
	    }
	    if (player.score === 4500) {
	      levelUP(enemies);
	    }
	    if (player.score === 6000) {
	      levelUP(enemies);
	    }
	    if (player.score === 7500) {
	      levelUP(enemies);
	    }
	  }

	  function currentLevel(context) {
	    if (player.score > 7500) {
	      drawLevel(context, 6);
	    } else if (player.score > 6000) {
	      drawLevel(context, 5);
	    } else if (player.score > 4500) {
	      drawLevel(context, 4);
	    } else if (player.score > 3000) {
	      drawLevel(context, 3);
	    } else if (player.score > 1500) {
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
	    for (var i = 0; i < enemies.length; i++) {
	      enemies[i].draw().update();
	    }
	  }

	  requestAnimationFrame(function gameLoop() {
	    contextStyle("black");
	    drawAndUpdateEnemies(enemies);
	    powerups.forEach(function (powerup) {
	      powerup.draw().update();
	    });
	    player.draw().update();
	    player.updateScore();
	    player.showLives();
	    collisionDetectionEnemy(player, enemies);
	    collisionDetectionPowerup(player, powerups, createGameElements);
	    // collisionDetection(player, powerups, createGameElements);
	    // collisionDetection(player, enemies, createGameElements);
	    collisionDetectionCanvas();
	    if (player.lives() === 0) {
	      gameOver(player);
	    }
	    levels(enemies, context);
	    currentLevel(context);
	    requestAnimationFrame(gameLoop);
	  });
	}

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function Enemy(x, y, radius, xspeed, yspeed, context, canvas) {
	  this.x = x;
	  this.y = y;
	  this.radius = radius;
	  this.xspeed = xspeed;
	  this.yspeed = yspeed;
	  this.context = context;
	  this.canvas = canvas;
	}

	Enemy.prototype.draw = function () {
	  this.context.beginPath();
	  this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	  this.context.fillStyle = 'red';
	  this.context.fill();
	  return this;
	};

	Enemy.prototype.update = function () {
	  this.x = this.x + this.xspeed;
	  this.y = this.y + this.yspeed;
	  if (this.x < 0) {
	    this.x = 800;
	    this.xspeed = -this.xspeed;
	  }
	  if (this.x > this.canvas.width) {
	    this.xspeed = -this.xspeed;
	  }
	  if (this.y < 0) {
	    this.yspeed = -this.yspeed;
	  }
	  if (this.y > this.canvas.height) {
	    this.y = 0;
	    this.yspeed = -this.yspeed;
	  }
	  return this;
	};

	module.exports = Enemy;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function Player(x, y, radius, context) {
	  this.x = x;
	  this.y = y;
	  this.radius = radius;
	  this.context = context;
	  this.score = 0;
	  this.currentLifeCount = [1, 2, 3];
	}

	Player.prototype.draw = function () {
	  this.context.beginPath();
	  this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	  this.context.fillStyle = 'blue';
	  this.context.fill();
	  return this;
	};

	Player.prototype.update = function () {
	  var player = this;
	  document.addEventListener("mousemove", function (e) {
	    player.x = e.clientX - 240;
	    player.y = e.clientY - 10;
	  });
	  if (this.currentLifeCount.length > 0) {
	    this.score++;
	  }
	  return this;
	};

	Player.prototype.deductLife = function () {
	  this.currentLifeCount.pop();
	};

	Player.prototype.lives = function () {
	  return this.currentLifeCount.length;
	};

	Player.prototype.updateScore = function () {
	  this.context.font = '20px Exo';
	  this.context.fillStyle = 'white';
	  this.context.fillText("Score: " + this.score, 50, 50);
	};

	Player.prototype.showLives = function () {
	  this.context.font = '20px Exo';
	  this.context.fillStyle = 'white';
	  this.context.fillText("Lives: " + this.currentLifeCount.length, 340, 50);
	};

	module.exports = Player;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function Powerup(x, y, radius, xspeed, yspeed, context, canvas) {
	  this.x = x;
	  this.y = y;
	  this.radius = radius;
	  this.xspeed = xspeed;
	  this.yspeed = yspeed;
	  this.context = context;
	  this.canvas = canvas;
	  this.color = "green";
	}

	Powerup.prototype.draw = function () {
	  this.context.beginPath();
	  this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	  this.context.fillStyle = this.color;
	  this.context.fill();
	  return this;
	};

	Powerup.prototype.update = function () {
	  this.x = this.x + this.xspeed;
	  this.y = this.y + this.yspeed;
	  if (this.x < 0) {
	    this.x = 800;
	    this.xspeed = -this.xspeed;
	  }
	  if (this.x > this.canvas.width) {
	    this.xspeed = -this.xspeed;
	  }
	  if (this.y < 0) {
	    this.yspeed = -this.yspeed;
	  }
	  if (this.y > this.canvas.height) {
	    this.y = 0;
	    this.yspeed = -this.yspeed;
	  }
	  return this;
	};

	module.exports = Powerup;

/***/ }
/******/ ]);
