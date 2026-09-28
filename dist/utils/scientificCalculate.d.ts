import { AngleMode, ScientificFunction } from '../types/calculator';
/**
 * Evaluate a unary scientific function at the given value. Trig functions
 * honor the angle mode; inverse trig returns results in that same mode.
 * Domain errors return `NaN` or `Infinity`, which downstream formatting
 * renders as `'Error'`.
 */
export declare function evaluateScientificFunction(value: number, fn: ScientificFunction, angleMode: AngleMode): number;
/**
 * Return the screen-reader-friendly phrase for a scientific function
 * (e.g. `'sin'` → `'sine of'`).
 */
export declare function scientificFunctionToWord(fn: ScientificFunction): string;
