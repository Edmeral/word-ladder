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

// using this way, we won't create a vertex if the word doesn't have any connections, 
// (if all it's corresponding buckets are empty)
for (var bucket in buckets) {
  for (var i in buckets[bucket]) {
    for (var j in buckets[bucket]) {
      if (buckets[bucket][i] != buckets[bucket][j])
        graph.addEdge(buckets[bucket][i], buckets[bucket][j]);
    }
  }
}

function bfs(start) {
  vertQueue = new Queue();
  vertQueue.enqueue(start);

  while (vertQueue.size() > 0) {
    currentVert = vertQueue.dequeue();
    if (currentVert == to)
      break;
    var neighbors = currentVert.connectedTo;

    for (var i in neighbors) {
      var vertex = graph.getVertex(neighbors[i]);
      if (vertex.color == 'white') {
        vertex.color = 'gray';
        vertex.predecessor = currentVert;
        vertQueue.enqueue(vertex);
      }
    }
    currentVert.color = 'black';
  }
}

var to = process.argv[2];
var from = process.argv[3];

function printLadder(start) {
  if (start.predecessor === null) {
    console.log("Thousand of words, yet I can't find a connection between these two!");
    return;
  }
  while(start.predecessor) {
    process.stdout.write(start.id + ' ==> ');
    start = start.predecessor;
  }
  process.stdout.write(start.id + '\n');
}

if (from.length == to.length && from.length !== 0) {
  var fromVertex = graph.getVertex(from);
  var toVertex = graph.getVertex(to);

  if (fromVertex && toVertex) {
    bfs(graph.getVertex(from));
    printLadder(graph.getVertex(to));
  }
  else 
    console.log("Thousand of words, yet I can't find a connection between these two!");
}
else {
  console.log('You must enter 2 words of the same length!');
}