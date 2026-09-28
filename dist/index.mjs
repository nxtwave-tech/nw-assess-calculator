import { useCallback as e, useReducer as t, useState as n } from "react";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/utils/calculate.ts
var o = 12, s = {
	"+": "plus",
	"-": "minus",
	"*": "times",
	"/": "divided by",
	"^": "to the power of",
	nthRoot: "root",
	nCr: "choose",
	nPr: "permute"
};
function c(e, t, n) {
	switch (n) {
		case "+": return e + t;
		case "-": return e - t;
		case "*": return e * t;
		case "/": return t === 0 ? Infinity : e / t;
		case "^": return e ** t;
		case "nthRoot": return u(e, t);
		case "nCr": return d(e, t);
		case "nPr": return f(e, t);
	}
}
function l(e) {
	return Number.isInteger(e) && e >= 0;
}
function u(e, t) {
	if (!Number.isFinite(e) || !Number.isFinite(t) || t === 0) return NaN;
	if (e === 0) return t > 0 ? 0 : Infinity;
	if (t < 0) {
		let n = u(e, -t);
		return !Number.isFinite(n) || n === 0 ? n === 0 ? Infinity : n : 1 / n;
	}
	let n = Number.isInteger(t);
	if (e < 0 && (!n || t % 2 == 0)) return NaN;
	let r = Math.abs(e) ** (1 / t), i = e < 0 ? -r : r;
	if (n) {
		let n = Math.round(i);
		if (n ** t === e) return n;
	}
	return i;
}
function d(e, t) {
	if (!l(e) || !l(t) || t > e) return NaN;
	let n = Math.min(t, e - t), r = 1;
	for (let t = 1; t <= n; t += 1) if (r = r * (e - n + t) / t, !Number.isFinite(r)) return Infinity;
	return Math.round(r);
}
function f(e, t) {
	if (!l(e) || !l(t) || t > e) return NaN;
	let n = 1;
	for (let r = 0; r < t; r += 1) if (n *= e - r, !Number.isFinite(n)) return Infinity;
	return n;
}
function p(e) {
	if (!isFinite(e)) return "Error";
	let t = String(e);
	if (t.length <= o) return t;
	let n = e.toPrecision(10);
	return n.length <= o ? n : e.toExponential(6);
}
function m(e) {
	return s[e];
}
//#endregion
//#region src/utils/scientificCalculate.ts
var h = {
	deg: 90,
	rad: Math.PI / 2,
	grad: 100
};
function g(e, t) {
	return t === "deg" ? e * Math.PI / 180 : t === "grad" ? e * Math.PI / 200 : e;
}
function _(e, t) {
	return t === "deg" ? e * 180 / Math.PI : t === "grad" ? e * 200 / Math.PI : e;
}
function v(e, t) {
	return t === 0 ? NaN : e / t;
}
function y(e, t) {
	let n = e / h[t], r = Math.round(n);
	if (r !== 0 && Math.abs(n - r) < 1e-9) return [
		{
			sin: 0,
			cos: 1
		},
		{
			sin: 1,
			cos: 0
		},
		{
			sin: 0,
			cos: -1
		},
		{
			sin: -1,
			cos: 0
		}
	][(r % 4 + 4) % 4] ?? {
		sin: 0,
		cos: 1
	};
	let i = g(e, t);
	return {
		sin: Math.sin(i),
		cos: Math.cos(i)
	};
}
function b(e) {
	if (e < 0 || !Number.isInteger(e)) return NaN;
	if (e === 0 || e === 1) return 1;
	if (e > 170) return Infinity;
	let t = 1;
	for (let n = 2; n <= e; n++) t *= n;
	return t;
}
var x = {
	sin: (e, t) => y(e, t).sin,
	cos: (e, t) => y(e, t).cos,
	tan: (e, t) => {
		let { sin: n, cos: r } = y(e, t);
		return v(n, r);
	},
	sec: (e, t) => v(1, y(e, t).cos),
	csc: (e, t) => v(1, y(e, t).sin),
	cot: (e, t) => {
		let { sin: n, cos: r } = y(e, t);
		return v(r, n);
	},
	asin: (e, t) => _(Math.asin(e), t),
	acos: (e, t) => _(Math.acos(e), t),
	atan: (e, t) => _(Math.atan(e), t),
	asec: (e, t) => Math.abs(e) < 1 ? NaN : _(Math.acos(1 / e), t),
	acsc: (e, t) => Math.abs(e) < 1 ? NaN : _(Math.asin(1 / e), t),
	acot: (e, t) => _(Math.PI / 2 - Math.atan(e), t),
	sinh: (e) => Math.sinh(e),
	cosh: (e) => Math.cosh(e),
	tanh: (e) => Math.tanh(e),
	asinh: (e) => Math.asinh(e),
	acosh: (e) => Math.acosh(e),
	atanh: (e) => Math.atanh(e),
	ln: (e) => Math.log(e),
	log10: (e) => Math.log10(e),
	square: (e) => e ** 2,
	cube: (e) => e ** 3,
	exp: (e) => Math.exp(e),
	tenPow: (e) => 10 ** e,
	reciprocal: (e) => e === 0 ? Infinity : 1 / e,
	sqrt: (e) => e < 0 ? NaN : Math.sqrt(e),
	cbrt: (e) => Math.cbrt(e),
	factorial: (e) => b(e),
	abs: (e) => Math.abs(e)
}, S = {
	sin: "sine of",
	cos: "cosine of",
	tan: "tangent of",
	asin: "arc sine of",
	acos: "arc cosine of",
	atan: "arc tangent of",
	sinh: "hyperbolic sine of",
	cosh: "hyperbolic cosine of",
	tanh: "hyperbolic tangent of",
	asinh: "inverse hyperbolic sine of",
	acosh: "inverse hyperbolic cosine of",
	atanh: "inverse hyperbolic tangent of",
	ln: "natural log of",
	log10: "log base 10 of",
	square: "square of",
	cube: "cube of",
	exp: "e to the power of",
	tenPow: "10 to the power of",
	reciprocal: "1 over",
	sqrt: "square root of",
	cbrt: "cube root of",
	factorial: "factorial of",
	sec: "secant of",
	csc: "cosecant of",
	cot: "cotangent of",
	asec: "arc secant of",
	acsc: "arc cosecant of",
	acot: "arc cotangent of",
	abs: "absolute value of"
};
function C(e, t, n) {
	return x[t](e, n);
}
function w(e) {
	return S[e];
}
//#endregion
//#region src/hooks/useCalculator.ts
var T = 12, E = {
	displayValue: "0",
	previousValue: null,
	operator: null,
	waitingForOperand: !1,
	expression: "",
	announcement: "",
	announcementKey: 0,
	angleMode: "rad",
	parenDepth: 0,
	parenStack: []
};
function D(e) {
	if (e === "Error") return "Error";
	let t = parseFloat(e);
	return t < 0 ? `negative ${Math.abs(t)}` : e;
}
var O = (e, t) => {
	if (e.waitingForOperand) return {
		...e,
		displayValue: t.digit,
		waitingForOperand: !1,
		announcement: t.digit
	};
	let n = e.displayValue === "0" ? t.digit : e.displayValue + t.digit;
	return n.replace(/[^0-9]/g, "").length > T ? e : {
		...e,
		displayValue: n,
		announcement: t.digit
	};
}, k = (e) => e.waitingForOperand ? {
	...e,
	displayValue: "0.",
	waitingForOperand: !1,
	announcement: "point"
} : e.displayValue.includes(".") ? e : {
	...e,
	displayValue: e.displayValue + ".",
	announcement: "point"
}, A = (e, t) => {
	let n = parseFloat(e.displayValue), r = t.operator;
	if (e.operator && !e.waitingForOperand && e.previousValue !== null) {
		let t = p(c(parseFloat(e.previousValue), n, e.operator));
		return {
			...e,
			displayValue: t,
			previousValue: t === "Error" ? null : t,
			operator: t === "Error" ? null : r,
			waitingForOperand: !0,
			expression: t === "Error" ? "" : `${t} ${m(r)}`,
			announcement: t === "Error" ? "Error" : `${D(t)}, ${m(r)}`
		};
	}
	return {
		...e,
		previousValue: String(n),
		operator: r,
		waitingForOperand: !0,
		expression: `${D(e.displayValue)} ${m(r)}`,
		announcement: m(r)
	};
}, j = (e) => {
	if (e.operator === null || e.previousValue === null) return e;
	let t = p(c(parseFloat(e.previousValue), parseFloat(e.displayValue), e.operator)), n = `${D(e.previousValue)} ${m(e.operator)} ${D(e.displayValue)} equals ${D(t)}`;
	return {
		...e,
		displayValue: t,
		previousValue: null,
		operator: null,
		waitingForOperand: !0,
		expression: "",
		announcement: t === "Error" ? "Error, cannot divide by zero" : n
	};
}, M = (e) => ({
	...E,
	angleMode: e.angleMode,
	announcement: "All cleared, 0"
}), N = (e) => {
	if (e.displayValue === "0" || e.displayValue === "Error") return e;
	let t = e.displayValue.startsWith("-") ? e.displayValue.slice(1) : "-" + e.displayValue;
	return {
		...e,
		displayValue: t,
		announcement: D(t)
	};
}, P = (e) => {
	let t = parseFloat(e.displayValue);
	if (isNaN(t)) return e;
	let n = p(t / 100);
	return {
		...e,
		displayValue: n,
		waitingForOperand: !0,
		announcement: D(n)
	};
}, F = (e) => {
	if (e.waitingForOperand || e.displayValue === "Error") return e;
	let t = e.displayValue.length === 1 || e.displayValue.length === 2 && e.displayValue.startsWith("-") ? "0" : e.displayValue.slice(0, -1);
	return {
		...e,
		displayValue: t,
		announcement: t === "0" ? "0" : `deleted, ${D(t)}`
	};
}, I = (e, t) => {
	let n = parseFloat(e.displayValue);
	if (isNaN(n)) return e;
	let r = p(C(n, t.fn, e.angleMode)), i = w(t.fn);
	return {
		...e,
		displayValue: r,
		waitingForOperand: !0,
		announcement: r === "Error" ? `Error, ${i} ${D(e.displayValue)}` : `${i} ${D(e.displayValue)} equals ${D(r)}`
	};
}, L = {
	rad: "grad",
	grad: "deg",
	deg: "rad"
}, R = {
	rad: "Switched to radians",
	grad: "Switched to gradians",
	deg: "Switched to degrees"
}, z = {
	INPUT_DIGIT: O,
	INPUT_DECIMAL: k,
	INPUT_OPERATOR: A,
	CALCULATE: j,
	CLEAR: M,
	TOGGLE_SIGN: N,
	PERCENT: P,
	BACKSPACE: F,
	APPLY_SCIENTIFIC_FUNCTION: I,
	TOGGLE_ANGLE_MODE: (e) => {
		let t = L[e.angleMode];
		return {
			...e,
			angleMode: t,
			announcement: R[t]
		};
	},
	INPUT_CONSTANT: (e, t) => {
		let n = p(t.constant === "pi" ? Math.PI : Math.E), r = t.constant === "pi" ? "pi" : "e";
		return {
			...e,
			displayValue: n,
			waitingForOperand: !0,
			announcement: `${r}, ${n}`
		};
	},
	OPEN_PAREN: (e) => ({
		...e,
		previousValue: null,
		operator: null,
		waitingForOperand: !0,
		expression: "",
		parenDepth: e.parenDepth + 1,
		parenStack: [...e.parenStack, {
			previousValue: e.previousValue,
			operator: e.operator,
			waitingForOperand: e.waitingForOperand,
			expression: e.expression
		}],
		announcement: "open parenthesis"
	}),
	CLOSE_PAREN: (e) => {
		if (e.parenDepth === 0) return e;
		let t = parseFloat(e.displayValue);
		e.operator !== null && e.previousValue !== null && (t = c(parseFloat(e.previousValue), t, e.operator));
		let n = p(t), r = e.parenStack[e.parenStack.length - 1];
		return r ? {
			...e,
			displayValue: n,
			previousValue: r.previousValue,
			operator: r.operator,
			waitingForOperand: !0,
			expression: r.expression,
			parenDepth: e.parenDepth - 1,
			parenStack: e.parenStack.slice(0, -1),
			announcement: `close parenthesis, ${D(n)}`
		} : e;
	}
};
function B(e, t) {
	let n = z[t.type];
	return n(e, t);
}
function V(e, t) {
	let n = B(e, t);
	return n.announcement && n !== e ? {
		...n,
		announcementKey: e.announcementKey + 1
	} : n;
}
function H() {
	let [n, r] = t(V, E), i = e((e) => {
		r({
			type: "INPUT_DIGIT",
			digit: e
		});
	}, []), a = e(() => {
		r({ type: "INPUT_DECIMAL" });
	}, []), o = e((e) => {
		r({
			type: "INPUT_OPERATOR",
			operator: e
		});
	}, []), s = e(() => {
		r({ type: "CALCULATE" });
	}, []), c = e(() => {
		r({ type: "CLEAR" });
	}, []), l = e(() => {
		r({ type: "TOGGLE_SIGN" });
	}, []), u = e(() => {
		r({ type: "PERCENT" });
	}, []), d = e(() => {
		r({ type: "BACKSPACE" });
	}, []), f = e((e) => {
		r({
			type: "APPLY_SCIENTIFIC_FUNCTION",
			fn: e
		});
	}, []), p = e(() => {
		r({ type: "TOGGLE_ANGLE_MODE" });
	}, []), m = e((e) => {
		r({
			type: "INPUT_CONSTANT",
			constant: e
		});
	}, []), h = e(() => {
		r({ type: "OPEN_PAREN" });
	}, []), g = e(() => {
		r({ type: "CLOSE_PAREN" });
	}, []);
	return {
		...n,
		inputDigit: i,
		inputDecimal: a,
		inputOperator: o,
		performCalculation: s,
		clearAll: c,
		toggleSign: l,
		inputPercent: u,
		backspace: d,
		applyScientificFunction: f,
		toggleAngleMode: p,
		inputConstant: m,
		openParen: h,
		closeParen: g
	};
}
//#endregion
//#region src/components/Calculator/CalcButton.tsx
function U({ label: e, ariaLabel: t, variant: n = "number", wide: r = !1, pressed: o, caption: s, className: c = "", ...l }) {
	let u = [
		"calc-btn",
		`calc-btn--${n}`,
		r ? "calc-btn--wide" : "",
		c
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ a("button", {
		type: "button",
		className: u,
		"aria-label": t,
		"aria-pressed": n === "operator" && o !== void 0 ? o : void 0,
		...l,
		children: [s ? /* @__PURE__ */ i("span", {
			className: "calc-btn__caption",
			"aria-hidden": "true",
			children: s
		}) : null, e]
	});
}
//#endregion
//#region src/components/Calculator/StandardRows.tsx
function W(e, t) {
	return t.activeOperator === e && t.waitingForOperand;
}
function G(e) {
	let { onClear: t, onToggleSign: n, onPercent: o, onOperator: s } = e;
	return /* @__PURE__ */ a(r, { children: [
		/* @__PURE__ */ i(U, {
			label: "AC",
			ariaLabel: "All clear",
			variant: "function",
			onClick: t
		}),
		/* @__PURE__ */ i(U, {
			label: "+/−",
			ariaLabel: "Toggle positive negative",
			variant: "function",
			onClick: n
		}),
		/* @__PURE__ */ i(U, {
			label: "%",
			ariaLabel: "Percent",
			variant: "function",
			onClick: o
		}),
		/* @__PURE__ */ i(U, {
			label: "÷",
			ariaLabel: "Divide",
			variant: "operator",
			pressed: W("/", e),
			onClick: () => {
				s("/");
			}
		})
	] });
}
function K(e) {
	let { onDigit: t, onOperator: n } = e;
	return /* @__PURE__ */ a(r, { children: [
		/* @__PURE__ */ i(U, {
			label: "7",
			ariaLabel: "7",
			onClick: () => {
				t("7");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "8",
			ariaLabel: "8",
			onClick: () => {
				t("8");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "9",
			ariaLabel: "9",
			onClick: () => {
				t("9");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "×",
			ariaLabel: "Multiply",
			variant: "operator",
			pressed: W("*", e),
			onClick: () => {
				n("*");
			}
		})
	] });
}
function q(e) {
	let { onDigit: t, onOperator: n } = e;
	return /* @__PURE__ */ a(r, { children: [
		/* @__PURE__ */ i(U, {
			label: "4",
			ariaLabel: "4",
			onClick: () => {
				t("4");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "5",
			ariaLabel: "5",
			onClick: () => {
				t("5");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "6",
			ariaLabel: "6",
			onClick: () => {
				t("6");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "−",
			ariaLabel: "Subtract",
			variant: "operator",
			pressed: W("-", e),
			onClick: () => {
				n("-");
			}
		})
	] });
}
function J(e) {
	let { onDigit: t, onOperator: n } = e;
	return /* @__PURE__ */ a(r, { children: [
		/* @__PURE__ */ i(U, {
			label: "1",
			ariaLabel: "1",
			onClick: () => {
				t("1");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "2",
			ariaLabel: "2",
			onClick: () => {
				t("2");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "3",
			ariaLabel: "3",
			onClick: () => {
				t("3");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "+",
			ariaLabel: "Add",
			variant: "operator",
			pressed: W("+", e),
			onClick: () => {
				n("+");
			}
		})
	] });
}
function Y(e) {
	let { onDigit: t, onDecimal: n, onEquals: o } = e;
	return /* @__PURE__ */ a(r, { children: [
		/* @__PURE__ */ i(U, {
			label: "0",
			ariaLabel: "0",
			wide: !0,
			onClick: () => {
				t("0");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: ".",
			ariaLabel: "Decimal point",
			onClick: n
		}),
		/* @__PURE__ */ i(U, {
			label: "=",
			ariaLabel: "Equals",
			variant: "operator",
			onClick: o
		})
	] });
}
//#endregion
//#region src/components/Calculator/BasicPanel.tsx
function X(e) {
	return /* @__PURE__ */ a("div", {
		className: "calc-buttons",
		"data-testid": "button-grid",
		children: [
			/* @__PURE__ */ i(G, { ...e }),
			/* @__PURE__ */ i(K, { ...e }),
			/* @__PURE__ */ i(q, { ...e }),
			/* @__PURE__ */ i(J, { ...e }),
			/* @__PURE__ */ i(Y, { ...e })
		]
	});
}
//#endregion
//#region src/components/Calculator/ScientificPanel.tsx
function Z({ count: e }) {
	return /* @__PURE__ */ i(r, { children: Array.from({ length: e }).map((e, t) => /* @__PURE__ */ i("span", {
		className: "calc-btn-spacer",
		"aria-hidden": "true"
	}, t)) });
}
function Q(e) {
	let { onOpenParen: t, onCloseParen: n, onScientificFunction: o, onOperator: s, isSecondFunction: c, onToggleSecondFunction: l } = e;
	return /* @__PURE__ */ a(r, { children: [
		/* @__PURE__ */ i(U, {
			label: "(",
			ariaLabel: "Open parenthesis",
			variant: "scientific",
			onClick: t
		}),
		/* @__PURE__ */ i(U, {
			label: ")",
			ariaLabel: "Close parenthesis",
			variant: "scientific",
			onClick: n
		}),
		/* @__PURE__ */ i(U, {
			label: c ? "x³" : "x²",
			caption: c ? "x²" : "x³",
			ariaLabel: c ? "x cubed" : "x squared",
			variant: "scientific",
			onClick: () => {
				o(c ? "cube" : "square");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: c ? "ⁿ√x" : "xⁿ",
			caption: c ? "xⁿ" : "ⁿ√x",
			ariaLabel: c ? "nth root of x" : "x to the power of n",
			variant: "scientific",
			onClick: () => {
				s(c ? "nthRoot" : "^");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: c ? "10ˣ" : "eˣ",
			caption: c ? "eˣ" : "10ˣ",
			ariaLabel: c ? "10 to the power of x" : "e to the power of x",
			variant: "scientific",
			onClick: () => {
				o(c ? "tenPow" : "exp");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "2nd",
			ariaLabel: c ? "Second function active, click for primary" : "Second function",
			variant: "scientific",
			className: c ? "calc-btn--second-active" : "",
			onClick: l
		})
	] });
}
function $(e) {
	let { onScientificFunction: t, isSecondFunction: n, onConstant: o } = e;
	return /* @__PURE__ */ a(r, { children: [
		/* @__PURE__ */ i(U, {
			label: "1/x",
			ariaLabel: "Reciprocal",
			variant: "scientific",
			onClick: () => {
				t("reciprocal");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: n ? "∛x" : "√x",
			caption: n ? "√x" : "∛x",
			ariaLabel: n ? "Cube root" : "Square root",
			variant: "scientific",
			onClick: () => {
				t(n ? "cbrt" : "sqrt");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "x!",
			ariaLabel: "Factorial",
			variant: "scientific",
			onClick: () => {
				t("factorial");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: n ? "log₁₀" : "ln",
			caption: n ? "ln" : "log₁₀",
			ariaLabel: n ? "Log base 10" : "Natural log",
			variant: "scientific",
			onClick: () => {
				t(n ? "log10" : "ln");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "e",
			ariaLabel: "Euler's number e",
			variant: "scientific",
			onClick: () => {
				o("e");
			}
		}),
		/* @__PURE__ */ i(U, {
			label: "π",
			ariaLabel: "Pi",
			variant: "scientific",
			onClick: () => {
				o("pi");
			}
		})
	] });
}
function ee(e) {
	let { onScientificFunction: t, isSecondFunction: n } = e, o = [
		{
			fn: "sin",
			inverse: "asin",
			label: "sin"
		},
		{
			fn: "cos",
			inverse: "acos",
			label: "cos"
		},
		{
			fn: "tan",
			inverse: "atan",
			label: "tan"
		}
	], s = [
		{
			fn: "sinh",
			inverse: "asinh",
			label: "sinh"
		},
		{
			fn: "cosh",
			inverse: "acosh",
			label: "cosh"
		},
		{
			fn: "tanh",
			inverse: "atanh",
			label: "tanh"
		}
	], c = (e) => n ? `${e.label}⁻¹` : e.label, l = (e) => n ? e.label : `${e.label}⁻¹`, u = (e) => {
		let t = e.label === "sin" ? "Sine" : e.label === "cos" ? "Cosine" : "Tangent", r = e.label === "sin" ? "Arc sine" : e.label === "cos" ? "Arc cosine" : "Arc tangent";
		return n ? r : t;
	}, d = (e) => n ? `${e.label}⁻¹` : e.label, f = (e) => n ? e.label : `${e.label}⁻¹`, p = (e) => {
		let t = e.label === "sinh" ? "Hyperbolic sine" : e.label === "cosh" ? "Hyperbolic cosine" : "Hyperbolic tangent", r = e.label === "sinh" ? "Inverse hyperbolic sine" : e.label === "cosh" ? "Inverse hyperbolic cosine" : "Inverse hyperbolic tangent";
		return n ? r : t;
	};
	return /* @__PURE__ */ a(r, { children: [o.map((e) => /* @__PURE__ */ i(U, {
		label: c(e),
		caption: l(e),
		ariaLabel: u(e),
		variant: "scientific",
		onClick: () => {
			t(n ? e.inverse : e.fn);
		}
	}, e.label)), s.map((e) => /* @__PURE__ */ i(U, {
		label: d(e),
		caption: f(e),
		ariaLabel: p(e),
		variant: "scientific",
		onClick: () => {
			t(n ? e.inverse : e.fn);
		}
	}, e.label))] });
}
var te = {
	rad: {
		label: "Rad",
		next: "Grad",
		currentWord: "radians",
		nextWord: "gradians"
	},
	grad: {
		label: "Grad",
		next: "Deg",
		currentWord: "gradians",
		nextWord: "degrees"
	},
	deg: {
		label: "Deg",
		next: "Rad",
		currentWord: "degrees",
		nextWord: "radians"
	}
};
function ne(e) {
	let { angleMode: t, onToggleAngleMode: n, onScientificFunction: o, isSecondFunction: s } = e, c = te[t];
	return /* @__PURE__ */ a(r, { children: [
		/* @__PURE__ */ i(U, {
			label: c.label,
			caption: `→ ${c.next}`,
			ariaLabel: `Currently ${c.currentWord}, switch to ${c.nextWord}`,
			variant: "scientific",
			onClick: n
		}),
		[
			{
				fn: "sec",
				inverse: "asec",
				label: "sec",
				name: "Secant",
				arc: "Arc secant"
			},
			{
				fn: "csc",
				inverse: "acsc",
				label: "cosec",
				name: "Cosecant",
				arc: "Arc cosecant"
			},
			{
				fn: "cot",
				inverse: "acot",
				label: "cot",
				name: "Cotangent",
				arc: "Arc cotangent"
			}
		].map((e) => /* @__PURE__ */ i(U, {
			label: s ? `${e.label}⁻¹` : e.label,
			caption: s ? e.label : `${e.label}⁻¹`,
			ariaLabel: s ? e.arc : e.name,
			variant: "scientific",
			onClick: () => {
				o(s ? e.inverse : e.fn);
			}
		}, e.fn)),
		/* @__PURE__ */ i(Z, { count: 2 })
	] });
}
function re(e) {
	return /* @__PURE__ */ a("div", {
		className: "calc-buttons calc-buttons--scientific",
		"data-testid": "button-grid",
		children: [
			/* @__PURE__ */ i(Q, { ...e }),
			/* @__PURE__ */ i(G, { ...e }),
			/* @__PURE__ */ i($, { ...e }),
			/* @__PURE__ */ i(K, { ...e }),
			/* @__PURE__ */ i(ee, { ...e }),
			/* @__PURE__ */ i(q, { ...e }),
			/* @__PURE__ */ i(ne, { ...e }),
			/* @__PURE__ */ i(J, { ...e }),
			/* @__PURE__ */ i(U, {
				label: "|x|",
				ariaLabel: "Absolute value",
				variant: "scientific",
				onClick: () => {
					e.onScientificFunction("abs");
				}
			}),
			/* @__PURE__ */ i(U, {
				label: "nCr",
				ariaLabel: "Combinations",
				variant: "scientific",
				onClick: () => {
					e.onOperator("nCr");
				}
			}),
			/* @__PURE__ */ i(U, {
				label: "nPr",
				ariaLabel: "Permutations",
				variant: "scientific",
				onClick: () => {
					e.onOperator("nPr");
				}
			}),
			/* @__PURE__ */ i(Z, { count: 3 }),
			/* @__PURE__ */ i(Y, { ...e })
		]
	});
}
//#endregion
//#region src/components/Calculator/ButtonPanel.tsx
function ie(e) {
	return e.mode === "scientific" ? /* @__PURE__ */ i(re, { ...e }) : /* @__PURE__ */ i(X, { ...e });
}
//#endregion
//#region src/components/Calculator/Display.tsx
function ae({ value: e, expression: t, mode: n, angleMode: r, parenDepth: o = 0 }) {
	let s = e === "Error" ? "Error" : parseFloat(e) < 0 ? `negative ${Math.abs(parseFloat(e))}` : e, c = n === "scientific";
	return /* @__PURE__ */ a("div", {
		className: "calc-display",
		children: [/* @__PURE__ */ a("div", {
			className: "calc-display__info",
			"aria-hidden": "true",
			children: [
				c ? /* @__PURE__ */ i("span", {
					className: "calc-display__angle-mode",
					children: r === "deg" ? "DEG" : r === "grad" ? "GRAD" : "RAD"
				}) : null,
				c && o > 0 ? /* @__PURE__ */ i("span", {
					className: "calc-display__parens",
					children: "(".repeat(o)
				}) : null,
				t ? /* @__PURE__ */ i("span", {
					className: "calc-display__expression",
					children: t
				}) : null
			]
		}), /* @__PURE__ */ i("output", {
			className: "calc-display__value",
			"aria-label": `Result: ${s}`,
			"data-testid": "display",
			children: e
		})]
	});
}
//#endregion
//#region src/components/Calculator/Calculator.tsx
var oe = {
	"+": "+",
	"-": "-",
	"*": "*",
	"/": "/",
	"^": "^"
};
function se({ theme: t, initialMode: r = "basic" }) {
	let { displayValue: o, operator: s, waitingForOperand: c, expression: l, announcement: u, announcementKey: d, angleMode: f, parenDepth: p, inputDigit: m, inputDecimal: h, inputOperator: g, performCalculation: _, clearAll: v, toggleSign: y, inputPercent: b, backspace: x, applyScientificFunction: S, toggleAngleMode: C, inputConstant: w, openParen: T, closeParen: E } = H(), [D, O] = n(r), [k, A] = n(!1), j = e(() => {
		O((e) => e === "basic" ? "scientific" : "basic");
	}, []), M = e(() => {
		A((e) => !e);
	}, []), N = e((e) => {
		let { key: t } = e, n = oe[t];
		t >= "0" && t <= "9" ? (e.preventDefault(), m(t)) : t === "." ? (e.preventDefault(), h()) : n === void 0 ? t === "Enter" || t === "=" ? (e.preventDefault(), _()) : t === "Escape" ? (e.preventDefault(), v()) : t === "Backspace" ? (e.preventDefault(), x()) : t === "%" ? (e.preventDefault(), b()) : t === "(" && D === "scientific" ? (e.preventDefault(), T()) : t === ")" && D === "scientific" && (e.preventDefault(), E()) : (e.preventDefault(), g(n));
	}, [
		m,
		h,
		g,
		_,
		v,
		x,
		b,
		T,
		E,
		D
	]), P = t ? Object.fromEntries(Object.entries(t).map(([e, t]) => [`--${e}`, t])) : void 0;
	return /* @__PURE__ */ a("div", {
		className: D === "scientific" ? "calculator calculator--scientific" : "calculator",
		style: P,
		role: "application",
		"aria-label": "Calculator",
		"aria-roledescription": "calculator",
		tabIndex: 0,
		onKeyDown: N,
		children: [
			/* @__PURE__ */ i("div", {
				className: "sr-only",
				role: "log",
				"aria-live": "polite",
				"aria-atomic": "true",
				"aria-label": "Calculator announcements",
				"data-testid": "announcements",
				children: u
			}, d),
			/* @__PURE__ */ i("div", {
				className: "calc-toolbar",
				children: /* @__PURE__ */ i("button", {
					type: "button",
					className: "calc-mode-toggle",
					"aria-pressed": D === "scientific",
					onClick: j,
					"data-testid": "mode-toggle",
					children: D === "scientific" ? "Basic" : "Scientific"
				})
			}),
			/* @__PURE__ */ i(ae, {
				value: o,
				expression: l,
				mode: D,
				angleMode: f,
				parenDepth: p
			}),
			/* @__PURE__ */ i(ie, {
				mode: D,
				onDigit: m,
				onDecimal: h,
				onOperator: g,
				onEquals: _,
				onClear: v,
				onToggleSign: y,
				onPercent: b,
				activeOperator: s,
				waitingForOperand: c,
				angleMode: f,
				isSecondFunction: k,
				onScientificFunction: S,
				onToggleAngleMode: C,
				onToggleSecondFunction: M,
				onConstant: w,
				onOpenParen: T,
				onCloseParen: E
			})
		]
	});
}
//#endregion
export { se as Calculator };

//# sourceMappingURL=index.mjs.map