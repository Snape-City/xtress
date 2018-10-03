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
  durationArr: [],
  startTime: null,
  perfData: {
    routeDuration: null,
    method: null,
    route: null,
    min: null,
    max: null,
    avg: null
  },

  reset: () => {
    Extress.durationArr = [];
    Extress.perfData = {
      routeDuration: null,
      method: null,
      route: null,
      min: null,
      max: null,
      avg: null
    };
    Extress.startTime = null;
  },

  routeTimer: (req, res, next) => {
    const start = performance.now();

    res.once('finish', () => {
      //const performanceNode = Extress.tree.findBFS(req.originalUrl);
      // Extress.tree.addPerformance(performanceNode, req.method.toLowerCase(), performance.now() - start);
      console.log('Inside res.once(finish...). Headers ===>', req.headers);
      let duration = performance.now() - start;
      Extress.durationArr.push(duration);

      const { min, max, avg } = util.calculatePerfData(Extress.durationArr);

      Extress.perfData.min = min;
      Extress.perfData.max = max;
      Extress.perfData.avg = avg;
      Extress.perfData.method = req.method;
      Extress.perfData.route = req.originalUrl;

      if (req.headers.xtressstart) Extress.startTime = req.headers.xtressstart * 1;

      if (req.headers.xtressend) {
        const endTime = req.headers.xtressend * 1;
        Extress.perfData.routeDuration = endTime - Extress.startTime;
        axios
          .post('http://localhost:4050/finished', Extress.perfData) //Sends just performance object
          // .post('http://localhost:4050/finished', Extress.tree) //Sends entire tree
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
