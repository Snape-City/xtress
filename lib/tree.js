function Node(path) {
  this.name = path;
  this.children = [];
  this.methods = {};
}

function Tree(path) {
  this.root = new Node(path || '/');
}

Tree.prototype.traverseDFS = function(callback) {
  (function recurse(currentNode) {
    currentNode.children.forEach(child => {
      recurse(child);
    });
    callback(currentNode);
  })(this.root);
};

Tree.prototype.traverseBFS = function(callback) {
  const queue = [this.root];
  while (queue.length) {
    const currentNode = queue.shift();
    currentNode.children.forEach(child => {
      queue.push(child);
    });
    callback(currentNode);
  }
};

Tree.prototype.findBFS = function(path) {
  const queue = [this.root];
  while (queue.length) {
    const node = queue.shift();
    if (node.name === path) return node;
    node.children.forEach(child => {
      queue.push(child);
    });
  }
  return null;
};

Tree.prototype.contains = function(path) {
  return this.findBFS(path) ? true : false;
};

Tree.prototype.add = function(endpoint) {
  // Split path into arr of sub-paths, delimeted on '/'
  const splitPath = endpoint.path.split('/').slice(1);
  // Initialize string path to concat with sub-paths as we traverse
  let concatPath = '';
  let currNode = this.root;

  // Loop over each sub-path, concatting it as you go along
  splitPath.forEach(subPath => {
    if (subPath !== concatPath) {
      concatPath += `/${subPath}`;
      let foundNode = null;
      // Searching through all possible children routes that currently exist
      currNode.children.forEach(child => {
        if (child.name === concatPath) foundNode = child;
      });
      // Set current node to the child node if concat path exists,
      if (foundNode) currNode = foundNode;
      // Otherwise create a new node with concat path, and add to children
      else {
        const newNode = new Node(concatPath);
        currNode.children.push(newNode);
        currNode = newNode;
      }
    }
  });

  if (concatPath === splitPath[0] || concatPath === endpoint.path) {
    currNode.methods[Object.keys(endpoint.methods)[0]] = {
      performance: []
    };
  }
};

Tree.prototype.addPerformance = (performanceNode, reqMethod, performance) => {
  performanceNode.methods[reqMethod].performance.push(parseInt(performance));
  // perfData.duration.push(parseInt(performance))
};

Tree.prototype.remove = function(path) {
  // TODO: remove node at specific path
};

module.exports = { Tree, Node };
