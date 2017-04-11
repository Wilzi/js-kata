'use strict';

const Calculator = require('./index');

describe('Calculator', function() {

  let subject;

  beforeEach(function() {
    subject = Calculator.create();
  });

  describe('sum', function() {
    it('should return 0 when empty string given', function() {
      const result = subject.sum('');
      expect(0).to.be.equal(result);
    });

    it('should return 2 when 1,1 given', function() {
      const result = subject.sum('1,1');
      expect(2).to.be.equal(result);
    });

    it('should return 3 when 2,1 given', function() {
      const result = subject.sum('2,1');
      expect(3).to.be.equal(result);
    });

    it('should return 4.1 when 3,1 given', function() {
      const result = subject.sum('3.1,1');
      expect(4.1).to.be.equal(result);
    });
  });

  describe('calculate with multiple string arguments', function() {
    it('should return 2 when 1+1 given', function() {
      const result = subject.calculate('1', '+', '1');
      expect(2).to.be.equal(result);
    });

    it('should return 3 when 2+1 given', function() {
      const result = subject.calculate('2', '+', '1');
      expect(3).to.be.equal(result);
    });

    it('should return 0 when 3-3 given', function() {
      const result = subject.calculate('3', '-', '3');
      expect(0).to.be.equal(result);
    });

    it('should return 9 when 3*3 given', function() {
      const result = subject.calculate('3', '*', '3');
      expect(9).to.be.equal(result);
    });

    it('should return 10 when 3*3+1 given', function() {
      const result = subject.calculate('3', '*', '3', '+', '1');
      expect(10).to.be.equal(result);
    });

    it('should return 10 when 9+1 given', function() {
      const result = subject.calculate('9', '+', '1');
      expect(10).to.be.equal(result);
    });

    it('should return Infinity when 9/0 given', function() {
      const result = subject.calculate('9', '/', '0');
      expect(Infinity).to.be.equal(result);
    });

    it('should return 20 when 2+3*6 given', function() {
      const result = subject.calculate('2', '+', '3', '*', '6');
      expect(20).to.be.equal(result);
    });

    it('should return 8 when 2^3 given', function() {
      const result = subject.calculate('2', '^', '3');
      expect(8).to.be.equal(result);
    });

    it('should return -0.1 when 1-1.1 given', function() {
      const result = subject.calculate('1', '-', '1.1');
      expect(-0.1).to.be.closeTo(result, 0.1);
    });

    it('should return 9.424 when 3*π (pi) given', function() {
      const result = subject.calculate('3', '*', 'π');
      expect(9.424).to.be.closeTo(result, 0.001);
    });
  });

  describe('calculate with single string argument', function() {
    it('should return 12 when 11+1 given', function() {
      const result = subject.calculate('11+1');
      expect(12).to.be.equal(result);
    });

    it('should return 15 when 11+1+3 given', function() {
      const result = subject.calculate('11+1+3');
      expect(15).to.be.equal(result);
    });

    it.skip('should return 2.1 when 1.1+1 given', function() {
      const result = subject.calculate('1.1+1');
      expect(2.1).to.be.equal(result);
    });
  });

});
