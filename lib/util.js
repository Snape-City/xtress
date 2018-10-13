const axios = require('axios');
let { performance } = require('perf_hooks');

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

module.exports = { calculatePerfData };
