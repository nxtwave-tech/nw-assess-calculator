import type { Operator } from '../types/calculator';

const MAX_DISPLAY_LENGTH = 12;

const OPERATOR_TO_SYMBOL: Record<Operator, string> = {
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
  '^': 'xⁿ',
  nthRoot: 'ⁿ√x',
  nCr: 'nCr',
  nPr: 'nPr',
};

const OPERATOR_TO_WORD: Record<Operator, string> = {
  '+': 'plus',
  '-': 'minus',
  '*': 'times',
  '/': 'divided by',
  '^': 'to the power of',
  nthRoot: 'root',
  nCr: 'choose',
  nPr: 'permute',
};

/**
 * Evaluate a binary arithmetic operation. Division by zero returns `Infinity`;
 * downstream formatting converts that to `'Error'`.
 */
export function calculate(left: number, right: number, operator: Operator): number {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      return right === 0 ? Infinity : left / right;
    case '^':
      return left ** right;
    case 'nthRoot':
      return nthRoot(left, right);
    case 'nCr':
      return combinations(left, right);
    case 'nPr':
      return permutations(left, right);
  }
}

function isNonNegativeInteger(value: number): boolean {
  return Number.isInteger(value) && value >= 0;
}

/**
 * nth root of `radicand` with index `index`. Odd integer roots of negatives
 * are defined. Even roots of negatives and a zero index are `NaN`.
 */
export function nthRoot(radicand: number, index: number): number {
  if (!Number.isFinite(radicand) || !Number.isFinite(index) || index === 0) return NaN;
  if (radicand === 0) return index > 0 ? 0 : Infinity;
  if (index < 0) {
    const root = nthRoot(radicand, -index);
    if (!Number.isFinite(root) || root === 0) return root === 0 ? Infinity : root;
    return 1 / root;
  }

  const indexIsInteger = Number.isInteger(index);
  if (radicand < 0 && (!indexIsInteger || index % 2 === 0)) return NaN;

  const magnitude = Math.abs(radicand) ** (1 / index);
  const signed = radicand < 0 ? -magnitude : magnitude;
  if (indexIsInteger) {
    const rounded = Math.round(signed);
    if (rounded ** index === radicand) return rounded;
  }
  return signed;
}

/** n choose r. Invalid inputs are `NaN`. Computed without factorials so large n stays exact. */
export function combinations(n: number, r: number): number {
  if (!isNonNegativeInteger(n) || !isNonNegativeInteger(r) || r > n) return NaN;
  const k = Math.min(r, n - r);
  let result = 1;
  for (let i = 1; i <= k; i += 1) {
    result = (result * (n - k + i)) / i;
    if (!Number.isFinite(result)) return Infinity;
  }
  return Math.round(result);
}

/** n permute r. Invalid inputs are `NaN`. */
export function permutations(n: number, r: number): number {
  if (!isNonNegativeInteger(n) || !isNonNegativeInteger(r) || r > n) return NaN;
  let result = 1;
  for (let i = 0; i < r; i += 1) {
    result *= n - i;
    if (!Number.isFinite(result)) return Infinity;
  }
  return result;
}

/**
 * Format a numeric value for the calculator display, collapsing long results
 * via `toPrecision` or exponential notation so they fit within the display
 * width. Non-finite values render as `'Error'`.
 */
export function formatDisplay(value: number): string {
  if (!isFinite(value)) return 'Error';

  const str = String(value);

  if (str.length <= MAX_DISPLAY_LENGTH) return str;

  const precise = value.toPrecision(MAX_DISPLAY_LENGTH - 2);
  if (precise.length <= MAX_DISPLAY_LENGTH) return precise;

  return value.toExponential(MAX_DISPLAY_LENGTH - 6);
}

/**
 * Return the on-button symbolic label for an operator (e.g. `*` → `×`).
 */
export function operatorToSymbol(op: Operator): string {
  return OPERATOR_TO_SYMBOL[op];
}

/**
 * Return the screen-reader-friendly word form of an operator (e.g. `*` → `times`).
 */
export function operatorToWord(op: Operator): string {
  return OPERATOR_TO_WORD[op];
}
