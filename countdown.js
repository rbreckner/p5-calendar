var startTime = new Date('2019-07-14T18:00:00');
var endTime = new Date('2019-08-18T18:00:00');
var days = getDays(endTime - startTime);
var daysLeft = getDays(endTime - Date.now());
var daysOver = days - daysLeft;
var shapeSize, spacing, offset, margin;
var xAmount = 7;
var green, blue, red;
var flash = false;

function setup() {
  shapeSize = createVector(40, 30);
  space = createVector(10, 15);
  var day = startTime.getDay();
  if (day == 0) {
    offset = 6;
  } else {
    offset = day - 1;
  }
  var size = createVector(space.x + xAmount * (shapeSize.x + space.x), space.y + (days + offset) / xAmount * (shapeSize.y + space.y))
  margin = createVector((innerWidth - size.x) / 2, (innerHeight - size.y) * 0.33);
  var canvas = createCanvas(innerWidth, innerHeight);
  canvas.class('countdown');
  noStroke();
  setInterval(() => {
    flash = !flash;
  }, 500)
  green = color(100, 200, 100);
  blue = color(100, 100, 200);
  red = color(200, 100, 100);
}

function draw() {
  background(220);
  var currentDay = offset;
  var y = space.y;
  for (var i = 0; i < days; i++) {
    if (i < daysOver) {
      fill(green);
    } else if (i === daysOver) {
      fill(255);
      if (flash) fill(blue);
    } else if (i === days - 1) {
      fill(red);
    } else {
      fill(255);
    }
    rect(margin.x + space.x + currentDay * (shapeSize.x + space.x),
      margin.y + y, shapeSize.x, shapeSize.y, shapeSize.x * 0.05);
    if (currentDay == 6) {
      currentDay = 0;
      y += shapeSize.y + space.y;
    } else {
      currentDay++;
    }
  }
}

function getDays(ms) {
  return Math.round(ms / (1000 * 60 * 60 * 24));
};