const http = require('http');
const KeepAlive = require('agentkeepalive');
const urlLib = require('url');

class XtressAgent {
  constructor(testContainer, config) {
    this.testContainer = testContainer,
    this.config = config,
    this.intialize()
  }

  intialize() {
    this.options = urlLib.parse(this.config.url);
    // Setting default agent to false every time
    this.options.agent = false;

    if (this.config.agentKeepAlive) {
      let maxSockets = 10;
      // if (this.config.rps) {
      //   maxSockets += Math.floor(this.config.rps);
      // }
      this.options.agent = new KeepAlive({
        maxSockets: maxSockets,
        maxKeepAliveRequests: 0, // max requests per keepalive socket, default is 0, no limit
        maxKeepAliveTime: 30000  // keepalive for 30 seconds
      });
    }
    this.options.method = this.config.method;
    this.options.url = this.config.url;
  }

  makeReq() {
    // Dont run make request if we have turned running to stop - test should be over
    if (!this.testContainer.running) return;

    // Adding headers to the first and last request of...
    // a endpoint test to trigger performance monitoring
    if (this.testContainer.requestsMade === 0) {
      this.options.headers = { XtressFirst: true };    //fix XtressFina   
    } else if( this.testContainer.requestsMade + 1 === this.testContainer.testOptions.maxRequests) {
      this.options.headers = { XtressFina: true };
    }

    // Before we send out a request, increment the total number of requests
    this.testContainer.requestsMade += 1;

    // makeReq will only have an arg if its the first or last request -- so was can add headers
    
    console.log('total requestsMade => ', this.testContainer.requestsMade, ' Max Requests needed => ', this.testContainer.testOptions.maxRequests)

    const request = http.request(this.options, this.requestCallback(this.testContainer.requestsMade));
    
    request.on('error', error => console.log('Connection error (makeReq): ' + error.message)); 
    request.end();
  }

  requestCallback(requestNumber) {
    return () => {
      if (this.testContainer.requestsMade === this.testContainer.testOptions.maxRequests) {
        //Checking if finished req was last - run stop if it is
        if (requestNumber === this.testContainer.testOptions.maxRequests) {
          this.testContainer.stop();
        }
      } else {
        this.makeReq();
      }
    } 
  }

  start() {
    //Starts generation of new http requests to be passed through each http agent
    return this.makeReq();
  }

  stop() {
    // Need to destroy
    console.log('This should kill the TCP connection')
  }
}

exports.create = function(testContainer, config) {
  return new XtressAgent(testContainer, config);
}