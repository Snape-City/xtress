const { performance } = require('perf_hooks');
const { Tree } = require('./lib/tree');
const axios = require('axios');

const Extress = {
  tree: new Tree(),
  map: app => {
    function buildTree(stack) {
      stack.forEach(endpoint => (endpoint.route ? Extress.tree.add(endpoint.route) : null));
    }

    buildTree(app._router.stack);
    // axios.post('http://localhost:4050/finished', Extress.tree);
  },

  perfData: {
    duration: [],
  },

  routeTimer: (req, res, next) => {
    const start = performance.now();
    

    res.once('finish', () => {
      let duration = performance.now() - start
      //const performanceNode = Extress.tree.findBFS(req.originalUrl);
      console.log('Req Headers...', req.headers)
      //Extress.tree.addPerformance(performanceNode, req.method.toLowerCase(), performance.now() - start);
      Extress.perfData.duration.push(duration);
      //perfData.duration.push(parseInt(performance))
      console.log('perfData', Extress.perfData);

      if (req.headers.xtressfina) {
        console.log('req Headers...')
        Extress.perfData.routeDuration = performance.now() - parseInt(req.headers.xtressstart);
        axios
          .post('http://localhost:4050/finished', Extress.perfData) //Sends just performance object
          // .post('http://localhost:4050/finished', Extress.tree) //Sends entire tree
          .then(() => console.log('Final request processed, sending post to Xtress server to rerender tree'))
          .catch(error => console.error(error));
      }
    });

    next();
  }
};

module.exports = Extress;
