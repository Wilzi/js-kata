'use strict';

const _ = require('lodash');

const mathSymbols = require('./math-symbols');
const operators = require('./operators');

class Calculator {

  constructor() {
    this._primalOperators = _.keys(_.pickBy(operators, o => o.isPrimal));
    this._nonPrimalOperators = _.keys(_.pickBy(operators, o => !o.isPrimal));
  }

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
      this._recursiveCalculator.bind(this, this._primalOperators),
      this._recursiveCalculator.bind(this, this._nonPrimalOperators),
      result => parseFloat(result)
    ])(input);
  }

  _replaceMathSymbols(str) {
    const regexp = new RegExp(`([${Object.keys(mathSymbols)}])`, 'g');
    return str.replace(regexp, m => mathSymbols[m]);
  }

  _recursiveCalculator(operators, str) {
    const pattern = this._getPattern(operators);

    if (str.match(pattern)) {
      const recalculated = str.replace(pattern, this._replace.bind(this));
      return this._recursiveCalculator(operators, recalculated);
    }

    return str;
  }

  _getPattern(operators) {
    const escapedOperators = operators.map(o => `\\${o}`);
    return new RegExp(`([0-9.]+)([${escapedOperators}])([0-9.]+)`);
  }

  _replace(match, d1, operator, d2) {
    return operators[operator].calculus(parseFloat(d1), parseFloat(d2));
  }

  static create() {
    return new Calculator();
  }
}

module.exports = Calculator;
