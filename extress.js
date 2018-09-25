const { EventEmitter } = require('events');
const profiles = new EventEmitter();
const { performance } = require('perf_hooks');
const { Tree, Node } = require('./util/Tree');
const fs = require('fs');

const Extress = {
  tree: new Tree(),
  map: app => {
    function buildTree(stack) {
      stack.forEach(endpoint => (endpoint.route ? Extress.tree.add(endpoint.route) : null));
    }

    buildTree(app._router.stack);
  },
  routeTimer: (req, res, next) => {
    const start = performance.now();

    res.once('finish', () => {
      const performanceNode = Extress.tree.findBFS(req.originalUrl);
      Extress.tree.addPerformance(performanceNode, req.method.toLowerCase(), performance.now() - start);

      next();
    });
  },
  generateReport: () => {
    var stream = fs.createWriteStream('index.html');
    stream.once('open', () => {
      stream.write();
      stream.end();
    });
  }
};

module.exports = Extress;
