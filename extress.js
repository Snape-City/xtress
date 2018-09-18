const { EventEmitter } = require('events');
const profiles = new EventEmitter();

function Node(val) {
  this.path = val;
  this.childRoutes = [];
  this.methods = {};
}

function MiddleWareNode(name) {
  this.middleWareName = name;
  this.performance = null;
}

module.exports = {
  map: (app) => {
    const tree = new Node('');

    function buildTree(stack) {
      stack.forEach(endpoint => { 
        if (endpoint.route) {//eliminate all undefined routes
          buildBranch(endpoint.route.path.substring(1).split('/'), endpoint);
          // const splitPath = endpoint.route.path.substring(1).split('/'); //split each full route path into an array of seperate pieces
        }
      })
      return tree
    }

    function buildBranch(splitPath, endpoint) {
      let curr = tree;  //variable used to reset the current tree location to the slash route for each new route

      splitPath.forEach(subPath => { //loop over each split sub route
        if (curr.path !== subPath) { //check if curr path is equal to route path from split array
          const filteredChildroute = curr.childRoutes.filter(elem => elem.path === subPath);
          if (filteredChildroute[0]) { //check if path is included within the children array of curr
            curr = filteredChildroute[0] //if yes, set that child to the curr
          } else { //if no, create new node for that val and set it equal to the curr
            const newNode = new Node(subPath);
            curr.childRoutes.push(newNode);
            curr = newNode;
          }
        }
        if (splitPath.indexOf(subPath) === splitPath.length - 1) { //check if current route path is the last in the split array
          //if it is, we need to add an obj for the method type 
          curr.methods[Object.keys(endpoint.route.methods)[0]] = {
            middleWare: buildMethod(endpoint),
            performance: null
          }; 
        }
      })
    }

    function buildMethod(endpoint) {
      return endpoint.route.stack.reduce((initial, current) => {
        initial.push(new MiddleWareNode(current.name));
        return initial
      }, []);
    }
    return buildTree(app._router.stack)
  },
  wrap: (tree) => {
    console.log('tree', tree)
  },


  routeTimer: (req,res,next) => {

    const splitRoute = req.originalUrl.substring(1).split('/'); //break request route into parts delimited by slash
    let currNode = Tree

    routeSearcher = (currNode, elapsedMS) => {
        console.log('req 1 ===>', req.method);
        if (currNode.path === req.originalUrl.substring(1).split('/')[req.originalUrl.substring(1).split('/').length-1]) addPerformanceData(currNode, elapsedMS)
        for ( let i = 0; i < currNode.childRoutes.length; i += 1 ) {
            console.log('child route length===>',Tree.childRoutes.length)
            if (splitRoute[0] === currNode.childRoutes[i].path) { // determine if there is a match
                currNode = currNode.childRoutes[i];
                if (splitRoute.length > 0) {
                    splitRoute.shift();
                    routeSearcher(currNode, elapsedMS) // if there are more items in the split route, keep digging...
                }
            };
        };
    };

    addPerformanceData = (currNode, elapsedMS) => {
        //onsole.log('req 2 ===>', req.method);
        const routeMethod = req.method.toLowerCase(); // set the method associated with the request to a variable
        currNode.methods[routeMethod].performance = elapsedMS + 'ms'
        //console.log('currnode ===>', currNode.methods)
    }
    
    profiles.on('route', ({ req, elapsedMS }) => {
        routeSearcher(Tree, elapsedMS)
    });

    const start = Date.now(); 

    res.once( 'finish', ()=>{
      profiles.emit('route', {req, elapsedMS: Date.now() - start })
    })      
    next();
}

}