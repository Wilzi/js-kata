'use strict';

class Calculator {

  constructor() {
    this.operators = {
      '^': {
        isPrimal: true,
        calculus:(a, b) => Math.pow(a, b)
      },
      '*': {
        isPrimal: true,
        calculus:(a, b) => a * b
      },
      '/': {
        isPrimal: true,
        calculus:(a, b) => {
          if (b === 0) {
            throw Infinity;
          }
          return a / b;
        }
      },
      '-': {
        isPrimal: false,
        calculus:(a, b) => a - b
      },
      '+': {
        isPrimal: false,
        calculus:(a, b) => a + b
      }
    };
  }

  sum(numbers) {
    return numbers.split(',')
      .map(a => parseFloat(a) || 0)
      .reduce((acc, val) => acc + val);
  }

  calculate() {
    let argsArr = Array.from(arguments);
    try {
      return this._doCalculate(this._calculatePrimalOperations(argsArr));
    } catch (err) {
      return err;
    }
  }

  _doCalculate(array) {
    return array.reduce(this._doOperation.bind(this), parseInt(array[0]));
  }

  _calculatePrimalOperations(ops) {
    for(let i = 0; i < ops.length; i++) {
      let operator = ops[i];
      if (!this._isOperator(operator)) {
        continue;
      }
      if (!this.operators[operator].isPrimal) {
        continue;
      }

      let previousOperand = ops[i-1];
      let nextOperand = ops[i+1];

      ops[i-1] = this._doCalculate([previousOperand, operator, nextOperand]);
      ops.splice(i, 2);
    }

    return ops;
  }

  _doOperation(acc, val, index, originalArray) {
    if(this._isOperator(val)) {
      let firstOperator = parseInt(originalArray[index+1]);
      return this.operators[val].calculus(acc, firstOperator);
    }
    return acc;
  }

  _isOperator(val) {
    return this.operators[val];
  }

  static create() {
    return new Calculator();
  }
}

module.exports = Calculator;
