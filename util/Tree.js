function Node(path) {
  this.path = path;
  this.childRoutes = [];
  this.methods = {};
}

function Tree(path) {
  this.root = new Node(path || '');
}

Tree.prototype.traverseDFS = function(callback) {
  (function recurse(currentNode) {
    currentNode.childRoutes.forEach(child => {
      recurse(child);
    });
    callback(currentNode);
  })(this.root);
};

Tree.prototype.traverseBFS = function(callback) {
  const queue = [this.root];
  while (queue.length) {
    const currentNode = queue.shift();
    currentNode.childRoutes.forEach(child => {
      queue.push(child);
    });
    callback(currentNode);
  }
};

Tree.prototype.findBFS = function(path) {
  const queue = [this.root];
  while (queue.length) {
    const node = queue.shift();
    if (node.path === path) return node;
    node.childRoutes.forEach(child => {
      queue.push(child);
    });
  }
  return null;
};

Tree.prototype.contains = function(path) {
  return this.findBFS(path) ? true : false;
};

Tree.prototype.add = function(path) {
  // TODO: add node at specific path
};

Tree.prototype.remove = function(path) {
  // TODO: remove node at specific path
};

module.exports = { Tree, Node };
