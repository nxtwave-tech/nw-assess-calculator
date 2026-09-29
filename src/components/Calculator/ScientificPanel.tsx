import { CalcButton } from './CalcButton';

import type { ButtonPanelProps } from './ButtonPanel';
import type { AngleMode, ScientificFunction } from '../../types/calculator';
import type { ReactElement } from 'react';

function Spacer(): ReactElement {
  return <span className="calc-btn-spacer" aria-hidden="true" />;
}

function InvertIcon(): ReactElement {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M1.5 4h8m0 0L7.5 2m2 2L7.5 6M10.5 8h-8m0 0 2-2m-2 2 2 2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackspaceIcon(): ReactElement {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M5.2 1h8.3A1.5 1.5 0 0 1 15 2.5v7a1.5 1.5 0 0 1-1.5 1.5H5.2a1 1 0 0 1-.75-.34L1 6l3.45-4.66A1 1 0 0 1 5.2 1Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="m7.5 4 4 4m0-4-4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function PlusMinusIcon(): ReactElement {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M4 1.5v5M1.5 4h5M8 10.5h4.5M11.5 2.5l-9 9"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface TrigKey {
  fn: ScientificFunction;
  inverse: ScientificFunction;
  label: string;
  inverseLabel: string;
  name: string;
  inverseName: string;
}

const TRIG_KEYS: TrigKey[] = [
  { fn: 'sin', inverse: 'asin', label: 'sin', inverseLabel: 'sin⁻¹', name: 'Sine', inverseName: 'Arc sine' },
  { fn: 'cos', inverse: 'acos', label: 'cos', inverseLabel: 'cos⁻¹', name: 'Cosine', inverseName: 'Arc cosine' },
  { fn: 'tan', inverse: 'atan', label: 'tan', inverseLabel: 'tan⁻¹', name: 'Tangent', inverseName: 'Arc tangent' },
  {
    fn: 'sinh',
    inverse: 'asinh',
    label: 'sinh',
    inverseLabel: 'sinh⁻¹',
    name: 'Hyperbolic sine',
    inverseName: 'Inverse hyperbolic sine',
  },
  {
    fn: 'cosh',
    inverse: 'acosh',
    label: 'cosh',
    inverseLabel: 'cosh⁻¹',
    name: 'Hyperbolic cosine',
    inverseName: 'Inverse hyperbolic cosine',
  },
  {
    fn: 'tanh',
    inverse: 'atanh',
    label: 'tanh',
    inverseLabel: 'tanh⁻¹',
    name: 'Hyperbolic tangent',
    inverseName: 'Inverse hyperbolic tangent',
  },
  { fn: 'csc', inverse: 'acsc', label: 'cosec', inverseLabel: 'cosec⁻¹', name: 'Cosecant', inverseName: 'Arc cosecant' },
  { fn: 'sec', inverse: 'asec', label: 'sec', inverseLabel: 'sec⁻¹', name: 'Secant', inverseName: 'Arc secant' },
  { fn: 'cot', inverse: 'acot', label: 'cot', inverseLabel: 'cot⁻¹', name: 'Cotangent', inverseName: 'Arc cotangent' },
];

const ANGLE_KEYS: { mode: AngleMode; label: string; name: string }[] = [
  { mode: 'rad', label: 'Rad', name: 'Radians' },
  { mode: 'grad', label: 'Grad', name: 'Gradians' },
  { mode: 'deg', label: 'Deg', name: 'Degrees' },
];

/**
 * Scientific keypad from the assessment design, laid out as three groups:
 * trig keys with Invert Functions and the angle unit, the remaining
 * functions, and the number pad. Invert Functions only swaps the trig keys.
 */
export function ScientificPanel(props: ButtonPanelProps): ReactElement {
  const {
    isSecondFunction,
    onToggleSecondFunction,
    onScientificFunction,
    onOperator,
    onConstant,
    onOpenParen,
    onCloseParen,
    onBackspace,
    onSetAngleMode,
    onDigit,
    onDecimal,
    onEquals,
    onClear,
    onToggleSign,
    onPercent,
    angleMode,
    activeOperator,
    waitingForOperand,
  } = props;

  const operatorPressed = (op: '+' | '-' | '*' | '/'): boolean =>
    activeOperator === op && waitingForOperand;

  return (
    <div className="calc-keypad" data-testid="button-grid">
      <div className="calc-keypad__trig">
        <div className="calc-keypad__trig-top">
          <button
            type="button"
            className="calc-invert-toggle"
            aria-pressed={isSecondFunction}
            aria-label="Invert Functions"
            onClick={onToggleSecondFunction}
          >
            <InvertIcon />
            Invert Functions
          </button>
          <div className="calc-keypad__group calc-keypad__group--3">
            {TRIG_KEYS.map((key) => (
              <CalcButton
                key={key.fn}
                label={isSecondFunction ? key.inverseLabel : key.label}
                ariaLabel={isSecondFunction ? key.inverseName : key.name}
                variant="scientific"
                onClick={() => onScientificFunction(isSecondFunction ? key.inverse : key.fn)}
              />
            ))}
          </div>
        </div>
        <div className="calc-keypad__group calc-keypad__group--3">
          {ANGLE_KEYS.map((angle) => {
            const isSelected = angleMode === angle.mode;
            return (
              <CalcButton
                key={angle.mode}
                label={angle.label}
                ariaLabel={
                  isSelected ? `${angle.name}, selected` : `Switch to ${angle.name.toLowerCase()}`
                }
                variant="scientific"
                className={isSelected ? 'calc-btn--selected' : ''}
                aria-pressed={isSelected}
                onClick={() => onSetAngleMode(angle.mode)}
              />
            );
          })}
        </div>
      </div>

      <div className="calc-keypad__group calc-keypad__group--4">
        <CalcButton label="(" ariaLabel="Open parenthesis" variant="scientific" onClick={onOpenParen} />
        <CalcButton label=")" ariaLabel="Close parenthesis" variant="scientific" onClick={onCloseParen} />
        <CalcButton label="nCr" ariaLabel="Combinations" variant="scientific" onClick={() => onOperator('nCr')} />
        <CalcButton label="nPr" ariaLabel="Permutations" variant="scientific" onClick={() => onOperator('nPr')} />

        <CalcButton label="e" ariaLabel="Euler's number e" variant="scientific" onClick={() => onConstant('e')} />
        <CalcButton label="eˣ" ariaLabel="e to the power of x" variant="scientific" onClick={() => onScientificFunction('exp')} />
        <CalcButton label="x²" ariaLabel="x squared" variant="scientific" onClick={() => onScientificFunction('square')} />
        <CalcButton label="x³" ariaLabel="x cubed" variant="scientific" onClick={() => onScientificFunction('cube')} />

        <CalcButton label="xⁿ" ariaLabel="x to the power of n" variant="scientific" onClick={() => onOperator('^')} />
        <CalcButton label="10ˣ" ariaLabel="10 to the power of x" variant="scientific" onClick={() => onScientificFunction('tenPow')} />
        <CalcButton label="1/x" ariaLabel="Reciprocal" variant="scientific" onClick={() => onScientificFunction('reciprocal')} />
        <CalcButton label="x!" ariaLabel="Factorial" variant="scientific" onClick={() => onScientificFunction('factorial')} />

        <CalcButton label="√x" ariaLabel="Square root" variant="scientific" onClick={() => onScientificFunction('sqrt')} />
        <CalcButton label="∛x" ariaLabel="Cube root" variant="scientific" onClick={() => onScientificFunction('cbrt')} />
        <CalcButton label="ⁿ√x" ariaLabel="nth root of x" variant="scientific" onClick={() => onOperator('nthRoot')} />
        <CalcButton label="|x|" ariaLabel="Absolute value" variant="scientific" onClick={() => onScientificFunction('abs')} />

        <CalcButton label="ln" ariaLabel="Natural log" variant="scientific" onClick={() => onScientificFunction('ln')} />
        <CalcButton label="log₁₀" ariaLabel="Log base 10" variant="scientific" onClick={() => onScientificFunction('log10')} />
        <CalcButton label="π" ariaLabel="Pi" variant="scientific" onClick={() => onConstant('pi')} />
        <Spacer />
      </div>

      <div className="calc-keypad__group calc-keypad__group--4">
        <CalcButton label={<BackspaceIcon />} ariaLabel="Backspace" variant="function" onClick={onBackspace} />
        <CalcButton label="AC" ariaLabel="All clear" variant="function" onClick={onClear} />
        <CalcButton label="%" ariaLabel="Percent" variant="function" onClick={onPercent} />
        <CalcButton label="÷" ariaLabel="Divide" variant="operator" pressed={operatorPressed('/')} onClick={() => onOperator('/')} />

        <CalcButton label="7" ariaLabel="7" onClick={() => onDigit('7')} />
        <CalcButton label="8" ariaLabel="8" onClick={() => onDigit('8')} />
        <CalcButton label="9" ariaLabel="9" onClick={() => onDigit('9')} />
        <CalcButton label="×" ariaLabel="Multiply" variant="operator" pressed={operatorPressed('*')} onClick={() => onOperator('*')} />

        <CalcButton label="4" ariaLabel="4" onClick={() => onDigit('4')} />
        <CalcButton label="5" ariaLabel="5" onClick={() => onDigit('5')} />
        <CalcButton label="6" ariaLabel="6" onClick={() => onDigit('6')} />
        <CalcButton label="−" ariaLabel="Subtract" variant="operator" pressed={operatorPressed('-')} onClick={() => onOperator('-')} />

        <CalcButton label="1" ariaLabel="1" onClick={() => onDigit('1')} />
        <CalcButton label="2" ariaLabel="2" onClick={() => onDigit('2')} />
        <CalcButton label="3" ariaLabel="3" onClick={() => onDigit('3')} />
        <CalcButton label="+" ariaLabel="Add" variant="operator" pressed={operatorPressed('+')} onClick={() => onOperator('+')} />

        <CalcButton label={<PlusMinusIcon />} ariaLabel="Toggle positive negative" onClick={onToggleSign} />
        <CalcButton label="0" ariaLabel="0" onClick={() => onDigit('0')} />
        <CalcButton label="." ariaLabel="Decimal point" onClick={onDecimal} />
        <CalcButton label="=" ariaLabel="Equals" variant="operator" onClick={onEquals} />
      </div>
    </div>
  );
}
