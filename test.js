#!/usr/bin/env node
const axios = require('axios');
const config = require('./extress-config.json');

// Helper method for pushing promise into array
const promPush = (promArr, request, i) => {
  if (request.method === 'GET') {
    if (i === request.requestNum - 1) {
      promArr.push(axios.get(request.route), {
        headers: {
            'XTRESSSSSSSSSS': 'application/json',
        }
      });
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
config.requests.forEach(request => {
  for (let i = 0; i < request.requestNum; i++) {
    promPush(promiseArr, request, i);
  }
});
axios
  .all(promiseArr)
  .then(response => {
    console.log('PROMISE ALL RESPONSE ===>', response);
    axios.get('http://localhost:3333/extress');
  })
  .catch(error => {
    console.error('Error resolving promises ===>', error);
  });
