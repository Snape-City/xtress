const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');
const TestController = require('./TestController');
const opn = require('opn');

const PORT = 4050;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist/')));
opn('http://localhost:4050');
 

const generateRequests = (testData) => {
  testData.tests.forEach((test, index) => {
    const config = {
      url: testData.url + testData.tests[index].route,
      method: testData.tests[index].method,
      maxRequests: parseInt(testData.tests[index].numRequests),
      concurrency: parseInt(testData.tests[index].numConcurrent),
      agentKeepAlive: true,
    };

    TestController.runTest(config, (err, res) => {
      if (err) console.log('Test Error Message: ' + error.message) 
      console.log("Test Complete! " + res)
    })
  })
}

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => console.log('User disconnected'));

  //Socket that receives request from GUI to run test
  socket.on('testData', testData => {
    //Calls function that starts the test
    generateRequests(testData)
  });
});

app.post('/finished', (req, res) => {
  io.emit('data', req.body);
  res.sendStatus(200);
});

app.post('/tree', (req, res) => {
  console.log('regbodybid', req.body)
  io.emit('tree', req.body);
  res.sendStatus(200);
})

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

