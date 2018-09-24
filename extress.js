const { EventEmitter } = require('events');
const profiles = new EventEmitter();
const { performance } = require('perf_hooks');
const { Tree, Node } = require('./util/Tree');
const fs = require('fs');

function MiddleWareNode(name) {
  this.middleWareName = name;
  this.performance = null;
}

const Extress = {
  tree: new Tree(),
  map: app => {
    function buildTree(stack) {
      stack.forEach(endpoint => {
        if (endpoint.route) {
          //eliminate all undefined routes
          buildBranch(endpoint.route.path.substring(1).split('/'), endpoint);
          // const splitPath = endpoint.route.path.substring(1).split('/'); //split each full route path into an array of seperate pieces
        }
      });
      return Extress.tree;
    }

    function buildBranch(splitPath, endpoint) {
      // console.log('EXTRESS ==>', Extress);
      let curr = Extress.tree.root; //variable used to reset the current Tree location to the slash route for each new route

      splitPath.forEach(subPath => {
        //loop over each split sub route
        if (curr.path !== subPath) {
          //check if curr path is equal to route path from split array
          const filteredChildroute = curr.childRoutes.filter(elem => elem.path === subPath);
          if (filteredChildroute[0]) {
            //check if path is included within the children array of curr
            curr = filteredChildroute[0]; //if yes, set that child to the curr
          } else {
            //if no, create new node for that val and set it equal to the curr
            const newNode = new Node(subPath);
            curr.childRoutes.push(newNode);
            curr = newNode;
          }
        }
        if (splitPath.indexOf(subPath) === splitPath.length - 1) {
          //check if current route path is the last in the split array
          //if it is, we need to add an obj for the method type
          curr.methods[Object.keys(endpoint.route.methods)[0]] = {
            middleWare: buildMethod(endpoint),
            performance: null
          };
        }
      });
    }

    function buildMethod(endpoint) {
      return endpoint.route.stack.reduce((initial, current) => {
        initial.push(new MiddleWareNode(current.name));
        return initial;
      }, []);
    }
    return buildTree(app._router.stack);
  },
  routeTimer: (req, res, next) => {
    const start = performance.now();

    profiles.on('route', ({ req, elapsedMS }) => {
      routeSearcher(currNode, elapsedMS);
    });

    res.once('finish', () => {
      profiles.emit('route', { req, elapsedMS: performance.now() - start });
    });

    const splitRoute = req.originalUrl.substring(1).split('/'); //break request route into parts delimited by slash
    let currNode = Extress.tree.root;

    routeSearcher = (currNode, elapsedMS) => {
      if (currNode.path === req.originalUrl.substring(1).split('/')[req.originalUrl.substring(1).split('/').length - 1]) {
        console.log('hello')
        addPerformanceData(currNode, elapsedMS);
      } else {
         for (let i = 0; i < currNode.childRoutes.length; i += 1) {
          if (splitRoute[0] === currNode.childRoutes[i].path) {
            // determine if there is a match
            currNode = currNode.childRoutes[i];
            if (splitRoute.length > 0) {
              splitRoute.shift();
              routeSearcher(currNode, elapsedMS); // if there are more items in the split route, keep digging...
            }
          }
        }
      }
    };

    addPerformanceData = (currNode, elapsedMS) => {
      const routeMethod = req.method.toLowerCase(); // set the method associated with the request to a variable
      currNode.methods[routeMethod].performance = elapsedMS + 'ms';
      Extress.tree.root.path = '/';
      var stream = fs.createWriteStream('index.html');
      stream.once('open', () => {
        stream.write(
          `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><script>const Tree = ${JSON.stringify(
            Extress.tree
          )}; window.addEventListener("DOMContentLoaded", function(){console.log(Tree)});</script></body></html>`
        );
        stream.end();
      });
    };

    next();
  }, 
  socket: (app) => {
    var expressWs = require('express-ws')(app);
    app.ws('/', function(ws, req) {
      ws.on('message', function(msg) {
        console.log(msg);
      });
      console.log('socket', req.testing);
    });
     
    app.listen(4050, console.log('listening on 4050'));
  }
}

module.exports = Extress;
