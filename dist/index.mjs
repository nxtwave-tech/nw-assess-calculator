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
	SET_ANGLE_MODE: (e, t) => e.angleMode === t.mode ? e : {
		...e,
		angleMode: t.mode,
		announcement: R[t.mode]
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
			type: "SET_ANGLE_MODE",
			mode: e
		});
	}, []), h = e((e) => {
		r({
			type: "INPUT_CONSTANT",
			constant: e
		});
	}, []), g = e(() => {
		r({ type: "OPEN_PAREN" });
	}, []), _ = e(() => {
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
		setAngleMode: m,
		inputConstant: h,
		openParen: g,
		closeParen: _
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
function Z() {
	return /* @__PURE__ */ i("span", {
		className: "calc-btn-spacer",
		"aria-hidden": "true"
	});
}
function Q() {
	return /* @__PURE__ */ i("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ i("path", {
			d: "M1.5 4h8m0 0L7.5 2m2 2L7.5 6M10.5 8h-8m0 0 2-2m-2 2 2 2",
			stroke: "currentColor",
			strokeWidth: "1.1",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function $() {
	return /* @__PURE__ */ a("svg", {
		width: "16",
		height: "12",
		viewBox: "0 0 16 12",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ i("path", {
			d: "M5.2 1h8.3A1.5 1.5 0 0 1 15 2.5v7a1.5 1.5 0 0 1-1.5 1.5H5.2a1 1 0 0 1-.75-.34L1 6l3.45-4.66A1 1 0 0 1 5.2 1Z",
			stroke: "currentColor",
			strokeWidth: "1.1",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ i("path", {
			d: "m7.5 4 4 4m0-4-4 4",
			stroke: "currentColor",
			strokeWidth: "1.1",
			strokeLinecap: "round"
		})]
	});
}
function ee() {
	return /* @__PURE__ */ i("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ i("path", {
			d: "M4 1.5v5M1.5 4h5M8 10.5h4.5M11.5 2.5l-9 9",
			stroke: "currentColor",
			strokeWidth: "1.1",
			strokeLinecap: "round"
		})
	});
}
var te = [
	{
		fn: "sin",
		inverse: "asin",
		label: "sin",
		inverseLabel: "sin⁻¹",
		name: "Sine",
		inverseName: "Arc sine"
	},
	{
		fn: "cos",
		inverse: "acos",
		label: "cos",
		inverseLabel: "cos⁻¹",
		name: "Cosine",
		inverseName: "Arc cosine"
	},
	{
		fn: "tan",
		inverse: "atan",
		label: "tan",
		inverseLabel: "tan⁻¹",
		name: "Tangent",
		inverseName: "Arc tangent"
	},
	{
		fn: "sinh",
		inverse: "asinh",
		label: "sinh",
		inverseLabel: "sinh⁻¹",
		name: "Hyperbolic sine",
		inverseName: "Inverse hyperbolic sine"
	},
	{
		fn: "cosh",
		inverse: "acosh",
		label: "cosh",
		inverseLabel: "cosh⁻¹",
		name: "Hyperbolic cosine",
		inverseName: "Inverse hyperbolic cosine"
	},
	{
		fn: "tanh",
		inverse: "atanh",
		label: "tanh",
		inverseLabel: "tanh⁻¹",
		name: "Hyperbolic tangent",
		inverseName: "Inverse hyperbolic tangent"
	},
	{
		fn: "csc",
		inverse: "acsc",
		label: "cosec",
		inverseLabel: "cosec⁻¹",
		name: "Cosecant",
		inverseName: "Arc cosecant"
	},
	{
		fn: "sec",
		inverse: "asec",
		label: "sec",
		inverseLabel: "sec⁻¹",
		name: "Secant",
		inverseName: "Arc secant"
	},
	{
		fn: "cot",
		inverse: "acot",
		label: "cot",
		inverseLabel: "cot⁻¹",
		name: "Cotangent",
		inverseName: "Arc cotangent"
	}
], ne = [
	{
		mode: "rad",
		label: "Rad",
		name: "Radians"
	},
	{
		mode: "grad",
		label: "Grad",
		name: "Gradians"
	},
	{
		mode: "deg",
		label: "Deg",
		name: "Degrees"
	}
];
function re(e) {
	let { isSecondFunction: t, onToggleSecondFunction: n, onScientificFunction: r, onOperator: o, onConstant: s, onOpenParen: c, onCloseParen: l, onBackspace: u, onSetAngleMode: d, onDigit: f, onDecimal: p, onEquals: m, onClear: h, onToggleSign: g, onPercent: _, angleMode: v, activeOperator: y, waitingForOperand: b } = e, x = (e) => y === e && b;
	return /* @__PURE__ */ a("div", {
		className: "calc-keypad",
		"data-testid": "button-grid",
		children: [
			/* @__PURE__ */ a("div", {
				className: "calc-keypad__trig",
				children: [/* @__PURE__ */ a("div", {
					className: "calc-keypad__trig-top",
					children: [/* @__PURE__ */ a("button", {
						type: "button",
						className: "calc-invert-toggle",
						"aria-pressed": t,
						"aria-label": "Invert Functions",
						onClick: n,
						children: [/* @__PURE__ */ i(Q, {}), "Invert Functions"]
					}), /* @__PURE__ */ i("div", {
						className: "calc-keypad__group calc-keypad__group--3",
						children: te.map((e) => /* @__PURE__ */ i(U, {
							label: t ? e.inverseLabel : e.label,
							ariaLabel: t ? e.inverseName : e.name,
							variant: "scientific",
							onClick: () => r(t ? e.inverse : e.fn)
						}, e.fn))
					})]
				}), /* @__PURE__ */ i("div", {
					className: "calc-keypad__group calc-keypad__group--3",
					children: ne.map((e) => {
						let t = v === e.mode;
						return /* @__PURE__ */ i(U, {
							label: e.label,
							ariaLabel: t ? `${e.name}, selected` : `Switch to ${e.name.toLowerCase()}`,
							variant: "scientific",
							className: t ? "calc-btn--selected" : "",
							"aria-pressed": t,
							onClick: () => d(e.mode)
						}, e.mode);
					})
				})]
			}),
			/* @__PURE__ */ a("div", {
				className: "calc-keypad__group calc-keypad__group--4",
				children: [
					/* @__PURE__ */ i(U, {
						label: "(",
						ariaLabel: "Open parenthesis",
						variant: "scientific",
						onClick: c
					}),
					/* @__PURE__ */ i(U, {
						label: ")",
						ariaLabel: "Close parenthesis",
						variant: "scientific",
						onClick: l
					}),
					/* @__PURE__ */ i(U, {
						label: "nCr",
						ariaLabel: "Combinations",
						variant: "scientific",
						onClick: () => o("nCr")
					}),
					/* @__PURE__ */ i(U, {
						label: "nPr",
						ariaLabel: "Permutations",
						variant: "scientific",
						onClick: () => o("nPr")
					}),
					/* @__PURE__ */ i(U, {
						label: "e",
						ariaLabel: "Euler's number e",
						variant: "scientific",
						onClick: () => s("e")
					}),
					/* @__PURE__ */ i(U, {
						label: "eˣ",
						ariaLabel: "e to the power of x",
						variant: "scientific",
						onClick: () => r("exp")
					}),
					/* @__PURE__ */ i(U, {
						label: "x²",
						ariaLabel: "x squared",
						variant: "scientific",
						onClick: () => r("square")
					}),
					/* @__PURE__ */ i(U, {
						label: "x³",
						ariaLabel: "x cubed",
						variant: "scientific",
						onClick: () => r("cube")
					}),
					/* @__PURE__ */ i(U, {
						label: "xⁿ",
						ariaLabel: "x to the power of n",
						variant: "scientific",
						onClick: () => o("^")
					}),
					/* @__PURE__ */ i(U, {
						label: "10ˣ",
						ariaLabel: "10 to the power of x",
						variant: "scientific",
						onClick: () => r("tenPow")
					}),
					/* @__PURE__ */ i(U, {
						label: "1/x",
						ariaLabel: "Reciprocal",
						variant: "scientific",
						onClick: () => r("reciprocal")
					}),
					/* @__PURE__ */ i(U, {
						label: "x!",
						ariaLabel: "Factorial",
						variant: "scientific",
						onClick: () => r("factorial")
					}),
					/* @__PURE__ */ i(U, {
						label: "√x",
						ariaLabel: "Square root",
						variant: "scientific",
						onClick: () => r("sqrt")
					}),
					/* @__PURE__ */ i(U, {
						label: "∛x",
						ariaLabel: "Cube root",
						variant: "scientific",
						onClick: () => r("cbrt")
					}),
					/* @__PURE__ */ i(U, {
						label: "ⁿ√x",
						ariaLabel: "nth root of x",
						variant: "scientific",
						onClick: () => o("nthRoot")
					}),
					/* @__PURE__ */ i(U, {
						label: "|x|",
						ariaLabel: "Absolute value",
						variant: "scientific",
						onClick: () => r("abs")
					}),
					/* @__PURE__ */ i(U, {
						label: "ln",
						ariaLabel: "Natural log",
						variant: "scientific",
						onClick: () => r("ln")
					}),
					/* @__PURE__ */ i(U, {
						label: "log₁₀",
						ariaLabel: "Log base 10",
						variant: "scientific",
						onClick: () => r("log10")
					}),
					/* @__PURE__ */ i(U, {
						label: "π",
						ariaLabel: "Pi",
						variant: "scientific",
						onClick: () => s("pi")
					}),
					/* @__PURE__ */ i(Z, {})
				]
			}),
			/* @__PURE__ */ a("div", {
				className: "calc-keypad__group calc-keypad__group--4",
				children: [
					/* @__PURE__ */ i(U, {
						label: /* @__PURE__ */ i($, {}),
						ariaLabel: "Backspace",
						variant: "function",
						onClick: u
					}),
					/* @__PURE__ */ i(U, {
						label: "AC",
						ariaLabel: "All clear",
						variant: "function",
						onClick: h
					}),
					/* @__PURE__ */ i(U, {
						label: "%",
						ariaLabel: "Percent",
						variant: "function",
						onClick: _
					}),
					/* @__PURE__ */ i(U, {
						label: "÷",
						ariaLabel: "Divide",
						variant: "operator",
						pressed: x("/"),
						onClick: () => o("/")
					}),
					/* @__PURE__ */ i(U, {
						label: "7",
						ariaLabel: "7",
						onClick: () => f("7")
					}),
					/* @__PURE__ */ i(U, {
						label: "8",
						ariaLabel: "8",
						onClick: () => f("8")
					}),
					/* @__PURE__ */ i(U, {
						label: "9",
						ariaLabel: "9",
						onClick: () => f("9")
					}),
					/* @__PURE__ */ i(U, {
						label: "×",
						ariaLabel: "Multiply",
						variant: "operator",
						pressed: x("*"),
						onClick: () => o("*")
					}),
					/* @__PURE__ */ i(U, {
						label: "4",
						ariaLabel: "4",
						onClick: () => f("4")
					}),
					/* @__PURE__ */ i(U, {
						label: "5",
						ariaLabel: "5",
						onClick: () => f("5")
					}),
					/* @__PURE__ */ i(U, {
						label: "6",
						ariaLabel: "6",
						onClick: () => f("6")
					}),
					/* @__PURE__ */ i(U, {
						label: "−",
						ariaLabel: "Subtract",
						variant: "operator",
						pressed: x("-"),
						onClick: () => o("-")
					}),
					/* @__PURE__ */ i(U, {
						label: "1",
						ariaLabel: "1",
						onClick: () => f("1")
					}),
					/* @__PURE__ */ i(U, {
						label: "2",
						ariaLabel: "2",
						onClick: () => f("2")
					}),
					/* @__PURE__ */ i(U, {
						label: "3",
						ariaLabel: "3",
						onClick: () => f("3")
					}),
					/* @__PURE__ */ i(U, {
						label: "+",
						ariaLabel: "Add",
						variant: "operator",
						pressed: x("+"),
						onClick: () => o("+")
					}),
					/* @__PURE__ */ i(U, {
						label: /* @__PURE__ */ i(ee, {}),
						ariaLabel: "Toggle positive negative",
						onClick: g
					}),
					/* @__PURE__ */ i(U, {
						label: "0",
						ariaLabel: "0",
						onClick: () => f("0")
					}),
					/* @__PURE__ */ i(U, {
						label: ".",
						ariaLabel: "Decimal point",
						onClick: p
					}),
					/* @__PURE__ */ i(U, {
						label: "=",
						ariaLabel: "Equals",
						variant: "operator",
						onClick: m
					})
				]
			})
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
function se({ theme: t, initialMode: r = "basic", showModeToggle: o = !0 }) {
	let { displayValue: s, operator: c, waitingForOperand: l, expression: u, announcement: d, announcementKey: f, angleMode: p, parenDepth: m, inputDigit: h, inputDecimal: g, inputOperator: _, performCalculation: v, clearAll: y, toggleSign: b, inputPercent: x, backspace: S, applyScientificFunction: C, toggleAngleMode: w, setAngleMode: T, inputConstant: E, openParen: D, closeParen: O } = H(), [k, A] = n(r), [j, M] = n(!1), N = e(() => {
		A((e) => e === "basic" ? "scientific" : "basic");
	}, []), P = e(() => {
		M((e) => !e);
	}, []), F = e((e) => {
		let { key: t } = e, n = oe[t];
		t >= "0" && t <= "9" ? (e.preventDefault(), h(t)) : t === "." ? (e.preventDefault(), g()) : n === void 0 ? t === "Enter" || t === "=" ? (e.preventDefault(), v()) : t === "Escape" ? (e.preventDefault(), y()) : t === "Backspace" ? (e.preventDefault(), S()) : t === "%" ? (e.preventDefault(), x()) : t === "(" && k === "scientific" ? (e.preventDefault(), D()) : t === ")" && k === "scientific" && (e.preventDefault(), O()) : (e.preventDefault(), _(n));
	}, [
		h,
		g,
		_,
		v,
		y,
		S,
		x,
		D,
		O,
		k
	]), I = t ? Object.fromEntries(Object.entries(t).map(([e, t]) => [`--${e}`, t])) : void 0;
	return /* @__PURE__ */ a("div", {
		className: k === "scientific" ? "calculator calculator--scientific" : "calculator",
		style: I,
		role: "application",
		"aria-label": "Calculator",
		"aria-roledescription": "calculator",
		tabIndex: 0,
		onKeyDown: F,
		children: [
			/* @__PURE__ */ i("div", {
				className: "sr-only",
				role: "log",
				"aria-live": "polite",
				"aria-atomic": "true",
				"aria-label": "Calculator announcements",
				"data-testid": "announcements",
				children: d
			}, f),
			o ? /* @__PURE__ */ i("div", {
				className: "calc-toolbar",
				children: /* @__PURE__ */ i("button", {
					type: "button",
					className: "calc-mode-toggle",
					"aria-pressed": k === "scientific",
					onClick: N,
					"data-testid": "mode-toggle",
					children: k === "scientific" ? "Basic" : "Scientific"
				})
			}) : null,
			/* @__PURE__ */ i(ae, {
				value: s,
				expression: u,
				mode: k,
				angleMode: p,
				parenDepth: m
			}),
			/* @__PURE__ */ i(ie, {
				mode: k,
				onDigit: h,
				onDecimal: g,
				onOperator: _,
				onEquals: v,
				onClear: y,
				onToggleSign: b,
				onPercent: x,
				activeOperator: c,
				waitingForOperand: l,
				angleMode: p,
				isSecondFunction: j,
				onScientificFunction: C,
				onToggleAngleMode: w,
				onSetAngleMode: T,
				onBackspace: S,
				onToggleSecondFunction: P,
				onConstant: E,
				onOpenParen: D,
				onCloseParen: O
			})
		]
	});
}
//#endregion
export { se as Calculator };

//# sourceMappingURL=index.mjs.map