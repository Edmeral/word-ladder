var Graph = require('./graph');
var Queue = require('./queue');
var fs = require('fs');

var words = fs.readFileSync('words.txt').toString().split('\n');

var buckets = {};

words.forEach(function(word) {
  for (var i = 0; i < word.length; i++) {
    var bucket = word.slice(0, i) + '_' + word.slice(i + 1);
    if (bucket in buckets)
      buckets[bucket].push(word);
    else
      buckets[bucket] = [word];
  }
});

/**
/* Creating the words graph
**/

var graph = new Graph();

for (var bucket in buckets) {
  for (var i in buckets[bucket]) {
    for (var j in buckets[bucket]) {
      if (buckets[bucket][i] != buckets[bucket][j])
        graph.addEdge(buckets[bucket][i], buckets[bucket][j]);
    }
  }
}


function bfs(graph, start) {
  vertQueue = new Queue();
  vertQueue.enqueue(star);
  while (vertQueue.size() > 0) {
    currentVert = vertQueue.dequeue();
    for (var vertex in currentVert.getConnections()) {
      if (vertex.color == 'white') {
        vertex.setColor('gray');
        vertex.distance = (currentVert.distance + 1);
        vertex.predecessor = currentVert;
        vertQueue.enqueue(vertex);
      }
    }
    currentVert.setColor('black');
  }
}