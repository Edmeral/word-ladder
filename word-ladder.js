var Graph = require('./graph');
var Queue = require('./queue');
var fs = require('fs');

var words = fs.readFileSync('words-big.txt').toString().split('\r\n');
var buckets = {};
// console.log(words);
// console.log(words[1].length);
// console.log(words[1]);
// console.log(words[words.length - 1].length);
// console.log(words[words.length - 1]);
// console.log('ze');

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

// using this way, we won't crate a vertex if the word doesn't have any connections, 
// that is all it's corresponding buckets are empty.
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
    var neighbors = currentVert.getConnections();

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


// console.log(graph.getVertex('magic'));
// console.log(graph.getVertex('hobby'));
// console.log(graph.getVertex('wines'));


var to = process.argv[2];
var from = process.argv[3];

function traverse(y) {
  var x = y;
  if (x.predecessor === null) {
    console.log("Thousand of words, yet I can't find a connection between these two!");
    return;
  }
  while(x.predecessor) {
    process.stdout.write(x.getId() + ' ==> ');
    x = x.predecessor;
  }
  process.stdout.write(x.getId() + '\n');
}

if (from.length == to.length && from.length !== 0) {
  var fromVertex = graph.getVertex(from);
  var toVertex = graph.getVertex(to);

  if (fromVertex && toVertex) {
    bfs(graph.getVertex(from));
    traverse(graph.getVertex(to));
  }
  else 
    console.log("Thousand of words, yet I can't find a connection between these two!");
}
else {
  console.log('You must enter 2 words of the same length!');
}

