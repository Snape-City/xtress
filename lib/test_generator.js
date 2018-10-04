const http = require('http');
const KeepAlive = require('agentkeepalive');
const urlLib = require('url');

class TestContainer {
  constructor(options, callback) {
    this.options = options
    this.clients = {}
    this.running = true
    this.requests = 0
  }

  callback(next) {
    this.requests += 1;
    console.log('total requests made => ', this.requests, ' Max Requests needed => ', this.options.maxRequests)
    if (this.options.maxRequests) {
      if (this.requests + 1 === this.options.maxRequests) {
        next('final');
      }

      if (this.requests == this.options.maxRequests) {
        console.log('Stopping');
        this.stop();
      }
    }
    if (this.running && next) {
      next();
    }
  }
  start() {
    this.startClients();
  }

  startClients() {
    const url = this.options.url;
    for (let index = 0; index < this.options.concurrency; index++) {
      const client = create(this, this.options);
      this.clients[index] = client;
      client.start();
    }
  }

  stop() {
    this.running = false;
    for (let key in this.clients) {
      this.clients[key].stop();
    }
  }
}

class NodeSocket {
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
    if (!this.testContainer.running) return;

    const requestFinished = this.nextReq();
    
    if (arguments[0]) {
      if (arguments[0] === 'final') {
        this.options.headers = { XtressFina: true };    //fix XtressFina   
      }
    }

    const request = http.request(this.options, this.getConnect(requestFinished));
    request.on('error', error => {
      console.log('Connection error (makeReq): ' + error.message);
    });
    
    request.end();
  }

  nextReq() {
    return () => {
      this.testContainer.callback(this.makeReq.bind(this));
    }
  }

  start() {
    return this.makeReq();
  }

  stop() {
    console.log('This should kill the TCP connection')
  }

  getConnect(callback) {
    return connection => {
      connection.on('data', () => {
        // console.log('Congrats: You\'ve got results')
      });
      connection.on('error', error => {
        console.log('OOPSIES: getConnect error: ' + error.message)
      });
      connection.on('end', () => {
        callback();
      });
    };
  }
}

const create = function(testContainer, config) {
  return new NodeSocket(testContainer, config);
}

exports.test = (options, callback) => {
  options.concurrency = options.concurrency || 1;
  const testContainer = new TestContainer(options, callback);
  testContainer.start();
  return testContainer;
}
