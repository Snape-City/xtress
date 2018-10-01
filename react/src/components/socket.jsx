import React, { Component } from 'react';

export default class Socket extends Component {
  constructor(props) {
    super(props);
    this.state = { tree: null };
  }

  componentDidMount() {
    setTimeout(() => {
      socket.emit('data', {
        data: 'socket from client'
      });
    }, 5000);

    socket.on('data', data => {
      this.setState({ tree: JSON.stringify(data) });
    });
  }

  render() {
    return (
      <div>
        <p>TREE BELOW</p>
        <p>{this.state.tree}</p>
      </div>
    );
  }
}
