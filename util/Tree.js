function Node(path) {
  this.name = path;
  this.children = [];
  this.methods = {};
}

function MiddleWareNode(name) {
  this.middleWareName = name;
  this.performance = null;
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
      currNode.childRoutes.forEach(child => {
        if (child.path === concatPath) {
          foundNode = child;
        }
      });
      // Set current node to the child node if concat path exists,
      if (foundNode) {
        currNode = foundNode;
        // Add method at found location
        currNode.methods[Object.keys(endpoint.methods)[0]] = {
          performance: []
        };
      }
      // Otherwise create a new node with concat path, and add to children
      else {
        const newNode = new Node(concatPath);
        currNode.childRoutes.push(newNode);
        currNode = newNode;
      }
    } 
    // Handle requests to root
    else {
      currNode.methods[Object.keys(endpoint.methods)[0]] = {
          performance: []
        };
    }
  });
};


Tree.prototype.addPerformace = (performanceNode, reqMethod, perforamce) => {
  performanceNode.methods[reqMethod].performance.push(perforamce + 'ms');
}

Tree.prototype.remove = function(path) {
  // TODO: remove node at specific path
};

module.exports = { Tree, Node };
