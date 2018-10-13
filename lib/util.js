const axios = require('axios');
let { performance } = require('perf_hooks');
let startRoute;

const promPush = (promArr, targetURL, test, index) => {
  // currently pushing the same route information twice...
  if (index === 0) { startRoute = performance.now() };
  const headers = {
    // Some sugar here; we're using spread operator and logical AND short circuit eval
    ...(test.headerKey && test.headerValue && { [test.headerKey]: test.headerValue }),
    ...(index === test.numRequests - 1 && { XtressFina: true, XtressStart: startRoute  })
  };

  const data = {
    ...(test.bodyKey && test.bodyValue && { [test.bodyKey]: test.bodyValue })
  };

  promArr.push(
    axios({
      baseURL: targetURL,
      url: test.route,
      method: test.method,
      ...(Object.keys(headers).length && { headers }),
      ...(Object.keys(data).length && { data })
    })
  );
};

module.exports = { promPush };
