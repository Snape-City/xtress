import React, { Component } from 'react'
import axios from 'axios';

class SendIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: [
        {
          "method": "GET",
          "route": "http://localhost:3333/demo",
          "requestNum": 100
        }
      ]
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {


  }
  
  handleClick(e) {
    e.preventDefault();
    this.state.config.forEach(request => {
      for (let i = 0; i < request.requestNum; i++) {
        if (request.method === 'GET') {
          axios.get(request.route, { crossdomain: true })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      }
    }); 
    console.log('The link was clicked.');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          Send It
        </button>
      </div>
    )
  }
} 





export default SendIt