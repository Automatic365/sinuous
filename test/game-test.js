// const chai = require('chai');
// const assert = chai.assert;
//
// const Game = require('../lib/game');
// const stub = require('./support/stub');
// const canvas = stub();
// const canvasContext = stub();
// const Player = require('../lib/player');
// const Enemy = require('../lib/enemy');
// const Powerup = require('../lib/powerup');
//
// describe('Game', function(){
//   var game = new Game(canvas, canvasContext);
//
//   context('with default properties', function(){
//     it('should be instantiated', function(){
//       assert.instanceOf(game, Game);
//     });
//
//     it('should have a player', function(){
//       assert.instanceOf(game.player, Player);
//     });
//
//     it('should have an array of enemies', function(){
//       assert.instanceOf(game.enemies, Array);
//     });
//
//     it('should have an array of powerups', function(){
//       assert.instanceOf(game.powerups, Array);
//     });
//
//     it('should have a default playing status of false', function(){
//       assert.equal(game.playing, false);
//     });
//   });
//
//   context('page rendering', function(){
//
//     it('should have a create objects function', function(){
//       assert.isFunction(game.createGameElements);
//     });
//
//     it('should have a draw level function', function(){
//       assert.isFunction(game.drawLevel);
//     });
//
//     it('should have a draw elements function', function(){
//       assert.isFunction(game.drawAndUpdateEnemies);
//     });
//
//     it('should have save score', function(){
//       assert.isFunction(game.saveScore);
//     });
//     it('should detect collisions', function(){
//       assert.isFunction(game.collisionDetectionEnemy);
//       assert.isFunction(game.collisionDetectionPowerup);
//       assert.isFunction(game.collisionDetectionCanvas);
//     });
//
//     it('should have a draw health function', function(){
//       assert.isFunction(game.drawHealth);
//     });
//
//     it('should have a powerup function', function(){
//       assert.isFunction(game.oneUp);
//     });
//
//     it('should have an end game function', function(){
//       assert.isFunction(game.gameOver);
//     });
//   });
// });
