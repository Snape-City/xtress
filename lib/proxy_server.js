const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');
const testGenerator = require('./test_generator');
const opn = require('opn');

const PORT = 4050;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist/')));


opn('http://localhost:4050');
 
const generateRequests = (testData) => {

  //configuration for just one request based on current data coming from gui - will need to be removed
  const config = {
    url: testData.url + testData.tests[0].route,
    method: testData.tests[0].method,
    maxRequests: parseInt(testData.tests[0].numRequests),
    agentKeepAlive: true,
    concurrency: 100,
  };

  testGenerator.test(config, (error, result) => {
    if (error) {
      return callback(error);
    }
    server.close(error => {
      if (error) {
        return callback(error);
      }
      return callback(null, 'Test results: ' + JSON.stringify(result));
    });
  });
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