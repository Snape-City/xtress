const XtressAgent = require('./XtressAgent');

class TestController {
  constructor(testOptions, callback) {
    this.testOptions = testOptions
    this.clients = {}
    this.running = true
    this.requestsMade = 0
  }

  start() {
    //Starts generation of new HTTP agents
    this.startClients();
  }

  startClients() {
    const url = this.testOptions.url;
    for (let index = 0; index < this.testOptions.concurrency; index++) {
      const client = XtressAgent.create(this, this.testOptions);
      this.clients[index] = client;
      client.start();
    }
  }

  stop() {
    this.running = false;
    Object.keys(this.clients).forEach(index => {
      this.clients[index].stop();
    });
  }
}

exports.runTest = (testOptions, resolve) => {
  testOptions.concurrency = testOptions.concurrency || 1;
  const testController = new TestController(testOptions, callback);
  testController.start();
  return testController;
}
