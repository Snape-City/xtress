import React, { Component } from 'react';

class SendIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: [
        {
          method: 'GET',
          route: 'http://localhost:3333/',
          requestNum: 10
        }
      ]
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    socket.emit('config', {
      config: this.state.config
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Send It!</button>
      </div>
    );
  }
}

export default SendIt;
