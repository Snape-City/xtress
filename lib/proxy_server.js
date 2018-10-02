const { performance } = require('perf_hooks');
let getRouteStarted = undefined;
const promPush = (promArr, url, test, index) => {
  if (test.method === 'GET') {
    if (index === 0) {
      // Starts timer at the top of the route...
      getRouteStarted = performance.now(); 
    } else if (index === test.numRequests - 1) {
      promArr.push(axios.get(url + test.route, { headers: { xtressfina: true, xtressStart: getRouteStarted } }));
    } else {
      promArr.push(axios.get(url + test.route));
    }
  } else if (test.method === 'POST') {
    promArr.push(axios.post(url + test.route));
  } else if (test.method === 'PUT') {
    // TODO
  } else if (test.method === 'DELETE') {
    // TODO
  } else if (test.method === 'PATCH') {
    // TODO
  } else {
    return 'Invalid HTTP method!';
  }
};

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const PORT = 4050;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public/')));

io.on('connection', socket => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('testData', testData => {
    console.log('testData ===>', testData);
    const { url, tests } = testData;
    const promiseArr = [];
    tests.forEach(test => {
      for (let i = 0; i < test.numRequests; i++) {
        promPush(promiseArr, url, test, i);
      }
    });
    console.log('url ===>', url);
    axios
      .all(promiseArr)
      .then(() => console.log('all requests have been processed!'))
      .catch(error => console.error('Error 8===>', error));
  });

  // setTimeout(() => {
  //   socket.emit('data', {
  //     data: Extress.tree
  //   }),
  //     5000;
  // });
});

app.post('/finished', (req, res) => {
  io.emit('data', req.body);
  res.sendStatus(200);
});

app.post('/tree', (req, res) => {
  io.emit('tree', req.body);
  res.sendStatus(200);
})

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});