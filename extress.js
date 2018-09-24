const { EventEmitter } = require('events');
const profiles = new EventEmitter();
const { performance } = require('perf_hooks');
const { Tree, Node } = require('./util/Tree');
const fs = require('fs');
const requestQueue = [];


const Extress = {
  tree: new Tree(),
  map: app => {

    function buildTree(stack) {
      stack.forEach(endpoint => (endpoint.route) ? Extress.tree.add(endpoint.route) : null);
      return Extress.tree;
    }

    buildTree(app._router.stack);
  },
  routeTimer: (req, res, next) => {
    const start = performance.now();

    res.once('finish', () => {
      profiles.emit('route', { req, elapsedMS: performance.now() - start });
    });

    profiles.on('route', ({ req, elapsedMS }) => {
      const performanceNode = Extress.tree.findBFS(req.originalUrl);
      Extress.tree.addPerformace(performanceNode, req.method.toLowerCase(), elapsedMS);

      var stream = fs.createWriteStream('index.html');
      stream.once('open', () => {
        stream.write(
          `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><script>const Tree = ${JSON.stringify(
            Extress.tree
          )}; window.addEventListener("DOMContentLoaded", function(){console.log(Tree)});</script></body></html>`
        );
        stream.end();
      });
    });

    next();
  }, 
}

module.exports = Extress;
