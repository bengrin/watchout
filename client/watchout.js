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
var once = function(func) {
  var ran = false, 
      memo;
  return function() {
    if (ran) 
      return memo;
    ran = true;
    memo = func.apply(this, arguments);
    func = null;
    return memo;
  };
};

var getRandomX = function() {
  return Math.max(0, Math.random() * width - 25);
};

var getRandomY = function() {
  return Math.max(0, Math.random() * height - 25);
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
        .attr('r', function(d) { return d.r; })
        .attr('height', function(d) { return d.r*2; })
        .attr('width', function(d) { return d.r*2; });


var moveAsteroids = function() {
  asteroids
    .transition()
    .duration(2000)
    .tween('custom', tweenWithCollisions)
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
  var player = d3.select('.player');//window.player.data()[0];
  var radius = parseFloat(enemy.attr('r')) + parseFloat(player.attr('r'));
  var xDiff = parseFloat(enemy.attr('x'))- parseFloat(player.attr('cx'));
  var yDiff = parseFloat(enemy.attr('y')) - parseFloat(player.attr('cy'));
  var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2));

  if (separation < radius) {
    score = 0;
    d3.select('.collisions span').text(++collision);
  }
}

var tweenWithCollisions = function(enemy, i) {
  var enemy1 = d3.select(this);
  //console.log('inside ', enemy, ' index ', i);
  return  function(t) {
    checkCollision(enemy1);
    startPos = {
      x: enemy1.attr('x'),
      y: enemy1.attr('y')
    }
    endPos = {
      x: once(getRandomX)(),
      y: once(getRandomY)()
    }
    //console.log('x=', endPos.x, ' y=', endPos.y, ' i =', i);
    //console.log(startPos);
    enemyNextPos = {
      x: parseFloat(startPos.x) + parseFloat((endPos.x - startPos.x)*t),
      y: parseFloat(startPos.y) + parseFloat((endPos.y - startPos.y)*t)
    }
    //console.log(enemyNextPos.x);
    enemy1.attr('x', enemyNextPos.x);
    enemy1.attr('y', enemyNextPos.y);
  }
}


var updasteScore = function() {
  score++;
  if(score > highScore) {
   highScore = score;
  }
  d3.select('.current span').text(score);
  d3.select('.high span').text(highScore);
}

setInterval(updasteScore, 50);
