type Method = 'add' | 'subtract' | 'multiply' | 'percent' | 'divide';

interface ICalculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
  percent(a: number, b: number): number;
}

class Calculator implements ICalculator {
  name: string;
  method: Method;
  constructor(name: string) {
    this.name = name;
  }
  add(a: number, b: number): number {
    return a + b;
  }
  subtract(a: number, b: number): number {
    return a - b;
  }
  multiply(a: number, b: number): number {
    return a * b;
  }
  divide(a: number, b: number): number {
    return a / b;
  }
  percent(a: number, b: number): number {
    return (a * b) / 100;
  }

  getResult(a: number, b: number, method: Method): number | never {
    switch (method) {
      case 'add':
        return this.add(a, b);
      case 'subtract':
        return this.subtract(a, b);
      case 'multiply':
        return this.multiply(a, b);
      case 'divide':
        return this.divide(a, b);
      case 'percent':
        return this.percent(a, b);
      default:
        throw new Error('Invalid parameters');
    }
  }
}
