const { performance } = require('perf_hooks');
const { Tree } = require('./lib/tree');
const axios = require('axios');

const calculatePerfData = (arr) => {
  let min = Infinity;
  let max = -Infinity;
  let total = 0;
  arr.forEach(num => {
    if ( num < min ) min = num;
    if ( num > max ) max = num;
    total += num;
  });
  let avg = total / arr.length;
  return { min, max, avg };
}

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

  perfData: {
    method: null,
    route: null,
    min: null,
    max: null,
    avg: null,
    routeDuration: null,
    arr: null
  },
  
  routeTimer: (req, res, next) => {
    const start = performance.now();

    res.once('finish', () => {
      //const performanceNode = Extress.tree.findBFS(req.originalUrl);
     // Extress.tree.addPerformance(performanceNode, req.method.toLowerCase(), performance.now() - start);
      let duration = performance.now() - start;
      Extress.durationArr.push(duration);

      const { min, max, avg } = calculatePerfData(Extress.durationArr)

      Extress.perfData.min = min
      Extress.perfData.max = max
      Extress.perfData.avg = avg
      Extress.perfData.method = req.method;
      Extress.perfData.route = req.originalUrl;
      Extress.perfData.arr = Extress.durationArr.length;


      if (req.headers.xtressfina) {
        Extress.perfData.routeDuration = performance.now() - parseInt(req.headers.xtressstart);
        axios
          .post('http://localhost:4050/finished', Extress.perfData) //Sends just performance object
          // .post('http://localhost:4050/finished', Extress.tree) //Sends entire tree
          .then(() => {
            console.log('Final request processed, sending post to Xtress server to rerender tree')
            
            // Reset perfData before it performing another test...
            Extress.perfData = {
              method: null,
              route: null,
              min: null,
              max: null,
              avg: null,
              arr: null,
            }
          })
          .catch(error => console.error(error));
      }
    });

    next();
  }
};

module.exports = Extress;
