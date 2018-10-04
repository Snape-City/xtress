const { performance } = require('perf_hooks');
const { Tree } = require('./lib/tree');
const axios = require('axios');
const util = require('./lib/util');

const Extress = {
  tree: new Tree(),

  map: app => {
    function buildTree(stack) {
      stack.forEach(endpoint => (endpoint.route ? Extress.tree.add(endpoint.route) : null));
    }

    buildTree(app._router.stack);
    axios.post('http://localhost:4050/tree', Extress.tree); //put this onto client side
  },
  durationObj: {},
  startTime: null,


  reset: () => {
    Extress.durationObj = {};
    Extress.startTime = null;
  },

  routeTimer: (req, res, next) => {
    const start = performance.now();

    res.once('finish', () => {
      //const performanceNode = Extress.tree.findBFS(req.originalUrl);
      // Extress.tree.addPerformance(performanceNode, req.method.toLowerCase(), performance.now() - start);
      const endTime = performance.now()
      const testId = req.headers.testid
      console.log('Inside res.once(finish...). Headers ===>', req.headers);
      let duration = performance.now() - start;
      if (Extress.durationObj[testId]) {
        Extress.durationObj[testId].push(duration)
      } else {
        Extress.durationObj[testId] = [duration]
      }




      if (req.headers.xtressend) {
        const { min, max, avg } = util.calculatePerfData(Extress.durationObj[testId]);
        const testData = {
          method: req.method,
          route: req.originalUrl,
          min,
          max,
          avg,

        }

        axios
          .post('http://localhost:4050/finished', testData)
          .then(() => {
            console.log('Final request processed, sending post to Xtress server to rerender tree');

            // Reset perfData before it performing another test...
            Extress.reset();
          })
          .catch(error => console.error(error));
      }
    });

    next();
  }
};

module.exports = Extress;
