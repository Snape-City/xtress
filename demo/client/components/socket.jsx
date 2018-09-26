import React, { Component } from 'react'

class Sock extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // You can use the socket inside the componet
    setTimeout(() => {
      socket.emit('data', {
        data: 'socket from client'
      })
    }, 5000);

    socket.on('data', tree => {
      console.log('tree', tree)
    })
  }

  render() {
    return (
      <div>
        here
      </div>
    )
  }
} 





export default Sock