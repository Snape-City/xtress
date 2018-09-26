const config = {
    "requests": [
      {
        "method": "GET",
        "route": "http://localhost:3333/demo",
        "requestNum": 100
      },
      {
        "method": "POST",
        "route": "http://localhost:3333/demo",
        "requestNum": 100
      }

    ]
  }
// Helper method for pushing promise into array
const promPush = (promArr, request) => {
  if (request.method === 'GET') {
    promArr.push(axios.get(request.route));
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
    promPush(promiseArr, request);
  }
});
console.log('here')
const axiosCall = () => {
  console.log('here')
  axios.all(promiseArr).then(console.log('all requests have been processed!'));  
}

