'use strict';

const _ = require('lodash');

const mathSymbols = require('./math-symbols');
const operators = require('./operators');

class Calculator {
  sum(numbers) {
    return numbers.split(',')
      .map(a => parseFloat(a) || 0)
      .reduce((acc, val) => acc + val);
  }

  calculate() {
    try {
      return this._flowOperations(Array.from(arguments));
    } catch (err) {
      return err;
    }
  }

  _flowOperations(input) {
    return _.flow([
      this._breakDownToNumbersAndOperators,
      this._replaceMathSymbols,
      this._calculatePrimalOperations.bind(this),
      this._doCalculate.bind(this)
    ])(input);
  }

  _breakDownToNumbersAndOperators(array) {
    return _.flatten(array.map(a => a.split(/([\d.]+)/).filter(e => e)));
  }

  _replaceMathSymbols(array) {
    return array.map(a => mathSymbols[a] || a);
  }

  _calculatePrimalOperations(ops) {
    for (let i = 0; i < ops.length; i++) {
      const operator = ops[i];
      if (!operators[operator] || !operators[operator].isPrimal) {
        continue;
      }

      const previousOperand = ops[i - 1];
      const nextOperand = ops[i + 1];

      ops[i - 1] = this._doCalculate([previousOperand, operator, nextOperand]);
      ops.splice(i, 2);
    }

    return ops;
  }

  _doCalculate(array) {
    return array.reduce(this._doOperation.bind(this), parseFloat(array[0]));
  }

  _doOperation(acc, val, index, originalArray) {
    if (operators[val]) {
      const firstOperator = parseFloat(originalArray[index + 1]);
      return operators[val].calculus(acc, firstOperator);
    }
    return acc;
  }

  static create() {
    return new Calculator();
  }
}

module.exports = Calculator;
