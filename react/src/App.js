import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import DashboardContainer from './components/containers/DashboardContainer.js';
// import TreeContainer from "./components/containers/TreeContainer.js";
import SendIt from './components/SendIt.jsx';
import Socket from './components/socket.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="top-level-container">hi</div>
        <div>
          <DashboardContainer />
        </div>
        <div>
          <SendIt />
          <Socket />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
//module.exports = App;
