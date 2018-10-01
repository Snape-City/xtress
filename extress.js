const { performance } = require('perf_hooks');
const { Tree } = require('./lib/Tree');
const axios = require('axios');

const Extress = {
  tree: new Tree(),
  map: app => {
    function buildTree(stack) {
      stack.forEach(endpoint => (endpoint.route ? Extress.tree.add(endpoint.route) : null));
    }

    buildTree(app._router.stack);
    axios.post('http://localhost:4050/finished', Extress.tree);
  },
  routeTimer: (req, res, next) => {
    const start = performance.now();

    res.once('finish', () => {
      const performanceNode = Extress.tree.findBFS(req.originalUrl);
      Extress.tree.addPerformance(performanceNode, req.method.toLowerCase(), performance.now() - start);
      if (req.headers.xtressfina) {
        axios
          .post('http://localhost:4050/finished', Extress.tree)
          .then(() => console.log('Final request processed, sending post to Xtress server to rerender tree'))
          .catch(error => console.error(error));
      }
    });

    next();
  }
};

module.exports = Extress;
