'use strict';

const primalOperators = {
  '^': (a, b) => Math.pow(a, b),
  '*': (a, b) => a * b,
  '/': (a, b) => {
    if (b === 0) {
      throw Infinity;
    }
    return a / b;
  }
};

const nonPrimalOperators = {
  '-': (a, b) => a - b,
  '+': (a, b) => a + b
};

module.exports.operators = Object.assign({}, primalOperators, nonPrimalOperators);
module.exports.primalOperators = primalOperators;
module.exports.nonPrimalOperators = nonPrimalOperators;
