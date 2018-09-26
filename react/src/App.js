import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Tree from "react-d3-tree";
//const D3Tree = require('./D3Tree');
//import Tree from 'react-tree-graph';
import "./App.css";


const containerStyles = {
  width: '100%',
  height: '100vh',
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
              "post": {
                "performance": []
              },
              "put": {
                "performance": []
              },
              "delete": {
                "performance": []
              }
            }
          }, {
            "name": "/demo/example/randomMiddleware",
            "children": [],
            "methods": {
              "post": {
                "performance": []
              },
              "put": {
                "performance": []
              },
              "delete": {
                "performance": []
              }
            }
          }],
          "methods": {
            "post": {
              "performance": []
            },
            "put": {
              "performance": []
            },
            "delete": {
              "performance": []
            },
            "get": {
              "performance": []
            }
          }
        }],
        "methods": {
          "post": {
            "performance": []
          },
          "put": {
            "performance": []
          },
          "delete": {
            "performance": []
          },
          "get": {
            "performance": ["7885.073195010424ms"]
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
                "performance": []
              },
              "put": {
                "performance": []
              },
              "delete": {
                "performance": []
              }
            }
          }],
          "methods": {
            "post": {
              "performance": []
            },
            "put": {
              "performance": []
            },
            "delete": {
              "performance": []
            },
            "get": {
              "performance": []
            }
          }
        }],
        "methods": {
          "post": {
            "performance": []
          },
          "put": {
            "performance": []
          },
          "delete": {
            "performance": []
          },
          "get": {
            "performance": []
          }
        }
      }, {
        "name": "/users",
        "children": [],
        "methods": {
          "post": {
            "performance": []
          },
          "put": {
            "performance": []
          },
          "delete": {
            "performance": []
          }
        }
      }, {
        "name": "/api",
        "children": [],
        "methods": {
          "post": {
            "performance": []
          },
          "put": {
            "performance": []
          },
          "delete": {
            "performance": []
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
                  "performance": []
                },
                "put": {
                  "performance": []
                },
                "delete": {
                  "performance": []
                }
              }
            }],
            "methods": {
              "post": {
                "performance": []
              },
              "put": {
                "performance": []
              },
              "delete": {
                "performance": []
              }
            }
          }],
          "methods": {
            "post": {
              "performance": []
            },
            "put": {
              "performance": []
            },
            "delete": {
              "performance": []
            }
          }
        }],
        "methods": {
          "post": {
            "performance": []
          },
          "put": {
            "performance": []
          },
          "delete": {
            "performance": []
          }
        }
      }],
      "methods": {
        "get": {
          "performance": []
        },
        "post": {
          "performance": []
        },
        "put": {
          "performance": []
        },
        "delete": {
          "performance": []
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

  onClick() {
    alert("YO")
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 2
      }
    })
  }

  render() {
    return (
      /* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */
      <div id="treeWrapper" style={containerStyles} ref={tc => (this.treeContainer = tc)}>
        <Tree data={this.state.data} translate={this.state.translate} orientation={'vertical'} onClick={this.onClick} initialDepth={1} />
      </div>
    );
  }
}

export default hot(module)(App);
//module.exports = App;