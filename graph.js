function Vertex(key) {
  this.id = key;
  this.distance = 0;
  this.predecessor = null;
  this.color = 'white';
  this.connectedTo = {};
}

Vertex.prototype = {
  addNeighbor: function(nbr, weight) {
    weight = weight || 0;
    this.connectedTo[nbr] = weight;
  },

  toString: function() {
    return this.id + ' connectedTo: ' + this.connectedTo;
  },

  getConnections: function() {
    return Object.keys(this.connectedTo);
  },

  getId: function() {
    return this.id;
  },

  getWeight: function(neighbor) {
    return this.connectedTo[neighbor];
  }
};

function Graph() {
  this.vertList = {};
  this.numVertices = 0;
}

Graph.prototype = {
  addVertex: function(key) {
    this.numVertices++;
    var newVertex = new Vertex(key);
    this.vertList[key] = newVertex;
    return newVertex;
  },

  getVertex: function(key) {
    return this.vertList[key];
  },

  contains: function(key) {
    return key in this.vertList;
  },

  addEdge: function(from, to, weight) {
    if (!this.contains(from))
      this.addVertex(from);
    if (!this.contains(to))
      this.addVertex(to);
    this.vertList[from].addNeighbor(to, weight);
  },

  getVertices: function() {
    return Object.keys(this.vertList);
  }
};

module.exports = Graph;

