const promPush = (promArr, targetURL, test, index) => {
  const headers = {
    // Some sugar here; we're using spread operator and logical AND short circuit eval
    ...(test.headerKey && test.headerValue && { [test.headerKey]: test.headerValue }),
    ...(index === test.numRequests - 1 && { XtressFina: true })
  };

  const body = {
    ...(test.bodyKey && test.bodyValue && { [test.bodyKey]: test.bodyValue })
  };

  promArr.push(
    axios({
      baseURL: targetURL,
      url: test.route,
      method: test.method,
      ...(Object.keys(headers).length && { headers }),
      ...(Object.keys(body).length && { body })
    })
  );
};

module.exports = { promPush };
