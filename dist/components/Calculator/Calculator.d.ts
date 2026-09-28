import { ReactElement } from 'react';
import { CalculatorMode, CalculatorTheme } from '../../types/calculator';
/**
 * Public props for {@link Calculator}.
 */
export interface CalculatorProps {
    /** Optional CSS custom property overrides applied as inline style on the root. */
    theme?: CalculatorTheme;
    /** Which button layout to start in. Defaults to `'basic'`. */
    initialMode?: CalculatorMode;
}
/**
 * Accessible calculator component with basic and scientific modes.
 * Owns its own keyboard handler, live region, and mode/2nd-function toggles,
 * and wraps the `useCalculator` hook for arithmetic state.
 */
export declare function Calculator({ theme, initialMode }: CalculatorProps): ReactElement;
