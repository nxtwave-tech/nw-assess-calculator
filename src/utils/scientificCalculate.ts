import type { AngleMode, ScientificFunction } from '../types/calculator';

const QUARTER_TURN: Record<AngleMode, number> = {
  deg: 90,
  rad: Math.PI / 2,
  grad: 100,
};

function toRadians(value: number, mode: AngleMode): number {
  if (mode === 'deg') return (value * Math.PI) / 180;
  if (mode === 'grad') return (value * Math.PI) / 200;
  return value;
}

function fromRadians(radians: number, mode: AngleMode): number {
  if (mode === 'deg') return (radians * 180) / Math.PI;
  if (mode === 'grad') return (radians * 200) / Math.PI;
  return radians;
}

function safeDivide(numerator: number, denominator: number): number {
  return denominator === 0 ? NaN : numerator / denominator;
}

/** Exact sin/cos on quarter turns so tan(90°) and sec(90°) are errors, not huge numbers. */
function sinCos(value: number, mode: AngleMode): { sin: number; cos: number } {
  const quarter = QUARTER_TURN[mode];
  const quarters = value / quarter;
  const nearest = Math.round(quarters);
  if (nearest !== 0 && Math.abs(quarters - nearest) < 1e-9) {
    const quadrant = ((nearest % 4) + 4) % 4;
    const exact = [
      { sin: 0, cos: 1 },
      { sin: 1, cos: 0 },
      { sin: 0, cos: -1 },
      { sin: -1, cos: 0 },
    ];
    return exact[quadrant] ?? { sin: 0, cos: 1 };
  }
  const radians = toRadians(value, mode);
  return { sin: Math.sin(radians), cos: Math.cos(radians) };
}

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

type Evaluator = (value: number, angleMode: AngleMode) => number;

const EVALUATORS: Record<ScientificFunction, Evaluator> = {
  sin: (v, m) => sinCos(v, m).sin,
  cos: (v, m) => sinCos(v, m).cos,
  tan: (v, m) => {
    const { sin, cos } = sinCos(v, m);
    return safeDivide(sin, cos);
  },
  sec: (v, m) => safeDivide(1, sinCos(v, m).cos),
  csc: (v, m) => safeDivide(1, sinCos(v, m).sin),
  cot: (v, m) => {
    const { sin, cos } = sinCos(v, m);
    return safeDivide(cos, sin);
  },
  asin: (v, m) => fromRadians(Math.asin(v), m),
  acos: (v, m) => fromRadians(Math.acos(v), m),
  atan: (v, m) => fromRadians(Math.atan(v), m),
  asec: (v, m) => (Math.abs(v) < 1 ? NaN : fromRadians(Math.acos(1 / v), m)),
  acsc: (v, m) => (Math.abs(v) < 1 ? NaN : fromRadians(Math.asin(1 / v), m)),
  acot: (v, m) => fromRadians(Math.PI / 2 - Math.atan(v), m),
  sinh: (v) => Math.sinh(v),
  cosh: (v) => Math.cosh(v),
  tanh: (v) => Math.tanh(v),
  asinh: (v) => Math.asinh(v),
  acosh: (v) => Math.acosh(v),
  atanh: (v) => Math.atanh(v),
  ln: (v) => Math.log(v),
  log10: (v) => Math.log10(v),
  square: (v) => v ** 2,
  cube: (v) => v ** 3,
  exp: (v) => Math.exp(v),
  tenPow: (v) => 10 ** v,
  reciprocal: (v) => (v === 0 ? Infinity : 1 / v),
  sqrt: (v) => (v < 0 ? NaN : Math.sqrt(v)),
  cbrt: (v) => Math.cbrt(v),
  factorial: (v) => factorial(v),
  abs: (v) => Math.abs(v),
};

const FUNCTION_TO_WORD: Record<ScientificFunction, string> = {
  sin: 'sine of',
  cos: 'cosine of',
  tan: 'tangent of',
  asin: 'arc sine of',
  acos: 'arc cosine of',
  atan: 'arc tangent of',
  sinh: 'hyperbolic sine of',
  cosh: 'hyperbolic cosine of',
  tanh: 'hyperbolic tangent of',
  asinh: 'inverse hyperbolic sine of',
  acosh: 'inverse hyperbolic cosine of',
  atanh: 'inverse hyperbolic tangent of',
  ln: 'natural log of',
  log10: 'log base 10 of',
  square: 'square of',
  cube: 'cube of',
  exp: 'e to the power of',
  tenPow: '10 to the power of',
  reciprocal: '1 over',
  sqrt: 'square root of',
  cbrt: 'cube root of',
  factorial: 'factorial of',
  sec: 'secant of',
  csc: 'cosecant of',
  cot: 'cotangent of',
  asec: 'arc secant of',
  acsc: 'arc cosecant of',
  acot: 'arc cotangent of',
  abs: 'absolute value of',
};

/**
 * Evaluate a unary scientific function at the given value. Trig functions
 * honor the angle mode; inverse trig returns results in that same mode.
 * Domain errors return `NaN` or `Infinity`, which downstream formatting
 * renders as `'Error'`.
 */
export function evaluateScientificFunction(
  value: number,
  fn: ScientificFunction,
  angleMode: AngleMode,
): number {
  return EVALUATORS[fn](value, angleMode);
}

/**
 * Return the screen-reader-friendly phrase for a scientific function
 * (e.g. `'sin'` → `'sine of'`).
 */
export function scientificFunctionToWord(fn: ScientificFunction): string {
  return FUNCTION_TO_WORD[fn];
}
