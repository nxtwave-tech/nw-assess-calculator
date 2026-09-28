import { AngleMode, CalculatorMode } from '../../types/calculator';
import { ReactElement } from 'react';
/**
 * Props for {@link Display}.
 */
export interface DisplayProps {
    /** Primary display string (digits, `'Error'`, or a formatted number). */
    value: string;
    /** Secondary "tape" expression shown above the main value. */
    expression: string;
    /** Active calculator mode; indicators are only shown in scientific mode. */
    mode?: CalculatorMode;
    /** Angle unit displayed as a small indicator in scientific mode. */
    angleMode?: AngleMode;
    /** Open-paren depth indicator shown in scientific mode. Defaults to `0`. */
    parenDepth?: number;
}
/**
 * Calculator display. Renders the primary value in an `<output>` element
 * with a dynamic accessible label, plus secondary indicators (angle mode,
 * open-paren depth, expression tape) in scientific mode.
 */
export declare function Display({ value, expression, mode, angleMode, parenDepth, }: DisplayProps): ReactElement;
