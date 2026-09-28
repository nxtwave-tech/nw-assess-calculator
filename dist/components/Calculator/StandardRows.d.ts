import { ButtonPanelProps } from './ButtonPanel';
import { ReactElement } from 'react';
/**
 * Props common to every standard-row sub-component. A subset of
 * {@link ButtonPanelProps} sufficient to render the shared 4-column
 * layout used by both basic and scientific panels.
 */
export type StandardRowProps = Pick<ButtonPanelProps, 'onDigit' | 'onDecimal' | 'onOperator' | 'onEquals' | 'onClear' | 'onToggleSign' | 'onPercent' | 'activeOperator' | 'waitingForOperand'>;
/** Row 1: AC / ± / % / ÷ */
export declare function StandardRow1(props: StandardRowProps): ReactElement;
/** Row 2: 7 / 8 / 9 / × */
export declare function StandardRow2(props: StandardRowProps): ReactElement;
/** Row 3: 4 / 5 / 6 / − */
export declare function StandardRow3(props: StandardRowProps): ReactElement;
/** Row 4: 1 / 2 / 3 / + */
export declare function StandardRow4(props: StandardRowProps): ReactElement;
/** Row 5: 0 (wide) / . / = */
export declare function StandardRow5(props: StandardRowProps): ReactElement;
