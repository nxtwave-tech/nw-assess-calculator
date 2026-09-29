import { AngleMode, CalculatorState, Operator, ScientificFunction } from '../types/calculator';
/**
 * Calculator state hook. Wraps a `useReducer` exposing the full calculator
 * state plus action dispatchers for every user-facing interaction (digits,
 * operators, scientific functions, parentheses, angle-mode toggle, etc.).
 * The returned object is a single immutable snapshot; consumers re-render
 * whenever any state field changes.
 */
export declare function useCalculator(): CalculatorState & {
    inputDigit: (digit: string) => void;
    inputDecimal: () => void;
    inputOperator: (operator: Operator) => void;
    performCalculation: () => void;
    clearAll: () => void;
    toggleSign: () => void;
    inputPercent: () => void;
    backspace: () => void;
    applyScientificFunction: (fn: ScientificFunction) => void;
    toggleAngleMode: () => void;
    setAngleMode: (mode: AngleMode) => void;
    inputConstant: (constant: 'pi' | 'e') => void;
    openParen: () => void;
    closeParen: () => void;
};
