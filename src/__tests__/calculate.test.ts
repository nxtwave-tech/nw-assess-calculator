import { describe, expect, it } from 'vitest';

import {
  calculate,
  combinations,
  formatDisplay,
  nthRoot,
  operatorToSymbol,
  operatorToWord,
  permutations,
} from '../utils/calculate';

describe('calculate', () => {
  it('adds two positive numbers', () => {
    expect(calculate(2, 3, '+')).toBe(5);
  });

  it('adds negative numbers', () => {
    expect(calculate(-3, 4, '+')).toBe(1);
    expect(calculate(-3, -4, '+')).toBe(-7);
  });

  it('adds zero', () => {
    expect(calculate(0, 5, '+')).toBe(5);
    expect(calculate(5, 0, '+')).toBe(5);
  });

  it('subtracts two numbers', () => {
    expect(calculate(10, 3, '-')).toBe(7);
  });

  it('subtracts resulting in negative', () => {
    expect(calculate(3, 10, '-')).toBe(-7);
  });

  it('multiplies two numbers', () => {
    expect(calculate(4, 5, '*')).toBe(20);
  });

  it('multiplies by zero', () => {
    expect(calculate(4, 0, '*')).toBe(0);
  });

  it('multiplies negative numbers', () => {
    expect(calculate(-3, -4, '*')).toBe(12);
    expect(calculate(-3, 4, '*')).toBe(-12);
  });

  it('divides two numbers', () => {
    expect(calculate(10, 2, '/')).toBe(5);
  });

  it('divides resulting in decimal', () => {
    expect(calculate(10, 3, '/')).toBeCloseTo(3.3333333);
  });

  it('returns Infinity for division by zero', () => {
    expect(calculate(5, 0, '/')).toBe(Infinity);
  });

  it('divides zero by a number', () => {
    expect(calculate(0, 5, '/')).toBe(0);
  });

  it('handles decimal arithmetic', () => {
    expect(calculate(0.1, 0.2, '+')).toBeCloseTo(0.3);
  });

  it('handles large numbers', () => {
    expect(calculate(999999999, 1, '+')).toBe(1000000000);
  });

  it('raises to a power (^)', () => {
    expect(calculate(2, 3, '^')).toBe(8);
  });

  it('raises to power 0', () => {
    expect(calculate(5, 0, '^')).toBe(1);
  });

  it('raises to negative power', () => {
    expect(calculate(2, -1, '^')).toBe(0.5);
  });
});

describe('formatDisplay', () => {
  it('formats normal integers', () => {
    expect(formatDisplay(123)).toBe('123');
  });

  it('formats zero', () => {
    expect(formatDisplay(0)).toBe('0');
  });

  it('formats negative numbers', () => {
    expect(formatDisplay(-42)).toBe('-42');
  });

  it('formats decimals', () => {
    expect(formatDisplay(3.14)).toBe('3.14');
  });

  it('returns Error for Infinity', () => {
    expect(formatDisplay(Infinity)).toBe('Error');
  });

  it('returns Error for negative Infinity', () => {
    expect(formatDisplay(-Infinity)).toBe('Error');
  });

  it('returns Error for NaN', () => {
    expect(formatDisplay(NaN)).toBe('Error');
  });

  it('handles very large numbers by truncating', () => {
    const result = formatDisplay(12345678901234);
    expect(result.length).toBeLessThanOrEqual(12);
  });

  it('handles very small decimals', () => {
    const result = formatDisplay(0.000001);
    expect(result).toBeTruthy();
  });

  it('uses toPrecision for numbers just over max length', () => {
    // 1234567890.12 is 13 chars, toPrecision(10) should shorten it
    const result = formatDisplay(1234567890.12);
    expect(result.length).toBeLessThanOrEqual(12);
  });

  it('uses exponential notation for very large numbers', () => {
    const result = formatDisplay(1e20);
    expect(result).toContain('e');
  });
});

describe('operatorToSymbol', () => {
  it('maps + to +', () => {
    expect(operatorToSymbol('+')).toBe('+');
  });

  it('maps - to −', () => {
    expect(operatorToSymbol('-')).toBe('−');
  });

  it('maps * to ×', () => {
    expect(operatorToSymbol('*')).toBe('×');
  });

  it('maps / to ÷', () => {
    expect(operatorToSymbol('/')).toBe('÷');
  });

  it('maps ^ to xⁿ', () => {
    expect(operatorToSymbol('^')).toBe('xⁿ');
  });
});

describe('operatorToWord', () => {
  it('maps + to plus', () => {
    expect(operatorToWord('+')).toBe('plus');
  });

  it('maps - to minus', () => {
    expect(operatorToWord('-')).toBe('minus');
  });

  it('maps * to times', () => {
    expect(operatorToWord('*')).toBe('times');
  });

  it('maps / to divided by', () => {
    expect(operatorToWord('/')).toBe('divided by');
  });

  it('maps ^ to to the power of', () => {
    expect(operatorToWord('^')).toBe('to the power of');
  });
});

describe('nthRoot', () => {
  it('returns 4 for the cube root of 64', () => {
    expect(nthRoot(64, 3)).toBe(4);
  });

  it('returns -2 for the cube root of -8', () => {
    expect(nthRoot(-8, 3)).toBe(-2);
  });

  it('rejects an even root of a negative and a zero index', () => {
    expect(nthRoot(-16, 2)).toBeNaN();
    expect(nthRoot(8, 0)).toBeNaN();
  });
});

describe('combinations and permutations', () => {
  it('computes 5 choose 2 and 200 choose 2', () => {
    expect(combinations(5, 2)).toBe(10);
    expect(combinations(200, 2)).toBe(19900);
  });

  it('computes 5 permute 2', () => {
    expect(permutations(5, 2)).toBe(20);
  });

  it('rejects r greater than n and non-integers', () => {
    expect(combinations(5, 6)).toBeNaN();
    expect(permutations(2.5, 1)).toBeNaN();
  });

  it('is reachable through calculate', () => {
    expect(calculate(8, 3, 'nthRoot')).toBe(2);
    expect(calculate(5, 2, 'nCr')).toBe(10);
    expect(calculate(5, 2, 'nPr')).toBe(20);
  });
});
