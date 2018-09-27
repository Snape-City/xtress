const { EventEmitter } = require('events');
const { performance } = require('perf_hooks');
const { Tree, Node } = require('./util/Tree');
const fs = require('fs');
const express = require('express');
const opn = require('opn');
const eapp = express();
const path = require('path');
const http = require('http').Server(eapp);
const io = require('socket.io')(http);
const axios = require('axios');
const bodyParser = require('body-parser');

eapp.use(bodyParser.json());
eapp.use(express.static(path.join(__dirname, '/gui/build')));


const Extress = {
  tree: new Tree(),
  map: app => {

    function buildTree(stack) {
      stack.forEach(endpoint => (endpoint.route) ? Extress.tree.add(endpoint.route) : null);
    }

    buildTree(app._router.stack);
    axios.post('http://localhost:4050/finished', Extress.tree);

  },
  proxy: () => {
    http.listen(4050, console.log(`listening on port 4050`));
    opn(`http://localhost:4050/`)
    io.on('connection', (socket) => {
      console.log('a user connected');

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      socket.on('config', (config) => {
        const promPush = (promArr, request, index) => {
          if (request.method === 'GET') {
            if (index === request.requestNum - 1) {
              promArr.push(axios.get(request.route, { headers: { XtressFina: true, }}));
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

        const promiseArr = [];
        config.config.forEach(request => {
          for (let i = 0; i < request.requestNum; i++) {
            promPush(promiseArr, request, i);
          }
        });
        axios.all(promiseArr).then(console.log('all requests have been processed!'));

      })

    setTimeout(() => {
      socket.emit('data', {
        data: Extress.tree
      }), 5000
    })
  })
 },
  routeTimer: (req, res, next) => {
    const start = performance.now();

    res.once('finish', () => {
      const performanceNode = Extress.tree.findBFS(req.originalUrl);
      Extress.tree.addPerformance(performanceNode, req.method.toLowerCase(), performance.now() - start);
      if (req.headers.xtressfina) {
        axios.post('http://localhost:4050/finished', Extress.tree);
        console.log('Final request processed, sending post to Xtress server to rerender tree');
      }
    })

    next();
  }, 
}

eapp.post('/finished', (req, res) => {
  io.emit( 'data', req.body )
})

module.exports = Extress;