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