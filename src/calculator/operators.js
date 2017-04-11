'use strict';

module.exports = {
  '^': {
    isPrimal: true,
    calculus: (a, b) => Math.pow(a, b)
  },
  '*': {
    isPrimal: true,
    calculus: (a, b) => a * b
  },
  '/': {
    isPrimal: true,
    calculus: (a, b) => {
      if (b === 0) {
        throw Infinity;
      }
      return a / b;
    }
  },
  '-': {
    isPrimal: false,
    calculus: (a, b) => a - b
  },
  '+': {
    isPrimal: false,
    calculus: (a, b) => a + b
  }
};
