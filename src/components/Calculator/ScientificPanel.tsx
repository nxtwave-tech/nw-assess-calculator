import { CalcButton } from './CalcButton';
import {
  StandardRow1,
  StandardRow2,
  StandardRow3,
  StandardRow4,
  StandardRow5,
} from './StandardRows';

import type { ButtonPanelProps } from './ButtonPanel';
import type { ReactElement } from 'react';

interface ScientificSpacerProps {
  count: number;
}

function Spacers({ count }: ScientificSpacerProps): ReactElement {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key -- static spacer cells with no semantics
        <span key={i} className="calc-btn-spacer" aria-hidden="true" />
      ))}
    </>
  );
}

function ScientificRow1(props: ButtonPanelProps): ReactElement {
  const {
    onOpenParen,
    onCloseParen,
    onScientificFunction,
    onOperator,
    isSecondFunction,
    onToggleSecondFunction,
  } = props;
  return (
    <>
      <CalcButton
        label="("
        ariaLabel="Open parenthesis"
        variant="scientific"
        onClick={onOpenParen}
      />
      <CalcButton
        label=")"
        ariaLabel="Close parenthesis"
        variant="scientific"
        onClick={onCloseParen}
      />
      <CalcButton
        label={isSecondFunction ? 'x³' : 'x²'}
        caption={isSecondFunction ? 'x²' : 'x³'}
        ariaLabel={isSecondFunction ? 'x cubed' : 'x squared'}
        variant="scientific"
        onClick={() => {
          onScientificFunction(isSecondFunction ? 'cube' : 'square');
        }}
      />
      <CalcButton
        label={isSecondFunction ? 'ⁿ√x' : 'xⁿ'}
        caption={isSecondFunction ? 'xⁿ' : 'ⁿ√x'}
        ariaLabel={isSecondFunction ? 'nth root of x' : 'x to the power of n'}
        variant="scientific"
        onClick={() => {
          onOperator(isSecondFunction ? 'nthRoot' : '^');
        }}
      />
      <CalcButton
        label={isSecondFunction ? '10ˣ' : 'eˣ'}
        caption={isSecondFunction ? 'eˣ' : '10ˣ'}
        ariaLabel={isSecondFunction ? '10 to the power of x' : 'e to the power of x'}
        variant="scientific"
        onClick={() => {
          onScientificFunction(isSecondFunction ? 'tenPow' : 'exp');
        }}
      />
      <CalcButton
        label="2nd"
        ariaLabel={
          isSecondFunction ? 'Second function active, click for primary' : 'Second function'
        }
        variant="scientific"
        className={isSecondFunction ? 'calc-btn--second-active' : ''}
        onClick={onToggleSecondFunction}
      />
    </>
  );
}

function ScientificRow2(props: ButtonPanelProps): ReactElement {
  const { onScientificFunction, isSecondFunction, onConstant } = props;
  return (
    <>
      <CalcButton
        label="1/x"
        ariaLabel="Reciprocal"
        variant="scientific"
        onClick={() => {
          onScientificFunction('reciprocal');
        }}
      />
      <CalcButton
        label={isSecondFunction ? '∛x' : '√x'}
        caption={isSecondFunction ? '√x' : '∛x'}
        ariaLabel={isSecondFunction ? 'Cube root' : 'Square root'}
        variant="scientific"
        onClick={() => {
          onScientificFunction(isSecondFunction ? 'cbrt' : 'sqrt');
        }}
      />
      <CalcButton
        label="x!"
        ariaLabel="Factorial"
        variant="scientific"
        onClick={() => {
          onScientificFunction('factorial');
        }}
      />
      <CalcButton
        label={isSecondFunction ? 'log₁₀' : 'ln'}
        caption={isSecondFunction ? 'ln' : 'log₁₀'}
        ariaLabel={isSecondFunction ? 'Log base 10' : 'Natural log'}
        variant="scientific"
        onClick={() => {
          onScientificFunction(isSecondFunction ? 'log10' : 'ln');
        }}
      />
      <CalcButton
        label="e"
        ariaLabel="Euler's number e"
        variant="scientific"
        onClick={() => {
          onConstant('e');
        }}
      />
      <CalcButton
        label="π"
        ariaLabel="Pi"
        variant="scientific"
        onClick={() => {
          onConstant('pi');
        }}
      />
    </>
  );
}

