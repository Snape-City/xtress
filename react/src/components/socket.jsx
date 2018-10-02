import React, { Component } from 'react';
// const TreeContainer = require('./components/containers/TreeContainer.js') 

export default class Socket extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      perfData: [],
      treedata: null
     };
  }

  // handleClick(e){
  //   axios.post('http://localhost:4050/tree', Extress.tree);
  // }
  

  componentDidMount() {
    // setTimeout(() => {
    //   socket.emit('data', {
    //     data: 'socket from client'
    //   });
    // }, 5000);

    // TODO: move perfData to App.js and move "run" function to App.js, trigger here.
    socket.on('data', data => {
      let newArr = this.state.perfData;
      newArr.push(JSON.stringify(data));
      this.setState({ perfData: newArr });
    });

    socket.on('tree', tree => {
      console.log('TREE 8===>', tree)
    })
  }

  render() {
    return (
      <div>
        <p>TREE BELOW</p>
        <p>{this.state.perfData}</p>
        <button onClick={this.handleClick} >BUILD THAT TREE BOY </button>
      </div>
    );
  }
}

{/* <TreeContainer treeData={this.state.treeData} /> */}
