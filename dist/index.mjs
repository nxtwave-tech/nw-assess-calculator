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
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ i("path", {
			d: "M2.2 4.2A4.6 4.6 0 0 1 11 3.2M11 1.4v2.2H8.8M11.8 9.8A4.6 4.6 0 0 1 3 10.8M3 12.6V10.4h2.2",
			stroke: "currentColor",
			strokeWidth: "1.3",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
var ee = [
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
	}
], te = [
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
	}
], ne = [
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
], re = [
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
function $({ keys: e, inverted: t, onScientificFunction: n }) {
	return /* @__PURE__ */ i(r, { children: e.map((e) => /* @__PURE__ */ i(U, {
		label: t ? e.inverseLabel : e.label,
		ariaLabel: t ? e.inverseName : e.name,
		variant: "scientific",
		onClick: () => {
			n(t ? e.inverse : e.fn);
		}
	}, e.fn)) });
}
function ie(e) {
	let { isSecondFunction: t, onToggleSecondFunction: n, onScientificFunction: o, onOperator: s, onConstant: c, onOpenParen: l, onCloseParen: u, onBackspace: d, onSetAngleMode: f, onDigit: p, onDecimal: m, onEquals: h, onClear: g, onToggleSign: _, onPercent: v, angleMode: y, activeOperator: b, waitingForOperand: x } = e, S = (e) => b === e && x;
	return /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i("div", {
		className: "calc-invert-row",
		children: /* @__PURE__ */ a("button", {
			type: "button",
			className: "calc-invert-toggle",
			"aria-pressed": t,
			"aria-label": "Invert Functions",
			onClick: n,
			children: [/* @__PURE__ */ i(Q, {}), "Invert Functions"]
		})
	}), /* @__PURE__ */ a("div", {
		className: "calc-buttons calc-buttons--scientific",
		"data-testid": "button-grid",
		children: [
			/* @__PURE__ */ i(U, {
				label: "(",
				ariaLabel: "Open parenthesis",
				variant: "scientific",
				onClick: l
			}),
			/* @__PURE__ */ i(U, {
				label: ")",
				ariaLabel: "Close parenthesis",
				variant: "scientific",
				onClick: u
			}),
			/* @__PURE__ */ i(U, {
				label: "nCr",
				ariaLabel: "Combinations",
				variant: "scientific",
				onClick: () => {
					s("nCr");
				}
			}),
			/* @__PURE__ */ i(U, {
				label: "nPr",
				ariaLabel: "Permutations",
				variant: "scientific",
				onClick: () => {
					s("nPr");
				}
			}),
			/* @__PURE__ */ i(Z, {}),
			/* @__PURE__ */ i(Z, {}),
			/* @__PURE__ */ i(Z, {}),
			/* @__PURE__ */ i(U, {
				label: "⌫",
				ariaLabel: "Backspace",
				variant: "function",
				onClick: d
			}),
			/* @__PURE__ */ i(U, {
				label: "AC",
				ariaLabel: "All clear",
				variant: "function",
				onClick: g
			}),
			/* @__PURE__ */ i(U, {
				label: "%",
				ariaLabel: "Percent",
				variant: "function",
				onClick: v
			}),
			/* @__PURE__ */ i(U, {
				label: "÷",
				ariaLabel: "Divide",
				variant: "operator",
				pressed: S("/"),
				onClick: () => {
					s("/");
				}
			}),
			/* @__PURE__ */ i($, {
				keys: ee,
				inverted: t,
				onScientificFunction: o
			}),
			/* @__PURE__ */ i(U, {
				label: "e",
				ariaLabel: "Euler's number e",
				variant: "scientific",
				onClick: () => {
					c("e");
				}
			}),
			/* @__PURE__ */ i(U, {
				label: "eˣ",
				ariaLabel: "e to the power of x",
				variant: "scientific",
				onClick: () => {
					o("exp");
				}
			}),
			/* @__PURE__ */ i(U, {
				label: "x²",
				ariaLabel: "x squared",
				variant: "scientific",
				onClick: () => {
					o("square");
				}
			}),
			/* @__PURE__ */ i(U, {
				label: "x³",
				ariaLabel: "x cubed",
				variant: "scientific",
				onClick: () => {
					o("cube");
				}
			}),
			/* @__PURE__ */ i(U, {
				label: "7",
				ariaLabel: "7",
				onClick: () => p("7")
			}),
			/* @__PURE__ */ i(U, {
				label: "8",
				ariaLabel: "8",
				onClick: () => p("8")
			}),
			/* @__PURE__ */ i(U, {
				label: "9",
				ariaLabel: "9",
				onClick: () => p("9")
			}),
			/* @__PURE__ */ i(U, {
				label: "×",
				ariaLabel: "Multiply",
				variant: "operator",
				pressed: S("*"),
				onClick: () => s("*")
			}),
			/* @__PURE__ */ i($, {
				keys: te,
				inverted: t,
				onScientificFunction: o
			}),
			/* @__PURE__ */ i(U, {
				label: "xⁿ",
				ariaLabel: "x to the power of n",
				variant: "scientific",
				onClick: () => s("^")
			}),
			/* @__PURE__ */ i(U, {
				label: "10ˣ",
				ariaLabel: "10 to the power of x",
				variant: "scientific",
				onClick: () => o("tenPow")
			}),
			/* @__PURE__ */ i(U, {
				label: "1/x",
				ariaLabel: "Reciprocal",
				variant: "scientific",
				onClick: () => o("reciprocal")
			}),
			/* @__PURE__ */ i(U, {
				label: "x!",
				ariaLabel: "Factorial",
				variant: "scientific",
				onClick: () => o("factorial")
			}),
			/* @__PURE__ */ i(U, {
				label: "4",
				ariaLabel: "4",
				onClick: () => p("4")
			}),
			/* @__PURE__ */ i(U, {
				label: "5",
				ariaLabel: "5",
				onClick: () => p("5")
			}),
			/* @__PURE__ */ i(U, {
				label: "6",
				ariaLabel: "6",
				onClick: () => p("6")
			}),
			/* @__PURE__ */ i(U, {
				label: "−",
				ariaLabel: "Subtract",
				variant: "operator",
				pressed: S("-"),
				onClick: () => s("-")
			}),
			/* @__PURE__ */ i($, {
				keys: ne,
				inverted: t,
				onScientificFunction: o
			}),
			/* @__PURE__ */ i(U, {
				label: "√x",
				ariaLabel: "Square root",
				variant: "scientific",
				onClick: () => o("sqrt")
			}),
			/* @__PURE__ */ i(U, {
				label: "∛x",
				ariaLabel: "Cube root",
				variant: "scientific",
				onClick: () => o("cbrt")
			}),
			/* @__PURE__ */ i(U, {
				label: "ⁿ√x",
				ariaLabel: "nth root of x",
				variant: "scientific",
				onClick: () => s("nthRoot")
			}),
			/* @__PURE__ */ i(U, {
				label: "|x|",
				ariaLabel: "Absolute value",
				variant: "scientific",
				onClick: () => o("abs")
			}),
			/* @__PURE__ */ i(U, {
				label: "1",
				ariaLabel: "1",
				onClick: () => p("1")
			}),
			/* @__PURE__ */ i(U, {
				label: "2",
				ariaLabel: "2",
				onClick: () => p("2")
			}),
			/* @__PURE__ */ i(U, {
				label: "3",
				ariaLabel: "3",
				onClick: () => p("3")
			}),
			/* @__PURE__ */ i(U, {
				label: "+",
				ariaLabel: "Add",
				variant: "operator",
				pressed: S("+"),
				onClick: () => s("+")
			}),
			re.map((e) => /* @__PURE__ */ i(U, {
				label: e.label,
				ariaLabel: y === e.mode ? `${e.name}, selected` : `Switch to ${e.name.toLowerCase()}`,
				variant: y === e.mode ? "operator" : "scientific",
				"aria-pressed": y === e.mode,
				onClick: () => f(e.mode)
			}, e.mode)),
			/* @__PURE__ */ i(U, {
				label: "ln",
				ariaLabel: "Natural log",
				variant: "scientific",
				onClick: () => o("ln")
			}),
			/* @__PURE__ */ i(U, {
				label: "log₁₀",
				ariaLabel: "Log base 10",
				variant: "scientific",
				onClick: () => o("log10")
			}),
			/* @__PURE__ */ i(U, {
				label: "π",
				ariaLabel: "Pi",
				variant: "scientific",
				onClick: () => c("pi")
			}),
			/* @__PURE__ */ i(Z, {}),
			/* @__PURE__ */ i(U, {
				label: "+/−",
				ariaLabel: "Toggle positive negative",
				variant: "function",
				onClick: _
			}),
			/* @__PURE__ */ i(U, {
				label: "0",
				ariaLabel: "0",
				onClick: () => p("0")
			}),
			/* @__PURE__ */ i(U, {
				label: ".",
				ariaLabel: "Decimal point",
				onClick: m
			}),
			/* @__PURE__ */ i(U, {
				label: "=",
				ariaLabel: "Equals",
				variant: "operator",
				onClick: h
			})
		]
	})] });
}
//#endregion
//#region src/components/Calculator/ButtonPanel.tsx
function ae(e) {
	return e.mode === "scientific" ? /* @__PURE__ */ i(ie, { ...e }) : /* @__PURE__ */ i(X, { ...e });
}
//#endregion
//#region src/components/Calculator/Display.tsx
function oe({ value: e, expression: t, mode: n, angleMode: r, parenDepth: o = 0 }) {
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
var se = {
	"+": "+",
	"-": "-",
	"*": "*",
	"/": "/",
	"^": "^"
};
function ce({ theme: t, initialMode: r = "basic" }) {
	let { displayValue: o, operator: s, waitingForOperand: c, expression: l, announcement: u, announcementKey: d, angleMode: f, parenDepth: p, inputDigit: m, inputDecimal: h, inputOperator: g, performCalculation: _, clearAll: v, toggleSign: y, inputPercent: b, backspace: x, applyScientificFunction: S, toggleAngleMode: C, setAngleMode: w, inputConstant: T, openParen: E, closeParen: D } = H(), [O, k] = n(r), [A, j] = n(!1), M = e(() => {
		k((e) => e === "basic" ? "scientific" : "basic");
	}, []), N = e(() => {
		j((e) => !e);
	}, []), P = e((e) => {
		let { key: t } = e, n = se[t];
		t >= "0" && t <= "9" ? (e.preventDefault(), m(t)) : t === "." ? (e.preventDefault(), h()) : n === void 0 ? t === "Enter" || t === "=" ? (e.preventDefault(), _()) : t === "Escape" ? (e.preventDefault(), v()) : t === "Backspace" ? (e.preventDefault(), x()) : t === "%" ? (e.preventDefault(), b()) : t === "(" && O === "scientific" ? (e.preventDefault(), E()) : t === ")" && O === "scientific" && (e.preventDefault(), D()) : (e.preventDefault(), g(n));
	}, [
		m,
		h,
		g,
		_,
		v,
		x,
		b,
		E,
		D,
		O
	]), F = t ? Object.fromEntries(Object.entries(t).map(([e, t]) => [`--${e}`, t])) : void 0;
	return /* @__PURE__ */ a("div", {
		className: O === "scientific" ? "calculator calculator--scientific" : "calculator",
		style: F,
		role: "application",
		"aria-label": "Calculator",
		"aria-roledescription": "calculator",
		tabIndex: 0,
		onKeyDown: P,
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
					"aria-pressed": O === "scientific",
					onClick: M,
					"data-testid": "mode-toggle",
					children: O === "scientific" ? "Basic" : "Scientific"
				})
			}),
			/* @__PURE__ */ i(oe, {
				value: o,
				expression: l,
				mode: O,
				angleMode: f,
				parenDepth: p
			}),
			/* @__PURE__ */ i(ae, {
				mode: O,
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
				isSecondFunction: A,
				onScientificFunction: S,
				onToggleAngleMode: C,
				onSetAngleMode: w,
				onBackspace: x,
				onToggleSecondFunction: N,
				onConstant: T,
				onOpenParen: E,
				onCloseParen: D
			})
		]
	});
}
//#endregion
export { ce as Calculator };

//# sourceMappingURL=index.mjs.map