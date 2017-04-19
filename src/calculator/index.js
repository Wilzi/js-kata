'use strict';

const _ = require('lodash');

const mathSymbols = require('./math-symbols');
const operators = require('./operators').operators;
const primalOperators = require('./operators').primalOperators;
const nonPrimalOperators = require('./operators').nonPrimalOperators;

const DECIMAL_NUMBER_PATTERN = '([-]?[0-9]*\\.?[0-9]+)';

class Calculator {
  sum(numbers) {
    return numbers.split(',')
      .map(a => parseFloat(a) || 0)
      .reduce((acc, val) => acc + val);
  }

  calculate() {
    try {
      return this._flowOperations(Array.from(arguments).join(''));
    } catch (err) {
      return err;
    }
  }

  _flowOperations(input) {
    return _.flow([
      this._replaceMathSymbols,
      this._recursiveCalculator.bind(this, this._getOperationPattern(primalOperators)),
      this._recursiveCalculator.bind(this, this._getOperationPattern(nonPrimalOperators)),
      result => parseFloat(result)
    ])(input);
  }

  _replaceMathSymbols(str) {
    const regexp = new RegExp(`([${Object.keys(mathSymbols)}])`, 'g');
    return str.replace(regexp, m => mathSymbols[m]);
  }

  _getOperationPattern(operators) {
    const escapedOperators = Object.keys(operators).map(o => `\\${o}`);
    return new RegExp(`${DECIMAL_NUMBER_PATTERN}([${escapedOperators}])${DECIMAL_NUMBER_PATTERN}`);
  }

  _recursiveCalculator(pattern, str) {
    if (str.match(pattern)) {
      const recalculated = str.replace(pattern, this._replace);
      return this._recursiveCalculator(pattern, recalculated);
    }

    return str;
  }

  _replace(match, d1, operator, d2) {
    return operators[operator](parseFloat(d1), parseFloat(d2));
  }

  static create() {
    return new Calculator();
  }
}

module.exports = Calculator;
