function Menu(attributes = {}) {
  this.context = attributes.context;
  this.canvas = attributes.canvas;
}

Menu.prototype.render = function() {
  this.context.textAlign="center";
  this.context.font="90px Exo";
  this.context.fillText("Sinuous", this.canvas.width / 2, 150)
  this.context.font="60px Exo";
  this.context.fillText("Click Screen to Start", this.canvas.width / 2, 300)
}

module.exports = Menu;
