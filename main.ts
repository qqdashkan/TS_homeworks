abstract class Shape {
  constructor(public readonly name: string, public readonly color: string) {
    this.name = name;
    this.color = color;
  }
  public abstract calculateArea(): number;
  public abstract calculatePerimeter(): number;

  public printInfo(): string {
    return `Shape: ${this.name}, color: ${this.color}`;
  }
}

abstract class EllipticalShape extends Shape {
  constructor(public readonly name: string, public readonly color: string) {
    super(name, color);
  }

  public abstract printDiameter(): void;
}

class Circle extends EllipticalShape {
  constructor(
    public readonly name: string,
    public readonly color: string,
    public readonly radius: number
  ) {
    super(name, color);
    this.radius = radius;
  }

  calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }

  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }

  printDiameter(): void {
    console.log(2 * this.radius);
  }
}

class Ellipse extends EllipticalShape {
  a: number;
  b: number;

  constructor(
    public readonly name: string,
    public readonly color: string,
    public SemiMajorAxis: number,
    public SemiMinorAxis: number
  ) {
    super(name, color);
    this.a = SemiMajorAxis;
    this.b = SemiMinorAxis;
  }

  calculateArea(): number {
    return Math.PI * this.a * this.b;
  }

  calculatePerimeter(): number {
    const area = this.calculateArea();

    return 4 * ((area + Math.pow(this.a - this.b, 2)) / (this.a + this.b));
  }

  printDiameter(): void {
    console.log('MajorAxisDiameter: ' + 2 * this.a);
    console.log('MinorAxisDiameter: ' + 2 * this.b);
  }
}

abstract class PolygonalShape extends Shape {
  constructor(
    public readonly name: string,
    public readonly color: string,
    public sides: Array<number>
  ) {
    super(name, color);
    this.sides = sides;
  }

  abstract printAreaFormula(): void;

  getNumberOfSides(): number {
    return this.sides.length;
  }

  calculatePerimeter(): number {
    return this.sides.reduce(function (a, b) {
      return a + b;
    });
  }
}

class Rectangle extends PolygonalShape {
  sideA: number;
  sideB: number;
  constructor(
    public readonly name: string,
    public readonly color: string,
    public sides: [number, number, number, number]
  ) {
    super(name, color, sides);
    this.sideA = sides[0];
    this.sideB = sides[1];
  }

  calculateArea(): number {
    return this.sideA * this.sideB;
  }

  printAreaFormula(): void {
    console.log('S = ab');
  }
}

class Square extends PolygonalShape {
  sideA: number;
  constructor(
    public readonly name: string,
    public readonly color: string,
    public sides: [number, number, number, number]
  ) {
    super(name, color, sides);
    this.sideA = sides[0];
  }

  calculateArea(): number {
    return Math.pow(this.sideA, 2);
  }

  printAreaFormula(): void {
    console.log('S = 4a');
  }
}

class Triangle extends PolygonalShape {
  sideA: number;
  sideB: number;
  sideC: number;
  constructor(
    public readonly name: string,
    public readonly color: string,
    public sides: [number, number, number]
  ) {
    super(name, color, sides);
    this.sideA = sides[0];
    this.sideB = sides[1];
    this.sideC = sides[2];
  }

  calculateArea(): number {
    const semiP = this.calculatePerimeter() / 2;
    return Math.sqrt(
      semiP * (semiP - this.sideA) * (semiP - this.sideB) * (semiP - this.sideC)
    );
  }

  printTriangleType(): void {
    const isTriangle = (): boolean => {
      return (
        this.sideA + this.sideB > this.sideC &&
        this.sideA + this.sideC > this.sideB &&
        this.sideC + this.sideB > this.sideA
      );
    };

    const getTriangleType = (): void => {
      if (this.sideA === this.sideB && this.sideB === this.sideC) {
        console.log('Equilateral triangle');
      } else if (
        this.sideA === this.sideB ||
        this.sideB === this.sideC ||
        this.sideA === this.sideC
      ) {
        console.log('Isosceles triangle');
      } else console.log('Scalene triangle');
    };

    isTriangle() ? getTriangleType() : console.log('Not a triangle');
  }

  calcHeight(): number {
    return (2 * this.calculateArea()) / this.sideA;
  }

  printAreaFormula(): void {
    console.log('S =√p(p - a)(p - b)(p - c)');
  }
}

class Polygon extends PolygonalShape {
  sideA: number;
  constructor(
    public readonly name: string,
    public readonly color: string,
    public sides: Array<number>
  ) {
    super(name, color, sides);
    this.sideA = sides[0];
  }

  calculateArea(): number {
    const sidesLength = this.getNumberOfSides();
    const degrees = 180 / sidesLength;
    const radians = degrees * (Math.PI / 180);
    const square = Math.pow(this.sideA, 2);
    const ctg = Math.cos(radians) / Math.sin(radians);

    return 0.25 * sidesLength * square * ctg;
  }

  printAreaFormula(): void {
    console.log('S = (0.25na^2) * ctg(180°/n)');
  }
}
