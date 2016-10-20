const chai = require('chai');
const assert = chai.assert;
const Enemy = require('../lib/enemy');

describe('Enemy', function() {
  context('with default attributes', function() {
    var enemy = new Enemy(400, 550, 10, 1, 3 );

    it('should assign an x coordinate', function() {
      assert.equal(enemy.x, 400);
    });
    it('should assign an y coordinate', function() {
      assert.equal(enemy.y, 550);
    });
    it('should assign a radius', function() {
      assert.equal(enemy.radius, 10);
    });
    it('should assign an xspeed', function() {
      assert.equal(enemy.xspeed, 1);
    });
    it('should assign a yspeed', function() {
      assert.equal(enemy.yspeed, 3);
    });
  });
  context('behaviors', function() {
    var enemy = new Enemy(400, 550, 10, 1, 3);

    it('should have a draw function', function(){
      assert.isFunction(enemy.draw);
    });

    it('should have an update function', function(){
      assert.isFunction(enemy.update);
    });
  });
});
