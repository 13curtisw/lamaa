var lamas = {};
var balloons = [];
Leap.loop(function(frame) {
  frame.hands.forEach(function(hand, index) {
    var lama = ( lamas[index] || (lamas[index] = new Lama(hand)) );    
    lama.setTransform(hand.screenPosition(), hand.roll());
  });

   if(Math.random() < 0.005){
    var balloon = new Balloon();
    balloons.push(balloon);
  }
  balloons.forEach(function(item, index){
    var balloon = item;
    if(balloon.getX > 1400) {
      balloons.splice(index, 1);
      balloon.remove();
    }
    balloon.setTransform();
  });
  
}).use('screenPosition', {scale: 0.25});


var Lama = function(hand) {
  var lama = this;
  var img = document.createElement('img');
  if(hand.type == "right"){
    img.src = 'lama.png';

  } else {
    img.src = 'lamaleft.png';
  }
  img.style.position = 'absolute';
  img.onload = function () {
    lama.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
    document.body.appendChild(img);
  }

  
  lama.setTransform = function(position, rotation) {
    if(hand.type == "right") {
      img.style.left = position[0] * 2 - img.width  / 2 - 1000 + 'px';
    } else {
      img.style.left = position[0] * 2 - img.width  / 2 - 600 + 'px';
    }
    img.style.top  = position[1] - img.height / 2 + 'px';

  img.style.transform = 'rotate(' + -rotation + 'rad)';
  
    img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
    img.style.OTransform = img.style.transform;

  };

};

var Balloon = function(){
  var balloon = this;
  var img = document.createElement('img');
  img.src = 'balloon.png';
  img.style.position = 'absolute';
  img.onload = function() {
    img.style.left = Math.random() * 1400 - 200 + 'px';
    img.style.top = 700 + 'px';
    document.body.appendChild(img);
  }

  balloon.getY = 700;

  balloon.setTransform = function() {
    balloon.getY -= 5;
    img.style.top = balloon.getY + 'px';
  };

  balloon.remove = function() {
    document.getElementById("container").removeChild(img);
  }



};
// This allows us to move the lama even whilst in an iFrame.
Leap.loopController.setBackground(true)