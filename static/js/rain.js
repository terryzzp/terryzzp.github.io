var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var TOTAL = 200;

var drops = [];

function setup() {
    var div = document.getElementById("rain");
    // var div = document;
    var myCanvas = createCanvas(WIDTH, HEIGHT);
    myCanvas.child(div);
  for (var i = 0; i < TOTAL; i++) {
    drops[i] = new Drop();
  }
}

function draw() {
  background(0, 0, 0, 0);
  clear();
  for (var i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show();
  }
}

function Drop() {
  this.x = random(width);
  this.y = random(-500, -50);
  this.z = random(0, 20);
  this.len = map(this.z, 0, 20, 10, 20);
  this.yspeed = map(this.z, 0, 20, 1, 20);

  this.fall = function() {
    this.y = this.y + this.yspeed;
    var grav = map(this.z, 0, 20, 0, 0.2);
    this.yspeed = this.yspeed + grav;

    if (this.y > height) {
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 4, 10);
    }
  }

  this.show = function() {
    var thick = map(this.z, 0, 20, 1, 3);
    strokeWeight(thick);
    stroke(100, 100, 100);
    line(this.x, this.y, this.x, this.y+this.len);
  }
}