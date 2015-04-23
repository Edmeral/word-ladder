function Vertex(key) {
  this.id = key;
  this.predecessor = null;
  this.color = 'white';
  this.connectedTo = {};
}

Vertex.prototype = {
  addNeighbor: function(neighbor, weight) {
    weight = weight || 0;
    this.connectedTo[neighbor] = weight;
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
    try {
      this.vertList[from].addNeighbor(to, weight);
    }
    catch(e) {
      // aparently I can't make a connection between the words "constructor" and "constrictor", 
      // does this last one exist by the way?, 
      // I don't know why trying to make a connection between the two leads to and error.
      console.log(e);
      console.log(from, to);
    }
  },

  getVertices: function() {
    return Object.keys(this.vertList);
  }
};

module.exports = Graph;

