const chai = require('chai');
const assert = chai.assert;
const Player = require('../lib/player');

describe('Player', function() {
  context('with default attributes', function() {
    var player = new Player();

    it('should assign an x coordinate', function() {
      assert.equal(player.x, 400)
    })
    it('should assign an y coordinate', function() {
      assert.equal(player.y, 550)
    })
    it('should assign a radius', function() {
      assert.equal(player.radius, 10)
    })
  })
})
