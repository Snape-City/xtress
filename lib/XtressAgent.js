const http = require('http');
const KeepAlive = require('agentkeepalive');
const urlParser = require('url');

class XtressAgent {
  constructor(testController, config) {
    this.testController = testController,
    this.config = config,
    this.intialize()
  }

  intialize() {
    this.options = urlParser.parse(this.config.url);
    // Setting default agent to false every time
    this.options.agent = false;

    if (this.config.agentKeepAlive) {
      let maxSockets = 10;
      // if (this.config.rps) {
      //   maxSockets += Math.floor(this.config.rps);
      // }
      this.options.agent = new KeepAlive({
        maxSockets: maxSockets,
        keepAliveMsecs: 0,
        maxFreeSockets: 10,
        maxKeepAliveRequests: 10, // max requests per keepalive socket, default is 0, no limit
        maxKeepAliveTime: 30000  // keepalive for 30 seconds
      });
    }
    this.options.method = this.config.method;
    this.options.url = this.config.url;
  }

  makeReq() {
    // Dont run make request if we have turned running to stop - test should be over
    if (!this.testController.running) return;

    // Adding headers to the first and last request of...
    // a endpoint test to trigger performance monitoring
    if (this.testController.requestsMade === 0) {
      this.options.headers = { XtressStart: true };    //fix XtressFina   
    } else if( this.testController.requestsMade + 1 === this.testController.testOptions.maxRequests) {
      this.options.headers = { XtressEnd: true };
    }

    // Before we send out a request, increment the total number of requests
    this.testController.requestsMade += 1;
    
    console.log('total requestsMade => ', this.testController.requestsMade, ' Max Requests needed => ', this.testController.testOptions.maxRequests)

    const request = http.request(this.options, this.requestCallback(this.testController.requestsMade));
    
    request.on('error', error => console.log('Connection error (makeReq): ' + error.message)); 
    request.end();
  }

  requestCallback(requestNumber) {
    return () => {
      if (this.testController.requestsMade === this.testController.testOptions.maxRequests) {
        //Checking if finished req was last - run stop if it is
        if (requestNumber === this.testController.testOptions.maxRequests) {
          this.testController.stop();
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
    this.options.agent.destroy()
  }
}

exports.create = function(testController, config) {
  return new XtressAgent(testController, config);
}