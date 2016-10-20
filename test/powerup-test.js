const chai = require('chai');
const assert = chai.assert;
const Powerup = require('../lib/powerup');

describe('Powerup', function() {
  context('with default attributes', function() {
    var powerup = new Powerup(400, 550, 10, 1, 3 );

    it('should assign an x coordinate', function() {
      assert.equal(powerup.x, 400);
    });
    it('should assign an y coordinate', function() {
      assert.equal(powerup.y, 550);
    });
    it('should assign a radius', function() {
      assert.equal(powerup.radius, 10);
    });
    it('should assign an xspeed', function() {
      assert.equal(powerup.xspeed, 1);
    });
    it('should assign a yspeed', function() {
      assert.equal(powerup.yspeed, 3);
    });
  });
  context('behaviors', function() {
    var powerup = new Powerup(400, 550, 10, 1, 3);

    it('should have a draw function', function(){
      assert.isFunction(powerup.draw);
    });

    it('should have an update function', function(){
      assert.isFunction(powerup.update);
    });
  });
});
