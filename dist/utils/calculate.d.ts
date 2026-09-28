import { Operator } from '../types/calculator';
/**
 * Evaluate a binary arithmetic operation. Division by zero returns `Infinity`;
 * downstream formatting converts that to `'Error'`.
 */
export declare function calculate(left: number, right: number, operator: Operator): number;
/**
 * nth root of `radicand` with index `index`. Odd integer roots of negatives
 * are defined. Even roots of negatives and a zero index are `NaN`.
 */
export declare function nthRoot(radicand: number, index: number): number;
/** n choose r. Invalid inputs are `NaN`. Computed without factorials so large n stays exact. */
export declare function combinations(n: number, r: number): number;
/** n permute r. Invalid inputs are `NaN`. */
export declare function permutations(n: number, r: number): number;
/**
 * Format a numeric value for the calculator display, collapsing long results
 * via `toPrecision` or exponential notation so they fit within the display
 * width. Non-finite values render as `'Error'`.
 */
export declare function formatDisplay(value: number): string;
/**
 * Return the on-button symbolic label for an operator (e.g. `*` → `×`).
 */
export declare function operatorToSymbol(op: Operator): string;
/**
 * Return the screen-reader-friendly word form of an operator (e.g. `*` → `times`).
 */
export declare function operatorToWord(op: Operator): string;
