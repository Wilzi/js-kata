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
      expect(result).to.be.equal(0);
    });

    it('should return 2 when 1,1 given', function() {
      const result = subject.sum('1,1');
      expect(result).to.be.equal(2);
    });

    it('should return 3 when 2,1 given', function() {
      const result = subject.sum('2,1');
      expect(result).to.be.equal(3);
    });

    it('should return 4.1 when 3,1 given', function() {
      const result = subject.sum('3.1,1');
      expect(result).to.be.equal(4.1);
    });
  });

  describe('calculate with multiple string arguments', function() {
    it('should return 2 when 1+1 given', function() {
      const result = subject.calculate('1', '+', '1');
      expect(result).to.be.equal(2);
    });

    it('should return 3 when 2+1 given', function() {
      const result = subject.calculate('2', '+', '1');
      expect(result).to.be.equal(3);
    });

    it('should return 0 when 3-3 given', function() {
      const result = subject.calculate('3', '-', '3');
      expect(result).to.be.equal(0);
    });

    it('should return 9 when 3*3 given', function() {
      const result = subject.calculate('3', '*', '3');
      expect(result).to.be.equal(9);
    });

    it('should return 10 when 3*3+1 given', function() {
      const result = subject.calculate('3', '*', '3', '+', '1');
      expect(result).to.be.equal(10);
    });

    it('should return 10 when 9+1 given', function() {
      const result = subject.calculate('9', '+', '1');
      expect(result).to.be.equal(10);
    });

    it('should return Infinity when 9/0 given', function() {
      const result = subject.calculate('9', '/', '0');
      expect(result).to.be.equal(Infinity);
    });

    it('should return 20 when 2+3*6 given', function() {
      const result = subject.calculate('2', '+', '3', '*', '6');
      expect(result).to.be.equal(20);
    });

    it('should return 8 when 2^3 given', function() {
      const result = subject.calculate('2', '^', '3');
      expect(result).to.be.equal(8);
    });

    it('should return -0.1 when 1-1.1 given', function() {
      const result = subject.calculate('1', '-', '1.1');
      expect(result).to.be.closeTo(-0.1, 0.1);
    });

    it('should return 9.424 when 3*π (pi) given', function() {
      const result = subject.calculate('3', '*', 'π');
      expect(result).to.be.closeTo(9.424, 0.001);
    });
  });

  describe('calculate with single string argument', function() {
    it('should return 12 when 11+1 given', function() {
      const result = subject.calculate('11+1');
      expect(result).to.be.equal(12);
    });

    it('should return 15 when 11+1+3 given', function() {
      const result = subject.calculate('11+1+3');
      expect(result).to.be.equal(15);
    });

    it('should return 2.1 when 1.1+1 given', function() {
      const result = subject.calculate('1.1+1');
      expect(result).to.be.equal(2.1);
    });

    it.skip('should return -42 when -11.2-30.8 given', function() {
      const result = subject.calculate('-11.2-30.8');
      expect(result).to.be.equal(-42);
    });

    it('should return Error when 1a1+1 given', function() {
      const result = subject.calculate('1a1+1');
      expect(result)
        .to.be.a('error')
        .to.have.property('message', '1a1 is not a number');
    });
  });

});
