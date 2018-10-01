const promPush = (promArr, request, index) => {
  if (request.method === 'GET') {
    if (index === request.requestNum - 1) {
      promArr.push(axios.get(request.route, { headers: { XtressFina: true } }));
    } else {
      promArr.push(axios.get(request.route));
    }
  } else if (request.method === 'POST') {
    promArr.push(axios.post(request.route));
  } else if (request.method === 'PUT') {
    // TODO
  } else if (request.method === 'DELETE') {
    // TODO
  } else if (request.method === 'PATCH') {
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

  socket.on('config', config => {
    const promiseArr = [];
    config.config.forEach(request => {
      for (let i = 0; i < request.requestNum; i++) {
        promPush(promiseArr, request, i);
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
