const axios = require('axios');
let { performance } = require('perf_hooks');

const promPush = (promArr, targetURL, test, index, testId) => {
  // let startRoute;
  // currently pushing the same route information twice...
  // if (index === 0) startRoute = performance.now();

  const headers = {
    // Some sugar here; we're using spread operator and logical AND short circuit eval
    testId,
    ...(test.headerKey && test.headerValue && { [test.headerKey]: test.headerValue }),
    ...(index === 0 && { XtressStart: performance.now() }),
    ...(index === test.numRequests - 1 && { XtressEnd: performance.now() })
  };

  const data = {
    ...(test.bodyKey && test.bodyValue && { [test.bodyKey]: test.bodyValue })
  };

  const options = {
    baseURL: targetURL,
    url: test.route,
    method: test.method,
    headers,
    ...(Object.keys(data).length && { data })
  };

  console.log('OPTIONS ===>', options);

  promArr.push(axios(options));
};

const calculatePerfData = arr => {
  let min = Infinity;
  let max = -Infinity;
  let total = 0;
  arr.forEach(num => {
    if (num < min) min = num;
    if (num > max) max = num;
    total += num;
  });
  let avg = total / arr.length;
  return { min, max, avg };
};

module.exports = { promPush, calculatePerfData };
