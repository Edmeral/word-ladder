var Graph = require('./graph');
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
