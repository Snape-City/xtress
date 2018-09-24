function Node(path) {
  this.path = path;
  this.childRoutes = [];
  this.methods = {};
}

function Tree(path) {
  this.root = new Node(path || '/');
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
  // Split path into arr of sub-paths, delimeted on '/'
  const splitPath = path.split('/').slice(1);
  // Initialize string path to concat with sub-paths as we traverse
  let concatPath = '';
  let currNode = this.root;
  // Loop over each sub-path, concatting it as you go along
  splitPath.forEach(subPath => {
    let foundNode = null;
    concatPath += `/${subPath}`;
    currNode.childRoutes.forEach(child => {
      if (child.path === concatPath) {
        foundNode = child;
      }
    });
    // Set current node to the child node if concat path exists,
    if (foundNode) currNode = foundNode;
    // Otherwise create a new node with concat path, and add to children
    else {
      const newNode = new Node(concatPath);
      currNode.childRoutes.push(newNode);
      currNode = newNode;
    }
  });
};

Tree.prototype.remove = function(path) {
  // TODO: remove node at specific path
};

module.exports = { Tree, Node };
