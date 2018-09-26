import React, { Component } from "react";
import { hot } from "react-hot-loader";
import DashboardContainer from "./components/containers/DashboardContainer.js";
import TreeContainer from "./components/containers/TreeContainer.js";

class App extends Component {
  constructor(props) {
    super(props);

    
  };

  render() {
    return (
      <div>
        <div id="top-level-container">
          <TreeContainer />
        </div>
        <div>
          <DashboardContainer />
          </div>
      </div>
    );
  }
}

export default hot(module)(App);
//module.exports = App;