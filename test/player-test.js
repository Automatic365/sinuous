const chai = require('chai');
const assert = chai.assert;
const Player = require('../lib/player');

describe('Player', function() {
  context('with default attributes', function() {
    var player = new Player(400, 550, 10);

    it('should assign an x coordinate', function() {
      assert.equal(player.x, 400);
    });
    it('should assign an y coordinate', function() {
      assert.equal(player.y, 550);
    });
    it('should assign a radius', function() {
      assert.equal(player.radius, 10);
    });
    it('should assign a score', function() {
      assert.equal(player.score, 0);
    });
    it('should assign a life count', function() {
      assert.equal(player.currentLifeCount.length, 3);
    });
  });

  context('behaviors', function() {
    var player = new Player(400, 550, 10);

    it('should have a draw function', function(){
      assert.isFunction(player.draw);
    });

    it('should have an update function', function(){
      assert.isFunction(player.update);
    });

    it('should have a deduct lives', function(){
      assert.isFunction(player.deductLife);
    });

    it('should have a show lives', function(){
      assert.isFunction(player.showLives);
    });

    it('should have update its score', function(){
      assert.isFunction(player.updateScore);
    });
  });
});
