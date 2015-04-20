function Queue() {
  this.elements = [];
}

Queue.prototype = {
  enqueue: function(elem) {
    this.elements.push(elem);
  },

  dequeue: function() {
    if (this.elements.length === 0)
      return null;
    return this.elements.shift();
  }
};