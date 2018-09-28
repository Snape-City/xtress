import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Tree from "react-d3-tree";
import "./App.css";
import DashboardContainer from './DashboardContainer';
import Header from "./Header";
import Team from './Team';


const containerStyles = {
  width: '95%',
  height: '95%',
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        "name": "/",
      "children": [{
        "name": "/demo",
        "children": [{
          "name": "/demo/example",
          "children": [{
            "name": "/demo/example/2",
            "children": [],
            "methods": {
            }
          }, {
            "name": "/demo/example/randomMiddleware",
            "children": [],
            "methods": {
              "post": {
                "performance": [4]
              },
              "put": {
                "performance": [5]
              },
              "delete": {
                "performance": [6]
              }
            }
          }],
          "methods": {
            "post": {
              "performance": [7]
            },
            "put": {
              "performance": [8]
            },
            "delete": {
              "performance": [9]
            },
            "get": {
              "performance": [10]
            }
          }
        }],
        "methods": {
          "post": {
            "performance": [11]
          },
          "put": {
            "performance": [12]
          },
          "delete": {
            "performance": [13]
          },
          "get": {
            "performance": [14]
          }
        }
      }, {
        "name": "/test",
        "children": [{
          "name": "/test/example",
          "children": [{
            "name": "/test/example/randomMiddleware",
            "children": [],
            "methods": {
              "post": {
                "performance": [15]
              },
              "put": {
                "performance": [16]
              },
              "delete": {
                "performance": [17]
              }
            }
          }],
          "methods": {
            "post": {
              "performance": [18]
            },
            "put": {
              "performance": [19]
            },
            "delete": {
              "performance": [20]
            },
            "get": {
              "performance": [21]
            }
          }
        }],
        "methods": {
          "post": {
            "performance": [22]
          },
          "put": {
            "performance": [23]
          },
          "delete": {
            "performance": [24]
          },
          "get": {
            "performance": [25]
          }
        }
      }, {
        "name": "/users",
        "children": [],
        "methods": {
          "post": {
            "performance": [26]
          },
          "put": {
            "performance": [27]
          },
          "delete": {
            "performance": [28]
          }
        }
      }, {
        "name": "/api",
        "children": [],
        "methods": {
          "post": {
            "performance": [29]
          },
          "put": {
            "performance": [30]
          },
          "delete": {
            "performance": [31]
          }
        }
      }, {
        "name": "/heavily",
        "children": [{
          "name": "/heavily/nexted",
          "children": [{
            "name": "/heavily/nexted/trash",
            "children": [{
              "name": "/heavily/nexted/trash/routes",
              "children": [],
              "methods": {
                "post": {
                  "performance": [32]
                },
                "put": {
                  "performance": [33]
                },
                "delete": {
                  "performance": [34]
                }
              }
            }],
            "methods": {
              "post": {
                "performance": [35]
              },
              "put": {
                "performance": [36]
              },
              "delete": {
                "performance": [37]
              }
            }
          }],
          "methods": {
            "post": {
              "performance": [38]
            },
            "put": {
              "performance": [39]
            },
            "delete": {
              "performance": [40]
            }
          }
        }],
        "methods": {
          "post": {
            "performance": [41]
          },
          "put": {
            "performance": [42]
          },
          "delete": {
            "performance": [43]
          }
        }
      }],
      "methods": {
        "get": {
          "performance": [44]
        },
        "post": {
          "performance": [45]
        },
        "put": {
          "performance": [46]
        },
        "delete": {
          "performance": [47]
        }
      }}],
      stats : {
        reqPersec : undefined,
        numUsers : undefined,

      }
    };
    // Binding methods for tree manipulation
    this.onClick = this.onClick.bind(this)
  };
  //click events for each node performance
  onClick(e) {
    let id = 0;
    function createData(name, methods, performance, perfor, protein) {
      id += 1;
      let performanceData = []
      Object.keys(performance).forEach(key => {
        performanceData.push(performance[key].performance[0])
      })
      let performanceAvg = performanceData.reduce(
        (acc,next)=>{return acc+next},0) / performanceData.length
      return { 
        id, 
        name, 
        methods, 
        performance: performanceData.toString(), 
        perfor: performanceAvg, protein 
      };
    }
    //This is coping the data from 
    if(this.state.rows) {
      const rows = this.state.rows.slice();
      rows.push(createData(e.name, e.methods, e.methods, e.methods, 2 ))
      this.setState({rows});
    } else {
      const rows = [
        createData(e.name, e.methods, e.methods, e.methods, 4.0)
      ];
        this.setState({rows})
    }
  }
  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 4,
        y: dimensions.height / 2
      }
    })
  }
//<div style={{  display: 'flex', 'flex-drection':'row'}}> <Team /> <Team /> <Team /> <Team /> </div>
  render() {
    return (
      <div>
            <Header />
            <div id="treeWrapper" style={{width: '80em', height: '40em'}} ref={tc => (this.treeContainer = tc)}>
            <Tree data={this.state.data} translate={this.state.translate} onClick={this.onClick} initialDepth={1} />
          </div> 
          <DashboardContainer onClick={this.onClick} rows={this.state.rows}/>  
     </div>
    );
  }
}

export default hot(module)(App);
//module.exports = App;