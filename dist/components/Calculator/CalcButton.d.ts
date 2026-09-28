import { ButtonHTMLAttributes, ReactElement } from 'react';
/**
 * Props for {@link CalcButton}. Accepts all native `<button>` attributes in
 * addition to the label/variant controls.
 */
export interface CalcButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visible text on the button. */
    label: string;
    /** Screen-reader-friendly description. */
    ariaLabel: string;
    /** Visual variant. Drives background, text color, and hover/active state. */
    variant?: 'number' | 'operator' | 'function' | 'scientific';
    /** Whether the button should span two grid columns (used for `0`). */
    wide?: boolean;
    /**
     * Operator-variant pressed state. When `true`, renders `aria-pressed="true"`
     * and the pressed visual styling. Ignored for non-operator variants.
     */
    pressed?: boolean;
    /** Small label for the function shown when 2nd is toggled. Hidden from assistive tech. */
    caption?: string;
}
/**
 * Native `<button>` wrapper that normalizes the calculator's visual and
 * accessibility patterns: explicit `type="button"`, mandatory `aria-label`,
 * variant-driven class set, and `aria-pressed` for operator toggle state.
 */
export declare function CalcButton({ label, ariaLabel, variant, wide, pressed, caption, className, ...rest }: CalcButtonProps): ReactElement;