function ScientificRow3(props: ButtonPanelProps): ReactElement {
  const { onScientificFunction, isSecondFunction } = props;
  const trig: { fn: 'sin' | 'cos' | 'tan'; inverse: 'asin' | 'acos' | 'atan'; label: string }[] = [
    { fn: 'sin', inverse: 'asin', label: 'sin' },
    { fn: 'cos', inverse: 'acos', label: 'cos' },
    { fn: 'tan', inverse: 'atan', label: 'tan' },
  ];
  const hyp: {
    fn: 'sinh' | 'cosh' | 'tanh';
    inverse: 'asinh' | 'acosh' | 'atanh';
    label: string;
  }[] = [
    { fn: 'sinh', inverse: 'asinh', label: 'sinh' },
    { fn: 'cosh', inverse: 'acosh', label: 'cosh' },
    { fn: 'tanh', inverse: 'atanh', label: 'tanh' },
  ];
  const trigLabel = (t: (typeof trig)[number]): string =>
    isSecondFunction ? `${t.label}⁻¹` : t.label;
  const trigCaption = (t: (typeof trig)[number]): string =>
    isSecondFunction ? t.label : `${t.label}⁻¹`;
  const trigAria = (t: (typeof trig)[number]): string => {
    const baseName = t.label === 'sin' ? 'Sine' : t.label === 'cos' ? 'Cosine' : 'Tangent';
    const arcName =
      t.label === 'sin' ? 'Arc sine' : t.label === 'cos' ? 'Arc cosine' : 'Arc tangent';
    return isSecondFunction ? arcName : baseName;
  };
  const hypLabel = (h: (typeof hyp)[number]): string =>
    isSecondFunction ? `${h.label}⁻¹` : h.label;
  const hypCaption = (h: (typeof hyp)[number]): string =>
    isSecondFunction ? h.label : `${h.label}⁻¹`;
  const hypAria = (h: (typeof hyp)[number]): string => {
    const baseName =
      h.label === 'sinh'
        ? 'Hyperbolic sine'
        : h.label === 'cosh'
          ? 'Hyperbolic cosine'
          : 'Hyperbolic tangent';
    const invName =
      h.label === 'sinh'
        ? 'Inverse hyperbolic sine'
        : h.label === 'cosh'
          ? 'Inverse hyperbolic cosine'
          : 'Inverse hyperbolic tangent';
    return isSecondFunction ? invName : baseName;
  };

  return (
    <>
      {trig.map((t) => (
        <CalcButton
          key={t.label}
          label={trigLabel(t)}
          caption={trigCaption(t)}
          ariaLabel={trigAria(t)}
          variant="scientific"
          onClick={() => {
            onScientificFunction(isSecondFunction ? t.inverse : t.fn);
          }}
        />
      ))}
      {hyp.map((h) => (
        <CalcButton
          key={h.label}
          label={hypLabel(h)}
          caption={hypCaption(h)}
          ariaLabel={hypAria(h)}
          variant="scientific"
          onClick={() => {
            onScientificFunction(isSecondFunction ? h.inverse : h.fn);
          }}
        />
      ))}
    </>
  );
}

const ANGLE_BUTTON = {
  rad: { label: 'Rad', next: 'Grad', currentWord: 'radians', nextWord: 'gradians' },
  grad: { label: 'Grad', next: 'Deg', currentWord: 'gradians', nextWord: 'degrees' },
  deg: { label: 'Deg', next: 'Rad', currentWord: 'degrees', nextWord: 'radians' },
} as const;

function ScientificRow4(props: ButtonPanelProps): ReactElement {
  const { angleMode, onToggleAngleMode, onScientificFunction, isSecondFunction } = props;
  const angle = ANGLE_BUTTON[angleMode];
  const reciprocal = [
    { fn: 'sec' as const, inverse: 'asec' as const, label: 'sec', name: 'Secant', arc: 'Arc secant' },
    {
      fn: 'csc' as const,
      inverse: 'acsc' as const,
      label: 'cosec',
      name: 'Cosecant',
      arc: 'Arc cosecant',
    },
    { fn: 'cot' as const, inverse: 'acot' as const, label: 'cot', name: 'Cotangent', arc: 'Arc cotangent' },
  ];
  return (
    <>
      <CalcButton
        label={angle.label}
        caption={`→ ${angle.next}`}
        ariaLabel={`Currently ${angle.currentWord}, switch to ${angle.nextWord}`}
        variant="scientific"
        onClick={onToggleAngleMode}
      />
      {reciprocal.map((entry) => (
        <CalcButton
          key={entry.fn}
          label={isSecondFunction ? `${entry.label}⁻¹` : entry.label}
          caption={isSecondFunction ? entry.label : `${entry.label}⁻¹`}
          ariaLabel={isSecondFunction ? entry.arc : entry.name}
          variant="scientific"
          onClick={() => {
            onScientificFunction(isSecondFunction ? entry.inverse : entry.fn);
          }}
        />
      ))}
      <Spacers count={2} />
    </>
  );
}

/**
 * 10-column scientific calculator grid. Columns 1-6 host the scientific
 * functions (paren, power, trig, hyperbolic, constants, angle mode); columns
 * 7-10 reuse the shared standard rows.
 */
export function ScientificPanel(props: ButtonPanelProps): ReactElement {
  return (
    <div className="calc-buttons calc-buttons--scientific" data-testid="button-grid">
      <ScientificRow1 {...props} />
      <StandardRow1 {...props} />

      <ScientificRow2 {...props} />
      <StandardRow2 {...props} />

      <ScientificRow3 {...props} />
      <StandardRow3 {...props} />

      <ScientificRow4 {...props} />
      <StandardRow4 {...props} />

      <CalcButton
        label="|x|"
        ariaLabel="Absolute value"
        variant="scientific"
        onClick={() => {
          props.onScientificFunction('abs');
        }}
      />
      <CalcButton
        label="nCr"
        ariaLabel="Combinations"
        variant="scientific"
        onClick={() => {
          props.onOperator('nCr');
        }}
      />
      <CalcButton
        label="nPr"
        ariaLabel="Permutations"
        variant="scientific"
        onClick={() => {
          props.onOperator('nPr');
        }}
      />
      <Spacers count={3} />
      <StandardRow5 {...props} />
    </div>
  );
}
