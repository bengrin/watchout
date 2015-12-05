// start slingin' some d3 here.
var board = d3.select('body').append('svg');

var height = 600;
var width = 800;

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
  asteroids.transition()
    .attr('x', function(d) {d.x = getRandomX(); return d.x})
    .attr('y', function(d) {d.y = getRandomY(); return d.y})
    .duration(1000)
    .tween('custom', checkCollision);
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
  var radius = parseFloat(enemy.r) + 10;
  var xDiff = parseFloat(enemy.x) - player.x
  var yDiff = parseFloat(enemy.y) - player.y

  var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2));
 
  if (separation < radius*2) {
    console.log(radius);
  }
}