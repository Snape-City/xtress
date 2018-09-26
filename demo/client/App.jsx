import React, { Component } from 'react';

import SendIt from './components/SendIt.jsx';
import Sock from './components/socket.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1> 
        <SendIt/>
        <Sock/>
      </div>
    )
  }
}

export default App;