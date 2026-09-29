import { CalcButton } from './CalcButton';

import type { ButtonPanelProps } from './ButtonPanel';
import type { AngleMode, ScientificFunction } from '../../types/calculator';
import type { ReactElement } from 'react';

function Spacer(): ReactElement {
  return <span className="calc-btn-spacer" aria-hidden="true" />;
}

function InvertIcon(): ReactElement {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.2 4.2A4.6 4.6 0 0 1 11 3.2M11 1.4v2.2H8.8M11.8 9.8A4.6 4.6 0 0 1 3 10.8M3 12.6V10.4h2.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
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

const TRIG: TrigKey[] = [
  { fn: 'sin', inverse: 'asin', label: 'sin', inverseLabel: 'sin⁻¹', name: 'Sine', inverseName: 'Arc sine' },
  { fn: 'cos', inverse: 'acos', label: 'cos', inverseLabel: 'cos⁻¹', name: 'Cosine', inverseName: 'Arc cosine' },
  { fn: 'tan', inverse: 'atan', label: 'tan', inverseLabel: 'tan⁻¹', name: 'Tangent', inverseName: 'Arc tangent' },
];

const HYPERBOLIC: TrigKey[] = [
  { fn: 'sinh', inverse: 'asinh', label: 'sinh', inverseLabel: 'sinh⁻¹', name: 'Hyperbolic sine', inverseName: 'Inverse hyperbolic sine' },
  { fn: 'cosh', inverse: 'acosh', label: 'cosh', inverseLabel: 'cosh⁻¹', name: 'Hyperbolic cosine', inverseName: 'Inverse hyperbolic cosine' },
  { fn: 'tanh', inverse: 'atanh', label: 'tanh', inverseLabel: 'tanh⁻¹', name: 'Hyperbolic tangent', inverseName: 'Inverse hyperbolic tangent' },
];

const RECIPROCAL: TrigKey[] = [
  { fn: 'csc', inverse: 'acsc', label: 'cosec', inverseLabel: 'cosec⁻¹', name: 'Cosecant', inverseName: 'Arc cosecant' },
  { fn: 'sec', inverse: 'asec', label: 'sec', inverseLabel: 'sec⁻¹', name: 'Secant', inverseName: 'Arc secant' },
  { fn: 'cot', inverse: 'acot', label: 'cot', inverseLabel: 'cot⁻¹', name: 'Cotangent', inverseName: 'Arc cotangent' },
];

const ANGLE_KEYS: { mode: AngleMode; label: string; name: string }[] = [
  { mode: 'rad', label: 'Rad', name: 'Radians' },
  { mode: 'grad', label: 'Grad', name: 'Gradians' },
  { mode: 'deg', label: 'Deg', name: 'Degrees' },
];

function TrigButtons({
  keys,
  inverted,
  onScientificFunction,
}: {
  keys: TrigKey[];
  inverted: boolean;
  onScientificFunction: ButtonPanelProps['onScientificFunction'];
}): ReactElement {
  return (
    <>
      {keys.map((key) => (
        <CalcButton
          key={key.fn}
          label={inverted ? key.inverseLabel : key.label}
          ariaLabel={inverted ? key.inverseName : key.name}
          variant="scientific"
          onClick={() => {
            onScientificFunction(inverted ? key.inverse : key.fn);
          }}
        />
      ))}
    </>
  );
}

/**
 * Scientific keypad from the assessment design. Eleven columns: seven function
 * keys on the left and the four-column number pad on the right. Invert
 * Functions only swaps the three trig rows.
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
    <>
      <div className="calc-invert-row">
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
      </div>
      <div className="calc-buttons calc-buttons--scientific" data-testid="button-grid">
        <CalcButton label="(" ariaLabel="Open parenthesis" variant="scientific" onClick={onOpenParen} />
        <CalcButton label=")" ariaLabel="Close parenthesis" variant="scientific" onClick={onCloseParen} />
        <CalcButton
          label="nCr"
          ariaLabel="Combinations"
          variant="scientific"
          onClick={() => {
            onOperator('nCr');
          }}
        />
        <CalcButton
          label="nPr"
          ariaLabel="Permutations"
          variant="scientific"
          onClick={() => {
            onOperator('nPr');
          }}
        />
        <Spacer />
        <Spacer />
        <Spacer />
        <CalcButton label="⌫" ariaLabel="Backspace" variant="function" onClick={onBackspace} />
        <CalcButton label="AC" ariaLabel="All clear" variant="function" onClick={onClear} />
        <CalcButton label="%" ariaLabel="Percent" variant="function" onClick={onPercent} />
        <CalcButton
          label="÷"
          ariaLabel="Divide"
          variant="operator"
          pressed={operatorPressed('/')}
          onClick={() => {
            onOperator('/');
          }}
        />

        <TrigButtons keys={TRIG} inverted={isSecondFunction} onScientificFunction={onScientificFunction} />
        <CalcButton
          label="e"
          ariaLabel="Euler's number e"
          variant="scientific"
          onClick={() => {
            onConstant('e');
          }}
        />
        <CalcButton
          label="eˣ"
          ariaLabel="e to the power of x"
          variant="scientific"
          onClick={() => {
            onScientificFunction('exp');
          }}
        />
        <CalcButton
          label="x²"
          ariaLabel="x squared"
          variant="scientific"
          onClick={() => {
            onScientificFunction('square');
          }}
        />
        <CalcButton
          label="x³"
          ariaLabel="x cubed"
          variant="scientific"
          onClick={() => {
            onScientificFunction('cube');
          }}
        />
        <CalcButton label="7" ariaLabel="7" onClick={() => onDigit('7')} />
        <CalcButton label="8" ariaLabel="8" onClick={() => onDigit('8')} />
        <CalcButton label="9" ariaLabel="9" onClick={() => onDigit('9')} />
        <CalcButton
          label="×"
          ariaLabel="Multiply"
          variant="operator"
          pressed={operatorPressed('*')}
          onClick={() => onOperator('*')}
        />

        <TrigButtons keys={HYPERBOLIC} inverted={isSecondFunction} onScientificFunction={onScientificFunction} />
        <CalcButton
          label="xⁿ"
          ariaLabel="x to the power of n"
          variant="scientific"
          onClick={() => onOperator('^')}
        />
        <CalcButton
          label="10ˣ"
          ariaLabel="10 to the power of x"
          variant="scientific"
          onClick={() => onScientificFunction('tenPow')}
        />
        <CalcButton
          label="1/x"
          ariaLabel="Reciprocal"
          variant="scientific"
          onClick={() => onScientificFunction('reciprocal')}
        />
        <CalcButton
          label="x!"
          ariaLabel="Factorial"
          variant="scientific"
          onClick={() => onScientificFunction('factorial')}
        />
        <CalcButton label="4" ariaLabel="4" onClick={() => onDigit('4')} />
        <CalcButton label="5" ariaLabel="5" onClick={() => onDigit('5')} />
        <CalcButton label="6" ariaLabel="6" onClick={() => onDigit('6')} />
        <CalcButton
          label="−"
          ariaLabel="Subtract"
          variant="operator"
          pressed={operatorPressed('-')}
          onClick={() => onOperator('-')}
        />

        <TrigButtons keys={RECIPROCAL} inverted={isSecondFunction} onScientificFunction={onScientificFunction} />
        <CalcButton
          label="√x"
          ariaLabel="Square root"
          variant="scientific"
          onClick={() => onScientificFunction('sqrt')}
        />
        <CalcButton
          label="∛x"
          ariaLabel="Cube root"
          variant="scientific"
          onClick={() => onScientificFunction('cbrt')}
        />
        <CalcButton
          label="ⁿ√x"
          ariaLabel="nth root of x"
          variant="scientific"
          onClick={() => onOperator('nthRoot')}
        />
        <CalcButton
          label="|x|"
          ariaLabel="Absolute value"
          variant="scientific"
          onClick={() => onScientificFunction('abs')}
        />
        <CalcButton label="1" ariaLabel="1" onClick={() => onDigit('1')} />
        <CalcButton label="2" ariaLabel="2" onClick={() => onDigit('2')} />
        <CalcButton label="3" ariaLabel="3" onClick={() => onDigit('3')} />
        <CalcButton
          label="+"
          ariaLabel="Add"
          variant="operator"
          pressed={operatorPressed('+')}
          onClick={() => onOperator('+')}
        />

        {ANGLE_KEYS.map((angle) => (
          <CalcButton
            key={angle.mode}
            label={angle.label}
            ariaLabel={angleMode === angle.mode ? `${angle.name}, selected` : `Switch to ${angle.name.toLowerCase()}`}
            variant={angleMode === angle.mode ? 'operator' : 'scientific'}
            aria-pressed={angleMode === angle.mode}
            onClick={() => onSetAngleMode(angle.mode)}
          />
        ))}
        <CalcButton
          label="ln"
          ariaLabel="Natural log"
          variant="scientific"
          onClick={() => onScientificFunction('ln')}
        />
        <CalcButton
          label="log₁₀"
          ariaLabel="Log base 10"
          variant="scientific"
          onClick={() => onScientificFunction('log10')}
        />
        <CalcButton
          label="π"
          ariaLabel="Pi"
          variant="scientific"
          onClick={() => onConstant('pi')}
        />
        <Spacer />
        <CalcButton label="+/−" ariaLabel="Toggle positive negative" variant="function" onClick={onToggleSign} />
        <CalcButton label="0" ariaLabel="0" onClick={() => onDigit('0')} />
        <CalcButton label="." ariaLabel="Decimal point" onClick={onDecimal} />
        <CalcButton label="=" ariaLabel="Equals" variant="operator" onClick={onEquals} />
      </div>
    </>
  );
}
