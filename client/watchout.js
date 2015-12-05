// start slingin' some d3 here.
var board = d3.select('body').append('svg');

var height = 600;
var width = 800;
var score = 0;
var highScore = 0;
var collision = 0;

var nEnemies = 30;
var asteroidData = [];
var asteroids; 

var getRandomX = function() {
  return Math.max(0, Math.random() * width - 50);
};

var getRandomY = function() {
  return Math.max(0, Math.random() * height - 50);
};

for(var i = 0; i < nEnemies; i++)   {
  asteroidData.push({
    r: 25,
    x: getRandomX(), 
    y: getRandomY()
  });
}

asteroids = board.selectAll('image')
        .data(asteroidData)
        .enter()
        .append('image')
        .attr('class', 'asteroid')
        .attr('xlink:href', 'asteroid.png')
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; })
        .attr('height', function(d) { return d.r*2; })
        .attr('width', function(d) { return d.r*2; });


var moveAsteroids = function() {
  asteroids
    .transition()
    .tween('attr', tweenWithCollisions)
    .duration(2000)
}

setInterval(moveAsteroids, 1000);

var player = board.append('circle')
          .data([{r: 10, x: width/2, y: height/2}])
          .attr('class', 'player')
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; })
          .attr('r', function(d) { return d.r; })
          .attr('stroke', 'black')
          .attr('stroke-width', 3)
          .attr('fill', 'red');

board.on('mousemove', function(){
  var mouse = d3.mouse(this);
  d3.select('.player')
    .data([{'x': mouse[0], 'y': mouse[1]}])
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
;})

var checkCollision =function(enemy, callback)  {
  var player = window.player.data()[0];
  var radius = parseFloat(enemy.attr('r')) + 10;
  var xDiff = parseFloat(enemy.attr('x'))- player.x
  var yDiff = parseFloat(enemy.attr('y')) - player.y

  var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2));
 
  if (separation < radius*2) {
    score = 0;
    d3.select('.collisions span').text(++collision);
  }
}

var tweenWithCollisions = function(enemy) {
  var enemy1 = d3.select(this);
  console.log('inside ', enemy);
  startPos = {
    x: enemy1.attr('x'),
    y: enemy1.attr('y')
  }

  endPos = {
    x: getRandomX(),
    y: getRandomY()
  }
  return  function(t) {
    //console.log(enemy1.attr('x'));
    checkCollision(enemy1);

    enemyNextPos = {
      x: parseFloat(startPos.x) + parseFloat((endPos.x - startPos.x)*t),
      y: parseFloat(startPos.y) + parseFloat((endPos.y - startPos.y)*t)
    }
    //console.log(enemyNextPos.x);
    enemy1.attr('x', enemyNextPos.x);
    enemy1.attr('y', enemyNextPos.y);
  }
}
// asteroids.transition()
//   .duration(1000)
//   .attr('r', 10)
//   .transition()
//   .duration(2000)
//   .tween('custom', tweenWithCollisions)



var updasteScore = function() {
  score++;
  if(score > highScore) {
   highScore = score;
  }
  d3.select('.current span').text(score);
  d3.select('.high span').text(highScore);
}

setInterval(updasteScore, 50);


// var tweenWithCollisionDetection = function(endData) {
//     var enemy = d3.select(this);

//     var startPos = {};
//     var endPos = {};

//     startPos.x = parseFloat(enemy.attr('x'));
//     startPos.y = parseFloat(enemy.attr('y'));

//     endPos.x = axes.x(endData.x);
//     endPos.y = axes.y(endData.y);