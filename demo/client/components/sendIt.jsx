import React, { Component } from 'react'

class SendIt extends Component {
  constructor(props) {
    super(props);
  }
  
  handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  render() {
    return (
      <div>
        <button onClick={handleClick} className={button}>
          Send It
          
        </button>
      </div>
    )
  }
} 





export default SendIt