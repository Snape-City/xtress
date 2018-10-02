const promPush = (promArr, targetURL, test, index) => {
  const headers = {
    // Some sugar here; we're using spread operator and logical AND short circuit eval
    ...(test.headerKey && test.headerValue && { [test.headerKey]: test.headerValue }),
    ...(index === test.numRequests - 1 && { XtressFina: true })
  };

  promArr.push(
    axios({
      baseURL: targetURL,
      url: test.route,
      method: test.method,
      ...(Object.keys(headers).length && { headers })
    })
  );
  // console.log('HEADERS ===>', headers);
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
    // console.log('testData ===>', testData);
    const { url, tests } = testData;
    const promiseArr = [];
    tests.forEach(test => {
      for (let i = 0; i < test.numRequests; i++) {
        promPush(promiseArr, url, test, i);
      }
    });
    axios
      .all(promiseArr)
      .then(() => console.log('all requests have been processed!'))
      .catch(error => console.error('Error ===>', error));
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
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
