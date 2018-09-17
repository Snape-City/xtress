module.exports = {
  
  map: () => {
    function Node(val) {
      this.path = val;
      this.childRoutes = [];
      this.methods = {};
    }

    function MiddleWareNode(name) {
      this.middleWareName = name;
      this.performance = null;
    }

    const tree = new Node('/');

    app._router.stack.forEach(endpoint => { 
      if (endpoint.route) {
        //.   '/send/it/now'.      ['delet', send', 'it']
        const splitPath = endpoint.route.path.substring(1).split('/'); //split each full route path into an array of seperate pieces
        
        let curr = tree;  //variable used to reset the current tree location to the slash route for each new route
        splitPath.forEach(subPath => { //loop over each split sub route
          if (subPath === '') {
            splitPath.splice(splitPath.indexOf(subPath), 1, '/');
          }       
        });

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
            const reducedMiddleWare = endpoint.route.stack.reduce((initial, current) => {
              initial.push(new MiddleWareNode(current.name));
              return initial
            }, []);
            curr.methods[Object.entries(endpoint.route.methods)[0][0]] = {
              middleWare: reducedMiddleWare,
              performance: null
            }; 
          }
        })
      }
    })
    return tree
  },
  wrap: () => {

  }

}