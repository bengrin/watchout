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
  asteroidData.push({x: getRandomX(), y: getRandomY()});
}

asteroids = board.selectAll('image')
        .data(asteroidData)
        .enter()
        .append('image')
        .attr('class', 'asteroid')
        .attr('xlink:href', 'asteroid.png')
        .attr('x', function(d) { return d.x; })
        .attr('y', function(d) { return d.y; })
        .attr('height', '50px')
        .attr('width', '50px');


var moveAsteroids = function() {
  asteroids.transition()
    .attr('x', function(d) {d.x = getRandomX(); return d.x})
    .attr('y', function(d) {d.y = getRandomY(); return d.y})
    .duration(1000)
}

setInterval(moveAsteroids, 1000);

var player = board.append('circle')
          .data([{x: width/2, y: height/2}])
          .attr('class', 'player')
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; })
          .attr('r', 10)
          .attr('stroke', 'black')
          .attr('stroke-width', 3)
          .attr('fill', 'red');

board.on('mousemove', function(){
  var mouse = d3.mouse(this);
  d3.select('.player')
    .data([{'x': mouse[0], 'y': mouse[1]}])
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
})