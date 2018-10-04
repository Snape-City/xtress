const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const util = require('../lib/util');

describe('util.js test', () => {
  it('calculatePerfData test', () => {
    const arr = [5, 4, -1, 7, 0];
    const actual = util.calculatePerfData(arr);
    const expected = { min: -1, max: 7, avg: 3 };

    expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected));
  });
});
