preloaderTL = new TimelineMax({
  
});
// Variables
var boxes = $('.sq-box'),
  xMin = 10,
  xMax = 200,
  yMin = 150,
  yMax = 200,
  randomX, labelTime, $currentFill,
  timeline = {};

boxes.each(function(index, element) {
  if ((index % 2) == 0) {
    randomX = randomInt(-xMax, -xMin);
  } else {
    randomX = randomInt(xMin, xMax);
  }

  labelTime = index * 0.75;
  $currentFill = $(this).find('.sq-fill');

  // create a new timeline for this which repeats itself
  timeline["sven-" + index] = new TimelineMax({
    repeat: -1,
    repeatDelay: 0.75,
    yoyo: false
  });

  timeline["sven-" + index].from($currentFill, 0.75, {
    backgroundColor: "transparent"
  });
  timeline["sven-" + index].from($(this), 3, {
    rotation: 720,
    opacity: 0,
    x: randomX + "px",
    y: randomInt(-yMax, -yMin) + "px",
    ease: Linear.easeNone
  });
  timeline["sven-" + index].to($currentFill, 0.25, {
    y: "104%",
    ease: Linear.easeNone
  });

  // Add to master Timeline
  preloaderTL.add(timeline["sven-" + index], labelTime);
});

// can be used for animating x, y, rotation and other simple operations
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// can be used for animating scale, opacity and other simple math operations
function randomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

TweenMax.delayedCall(5, showCredits, []);

function showCredits() {
  $('.credits').show();
}


setTimeout(function(){
  $("#ready").removeClass("none");
},5000);