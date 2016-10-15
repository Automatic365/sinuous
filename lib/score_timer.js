function scoreTimer(time, running){
  this.time = time;
  this.running = running;
}

scoreTimer.prototype.start = function(){
  this.running = 1;
  increment()
}

scoreTimer.prototype.stop = function(){
  this.running = 0;
  logTime()
}

scoreTimer.prototype.logTime = function(){
  return this.time
}

scoreTimer.prototype.reset = function(){
  this.running = 0;
  this.time = 0;
}

scoreTimer.prototype.increment = function(){
  setTimeout(function(){
    time++;
    var secs = Math.floor(time/10);
    var tenths = time % 10;
    document.getElementById("timer").innerHTML = secs + ":" + tenths;
    increment();
  }, 100)
}

module.exports = scoreTimer;
