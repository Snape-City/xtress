#!/usr/bin/env node
const axios = require('axios');
const config = require('./extress-config.json');

// Helper method for pushing promise into array
const promPush = (promArr, request) => {
  if (request.method === 'GET') {
    promArr.push(axios.get(request.route));
  } else if (request.method === 'POST') {
    // TODO
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
    promPush(promiseArr, request);
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
