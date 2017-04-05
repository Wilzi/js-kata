'use strict';

class Calculator {

  constructor() {
    this.operands = {
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
      '-': (a, b) => a - b,
      '+': (a, b) => a + b
    };

    this.operandsPriority = Object.keys(this.operands);
  }

  sum(numbers) {
    return numbers.split(',')
      .map(a => parseFloat(a) || 0)
      .reduce((acc, val) => acc + val);
  }

  calculate() {
    let argsArr = Array.from(arguments);
    return this._doCalculate(this._orderByOperands(argsArr));
  }

  _doCalculate(array) {
    return array.reduce(this._doOperation.bind(this), parseInt(array[0]));
  }

  _orderByOperands(ops) {
    for(let i = 0; i < ops.length; i++) {
      let val = ops[i];
      if (!this._isOperand(val)) {
        continue;
      }
      let priority = this.operandsPriority.indexOf(val) <= 1;

      if (priority) {
        ops[i-1] = this._doCalculate([ops[i-1], val, ops[i+1]]);
        ops.splice(i, 2);
      }
    }

    return ops;
  }

  _doOperation(acc, val, index, tomi) {
    if(this._isOperand(val)) {
      return this.operands[val](acc, parseInt(tomi[index+1]));
    }
    return acc;
  }

  _isOperand(val) {
    return this.operands[val];
  }

  static create() {
    return new Calculator();
  }
}

module.exports = Calculator;
