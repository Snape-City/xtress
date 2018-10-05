const NodeSocket = require('./node_socket');

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
    //Starts generation of new HTTP agents
    this.startClients();
  }

  startClients() {
    const url = this.options.url;
    for (let index = 0; index < this.options.concurrency; index++) {
      const client = NodeSocket.create(this, this.options);
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



exports.test = (options, callback) => {
  options.concurrency = options.concurrency || 1;
  const testContainer = new TestContainer(options, callback);
  testContainer.start();
  return testContainer;
}
