var obj = {
    path: '/',
    childRoutes:
    [ 
      { 
        path: '', 
        childRoutes: [], 
        methods: { 
          get: { 
            middleWare: [
              {
                middleWareName: '<anonymous>', 
                performance: null 
              }
            ], 
            performance: null 
          } 
        } 
      },
      { 
        path: 'signin', 
        childRoutes: [], 
        methods: { 
          post: {
            middleWare: [ 
              { 
                middleWareName: 'validLogin', 
                performance: null 
              }, 
              { 
                middleWareName: 'validUser', 
                performance: null 
              }
            ],
            performance: null
          } 
        } 
      },
      { 
        path: 'deleteTask', 
        childRoutes: [ 
          { path: 'send', 
            childRoutes: [ 
              { 
                path: 'itttttttt', 
                childRoutes: [], 
                 methods: { 
                  delete: { 
                    middleWare: [ 
                      { 
                        middleWareName: 'deleteTask', 
                        performance: null 
                      },
                      {
                        middleWareName: 'postTask', 
                        performance: null 
                      } 
                    ], 
                    performance: null 
                  } 
                } 
              } 
            ], 
            methods: {} 
          } 
        ],  
        methods: { 
          delete: { 
            middleWare: [ 
              { 
                middleWareName: 'poopguy', 
                performance: null 
              },
              { 
                middleWareName: 'poopguy2', 
                performance: null 
              }
            ],
            performance: null 
          },
          post: { 
            middleWare: [ 
              { 
                middleWareName: 'poopguy', 
                performance: null 
              }
            ], 
            performance: null 
          } 
        } 
      }
    ],
    methods: {} 
  }
  

function runScript() {
    //Get form elelement and save into database 
     $('body').click(function(){
        var content = "<table>"
        for(let key in obj){
            if(key === 'childRoutes'){
                //Looping each chilRoutes to get all necessary information
                obj[key].forEach((value)=>{
                    console.log(value)
                    let method = value.methods;
                    let methoded;
                    let performance;
                    for(let ke in method){
                        methoded = ke;
                        performance = method[methoded].performance;
                    }
                    let path = value.path;
                    let methode;
                    if(Object.keys(value.methods).length > 1){
                      for(let k in method){
                        methode = k
                        content += '<tr><td>' +"METHOD ==> "+methode + '<== PATHNAME ==> ' + '/'+path + 
                                  ' <== PERFROMANCE ==> ' + '/'+performance + '</td></tr>';
                      }
                    }
                    
                    content += '<tr><td>' +"METHOD ==> "+methoded + '<== PATHNAME ==> ' + '/'+path + 
                    ' <== PERFROMANCE ==> ' + '/'+performance + '</td></tr>';
                    
                    //let childRoutes = value.childRoutes;
                    let methods = value.methods
                    //console.log(value)
                    // I need to figure out this part these are my mainroutes need to display with childroutes
                    // if(path.length > 1) {
                    //     let firstRoutes = value.path
                    //     console.log(firstRoutes)
                    // }
                    // if(childRoutes.length > 0){
                    //     //console.log(childRoutes)
                    // }
                    //This is only for methods need to add all methods should be available
                    if(methods.get || methods.post || methods.delete) {
                        //this is only for methods.get
                        if(methods.get){
                            //console.log(methods.get)
                            // if(methods.get.middleWare.length > 0) {
                            //    methods.get.middleWare.forEach((value)=>{
                            //     content += '<tr><td>' + 'PATHNAME ' +value.middleWareName +
                            //      " PERFORMANCE "+ value.performance+ '</td></tr>';
                            //         //console.log(value.middleWareName + " of the middleware performance "+ value.performance)
                                    
                            //     })
                            // }
                        }
                        //this is only for methods.post
                        if(methods.post){
                            // if(methods.post.middleWare.length > 0 ){
                            //     methods.post.middleWare.forEach((val)=>{
                            //         content += '<tr><td>' + 'PATHNAME ' + val.middleWareName + 
                            //         " PERFORMANCE "+ val.performance+ '</td></tr>';
                            //         //console.log(val.middleWareName + " of the middleWare is "+ val.performance)
                            //     })
                            //     //console.log(methods.post.middleWare)
                            // }
                        }
                        //this is only for methods.delete
                        if(methods.delete){
                            // if(methods.delete.middleWare.length > 0){
                            //     methods.delete.middleWare.forEach((val)=>{
                            //         content += '<tr><td>' + 'PATHNAME ' +val.middleWareName+ 
                            //         " PERFORMANCE "+ val.performance+ '</td></tr>';
                            //       // console.log(val.middleWareName+ " of the middleWare is "+ val.performance)
                                    
                            //     })
                            // }
                           
                        }
                        
                    }
                })   
            }
        }
        content += "</table>"
        
        $('body').append(content);
     })
}
 window.onload = runScript();