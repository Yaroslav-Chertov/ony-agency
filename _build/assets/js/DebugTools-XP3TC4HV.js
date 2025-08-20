import {
  wait_default
} from "./chunk-DPXBBVZY.js";
import "./chunk-5WRI5ZAA.js";

// node_modules/tweakpane/dist/tweakpane.js
function forceCast(v) {
  return v;
}
function isEmpty(value) {
  return value === null || value === void 0;
}
function isObject$1(value) {
  return value !== null && typeof value === "object";
}
function isRecord(value) {
  return value !== null && typeof value === "object";
}
function deepEqualsArray(a1, a2) {
  if (a1.length !== a2.length) {
    return false;
  }
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}
function deepMerge(r1, r2) {
  const keys = Array.from(/* @__PURE__ */ new Set([...Object.keys(r1), ...Object.keys(r2)]));
  return keys.reduce((result, key) => {
    const v1 = r1[key];
    const v2 = r2[key];
    return isRecord(v1) && isRecord(v2) ? Object.assign(Object.assign({}, result), { [key]: deepMerge(v1, v2) }) : Object.assign(Object.assign({}, result), { [key]: key in r2 ? v2 : v1 });
  }, {});
}
function isBinding(value) {
  if (!isObject$1(value)) {
    return false;
  }
  return "target" in value;
}
var CREATE_MESSAGE_MAP = {
  alreadydisposed: () => "View has been already disposed",
  invalidparams: (context) => `Invalid parameters for '${context.name}'`,
  nomatchingcontroller: (context) => `No matching controller for '${context.key}'`,
  nomatchingview: (context) => `No matching view for '${JSON.stringify(context.params)}'`,
  notbindable: () => `Value is not bindable`,
  notcompatible: (context) => `Not compatible with  plugin '${context.id}'`,
  propertynotfound: (context) => `Property '${context.name}' not found`,
  shouldneverhappen: () => "This error should never happen"
};
var TpError = class _TpError {
  static alreadyDisposed() {
    return new _TpError({ type: "alreadydisposed" });
  }
  static notBindable() {
    return new _TpError({
      type: "notbindable"
    });
  }
  static notCompatible(bundleId, id) {
    return new _TpError({
      type: "notcompatible",
      context: {
        id: `${bundleId}.${id}`
      }
    });
  }
  static propertyNotFound(name) {
    return new _TpError({
      type: "propertynotfound",
      context: {
        name
      }
    });
  }
  static shouldNeverHappen() {
    return new _TpError({ type: "shouldneverhappen" });
  }
  constructor(config) {
    var _a;
    this.message = (_a = CREATE_MESSAGE_MAP[config.type](forceCast(config.context))) !== null && _a !== void 0 ? _a : "Unexpected error";
    this.name = this.constructor.name;
    this.stack = new Error(this.message).stack;
    this.type = config.type;
  }
  toString() {
    return this.message;
  }
};
var BindingTarget = class _BindingTarget {
  constructor(obj, key) {
    this.obj_ = obj;
    this.key = key;
  }
  static isBindable(obj) {
    if (obj === null) {
      return false;
    }
    if (typeof obj !== "object" && typeof obj !== "function") {
      return false;
    }
    return true;
  }
  read() {
    return this.obj_[this.key];
  }
  write(value) {
    this.obj_[this.key] = value;
  }
  writeProperty(name, value) {
    const valueObj = this.read();
    if (!_BindingTarget.isBindable(valueObj)) {
      throw TpError.notBindable();
    }
    if (!(name in valueObj)) {
      throw TpError.propertyNotFound(name);
    }
    valueObj[name] = value;
  }
};
var Emitter = class {
  constructor() {
    this.observers_ = {};
  }
  on(eventName, handler, opt_options) {
    var _a;
    let observers = this.observers_[eventName];
    if (!observers) {
      observers = this.observers_[eventName] = [];
    }
    observers.push({
      handler,
      key: (_a = opt_options === null || opt_options === void 0 ? void 0 : opt_options.key) !== null && _a !== void 0 ? _a : handler
    });
    return this;
  }
  off(eventName, key) {
    const observers = this.observers_[eventName];
    if (observers) {
      this.observers_[eventName] = observers.filter((observer) => {
        return observer.key !== key;
      });
    }
    return this;
  }
  emit(eventName, event) {
    const observers = this.observers_[eventName];
    if (!observers) {
      return;
    }
    observers.forEach((observer) => {
      observer.handler(event);
    });
  }
};
var ComplexValue = class {
  constructor(initialValue, config) {
    var _a;
    this.constraint_ = config === null || config === void 0 ? void 0 : config.constraint;
    this.equals_ = (_a = config === null || config === void 0 ? void 0 : config.equals) !== null && _a !== void 0 ? _a : (v1, v2) => v1 === v2;
    this.emitter = new Emitter();
    this.rawValue_ = initialValue;
  }
  get constraint() {
    return this.constraint_;
  }
  get rawValue() {
    return this.rawValue_;
  }
  set rawValue(rawValue) {
    this.setRawValue(rawValue, {
      forceEmit: false,
      last: true
    });
  }
  setRawValue(rawValue, options) {
    const opts = options !== null && options !== void 0 ? options : {
      forceEmit: false,
      last: true
    };
    const constrainedValue = this.constraint_ ? this.constraint_.constrain(rawValue) : rawValue;
    const prevValue = this.rawValue_;
    const changed = !this.equals_(prevValue, constrainedValue);
    if (!changed && !opts.forceEmit) {
      return;
    }
    this.emitter.emit("beforechange", {
      sender: this
    });
    this.rawValue_ = constrainedValue;
    this.emitter.emit("change", {
      options: opts,
      previousRawValue: prevValue,
      rawValue: constrainedValue,
      sender: this
    });
  }
};
var PrimitiveValue = class {
  constructor(initialValue) {
    this.emitter = new Emitter();
    this.value_ = initialValue;
  }
  get rawValue() {
    return this.value_;
  }
  set rawValue(value) {
    this.setRawValue(value, {
      forceEmit: false,
      last: true
    });
  }
  setRawValue(value, options) {
    const opts = options !== null && options !== void 0 ? options : {
      forceEmit: false,
      last: true
    };
    const prevValue = this.value_;
    if (prevValue === value && !opts.forceEmit) {
      return;
    }
    this.emitter.emit("beforechange", {
      sender: this
    });
    this.value_ = value;
    this.emitter.emit("change", {
      options: opts,
      previousRawValue: prevValue,
      rawValue: this.value_,
      sender: this
    });
  }
};
var ReadonlyPrimitiveValue = class {
  constructor(value) {
    this.emitter = new Emitter();
    this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this);
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.value_ = value;
    this.value_.emitter.on("beforechange", this.onValueBeforeChange_);
    this.value_.emitter.on("change", this.onValueChange_);
  }
  get rawValue() {
    return this.value_.rawValue;
  }
  onValueBeforeChange_(ev) {
    this.emitter.emit("beforechange", Object.assign(Object.assign({}, ev), { sender: this }));
  }
  onValueChange_(ev) {
    this.emitter.emit("change", Object.assign(Object.assign({}, ev), { sender: this }));
  }
};
function createValue(initialValue, config) {
  const constraint = config === null || config === void 0 ? void 0 : config.constraint;
  const equals = config === null || config === void 0 ? void 0 : config.equals;
  if (!constraint && !equals) {
    return new PrimitiveValue(initialValue);
  }
  return new ComplexValue(initialValue, config);
}
function createReadonlyValue(value) {
  return [
    new ReadonlyPrimitiveValue(value),
    (rawValue, options) => {
      value.setRawValue(rawValue, options);
    }
  ];
}
var ValueMap = class _ValueMap {
  constructor(valueMap) {
    this.emitter = new Emitter();
    this.valMap_ = valueMap;
    for (const key in this.valMap_) {
      const v = this.valMap_[key];
      v.emitter.on("change", () => {
        this.emitter.emit("change", {
          key,
          sender: this
        });
      });
    }
  }
  static createCore(initialValue) {
    const keys = Object.keys(initialValue);
    return keys.reduce((o, key) => {
      return Object.assign(o, {
        [key]: createValue(initialValue[key])
      });
    }, {});
  }
  static fromObject(initialValue) {
    const core = this.createCore(initialValue);
    return new _ValueMap(core);
  }
  get(key) {
    return this.valMap_[key].rawValue;
  }
  set(key, value) {
    this.valMap_[key].rawValue = value;
  }
  value(key) {
    return this.valMap_[key];
  }
};
var DefiniteRangeConstraint = class {
  constructor(config) {
    this.values = ValueMap.fromObject({
      max: config.max,
      min: config.min
    });
  }
  constrain(value) {
    const max = this.values.get("max");
    const min = this.values.get("min");
    return Math.min(Math.max(value, min), max);
  }
};
var RangeConstraint = class {
  constructor(config) {
    this.values = ValueMap.fromObject({
      max: config.max,
      min: config.min
    });
  }
  constrain(value) {
    const max = this.values.get("max");
    const min = this.values.get("min");
    let result = value;
    if (!isEmpty(min)) {
      result = Math.max(result, min);
    }
    if (!isEmpty(max)) {
      result = Math.min(result, max);
    }
    return result;
  }
};
var StepConstraint = class {
  constructor(step, origin = 0) {
    this.step = step;
    this.origin = origin;
  }
  constrain(value) {
    const o = this.origin % this.step;
    const r = Math.round((value - o) / this.step);
    return o + r * this.step;
  }
};
var NumberLiteralNode = class {
  constructor(text) {
    this.text = text;
  }
  evaluate() {
    return Number(this.text);
  }
  toString() {
    return this.text;
  }
};
var BINARY_OPERATION_MAP = {
  "**": (v1, v2) => Math.pow(v1, v2),
  "*": (v1, v2) => v1 * v2,
  "/": (v1, v2) => v1 / v2,
  "%": (v1, v2) => v1 % v2,
  "+": (v1, v2) => v1 + v2,
  "-": (v1, v2) => v1 - v2,
  "<<": (v1, v2) => v1 << v2,
  ">>": (v1, v2) => v1 >> v2,
  ">>>": (v1, v2) => v1 >>> v2,
  "&": (v1, v2) => v1 & v2,
  "^": (v1, v2) => v1 ^ v2,
  "|": (v1, v2) => v1 | v2
};
var BinaryOperationNode = class {
  constructor(operator, left, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
  evaluate() {
    const op = BINARY_OPERATION_MAP[this.operator];
    if (!op) {
      throw new Error(`unexpected binary operator: '${this.operator}`);
    }
    return op(this.left.evaluate(), this.right.evaluate());
  }
  toString() {
    return [
      "b(",
      this.left.toString(),
      this.operator,
      this.right.toString(),
      ")"
    ].join(" ");
  }
};
var UNARY_OPERATION_MAP = {
  "+": (v) => v,
  "-": (v) => -v,
  "~": (v) => ~v
};
var UnaryOperationNode = class {
  constructor(operator, expr) {
    this.operator = operator;
    this.expression = expr;
  }
  evaluate() {
    const op = UNARY_OPERATION_MAP[this.operator];
    if (!op) {
      throw new Error(`unexpected unary operator: '${this.operator}`);
    }
    return op(this.expression.evaluate());
  }
  toString() {
    return ["u(", this.operator, this.expression.toString(), ")"].join(" ");
  }
};
function combineReader(parsers) {
  return (text, cursor) => {
    for (let i = 0; i < parsers.length; i++) {
      const result = parsers[i](text, cursor);
      if (result !== "") {
        return result;
      }
    }
    return "";
  };
}
function readWhitespace(text, cursor) {
  var _a;
  const m = text.substr(cursor).match(/^\s+/);
  return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
}
function readNonZeroDigit(text, cursor) {
  const ch = text.substr(cursor, 1);
  return ch.match(/^[1-9]$/) ? ch : "";
}
function readDecimalDigits(text, cursor) {
  var _a;
  const m = text.substr(cursor).match(/^[0-9]+/);
  return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
}
function readSignedInteger(text, cursor) {
  const ds = readDecimalDigits(text, cursor);
  if (ds !== "") {
    return ds;
  }
  const sign = text.substr(cursor, 1);
  cursor += 1;
  if (sign !== "-" && sign !== "+") {
    return "";
  }
  const sds = readDecimalDigits(text, cursor);
  if (sds === "") {
    return "";
  }
  return sign + sds;
}
function readExponentPart(text, cursor) {
  const e = text.substr(cursor, 1);
  cursor += 1;
  if (e.toLowerCase() !== "e") {
    return "";
  }
  const si = readSignedInteger(text, cursor);
  if (si === "") {
    return "";
  }
  return e + si;
}
function readDecimalIntegerLiteral(text, cursor) {
  const ch = text.substr(cursor, 1);
  if (ch === "0") {
    return ch;
  }
  const nzd = readNonZeroDigit(text, cursor);
  cursor += nzd.length;
  if (nzd === "") {
    return "";
  }
  return nzd + readDecimalDigits(text, cursor);
}
function readDecimalLiteral1(text, cursor) {
  const dil = readDecimalIntegerLiteral(text, cursor);
  cursor += dil.length;
  if (dil === "") {
    return "";
  }
  const dot = text.substr(cursor, 1);
  cursor += dot.length;
  if (dot !== ".") {
    return "";
  }
  const dds = readDecimalDigits(text, cursor);
  cursor += dds.length;
  return dil + dot + dds + readExponentPart(text, cursor);
}
function readDecimalLiteral2(text, cursor) {
  const dot = text.substr(cursor, 1);
  cursor += dot.length;
  if (dot !== ".") {
    return "";
  }
  const dds = readDecimalDigits(text, cursor);
  cursor += dds.length;
  if (dds === "") {
    return "";
  }
  return dot + dds + readExponentPart(text, cursor);
}
function readDecimalLiteral3(text, cursor) {
  const dil = readDecimalIntegerLiteral(text, cursor);
  cursor += dil.length;
  if (dil === "") {
    return "";
  }
  return dil + readExponentPart(text, cursor);
}
var readDecimalLiteral = combineReader([
  readDecimalLiteral1,
  readDecimalLiteral2,
  readDecimalLiteral3
]);
function parseBinaryDigits(text, cursor) {
  var _a;
  const m = text.substr(cursor).match(/^[01]+/);
  return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
}
function readBinaryIntegerLiteral(text, cursor) {
  const prefix = text.substr(cursor, 2);
  cursor += prefix.length;
  if (prefix.toLowerCase() !== "0b") {
    return "";
  }
  const bds = parseBinaryDigits(text, cursor);
  if (bds === "") {
    return "";
  }
  return prefix + bds;
}
function readOctalDigits(text, cursor) {
  var _a;
  const m = text.substr(cursor).match(/^[0-7]+/);
  return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
}
function readOctalIntegerLiteral(text, cursor) {
  const prefix = text.substr(cursor, 2);
  cursor += prefix.length;
  if (prefix.toLowerCase() !== "0o") {
    return "";
  }
  const ods = readOctalDigits(text, cursor);
  if (ods === "") {
    return "";
  }
  return prefix + ods;
}
function readHexDigits(text, cursor) {
  var _a;
  const m = text.substr(cursor).match(/^[0-9a-f]+/i);
  return (_a = m && m[0]) !== null && _a !== void 0 ? _a : "";
}
function readHexIntegerLiteral(text, cursor) {
  const prefix = text.substr(cursor, 2);
  cursor += prefix.length;
  if (prefix.toLowerCase() !== "0x") {
    return "";
  }
  const hds = readHexDigits(text, cursor);
  if (hds === "") {
    return "";
  }
  return prefix + hds;
}
var readNonDecimalIntegerLiteral = combineReader([
  readBinaryIntegerLiteral,
  readOctalIntegerLiteral,
  readHexIntegerLiteral
]);
var readNumericLiteral = combineReader([
  readNonDecimalIntegerLiteral,
  readDecimalLiteral
]);
function parseLiteral(text, cursor) {
  const num = readNumericLiteral(text, cursor);
  cursor += num.length;
  if (num === "") {
    return null;
  }
  return {
    evaluable: new NumberLiteralNode(num),
    cursor
  };
}
function parseParenthesizedExpression(text, cursor) {
  const op = text.substr(cursor, 1);
  cursor += op.length;
  if (op !== "(") {
    return null;
  }
  const expr = parseExpression(text, cursor);
  if (!expr) {
    return null;
  }
  cursor = expr.cursor;
  cursor += readWhitespace(text, cursor).length;
  const cl = text.substr(cursor, 1);
  cursor += cl.length;
  if (cl !== ")") {
    return null;
  }
  return {
    evaluable: expr.evaluable,
    cursor
  };
}
function parsePrimaryExpression(text, cursor) {
  var _a;
  return (_a = parseLiteral(text, cursor)) !== null && _a !== void 0 ? _a : parseParenthesizedExpression(text, cursor);
}
function parseUnaryExpression(text, cursor) {
  const expr = parsePrimaryExpression(text, cursor);
  if (expr) {
    return expr;
  }
  const op = text.substr(cursor, 1);
  cursor += op.length;
  if (op !== "+" && op !== "-" && op !== "~") {
    return null;
  }
  const num = parseUnaryExpression(text, cursor);
  if (!num) {
    return null;
  }
  cursor = num.cursor;
  return {
    cursor,
    evaluable: new UnaryOperationNode(op, num.evaluable)
  };
}
function readBinaryOperator(ops, text, cursor) {
  cursor += readWhitespace(text, cursor).length;
  const op = ops.filter((op2) => text.startsWith(op2, cursor))[0];
  if (!op) {
    return null;
  }
  cursor += op.length;
  cursor += readWhitespace(text, cursor).length;
  return {
    cursor,
    operator: op
  };
}
function createBinaryOperationExpressionParser(exprParser, ops) {
  return (text, cursor) => {
    const firstExpr = exprParser(text, cursor);
    if (!firstExpr) {
      return null;
    }
    cursor = firstExpr.cursor;
    let expr = firstExpr.evaluable;
    for (; ; ) {
      const op = readBinaryOperator(ops, text, cursor);
      if (!op) {
        break;
      }
      cursor = op.cursor;
      const nextExpr = exprParser(text, cursor);
      if (!nextExpr) {
        return null;
      }
      cursor = nextExpr.cursor;
      expr = new BinaryOperationNode(op.operator, expr, nextExpr.evaluable);
    }
    return expr ? {
      cursor,
      evaluable: expr
    } : null;
  };
}
var parseBinaryOperationExpression = [
  ["**"],
  ["*", "/", "%"],
  ["+", "-"],
  ["<<", ">>>", ">>"],
  ["&"],
  ["^"],
  ["|"]
].reduce((parser, ops) => {
  return createBinaryOperationExpressionParser(parser, ops);
}, parseUnaryExpression);
function parseExpression(text, cursor) {
  cursor += readWhitespace(text, cursor).length;
  return parseBinaryOperationExpression(text, cursor);
}
function parseEcmaNumberExpression(text) {
  const expr = parseExpression(text, 0);
  if (!expr) {
    return null;
  }
  const cursor = expr.cursor + readWhitespace(text, expr.cursor).length;
  if (cursor !== text.length) {
    return null;
  }
  return expr.evaluable;
}
function parseNumber(text) {
  var _a;
  const r = parseEcmaNumberExpression(text);
  return (_a = r === null || r === void 0 ? void 0 : r.evaluate()) !== null && _a !== void 0 ? _a : null;
}
function numberFromUnknown(value) {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    const pv = parseNumber(value);
    if (!isEmpty(pv)) {
      return pv;
    }
  }
  return 0;
}
function numberToString(value) {
  return String(value);
}
function createNumberFormatter(digits) {
  return (value) => {
    return value.toFixed(Math.max(Math.min(digits, 20), 0));
  };
}
function mapRange(value, start1, end1, start2, end2) {
  const p = (value - start1) / (end1 - start1);
  return start2 + p * (end2 - start2);
}
function getDecimalDigits(value) {
  const text = String(value.toFixed(10));
  const frac = text.split(".")[1];
  return frac.replace(/0+$/, "").length;
}
function constrainRange(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function loopRange(value, max) {
  return (value % max + max) % max;
}
function getSuitableDecimalDigits(params, rawValue) {
  return !isEmpty(params.step) ? getDecimalDigits(params.step) : Math.max(getDecimalDigits(rawValue), 2);
}
function getSuitableKeyScale(params) {
  var _a;
  return (_a = params.step) !== null && _a !== void 0 ? _a : 1;
}
function getSuitablePointerScale(params, rawValue) {
  var _a;
  const base = Math.abs((_a = params.step) !== null && _a !== void 0 ? _a : rawValue);
  return base === 0 ? 0.1 : Math.pow(10, Math.floor(Math.log10(base)) - 1);
}
function createStepConstraint(params, initialValue) {
  if (!isEmpty(params.step)) {
    return new StepConstraint(params.step, initialValue);
  }
  return null;
}
function createRangeConstraint(params) {
  if (!isEmpty(params.max) && !isEmpty(params.min)) {
    return new DefiniteRangeConstraint({
      max: params.max,
      min: params.min
    });
  }
  if (!isEmpty(params.max) || !isEmpty(params.min)) {
    return new RangeConstraint({
      max: params.max,
      min: params.min
    });
  }
  return null;
}
function createNumberTextPropsObject(params, initialValue) {
  var _a, _b, _c;
  return {
    formatter: (_a = params.format) !== null && _a !== void 0 ? _a : createNumberFormatter(getSuitableDecimalDigits(params, initialValue)),
    keyScale: (_b = params.keyScale) !== null && _b !== void 0 ? _b : getSuitableKeyScale(params),
    pointerScale: (_c = params.pointerScale) !== null && _c !== void 0 ? _c : getSuitablePointerScale(params, initialValue)
  };
}
function createNumberTextInputParamsParser(p) {
  return {
    format: p.optional.function,
    keyScale: p.optional.number,
    max: p.optional.number,
    min: p.optional.number,
    pointerScale: p.optional.number,
    step: p.optional.number
  };
}
function createPointAxis(config) {
  return {
    constraint: config.constraint,
    textProps: ValueMap.fromObject(createNumberTextPropsObject(config.params, config.initialValue))
  };
}
var BladeApi = class {
  constructor(controller) {
    this.controller = controller;
  }
  get element() {
    return this.controller.view.element;
  }
  get disabled() {
    return this.controller.viewProps.get("disabled");
  }
  set disabled(disabled) {
    this.controller.viewProps.set("disabled", disabled);
  }
  get hidden() {
    return this.controller.viewProps.get("hidden");
  }
  set hidden(hidden) {
    this.controller.viewProps.set("hidden", hidden);
  }
  dispose() {
    this.controller.viewProps.set("disposed", true);
  }
  importState(state) {
    return this.controller.importState(state);
  }
  exportState() {
    return this.controller.exportState();
  }
};
var TpEvent = class {
  constructor(target) {
    this.target = target;
  }
};
var TpChangeEvent = class extends TpEvent {
  constructor(target, value, last) {
    super(target);
    this.value = value;
    this.last = last !== null && last !== void 0 ? last : true;
  }
};
var TpFoldEvent = class extends TpEvent {
  constructor(target, expanded) {
    super(target);
    this.expanded = expanded;
  }
};
var TpTabSelectEvent = class extends TpEvent {
  constructor(target, index) {
    super(target);
    this.index = index;
  }
};
var TpMouseEvent = class extends TpEvent {
  constructor(target, nativeEvent) {
    super(target);
    this.native = nativeEvent;
  }
};
var BindingApi = class extends BladeApi {
  constructor(controller) {
    super(controller);
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.emitter_ = new Emitter();
    this.controller.value.emitter.on("change", this.onValueChange_);
  }
  get label() {
    return this.controller.labelController.props.get("label");
  }
  set label(label) {
    this.controller.labelController.props.set("label", label);
  }
  get key() {
    return this.controller.value.binding.target.key;
  }
  get tag() {
    return this.controller.tag;
  }
  set tag(tag) {
    this.controller.tag = tag;
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, (ev) => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
  refresh() {
    this.controller.value.fetch();
  }
  onValueChange_(ev) {
    const value = this.controller.value;
    this.emitter_.emit("change", new TpChangeEvent(this, forceCast(value.binding.target.read()), ev.options.last));
  }
};
var InputBindingValue = class {
  constructor(value, binding) {
    this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this);
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.binding = binding;
    this.value_ = value;
    this.value_.emitter.on("beforechange", this.onValueBeforeChange_);
    this.value_.emitter.on("change", this.onValueChange_);
    this.emitter = new Emitter();
  }
  get rawValue() {
    return this.value_.rawValue;
  }
  set rawValue(rawValue) {
    this.value_.rawValue = rawValue;
  }
  setRawValue(rawValue, options) {
    this.value_.setRawValue(rawValue, options);
  }
  fetch() {
    this.value_.rawValue = this.binding.read();
  }
  push() {
    this.binding.write(this.value_.rawValue);
  }
  onValueBeforeChange_(ev) {
    this.emitter.emit("beforechange", Object.assign(Object.assign({}, ev), { sender: this }));
  }
  onValueChange_(ev) {
    this.push();
    this.emitter.emit("change", Object.assign(Object.assign({}, ev), { sender: this }));
  }
};
function isInputBindingValue(v) {
  if (!("binding" in v)) {
    return false;
  }
  const b = v["binding"];
  return isBinding(b) && "read" in b && "write" in b;
}
function parseObject(value, keyToParserMap) {
  const keys = Object.keys(keyToParserMap);
  const result = keys.reduce((tmp, key) => {
    if (tmp === void 0) {
      return void 0;
    }
    const parser = keyToParserMap[key];
    const result2 = parser(value[key]);
    return result2.succeeded ? Object.assign(Object.assign({}, tmp), { [key]: result2.value }) : void 0;
  }, {});
  return forceCast(result);
}
function parseArray(value, parseItem) {
  return value.reduce((tmp, item) => {
    if (tmp === void 0) {
      return void 0;
    }
    const result = parseItem(item);
    if (!result.succeeded || result.value === void 0) {
      return void 0;
    }
    return [...tmp, result.value];
  }, []);
}
function isObject(value) {
  if (value === null) {
    return false;
  }
  return typeof value === "object";
}
function createMicroParserBuilder(parse) {
  return (optional) => (v) => {
    if (!optional && v === void 0) {
      return {
        succeeded: false,
        value: void 0
      };
    }
    if (optional && v === void 0) {
      return {
        succeeded: true,
        value: void 0
      };
    }
    const result = parse(v);
    return result !== void 0 ? {
      succeeded: true,
      value: result
    } : {
      succeeded: false,
      value: void 0
    };
  };
}
function createMicroParserBuilders(optional) {
  return {
    custom: (parse) => createMicroParserBuilder(parse)(optional),
    boolean: createMicroParserBuilder((v) => typeof v === "boolean" ? v : void 0)(optional),
    number: createMicroParserBuilder((v) => typeof v === "number" ? v : void 0)(optional),
    string: createMicroParserBuilder((v) => typeof v === "string" ? v : void 0)(optional),
    function: createMicroParserBuilder((v) => typeof v === "function" ? v : void 0)(optional),
    constant: (value) => createMicroParserBuilder((v) => v === value ? value : void 0)(optional),
    raw: createMicroParserBuilder((v) => v)(optional),
    object: (keyToParserMap) => createMicroParserBuilder((v) => {
      if (!isObject(v)) {
        return void 0;
      }
      return parseObject(v, keyToParserMap);
    })(optional),
    array: (itemParser) => createMicroParserBuilder((v) => {
      if (!Array.isArray(v)) {
        return void 0;
      }
      return parseArray(v, itemParser);
    })(optional)
  };
}
var MicroParsers = {
  optional: createMicroParserBuilders(true),
  required: createMicroParserBuilders(false)
};
function parseRecord(value, keyToParserMap) {
  const map = keyToParserMap(MicroParsers);
  const result = MicroParsers.required.object(map)(value);
  return result.succeeded ? result.value : void 0;
}
function importBladeState(state, superImport, parser, callback) {
  if (superImport && !superImport(state)) {
    return false;
  }
  const result = parseRecord(state, parser);
  return result ? callback(result) : false;
}
function exportBladeState(superExport, thisState) {
  var _a;
  return deepMerge((_a = superExport === null || superExport === void 0 ? void 0 : superExport()) !== null && _a !== void 0 ? _a : {}, thisState);
}
function isValueBladeController(bc) {
  return "value" in bc;
}
function isBindingValue(v) {
  if (!isObject$1(v) || !("binding" in v)) {
    return false;
  }
  const b = v.binding;
  return isBinding(b);
}
var SVG_NS = "http://www.w3.org/2000/svg";
function forceReflow(element) {
  element.offsetHeight;
}
function disableTransitionTemporarily(element, callback) {
  const t = element.style.transition;
  element.style.transition = "none";
  callback();
  element.style.transition = t;
}
function supportsTouch(doc) {
  return doc.ontouchstart !== void 0;
}
function getGlobalObject() {
  return globalThis;
}
function getWindowDocument() {
  const globalObj = forceCast(getGlobalObject());
  return globalObj.document;
}
function getCanvasContext(canvasElement) {
  const win = canvasElement.ownerDocument.defaultView;
  if (!win) {
    return null;
  }
  const isBrowser = "document" in win;
  return isBrowser ? canvasElement.getContext("2d", {
    willReadFrequently: true
  }) : null;
}
var ICON_ID_TO_INNER_HTML_MAP = {
  check: '<path d="M2 8l4 4l8 -8"/>',
  dropdown: '<path d="M5 7h6l-3 3 z"/>',
  p2dpad: '<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'
};
function createSvgIconElement(document2, iconId) {
  const elem = document2.createElementNS(SVG_NS, "svg");
  elem.innerHTML = ICON_ID_TO_INNER_HTML_MAP[iconId];
  return elem;
}
function insertElementAt(parentElement, element, index) {
  parentElement.insertBefore(element, parentElement.children[index]);
}
function removeElement(element) {
  if (element.parentElement) {
    element.parentElement.removeChild(element);
  }
}
function removeChildElements(element) {
  while (element.children.length > 0) {
    element.removeChild(element.children[0]);
  }
}
function removeChildNodes(element) {
  while (element.childNodes.length > 0) {
    element.removeChild(element.childNodes[0]);
  }
}
function findNextTarget(ev) {
  if (ev.relatedTarget) {
    return forceCast(ev.relatedTarget);
  }
  if ("explicitOriginalTarget" in ev) {
    return ev.explicitOriginalTarget;
  }
  return null;
}
function bindValue(value, applyValue) {
  value.emitter.on("change", (ev) => {
    applyValue(ev.rawValue);
  });
  applyValue(value.rawValue);
}
function bindValueMap(valueMap, key, applyValue) {
  bindValue(valueMap.value(key), applyValue);
}
var PREFIX = "tp";
function ClassName(viewName) {
  const fn = (opt_elementName, opt_modifier) => {
    return [
      PREFIX,
      "-",
      viewName,
      "v",
      opt_elementName ? `_${opt_elementName}` : "",
      opt_modifier ? `-${opt_modifier}` : ""
    ].join("");
  };
  return fn;
}
var cn$r = ClassName("lbl");
function createLabelNode(doc, label) {
  const frag = doc.createDocumentFragment();
  const lineNodes = label.split("\n").map((line) => {
    return doc.createTextNode(line);
  });
  lineNodes.forEach((lineNode, index) => {
    if (index > 0) {
      frag.appendChild(doc.createElement("br"));
    }
    frag.appendChild(lineNode);
  });
  return frag;
}
var LabelView = class {
  constructor(doc, config) {
    this.element = doc.createElement("div");
    this.element.classList.add(cn$r());
    config.viewProps.bindClassModifiers(this.element);
    const labelElem = doc.createElement("div");
    labelElem.classList.add(cn$r("l"));
    bindValueMap(config.props, "label", (value) => {
      if (isEmpty(value)) {
        this.element.classList.add(cn$r(void 0, "nol"));
      } else {
        this.element.classList.remove(cn$r(void 0, "nol"));
        removeChildNodes(labelElem);
        labelElem.appendChild(createLabelNode(doc, value));
      }
    });
    this.element.appendChild(labelElem);
    this.labelElement = labelElem;
    const valueElem = doc.createElement("div");
    valueElem.classList.add(cn$r("v"));
    this.element.appendChild(valueElem);
    this.valueElement = valueElem;
  }
};
var LabelController = class {
  constructor(doc, config) {
    this.props = config.props;
    this.valueController = config.valueController;
    this.viewProps = config.valueController.viewProps;
    this.view = new LabelView(doc, {
      props: config.props,
      viewProps: this.viewProps
    });
    this.view.valueElement.appendChild(this.valueController.view.element);
  }
  importProps(state) {
    return importBladeState(state, null, (p) => ({
      label: p.optional.string
    }), (result) => {
      this.props.set("label", result.label);
      return true;
    });
  }
  exportProps() {
    return exportBladeState(null, {
      label: this.props.get("label")
    });
  }
};
function getAllBladePositions() {
  return ["veryfirst", "first", "last", "verylast"];
}
var cn$q = ClassName("");
var POS_TO_CLASS_NAME_MAP = {
  veryfirst: "vfst",
  first: "fst",
  last: "lst",
  verylast: "vlst"
};
var BladeController = class {
  constructor(config) {
    this.parent_ = null;
    this.blade = config.blade;
    this.view = config.view;
    this.viewProps = config.viewProps;
    const elem = this.view.element;
    this.blade.value("positions").emitter.on("change", () => {
      getAllBladePositions().forEach((pos) => {
        elem.classList.remove(cn$q(void 0, POS_TO_CLASS_NAME_MAP[pos]));
      });
      this.blade.get("positions").forEach((pos) => {
        elem.classList.add(cn$q(void 0, POS_TO_CLASS_NAME_MAP[pos]));
      });
    });
    this.viewProps.handleDispose(() => {
      removeElement(elem);
    });
  }
  get parent() {
    return this.parent_;
  }
  set parent(parent) {
    this.parent_ = parent;
    this.viewProps.set("parent", this.parent_ ? this.parent_.viewProps : null);
  }
  importState(state) {
    return importBladeState(state, null, (p) => ({
      disabled: p.required.boolean,
      hidden: p.required.boolean
    }), (result) => {
      this.viewProps.importState(result);
      return true;
    });
  }
  exportState() {
    return exportBladeState(null, Object.assign({}, this.viewProps.exportState()));
  }
};
var LabeledValueBladeController = class extends BladeController {
  constructor(doc, config) {
    if (config.value !== config.valueController.value) {
      throw TpError.shouldNeverHappen();
    }
    const viewProps = config.valueController.viewProps;
    const lc = new LabelController(doc, {
      blade: config.blade,
      props: config.props,
      valueController: config.valueController
    });
    super(Object.assign(Object.assign({}, config), { view: new LabelView(doc, {
      props: config.props,
      viewProps
    }), viewProps }));
    this.labelController = lc;
    this.value = config.value;
    this.valueController = config.valueController;
    this.view.valueElement.appendChild(this.valueController.view.element);
  }
  importState(state) {
    return importBladeState(state, (s) => {
      var _a, _b, _c;
      return super.importState(s) && this.labelController.importProps(s) && ((_c = (_b = (_a = this.valueController).importProps) === null || _b === void 0 ? void 0 : _b.call(_a, state)) !== null && _c !== void 0 ? _c : true);
    }, (p) => ({
      value: p.optional.raw
    }), (result) => {
      if (result.value) {
        this.value.rawValue = result.value;
      }
      return true;
    });
  }
  exportState() {
    var _a, _b, _c;
    return exportBladeState(() => super.exportState(), Object.assign(Object.assign({ value: this.value.rawValue }, this.labelController.exportProps()), (_c = (_b = (_a = this.valueController).exportProps) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : {}));
  }
};
function excludeValue(state) {
  const result = Object.assign({}, state);
  delete result.value;
  return result;
}
var BindingController = class extends LabeledValueBladeController {
  constructor(doc, config) {
    super(doc, config);
    this.tag = config.tag;
  }
  importState(state) {
    return importBladeState(
      state,
      (_s) => super.importState(excludeValue(state)),
      (p) => ({
        tag: p.optional.string
      }),
      (result) => {
        this.tag = result.tag;
        return true;
      }
    );
  }
  exportState() {
    return exportBladeState(() => excludeValue(super.exportState()), {
      binding: {
        key: this.value.binding.target.key,
        value: this.value.binding.target.read()
      },
      tag: this.tag
    });
  }
};
function isBindingController(bc) {
  return isValueBladeController(bc) && isBindingValue(bc.value);
}
var InputBindingController = class extends BindingController {
  importState(state) {
    return importBladeState(state, (s) => super.importState(s), (p) => ({
      binding: p.required.object({
        value: p.required.raw
      })
    }), (result) => {
      this.value.binding.inject(result.binding.value);
      this.value.fetch();
      return true;
    });
  }
};
function isInputBindingController(bc) {
  return isValueBladeController(bc) && isInputBindingValue(bc.value);
}
function fillBuffer(buffer, bufferSize) {
  while (buffer.length < bufferSize) {
    buffer.push(void 0);
  }
}
function initializeBuffer(bufferSize) {
  const buffer = [];
  fillBuffer(buffer, bufferSize);
  return buffer;
}
function createTrimmedBuffer(buffer) {
  const index = buffer.indexOf(void 0);
  return forceCast(index < 0 ? buffer : buffer.slice(0, index));
}
function createPushedBuffer(buffer, newValue) {
  const newBuffer = [...createTrimmedBuffer(buffer), newValue];
  if (newBuffer.length > buffer.length) {
    newBuffer.splice(0, newBuffer.length - buffer.length);
  } else {
    fillBuffer(newBuffer, buffer.length);
  }
  return newBuffer;
}
var MonitorBindingValue = class {
  constructor(config) {
    this.emitter = new Emitter();
    this.onTick_ = this.onTick_.bind(this);
    this.onValueBeforeChange_ = this.onValueBeforeChange_.bind(this);
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.binding = config.binding;
    this.value_ = createValue(initializeBuffer(config.bufferSize));
    this.value_.emitter.on("beforechange", this.onValueBeforeChange_);
    this.value_.emitter.on("change", this.onValueChange_);
    this.ticker = config.ticker;
    this.ticker.emitter.on("tick", this.onTick_);
    this.fetch();
  }
  get rawValue() {
    return this.value_.rawValue;
  }
  set rawValue(rawValue) {
    this.value_.rawValue = rawValue;
  }
  setRawValue(rawValue, options) {
    this.value_.setRawValue(rawValue, options);
  }
  fetch() {
    this.value_.rawValue = createPushedBuffer(this.value_.rawValue, this.binding.read());
  }
  onTick_() {
    this.fetch();
  }
  onValueBeforeChange_(ev) {
    this.emitter.emit("beforechange", Object.assign(Object.assign({}, ev), { sender: this }));
  }
  onValueChange_(ev) {
    this.emitter.emit("change", Object.assign(Object.assign({}, ev), { sender: this }));
  }
};
function isMonitorBindingValue(v) {
  if (!("binding" in v)) {
    return false;
  }
  const b = v["binding"];
  return isBinding(b) && "read" in b && !("write" in b);
}
var MonitorBindingController = class extends BindingController {
  exportState() {
    return exportBladeState(() => super.exportState(), {
      binding: {
        readonly: true
      }
    });
  }
};
function isMonitorBindingController(bc) {
  return isValueBladeController(bc) && isMonitorBindingValue(bc.value);
}
var ButtonApi = class extends BladeApi {
  get label() {
    return this.controller.labelController.props.get("label");
  }
  set label(label) {
    this.controller.labelController.props.set("label", label);
  }
  get title() {
    var _a;
    return (_a = this.controller.buttonController.props.get("title")) !== null && _a !== void 0 ? _a : "";
  }
  set title(title) {
    this.controller.buttonController.props.set("title", title);
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    const emitter = this.controller.buttonController.emitter;
    emitter.on(eventName, (ev) => {
      bh(new TpMouseEvent(this, ev.nativeEvent));
    });
    return this;
  }
  off(eventName, handler) {
    const emitter = this.controller.buttonController.emitter;
    emitter.off(eventName, handler);
    return this;
  }
};
function applyClass(elem, className, active) {
  if (active) {
    elem.classList.add(className);
  } else {
    elem.classList.remove(className);
  }
}
function valueToClassName(elem, className) {
  return (value) => {
    applyClass(elem, className, value);
  };
}
function bindValueToTextContent(value, elem) {
  bindValue(value, (text) => {
    elem.textContent = text !== null && text !== void 0 ? text : "";
  });
}
var cn$p = ClassName("btn");
var ButtonView = class {
  constructor(doc, config) {
    this.element = doc.createElement("div");
    this.element.classList.add(cn$p());
    config.viewProps.bindClassModifiers(this.element);
    const buttonElem = doc.createElement("button");
    buttonElem.classList.add(cn$p("b"));
    config.viewProps.bindDisabled(buttonElem);
    this.element.appendChild(buttonElem);
    this.buttonElement = buttonElem;
    const titleElem = doc.createElement("div");
    titleElem.classList.add(cn$p("t"));
    bindValueToTextContent(config.props.value("title"), titleElem);
    this.buttonElement.appendChild(titleElem);
  }
};
var ButtonController = class {
  constructor(doc, config) {
    this.emitter = new Emitter();
    this.onClick_ = this.onClick_.bind(this);
    this.props = config.props;
    this.viewProps = config.viewProps;
    this.view = new ButtonView(doc, {
      props: this.props,
      viewProps: this.viewProps
    });
    this.view.buttonElement.addEventListener("click", this.onClick_);
  }
  importProps(state) {
    return importBladeState(state, null, (p) => ({
      title: p.optional.string
    }), (result) => {
      this.props.set("title", result.title);
      return true;
    });
  }
  exportProps() {
    return exportBladeState(null, {
      title: this.props.get("title")
    });
  }
  onClick_(ev) {
    this.emitter.emit("click", {
      nativeEvent: ev,
      sender: this
    });
  }
};
var ButtonBladeController = class extends BladeController {
  constructor(doc, config) {
    const bc = new ButtonController(doc, {
      props: config.buttonProps,
      viewProps: config.viewProps
    });
    const lc = new LabelController(doc, {
      blade: config.blade,
      props: config.labelProps,
      valueController: bc
    });
    super({
      blade: config.blade,
      view: lc.view,
      viewProps: config.viewProps
    });
    this.buttonController = bc;
    this.labelController = lc;
  }
  importState(state) {
    return importBladeState(state, (s) => super.importState(s) && this.buttonController.importProps(s) && this.labelController.importProps(s), () => ({}), () => true);
  }
  exportState() {
    return exportBladeState(() => super.exportState(), Object.assign(Object.assign({}, this.buttonController.exportProps()), this.labelController.exportProps()));
  }
};
var Semver = class {
  constructor(text) {
    const [core, prerelease] = text.split("-");
    const coreComps = core.split(".");
    this.major = parseInt(coreComps[0], 10);
    this.minor = parseInt(coreComps[1], 10);
    this.patch = parseInt(coreComps[2], 10);
    this.prerelease = prerelease !== null && prerelease !== void 0 ? prerelease : null;
  }
  toString() {
    const core = [this.major, this.minor, this.patch].join(".");
    return this.prerelease !== null ? [core, this.prerelease].join("-") : core;
  }
};
var VERSION$1 = new Semver("2.0.5");
function createPlugin(plugin) {
  return Object.assign({ core: VERSION$1 }, plugin);
}
var ButtonBladePlugin = createPlugin({
  id: "button",
  type: "blade",
  accept(params) {
    const result = parseRecord(params, (p) => ({
      title: p.required.string,
      view: p.required.constant("button"),
      label: p.optional.string
    }));
    return result ? { params: result } : null;
  },
  controller(args) {
    return new ButtonBladeController(args.document, {
      blade: args.blade,
      buttonProps: ValueMap.fromObject({
        title: args.params.title
      }),
      labelProps: ValueMap.fromObject({
        label: args.params.label
      }),
      viewProps: args.viewProps
    });
  },
  api(args) {
    if (args.controller instanceof ButtonBladeController) {
      return new ButtonApi(args.controller);
    }
    return null;
  }
});
function addButtonAsBlade(api, params) {
  return api.addBlade(Object.assign(Object.assign({}, params), { view: "button" }));
}
function addFolderAsBlade(api, params) {
  return api.addBlade(Object.assign(Object.assign({}, params), { view: "folder" }));
}
function addTabAsBlade(api, params) {
  return api.addBlade(Object.assign(Object.assign({}, params), { view: "tab" }));
}
function isRefreshable(value) {
  if (!isObject$1(value)) {
    return false;
  }
  return "refresh" in value && typeof value.refresh === "function";
}
function createBindingTarget(obj, key) {
  if (!BindingTarget.isBindable(obj)) {
    throw TpError.notBindable();
  }
  return new BindingTarget(obj, key);
}
var RackApi = class {
  constructor(controller, pool) {
    this.onRackValueChange_ = this.onRackValueChange_.bind(this);
    this.controller_ = controller;
    this.emitter_ = new Emitter();
    this.pool_ = pool;
    const rack = this.controller_.rack;
    rack.emitter.on("valuechange", this.onRackValueChange_);
  }
  get children() {
    return this.controller_.rack.children.map((bc) => this.pool_.createApi(bc));
  }
  addBinding(object, key, opt_params) {
    const params = opt_params !== null && opt_params !== void 0 ? opt_params : {};
    const doc = this.controller_.element.ownerDocument;
    const bc = this.pool_.createBinding(doc, createBindingTarget(object, key), params);
    const api = this.pool_.createBindingApi(bc);
    return this.add(api, params.index);
  }
  addFolder(params) {
    return addFolderAsBlade(this, params);
  }
  addButton(params) {
    return addButtonAsBlade(this, params);
  }
  addTab(params) {
    return addTabAsBlade(this, params);
  }
  add(api, opt_index) {
    const bc = api.controller;
    this.controller_.rack.add(bc, opt_index);
    return api;
  }
  remove(api) {
    this.controller_.rack.remove(api.controller);
  }
  addBlade(params) {
    const doc = this.controller_.element.ownerDocument;
    const bc = this.pool_.createBlade(doc, params);
    const api = this.pool_.createApi(bc);
    return this.add(api, params.index);
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, (ev) => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
  refresh() {
    this.children.forEach((c) => {
      if (isRefreshable(c)) {
        c.refresh();
      }
    });
  }
  onRackValueChange_(ev) {
    const bc = ev.bladeController;
    const api = this.pool_.createApi(bc);
    const binding = isBindingValue(bc.value) ? bc.value.binding : null;
    this.emitter_.emit("change", new TpChangeEvent(api, binding ? binding.target.read() : bc.value.rawValue, ev.options.last));
  }
};
var ContainerBladeApi = class extends BladeApi {
  constructor(controller, pool) {
    super(controller);
    this.rackApi_ = new RackApi(controller.rackController, pool);
  }
  refresh() {
    this.rackApi_.refresh();
  }
};
var ContainerBladeController = class extends BladeController {
  constructor(config) {
    super({
      blade: config.blade,
      view: config.view,
      viewProps: config.rackController.viewProps
    });
    this.rackController = config.rackController;
  }
  importState(state) {
    return importBladeState(state, (s) => super.importState(s), (p) => ({
      children: p.required.array(p.required.raw)
    }), (result) => {
      return this.rackController.rack.children.every((c, index) => {
        return c.importState(result.children[index]);
      });
    });
  }
  exportState() {
    return exportBladeState(() => super.exportState(), {
      children: this.rackController.rack.children.map((c) => c.exportState())
    });
  }
};
function isContainerBladeController(bc) {
  return "rackController" in bc;
}
var NestedOrderedSet = class {
  constructor(extract) {
    this.emitter = new Emitter();
    this.items_ = [];
    this.cache_ = /* @__PURE__ */ new Set();
    this.onSubListAdd_ = this.onSubListAdd_.bind(this);
    this.onSubListRemove_ = this.onSubListRemove_.bind(this);
    this.extract_ = extract;
  }
  get items() {
    return this.items_;
  }
  allItems() {
    return Array.from(this.cache_);
  }
  find(callback) {
    for (const item of this.allItems()) {
      if (callback(item)) {
        return item;
      }
    }
    return null;
  }
  includes(item) {
    return this.cache_.has(item);
  }
  add(item, opt_index) {
    if (this.includes(item)) {
      throw TpError.shouldNeverHappen();
    }
    const index = opt_index !== void 0 ? opt_index : this.items_.length;
    this.items_.splice(index, 0, item);
    this.cache_.add(item);
    const subList = this.extract_(item);
    if (subList) {
      subList.emitter.on("add", this.onSubListAdd_);
      subList.emitter.on("remove", this.onSubListRemove_);
      subList.allItems().forEach((i) => {
        this.cache_.add(i);
      });
    }
    this.emitter.emit("add", {
      index,
      item,
      root: this,
      target: this
    });
  }
  remove(item) {
    const index = this.items_.indexOf(item);
    if (index < 0) {
      return;
    }
    this.items_.splice(index, 1);
    this.cache_.delete(item);
    const subList = this.extract_(item);
    if (subList) {
      subList.allItems().forEach((i) => {
        this.cache_.delete(i);
      });
      subList.emitter.off("add", this.onSubListAdd_);
      subList.emitter.off("remove", this.onSubListRemove_);
    }
    this.emitter.emit("remove", {
      index,
      item,
      root: this,
      target: this
    });
  }
  onSubListAdd_(ev) {
    this.cache_.add(ev.item);
    this.emitter.emit("add", {
      index: ev.index,
      item: ev.item,
      root: this,
      target: ev.target
    });
  }
  onSubListRemove_(ev) {
    this.cache_.delete(ev.item);
    this.emitter.emit("remove", {
      index: ev.index,
      item: ev.item,
      root: this,
      target: ev.target
    });
  }
};
function findValueBladeController(bcs, v) {
  for (let i = 0; i < bcs.length; i++) {
    const bc = bcs[i];
    if (isValueBladeController(bc) && bc.value === v) {
      return bc;
    }
  }
  return null;
}
function findSubBladeControllerSet(bc) {
  return isContainerBladeController(bc) ? bc.rackController.rack["bcSet_"] : null;
}
var Rack = class {
  constructor(config) {
    var _a, _b;
    this.emitter = new Emitter();
    this.onBladePositionsChange_ = this.onBladePositionsChange_.bind(this);
    this.onSetAdd_ = this.onSetAdd_.bind(this);
    this.onSetRemove_ = this.onSetRemove_.bind(this);
    this.onChildDispose_ = this.onChildDispose_.bind(this);
    this.onChildPositionsChange_ = this.onChildPositionsChange_.bind(this);
    this.onChildValueChange_ = this.onChildValueChange_.bind(this);
    this.onChildViewPropsChange_ = this.onChildViewPropsChange_.bind(this);
    this.onRackLayout_ = this.onRackLayout_.bind(this);
    this.onRackValueChange_ = this.onRackValueChange_.bind(this);
    this.blade_ = (_a = config.blade) !== null && _a !== void 0 ? _a : null;
    (_b = this.blade_) === null || _b === void 0 ? void 0 : _b.value("positions").emitter.on("change", this.onBladePositionsChange_);
    this.viewProps = config.viewProps;
    this.bcSet_ = new NestedOrderedSet(findSubBladeControllerSet);
    this.bcSet_.emitter.on("add", this.onSetAdd_);
    this.bcSet_.emitter.on("remove", this.onSetRemove_);
  }
  get children() {
    return this.bcSet_.items;
  }
  add(bc, opt_index) {
    var _a;
    (_a = bc.parent) === null || _a === void 0 ? void 0 : _a.remove(bc);
    bc.parent = this;
    this.bcSet_.add(bc, opt_index);
  }
  remove(bc) {
    bc.parent = null;
    this.bcSet_.remove(bc);
  }
  find(finder) {
    return this.bcSet_.allItems().filter(finder);
  }
  onSetAdd_(ev) {
    this.updatePositions_();
    const root = ev.target === ev.root;
    this.emitter.emit("add", {
      bladeController: ev.item,
      index: ev.index,
      root,
      sender: this
    });
    if (!root) {
      return;
    }
    const bc = ev.item;
    bc.viewProps.emitter.on("change", this.onChildViewPropsChange_);
    bc.blade.value("positions").emitter.on("change", this.onChildPositionsChange_);
    bc.viewProps.handleDispose(this.onChildDispose_);
    if (isValueBladeController(bc)) {
      bc.value.emitter.on("change", this.onChildValueChange_);
    } else if (isContainerBladeController(bc)) {
      const rack = bc.rackController.rack;
      if (rack) {
        const emitter = rack.emitter;
        emitter.on("layout", this.onRackLayout_);
        emitter.on("valuechange", this.onRackValueChange_);
      }
    }
  }
  onSetRemove_(ev) {
    this.updatePositions_();
    const root = ev.target === ev.root;
    this.emitter.emit("remove", {
      bladeController: ev.item,
      root,
      sender: this
    });
    if (!root) {
      return;
    }
    const bc = ev.item;
    if (isValueBladeController(bc)) {
      bc.value.emitter.off("change", this.onChildValueChange_);
    } else if (isContainerBladeController(bc)) {
      const rack = bc.rackController.rack;
      if (rack) {
        const emitter = rack.emitter;
        emitter.off("layout", this.onRackLayout_);
        emitter.off("valuechange", this.onRackValueChange_);
      }
    }
  }
  updatePositions_() {
    const visibleItems = this.bcSet_.items.filter((bc) => !bc.viewProps.get("hidden"));
    const firstVisibleItem = visibleItems[0];
    const lastVisibleItem = visibleItems[visibleItems.length - 1];
    this.bcSet_.items.forEach((bc) => {
      const ps = [];
      if (bc === firstVisibleItem) {
        ps.push("first");
        if (!this.blade_ || this.blade_.get("positions").includes("veryfirst")) {
          ps.push("veryfirst");
        }
      }
      if (bc === lastVisibleItem) {
        ps.push("last");
        if (!this.blade_ || this.blade_.get("positions").includes("verylast")) {
          ps.push("verylast");
        }
      }
      bc.blade.set("positions", ps);
    });
  }
  onChildPositionsChange_() {
    this.updatePositions_();
    this.emitter.emit("layout", {
      sender: this
    });
  }
  onChildViewPropsChange_(_ev) {
    this.updatePositions_();
    this.emitter.emit("layout", {
      sender: this
    });
  }
  onChildDispose_() {
    const disposedUcs = this.bcSet_.items.filter((bc) => {
      return bc.viewProps.get("disposed");
    });
    disposedUcs.forEach((bc) => {
      this.bcSet_.remove(bc);
    });
  }
  onChildValueChange_(ev) {
    const bc = findValueBladeController(this.find(isValueBladeController), ev.sender);
    if (!bc) {
      throw TpError.alreadyDisposed();
    }
    this.emitter.emit("valuechange", {
      bladeController: bc,
      options: ev.options,
      sender: this
    });
  }
  onRackLayout_(_) {
    this.updatePositions_();
    this.emitter.emit("layout", {
      sender: this
    });
  }
  onRackValueChange_(ev) {
    this.emitter.emit("valuechange", {
      bladeController: ev.bladeController,
      options: ev.options,
      sender: this
    });
  }
  onBladePositionsChange_() {
    this.updatePositions_();
  }
};
var RackController = class {
  constructor(config) {
    this.onRackAdd_ = this.onRackAdd_.bind(this);
    this.onRackRemove_ = this.onRackRemove_.bind(this);
    this.element = config.element;
    this.viewProps = config.viewProps;
    const rack = new Rack({
      blade: config.root ? void 0 : config.blade,
      viewProps: config.viewProps
    });
    rack.emitter.on("add", this.onRackAdd_);
    rack.emitter.on("remove", this.onRackRemove_);
    this.rack = rack;
    this.viewProps.handleDispose(() => {
      for (let i = this.rack.children.length - 1; i >= 0; i--) {
        const bc = this.rack.children[i];
        bc.viewProps.set("disposed", true);
      }
    });
  }
  onRackAdd_(ev) {
    if (!ev.root) {
      return;
    }
    insertElementAt(this.element, ev.bladeController.view.element, ev.index);
  }
  onRackRemove_(ev) {
    if (!ev.root) {
      return;
    }
    removeElement(ev.bladeController.view.element);
  }
};
function createBlade() {
  return new ValueMap({
    positions: createValue([], {
      equals: deepEqualsArray
    })
  });
}
var Foldable = class _Foldable extends ValueMap {
  constructor(valueMap) {
    super(valueMap);
  }
  static create(expanded) {
    const coreObj = {
      completed: true,
      expanded,
      expandedHeight: null,
      shouldFixHeight: false,
      temporaryExpanded: null
    };
    const core = ValueMap.createCore(coreObj);
    return new _Foldable(core);
  }
  get styleExpanded() {
    var _a;
    return (_a = this.get("temporaryExpanded")) !== null && _a !== void 0 ? _a : this.get("expanded");
  }
  get styleHeight() {
    if (!this.styleExpanded) {
      return "0";
    }
    const exHeight = this.get("expandedHeight");
    if (this.get("shouldFixHeight") && !isEmpty(exHeight)) {
      return `${exHeight}px`;
    }
    return "auto";
  }
  bindExpandedClass(elem, expandedClassName) {
    const onExpand = () => {
      const expanded = this.styleExpanded;
      if (expanded) {
        elem.classList.add(expandedClassName);
      } else {
        elem.classList.remove(expandedClassName);
      }
    };
    bindValueMap(this, "expanded", onExpand);
    bindValueMap(this, "temporaryExpanded", onExpand);
  }
  cleanUpTransition() {
    this.set("shouldFixHeight", false);
    this.set("expandedHeight", null);
    this.set("completed", true);
  }
};
function computeExpandedFolderHeight(folder, containerElement) {
  let height = 0;
  disableTransitionTemporarily(containerElement, () => {
    folder.set("expandedHeight", null);
    folder.set("temporaryExpanded", true);
    forceReflow(containerElement);
    height = containerElement.clientHeight;
    folder.set("temporaryExpanded", null);
    forceReflow(containerElement);
  });
  return height;
}
function applyHeight(foldable, elem) {
  elem.style.height = foldable.styleHeight;
}
function bindFoldable(foldable, elem) {
  foldable.value("expanded").emitter.on("beforechange", () => {
    foldable.set("completed", false);
    if (isEmpty(foldable.get("expandedHeight"))) {
      const h = computeExpandedFolderHeight(foldable, elem);
      if (h > 0) {
        foldable.set("expandedHeight", h);
      }
    }
    foldable.set("shouldFixHeight", true);
    forceReflow(elem);
  });
  foldable.emitter.on("change", () => {
    applyHeight(foldable, elem);
  });
  applyHeight(foldable, elem);
  elem.addEventListener("transitionend", (ev) => {
    if (ev.propertyName !== "height") {
      return;
    }
    foldable.cleanUpTransition();
  });
}
var FolderApi = class extends ContainerBladeApi {
  constructor(controller, pool) {
    super(controller, pool);
    this.emitter_ = new Emitter();
    this.controller.foldable.value("expanded").emitter.on("change", (ev) => {
      this.emitter_.emit("fold", new TpFoldEvent(this, ev.sender.rawValue));
    });
    this.rackApi_.on("change", (ev) => {
      this.emitter_.emit("change", ev);
    });
  }
  get expanded() {
    return this.controller.foldable.get("expanded");
  }
  set expanded(expanded) {
    this.controller.foldable.set("expanded", expanded);
  }
  get title() {
    return this.controller.props.get("title");
  }
  set title(title) {
    this.controller.props.set("title", title);
  }
  get children() {
    return this.rackApi_.children;
  }
  addBinding(object, key, opt_params) {
    return this.rackApi_.addBinding(object, key, opt_params);
  }
  addFolder(params) {
    return this.rackApi_.addFolder(params);
  }
  addButton(params) {
    return this.rackApi_.addButton(params);
  }
  addTab(params) {
    return this.rackApi_.addTab(params);
  }
  add(api, opt_index) {
    return this.rackApi_.add(api, opt_index);
  }
  remove(api) {
    this.rackApi_.remove(api);
  }
  addBlade(params) {
    return this.rackApi_.addBlade(params);
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, (ev) => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
};
var bladeContainerClassName = ClassName("cnt");
var FolderView = class {
  constructor(doc, config) {
    var _a;
    this.className_ = ClassName((_a = config.viewName) !== null && _a !== void 0 ? _a : "fld");
    this.element = doc.createElement("div");
    this.element.classList.add(this.className_(), bladeContainerClassName());
    config.viewProps.bindClassModifiers(this.element);
    this.foldable_ = config.foldable;
    this.foldable_.bindExpandedClass(this.element, this.className_(void 0, "expanded"));
    bindValueMap(this.foldable_, "completed", valueToClassName(this.element, this.className_(void 0, "cpl")));
    const buttonElem = doc.createElement("button");
    buttonElem.classList.add(this.className_("b"));
    bindValueMap(config.props, "title", (title) => {
      if (isEmpty(title)) {
        this.element.classList.add(this.className_(void 0, "not"));
      } else {
        this.element.classList.remove(this.className_(void 0, "not"));
      }
    });
    config.viewProps.bindDisabled(buttonElem);
    this.element.appendChild(buttonElem);
    this.buttonElement = buttonElem;
    const indentElem = doc.createElement("div");
    indentElem.classList.add(this.className_("i"));
    this.element.appendChild(indentElem);
    const titleElem = doc.createElement("div");
    titleElem.classList.add(this.className_("t"));
    bindValueToTextContent(config.props.value("title"), titleElem);
    this.buttonElement.appendChild(titleElem);
    this.titleElement = titleElem;
    const markElem = doc.createElement("div");
    markElem.classList.add(this.className_("m"));
    this.buttonElement.appendChild(markElem);
    const containerElem = doc.createElement("div");
    containerElem.classList.add(this.className_("c"));
    this.element.appendChild(containerElem);
    this.containerElement = containerElem;
  }
};
var FolderController = class extends ContainerBladeController {
  constructor(doc, config) {
    var _a;
    const foldable = Foldable.create((_a = config.expanded) !== null && _a !== void 0 ? _a : true);
    const view = new FolderView(doc, {
      foldable,
      props: config.props,
      viewName: config.root ? "rot" : void 0,
      viewProps: config.viewProps
    });
    super(Object.assign(Object.assign({}, config), { rackController: new RackController({
      blade: config.blade,
      element: view.containerElement,
      root: config.root,
      viewProps: config.viewProps
    }), view }));
    this.onTitleClick_ = this.onTitleClick_.bind(this);
    this.props = config.props;
    this.foldable = foldable;
    bindFoldable(this.foldable, this.view.containerElement);
    this.rackController.rack.emitter.on("add", () => {
      this.foldable.cleanUpTransition();
    });
    this.rackController.rack.emitter.on("remove", () => {
      this.foldable.cleanUpTransition();
    });
    this.view.buttonElement.addEventListener("click", this.onTitleClick_);
  }
  get document() {
    return this.view.element.ownerDocument;
  }
  importState(state) {
    return importBladeState(state, (s) => super.importState(s), (p) => ({
      expanded: p.required.boolean,
      title: p.optional.string
    }), (result) => {
      this.foldable.set("expanded", result.expanded);
      this.props.set("title", result.title);
      return true;
    });
  }
  exportState() {
    return exportBladeState(() => super.exportState(), {
      expanded: this.foldable.get("expanded"),
      title: this.props.get("title")
    });
  }
  onTitleClick_() {
    this.foldable.set("expanded", !this.foldable.get("expanded"));
  }
};
var FolderBladePlugin = createPlugin({
  id: "folder",
  type: "blade",
  accept(params) {
    const result = parseRecord(params, (p) => ({
      title: p.required.string,
      view: p.required.constant("folder"),
      expanded: p.optional.boolean
    }));
    return result ? { params: result } : null;
  },
  controller(args) {
    return new FolderController(args.document, {
      blade: args.blade,
      expanded: args.params.expanded,
      props: ValueMap.fromObject({
        title: args.params.title
      }),
      viewProps: args.viewProps
    });
  },
  api(args) {
    if (!(args.controller instanceof FolderController)) {
      return null;
    }
    return new FolderApi(args.controller, args.pool);
  }
});
var cn$o = ClassName("");
function valueToModifier(elem, modifier) {
  return valueToClassName(elem, cn$o(void 0, modifier));
}
var ViewProps = class _ViewProps extends ValueMap {
  constructor(valueMap) {
    var _a;
    super(valueMap);
    this.onDisabledChange_ = this.onDisabledChange_.bind(this);
    this.onParentChange_ = this.onParentChange_.bind(this);
    this.onParentGlobalDisabledChange_ = this.onParentGlobalDisabledChange_.bind(this);
    [this.globalDisabled_, this.setGlobalDisabled_] = createReadonlyValue(createValue(this.getGlobalDisabled_()));
    this.value("disabled").emitter.on("change", this.onDisabledChange_);
    this.value("parent").emitter.on("change", this.onParentChange_);
    (_a = this.get("parent")) === null || _a === void 0 ? void 0 : _a.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
  }
  static create(opt_initialValue) {
    var _a, _b, _c;
    const initialValue = opt_initialValue !== null && opt_initialValue !== void 0 ? opt_initialValue : {};
    return new _ViewProps(ValueMap.createCore({
      disabled: (_a = initialValue.disabled) !== null && _a !== void 0 ? _a : false,
      disposed: false,
      hidden: (_b = initialValue.hidden) !== null && _b !== void 0 ? _b : false,
      parent: (_c = initialValue.parent) !== null && _c !== void 0 ? _c : null
    }));
  }
  get globalDisabled() {
    return this.globalDisabled_;
  }
  bindClassModifiers(elem) {
    bindValue(this.globalDisabled_, valueToModifier(elem, "disabled"));
    bindValueMap(this, "hidden", valueToModifier(elem, "hidden"));
  }
  bindDisabled(target) {
    bindValue(this.globalDisabled_, (disabled) => {
      target.disabled = disabled;
    });
  }
  bindTabIndex(elem) {
    bindValue(this.globalDisabled_, (disabled) => {
      elem.tabIndex = disabled ? -1 : 0;
    });
  }
  handleDispose(callback) {
    this.value("disposed").emitter.on("change", (disposed) => {
      if (disposed) {
        callback();
      }
    });
  }
  importState(state) {
    this.set("disabled", state.disabled);
    this.set("hidden", state.hidden);
  }
  exportState() {
    return {
      disabled: this.get("disabled"),
      hidden: this.get("hidden")
    };
  }
  getGlobalDisabled_() {
    const parent = this.get("parent");
    const parentDisabled = parent ? parent.globalDisabled.rawValue : false;
    return parentDisabled || this.get("disabled");
  }
  updateGlobalDisabled_() {
    this.setGlobalDisabled_(this.getGlobalDisabled_());
  }
  onDisabledChange_() {
    this.updateGlobalDisabled_();
  }
  onParentGlobalDisabledChange_() {
    this.updateGlobalDisabled_();
  }
  onParentChange_(ev) {
    var _a;
    const prevParent = ev.previousRawValue;
    prevParent === null || prevParent === void 0 ? void 0 : prevParent.globalDisabled.emitter.off("change", this.onParentGlobalDisabledChange_);
    (_a = this.get("parent")) === null || _a === void 0 ? void 0 : _a.globalDisabled.emitter.on("change", this.onParentGlobalDisabledChange_);
    this.updateGlobalDisabled_();
  }
};
var cn$n = ClassName("tbp");
var TabPageView = class {
  constructor(doc, config) {
    this.element = doc.createElement("div");
    this.element.classList.add(cn$n());
    config.viewProps.bindClassModifiers(this.element);
    const containerElem = doc.createElement("div");
    containerElem.classList.add(cn$n("c"));
    this.element.appendChild(containerElem);
    this.containerElement = containerElem;
  }
};
var cn$m = ClassName("tbi");
var TabItemView = class {
  constructor(doc, config) {
    this.element = doc.createElement("div");
    this.element.classList.add(cn$m());
    config.viewProps.bindClassModifiers(this.element);
    bindValueMap(config.props, "selected", (selected) => {
      if (selected) {
        this.element.classList.add(cn$m(void 0, "sel"));
      } else {
        this.element.classList.remove(cn$m(void 0, "sel"));
      }
    });
    const buttonElem = doc.createElement("button");
    buttonElem.classList.add(cn$m("b"));
    config.viewProps.bindDisabled(buttonElem);
    this.element.appendChild(buttonElem);
    this.buttonElement = buttonElem;
    const titleElem = doc.createElement("div");
    titleElem.classList.add(cn$m("t"));
    bindValueToTextContent(config.props.value("title"), titleElem);
    this.buttonElement.appendChild(titleElem);
    this.titleElement = titleElem;
  }
};
var TabItemController = class {
  constructor(doc, config) {
    this.emitter = new Emitter();
    this.onClick_ = this.onClick_.bind(this);
    this.props = config.props;
    this.viewProps = config.viewProps;
    this.view = new TabItemView(doc, {
      props: config.props,
      viewProps: config.viewProps
    });
    this.view.buttonElement.addEventListener("click", this.onClick_);
  }
  onClick_() {
    this.emitter.emit("click", {
      sender: this
    });
  }
};
var TabPageController = class extends ContainerBladeController {
  constructor(doc, config) {
    const view = new TabPageView(doc, {
      viewProps: config.viewProps
    });
    super(Object.assign(Object.assign({}, config), { rackController: new RackController({
      blade: config.blade,
      element: view.containerElement,
      viewProps: config.viewProps
    }), view }));
    this.onItemClick_ = this.onItemClick_.bind(this);
    this.ic_ = new TabItemController(doc, {
      props: config.itemProps,
      viewProps: ViewProps.create()
    });
    this.ic_.emitter.on("click", this.onItemClick_);
    this.props = config.props;
    bindValueMap(this.props, "selected", (selected) => {
      this.itemController.props.set("selected", selected);
      this.viewProps.set("hidden", !selected);
    });
  }
  get itemController() {
    return this.ic_;
  }
  importState(state) {
    return importBladeState(state, (s) => super.importState(s), (p) => ({
      selected: p.required.boolean,
      title: p.required.string
    }), (result) => {
      this.ic_.props.set("selected", result.selected);
      this.ic_.props.set("title", result.title);
      return true;
    });
  }
  exportState() {
    return exportBladeState(() => super.exportState(), {
      selected: this.ic_.props.get("selected"),
      title: this.ic_.props.get("title")
    });
  }
  onItemClick_() {
    this.props.set("selected", true);
  }
};
var TabApi = class extends ContainerBladeApi {
  constructor(controller, pool) {
    super(controller, pool);
    this.emitter_ = new Emitter();
    this.onSelect_ = this.onSelect_.bind(this);
    this.pool_ = pool;
    this.rackApi_.on("change", (ev) => {
      this.emitter_.emit("change", ev);
    });
    this.controller.tab.selectedIndex.emitter.on("change", this.onSelect_);
  }
  get pages() {
    return this.rackApi_.children;
  }
  addPage(params) {
    const doc = this.controller.view.element.ownerDocument;
    const pc = new TabPageController(doc, {
      blade: createBlade(),
      itemProps: ValueMap.fromObject({
        selected: false,
        title: params.title
      }),
      props: ValueMap.fromObject({
        selected: false
      }),
      viewProps: ViewProps.create()
    });
    const papi = this.pool_.createApi(pc);
    return this.rackApi_.add(papi, params.index);
  }
  removePage(index) {
    this.rackApi_.remove(this.rackApi_.children[index]);
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, (ev) => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
  onSelect_(ev) {
    this.emitter_.emit("select", new TpTabSelectEvent(this, ev.rawValue));
  }
};
var TabPageApi = class extends ContainerBladeApi {
  get title() {
    var _a;
    return (_a = this.controller.itemController.props.get("title")) !== null && _a !== void 0 ? _a : "";
  }
  set title(title) {
    this.controller.itemController.props.set("title", title);
  }
  get selected() {
    return this.controller.props.get("selected");
  }
  set selected(selected) {
    this.controller.props.set("selected", selected);
  }
  get children() {
    return this.rackApi_.children;
  }
  addButton(params) {
    return this.rackApi_.addButton(params);
  }
  addFolder(params) {
    return this.rackApi_.addFolder(params);
  }
  addTab(params) {
    return this.rackApi_.addTab(params);
  }
  add(api, opt_index) {
    this.rackApi_.add(api, opt_index);
  }
  remove(api) {
    this.rackApi_.remove(api);
  }
  addBinding(object, key, opt_params) {
    return this.rackApi_.addBinding(object, key, opt_params);
  }
  addBlade(params) {
    return this.rackApi_.addBlade(params);
  }
};
var INDEX_NOT_SELECTED = -1;
var Tab = class {
  constructor() {
    this.onItemSelectedChange_ = this.onItemSelectedChange_.bind(this);
    this.empty = createValue(true);
    this.selectedIndex = createValue(INDEX_NOT_SELECTED);
    this.items_ = [];
  }
  add(item, opt_index) {
    const index = opt_index !== null && opt_index !== void 0 ? opt_index : this.items_.length;
    this.items_.splice(index, 0, item);
    item.emitter.on("change", this.onItemSelectedChange_);
    this.keepSelection_();
  }
  remove(item) {
    const index = this.items_.indexOf(item);
    if (index < 0) {
      return;
    }
    this.items_.splice(index, 1);
    item.emitter.off("change", this.onItemSelectedChange_);
    this.keepSelection_();
  }
  keepSelection_() {
    if (this.items_.length === 0) {
      this.selectedIndex.rawValue = INDEX_NOT_SELECTED;
      this.empty.rawValue = true;
      return;
    }
    const firstSelIndex = this.items_.findIndex((s) => s.rawValue);
    if (firstSelIndex < 0) {
      this.items_.forEach((s, i) => {
        s.rawValue = i === 0;
      });
      this.selectedIndex.rawValue = 0;
    } else {
      this.items_.forEach((s, i) => {
        s.rawValue = i === firstSelIndex;
      });
      this.selectedIndex.rawValue = firstSelIndex;
    }
    this.empty.rawValue = false;
  }
  onItemSelectedChange_(ev) {
    if (ev.rawValue) {
      const index = this.items_.findIndex((s) => s === ev.sender);
      this.items_.forEach((s, i) => {
        s.rawValue = i === index;
      });
      this.selectedIndex.rawValue = index;
    } else {
      this.keepSelection_();
    }
  }
};
var cn$l = ClassName("tab");
var TabView = class {
  constructor(doc, config) {
    this.element = doc.createElement("div");
    this.element.classList.add(cn$l(), bladeContainerClassName());
    config.viewProps.bindClassModifiers(this.element);
    bindValue(config.empty, valueToClassName(this.element, cn$l(void 0, "nop")));
    const titleElem = doc.createElement("div");
    titleElem.classList.add(cn$l("t"));
    this.element.appendChild(titleElem);
    this.itemsElement = titleElem;
    const indentElem = doc.createElement("div");
    indentElem.classList.add(cn$l("i"));
    this.element.appendChild(indentElem);
    const contentsElem = doc.createElement("div");
    contentsElem.classList.add(cn$l("c"));
    this.element.appendChild(contentsElem);
    this.contentsElement = contentsElem;
  }
};
var TabController = class extends ContainerBladeController {
  constructor(doc, config) {
    const tab = new Tab();
    const view = new TabView(doc, {
      empty: tab.empty,
      viewProps: config.viewProps
    });
    super({
      blade: config.blade,
      rackController: new RackController({
        blade: config.blade,
        element: view.contentsElement,
        viewProps: config.viewProps
      }),
      view
    });
    this.onRackAdd_ = this.onRackAdd_.bind(this);
    this.onRackRemove_ = this.onRackRemove_.bind(this);
    const rack = this.rackController.rack;
    rack.emitter.on("add", this.onRackAdd_);
    rack.emitter.on("remove", this.onRackRemove_);
    this.tab = tab;
  }
  add(pc, opt_index) {
    this.rackController.rack.add(pc, opt_index);
  }
  remove(index) {
    this.rackController.rack.remove(this.rackController.rack.children[index]);
  }
  onRackAdd_(ev) {
    if (!ev.root) {
      return;
    }
    const pc = ev.bladeController;
    insertElementAt(this.view.itemsElement, pc.itemController.view.element, ev.index);
    pc.itemController.viewProps.set("parent", this.viewProps);
    this.tab.add(pc.props.value("selected"));
  }
  onRackRemove_(ev) {
    if (!ev.root) {
      return;
    }
    const pc = ev.bladeController;
    removeElement(pc.itemController.view.element);
    pc.itemController.viewProps.set("parent", null);
    this.tab.remove(pc.props.value("selected"));
  }
};
var TabBladePlugin = createPlugin({
  id: "tab",
  type: "blade",
  accept(params) {
    const result = parseRecord(params, (p) => ({
      pages: p.required.array(p.required.object({ title: p.required.string })),
      view: p.required.constant("tab")
    }));
    if (!result || result.pages.length === 0) {
      return null;
    }
    return { params: result };
  },
  controller(args) {
    const c = new TabController(args.document, {
      blade: args.blade,
      viewProps: args.viewProps
    });
    args.params.pages.forEach((p) => {
      const pc = new TabPageController(args.document, {
        blade: createBlade(),
        itemProps: ValueMap.fromObject({
          selected: false,
          title: p.title
        }),
        props: ValueMap.fromObject({
          selected: false
        }),
        viewProps: ViewProps.create()
      });
      c.add(pc);
    });
    return c;
  },
  api(args) {
    if (args.controller instanceof TabController) {
      return new TabApi(args.controller, args.pool);
    }
    if (args.controller instanceof TabPageController) {
      return new TabPageApi(args.controller, args.pool);
    }
    return null;
  }
});
function createBladeController(plugin, args) {
  const ac = plugin.accept(args.params);
  if (!ac) {
    return null;
  }
  const params = parseRecord(args.params, (p) => ({
    disabled: p.optional.boolean,
    hidden: p.optional.boolean
  }));
  return plugin.controller({
    blade: createBlade(),
    document: args.document,
    params: forceCast(Object.assign(Object.assign({}, ac.params), { disabled: params === null || params === void 0 ? void 0 : params.disabled, hidden: params === null || params === void 0 ? void 0 : params.hidden })),
    viewProps: ViewProps.create({
      disabled: params === null || params === void 0 ? void 0 : params.disabled,
      hidden: params === null || params === void 0 ? void 0 : params.hidden
    })
  });
}
var ListInputBindingApi = class extends BindingApi {
  get options() {
    return this.controller.valueController.props.get("options");
  }
  set options(options) {
    this.controller.valueController.props.set("options", options);
  }
};
var ManualTicker = class {
  constructor() {
    this.disabled = false;
    this.emitter = new Emitter();
  }
  dispose() {
  }
  tick() {
    if (this.disabled) {
      return;
    }
    this.emitter.emit("tick", {
      sender: this
    });
  }
};
var IntervalTicker = class {
  constructor(doc, interval) {
    this.disabled_ = false;
    this.timerId_ = null;
    this.onTick_ = this.onTick_.bind(this);
    this.doc_ = doc;
    this.emitter = new Emitter();
    this.interval_ = interval;
    this.setTimer_();
  }
  get disabled() {
    return this.disabled_;
  }
  set disabled(inactive) {
    this.disabled_ = inactive;
    if (this.disabled_) {
      this.clearTimer_();
    } else {
      this.setTimer_();
    }
  }
  dispose() {
    this.clearTimer_();
  }
  clearTimer_() {
    if (this.timerId_ === null) {
      return;
    }
    const win = this.doc_.defaultView;
    if (win) {
      win.clearInterval(this.timerId_);
    }
    this.timerId_ = null;
  }
  setTimer_() {
    this.clearTimer_();
    if (this.interval_ <= 0) {
      return;
    }
    const win = this.doc_.defaultView;
    if (win) {
      this.timerId_ = win.setInterval(this.onTick_, this.interval_);
    }
  }
  onTick_() {
    if (this.disabled_) {
      return;
    }
    this.emitter.emit("tick", {
      sender: this
    });
  }
};
var CompositeConstraint = class {
  constructor(constraints) {
    this.constraints = constraints;
  }
  constrain(value) {
    return this.constraints.reduce((result, c) => {
      return c.constrain(result);
    }, value);
  }
};
function findConstraint(c, constraintClass) {
  if (c instanceof constraintClass) {
    return c;
  }
  if (c instanceof CompositeConstraint) {
    const result = c.constraints.reduce((tmpResult, sc) => {
      if (tmpResult) {
        return tmpResult;
      }
      return sc instanceof constraintClass ? sc : null;
    }, null);
    if (result) {
      return result;
    }
  }
  return null;
}
var ListConstraint = class {
  constructor(options) {
    this.values = ValueMap.fromObject({
      options
    });
  }
  constrain(value) {
    const opts = this.values.get("options");
    if (opts.length === 0) {
      return value;
    }
    const matched = opts.filter((item) => {
      return item.value === value;
    }).length > 0;
    return matched ? value : opts[0].value;
  }
};
function parseListOptions(value) {
  var _a;
  const p = MicroParsers;
  if (Array.isArray(value)) {
    return (_a = parseRecord({ items: value }, (p2) => ({
      items: p2.required.array(p2.required.object({
        text: p2.required.string,
        value: p2.required.raw
      }))
    }))) === null || _a === void 0 ? void 0 : _a.items;
  }
  if (typeof value === "object") {
    return p.required.raw(value).value;
  }
  return void 0;
}
function normalizeListOptions(options) {
  if (Array.isArray(options)) {
    return options;
  }
  const items = [];
  Object.keys(options).forEach((text) => {
    items.push({ text, value: options[text] });
  });
  return items;
}
function createListConstraint(options) {
  return !isEmpty(options) ? new ListConstraint(normalizeListOptions(forceCast(options))) : null;
}
var cn$k = ClassName("lst");
var ListView = class {
  constructor(doc, config) {
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.props_ = config.props;
    this.element = doc.createElement("div");
    this.element.classList.add(cn$k());
    config.viewProps.bindClassModifiers(this.element);
    const selectElem = doc.createElement("select");
    selectElem.classList.add(cn$k("s"));
    config.viewProps.bindDisabled(selectElem);
    this.element.appendChild(selectElem);
    this.selectElement = selectElem;
    const markElem = doc.createElement("div");
    markElem.classList.add(cn$k("m"));
    markElem.appendChild(createSvgIconElement(doc, "dropdown"));
    this.element.appendChild(markElem);
    config.value.emitter.on("change", this.onValueChange_);
    this.value_ = config.value;
    bindValueMap(this.props_, "options", (opts) => {
      removeChildElements(this.selectElement);
      opts.forEach((item) => {
        const optionElem = doc.createElement("option");
        optionElem.textContent = item.text;
        this.selectElement.appendChild(optionElem);
      });
      this.update_();
    });
  }
  update_() {
    const values = this.props_.get("options").map((o) => o.value);
    this.selectElement.selectedIndex = values.indexOf(this.value_.rawValue);
  }
  onValueChange_() {
    this.update_();
  }
};
var ListController = class {
  constructor(doc, config) {
    this.onSelectChange_ = this.onSelectChange_.bind(this);
    this.props = config.props;
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new ListView(doc, {
      props: this.props,
      value: this.value,
      viewProps: this.viewProps
    });
    this.view.selectElement.addEventListener("change", this.onSelectChange_);
  }
  onSelectChange_(e) {
    const selectElem = forceCast(e.currentTarget);
    this.value.rawValue = this.props.get("options")[selectElem.selectedIndex].value;
  }
  importProps(state) {
    return importBladeState(state, null, (p) => ({
      options: p.required.custom(parseListOptions)
    }), (result) => {
      this.props.set("options", normalizeListOptions(result.options));
      return true;
    });
  }
  exportProps() {
    return exportBladeState(null, {
      options: this.props.get("options")
    });
  }
};
var cn$j = ClassName("pop");
var PopupView = class {
  constructor(doc, config) {
    this.element = doc.createElement("div");
    this.element.classList.add(cn$j());
    config.viewProps.bindClassModifiers(this.element);
    bindValue(config.shows, valueToClassName(this.element, cn$j(void 0, "v")));
  }
};
var PopupController = class {
  constructor(doc, config) {
    this.shows = createValue(false);
    this.viewProps = config.viewProps;
    this.view = new PopupView(doc, {
      shows: this.shows,
      viewProps: this.viewProps
    });
  }
};
var cn$i = ClassName("txt");
var TextView = class {
  constructor(doc, config) {
    this.onChange_ = this.onChange_.bind(this);
    this.element = doc.createElement("div");
    this.element.classList.add(cn$i());
    config.viewProps.bindClassModifiers(this.element);
    this.props_ = config.props;
    this.props_.emitter.on("change", this.onChange_);
    const inputElem = doc.createElement("input");
    inputElem.classList.add(cn$i("i"));
    inputElem.type = "text";
    config.viewProps.bindDisabled(inputElem);
    this.element.appendChild(inputElem);
    this.inputElement = inputElem;
    config.value.emitter.on("change", this.onChange_);
    this.value_ = config.value;
    this.refresh();
  }
  refresh() {
    const formatter = this.props_.get("formatter");
    this.inputElement.value = formatter(this.value_.rawValue);
  }
  onChange_() {
    this.refresh();
  }
};
var TextController = class {
  constructor(doc, config) {
    this.onInputChange_ = this.onInputChange_.bind(this);
    this.parser_ = config.parser;
    this.props = config.props;
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new TextView(doc, {
      props: config.props,
      value: this.value,
      viewProps: this.viewProps
    });
    this.view.inputElement.addEventListener("change", this.onInputChange_);
  }
  onInputChange_(e) {
    const inputElem = forceCast(e.currentTarget);
    const value = inputElem.value;
    const parsedValue = this.parser_(value);
    if (!isEmpty(parsedValue)) {
      this.value.rawValue = parsedValue;
    }
    this.view.refresh();
  }
};
function boolToString(value) {
  return String(value);
}
function boolFromUnknown(value) {
  if (value === "false") {
    return false;
  }
  return !!value;
}
function BooleanFormatter(value) {
  return boolToString(value);
}
function composeParsers(parsers) {
  return (text) => {
    return parsers.reduce((result, parser) => {
      if (result !== null) {
        return result;
      }
      return parser(text);
    }, null);
  };
}
var innerFormatter = createNumberFormatter(0);
function formatPercentage(value) {
  return innerFormatter(value) + "%";
}
function stringFromUnknown(value) {
  return String(value);
}
function formatString(value) {
  return value;
}
function connectValues({ primary, secondary, forward, backward }) {
  let changing = false;
  function preventFeedback(callback) {
    if (changing) {
      return;
    }
    changing = true;
    callback();
    changing = false;
  }
  primary.emitter.on("change", (ev) => {
    preventFeedback(() => {
      secondary.setRawValue(forward(primary.rawValue, secondary.rawValue), ev.options);
    });
  });
  secondary.emitter.on("change", (ev) => {
    preventFeedback(() => {
      primary.setRawValue(backward(primary.rawValue, secondary.rawValue), ev.options);
    });
    preventFeedback(() => {
      secondary.setRawValue(forward(primary.rawValue, secondary.rawValue), ev.options);
    });
  });
  preventFeedback(() => {
    secondary.setRawValue(forward(primary.rawValue, secondary.rawValue), {
      forceEmit: false,
      last: true
    });
  });
}
function getStepForKey(keyScale, keys) {
  const step = keyScale * (keys.altKey ? 0.1 : 1) * (keys.shiftKey ? 10 : 1);
  if (keys.upKey) {
    return +step;
  } else if (keys.downKey) {
    return -step;
  }
  return 0;
}
function getVerticalStepKeys(ev) {
  return {
    altKey: ev.altKey,
    downKey: ev.key === "ArrowDown",
    shiftKey: ev.shiftKey,
    upKey: ev.key === "ArrowUp"
  };
}
function getHorizontalStepKeys(ev) {
  return {
    altKey: ev.altKey,
    downKey: ev.key === "ArrowLeft",
    shiftKey: ev.shiftKey,
    upKey: ev.key === "ArrowRight"
  };
}
function isVerticalArrowKey(key) {
  return key === "ArrowUp" || key === "ArrowDown";
}
function isArrowKey(key) {
  return isVerticalArrowKey(key) || key === "ArrowLeft" || key === "ArrowRight";
}
function computeOffset$1(ev, elem) {
  var _a, _b;
  const win = elem.ownerDocument.defaultView;
  const rect = elem.getBoundingClientRect();
  return {
    x: ev.pageX - (((_a = win && win.scrollX) !== null && _a !== void 0 ? _a : 0) + rect.left),
    y: ev.pageY - (((_b = win && win.scrollY) !== null && _b !== void 0 ? _b : 0) + rect.top)
  };
}
var PointerHandler = class {
  constructor(element) {
    this.lastTouch_ = null;
    this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this);
    this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this);
    this.onMouseDown_ = this.onMouseDown_.bind(this);
    this.onTouchEnd_ = this.onTouchEnd_.bind(this);
    this.onTouchMove_ = this.onTouchMove_.bind(this);
    this.onTouchStart_ = this.onTouchStart_.bind(this);
    this.elem_ = element;
    this.emitter = new Emitter();
    element.addEventListener("touchstart", this.onTouchStart_, {
      passive: false
    });
    element.addEventListener("touchmove", this.onTouchMove_, {
      passive: true
    });
    element.addEventListener("touchend", this.onTouchEnd_);
    element.addEventListener("mousedown", this.onMouseDown_);
  }
  computePosition_(offset) {
    const rect = this.elem_.getBoundingClientRect();
    return {
      bounds: {
        width: rect.width,
        height: rect.height
      },
      point: offset ? {
        x: offset.x,
        y: offset.y
      } : null
    };
  }
  onMouseDown_(ev) {
    var _a;
    ev.preventDefault();
    (_a = ev.currentTarget) === null || _a === void 0 ? void 0 : _a.focus();
    const doc = this.elem_.ownerDocument;
    doc.addEventListener("mousemove", this.onDocumentMouseMove_);
    doc.addEventListener("mouseup", this.onDocumentMouseUp_);
    this.emitter.emit("down", {
      altKey: ev.altKey,
      data: this.computePosition_(computeOffset$1(ev, this.elem_)),
      sender: this,
      shiftKey: ev.shiftKey
    });
  }
  onDocumentMouseMove_(ev) {
    this.emitter.emit("move", {
      altKey: ev.altKey,
      data: this.computePosition_(computeOffset$1(ev, this.elem_)),
      sender: this,
      shiftKey: ev.shiftKey
    });
  }
  onDocumentMouseUp_(ev) {
    const doc = this.elem_.ownerDocument;
    doc.removeEventListener("mousemove", this.onDocumentMouseMove_);
    doc.removeEventListener("mouseup", this.onDocumentMouseUp_);
    this.emitter.emit("up", {
      altKey: ev.altKey,
      data: this.computePosition_(computeOffset$1(ev, this.elem_)),
      sender: this,
      shiftKey: ev.shiftKey
    });
  }
  onTouchStart_(ev) {
    ev.preventDefault();
    const touch = ev.targetTouches.item(0);
    const rect = this.elem_.getBoundingClientRect();
    this.emitter.emit("down", {
      altKey: ev.altKey,
      data: this.computePosition_(touch ? {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      } : void 0),
      sender: this,
      shiftKey: ev.shiftKey
    });
    this.lastTouch_ = touch;
  }
  onTouchMove_(ev) {
    const touch = ev.targetTouches.item(0);
    const rect = this.elem_.getBoundingClientRect();
    this.emitter.emit("move", {
      altKey: ev.altKey,
      data: this.computePosition_(touch ? {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      } : void 0),
      sender: this,
      shiftKey: ev.shiftKey
    });
    this.lastTouch_ = touch;
  }
  onTouchEnd_(ev) {
    var _a;
    const touch = (_a = ev.targetTouches.item(0)) !== null && _a !== void 0 ? _a : this.lastTouch_;
    const rect = this.elem_.getBoundingClientRect();
    this.emitter.emit("up", {
      altKey: ev.altKey,
      data: this.computePosition_(touch ? {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      } : void 0),
      sender: this,
      shiftKey: ev.shiftKey
    });
  }
};
var cn$h = ClassName("txt");
var NumberTextView = class {
  constructor(doc, config) {
    this.onChange_ = this.onChange_.bind(this);
    this.props_ = config.props;
    this.props_.emitter.on("change", this.onChange_);
    this.element = doc.createElement("div");
    this.element.classList.add(cn$h(), cn$h(void 0, "num"));
    if (config.arrayPosition) {
      this.element.classList.add(cn$h(void 0, config.arrayPosition));
    }
    config.viewProps.bindClassModifiers(this.element);
    const inputElem = doc.createElement("input");
    inputElem.classList.add(cn$h("i"));
    inputElem.type = "text";
    config.viewProps.bindDisabled(inputElem);
    this.element.appendChild(inputElem);
    this.inputElement = inputElem;
    this.onDraggingChange_ = this.onDraggingChange_.bind(this);
    this.dragging_ = config.dragging;
    this.dragging_.emitter.on("change", this.onDraggingChange_);
    this.element.classList.add(cn$h());
    this.inputElement.classList.add(cn$h("i"));
    const knobElem = doc.createElement("div");
    knobElem.classList.add(cn$h("k"));
    this.element.appendChild(knobElem);
    this.knobElement = knobElem;
    const guideElem = doc.createElementNS(SVG_NS, "svg");
    guideElem.classList.add(cn$h("g"));
    this.knobElement.appendChild(guideElem);
    const bodyElem = doc.createElementNS(SVG_NS, "path");
    bodyElem.classList.add(cn$h("gb"));
    guideElem.appendChild(bodyElem);
    this.guideBodyElem_ = bodyElem;
    const headElem = doc.createElementNS(SVG_NS, "path");
    headElem.classList.add(cn$h("gh"));
    guideElem.appendChild(headElem);
    this.guideHeadElem_ = headElem;
    const tooltipElem = doc.createElement("div");
    tooltipElem.classList.add(ClassName("tt")());
    this.knobElement.appendChild(tooltipElem);
    this.tooltipElem_ = tooltipElem;
    config.value.emitter.on("change", this.onChange_);
    this.value = config.value;
    this.refresh();
  }
  onDraggingChange_(ev) {
    if (ev.rawValue === null) {
      this.element.classList.remove(cn$h(void 0, "drg"));
      return;
    }
    this.element.classList.add(cn$h(void 0, "drg"));
    const x = ev.rawValue / this.props_.get("pointerScale");
    const aox = x + (x > 0 ? -1 : x < 0 ? 1 : 0);
    const adx = constrainRange(-aox, -4, 4);
    this.guideHeadElem_.setAttributeNS(null, "d", [`M ${aox + adx},0 L${aox},4 L${aox + adx},8`, `M ${x},-1 L${x},9`].join(" "));
    this.guideBodyElem_.setAttributeNS(null, "d", `M 0,4 L${x},4`);
    const formatter = this.props_.get("formatter");
    this.tooltipElem_.textContent = formatter(this.value.rawValue);
    this.tooltipElem_.style.left = `${x}px`;
  }
  refresh() {
    const formatter = this.props_.get("formatter");
    this.inputElement.value = formatter(this.value.rawValue);
  }
  onChange_() {
    this.refresh();
  }
};
var NumberTextController = class {
  constructor(doc, config) {
    var _a;
    this.originRawValue_ = 0;
    this.onInputChange_ = this.onInputChange_.bind(this);
    this.onInputKeyDown_ = this.onInputKeyDown_.bind(this);
    this.onInputKeyUp_ = this.onInputKeyUp_.bind(this);
    this.onPointerDown_ = this.onPointerDown_.bind(this);
    this.onPointerMove_ = this.onPointerMove_.bind(this);
    this.onPointerUp_ = this.onPointerUp_.bind(this);
    this.parser_ = config.parser;
    this.props = config.props;
    this.sliderProps_ = (_a = config.sliderProps) !== null && _a !== void 0 ? _a : null;
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.dragging_ = createValue(null);
    this.view = new NumberTextView(doc, {
      arrayPosition: config.arrayPosition,
      dragging: this.dragging_,
      props: this.props,
      value: this.value,
      viewProps: this.viewProps
    });
    this.view.inputElement.addEventListener("change", this.onInputChange_);
    this.view.inputElement.addEventListener("keydown", this.onInputKeyDown_);
    this.view.inputElement.addEventListener("keyup", this.onInputKeyUp_);
    const ph = new PointerHandler(this.view.knobElement);
    ph.emitter.on("down", this.onPointerDown_);
    ph.emitter.on("move", this.onPointerMove_);
    ph.emitter.on("up", this.onPointerUp_);
  }
  constrainValue_(value) {
    var _a, _b;
    const min = (_a = this.sliderProps_) === null || _a === void 0 ? void 0 : _a.get("min");
    const max = (_b = this.sliderProps_) === null || _b === void 0 ? void 0 : _b.get("max");
    let v = value;
    if (min !== void 0) {
      v = Math.max(v, min);
    }
    if (max !== void 0) {
      v = Math.min(v, max);
    }
    return v;
  }
  onInputChange_(e) {
    const inputElem = forceCast(e.currentTarget);
    const value = inputElem.value;
    const parsedValue = this.parser_(value);
    if (!isEmpty(parsedValue)) {
      this.value.rawValue = this.constrainValue_(parsedValue);
    }
    this.view.refresh();
  }
  onInputKeyDown_(ev) {
    const step = getStepForKey(this.props.get("keyScale"), getVerticalStepKeys(ev));
    if (step === 0) {
      return;
    }
    this.value.setRawValue(this.constrainValue_(this.value.rawValue + step), {
      forceEmit: false,
      last: false
    });
  }
  onInputKeyUp_(ev) {
    const step = getStepForKey(this.props.get("keyScale"), getVerticalStepKeys(ev));
    if (step === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue, {
      forceEmit: true,
      last: true
    });
  }
  onPointerDown_() {
    this.originRawValue_ = this.value.rawValue;
    this.dragging_.rawValue = 0;
  }
  computeDraggingValue_(data) {
    if (!data.point) {
      return null;
    }
    const dx = data.point.x - data.bounds.width / 2;
    return this.constrainValue_(this.originRawValue_ + dx * this.props.get("pointerScale"));
  }
  onPointerMove_(ev) {
    const v = this.computeDraggingValue_(ev.data);
    if (v === null) {
      return;
    }
    this.value.setRawValue(v, {
      forceEmit: false,
      last: false
    });
    this.dragging_.rawValue = this.value.rawValue - this.originRawValue_;
  }
  onPointerUp_(ev) {
    const v = this.computeDraggingValue_(ev.data);
    if (v === null) {
      return;
    }
    this.value.setRawValue(v, {
      forceEmit: true,
      last: true
    });
    this.dragging_.rawValue = null;
  }
};
var cn$g = ClassName("sld");
var SliderView = class {
  constructor(doc, config) {
    this.onChange_ = this.onChange_.bind(this);
    this.props_ = config.props;
    this.props_.emitter.on("change", this.onChange_);
    this.element = doc.createElement("div");
    this.element.classList.add(cn$g());
    config.viewProps.bindClassModifiers(this.element);
    const trackElem = doc.createElement("div");
    trackElem.classList.add(cn$g("t"));
    config.viewProps.bindTabIndex(trackElem);
    this.element.appendChild(trackElem);
    this.trackElement = trackElem;
    const knobElem = doc.createElement("div");
    knobElem.classList.add(cn$g("k"));
    this.trackElement.appendChild(knobElem);
    this.knobElement = knobElem;
    config.value.emitter.on("change", this.onChange_);
    this.value = config.value;
    this.update_();
  }
  update_() {
    const p = constrainRange(mapRange(this.value.rawValue, this.props_.get("min"), this.props_.get("max"), 0, 100), 0, 100);
    this.knobElement.style.width = `${p}%`;
  }
  onChange_() {
    this.update_();
  }
};
var SliderController = class {
  constructor(doc, config) {
    this.onKeyDown_ = this.onKeyDown_.bind(this);
    this.onKeyUp_ = this.onKeyUp_.bind(this);
    this.onPointerDownOrMove_ = this.onPointerDownOrMove_.bind(this);
    this.onPointerUp_ = this.onPointerUp_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.props = config.props;
    this.view = new SliderView(doc, {
      props: this.props,
      value: this.value,
      viewProps: this.viewProps
    });
    this.ptHandler_ = new PointerHandler(this.view.trackElement);
    this.ptHandler_.emitter.on("down", this.onPointerDownOrMove_);
    this.ptHandler_.emitter.on("move", this.onPointerDownOrMove_);
    this.ptHandler_.emitter.on("up", this.onPointerUp_);
    this.view.trackElement.addEventListener("keydown", this.onKeyDown_);
    this.view.trackElement.addEventListener("keyup", this.onKeyUp_);
  }
  handlePointerEvent_(d, opts) {
    if (!d.point) {
      return;
    }
    this.value.setRawValue(mapRange(constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, this.props.get("min"), this.props.get("max")), opts);
  }
  onPointerDownOrMove_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerUp_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: true,
      last: true
    });
  }
  onKeyDown_(ev) {
    const step = getStepForKey(this.props.get("keyScale"), getHorizontalStepKeys(ev));
    if (step === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue + step, {
      forceEmit: false,
      last: false
    });
  }
  onKeyUp_(ev) {
    const step = getStepForKey(this.props.get("keyScale"), getHorizontalStepKeys(ev));
    if (step === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue, {
      forceEmit: true,
      last: true
    });
  }
};
var cn$f = ClassName("sldtxt");
var SliderTextView = class {
  constructor(doc, config) {
    this.element = doc.createElement("div");
    this.element.classList.add(cn$f());
    const sliderElem = doc.createElement("div");
    sliderElem.classList.add(cn$f("s"));
    this.sliderView_ = config.sliderView;
    sliderElem.appendChild(this.sliderView_.element);
    this.element.appendChild(sliderElem);
    const textElem = doc.createElement("div");
    textElem.classList.add(cn$f("t"));
    this.textView_ = config.textView;
    textElem.appendChild(this.textView_.element);
    this.element.appendChild(textElem);
  }
};
var SliderTextController = class {
  constructor(doc, config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.sliderC_ = new SliderController(doc, {
      props: config.sliderProps,
      value: config.value,
      viewProps: this.viewProps
    });
    this.textC_ = new NumberTextController(doc, {
      parser: config.parser,
      props: config.textProps,
      sliderProps: config.sliderProps,
      value: config.value,
      viewProps: config.viewProps
    });
    this.view = new SliderTextView(doc, {
      sliderView: this.sliderC_.view,
      textView: this.textC_.view
    });
  }
  get sliderController() {
    return this.sliderC_;
  }
  get textController() {
    return this.textC_;
  }
  importProps(state) {
    return importBladeState(state, null, (p) => ({
      max: p.required.number,
      min: p.required.number
    }), (result) => {
      const sliderProps = this.sliderC_.props;
      sliderProps.set("max", result.max);
      sliderProps.set("min", result.min);
      return true;
    });
  }
  exportProps() {
    const sliderProps = this.sliderC_.props;
    return exportBladeState(null, {
      max: sliderProps.get("max"),
      min: sliderProps.get("min")
    });
  }
};
function createSliderTextProps(config) {
  return {
    sliderProps: new ValueMap({
      keyScale: config.keyScale,
      max: config.max,
      min: config.min
    }),
    textProps: new ValueMap({
      formatter: createValue(config.formatter),
      keyScale: config.keyScale,
      pointerScale: createValue(config.pointerScale)
    })
  };
}
var CSS_VAR_MAP = {
  containerUnitSize: "cnt-usz"
};
function getCssVar(key) {
  return `--${CSS_VAR_MAP[key]}`;
}
function createPointDimensionParser(p) {
  return createNumberTextInputParamsParser(p);
}
function parsePointDimensionParams(value) {
  if (!isRecord(value)) {
    return void 0;
  }
  return parseRecord(value, createPointDimensionParser);
}
function createDimensionConstraint(params, initialValue) {
  if (!params) {
    return void 0;
  }
  const constraints = [];
  const cs = createStepConstraint(params, initialValue);
  if (cs) {
    constraints.push(cs);
  }
  const rs = createRangeConstraint(params);
  if (rs) {
    constraints.push(rs);
  }
  return new CompositeConstraint(constraints);
}
function isCompatible(ver) {
  if (!ver) {
    return false;
  }
  return ver.major === VERSION$1.major;
}
function parsePickerLayout(value) {
  if (value === "inline" || value === "popup") {
    return value;
  }
  return void 0;
}
function writePrimitive(target, value) {
  target.write(value);
}
var cn$e = ClassName("ckb");
var CheckboxView = class {
  constructor(doc, config) {
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.element = doc.createElement("div");
    this.element.classList.add(cn$e());
    config.viewProps.bindClassModifiers(this.element);
    const labelElem = doc.createElement("label");
    labelElem.classList.add(cn$e("l"));
    this.element.appendChild(labelElem);
    this.labelElement = labelElem;
    const inputElem = doc.createElement("input");
    inputElem.classList.add(cn$e("i"));
    inputElem.type = "checkbox";
    this.labelElement.appendChild(inputElem);
    this.inputElement = inputElem;
    config.viewProps.bindDisabled(this.inputElement);
    const wrapperElem = doc.createElement("div");
    wrapperElem.classList.add(cn$e("w"));
    this.labelElement.appendChild(wrapperElem);
    const markElem = createSvgIconElement(doc, "check");
    wrapperElem.appendChild(markElem);
    config.value.emitter.on("change", this.onValueChange_);
    this.value = config.value;
    this.update_();
  }
  update_() {
    this.inputElement.checked = this.value.rawValue;
  }
  onValueChange_() {
    this.update_();
  }
};
var CheckboxController = class {
  constructor(doc, config) {
    this.onInputChange_ = this.onInputChange_.bind(this);
    this.onLabelMouseDown_ = this.onLabelMouseDown_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new CheckboxView(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    this.view.inputElement.addEventListener("change", this.onInputChange_);
    this.view.labelElement.addEventListener("mousedown", this.onLabelMouseDown_);
  }
  onInputChange_(ev) {
    const inputElem = forceCast(ev.currentTarget);
    this.value.rawValue = inputElem.checked;
    ev.preventDefault();
    ev.stopPropagation();
  }
  onLabelMouseDown_(ev) {
    ev.preventDefault();
  }
};
function createConstraint$6(params) {
  const constraints = [];
  const lc = createListConstraint(params.options);
  if (lc) {
    constraints.push(lc);
  }
  return new CompositeConstraint(constraints);
}
var BooleanInputPlugin = createPlugin({
  id: "input-bool",
  type: "input",
  accept: (value, params) => {
    if (typeof value !== "boolean") {
      return null;
    }
    const result = parseRecord(params, (p) => ({
      options: p.optional.custom(parseListOptions),
      readonly: p.optional.constant(false)
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: (_args) => boolFromUnknown,
    constraint: (args) => createConstraint$6(args.params),
    writer: (_args) => writePrimitive
  },
  controller: (args) => {
    const doc = args.document;
    const value = args.value;
    const c = args.constraint;
    const lc = c && findConstraint(c, ListConstraint);
    if (lc) {
      return new ListController(doc, {
        props: new ValueMap({
          options: lc.values.value("options")
        }),
        value,
        viewProps: args.viewProps
      });
    }
    return new CheckboxController(doc, {
      value,
      viewProps: args.viewProps
    });
  },
  api(args) {
    if (typeof args.controller.value.rawValue !== "boolean") {
      return null;
    }
    if (args.controller.valueController instanceof ListController) {
      return new ListInputBindingApi(args.controller);
    }
    return null;
  }
});
var cn$d = ClassName("col");
var ColorView = class {
  constructor(doc, config) {
    this.element = doc.createElement("div");
    this.element.classList.add(cn$d());
    config.foldable.bindExpandedClass(this.element, cn$d(void 0, "expanded"));
    bindValueMap(config.foldable, "completed", valueToClassName(this.element, cn$d(void 0, "cpl")));
    const headElem = doc.createElement("div");
    headElem.classList.add(cn$d("h"));
    this.element.appendChild(headElem);
    const swatchElem = doc.createElement("div");
    swatchElem.classList.add(cn$d("s"));
    headElem.appendChild(swatchElem);
    this.swatchElement = swatchElem;
    const textElem = doc.createElement("div");
    textElem.classList.add(cn$d("t"));
    headElem.appendChild(textElem);
    this.textElement = textElem;
    if (config.pickerLayout === "inline") {
      const pickerElem = doc.createElement("div");
      pickerElem.classList.add(cn$d("p"));
      this.element.appendChild(pickerElem);
      this.pickerElement = pickerElem;
    } else {
      this.pickerElement = null;
    }
  }
};
function rgbToHslInt(r, g, b) {
  const rp = constrainRange(r / 255, 0, 1);
  const gp = constrainRange(g / 255, 0, 1);
  const bp = constrainRange(b / 255, 0, 1);
  const cmax = Math.max(rp, gp, bp);
  const cmin = Math.min(rp, gp, bp);
  const c = cmax - cmin;
  let h = 0;
  let s = 0;
  const l = (cmin + cmax) / 2;
  if (c !== 0) {
    s = c / (1 - Math.abs(cmax + cmin - 1));
    if (rp === cmax) {
      h = (gp - bp) / c;
    } else if (gp === cmax) {
      h = 2 + (bp - rp) / c;
    } else {
      h = 4 + (rp - gp) / c;
    }
    h = h / 6 + (h < 0 ? 1 : 0);
  }
  return [h * 360, s * 100, l * 100];
}
function hslToRgbInt(h, s, l) {
  const hp = (h % 360 + 360) % 360;
  const sp = constrainRange(s / 100, 0, 1);
  const lp = constrainRange(l / 100, 0, 1);
  const c = (1 - Math.abs(2 * lp - 1)) * sp;
  const x = c * (1 - Math.abs(hp / 60 % 2 - 1));
  const m = lp - c / 2;
  let rp, gp, bp;
  if (hp >= 0 && hp < 60) {
    [rp, gp, bp] = [c, x, 0];
  } else if (hp >= 60 && hp < 120) {
    [rp, gp, bp] = [x, c, 0];
  } else if (hp >= 120 && hp < 180) {
    [rp, gp, bp] = [0, c, x];
  } else if (hp >= 180 && hp < 240) {
    [rp, gp, bp] = [0, x, c];
  } else if (hp >= 240 && hp < 300) {
    [rp, gp, bp] = [x, 0, c];
  } else {
    [rp, gp, bp] = [c, 0, x];
  }
  return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
}
function rgbToHsvInt(r, g, b) {
  const rp = constrainRange(r / 255, 0, 1);
  const gp = constrainRange(g / 255, 0, 1);
  const bp = constrainRange(b / 255, 0, 1);
  const cmax = Math.max(rp, gp, bp);
  const cmin = Math.min(rp, gp, bp);
  const d = cmax - cmin;
  let h;
  if (d === 0) {
    h = 0;
  } else if (cmax === rp) {
    h = 60 * (((gp - bp) / d % 6 + 6) % 6);
  } else if (cmax === gp) {
    h = 60 * ((bp - rp) / d + 2);
  } else {
    h = 60 * ((rp - gp) / d + 4);
  }
  const s = cmax === 0 ? 0 : d / cmax;
  const v = cmax;
  return [h, s * 100, v * 100];
}
function hsvToRgbInt(h, s, v) {
  const hp = loopRange(h, 360);
  const sp = constrainRange(s / 100, 0, 1);
  const vp = constrainRange(v / 100, 0, 1);
  const c = vp * sp;
  const x = c * (1 - Math.abs(hp / 60 % 2 - 1));
  const m = vp - c;
  let rp, gp, bp;
  if (hp >= 0 && hp < 60) {
    [rp, gp, bp] = [c, x, 0];
  } else if (hp >= 60 && hp < 120) {
    [rp, gp, bp] = [x, c, 0];
  } else if (hp >= 120 && hp < 180) {
    [rp, gp, bp] = [0, c, x];
  } else if (hp >= 180 && hp < 240) {
    [rp, gp, bp] = [0, x, c];
  } else if (hp >= 240 && hp < 300) {
    [rp, gp, bp] = [x, 0, c];
  } else {
    [rp, gp, bp] = [c, 0, x];
  }
  return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
}
function hslToHsvInt(h, s, l) {
  const sd = l + s * (100 - Math.abs(2 * l - 100)) / (2 * 100);
  return [
    h,
    sd !== 0 ? s * (100 - Math.abs(2 * l - 100)) / sd : 0,
    l + s * (100 - Math.abs(2 * l - 100)) / (2 * 100)
  ];
}
function hsvToHslInt(h, s, v) {
  const sd = 100 - Math.abs(v * (200 - s) / 100 - 100);
  return [h, sd !== 0 ? s * v / sd : 0, v * (200 - s) / (2 * 100)];
}
function removeAlphaComponent(comps) {
  return [comps[0], comps[1], comps[2]];
}
function appendAlphaComponent(comps, alpha) {
  return [comps[0], comps[1], comps[2], alpha];
}
var MODE_CONVERTER_MAP = {
  hsl: {
    hsl: (h, s, l) => [h, s, l],
    hsv: hslToHsvInt,
    rgb: hslToRgbInt
  },
  hsv: {
    hsl: hsvToHslInt,
    hsv: (h, s, v) => [h, s, v],
    rgb: hsvToRgbInt
  },
  rgb: {
    hsl: rgbToHslInt,
    hsv: rgbToHsvInt,
    rgb: (r, g, b) => [r, g, b]
  }
};
function getColorMaxComponents(mode, type) {
  return [
    type === "float" ? 1 : mode === "rgb" ? 255 : 360,
    type === "float" ? 1 : mode === "rgb" ? 255 : 100,
    type === "float" ? 1 : mode === "rgb" ? 255 : 100
  ];
}
function loopHueRange(hue, max) {
  return hue === max ? max : loopRange(hue, max);
}
function constrainColorComponents(components, mode, type) {
  var _a;
  const ms = getColorMaxComponents(mode, type);
  return [
    mode === "rgb" ? constrainRange(components[0], 0, ms[0]) : loopHueRange(components[0], ms[0]),
    constrainRange(components[1], 0, ms[1]),
    constrainRange(components[2], 0, ms[2]),
    constrainRange((_a = components[3]) !== null && _a !== void 0 ? _a : 1, 0, 1)
  ];
}
function convertColorType(comps, mode, from, to) {
  const fms = getColorMaxComponents(mode, from);
  const tms = getColorMaxComponents(mode, to);
  return comps.map((c, index) => c / fms[index] * tms[index]);
}
function convertColor(components, from, to) {
  const intComps = convertColorType(components, from.mode, from.type, "int");
  const result = MODE_CONVERTER_MAP[from.mode][to.mode](...intComps);
  return convertColorType(result, to.mode, "int", to.type);
}
var IntColor = class _IntColor {
  static black() {
    return new _IntColor([0, 0, 0], "rgb");
  }
  constructor(comps, mode) {
    this.type = "int";
    this.mode = mode;
    this.comps_ = constrainColorComponents(comps, mode, this.type);
  }
  getComponents(opt_mode) {
    return appendAlphaComponent(convertColor(removeAlphaComponent(this.comps_), { mode: this.mode, type: this.type }, { mode: opt_mode !== null && opt_mode !== void 0 ? opt_mode : this.mode, type: this.type }), this.comps_[3]);
  }
  toRgbaObject() {
    const rgbComps = this.getComponents("rgb");
    return {
      r: rgbComps[0],
      g: rgbComps[1],
      b: rgbComps[2],
      a: rgbComps[3]
    };
  }
};
var cn$c = ClassName("colp");
var ColorPickerView = class {
  constructor(doc, config) {
    this.alphaViews_ = null;
    this.element = doc.createElement("div");
    this.element.classList.add(cn$c());
    config.viewProps.bindClassModifiers(this.element);
    const hsvElem = doc.createElement("div");
    hsvElem.classList.add(cn$c("hsv"));
    const svElem = doc.createElement("div");
    svElem.classList.add(cn$c("sv"));
    this.svPaletteView_ = config.svPaletteView;
    svElem.appendChild(this.svPaletteView_.element);
    hsvElem.appendChild(svElem);
    const hElem = doc.createElement("div");
    hElem.classList.add(cn$c("h"));
    this.hPaletteView_ = config.hPaletteView;
    hElem.appendChild(this.hPaletteView_.element);
    hsvElem.appendChild(hElem);
    this.element.appendChild(hsvElem);
    const rgbElem = doc.createElement("div");
    rgbElem.classList.add(cn$c("rgb"));
    this.textsView_ = config.textsView;
    rgbElem.appendChild(this.textsView_.element);
    this.element.appendChild(rgbElem);
    if (config.alphaViews) {
      this.alphaViews_ = {
        palette: config.alphaViews.palette,
        text: config.alphaViews.text
      };
      const aElem = doc.createElement("div");
      aElem.classList.add(cn$c("a"));
      const apElem = doc.createElement("div");
      apElem.classList.add(cn$c("ap"));
      apElem.appendChild(this.alphaViews_.palette.element);
      aElem.appendChild(apElem);
      const atElem = doc.createElement("div");
      atElem.classList.add(cn$c("at"));
      atElem.appendChild(this.alphaViews_.text.element);
      aElem.appendChild(atElem);
      this.element.appendChild(aElem);
    }
  }
  get allFocusableElements() {
    const elems = [
      this.svPaletteView_.element,
      this.hPaletteView_.element,
      this.textsView_.modeSelectElement,
      ...this.textsView_.inputViews.map((v) => v.inputElement)
    ];
    if (this.alphaViews_) {
      elems.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement);
    }
    return elems;
  }
};
function parseColorType(value) {
  return value === "int" ? "int" : value === "float" ? "float" : void 0;
}
function parseColorInputParams(params) {
  return parseRecord(params, (p) => ({
    color: p.optional.object({
      alpha: p.optional.boolean,
      type: p.optional.custom(parseColorType)
    }),
    expanded: p.optional.boolean,
    picker: p.optional.custom(parsePickerLayout),
    readonly: p.optional.constant(false)
  }));
}
function getKeyScaleForColor(forAlpha) {
  return forAlpha ? 0.1 : 1;
}
function extractColorType(params) {
  var _a;
  return (_a = params.color) === null || _a === void 0 ? void 0 : _a.type;
}
var FloatColor = class {
  constructor(comps, mode) {
    this.type = "float";
    this.mode = mode;
    this.comps_ = constrainColorComponents(comps, mode, this.type);
  }
  getComponents(opt_mode) {
    return appendAlphaComponent(convertColor(removeAlphaComponent(this.comps_), { mode: this.mode, type: this.type }, { mode: opt_mode !== null && opt_mode !== void 0 ? opt_mode : this.mode, type: this.type }), this.comps_[3]);
  }
  toRgbaObject() {
    const rgbComps = this.getComponents("rgb");
    return {
      r: rgbComps[0],
      g: rgbComps[1],
      b: rgbComps[2],
      a: rgbComps[3]
    };
  }
};
var TYPE_TO_CONSTRUCTOR_MAP = {
  int: (comps, mode) => new IntColor(comps, mode),
  float: (comps, mode) => new FloatColor(comps, mode)
};
function createColor(comps, mode, type) {
  return TYPE_TO_CONSTRUCTOR_MAP[type](comps, mode);
}
function isFloatColor(c) {
  return c.type === "float";
}
function isIntColor(c) {
  return c.type === "int";
}
function convertFloatToInt(cf) {
  const comps = cf.getComponents();
  const ms = getColorMaxComponents(cf.mode, "int");
  return new IntColor([
    Math.round(mapRange(comps[0], 0, 1, 0, ms[0])),
    Math.round(mapRange(comps[1], 0, 1, 0, ms[1])),
    Math.round(mapRange(comps[2], 0, 1, 0, ms[2])),
    comps[3]
  ], cf.mode);
}
function convertIntToFloat(ci) {
  const comps = ci.getComponents();
  const ms = getColorMaxComponents(ci.mode, "int");
  return new FloatColor([
    mapRange(comps[0], 0, ms[0], 0, 1),
    mapRange(comps[1], 0, ms[1], 0, 1),
    mapRange(comps[2], 0, ms[2], 0, 1),
    comps[3]
  ], ci.mode);
}
function mapColorType(c, type) {
  if (c.type === type) {
    return c;
  }
  if (isIntColor(c) && type === "float") {
    return convertIntToFloat(c);
  }
  if (isFloatColor(c) && type === "int") {
    return convertFloatToInt(c);
  }
  throw TpError.shouldNeverHappen();
}
function equalsStringColorFormat(f1, f2) {
  return f1.alpha === f2.alpha && f1.mode === f2.mode && f1.notation === f2.notation && f1.type === f2.type;
}
function parseCssNumberOrPercentage(text, max) {
  const m = text.match(/^(.+)%$/);
  if (!m) {
    return Math.min(parseFloat(text), max);
  }
  return Math.min(parseFloat(m[1]) * 0.01 * max, max);
}
var ANGLE_TO_DEG_MAP = {
  deg: (angle) => angle,
  grad: (angle) => angle * 360 / 400,
  rad: (angle) => angle * 360 / (2 * Math.PI),
  turn: (angle) => angle * 360
};
function parseCssNumberOrAngle(text) {
  const m = text.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
  if (!m) {
    return parseFloat(text);
  }
  const angle = parseFloat(m[1]);
  const unit = m[2];
  return ANGLE_TO_DEG_MAP[unit](angle);
}
function parseFunctionalRgbColorComponents(text) {
  const m = text.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
  if (!m) {
    return null;
  }
  const comps = [
    parseCssNumberOrPercentage(m[1], 255),
    parseCssNumberOrPercentage(m[2], 255),
    parseCssNumberOrPercentage(m[3], 255)
  ];
  if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
    return null;
  }
  return comps;
}
function parseFunctionalRgbColor(text) {
  const comps = parseFunctionalRgbColorComponents(text);
  return comps ? new IntColor(comps, "rgb") : null;
}
function parseFunctionalRgbaColorComponents(text) {
  const m = text.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
  if (!m) {
    return null;
  }
  const comps = [
    parseCssNumberOrPercentage(m[1], 255),
    parseCssNumberOrPercentage(m[2], 255),
    parseCssNumberOrPercentage(m[3], 255),
    parseCssNumberOrPercentage(m[4], 1)
  ];
  if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
    return null;
  }
  return comps;
}
function parseFunctionalRgbaColor(text) {
  const comps = parseFunctionalRgbaColorComponents(text);
  return comps ? new IntColor(comps, "rgb") : null;
}
function parseFunctionalHslColorComponents(text) {
  const m = text.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
  if (!m) {
    return null;
  }
  const comps = [
    parseCssNumberOrAngle(m[1]),
    parseCssNumberOrPercentage(m[2], 100),
    parseCssNumberOrPercentage(m[3], 100)
  ];
  if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
    return null;
  }
  return comps;
}
function parseFunctionalHslColor(text) {
  const comps = parseFunctionalHslColorComponents(text);
  return comps ? new IntColor(comps, "hsl") : null;
}
function parseHslaColorComponents(text) {
  const m = text.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
  if (!m) {
    return null;
  }
  const comps = [
    parseCssNumberOrAngle(m[1]),
    parseCssNumberOrPercentage(m[2], 100),
    parseCssNumberOrPercentage(m[3], 100),
    parseCssNumberOrPercentage(m[4], 1)
  ];
  if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
    return null;
  }
  return comps;
}
function parseFunctionalHslaColor(text) {
  const comps = parseHslaColorComponents(text);
  return comps ? new IntColor(comps, "hsl") : null;
}
function parseHexRgbColorComponents(text) {
  const mRgb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
  if (mRgb) {
    return [
      parseInt(mRgb[1] + mRgb[1], 16),
      parseInt(mRgb[2] + mRgb[2], 16),
      parseInt(mRgb[3] + mRgb[3], 16)
    ];
  }
  const mRrggbb = text.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
  if (mRrggbb) {
    return [
      parseInt(mRrggbb[1], 16),
      parseInt(mRrggbb[2], 16),
      parseInt(mRrggbb[3], 16)
    ];
  }
  return null;
}
function parseHexRgbColor(text) {
  const comps = parseHexRgbColorComponents(text);
  return comps ? new IntColor(comps, "rgb") : null;
}
function parseHexRgbaColorComponents(text) {
  const mRgb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
  if (mRgb) {
    return [
      parseInt(mRgb[1] + mRgb[1], 16),
      parseInt(mRgb[2] + mRgb[2], 16),
      parseInt(mRgb[3] + mRgb[3], 16),
      mapRange(parseInt(mRgb[4] + mRgb[4], 16), 0, 255, 0, 1)
    ];
  }
  const mRrggbb = text.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
  if (mRrggbb) {
    return [
      parseInt(mRrggbb[1], 16),
      parseInt(mRrggbb[2], 16),
      parseInt(mRrggbb[3], 16),
      mapRange(parseInt(mRrggbb[4], 16), 0, 255, 0, 1)
    ];
  }
  return null;
}
function parseHexRgbaColor(text) {
  const comps = parseHexRgbaColorComponents(text);
  return comps ? new IntColor(comps, "rgb") : null;
}
function parseObjectRgbColorComponents(text) {
  const m = text.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
  if (!m) {
    return null;
  }
  const comps = [
    parseFloat(m[1]),
    parseFloat(m[2]),
    parseFloat(m[3])
  ];
  if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
    return null;
  }
  return comps;
}
function createObjectRgbColorParser(type) {
  return (text) => {
    const comps = parseObjectRgbColorComponents(text);
    return comps ? createColor(comps, "rgb", type) : null;
  };
}
function parseObjectRgbaColorComponents(text) {
  const m = text.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);
  if (!m) {
    return null;
  }
  const comps = [
    parseFloat(m[1]),
    parseFloat(m[2]),
    parseFloat(m[3]),
    parseFloat(m[4])
  ];
  if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2]) || isNaN(comps[3])) {
    return null;
  }
  return comps;
}
function createObjectRgbaColorParser(type) {
  return (text) => {
    const comps = parseObjectRgbaColorComponents(text);
    return comps ? createColor(comps, "rgb", type) : null;
  };
}
var PARSER_AND_RESULT = [
  {
    parser: parseHexRgbColorComponents,
    result: {
      alpha: false,
      mode: "rgb",
      notation: "hex"
    }
  },
  {
    parser: parseHexRgbaColorComponents,
    result: {
      alpha: true,
      mode: "rgb",
      notation: "hex"
    }
  },
  {
    parser: parseFunctionalRgbColorComponents,
    result: {
      alpha: false,
      mode: "rgb",
      notation: "func"
    }
  },
  {
    parser: parseFunctionalRgbaColorComponents,
    result: {
      alpha: true,
      mode: "rgb",
      notation: "func"
    }
  },
  {
    parser: parseFunctionalHslColorComponents,
    result: {
      alpha: false,
      mode: "hsl",
      notation: "func"
    }
  },
  {
    parser: parseHslaColorComponents,
    result: {
      alpha: true,
      mode: "hsl",
      notation: "func"
    }
  },
  {
    parser: parseObjectRgbColorComponents,
    result: {
      alpha: false,
      mode: "rgb",
      notation: "object"
    }
  },
  {
    parser: parseObjectRgbaColorComponents,
    result: {
      alpha: true,
      mode: "rgb",
      notation: "object"
    }
  }
];
function detectStringColor(text) {
  return PARSER_AND_RESULT.reduce((prev, { parser, result: detection }) => {
    if (prev) {
      return prev;
    }
    return parser(text) ? detection : null;
  }, null);
}
function detectStringColorFormat(text, type = "int") {
  const r = detectStringColor(text);
  if (!r) {
    return null;
  }
  if (r.notation === "hex" && type !== "float") {
    return Object.assign(Object.assign({}, r), { type: "int" });
  }
  if (r.notation === "func") {
    return Object.assign(Object.assign({}, r), { type });
  }
  return null;
}
function createColorStringParser(type) {
  const parsers = [
    parseHexRgbColor,
    parseHexRgbaColor,
    parseFunctionalRgbColor,
    parseFunctionalRgbaColor,
    parseFunctionalHslColor,
    parseFunctionalHslaColor
  ];
  if (type === "int") {
    parsers.push(createObjectRgbColorParser("int"), createObjectRgbaColorParser("int"));
  }
  if (type === "float") {
    parsers.push(createObjectRgbColorParser("float"), createObjectRgbaColorParser("float"));
  }
  const parser = composeParsers(parsers);
  return (text) => {
    const result = parser(text);
    return result ? mapColorType(result, type) : null;
  };
}
function readIntColorString(value) {
  const parser = createColorStringParser("int");
  if (typeof value !== "string") {
    return IntColor.black();
  }
  const result = parser(value);
  return result !== null && result !== void 0 ? result : IntColor.black();
}
function zerofill(comp) {
  const hex = constrainRange(Math.floor(comp), 0, 255).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
function colorToHexRgbString(value, prefix = "#") {
  const hexes = removeAlphaComponent(value.getComponents("rgb")).map(zerofill).join("");
  return `${prefix}${hexes}`;
}
function colorToHexRgbaString(value, prefix = "#") {
  const rgbaComps = value.getComponents("rgb");
  const hexes = [rgbaComps[0], rgbaComps[1], rgbaComps[2], rgbaComps[3] * 255].map(zerofill).join("");
  return `${prefix}${hexes}`;
}
function colorToFunctionalRgbString(value) {
  const formatter = createNumberFormatter(0);
  const ci = mapColorType(value, "int");
  const comps = removeAlphaComponent(ci.getComponents("rgb")).map((comp) => formatter(comp));
  return `rgb(${comps.join(", ")})`;
}
function colorToFunctionalRgbaString(value) {
  const aFormatter = createNumberFormatter(2);
  const rgbFormatter = createNumberFormatter(0);
  const ci = mapColorType(value, "int");
  const comps = ci.getComponents("rgb").map((comp, index) => {
    const formatter = index === 3 ? aFormatter : rgbFormatter;
    return formatter(comp);
  });
  return `rgba(${comps.join(", ")})`;
}
function colorToFunctionalHslString(value) {
  const formatters = [
    createNumberFormatter(0),
    formatPercentage,
    formatPercentage
  ];
  const ci = mapColorType(value, "int");
  const comps = removeAlphaComponent(ci.getComponents("hsl")).map((comp, index) => formatters[index](comp));
  return `hsl(${comps.join(", ")})`;
}
function colorToFunctionalHslaString(value) {
  const formatters = [
    createNumberFormatter(0),
    formatPercentage,
    formatPercentage,
    createNumberFormatter(2)
  ];
  const ci = mapColorType(value, "int");
  const comps = ci.getComponents("hsl").map((comp, index) => formatters[index](comp));
  return `hsla(${comps.join(", ")})`;
}
function colorToObjectRgbString(value, type) {
  const formatter = createNumberFormatter(type === "float" ? 2 : 0);
  const names = ["r", "g", "b"];
  const cc = mapColorType(value, type);
  const comps = removeAlphaComponent(cc.getComponents("rgb")).map((comp, index) => `${names[index]}: ${formatter(comp)}`);
  return `{${comps.join(", ")}}`;
}
function createObjectRgbColorFormatter(type) {
  return (value) => colorToObjectRgbString(value, type);
}
function colorToObjectRgbaString(value, type) {
  const aFormatter = createNumberFormatter(2);
  const rgbFormatter = createNumberFormatter(type === "float" ? 2 : 0);
  const names = ["r", "g", "b", "a"];
  const cc = mapColorType(value, type);
  const comps = cc.getComponents("rgb").map((comp, index) => {
    const formatter = index === 3 ? aFormatter : rgbFormatter;
    return `${names[index]}: ${formatter(comp)}`;
  });
  return `{${comps.join(", ")}}`;
}
function createObjectRgbaColorFormatter(type) {
  return (value) => colorToObjectRgbaString(value, type);
}
var FORMAT_AND_STRINGIFIERS = [
  {
    format: {
      alpha: false,
      mode: "rgb",
      notation: "hex",
      type: "int"
    },
    stringifier: colorToHexRgbString
  },
  {
    format: {
      alpha: true,
      mode: "rgb",
      notation: "hex",
      type: "int"
    },
    stringifier: colorToHexRgbaString
  },
  {
    format: {
      alpha: false,
      mode: "rgb",
      notation: "func",
      type: "int"
    },
    stringifier: colorToFunctionalRgbString
  },
  {
    format: {
      alpha: true,
      mode: "rgb",
      notation: "func",
      type: "int"
    },
    stringifier: colorToFunctionalRgbaString
  },
  {
    format: {
      alpha: false,
      mode: "hsl",
      notation: "func",
      type: "int"
    },
    stringifier: colorToFunctionalHslString
  },
  {
    format: {
      alpha: true,
      mode: "hsl",
      notation: "func",
      type: "int"
    },
    stringifier: colorToFunctionalHslaString
  },
  ...["int", "float"].reduce((prev, type) => {
    return [
      ...prev,
      {
        format: {
          alpha: false,
          mode: "rgb",
          notation: "object",
          type
        },
        stringifier: createObjectRgbColorFormatter(type)
      },
      {
        format: {
          alpha: true,
          mode: "rgb",
          notation: "object",
          type
        },
        stringifier: createObjectRgbaColorFormatter(type)
      }
    ];
  }, [])
];
function findColorStringifier(format) {
  return FORMAT_AND_STRINGIFIERS.reduce((prev, fas) => {
    if (prev) {
      return prev;
    }
    return equalsStringColorFormat(fas.format, format) ? fas.stringifier : null;
  }, null);
}
var cn$b = ClassName("apl");
var APaletteView = class {
  constructor(doc, config) {
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.value = config.value;
    this.value.emitter.on("change", this.onValueChange_);
    this.element = doc.createElement("div");
    this.element.classList.add(cn$b());
    config.viewProps.bindClassModifiers(this.element);
    config.viewProps.bindTabIndex(this.element);
    const barElem = doc.createElement("div");
    barElem.classList.add(cn$b("b"));
    this.element.appendChild(barElem);
    const colorElem = doc.createElement("div");
    colorElem.classList.add(cn$b("c"));
    barElem.appendChild(colorElem);
    this.colorElem_ = colorElem;
    const markerElem = doc.createElement("div");
    markerElem.classList.add(cn$b("m"));
    this.element.appendChild(markerElem);
    this.markerElem_ = markerElem;
    const previewElem = doc.createElement("div");
    previewElem.classList.add(cn$b("p"));
    this.markerElem_.appendChild(previewElem);
    this.previewElem_ = previewElem;
    this.update_();
  }
  update_() {
    const c = this.value.rawValue;
    const rgbaComps = c.getComponents("rgb");
    const leftColor = new IntColor([rgbaComps[0], rgbaComps[1], rgbaComps[2], 0], "rgb");
    const rightColor = new IntColor([rgbaComps[0], rgbaComps[1], rgbaComps[2], 255], "rgb");
    const gradientComps = [
      "to right",
      colorToFunctionalRgbaString(leftColor),
      colorToFunctionalRgbaString(rightColor)
    ];
    this.colorElem_.style.background = `linear-gradient(${gradientComps.join(",")})`;
    this.previewElem_.style.backgroundColor = colorToFunctionalRgbaString(c);
    const left = mapRange(rgbaComps[3], 0, 1, 0, 100);
    this.markerElem_.style.left = `${left}%`;
  }
  onValueChange_() {
    this.update_();
  }
};
var APaletteController = class {
  constructor(doc, config) {
    this.onKeyDown_ = this.onKeyDown_.bind(this);
    this.onKeyUp_ = this.onKeyUp_.bind(this);
    this.onPointerDown_ = this.onPointerDown_.bind(this);
    this.onPointerMove_ = this.onPointerMove_.bind(this);
    this.onPointerUp_ = this.onPointerUp_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new APaletteView(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    this.ptHandler_ = new PointerHandler(this.view.element);
    this.ptHandler_.emitter.on("down", this.onPointerDown_);
    this.ptHandler_.emitter.on("move", this.onPointerMove_);
    this.ptHandler_.emitter.on("up", this.onPointerUp_);
    this.view.element.addEventListener("keydown", this.onKeyDown_);
    this.view.element.addEventListener("keyup", this.onKeyUp_);
  }
  handlePointerEvent_(d, opts) {
    if (!d.point) {
      return;
    }
    const alpha = d.point.x / d.bounds.width;
    const c = this.value.rawValue;
    const [h, s, v] = c.getComponents("hsv");
    this.value.setRawValue(new IntColor([h, s, v, alpha], "hsv"), opts);
  }
  onPointerDown_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerMove_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerUp_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: true,
      last: true
    });
  }
  onKeyDown_(ev) {
    const step = getStepForKey(getKeyScaleForColor(true), getHorizontalStepKeys(ev));
    if (step === 0) {
      return;
    }
    const c = this.value.rawValue;
    const [h, s, v, a] = c.getComponents("hsv");
    this.value.setRawValue(new IntColor([h, s, v, a + step], "hsv"), {
      forceEmit: false,
      last: false
    });
  }
  onKeyUp_(ev) {
    const step = getStepForKey(getKeyScaleForColor(true), getHorizontalStepKeys(ev));
    if (step === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue, {
      forceEmit: true,
      last: true
    });
  }
};
var cn$a = ClassName("coltxt");
function createModeSelectElement(doc) {
  const selectElem = doc.createElement("select");
  const items = [
    { text: "RGB", value: "rgb" },
    { text: "HSL", value: "hsl" },
    { text: "HSV", value: "hsv" },
    { text: "HEX", value: "hex" }
  ];
  selectElem.appendChild(items.reduce((frag, item) => {
    const optElem = doc.createElement("option");
    optElem.textContent = item.text;
    optElem.value = item.value;
    frag.appendChild(optElem);
    return frag;
  }, doc.createDocumentFragment()));
  return selectElem;
}
var ColorTextsView = class {
  constructor(doc, config) {
    this.element = doc.createElement("div");
    this.element.classList.add(cn$a());
    config.viewProps.bindClassModifiers(this.element);
    const modeElem = doc.createElement("div");
    modeElem.classList.add(cn$a("m"));
    this.modeElem_ = createModeSelectElement(doc);
    this.modeElem_.classList.add(cn$a("ms"));
    modeElem.appendChild(this.modeSelectElement);
    config.viewProps.bindDisabled(this.modeElem_);
    const modeMarkerElem = doc.createElement("div");
    modeMarkerElem.classList.add(cn$a("mm"));
    modeMarkerElem.appendChild(createSvgIconElement(doc, "dropdown"));
    modeElem.appendChild(modeMarkerElem);
    this.element.appendChild(modeElem);
    const inputsElem = doc.createElement("div");
    inputsElem.classList.add(cn$a("w"));
    this.element.appendChild(inputsElem);
    this.inputsElem_ = inputsElem;
    this.inputViews_ = config.inputViews;
    this.applyInputViews_();
    bindValue(config.mode, (mode) => {
      this.modeElem_.value = mode;
    });
  }
  get modeSelectElement() {
    return this.modeElem_;
  }
  get inputViews() {
    return this.inputViews_;
  }
  set inputViews(inputViews) {
    this.inputViews_ = inputViews;
    this.applyInputViews_();
  }
  applyInputViews_() {
    removeChildElements(this.inputsElem_);
    const doc = this.element.ownerDocument;
    this.inputViews_.forEach((v) => {
      const compElem = doc.createElement("div");
      compElem.classList.add(cn$a("c"));
      compElem.appendChild(v.element);
      this.inputsElem_.appendChild(compElem);
    });
  }
};
function createFormatter$2(type) {
  return createNumberFormatter(type === "float" ? 2 : 0);
}
function createConstraint$5(mode, type, index) {
  const max = getColorMaxComponents(mode, type)[index];
  return new DefiniteRangeConstraint({
    min: 0,
    max
  });
}
function createComponentController(doc, config, index) {
  return new NumberTextController(doc, {
    arrayPosition: index === 0 ? "fst" : index === 3 - 1 ? "lst" : "mid",
    parser: config.parser,
    props: ValueMap.fromObject({
      formatter: createFormatter$2(config.colorType),
      keyScale: getKeyScaleForColor(false),
      pointerScale: config.colorType === "float" ? 0.01 : 1
    }),
    value: createValue(0, {
      constraint: createConstraint$5(config.colorMode, config.colorType, index)
    }),
    viewProps: config.viewProps
  });
}
function createComponentControllers(doc, config) {
  const cc = {
    colorMode: config.colorMode,
    colorType: config.colorType,
    parser: parseNumber,
    viewProps: config.viewProps
  };
  return [0, 1, 2].map((i) => {
    const c = createComponentController(doc, cc, i);
    connectValues({
      primary: config.value,
      secondary: c.value,
      forward(p) {
        const mc = mapColorType(p, config.colorType);
        return mc.getComponents(config.colorMode)[i];
      },
      backward(p, s) {
        const pickedMode = config.colorMode;
        const mc = mapColorType(p, config.colorType);
        const comps = mc.getComponents(pickedMode);
        comps[i] = s;
        const c2 = createColor(appendAlphaComponent(removeAlphaComponent(comps), comps[3]), pickedMode, config.colorType);
        return mapColorType(c2, "int");
      }
    });
    return c;
  });
}
function createHexController(doc, config) {
  const c = new TextController(doc, {
    parser: createColorStringParser("int"),
    props: ValueMap.fromObject({
      formatter: colorToHexRgbString
    }),
    value: createValue(IntColor.black()),
    viewProps: config.viewProps
  });
  connectValues({
    primary: config.value,
    secondary: c.value,
    forward: (p) => new IntColor(removeAlphaComponent(p.getComponents()), p.mode),
    backward: (p, s) => new IntColor(appendAlphaComponent(removeAlphaComponent(s.getComponents(p.mode)), p.getComponents()[3]), p.mode)
  });
  return [c];
}
function isColorMode(mode) {
  return mode !== "hex";
}
var ColorTextsController = class {
  constructor(doc, config) {
    this.onModeSelectChange_ = this.onModeSelectChange_.bind(this);
    this.colorType_ = config.colorType;
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.colorMode = createValue(this.value.rawValue.mode);
    this.ccs_ = this.createComponentControllers_(doc);
    this.view = new ColorTextsView(doc, {
      mode: this.colorMode,
      inputViews: [this.ccs_[0].view, this.ccs_[1].view, this.ccs_[2].view],
      viewProps: this.viewProps
    });
    this.view.modeSelectElement.addEventListener("change", this.onModeSelectChange_);
  }
  createComponentControllers_(doc) {
    const mode = this.colorMode.rawValue;
    if (isColorMode(mode)) {
      return createComponentControllers(doc, {
        colorMode: mode,
        colorType: this.colorType_,
        value: this.value,
        viewProps: this.viewProps
      });
    }
    return createHexController(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
  }
  onModeSelectChange_(ev) {
    const selectElem = ev.currentTarget;
    this.colorMode.rawValue = selectElem.value;
    this.ccs_ = this.createComponentControllers_(this.view.element.ownerDocument);
    this.view.inputViews = this.ccs_.map((cc) => cc.view);
  }
};
var cn$9 = ClassName("hpl");
var HPaletteView = class {
  constructor(doc, config) {
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.value = config.value;
    this.value.emitter.on("change", this.onValueChange_);
    this.element = doc.createElement("div");
    this.element.classList.add(cn$9());
    config.viewProps.bindClassModifiers(this.element);
    config.viewProps.bindTabIndex(this.element);
    const colorElem = doc.createElement("div");
    colorElem.classList.add(cn$9("c"));
    this.element.appendChild(colorElem);
    const markerElem = doc.createElement("div");
    markerElem.classList.add(cn$9("m"));
    this.element.appendChild(markerElem);
    this.markerElem_ = markerElem;
    this.update_();
  }
  update_() {
    const c = this.value.rawValue;
    const [h] = c.getComponents("hsv");
    this.markerElem_.style.backgroundColor = colorToFunctionalRgbString(new IntColor([h, 100, 100], "hsv"));
    const left = mapRange(h, 0, 360, 0, 100);
    this.markerElem_.style.left = `${left}%`;
  }
  onValueChange_() {
    this.update_();
  }
};
var HPaletteController = class {
  constructor(doc, config) {
    this.onKeyDown_ = this.onKeyDown_.bind(this);
    this.onKeyUp_ = this.onKeyUp_.bind(this);
    this.onPointerDown_ = this.onPointerDown_.bind(this);
    this.onPointerMove_ = this.onPointerMove_.bind(this);
    this.onPointerUp_ = this.onPointerUp_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new HPaletteView(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    this.ptHandler_ = new PointerHandler(this.view.element);
    this.ptHandler_.emitter.on("down", this.onPointerDown_);
    this.ptHandler_.emitter.on("move", this.onPointerMove_);
    this.ptHandler_.emitter.on("up", this.onPointerUp_);
    this.view.element.addEventListener("keydown", this.onKeyDown_);
    this.view.element.addEventListener("keyup", this.onKeyUp_);
  }
  handlePointerEvent_(d, opts) {
    if (!d.point) {
      return;
    }
    const hue = mapRange(constrainRange(d.point.x, 0, d.bounds.width), 0, d.bounds.width, 0, 360);
    const c = this.value.rawValue;
    const [, s, v, a] = c.getComponents("hsv");
    this.value.setRawValue(new IntColor([hue, s, v, a], "hsv"), opts);
  }
  onPointerDown_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerMove_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerUp_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: true,
      last: true
    });
  }
  onKeyDown_(ev) {
    const step = getStepForKey(getKeyScaleForColor(false), getHorizontalStepKeys(ev));
    if (step === 0) {
      return;
    }
    const c = this.value.rawValue;
    const [h, s, v, a] = c.getComponents("hsv");
    this.value.setRawValue(new IntColor([h + step, s, v, a], "hsv"), {
      forceEmit: false,
      last: false
    });
  }
  onKeyUp_(ev) {
    const step = getStepForKey(getKeyScaleForColor(false), getHorizontalStepKeys(ev));
    if (step === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue, {
      forceEmit: true,
      last: true
    });
  }
};
var cn$8 = ClassName("svp");
var CANVAS_RESOL = 64;
var SvPaletteView = class {
  constructor(doc, config) {
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.value = config.value;
    this.value.emitter.on("change", this.onValueChange_);
    this.element = doc.createElement("div");
    this.element.classList.add(cn$8());
    config.viewProps.bindClassModifiers(this.element);
    config.viewProps.bindTabIndex(this.element);
    const canvasElem = doc.createElement("canvas");
    canvasElem.height = CANVAS_RESOL;
    canvasElem.width = CANVAS_RESOL;
    canvasElem.classList.add(cn$8("c"));
    this.element.appendChild(canvasElem);
    this.canvasElement = canvasElem;
    const markerElem = doc.createElement("div");
    markerElem.classList.add(cn$8("m"));
    this.element.appendChild(markerElem);
    this.markerElem_ = markerElem;
    this.update_();
  }
  update_() {
    const ctx = getCanvasContext(this.canvasElement);
    if (!ctx) {
      return;
    }
    const c = this.value.rawValue;
    const hsvComps = c.getComponents("hsv");
    const width = this.canvasElement.width;
    const height = this.canvasElement.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let iy = 0; iy < height; iy++) {
      for (let ix = 0; ix < width; ix++) {
        const s = mapRange(ix, 0, width, 0, 100);
        const v = mapRange(iy, 0, height, 100, 0);
        const rgbComps = hsvToRgbInt(hsvComps[0], s, v);
        const i = (iy * width + ix) * 4;
        data[i] = rgbComps[0];
        data[i + 1] = rgbComps[1];
        data[i + 2] = rgbComps[2];
        data[i + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    const left = mapRange(hsvComps[1], 0, 100, 0, 100);
    this.markerElem_.style.left = `${left}%`;
    const top = mapRange(hsvComps[2], 0, 100, 100, 0);
    this.markerElem_.style.top = `${top}%`;
  }
  onValueChange_() {
    this.update_();
  }
};
var SvPaletteController = class {
  constructor(doc, config) {
    this.onKeyDown_ = this.onKeyDown_.bind(this);
    this.onKeyUp_ = this.onKeyUp_.bind(this);
    this.onPointerDown_ = this.onPointerDown_.bind(this);
    this.onPointerMove_ = this.onPointerMove_.bind(this);
    this.onPointerUp_ = this.onPointerUp_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new SvPaletteView(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    this.ptHandler_ = new PointerHandler(this.view.element);
    this.ptHandler_.emitter.on("down", this.onPointerDown_);
    this.ptHandler_.emitter.on("move", this.onPointerMove_);
    this.ptHandler_.emitter.on("up", this.onPointerUp_);
    this.view.element.addEventListener("keydown", this.onKeyDown_);
    this.view.element.addEventListener("keyup", this.onKeyUp_);
  }
  handlePointerEvent_(d, opts) {
    if (!d.point) {
      return;
    }
    const saturation = mapRange(d.point.x, 0, d.bounds.width, 0, 100);
    const value = mapRange(d.point.y, 0, d.bounds.height, 100, 0);
    const [h, , , a] = this.value.rawValue.getComponents("hsv");
    this.value.setRawValue(new IntColor([h, saturation, value, a], "hsv"), opts);
  }
  onPointerDown_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerMove_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerUp_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: true,
      last: true
    });
  }
  onKeyDown_(ev) {
    if (isArrowKey(ev.key)) {
      ev.preventDefault();
    }
    const [h, s, v, a] = this.value.rawValue.getComponents("hsv");
    const keyScale = getKeyScaleForColor(false);
    const ds = getStepForKey(keyScale, getHorizontalStepKeys(ev));
    const dv = getStepForKey(keyScale, getVerticalStepKeys(ev));
    if (ds === 0 && dv === 0) {
      return;
    }
    this.value.setRawValue(new IntColor([h, s + ds, v + dv, a], "hsv"), {
      forceEmit: false,
      last: false
    });
  }
  onKeyUp_(ev) {
    const keyScale = getKeyScaleForColor(false);
    const ds = getStepForKey(keyScale, getHorizontalStepKeys(ev));
    const dv = getStepForKey(keyScale, getVerticalStepKeys(ev));
    if (ds === 0 && dv === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue, {
      forceEmit: true,
      last: true
    });
  }
};
var ColorPickerController = class {
  constructor(doc, config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.hPaletteC_ = new HPaletteController(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    this.svPaletteC_ = new SvPaletteController(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    this.alphaIcs_ = config.supportsAlpha ? {
      palette: new APaletteController(doc, {
        value: this.value,
        viewProps: this.viewProps
      }),
      text: new NumberTextController(doc, {
        parser: parseNumber,
        props: ValueMap.fromObject({
          pointerScale: 0.01,
          keyScale: 0.1,
          formatter: createNumberFormatter(2)
        }),
        value: createValue(0, {
          constraint: new DefiniteRangeConstraint({ min: 0, max: 1 })
        }),
        viewProps: this.viewProps
      })
    } : null;
    if (this.alphaIcs_) {
      connectValues({
        primary: this.value,
        secondary: this.alphaIcs_.text.value,
        forward: (p) => p.getComponents()[3],
        backward: (p, s) => {
          const comps = p.getComponents();
          comps[3] = s;
          return new IntColor(comps, p.mode);
        }
      });
    }
    this.textsC_ = new ColorTextsController(doc, {
      colorType: config.colorType,
      value: this.value,
      viewProps: this.viewProps
    });
    this.view = new ColorPickerView(doc, {
      alphaViews: this.alphaIcs_ ? {
        palette: this.alphaIcs_.palette.view,
        text: this.alphaIcs_.text.view
      } : null,
      hPaletteView: this.hPaletteC_.view,
      supportsAlpha: config.supportsAlpha,
      svPaletteView: this.svPaletteC_.view,
      textsView: this.textsC_.view,
      viewProps: this.viewProps
    });
  }
  get textsController() {
    return this.textsC_;
  }
};
var cn$7 = ClassName("colsw");
var ColorSwatchView = class {
  constructor(doc, config) {
    this.onValueChange_ = this.onValueChange_.bind(this);
    config.value.emitter.on("change", this.onValueChange_);
    this.value = config.value;
    this.element = doc.createElement("div");
    this.element.classList.add(cn$7());
    config.viewProps.bindClassModifiers(this.element);
    const swatchElem = doc.createElement("div");
    swatchElem.classList.add(cn$7("sw"));
    this.element.appendChild(swatchElem);
    this.swatchElem_ = swatchElem;
    const buttonElem = doc.createElement("button");
    buttonElem.classList.add(cn$7("b"));
    config.viewProps.bindDisabled(buttonElem);
    this.element.appendChild(buttonElem);
    this.buttonElement = buttonElem;
    this.update_();
  }
  update_() {
    const value = this.value.rawValue;
    this.swatchElem_.style.backgroundColor = colorToHexRgbaString(value);
  }
  onValueChange_() {
    this.update_();
  }
};
var ColorSwatchController = class {
  constructor(doc, config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new ColorSwatchView(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
  }
};
var ColorController = class {
  constructor(doc, config) {
    this.onButtonBlur_ = this.onButtonBlur_.bind(this);
    this.onButtonClick_ = this.onButtonClick_.bind(this);
    this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
    this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.foldable_ = Foldable.create(config.expanded);
    this.swatchC_ = new ColorSwatchController(doc, {
      value: this.value,
      viewProps: this.viewProps
    });
    const buttonElem = this.swatchC_.view.buttonElement;
    buttonElem.addEventListener("blur", this.onButtonBlur_);
    buttonElem.addEventListener("click", this.onButtonClick_);
    this.textC_ = new TextController(doc, {
      parser: config.parser,
      props: ValueMap.fromObject({
        formatter: config.formatter
      }),
      value: this.value,
      viewProps: this.viewProps
    });
    this.view = new ColorView(doc, {
      foldable: this.foldable_,
      pickerLayout: config.pickerLayout
    });
    this.view.swatchElement.appendChild(this.swatchC_.view.element);
    this.view.textElement.appendChild(this.textC_.view.element);
    this.popC_ = config.pickerLayout === "popup" ? new PopupController(doc, {
      viewProps: this.viewProps
    }) : null;
    const pickerC = new ColorPickerController(doc, {
      colorType: config.colorType,
      supportsAlpha: config.supportsAlpha,
      value: this.value,
      viewProps: this.viewProps
    });
    pickerC.view.allFocusableElements.forEach((elem) => {
      elem.addEventListener("blur", this.onPopupChildBlur_);
      elem.addEventListener("keydown", this.onPopupChildKeydown_);
    });
    this.pickerC_ = pickerC;
    if (this.popC_) {
      this.view.element.appendChild(this.popC_.view.element);
      this.popC_.view.element.appendChild(pickerC.view.element);
      connectValues({
        primary: this.foldable_.value("expanded"),
        secondary: this.popC_.shows,
        forward: (p) => p,
        backward: (_, s) => s
      });
    } else if (this.view.pickerElement) {
      this.view.pickerElement.appendChild(this.pickerC_.view.element);
      bindFoldable(this.foldable_, this.view.pickerElement);
    }
  }
  get textController() {
    return this.textC_;
  }
  onButtonBlur_(e) {
    if (!this.popC_) {
      return;
    }
    const elem = this.view.element;
    const nextTarget = forceCast(e.relatedTarget);
    if (!nextTarget || !elem.contains(nextTarget)) {
      this.popC_.shows.rawValue = false;
    }
  }
  onButtonClick_() {
    this.foldable_.set("expanded", !this.foldable_.get("expanded"));
    if (this.foldable_.get("expanded")) {
      this.pickerC_.view.allFocusableElements[0].focus();
    }
  }
  onPopupChildBlur_(ev) {
    if (!this.popC_) {
      return;
    }
    const elem = this.popC_.view.element;
    const nextTarget = findNextTarget(ev);
    if (nextTarget && elem.contains(nextTarget)) {
      return;
    }
    if (nextTarget && nextTarget === this.swatchC_.view.buttonElement && !supportsTouch(elem.ownerDocument)) {
      return;
    }
    this.popC_.shows.rawValue = false;
  }
  onPopupChildKeydown_(ev) {
    if (this.popC_) {
      if (ev.key === "Escape") {
        this.popC_.shows.rawValue = false;
      }
    } else if (this.view.pickerElement) {
      if (ev.key === "Escape") {
        this.swatchC_.view.buttonElement.focus();
      }
    }
  }
};
function colorToRgbNumber(value) {
  return removeAlphaComponent(value.getComponents("rgb")).reduce((result, comp) => {
    return result << 8 | Math.floor(comp) & 255;
  }, 0);
}
function colorToRgbaNumber(value) {
  return value.getComponents("rgb").reduce((result, comp, index) => {
    const hex = Math.floor(index === 3 ? comp * 255 : comp) & 255;
    return result << 8 | hex;
  }, 0) >>> 0;
}
function numberToRgbColor(num) {
  return new IntColor([num >> 16 & 255, num >> 8 & 255, num & 255], "rgb");
}
function numberToRgbaColor(num) {
  return new IntColor([
    num >> 24 & 255,
    num >> 16 & 255,
    num >> 8 & 255,
    mapRange(num & 255, 0, 255, 0, 1)
  ], "rgb");
}
function colorFromRgbNumber(value) {
  if (typeof value !== "number") {
    return IntColor.black();
  }
  return numberToRgbColor(value);
}
function colorFromRgbaNumber(value) {
  if (typeof value !== "number") {
    return IntColor.black();
  }
  return numberToRgbaColor(value);
}
function isRgbColorComponent(obj, key) {
  if (typeof obj !== "object" || isEmpty(obj)) {
    return false;
  }
  return key in obj && typeof obj[key] === "number";
}
function isRgbColorObject(obj) {
  return isRgbColorComponent(obj, "r") && isRgbColorComponent(obj, "g") && isRgbColorComponent(obj, "b");
}
function isRgbaColorObject(obj) {
  return isRgbColorObject(obj) && isRgbColorComponent(obj, "a");
}
function isColorObject(obj) {
  return isRgbColorObject(obj);
}
function equalsColor(v1, v2) {
  if (v1.mode !== v2.mode) {
    return false;
  }
  if (v1.type !== v2.type) {
    return false;
  }
  const comps1 = v1.getComponents();
  const comps2 = v2.getComponents();
  for (let i = 0; i < comps1.length; i++) {
    if (comps1[i] !== comps2[i]) {
      return false;
    }
  }
  return true;
}
function createColorComponentsFromRgbObject(obj) {
  return "a" in obj ? [obj.r, obj.g, obj.b, obj.a] : [obj.r, obj.g, obj.b];
}
function createColorStringWriter(format) {
  const stringify = findColorStringifier(format);
  return stringify ? (target, value) => {
    writePrimitive(target, stringify(value));
  } : null;
}
function createColorNumberWriter(supportsAlpha) {
  const colorToNumber = supportsAlpha ? colorToRgbaNumber : colorToRgbNumber;
  return (target, value) => {
    writePrimitive(target, colorToNumber(value));
  };
}
function writeRgbaColorObject(target, value, type) {
  const cc = mapColorType(value, type);
  const obj = cc.toRgbaObject();
  target.writeProperty("r", obj.r);
  target.writeProperty("g", obj.g);
  target.writeProperty("b", obj.b);
  target.writeProperty("a", obj.a);
}
function writeRgbColorObject(target, value, type) {
  const cc = mapColorType(value, type);
  const obj = cc.toRgbaObject();
  target.writeProperty("r", obj.r);
  target.writeProperty("g", obj.g);
  target.writeProperty("b", obj.b);
}
function createColorObjectWriter(supportsAlpha, type) {
  return (target, inValue) => {
    if (supportsAlpha) {
      writeRgbaColorObject(target, inValue, type);
    } else {
      writeRgbColorObject(target, inValue, type);
    }
  };
}
function shouldSupportAlpha$1(inputParams) {
  var _a;
  if ((_a = inputParams === null || inputParams === void 0 ? void 0 : inputParams.color) === null || _a === void 0 ? void 0 : _a.alpha) {
    return true;
  }
  return false;
}
function createFormatter$1(supportsAlpha) {
  return supportsAlpha ? (v) => colorToHexRgbaString(v, "0x") : (v) => colorToHexRgbString(v, "0x");
}
function isForColor(params) {
  if ("color" in params) {
    return true;
  }
  if (params.view === "color") {
    return true;
  }
  return false;
}
var NumberColorInputPlugin = createPlugin({
  id: "input-color-number",
  type: "input",
  accept: (value, params) => {
    if (typeof value !== "number") {
      return null;
    }
    if (!isForColor(params)) {
      return null;
    }
    const result = parseColorInputParams(params);
    return result ? {
      initialValue: value,
      params: Object.assign(Object.assign({}, result), { supportsAlpha: shouldSupportAlpha$1(params) })
    } : null;
  },
  binding: {
    reader: (args) => {
      return args.params.supportsAlpha ? colorFromRgbaNumber : colorFromRgbNumber;
    },
    equals: equalsColor,
    writer: (args) => {
      return createColorNumberWriter(args.params.supportsAlpha);
    }
  },
  controller: (args) => {
    var _a, _b;
    return new ColorController(args.document, {
      colorType: "int",
      expanded: (_a = args.params.expanded) !== null && _a !== void 0 ? _a : false,
      formatter: createFormatter$1(args.params.supportsAlpha),
      parser: createColorStringParser("int"),
      pickerLayout: (_b = args.params.picker) !== null && _b !== void 0 ? _b : "popup",
      supportsAlpha: args.params.supportsAlpha,
      value: args.value,
      viewProps: args.viewProps
    });
  }
});
function colorFromObject(value, type) {
  if (!isColorObject(value)) {
    return mapColorType(IntColor.black(), type);
  }
  if (type === "int") {
    const comps = createColorComponentsFromRgbObject(value);
    return new IntColor(comps, "rgb");
  }
  if (type === "float") {
    const comps = createColorComponentsFromRgbObject(value);
    return new FloatColor(comps, "rgb");
  }
  return mapColorType(IntColor.black(), "int");
}
function shouldSupportAlpha(initialValue) {
  return isRgbaColorObject(initialValue);
}
function createColorObjectBindingReader(type) {
  return (value) => {
    const c = colorFromObject(value, type);
    return mapColorType(c, "int");
  };
}
function createColorObjectFormatter(supportsAlpha, type) {
  return (value) => {
    if (supportsAlpha) {
      return colorToObjectRgbaString(value, type);
    }
    return colorToObjectRgbString(value, type);
  };
}
var ObjectColorInputPlugin = createPlugin({
  id: "input-color-object",
  type: "input",
  accept: (value, params) => {
    var _a;
    if (!isColorObject(value)) {
      return null;
    }
    const result = parseColorInputParams(params);
    return result ? {
      initialValue: value,
      params: Object.assign(Object.assign({}, result), { colorType: (_a = extractColorType(params)) !== null && _a !== void 0 ? _a : "int" })
    } : null;
  },
  binding: {
    reader: (args) => createColorObjectBindingReader(args.params.colorType),
    equals: equalsColor,
    writer: (args) => createColorObjectWriter(shouldSupportAlpha(args.initialValue), args.params.colorType)
  },
  controller: (args) => {
    var _a, _b;
    const supportsAlpha = isRgbaColorObject(args.initialValue);
    return new ColorController(args.document, {
      colorType: args.params.colorType,
      expanded: (_a = args.params.expanded) !== null && _a !== void 0 ? _a : false,
      formatter: createColorObjectFormatter(supportsAlpha, args.params.colorType),
      parser: createColorStringParser("int"),
      pickerLayout: (_b = args.params.picker) !== null && _b !== void 0 ? _b : "popup",
      supportsAlpha,
      value: args.value,
      viewProps: args.viewProps
    });
  }
});
var StringColorInputPlugin = createPlugin({
  id: "input-color-string",
  type: "input",
  accept: (value, params) => {
    if (typeof value !== "string") {
      return null;
    }
    if (params.view === "text") {
      return null;
    }
    const format = detectStringColorFormat(value, extractColorType(params));
    if (!format) {
      return null;
    }
    const stringifier = findColorStringifier(format);
    if (!stringifier) {
      return null;
    }
    const result = parseColorInputParams(params);
    return result ? {
      initialValue: value,
      params: Object.assign(Object.assign({}, result), { format, stringifier })
    } : null;
  },
  binding: {
    reader: () => readIntColorString,
    equals: equalsColor,
    writer: (args) => {
      const writer = createColorStringWriter(args.params.format);
      if (!writer) {
        throw TpError.notBindable();
      }
      return writer;
    }
  },
  controller: (args) => {
    var _a, _b;
    return new ColorController(args.document, {
      colorType: args.params.format.type,
      expanded: (_a = args.params.expanded) !== null && _a !== void 0 ? _a : false,
      formatter: args.params.stringifier,
      parser: createColorStringParser("int"),
      pickerLayout: (_b = args.params.picker) !== null && _b !== void 0 ? _b : "popup",
      supportsAlpha: args.params.format.alpha,
      value: args.value,
      viewProps: args.viewProps
    });
  }
});
var PointNdConstraint = class {
  constructor(config) {
    this.components = config.components;
    this.asm_ = config.assembly;
  }
  constrain(value) {
    const comps = this.asm_.toComponents(value).map((comp, index) => {
      var _a, _b;
      return (_b = (_a = this.components[index]) === null || _a === void 0 ? void 0 : _a.constrain(comp)) !== null && _b !== void 0 ? _b : comp;
    });
    return this.asm_.fromComponents(comps);
  }
};
var cn$6 = ClassName("pndtxt");
var PointNdTextView = class {
  constructor(doc, config) {
    this.textViews = config.textViews;
    this.element = doc.createElement("div");
    this.element.classList.add(cn$6());
    this.textViews.forEach((v) => {
      const axisElem = doc.createElement("div");
      axisElem.classList.add(cn$6("a"));
      axisElem.appendChild(v.element);
      this.element.appendChild(axisElem);
    });
  }
};
function createAxisController(doc, config, index) {
  return new NumberTextController(doc, {
    arrayPosition: index === 0 ? "fst" : index === config.axes.length - 1 ? "lst" : "mid",
    parser: config.parser,
    props: config.axes[index].textProps,
    value: createValue(0, {
      constraint: config.axes[index].constraint
    }),
    viewProps: config.viewProps
  });
}
var PointNdTextController = class {
  constructor(doc, config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.acs_ = config.axes.map((_, index) => createAxisController(doc, config, index));
    this.acs_.forEach((c, index) => {
      connectValues({
        primary: this.value,
        secondary: c.value,
        forward: (p) => config.assembly.toComponents(p)[index],
        backward: (p, s) => {
          const comps = config.assembly.toComponents(p);
          comps[index] = s;
          return config.assembly.fromComponents(comps);
        }
      });
    });
    this.view = new PointNdTextView(doc, {
      textViews: this.acs_.map((ac) => ac.view)
    });
  }
  get textControllers() {
    return this.acs_;
  }
};
var SliderInputBindingApi = class extends BindingApi {
  get max() {
    return this.controller.valueController.sliderController.props.get("max");
  }
  set max(max) {
    this.controller.valueController.sliderController.props.set("max", max);
  }
  get min() {
    return this.controller.valueController.sliderController.props.get("min");
  }
  set min(max) {
    this.controller.valueController.sliderController.props.set("min", max);
  }
};
function createConstraint$4(params, initialValue) {
  const constraints = [];
  const sc = createStepConstraint(params, initialValue);
  if (sc) {
    constraints.push(sc);
  }
  const rc = createRangeConstraint(params);
  if (rc) {
    constraints.push(rc);
  }
  const lc = createListConstraint(params.options);
  if (lc) {
    constraints.push(lc);
  }
  return new CompositeConstraint(constraints);
}
var NumberInputPlugin = createPlugin({
  id: "input-number",
  type: "input",
  accept: (value, params) => {
    if (typeof value !== "number") {
      return null;
    }
    const result = parseRecord(params, (p) => Object.assign(Object.assign({}, createNumberTextInputParamsParser(p)), { options: p.optional.custom(parseListOptions), readonly: p.optional.constant(false) }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: (_args) => numberFromUnknown,
    constraint: (args) => createConstraint$4(args.params, args.initialValue),
    writer: (_args) => writePrimitive
  },
  controller: (args) => {
    const value = args.value;
    const c = args.constraint;
    const lc = c && findConstraint(c, ListConstraint);
    if (lc) {
      return new ListController(args.document, {
        props: new ValueMap({
          options: lc.values.value("options")
        }),
        value,
        viewProps: args.viewProps
      });
    }
    const textPropsObj = createNumberTextPropsObject(args.params, value.rawValue);
    const drc = c && findConstraint(c, DefiniteRangeConstraint);
    if (drc) {
      return new SliderTextController(args.document, Object.assign(Object.assign({}, createSliderTextProps(Object.assign(Object.assign({}, textPropsObj), { keyScale: createValue(textPropsObj.keyScale), max: drc.values.value("max"), min: drc.values.value("min") }))), { parser: parseNumber, value, viewProps: args.viewProps }));
    }
    return new NumberTextController(args.document, {
      parser: parseNumber,
      props: ValueMap.fromObject(textPropsObj),
      value,
      viewProps: args.viewProps
    });
  },
  api(args) {
    if (typeof args.controller.value.rawValue !== "number") {
      return null;
    }
    if (args.controller.valueController instanceof SliderTextController) {
      return new SliderInputBindingApi(args.controller);
    }
    if (args.controller.valueController instanceof ListController) {
      return new ListInputBindingApi(args.controller);
    }
    return null;
  }
});
var Point2d = class {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  getComponents() {
    return [this.x, this.y];
  }
  static isObject(obj) {
    if (isEmpty(obj)) {
      return false;
    }
    const x = obj.x;
    const y = obj.y;
    if (typeof x !== "number" || typeof y !== "number") {
      return false;
    }
    return true;
  }
  static equals(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y;
  }
  toObject() {
    return {
      x: this.x,
      y: this.y
    };
  }
};
var Point2dAssembly = {
  toComponents: (p) => p.getComponents(),
  fromComponents: (comps) => new Point2d(...comps)
};
var cn$5 = ClassName("p2d");
var Point2dView = class {
  constructor(doc, config) {
    this.element = doc.createElement("div");
    this.element.classList.add(cn$5());
    config.viewProps.bindClassModifiers(this.element);
    bindValue(config.expanded, valueToClassName(this.element, cn$5(void 0, "expanded")));
    const headElem = doc.createElement("div");
    headElem.classList.add(cn$5("h"));
    this.element.appendChild(headElem);
    const buttonElem = doc.createElement("button");
    buttonElem.classList.add(cn$5("b"));
    buttonElem.appendChild(createSvgIconElement(doc, "p2dpad"));
    config.viewProps.bindDisabled(buttonElem);
    headElem.appendChild(buttonElem);
    this.buttonElement = buttonElem;
    const textElem = doc.createElement("div");
    textElem.classList.add(cn$5("t"));
    headElem.appendChild(textElem);
    this.textElement = textElem;
    if (config.pickerLayout === "inline") {
      const pickerElem = doc.createElement("div");
      pickerElem.classList.add(cn$5("p"));
      this.element.appendChild(pickerElem);
      this.pickerElement = pickerElem;
    } else {
      this.pickerElement = null;
    }
  }
};
var cn$4 = ClassName("p2dp");
var Point2dPickerView = class {
  constructor(doc, config) {
    this.onFoldableChange_ = this.onFoldableChange_.bind(this);
    this.onPropsChange_ = this.onPropsChange_.bind(this);
    this.onValueChange_ = this.onValueChange_.bind(this);
    this.props_ = config.props;
    this.props_.emitter.on("change", this.onPropsChange_);
    this.element = doc.createElement("div");
    this.element.classList.add(cn$4());
    if (config.layout === "popup") {
      this.element.classList.add(cn$4(void 0, "p"));
    }
    config.viewProps.bindClassModifiers(this.element);
    const padElem = doc.createElement("div");
    padElem.classList.add(cn$4("p"));
    config.viewProps.bindTabIndex(padElem);
    this.element.appendChild(padElem);
    this.padElement = padElem;
    const svgElem = doc.createElementNS(SVG_NS, "svg");
    svgElem.classList.add(cn$4("g"));
    this.padElement.appendChild(svgElem);
    this.svgElem_ = svgElem;
    const xAxisElem = doc.createElementNS(SVG_NS, "line");
    xAxisElem.classList.add(cn$4("ax"));
    xAxisElem.setAttributeNS(null, "x1", "0");
    xAxisElem.setAttributeNS(null, "y1", "50%");
    xAxisElem.setAttributeNS(null, "x2", "100%");
    xAxisElem.setAttributeNS(null, "y2", "50%");
    this.svgElem_.appendChild(xAxisElem);
    const yAxisElem = doc.createElementNS(SVG_NS, "line");
    yAxisElem.classList.add(cn$4("ax"));
    yAxisElem.setAttributeNS(null, "x1", "50%");
    yAxisElem.setAttributeNS(null, "y1", "0");
    yAxisElem.setAttributeNS(null, "x2", "50%");
    yAxisElem.setAttributeNS(null, "y2", "100%");
    this.svgElem_.appendChild(yAxisElem);
    const lineElem = doc.createElementNS(SVG_NS, "line");
    lineElem.classList.add(cn$4("l"));
    lineElem.setAttributeNS(null, "x1", "50%");
    lineElem.setAttributeNS(null, "y1", "50%");
    this.svgElem_.appendChild(lineElem);
    this.lineElem_ = lineElem;
    const markerElem = doc.createElement("div");
    markerElem.classList.add(cn$4("m"));
    this.padElement.appendChild(markerElem);
    this.markerElem_ = markerElem;
    config.value.emitter.on("change", this.onValueChange_);
    this.value = config.value;
    this.update_();
  }
  get allFocusableElements() {
    return [this.padElement];
  }
  update_() {
    const [x, y] = this.value.rawValue.getComponents();
    const max = this.props_.get("max");
    const px = mapRange(x, -max, +max, 0, 100);
    const py = mapRange(y, -max, +max, 0, 100);
    const ipy = this.props_.get("invertsY") ? 100 - py : py;
    this.lineElem_.setAttributeNS(null, "x2", `${px}%`);
    this.lineElem_.setAttributeNS(null, "y2", `${ipy}%`);
    this.markerElem_.style.left = `${px}%`;
    this.markerElem_.style.top = `${ipy}%`;
  }
  onValueChange_() {
    this.update_();
  }
  onPropsChange_() {
    this.update_();
  }
  onFoldableChange_() {
    this.update_();
  }
};
function computeOffset(ev, keyScales, invertsY) {
  return [
    getStepForKey(keyScales[0], getHorizontalStepKeys(ev)),
    getStepForKey(keyScales[1], getVerticalStepKeys(ev)) * (invertsY ? 1 : -1)
  ];
}
var Point2dPickerController = class {
  constructor(doc, config) {
    this.onPadKeyDown_ = this.onPadKeyDown_.bind(this);
    this.onPadKeyUp_ = this.onPadKeyUp_.bind(this);
    this.onPointerDown_ = this.onPointerDown_.bind(this);
    this.onPointerMove_ = this.onPointerMove_.bind(this);
    this.onPointerUp_ = this.onPointerUp_.bind(this);
    this.props = config.props;
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new Point2dPickerView(doc, {
      layout: config.layout,
      props: this.props,
      value: this.value,
      viewProps: this.viewProps
    });
    this.ptHandler_ = new PointerHandler(this.view.padElement);
    this.ptHandler_.emitter.on("down", this.onPointerDown_);
    this.ptHandler_.emitter.on("move", this.onPointerMove_);
    this.ptHandler_.emitter.on("up", this.onPointerUp_);
    this.view.padElement.addEventListener("keydown", this.onPadKeyDown_);
    this.view.padElement.addEventListener("keyup", this.onPadKeyUp_);
  }
  handlePointerEvent_(d, opts) {
    if (!d.point) {
      return;
    }
    const max = this.props.get("max");
    const px = mapRange(d.point.x, 0, d.bounds.width, -max, +max);
    const py = mapRange(this.props.get("invertsY") ? d.bounds.height - d.point.y : d.point.y, 0, d.bounds.height, -max, +max);
    this.value.setRawValue(new Point2d(px, py), opts);
  }
  onPointerDown_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerMove_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: false,
      last: false
    });
  }
  onPointerUp_(ev) {
    this.handlePointerEvent_(ev.data, {
      forceEmit: true,
      last: true
    });
  }
  onPadKeyDown_(ev) {
    if (isArrowKey(ev.key)) {
      ev.preventDefault();
    }
    const [dx, dy] = computeOffset(ev, [this.props.get("xKeyScale"), this.props.get("yKeyScale")], this.props.get("invertsY"));
    if (dx === 0 && dy === 0) {
      return;
    }
    this.value.setRawValue(new Point2d(this.value.rawValue.x + dx, this.value.rawValue.y + dy), {
      forceEmit: false,
      last: false
    });
  }
  onPadKeyUp_(ev) {
    const [dx, dy] = computeOffset(ev, [this.props.get("xKeyScale"), this.props.get("yKeyScale")], this.props.get("invertsY"));
    if (dx === 0 && dy === 0) {
      return;
    }
    this.value.setRawValue(this.value.rawValue, {
      forceEmit: true,
      last: true
    });
  }
};
var Point2dController = class {
  constructor(doc, config) {
    var _a, _b;
    this.onPopupChildBlur_ = this.onPopupChildBlur_.bind(this);
    this.onPopupChildKeydown_ = this.onPopupChildKeydown_.bind(this);
    this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this);
    this.onPadButtonClick_ = this.onPadButtonClick_.bind(this);
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.foldable_ = Foldable.create(config.expanded);
    this.popC_ = config.pickerLayout === "popup" ? new PopupController(doc, {
      viewProps: this.viewProps
    }) : null;
    const padC = new Point2dPickerController(doc, {
      layout: config.pickerLayout,
      props: new ValueMap({
        invertsY: createValue(config.invertsY),
        max: createValue(config.max),
        xKeyScale: config.axes[0].textProps.value("keyScale"),
        yKeyScale: config.axes[1].textProps.value("keyScale")
      }),
      value: this.value,
      viewProps: this.viewProps
    });
    padC.view.allFocusableElements.forEach((elem) => {
      elem.addEventListener("blur", this.onPopupChildBlur_);
      elem.addEventListener("keydown", this.onPopupChildKeydown_);
    });
    this.pickerC_ = padC;
    this.textC_ = new PointNdTextController(doc, {
      assembly: Point2dAssembly,
      axes: config.axes,
      parser: config.parser,
      value: this.value,
      viewProps: this.viewProps
    });
    this.view = new Point2dView(doc, {
      expanded: this.foldable_.value("expanded"),
      pickerLayout: config.pickerLayout,
      viewProps: this.viewProps
    });
    this.view.textElement.appendChild(this.textC_.view.element);
    (_a = this.view.buttonElement) === null || _a === void 0 ? void 0 : _a.addEventListener("blur", this.onPadButtonBlur_);
    (_b = this.view.buttonElement) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.onPadButtonClick_);
    if (this.popC_) {
      this.view.element.appendChild(this.popC_.view.element);
      this.popC_.view.element.appendChild(this.pickerC_.view.element);
      connectValues({
        primary: this.foldable_.value("expanded"),
        secondary: this.popC_.shows,
        forward: (p) => p,
        backward: (_, s) => s
      });
    } else if (this.view.pickerElement) {
      this.view.pickerElement.appendChild(this.pickerC_.view.element);
      bindFoldable(this.foldable_, this.view.pickerElement);
    }
  }
  get textController() {
    return this.textC_;
  }
  onPadButtonBlur_(e) {
    if (!this.popC_) {
      return;
    }
    const elem = this.view.element;
    const nextTarget = forceCast(e.relatedTarget);
    if (!nextTarget || !elem.contains(nextTarget)) {
      this.popC_.shows.rawValue = false;
    }
  }
  onPadButtonClick_() {
    this.foldable_.set("expanded", !this.foldable_.get("expanded"));
    if (this.foldable_.get("expanded")) {
      this.pickerC_.view.allFocusableElements[0].focus();
    }
  }
  onPopupChildBlur_(ev) {
    if (!this.popC_) {
      return;
    }
    const elem = this.popC_.view.element;
    const nextTarget = findNextTarget(ev);
    if (nextTarget && elem.contains(nextTarget)) {
      return;
    }
    if (nextTarget && nextTarget === this.view.buttonElement && !supportsTouch(elem.ownerDocument)) {
      return;
    }
    this.popC_.shows.rawValue = false;
  }
  onPopupChildKeydown_(ev) {
    if (this.popC_) {
      if (ev.key === "Escape") {
        this.popC_.shows.rawValue = false;
      }
    } else if (this.view.pickerElement) {
      if (ev.key === "Escape") {
        this.view.buttonElement.focus();
      }
    }
  }
};
function point2dFromUnknown(value) {
  return Point2d.isObject(value) ? new Point2d(value.x, value.y) : new Point2d();
}
function writePoint2d(target, value) {
  target.writeProperty("x", value.x);
  target.writeProperty("y", value.y);
}
function createConstraint$3(params, initialValue) {
  return new PointNdConstraint({
    assembly: Point2dAssembly,
    components: [
      createDimensionConstraint(Object.assign(Object.assign({}, params), params.x), initialValue.x),
      createDimensionConstraint(Object.assign(Object.assign({}, params), params.y), initialValue.y)
    ]
  });
}
function getSuitableMaxDimensionValue(params, rawValue) {
  var _a, _b;
  if (!isEmpty(params.min) || !isEmpty(params.max)) {
    return Math.max(Math.abs((_a = params.min) !== null && _a !== void 0 ? _a : 0), Math.abs((_b = params.max) !== null && _b !== void 0 ? _b : 0));
  }
  const step = getSuitableKeyScale(params);
  return Math.max(Math.abs(step) * 10, Math.abs(rawValue) * 10);
}
function getSuitableMax(params, initialValue) {
  var _a, _b;
  const xr = getSuitableMaxDimensionValue(deepMerge(params, (_a = params.x) !== null && _a !== void 0 ? _a : {}), initialValue.x);
  const yr = getSuitableMaxDimensionValue(deepMerge(params, (_b = params.y) !== null && _b !== void 0 ? _b : {}), initialValue.y);
  return Math.max(xr, yr);
}
function shouldInvertY(params) {
  if (!("y" in params)) {
    return false;
  }
  const yParams = params.y;
  if (!yParams) {
    return false;
  }
  return "inverted" in yParams ? !!yParams.inverted : false;
}
var Point2dInputPlugin = createPlugin({
  id: "input-point2d",
  type: "input",
  accept: (value, params) => {
    if (!Point2d.isObject(value)) {
      return null;
    }
    const result = parseRecord(params, (p) => Object.assign(Object.assign({}, createPointDimensionParser(p)), { expanded: p.optional.boolean, picker: p.optional.custom(parsePickerLayout), readonly: p.optional.constant(false), x: p.optional.custom(parsePointDimensionParams), y: p.optional.object(Object.assign(Object.assign({}, createPointDimensionParser(p)), { inverted: p.optional.boolean })) }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: () => point2dFromUnknown,
    constraint: (args) => createConstraint$3(args.params, args.initialValue),
    equals: Point2d.equals,
    writer: () => writePoint2d
  },
  controller: (args) => {
    var _a, _b;
    const doc = args.document;
    const value = args.value;
    const c = args.constraint;
    const dParams = [args.params.x, args.params.y];
    return new Point2dController(doc, {
      axes: value.rawValue.getComponents().map((comp, i) => {
        var _a2;
        return createPointAxis({
          constraint: c.components[i],
          initialValue: comp,
          params: deepMerge(args.params, (_a2 = dParams[i]) !== null && _a2 !== void 0 ? _a2 : {})
        });
      }),
      expanded: (_a = args.params.expanded) !== null && _a !== void 0 ? _a : false,
      invertsY: shouldInvertY(args.params),
      max: getSuitableMax(args.params, value.rawValue),
      parser: parseNumber,
      pickerLayout: (_b = args.params.picker) !== null && _b !== void 0 ? _b : "popup",
      value,
      viewProps: args.viewProps
    });
  }
});
var Point3d = class {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  getComponents() {
    return [this.x, this.y, this.z];
  }
  static isObject(obj) {
    if (isEmpty(obj)) {
      return false;
    }
    const x = obj.x;
    const y = obj.y;
    const z = obj.z;
    if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
      return false;
    }
    return true;
  }
  static equals(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
  }
  toObject() {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    };
  }
};
var Point3dAssembly = {
  toComponents: (p) => p.getComponents(),
  fromComponents: (comps) => new Point3d(...comps)
};
function point3dFromUnknown(value) {
  return Point3d.isObject(value) ? new Point3d(value.x, value.y, value.z) : new Point3d();
}
function writePoint3d(target, value) {
  target.writeProperty("x", value.x);
  target.writeProperty("y", value.y);
  target.writeProperty("z", value.z);
}
function createConstraint$2(params, initialValue) {
  return new PointNdConstraint({
    assembly: Point3dAssembly,
    components: [
      createDimensionConstraint(Object.assign(Object.assign({}, params), params.x), initialValue.x),
      createDimensionConstraint(Object.assign(Object.assign({}, params), params.y), initialValue.y),
      createDimensionConstraint(Object.assign(Object.assign({}, params), params.z), initialValue.z)
    ]
  });
}
var Point3dInputPlugin = createPlugin({
  id: "input-point3d",
  type: "input",
  accept: (value, params) => {
    if (!Point3d.isObject(value)) {
      return null;
    }
    const result = parseRecord(params, (p) => Object.assign(Object.assign({}, createPointDimensionParser(p)), { readonly: p.optional.constant(false), x: p.optional.custom(parsePointDimensionParams), y: p.optional.custom(parsePointDimensionParams), z: p.optional.custom(parsePointDimensionParams) }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: (_args) => point3dFromUnknown,
    constraint: (args) => createConstraint$2(args.params, args.initialValue),
    equals: Point3d.equals,
    writer: (_args) => writePoint3d
  },
  controller: (args) => {
    const value = args.value;
    const c = args.constraint;
    const dParams = [args.params.x, args.params.y, args.params.z];
    return new PointNdTextController(args.document, {
      assembly: Point3dAssembly,
      axes: value.rawValue.getComponents().map((comp, i) => {
        var _a;
        return createPointAxis({
          constraint: c.components[i],
          initialValue: comp,
          params: deepMerge(args.params, (_a = dParams[i]) !== null && _a !== void 0 ? _a : {})
        });
      }),
      parser: parseNumber,
      value,
      viewProps: args.viewProps
    });
  }
});
var Point4d = class {
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  getComponents() {
    return [this.x, this.y, this.z, this.w];
  }
  static isObject(obj) {
    if (isEmpty(obj)) {
      return false;
    }
    const x = obj.x;
    const y = obj.y;
    const z = obj.z;
    const w = obj.w;
    if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number" || typeof w !== "number") {
      return false;
    }
    return true;
  }
  static equals(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z && v1.w === v2.w;
  }
  toObject() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
      w: this.w
    };
  }
};
var Point4dAssembly = {
  toComponents: (p) => p.getComponents(),
  fromComponents: (comps) => new Point4d(...comps)
};
function point4dFromUnknown(value) {
  return Point4d.isObject(value) ? new Point4d(value.x, value.y, value.z, value.w) : new Point4d();
}
function writePoint4d(target, value) {
  target.writeProperty("x", value.x);
  target.writeProperty("y", value.y);
  target.writeProperty("z", value.z);
  target.writeProperty("w", value.w);
}
function createConstraint$1(params, initialValue) {
  return new PointNdConstraint({
    assembly: Point4dAssembly,
    components: [
      createDimensionConstraint(Object.assign(Object.assign({}, params), params.x), initialValue.x),
      createDimensionConstraint(Object.assign(Object.assign({}, params), params.y), initialValue.y),
      createDimensionConstraint(Object.assign(Object.assign({}, params), params.z), initialValue.z),
      createDimensionConstraint(Object.assign(Object.assign({}, params), params.w), initialValue.w)
    ]
  });
}
var Point4dInputPlugin = createPlugin({
  id: "input-point4d",
  type: "input",
  accept: (value, params) => {
    if (!Point4d.isObject(value)) {
      return null;
    }
    const result = parseRecord(params, (p) => Object.assign(Object.assign({}, createPointDimensionParser(p)), { readonly: p.optional.constant(false), w: p.optional.custom(parsePointDimensionParams), x: p.optional.custom(parsePointDimensionParams), y: p.optional.custom(parsePointDimensionParams), z: p.optional.custom(parsePointDimensionParams) }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: (_args) => point4dFromUnknown,
    constraint: (args) => createConstraint$1(args.params, args.initialValue),
    equals: Point4d.equals,
    writer: (_args) => writePoint4d
  },
  controller: (args) => {
    const value = args.value;
    const c = args.constraint;
    const dParams = [
      args.params.x,
      args.params.y,
      args.params.z,
      args.params.w
    ];
    return new PointNdTextController(args.document, {
      assembly: Point4dAssembly,
      axes: value.rawValue.getComponents().map((comp, i) => {
        var _a;
        return createPointAxis({
          constraint: c.components[i],
          initialValue: comp,
          params: deepMerge(args.params, (_a = dParams[i]) !== null && _a !== void 0 ? _a : {})
        });
      }),
      parser: parseNumber,
      value,
      viewProps: args.viewProps
    });
  }
});
function createConstraint(params) {
  const constraints = [];
  const lc = createListConstraint(params.options);
  if (lc) {
    constraints.push(lc);
  }
  return new CompositeConstraint(constraints);
}
var StringInputPlugin = createPlugin({
  id: "input-string",
  type: "input",
  accept: (value, params) => {
    if (typeof value !== "string") {
      return null;
    }
    const result = parseRecord(params, (p) => ({
      readonly: p.optional.constant(false),
      options: p.optional.custom(parseListOptions)
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: (_args) => stringFromUnknown,
    constraint: (args) => createConstraint(args.params),
    writer: (_args) => writePrimitive
  },
  controller: (args) => {
    const doc = args.document;
    const value = args.value;
    const c = args.constraint;
    const lc = c && findConstraint(c, ListConstraint);
    if (lc) {
      return new ListController(doc, {
        props: new ValueMap({
          options: lc.values.value("options")
        }),
        value,
        viewProps: args.viewProps
      });
    }
    return new TextController(doc, {
      parser: (v) => v,
      props: ValueMap.fromObject({
        formatter: formatString
      }),
      value,
      viewProps: args.viewProps
    });
  },
  api(args) {
    if (typeof args.controller.value.rawValue !== "string") {
      return null;
    }
    if (args.controller.valueController instanceof ListController) {
      return new ListInputBindingApi(args.controller);
    }
    return null;
  }
});
var Constants = {
  monitor: {
    defaultInterval: 200,
    defaultRows: 3
  }
};
var cn$3 = ClassName("mll");
var MultiLogView = class {
  constructor(doc, config) {
    this.onValueUpdate_ = this.onValueUpdate_.bind(this);
    this.formatter_ = config.formatter;
    this.element = doc.createElement("div");
    this.element.classList.add(cn$3());
    config.viewProps.bindClassModifiers(this.element);
    const textareaElem = doc.createElement("textarea");
    textareaElem.classList.add(cn$3("i"));
    textareaElem.style.height = `calc(var(${getCssVar("containerUnitSize")}) * ${config.rows})`;
    textareaElem.readOnly = true;
    config.viewProps.bindDisabled(textareaElem);
    this.element.appendChild(textareaElem);
    this.textareaElem_ = textareaElem;
    config.value.emitter.on("change", this.onValueUpdate_);
    this.value = config.value;
    this.update_();
  }
  update_() {
    const elem = this.textareaElem_;
    const shouldScroll = elem.scrollTop === elem.scrollHeight - elem.clientHeight;
    const lines = [];
    this.value.rawValue.forEach((value) => {
      if (value !== void 0) {
        lines.push(this.formatter_(value));
      }
    });
    elem.textContent = lines.join("\n");
    if (shouldScroll) {
      elem.scrollTop = elem.scrollHeight;
    }
  }
  onValueUpdate_() {
    this.update_();
  }
};
var MultiLogController = class {
  constructor(doc, config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new MultiLogView(doc, {
      formatter: config.formatter,
      rows: config.rows,
      value: this.value,
      viewProps: this.viewProps
    });
  }
};
var cn$2 = ClassName("sgl");
var SingleLogView = class {
  constructor(doc, config) {
    this.onValueUpdate_ = this.onValueUpdate_.bind(this);
    this.formatter_ = config.formatter;
    this.element = doc.createElement("div");
    this.element.classList.add(cn$2());
    config.viewProps.bindClassModifiers(this.element);
    const inputElem = doc.createElement("input");
    inputElem.classList.add(cn$2("i"));
    inputElem.readOnly = true;
    inputElem.type = "text";
    config.viewProps.bindDisabled(inputElem);
    this.element.appendChild(inputElem);
    this.inputElement = inputElem;
    config.value.emitter.on("change", this.onValueUpdate_);
    this.value = config.value;
    this.update_();
  }
  update_() {
    const values = this.value.rawValue;
    const lastValue = values[values.length - 1];
    this.inputElement.value = lastValue !== void 0 ? this.formatter_(lastValue) : "";
  }
  onValueUpdate_() {
    this.update_();
  }
};
var SingleLogController = class {
  constructor(doc, config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.view = new SingleLogView(doc, {
      formatter: config.formatter,
      value: this.value,
      viewProps: this.viewProps
    });
  }
};
var BooleanMonitorPlugin = createPlugin({
  id: "monitor-bool",
  type: "monitor",
  accept: (value, params) => {
    if (typeof value !== "boolean") {
      return null;
    }
    const result = parseRecord(params, (p) => ({
      readonly: p.required.constant(true),
      rows: p.optional.number
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: (_args) => boolFromUnknown
  },
  controller: (args) => {
    var _a;
    if (args.value.rawValue.length === 1) {
      return new SingleLogController(args.document, {
        formatter: BooleanFormatter,
        value: args.value,
        viewProps: args.viewProps
      });
    }
    return new MultiLogController(args.document, {
      formatter: BooleanFormatter,
      rows: (_a = args.params.rows) !== null && _a !== void 0 ? _a : Constants.monitor.defaultRows,
      value: args.value,
      viewProps: args.viewProps
    });
  }
});
var GraphLogMonitorBindingApi = class extends BindingApi {
  get max() {
    return this.controller.valueController.props.get("max");
  }
  set max(max) {
    this.controller.valueController.props.set("max", max);
  }
  get min() {
    return this.controller.valueController.props.get("min");
  }
  set min(min) {
    this.controller.valueController.props.set("min", min);
  }
};
var cn$1 = ClassName("grl");
var GraphLogView = class {
  constructor(doc, config) {
    this.onCursorChange_ = this.onCursorChange_.bind(this);
    this.onValueUpdate_ = this.onValueUpdate_.bind(this);
    this.element = doc.createElement("div");
    this.element.classList.add(cn$1());
    config.viewProps.bindClassModifiers(this.element);
    this.formatter_ = config.formatter;
    this.props_ = config.props;
    this.cursor_ = config.cursor;
    this.cursor_.emitter.on("change", this.onCursorChange_);
    const svgElem = doc.createElementNS(SVG_NS, "svg");
    svgElem.classList.add(cn$1("g"));
    svgElem.style.height = `calc(var(${getCssVar("containerUnitSize")}) * ${config.rows})`;
    this.element.appendChild(svgElem);
    this.svgElem_ = svgElem;
    const lineElem = doc.createElementNS(SVG_NS, "polyline");
    this.svgElem_.appendChild(lineElem);
    this.lineElem_ = lineElem;
    const tooltipElem = doc.createElement("div");
    tooltipElem.classList.add(cn$1("t"), ClassName("tt")());
    this.element.appendChild(tooltipElem);
    this.tooltipElem_ = tooltipElem;
    config.value.emitter.on("change", this.onValueUpdate_);
    this.value = config.value;
    this.update_();
  }
  get graphElement() {
    return this.svgElem_;
  }
  update_() {
    const { clientWidth: w, clientHeight: h } = this.element;
    const maxIndex = this.value.rawValue.length - 1;
    const min = this.props_.get("min");
    const max = this.props_.get("max");
    const points = [];
    this.value.rawValue.forEach((v, index) => {
      if (v === void 0) {
        return;
      }
      const x = mapRange(index, 0, maxIndex, 0, w);
      const y = mapRange(v, min, max, h, 0);
      points.push([x, y].join(","));
    });
    this.lineElem_.setAttributeNS(null, "points", points.join(" "));
    const tooltipElem = this.tooltipElem_;
    const value = this.value.rawValue[this.cursor_.rawValue];
    if (value === void 0) {
      tooltipElem.classList.remove(cn$1("t", "a"));
      return;
    }
    const tx = mapRange(this.cursor_.rawValue, 0, maxIndex, 0, w);
    const ty = mapRange(value, min, max, h, 0);
    tooltipElem.style.left = `${tx}px`;
    tooltipElem.style.top = `${ty}px`;
    tooltipElem.textContent = `${this.formatter_(value)}`;
    if (!tooltipElem.classList.contains(cn$1("t", "a"))) {
      tooltipElem.classList.add(cn$1("t", "a"), cn$1("t", "in"));
      forceReflow(tooltipElem);
      tooltipElem.classList.remove(cn$1("t", "in"));
    }
  }
  onValueUpdate_() {
    this.update_();
  }
  onCursorChange_() {
    this.update_();
  }
};
var GraphLogController = class {
  constructor(doc, config) {
    this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this);
    this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this);
    this.onGraphPointerDown_ = this.onGraphPointerDown_.bind(this);
    this.onGraphPointerMove_ = this.onGraphPointerMove_.bind(this);
    this.onGraphPointerUp_ = this.onGraphPointerUp_.bind(this);
    this.props = config.props;
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.cursor_ = createValue(-1);
    this.view = new GraphLogView(doc, {
      cursor: this.cursor_,
      formatter: config.formatter,
      rows: config.rows,
      props: this.props,
      value: this.value,
      viewProps: this.viewProps
    });
    if (!supportsTouch(doc)) {
      this.view.element.addEventListener("mousemove", this.onGraphMouseMove_);
      this.view.element.addEventListener("mouseleave", this.onGraphMouseLeave_);
    } else {
      const ph = new PointerHandler(this.view.element);
      ph.emitter.on("down", this.onGraphPointerDown_);
      ph.emitter.on("move", this.onGraphPointerMove_);
      ph.emitter.on("up", this.onGraphPointerUp_);
    }
  }
  importProps(state) {
    return importBladeState(state, null, (p) => ({
      max: p.required.number,
      min: p.required.number
    }), (result) => {
      this.props.set("max", result.max);
      this.props.set("min", result.min);
      return true;
    });
  }
  exportProps() {
    return exportBladeState(null, {
      max: this.props.get("max"),
      min: this.props.get("min")
    });
  }
  onGraphMouseLeave_() {
    this.cursor_.rawValue = -1;
  }
  onGraphMouseMove_(ev) {
    const { clientWidth: w } = this.view.element;
    this.cursor_.rawValue = Math.floor(mapRange(ev.offsetX, 0, w, 0, this.value.rawValue.length));
  }
  onGraphPointerDown_(ev) {
    this.onGraphPointerMove_(ev);
  }
  onGraphPointerMove_(ev) {
    if (!ev.data.point) {
      this.cursor_.rawValue = -1;
      return;
    }
    this.cursor_.rawValue = Math.floor(mapRange(ev.data.point.x, 0, ev.data.bounds.width, 0, this.value.rawValue.length));
  }
  onGraphPointerUp_() {
    this.cursor_.rawValue = -1;
  }
};
function createFormatter(params) {
  return !isEmpty(params.format) ? params.format : createNumberFormatter(2);
}
function createTextMonitor(args) {
  var _a;
  if (args.value.rawValue.length === 1) {
    return new SingleLogController(args.document, {
      formatter: createFormatter(args.params),
      value: args.value,
      viewProps: args.viewProps
    });
  }
  return new MultiLogController(args.document, {
    formatter: createFormatter(args.params),
    rows: (_a = args.params.rows) !== null && _a !== void 0 ? _a : Constants.monitor.defaultRows,
    value: args.value,
    viewProps: args.viewProps
  });
}
function createGraphMonitor(args) {
  var _a, _b, _c;
  return new GraphLogController(args.document, {
    formatter: createFormatter(args.params),
    rows: (_a = args.params.rows) !== null && _a !== void 0 ? _a : Constants.monitor.defaultRows,
    props: ValueMap.fromObject({
      max: (_b = args.params.max) !== null && _b !== void 0 ? _b : 100,
      min: (_c = args.params.min) !== null && _c !== void 0 ? _c : 0
    }),
    value: args.value,
    viewProps: args.viewProps
  });
}
function shouldShowGraph(params) {
  return params.view === "graph";
}
var NumberMonitorPlugin = createPlugin({
  id: "monitor-number",
  type: "monitor",
  accept: (value, params) => {
    if (typeof value !== "number") {
      return null;
    }
    const result = parseRecord(params, (p) => ({
      format: p.optional.function,
      max: p.optional.number,
      min: p.optional.number,
      readonly: p.required.constant(true),
      rows: p.optional.number,
      view: p.optional.string
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    defaultBufferSize: (params) => shouldShowGraph(params) ? 64 : 1,
    reader: (_args) => numberFromUnknown
  },
  controller: (args) => {
    if (shouldShowGraph(args.params)) {
      return createGraphMonitor(args);
    }
    return createTextMonitor(args);
  },
  api: (args) => {
    if (args.controller.valueController instanceof GraphLogController) {
      return new GraphLogMonitorBindingApi(args.controller);
    }
    return null;
  }
});
var StringMonitorPlugin = createPlugin({
  id: "monitor-string",
  type: "monitor",
  accept: (value, params) => {
    if (typeof value !== "string") {
      return null;
    }
    const result = parseRecord(params, (p) => ({
      multiline: p.optional.boolean,
      readonly: p.required.constant(true),
      rows: p.optional.number
    }));
    return result ? {
      initialValue: value,
      params: result
    } : null;
  },
  binding: {
    reader: (_args) => stringFromUnknown
  },
  controller: (args) => {
    var _a;
    const value = args.value;
    const multiline = value.rawValue.length > 1 || args.params.multiline;
    if (multiline) {
      return new MultiLogController(args.document, {
        formatter: formatString,
        rows: (_a = args.params.rows) !== null && _a !== void 0 ? _a : Constants.monitor.defaultRows,
        value,
        viewProps: args.viewProps
      });
    }
    return new SingleLogController(args.document, {
      formatter: formatString,
      value,
      viewProps: args.viewProps
    });
  }
});
var BladeApiCache = class {
  constructor() {
    this.map_ = /* @__PURE__ */ new Map();
  }
  get(bc) {
    var _a;
    return (_a = this.map_.get(bc)) !== null && _a !== void 0 ? _a : null;
  }
  has(bc) {
    return this.map_.has(bc);
  }
  add(bc, api) {
    this.map_.set(bc, api);
    bc.viewProps.handleDispose(() => {
      this.map_.delete(bc);
    });
    return api;
  }
};
var ReadWriteBinding = class {
  constructor(config) {
    this.target = config.target;
    this.reader_ = config.reader;
    this.writer_ = config.writer;
  }
  read() {
    return this.reader_(this.target.read());
  }
  write(value) {
    this.writer_(this.target, value);
  }
  inject(value) {
    this.write(this.reader_(value));
  }
};
function createInputBindingController(plugin, args) {
  var _a;
  const result = plugin.accept(args.target.read(), args.params);
  if (isEmpty(result)) {
    return null;
  }
  const valueArgs = {
    target: args.target,
    initialValue: result.initialValue,
    params: result.params
  };
  const params = parseRecord(args.params, (p) => ({
    disabled: p.optional.boolean,
    hidden: p.optional.boolean,
    label: p.optional.string,
    tag: p.optional.string
  }));
  const reader = plugin.binding.reader(valueArgs);
  const constraint = plugin.binding.constraint ? plugin.binding.constraint(valueArgs) : void 0;
  const binding = new ReadWriteBinding({
    reader,
    target: args.target,
    writer: plugin.binding.writer(valueArgs)
  });
  const value = new InputBindingValue(createValue(reader(result.initialValue), {
    constraint,
    equals: plugin.binding.equals
  }), binding);
  const controller = plugin.controller({
    constraint,
    document: args.document,
    initialValue: result.initialValue,
    params: result.params,
    value,
    viewProps: ViewProps.create({
      disabled: params === null || params === void 0 ? void 0 : params.disabled,
      hidden: params === null || params === void 0 ? void 0 : params.hidden
    })
  });
  return new InputBindingController(args.document, {
    blade: createBlade(),
    props: ValueMap.fromObject({
      label: "label" in args.params ? (_a = params === null || params === void 0 ? void 0 : params.label) !== null && _a !== void 0 ? _a : null : args.target.key
    }),
    tag: params === null || params === void 0 ? void 0 : params.tag,
    value,
    valueController: controller
  });
}
var ReadonlyBinding = class {
  constructor(config) {
    this.target = config.target;
    this.reader_ = config.reader;
  }
  read() {
    return this.reader_(this.target.read());
  }
};
function createTicker(document2, interval) {
  return interval === 0 ? new ManualTicker() : new IntervalTicker(document2, interval !== null && interval !== void 0 ? interval : Constants.monitor.defaultInterval);
}
function createMonitorBindingController(plugin, args) {
  var _a, _b, _c;
  const result = plugin.accept(args.target.read(), args.params);
  if (isEmpty(result)) {
    return null;
  }
  const bindingArgs = {
    target: args.target,
    initialValue: result.initialValue,
    params: result.params
  };
  const params = parseRecord(args.params, (p) => ({
    bufferSize: p.optional.number,
    disabled: p.optional.boolean,
    hidden: p.optional.boolean,
    interval: p.optional.number,
    label: p.optional.string
  }));
  const reader = plugin.binding.reader(bindingArgs);
  const bufferSize = (_b = (_a = params === null || params === void 0 ? void 0 : params.bufferSize) !== null && _a !== void 0 ? _a : plugin.binding.defaultBufferSize && plugin.binding.defaultBufferSize(result.params)) !== null && _b !== void 0 ? _b : 1;
  const value = new MonitorBindingValue({
    binding: new ReadonlyBinding({
      reader,
      target: args.target
    }),
    bufferSize,
    ticker: createTicker(args.document, params === null || params === void 0 ? void 0 : params.interval)
  });
  const controller = plugin.controller({
    document: args.document,
    params: result.params,
    value,
    viewProps: ViewProps.create({
      disabled: params === null || params === void 0 ? void 0 : params.disabled,
      hidden: params === null || params === void 0 ? void 0 : params.hidden
    })
  });
  controller.viewProps.bindDisabled(value.ticker);
  controller.viewProps.handleDispose(() => {
    value.ticker.dispose();
  });
  return new MonitorBindingController(args.document, {
    blade: createBlade(),
    props: ValueMap.fromObject({
      label: "label" in args.params ? (_c = params === null || params === void 0 ? void 0 : params.label) !== null && _c !== void 0 ? _c : null : args.target.key
    }),
    value,
    valueController: controller
  });
}
var PluginPool = class {
  constructor(apiCache) {
    this.pluginsMap_ = {
      blades: [],
      inputs: [],
      monitors: []
    };
    this.apiCache_ = apiCache;
  }
  getAll() {
    return [
      ...this.pluginsMap_.blades,
      ...this.pluginsMap_.inputs,
      ...this.pluginsMap_.monitors
    ];
  }
  register(bundleId, r) {
    if (!isCompatible(r.core)) {
      throw TpError.notCompatible(bundleId, r.id);
    }
    if (r.type === "blade") {
      this.pluginsMap_.blades.unshift(r);
    } else if (r.type === "input") {
      this.pluginsMap_.inputs.unshift(r);
    } else if (r.type === "monitor") {
      this.pluginsMap_.monitors.unshift(r);
    }
  }
  createInput_(document2, target, params) {
    return this.pluginsMap_.inputs.reduce((result, plugin) => result !== null && result !== void 0 ? result : createInputBindingController(plugin, {
      document: document2,
      target,
      params
    }), null);
  }
  createMonitor_(document2, target, params) {
    return this.pluginsMap_.monitors.reduce((result, plugin) => result !== null && result !== void 0 ? result : createMonitorBindingController(plugin, {
      document: document2,
      params,
      target
    }), null);
  }
  createBinding(doc, target, params) {
    const initialValue = target.read();
    if (isEmpty(initialValue)) {
      throw new TpError({
        context: {
          key: target.key
        },
        type: "nomatchingcontroller"
      });
    }
    const ic = this.createInput_(doc, target, params);
    if (ic) {
      return ic;
    }
    const mc = this.createMonitor_(doc, target, params);
    if (mc) {
      return mc;
    }
    throw new TpError({
      context: {
        key: target.key
      },
      type: "nomatchingcontroller"
    });
  }
  createBlade(document2, params) {
    const bc = this.pluginsMap_.blades.reduce((result, plugin) => result !== null && result !== void 0 ? result : createBladeController(plugin, {
      document: document2,
      params
    }), null);
    if (!bc) {
      throw new TpError({
        type: "nomatchingview",
        context: {
          params
        }
      });
    }
    return bc;
  }
  createInputBindingApi_(bc) {
    const api = this.pluginsMap_.inputs.reduce((result, plugin) => {
      var _a, _b;
      if (result) {
        return result;
      }
      return (_b = (_a = plugin.api) === null || _a === void 0 ? void 0 : _a.call(plugin, {
        controller: bc
      })) !== null && _b !== void 0 ? _b : null;
    }, null);
    return this.apiCache_.add(bc, api !== null && api !== void 0 ? api : new BindingApi(bc));
  }
  createMonitorBindingApi_(bc) {
    const api = this.pluginsMap_.monitors.reduce((result, plugin) => {
      var _a, _b;
      if (result) {
        return result;
      }
      return (_b = (_a = plugin.api) === null || _a === void 0 ? void 0 : _a.call(plugin, {
        controller: bc
      })) !== null && _b !== void 0 ? _b : null;
    }, null);
    return this.apiCache_.add(bc, api !== null && api !== void 0 ? api : new BindingApi(bc));
  }
  createBindingApi(bc) {
    if (this.apiCache_.has(bc)) {
      return this.apiCache_.get(bc);
    }
    if (isInputBindingController(bc)) {
      return this.createInputBindingApi_(bc);
    }
    if (isMonitorBindingController(bc)) {
      return this.createMonitorBindingApi_(bc);
    }
    throw TpError.shouldNeverHappen();
  }
  createApi(bc) {
    if (this.apiCache_.has(bc)) {
      return this.apiCache_.get(bc);
    }
    if (isBindingController(bc)) {
      return this.createBindingApi(bc);
    }
    const api = this.pluginsMap_.blades.reduce((result, plugin) => result !== null && result !== void 0 ? result : plugin.api({
      controller: bc,
      pool: this
    }), null);
    if (!api) {
      throw TpError.shouldNeverHappen();
    }
    return this.apiCache_.add(bc, api);
  }
};
var sharedCache = new BladeApiCache();
function createDefaultPluginPool() {
  const pool = new PluginPool(sharedCache);
  [
    Point2dInputPlugin,
    Point3dInputPlugin,
    Point4dInputPlugin,
    StringInputPlugin,
    NumberInputPlugin,
    StringColorInputPlugin,
    ObjectColorInputPlugin,
    NumberColorInputPlugin,
    BooleanInputPlugin,
    BooleanMonitorPlugin,
    StringMonitorPlugin,
    NumberMonitorPlugin,
    ButtonBladePlugin,
    FolderBladePlugin,
    TabBladePlugin
  ].forEach((p) => {
    pool.register("core", p);
  });
  return pool;
}
var ListBladeApi = class extends BladeApi {
  /**
   * @hidden
   */
  constructor(controller) {
    super(controller);
    this.emitter_ = new Emitter();
    this.controller.value.emitter.on("change", (ev) => {
      this.emitter_.emit("change", new TpChangeEvent(this, ev.rawValue));
    });
  }
  get label() {
    return this.controller.labelController.props.get("label");
  }
  set label(label) {
    this.controller.labelController.props.set("label", label);
  }
  get options() {
    return this.controller.valueController.props.get("options");
  }
  set options(options) {
    this.controller.valueController.props.set("options", options);
  }
  get value() {
    return this.controller.value.rawValue;
  }
  set value(value) {
    this.controller.value.rawValue = value;
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, (ev) => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
};
var SeparatorBladeApi = class extends BladeApi {
};
var SliderBladeApi = class extends BladeApi {
  /**
   * @hidden
   */
  constructor(controller) {
    super(controller);
    this.emitter_ = new Emitter();
    this.controller.value.emitter.on("change", (ev) => {
      this.emitter_.emit("change", new TpChangeEvent(this, ev.rawValue));
    });
  }
  get label() {
    return this.controller.labelController.props.get("label");
  }
  set label(label) {
    this.controller.labelController.props.set("label", label);
  }
  get max() {
    return this.controller.valueController.sliderController.props.get("max");
  }
  set max(max) {
    this.controller.valueController.sliderController.props.set("max", max);
  }
  get min() {
    return this.controller.valueController.sliderController.props.get("min");
  }
  set min(min) {
    this.controller.valueController.sliderController.props.set("min", min);
  }
  get value() {
    return this.controller.value.rawValue;
  }
  set value(value) {
    this.controller.value.rawValue = value;
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, (ev) => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
};
var TextBladeApi = class extends BladeApi {
  /**
   * @hidden
   */
  constructor(controller) {
    super(controller);
    this.emitter_ = new Emitter();
    this.controller.value.emitter.on("change", (ev) => {
      this.emitter_.emit("change", new TpChangeEvent(this, ev.rawValue));
    });
  }
  get label() {
    return this.controller.labelController.props.get("label");
  }
  set label(label) {
    this.controller.labelController.props.set("label", label);
  }
  get formatter() {
    return this.controller.valueController.props.get("formatter");
  }
  set formatter(formatter) {
    this.controller.valueController.props.set("formatter", formatter);
  }
  get value() {
    return this.controller.value.rawValue;
  }
  set value(value) {
    this.controller.value.rawValue = value;
  }
  on(eventName, handler) {
    const bh = handler.bind(this);
    this.emitter_.on(eventName, (ev) => {
      bh(ev);
    }, {
      key: handler
    });
    return this;
  }
  off(eventName, handler) {
    this.emitter_.off(eventName, handler);
    return this;
  }
};
var ListBladePlugin = /* @__PURE__ */ function() {
  return {
    id: "list",
    type: "blade",
    core: VERSION$1,
    accept(params) {
      const result = parseRecord(params, (p) => ({
        options: p.required.custom(parseListOptions),
        value: p.required.raw,
        view: p.required.constant("list"),
        label: p.optional.string
      }));
      return result ? { params: result } : null;
    },
    controller(args) {
      const lc = new ListConstraint(normalizeListOptions(args.params.options));
      const value = createValue(args.params.value, {
        constraint: lc
      });
      const ic = new ListController(args.document, {
        props: new ValueMap({
          options: lc.values.value("options")
        }),
        value,
        viewProps: args.viewProps
      });
      return new LabeledValueBladeController(args.document, {
        blade: args.blade,
        props: ValueMap.fromObject({
          label: args.params.label
        }),
        value,
        valueController: ic
      });
    },
    api(args) {
      if (!(args.controller instanceof LabeledValueBladeController)) {
        return null;
      }
      if (!(args.controller.valueController instanceof ListController)) {
        return null;
      }
      return new ListBladeApi(args.controller);
    }
  };
}();
var RootApi = class extends FolderApi {
  /**
   * @hidden
   */
  constructor(controller, pool) {
    super(controller, pool);
  }
  get element() {
    return this.controller.view.element;
  }
};
var RootController = class extends FolderController {
  constructor(doc, config) {
    super(doc, {
      expanded: config.expanded,
      blade: config.blade,
      props: config.props,
      root: true,
      viewProps: config.viewProps
    });
  }
};
var cn = ClassName("spr");
var SeparatorView = class {
  constructor(doc, config) {
    this.element = doc.createElement("div");
    this.element.classList.add(cn());
    config.viewProps.bindClassModifiers(this.element);
    const hrElem = doc.createElement("hr");
    hrElem.classList.add(cn("r"));
    this.element.appendChild(hrElem);
  }
};
var SeparatorController = class extends BladeController {
  /**
   * @hidden
   */
  constructor(doc, config) {
    super(Object.assign(Object.assign({}, config), { view: new SeparatorView(doc, {
      viewProps: config.viewProps
    }) }));
  }
};
var SeparatorBladePlugin = {
  id: "separator",
  type: "blade",
  core: VERSION$1,
  accept(params) {
    const result = parseRecord(params, (p) => ({
      view: p.required.constant("separator")
    }));
    return result ? { params: result } : null;
  },
  controller(args) {
    return new SeparatorController(args.document, {
      blade: args.blade,
      viewProps: args.viewProps
    });
  },
  api(args) {
    if (!(args.controller instanceof SeparatorController)) {
      return null;
    }
    return new SeparatorBladeApi(args.controller);
  }
};
var SliderBladePlugin = {
  id: "slider",
  type: "blade",
  core: VERSION$1,
  accept(params) {
    const result = parseRecord(params, (p) => ({
      max: p.required.number,
      min: p.required.number,
      view: p.required.constant("slider"),
      format: p.optional.function,
      label: p.optional.string,
      value: p.optional.number
    }));
    return result ? { params: result } : null;
  },
  controller(args) {
    var _a, _b;
    const initialValue = (_a = args.params.value) !== null && _a !== void 0 ? _a : 0;
    const drc = new DefiniteRangeConstraint({
      max: args.params.max,
      min: args.params.min
    });
    const v = createValue(initialValue, {
      constraint: drc
    });
    const vc = new SliderTextController(args.document, Object.assign(Object.assign({}, createSliderTextProps({
      formatter: (_b = args.params.format) !== null && _b !== void 0 ? _b : numberToString,
      keyScale: createValue(1),
      max: drc.values.value("max"),
      min: drc.values.value("min"),
      pointerScale: getSuitablePointerScale(args.params, initialValue)
    })), { parser: parseNumber, value: v, viewProps: args.viewProps }));
    return new LabeledValueBladeController(args.document, {
      blade: args.blade,
      props: ValueMap.fromObject({
        label: args.params.label
      }),
      value: v,
      valueController: vc
    });
  },
  api(args) {
    if (!(args.controller instanceof LabeledValueBladeController)) {
      return null;
    }
    if (!(args.controller.valueController instanceof SliderTextController)) {
      return null;
    }
    return new SliderBladeApi(args.controller);
  }
};
var TextBladePlugin = /* @__PURE__ */ function() {
  return {
    id: "text",
    type: "blade",
    core: VERSION$1,
    accept(params) {
      const result = parseRecord(params, (p) => ({
        parse: p.required.function,
        value: p.required.raw,
        view: p.required.constant("text"),
        format: p.optional.function,
        label: p.optional.string
      }));
      return result ? { params: result } : null;
    },
    controller(args) {
      var _a;
      const v = createValue(args.params.value);
      const ic = new TextController(args.document, {
        parser: args.params.parse,
        props: ValueMap.fromObject({
          formatter: (_a = args.params.format) !== null && _a !== void 0 ? _a : (v2) => String(v2)
        }),
        value: v,
        viewProps: args.viewProps
      });
      return new LabeledValueBladeController(args.document, {
        blade: args.blade,
        props: ValueMap.fromObject({
          label: args.params.label
        }),
        value: v,
        valueController: ic
      });
    },
    api(args) {
      if (!(args.controller instanceof LabeledValueBladeController)) {
        return null;
      }
      if (!(args.controller.valueController instanceof TextController)) {
        return null;
      }
      return new TextBladeApi(args.controller);
    }
  };
}();
function createDefaultWrapperElement(doc) {
  const elem = doc.createElement("div");
  elem.classList.add(ClassName("dfw")());
  if (doc.body) {
    doc.body.appendChild(elem);
  }
  return elem;
}
function embedStyle(doc, id, css) {
  if (doc.querySelector(`style[data-tp-style=${id}]`)) {
    return;
  }
  const styleElem = doc.createElement("style");
  styleElem.dataset.tpStyle = id;
  styleElem.textContent = css;
  doc.head.appendChild(styleElem);
}
var Pane = class extends RootApi {
  constructor(opt_config) {
    var _a, _b;
    const config = opt_config !== null && opt_config !== void 0 ? opt_config : {};
    const doc = (_a = config.document) !== null && _a !== void 0 ? _a : getWindowDocument();
    const pool = createDefaultPluginPool();
    const rootController = new RootController(doc, {
      expanded: config.expanded,
      blade: createBlade(),
      props: ValueMap.fromObject({
        title: config.title
      }),
      viewProps: ViewProps.create()
    });
    super(rootController, pool);
    this.pool_ = pool;
    this.containerElem_ = (_b = config.container) !== null && _b !== void 0 ? _b : createDefaultWrapperElement(doc);
    this.containerElem_.appendChild(this.element);
    this.doc_ = doc;
    this.usesDefaultWrapper_ = !config.container;
    this.setUpDefaultPlugins_();
  }
  get document() {
    if (!this.doc_) {
      throw TpError.alreadyDisposed();
    }
    return this.doc_;
  }
  dispose() {
    const containerElem = this.containerElem_;
    if (!containerElem) {
      throw TpError.alreadyDisposed();
    }
    if (this.usesDefaultWrapper_) {
      const parentElem = containerElem.parentElement;
      if (parentElem) {
        parentElem.removeChild(containerElem);
      }
    }
    this.containerElem_ = null;
    this.doc_ = null;
    super.dispose();
  }
  registerPlugin(bundle) {
    if (bundle.css) {
      embedStyle(this.document, `plugin-${bundle.id}`, bundle.css);
    }
    const plugins = "plugin" in bundle ? [bundle.plugin] : "plugins" in bundle ? bundle.plugins : [];
    plugins.forEach((p) => {
      this.pool_.register(bundle.id, p);
    });
  }
  setUpDefaultPlugins_() {
    this.registerPlugin({
      id: "default",
      // NOTE: This string literal will be replaced with the default CSS by Rollup at the compilation time
      css: '.tp-tbiv_b,.tp-coltxtv_ms,.tp-colswv_b,.tp-ckbv_i,.tp-sglv_i,.tp-mllv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-rotv_b,.tp-fldv_b,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--bld-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--cnt-usz);line-height:var(--cnt-usz);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tbpv_c>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-vp))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tbpv_c>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--cnt-usp)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tbpv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tbpv_c>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tbpv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tbpv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tbpv_c>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tbpv_c>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--bld-br);border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tbpv_c .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tbpv_c>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tbpv_c>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--bld-br)}.tp-tbpv_c .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--bld-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);overflow:hidden;padding-left:var(--cnt-hp);padding-right:calc(4px + var(--cnt-usz) + var(--cnt-hp));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-hp) + (var(--cnt-usz) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-vp);padding-top:var(--cnt-vp);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--cnt-usz);line-height:var(--cnt-usz);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-sglv_i,.tp-mllv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--mo-fg);height:var(--cnt-usz);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-sglv_i::-webkit-scrollbar,.tp-mllv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-sglv_i::-webkit-scrollbar-corner,.tp-mllv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-sglv_i::-webkit-scrollbar-thumb,.tp-mllv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-rotv{--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-br: var(--tp-base-border-radius, 6px);--bs-ff: var(--tp-base-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--bld-br: var(--tp-blade-border-radius, 2px);--bld-hp: var(--tp-blade-horizontal-padding, 4px);--bld-vw: var(--tp-blade-value-width, 160px);--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--cnt-hp: var(--tp-container-horizontal-padding, 4px);--cnt-vp: var(--tp-container-vertical-padding, 4px);--cnt-usp: var(--tp-container-unit-spacing, 4px);--cnt-usz: var(--tp-container-unit-size, 20px);--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--bld-br);cursor:pointer;display:block;height:var(--cnt-usz);position:relative;width:var(--cnt-usz)}.tp-ckbv_w svg{display:block;height:16px;inset:0;margin:auto;opacity:0;position:absolute;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--cnt-usz)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--cnt-usp);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--cnt-usp)}.tp-colpv_rgb{display:flex;margin-top:var(--cnt-usp);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-vp);padding-top:calc(var(--cnt-vp) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-hp));position:absolute;right:calc(-1*var(--cnt-hp));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--bld-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--cnt-usz)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{inset:0;position:absolute}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--bld-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;inset:0;position:absolute}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--bld-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{cursor:pointer;display:block;height:var(--cnt-usz);left:0;position:absolute;top:0;width:var(--cnt-usz)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--bld-br);content:"";display:block;inset:0;position:absolute}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--bld-br);color:var(--lbl-fg);cursor:pointer;height:var(--cnt-usz);line-height:var(--cnt-usz);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--cnt-usz)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-hp);padding-right:var(--cnt-hp)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:var(--bld-vw)}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 var(--bld-hp);width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--cnt-usz)*3);line-height:var(--cnt-usz);padding-left:var(--bld-hp);padding-right:var(--bld-hp);resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--cnt-usz);margin-right:4px;position:relative;width:var(--cnt-usz)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--cnt-usp);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-p2dpv{padding-left:calc(var(--cnt-usz) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:var(--bld-vw);padding:var(--cnt-vp) var(--cnt-hp);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--cnt-usz);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;content:"";display:block;height:2px;inset:0;margin:auto;position:absolute}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;content:"";display:block;height:2px;inset:0;margin-bottom:auto;margin-top:auto;position:absolute}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--bld-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--cnt-usz) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-hp) + 4px);padding-right:calc(var(--cnt-hp) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);content:"";inset:0 0 2px;pointer-events:none;position:absolute}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);opacity:.5;overflow:hidden;position:relative;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-tbpv_c{padding-bottom:var(--cnt-vp);padding-left:4px;padding-top:var(--cnt-vp)}.tp-txtv{position:relative}.tp-txtv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:calc(var(--bld-hp) - 5px);position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--cnt-usz) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--bld-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--bs-ff);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--cnt-usz) + var(--cnt-hp));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0;transition-delay:0s;transition-duration:0s}.tp-rotv.tp-rotv-not>.tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst.tp-fldv-expanded>.tp-fldv_b{transition-delay:0s;transition-duration:0s}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}',
      plugins: [
        ListBladePlugin,
        SeparatorBladePlugin,
        SliderBladePlugin,
        TabBladePlugin,
        TextBladePlugin
      ]
    });
  }
};
var VERSION = new Semver("4.0.5");

// src/js/utils/DebugTools.js
var DebugTools = class {
  constructor() {
    this.body = document.body;
    this.pane = new Pane({
      title: "Debug panel",
      container: document.querySelector(".debug-panel")
    });
    this.state = {};
    this.loadState();
    this.applyState();
    this.pane.addButton({
      title: "Toggle",
      label: "Grid"
      // optional
    }).on("click", () => {
      this.toggleGrid();
      this.saveState();
    });
    this.pane.addButton({
      title: "Open",
      label: "Sitemap"
      // optional
    }).on("click", () => {
      const url = "/sitemap";
      window.open(url, "_blank");
    });
    this.pane.addButton({
      title: "Clear all API cache",
      label: "Cache"
    }).on("click", async (elt) => {
      const url = "/api/clear-cache?key=devclear";
      const t = elt.target;
      t.disabled = true;
      await wait_default(500);
      const r = await fetch(url).then((r2) => r2.json());
      t.title = r.message;
    });
  }
  renderState = () => {
  };
  saveState = () => {
    this.state.panel = this.pane.exportState(this.state.panel);
    localStorage.setItem("debugState", JSON.stringify(this.state));
  };
  loadState = () => {
    let state = JSON.parse(localStorage.getItem("debugState")) || {};
    state.panel && this.pane.importState(state.panel);
    this.state = state;
    return this.state;
  };
  applyState = () => {
    this.toggleGrid(this.state.grid ?? false);
  };
  toggleGrid = (newState) => {
    const state = this.body.classList.toggle("is-debug-grid", newState);
    this.state.grid = state;
    return state;
  };
};
var DebugTools_default = new DebugTools();
export {
  DebugTools_default as default
};
/*! Bundled license information:

tweakpane/dist/tweakpane.js:
  (*! Tweakpane 4.0.5 (c) 2016 cocopon, licensed under the MIT license. *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3R3ZWFrcGFuZS9kaXN0L3R3ZWFrcGFuZS5qcyIsICIuLi8uLi8uLi9zcmMvanMvdXRpbHMvRGVidWdUb29scy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyohIFR3ZWFrcGFuZSA0LjAuNSAoYykgMjAxNiBjb2NvcG9uLCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuICovXG5mdW5jdGlvbiBmb3JjZUNhc3Qodikge1xuICAgIHJldHVybiB2O1xufVxuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gaXNPYmplY3QkMSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xufVxuZnVuY3Rpb24gaXNSZWNvcmQodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jztcbn1cbmZ1bmN0aW9uIGRlZXBFcXVhbHNBcnJheShhMSwgYTIpIHtcbiAgICBpZiAoYTEubGVuZ3RoICE9PSBhMi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGExLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhMVtpXSAhPT0gYTJbaV0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGRlZXBNZXJnZShyMSwgcjIpIHtcbiAgICBjb25zdCBrZXlzID0gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5PYmplY3Qua2V5cyhyMSksIC4uLk9iamVjdC5rZXlzKHIyKV0pKTtcbiAgICByZXR1cm4ga2V5cy5yZWR1Y2UoKHJlc3VsdCwga2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHYxID0gcjFba2V5XTtcbiAgICAgICAgY29uc3QgdjIgPSByMltrZXldO1xuICAgICAgICByZXR1cm4gaXNSZWNvcmQodjEpICYmIGlzUmVjb3JkKHYyKVxuICAgICAgICAgICAgPyBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHJlc3VsdCksIHsgW2tleV06IGRlZXBNZXJnZSh2MSwgdjIpIH0pIDogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCByZXN1bHQpLCB7IFtrZXldOiBrZXkgaW4gcjIgPyB2MiA6IHYxIH0pO1xuICAgIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gaXNCaW5kaW5nKHZhbHVlKSB7XG4gICAgaWYgKCFpc09iamVjdCQxKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAndGFyZ2V0JyBpbiB2YWx1ZTtcbn1cblxuY29uc3QgQ1JFQVRFX01FU1NBR0VfTUFQID0ge1xuICAgIGFscmVhZHlkaXNwb3NlZDogKCkgPT4gJ1ZpZXcgaGFzIGJlZW4gYWxyZWFkeSBkaXNwb3NlZCcsXG4gICAgaW52YWxpZHBhcmFtczogKGNvbnRleHQpID0+IGBJbnZhbGlkIHBhcmFtZXRlcnMgZm9yICcke2NvbnRleHQubmFtZX0nYCxcbiAgICBub21hdGNoaW5nY29udHJvbGxlcjogKGNvbnRleHQpID0+IGBObyBtYXRjaGluZyBjb250cm9sbGVyIGZvciAnJHtjb250ZXh0LmtleX0nYCxcbiAgICBub21hdGNoaW5ndmlldzogKGNvbnRleHQpID0+IGBObyBtYXRjaGluZyB2aWV3IGZvciAnJHtKU09OLnN0cmluZ2lmeShjb250ZXh0LnBhcmFtcyl9J2AsXG4gICAgbm90YmluZGFibGU6ICgpID0+IGBWYWx1ZSBpcyBub3QgYmluZGFibGVgLFxuICAgIG5vdGNvbXBhdGlibGU6IChjb250ZXh0KSA9PiBgTm90IGNvbXBhdGlibGUgd2l0aCAgcGx1Z2luICcke2NvbnRleHQuaWR9J2AsXG4gICAgcHJvcGVydHlub3Rmb3VuZDogKGNvbnRleHQpID0+IGBQcm9wZXJ0eSAnJHtjb250ZXh0Lm5hbWV9JyBub3QgZm91bmRgLFxuICAgIHNob3VsZG5ldmVyaGFwcGVuOiAoKSA9PiAnVGhpcyBlcnJvciBzaG91bGQgbmV2ZXIgaGFwcGVuJyxcbn07XG5jbGFzcyBUcEVycm9yIHtcbiAgICBzdGF0aWMgYWxyZWFkeURpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRwRXJyb3IoeyB0eXBlOiAnYWxyZWFkeWRpc3Bvc2VkJyB9KTtcbiAgICB9XG4gICAgc3RhdGljIG5vdEJpbmRhYmxlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRwRXJyb3Ioe1xuICAgICAgICAgICAgdHlwZTogJ25vdGJpbmRhYmxlJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBub3RDb21wYXRpYmxlKGJ1bmRsZUlkLCBpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFRwRXJyb3Ioe1xuICAgICAgICAgICAgdHlwZTogJ25vdGNvbXBhdGlibGUnLFxuICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAgIGlkOiBgJHtidW5kbGVJZH0uJHtpZH1gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBwcm9wZXJ0eU5vdEZvdW5kKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUcEVycm9yKHtcbiAgICAgICAgICAgIHR5cGU6ICdwcm9wZXJ0eW5vdGZvdW5kJyxcbiAgICAgICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBzaG91bGROZXZlckhhcHBlbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUcEVycm9yKHsgdHlwZTogJ3Nob3VsZG5ldmVyaGFwcGVuJyB9KTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID1cbiAgICAgICAgICAgIChfYSA9IENSRUFURV9NRVNTQUdFX01BUFtjb25maWcudHlwZV0oZm9yY2VDYXN0KGNvbmZpZy5jb250ZXh0KSkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICdVbmV4cGVjdGVkIGVycm9yJztcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB0aGlzLnN0YWNrID0gbmV3IEVycm9yKHRoaXMubWVzc2FnZSkuc3RhY2s7XG4gICAgICAgIHRoaXMudHlwZSA9IGNvbmZpZy50eXBlO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZTtcbiAgICB9XG59XG5cbmNsYXNzIEJpbmRpbmdUYXJnZXQge1xuICAgIGNvbnN0cnVjdG9yKG9iaiwga2V5KSB7XG4gICAgICAgIHRoaXMub2JqXyA9IG9iajtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgfVxuICAgIHN0YXRpYyBpc0JpbmRhYmxlKG9iaikge1xuICAgICAgICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmogIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmVhZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqX1t0aGlzLmtleV07XG4gICAgfVxuICAgIHdyaXRlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMub2JqX1t0aGlzLmtleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgd3JpdGVQcm9wZXJ0eShuYW1lLCB2YWx1ZSkge1xuICAgICAgICBjb25zdCB2YWx1ZU9iaiA9IHRoaXMucmVhZCgpO1xuICAgICAgICBpZiAoIUJpbmRpbmdUYXJnZXQuaXNCaW5kYWJsZSh2YWx1ZU9iaikpIHtcbiAgICAgICAgICAgIHRocm93IFRwRXJyb3Iubm90QmluZGFibGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShuYW1lIGluIHZhbHVlT2JqKSkge1xuICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5wcm9wZXJ0eU5vdEZvdW5kKG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlT2JqW25hbWVdID0gdmFsdWU7XG4gICAgfVxufVxuXG5jbGFzcyBFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnNfID0ge307XG4gICAgfVxuICAgIG9uKGV2ZW50TmFtZSwgaGFuZGxlciwgb3B0X29wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBsZXQgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNfW2V2ZW50TmFtZV07XG4gICAgICAgIGlmICghb2JzZXJ2ZXJzKSB7XG4gICAgICAgICAgICBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc19bZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIG9ic2VydmVycy5wdXNoKHtcbiAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXG4gICAgICAgICAgICBrZXk6IChfYSA9IG9wdF9vcHRpb25zID09PSBudWxsIHx8IG9wdF9vcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRfb3B0aW9ucy5rZXkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGhhbmRsZXIsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb2ZmKGV2ZW50TmFtZSwga2V5KSB7XG4gICAgICAgIGNvbnN0IG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzX1tldmVudE5hbWVdO1xuICAgICAgICBpZiAob2JzZXJ2ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyc19bZXZlbnROYW1lXSA9IG9ic2VydmVycy5maWx0ZXIoKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmtleSAhPT0ga2V5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVtaXQoZXZlbnROYW1lLCBldmVudCkge1xuICAgICAgICBjb25zdCBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc19bZXZlbnROYW1lXTtcbiAgICAgICAgaWYgKCFvYnNlcnZlcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvYnNlcnZlcnMuZm9yRWFjaCgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLmhhbmRsZXIoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIENvbXBsZXhWYWx1ZSB7XG4gICAgY29uc3RydWN0b3IoaW5pdGlhbFZhbHVlLCBjb25maWcpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLmNvbnN0cmFpbnRfID0gY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnLmNvbnN0cmFpbnQ7XG4gICAgICAgIHRoaXMuZXF1YWxzXyA9IChfYSA9IGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy5lcXVhbHMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICgodjEsIHYyKSA9PiB2MSA9PT0gdjIpO1xuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICB0aGlzLnJhd1ZhbHVlXyA9IGluaXRpYWxWYWx1ZTtcbiAgICB9XG4gICAgZ2V0IGNvbnN0cmFpbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cmFpbnRfO1xuICAgIH1cbiAgICBnZXQgcmF3VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhd1ZhbHVlXztcbiAgICB9XG4gICAgc2V0IHJhd1ZhbHVlKHJhd1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0UmF3VmFsdWUocmF3VmFsdWUsIHtcbiAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0UmF3VmFsdWUocmF3VmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwID8gb3B0aW9ucyA6IHtcbiAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb25zdHJhaW5lZFZhbHVlID0gdGhpcy5jb25zdHJhaW50X1xuICAgICAgICAgICAgPyB0aGlzLmNvbnN0cmFpbnRfLmNvbnN0cmFpbihyYXdWYWx1ZSlcbiAgICAgICAgICAgIDogcmF3VmFsdWU7XG4gICAgICAgIGNvbnN0IHByZXZWYWx1ZSA9IHRoaXMucmF3VmFsdWVfO1xuICAgICAgICBjb25zdCBjaGFuZ2VkID0gIXRoaXMuZXF1YWxzXyhwcmV2VmFsdWUsIGNvbnN0cmFpbmVkVmFsdWUpO1xuICAgICAgICBpZiAoIWNoYW5nZWQgJiYgIW9wdHMuZm9yY2VFbWl0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2JlZm9yZWNoYW5nZScsIHtcbiAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmF3VmFsdWVfID0gY29uc3RyYWluZWRWYWx1ZTtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdHMsXG4gICAgICAgICAgICBwcmV2aW91c1Jhd1ZhbHVlOiBwcmV2VmFsdWUsXG4gICAgICAgICAgICByYXdWYWx1ZTogY29uc3RyYWluZWRWYWx1ZSxcbiAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jbGFzcyBQcmltaXRpdmVWYWx1ZSB7XG4gICAgY29uc3RydWN0b3IoaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMudmFsdWVfID0gaW5pdGlhbFZhbHVlO1xuICAgIH1cbiAgICBnZXQgcmF3VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlXztcbiAgICB9XG4gICAgc2V0IHJhd1ZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0UmF3VmFsdWUodmFsdWUsIHtcbiAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0UmF3VmFsdWUodmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwID8gb3B0aW9ucyA6IHtcbiAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBwcmV2VmFsdWUgPSB0aGlzLnZhbHVlXztcbiAgICAgICAgaWYgKHByZXZWYWx1ZSA9PT0gdmFsdWUgJiYgIW9wdHMuZm9yY2VFbWl0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2JlZm9yZWNoYW5nZScsIHtcbiAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmFsdWVfID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICBvcHRpb25zOiBvcHRzLFxuICAgICAgICAgICAgcHJldmlvdXNSYXdWYWx1ZTogcHJldlZhbHVlLFxuICAgICAgICAgICAgcmF3VmFsdWU6IHRoaXMudmFsdWVfLFxuICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIFJlYWRvbmx5UHJpbWl0aXZlVmFsdWUge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMub25WYWx1ZUJlZm9yZUNoYW5nZV8gPSB0aGlzLm9uVmFsdWVCZWZvcmVDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZV8gPSB0aGlzLm9uVmFsdWVDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudmFsdWVfID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmFsdWVfLmVtaXR0ZXIub24oJ2JlZm9yZWNoYW5nZScsIHRoaXMub25WYWx1ZUJlZm9yZUNoYW5nZV8pO1xuICAgICAgICB0aGlzLnZhbHVlXy5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uVmFsdWVDaGFuZ2VfKTtcbiAgICB9XG4gICAgZ2V0IHJhd1ZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV8ucmF3VmFsdWU7XG4gICAgfVxuICAgIG9uVmFsdWVCZWZvcmVDaGFuZ2VfKGV2KSB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdiZWZvcmVjaGFuZ2UnLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGV2KSwgeyBzZW5kZXI6IHRoaXMgfSkpO1xuICAgIH1cbiAgICBvblZhbHVlQ2hhbmdlXyhldikge1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnY2hhbmdlJywgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBldiksIHsgc2VuZGVyOiB0aGlzIH0pKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVZhbHVlKGluaXRpYWxWYWx1ZSwgY29uZmlnKSB7XG4gICAgY29uc3QgY29uc3RyYWludCA9IGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy5jb25zdHJhaW50O1xuICAgIGNvbnN0IGVxdWFscyA9IGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy5lcXVhbHM7XG4gICAgaWYgKCFjb25zdHJhaW50ICYmICFlcXVhbHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcmltaXRpdmVWYWx1ZShpbml0aWFsVmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IENvbXBsZXhWYWx1ZShpbml0aWFsVmFsdWUsIGNvbmZpZyk7XG59XG5mdW5jdGlvbiBjcmVhdGVSZWFkb25seVZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgbmV3IFJlYWRvbmx5UHJpbWl0aXZlVmFsdWUodmFsdWUpLFxuICAgICAgICAocmF3VmFsdWUsIG9wdGlvbnMpID0+IHtcbiAgICAgICAgICAgIHZhbHVlLnNldFJhd1ZhbHVlKHJhd1ZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSxcbiAgICBdO1xufVxuXG5jbGFzcyBWYWx1ZU1hcCB7XG4gICAgY29uc3RydWN0b3IodmFsdWVNYXApIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy52YWxNYXBfID0gdmFsdWVNYXA7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMudmFsTWFwXykge1xuICAgICAgICAgICAgY29uc3QgdiA9IHRoaXMudmFsTWFwX1trZXldO1xuICAgICAgICAgICAgdi5lbWl0dGVyLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGVDb3JlKGluaXRpYWxWYWx1ZSkge1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGtleXMucmVkdWNlKChvLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKG8sIHtcbiAgICAgICAgICAgICAgICBba2V5XTogY3JlYXRlVmFsdWUoaW5pdGlhbFZhbHVlW2tleV0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG4gICAgc3RhdGljIGZyb21PYmplY3QoaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNvcmUgPSB0aGlzLmNyZWF0ZUNvcmUoaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBWYWx1ZU1hcChjb3JlKTtcbiAgICB9XG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxNYXBfW2tleV0ucmF3VmFsdWU7XG4gICAgfVxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsTWFwX1trZXldLnJhd1ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIHZhbHVlKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxNYXBfW2tleV07XG4gICAgfVxufVxuXG5jbGFzcyBEZWZpbml0ZVJhbmdlQ29uc3RyYWludCB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHRoaXMudmFsdWVzID0gVmFsdWVNYXAuZnJvbU9iamVjdCh7XG4gICAgICAgICAgICBtYXg6IGNvbmZpZy5tYXgsXG4gICAgICAgICAgICBtaW46IGNvbmZpZy5taW4sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdHJhaW4odmFsdWUpIHtcbiAgICAgICAgY29uc3QgbWF4ID0gdGhpcy52YWx1ZXMuZ2V0KCdtYXgnKTtcbiAgICAgICAgY29uc3QgbWluID0gdGhpcy52YWx1ZXMuZ2V0KCdtaW4nKTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCBtaW4pLCBtYXgpO1xuICAgIH1cbn1cblxuY2xhc3MgUmFuZ2VDb25zdHJhaW50IHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgIG1heDogY29uZmlnLm1heCxcbiAgICAgICAgICAgIG1pbjogY29uZmlnLm1pbixcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0cmFpbih2YWx1ZSkge1xuICAgICAgICBjb25zdCBtYXggPSB0aGlzLnZhbHVlcy5nZXQoJ21heCcpO1xuICAgICAgICBjb25zdCBtaW4gPSB0aGlzLnZhbHVlcy5nZXQoJ21pbicpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIGlmICghaXNFbXB0eShtaW4pKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBNYXRoLm1heChyZXN1bHQsIG1pbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0VtcHR5KG1heCkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IE1hdGgubWluKHJlc3VsdCwgbWF4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuY2xhc3MgU3RlcENvbnN0cmFpbnQge1xuICAgIGNvbnN0cnVjdG9yKHN0ZXAsIG9yaWdpbiA9IDApIHtcbiAgICAgICAgdGhpcy5zdGVwID0gc3RlcDtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XG4gICAgfVxuICAgIGNvbnN0cmFpbih2YWx1ZSkge1xuICAgICAgICBjb25zdCBvID0gdGhpcy5vcmlnaW4gJSB0aGlzLnN0ZXA7XG4gICAgICAgIGNvbnN0IHIgPSBNYXRoLnJvdW5kKCh2YWx1ZSAtIG8pIC8gdGhpcy5zdGVwKTtcbiAgICAgICAgcmV0dXJuIG8gKyByICogdGhpcy5zdGVwO1xuICAgIH1cbn1cblxuY2xhc3MgTnVtYmVyTGl0ZXJhbE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICB9XG4gICAgZXZhbHVhdGUoKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy50ZXh0KTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQ7XG4gICAgfVxufVxuY29uc3QgQklOQVJZX09QRVJBVElPTl9NQVAgPSB7XG4gICAgJyoqJzogKHYxLCB2MikgPT4gTWF0aC5wb3codjEsIHYyKSxcbiAgICAnKic6ICh2MSwgdjIpID0+IHYxICogdjIsXG4gICAgJy8nOiAodjEsIHYyKSA9PiB2MSAvIHYyLFxuICAgICclJzogKHYxLCB2MikgPT4gdjEgJSB2MixcbiAgICAnKyc6ICh2MSwgdjIpID0+IHYxICsgdjIsXG4gICAgJy0nOiAodjEsIHYyKSA9PiB2MSAtIHYyLFxuICAgICc8PCc6ICh2MSwgdjIpID0+IHYxIDw8IHYyLFxuICAgICc+Pic6ICh2MSwgdjIpID0+IHYxID4+IHYyLFxuICAgICc+Pj4nOiAodjEsIHYyKSA9PiB2MSA+Pj4gdjIsXG4gICAgJyYnOiAodjEsIHYyKSA9PiB2MSAmIHYyLFxuICAgICdeJzogKHYxLCB2MikgPT4gdjEgXiB2MixcbiAgICAnfCc6ICh2MSwgdjIpID0+IHYxIHwgdjIsXG59O1xuY2xhc3MgQmluYXJ5T3BlcmF0aW9uTm9kZSB7XG4gICAgY29uc3RydWN0b3Iob3BlcmF0b3IsIGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgIH1cbiAgICBldmFsdWF0ZSgpIHtcbiAgICAgICAgY29uc3Qgb3AgPSBCSU5BUllfT1BFUkFUSU9OX01BUFt0aGlzLm9wZXJhdG9yXTtcbiAgICAgICAgaWYgKCFvcCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmV4cGVjdGVkIGJpbmFyeSBvcGVyYXRvcjogJyR7dGhpcy5vcGVyYXRvcn1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3AodGhpcy5sZWZ0LmV2YWx1YXRlKCksIHRoaXMucmlnaHQuZXZhbHVhdGUoKSk7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgJ2IoJyxcbiAgICAgICAgICAgIHRoaXMubGVmdC50b1N0cmluZygpLFxuICAgICAgICAgICAgdGhpcy5vcGVyYXRvcixcbiAgICAgICAgICAgIHRoaXMucmlnaHQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICcpJyxcbiAgICAgICAgXS5qb2luKCcgJyk7XG4gICAgfVxufVxuY29uc3QgVU5BUllfT1BFUkFUSU9OX01BUCA9IHtcbiAgICAnKyc6ICh2KSA9PiB2LFxuICAgICctJzogKHYpID0+IC12LFxuICAgICd+JzogKHYpID0+IH52LFxufTtcbmNsYXNzIFVuYXJ5T3BlcmF0aW9uTm9kZSB7XG4gICAgY29uc3RydWN0b3Iob3BlcmF0b3IsIGV4cHIpIHtcbiAgICAgICAgdGhpcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByO1xuICAgIH1cbiAgICBldmFsdWF0ZSgpIHtcbiAgICAgICAgY29uc3Qgb3AgPSBVTkFSWV9PUEVSQVRJT05fTUFQW3RoaXMub3BlcmF0b3JdO1xuICAgICAgICBpZiAoIW9wKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuZXhwZWN0ZWQgdW5hcnkgb3BlcmF0b3I6ICcke3RoaXMub3BlcmF0b3J9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wKHRoaXMuZXhwcmVzc2lvbi5ldmFsdWF0ZSgpKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBbJ3UoJywgdGhpcy5vcGVyYXRvciwgdGhpcy5leHByZXNzaW9uLnRvU3RyaW5nKCksICcpJ10uam9pbignICcpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY29tYmluZVJlYWRlcihwYXJzZXJzKSB7XG4gICAgcmV0dXJuICh0ZXh0LCBjdXJzb3IpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJzZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZXJzW2ldKHRleHQsIGN1cnNvcik7XG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH07XG59XG5mdW5jdGlvbiByZWFkV2hpdGVzcGFjZSh0ZXh0LCBjdXJzb3IpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgbSA9IHRleHQuc3Vic3RyKGN1cnNvcikubWF0Y2goL15cXHMrLyk7XG4gICAgcmV0dXJuIChfYSA9IChtICYmIG1bMF0pKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcbn1cbmZ1bmN0aW9uIHJlYWROb25aZXJvRGlnaXQodGV4dCwgY3Vyc29yKSB7XG4gICAgY29uc3QgY2ggPSB0ZXh0LnN1YnN0cihjdXJzb3IsIDEpO1xuICAgIHJldHVybiBjaC5tYXRjaCgvXlsxLTldJC8pID8gY2ggOiAnJztcbn1cbmZ1bmN0aW9uIHJlYWREZWNpbWFsRGlnaXRzKHRleHQsIGN1cnNvcikge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBtID0gdGV4dC5zdWJzdHIoY3Vyc29yKS5tYXRjaCgvXlswLTldKy8pO1xuICAgIHJldHVybiAoX2EgPSAobSAmJiBtWzBdKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG59XG5mdW5jdGlvbiByZWFkU2lnbmVkSW50ZWdlcih0ZXh0LCBjdXJzb3IpIHtcbiAgICBjb25zdCBkcyA9IHJlYWREZWNpbWFsRGlnaXRzKHRleHQsIGN1cnNvcik7XG4gICAgaWYgKGRzICE9PSAnJykge1xuICAgICAgICByZXR1cm4gZHM7XG4gICAgfVxuICAgIGNvbnN0IHNpZ24gPSB0ZXh0LnN1YnN0cihjdXJzb3IsIDEpO1xuICAgIGN1cnNvciArPSAxO1xuICAgIGlmIChzaWduICE9PSAnLScgJiYgc2lnbiAhPT0gJysnKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3Qgc2RzID0gcmVhZERlY2ltYWxEaWdpdHModGV4dCwgY3Vyc29yKTtcbiAgICBpZiAoc2RzID09PSAnJykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBzaWduICsgc2RzO1xufVxuZnVuY3Rpb24gcmVhZEV4cG9uZW50UGFydCh0ZXh0LCBjdXJzb3IpIHtcbiAgICBjb25zdCBlID0gdGV4dC5zdWJzdHIoY3Vyc29yLCAxKTtcbiAgICBjdXJzb3IgKz0gMTtcbiAgICBpZiAoZS50b0xvd2VyQ2FzZSgpICE9PSAnZScpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCBzaSA9IHJlYWRTaWduZWRJbnRlZ2VyKHRleHQsIGN1cnNvcik7XG4gICAgaWYgKHNpID09PSAnJykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBlICsgc2k7XG59XG5mdW5jdGlvbiByZWFkRGVjaW1hbEludGVnZXJMaXRlcmFsKHRleHQsIGN1cnNvcikge1xuICAgIGNvbnN0IGNoID0gdGV4dC5zdWJzdHIoY3Vyc29yLCAxKTtcbiAgICBpZiAoY2ggPT09ICcwJykge1xuICAgICAgICByZXR1cm4gY2g7XG4gICAgfVxuICAgIGNvbnN0IG56ZCA9IHJlYWROb25aZXJvRGlnaXQodGV4dCwgY3Vyc29yKTtcbiAgICBjdXJzb3IgKz0gbnpkLmxlbmd0aDtcbiAgICBpZiAobnpkID09PSAnJykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBuemQgKyByZWFkRGVjaW1hbERpZ2l0cyh0ZXh0LCBjdXJzb3IpO1xufVxuZnVuY3Rpb24gcmVhZERlY2ltYWxMaXRlcmFsMSh0ZXh0LCBjdXJzb3IpIHtcbiAgICBjb25zdCBkaWwgPSByZWFkRGVjaW1hbEludGVnZXJMaXRlcmFsKHRleHQsIGN1cnNvcik7XG4gICAgY3Vyc29yICs9IGRpbC5sZW5ndGg7XG4gICAgaWYgKGRpbCA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCBkb3QgPSB0ZXh0LnN1YnN0cihjdXJzb3IsIDEpO1xuICAgIGN1cnNvciArPSBkb3QubGVuZ3RoO1xuICAgIGlmIChkb3QgIT09ICcuJykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNvbnN0IGRkcyA9IHJlYWREZWNpbWFsRGlnaXRzKHRleHQsIGN1cnNvcik7XG4gICAgY3Vyc29yICs9IGRkcy5sZW5ndGg7XG4gICAgcmV0dXJuIGRpbCArIGRvdCArIGRkcyArIHJlYWRFeHBvbmVudFBhcnQodGV4dCwgY3Vyc29yKTtcbn1cbmZ1bmN0aW9uIHJlYWREZWNpbWFsTGl0ZXJhbDIodGV4dCwgY3Vyc29yKSB7XG4gICAgY29uc3QgZG90ID0gdGV4dC5zdWJzdHIoY3Vyc29yLCAxKTtcbiAgICBjdXJzb3IgKz0gZG90Lmxlbmd0aDtcbiAgICBpZiAoZG90ICE9PSAnLicpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCBkZHMgPSByZWFkRGVjaW1hbERpZ2l0cyh0ZXh0LCBjdXJzb3IpO1xuICAgIGN1cnNvciArPSBkZHMubGVuZ3RoO1xuICAgIGlmIChkZHMgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIGRvdCArIGRkcyArIHJlYWRFeHBvbmVudFBhcnQodGV4dCwgY3Vyc29yKTtcbn1cbmZ1bmN0aW9uIHJlYWREZWNpbWFsTGl0ZXJhbDModGV4dCwgY3Vyc29yKSB7XG4gICAgY29uc3QgZGlsID0gcmVhZERlY2ltYWxJbnRlZ2VyTGl0ZXJhbCh0ZXh0LCBjdXJzb3IpO1xuICAgIGN1cnNvciArPSBkaWwubGVuZ3RoO1xuICAgIGlmIChkaWwgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIGRpbCArIHJlYWRFeHBvbmVudFBhcnQodGV4dCwgY3Vyc29yKTtcbn1cbmNvbnN0IHJlYWREZWNpbWFsTGl0ZXJhbCA9IGNvbWJpbmVSZWFkZXIoW1xuICAgIHJlYWREZWNpbWFsTGl0ZXJhbDEsXG4gICAgcmVhZERlY2ltYWxMaXRlcmFsMixcbiAgICByZWFkRGVjaW1hbExpdGVyYWwzLFxuXSk7XG5mdW5jdGlvbiBwYXJzZUJpbmFyeURpZ2l0cyh0ZXh0LCBjdXJzb3IpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgbSA9IHRleHQuc3Vic3RyKGN1cnNvcikubWF0Y2goL15bMDFdKy8pO1xuICAgIHJldHVybiAoX2EgPSAobSAmJiBtWzBdKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG59XG5mdW5jdGlvbiByZWFkQmluYXJ5SW50ZWdlckxpdGVyYWwodGV4dCwgY3Vyc29yKSB7XG4gICAgY29uc3QgcHJlZml4ID0gdGV4dC5zdWJzdHIoY3Vyc29yLCAyKTtcbiAgICBjdXJzb3IgKz0gcHJlZml4Lmxlbmd0aDtcbiAgICBpZiAocHJlZml4LnRvTG93ZXJDYXNlKCkgIT09ICcwYicpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCBiZHMgPSBwYXJzZUJpbmFyeURpZ2l0cyh0ZXh0LCBjdXJzb3IpO1xuICAgIGlmIChiZHMgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHByZWZpeCArIGJkcztcbn1cbmZ1bmN0aW9uIHJlYWRPY3RhbERpZ2l0cyh0ZXh0LCBjdXJzb3IpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgbSA9IHRleHQuc3Vic3RyKGN1cnNvcikubWF0Y2goL15bMC03XSsvKTtcbiAgICByZXR1cm4gKF9hID0gKG0gJiYgbVswXSkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnO1xufVxuZnVuY3Rpb24gcmVhZE9jdGFsSW50ZWdlckxpdGVyYWwodGV4dCwgY3Vyc29yKSB7XG4gICAgY29uc3QgcHJlZml4ID0gdGV4dC5zdWJzdHIoY3Vyc29yLCAyKTtcbiAgICBjdXJzb3IgKz0gcHJlZml4Lmxlbmd0aDtcbiAgICBpZiAocHJlZml4LnRvTG93ZXJDYXNlKCkgIT09ICcwbycpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCBvZHMgPSByZWFkT2N0YWxEaWdpdHModGV4dCwgY3Vyc29yKTtcbiAgICBpZiAob2RzID09PSAnJykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBwcmVmaXggKyBvZHM7XG59XG5mdW5jdGlvbiByZWFkSGV4RGlnaXRzKHRleHQsIGN1cnNvcikge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBtID0gdGV4dC5zdWJzdHIoY3Vyc29yKS5tYXRjaCgvXlswLTlhLWZdKy9pKTtcbiAgICByZXR1cm4gKF9hID0gKG0gJiYgbVswXSkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnO1xufVxuZnVuY3Rpb24gcmVhZEhleEludGVnZXJMaXRlcmFsKHRleHQsIGN1cnNvcikge1xuICAgIGNvbnN0IHByZWZpeCA9IHRleHQuc3Vic3RyKGN1cnNvciwgMik7XG4gICAgY3Vyc29yICs9IHByZWZpeC5sZW5ndGg7XG4gICAgaWYgKHByZWZpeC50b0xvd2VyQ2FzZSgpICE9PSAnMHgnKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgY29uc3QgaGRzID0gcmVhZEhleERpZ2l0cyh0ZXh0LCBjdXJzb3IpO1xuICAgIGlmIChoZHMgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHByZWZpeCArIGhkcztcbn1cbmNvbnN0IHJlYWROb25EZWNpbWFsSW50ZWdlckxpdGVyYWwgPSBjb21iaW5lUmVhZGVyKFtcbiAgICByZWFkQmluYXJ5SW50ZWdlckxpdGVyYWwsXG4gICAgcmVhZE9jdGFsSW50ZWdlckxpdGVyYWwsXG4gICAgcmVhZEhleEludGVnZXJMaXRlcmFsLFxuXSk7XG5jb25zdCByZWFkTnVtZXJpY0xpdGVyYWwgPSBjb21iaW5lUmVhZGVyKFtcbiAgICByZWFkTm9uRGVjaW1hbEludGVnZXJMaXRlcmFsLFxuICAgIHJlYWREZWNpbWFsTGl0ZXJhbCxcbl0pO1xuXG5mdW5jdGlvbiBwYXJzZUxpdGVyYWwodGV4dCwgY3Vyc29yKSB7XG4gICAgY29uc3QgbnVtID0gcmVhZE51bWVyaWNMaXRlcmFsKHRleHQsIGN1cnNvcik7XG4gICAgY3Vyc29yICs9IG51bS5sZW5ndGg7XG4gICAgaWYgKG51bSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGV2YWx1YWJsZTogbmV3IE51bWJlckxpdGVyYWxOb2RlKG51bSksXG4gICAgICAgIGN1cnNvcjogY3Vyc29yLFxuICAgIH07XG59XG5mdW5jdGlvbiBwYXJzZVBhcmVudGhlc2l6ZWRFeHByZXNzaW9uKHRleHQsIGN1cnNvcikge1xuICAgIGNvbnN0IG9wID0gdGV4dC5zdWJzdHIoY3Vyc29yLCAxKTtcbiAgICBjdXJzb3IgKz0gb3AubGVuZ3RoO1xuICAgIGlmIChvcCAhPT0gJygnKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBleHByID0gcGFyc2VFeHByZXNzaW9uKHRleHQsIGN1cnNvcik7XG4gICAgaWYgKCFleHByKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjdXJzb3IgPSBleHByLmN1cnNvcjtcbiAgICBjdXJzb3IgKz0gcmVhZFdoaXRlc3BhY2UodGV4dCwgY3Vyc29yKS5sZW5ndGg7XG4gICAgY29uc3QgY2wgPSB0ZXh0LnN1YnN0cihjdXJzb3IsIDEpO1xuICAgIGN1cnNvciArPSBjbC5sZW5ndGg7XG4gICAgaWYgKGNsICE9PSAnKScpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGV2YWx1YWJsZTogZXhwci5ldmFsdWFibGUsXG4gICAgICAgIGN1cnNvcjogY3Vyc29yLFxuICAgIH07XG59XG5mdW5jdGlvbiBwYXJzZVByaW1hcnlFeHByZXNzaW9uKHRleHQsIGN1cnNvcikge1xuICAgIHZhciBfYTtcbiAgICByZXR1cm4gKChfYSA9IHBhcnNlTGl0ZXJhbCh0ZXh0LCBjdXJzb3IpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBwYXJzZVBhcmVudGhlc2l6ZWRFeHByZXNzaW9uKHRleHQsIGN1cnNvcikpO1xufVxuZnVuY3Rpb24gcGFyc2VVbmFyeUV4cHJlc3Npb24odGV4dCwgY3Vyc29yKSB7XG4gICAgY29uc3QgZXhwciA9IHBhcnNlUHJpbWFyeUV4cHJlc3Npb24odGV4dCwgY3Vyc29yKTtcbiAgICBpZiAoZXhwcikge1xuICAgICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG4gICAgY29uc3Qgb3AgPSB0ZXh0LnN1YnN0cihjdXJzb3IsIDEpO1xuICAgIGN1cnNvciArPSBvcC5sZW5ndGg7XG4gICAgaWYgKG9wICE9PSAnKycgJiYgb3AgIT09ICctJyAmJiBvcCAhPT0gJ34nKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBudW0gPSBwYXJzZVVuYXJ5RXhwcmVzc2lvbih0ZXh0LCBjdXJzb3IpO1xuICAgIGlmICghbnVtKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjdXJzb3IgPSBudW0uY3Vyc29yO1xuICAgIHJldHVybiB7XG4gICAgICAgIGN1cnNvcjogY3Vyc29yLFxuICAgICAgICBldmFsdWFibGU6IG5ldyBVbmFyeU9wZXJhdGlvbk5vZGUob3AsIG51bS5ldmFsdWFibGUpLFxuICAgIH07XG59XG5mdW5jdGlvbiByZWFkQmluYXJ5T3BlcmF0b3Iob3BzLCB0ZXh0LCBjdXJzb3IpIHtcbiAgICBjdXJzb3IgKz0gcmVhZFdoaXRlc3BhY2UodGV4dCwgY3Vyc29yKS5sZW5ndGg7XG4gICAgY29uc3Qgb3AgPSBvcHMuZmlsdGVyKChvcCkgPT4gdGV4dC5zdGFydHNXaXRoKG9wLCBjdXJzb3IpKVswXTtcbiAgICBpZiAoIW9wKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjdXJzb3IgKz0gb3AubGVuZ3RoO1xuICAgIGN1cnNvciArPSByZWFkV2hpdGVzcGFjZSh0ZXh0LCBjdXJzb3IpLmxlbmd0aDtcbiAgICByZXR1cm4ge1xuICAgICAgICBjdXJzb3I6IGN1cnNvcixcbiAgICAgICAgb3BlcmF0b3I6IG9wLFxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVCaW5hcnlPcGVyYXRpb25FeHByZXNzaW9uUGFyc2VyKGV4cHJQYXJzZXIsIG9wcykge1xuICAgIHJldHVybiAodGV4dCwgY3Vyc29yKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpcnN0RXhwciA9IGV4cHJQYXJzZXIodGV4dCwgY3Vyc29yKTtcbiAgICAgICAgaWYgKCFmaXJzdEV4cHIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGN1cnNvciA9IGZpcnN0RXhwci5jdXJzb3I7XG4gICAgICAgIGxldCBleHByID0gZmlyc3RFeHByLmV2YWx1YWJsZTtcbiAgICAgICAgZm9yICg7Oykge1xuICAgICAgICAgICAgY29uc3Qgb3AgPSByZWFkQmluYXJ5T3BlcmF0b3Iob3BzLCB0ZXh0LCBjdXJzb3IpO1xuICAgICAgICAgICAgaWYgKCFvcCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3Vyc29yID0gb3AuY3Vyc29yO1xuICAgICAgICAgICAgY29uc3QgbmV4dEV4cHIgPSBleHByUGFyc2VyKHRleHQsIGN1cnNvcik7XG4gICAgICAgICAgICBpZiAoIW5leHRFeHByKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJzb3IgPSBuZXh0RXhwci5jdXJzb3I7XG4gICAgICAgICAgICBleHByID0gbmV3IEJpbmFyeU9wZXJhdGlvbk5vZGUob3Aub3BlcmF0b3IsIGV4cHIsIG5leHRFeHByLmV2YWx1YWJsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4cHJcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGN1cnNvcjogY3Vyc29yLFxuICAgICAgICAgICAgICAgIGV2YWx1YWJsZTogZXhwcixcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9O1xufVxuY29uc3QgcGFyc2VCaW5hcnlPcGVyYXRpb25FeHByZXNzaW9uID0gW1xuICAgIFsnKionXSxcbiAgICBbJyonLCAnLycsICclJ10sXG4gICAgWycrJywgJy0nXSxcbiAgICBbJzw8JywgJz4+PicsICc+PiddLFxuICAgIFsnJiddLFxuICAgIFsnXiddLFxuICAgIFsnfCddLFxuXS5yZWR1Y2UoKHBhcnNlciwgb3BzKSA9PiB7XG4gICAgcmV0dXJuIGNyZWF0ZUJpbmFyeU9wZXJhdGlvbkV4cHJlc3Npb25QYXJzZXIocGFyc2VyLCBvcHMpO1xufSwgcGFyc2VVbmFyeUV4cHJlc3Npb24pO1xuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKHRleHQsIGN1cnNvcikge1xuICAgIGN1cnNvciArPSByZWFkV2hpdGVzcGFjZSh0ZXh0LCBjdXJzb3IpLmxlbmd0aDtcbiAgICByZXR1cm4gcGFyc2VCaW5hcnlPcGVyYXRpb25FeHByZXNzaW9uKHRleHQsIGN1cnNvcik7XG59XG5mdW5jdGlvbiBwYXJzZUVjbWFOdW1iZXJFeHByZXNzaW9uKHRleHQpIHtcbiAgICBjb25zdCBleHByID0gcGFyc2VFeHByZXNzaW9uKHRleHQsIDApO1xuICAgIGlmICghZXhwcikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgY3Vyc29yID0gZXhwci5jdXJzb3IgKyByZWFkV2hpdGVzcGFjZSh0ZXh0LCBleHByLmN1cnNvcikubGVuZ3RoO1xuICAgIGlmIChjdXJzb3IgIT09IHRleHQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZXhwci5ldmFsdWFibGU7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTnVtYmVyKHRleHQpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgciA9IHBhcnNlRWNtYU51bWJlckV4cHJlc3Npb24odGV4dCk7XG4gICAgcmV0dXJuIChfYSA9IHIgPT09IG51bGwgfHwgciA9PT0gdm9pZCAwID8gdm9pZCAwIDogci5ldmFsdWF0ZSgpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBudWxsO1xufVxuZnVuY3Rpb24gbnVtYmVyRnJvbVVua25vd24odmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IHB2ID0gcGFyc2VOdW1iZXIodmFsdWUpO1xuICAgICAgICBpZiAoIWlzRW1wdHkocHYpKSB7XG4gICAgICAgICAgICByZXR1cm4gcHY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG59XG5mdW5jdGlvbiBudW1iZXJUb1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xufVxuZnVuY3Rpb24gY3JlYXRlTnVtYmVyRm9ybWF0dGVyKGRpZ2l0cykge1xuICAgIHJldHVybiAodmFsdWUpID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQoTWF0aC5tYXgoTWF0aC5taW4oZGlnaXRzLCAyMCksIDApKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBtYXBSYW5nZSh2YWx1ZSwgc3RhcnQxLCBlbmQxLCBzdGFydDIsIGVuZDIpIHtcbiAgICBjb25zdCBwID0gKHZhbHVlIC0gc3RhcnQxKSAvIChlbmQxIC0gc3RhcnQxKTtcbiAgICByZXR1cm4gc3RhcnQyICsgcCAqIChlbmQyIC0gc3RhcnQyKTtcbn1cbmZ1bmN0aW9uIGdldERlY2ltYWxEaWdpdHModmFsdWUpIHtcbiAgICBjb25zdCB0ZXh0ID0gU3RyaW5nKHZhbHVlLnRvRml4ZWQoMTApKTtcbiAgICBjb25zdCBmcmFjID0gdGV4dC5zcGxpdCgnLicpWzFdO1xuICAgIHJldHVybiBmcmFjLnJlcGxhY2UoLzArJC8sICcnKS5sZW5ndGg7XG59XG5mdW5jdGlvbiBjb25zdHJhaW5SYW5nZSh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIG1pbiksIG1heCk7XG59XG5mdW5jdGlvbiBsb29wUmFuZ2UodmFsdWUsIG1heCkge1xuICAgIHJldHVybiAoKHZhbHVlICUgbWF4KSArIG1heCkgJSBtYXg7XG59XG5mdW5jdGlvbiBnZXRTdWl0YWJsZURlY2ltYWxEaWdpdHMocGFyYW1zLCByYXdWYWx1ZSkge1xuICAgIHJldHVybiAhaXNFbXB0eShwYXJhbXMuc3RlcClcbiAgICAgICAgPyBnZXREZWNpbWFsRGlnaXRzKHBhcmFtcy5zdGVwKVxuICAgICAgICA6IE1hdGgubWF4KGdldERlY2ltYWxEaWdpdHMocmF3VmFsdWUpLCAyKTtcbn1cbmZ1bmN0aW9uIGdldFN1aXRhYmxlS2V5U2NhbGUocGFyYW1zKSB7XG4gICAgdmFyIF9hO1xuICAgIHJldHVybiAoX2EgPSBwYXJhbXMuc3RlcCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMTtcbn1cbmZ1bmN0aW9uIGdldFN1aXRhYmxlUG9pbnRlclNjYWxlKHBhcmFtcywgcmF3VmFsdWUpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgYmFzZSA9IE1hdGguYWJzKChfYSA9IHBhcmFtcy5zdGVwKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiByYXdWYWx1ZSk7XG4gICAgcmV0dXJuIGJhc2UgPT09IDAgPyAwLjEgOiBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZzEwKGJhc2UpKSAtIDEpO1xufVxuZnVuY3Rpb24gY3JlYXRlU3RlcENvbnN0cmFpbnQocGFyYW1zLCBpbml0aWFsVmFsdWUpIHtcbiAgICBpZiAoIWlzRW1wdHkocGFyYW1zLnN0ZXApKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RlcENvbnN0cmFpbnQocGFyYW1zLnN0ZXAsIGluaXRpYWxWYWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gY3JlYXRlUmFuZ2VDb25zdHJhaW50KHBhcmFtcykge1xuICAgIGlmICghaXNFbXB0eShwYXJhbXMubWF4KSAmJiAhaXNFbXB0eShwYXJhbXMubWluKSkge1xuICAgICAgICByZXR1cm4gbmV3IERlZmluaXRlUmFuZ2VDb25zdHJhaW50KHtcbiAgICAgICAgICAgIG1heDogcGFyYW1zLm1heCxcbiAgICAgICAgICAgIG1pbjogcGFyYW1zLm1pbixcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmICghaXNFbXB0eShwYXJhbXMubWF4KSB8fCAhaXNFbXB0eShwYXJhbXMubWluKSkge1xuICAgICAgICByZXR1cm4gbmV3IFJhbmdlQ29uc3RyYWludCh7XG4gICAgICAgICAgICBtYXg6IHBhcmFtcy5tYXgsXG4gICAgICAgICAgICBtaW46IHBhcmFtcy5taW4sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZU51bWJlclRleHRQcm9wc09iamVjdChwYXJhbXMsIGluaXRpYWxWYWx1ZSkge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIHJldHVybiB7XG4gICAgICAgIGZvcm1hdHRlcjogKF9hID0gcGFyYW1zLmZvcm1hdCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogY3JlYXRlTnVtYmVyRm9ybWF0dGVyKGdldFN1aXRhYmxlRGVjaW1hbERpZ2l0cyhwYXJhbXMsIGluaXRpYWxWYWx1ZSkpLFxuICAgICAgICBrZXlTY2FsZTogKF9iID0gcGFyYW1zLmtleVNjYWxlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBnZXRTdWl0YWJsZUtleVNjYWxlKHBhcmFtcyksXG4gICAgICAgIHBvaW50ZXJTY2FsZTogKF9jID0gcGFyYW1zLnBvaW50ZXJTY2FsZSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogZ2V0U3VpdGFibGVQb2ludGVyU2NhbGUocGFyYW1zLCBpbml0aWFsVmFsdWUpLFxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVOdW1iZXJUZXh0SW5wdXRQYXJhbXNQYXJzZXIocCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGZvcm1hdDogcC5vcHRpb25hbC5mdW5jdGlvbixcbiAgICAgICAga2V5U2NhbGU6IHAub3B0aW9uYWwubnVtYmVyLFxuICAgICAgICBtYXg6IHAub3B0aW9uYWwubnVtYmVyLFxuICAgICAgICBtaW46IHAub3B0aW9uYWwubnVtYmVyLFxuICAgICAgICBwb2ludGVyU2NhbGU6IHAub3B0aW9uYWwubnVtYmVyLFxuICAgICAgICBzdGVwOiBwLm9wdGlvbmFsLm51bWJlcixcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQb2ludEF4aXMoY29uZmlnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29uc3RyYWludDogY29uZmlnLmNvbnN0cmFpbnQsXG4gICAgICAgIHRleHRQcm9wczogVmFsdWVNYXAuZnJvbU9iamVjdChjcmVhdGVOdW1iZXJUZXh0UHJvcHNPYmplY3QoY29uZmlnLnBhcmFtcywgY29uZmlnLmluaXRpYWxWYWx1ZSkpLFxuICAgIH07XG59XG5cbmNsYXNzIEJsYWRlQXBpIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250cm9sbGVyKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IGNvbnRyb2xsZXI7XG4gICAgfVxuICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLnZpZXcuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0IGRpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLnZpZXdQcm9wcy5nZXQoJ2Rpc2FibGVkJyk7XG4gICAgfVxuICAgIHNldCBkaXNhYmxlZChkaXNhYmxlZCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIudmlld1Byb3BzLnNldCgnZGlzYWJsZWQnLCBkaXNhYmxlZCk7XG4gICAgfVxuICAgIGdldCBoaWRkZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIudmlld1Byb3BzLmdldCgnaGlkZGVuJyk7XG4gICAgfVxuICAgIHNldCBoaWRkZW4oaGlkZGVuKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci52aWV3UHJvcHMuc2V0KCdoaWRkZW4nLCBoaWRkZW4pO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIudmlld1Byb3BzLnNldCgnZGlzcG9zZWQnLCB0cnVlKTtcbiAgICB9XG4gICAgaW1wb3J0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5pbXBvcnRTdGF0ZShzdGF0ZSk7XG4gICAgfVxuICAgIGV4cG9ydFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLmV4cG9ydFN0YXRlKCk7XG4gICAgfVxufVxuXG5jbGFzcyBUcEV2ZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXQpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgfVxufVxuY2xhc3MgVHBDaGFuZ2VFdmVudCBleHRlbmRzIFRwRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgdmFsdWUsIGxhc3QpIHtcbiAgICAgICAgc3VwZXIodGFyZ2V0KTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmxhc3QgPSBsYXN0ICE9PSBudWxsICYmIGxhc3QgIT09IHZvaWQgMCA/IGxhc3QgOiB0cnVlO1xuICAgIH1cbn1cbmNsYXNzIFRwRm9sZEV2ZW50IGV4dGVuZHMgVHBFdmVudCB7XG4gICAgY29uc3RydWN0b3IodGFyZ2V0LCBleHBhbmRlZCkge1xuICAgICAgICBzdXBlcih0YXJnZXQpO1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gZXhwYW5kZWQ7XG4gICAgfVxufVxuY2xhc3MgVHBUYWJTZWxlY3RFdmVudCBleHRlbmRzIFRwRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgaW5kZXgpIHtcbiAgICAgICAgc3VwZXIodGFyZ2V0KTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIH1cbn1cbmNsYXNzIFRwTW91c2VFdmVudCBleHRlbmRzIFRwRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgbmF0aXZlRXZlbnQpIHtcbiAgICAgICAgc3VwZXIodGFyZ2V0KTtcbiAgICAgICAgdGhpcy5uYXRpdmUgPSBuYXRpdmVFdmVudDtcbiAgICB9XG59XG5cbmNsYXNzIEJpbmRpbmdBcGkgZXh0ZW5kcyBCbGFkZUFwaSB7XG4gICAgY29uc3RydWN0b3IoY29udHJvbGxlcikge1xuICAgICAgICBzdXBlcihjb250cm9sbGVyKTtcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlXyA9IHRoaXMub25WYWx1ZUNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyXyA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uVmFsdWVDaGFuZ2VfKTtcbiAgICB9XG4gICAgZ2V0IGxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLmxhYmVsQ29udHJvbGxlci5wcm9wcy5nZXQoJ2xhYmVsJyk7XG4gICAgfVxuICAgIHNldCBsYWJlbChsYWJlbCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIubGFiZWxDb250cm9sbGVyLnByb3BzLnNldCgnbGFiZWwnLCBsYWJlbCk7XG4gICAgfVxuICAgIGdldCBrZXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIudmFsdWUuYmluZGluZy50YXJnZXQua2V5O1xuICAgIH1cbiAgICBnZXQgdGFnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLnRhZztcbiAgICB9XG4gICAgc2V0IHRhZyh0YWcpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLnRhZyA9IHRhZztcbiAgICB9XG4gICAgb24oZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IGJoID0gaGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVtaXR0ZXJfLm9uKGV2ZW50TmFtZSwgKGV2KSA9PiB7XG4gICAgICAgICAgICBiaChldik7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogaGFuZGxlcixcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvZmYoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuZW1pdHRlcl8ub2ZmKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIudmFsdWUuZmV0Y2goKTtcbiAgICB9XG4gICAgb25WYWx1ZUNoYW5nZV8oZXYpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbnRyb2xsZXIudmFsdWU7XG4gICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgnY2hhbmdlJywgbmV3IFRwQ2hhbmdlRXZlbnQodGhpcywgZm9yY2VDYXN0KHZhbHVlLmJpbmRpbmcudGFyZ2V0LnJlYWQoKSksIGV2Lm9wdGlvbnMubGFzdCkpO1xuICAgIH1cbn1cblxuY2xhc3MgSW5wdXRCaW5kaW5nVmFsdWUge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCBiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMub25WYWx1ZUJlZm9yZUNoYW5nZV8gPSB0aGlzLm9uVmFsdWVCZWZvcmVDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZV8gPSB0aGlzLm9uVmFsdWVDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYmluZGluZyA9IGJpbmRpbmc7XG4gICAgICAgIHRoaXMudmFsdWVfID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmFsdWVfLmVtaXR0ZXIub24oJ2JlZm9yZWNoYW5nZScsIHRoaXMub25WYWx1ZUJlZm9yZUNoYW5nZV8pO1xuICAgICAgICB0aGlzLnZhbHVlXy5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uVmFsdWVDaGFuZ2VfKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICB9XG4gICAgZ2V0IHJhd1ZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV8ucmF3VmFsdWU7XG4gICAgfVxuICAgIHNldCByYXdWYWx1ZShyYXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlXy5yYXdWYWx1ZSA9IHJhd1ZhbHVlO1xuICAgIH1cbiAgICBzZXRSYXdWYWx1ZShyYXdWYWx1ZSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnZhbHVlXy5zZXRSYXdWYWx1ZShyYXdWYWx1ZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGZldGNoKCkge1xuICAgICAgICB0aGlzLnZhbHVlXy5yYXdWYWx1ZSA9IHRoaXMuYmluZGluZy5yZWFkKCk7XG4gICAgfVxuICAgIHB1c2goKSB7XG4gICAgICAgIHRoaXMuYmluZGluZy53cml0ZSh0aGlzLnZhbHVlXy5yYXdWYWx1ZSk7XG4gICAgfVxuICAgIG9uVmFsdWVCZWZvcmVDaGFuZ2VfKGV2KSB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdiZWZvcmVjaGFuZ2UnLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGV2KSwgeyBzZW5kZXI6IHRoaXMgfSkpO1xuICAgIH1cbiAgICBvblZhbHVlQ2hhbmdlXyhldikge1xuICAgICAgICB0aGlzLnB1c2goKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2NoYW5nZScsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZXYpLCB7IHNlbmRlcjogdGhpcyB9KSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaXNJbnB1dEJpbmRpbmdWYWx1ZSh2KSB7XG4gICAgaWYgKCEoJ2JpbmRpbmcnIGluIHYpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgYiA9IHZbJ2JpbmRpbmcnXTtcbiAgICByZXR1cm4gaXNCaW5kaW5nKGIpICYmICdyZWFkJyBpbiBiICYmICd3cml0ZScgaW4gYjtcbn1cblxuZnVuY3Rpb24gcGFyc2VPYmplY3QodmFsdWUsIGtleVRvUGFyc2VyTWFwKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGtleVRvUGFyc2VyTWFwKTtcbiAgICBjb25zdCByZXN1bHQgPSBrZXlzLnJlZHVjZSgodG1wLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKHRtcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcnNlciA9IGtleVRvUGFyc2VyTWFwW2tleV07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlcih2YWx1ZVtrZXldKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zdWNjZWVkZWRcbiAgICAgICAgICAgID8gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0bXApLCB7IFtrZXldOiByZXN1bHQudmFsdWUgfSkgOiB1bmRlZmluZWQ7XG4gICAgfSwge30pO1xuICAgIHJldHVybiBmb3JjZUNhc3QocmVzdWx0KTtcbn1cbmZ1bmN0aW9uIHBhcnNlQXJyYXkodmFsdWUsIHBhcnNlSXRlbSkge1xuICAgIHJldHVybiB2YWx1ZS5yZWR1Y2UoKHRtcCwgaXRlbSkgPT4ge1xuICAgICAgICBpZiAodG1wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VJdGVtKGl0ZW0pO1xuICAgICAgICBpZiAoIXJlc3VsdC5zdWNjZWVkZWQgfHwgcmVzdWx0LnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFsuLi50bXAsIHJlc3VsdC52YWx1ZV07XG4gICAgfSwgW10pO1xufVxuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jztcbn1cbmZ1bmN0aW9uIGNyZWF0ZU1pY3JvUGFyc2VyQnVpbGRlcihwYXJzZSkge1xuICAgIHJldHVybiAob3B0aW9uYWwpID0+ICh2KSA9PiB7XG4gICAgICAgIGlmICghb3B0aW9uYWwgJiYgdiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN1Y2NlZWRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbmFsICYmIHYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdWNjZWVkZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2Uodik7XG4gICAgICAgIHJldHVybiByZXN1bHQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgc3VjY2VlZGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICBzdWNjZWVkZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9O1xuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVNaWNyb1BhcnNlckJ1aWxkZXJzKG9wdGlvbmFsKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3VzdG9tOiAocGFyc2UpID0+IGNyZWF0ZU1pY3JvUGFyc2VyQnVpbGRlcihwYXJzZSkob3B0aW9uYWwpLFxuICAgICAgICBib29sZWFuOiBjcmVhdGVNaWNyb1BhcnNlckJ1aWxkZXIoKHYpID0+IHR5cGVvZiB2ID09PSAnYm9vbGVhbicgPyB2IDogdW5kZWZpbmVkKShvcHRpb25hbCksXG4gICAgICAgIG51bWJlcjogY3JlYXRlTWljcm9QYXJzZXJCdWlsZGVyKCh2KSA9PiB0eXBlb2YgdiA9PT0gJ251bWJlcicgPyB2IDogdW5kZWZpbmVkKShvcHRpb25hbCksXG4gICAgICAgIHN0cmluZzogY3JlYXRlTWljcm9QYXJzZXJCdWlsZGVyKCh2KSA9PiB0eXBlb2YgdiA9PT0gJ3N0cmluZycgPyB2IDogdW5kZWZpbmVkKShvcHRpb25hbCksXG4gICAgICAgIGZ1bmN0aW9uOiBjcmVhdGVNaWNyb1BhcnNlckJ1aWxkZXIoKHYpID0+XG4gICAgICAgIHR5cGVvZiB2ID09PSAnZnVuY3Rpb24nID8gdiA6IHVuZGVmaW5lZCkob3B0aW9uYWwpLFxuICAgICAgICBjb25zdGFudDogKHZhbHVlKSA9PiBjcmVhdGVNaWNyb1BhcnNlckJ1aWxkZXIoKHYpID0+ICh2ID09PSB2YWx1ZSA/IHZhbHVlIDogdW5kZWZpbmVkKSkob3B0aW9uYWwpLFxuICAgICAgICByYXc6IGNyZWF0ZU1pY3JvUGFyc2VyQnVpbGRlcigodikgPT4gdikob3B0aW9uYWwpLFxuICAgICAgICBvYmplY3Q6IChrZXlUb1BhcnNlck1hcCkgPT4gY3JlYXRlTWljcm9QYXJzZXJCdWlsZGVyKCh2KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJzZU9iamVjdCh2LCBrZXlUb1BhcnNlck1hcCk7XG4gICAgICAgIH0pKG9wdGlvbmFsKSxcbiAgICAgICAgYXJyYXk6IChpdGVtUGFyc2VyKSA9PiBjcmVhdGVNaWNyb1BhcnNlckJ1aWxkZXIoKHYpID0+IHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VBcnJheSh2LCBpdGVtUGFyc2VyKTtcbiAgICAgICAgfSkob3B0aW9uYWwpLFxuICAgIH07XG59XG5jb25zdCBNaWNyb1BhcnNlcnMgPSB7XG4gICAgb3B0aW9uYWw6IGNyZWF0ZU1pY3JvUGFyc2VyQnVpbGRlcnModHJ1ZSksXG4gICAgcmVxdWlyZWQ6IGNyZWF0ZU1pY3JvUGFyc2VyQnVpbGRlcnMoZmFsc2UpLFxufTtcbmZ1bmN0aW9uIHBhcnNlUmVjb3JkKHZhbHVlLCBrZXlUb1BhcnNlck1hcCkge1xuICAgIGNvbnN0IG1hcCA9IGtleVRvUGFyc2VyTWFwKE1pY3JvUGFyc2Vycyk7XG4gICAgY29uc3QgcmVzdWx0ID0gTWljcm9QYXJzZXJzLnJlcXVpcmVkLm9iamVjdChtYXApKHZhbHVlKTtcbiAgICByZXR1cm4gcmVzdWx0LnN1Y2NlZWRlZCA/IHJlc3VsdC52YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaW1wb3J0QmxhZGVTdGF0ZShzdGF0ZSwgc3VwZXJJbXBvcnQsIHBhcnNlciwgY2FsbGJhY2spIHtcbiAgICBpZiAoc3VwZXJJbXBvcnQgJiYgIXN1cGVySW1wb3J0KHN0YXRlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUmVjb3JkKHN0YXRlLCBwYXJzZXIpO1xuICAgIHJldHVybiByZXN1bHQgPyBjYWxsYmFjayhyZXN1bHQpIDogZmFsc2U7XG59XG5mdW5jdGlvbiBleHBvcnRCbGFkZVN0YXRlKHN1cGVyRXhwb3J0LCB0aGlzU3RhdGUpIHtcbiAgICB2YXIgX2E7XG4gICAgcmV0dXJuIGRlZXBNZXJnZSgoX2EgPSBzdXBlckV4cG9ydCA9PT0gbnVsbCB8fCBzdXBlckV4cG9ydCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3VwZXJFeHBvcnQoKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDoge30sIHRoaXNTdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGlzVmFsdWVCbGFkZUNvbnRyb2xsZXIoYmMpIHtcbiAgICByZXR1cm4gJ3ZhbHVlJyBpbiBiYztcbn1cblxuZnVuY3Rpb24gaXNCaW5kaW5nVmFsdWUodikge1xuICAgIGlmICghaXNPYmplY3QkMSh2KSB8fCAhKCdiaW5kaW5nJyBpbiB2KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGIgPSB2LmJpbmRpbmc7XG4gICAgcmV0dXJuIGlzQmluZGluZyhiKTtcbn1cblxuY29uc3QgU1ZHX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbmZ1bmN0aW9uIGZvcmNlUmVmbG93KGVsZW1lbnQpIHtcbiAgICBlbGVtZW50Lm9mZnNldEhlaWdodDtcbn1cbmZ1bmN0aW9uIGRpc2FibGVUcmFuc2l0aW9uVGVtcG9yYXJpbHkoZWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB0ID0gZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcbiAgICBjYWxsYmFjaygpO1xuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IHQ7XG59XG5mdW5jdGlvbiBzdXBwb3J0c1RvdWNoKGRvYykge1xuICAgIHJldHVybiBkb2Mub250b3VjaHN0YXJ0ICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBnZXRHbG9iYWxPYmplY3QoKSB7XG4gICAgcmV0dXJuIGdsb2JhbFRoaXM7XG59XG5mdW5jdGlvbiBnZXRXaW5kb3dEb2N1bWVudCgpIHtcbiAgICBjb25zdCBnbG9iYWxPYmogPSBmb3JjZUNhc3QoZ2V0R2xvYmFsT2JqZWN0KCkpO1xuICAgIHJldHVybiBnbG9iYWxPYmouZG9jdW1lbnQ7XG59XG5mdW5jdGlvbiBnZXRDYW52YXNDb250ZXh0KGNhbnZhc0VsZW1lbnQpIHtcbiAgICBjb25zdCB3aW4gPSBjYW52YXNFbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgaWYgKCF3aW4pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGlzQnJvd3NlciA9ICdkb2N1bWVudCcgaW4gd2luO1xuICAgIHJldHVybiBpc0Jyb3dzZXJcbiAgICAgICAgPyBjYW52YXNFbGVtZW50LmdldENvbnRleHQoJzJkJywge1xuICAgICAgICAgICAgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgICA6IG51bGw7XG59XG5jb25zdCBJQ09OX0lEX1RPX0lOTkVSX0hUTUxfTUFQID0ge1xuICAgIGNoZWNrOiAnPHBhdGggZD1cIk0yIDhsNCA0bDggLThcIi8+JyxcbiAgICBkcm9wZG93bjogJzxwYXRoIGQ9XCJNNSA3aDZsLTMgMyB6XCIvPicsXG4gICAgcDJkcGFkOiAnPHBhdGggZD1cIk04IDR2OFwiLz48cGF0aCBkPVwiTTQgOGg4XCIvPjxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiMTJcIiByPVwiMS4yXCIvPicsXG59O1xuZnVuY3Rpb24gY3JlYXRlU3ZnSWNvbkVsZW1lbnQoZG9jdW1lbnQsIGljb25JZCkge1xuICAgIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHX05TLCAnc3ZnJyk7XG4gICAgZWxlbS5pbm5lckhUTUwgPSBJQ09OX0lEX1RPX0lOTkVSX0hUTUxfTUFQW2ljb25JZF07XG4gICAgcmV0dXJuIGVsZW07XG59XG5mdW5jdGlvbiBpbnNlcnRFbGVtZW50QXQocGFyZW50RWxlbWVudCwgZWxlbWVudCwgaW5kZXgpIHtcbiAgICBwYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShlbGVtZW50LCBwYXJlbnRFbGVtZW50LmNoaWxkcmVuW2luZGV4XSk7XG59XG5mdW5jdGlvbiByZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW1vdmVDaGlsZEVsZW1lbnRzKGVsZW1lbnQpIHtcbiAgICB3aGlsZSAoZWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5jaGlsZHJlblswXSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGROb2RlcyhlbGVtZW50KSB7XG4gICAgd2hpbGUgKGVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBmaW5kTmV4dFRhcmdldChldikge1xuICAgIGlmIChldi5yZWxhdGVkVGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBmb3JjZUNhc3QoZXYucmVsYXRlZFRhcmdldCk7XG4gICAgfVxuICAgIGlmICgnZXhwbGljaXRPcmlnaW5hbFRhcmdldCcgaW4gZXYpIHtcbiAgICAgICAgcmV0dXJuIGV2LmV4cGxpY2l0T3JpZ2luYWxUYXJnZXQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBiaW5kVmFsdWUodmFsdWUsIGFwcGx5VmFsdWUpIHtcbiAgICB2YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCAoZXYpID0+IHtcbiAgICAgICAgYXBwbHlWYWx1ZShldi5yYXdWYWx1ZSk7XG4gICAgfSk7XG4gICAgYXBwbHlWYWx1ZSh2YWx1ZS5yYXdWYWx1ZSk7XG59XG5mdW5jdGlvbiBiaW5kVmFsdWVNYXAodmFsdWVNYXAsIGtleSwgYXBwbHlWYWx1ZSkge1xuICAgIGJpbmRWYWx1ZSh2YWx1ZU1hcC52YWx1ZShrZXkpLCBhcHBseVZhbHVlKTtcbn1cblxuY29uc3QgUFJFRklYID0gJ3RwJztcbmZ1bmN0aW9uIENsYXNzTmFtZSh2aWV3TmFtZSkge1xuICAgIGNvbnN0IGZuID0gKG9wdF9lbGVtZW50TmFtZSwgb3B0X21vZGlmaWVyKSA9PiB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBQUkVGSVgsXG4gICAgICAgICAgICAnLScsXG4gICAgICAgICAgICB2aWV3TmFtZSxcbiAgICAgICAgICAgICd2JyxcbiAgICAgICAgICAgIG9wdF9lbGVtZW50TmFtZSA/IGBfJHtvcHRfZWxlbWVudE5hbWV9YCA6ICcnLFxuICAgICAgICAgICAgb3B0X21vZGlmaWVyID8gYC0ke29wdF9tb2RpZmllcn1gIDogJycsXG4gICAgICAgIF0uam9pbignJyk7XG4gICAgfTtcbiAgICByZXR1cm4gZm47XG59XG5cbmNvbnN0IGNuJHIgPSBDbGFzc05hbWUoJ2xibCcpO1xuZnVuY3Rpb24gY3JlYXRlTGFiZWxOb2RlKGRvYywgbGFiZWwpIHtcbiAgICBjb25zdCBmcmFnID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBjb25zdCBsaW5lTm9kZXMgPSBsYWJlbC5zcGxpdCgnXFxuJykubWFwKChsaW5lKSA9PiB7XG4gICAgICAgIHJldHVybiBkb2MuY3JlYXRlVGV4dE5vZGUobGluZSk7XG4gICAgfSk7XG4gICAgbGluZU5vZGVzLmZvckVhY2goKGxpbmVOb2RlLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGRvYy5jcmVhdGVFbGVtZW50KCdicicpKTtcbiAgICAgICAgfVxuICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGxpbmVOb2RlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZnJhZztcbn1cbmNsYXNzIExhYmVsVmlldyB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiRyKCkpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBjb25zdCBsYWJlbEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxhYmVsRWxlbS5jbGFzc0xpc3QuYWRkKGNuJHIoJ2wnKSk7XG4gICAgICAgIGJpbmRWYWx1ZU1hcChjb25maWcucHJvcHMsICdsYWJlbCcsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzRW1wdHkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY24kcih1bmRlZmluZWQsICdub2wnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbiRyKHVuZGVmaW5lZCwgJ25vbCcpKTtcbiAgICAgICAgICAgICAgICByZW1vdmVDaGlsZE5vZGVzKGxhYmVsRWxlbSk7XG4gICAgICAgICAgICAgICAgbGFiZWxFbGVtLmFwcGVuZENoaWxkKGNyZWF0ZUxhYmVsTm9kZShkb2MsIHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobGFiZWxFbGVtKTtcbiAgICAgICAgdGhpcy5sYWJlbEVsZW1lbnQgPSBsYWJlbEVsZW07XG4gICAgICAgIGNvbnN0IHZhbHVlRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdmFsdWVFbGVtLmNsYXNzTGlzdC5hZGQoY24kcigndicpKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHZhbHVlRWxlbSk7XG4gICAgICAgIHRoaXMudmFsdWVFbGVtZW50ID0gdmFsdWVFbGVtO1xuICAgIH1cbn1cblxuY2xhc3MgTGFiZWxDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLnByb3BzID0gY29uZmlnLnByb3BzO1xuICAgICAgICB0aGlzLnZhbHVlQ29udHJvbGxlciA9IGNvbmZpZy52YWx1ZUNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZhbHVlQ29udHJvbGxlci52aWV3UHJvcHM7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBMYWJlbFZpZXcoZG9jLCB7XG4gICAgICAgICAgICBwcm9wczogY29uZmlnLnByb3BzLFxuICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlldy52YWx1ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy52YWx1ZUNvbnRyb2xsZXIudmlldy5lbGVtZW50KTtcbiAgICB9XG4gICAgaW1wb3J0UHJvcHMoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIGltcG9ydEJsYWRlU3RhdGUoc3RhdGUsIG51bGwsIChwKSA9PiAoe1xuICAgICAgICAgICAgbGFiZWw6IHAub3B0aW9uYWwuc3RyaW5nLFxuICAgICAgICB9KSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZXQoJ2xhYmVsJywgcmVzdWx0LmxhYmVsKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZXhwb3J0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRCbGFkZVN0YXRlKG51bGwsIHtcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnByb3BzLmdldCgnbGFiZWwnKSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRBbGxCbGFkZVBvc2l0aW9ucygpIHtcbiAgICByZXR1cm4gWyd2ZXJ5Zmlyc3QnLCAnZmlyc3QnLCAnbGFzdCcsICd2ZXJ5bGFzdCddO1xufVxuXG5jb25zdCBjbiRxID0gQ2xhc3NOYW1lKCcnKTtcbmNvbnN0IFBPU19UT19DTEFTU19OQU1FX01BUCA9IHtcbiAgICB2ZXJ5Zmlyc3Q6ICd2ZnN0JyxcbiAgICBmaXJzdDogJ2ZzdCcsXG4gICAgbGFzdDogJ2xzdCcsXG4gICAgdmVyeWxhc3Q6ICd2bHN0Jyxcbn07XG5jbGFzcyBCbGFkZUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLnBhcmVudF8gPSBudWxsO1xuICAgICAgICB0aGlzLmJsYWRlID0gY29uZmlnLmJsYWRlO1xuICAgICAgICB0aGlzLnZpZXcgPSBjb25maWcudmlldztcbiAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICBjb25zdCBlbGVtID0gdGhpcy52aWV3LmVsZW1lbnQ7XG4gICAgICAgIHRoaXMuYmxhZGUudmFsdWUoJ3Bvc2l0aW9ucycpLmVtaXR0ZXIub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIGdldEFsbEJsYWRlUG9zaXRpb25zKCkuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKGNuJHEodW5kZWZpbmVkLCBQT1NfVE9fQ0xBU1NfTkFNRV9NQVBbcG9zXSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmJsYWRlLmdldCgncG9zaXRpb25zJykuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKGNuJHEodW5kZWZpbmVkLCBQT1NfVE9fQ0xBU1NfTkFNRV9NQVBbcG9zXSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZXdQcm9wcy5oYW5kbGVEaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIHJlbW92ZUVsZW1lbnQoZWxlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgcGFyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRfO1xuICAgIH1cbiAgICBzZXQgcGFyZW50KHBhcmVudCkge1xuICAgICAgICB0aGlzLnBhcmVudF8gPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMudmlld1Byb3BzLnNldCgncGFyZW50JywgdGhpcy5wYXJlbnRfID8gdGhpcy5wYXJlbnRfLnZpZXdQcm9wcyA6IG51bGwpO1xuICAgIH1cbiAgICBpbXBvcnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICByZXR1cm4gaW1wb3J0QmxhZGVTdGF0ZShzdGF0ZSwgbnVsbCwgKHApID0+ICh7XG4gICAgICAgICAgICBkaXNhYmxlZDogcC5yZXF1aXJlZC5ib29sZWFuLFxuICAgICAgICAgICAgaGlkZGVuOiBwLnJlcXVpcmVkLmJvb2xlYW4sXG4gICAgICAgIH0pLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdQcm9wcy5pbXBvcnRTdGF0ZShyZXN1bHQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBleHBvcnRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydEJsYWRlU3RhdGUobnVsbCwgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy52aWV3UHJvcHMuZXhwb3J0U3RhdGUoKSkpO1xuICAgIH1cbn1cblxuY2xhc3MgTGFiZWxlZFZhbHVlQmxhZGVDb250cm9sbGVyIGV4dGVuZHMgQmxhZGVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLnZhbHVlICE9PSBjb25maWcudmFsdWVDb250cm9sbGVyLnZhbHVlKSB7XG4gICAgICAgICAgICB0aHJvdyBUcEVycm9yLnNob3VsZE5ldmVySGFwcGVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgdmlld1Byb3BzID0gY29uZmlnLnZhbHVlQ29udHJvbGxlci52aWV3UHJvcHM7XG4gICAgICAgIGNvbnN0IGxjID0gbmV3IExhYmVsQ29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgIGJsYWRlOiBjb25maWcuYmxhZGUsXG4gICAgICAgICAgICBwcm9wczogY29uZmlnLnByb3BzLFxuICAgICAgICAgICAgdmFsdWVDb250cm9sbGVyOiBjb25maWcudmFsdWVDb250cm9sbGVyLFxuICAgICAgICB9KTtcbiAgICAgICAgc3VwZXIoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb25maWcpLCB7IHZpZXc6IG5ldyBMYWJlbFZpZXcoZG9jLCB7XG4gICAgICAgICAgICAgICAgcHJvcHM6IGNvbmZpZy5wcm9wcyxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pLCB2aWV3UHJvcHM6IHZpZXdQcm9wcyB9KSk7XG4gICAgICAgIHRoaXMubGFiZWxDb250cm9sbGVyID0gbGM7XG4gICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgIHRoaXMudmFsdWVDb250cm9sbGVyID0gY29uZmlnLnZhbHVlQ29udHJvbGxlcjtcbiAgICAgICAgdGhpcy52aWV3LnZhbHVlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnZhbHVlQ29udHJvbGxlci52aWV3LmVsZW1lbnQpO1xuICAgIH1cbiAgICBpbXBvcnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICByZXR1cm4gaW1wb3J0QmxhZGVTdGF0ZShzdGF0ZSwgKHMpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmltcG9ydFN0YXRlKHMpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbENvbnRyb2xsZXIuaW1wb3J0UHJvcHMocykgJiZcbiAgICAgICAgICAgICAgICAoKF9jID0gKF9iID0gKF9hID0gdGhpcy52YWx1ZUNvbnRyb2xsZXIpLmltcG9ydFByb3BzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgc3RhdGUpKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiB0cnVlKTtcbiAgICAgICAgfSwgKHApID0+ICh7XG4gICAgICAgICAgICB2YWx1ZTogcC5vcHRpb25hbC5yYXcsXG4gICAgICAgIH0pLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5yYXdWYWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZXhwb3J0U3RhdGUoKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICByZXR1cm4gZXhwb3J0QmxhZGVTdGF0ZSgoKSA9PiBzdXBlci5leHBvcnRTdGF0ZSgpLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oeyB2YWx1ZTogdGhpcy52YWx1ZS5yYXdWYWx1ZSB9LCB0aGlzLmxhYmVsQ29udHJvbGxlci5leHBvcnRQcm9wcygpKSwgKChfYyA9IChfYiA9IChfYSA9IHRoaXMudmFsdWVDb250cm9sbGVyKS5leHBvcnRQcm9wcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EpKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiB7fSkpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGV4Y2x1ZGVWYWx1ZShzdGF0ZSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgICBkZWxldGUgcmVzdWx0LnZhbHVlO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5jbGFzcyBCaW5kaW5nQ29udHJvbGxlciBleHRlbmRzIExhYmVsZWRWYWx1ZUJsYWRlQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgc3VwZXIoZG9jLCBjb25maWcpO1xuICAgICAgICB0aGlzLnRhZyA9IGNvbmZpZy50YWc7XG4gICAgfVxuICAgIGltcG9ydFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBpbXBvcnRCbGFkZVN0YXRlKHN0YXRlLFxuICAgICAgICAoX3MpID0+IHN1cGVyLmltcG9ydFN0YXRlKGV4Y2x1ZGVWYWx1ZShzdGF0ZSkpLCAocCkgPT4gKHtcbiAgICAgICAgICAgIHRhZzogcC5vcHRpb25hbC5zdHJpbmcsXG4gICAgICAgIH0pLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRhZyA9IHJlc3VsdC50YWc7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGV4cG9ydFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gZXhwb3J0QmxhZGVTdGF0ZSgoKSA9PiBleGNsdWRlVmFsdWUoc3VwZXIuZXhwb3J0U3RhdGUoKSksIHtcbiAgICAgICAgICAgIGJpbmRpbmc6IHtcbiAgICAgICAgICAgICAgICBrZXk6IHRoaXMudmFsdWUuYmluZGluZy50YXJnZXQua2V5LFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLmJpbmRpbmcudGFyZ2V0LnJlYWQoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWc6IHRoaXMudGFnLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBpc0JpbmRpbmdDb250cm9sbGVyKGJjKSB7XG4gICAgcmV0dXJuIGlzVmFsdWVCbGFkZUNvbnRyb2xsZXIoYmMpICYmIGlzQmluZGluZ1ZhbHVlKGJjLnZhbHVlKTtcbn1cblxuY2xhc3MgSW5wdXRCaW5kaW5nQ29udHJvbGxlciBleHRlbmRzIEJpbmRpbmdDb250cm9sbGVyIHtcbiAgICBpbXBvcnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICByZXR1cm4gaW1wb3J0QmxhZGVTdGF0ZShzdGF0ZSwgKHMpID0+IHN1cGVyLmltcG9ydFN0YXRlKHMpLCAocCkgPT4gKHtcbiAgICAgICAgICAgIGJpbmRpbmc6IHAucmVxdWlyZWQub2JqZWN0KHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogcC5yZXF1aXJlZC5yYXcsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSksIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUuYmluZGluZy5pbmplY3QocmVzdWx0LmJpbmRpbmcudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5mZXRjaCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGlzSW5wdXRCaW5kaW5nQ29udHJvbGxlcihiYykge1xuICAgIHJldHVybiBpc1ZhbHVlQmxhZGVDb250cm9sbGVyKGJjKSAmJiBpc0lucHV0QmluZGluZ1ZhbHVlKGJjLnZhbHVlKTtcbn1cblxuZnVuY3Rpb24gZmlsbEJ1ZmZlcihidWZmZXIsIGJ1ZmZlclNpemUpIHtcbiAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCA8IGJ1ZmZlclNpemUpIHtcbiAgICAgICAgYnVmZmVyLnB1c2godW5kZWZpbmVkKTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbml0aWFsaXplQnVmZmVyKGJ1ZmZlclNpemUpIHtcbiAgICBjb25zdCBidWZmZXIgPSBbXTtcbiAgICBmaWxsQnVmZmVyKGJ1ZmZlciwgYnVmZmVyU2l6ZSk7XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVRyaW1tZWRCdWZmZXIoYnVmZmVyKSB7XG4gICAgY29uc3QgaW5kZXggPSBidWZmZXIuaW5kZXhPZih1bmRlZmluZWQpO1xuICAgIHJldHVybiBmb3JjZUNhc3QoaW5kZXggPCAwID8gYnVmZmVyIDogYnVmZmVyLnNsaWNlKDAsIGluZGV4KSk7XG59XG5mdW5jdGlvbiBjcmVhdGVQdXNoZWRCdWZmZXIoYnVmZmVyLCBuZXdWYWx1ZSkge1xuICAgIGNvbnN0IG5ld0J1ZmZlciA9IFsuLi5jcmVhdGVUcmltbWVkQnVmZmVyKGJ1ZmZlciksIG5ld1ZhbHVlXTtcbiAgICBpZiAobmV3QnVmZmVyLmxlbmd0aCA+IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgbmV3QnVmZmVyLnNwbGljZSgwLCBuZXdCdWZmZXIubGVuZ3RoIC0gYnVmZmVyLmxlbmd0aCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmaWxsQnVmZmVyKG5ld0J1ZmZlciwgYnVmZmVyLmxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiBuZXdCdWZmZXI7XG59XG5cbmNsYXNzIE1vbml0b3JCaW5kaW5nVmFsdWUge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICB0aGlzLm9uVGlja18gPSB0aGlzLm9uVGlja18uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblZhbHVlQmVmb3JlQ2hhbmdlXyA9IHRoaXMub25WYWx1ZUJlZm9yZUNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlXyA9IHRoaXMub25WYWx1ZUNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5iaW5kaW5nID0gY29uZmlnLmJpbmRpbmc7XG4gICAgICAgIHRoaXMudmFsdWVfID0gY3JlYXRlVmFsdWUoaW5pdGlhbGl6ZUJ1ZmZlcihjb25maWcuYnVmZmVyU2l6ZSkpO1xuICAgICAgICB0aGlzLnZhbHVlXy5lbWl0dGVyLm9uKCdiZWZvcmVjaGFuZ2UnLCB0aGlzLm9uVmFsdWVCZWZvcmVDaGFuZ2VfKTtcbiAgICAgICAgdGhpcy52YWx1ZV8uZW1pdHRlci5vbignY2hhbmdlJywgdGhpcy5vblZhbHVlQ2hhbmdlXyk7XG4gICAgICAgIHRoaXMudGlja2VyID0gY29uZmlnLnRpY2tlcjtcbiAgICAgICAgdGhpcy50aWNrZXIuZW1pdHRlci5vbigndGljaycsIHRoaXMub25UaWNrXyk7XG4gICAgICAgIHRoaXMuZmV0Y2goKTtcbiAgICB9XG4gICAgZ2V0IHJhd1ZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZV8ucmF3VmFsdWU7XG4gICAgfVxuICAgIHNldCByYXdWYWx1ZShyYXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlXy5yYXdWYWx1ZSA9IHJhd1ZhbHVlO1xuICAgIH1cbiAgICBzZXRSYXdWYWx1ZShyYXdWYWx1ZSwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnZhbHVlXy5zZXRSYXdWYWx1ZShyYXdWYWx1ZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGZldGNoKCkge1xuICAgICAgICB0aGlzLnZhbHVlXy5yYXdWYWx1ZSA9IGNyZWF0ZVB1c2hlZEJ1ZmZlcih0aGlzLnZhbHVlXy5yYXdWYWx1ZSwgdGhpcy5iaW5kaW5nLnJlYWQoKSk7XG4gICAgfVxuICAgIG9uVGlja18oKSB7XG4gICAgICAgIHRoaXMuZmV0Y2goKTtcbiAgICB9XG4gICAgb25WYWx1ZUJlZm9yZUNoYW5nZV8oZXYpIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2JlZm9yZWNoYW5nZScsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZXYpLCB7IHNlbmRlcjogdGhpcyB9KSk7XG4gICAgfVxuICAgIG9uVmFsdWVDaGFuZ2VfKGV2KSB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdjaGFuZ2UnLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGV2KSwgeyBzZW5kZXI6IHRoaXMgfSkpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGlzTW9uaXRvckJpbmRpbmdWYWx1ZSh2KSB7XG4gICAgaWYgKCEoJ2JpbmRpbmcnIGluIHYpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgYiA9IHZbJ2JpbmRpbmcnXTtcbiAgICByZXR1cm4gaXNCaW5kaW5nKGIpICYmICdyZWFkJyBpbiBiICYmICEoJ3dyaXRlJyBpbiBiKTtcbn1cblxuY2xhc3MgTW9uaXRvckJpbmRpbmdDb250cm9sbGVyIGV4dGVuZHMgQmluZGluZ0NvbnRyb2xsZXIge1xuICAgIGV4cG9ydFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gZXhwb3J0QmxhZGVTdGF0ZSgoKSA9PiBzdXBlci5leHBvcnRTdGF0ZSgpLCB7XG4gICAgICAgICAgICBiaW5kaW5nOiB7XG4gICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBpc01vbml0b3JCaW5kaW5nQ29udHJvbGxlcihiYykge1xuICAgIHJldHVybiAoaXNWYWx1ZUJsYWRlQ29udHJvbGxlcihiYykgJiZcbiAgICAgICAgaXNNb25pdG9yQmluZGluZ1ZhbHVlKGJjLnZhbHVlKSk7XG59XG5cbmNsYXNzIEJ1dHRvbkFwaSBleHRlbmRzIEJsYWRlQXBpIHtcbiAgICBnZXQgbGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIubGFiZWxDb250cm9sbGVyLnByb3BzLmdldCgnbGFiZWwnKTtcbiAgICB9XG4gICAgc2V0IGxhYmVsKGxhYmVsKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci5sYWJlbENvbnRyb2xsZXIucHJvcHMuc2V0KCdsYWJlbCcsIGxhYmVsKTtcbiAgICB9XG4gICAgZ2V0IHRpdGxlKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLmNvbnRyb2xsZXIuYnV0dG9uQ29udHJvbGxlci5wcm9wcy5nZXQoJ3RpdGxlJykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnO1xuICAgIH1cbiAgICBzZXQgdGl0bGUodGl0bGUpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLmJ1dHRvbkNvbnRyb2xsZXIucHJvcHMuc2V0KCd0aXRsZScsIHRpdGxlKTtcbiAgICB9XG4gICAgb24oZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IGJoID0gaGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICBjb25zdCBlbWl0dGVyID0gdGhpcy5jb250cm9sbGVyLmJ1dHRvbkNvbnRyb2xsZXIuZW1pdHRlcjtcbiAgICAgICAgZW1pdHRlci5vbihldmVudE5hbWUsIChldikgPT4ge1xuICAgICAgICAgICAgYmgobmV3IFRwTW91c2VFdmVudCh0aGlzLCBldi5uYXRpdmVFdmVudCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG9mZihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgY29uc3QgZW1pdHRlciA9IHRoaXMuY29udHJvbGxlci5idXR0b25Db250cm9sbGVyLmVtaXR0ZXI7XG4gICAgICAgIGVtaXR0ZXIub2ZmKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlDbGFzcyhlbGVtLCBjbGFzc05hbWUsIGFjdGl2ZSkge1xuICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG59XG5mdW5jdGlvbiB2YWx1ZVRvQ2xhc3NOYW1lKGVsZW0sIGNsYXNzTmFtZSkge1xuICAgIHJldHVybiAodmFsdWUpID0+IHtcbiAgICAgICAgYXBwbHlDbGFzcyhlbGVtLCBjbGFzc05hbWUsIHZhbHVlKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gYmluZFZhbHVlVG9UZXh0Q29udGVudCh2YWx1ZSwgZWxlbSkge1xuICAgIGJpbmRWYWx1ZSh2YWx1ZSwgKHRleHQpID0+IHtcbiAgICAgICAgZWxlbS50ZXh0Q29udGVudCA9IHRleHQgIT09IG51bGwgJiYgdGV4dCAhPT0gdm9pZCAwID8gdGV4dCA6ICcnO1xuICAgIH0pO1xufVxuXG5jb25zdCBjbiRwID0gQ2xhc3NOYW1lKCdidG4nKTtcbmNsYXNzIEJ1dHRvblZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY24kcCgpKTtcbiAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgY29uc3QgYnV0dG9uRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uRWxlbS5jbGFzc0xpc3QuYWRkKGNuJHAoJ2InKSk7XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZERpc2FibGVkKGJ1dHRvbkVsZW0pO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uRWxlbSk7XG4gICAgICAgIHRoaXMuYnV0dG9uRWxlbWVudCA9IGJ1dHRvbkVsZW07XG4gICAgICAgIGNvbnN0IHRpdGxlRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGl0bGVFbGVtLmNsYXNzTGlzdC5hZGQoY24kcCgndCcpKTtcbiAgICAgICAgYmluZFZhbHVlVG9UZXh0Q29udGVudChjb25maWcucHJvcHMudmFsdWUoJ3RpdGxlJyksIHRpdGxlRWxlbSk7XG4gICAgICAgIHRoaXMuYnV0dG9uRWxlbWVudC5hcHBlbmRDaGlsZCh0aXRsZUVsZW0pO1xuICAgIH1cbn1cblxuY2xhc3MgQnV0dG9uQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5vbkNsaWNrXyA9IHRoaXMub25DbGlja18uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wcm9wcyA9IGNvbmZpZy5wcm9wcztcbiAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgQnV0dG9uVmlldyhkb2MsIHtcbiAgICAgICAgICAgIHByb3BzOiB0aGlzLnByb3BzLFxuICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlldy5idXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrXyk7XG4gICAgfVxuICAgIGltcG9ydFByb3BzKHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBpbXBvcnRCbGFkZVN0YXRlKHN0YXRlLCBudWxsLCAocCkgPT4gKHtcbiAgICAgICAgICAgIHRpdGxlOiBwLm9wdGlvbmFsLnN0cmluZyxcbiAgICAgICAgfSksIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2V0KCd0aXRsZScsIHJlc3VsdC50aXRsZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGV4cG9ydFByb3BzKCkge1xuICAgICAgICByZXR1cm4gZXhwb3J0QmxhZGVTdGF0ZShudWxsLCB7XG4gICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy5nZXQoJ3RpdGxlJyksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkNsaWNrXyhldikge1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnY2xpY2snLCB7XG4gICAgICAgICAgICBuYXRpdmVFdmVudDogZXYsXG4gICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY2xhc3MgQnV0dG9uQmxhZGVDb250cm9sbGVyIGV4dGVuZHMgQmxhZGVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICBjb25zdCBiYyA9IG5ldyBCdXR0b25Db250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgcHJvcHM6IGNvbmZpZy5idXR0b25Qcm9wcyxcbiAgICAgICAgICAgIHZpZXdQcm9wczogY29uZmlnLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGxjID0gbmV3IExhYmVsQ29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgIGJsYWRlOiBjb25maWcuYmxhZGUsXG4gICAgICAgICAgICBwcm9wczogY29uZmlnLmxhYmVsUHJvcHMsXG4gICAgICAgICAgICB2YWx1ZUNvbnRyb2xsZXI6IGJjLFxuICAgICAgICB9KTtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgYmxhZGU6IGNvbmZpZy5ibGFkZSxcbiAgICAgICAgICAgIHZpZXc6IGxjLnZpZXcsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJ1dHRvbkNvbnRyb2xsZXIgPSBiYztcbiAgICAgICAgdGhpcy5sYWJlbENvbnRyb2xsZXIgPSBsYztcbiAgICB9XG4gICAgaW1wb3J0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIGltcG9ydEJsYWRlU3RhdGUoc3RhdGUsIChzKSA9PiBzdXBlci5pbXBvcnRTdGF0ZShzKSAmJlxuICAgICAgICAgICAgdGhpcy5idXR0b25Db250cm9sbGVyLmltcG9ydFByb3BzKHMpICYmXG4gICAgICAgICAgICB0aGlzLmxhYmVsQ29udHJvbGxlci5pbXBvcnRQcm9wcyhzKSwgKCkgPT4gKHt9KSwgKCkgPT4gdHJ1ZSk7XG4gICAgfVxuICAgIGV4cG9ydFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gZXhwb3J0QmxhZGVTdGF0ZSgoKSA9PiBzdXBlci5leHBvcnRTdGF0ZSgpLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnV0dG9uQ29udHJvbGxlci5leHBvcnRQcm9wcygpKSwgdGhpcy5sYWJlbENvbnRyb2xsZXIuZXhwb3J0UHJvcHMoKSkpO1xuICAgIH1cbn1cblxuY2xhc3MgU2VtdmVyIHtcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0KSB7XG4gICAgICAgIGNvbnN0IFtjb3JlLCBwcmVyZWxlYXNlXSA9IHRleHQuc3BsaXQoJy0nKTtcbiAgICAgICAgY29uc3QgY29yZUNvbXBzID0gY29yZS5zcGxpdCgnLicpO1xuICAgICAgICB0aGlzLm1ham9yID0gcGFyc2VJbnQoY29yZUNvbXBzWzBdLCAxMCk7XG4gICAgICAgIHRoaXMubWlub3IgPSBwYXJzZUludChjb3JlQ29tcHNbMV0sIDEwKTtcbiAgICAgICAgdGhpcy5wYXRjaCA9IHBhcnNlSW50KGNvcmVDb21wc1syXSwgMTApO1xuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBwcmVyZWxlYXNlICE9PSBudWxsICYmIHByZXJlbGVhc2UgIT09IHZvaWQgMCA/IHByZXJlbGVhc2UgOiBudWxsO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgY29uc3QgY29yZSA9IFt0aGlzLm1ham9yLCB0aGlzLm1pbm9yLCB0aGlzLnBhdGNoXS5qb2luKCcuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnByZXJlbGVhc2UgIT09IG51bGwgPyBbY29yZSwgdGhpcy5wcmVyZWxlYXNlXS5qb2luKCctJykgOiBjb3JlO1xuICAgIH1cbn1cblxuY29uc3QgVkVSU0lPTiQxID0gbmV3IFNlbXZlcignMi4wLjUnKTtcblxuZnVuY3Rpb24gY3JlYXRlUGx1Z2luKHBsdWdpbikge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgY29yZTogVkVSU0lPTiQxIH0sIHBsdWdpbik7XG59XG5cbmNvbnN0IEJ1dHRvbkJsYWRlUGx1Z2luID0gY3JlYXRlUGx1Z2luKHtcbiAgICBpZDogJ2J1dHRvbicsXG4gICAgdHlwZTogJ2JsYWRlJyxcbiAgICBhY2NlcHQocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUmVjb3JkKHBhcmFtcywgKHApID0+ICh7XG4gICAgICAgICAgICB0aXRsZTogcC5yZXF1aXJlZC5zdHJpbmcsXG4gICAgICAgICAgICB2aWV3OiBwLnJlcXVpcmVkLmNvbnN0YW50KCdidXR0b24nKSxcbiAgICAgICAgICAgIGxhYmVsOiBwLm9wdGlvbmFsLnN0cmluZyxcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0ID8geyBwYXJhbXM6IHJlc3VsdCB9IDogbnVsbDtcbiAgICB9LFxuICAgIGNvbnRyb2xsZXIoYXJncykge1xuICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbkJsYWRlQ29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICBibGFkZTogYXJncy5ibGFkZSxcbiAgICAgICAgICAgIGJ1dHRvblByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogYXJncy5wYXJhbXMudGl0bGUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGxhYmVsUHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBhcmdzLnBhcmFtcy5sYWJlbCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBhcGkoYXJncykge1xuICAgICAgICBpZiAoYXJncy5jb250cm9sbGVyIGluc3RhbmNlb2YgQnV0dG9uQmxhZGVDb250cm9sbGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbkFwaShhcmdzLmNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG59KTtcblxuZnVuY3Rpb24gYWRkQnV0dG9uQXNCbGFkZShhcGksIHBhcmFtcykge1xuICAgIHJldHVybiBhcGkuYWRkQmxhZGUoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCB7IHZpZXc6ICdidXR0b24nIH0pKTtcbn1cbmZ1bmN0aW9uIGFkZEZvbGRlckFzQmxhZGUoYXBpLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gYXBpLmFkZEJsYWRlKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zKSwgeyB2aWV3OiAnZm9sZGVyJyB9KSk7XG59XG5mdW5jdGlvbiBhZGRUYWJBc0JsYWRlKGFwaSwgcGFyYW1zKSB7XG4gICAgcmV0dXJuIGFwaS5hZGRCbGFkZShPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcyksIHsgdmlldzogJ3RhYicgfSkpO1xufVxuXG5mdW5jdGlvbiBpc1JlZnJlc2hhYmxlKHZhbHVlKSB7XG4gICAgaWYgKCFpc09iamVjdCQxKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAncmVmcmVzaCcgaW4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnJlZnJlc2ggPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJpbmRpbmdUYXJnZXQob2JqLCBrZXkpIHtcbiAgICBpZiAoIUJpbmRpbmdUYXJnZXQuaXNCaW5kYWJsZShvYmopKSB7XG4gICAgICAgIHRocm93IFRwRXJyb3Iubm90QmluZGFibGUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nVGFyZ2V0KG9iaiwga2V5KTtcbn1cbmNsYXNzIFJhY2tBcGkge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXIsIHBvb2wpIHtcbiAgICAgICAgdGhpcy5vblJhY2tWYWx1ZUNoYW5nZV8gPSB0aGlzLm9uUmFja1ZhbHVlQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfID0gY29udHJvbGxlcjtcbiAgICAgICAgdGhpcy5lbWl0dGVyXyA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMucG9vbF8gPSBwb29sO1xuICAgICAgICBjb25zdCByYWNrID0gdGhpcy5jb250cm9sbGVyXy5yYWNrO1xuICAgICAgICByYWNrLmVtaXR0ZXIub24oJ3ZhbHVlY2hhbmdlJywgdGhpcy5vblJhY2tWYWx1ZUNoYW5nZV8pO1xuICAgIH1cbiAgICBnZXQgY2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXJfLnJhY2suY2hpbGRyZW4ubWFwKChiYykgPT4gdGhpcy5wb29sXy5jcmVhdGVBcGkoYmMpKTtcbiAgICB9XG4gICAgYWRkQmluZGluZyhvYmplY3QsIGtleSwgb3B0X3BhcmFtcykge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBvcHRfcGFyYW1zICE9PSBudWxsICYmIG9wdF9wYXJhbXMgIT09IHZvaWQgMCA/IG9wdF9wYXJhbXMgOiB7fTtcbiAgICAgICAgY29uc3QgZG9jID0gdGhpcy5jb250cm9sbGVyXy5lbGVtZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgICAgIGNvbnN0IGJjID0gdGhpcy5wb29sXy5jcmVhdGVCaW5kaW5nKGRvYywgY3JlYXRlQmluZGluZ1RhcmdldChvYmplY3QsIGtleSksIHBhcmFtcyk7XG4gICAgICAgIGNvbnN0IGFwaSA9IHRoaXMucG9vbF8uY3JlYXRlQmluZGluZ0FwaShiYyk7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZChhcGksIHBhcmFtcy5pbmRleCk7XG4gICAgfVxuICAgIGFkZEZvbGRlcihwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIGFkZEZvbGRlckFzQmxhZGUodGhpcywgcGFyYW1zKTtcbiAgICB9XG4gICAgYWRkQnV0dG9uKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gYWRkQnV0dG9uQXNCbGFkZSh0aGlzLCBwYXJhbXMpO1xuICAgIH1cbiAgICBhZGRUYWIocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBhZGRUYWJBc0JsYWRlKHRoaXMsIHBhcmFtcyk7XG4gICAgfVxuICAgIGFkZChhcGksIG9wdF9pbmRleCkge1xuICAgICAgICBjb25zdCBiYyA9IGFwaS5jb250cm9sbGVyO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJfLnJhY2suYWRkKGJjLCBvcHRfaW5kZXgpO1xuICAgICAgICByZXR1cm4gYXBpO1xuICAgIH1cbiAgICByZW1vdmUoYXBpKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlcl8ucmFjay5yZW1vdmUoYXBpLmNvbnRyb2xsZXIpO1xuICAgIH1cbiAgICBhZGRCbGFkZShwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgZG9jID0gdGhpcy5jb250cm9sbGVyXy5lbGVtZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgICAgIGNvbnN0IGJjID0gdGhpcy5wb29sXy5jcmVhdGVCbGFkZShkb2MsIHBhcmFtcyk7XG4gICAgICAgIGNvbnN0IGFwaSA9IHRoaXMucG9vbF8uY3JlYXRlQXBpKGJjKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGFwaSwgcGFyYW1zLmluZGV4KTtcbiAgICB9XG4gICAgb24oZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IGJoID0gaGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVtaXR0ZXJfLm9uKGV2ZW50TmFtZSwgKGV2KSA9PiB7XG4gICAgICAgICAgICBiaChldik7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogaGFuZGxlcixcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvZmYoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuZW1pdHRlcl8ub2ZmKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgICAgIGlmIChpc1JlZnJlc2hhYmxlKGMpKSB7XG4gICAgICAgICAgICAgICAgYy5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblJhY2tWYWx1ZUNoYW5nZV8oZXYpIHtcbiAgICAgICAgY29uc3QgYmMgPSBldi5ibGFkZUNvbnRyb2xsZXI7XG4gICAgICAgIGNvbnN0IGFwaSA9IHRoaXMucG9vbF8uY3JlYXRlQXBpKGJjKTtcbiAgICAgICAgY29uc3QgYmluZGluZyA9IGlzQmluZGluZ1ZhbHVlKGJjLnZhbHVlKSA/IGJjLnZhbHVlLmJpbmRpbmcgOiBudWxsO1xuICAgICAgICB0aGlzLmVtaXR0ZXJfLmVtaXQoJ2NoYW5nZScsIG5ldyBUcENoYW5nZUV2ZW50KGFwaSwgYmluZGluZyA/IGJpbmRpbmcudGFyZ2V0LnJlYWQoKSA6IGJjLnZhbHVlLnJhd1ZhbHVlLCBldi5vcHRpb25zLmxhc3QpKTtcbiAgICB9XG59XG5cbmNsYXNzIENvbnRhaW5lckJsYWRlQXBpIGV4dGVuZHMgQmxhZGVBcGkge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXIsIHBvb2wpIHtcbiAgICAgICAgc3VwZXIoY29udHJvbGxlcik7XG4gICAgICAgIHRoaXMucmFja0FwaV8gPSBuZXcgUmFja0FwaShjb250cm9sbGVyLnJhY2tDb250cm9sbGVyLCBwb29sKTtcbiAgICB9XG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5yYWNrQXBpXy5yZWZyZXNoKCk7XG4gICAgfVxufVxuXG5jbGFzcyBDb250YWluZXJCbGFkZUNvbnRyb2xsZXIgZXh0ZW5kcyBCbGFkZUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBibGFkZTogY29uZmlnLmJsYWRlLFxuICAgICAgICAgICAgdmlldzogY29uZmlnLnZpZXcsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy5yYWNrQ29udHJvbGxlci52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJhY2tDb250cm9sbGVyID0gY29uZmlnLnJhY2tDb250cm9sbGVyO1xuICAgIH1cbiAgICBpbXBvcnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICByZXR1cm4gaW1wb3J0QmxhZGVTdGF0ZShzdGF0ZSwgKHMpID0+IHN1cGVyLmltcG9ydFN0YXRlKHMpLCAocCkgPT4gKHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBwLnJlcXVpcmVkLmFycmF5KHAucmVxdWlyZWQucmF3KSxcbiAgICAgICAgfSksIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhY2tDb250cm9sbGVyLnJhY2suY2hpbGRyZW4uZXZlcnkoKGMsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMuaW1wb3J0U3RhdGUocmVzdWx0LmNoaWxkcmVuW2luZGV4XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGV4cG9ydFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gZXhwb3J0QmxhZGVTdGF0ZSgoKSA9PiBzdXBlci5leHBvcnRTdGF0ZSgpLCB7XG4gICAgICAgICAgICBjaGlsZHJlbjogdGhpcy5yYWNrQ29udHJvbGxlci5yYWNrLmNoaWxkcmVuLm1hcCgoYykgPT4gYy5leHBvcnRTdGF0ZSgpKSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaXNDb250YWluZXJCbGFkZUNvbnRyb2xsZXIoYmMpIHtcbiAgICByZXR1cm4gJ3JhY2tDb250cm9sbGVyJyBpbiBiYztcbn1cblxuY2xhc3MgTmVzdGVkT3JkZXJlZFNldCB7XG4gICAgY29uc3RydWN0b3IoZXh0cmFjdCkge1xuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICB0aGlzLml0ZW1zXyA9IFtdO1xuICAgICAgICB0aGlzLmNhY2hlXyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5vblN1Ykxpc3RBZGRfID0gdGhpcy5vblN1Ykxpc3RBZGRfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25TdWJMaXN0UmVtb3ZlXyA9IHRoaXMub25TdWJMaXN0UmVtb3ZlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmV4dHJhY3RfID0gZXh0cmFjdDtcbiAgICB9XG4gICAgZ2V0IGl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc187XG4gICAgfVxuICAgIGFsbEl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmNhY2hlXyk7XG4gICAgfVxuICAgIGZpbmQoY2FsbGJhY2spIHtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuYWxsSXRlbXMoKSkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGluY2x1ZGVzKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVfLmhhcyhpdGVtKTtcbiAgICB9XG4gICAgYWRkKGl0ZW0sIG9wdF9pbmRleCkge1xuICAgICAgICBpZiAodGhpcy5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5zaG91bGROZXZlckhhcHBlbigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gb3B0X2luZGV4ICE9PSB1bmRlZmluZWQgPyBvcHRfaW5kZXggOiB0aGlzLml0ZW1zXy5sZW5ndGg7XG4gICAgICAgIHRoaXMuaXRlbXNfLnNwbGljZShpbmRleCwgMCwgaXRlbSk7XG4gICAgICAgIHRoaXMuY2FjaGVfLmFkZChpdGVtKTtcbiAgICAgICAgY29uc3Qgc3ViTGlzdCA9IHRoaXMuZXh0cmFjdF8oaXRlbSk7XG4gICAgICAgIGlmIChzdWJMaXN0KSB7XG4gICAgICAgICAgICBzdWJMaXN0LmVtaXR0ZXIub24oJ2FkZCcsIHRoaXMub25TdWJMaXN0QWRkXyk7XG4gICAgICAgICAgICBzdWJMaXN0LmVtaXR0ZXIub24oJ3JlbW92ZScsIHRoaXMub25TdWJMaXN0UmVtb3ZlXyk7XG4gICAgICAgICAgICBzdWJMaXN0LmFsbEl0ZW1zKCkuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfLmFkZChpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdhZGQnLCB7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgcm9vdDogdGhpcyxcbiAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbW92ZShpdGVtKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pdGVtc18uaW5kZXhPZihpdGVtKTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXRlbXNfLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuY2FjaGVfLmRlbGV0ZShpdGVtKTtcbiAgICAgICAgY29uc3Qgc3ViTGlzdCA9IHRoaXMuZXh0cmFjdF8oaXRlbSk7XG4gICAgICAgIGlmIChzdWJMaXN0KSB7XG4gICAgICAgICAgICBzdWJMaXN0LmFsbEl0ZW1zKCkuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVfLmRlbGV0ZShpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3ViTGlzdC5lbWl0dGVyLm9mZignYWRkJywgdGhpcy5vblN1Ykxpc3RBZGRfKTtcbiAgICAgICAgICAgIHN1Ykxpc3QuZW1pdHRlci5vZmYoJ3JlbW92ZScsIHRoaXMub25TdWJMaXN0UmVtb3ZlXyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3JlbW92ZScsIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICByb290OiB0aGlzLFxuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25TdWJMaXN0QWRkXyhldikge1xuICAgICAgICB0aGlzLmNhY2hlXy5hZGQoZXYuaXRlbSk7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdhZGQnLCB7XG4gICAgICAgICAgICBpbmRleDogZXYuaW5kZXgsXG4gICAgICAgICAgICBpdGVtOiBldi5pdGVtLFxuICAgICAgICAgICAgcm9vdDogdGhpcyxcbiAgICAgICAgICAgIHRhcmdldDogZXYudGFyZ2V0LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25TdWJMaXN0UmVtb3ZlXyhldikge1xuICAgICAgICB0aGlzLmNhY2hlXy5kZWxldGUoZXYuaXRlbSk7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdyZW1vdmUnLCB7XG4gICAgICAgICAgICBpbmRleDogZXYuaW5kZXgsXG4gICAgICAgICAgICBpdGVtOiBldi5pdGVtLFxuICAgICAgICAgICAgcm9vdDogdGhpcyxcbiAgICAgICAgICAgIHRhcmdldDogZXYudGFyZ2V0LFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRWYWx1ZUJsYWRlQ29udHJvbGxlcihiY3MsIHYpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJjcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBiYyA9IGJjc1tpXTtcbiAgICAgICAgaWYgKGlzVmFsdWVCbGFkZUNvbnRyb2xsZXIoYmMpICYmIGJjLnZhbHVlID09PSB2KSB7XG4gICAgICAgICAgICByZXR1cm4gYmM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBmaW5kU3ViQmxhZGVDb250cm9sbGVyU2V0KGJjKSB7XG4gICAgcmV0dXJuIGlzQ29udGFpbmVyQmxhZGVDb250cm9sbGVyKGJjKVxuICAgICAgICA/IGJjLnJhY2tDb250cm9sbGVyLnJhY2tbJ2JjU2V0XyddXG4gICAgICAgIDogbnVsbDtcbn1cbmNsYXNzIFJhY2sge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICB0aGlzLm9uQmxhZGVQb3NpdGlvbnNDaGFuZ2VfID0gdGhpcy5vbkJsYWRlUG9zaXRpb25zQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uU2V0QWRkXyA9IHRoaXMub25TZXRBZGRfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25TZXRSZW1vdmVfID0gdGhpcy5vblNldFJlbW92ZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkNoaWxkRGlzcG9zZV8gPSB0aGlzLm9uQ2hpbGREaXNwb3NlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2hpbGRQb3NpdGlvbnNDaGFuZ2VfID0gdGhpcy5vbkNoaWxkUG9zaXRpb25zQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2hpbGRWYWx1ZUNoYW5nZV8gPSB0aGlzLm9uQ2hpbGRWYWx1ZUNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkNoaWxkVmlld1Byb3BzQ2hhbmdlXyA9IHRoaXMub25DaGlsZFZpZXdQcm9wc0NoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblJhY2tMYXlvdXRfID0gdGhpcy5vblJhY2tMYXlvdXRfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25SYWNrVmFsdWVDaGFuZ2VfID0gdGhpcy5vblJhY2tWYWx1ZUNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5ibGFkZV8gPSAoX2EgPSBjb25maWcuYmxhZGUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IG51bGw7XG4gICAgICAgIChfYiA9IHRoaXMuYmxhZGVfKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudmFsdWUoJ3Bvc2l0aW9ucycpLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25CbGFkZVBvc2l0aW9uc0NoYW5nZV8pO1xuICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgIHRoaXMuYmNTZXRfID0gbmV3IE5lc3RlZE9yZGVyZWRTZXQoZmluZFN1YkJsYWRlQ29udHJvbGxlclNldCk7XG4gICAgICAgIHRoaXMuYmNTZXRfLmVtaXR0ZXIub24oJ2FkZCcsIHRoaXMub25TZXRBZGRfKTtcbiAgICAgICAgdGhpcy5iY1NldF8uZW1pdHRlci5vbigncmVtb3ZlJywgdGhpcy5vblNldFJlbW92ZV8pO1xuICAgIH1cbiAgICBnZXQgY2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJjU2V0Xy5pdGVtcztcbiAgICB9XG4gICAgYWRkKGJjLCBvcHRfaW5kZXgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoX2EgPSBiYy5wYXJlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmUoYmMpO1xuICAgICAgICBiYy5wYXJlbnQgPSB0aGlzO1xuICAgICAgICB0aGlzLmJjU2V0Xy5hZGQoYmMsIG9wdF9pbmRleCk7XG4gICAgfVxuICAgIHJlbW92ZShiYykge1xuICAgICAgICBiYy5wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmJjU2V0Xy5yZW1vdmUoYmMpO1xuICAgIH1cbiAgICBmaW5kKGZpbmRlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5iY1NldF8uYWxsSXRlbXMoKS5maWx0ZXIoZmluZGVyKTtcbiAgICB9XG4gICAgb25TZXRBZGRfKGV2KSB7XG4gICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb25zXygpO1xuICAgICAgICBjb25zdCByb290ID0gZXYudGFyZ2V0ID09PSBldi5yb290O1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnYWRkJywge1xuICAgICAgICAgICAgYmxhZGVDb250cm9sbGVyOiBldi5pdGVtLFxuICAgICAgICAgICAgaW5kZXg6IGV2LmluZGV4LFxuICAgICAgICAgICAgcm9vdDogcm9vdCxcbiAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcm9vdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJjID0gZXYuaXRlbTtcbiAgICAgICAgYmMudmlld1Byb3BzLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25DaGlsZFZpZXdQcm9wc0NoYW5nZV8pO1xuICAgICAgICBiYy5ibGFkZVxuICAgICAgICAgICAgLnZhbHVlKCdwb3NpdGlvbnMnKVxuICAgICAgICAgICAgLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25DaGlsZFBvc2l0aW9uc0NoYW5nZV8pO1xuICAgICAgICBiYy52aWV3UHJvcHMuaGFuZGxlRGlzcG9zZSh0aGlzLm9uQ2hpbGREaXNwb3NlXyk7XG4gICAgICAgIGlmIChpc1ZhbHVlQmxhZGVDb250cm9sbGVyKGJjKSkge1xuICAgICAgICAgICAgYmMudmFsdWUuZW1pdHRlci5vbignY2hhbmdlJywgdGhpcy5vbkNoaWxkVmFsdWVDaGFuZ2VfKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0NvbnRhaW5lckJsYWRlQ29udHJvbGxlcihiYykpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhY2sgPSBiYy5yYWNrQ29udHJvbGxlci5yYWNrO1xuICAgICAgICAgICAgaWYgKHJhY2spIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gcmFjay5lbWl0dGVyO1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIub24oJ2xheW91dCcsIHRoaXMub25SYWNrTGF5b3V0Xyk7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5vbigndmFsdWVjaGFuZ2UnLCB0aGlzLm9uUmFja1ZhbHVlQ2hhbmdlXyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25TZXRSZW1vdmVfKGV2KSB7XG4gICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb25zXygpO1xuICAgICAgICBjb25zdCByb290ID0gZXYudGFyZ2V0ID09PSBldi5yb290O1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgncmVtb3ZlJywge1xuICAgICAgICAgICAgYmxhZGVDb250cm9sbGVyOiBldi5pdGVtLFxuICAgICAgICAgICAgcm9vdDogcm9vdCxcbiAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcm9vdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJjID0gZXYuaXRlbTtcbiAgICAgICAgaWYgKGlzVmFsdWVCbGFkZUNvbnRyb2xsZXIoYmMpKSB7XG4gICAgICAgICAgICBiYy52YWx1ZS5lbWl0dGVyLm9mZignY2hhbmdlJywgdGhpcy5vbkNoaWxkVmFsdWVDaGFuZ2VfKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0NvbnRhaW5lckJsYWRlQ29udHJvbGxlcihiYykpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhY2sgPSBiYy5yYWNrQ29udHJvbGxlci5yYWNrO1xuICAgICAgICAgICAgaWYgKHJhY2spIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gcmFjay5lbWl0dGVyO1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKCdsYXlvdXQnLCB0aGlzLm9uUmFja0xheW91dF8pO1xuICAgICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKCd2YWx1ZWNoYW5nZScsIHRoaXMub25SYWNrVmFsdWVDaGFuZ2VfKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVQb3NpdGlvbnNfKCkge1xuICAgICAgICBjb25zdCB2aXNpYmxlSXRlbXMgPSB0aGlzLmJjU2V0Xy5pdGVtcy5maWx0ZXIoKGJjKSA9PiAhYmMudmlld1Byb3BzLmdldCgnaGlkZGVuJykpO1xuICAgICAgICBjb25zdCBmaXJzdFZpc2libGVJdGVtID0gdmlzaWJsZUl0ZW1zWzBdO1xuICAgICAgICBjb25zdCBsYXN0VmlzaWJsZUl0ZW0gPSB2aXNpYmxlSXRlbXNbdmlzaWJsZUl0ZW1zLmxlbmd0aCAtIDFdO1xuICAgICAgICB0aGlzLmJjU2V0Xy5pdGVtcy5mb3JFYWNoKChiYykgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHMgPSBbXTtcbiAgICAgICAgICAgIGlmIChiYyA9PT0gZmlyc3RWaXNpYmxlSXRlbSkge1xuICAgICAgICAgICAgICAgIHBzLnB1c2goJ2ZpcnN0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmJsYWRlXyB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJsYWRlXy5nZXQoJ3Bvc2l0aW9ucycpLmluY2x1ZGVzKCd2ZXJ5Zmlyc3QnKSkge1xuICAgICAgICAgICAgICAgICAgICBwcy5wdXNoKCd2ZXJ5Zmlyc3QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmMgPT09IGxhc3RWaXNpYmxlSXRlbSkge1xuICAgICAgICAgICAgICAgIHBzLnB1c2goJ2xhc3QnKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYmxhZGVfIHx8IHRoaXMuYmxhZGVfLmdldCgncG9zaXRpb25zJykuaW5jbHVkZXMoJ3ZlcnlsYXN0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgcHMucHVzaCgndmVyeWxhc3QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiYy5ibGFkZS5zZXQoJ3Bvc2l0aW9ucycsIHBzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uQ2hpbGRQb3NpdGlvbnNDaGFuZ2VfKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uc18oKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2xheW91dCcsIHtcbiAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uQ2hpbGRWaWV3UHJvcHNDaGFuZ2VfKF9ldikge1xuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uc18oKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2xheW91dCcsIHtcbiAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uQ2hpbGREaXNwb3NlXygpIHtcbiAgICAgICAgY29uc3QgZGlzcG9zZWRVY3MgPSB0aGlzLmJjU2V0Xy5pdGVtcy5maWx0ZXIoKGJjKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYmMudmlld1Byb3BzLmdldCgnZGlzcG9zZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRpc3Bvc2VkVWNzLmZvckVhY2goKGJjKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJjU2V0Xy5yZW1vdmUoYmMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25DaGlsZFZhbHVlQ2hhbmdlXyhldikge1xuICAgICAgICBjb25zdCBiYyA9IGZpbmRWYWx1ZUJsYWRlQ29udHJvbGxlcih0aGlzLmZpbmQoaXNWYWx1ZUJsYWRlQ29udHJvbGxlciksIGV2LnNlbmRlcik7XG4gICAgICAgIGlmICghYmMpIHtcbiAgICAgICAgICAgIHRocm93IFRwRXJyb3IuYWxyZWFkeURpc3Bvc2VkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3ZhbHVlY2hhbmdlJywge1xuICAgICAgICAgICAgYmxhZGVDb250cm9sbGVyOiBiYyxcbiAgICAgICAgICAgIG9wdGlvbnM6IGV2Lm9wdGlvbnMsXG4gICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblJhY2tMYXlvdXRfKF8pIHtcbiAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbnNfKCk7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdsYXlvdXQnLCB7XG4gICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblJhY2tWYWx1ZUNoYW5nZV8oZXYpIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3ZhbHVlY2hhbmdlJywge1xuICAgICAgICAgICAgYmxhZGVDb250cm9sbGVyOiBldi5ibGFkZUNvbnRyb2xsZXIsXG4gICAgICAgICAgICBvcHRpb25zOiBldi5vcHRpb25zLFxuICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25CbGFkZVBvc2l0aW9uc0NoYW5nZV8oKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb25zXygpO1xuICAgIH1cbn1cblxuY2xhc3MgUmFja0NvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLm9uUmFja0FkZF8gPSB0aGlzLm9uUmFja0FkZF8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblJhY2tSZW1vdmVfID0gdGhpcy5vblJhY2tSZW1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGNvbmZpZy5lbGVtZW50O1xuICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgIGNvbnN0IHJhY2sgPSBuZXcgUmFjayh7XG4gICAgICAgICAgICBibGFkZTogY29uZmlnLnJvb3QgPyB1bmRlZmluZWQgOiBjb25maWcuYmxhZGUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICByYWNrLmVtaXR0ZXIub24oJ2FkZCcsIHRoaXMub25SYWNrQWRkXyk7XG4gICAgICAgIHJhY2suZW1pdHRlci5vbigncmVtb3ZlJywgdGhpcy5vblJhY2tSZW1vdmVfKTtcbiAgICAgICAgdGhpcy5yYWNrID0gcmFjaztcbiAgICAgICAgdGhpcy52aWV3UHJvcHMuaGFuZGxlRGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5yYWNrLmNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmMgPSB0aGlzLnJhY2suY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgYmMudmlld1Byb3BzLnNldCgnZGlzcG9zZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUmFja0FkZF8oZXYpIHtcbiAgICAgICAgaWYgKCFldi5yb290KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaW5zZXJ0RWxlbWVudEF0KHRoaXMuZWxlbWVudCwgZXYuYmxhZGVDb250cm9sbGVyLnZpZXcuZWxlbWVudCwgZXYuaW5kZXgpO1xuICAgIH1cbiAgICBvblJhY2tSZW1vdmVfKGV2KSB7XG4gICAgICAgIGlmICghZXYucm9vdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlbW92ZUVsZW1lbnQoZXYuYmxhZGVDb250cm9sbGVyLnZpZXcuZWxlbWVudCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVCbGFkZSgpIHtcbiAgICByZXR1cm4gbmV3IFZhbHVlTWFwKHtcbiAgICAgICAgcG9zaXRpb25zOiBjcmVhdGVWYWx1ZShbXSwge1xuICAgICAgICAgICAgZXF1YWxzOiBkZWVwRXF1YWxzQXJyYXksXG4gICAgICAgIH0pLFxuICAgIH0pO1xufVxuXG5jbGFzcyBGb2xkYWJsZSBleHRlbmRzIFZhbHVlTWFwIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZU1hcCkge1xuICAgICAgICBzdXBlcih2YWx1ZU1hcCk7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUoZXhwYW5kZWQpIHtcbiAgICAgICAgY29uc3QgY29yZU9iaiA9IHtcbiAgICAgICAgICAgIGNvbXBsZXRlZDogdHJ1ZSxcbiAgICAgICAgICAgIGV4cGFuZGVkOiBleHBhbmRlZCxcbiAgICAgICAgICAgIGV4cGFuZGVkSGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgc2hvdWxkRml4SGVpZ2h0OiBmYWxzZSxcbiAgICAgICAgICAgIHRlbXBvcmFyeUV4cGFuZGVkOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjb3JlID0gVmFsdWVNYXAuY3JlYXRlQ29yZShjb3JlT2JqKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGb2xkYWJsZShjb3JlKTtcbiAgICB9XG4gICAgZ2V0IHN0eWxlRXhwYW5kZWQoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuZ2V0KCd0ZW1wb3JhcnlFeHBhbmRlZCcpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0aGlzLmdldCgnZXhwYW5kZWQnKTtcbiAgICB9XG4gICAgZ2V0IHN0eWxlSGVpZ2h0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc3R5bGVFeHBhbmRlZCkge1xuICAgICAgICAgICAgcmV0dXJuICcwJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBleEhlaWdodCA9IHRoaXMuZ2V0KCdleHBhbmRlZEhlaWdodCcpO1xuICAgICAgICBpZiAodGhpcy5nZXQoJ3Nob3VsZEZpeEhlaWdodCcpICYmICFpc0VtcHR5KGV4SGVpZ2h0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGAke2V4SGVpZ2h0fXB4YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2F1dG8nO1xuICAgIH1cbiAgICBiaW5kRXhwYW5kZWRDbGFzcyhlbGVtLCBleHBhbmRlZENsYXNzTmFtZSkge1xuICAgICAgICBjb25zdCBvbkV4cGFuZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV4cGFuZGVkID0gdGhpcy5zdHlsZUV4cGFuZGVkO1xuICAgICAgICAgICAgaWYgKGV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKGV4cGFuZGVkQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShleHBhbmRlZENsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGJpbmRWYWx1ZU1hcCh0aGlzLCAnZXhwYW5kZWQnLCBvbkV4cGFuZCk7XG4gICAgICAgIGJpbmRWYWx1ZU1hcCh0aGlzLCAndGVtcG9yYXJ5RXhwYW5kZWQnLCBvbkV4cGFuZCk7XG4gICAgfVxuICAgIGNsZWFuVXBUcmFuc2l0aW9uKCkge1xuICAgICAgICB0aGlzLnNldCgnc2hvdWxkRml4SGVpZ2h0JywgZmFsc2UpO1xuICAgICAgICB0aGlzLnNldCgnZXhwYW5kZWRIZWlnaHQnLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXQoJ2NvbXBsZXRlZCcsIHRydWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNvbXB1dGVFeHBhbmRlZEZvbGRlckhlaWdodChmb2xkZXIsIGNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICBsZXQgaGVpZ2h0ID0gMDtcbiAgICBkaXNhYmxlVHJhbnNpdGlvblRlbXBvcmFyaWx5KGNvbnRhaW5lckVsZW1lbnQsICgpID0+IHtcbiAgICAgICAgZm9sZGVyLnNldCgnZXhwYW5kZWRIZWlnaHQnLCBudWxsKTtcbiAgICAgICAgZm9sZGVyLnNldCgndGVtcG9yYXJ5RXhwYW5kZWQnLCB0cnVlKTtcbiAgICAgICAgZm9yY2VSZWZsb3coY29udGFpbmVyRWxlbWVudCk7XG4gICAgICAgIGhlaWdodCA9IGNvbnRhaW5lckVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBmb2xkZXIuc2V0KCd0ZW1wb3JhcnlFeHBhbmRlZCcsIG51bGwpO1xuICAgICAgICBmb3JjZVJlZmxvdyhjb250YWluZXJFbGVtZW50KTtcbiAgICB9KTtcbiAgICByZXR1cm4gaGVpZ2h0O1xufVxuZnVuY3Rpb24gYXBwbHlIZWlnaHQoZm9sZGFibGUsIGVsZW0pIHtcbiAgICBlbGVtLnN0eWxlLmhlaWdodCA9IGZvbGRhYmxlLnN0eWxlSGVpZ2h0O1xufVxuZnVuY3Rpb24gYmluZEZvbGRhYmxlKGZvbGRhYmxlLCBlbGVtKSB7XG4gICAgZm9sZGFibGUudmFsdWUoJ2V4cGFuZGVkJykuZW1pdHRlci5vbignYmVmb3JlY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBmb2xkYWJsZS5zZXQoJ2NvbXBsZXRlZCcsIGZhbHNlKTtcbiAgICAgICAgaWYgKGlzRW1wdHkoZm9sZGFibGUuZ2V0KCdleHBhbmRlZEhlaWdodCcpKSkge1xuICAgICAgICAgICAgY29uc3QgaCA9IGNvbXB1dGVFeHBhbmRlZEZvbGRlckhlaWdodChmb2xkYWJsZSwgZWxlbSk7XG4gICAgICAgICAgICBpZiAoaCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb2xkYWJsZS5zZXQoJ2V4cGFuZGVkSGVpZ2h0JywgaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9sZGFibGUuc2V0KCdzaG91bGRGaXhIZWlnaHQnLCB0cnVlKTtcbiAgICAgICAgZm9yY2VSZWZsb3coZWxlbSk7XG4gICAgfSk7XG4gICAgZm9sZGFibGUuZW1pdHRlci5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBhcHBseUhlaWdodChmb2xkYWJsZSwgZWxlbSk7XG4gICAgfSk7XG4gICAgYXBwbHlIZWlnaHQoZm9sZGFibGUsIGVsZW0pO1xuICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIChldikgPT4ge1xuICAgICAgICBpZiAoZXYucHJvcGVydHlOYW1lICE9PSAnaGVpZ2h0Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvbGRhYmxlLmNsZWFuVXBUcmFuc2l0aW9uKCk7XG4gICAgfSk7XG59XG5cbmNsYXNzIEZvbGRlckFwaSBleHRlbmRzIENvbnRhaW5lckJsYWRlQXBpIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250cm9sbGVyLCBwb29sKSB7XG4gICAgICAgIHN1cGVyKGNvbnRyb2xsZXIsIHBvb2wpO1xuICAgICAgICB0aGlzLmVtaXR0ZXJfID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLmZvbGRhYmxlXG4gICAgICAgICAgICAudmFsdWUoJ2V4cGFuZGVkJylcbiAgICAgICAgICAgIC5lbWl0dGVyLm9uKCdjaGFuZ2UnLCAoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgnZm9sZCcsIG5ldyBUcEZvbGRFdmVudCh0aGlzLCBldi5zZW5kZXIucmF3VmFsdWUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmFja0FwaV8ub24oJ2NoYW5nZScsIChldikgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyXy5lbWl0KCdjaGFuZ2UnLCBldik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgZXhwYW5kZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIuZm9sZGFibGUuZ2V0KCdleHBhbmRlZCcpO1xuICAgIH1cbiAgICBzZXQgZXhwYW5kZWQoZXhwYW5kZWQpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLmZvbGRhYmxlLnNldCgnZXhwYW5kZWQnLCBleHBhbmRlZCk7XG4gICAgfVxuICAgIGdldCB0aXRsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5wcm9wcy5nZXQoJ3RpdGxlJyk7XG4gICAgfVxuICAgIHNldCB0aXRsZSh0aXRsZSkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIucHJvcHMuc2V0KCd0aXRsZScsIHRpdGxlKTtcbiAgICB9XG4gICAgZ2V0IGNoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYWNrQXBpXy5jaGlsZHJlbjtcbiAgICB9XG4gICAgYWRkQmluZGluZyhvYmplY3QsIGtleSwgb3B0X3BhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yYWNrQXBpXy5hZGRCaW5kaW5nKG9iamVjdCwga2V5LCBvcHRfcGFyYW1zKTtcbiAgICB9XG4gICAgYWRkRm9sZGVyKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yYWNrQXBpXy5hZGRGb2xkZXIocGFyYW1zKTtcbiAgICB9XG4gICAgYWRkQnV0dG9uKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yYWNrQXBpXy5hZGRCdXR0b24ocGFyYW1zKTtcbiAgICB9XG4gICAgYWRkVGFiKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yYWNrQXBpXy5hZGRUYWIocGFyYW1zKTtcbiAgICB9XG4gICAgYWRkKGFwaSwgb3B0X2luZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhY2tBcGlfLmFkZChhcGksIG9wdF9pbmRleCk7XG4gICAgfVxuICAgIHJlbW92ZShhcGkpIHtcbiAgICAgICAgdGhpcy5yYWNrQXBpXy5yZW1vdmUoYXBpKTtcbiAgICB9XG4gICAgYWRkQmxhZGUocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhY2tBcGlfLmFkZEJsYWRlKHBhcmFtcyk7XG4gICAgfVxuICAgIG9uKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICBjb25zdCBiaCA9IGhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyXy5vbihldmVudE5hbWUsIChldikgPT4ge1xuICAgICAgICAgICAgYmgoZXYpO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IGhhbmRsZXIsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb2ZmKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLmVtaXR0ZXJfLm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmNvbnN0IGJsYWRlQ29udGFpbmVyQ2xhc3NOYW1lID0gQ2xhc3NOYW1lKCdjbnQnKTtcblxuY2xhc3MgRm9sZGVyVmlldyB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLmNsYXNzTmFtZV8gPSBDbGFzc05hbWUoKF9hID0gY29uZmlnLnZpZXdOYW1lKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnZmxkJyk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc05hbWVfKCksIGJsYWRlQ29udGFpbmVyQ2xhc3NOYW1lKCkpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICB0aGlzLmZvbGRhYmxlXyA9IGNvbmZpZy5mb2xkYWJsZTtcbiAgICAgICAgdGhpcy5mb2xkYWJsZV8uYmluZEV4cGFuZGVkQ2xhc3ModGhpcy5lbGVtZW50LCB0aGlzLmNsYXNzTmFtZV8odW5kZWZpbmVkLCAnZXhwYW5kZWQnKSk7XG4gICAgICAgIGJpbmRWYWx1ZU1hcCh0aGlzLmZvbGRhYmxlXywgJ2NvbXBsZXRlZCcsIHZhbHVlVG9DbGFzc05hbWUodGhpcy5lbGVtZW50LCB0aGlzLmNsYXNzTmFtZV8odW5kZWZpbmVkLCAnY3BsJykpKTtcbiAgICAgICAgY29uc3QgYnV0dG9uRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uRWxlbS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lXygnYicpKTtcbiAgICAgICAgYmluZFZhbHVlTWFwKGNvbmZpZy5wcm9wcywgJ3RpdGxlJywgKHRpdGxlKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNFbXB0eSh0aXRsZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTmFtZV8odW5kZWZpbmVkLCAnbm90JykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc05hbWVfKHVuZGVmaW5lZCwgJ25vdCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZERpc2FibGVkKGJ1dHRvbkVsZW0pO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uRWxlbSk7XG4gICAgICAgIHRoaXMuYnV0dG9uRWxlbWVudCA9IGJ1dHRvbkVsZW07XG4gICAgICAgIGNvbnN0IGluZGVudEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGluZGVudEVsZW0uY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTmFtZV8oJ2knKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChpbmRlbnRFbGVtKTtcbiAgICAgICAgY29uc3QgdGl0bGVFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aXRsZUVsZW0uY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzTmFtZV8oJ3QnKSk7XG4gICAgICAgIGJpbmRWYWx1ZVRvVGV4dENvbnRlbnQoY29uZmlnLnByb3BzLnZhbHVlKCd0aXRsZScpLCB0aXRsZUVsZW0pO1xuICAgICAgICB0aGlzLmJ1dHRvbkVsZW1lbnQuYXBwZW5kQ2hpbGQodGl0bGVFbGVtKTtcbiAgICAgICAgdGhpcy50aXRsZUVsZW1lbnQgPSB0aXRsZUVsZW07XG4gICAgICAgIGNvbnN0IG1hcmtFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBtYXJrRWxlbS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lXygnbScpKTtcbiAgICAgICAgdGhpcy5idXR0b25FbGVtZW50LmFwcGVuZENoaWxkKG1hcmtFbGVtKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyRWxlbS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lXygnYycpKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lckVsZW0pO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXJFbGVtO1xuICAgIH1cbn1cblxuY2xhc3MgRm9sZGVyQ29udHJvbGxlciBleHRlbmRzIENvbnRhaW5lckJsYWRlQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBmb2xkYWJsZSA9IEZvbGRhYmxlLmNyZWF0ZSgoX2EgPSBjb25maWcuZXhwYW5kZWQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRydWUpO1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IEZvbGRlclZpZXcoZG9jLCB7XG4gICAgICAgICAgICBmb2xkYWJsZTogZm9sZGFibGUsXG4gICAgICAgICAgICBwcm9wczogY29uZmlnLnByb3BzLFxuICAgICAgICAgICAgdmlld05hbWU6IGNvbmZpZy5yb290ID8gJ3JvdCcgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICBzdXBlcihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyksIHsgcmFja0NvbnRyb2xsZXI6IG5ldyBSYWNrQ29udHJvbGxlcih7XG4gICAgICAgICAgICAgICAgYmxhZGU6IGNvbmZpZy5ibGFkZSxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiB2aWV3LmNvbnRhaW5lckVsZW1lbnQsXG4gICAgICAgICAgICAgICAgcm9vdDogY29uZmlnLnJvb3QsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiBjb25maWcudmlld1Byb3BzLFxuICAgICAgICAgICAgfSksIHZpZXc6IHZpZXcgfSkpO1xuICAgICAgICB0aGlzLm9uVGl0bGVDbGlja18gPSB0aGlzLm9uVGl0bGVDbGlja18uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wcm9wcyA9IGNvbmZpZy5wcm9wcztcbiAgICAgICAgdGhpcy5mb2xkYWJsZSA9IGZvbGRhYmxlO1xuICAgICAgICBiaW5kRm9sZGFibGUodGhpcy5mb2xkYWJsZSwgdGhpcy52aWV3LmNvbnRhaW5lckVsZW1lbnQpO1xuICAgICAgICB0aGlzLnJhY2tDb250cm9sbGVyLnJhY2suZW1pdHRlci5vbignYWRkJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mb2xkYWJsZS5jbGVhblVwVHJhbnNpdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yYWNrQ29udHJvbGxlci5yYWNrLmVtaXR0ZXIub24oJ3JlbW92ZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9sZGFibGUuY2xlYW5VcFRyYW5zaXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlldy5idXR0b25FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vblRpdGxlQ2xpY2tfKTtcbiAgICB9XG4gICAgZ2V0IGRvY3VtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3LmVsZW1lbnQub3duZXJEb2N1bWVudDtcbiAgICB9XG4gICAgaW1wb3J0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIGltcG9ydEJsYWRlU3RhdGUoc3RhdGUsIChzKSA9PiBzdXBlci5pbXBvcnRTdGF0ZShzKSwgKHApID0+ICh7XG4gICAgICAgICAgICBleHBhbmRlZDogcC5yZXF1aXJlZC5ib29sZWFuLFxuICAgICAgICAgICAgdGl0bGU6IHAub3B0aW9uYWwuc3RyaW5nLFxuICAgICAgICB9KSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mb2xkYWJsZS5zZXQoJ2V4cGFuZGVkJywgcmVzdWx0LmV4cGFuZGVkKTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2V0KCd0aXRsZScsIHJlc3VsdC50aXRsZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGV4cG9ydFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gZXhwb3J0QmxhZGVTdGF0ZSgoKSA9PiBzdXBlci5leHBvcnRTdGF0ZSgpLCB7XG4gICAgICAgICAgICBleHBhbmRlZDogdGhpcy5mb2xkYWJsZS5nZXQoJ2V4cGFuZGVkJyksXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy5nZXQoJ3RpdGxlJyksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblRpdGxlQ2xpY2tfKCkge1xuICAgICAgICB0aGlzLmZvbGRhYmxlLnNldCgnZXhwYW5kZWQnLCAhdGhpcy5mb2xkYWJsZS5nZXQoJ2V4cGFuZGVkJykpO1xuICAgIH1cbn1cblxuY29uc3QgRm9sZGVyQmxhZGVQbHVnaW4gPSBjcmVhdGVQbHVnaW4oe1xuICAgIGlkOiAnZm9sZGVyJyxcbiAgICB0eXBlOiAnYmxhZGUnLFxuICAgIGFjY2VwdChwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VSZWNvcmQocGFyYW1zLCAocCkgPT4gKHtcbiAgICAgICAgICAgIHRpdGxlOiBwLnJlcXVpcmVkLnN0cmluZyxcbiAgICAgICAgICAgIHZpZXc6IHAucmVxdWlyZWQuY29uc3RhbnQoJ2ZvbGRlcicpLFxuICAgICAgICAgICAgZXhwYW5kZWQ6IHAub3B0aW9uYWwuYm9vbGVhbixcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0ID8geyBwYXJhbXM6IHJlc3VsdCB9IDogbnVsbDtcbiAgICB9LFxuICAgIGNvbnRyb2xsZXIoYXJncykge1xuICAgICAgICByZXR1cm4gbmV3IEZvbGRlckNvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgYmxhZGU6IGFyZ3MuYmxhZGUsXG4gICAgICAgICAgICBleHBhbmRlZDogYXJncy5wYXJhbXMuZXhwYW5kZWQsXG4gICAgICAgICAgICBwcm9wczogVmFsdWVNYXAuZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGFyZ3MucGFyYW1zLnRpdGxlLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGFwaShhcmdzKSB7XG4gICAgICAgIGlmICghKGFyZ3MuY29udHJvbGxlciBpbnN0YW5jZW9mIEZvbGRlckNvbnRyb2xsZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEZvbGRlckFwaShhcmdzLmNvbnRyb2xsZXIsIGFyZ3MucG9vbCk7XG4gICAgfSxcbn0pO1xuXG5jb25zdCBjbiRvID0gQ2xhc3NOYW1lKCcnKTtcbmZ1bmN0aW9uIHZhbHVlVG9Nb2RpZmllcihlbGVtLCBtb2RpZmllcikge1xuICAgIHJldHVybiB2YWx1ZVRvQ2xhc3NOYW1lKGVsZW0sIGNuJG8odW5kZWZpbmVkLCBtb2RpZmllcikpO1xufVxuY2xhc3MgVmlld1Byb3BzIGV4dGVuZHMgVmFsdWVNYXAge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlTWFwKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgc3VwZXIodmFsdWVNYXApO1xuICAgICAgICB0aGlzLm9uRGlzYWJsZWRDaGFuZ2VfID0gdGhpcy5vbkRpc2FibGVkQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUGFyZW50Q2hhbmdlXyA9IHRoaXMub25QYXJlbnRDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25QYXJlbnRHbG9iYWxEaXNhYmxlZENoYW5nZV8gPVxuICAgICAgICAgICAgdGhpcy5vblBhcmVudEdsb2JhbERpc2FibGVkQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICBbdGhpcy5nbG9iYWxEaXNhYmxlZF8sIHRoaXMuc2V0R2xvYmFsRGlzYWJsZWRfXSA9IGNyZWF0ZVJlYWRvbmx5VmFsdWUoY3JlYXRlVmFsdWUodGhpcy5nZXRHbG9iYWxEaXNhYmxlZF8oKSkpO1xuICAgICAgICB0aGlzLnZhbHVlKCdkaXNhYmxlZCcpLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25EaXNhYmxlZENoYW5nZV8pO1xuICAgICAgICB0aGlzLnZhbHVlKCdwYXJlbnQnKS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uUGFyZW50Q2hhbmdlXyk7XG4gICAgICAgIChfYSA9IHRoaXMuZ2V0KCdwYXJlbnQnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdsb2JhbERpc2FibGVkLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25QYXJlbnRHbG9iYWxEaXNhYmxlZENoYW5nZV8pO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKG9wdF9pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IG9wdF9pbml0aWFsVmFsdWUgIT09IG51bGwgJiYgb3B0X2luaXRpYWxWYWx1ZSAhPT0gdm9pZCAwID8gb3B0X2luaXRpYWxWYWx1ZSA6IHt9O1xuICAgICAgICByZXR1cm4gbmV3IFZpZXdQcm9wcyhWYWx1ZU1hcC5jcmVhdGVDb3JlKHtcbiAgICAgICAgICAgIGRpc2FibGVkOiAoX2EgPSBpbml0aWFsVmFsdWUuZGlzYWJsZWQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGZhbHNlLFxuICAgICAgICAgICAgZGlzcG9zZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaGlkZGVuOiAoX2IgPSBpbml0aWFsVmFsdWUuaGlkZGVuKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcmVudDogKF9jID0gaW5pdGlhbFZhbHVlLnBhcmVudCkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogbnVsbCxcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBnZXQgZ2xvYmFsRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdsb2JhbERpc2FibGVkXztcbiAgICB9XG4gICAgYmluZENsYXNzTW9kaWZpZXJzKGVsZW0pIHtcbiAgICAgICAgYmluZFZhbHVlKHRoaXMuZ2xvYmFsRGlzYWJsZWRfLCB2YWx1ZVRvTW9kaWZpZXIoZWxlbSwgJ2Rpc2FibGVkJykpO1xuICAgICAgICBiaW5kVmFsdWVNYXAodGhpcywgJ2hpZGRlbicsIHZhbHVlVG9Nb2RpZmllcihlbGVtLCAnaGlkZGVuJykpO1xuICAgIH1cbiAgICBiaW5kRGlzYWJsZWQodGFyZ2V0KSB7XG4gICAgICAgIGJpbmRWYWx1ZSh0aGlzLmdsb2JhbERpc2FibGVkXywgKGRpc2FibGVkKSA9PiB7XG4gICAgICAgICAgICB0YXJnZXQuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGJpbmRUYWJJbmRleChlbGVtKSB7XG4gICAgICAgIGJpbmRWYWx1ZSh0aGlzLmdsb2JhbERpc2FibGVkXywgKGRpc2FibGVkKSA9PiB7XG4gICAgICAgICAgICBlbGVtLnRhYkluZGV4ID0gZGlzYWJsZWQgPyAtMSA6IDA7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYW5kbGVEaXNwb3NlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMudmFsdWUoJ2Rpc3Bvc2VkJykuZW1pdHRlci5vbignY2hhbmdlJywgKGRpc3Bvc2VkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaW1wb3J0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zZXQoJ2Rpc2FibGVkJywgc3RhdGUuZGlzYWJsZWQpO1xuICAgICAgICB0aGlzLnNldCgnaGlkZGVuJywgc3RhdGUuaGlkZGVuKTtcbiAgICB9XG4gICAgZXhwb3J0U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5nZXQoJ2Rpc2FibGVkJyksXG4gICAgICAgICAgICBoaWRkZW46IHRoaXMuZ2V0KCdoaWRkZW4nKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0R2xvYmFsRGlzYWJsZWRfKCkge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldCgncGFyZW50Jyk7XG4gICAgICAgIGNvbnN0IHBhcmVudERpc2FibGVkID0gcGFyZW50ID8gcGFyZW50Lmdsb2JhbERpc2FibGVkLnJhd1ZhbHVlIDogZmFsc2U7XG4gICAgICAgIHJldHVybiBwYXJlbnREaXNhYmxlZCB8fCB0aGlzLmdldCgnZGlzYWJsZWQnKTtcbiAgICB9XG4gICAgdXBkYXRlR2xvYmFsRGlzYWJsZWRfKCkge1xuICAgICAgICB0aGlzLnNldEdsb2JhbERpc2FibGVkXyh0aGlzLmdldEdsb2JhbERpc2FibGVkXygpKTtcbiAgICB9XG4gICAgb25EaXNhYmxlZENoYW5nZV8oKSB7XG4gICAgICAgIHRoaXMudXBkYXRlR2xvYmFsRGlzYWJsZWRfKCk7XG4gICAgfVxuICAgIG9uUGFyZW50R2xvYmFsRGlzYWJsZWRDaGFuZ2VfKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUdsb2JhbERpc2FibGVkXygpO1xuICAgIH1cbiAgICBvblBhcmVudENoYW5nZV8oZXYpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBwcmV2UGFyZW50ID0gZXYucHJldmlvdXNSYXdWYWx1ZTtcbiAgICAgICAgcHJldlBhcmVudCA9PT0gbnVsbCB8fCBwcmV2UGFyZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcmV2UGFyZW50Lmdsb2JhbERpc2FibGVkLmVtaXR0ZXIub2ZmKCdjaGFuZ2UnLCB0aGlzLm9uUGFyZW50R2xvYmFsRGlzYWJsZWRDaGFuZ2VfKTtcbiAgICAgICAgKF9hID0gdGhpcy5nZXQoJ3BhcmVudCcpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2xvYmFsRGlzYWJsZWQuZW1pdHRlci5vbignY2hhbmdlJywgdGhpcy5vblBhcmVudEdsb2JhbERpc2FibGVkQ2hhbmdlXyk7XG4gICAgICAgIHRoaXMudXBkYXRlR2xvYmFsRGlzYWJsZWRfKCk7XG4gICAgfVxufVxuXG5jb25zdCBjbiRuID0gQ2xhc3NOYW1lKCd0YnAnKTtcbmNsYXNzIFRhYlBhZ2VWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNuJG4oKSk7XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZENsYXNzTW9kaWZpZXJzKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lckVsZW0uY2xhc3NMaXN0LmFkZChjbiRuKCdjJykpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyRWxlbSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lckVsZW07XG4gICAgfVxufVxuXG5jb25zdCBjbiRtID0gQ2xhc3NOYW1lKCd0YmknKTtcbmNsYXNzIFRhYkl0ZW1WaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNuJG0oKSk7XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZENsYXNzTW9kaWZpZXJzKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIGJpbmRWYWx1ZU1hcChjb25maWcucHJvcHMsICdzZWxlY3RlZCcsIChzZWxlY3RlZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY24kbSh1bmRlZmluZWQsICdzZWwnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbiRtKHVuZGVmaW5lZCwgJ3NlbCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGJ1dHRvbkVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbkVsZW0uY2xhc3NMaXN0LmFkZChjbiRtKCdiJykpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmREaXNhYmxlZChidXR0b25FbGVtKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkVsZW0pO1xuICAgICAgICB0aGlzLmJ1dHRvbkVsZW1lbnQgPSBidXR0b25FbGVtO1xuICAgICAgICBjb25zdCB0aXRsZUVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRpdGxlRWxlbS5jbGFzc0xpc3QuYWRkKGNuJG0oJ3QnKSk7XG4gICAgICAgIGJpbmRWYWx1ZVRvVGV4dENvbnRlbnQoY29uZmlnLnByb3BzLnZhbHVlKCd0aXRsZScpLCB0aXRsZUVsZW0pO1xuICAgICAgICB0aGlzLmJ1dHRvbkVsZW1lbnQuYXBwZW5kQ2hpbGQodGl0bGVFbGVtKTtcbiAgICAgICAgdGhpcy50aXRsZUVsZW1lbnQgPSB0aXRsZUVsZW07XG4gICAgfVxufVxuXG5jbGFzcyBUYWJJdGVtQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5vbkNsaWNrXyA9IHRoaXMub25DbGlja18uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wcm9wcyA9IGNvbmZpZy5wcm9wcztcbiAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVGFiSXRlbVZpZXcoZG9jLCB7XG4gICAgICAgICAgICBwcm9wczogY29uZmlnLnByb3BzLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBjb25maWcudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aWV3LmJ1dHRvbkVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2tfKTtcbiAgICB9XG4gICAgb25DbGlja18oKSB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdjbGljaycsIHtcbiAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jbGFzcyBUYWJQYWdlQ29udHJvbGxlciBleHRlbmRzIENvbnRhaW5lckJsYWRlQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBUYWJQYWdlVmlldyhkb2MsIHtcbiAgICAgICAgICAgIHZpZXdQcm9wczogY29uZmlnLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKSwgeyByYWNrQ29udHJvbGxlcjogbmV3IFJhY2tDb250cm9sbGVyKHtcbiAgICAgICAgICAgICAgICBibGFkZTogY29uZmlnLmJsYWRlLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHZpZXcuY29udGFpbmVyRWxlbWVudCxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KSwgdmlldzogdmlldyB9KSk7XG4gICAgICAgIHRoaXMub25JdGVtQ2xpY2tfID0gdGhpcy5vbkl0ZW1DbGlja18uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5pY18gPSBuZXcgVGFiSXRlbUNvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICBwcm9wczogY29uZmlnLml0ZW1Qcm9wcyxcbiAgICAgICAgICAgIHZpZXdQcm9wczogVmlld1Byb3BzLmNyZWF0ZSgpLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pY18uZW1pdHRlci5vbignY2xpY2snLCB0aGlzLm9uSXRlbUNsaWNrXyk7XG4gICAgICAgIHRoaXMucHJvcHMgPSBjb25maWcucHJvcHM7XG4gICAgICAgIGJpbmRWYWx1ZU1hcCh0aGlzLnByb3BzLCAnc2VsZWN0ZWQnLCAoc2VsZWN0ZWQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXRlbUNvbnRyb2xsZXIucHJvcHMuc2V0KCdzZWxlY3RlZCcsIHNlbGVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMudmlld1Byb3BzLnNldCgnaGlkZGVuJywgIXNlbGVjdGVkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBpdGVtQ29udHJvbGxlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNfO1xuICAgIH1cbiAgICBpbXBvcnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICByZXR1cm4gaW1wb3J0QmxhZGVTdGF0ZShzdGF0ZSwgKHMpID0+IHN1cGVyLmltcG9ydFN0YXRlKHMpLCAocCkgPT4gKHtcbiAgICAgICAgICAgIHNlbGVjdGVkOiBwLnJlcXVpcmVkLmJvb2xlYW4sXG4gICAgICAgICAgICB0aXRsZTogcC5yZXF1aXJlZC5zdHJpbmcsXG4gICAgICAgIH0pLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmljXy5wcm9wcy5zZXQoJ3NlbGVjdGVkJywgcmVzdWx0LnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMuaWNfLnByb3BzLnNldCgndGl0bGUnLCByZXN1bHQudGl0bGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBleHBvcnRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydEJsYWRlU3RhdGUoKCkgPT4gc3VwZXIuZXhwb3J0U3RhdGUoKSwge1xuICAgICAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuaWNfLnByb3BzLmdldCgnc2VsZWN0ZWQnKSxcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmljXy5wcm9wcy5nZXQoJ3RpdGxlJyksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkl0ZW1DbGlja18oKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2V0KCdzZWxlY3RlZCcsIHRydWUpO1xuICAgIH1cbn1cblxuY2xhc3MgVGFiQXBpIGV4dGVuZHMgQ29udGFpbmVyQmxhZGVBcGkge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXIsIHBvb2wpIHtcbiAgICAgICAgc3VwZXIoY29udHJvbGxlciwgcG9vbCk7XG4gICAgICAgIHRoaXMuZW1pdHRlcl8gPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICB0aGlzLm9uU2VsZWN0XyA9IHRoaXMub25TZWxlY3RfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucG9vbF8gPSBwb29sO1xuICAgICAgICB0aGlzLnJhY2tBcGlfLm9uKCdjaGFuZ2UnLCAoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgnY2hhbmdlJywgZXYpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLnRhYi5zZWxlY3RlZEluZGV4LmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25TZWxlY3RfKTtcbiAgICB9XG4gICAgZ2V0IHBhZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yYWNrQXBpXy5jaGlsZHJlbjtcbiAgICB9XG4gICAgYWRkUGFnZShwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgZG9jID0gdGhpcy5jb250cm9sbGVyLnZpZXcuZWxlbWVudC5vd25lckRvY3VtZW50O1xuICAgICAgICBjb25zdCBwYyA9IG5ldyBUYWJQYWdlQ29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgIGJsYWRlOiBjcmVhdGVCbGFkZSgpLFxuICAgICAgICAgICAgaXRlbVByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGl0bGU6IHBhcmFtcy50aXRsZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBWaWV3UHJvcHMuY3JlYXRlKCksXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwYXBpID0gdGhpcy5wb29sXy5jcmVhdGVBcGkocGMpO1xuICAgICAgICByZXR1cm4gdGhpcy5yYWNrQXBpXy5hZGQocGFwaSwgcGFyYW1zLmluZGV4KTtcbiAgICB9XG4gICAgcmVtb3ZlUGFnZShpbmRleCkge1xuICAgICAgICB0aGlzLnJhY2tBcGlfLnJlbW92ZSh0aGlzLnJhY2tBcGlfLmNoaWxkcmVuW2luZGV4XSk7XG4gICAgfVxuICAgIG9uKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICBjb25zdCBiaCA9IGhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyXy5vbihldmVudE5hbWUsIChldikgPT4ge1xuICAgICAgICAgICAgYmgoZXYpO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IGhhbmRsZXIsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb2ZmKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLmVtaXR0ZXJfLm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb25TZWxlY3RfKGV2KSB7XG4gICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgnc2VsZWN0JywgbmV3IFRwVGFiU2VsZWN0RXZlbnQodGhpcywgZXYucmF3VmFsdWUpKTtcbiAgICB9XG59XG5cbmNsYXNzIFRhYlBhZ2VBcGkgZXh0ZW5kcyBDb250YWluZXJCbGFkZUFwaSB7XG4gICAgZ2V0IHRpdGxlKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLmNvbnRyb2xsZXIuaXRlbUNvbnRyb2xsZXIucHJvcHMuZ2V0KCd0aXRsZScpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcbiAgICB9XG4gICAgc2V0IHRpdGxlKHRpdGxlKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci5pdGVtQ29udHJvbGxlci5wcm9wcy5zZXQoJ3RpdGxlJywgdGl0bGUpO1xuICAgIH1cbiAgICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIucHJvcHMuZ2V0KCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgICBzZXQgc2VsZWN0ZWQoc2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLnByb3BzLnNldCgnc2VsZWN0ZWQnLCBzZWxlY3RlZCk7XG4gICAgfVxuICAgIGdldCBjaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFja0FwaV8uY2hpbGRyZW47XG4gICAgfVxuICAgIGFkZEJ1dHRvbihwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFja0FwaV8uYWRkQnV0dG9uKHBhcmFtcyk7XG4gICAgfVxuICAgIGFkZEZvbGRlcihwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFja0FwaV8uYWRkRm9sZGVyKHBhcmFtcyk7XG4gICAgfVxuICAgIGFkZFRhYihwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFja0FwaV8uYWRkVGFiKHBhcmFtcyk7XG4gICAgfVxuICAgIGFkZChhcGksIG9wdF9pbmRleCkge1xuICAgICAgICB0aGlzLnJhY2tBcGlfLmFkZChhcGksIG9wdF9pbmRleCk7XG4gICAgfVxuICAgIHJlbW92ZShhcGkpIHtcbiAgICAgICAgdGhpcy5yYWNrQXBpXy5yZW1vdmUoYXBpKTtcbiAgICB9XG4gICAgYWRkQmluZGluZyhvYmplY3QsIGtleSwgb3B0X3BhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yYWNrQXBpXy5hZGRCaW5kaW5nKG9iamVjdCwga2V5LCBvcHRfcGFyYW1zKTtcbiAgICB9XG4gICAgYWRkQmxhZGUocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhY2tBcGlfLmFkZEJsYWRlKHBhcmFtcyk7XG4gICAgfVxufVxuXG5jb25zdCBJTkRFWF9OT1RfU0VMRUNURUQgPSAtMTtcbmNsYXNzIFRhYiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub25JdGVtU2VsZWN0ZWRDaGFuZ2VfID0gdGhpcy5vbkl0ZW1TZWxlY3RlZENoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbXB0eSA9IGNyZWF0ZVZhbHVlKHRydWUpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBjcmVhdGVWYWx1ZShJTkRFWF9OT1RfU0VMRUNURUQpO1xuICAgICAgICB0aGlzLml0ZW1zXyA9IFtdO1xuICAgIH1cbiAgICBhZGQoaXRlbSwgb3B0X2luZGV4KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gb3B0X2luZGV4ICE9PSBudWxsICYmIG9wdF9pbmRleCAhPT0gdm9pZCAwID8gb3B0X2luZGV4IDogdGhpcy5pdGVtc18ubGVuZ3RoO1xuICAgICAgICB0aGlzLml0ZW1zXy5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xuICAgICAgICBpdGVtLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25JdGVtU2VsZWN0ZWRDaGFuZ2VfKTtcbiAgICAgICAgdGhpcy5rZWVwU2VsZWN0aW9uXygpO1xuICAgIH1cbiAgICByZW1vdmUoaXRlbSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaXRlbXNfLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLml0ZW1zXy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpdGVtLmVtaXR0ZXIub2ZmKCdjaGFuZ2UnLCB0aGlzLm9uSXRlbVNlbGVjdGVkQ2hhbmdlXyk7XG4gICAgICAgIHRoaXMua2VlcFNlbGVjdGlvbl8oKTtcbiAgICB9XG4gICAga2VlcFNlbGVjdGlvbl8oKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zXy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleC5yYXdWYWx1ZSA9IElOREVYX05PVF9TRUxFQ1RFRDtcbiAgICAgICAgICAgIHRoaXMuZW1wdHkucmF3VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpcnN0U2VsSW5kZXggPSB0aGlzLml0ZW1zXy5maW5kSW5kZXgoKHMpID0+IHMucmF3VmFsdWUpO1xuICAgICAgICBpZiAoZmlyc3RTZWxJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNfLmZvckVhY2goKHMsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBzLnJhd1ZhbHVlID0gaSA9PT0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4LnJhd1ZhbHVlID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNfLmZvckVhY2goKHMsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBzLnJhd1ZhbHVlID0gaSA9PT0gZmlyc3RTZWxJbmRleDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4LnJhd1ZhbHVlID0gZmlyc3RTZWxJbmRleDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtcHR5LnJhd1ZhbHVlID0gZmFsc2U7XG4gICAgfVxuICAgIG9uSXRlbVNlbGVjdGVkQ2hhbmdlXyhldikge1xuICAgICAgICBpZiAoZXYucmF3VmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pdGVtc18uZmluZEluZGV4KChzKSA9PiBzID09PSBldi5zZW5kZXIpO1xuICAgICAgICAgICAgdGhpcy5pdGVtc18uZm9yRWFjaCgocywgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHMucmF3VmFsdWUgPSBpID09PSBpbmRleDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4LnJhd1ZhbHVlID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmtlZXBTZWxlY3Rpb25fKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IGNuJGwgPSBDbGFzc05hbWUoJ3RhYicpO1xuY2xhc3MgVGFiVmlldyB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiRsKCksIGJsYWRlQ29udGFpbmVyQ2xhc3NOYW1lKCkpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBiaW5kVmFsdWUoY29uZmlnLmVtcHR5LCB2YWx1ZVRvQ2xhc3NOYW1lKHRoaXMuZWxlbWVudCwgY24kbCh1bmRlZmluZWQsICdub3AnKSkpO1xuICAgICAgICBjb25zdCB0aXRsZUVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRpdGxlRWxlbS5jbGFzc0xpc3QuYWRkKGNuJGwoJ3QnKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aXRsZUVsZW0pO1xuICAgICAgICB0aGlzLml0ZW1zRWxlbWVudCA9IHRpdGxlRWxlbTtcbiAgICAgICAgY29uc3QgaW5kZW50RWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaW5kZW50RWxlbS5jbGFzc0xpc3QuYWRkKGNuJGwoJ2knKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChpbmRlbnRFbGVtKTtcbiAgICAgICAgY29uc3QgY29udGVudHNFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250ZW50c0VsZW0uY2xhc3NMaXN0LmFkZChjbiRsKCdjJykpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGVudHNFbGVtKTtcbiAgICAgICAgdGhpcy5jb250ZW50c0VsZW1lbnQgPSBjb250ZW50c0VsZW07XG4gICAgfVxufVxuXG5jbGFzcyBUYWJDb250cm9sbGVyIGV4dGVuZHMgQ29udGFpbmVyQmxhZGVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICBjb25zdCB0YWIgPSBuZXcgVGFiKCk7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgVGFiVmlldyhkb2MsIHtcbiAgICAgICAgICAgIGVtcHR5OiB0YWIuZW1wdHksXG4gICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBibGFkZTogY29uZmlnLmJsYWRlLFxuICAgICAgICAgICAgcmFja0NvbnRyb2xsZXI6IG5ldyBSYWNrQ29udHJvbGxlcih7XG4gICAgICAgICAgICAgICAgYmxhZGU6IGNvbmZpZy5ibGFkZSxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiB2aWV3LmNvbnRlbnRzRWxlbWVudCxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHZpZXc6IHZpZXcsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uUmFja0FkZF8gPSB0aGlzLm9uUmFja0FkZF8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblJhY2tSZW1vdmVfID0gdGhpcy5vblJhY2tSZW1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgIGNvbnN0IHJhY2sgPSB0aGlzLnJhY2tDb250cm9sbGVyLnJhY2s7XG4gICAgICAgIHJhY2suZW1pdHRlci5vbignYWRkJywgdGhpcy5vblJhY2tBZGRfKTtcbiAgICAgICAgcmFjay5lbWl0dGVyLm9uKCdyZW1vdmUnLCB0aGlzLm9uUmFja1JlbW92ZV8pO1xuICAgICAgICB0aGlzLnRhYiA9IHRhYjtcbiAgICB9XG4gICAgYWRkKHBjLCBvcHRfaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yYWNrQ29udHJvbGxlci5yYWNrLmFkZChwYywgb3B0X2luZGV4KTtcbiAgICB9XG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIHRoaXMucmFja0NvbnRyb2xsZXIucmFjay5yZW1vdmUodGhpcy5yYWNrQ29udHJvbGxlci5yYWNrLmNoaWxkcmVuW2luZGV4XSk7XG4gICAgfVxuICAgIG9uUmFja0FkZF8oZXYpIHtcbiAgICAgICAgaWYgKCFldi5yb290KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGMgPSBldi5ibGFkZUNvbnRyb2xsZXI7XG4gICAgICAgIGluc2VydEVsZW1lbnRBdCh0aGlzLnZpZXcuaXRlbXNFbGVtZW50LCBwYy5pdGVtQ29udHJvbGxlci52aWV3LmVsZW1lbnQsIGV2LmluZGV4KTtcbiAgICAgICAgcGMuaXRlbUNvbnRyb2xsZXIudmlld1Byb3BzLnNldCgncGFyZW50JywgdGhpcy52aWV3UHJvcHMpO1xuICAgICAgICB0aGlzLnRhYi5hZGQocGMucHJvcHMudmFsdWUoJ3NlbGVjdGVkJykpO1xuICAgIH1cbiAgICBvblJhY2tSZW1vdmVfKGV2KSB7XG4gICAgICAgIGlmICghZXYucm9vdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBjID0gZXYuYmxhZGVDb250cm9sbGVyO1xuICAgICAgICByZW1vdmVFbGVtZW50KHBjLml0ZW1Db250cm9sbGVyLnZpZXcuZWxlbWVudCk7XG4gICAgICAgIHBjLml0ZW1Db250cm9sbGVyLnZpZXdQcm9wcy5zZXQoJ3BhcmVudCcsIG51bGwpO1xuICAgICAgICB0aGlzLnRhYi5yZW1vdmUocGMucHJvcHMudmFsdWUoJ3NlbGVjdGVkJykpO1xuICAgIH1cbn1cblxuY29uc3QgVGFiQmxhZGVQbHVnaW4gPSBjcmVhdGVQbHVnaW4oe1xuICAgIGlkOiAndGFiJyxcbiAgICB0eXBlOiAnYmxhZGUnLFxuICAgIGFjY2VwdChwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VSZWNvcmQocGFyYW1zLCAocCkgPT4gKHtcbiAgICAgICAgICAgIHBhZ2VzOiBwLnJlcXVpcmVkLmFycmF5KHAucmVxdWlyZWQub2JqZWN0KHsgdGl0bGU6IHAucmVxdWlyZWQuc3RyaW5nIH0pKSxcbiAgICAgICAgICAgIHZpZXc6IHAucmVxdWlyZWQuY29uc3RhbnQoJ3RhYicpLFxuICAgICAgICB9KSk7XG4gICAgICAgIGlmICghcmVzdWx0IHx8IHJlc3VsdC5wYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHBhcmFtczogcmVzdWx0IH07XG4gICAgfSxcbiAgICBjb250cm9sbGVyKGFyZ3MpIHtcbiAgICAgICAgY29uc3QgYyA9IG5ldyBUYWJDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgIGJsYWRlOiBhcmdzLmJsYWRlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGFyZ3MucGFyYW1zLnBhZ2VzLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBjID0gbmV3IFRhYlBhZ2VDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICBibGFkZTogY3JlYXRlQmxhZGUoKSxcbiAgICAgICAgICAgICAgICBpdGVtUHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBwLnRpdGxlLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogVmlld1Byb3BzLmNyZWF0ZSgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjLmFkZChwYyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYztcbiAgICB9LFxuICAgIGFwaShhcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLmNvbnRyb2xsZXIgaW5zdGFuY2VvZiBUYWJDb250cm9sbGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRhYkFwaShhcmdzLmNvbnRyb2xsZXIsIGFyZ3MucG9vbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3MuY29udHJvbGxlciBpbnN0YW5jZW9mIFRhYlBhZ2VDb250cm9sbGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRhYlBhZ2VBcGkoYXJncy5jb250cm9sbGVyLCBhcmdzLnBvb2wpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG59KTtcblxuZnVuY3Rpb24gY3JlYXRlQmxhZGVDb250cm9sbGVyKHBsdWdpbiwgYXJncykge1xuICAgIGNvbnN0IGFjID0gcGx1Z2luLmFjY2VwdChhcmdzLnBhcmFtcyk7XG4gICAgaWYgKCFhYykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgcGFyYW1zID0gcGFyc2VSZWNvcmQoYXJncy5wYXJhbXMsIChwKSA9PiAoe1xuICAgICAgICBkaXNhYmxlZDogcC5vcHRpb25hbC5ib29sZWFuLFxuICAgICAgICBoaWRkZW46IHAub3B0aW9uYWwuYm9vbGVhbixcbiAgICB9KSk7XG4gICAgcmV0dXJuIHBsdWdpbi5jb250cm9sbGVyKHtcbiAgICAgICAgYmxhZGU6IGNyZWF0ZUJsYWRlKCksXG4gICAgICAgIGRvY3VtZW50OiBhcmdzLmRvY3VtZW50LFxuICAgICAgICBwYXJhbXM6IGZvcmNlQ2FzdChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGFjLnBhcmFtcyksIHsgZGlzYWJsZWQ6IHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5kaXNhYmxlZCwgaGlkZGVuOiBwYXJhbXMgPT09IG51bGwgfHwgcGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJhbXMuaGlkZGVuIH0pKSxcbiAgICAgICAgdmlld1Byb3BzOiBWaWV3UHJvcHMuY3JlYXRlKHtcbiAgICAgICAgICAgIGRpc2FibGVkOiBwYXJhbXMgPT09IG51bGwgfHwgcGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJhbXMuZGlzYWJsZWQsXG4gICAgICAgICAgICBoaWRkZW46IHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5oaWRkZW4sXG4gICAgICAgIH0pLFxuICAgIH0pO1xufVxuXG5jbGFzcyBMaXN0SW5wdXRCaW5kaW5nQXBpIGV4dGVuZHMgQmluZGluZ0FwaSB7XG4gICAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIudmFsdWVDb250cm9sbGVyLnByb3BzLmdldCgnb3B0aW9ucycpO1xuICAgIH1cbiAgICBzZXQgb3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci52YWx1ZUNvbnRyb2xsZXIucHJvcHMuc2V0KCdvcHRpb25zJywgb3B0aW9ucyk7XG4gICAgfVxufVxuXG5jbGFzcyBNYW51YWxUaWNrZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7IH1cbiAgICB0aWNrKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCd0aWNrJywge1xuICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIEludGVydmFsVGlja2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGludGVydmFsKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRfID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGltZXJJZF8gPSBudWxsO1xuICAgICAgICB0aGlzLm9uVGlja18gPSB0aGlzLm9uVGlja18uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5kb2NfID0gZG9jO1xuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICB0aGlzLmludGVydmFsXyA9IGludGVydmFsO1xuICAgICAgICB0aGlzLnNldFRpbWVyXygpO1xuICAgIH1cbiAgICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkXztcbiAgICB9XG4gICAgc2V0IGRpc2FibGVkKGluYWN0aXZlKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRfID0gaW5hY3RpdmU7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkXykge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyXygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lcl8oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXJfKCk7XG4gICAgfVxuICAgIGNsZWFyVGltZXJfKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lcklkXyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdpbiA9IHRoaXMuZG9jXy5kZWZhdWx0VmlldztcbiAgICAgICAgaWYgKHdpbikge1xuICAgICAgICAgICAgd2luLmNsZWFySW50ZXJ2YWwodGhpcy50aW1lcklkXyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aW1lcklkXyA9IG51bGw7XG4gICAgfVxuICAgIHNldFRpbWVyXygpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyXygpO1xuICAgICAgICBpZiAodGhpcy5pbnRlcnZhbF8gPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdpbiA9IHRoaXMuZG9jXy5kZWZhdWx0VmlldztcbiAgICAgICAgaWYgKHdpbikge1xuICAgICAgICAgICAgdGhpcy50aW1lcklkXyA9IHdpbi5zZXRJbnRlcnZhbCh0aGlzLm9uVGlja18sIHRoaXMuaW50ZXJ2YWxfKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblRpY2tfKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZF8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgndGljaycsIHtcbiAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jbGFzcyBDb21wb3NpdGVDb25zdHJhaW50IHtcbiAgICBjb25zdHJ1Y3Rvcihjb25zdHJhaW50cykge1xuICAgICAgICB0aGlzLmNvbnN0cmFpbnRzID0gY29uc3RyYWludHM7XG4gICAgfVxuICAgIGNvbnN0cmFpbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJhaW50cy5yZWR1Y2UoKHJlc3VsdCwgYykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGMuY29uc3RyYWluKHJlc3VsdCk7XG4gICAgICAgIH0sIHZhbHVlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBmaW5kQ29uc3RyYWludChjLCBjb25zdHJhaW50Q2xhc3MpIHtcbiAgICBpZiAoYyBpbnN0YW5jZW9mIGNvbnN0cmFpbnRDbGFzcykge1xuICAgICAgICByZXR1cm4gYztcbiAgICB9XG4gICAgaWYgKGMgaW5zdGFuY2VvZiBDb21wb3NpdGVDb25zdHJhaW50KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGMuY29uc3RyYWludHMucmVkdWNlKCh0bXBSZXN1bHQsIHNjKSA9PiB7XG4gICAgICAgICAgICBpZiAodG1wUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtcFJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzYyBpbnN0YW5jZW9mIGNvbnN0cmFpbnRDbGFzcyA/IHNjIDogbnVsbDtcbiAgICAgICAgfSwgbnVsbCk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmNsYXNzIExpc3RDb25zdHJhaW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMudmFsdWVzID0gVmFsdWVNYXAuZnJvbU9iamVjdCh7XG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3RyYWluKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLnZhbHVlcy5nZXQoJ29wdGlvbnMnKTtcbiAgICAgICAgaWYgKG9wdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWF0Y2hlZCA9IG9wdHMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS52YWx1ZSA9PT0gdmFsdWU7XG4gICAgICAgIH0pLmxlbmd0aCA+IDA7XG4gICAgICAgIHJldHVybiBtYXRjaGVkID8gdmFsdWUgOiBvcHRzWzBdLnZhbHVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VMaXN0T3B0aW9ucyh2YWx1ZSkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBwID0gTWljcm9QYXJzZXJzO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gKF9hID0gcGFyc2VSZWNvcmQoeyBpdGVtczogdmFsdWUgfSwgKHApID0+ICh7XG4gICAgICAgICAgICBpdGVtczogcC5yZXF1aXJlZC5hcnJheShwLnJlcXVpcmVkLm9iamVjdCh7XG4gICAgICAgICAgICAgICAgdGV4dDogcC5yZXF1aXJlZC5zdHJpbmcsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHAucmVxdWlyZWQucmF3LFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICB9KSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pdGVtcztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIHAucmVxdWlyZWQucmF3KHZhbHVlKVxuICAgICAgICAgICAgLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplTGlzdE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKHRleHQpID0+IHtcbiAgICAgICAgaXRlbXMucHVzaCh7IHRleHQ6IHRleHQsIHZhbHVlOiBvcHRpb25zW3RleHRdIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBpdGVtcztcbn1cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RDb25zdHJhaW50KG9wdGlvbnMpIHtcbiAgICByZXR1cm4gIWlzRW1wdHkob3B0aW9ucylcbiAgICAgICAgPyBuZXcgTGlzdENvbnN0cmFpbnQobm9ybWFsaXplTGlzdE9wdGlvbnMoZm9yY2VDYXN0KG9wdGlvbnMpKSlcbiAgICAgICAgOiBudWxsO1xufVxuXG5jb25zdCBjbiRrID0gQ2xhc3NOYW1lKCdsc3QnKTtcbmNsYXNzIExpc3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VfID0gdGhpcy5vblZhbHVlQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnByb3BzXyA9IGNvbmZpZy5wcm9wcztcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiRrKCkpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBjb25zdCBzZWxlY3RFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBzZWxlY3RFbGVtLmNsYXNzTGlzdC5hZGQoY24kaygncycpKTtcbiAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kRGlzYWJsZWQoc2VsZWN0RWxlbSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChzZWxlY3RFbGVtKTtcbiAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50ID0gc2VsZWN0RWxlbTtcbiAgICAgICAgY29uc3QgbWFya0VsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG1hcmtFbGVtLmNsYXNzTGlzdC5hZGQoY24kaygnbScpKTtcbiAgICAgICAgbWFya0VsZW0uYXBwZW5kQ2hpbGQoY3JlYXRlU3ZnSWNvbkVsZW1lbnQoZG9jLCAnZHJvcGRvd24nKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChtYXJrRWxlbSk7XG4gICAgICAgIGNvbmZpZy52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uVmFsdWVDaGFuZ2VfKTtcbiAgICAgICAgdGhpcy52YWx1ZV8gPSBjb25maWcudmFsdWU7XG4gICAgICAgIGJpbmRWYWx1ZU1hcCh0aGlzLnByb3BzXywgJ29wdGlvbnMnLCAob3B0cykgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlQ2hpbGRFbGVtZW50cyh0aGlzLnNlbGVjdEVsZW1lbnQpO1xuICAgICAgICAgICAgb3B0cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgICAgICBvcHRpb25FbGVtLnRleHRDb250ZW50ID0gaXRlbS50ZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb25FbGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGVfKCkge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLnByb3BzXy5nZXQoJ29wdGlvbnMnKS5tYXAoKG8pID0+IG8udmFsdWUpO1xuICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuc2VsZWN0ZWRJbmRleCA9IHZhbHVlcy5pbmRleE9mKHRoaXMudmFsdWVfLnJhd1ZhbHVlKTtcbiAgICB9XG4gICAgb25WYWx1ZUNoYW5nZV8oKSB7XG4gICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgIH1cbn1cblxuY2xhc3MgTGlzdENvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMub25TZWxlY3RDaGFuZ2VfID0gdGhpcy5vblNlbGVjdENoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wcm9wcyA9IGNvbmZpZy5wcm9wcztcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgTGlzdFZpZXcoZG9jLCB7XG4gICAgICAgICAgICBwcm9wczogdGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlldy5zZWxlY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMub25TZWxlY3RDaGFuZ2VfKTtcbiAgICB9XG4gICAgb25TZWxlY3RDaGFuZ2VfKGUpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0RWxlbSA9IGZvcmNlQ2FzdChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICB0aGlzLnZhbHVlLnJhd1ZhbHVlID1cbiAgICAgICAgICAgIHRoaXMucHJvcHMuZ2V0KCdvcHRpb25zJylbc2VsZWN0RWxlbS5zZWxlY3RlZEluZGV4XS52YWx1ZTtcbiAgICB9XG4gICAgaW1wb3J0UHJvcHMoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIGltcG9ydEJsYWRlU3RhdGUoc3RhdGUsIG51bGwsIChwKSA9PiAoe1xuICAgICAgICAgICAgb3B0aW9uczogcC5yZXF1aXJlZC5jdXN0b20ocGFyc2VMaXN0T3B0aW9ucyksXG4gICAgICAgIH0pLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNldCgnb3B0aW9ucycsIG5vcm1hbGl6ZUxpc3RPcHRpb25zKHJlc3VsdC5vcHRpb25zKSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGV4cG9ydFByb3BzKCkge1xuICAgICAgICByZXR1cm4gZXhwb3J0QmxhZGVTdGF0ZShudWxsLCB7XG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLnByb3BzLmdldCgnb3B0aW9ucycpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IGNuJGogPSBDbGFzc05hbWUoJ3BvcCcpO1xuY2xhc3MgUG9wdXBWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNuJGooKSk7XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZENsYXNzTW9kaWZpZXJzKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIGJpbmRWYWx1ZShjb25maWcuc2hvd3MsIHZhbHVlVG9DbGFzc05hbWUodGhpcy5lbGVtZW50LCBjbiRqKHVuZGVmaW5lZCwgJ3YnKSkpO1xuICAgIH1cbn1cblxuY2xhc3MgUG9wdXBDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLnNob3dzID0gY3JlYXRlVmFsdWUoZmFsc2UpO1xuICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBQb3B1cFZpZXcoZG9jLCB7XG4gICAgICAgICAgICBzaG93czogdGhpcy5zaG93cyxcbiAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY29uc3QgY24kaSA9IENsYXNzTmFtZSgndHh0Jyk7XG5jbGFzcyBUZXh0VmlldyB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZV8gPSB0aGlzLm9uQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNuJGkoKSk7XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZENsYXNzTW9kaWZpZXJzKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIHRoaXMucHJvcHNfID0gY29uZmlnLnByb3BzO1xuICAgICAgICB0aGlzLnByb3BzXy5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlXyk7XG4gICAgICAgIGNvbnN0IGlucHV0RWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dEVsZW0uY2xhc3NMaXN0LmFkZChjbiRpKCdpJykpO1xuICAgICAgICBpbnB1dEVsZW0udHlwZSA9ICd0ZXh0JztcbiAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kRGlzYWJsZWQoaW5wdXRFbGVtKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGlucHV0RWxlbSk7XG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gaW5wdXRFbGVtO1xuICAgICAgICBjb25maWcudmFsdWUuZW1pdHRlci5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZV8pO1xuICAgICAgICB0aGlzLnZhbHVlXyA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IHRoaXMucHJvcHNfLmdldCgnZm9ybWF0dGVyJyk7XG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlID0gZm9ybWF0dGVyKHRoaXMudmFsdWVfLnJhd1ZhbHVlKTtcbiAgICB9XG4gICAgb25DaGFuZ2VfKCkge1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG59XG5cbmNsYXNzIFRleHRDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLm9uSW5wdXRDaGFuZ2VfID0gdGhpcy5vbklucHV0Q2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnBhcnNlcl8gPSBjb25maWcucGFyc2VyO1xuICAgICAgICB0aGlzLnByb3BzID0gY29uZmlnLnByb3BzO1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBUZXh0Vmlldyhkb2MsIHtcbiAgICAgICAgICAgIHByb3BzOiBjb25maWcucHJvcHMsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZXcuaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMub25JbnB1dENoYW5nZV8pO1xuICAgIH1cbiAgICBvbklucHV0Q2hhbmdlXyhlKSB7XG4gICAgICAgIGNvbnN0IGlucHV0RWxlbSA9IGZvcmNlQ2FzdChlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGlucHV0RWxlbS52YWx1ZTtcbiAgICAgICAgY29uc3QgcGFyc2VkVmFsdWUgPSB0aGlzLnBhcnNlcl8odmFsdWUpO1xuICAgICAgICBpZiAoIWlzRW1wdHkocGFyc2VkVmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnJhd1ZhbHVlID0gcGFyc2VkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aWV3LnJlZnJlc2goKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGJvb2xUb1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xufVxuZnVuY3Rpb24gYm9vbEZyb21Vbmtub3duKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICEhdmFsdWU7XG59XG5mdW5jdGlvbiBCb29sZWFuRm9ybWF0dGVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIGJvb2xUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGNvbXBvc2VQYXJzZXJzKHBhcnNlcnMpIHtcbiAgICByZXR1cm4gKHRleHQpID0+IHtcbiAgICAgICAgcmV0dXJuIHBhcnNlcnMucmVkdWNlKChyZXN1bHQsIHBhcnNlcikgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VyKHRleHQpO1xuICAgICAgICB9LCBudWxsKTtcbiAgICB9O1xufVxuXG5jb25zdCBpbm5lckZvcm1hdHRlciA9IGNyZWF0ZU51bWJlckZvcm1hdHRlcigwKTtcbmZ1bmN0aW9uIGZvcm1hdFBlcmNlbnRhZ2UodmFsdWUpIHtcbiAgICByZXR1cm4gaW5uZXJGb3JtYXR0ZXIodmFsdWUpICsgJyUnO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdGcm9tVW5rbm93bih2YWx1ZSkge1xuICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xufVxuZnVuY3Rpb24gZm9ybWF0U3RyaW5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBjb25uZWN0VmFsdWVzKHsgcHJpbWFyeSwgc2Vjb25kYXJ5LCBmb3J3YXJkLCBiYWNrd2FyZCwgfSkge1xuICAgIGxldCBjaGFuZ2luZyA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIHByZXZlbnRGZWVkYmFjayhjYWxsYmFjaykge1xuICAgICAgICBpZiAoY2hhbmdpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjaGFuZ2luZyA9IHRydWU7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIGNoYW5naW5nID0gZmFsc2U7XG4gICAgfVxuICAgIHByaW1hcnkuZW1pdHRlci5vbignY2hhbmdlJywgKGV2KSA9PiB7XG4gICAgICAgIHByZXZlbnRGZWVkYmFjaygoKSA9PiB7XG4gICAgICAgICAgICBzZWNvbmRhcnkuc2V0UmF3VmFsdWUoZm9yd2FyZChwcmltYXJ5LnJhd1ZhbHVlLCBzZWNvbmRhcnkucmF3VmFsdWUpLCBldi5vcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgc2Vjb25kYXJ5LmVtaXR0ZXIub24oJ2NoYW5nZScsIChldikgPT4ge1xuICAgICAgICBwcmV2ZW50RmVlZGJhY2soKCkgPT4ge1xuICAgICAgICAgICAgcHJpbWFyeS5zZXRSYXdWYWx1ZShiYWNrd2FyZChwcmltYXJ5LnJhd1ZhbHVlLCBzZWNvbmRhcnkucmF3VmFsdWUpLCBldi5vcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByZXZlbnRGZWVkYmFjaygoKSA9PiB7XG4gICAgICAgICAgICBzZWNvbmRhcnkuc2V0UmF3VmFsdWUoZm9yd2FyZChwcmltYXJ5LnJhd1ZhbHVlLCBzZWNvbmRhcnkucmF3VmFsdWUpLCBldi5vcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcHJldmVudEZlZWRiYWNrKCgpID0+IHtcbiAgICAgICAgc2Vjb25kYXJ5LnNldFJhd1ZhbHVlKGZvcndhcmQocHJpbWFyeS5yYXdWYWx1ZSwgc2Vjb25kYXJ5LnJhd1ZhbHVlKSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3Q6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRTdGVwRm9yS2V5KGtleVNjYWxlLCBrZXlzKSB7XG4gICAgY29uc3Qgc3RlcCA9IGtleVNjYWxlICogKGtleXMuYWx0S2V5ID8gMC4xIDogMSkgKiAoa2V5cy5zaGlmdEtleSA/IDEwIDogMSk7XG4gICAgaWYgKGtleXMudXBLZXkpIHtcbiAgICAgICAgcmV0dXJuICtzdGVwO1xuICAgIH1cbiAgICBlbHNlIGlmIChrZXlzLmRvd25LZXkpIHtcbiAgICAgICAgcmV0dXJuIC1zdGVwO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbn1cbmZ1bmN0aW9uIGdldFZlcnRpY2FsU3RlcEtleXMoZXYpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhbHRLZXk6IGV2LmFsdEtleSxcbiAgICAgICAgZG93bktleTogZXYua2V5ID09PSAnQXJyb3dEb3duJyxcbiAgICAgICAgc2hpZnRLZXk6IGV2LnNoaWZ0S2V5LFxuICAgICAgICB1cEtleTogZXYua2V5ID09PSAnQXJyb3dVcCcsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGdldEhvcml6b250YWxTdGVwS2V5cyhldikge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFsdEtleTogZXYuYWx0S2V5LFxuICAgICAgICBkb3duS2V5OiBldi5rZXkgPT09ICdBcnJvd0xlZnQnLFxuICAgICAgICBzaGlmdEtleTogZXYuc2hpZnRLZXksXG4gICAgICAgIHVwS2V5OiBldi5rZXkgPT09ICdBcnJvd1JpZ2h0JyxcbiAgICB9O1xufVxuZnVuY3Rpb24gaXNWZXJ0aWNhbEFycm93S2V5KGtleSkge1xuICAgIHJldHVybiBrZXkgPT09ICdBcnJvd1VwJyB8fCBrZXkgPT09ICdBcnJvd0Rvd24nO1xufVxuZnVuY3Rpb24gaXNBcnJvd0tleShrZXkpIHtcbiAgICByZXR1cm4gaXNWZXJ0aWNhbEFycm93S2V5KGtleSkgfHwga2V5ID09PSAnQXJyb3dMZWZ0JyB8fCBrZXkgPT09ICdBcnJvd1JpZ2h0Jztcbn1cblxuZnVuY3Rpb24gY29tcHV0ZU9mZnNldCQxKGV2LCBlbGVtKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCB3aW4gPSBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgY29uc3QgcmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogZXYucGFnZVggLSAoKChfYSA9ICh3aW4gJiYgd2luLnNjcm9sbFgpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwKSArIHJlY3QubGVmdCksXG4gICAgICAgIHk6IGV2LnBhZ2VZIC0gKCgoX2IgPSAod2luICYmIHdpbi5zY3JvbGxZKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMCkgKyByZWN0LnRvcCksXG4gICAgfTtcbn1cbmNsYXNzIFBvaW50ZXJIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMubGFzdFRvdWNoXyA9IG51bGw7XG4gICAgICAgIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZV8gPSB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Eb2N1bWVudE1vdXNlVXBfID0gdGhpcy5vbkRvY3VtZW50TW91c2VVcF8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbk1vdXNlRG93bl8gPSB0aGlzLm9uTW91c2VEb3duXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uVG91Y2hFbmRfID0gdGhpcy5vblRvdWNoRW5kXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uVG91Y2hNb3ZlXyA9IHRoaXMub25Ub3VjaE1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Ub3VjaFN0YXJ0XyA9IHRoaXMub25Ub3VjaFN0YXJ0Xy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVsZW1fID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnRfLCB7XG4gICAgICAgICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZV8sIHtcbiAgICAgICAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vblRvdWNoRW5kXyk7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bl8pO1xuICAgIH1cbiAgICBjb21wdXRlUG9zaXRpb25fKG9mZnNldCkge1xuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtXy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJvdW5kczoge1xuICAgICAgICAgICAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9pbnQ6IG9mZnNldFxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICB4OiBvZmZzZXQueCxcbiAgICAgICAgICAgICAgICAgICAgeTogb2Zmc2V0LnksXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgb25Nb3VzZURvd25fKGV2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgKF9hID0gZXYuY3VycmVudFRhcmdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvY3VzKCk7XG4gICAgICAgIGNvbnN0IGRvYyA9IHRoaXMuZWxlbV8ub3duZXJEb2N1bWVudDtcbiAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZV8pO1xuICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Eb2N1bWVudE1vdXNlVXBfKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2Rvd24nLCB7XG4gICAgICAgICAgICBhbHRLZXk6IGV2LmFsdEtleSxcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuY29tcHV0ZVBvc2l0aW9uXyhjb21wdXRlT2Zmc2V0JDEoZXYsIHRoaXMuZWxlbV8pKSxcbiAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgICAgIHNoaWZ0S2V5OiBldi5zaGlmdEtleSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uRG9jdW1lbnRNb3VzZU1vdmVfKGV2KSB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdtb3ZlJywge1xuICAgICAgICAgICAgYWx0S2V5OiBldi5hbHRLZXksXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmNvbXB1dGVQb3NpdGlvbl8oY29tcHV0ZU9mZnNldCQxKGV2LCB0aGlzLmVsZW1fKSksXG4gICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgICAgICBzaGlmdEtleTogZXYuc2hpZnRLZXksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkRvY3VtZW50TW91c2VVcF8oZXYpIHtcbiAgICAgICAgY29uc3QgZG9jID0gdGhpcy5lbGVtXy5vd25lckRvY3VtZW50O1xuICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlXyk7XG4gICAgICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbkRvY3VtZW50TW91c2VVcF8pO1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgndXAnLCB7XG4gICAgICAgICAgICBhbHRLZXk6IGV2LmFsdEtleSxcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuY29tcHV0ZVBvc2l0aW9uXyhjb21wdXRlT2Zmc2V0JDEoZXYsIHRoaXMuZWxlbV8pKSxcbiAgICAgICAgICAgIHNlbmRlcjogdGhpcyxcbiAgICAgICAgICAgIHNoaWZ0S2V5OiBldi5zaGlmdEtleSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uVG91Y2hTdGFydF8oZXYpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdG91Y2ggPSBldi50YXJnZXRUb3VjaGVzLml0ZW0oMCk7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW1fLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZG93bicsIHtcbiAgICAgICAgICAgIGFsdEtleTogZXYuYWx0S2V5LFxuICAgICAgICAgICAgZGF0YTogdGhpcy5jb21wdXRlUG9zaXRpb25fKHRvdWNoXG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHRvdWNoLmNsaWVudFggLSByZWN0LmxlZnQsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvdWNoLmNsaWVudFkgLSByZWN0LnRvcCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgc2VuZGVyOiB0aGlzLFxuICAgICAgICAgICAgc2hpZnRLZXk6IGV2LnNoaWZ0S2V5LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5sYXN0VG91Y2hfID0gdG91Y2g7XG4gICAgfVxuICAgIG9uVG91Y2hNb3ZlXyhldikge1xuICAgICAgICBjb25zdCB0b3VjaCA9IGV2LnRhcmdldFRvdWNoZXMuaXRlbSgwKTtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbV8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdtb3ZlJywge1xuICAgICAgICAgICAgYWx0S2V5OiBldi5hbHRLZXksXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmNvbXB1dGVQb3NpdGlvbl8odG91Y2hcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgeDogdG91Y2guY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgeTogdG91Y2guY2xpZW50WSAtIHJlY3QudG9wLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgICAgICBzaGlmdEtleTogZXYuc2hpZnRLZXksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxhc3RUb3VjaF8gPSB0b3VjaDtcbiAgICB9XG4gICAgb25Ub3VjaEVuZF8oZXYpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB0b3VjaCA9IChfYSA9IGV2LnRhcmdldFRvdWNoZXMuaXRlbSgwKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5sYXN0VG91Y2hfO1xuICAgICAgICBjb25zdCByZWN0ID0gdGhpcy5lbGVtXy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3VwJywge1xuICAgICAgICAgICAgYWx0S2V5OiBldi5hbHRLZXksXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmNvbXB1dGVQb3NpdGlvbl8odG91Y2hcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgeDogdG91Y2guY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgeTogdG91Y2guY2xpZW50WSAtIHJlY3QudG9wLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICBzZW5kZXI6IHRoaXMsXG4gICAgICAgICAgICBzaGlmdEtleTogZXYuc2hpZnRLZXksXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY29uc3QgY24kaCA9IENsYXNzTmFtZSgndHh0Jyk7XG5jbGFzcyBOdW1iZXJUZXh0VmlldyB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZV8gPSB0aGlzLm9uQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnByb3BzXyA9IGNvbmZpZy5wcm9wcztcbiAgICAgICAgdGhpcy5wcm9wc18uZW1pdHRlci5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZV8pO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNuJGgoKSwgY24kaCh1bmRlZmluZWQsICdudW0nKSk7XG4gICAgICAgIGlmIChjb25maWcuYXJyYXlQb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY24kaCh1bmRlZmluZWQsIGNvbmZpZy5hcnJheVBvc2l0aW9uKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgY29uc3QgaW5wdXRFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0RWxlbS5jbGFzc0xpc3QuYWRkKGNuJGgoJ2knKSk7XG4gICAgICAgIGlucHV0RWxlbS50eXBlID0gJ3RleHQnO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmREaXNhYmxlZChpbnB1dEVsZW0pO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtKTtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQgPSBpbnB1dEVsZW07XG4gICAgICAgIHRoaXMub25EcmFnZ2luZ0NoYW5nZV8gPSB0aGlzLm9uRHJhZ2dpbmdDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmdfID0gY29uZmlnLmRyYWdnaW5nO1xuICAgICAgICB0aGlzLmRyYWdnaW5nXy5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uRHJhZ2dpbmdDaGFuZ2VfKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY24kaCgpKTtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiRoKCdpJykpO1xuICAgICAgICBjb25zdCBrbm9iRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAga25vYkVsZW0uY2xhc3NMaXN0LmFkZChjbiRoKCdrJykpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoa25vYkVsZW0pO1xuICAgICAgICB0aGlzLmtub2JFbGVtZW50ID0ga25vYkVsZW07XG4gICAgICAgIGNvbnN0IGd1aWRlRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50TlMoU1ZHX05TLCAnc3ZnJyk7XG4gICAgICAgIGd1aWRlRWxlbS5jbGFzc0xpc3QuYWRkKGNuJGgoJ2cnKSk7XG4gICAgICAgIHRoaXMua25vYkVsZW1lbnQuYXBwZW5kQ2hpbGQoZ3VpZGVFbGVtKTtcbiAgICAgICAgY29uc3QgYm9keUVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3BhdGgnKTtcbiAgICAgICAgYm9keUVsZW0uY2xhc3NMaXN0LmFkZChjbiRoKCdnYicpKTtcbiAgICAgICAgZ3VpZGVFbGVtLmFwcGVuZENoaWxkKGJvZHlFbGVtKTtcbiAgICAgICAgdGhpcy5ndWlkZUJvZHlFbGVtXyA9IGJvZHlFbGVtO1xuICAgICAgICBjb25zdCBoZWFkRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50TlMoU1ZHX05TLCAncGF0aCcpO1xuICAgICAgICBoZWFkRWxlbS5jbGFzc0xpc3QuYWRkKGNuJGgoJ2doJykpO1xuICAgICAgICBndWlkZUVsZW0uYXBwZW5kQ2hpbGQoaGVhZEVsZW0pO1xuICAgICAgICB0aGlzLmd1aWRlSGVhZEVsZW1fID0gaGVhZEVsZW07XG4gICAgICAgIGNvbnN0IHRvb2x0aXBFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b29sdGlwRWxlbS5jbGFzc0xpc3QuYWRkKENsYXNzTmFtZSgndHQnKSgpKTtcbiAgICAgICAgdGhpcy5rbm9iRWxlbWVudC5hcHBlbmRDaGlsZCh0b29sdGlwRWxlbSk7XG4gICAgICAgIHRoaXMudG9vbHRpcEVsZW1fID0gdG9vbHRpcEVsZW07XG4gICAgICAgIGNvbmZpZy52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlXyk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH1cbiAgICBvbkRyYWdnaW5nQ2hhbmdlXyhldikge1xuICAgICAgICBpZiAoZXYucmF3VmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNuJGgodW5kZWZpbmVkLCAnZHJnJykpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNuJGgodW5kZWZpbmVkLCAnZHJnJykpO1xuICAgICAgICBjb25zdCB4ID0gZXYucmF3VmFsdWUgLyB0aGlzLnByb3BzXy5nZXQoJ3BvaW50ZXJTY2FsZScpO1xuICAgICAgICBjb25zdCBhb3ggPSB4ICsgKHggPiAwID8gLTEgOiB4IDwgMCA/ICsxIDogMCk7XG4gICAgICAgIGNvbnN0IGFkeCA9IGNvbnN0cmFpblJhbmdlKC1hb3gsIC00LCArNCk7XG4gICAgICAgIHRoaXMuZ3VpZGVIZWFkRWxlbV8uc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCBbYE0gJHthb3ggKyBhZHh9LDAgTCR7YW94fSw0IEwke2FveCArIGFkeH0sOGAsIGBNICR7eH0sLTEgTCR7eH0sOWBdLmpvaW4oJyAnKSk7XG4gICAgICAgIHRoaXMuZ3VpZGVCb2R5RWxlbV8uc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCBgTSAwLDQgTCR7eH0sNGApO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSB0aGlzLnByb3BzXy5nZXQoJ2Zvcm1hdHRlcicpO1xuICAgICAgICB0aGlzLnRvb2x0aXBFbGVtXy50ZXh0Q29udGVudCA9IGZvcm1hdHRlcih0aGlzLnZhbHVlLnJhd1ZhbHVlKTtcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbV8uc3R5bGUubGVmdCA9IGAke3h9cHhgO1xuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSB0aGlzLnByb3BzXy5nZXQoJ2Zvcm1hdHRlcicpO1xuICAgICAgICB0aGlzLmlucHV0RWxlbWVudC52YWx1ZSA9IGZvcm1hdHRlcih0aGlzLnZhbHVlLnJhd1ZhbHVlKTtcbiAgICB9XG4gICAgb25DaGFuZ2VfKCkge1xuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG59XG5cbmNsYXNzIE51bWJlclRleHRDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRoaXMub3JpZ2luUmF3VmFsdWVfID0gMDtcbiAgICAgICAgdGhpcy5vbklucHV0Q2hhbmdlXyA9IHRoaXMub25JbnB1dENoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbklucHV0S2V5RG93bl8gPSB0aGlzLm9uSW5wdXRLZXlEb3duXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uSW5wdXRLZXlVcF8gPSB0aGlzLm9uSW5wdXRLZXlVcF8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblBvaW50ZXJEb3duXyA9IHRoaXMub25Qb2ludGVyRG93bl8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblBvaW50ZXJNb3ZlXyA9IHRoaXMub25Qb2ludGVyTW92ZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblBvaW50ZXJVcF8gPSB0aGlzLm9uUG9pbnRlclVwXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnBhcnNlcl8gPSBjb25maWcucGFyc2VyO1xuICAgICAgICB0aGlzLnByb3BzID0gY29uZmlnLnByb3BzO1xuICAgICAgICB0aGlzLnNsaWRlclByb3BzXyA9IChfYSA9IGNvbmZpZy5zbGlkZXJQcm9wcykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogbnVsbDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICB0aGlzLmRyYWdnaW5nXyA9IGNyZWF0ZVZhbHVlKG51bGwpO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgTnVtYmVyVGV4dFZpZXcoZG9jLCB7XG4gICAgICAgICAgICBhcnJheVBvc2l0aW9uOiBjb25maWcuYXJyYXlQb3NpdGlvbixcbiAgICAgICAgICAgIGRyYWdnaW5nOiB0aGlzLmRyYWdnaW5nXyxcbiAgICAgICAgICAgIHByb3BzOiB0aGlzLnByb3BzLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aWV3LmlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLm9uSW5wdXRDaGFuZ2VfKTtcbiAgICAgICAgdGhpcy52aWV3LmlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbklucHV0S2V5RG93bl8pO1xuICAgICAgICB0aGlzLnZpZXcuaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5vbklucHV0S2V5VXBfKTtcbiAgICAgICAgY29uc3QgcGggPSBuZXcgUG9pbnRlckhhbmRsZXIodGhpcy52aWV3Lmtub2JFbGVtZW50KTtcbiAgICAgICAgcGguZW1pdHRlci5vbignZG93bicsIHRoaXMub25Qb2ludGVyRG93bl8pO1xuICAgICAgICBwaC5lbWl0dGVyLm9uKCdtb3ZlJywgdGhpcy5vblBvaW50ZXJNb3ZlXyk7XG4gICAgICAgIHBoLmVtaXR0ZXIub24oJ3VwJywgdGhpcy5vblBvaW50ZXJVcF8pO1xuICAgIH1cbiAgICBjb25zdHJhaW5WYWx1ZV8odmFsdWUpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgbWluID0gKF9hID0gdGhpcy5zbGlkZXJQcm9wc18pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXQoJ21pbicpO1xuICAgICAgICBjb25zdCBtYXggPSAoX2IgPSB0aGlzLnNsaWRlclByb3BzXykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmdldCgnbWF4Jyk7XG4gICAgICAgIGxldCB2ID0gdmFsdWU7XG4gICAgICAgIGlmIChtaW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdiA9IE1hdGgubWF4KHYsIG1pbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2ID0gTWF0aC5taW4odiwgbWF4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdjtcbiAgICB9XG4gICAgb25JbnB1dENoYW5nZV8oZSkge1xuICAgICAgICBjb25zdCBpbnB1dEVsZW0gPSBmb3JjZUNhc3QoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBpbnB1dEVsZW0udmFsdWU7XG4gICAgICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gdGhpcy5wYXJzZXJfKHZhbHVlKTtcbiAgICAgICAgaWYgKCFpc0VtcHR5KHBhcnNlZFZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5yYXdWYWx1ZSA9IHRoaXMuY29uc3RyYWluVmFsdWVfKHBhcnNlZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZpZXcucmVmcmVzaCgpO1xuICAgIH1cbiAgICBvbklucHV0S2V5RG93bl8oZXYpIHtcbiAgICAgICAgY29uc3Qgc3RlcCA9IGdldFN0ZXBGb3JLZXkodGhpcy5wcm9wcy5nZXQoJ2tleVNjYWxlJyksIGdldFZlcnRpY2FsU3RlcEtleXMoZXYpKTtcbiAgICAgICAgaWYgKHN0ZXAgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKHRoaXMuY29uc3RyYWluVmFsdWVfKHRoaXMudmFsdWUucmF3VmFsdWUgKyBzdGVwKSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3Q6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25JbnB1dEtleVVwXyhldikge1xuICAgICAgICBjb25zdCBzdGVwID0gZ2V0U3RlcEZvcktleSh0aGlzLnByb3BzLmdldCgna2V5U2NhbGUnKSwgZ2V0VmVydGljYWxTdGVwS2V5cyhldikpO1xuICAgICAgICBpZiAoc3RlcCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsdWUuc2V0UmF3VmFsdWUodGhpcy52YWx1ZS5yYXdWYWx1ZSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiB0cnVlLFxuICAgICAgICAgICAgbGFzdDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUG9pbnRlckRvd25fKCkge1xuICAgICAgICB0aGlzLm9yaWdpblJhd1ZhbHVlXyA9IHRoaXMudmFsdWUucmF3VmFsdWU7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmdfLnJhd1ZhbHVlID0gMDtcbiAgICB9XG4gICAgY29tcHV0ZURyYWdnaW5nVmFsdWVfKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhLnBvaW50KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkeCA9IGRhdGEucG9pbnQueCAtIGRhdGEuYm91bmRzLndpZHRoIC8gMjtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RyYWluVmFsdWVfKHRoaXMub3JpZ2luUmF3VmFsdWVfICsgZHggKiB0aGlzLnByb3BzLmdldCgncG9pbnRlclNjYWxlJykpO1xuICAgIH1cbiAgICBvblBvaW50ZXJNb3ZlXyhldikge1xuICAgICAgICBjb25zdCB2ID0gdGhpcy5jb21wdXRlRHJhZ2dpbmdWYWx1ZV8oZXYuZGF0YSk7XG4gICAgICAgIGlmICh2ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZSh2LCB7XG4gICAgICAgICAgICBmb3JjZUVtaXQ6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRyYWdnaW5nXy5yYXdWYWx1ZSA9IHRoaXMudmFsdWUucmF3VmFsdWUgLSB0aGlzLm9yaWdpblJhd1ZhbHVlXztcbiAgICB9XG4gICAgb25Qb2ludGVyVXBfKGV2KSB7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLmNvbXB1dGVEcmFnZ2luZ1ZhbHVlXyhldi5kYXRhKTtcbiAgICAgICAgaWYgKHYgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKHYsIHtcbiAgICAgICAgICAgIGZvcmNlRW1pdDogdHJ1ZSxcbiAgICAgICAgICAgIGxhc3Q6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmRyYWdnaW5nXy5yYXdWYWx1ZSA9IG51bGw7XG4gICAgfVxufVxuXG5jb25zdCBjbiRnID0gQ2xhc3NOYW1lKCdzbGQnKTtcbmNsYXNzIFNsaWRlclZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VfID0gdGhpcy5vbkNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wcm9wc18gPSBjb25maWcucHJvcHM7XG4gICAgICAgIHRoaXMucHJvcHNfLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2VfKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiRnKCkpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBjb25zdCB0cmFja0VsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRyYWNrRWxlbS5jbGFzc0xpc3QuYWRkKGNuJGcoJ3QnKSk7XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZFRhYkluZGV4KHRyYWNrRWxlbSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0cmFja0VsZW0pO1xuICAgICAgICB0aGlzLnRyYWNrRWxlbWVudCA9IHRyYWNrRWxlbTtcbiAgICAgICAgY29uc3Qga25vYkVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGtub2JFbGVtLmNsYXNzTGlzdC5hZGQoY24kZygnaycpKTtcbiAgICAgICAgdGhpcy50cmFja0VsZW1lbnQuYXBwZW5kQ2hpbGQoa25vYkVsZW0pO1xuICAgICAgICB0aGlzLmtub2JFbGVtZW50ID0ga25vYkVsZW07XG4gICAgICAgIGNvbmZpZy52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlXyk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgIH1cbiAgICB1cGRhdGVfKCkge1xuICAgICAgICBjb25zdCBwID0gY29uc3RyYWluUmFuZ2UobWFwUmFuZ2UodGhpcy52YWx1ZS5yYXdWYWx1ZSwgdGhpcy5wcm9wc18uZ2V0KCdtaW4nKSwgdGhpcy5wcm9wc18uZ2V0KCdtYXgnKSwgMCwgMTAwKSwgMCwgMTAwKTtcbiAgICAgICAgdGhpcy5rbm9iRWxlbWVudC5zdHlsZS53aWR0aCA9IGAke3B9JWA7XG4gICAgfVxuICAgIG9uQ2hhbmdlXygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgfVxufVxuXG5jbGFzcyBTbGlkZXJDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLm9uS2V5RG93bl8gPSB0aGlzLm9uS2V5RG93bl8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbktleVVwXyA9IHRoaXMub25LZXlVcF8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblBvaW50ZXJEb3duT3JNb3ZlXyA9IHRoaXMub25Qb2ludGVyRG93bk9yTW92ZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblBvaW50ZXJVcF8gPSB0aGlzLm9uUG9pbnRlclVwXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgIHRoaXMucHJvcHMgPSBjb25maWcucHJvcHM7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBTbGlkZXJWaWV3KGRvYywge1xuICAgICAgICAgICAgcHJvcHM6IHRoaXMucHJvcHMsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnB0SGFuZGxlcl8gPSBuZXcgUG9pbnRlckhhbmRsZXIodGhpcy52aWV3LnRyYWNrRWxlbWVudCk7XG4gICAgICAgIHRoaXMucHRIYW5kbGVyXy5lbWl0dGVyLm9uKCdkb3duJywgdGhpcy5vblBvaW50ZXJEb3duT3JNb3ZlXyk7XG4gICAgICAgIHRoaXMucHRIYW5kbGVyXy5lbWl0dGVyLm9uKCdtb3ZlJywgdGhpcy5vblBvaW50ZXJEb3duT3JNb3ZlXyk7XG4gICAgICAgIHRoaXMucHRIYW5kbGVyXy5lbWl0dGVyLm9uKCd1cCcsIHRoaXMub25Qb2ludGVyVXBfKTtcbiAgICAgICAgdGhpcy52aWV3LnRyYWNrRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd25fKTtcbiAgICAgICAgdGhpcy52aWV3LnRyYWNrRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMub25LZXlVcF8pO1xuICAgIH1cbiAgICBoYW5kbGVQb2ludGVyRXZlbnRfKGQsIG9wdHMpIHtcbiAgICAgICAgaWYgKCFkLnBvaW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZShtYXBSYW5nZShjb25zdHJhaW5SYW5nZShkLnBvaW50LngsIDAsIGQuYm91bmRzLndpZHRoKSwgMCwgZC5ib3VuZHMud2lkdGgsIHRoaXMucHJvcHMuZ2V0KCdtaW4nKSwgdGhpcy5wcm9wcy5nZXQoJ21heCcpKSwgb3B0cyk7XG4gICAgfVxuICAgIG9uUG9pbnRlckRvd25Pck1vdmVfKGV2KSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUG9pbnRlckV2ZW50Xyhldi5kYXRhLCB7XG4gICAgICAgICAgICBmb3JjZUVtaXQ6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblBvaW50ZXJVcF8oZXYpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVQb2ludGVyRXZlbnRfKGV2LmRhdGEsIHtcbiAgICAgICAgICAgIGZvcmNlRW1pdDogdHJ1ZSxcbiAgICAgICAgICAgIGxhc3Q6IHRydWUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbktleURvd25fKGV2KSB7XG4gICAgICAgIGNvbnN0IHN0ZXAgPSBnZXRTdGVwRm9yS2V5KHRoaXMucHJvcHMuZ2V0KCdrZXlTY2FsZScpLCBnZXRIb3Jpem9udGFsU3RlcEtleXMoZXYpKTtcbiAgICAgICAgaWYgKHN0ZXAgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKHRoaXMudmFsdWUucmF3VmFsdWUgKyBzdGVwLCB7XG4gICAgICAgICAgICBmb3JjZUVtaXQ6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbktleVVwXyhldikge1xuICAgICAgICBjb25zdCBzdGVwID0gZ2V0U3RlcEZvcktleSh0aGlzLnByb3BzLmdldCgna2V5U2NhbGUnKSwgZ2V0SG9yaXpvbnRhbFN0ZXBLZXlzKGV2KSk7XG4gICAgICAgIGlmIChzdGVwID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZSh0aGlzLnZhbHVlLnJhd1ZhbHVlLCB7XG4gICAgICAgICAgICBmb3JjZUVtaXQ6IHRydWUsXG4gICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IGNuJGYgPSBDbGFzc05hbWUoJ3NsZHR4dCcpO1xuY2xhc3MgU2xpZGVyVGV4dFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY24kZigpKTtcbiAgICAgICAgY29uc3Qgc2xpZGVyRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2xpZGVyRWxlbS5jbGFzc0xpc3QuYWRkKGNuJGYoJ3MnKSk7XG4gICAgICAgIHRoaXMuc2xpZGVyVmlld18gPSBjb25maWcuc2xpZGVyVmlldztcbiAgICAgICAgc2xpZGVyRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNsaWRlclZpZXdfLmVsZW1lbnQpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoc2xpZGVyRWxlbSk7XG4gICAgICAgIGNvbnN0IHRleHRFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0ZXh0RWxlbS5jbGFzc0xpc3QuYWRkKGNuJGYoJ3QnKSk7XG4gICAgICAgIHRoaXMudGV4dFZpZXdfID0gY29uZmlnLnRleHRWaWV3O1xuICAgICAgICB0ZXh0RWxlbS5hcHBlbmRDaGlsZCh0aGlzLnRleHRWaWV3Xy5lbGVtZW50KTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRleHRFbGVtKTtcbiAgICB9XG59XG5cbmNsYXNzIFNsaWRlclRleHRDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgIHRoaXMuc2xpZGVyQ18gPSBuZXcgU2xpZGVyQ29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgIHByb3BzOiBjb25maWcuc2xpZGVyUHJvcHMsXG4gICAgICAgICAgICB2YWx1ZTogY29uZmlnLnZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGV4dENfID0gbmV3IE51bWJlclRleHRDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgcGFyc2VyOiBjb25maWcucGFyc2VyLFxuICAgICAgICAgICAgcHJvcHM6IGNvbmZpZy50ZXh0UHJvcHMsXG4gICAgICAgICAgICBzbGlkZXJQcm9wczogY29uZmlnLnNsaWRlclByb3BzLFxuICAgICAgICAgICAgdmFsdWU6IGNvbmZpZy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogY29uZmlnLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBTbGlkZXJUZXh0Vmlldyhkb2MsIHtcbiAgICAgICAgICAgIHNsaWRlclZpZXc6IHRoaXMuc2xpZGVyQ18udmlldyxcbiAgICAgICAgICAgIHRleHRWaWV3OiB0aGlzLnRleHRDXy52aWV3LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IHNsaWRlckNvbnRyb2xsZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWRlckNfO1xuICAgIH1cbiAgICBnZXQgdGV4dENvbnRyb2xsZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHRDXztcbiAgICB9XG4gICAgaW1wb3J0UHJvcHMoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIGltcG9ydEJsYWRlU3RhdGUoc3RhdGUsIG51bGwsIChwKSA9PiAoe1xuICAgICAgICAgICAgbWF4OiBwLnJlcXVpcmVkLm51bWJlcixcbiAgICAgICAgICAgIG1pbjogcC5yZXF1aXJlZC5udW1iZXIsXG4gICAgICAgIH0pLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzbGlkZXJQcm9wcyA9IHRoaXMuc2xpZGVyQ18ucHJvcHM7XG4gICAgICAgICAgICBzbGlkZXJQcm9wcy5zZXQoJ21heCcsIHJlc3VsdC5tYXgpO1xuICAgICAgICAgICAgc2xpZGVyUHJvcHMuc2V0KCdtaW4nLCByZXN1bHQubWluKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZXhwb3J0UHJvcHMoKSB7XG4gICAgICAgIGNvbnN0IHNsaWRlclByb3BzID0gdGhpcy5zbGlkZXJDXy5wcm9wcztcbiAgICAgICAgcmV0dXJuIGV4cG9ydEJsYWRlU3RhdGUobnVsbCwge1xuICAgICAgICAgICAgbWF4OiBzbGlkZXJQcm9wcy5nZXQoJ21heCcpLFxuICAgICAgICAgICAgbWluOiBzbGlkZXJQcm9wcy5nZXQoJ21pbicpLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVTbGlkZXJUZXh0UHJvcHMoY29uZmlnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2xpZGVyUHJvcHM6IG5ldyBWYWx1ZU1hcCh7XG4gICAgICAgICAgICBrZXlTY2FsZTogY29uZmlnLmtleVNjYWxlLFxuICAgICAgICAgICAgbWF4OiBjb25maWcubWF4LFxuICAgICAgICAgICAgbWluOiBjb25maWcubWluLFxuICAgICAgICB9KSxcbiAgICAgICAgdGV4dFByb3BzOiBuZXcgVmFsdWVNYXAoe1xuICAgICAgICAgICAgZm9ybWF0dGVyOiBjcmVhdGVWYWx1ZShjb25maWcuZm9ybWF0dGVyKSxcbiAgICAgICAgICAgIGtleVNjYWxlOiBjb25maWcua2V5U2NhbGUsXG4gICAgICAgICAgICBwb2ludGVyU2NhbGU6IGNyZWF0ZVZhbHVlKGNvbmZpZy5wb2ludGVyU2NhbGUpLFxuICAgICAgICB9KSxcbiAgICB9O1xufVxuXG5jb25zdCBDU1NfVkFSX01BUCA9IHtcbiAgICBjb250YWluZXJVbml0U2l6ZTogJ2NudC11c3onLFxufTtcbmZ1bmN0aW9uIGdldENzc1ZhcihrZXkpIHtcbiAgICByZXR1cm4gYC0tJHtDU1NfVkFSX01BUFtrZXldfWA7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBvaW50RGltZW5zaW9uUGFyc2VyKHApIHtcbiAgICByZXR1cm4gY3JlYXRlTnVtYmVyVGV4dElucHV0UGFyYW1zUGFyc2VyKHApO1xufVxuZnVuY3Rpb24gcGFyc2VQb2ludERpbWVuc2lvblBhcmFtcyh2YWx1ZSkge1xuICAgIGlmICghaXNSZWNvcmQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZVJlY29yZCh2YWx1ZSwgY3JlYXRlUG9pbnREaW1lbnNpb25QYXJzZXIpO1xufVxuZnVuY3Rpb24gY3JlYXRlRGltZW5zaW9uQ29uc3RyYWludChwYXJhbXMsIGluaXRpYWxWYWx1ZSkge1xuICAgIGlmICghcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IGNvbnN0cmFpbnRzID0gW107XG4gICAgY29uc3QgY3MgPSBjcmVhdGVTdGVwQ29uc3RyYWludChwYXJhbXMsIGluaXRpYWxWYWx1ZSk7XG4gICAgaWYgKGNzKSB7XG4gICAgICAgIGNvbnN0cmFpbnRzLnB1c2goY3MpO1xuICAgIH1cbiAgICBjb25zdCBycyA9IGNyZWF0ZVJhbmdlQ29uc3RyYWludChwYXJhbXMpO1xuICAgIGlmIChycykge1xuICAgICAgICBjb25zdHJhaW50cy5wdXNoKHJzKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDb21wb3NpdGVDb25zdHJhaW50KGNvbnN0cmFpbnRzKTtcbn1cblxuZnVuY3Rpb24gaXNDb21wYXRpYmxlKHZlcikge1xuICAgIGlmICghdmVyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHZlci5tYWpvciA9PT0gVkVSU0lPTiQxLm1ham9yO1xufVxuXG5mdW5jdGlvbiBwYXJzZVBpY2tlckxheW91dCh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gJ2lubGluZScgfHwgdmFsdWUgPT09ICdwb3B1cCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB3cml0ZVByaW1pdGl2ZSh0YXJnZXQsIHZhbHVlKSB7XG4gICAgdGFyZ2V0LndyaXRlKHZhbHVlKTtcbn1cblxuY29uc3QgY24kZSA9IENsYXNzTmFtZSgnY2tiJyk7XG5jbGFzcyBDaGVja2JveFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZV8gPSB0aGlzLm9uVmFsdWVDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY24kZSgpKTtcbiAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgY29uc3QgbGFiZWxFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGxhYmVsRWxlbS5jbGFzc0xpc3QuYWRkKGNuJGUoJ2wnKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbEVsZW0pO1xuICAgICAgICB0aGlzLmxhYmVsRWxlbWVudCA9IGxhYmVsRWxlbTtcbiAgICAgICAgY29uc3QgaW5wdXRFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0RWxlbS5jbGFzc0xpc3QuYWRkKGNuJGUoJ2knKSk7XG4gICAgICAgIGlucHV0RWxlbS50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgICAgdGhpcy5sYWJlbEVsZW1lbnQuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtKTtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQgPSBpbnB1dEVsZW07XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZERpc2FibGVkKHRoaXMuaW5wdXRFbGVtZW50KTtcbiAgICAgICAgY29uc3Qgd3JhcHBlckVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHdyYXBwZXJFbGVtLmNsYXNzTGlzdC5hZGQoY24kZSgndycpKTtcbiAgICAgICAgdGhpcy5sYWJlbEVsZW1lbnQuYXBwZW5kQ2hpbGQod3JhcHBlckVsZW0pO1xuICAgICAgICBjb25zdCBtYXJrRWxlbSA9IGNyZWF0ZVN2Z0ljb25FbGVtZW50KGRvYywgJ2NoZWNrJyk7XG4gICAgICAgIHdyYXBwZXJFbGVtLmFwcGVuZENoaWxkKG1hcmtFbGVtKTtcbiAgICAgICAgY29uZmlnLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25WYWx1ZUNoYW5nZV8pO1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICB9XG4gICAgdXBkYXRlXygpIHtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQuY2hlY2tlZCA9IHRoaXMudmFsdWUucmF3VmFsdWU7XG4gICAgfVxuICAgIG9uVmFsdWVDaGFuZ2VfKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICB9XG59XG5cbmNsYXNzIENoZWNrYm94Q29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5vbklucHV0Q2hhbmdlXyA9IHRoaXMub25JbnB1dENoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkxhYmVsTW91c2VEb3duXyA9IHRoaXMub25MYWJlbE1vdXNlRG93bl8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgQ2hlY2tib3hWaWV3KGRvYywge1xuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aWV3LmlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLm9uSW5wdXRDaGFuZ2VfKTtcbiAgICAgICAgdGhpcy52aWV3LmxhYmVsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTGFiZWxNb3VzZURvd25fKTtcbiAgICB9XG4gICAgb25JbnB1dENoYW5nZV8oZXYpIHtcbiAgICAgICAgY29uc3QgaW5wdXRFbGVtID0gZm9yY2VDYXN0KGV2LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICB0aGlzLnZhbHVlLnJhd1ZhbHVlID0gaW5wdXRFbGVtLmNoZWNrZWQ7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICBvbkxhYmVsTW91c2VEb3duXyhldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29uc3RyYWludCQ2KHBhcmFtcykge1xuICAgIGNvbnN0IGNvbnN0cmFpbnRzID0gW107XG4gICAgY29uc3QgbGMgPSBjcmVhdGVMaXN0Q29uc3RyYWludChwYXJhbXMub3B0aW9ucyk7XG4gICAgaWYgKGxjKSB7XG4gICAgICAgIGNvbnN0cmFpbnRzLnB1c2gobGMpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IENvbXBvc2l0ZUNvbnN0cmFpbnQoY29uc3RyYWludHMpO1xufVxuY29uc3QgQm9vbGVhbklucHV0UGx1Z2luID0gY3JlYXRlUGx1Z2luKHtcbiAgICBpZDogJ2lucHV0LWJvb2wnLFxuICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgYWNjZXB0OiAodmFsdWUsIHBhcmFtcykgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUmVjb3JkKHBhcmFtcywgKHApID0+ICh7XG4gICAgICAgICAgICBvcHRpb25zOiBwLm9wdGlvbmFsLmN1c3RvbShwYXJzZUxpc3RPcHRpb25zKSxcbiAgICAgICAgICAgIHJlYWRvbmx5OiBwLm9wdGlvbmFsLmNvbnN0YW50KGZhbHNlKSxcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH0sXG4gICAgYmluZGluZzoge1xuICAgICAgICByZWFkZXI6IChfYXJncykgPT4gYm9vbEZyb21Vbmtub3duLFxuICAgICAgICBjb25zdHJhaW50OiAoYXJncykgPT4gY3JlYXRlQ29uc3RyYWludCQ2KGFyZ3MucGFyYW1zKSxcbiAgICAgICAgd3JpdGVyOiAoX2FyZ3MpID0+IHdyaXRlUHJpbWl0aXZlLFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogKGFyZ3MpID0+IHtcbiAgICAgICAgY29uc3QgZG9jID0gYXJncy5kb2N1bWVudDtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBhcmdzLnZhbHVlO1xuICAgICAgICBjb25zdCBjID0gYXJncy5jb25zdHJhaW50O1xuICAgICAgICBjb25zdCBsYyA9IGMgJiYgZmluZENvbnN0cmFpbnQoYywgTGlzdENvbnN0cmFpbnQpO1xuICAgICAgICBpZiAobGMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGlzdENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgcHJvcHM6IG5ldyBWYWx1ZU1hcCh7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGxjLnZhbHVlcy52YWx1ZSgnb3B0aW9ucycpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBDaGVja2JveENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGFwaShhcmdzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXJncy5jb250cm9sbGVyLnZhbHVlLnJhd1ZhbHVlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLmNvbnRyb2xsZXIudmFsdWVDb250cm9sbGVyIGluc3RhbmNlb2YgTGlzdENvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGlzdElucHV0QmluZGluZ0FwaShhcmdzLmNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG59KTtcblxuY29uc3QgY24kZCA9IENsYXNzTmFtZSgnY29sJyk7XG5jbGFzcyBDb2xvclZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY24kZCgpKTtcbiAgICAgICAgY29uZmlnLmZvbGRhYmxlLmJpbmRFeHBhbmRlZENsYXNzKHRoaXMuZWxlbWVudCwgY24kZCh1bmRlZmluZWQsICdleHBhbmRlZCcpKTtcbiAgICAgICAgYmluZFZhbHVlTWFwKGNvbmZpZy5mb2xkYWJsZSwgJ2NvbXBsZXRlZCcsIHZhbHVlVG9DbGFzc05hbWUodGhpcy5lbGVtZW50LCBjbiRkKHVuZGVmaW5lZCwgJ2NwbCcpKSk7XG4gICAgICAgIGNvbnN0IGhlYWRFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoZWFkRWxlbS5jbGFzc0xpc3QuYWRkKGNuJGQoJ2gnKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChoZWFkRWxlbSk7XG4gICAgICAgIGNvbnN0IHN3YXRjaEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN3YXRjaEVsZW0uY2xhc3NMaXN0LmFkZChjbiRkKCdzJykpO1xuICAgICAgICBoZWFkRWxlbS5hcHBlbmRDaGlsZChzd2F0Y2hFbGVtKTtcbiAgICAgICAgdGhpcy5zd2F0Y2hFbGVtZW50ID0gc3dhdGNoRWxlbTtcbiAgICAgICAgY29uc3QgdGV4dEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRleHRFbGVtLmNsYXNzTGlzdC5hZGQoY24kZCgndCcpKTtcbiAgICAgICAgaGVhZEVsZW0uYXBwZW5kQ2hpbGQodGV4dEVsZW0pO1xuICAgICAgICB0aGlzLnRleHRFbGVtZW50ID0gdGV4dEVsZW07XG4gICAgICAgIGlmIChjb25maWcucGlja2VyTGF5b3V0ID09PSAnaW5saW5lJykge1xuICAgICAgICAgICAgY29uc3QgcGlja2VyRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHBpY2tlckVsZW0uY2xhc3NMaXN0LmFkZChjbiRkKCdwJykpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBpY2tlckVsZW0pO1xuICAgICAgICAgICAgdGhpcy5waWNrZXJFbGVtZW50ID0gcGlja2VyRWxlbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGlja2VyRWxlbWVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJnYlRvSHNsSW50KHIsIGcsIGIpIHtcbiAgICBjb25zdCBycCA9IGNvbnN0cmFpblJhbmdlKHIgLyAyNTUsIDAsIDEpO1xuICAgIGNvbnN0IGdwID0gY29uc3RyYWluUmFuZ2UoZyAvIDI1NSwgMCwgMSk7XG4gICAgY29uc3QgYnAgPSBjb25zdHJhaW5SYW5nZShiIC8gMjU1LCAwLCAxKTtcbiAgICBjb25zdCBjbWF4ID0gTWF0aC5tYXgocnAsIGdwLCBicCk7XG4gICAgY29uc3QgY21pbiA9IE1hdGgubWluKHJwLCBncCwgYnApO1xuICAgIGNvbnN0IGMgPSBjbWF4IC0gY21pbjtcbiAgICBsZXQgaCA9IDA7XG4gICAgbGV0IHMgPSAwO1xuICAgIGNvbnN0IGwgPSAoY21pbiArIGNtYXgpIC8gMjtcbiAgICBpZiAoYyAhPT0gMCkge1xuICAgICAgICBzID0gYyAvICgxIC0gTWF0aC5hYnMoY21heCArIGNtaW4gLSAxKSk7XG4gICAgICAgIGlmIChycCA9PT0gY21heCkge1xuICAgICAgICAgICAgaCA9IChncCAtIGJwKSAvIGM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZ3AgPT09IGNtYXgpIHtcbiAgICAgICAgICAgIGggPSAyICsgKGJwIC0gcnApIC8gYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGggPSA0ICsgKHJwIC0gZ3ApIC8gYztcbiAgICAgICAgfVxuICAgICAgICBoID0gaCAvIDYgKyAoaCA8IDAgPyAxIDogMCk7XG4gICAgfVxuICAgIHJldHVybiBbaCAqIDM2MCwgcyAqIDEwMCwgbCAqIDEwMF07XG59XG5mdW5jdGlvbiBoc2xUb1JnYkludChoLCBzLCBsKSB7XG4gICAgY29uc3QgaHAgPSAoKGggJSAzNjApICsgMzYwKSAlIDM2MDtcbiAgICBjb25zdCBzcCA9IGNvbnN0cmFpblJhbmdlKHMgLyAxMDAsIDAsIDEpO1xuICAgIGNvbnN0IGxwID0gY29uc3RyYWluUmFuZ2UobCAvIDEwMCwgMCwgMSk7XG4gICAgY29uc3QgYyA9ICgxIC0gTWF0aC5hYnMoMiAqIGxwIC0gMSkpICogc3A7XG4gICAgY29uc3QgeCA9IGMgKiAoMSAtIE1hdGguYWJzKCgoaHAgLyA2MCkgJSAyKSAtIDEpKTtcbiAgICBjb25zdCBtID0gbHAgLSBjIC8gMjtcbiAgICBsZXQgcnAsIGdwLCBicDtcbiAgICBpZiAoaHAgPj0gMCAmJiBocCA8IDYwKSB7XG4gICAgICAgIFtycCwgZ3AsIGJwXSA9IFtjLCB4LCAwXTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaHAgPj0gNjAgJiYgaHAgPCAxMjApIHtcbiAgICAgICAgW3JwLCBncCwgYnBdID0gW3gsIGMsIDBdO1xuICAgIH1cbiAgICBlbHNlIGlmIChocCA+PSAxMjAgJiYgaHAgPCAxODApIHtcbiAgICAgICAgW3JwLCBncCwgYnBdID0gWzAsIGMsIHhdO1xuICAgIH1cbiAgICBlbHNlIGlmIChocCA+PSAxODAgJiYgaHAgPCAyNDApIHtcbiAgICAgICAgW3JwLCBncCwgYnBdID0gWzAsIHgsIGNdO1xuICAgIH1cbiAgICBlbHNlIGlmIChocCA+PSAyNDAgJiYgaHAgPCAzMDApIHtcbiAgICAgICAgW3JwLCBncCwgYnBdID0gW3gsIDAsIGNdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgW3JwLCBncCwgYnBdID0gW2MsIDAsIHhdO1xuICAgIH1cbiAgICByZXR1cm4gWyhycCArIG0pICogMjU1LCAoZ3AgKyBtKSAqIDI1NSwgKGJwICsgbSkgKiAyNTVdO1xufVxuZnVuY3Rpb24gcmdiVG9Ic3ZJbnQociwgZywgYikge1xuICAgIGNvbnN0IHJwID0gY29uc3RyYWluUmFuZ2UociAvIDI1NSwgMCwgMSk7XG4gICAgY29uc3QgZ3AgPSBjb25zdHJhaW5SYW5nZShnIC8gMjU1LCAwLCAxKTtcbiAgICBjb25zdCBicCA9IGNvbnN0cmFpblJhbmdlKGIgLyAyNTUsIDAsIDEpO1xuICAgIGNvbnN0IGNtYXggPSBNYXRoLm1heChycCwgZ3AsIGJwKTtcbiAgICBjb25zdCBjbWluID0gTWF0aC5taW4ocnAsIGdwLCBicCk7XG4gICAgY29uc3QgZCA9IGNtYXggLSBjbWluO1xuICAgIGxldCBoO1xuICAgIGlmIChkID09PSAwKSB7XG4gICAgICAgIGggPSAwO1xuICAgIH1cbiAgICBlbHNlIGlmIChjbWF4ID09PSBycCkge1xuICAgICAgICBoID0gNjAgKiAoKCgoKGdwIC0gYnApIC8gZCkgJSA2KSArIDYpICUgNik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNtYXggPT09IGdwKSB7XG4gICAgICAgIGggPSA2MCAqICgoYnAgLSBycCkgLyBkICsgMik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBoID0gNjAgKiAoKHJwIC0gZ3ApIC8gZCArIDQpO1xuICAgIH1cbiAgICBjb25zdCBzID0gY21heCA9PT0gMCA/IDAgOiBkIC8gY21heDtcbiAgICBjb25zdCB2ID0gY21heDtcbiAgICByZXR1cm4gW2gsIHMgKiAxMDAsIHYgKiAxMDBdO1xufVxuZnVuY3Rpb24gaHN2VG9SZ2JJbnQoaCwgcywgdikge1xuICAgIGNvbnN0IGhwID0gbG9vcFJhbmdlKGgsIDM2MCk7XG4gICAgY29uc3Qgc3AgPSBjb25zdHJhaW5SYW5nZShzIC8gMTAwLCAwLCAxKTtcbiAgICBjb25zdCB2cCA9IGNvbnN0cmFpblJhbmdlKHYgLyAxMDAsIDAsIDEpO1xuICAgIGNvbnN0IGMgPSB2cCAqIHNwO1xuICAgIGNvbnN0IHggPSBjICogKDEgLSBNYXRoLmFicygoKGhwIC8gNjApICUgMikgLSAxKSk7XG4gICAgY29uc3QgbSA9IHZwIC0gYztcbiAgICBsZXQgcnAsIGdwLCBicDtcbiAgICBpZiAoaHAgPj0gMCAmJiBocCA8IDYwKSB7XG4gICAgICAgIFtycCwgZ3AsIGJwXSA9IFtjLCB4LCAwXTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaHAgPj0gNjAgJiYgaHAgPCAxMjApIHtcbiAgICAgICAgW3JwLCBncCwgYnBdID0gW3gsIGMsIDBdO1xuICAgIH1cbiAgICBlbHNlIGlmIChocCA+PSAxMjAgJiYgaHAgPCAxODApIHtcbiAgICAgICAgW3JwLCBncCwgYnBdID0gWzAsIGMsIHhdO1xuICAgIH1cbiAgICBlbHNlIGlmIChocCA+PSAxODAgJiYgaHAgPCAyNDApIHtcbiAgICAgICAgW3JwLCBncCwgYnBdID0gWzAsIHgsIGNdO1xuICAgIH1cbiAgICBlbHNlIGlmIChocCA+PSAyNDAgJiYgaHAgPCAzMDApIHtcbiAgICAgICAgW3JwLCBncCwgYnBdID0gW3gsIDAsIGNdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgW3JwLCBncCwgYnBdID0gW2MsIDAsIHhdO1xuICAgIH1cbiAgICByZXR1cm4gWyhycCArIG0pICogMjU1LCAoZ3AgKyBtKSAqIDI1NSwgKGJwICsgbSkgKiAyNTVdO1xufVxuZnVuY3Rpb24gaHNsVG9Ic3ZJbnQoaCwgcywgbCkge1xuICAgIGNvbnN0IHNkID0gbCArIChzICogKDEwMCAtIE1hdGguYWJzKDIgKiBsIC0gMTAwKSkpIC8gKDIgKiAxMDApO1xuICAgIHJldHVybiBbXG4gICAgICAgIGgsXG4gICAgICAgIHNkICE9PSAwID8gKHMgKiAoMTAwIC0gTWF0aC5hYnMoMiAqIGwgLSAxMDApKSkgLyBzZCA6IDAsXG4gICAgICAgIGwgKyAocyAqICgxMDAgLSBNYXRoLmFicygyICogbCAtIDEwMCkpKSAvICgyICogMTAwKSxcbiAgICBdO1xufVxuZnVuY3Rpb24gaHN2VG9Ic2xJbnQoaCwgcywgdikge1xuICAgIGNvbnN0IHNkID0gMTAwIC0gTWF0aC5hYnMoKHYgKiAoMjAwIC0gcykpIC8gMTAwIC0gMTAwKTtcbiAgICByZXR1cm4gW2gsIHNkICE9PSAwID8gKHMgKiB2KSAvIHNkIDogMCwgKHYgKiAoMjAwIC0gcykpIC8gKDIgKiAxMDApXTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUFscGhhQ29tcG9uZW50KGNvbXBzKSB7XG4gICAgcmV0dXJuIFtjb21wc1swXSwgY29tcHNbMV0sIGNvbXBzWzJdXTtcbn1cbmZ1bmN0aW9uIGFwcGVuZEFscGhhQ29tcG9uZW50KGNvbXBzLCBhbHBoYSkge1xuICAgIHJldHVybiBbY29tcHNbMF0sIGNvbXBzWzFdLCBjb21wc1syXSwgYWxwaGFdO1xufVxuY29uc3QgTU9ERV9DT05WRVJURVJfTUFQID0ge1xuICAgIGhzbDoge1xuICAgICAgICBoc2w6IChoLCBzLCBsKSA9PiBbaCwgcywgbF0sXG4gICAgICAgIGhzdjogaHNsVG9Ic3ZJbnQsXG4gICAgICAgIHJnYjogaHNsVG9SZ2JJbnQsXG4gICAgfSxcbiAgICBoc3Y6IHtcbiAgICAgICAgaHNsOiBoc3ZUb0hzbEludCxcbiAgICAgICAgaHN2OiAoaCwgcywgdikgPT4gW2gsIHMsIHZdLFxuICAgICAgICByZ2I6IGhzdlRvUmdiSW50LFxuICAgIH0sXG4gICAgcmdiOiB7XG4gICAgICAgIGhzbDogcmdiVG9Ic2xJbnQsXG4gICAgICAgIGhzdjogcmdiVG9Ic3ZJbnQsXG4gICAgICAgIHJnYjogKHIsIGcsIGIpID0+IFtyLCBnLCBiXSxcbiAgICB9LFxufTtcbmZ1bmN0aW9uIGdldENvbG9yTWF4Q29tcG9uZW50cyhtb2RlLCB0eXBlKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgdHlwZSA9PT0gJ2Zsb2F0JyA/IDEgOiBtb2RlID09PSAncmdiJyA/IDI1NSA6IDM2MCxcbiAgICAgICAgdHlwZSA9PT0gJ2Zsb2F0JyA/IDEgOiBtb2RlID09PSAncmdiJyA/IDI1NSA6IDEwMCxcbiAgICAgICAgdHlwZSA9PT0gJ2Zsb2F0JyA/IDEgOiBtb2RlID09PSAncmdiJyA/IDI1NSA6IDEwMCxcbiAgICBdO1xufVxuZnVuY3Rpb24gbG9vcEh1ZVJhbmdlKGh1ZSwgbWF4KSB7XG4gICAgcmV0dXJuIGh1ZSA9PT0gbWF4ID8gbWF4IDogbG9vcFJhbmdlKGh1ZSwgbWF4KTtcbn1cbmZ1bmN0aW9uIGNvbnN0cmFpbkNvbG9yQ29tcG9uZW50cyhjb21wb25lbnRzLCBtb2RlLCB0eXBlKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IG1zID0gZ2V0Q29sb3JNYXhDb21wb25lbnRzKG1vZGUsIHR5cGUpO1xuICAgIHJldHVybiBbXG4gICAgICAgIG1vZGUgPT09ICdyZ2InXG4gICAgICAgICAgICA/IGNvbnN0cmFpblJhbmdlKGNvbXBvbmVudHNbMF0sIDAsIG1zWzBdKVxuICAgICAgICAgICAgOiBsb29wSHVlUmFuZ2UoY29tcG9uZW50c1swXSwgbXNbMF0pLFxuICAgICAgICBjb25zdHJhaW5SYW5nZShjb21wb25lbnRzWzFdLCAwLCBtc1sxXSksXG4gICAgICAgIGNvbnN0cmFpblJhbmdlKGNvbXBvbmVudHNbMl0sIDAsIG1zWzJdKSxcbiAgICAgICAgY29uc3RyYWluUmFuZ2UoKF9hID0gY29tcG9uZW50c1szXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMSwgMCwgMSksXG4gICAgXTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRDb2xvclR5cGUoY29tcHMsIG1vZGUsIGZyb20sIHRvKSB7XG4gICAgY29uc3QgZm1zID0gZ2V0Q29sb3JNYXhDb21wb25lbnRzKG1vZGUsIGZyb20pO1xuICAgIGNvbnN0IHRtcyA9IGdldENvbG9yTWF4Q29tcG9uZW50cyhtb2RlLCB0byk7XG4gICAgcmV0dXJuIGNvbXBzLm1hcCgoYywgaW5kZXgpID0+IChjIC8gZm1zW2luZGV4XSkgKiB0bXNbaW5kZXhdKTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRDb2xvcihjb21wb25lbnRzLCBmcm9tLCB0bykge1xuICAgIGNvbnN0IGludENvbXBzID0gY29udmVydENvbG9yVHlwZShjb21wb25lbnRzLCBmcm9tLm1vZGUsIGZyb20udHlwZSwgJ2ludCcpO1xuICAgIGNvbnN0IHJlc3VsdCA9IE1PREVfQ09OVkVSVEVSX01BUFtmcm9tLm1vZGVdW3RvLm1vZGVdKC4uLmludENvbXBzKTtcbiAgICByZXR1cm4gY29udmVydENvbG9yVHlwZShyZXN1bHQsIHRvLm1vZGUsICdpbnQnLCB0by50eXBlKTtcbn1cblxuY2xhc3MgSW50Q29sb3Ige1xuICAgIHN0YXRpYyBibGFjaygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRDb2xvcihbMCwgMCwgMF0sICdyZ2InKTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IoY29tcHMsIG1vZGUpIHtcbiAgICAgICAgdGhpcy50eXBlID0gJ2ludCc7XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMuY29tcHNfID0gY29uc3RyYWluQ29sb3JDb21wb25lbnRzKGNvbXBzLCBtb2RlLCB0aGlzLnR5cGUpO1xuICAgIH1cbiAgICBnZXRDb21wb25lbnRzKG9wdF9tb2RlKSB7XG4gICAgICAgIHJldHVybiBhcHBlbmRBbHBoYUNvbXBvbmVudChjb252ZXJ0Q29sb3IocmVtb3ZlQWxwaGFDb21wb25lbnQodGhpcy5jb21wc18pLCB7IG1vZGU6IHRoaXMubW9kZSwgdHlwZTogdGhpcy50eXBlIH0sIHsgbW9kZTogb3B0X21vZGUgIT09IG51bGwgJiYgb3B0X21vZGUgIT09IHZvaWQgMCA/IG9wdF9tb2RlIDogdGhpcy5tb2RlLCB0eXBlOiB0aGlzLnR5cGUgfSksIHRoaXMuY29tcHNfWzNdKTtcbiAgICB9XG4gICAgdG9SZ2JhT2JqZWN0KCkge1xuICAgICAgICBjb25zdCByZ2JDb21wcyA9IHRoaXMuZ2V0Q29tcG9uZW50cygncmdiJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiByZ2JDb21wc1swXSxcbiAgICAgICAgICAgIGc6IHJnYkNvbXBzWzFdLFxuICAgICAgICAgICAgYjogcmdiQ29tcHNbMl0sXG4gICAgICAgICAgICBhOiByZ2JDb21wc1szXSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmNvbnN0IGNuJGMgPSBDbGFzc05hbWUoJ2NvbHAnKTtcbmNsYXNzIENvbG9yUGlja2VyVmlldyB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5hbHBoYVZpZXdzXyA9IG51bGw7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY24kYygpKTtcbiAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgY29uc3QgaHN2RWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaHN2RWxlbS5jbGFzc0xpc3QuYWRkKGNuJGMoJ2hzdicpKTtcbiAgICAgICAgY29uc3Qgc3ZFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdkVsZW0uY2xhc3NMaXN0LmFkZChjbiRjKCdzdicpKTtcbiAgICAgICAgdGhpcy5zdlBhbGV0dGVWaWV3XyA9IGNvbmZpZy5zdlBhbGV0dGVWaWV3O1xuICAgICAgICBzdkVsZW0uYXBwZW5kQ2hpbGQodGhpcy5zdlBhbGV0dGVWaWV3Xy5lbGVtZW50KTtcbiAgICAgICAgaHN2RWxlbS5hcHBlbmRDaGlsZChzdkVsZW0pO1xuICAgICAgICBjb25zdCBoRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaEVsZW0uY2xhc3NMaXN0LmFkZChjbiRjKCdoJykpO1xuICAgICAgICB0aGlzLmhQYWxldHRlVmlld18gPSBjb25maWcuaFBhbGV0dGVWaWV3O1xuICAgICAgICBoRWxlbS5hcHBlbmRDaGlsZCh0aGlzLmhQYWxldHRlVmlld18uZWxlbWVudCk7XG4gICAgICAgIGhzdkVsZW0uYXBwZW5kQ2hpbGQoaEVsZW0pO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaHN2RWxlbSk7XG4gICAgICAgIGNvbnN0IHJnYkVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJnYkVsZW0uY2xhc3NMaXN0LmFkZChjbiRjKCdyZ2InKSk7XG4gICAgICAgIHRoaXMudGV4dHNWaWV3XyA9IGNvbmZpZy50ZXh0c1ZpZXc7XG4gICAgICAgIHJnYkVsZW0uYXBwZW5kQ2hpbGQodGhpcy50ZXh0c1ZpZXdfLmVsZW1lbnQpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocmdiRWxlbSk7XG4gICAgICAgIGlmIChjb25maWcuYWxwaGFWaWV3cykge1xuICAgICAgICAgICAgdGhpcy5hbHBoYVZpZXdzXyA9IHtcbiAgICAgICAgICAgICAgICBwYWxldHRlOiBjb25maWcuYWxwaGFWaWV3cy5wYWxldHRlLFxuICAgICAgICAgICAgICAgIHRleHQ6IGNvbmZpZy5hbHBoYVZpZXdzLnRleHQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgYUVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhRWxlbS5jbGFzc0xpc3QuYWRkKGNuJGMoJ2EnKSk7XG4gICAgICAgICAgICBjb25zdCBhcEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBhcEVsZW0uY2xhc3NMaXN0LmFkZChjbiRjKCdhcCcpKTtcbiAgICAgICAgICAgIGFwRWxlbS5hcHBlbmRDaGlsZCh0aGlzLmFscGhhVmlld3NfLnBhbGV0dGUuZWxlbWVudCk7XG4gICAgICAgICAgICBhRWxlbS5hcHBlbmRDaGlsZChhcEVsZW0pO1xuICAgICAgICAgICAgY29uc3QgYXRFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYXRFbGVtLmNsYXNzTGlzdC5hZGQoY24kYygnYXQnKSk7XG4gICAgICAgICAgICBhdEVsZW0uYXBwZW5kQ2hpbGQodGhpcy5hbHBoYVZpZXdzXy50ZXh0LmVsZW1lbnQpO1xuICAgICAgICAgICAgYUVsZW0uYXBwZW5kQ2hpbGQoYXRFbGVtKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChhRWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IGFsbEZvY3VzYWJsZUVsZW1lbnRzKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IFtcbiAgICAgICAgICAgIHRoaXMuc3ZQYWxldHRlVmlld18uZWxlbWVudCxcbiAgICAgICAgICAgIHRoaXMuaFBhbGV0dGVWaWV3Xy5lbGVtZW50LFxuICAgICAgICAgICAgdGhpcy50ZXh0c1ZpZXdfLm1vZGVTZWxlY3RFbGVtZW50LFxuICAgICAgICAgICAgLi4udGhpcy50ZXh0c1ZpZXdfLmlucHV0Vmlld3MubWFwKCh2KSA9PiB2LmlucHV0RWxlbWVudCksXG4gICAgICAgIF07XG4gICAgICAgIGlmICh0aGlzLmFscGhhVmlld3NfKSB7XG4gICAgICAgICAgICBlbGVtcy5wdXNoKHRoaXMuYWxwaGFWaWV3c18ucGFsZXR0ZS5lbGVtZW50LCB0aGlzLmFscGhhVmlld3NfLnRleHQuaW5wdXRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbXM7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUNvbG9yVHlwZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gJ2ludCcgPyAnaW50JyA6IHZhbHVlID09PSAnZmxvYXQnID8gJ2Zsb2F0JyA6IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIHBhcnNlQ29sb3JJbnB1dFBhcmFtcyhwYXJhbXMpIHtcbiAgICByZXR1cm4gcGFyc2VSZWNvcmQocGFyYW1zLCAocCkgPT4gKHtcbiAgICAgICAgY29sb3I6IHAub3B0aW9uYWwub2JqZWN0KHtcbiAgICAgICAgICAgIGFscGhhOiBwLm9wdGlvbmFsLmJvb2xlYW4sXG4gICAgICAgICAgICB0eXBlOiBwLm9wdGlvbmFsLmN1c3RvbShwYXJzZUNvbG9yVHlwZSksXG4gICAgICAgIH0pLFxuICAgICAgICBleHBhbmRlZDogcC5vcHRpb25hbC5ib29sZWFuLFxuICAgICAgICBwaWNrZXI6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlUGlja2VyTGF5b3V0KSxcbiAgICAgICAgcmVhZG9ubHk6IHAub3B0aW9uYWwuY29uc3RhbnQoZmFsc2UpLFxuICAgIH0pKTtcbn1cbmZ1bmN0aW9uIGdldEtleVNjYWxlRm9yQ29sb3IoZm9yQWxwaGEpIHtcbiAgICByZXR1cm4gZm9yQWxwaGEgPyAwLjEgOiAxO1xufVxuZnVuY3Rpb24gZXh0cmFjdENvbG9yVHlwZShwYXJhbXMpIHtcbiAgICB2YXIgX2E7XG4gICAgcmV0dXJuIChfYSA9IHBhcmFtcy5jb2xvcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnR5cGU7XG59XG5cbmNsYXNzIEZsb2F0Q29sb3Ige1xuICAgIGNvbnN0cnVjdG9yKGNvbXBzLCBtb2RlKSB7XG4gICAgICAgIHRoaXMudHlwZSA9ICdmbG9hdCc7XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMuY29tcHNfID0gY29uc3RyYWluQ29sb3JDb21wb25lbnRzKGNvbXBzLCBtb2RlLCB0aGlzLnR5cGUpO1xuICAgIH1cbiAgICBnZXRDb21wb25lbnRzKG9wdF9tb2RlKSB7XG4gICAgICAgIHJldHVybiBhcHBlbmRBbHBoYUNvbXBvbmVudChjb252ZXJ0Q29sb3IocmVtb3ZlQWxwaGFDb21wb25lbnQodGhpcy5jb21wc18pLCB7IG1vZGU6IHRoaXMubW9kZSwgdHlwZTogdGhpcy50eXBlIH0sIHsgbW9kZTogb3B0X21vZGUgIT09IG51bGwgJiYgb3B0X21vZGUgIT09IHZvaWQgMCA/IG9wdF9tb2RlIDogdGhpcy5tb2RlLCB0eXBlOiB0aGlzLnR5cGUgfSksIHRoaXMuY29tcHNfWzNdKTtcbiAgICB9XG4gICAgdG9SZ2JhT2JqZWN0KCkge1xuICAgICAgICBjb25zdCByZ2JDb21wcyA9IHRoaXMuZ2V0Q29tcG9uZW50cygncmdiJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiByZ2JDb21wc1swXSxcbiAgICAgICAgICAgIGc6IHJnYkNvbXBzWzFdLFxuICAgICAgICAgICAgYjogcmdiQ29tcHNbMl0sXG4gICAgICAgICAgICBhOiByZ2JDb21wc1szXSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmNvbnN0IFRZUEVfVE9fQ09OU1RSVUNUT1JfTUFQID0ge1xuICAgIGludDogKGNvbXBzLCBtb2RlKSA9PiBuZXcgSW50Q29sb3IoY29tcHMsIG1vZGUpLFxuICAgIGZsb2F0OiAoY29tcHMsIG1vZGUpID0+IG5ldyBGbG9hdENvbG9yKGNvbXBzLCBtb2RlKSxcbn07XG5mdW5jdGlvbiBjcmVhdGVDb2xvcihjb21wcywgbW9kZSwgdHlwZSkge1xuICAgIHJldHVybiBUWVBFX1RPX0NPTlNUUlVDVE9SX01BUFt0eXBlXShjb21wcywgbW9kZSk7XG59XG5mdW5jdGlvbiBpc0Zsb2F0Q29sb3IoYykge1xuICAgIHJldHVybiBjLnR5cGUgPT09ICdmbG9hdCc7XG59XG5mdW5jdGlvbiBpc0ludENvbG9yKGMpIHtcbiAgICByZXR1cm4gYy50eXBlID09PSAnaW50Jztcbn1cbmZ1bmN0aW9uIGNvbnZlcnRGbG9hdFRvSW50KGNmKSB7XG4gICAgY29uc3QgY29tcHMgPSBjZi5nZXRDb21wb25lbnRzKCk7XG4gICAgY29uc3QgbXMgPSBnZXRDb2xvck1heENvbXBvbmVudHMoY2YubW9kZSwgJ2ludCcpO1xuICAgIHJldHVybiBuZXcgSW50Q29sb3IoW1xuICAgICAgICBNYXRoLnJvdW5kKG1hcFJhbmdlKGNvbXBzWzBdLCAwLCAxLCAwLCBtc1swXSkpLFxuICAgICAgICBNYXRoLnJvdW5kKG1hcFJhbmdlKGNvbXBzWzFdLCAwLCAxLCAwLCBtc1sxXSkpLFxuICAgICAgICBNYXRoLnJvdW5kKG1hcFJhbmdlKGNvbXBzWzJdLCAwLCAxLCAwLCBtc1syXSkpLFxuICAgICAgICBjb21wc1szXSxcbiAgICBdLCBjZi5tb2RlKTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRJbnRUb0Zsb2F0KGNpKSB7XG4gICAgY29uc3QgY29tcHMgPSBjaS5nZXRDb21wb25lbnRzKCk7XG4gICAgY29uc3QgbXMgPSBnZXRDb2xvck1heENvbXBvbmVudHMoY2kubW9kZSwgJ2ludCcpO1xuICAgIHJldHVybiBuZXcgRmxvYXRDb2xvcihbXG4gICAgICAgIG1hcFJhbmdlKGNvbXBzWzBdLCAwLCBtc1swXSwgMCwgMSksXG4gICAgICAgIG1hcFJhbmdlKGNvbXBzWzFdLCAwLCBtc1sxXSwgMCwgMSksXG4gICAgICAgIG1hcFJhbmdlKGNvbXBzWzJdLCAwLCBtc1syXSwgMCwgMSksXG4gICAgICAgIGNvbXBzWzNdLFxuICAgIF0sIGNpLm1vZGUpO1xufVxuZnVuY3Rpb24gbWFwQ29sb3JUeXBlKGMsIHR5cGUpIHtcbiAgICBpZiAoYy50eXBlID09PSB0eXBlKSB7XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cbiAgICBpZiAoaXNJbnRDb2xvcihjKSAmJiB0eXBlID09PSAnZmxvYXQnKSB7XG4gICAgICAgIHJldHVybiBjb252ZXJ0SW50VG9GbG9hdChjKTtcbiAgICB9XG4gICAgaWYgKGlzRmxvYXRDb2xvcihjKSAmJiB0eXBlID09PSAnaW50Jykge1xuICAgICAgICByZXR1cm4gY29udmVydEZsb2F0VG9JbnQoYyk7XG4gICAgfVxuICAgIHRocm93IFRwRXJyb3Iuc2hvdWxkTmV2ZXJIYXBwZW4oKTtcbn1cblxuZnVuY3Rpb24gZXF1YWxzU3RyaW5nQ29sb3JGb3JtYXQoZjEsIGYyKSB7XG4gICAgcmV0dXJuIChmMS5hbHBoYSA9PT0gZjIuYWxwaGEgJiZcbiAgICAgICAgZjEubW9kZSA9PT0gZjIubW9kZSAmJlxuICAgICAgICBmMS5ub3RhdGlvbiA9PT0gZjIubm90YXRpb24gJiZcbiAgICAgICAgZjEudHlwZSA9PT0gZjIudHlwZSk7XG59XG5mdW5jdGlvbiBwYXJzZUNzc051bWJlck9yUGVyY2VudGFnZSh0ZXh0LCBtYXgpIHtcbiAgICBjb25zdCBtID0gdGV4dC5tYXRjaCgvXiguKyklJC8pO1xuICAgIGlmICghbSkge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4ocGFyc2VGbG9hdCh0ZXh0KSwgbWF4KTtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgubWluKHBhcnNlRmxvYXQobVsxXSkgKiAwLjAxICogbWF4LCBtYXgpO1xufVxuY29uc3QgQU5HTEVfVE9fREVHX01BUCA9IHtcbiAgICBkZWc6IChhbmdsZSkgPT4gYW5nbGUsXG4gICAgZ3JhZDogKGFuZ2xlKSA9PiAoYW5nbGUgKiAzNjApIC8gNDAwLFxuICAgIHJhZDogKGFuZ2xlKSA9PiAoYW5nbGUgKiAzNjApIC8gKDIgKiBNYXRoLlBJKSxcbiAgICB0dXJuOiAoYW5nbGUpID0+IGFuZ2xlICogMzYwLFxufTtcbmZ1bmN0aW9uIHBhcnNlQ3NzTnVtYmVyT3JBbmdsZSh0ZXh0KSB7XG4gICAgY29uc3QgbSA9IHRleHQubWF0Y2goL14oWzAtOS5dKz8pKGRlZ3xncmFkfHJhZHx0dXJuKSQvKTtcbiAgICBpZiAoIW0pIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodGV4dCk7XG4gICAgfVxuICAgIGNvbnN0IGFuZ2xlID0gcGFyc2VGbG9hdChtWzFdKTtcbiAgICBjb25zdCB1bml0ID0gbVsyXTtcbiAgICByZXR1cm4gQU5HTEVfVE9fREVHX01BUFt1bml0XShhbmdsZSk7XG59XG5mdW5jdGlvbiBwYXJzZUZ1bmN0aW9uYWxSZ2JDb2xvckNvbXBvbmVudHModGV4dCkge1xuICAgIGNvbnN0IG0gPSB0ZXh0Lm1hdGNoKC9ecmdiXFwoXFxzKihbMC05QS1GYS1mLl0rJT8pXFxzKixcXHMqKFswLTlBLUZhLWYuXSslPylcXHMqLFxccyooWzAtOUEtRmEtZi5dKyU/KVxccypcXCkkLyk7XG4gICAgaWYgKCFtKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBjb21wcyA9IFtcbiAgICAgICAgcGFyc2VDc3NOdW1iZXJPclBlcmNlbnRhZ2UobVsxXSwgMjU1KSxcbiAgICAgICAgcGFyc2VDc3NOdW1iZXJPclBlcmNlbnRhZ2UobVsyXSwgMjU1KSxcbiAgICAgICAgcGFyc2VDc3NOdW1iZXJPclBlcmNlbnRhZ2UobVszXSwgMjU1KSxcbiAgICBdO1xuICAgIGlmIChpc05hTihjb21wc1swXSkgfHwgaXNOYU4oY29tcHNbMV0pIHx8IGlzTmFOKGNvbXBzWzJdKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBzO1xufVxuZnVuY3Rpb24gcGFyc2VGdW5jdGlvbmFsUmdiQ29sb3IodGV4dCkge1xuICAgIGNvbnN0IGNvbXBzID0gcGFyc2VGdW5jdGlvbmFsUmdiQ29sb3JDb21wb25lbnRzKHRleHQpO1xuICAgIHJldHVybiBjb21wcyA/IG5ldyBJbnRDb2xvcihjb21wcywgJ3JnYicpIDogbnVsbDtcbn1cbmZ1bmN0aW9uIHBhcnNlRnVuY3Rpb25hbFJnYmFDb2xvckNvbXBvbmVudHModGV4dCkge1xuICAgIGNvbnN0IG0gPSB0ZXh0Lm1hdGNoKC9ecmdiYVxcKFxccyooWzAtOUEtRmEtZi5dKyU/KVxccyosXFxzKihbMC05QS1GYS1mLl0rJT8pXFxzKixcXHMqKFswLTlBLUZhLWYuXSslPylcXHMqLFxccyooWzAtOUEtRmEtZi5dKyU/KVxccypcXCkkLyk7XG4gICAgaWYgKCFtKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBjb21wcyA9IFtcbiAgICAgICAgcGFyc2VDc3NOdW1iZXJPclBlcmNlbnRhZ2UobVsxXSwgMjU1KSxcbiAgICAgICAgcGFyc2VDc3NOdW1iZXJPclBlcmNlbnRhZ2UobVsyXSwgMjU1KSxcbiAgICAgICAgcGFyc2VDc3NOdW1iZXJPclBlcmNlbnRhZ2UobVszXSwgMjU1KSxcbiAgICAgICAgcGFyc2VDc3NOdW1iZXJPclBlcmNlbnRhZ2UobVs0XSwgMSksXG4gICAgXTtcbiAgICBpZiAoaXNOYU4oY29tcHNbMF0pIHx8XG4gICAgICAgIGlzTmFOKGNvbXBzWzFdKSB8fFxuICAgICAgICBpc05hTihjb21wc1syXSkgfHxcbiAgICAgICAgaXNOYU4oY29tcHNbM10pKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY29tcHM7XG59XG5mdW5jdGlvbiBwYXJzZUZ1bmN0aW9uYWxSZ2JhQ29sb3IodGV4dCkge1xuICAgIGNvbnN0IGNvbXBzID0gcGFyc2VGdW5jdGlvbmFsUmdiYUNvbG9yQ29tcG9uZW50cyh0ZXh0KTtcbiAgICByZXR1cm4gY29tcHMgPyBuZXcgSW50Q29sb3IoY29tcHMsICdyZ2InKSA6IG51bGw7XG59XG5mdW5jdGlvbiBwYXJzZUZ1bmN0aW9uYWxIc2xDb2xvckNvbXBvbmVudHModGV4dCkge1xuICAgIGNvbnN0IG0gPSB0ZXh0Lm1hdGNoKC9eaHNsXFwoXFxzKihbMC05QS1GYS1mLl0rKD86ZGVnfGdyYWR8cmFkfHR1cm4pPylcXHMqLFxccyooWzAtOUEtRmEtZi5dKyU/KVxccyosXFxzKihbMC05QS1GYS1mLl0rJT8pXFxzKlxcKSQvKTtcbiAgICBpZiAoIW0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBzID0gW1xuICAgICAgICBwYXJzZUNzc051bWJlck9yQW5nbGUobVsxXSksXG4gICAgICAgIHBhcnNlQ3NzTnVtYmVyT3JQZXJjZW50YWdlKG1bMl0sIDEwMCksXG4gICAgICAgIHBhcnNlQ3NzTnVtYmVyT3JQZXJjZW50YWdlKG1bM10sIDEwMCksXG4gICAgXTtcbiAgICBpZiAoaXNOYU4oY29tcHNbMF0pIHx8IGlzTmFOKGNvbXBzWzFdKSB8fCBpc05hTihjb21wc1syXSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjb21wcztcbn1cbmZ1bmN0aW9uIHBhcnNlRnVuY3Rpb25hbEhzbENvbG9yKHRleHQpIHtcbiAgICBjb25zdCBjb21wcyA9IHBhcnNlRnVuY3Rpb25hbEhzbENvbG9yQ29tcG9uZW50cyh0ZXh0KTtcbiAgICByZXR1cm4gY29tcHMgPyBuZXcgSW50Q29sb3IoY29tcHMsICdoc2wnKSA6IG51bGw7XG59XG5mdW5jdGlvbiBwYXJzZUhzbGFDb2xvckNvbXBvbmVudHModGV4dCkge1xuICAgIGNvbnN0IG0gPSB0ZXh0Lm1hdGNoKC9eaHNsYVxcKFxccyooWzAtOUEtRmEtZi5dKyg/OmRlZ3xncmFkfHJhZHx0dXJuKT8pXFxzKixcXHMqKFswLTlBLUZhLWYuXSslPylcXHMqLFxccyooWzAtOUEtRmEtZi5dKyU/KVxccyosXFxzKihbMC05QS1GYS1mLl0rJT8pXFxzKlxcKSQvKTtcbiAgICBpZiAoIW0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBzID0gW1xuICAgICAgICBwYXJzZUNzc051bWJlck9yQW5nbGUobVsxXSksXG4gICAgICAgIHBhcnNlQ3NzTnVtYmVyT3JQZXJjZW50YWdlKG1bMl0sIDEwMCksXG4gICAgICAgIHBhcnNlQ3NzTnVtYmVyT3JQZXJjZW50YWdlKG1bM10sIDEwMCksXG4gICAgICAgIHBhcnNlQ3NzTnVtYmVyT3JQZXJjZW50YWdlKG1bNF0sIDEpLFxuICAgIF07XG4gICAgaWYgKGlzTmFOKGNvbXBzWzBdKSB8fFxuICAgICAgICBpc05hTihjb21wc1sxXSkgfHxcbiAgICAgICAgaXNOYU4oY29tcHNbMl0pIHx8XG4gICAgICAgIGlzTmFOKGNvbXBzWzNdKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBzO1xufVxuZnVuY3Rpb24gcGFyc2VGdW5jdGlvbmFsSHNsYUNvbG9yKHRleHQpIHtcbiAgICBjb25zdCBjb21wcyA9IHBhcnNlSHNsYUNvbG9yQ29tcG9uZW50cyh0ZXh0KTtcbiAgICByZXR1cm4gY29tcHMgPyBuZXcgSW50Q29sb3IoY29tcHMsICdoc2wnKSA6IG51bGw7XG59XG5mdW5jdGlvbiBwYXJzZUhleFJnYkNvbG9yQ29tcG9uZW50cyh0ZXh0KSB7XG4gICAgY29uc3QgbVJnYiA9IHRleHQubWF0Y2goL14jKFswLTlBLUZhLWZdKShbMC05QS1GYS1mXSkoWzAtOUEtRmEtZl0pJC8pO1xuICAgIGlmIChtUmdiKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBwYXJzZUludChtUmdiWzFdICsgbVJnYlsxXSwgMTYpLFxuICAgICAgICAgICAgcGFyc2VJbnQobVJnYlsyXSArIG1SZ2JbMl0sIDE2KSxcbiAgICAgICAgICAgIHBhcnNlSW50KG1SZ2JbM10gKyBtUmdiWzNdLCAxNiksXG4gICAgICAgIF07XG4gICAgfVxuICAgIGNvbnN0IG1ScmdnYmIgPSB0ZXh0Lm1hdGNoKC9eKD86I3wweCkoWzAtOUEtRmEtZl17Mn0pKFswLTlBLUZhLWZdezJ9KShbMC05QS1GYS1mXXsyfSkkLyk7XG4gICAgaWYgKG1ScmdnYmIpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHBhcnNlSW50KG1ScmdnYmJbMV0sIDE2KSxcbiAgICAgICAgICAgIHBhcnNlSW50KG1ScmdnYmJbMl0sIDE2KSxcbiAgICAgICAgICAgIHBhcnNlSW50KG1ScmdnYmJbM10sIDE2KSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBwYXJzZUhleFJnYkNvbG9yKHRleHQpIHtcbiAgICBjb25zdCBjb21wcyA9IHBhcnNlSGV4UmdiQ29sb3JDb21wb25lbnRzKHRleHQpO1xuICAgIHJldHVybiBjb21wcyA/IG5ldyBJbnRDb2xvcihjb21wcywgJ3JnYicpIDogbnVsbDtcbn1cbmZ1bmN0aW9uIHBhcnNlSGV4UmdiYUNvbG9yQ29tcG9uZW50cyh0ZXh0KSB7XG4gICAgY29uc3QgbVJnYiA9IHRleHQubWF0Y2goL14jKFswLTlBLUZhLWZdKShbMC05QS1GYS1mXSkoWzAtOUEtRmEtZl0pKFswLTlBLUZhLWZdKSQvKTtcbiAgICBpZiAobVJnYikge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgcGFyc2VJbnQobVJnYlsxXSArIG1SZ2JbMV0sIDE2KSxcbiAgICAgICAgICAgIHBhcnNlSW50KG1SZ2JbMl0gKyBtUmdiWzJdLCAxNiksXG4gICAgICAgICAgICBwYXJzZUludChtUmdiWzNdICsgbVJnYlszXSwgMTYpLFxuICAgICAgICAgICAgbWFwUmFuZ2UocGFyc2VJbnQobVJnYls0XSArIG1SZ2JbNF0sIDE2KSwgMCwgMjU1LCAwLCAxKSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgY29uc3QgbVJyZ2diYiA9IHRleHQubWF0Y2goL14oPzojfDB4KT8oWzAtOUEtRmEtZl17Mn0pKFswLTlBLUZhLWZdezJ9KShbMC05QS1GYS1mXXsyfSkoWzAtOUEtRmEtZl17Mn0pJC8pO1xuICAgIGlmIChtUnJnZ2JiKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBwYXJzZUludChtUnJnZ2JiWzFdLCAxNiksXG4gICAgICAgICAgICBwYXJzZUludChtUnJnZ2JiWzJdLCAxNiksXG4gICAgICAgICAgICBwYXJzZUludChtUnJnZ2JiWzNdLCAxNiksXG4gICAgICAgICAgICBtYXBSYW5nZShwYXJzZUludChtUnJnZ2JiWzRdLCAxNiksIDAsIDI1NSwgMCwgMSksXG4gICAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gcGFyc2VIZXhSZ2JhQ29sb3IodGV4dCkge1xuICAgIGNvbnN0IGNvbXBzID0gcGFyc2VIZXhSZ2JhQ29sb3JDb21wb25lbnRzKHRleHQpO1xuICAgIHJldHVybiBjb21wcyA/IG5ldyBJbnRDb2xvcihjb21wcywgJ3JnYicpIDogbnVsbDtcbn1cbmZ1bmN0aW9uIHBhcnNlT2JqZWN0UmdiQ29sb3JDb21wb25lbnRzKHRleHQpIHtcbiAgICBjb25zdCBtID0gdGV4dC5tYXRjaCgvXlxce1xccypyXFxzKjpcXHMqKFswLTlBLUZhLWYuXSslPylcXHMqLFxccypnXFxzKjpcXHMqKFswLTlBLUZhLWYuXSslPylcXHMqLFxccypiXFxzKjpcXHMqKFswLTlBLUZhLWYuXSslPylcXHMqXFx9JC8pO1xuICAgIGlmICghbSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgY29tcHMgPSBbXG4gICAgICAgIHBhcnNlRmxvYXQobVsxXSksXG4gICAgICAgIHBhcnNlRmxvYXQobVsyXSksXG4gICAgICAgIHBhcnNlRmxvYXQobVszXSksXG4gICAgXTtcbiAgICBpZiAoaXNOYU4oY29tcHNbMF0pIHx8IGlzTmFOKGNvbXBzWzFdKSB8fCBpc05hTihjb21wc1syXSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjb21wcztcbn1cbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdFJnYkNvbG9yUGFyc2VyKHR5cGUpIHtcbiAgICByZXR1cm4gKHRleHQpID0+IHtcbiAgICAgICAgY29uc3QgY29tcHMgPSBwYXJzZU9iamVjdFJnYkNvbG9yQ29tcG9uZW50cyh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIGNvbXBzID8gY3JlYXRlQ29sb3IoY29tcHMsICdyZ2InLCB0eXBlKSA6IG51bGw7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHBhcnNlT2JqZWN0UmdiYUNvbG9yQ29tcG9uZW50cyh0ZXh0KSB7XG4gICAgY29uc3QgbSA9IHRleHQubWF0Y2goL15cXHtcXHMqclxccyo6XFxzKihbMC05QS1GYS1mLl0rJT8pXFxzKixcXHMqZ1xccyo6XFxzKihbMC05QS1GYS1mLl0rJT8pXFxzKixcXHMqYlxccyo6XFxzKihbMC05QS1GYS1mLl0rJT8pXFxzKixcXHMqYVxccyo6XFxzKihbMC05QS1GYS1mLl0rJT8pXFxzKlxcfSQvKTtcbiAgICBpZiAoIW0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBzID0gW1xuICAgICAgICBwYXJzZUZsb2F0KG1bMV0pLFxuICAgICAgICBwYXJzZUZsb2F0KG1bMl0pLFxuICAgICAgICBwYXJzZUZsb2F0KG1bM10pLFxuICAgICAgICBwYXJzZUZsb2F0KG1bNF0pLFxuICAgIF07XG4gICAgaWYgKGlzTmFOKGNvbXBzWzBdKSB8fFxuICAgICAgICBpc05hTihjb21wc1sxXSkgfHxcbiAgICAgICAgaXNOYU4oY29tcHNbMl0pIHx8XG4gICAgICAgIGlzTmFOKGNvbXBzWzNdKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBzO1xufVxuZnVuY3Rpb24gY3JlYXRlT2JqZWN0UmdiYUNvbG9yUGFyc2VyKHR5cGUpIHtcbiAgICByZXR1cm4gKHRleHQpID0+IHtcbiAgICAgICAgY29uc3QgY29tcHMgPSBwYXJzZU9iamVjdFJnYmFDb2xvckNvbXBvbmVudHModGV4dCk7XG4gICAgICAgIHJldHVybiBjb21wcyA/IGNyZWF0ZUNvbG9yKGNvbXBzLCAncmdiJywgdHlwZSkgOiBudWxsO1xuICAgIH07XG59XG5jb25zdCBQQVJTRVJfQU5EX1JFU1VMVCA9IFtcbiAgICB7XG4gICAgICAgIHBhcnNlcjogcGFyc2VIZXhSZ2JDb2xvckNvbXBvbmVudHMsXG4gICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgICAgYWxwaGE6IGZhbHNlLFxuICAgICAgICAgICAgbW9kZTogJ3JnYicsXG4gICAgICAgICAgICBub3RhdGlvbjogJ2hleCcsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhcnNlcjogcGFyc2VIZXhSZ2JhQ29sb3JDb21wb25lbnRzLFxuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgIGFscGhhOiB0cnVlLFxuICAgICAgICAgICAgbW9kZTogJ3JnYicsXG4gICAgICAgICAgICBub3RhdGlvbjogJ2hleCcsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhcnNlcjogcGFyc2VGdW5jdGlvbmFsUmdiQ29sb3JDb21wb25lbnRzLFxuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgIGFscGhhOiBmYWxzZSxcbiAgICAgICAgICAgIG1vZGU6ICdyZ2InLFxuICAgICAgICAgICAgbm90YXRpb246ICdmdW5jJyxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGFyc2VyOiBwYXJzZUZ1bmN0aW9uYWxSZ2JhQ29sb3JDb21wb25lbnRzLFxuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgIGFscGhhOiB0cnVlLFxuICAgICAgICAgICAgbW9kZTogJ3JnYicsXG4gICAgICAgICAgICBub3RhdGlvbjogJ2Z1bmMnLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXJzZXI6IHBhcnNlRnVuY3Rpb25hbEhzbENvbG9yQ29tcG9uZW50cyxcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICBhbHBoYTogZmFsc2UsXG4gICAgICAgICAgICBtb2RlOiAnaHNsJyxcbiAgICAgICAgICAgIG5vdGF0aW9uOiAnZnVuYycsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhcnNlcjogcGFyc2VIc2xhQ29sb3JDb21wb25lbnRzLFxuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgIGFscGhhOiB0cnVlLFxuICAgICAgICAgICAgbW9kZTogJ2hzbCcsXG4gICAgICAgICAgICBub3RhdGlvbjogJ2Z1bmMnLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXJzZXI6IHBhcnNlT2JqZWN0UmdiQ29sb3JDb21wb25lbnRzLFxuICAgICAgICByZXN1bHQ6IHtcbiAgICAgICAgICAgIGFscGhhOiBmYWxzZSxcbiAgICAgICAgICAgIG1vZGU6ICdyZ2InLFxuICAgICAgICAgICAgbm90YXRpb246ICdvYmplY3QnLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXJzZXI6IHBhcnNlT2JqZWN0UmdiYUNvbG9yQ29tcG9uZW50cyxcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgICBhbHBoYTogdHJ1ZSxcbiAgICAgICAgICAgIG1vZGU6ICdyZ2InLFxuICAgICAgICAgICAgbm90YXRpb246ICdvYmplY3QnLFxuICAgICAgICB9LFxuICAgIH0sXG5dO1xuZnVuY3Rpb24gZGV0ZWN0U3RyaW5nQ29sb3IodGV4dCkge1xuICAgIHJldHVybiBQQVJTRVJfQU5EX1JFU1VMVC5yZWR1Y2UoKHByZXYsIHsgcGFyc2VyLCByZXN1bHQ6IGRldGVjdGlvbiB9KSA9PiB7XG4gICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyc2VyKHRleHQpID8gZGV0ZWN0aW9uIDogbnVsbDtcbiAgICB9LCBudWxsKTtcbn1cbmZ1bmN0aW9uIGRldGVjdFN0cmluZ0NvbG9yRm9ybWF0KHRleHQsIHR5cGUgPSAnaW50Jykge1xuICAgIGNvbnN0IHIgPSBkZXRlY3RTdHJpbmdDb2xvcih0ZXh0KTtcbiAgICBpZiAoIXIpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChyLm5vdGF0aW9uID09PSAnaGV4JyAmJiB0eXBlICE9PSAnZmxvYXQnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHIpLCB7IHR5cGU6ICdpbnQnIH0pO1xuICAgIH1cbiAgICBpZiAoci5ub3RhdGlvbiA9PT0gJ2Z1bmMnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHIpLCB7IHR5cGU6IHR5cGUgfSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gY3JlYXRlQ29sb3JTdHJpbmdQYXJzZXIodHlwZSkge1xuICAgIGNvbnN0IHBhcnNlcnMgPSBbXG4gICAgICAgIHBhcnNlSGV4UmdiQ29sb3IsXG4gICAgICAgIHBhcnNlSGV4UmdiYUNvbG9yLFxuICAgICAgICBwYXJzZUZ1bmN0aW9uYWxSZ2JDb2xvcixcbiAgICAgICAgcGFyc2VGdW5jdGlvbmFsUmdiYUNvbG9yLFxuICAgICAgICBwYXJzZUZ1bmN0aW9uYWxIc2xDb2xvcixcbiAgICAgICAgcGFyc2VGdW5jdGlvbmFsSHNsYUNvbG9yLFxuICAgIF07XG4gICAgaWYgKHR5cGUgPT09ICdpbnQnKSB7XG4gICAgICAgIHBhcnNlcnMucHVzaChjcmVhdGVPYmplY3RSZ2JDb2xvclBhcnNlcignaW50JyksIGNyZWF0ZU9iamVjdFJnYmFDb2xvclBhcnNlcignaW50JykpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICBwYXJzZXJzLnB1c2goY3JlYXRlT2JqZWN0UmdiQ29sb3JQYXJzZXIoJ2Zsb2F0JyksIGNyZWF0ZU9iamVjdFJnYmFDb2xvclBhcnNlcignZmxvYXQnKSk7XG4gICAgfVxuICAgIGNvbnN0IHBhcnNlciA9IGNvbXBvc2VQYXJzZXJzKHBhcnNlcnMpO1xuICAgIHJldHVybiAodGV4dCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZXIodGV4dCk7XG4gICAgICAgIHJldHVybiByZXN1bHQgPyBtYXBDb2xvclR5cGUocmVzdWx0LCB0eXBlKSA6IG51bGw7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHJlYWRJbnRDb2xvclN0cmluZyh2YWx1ZSkge1xuICAgIGNvbnN0IHBhcnNlciA9IGNyZWF0ZUNvbG9yU3RyaW5nUGFyc2VyKCdpbnQnKTtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gSW50Q29sb3IuYmxhY2soKTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gcGFyc2VyKHZhbHVlKTtcbiAgICByZXR1cm4gcmVzdWx0ICE9PSBudWxsICYmIHJlc3VsdCAhPT0gdm9pZCAwID8gcmVzdWx0IDogSW50Q29sb3IuYmxhY2soKTtcbn1cbmZ1bmN0aW9uIHplcm9maWxsKGNvbXApIHtcbiAgICBjb25zdCBoZXggPSBjb25zdHJhaW5SYW5nZShNYXRoLmZsb29yKGNvbXApLCAwLCAyNTUpLnRvU3RyaW5nKDE2KTtcbiAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PT0gMSA/IGAwJHtoZXh9YCA6IGhleDtcbn1cbmZ1bmN0aW9uIGNvbG9yVG9IZXhSZ2JTdHJpbmcodmFsdWUsIHByZWZpeCA9ICcjJykge1xuICAgIGNvbnN0IGhleGVzID0gcmVtb3ZlQWxwaGFDb21wb25lbnQodmFsdWUuZ2V0Q29tcG9uZW50cygncmdiJykpXG4gICAgICAgIC5tYXAoemVyb2ZpbGwpXG4gICAgICAgIC5qb2luKCcnKTtcbiAgICByZXR1cm4gYCR7cHJlZml4fSR7aGV4ZXN9YDtcbn1cbmZ1bmN0aW9uIGNvbG9yVG9IZXhSZ2JhU3RyaW5nKHZhbHVlLCBwcmVmaXggPSAnIycpIHtcbiAgICBjb25zdCByZ2JhQ29tcHMgPSB2YWx1ZS5nZXRDb21wb25lbnRzKCdyZ2InKTtcbiAgICBjb25zdCBoZXhlcyA9IFtyZ2JhQ29tcHNbMF0sIHJnYmFDb21wc1sxXSwgcmdiYUNvbXBzWzJdLCByZ2JhQ29tcHNbM10gKiAyNTVdXG4gICAgICAgIC5tYXAoemVyb2ZpbGwpXG4gICAgICAgIC5qb2luKCcnKTtcbiAgICByZXR1cm4gYCR7cHJlZml4fSR7aGV4ZXN9YDtcbn1cbmZ1bmN0aW9uIGNvbG9yVG9GdW5jdGlvbmFsUmdiU3RyaW5nKHZhbHVlKSB7XG4gICAgY29uc3QgZm9ybWF0dGVyID0gY3JlYXRlTnVtYmVyRm9ybWF0dGVyKDApO1xuICAgIGNvbnN0IGNpID0gbWFwQ29sb3JUeXBlKHZhbHVlLCAnaW50Jyk7XG4gICAgY29uc3QgY29tcHMgPSByZW1vdmVBbHBoYUNvbXBvbmVudChjaS5nZXRDb21wb25lbnRzKCdyZ2InKSkubWFwKChjb21wKSA9PiBmb3JtYXR0ZXIoY29tcCkpO1xuICAgIHJldHVybiBgcmdiKCR7Y29tcHMuam9pbignLCAnKX0pYDtcbn1cbmZ1bmN0aW9uIGNvbG9yVG9GdW5jdGlvbmFsUmdiYVN0cmluZyh2YWx1ZSkge1xuICAgIGNvbnN0IGFGb3JtYXR0ZXIgPSBjcmVhdGVOdW1iZXJGb3JtYXR0ZXIoMik7XG4gICAgY29uc3QgcmdiRm9ybWF0dGVyID0gY3JlYXRlTnVtYmVyRm9ybWF0dGVyKDApO1xuICAgIGNvbnN0IGNpID0gbWFwQ29sb3JUeXBlKHZhbHVlLCAnaW50Jyk7XG4gICAgY29uc3QgY29tcHMgPSBjaS5nZXRDb21wb25lbnRzKCdyZ2InKS5tYXAoKGNvbXAsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IGluZGV4ID09PSAzID8gYUZvcm1hdHRlciA6IHJnYkZvcm1hdHRlcjtcbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlcihjb21wKTtcbiAgICB9KTtcbiAgICByZXR1cm4gYHJnYmEoJHtjb21wcy5qb2luKCcsICcpfSlgO1xufVxuZnVuY3Rpb24gY29sb3JUb0Z1bmN0aW9uYWxIc2xTdHJpbmcodmFsdWUpIHtcbiAgICBjb25zdCBmb3JtYXR0ZXJzID0gW1xuICAgICAgICBjcmVhdGVOdW1iZXJGb3JtYXR0ZXIoMCksXG4gICAgICAgIGZvcm1hdFBlcmNlbnRhZ2UsXG4gICAgICAgIGZvcm1hdFBlcmNlbnRhZ2UsXG4gICAgXTtcbiAgICBjb25zdCBjaSA9IG1hcENvbG9yVHlwZSh2YWx1ZSwgJ2ludCcpO1xuICAgIGNvbnN0IGNvbXBzID0gcmVtb3ZlQWxwaGFDb21wb25lbnQoY2kuZ2V0Q29tcG9uZW50cygnaHNsJykpLm1hcCgoY29tcCwgaW5kZXgpID0+IGZvcm1hdHRlcnNbaW5kZXhdKGNvbXApKTtcbiAgICByZXR1cm4gYGhzbCgke2NvbXBzLmpvaW4oJywgJyl9KWA7XG59XG5mdW5jdGlvbiBjb2xvclRvRnVuY3Rpb25hbEhzbGFTdHJpbmcodmFsdWUpIHtcbiAgICBjb25zdCBmb3JtYXR0ZXJzID0gW1xuICAgICAgICBjcmVhdGVOdW1iZXJGb3JtYXR0ZXIoMCksXG4gICAgICAgIGZvcm1hdFBlcmNlbnRhZ2UsXG4gICAgICAgIGZvcm1hdFBlcmNlbnRhZ2UsXG4gICAgICAgIGNyZWF0ZU51bWJlckZvcm1hdHRlcigyKSxcbiAgICBdO1xuICAgIGNvbnN0IGNpID0gbWFwQ29sb3JUeXBlKHZhbHVlLCAnaW50Jyk7XG4gICAgY29uc3QgY29tcHMgPSBjaVxuICAgICAgICAuZ2V0Q29tcG9uZW50cygnaHNsJylcbiAgICAgICAgLm1hcCgoY29tcCwgaW5kZXgpID0+IGZvcm1hdHRlcnNbaW5kZXhdKGNvbXApKTtcbiAgICByZXR1cm4gYGhzbGEoJHtjb21wcy5qb2luKCcsICcpfSlgO1xufVxuZnVuY3Rpb24gY29sb3JUb09iamVjdFJnYlN0cmluZyh2YWx1ZSwgdHlwZSkge1xuICAgIGNvbnN0IGZvcm1hdHRlciA9IGNyZWF0ZU51bWJlckZvcm1hdHRlcih0eXBlID09PSAnZmxvYXQnID8gMiA6IDApO1xuICAgIGNvbnN0IG5hbWVzID0gWydyJywgJ2cnLCAnYiddO1xuICAgIGNvbnN0IGNjID0gbWFwQ29sb3JUeXBlKHZhbHVlLCB0eXBlKTtcbiAgICBjb25zdCBjb21wcyA9IHJlbW92ZUFscGhhQ29tcG9uZW50KGNjLmdldENvbXBvbmVudHMoJ3JnYicpKS5tYXAoKGNvbXAsIGluZGV4KSA9PiBgJHtuYW1lc1tpbmRleF19OiAke2Zvcm1hdHRlcihjb21wKX1gKTtcbiAgICByZXR1cm4gYHske2NvbXBzLmpvaW4oJywgJyl9fWA7XG59XG5mdW5jdGlvbiBjcmVhdGVPYmplY3RSZ2JDb2xvckZvcm1hdHRlcih0eXBlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSkgPT4gY29sb3JUb09iamVjdFJnYlN0cmluZyh2YWx1ZSwgdHlwZSk7XG59XG5mdW5jdGlvbiBjb2xvclRvT2JqZWN0UmdiYVN0cmluZyh2YWx1ZSwgdHlwZSkge1xuICAgIGNvbnN0IGFGb3JtYXR0ZXIgPSBjcmVhdGVOdW1iZXJGb3JtYXR0ZXIoMik7XG4gICAgY29uc3QgcmdiRm9ybWF0dGVyID0gY3JlYXRlTnVtYmVyRm9ybWF0dGVyKHR5cGUgPT09ICdmbG9hdCcgPyAyIDogMCk7XG4gICAgY29uc3QgbmFtZXMgPSBbJ3InLCAnZycsICdiJywgJ2EnXTtcbiAgICBjb25zdCBjYyA9IG1hcENvbG9yVHlwZSh2YWx1ZSwgdHlwZSk7XG4gICAgY29uc3QgY29tcHMgPSBjYy5nZXRDb21wb25lbnRzKCdyZ2InKS5tYXAoKGNvbXAsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IGluZGV4ID09PSAzID8gYUZvcm1hdHRlciA6IHJnYkZvcm1hdHRlcjtcbiAgICAgICAgcmV0dXJuIGAke25hbWVzW2luZGV4XX06ICR7Zm9ybWF0dGVyKGNvbXApfWA7XG4gICAgfSk7XG4gICAgcmV0dXJuIGB7JHtjb21wcy5qb2luKCcsICcpfX1gO1xufVxuZnVuY3Rpb24gY3JlYXRlT2JqZWN0UmdiYUNvbG9yRm9ybWF0dGVyKHR5cGUpIHtcbiAgICByZXR1cm4gKHZhbHVlKSA9PiBjb2xvclRvT2JqZWN0UmdiYVN0cmluZyh2YWx1ZSwgdHlwZSk7XG59XG5jb25zdCBGT1JNQVRfQU5EX1NUUklOR0lGSUVSUyA9IFtcbiAgICB7XG4gICAgICAgIGZvcm1hdDoge1xuICAgICAgICAgICAgYWxwaGE6IGZhbHNlLFxuICAgICAgICAgICAgbW9kZTogJ3JnYicsXG4gICAgICAgICAgICBub3RhdGlvbjogJ2hleCcsXG4gICAgICAgICAgICB0eXBlOiAnaW50JyxcbiAgICAgICAgfSxcbiAgICAgICAgc3RyaW5naWZpZXI6IGNvbG9yVG9IZXhSZ2JTdHJpbmcsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGZvcm1hdDoge1xuICAgICAgICAgICAgYWxwaGE6IHRydWUsXG4gICAgICAgICAgICBtb2RlOiAncmdiJyxcbiAgICAgICAgICAgIG5vdGF0aW9uOiAnaGV4JyxcbiAgICAgICAgICAgIHR5cGU6ICdpbnQnLFxuICAgICAgICB9LFxuICAgICAgICBzdHJpbmdpZmllcjogY29sb3JUb0hleFJnYmFTdHJpbmcsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGZvcm1hdDoge1xuICAgICAgICAgICAgYWxwaGE6IGZhbHNlLFxuICAgICAgICAgICAgbW9kZTogJ3JnYicsXG4gICAgICAgICAgICBub3RhdGlvbjogJ2Z1bmMnLFxuICAgICAgICAgICAgdHlwZTogJ2ludCcsXG4gICAgICAgIH0sXG4gICAgICAgIHN0cmluZ2lmaWVyOiBjb2xvclRvRnVuY3Rpb25hbFJnYlN0cmluZyxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgZm9ybWF0OiB7XG4gICAgICAgICAgICBhbHBoYTogdHJ1ZSxcbiAgICAgICAgICAgIG1vZGU6ICdyZ2InLFxuICAgICAgICAgICAgbm90YXRpb246ICdmdW5jJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbnQnLFxuICAgICAgICB9LFxuICAgICAgICBzdHJpbmdpZmllcjogY29sb3JUb0Z1bmN0aW9uYWxSZ2JhU3RyaW5nLFxuICAgIH0sXG4gICAge1xuICAgICAgICBmb3JtYXQ6IHtcbiAgICAgICAgICAgIGFscGhhOiBmYWxzZSxcbiAgICAgICAgICAgIG1vZGU6ICdoc2wnLFxuICAgICAgICAgICAgbm90YXRpb246ICdmdW5jJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbnQnLFxuICAgICAgICB9LFxuICAgICAgICBzdHJpbmdpZmllcjogY29sb3JUb0Z1bmN0aW9uYWxIc2xTdHJpbmcsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGZvcm1hdDoge1xuICAgICAgICAgICAgYWxwaGE6IHRydWUsXG4gICAgICAgICAgICBtb2RlOiAnaHNsJyxcbiAgICAgICAgICAgIG5vdGF0aW9uOiAnZnVuYycsXG4gICAgICAgICAgICB0eXBlOiAnaW50JyxcbiAgICAgICAgfSxcbiAgICAgICAgc3RyaW5naWZpZXI6IGNvbG9yVG9GdW5jdGlvbmFsSHNsYVN0cmluZyxcbiAgICB9LFxuICAgIC4uLlsnaW50JywgJ2Zsb2F0J10ucmVkdWNlKChwcmV2LCB0eXBlKSA9PiB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvcm1hdDoge1xuICAgICAgICAgICAgICAgICAgICBhbHBoYTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6ICdyZ2InLFxuICAgICAgICAgICAgICAgICAgICBub3RhdGlvbjogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdHJpbmdpZmllcjogY3JlYXRlT2JqZWN0UmdiQ29sb3JGb3JtYXR0ZXIodHlwZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvcm1hdDoge1xuICAgICAgICAgICAgICAgICAgICBhbHBoYTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogJ3JnYicsXG4gICAgICAgICAgICAgICAgICAgIG5vdGF0aW9uOiAnb2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0cmluZ2lmaWVyOiBjcmVhdGVPYmplY3RSZ2JhQ29sb3JGb3JtYXR0ZXIodHlwZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgIH0sIFtdKSxcbl07XG5mdW5jdGlvbiBmaW5kQ29sb3JTdHJpbmdpZmllcihmb3JtYXQpIHtcbiAgICByZXR1cm4gRk9STUFUX0FORF9TVFJJTkdJRklFUlMucmVkdWNlKChwcmV2LCBmYXMpID0+IHtcbiAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlcXVhbHNTdHJpbmdDb2xvckZvcm1hdChmYXMuZm9ybWF0LCBmb3JtYXQpXG4gICAgICAgICAgICA/IGZhcy5zdHJpbmdpZmllclxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH0sIG51bGwpO1xufVxuXG5jb25zdCBjbiRiID0gQ2xhc3NOYW1lKCdhcGwnKTtcbmNsYXNzIEFQYWxldHRlVmlldyB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlXyA9IHRoaXMub25WYWx1ZUNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uVmFsdWVDaGFuZ2VfKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiRiKCkpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRUYWJJbmRleCh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBjb25zdCBiYXJFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBiYXJFbGVtLmNsYXNzTGlzdC5hZGQoY24kYignYicpKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGJhckVsZW0pO1xuICAgICAgICBjb25zdCBjb2xvckVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbG9yRWxlbS5jbGFzc0xpc3QuYWRkKGNuJGIoJ2MnKSk7XG4gICAgICAgIGJhckVsZW0uYXBwZW5kQ2hpbGQoY29sb3JFbGVtKTtcbiAgICAgICAgdGhpcy5jb2xvckVsZW1fID0gY29sb3JFbGVtO1xuICAgICAgICBjb25zdCBtYXJrZXJFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBtYXJrZXJFbGVtLmNsYXNzTGlzdC5hZGQoY24kYignbScpKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKG1hcmtlckVsZW0pO1xuICAgICAgICB0aGlzLm1hcmtlckVsZW1fID0gbWFya2VyRWxlbTtcbiAgICAgICAgY29uc3QgcHJldmlld0VsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByZXZpZXdFbGVtLmNsYXNzTGlzdC5hZGQoY24kYigncCcpKTtcbiAgICAgICAgdGhpcy5tYXJrZXJFbGVtXy5hcHBlbmRDaGlsZChwcmV2aWV3RWxlbSk7XG4gICAgICAgIHRoaXMucHJldmlld0VsZW1fID0gcHJldmlld0VsZW07XG4gICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgIH1cbiAgICB1cGRhdGVfKCkge1xuICAgICAgICBjb25zdCBjID0gdGhpcy52YWx1ZS5yYXdWYWx1ZTtcbiAgICAgICAgY29uc3QgcmdiYUNvbXBzID0gYy5nZXRDb21wb25lbnRzKCdyZ2InKTtcbiAgICAgICAgY29uc3QgbGVmdENvbG9yID0gbmV3IEludENvbG9yKFtyZ2JhQ29tcHNbMF0sIHJnYmFDb21wc1sxXSwgcmdiYUNvbXBzWzJdLCAwXSwgJ3JnYicpO1xuICAgICAgICBjb25zdCByaWdodENvbG9yID0gbmV3IEludENvbG9yKFtyZ2JhQ29tcHNbMF0sIHJnYmFDb21wc1sxXSwgcmdiYUNvbXBzWzJdLCAyNTVdLCAncmdiJyk7XG4gICAgICAgIGNvbnN0IGdyYWRpZW50Q29tcHMgPSBbXG4gICAgICAgICAgICAndG8gcmlnaHQnLFxuICAgICAgICAgICAgY29sb3JUb0Z1bmN0aW9uYWxSZ2JhU3RyaW5nKGxlZnRDb2xvciksXG4gICAgICAgICAgICBjb2xvclRvRnVuY3Rpb25hbFJnYmFTdHJpbmcocmlnaHRDb2xvciksXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY29sb3JFbGVtXy5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCgke2dyYWRpZW50Q29tcHMuam9pbignLCcpfSlgO1xuICAgICAgICB0aGlzLnByZXZpZXdFbGVtXy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclRvRnVuY3Rpb25hbFJnYmFTdHJpbmcoYyk7XG4gICAgICAgIGNvbnN0IGxlZnQgPSBtYXBSYW5nZShyZ2JhQ29tcHNbM10sIDAsIDEsIDAsIDEwMCk7XG4gICAgICAgIHRoaXMubWFya2VyRWxlbV8uc3R5bGUubGVmdCA9IGAke2xlZnR9JWA7XG4gICAgfVxuICAgIG9uVmFsdWVDaGFuZ2VfKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICB9XG59XG5cbmNsYXNzIEFQYWxldHRlQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5vbktleURvd25fID0gdGhpcy5vbktleURvd25fLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25LZXlVcF8gPSB0aGlzLm9uS2V5VXBfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Qb2ludGVyRG93bl8gPSB0aGlzLm9uUG9pbnRlckRvd25fLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Qb2ludGVyTW92ZV8gPSB0aGlzLm9uUG9pbnRlck1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Qb2ludGVyVXBfID0gdGhpcy5vblBvaW50ZXJVcF8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgQVBhbGV0dGVWaWV3KGRvYywge1xuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wdEhhbmRsZXJfID0gbmV3IFBvaW50ZXJIYW5kbGVyKHRoaXMudmlldy5lbGVtZW50KTtcbiAgICAgICAgdGhpcy5wdEhhbmRsZXJfLmVtaXR0ZXIub24oJ2Rvd24nLCB0aGlzLm9uUG9pbnRlckRvd25fKTtcbiAgICAgICAgdGhpcy5wdEhhbmRsZXJfLmVtaXR0ZXIub24oJ21vdmUnLCB0aGlzLm9uUG9pbnRlck1vdmVfKTtcbiAgICAgICAgdGhpcy5wdEhhbmRsZXJfLmVtaXR0ZXIub24oJ3VwJywgdGhpcy5vblBvaW50ZXJVcF8pO1xuICAgICAgICB0aGlzLnZpZXcuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd25fKTtcbiAgICAgICAgdGhpcy52aWV3LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLm9uS2V5VXBfKTtcbiAgICB9XG4gICAgaGFuZGxlUG9pbnRlckV2ZW50XyhkLCBvcHRzKSB7XG4gICAgICAgIGlmICghZC5wb2ludCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFscGhhID0gZC5wb2ludC54IC8gZC5ib3VuZHMud2lkdGg7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLnZhbHVlLnJhd1ZhbHVlO1xuICAgICAgICBjb25zdCBbaCwgcywgdl0gPSBjLmdldENvbXBvbmVudHMoJ2hzdicpO1xuICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKG5ldyBJbnRDb2xvcihbaCwgcywgdiwgYWxwaGFdLCAnaHN2JyksIG9wdHMpO1xuICAgIH1cbiAgICBvblBvaW50ZXJEb3duXyhldikge1xuICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3Q6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25Qb2ludGVyTW92ZV8oZXYpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVQb2ludGVyRXZlbnRfKGV2LmRhdGEsIHtcbiAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICBsYXN0OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUG9pbnRlclVwXyhldikge1xuICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiB0cnVlLFxuICAgICAgICAgICAgbGFzdDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uS2V5RG93bl8oZXYpIHtcbiAgICAgICAgY29uc3Qgc3RlcCA9IGdldFN0ZXBGb3JLZXkoZ2V0S2V5U2NhbGVGb3JDb2xvcih0cnVlKSwgZ2V0SG9yaXpvbnRhbFN0ZXBLZXlzKGV2KSk7XG4gICAgICAgIGlmIChzdGVwID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYyA9IHRoaXMudmFsdWUucmF3VmFsdWU7XG4gICAgICAgIGNvbnN0IFtoLCBzLCB2LCBhXSA9IGMuZ2V0Q29tcG9uZW50cygnaHN2Jyk7XG4gICAgICAgIHRoaXMudmFsdWUuc2V0UmF3VmFsdWUobmV3IEludENvbG9yKFtoLCBzLCB2LCBhICsgc3RlcF0sICdoc3YnKSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3Q6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25LZXlVcF8oZXYpIHtcbiAgICAgICAgY29uc3Qgc3RlcCA9IGdldFN0ZXBGb3JLZXkoZ2V0S2V5U2NhbGVGb3JDb2xvcih0cnVlKSwgZ2V0SG9yaXpvbnRhbFN0ZXBLZXlzKGV2KSk7XG4gICAgICAgIGlmIChzdGVwID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZSh0aGlzLnZhbHVlLnJhd1ZhbHVlLCB7XG4gICAgICAgICAgICBmb3JjZUVtaXQ6IHRydWUsXG4gICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IGNuJGEgPSBDbGFzc05hbWUoJ2NvbHR4dCcpO1xuZnVuY3Rpb24gY3JlYXRlTW9kZVNlbGVjdEVsZW1lbnQoZG9jKSB7XG4gICAgY29uc3Qgc2VsZWN0RWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICBjb25zdCBpdGVtcyA9IFtcbiAgICAgICAgeyB0ZXh0OiAnUkdCJywgdmFsdWU6ICdyZ2InIH0sXG4gICAgICAgIHsgdGV4dDogJ0hTTCcsIHZhbHVlOiAnaHNsJyB9LFxuICAgICAgICB7IHRleHQ6ICdIU1YnLCB2YWx1ZTogJ2hzdicgfSxcbiAgICAgICAgeyB0ZXh0OiAnSEVYJywgdmFsdWU6ICdoZXgnIH0sXG4gICAgXTtcbiAgICBzZWxlY3RFbGVtLmFwcGVuZENoaWxkKGl0ZW1zLnJlZHVjZSgoZnJhZywgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBvcHRFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBvcHRFbGVtLnRleHRDb250ZW50ID0gaXRlbS50ZXh0O1xuICAgICAgICBvcHRFbGVtLnZhbHVlID0gaXRlbS52YWx1ZTtcbiAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChvcHRFbGVtKTtcbiAgICAgICAgcmV0dXJuIGZyYWc7XG4gICAgfSwgZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSkpO1xuICAgIHJldHVybiBzZWxlY3RFbGVtO1xufVxuY2xhc3MgQ29sb3JUZXh0c1ZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY24kYSgpKTtcbiAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kQ2xhc3NNb2RpZmllcnModGhpcy5lbGVtZW50KTtcbiAgICAgICAgY29uc3QgbW9kZUVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG1vZGVFbGVtLmNsYXNzTGlzdC5hZGQoY24kYSgnbScpKTtcbiAgICAgICAgdGhpcy5tb2RlRWxlbV8gPSBjcmVhdGVNb2RlU2VsZWN0RWxlbWVudChkb2MpO1xuICAgICAgICB0aGlzLm1vZGVFbGVtXy5jbGFzc0xpc3QuYWRkKGNuJGEoJ21zJykpO1xuICAgICAgICBtb2RlRWxlbS5hcHBlbmRDaGlsZCh0aGlzLm1vZGVTZWxlY3RFbGVtZW50KTtcbiAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kRGlzYWJsZWQodGhpcy5tb2RlRWxlbV8pO1xuICAgICAgICBjb25zdCBtb2RlTWFya2VyRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbW9kZU1hcmtlckVsZW0uY2xhc3NMaXN0LmFkZChjbiRhKCdtbScpKTtcbiAgICAgICAgbW9kZU1hcmtlckVsZW0uYXBwZW5kQ2hpbGQoY3JlYXRlU3ZnSWNvbkVsZW1lbnQoZG9jLCAnZHJvcGRvd24nKSk7XG4gICAgICAgIG1vZGVFbGVtLmFwcGVuZENoaWxkKG1vZGVNYXJrZXJFbGVtKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKG1vZGVFbGVtKTtcbiAgICAgICAgY29uc3QgaW5wdXRzRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaW5wdXRzRWxlbS5jbGFzc0xpc3QuYWRkKGNuJGEoJ3cnKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChpbnB1dHNFbGVtKTtcbiAgICAgICAgdGhpcy5pbnB1dHNFbGVtXyA9IGlucHV0c0VsZW07XG4gICAgICAgIHRoaXMuaW5wdXRWaWV3c18gPSBjb25maWcuaW5wdXRWaWV3cztcbiAgICAgICAgdGhpcy5hcHBseUlucHV0Vmlld3NfKCk7XG4gICAgICAgIGJpbmRWYWx1ZShjb25maWcubW9kZSwgKG1vZGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9kZUVsZW1fLnZhbHVlID0gbW9kZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBtb2RlU2VsZWN0RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZUVsZW1fO1xuICAgIH1cbiAgICBnZXQgaW5wdXRWaWV3cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRWaWV3c187XG4gICAgfVxuICAgIHNldCBpbnB1dFZpZXdzKGlucHV0Vmlld3MpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdzXyA9IGlucHV0Vmlld3M7XG4gICAgICAgIHRoaXMuYXBwbHlJbnB1dFZpZXdzXygpO1xuICAgIH1cbiAgICBhcHBseUlucHV0Vmlld3NfKCkge1xuICAgICAgICByZW1vdmVDaGlsZEVsZW1lbnRzKHRoaXMuaW5wdXRzRWxlbV8pO1xuICAgICAgICBjb25zdCBkb2MgPSB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudDtcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdzXy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb21wRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbXBFbGVtLmNsYXNzTGlzdC5hZGQoY24kYSgnYycpKTtcbiAgICAgICAgICAgIGNvbXBFbGVtLmFwcGVuZENoaWxkKHYuZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmlucHV0c0VsZW1fLmFwcGVuZENoaWxkKGNvbXBFbGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVGb3JtYXR0ZXIkMih0eXBlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZU51bWJlckZvcm1hdHRlcih0eXBlID09PSAnZmxvYXQnID8gMiA6IDApO1xufVxuZnVuY3Rpb24gY3JlYXRlQ29uc3RyYWludCQ1KG1vZGUsIHR5cGUsIGluZGV4KSB7XG4gICAgY29uc3QgbWF4ID0gZ2V0Q29sb3JNYXhDb21wb25lbnRzKG1vZGUsIHR5cGUpW2luZGV4XTtcbiAgICByZXR1cm4gbmV3IERlZmluaXRlUmFuZ2VDb25zdHJhaW50KHtcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IG1heCxcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudENvbnRyb2xsZXIoZG9jLCBjb25maWcsIGluZGV4KSB7XG4gICAgcmV0dXJuIG5ldyBOdW1iZXJUZXh0Q29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgYXJyYXlQb3NpdGlvbjogaW5kZXggPT09IDAgPyAnZnN0JyA6IGluZGV4ID09PSAzIC0gMSA/ICdsc3QnIDogJ21pZCcsXG4gICAgICAgIHBhcnNlcjogY29uZmlnLnBhcnNlcixcbiAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgZm9ybWF0dGVyOiBjcmVhdGVGb3JtYXR0ZXIkMihjb25maWcuY29sb3JUeXBlKSxcbiAgICAgICAgICAgIGtleVNjYWxlOiBnZXRLZXlTY2FsZUZvckNvbG9yKGZhbHNlKSxcbiAgICAgICAgICAgIHBvaW50ZXJTY2FsZTogY29uZmlnLmNvbG9yVHlwZSA9PT0gJ2Zsb2F0JyA/IDAuMDEgOiAxLFxuICAgICAgICB9KSxcbiAgICAgICAgdmFsdWU6IGNyZWF0ZVZhbHVlKDAsIHtcbiAgICAgICAgICAgIGNvbnN0cmFpbnQ6IGNyZWF0ZUNvbnN0cmFpbnQkNShjb25maWcuY29sb3JNb2RlLCBjb25maWcuY29sb3JUeXBlLCBpbmRleCksXG4gICAgICAgIH0pLFxuICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVDb21wb25lbnRDb250cm9sbGVycyhkb2MsIGNvbmZpZykge1xuICAgIGNvbnN0IGNjID0ge1xuICAgICAgICBjb2xvck1vZGU6IGNvbmZpZy5jb2xvck1vZGUsXG4gICAgICAgIGNvbG9yVHlwZTogY29uZmlnLmNvbG9yVHlwZSxcbiAgICAgICAgcGFyc2VyOiBwYXJzZU51bWJlcixcbiAgICAgICAgdmlld1Byb3BzOiBjb25maWcudmlld1Byb3BzLFxuICAgIH07XG4gICAgcmV0dXJuIFswLCAxLCAyXS5tYXAoKGkpID0+IHtcbiAgICAgICAgY29uc3QgYyA9IGNyZWF0ZUNvbXBvbmVudENvbnRyb2xsZXIoZG9jLCBjYywgaSk7XG4gICAgICAgIGNvbm5lY3RWYWx1ZXMoe1xuICAgICAgICAgICAgcHJpbWFyeTogY29uZmlnLnZhbHVlLFxuICAgICAgICAgICAgc2Vjb25kYXJ5OiBjLnZhbHVlLFxuICAgICAgICAgICAgZm9yd2FyZChwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWMgPSBtYXBDb2xvclR5cGUocCwgY29uZmlnLmNvbG9yVHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1jLmdldENvbXBvbmVudHMoY29uZmlnLmNvbG9yTW9kZSlbaV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFja3dhcmQocCwgcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBpY2tlZE1vZGUgPSBjb25maWcuY29sb3JNb2RlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1jID0gbWFwQ29sb3JUeXBlKHAsIGNvbmZpZy5jb2xvclR5cGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBzID0gbWMuZ2V0Q29tcG9uZW50cyhwaWNrZWRNb2RlKTtcbiAgICAgICAgICAgICAgICBjb21wc1tpXSA9IHM7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IGNyZWF0ZUNvbG9yKGFwcGVuZEFscGhhQ29tcG9uZW50KHJlbW92ZUFscGhhQ29tcG9uZW50KGNvbXBzKSwgY29tcHNbM10pLCBwaWNrZWRNb2RlLCBjb25maWcuY29sb3JUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwQ29sb3JUeXBlKGMsICdpbnQnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYztcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUhleENvbnRyb2xsZXIoZG9jLCBjb25maWcpIHtcbiAgICBjb25zdCBjID0gbmV3IFRleHRDb250cm9sbGVyKGRvYywge1xuICAgICAgICBwYXJzZXI6IGNyZWF0ZUNvbG9yU3RyaW5nUGFyc2VyKCdpbnQnKSxcbiAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgZm9ybWF0dGVyOiBjb2xvclRvSGV4UmdiU3RyaW5nLFxuICAgICAgICB9KSxcbiAgICAgICAgdmFsdWU6IGNyZWF0ZVZhbHVlKEludENvbG9yLmJsYWNrKCkpLFxuICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgfSk7XG4gICAgY29ubmVjdFZhbHVlcyh7XG4gICAgICAgIHByaW1hcnk6IGNvbmZpZy52YWx1ZSxcbiAgICAgICAgc2Vjb25kYXJ5OiBjLnZhbHVlLFxuICAgICAgICBmb3J3YXJkOiAocCkgPT4gbmV3IEludENvbG9yKHJlbW92ZUFscGhhQ29tcG9uZW50KHAuZ2V0Q29tcG9uZW50cygpKSwgcC5tb2RlKSxcbiAgICAgICAgYmFja3dhcmQ6IChwLCBzKSA9PiBuZXcgSW50Q29sb3IoYXBwZW5kQWxwaGFDb21wb25lbnQocmVtb3ZlQWxwaGFDb21wb25lbnQocy5nZXRDb21wb25lbnRzKHAubW9kZSkpLCBwLmdldENvbXBvbmVudHMoKVszXSksIHAubW9kZSksXG4gICAgfSk7XG4gICAgcmV0dXJuIFtjXTtcbn1cbmZ1bmN0aW9uIGlzQ29sb3JNb2RlKG1vZGUpIHtcbiAgICByZXR1cm4gbW9kZSAhPT0gJ2hleCc7XG59XG5jbGFzcyBDb2xvclRleHRzQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5vbk1vZGVTZWxlY3RDaGFuZ2VfID0gdGhpcy5vbk1vZGVTZWxlY3RDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY29sb3JUeXBlXyA9IGNvbmZpZy5jb2xvclR5cGU7XG4gICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgdGhpcy5jb2xvck1vZGUgPSBjcmVhdGVWYWx1ZSh0aGlzLnZhbHVlLnJhd1ZhbHVlLm1vZGUpO1xuICAgICAgICB0aGlzLmNjc18gPSB0aGlzLmNyZWF0ZUNvbXBvbmVudENvbnRyb2xsZXJzXyhkb2MpO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgQ29sb3JUZXh0c1ZpZXcoZG9jLCB7XG4gICAgICAgICAgICBtb2RlOiB0aGlzLmNvbG9yTW9kZSxcbiAgICAgICAgICAgIGlucHV0Vmlld3M6IFt0aGlzLmNjc19bMF0udmlldywgdGhpcy5jY3NfWzFdLnZpZXcsIHRoaXMuY2NzX1syXS52aWV3XSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZXcubW9kZVNlbGVjdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5vbk1vZGVTZWxlY3RDaGFuZ2VfKTtcbiAgICB9XG4gICAgY3JlYXRlQ29tcG9uZW50Q29udHJvbGxlcnNfKGRvYykge1xuICAgICAgICBjb25zdCBtb2RlID0gdGhpcy5jb2xvck1vZGUucmF3VmFsdWU7XG4gICAgICAgIGlmIChpc0NvbG9yTW9kZShtb2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUNvbXBvbmVudENvbnRyb2xsZXJzKGRvYywge1xuICAgICAgICAgICAgICAgIGNvbG9yTW9kZTogbW9kZSxcbiAgICAgICAgICAgICAgICBjb2xvclR5cGU6IHRoaXMuY29sb3JUeXBlXyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUhleENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbk1vZGVTZWxlY3RDaGFuZ2VfKGV2KSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdEVsZW0gPSBldi5jdXJyZW50VGFyZ2V0O1xuICAgICAgICB0aGlzLmNvbG9yTW9kZS5yYXdWYWx1ZSA9IHNlbGVjdEVsZW0udmFsdWU7XG4gICAgICAgIHRoaXMuY2NzXyA9IHRoaXMuY3JlYXRlQ29tcG9uZW50Q29udHJvbGxlcnNfKHRoaXMudmlldy5lbGVtZW50Lm93bmVyRG9jdW1lbnQpO1xuICAgICAgICB0aGlzLnZpZXcuaW5wdXRWaWV3cyA9IHRoaXMuY2NzXy5tYXAoKGNjKSA9PiBjYy52aWV3KTtcbiAgICB9XG59XG5cbmNvbnN0IGNuJDkgPSBDbGFzc05hbWUoJ2hwbCcpO1xuY2xhc3MgSFBhbGV0dGVWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VfID0gdGhpcy5vblZhbHVlQ2hhbmdlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25WYWx1ZUNoYW5nZV8pO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNuJDkoKSk7XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZENsYXNzTW9kaWZpZXJzKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZFRhYkluZGV4KHRoaXMuZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGNvbG9yRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29sb3JFbGVtLmNsYXNzTGlzdC5hZGQoY24kOSgnYycpKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGNvbG9yRWxlbSk7XG4gICAgICAgIGNvbnN0IG1hcmtlckVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG1hcmtlckVsZW0uY2xhc3NMaXN0LmFkZChjbiQ5KCdtJykpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQobWFya2VyRWxlbSk7XG4gICAgICAgIHRoaXMubWFya2VyRWxlbV8gPSBtYXJrZXJFbGVtO1xuICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICB9XG4gICAgdXBkYXRlXygpIHtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMudmFsdWUucmF3VmFsdWU7XG4gICAgICAgIGNvbnN0IFtoXSA9IGMuZ2V0Q29tcG9uZW50cygnaHN2Jyk7XG4gICAgICAgIHRoaXMubWFya2VyRWxlbV8uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JUb0Z1bmN0aW9uYWxSZ2JTdHJpbmcobmV3IEludENvbG9yKFtoLCAxMDAsIDEwMF0sICdoc3YnKSk7XG4gICAgICAgIGNvbnN0IGxlZnQgPSBtYXBSYW5nZShoLCAwLCAzNjAsIDAsIDEwMCk7XG4gICAgICAgIHRoaXMubWFya2VyRWxlbV8uc3R5bGUubGVmdCA9IGAke2xlZnR9JWA7XG4gICAgfVxuICAgIG9uVmFsdWVDaGFuZ2VfKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICB9XG59XG5cbmNsYXNzIEhQYWxldHRlQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5vbktleURvd25fID0gdGhpcy5vbktleURvd25fLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25LZXlVcF8gPSB0aGlzLm9uS2V5VXBfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Qb2ludGVyRG93bl8gPSB0aGlzLm9uUG9pbnRlckRvd25fLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Qb2ludGVyTW92ZV8gPSB0aGlzLm9uUG9pbnRlck1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Qb2ludGVyVXBfID0gdGhpcy5vblBvaW50ZXJVcF8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgSFBhbGV0dGVWaWV3KGRvYywge1xuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wdEhhbmRsZXJfID0gbmV3IFBvaW50ZXJIYW5kbGVyKHRoaXMudmlldy5lbGVtZW50KTtcbiAgICAgICAgdGhpcy5wdEhhbmRsZXJfLmVtaXR0ZXIub24oJ2Rvd24nLCB0aGlzLm9uUG9pbnRlckRvd25fKTtcbiAgICAgICAgdGhpcy5wdEhhbmRsZXJfLmVtaXR0ZXIub24oJ21vdmUnLCB0aGlzLm9uUG9pbnRlck1vdmVfKTtcbiAgICAgICAgdGhpcy5wdEhhbmRsZXJfLmVtaXR0ZXIub24oJ3VwJywgdGhpcy5vblBvaW50ZXJVcF8pO1xuICAgICAgICB0aGlzLnZpZXcuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd25fKTtcbiAgICAgICAgdGhpcy52aWV3LmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLm9uS2V5VXBfKTtcbiAgICB9XG4gICAgaGFuZGxlUG9pbnRlckV2ZW50XyhkLCBvcHRzKSB7XG4gICAgICAgIGlmICghZC5wb2ludCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGh1ZSA9IG1hcFJhbmdlKGNvbnN0cmFpblJhbmdlKGQucG9pbnQueCwgMCwgZC5ib3VuZHMud2lkdGgpLCAwLCBkLmJvdW5kcy53aWR0aCwgMCwgMzYwKTtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMudmFsdWUucmF3VmFsdWU7XG4gICAgICAgIGNvbnN0IFssIHMsIHYsIGFdID0gYy5nZXRDb21wb25lbnRzKCdoc3YnKTtcbiAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZShuZXcgSW50Q29sb3IoW2h1ZSwgcywgdiwgYV0sICdoc3YnKSwgb3B0cyk7XG4gICAgfVxuICAgIG9uUG9pbnRlckRvd25fKGV2KSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUG9pbnRlckV2ZW50Xyhldi5kYXRhLCB7XG4gICAgICAgICAgICBmb3JjZUVtaXQ6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblBvaW50ZXJNb3ZlXyhldikge1xuICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3Q6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25Qb2ludGVyVXBfKGV2KSB7XG4gICAgICAgIHRoaXMuaGFuZGxlUG9pbnRlckV2ZW50Xyhldi5kYXRhLCB7XG4gICAgICAgICAgICBmb3JjZUVtaXQ6IHRydWUsXG4gICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25LZXlEb3duXyhldikge1xuICAgICAgICBjb25zdCBzdGVwID0gZ2V0U3RlcEZvcktleShnZXRLZXlTY2FsZUZvckNvbG9yKGZhbHNlKSwgZ2V0SG9yaXpvbnRhbFN0ZXBLZXlzKGV2KSk7XG4gICAgICAgIGlmIChzdGVwID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYyA9IHRoaXMudmFsdWUucmF3VmFsdWU7XG4gICAgICAgIGNvbnN0IFtoLCBzLCB2LCBhXSA9IGMuZ2V0Q29tcG9uZW50cygnaHN2Jyk7XG4gICAgICAgIHRoaXMudmFsdWUuc2V0UmF3VmFsdWUobmV3IEludENvbG9yKFtoICsgc3RlcCwgcywgdiwgYV0sICdoc3YnKSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3Q6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25LZXlVcF8oZXYpIHtcbiAgICAgICAgY29uc3Qgc3RlcCA9IGdldFN0ZXBGb3JLZXkoZ2V0S2V5U2NhbGVGb3JDb2xvcihmYWxzZSksIGdldEhvcml6b250YWxTdGVwS2V5cyhldikpO1xuICAgICAgICBpZiAoc3RlcCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsdWUuc2V0UmF3VmFsdWUodGhpcy52YWx1ZS5yYXdWYWx1ZSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiB0cnVlLFxuICAgICAgICAgICAgbGFzdDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jb25zdCBjbiQ4ID0gQ2xhc3NOYW1lKCdzdnAnKTtcbmNvbnN0IENBTlZBU19SRVNPTCA9IDY0O1xuY2xhc3MgU3ZQYWxldHRlVmlldyB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlXyA9IHRoaXMub25WYWx1ZUNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uVmFsdWVDaGFuZ2VfKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiQ4KCkpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRUYWJJbmRleCh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBjb25zdCBjYW52YXNFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjYW52YXNFbGVtLmhlaWdodCA9IENBTlZBU19SRVNPTDtcbiAgICAgICAgY2FudmFzRWxlbS53aWR0aCA9IENBTlZBU19SRVNPTDtcbiAgICAgICAgY2FudmFzRWxlbS5jbGFzc0xpc3QuYWRkKGNuJDgoJ2MnKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjYW52YXNFbGVtKTtcbiAgICAgICAgdGhpcy5jYW52YXNFbGVtZW50ID0gY2FudmFzRWxlbTtcbiAgICAgICAgY29uc3QgbWFya2VyRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbWFya2VyRWxlbS5jbGFzc0xpc3QuYWRkKGNuJDgoJ20nKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChtYXJrZXJFbGVtKTtcbiAgICAgICAgdGhpcy5tYXJrZXJFbGVtXyA9IG1hcmtlckVsZW07XG4gICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgIH1cbiAgICB1cGRhdGVfKCkge1xuICAgICAgICBjb25zdCBjdHggPSBnZXRDYW52YXNDb250ZXh0KHRoaXMuY2FudmFzRWxlbWVudCk7XG4gICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYyA9IHRoaXMudmFsdWUucmF3VmFsdWU7XG4gICAgICAgIGNvbnN0IGhzdkNvbXBzID0gYy5nZXRDb21wb25lbnRzKCdoc3YnKTtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbnZhc0VsZW1lbnQud2lkdGg7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuY2FudmFzRWxlbWVudC5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IGltZ0RhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBjb25zdCBkYXRhID0gaW1nRGF0YS5kYXRhO1xuICAgICAgICBmb3IgKGxldCBpeSA9IDA7IGl5IDwgaGVpZ2h0OyBpeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpeCA9IDA7IGl4IDwgd2lkdGg7IGl4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gbWFwUmFuZ2UoaXgsIDAsIHdpZHRoLCAwLCAxMDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBtYXBSYW5nZShpeSwgMCwgaGVpZ2h0LCAxMDAsIDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJnYkNvbXBzID0gaHN2VG9SZ2JJbnQoaHN2Q29tcHNbMF0sIHMsIHYpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGkgPSAoaXkgKiB3aWR0aCArIGl4KSAqIDQ7XG4gICAgICAgICAgICAgICAgZGF0YVtpXSA9IHJnYkNvbXBzWzBdO1xuICAgICAgICAgICAgICAgIGRhdGFbaSArIDFdID0gcmdiQ29tcHNbMV07XG4gICAgICAgICAgICAgICAgZGF0YVtpICsgMl0gPSByZ2JDb21wc1syXTtcbiAgICAgICAgICAgICAgICBkYXRhW2kgKyAzXSA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGltZ0RhdGEsIDAsIDApO1xuICAgICAgICBjb25zdCBsZWZ0ID0gbWFwUmFuZ2UoaHN2Q29tcHNbMV0sIDAsIDEwMCwgMCwgMTAwKTtcbiAgICAgICAgdGhpcy5tYXJrZXJFbGVtXy5zdHlsZS5sZWZ0ID0gYCR7bGVmdH0lYDtcbiAgICAgICAgY29uc3QgdG9wID0gbWFwUmFuZ2UoaHN2Q29tcHNbMl0sIDAsIDEwMCwgMTAwLCAwKTtcbiAgICAgICAgdGhpcy5tYXJrZXJFbGVtXy5zdHlsZS50b3AgPSBgJHt0b3B9JWA7XG4gICAgfVxuICAgIG9uVmFsdWVDaGFuZ2VfKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICB9XG59XG5cbmNsYXNzIFN2UGFsZXR0ZUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMub25LZXlEb3duXyA9IHRoaXMub25LZXlEb3duXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uS2V5VXBfID0gdGhpcy5vbktleVVwXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUG9pbnRlckRvd25fID0gdGhpcy5vblBvaW50ZXJEb3duXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUG9pbnRlck1vdmVfID0gdGhpcy5vblBvaW50ZXJNb3ZlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUG9pbnRlclVwXyA9IHRoaXMub25Qb2ludGVyVXBfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFN2UGFsZXR0ZVZpZXcoZG9jLCB7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnB0SGFuZGxlcl8gPSBuZXcgUG9pbnRlckhhbmRsZXIodGhpcy52aWV3LmVsZW1lbnQpO1xuICAgICAgICB0aGlzLnB0SGFuZGxlcl8uZW1pdHRlci5vbignZG93bicsIHRoaXMub25Qb2ludGVyRG93bl8pO1xuICAgICAgICB0aGlzLnB0SGFuZGxlcl8uZW1pdHRlci5vbignbW92ZScsIHRoaXMub25Qb2ludGVyTW92ZV8pO1xuICAgICAgICB0aGlzLnB0SGFuZGxlcl8uZW1pdHRlci5vbigndXAnLCB0aGlzLm9uUG9pbnRlclVwXyk7XG4gICAgICAgIHRoaXMudmlldy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bl8pO1xuICAgICAgICB0aGlzLnZpZXcuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMub25LZXlVcF8pO1xuICAgIH1cbiAgICBoYW5kbGVQb2ludGVyRXZlbnRfKGQsIG9wdHMpIHtcbiAgICAgICAgaWYgKCFkLnBvaW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2F0dXJhdGlvbiA9IG1hcFJhbmdlKGQucG9pbnQueCwgMCwgZC5ib3VuZHMud2lkdGgsIDAsIDEwMCk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gbWFwUmFuZ2UoZC5wb2ludC55LCAwLCBkLmJvdW5kcy5oZWlnaHQsIDEwMCwgMCk7XG4gICAgICAgIGNvbnN0IFtoLCAsICwgYV0gPSB0aGlzLnZhbHVlLnJhd1ZhbHVlLmdldENvbXBvbmVudHMoJ2hzdicpO1xuICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKG5ldyBJbnRDb2xvcihbaCwgc2F0dXJhdGlvbiwgdmFsdWUsIGFdLCAnaHN2JyksIG9wdHMpO1xuICAgIH1cbiAgICBvblBvaW50ZXJEb3duXyhldikge1xuICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3Q6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25Qb2ludGVyTW92ZV8oZXYpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVQb2ludGVyRXZlbnRfKGV2LmRhdGEsIHtcbiAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICBsYXN0OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUG9pbnRlclVwXyhldikge1xuICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiB0cnVlLFxuICAgICAgICAgICAgbGFzdDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uS2V5RG93bl8oZXYpIHtcbiAgICAgICAgaWYgKGlzQXJyb3dLZXkoZXYua2V5KSkge1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbaCwgcywgdiwgYV0gPSB0aGlzLnZhbHVlLnJhd1ZhbHVlLmdldENvbXBvbmVudHMoJ2hzdicpO1xuICAgICAgICBjb25zdCBrZXlTY2FsZSA9IGdldEtleVNjYWxlRm9yQ29sb3IoZmFsc2UpO1xuICAgICAgICBjb25zdCBkcyA9IGdldFN0ZXBGb3JLZXkoa2V5U2NhbGUsIGdldEhvcml6b250YWxTdGVwS2V5cyhldikpO1xuICAgICAgICBjb25zdCBkdiA9IGdldFN0ZXBGb3JLZXkoa2V5U2NhbGUsIGdldFZlcnRpY2FsU3RlcEtleXMoZXYpKTtcbiAgICAgICAgaWYgKGRzID09PSAwICYmIGR2ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZShuZXcgSW50Q29sb3IoW2gsIHMgKyBkcywgdiArIGR2LCBhXSwgJ2hzdicpLCB7XG4gICAgICAgICAgICBmb3JjZUVtaXQ6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbktleVVwXyhldikge1xuICAgICAgICBjb25zdCBrZXlTY2FsZSA9IGdldEtleVNjYWxlRm9yQ29sb3IoZmFsc2UpO1xuICAgICAgICBjb25zdCBkcyA9IGdldFN0ZXBGb3JLZXkoa2V5U2NhbGUsIGdldEhvcml6b250YWxTdGVwS2V5cyhldikpO1xuICAgICAgICBjb25zdCBkdiA9IGdldFN0ZXBGb3JLZXkoa2V5U2NhbGUsIGdldFZlcnRpY2FsU3RlcEtleXMoZXYpKTtcbiAgICAgICAgaWYgKGRzID09PSAwICYmIGR2ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZSh0aGlzLnZhbHVlLnJhd1ZhbHVlLCB7XG4gICAgICAgICAgICBmb3JjZUVtaXQ6IHRydWUsXG4gICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIENvbG9yUGlja2VyQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICB0aGlzLmhQYWxldHRlQ18gPSBuZXcgSFBhbGV0dGVDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdlBhbGV0dGVDXyA9IG5ldyBTdlBhbGV0dGVDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hbHBoYUljc18gPSBjb25maWcuc3VwcG9ydHNBbHBoYVxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgcGFsZXR0ZTogbmV3IEFQYWxldHRlQ29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdGV4dDogbmV3IE51bWJlclRleHRDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZXI6IHBhcnNlTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBwcm9wczogVmFsdWVNYXAuZnJvbU9iamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyU2NhbGU6IDAuMDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlTY2FsZTogMC4xLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBjcmVhdGVOdW1iZXJGb3JtYXR0ZXIoMiksXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3JlYXRlVmFsdWUoMCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RyYWludDogbmV3IERlZmluaXRlUmFuZ2VDb25zdHJhaW50KHsgbWluOiAwLCBtYXg6IDEgfSksXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBpZiAodGhpcy5hbHBoYUljc18pIHtcbiAgICAgICAgICAgIGNvbm5lY3RWYWx1ZXMoe1xuICAgICAgICAgICAgICAgIHByaW1hcnk6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiB0aGlzLmFscGhhSWNzXy50ZXh0LnZhbHVlLFxuICAgICAgICAgICAgICAgIGZvcndhcmQ6IChwKSA9PiBwLmdldENvbXBvbmVudHMoKVszXSxcbiAgICAgICAgICAgICAgICBiYWNrd2FyZDogKHAsIHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcHMgPSBwLmdldENvbXBvbmVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgY29tcHNbM10gPSBzO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEludENvbG9yKGNvbXBzLCBwLm1vZGUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRleHRzQ18gPSBuZXcgQ29sb3JUZXh0c0NvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICBjb2xvclR5cGU6IGNvbmZpZy5jb2xvclR5cGUsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgQ29sb3JQaWNrZXJWaWV3KGRvYywge1xuICAgICAgICAgICAgYWxwaGFWaWV3czogdGhpcy5hbHBoYUljc19cbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgcGFsZXR0ZTogdGhpcy5hbHBoYUljc18ucGFsZXR0ZS52aWV3LFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLmFscGhhSWNzXy50ZXh0LnZpZXcsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgIGhQYWxldHRlVmlldzogdGhpcy5oUGFsZXR0ZUNfLnZpZXcsXG4gICAgICAgICAgICBzdXBwb3J0c0FscGhhOiBjb25maWcuc3VwcG9ydHNBbHBoYSxcbiAgICAgICAgICAgIHN2UGFsZXR0ZVZpZXc6IHRoaXMuc3ZQYWxldHRlQ18udmlldyxcbiAgICAgICAgICAgIHRleHRzVmlldzogdGhpcy50ZXh0c0NfLnZpZXcsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0IHRleHRzQ29udHJvbGxlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dHNDXztcbiAgICB9XG59XG5cbmNvbnN0IGNuJDcgPSBDbGFzc05hbWUoJ2NvbHN3Jyk7XG5jbGFzcyBDb2xvclN3YXRjaFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZV8gPSB0aGlzLm9uVmFsdWVDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIGNvbmZpZy52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uVmFsdWVDaGFuZ2VfKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiQ3KCkpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBjb25zdCBzd2F0Y2hFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzd2F0Y2hFbGVtLmNsYXNzTGlzdC5hZGQoY24kNygnc3cnKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChzd2F0Y2hFbGVtKTtcbiAgICAgICAgdGhpcy5zd2F0Y2hFbGVtXyA9IHN3YXRjaEVsZW07XG4gICAgICAgIGNvbnN0IGJ1dHRvbkVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbkVsZW0uY2xhc3NMaXN0LmFkZChjbiQ3KCdiJykpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmREaXNhYmxlZChidXR0b25FbGVtKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbkVsZW0pO1xuICAgICAgICB0aGlzLmJ1dHRvbkVsZW1lbnQgPSBidXR0b25FbGVtO1xuICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICB9XG4gICAgdXBkYXRlXygpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlLnJhd1ZhbHVlO1xuICAgICAgICB0aGlzLnN3YXRjaEVsZW1fLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yVG9IZXhSZ2JhU3RyaW5nKHZhbHVlKTtcbiAgICB9XG4gICAgb25WYWx1ZUNoYW5nZV8oKSB7XG4gICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgIH1cbn1cblxuY2xhc3MgQ29sb3JTd2F0Y2hDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBDb2xvclN3YXRjaFZpZXcoZG9jLCB7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY2xhc3MgQ29sb3JDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLm9uQnV0dG9uQmx1cl8gPSB0aGlzLm9uQnV0dG9uQmx1cl8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkJ1dHRvbkNsaWNrXyA9IHRoaXMub25CdXR0b25DbGlja18uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblBvcHVwQ2hpbGRCbHVyXyA9IHRoaXMub25Qb3B1cENoaWxkQmx1cl8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblBvcHVwQ2hpbGRLZXlkb3duXyA9IHRoaXMub25Qb3B1cENoaWxkS2V5ZG93bl8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICB0aGlzLmZvbGRhYmxlXyA9IEZvbGRhYmxlLmNyZWF0ZShjb25maWcuZXhwYW5kZWQpO1xuICAgICAgICB0aGlzLnN3YXRjaENfID0gbmV3IENvbG9yU3dhdGNoQ29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGJ1dHRvbkVsZW0gPSB0aGlzLnN3YXRjaENfLnZpZXcuYnV0dG9uRWxlbWVudDtcbiAgICAgICAgYnV0dG9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5vbkJ1dHRvbkJsdXJfKTtcbiAgICAgICAgYnV0dG9uRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25CdXR0b25DbGlja18pO1xuICAgICAgICB0aGlzLnRleHRDXyA9IG5ldyBUZXh0Q29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgIHBhcnNlcjogY29uZmlnLnBhcnNlcixcbiAgICAgICAgICAgIHByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGNvbmZpZy5mb3JtYXR0ZXIsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBDb2xvclZpZXcoZG9jLCB7XG4gICAgICAgICAgICBmb2xkYWJsZTogdGhpcy5mb2xkYWJsZV8sXG4gICAgICAgICAgICBwaWNrZXJMYXlvdXQ6IGNvbmZpZy5waWNrZXJMYXlvdXQsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZXcuc3dhdGNoRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnN3YXRjaENfLnZpZXcuZWxlbWVudCk7XG4gICAgICAgIHRoaXMudmlldy50ZXh0RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRleHRDXy52aWV3LmVsZW1lbnQpO1xuICAgICAgICB0aGlzLnBvcENfID1cbiAgICAgICAgICAgIGNvbmZpZy5waWNrZXJMYXlvdXQgPT09ICdwb3B1cCdcbiAgICAgICAgICAgICAgICA/IG5ldyBQb3B1cENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGNvbnN0IHBpY2tlckMgPSBuZXcgQ29sb3JQaWNrZXJDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgY29sb3JUeXBlOiBjb25maWcuY29sb3JUeXBlLFxuICAgICAgICAgICAgc3VwcG9ydHNBbHBoYTogY29uZmlnLnN1cHBvcnRzQWxwaGEsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICBwaWNrZXJDLnZpZXcuYWxsRm9jdXNhYmxlRWxlbWVudHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5vblBvcHVwQ2hpbGRCbHVyXyk7XG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uUG9wdXBDaGlsZEtleWRvd25fKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGlja2VyQ18gPSBwaWNrZXJDO1xuICAgICAgICBpZiAodGhpcy5wb3BDXykge1xuICAgICAgICAgICAgdGhpcy52aWV3LmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5wb3BDXy52aWV3LmVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5wb3BDXy52aWV3LmVsZW1lbnQuYXBwZW5kQ2hpbGQocGlja2VyQy52aWV3LmVsZW1lbnQpO1xuICAgICAgICAgICAgY29ubmVjdFZhbHVlcyh7XG4gICAgICAgICAgICAgICAgcHJpbWFyeTogdGhpcy5mb2xkYWJsZV8udmFsdWUoJ2V4cGFuZGVkJyksXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiB0aGlzLnBvcENfLnNob3dzLFxuICAgICAgICAgICAgICAgIGZvcndhcmQ6IChwKSA9PiBwLFxuICAgICAgICAgICAgICAgIGJhY2t3YXJkOiAoXywgcykgPT4gcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmlldy5waWNrZXJFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcucGlja2VyRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnBpY2tlckNfLnZpZXcuZWxlbWVudCk7XG4gICAgICAgICAgICBiaW5kRm9sZGFibGUodGhpcy5mb2xkYWJsZV8sIHRoaXMudmlldy5waWNrZXJFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgdGV4dENvbnRyb2xsZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHRDXztcbiAgICB9XG4gICAgb25CdXR0b25CbHVyXyhlKSB7XG4gICAgICAgIGlmICghdGhpcy5wb3BDXykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsZW0gPSB0aGlzLnZpZXcuZWxlbWVudDtcbiAgICAgICAgY29uc3QgbmV4dFRhcmdldCA9IGZvcmNlQ2FzdChlLnJlbGF0ZWRUYXJnZXQpO1xuICAgICAgICBpZiAoIW5leHRUYXJnZXQgfHwgIWVsZW0uY29udGFpbnMobmV4dFRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMucG9wQ18uc2hvd3MucmF3VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkJ1dHRvbkNsaWNrXygpIHtcbiAgICAgICAgdGhpcy5mb2xkYWJsZV8uc2V0KCdleHBhbmRlZCcsICF0aGlzLmZvbGRhYmxlXy5nZXQoJ2V4cGFuZGVkJykpO1xuICAgICAgICBpZiAodGhpcy5mb2xkYWJsZV8uZ2V0KCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tlckNfLnZpZXcuYWxsRm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblBvcHVwQ2hpbGRCbHVyXyhldikge1xuICAgICAgICBpZiAoIXRoaXMucG9wQ18pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5wb3BDXy52aWV3LmVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IG5leHRUYXJnZXQgPSBmaW5kTmV4dFRhcmdldChldik7XG4gICAgICAgIGlmIChuZXh0VGFyZ2V0ICYmIGVsZW0uY29udGFpbnMobmV4dFRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dFRhcmdldCAmJlxuICAgICAgICAgICAgbmV4dFRhcmdldCA9PT0gdGhpcy5zd2F0Y2hDXy52aWV3LmJ1dHRvbkVsZW1lbnQgJiZcbiAgICAgICAgICAgICFzdXBwb3J0c1RvdWNoKGVsZW0ub3duZXJEb2N1bWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvcENfLnNob3dzLnJhd1ZhbHVlID0gZmFsc2U7XG4gICAgfVxuICAgIG9uUG9wdXBDaGlsZEtleWRvd25fKGV2KSB7XG4gICAgICAgIGlmICh0aGlzLnBvcENfKSB7XG4gICAgICAgICAgICBpZiAoZXYua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICAgICAgICAgIHRoaXMucG9wQ18uc2hvd3MucmF3VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnZpZXcucGlja2VyRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGV2LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXRjaENfLnZpZXcuYnV0dG9uRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb2xvclRvUmdiTnVtYmVyKHZhbHVlKSB7XG4gICAgcmV0dXJuIHJlbW92ZUFscGhhQ29tcG9uZW50KHZhbHVlLmdldENvbXBvbmVudHMoJ3JnYicpKS5yZWR1Y2UoKHJlc3VsdCwgY29tcCkgPT4ge1xuICAgICAgICByZXR1cm4gKHJlc3VsdCA8PCA4KSB8IChNYXRoLmZsb29yKGNvbXApICYgMHhmZik7XG4gICAgfSwgMCk7XG59XG5mdW5jdGlvbiBjb2xvclRvUmdiYU51bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiAodmFsdWUuZ2V0Q29tcG9uZW50cygncmdiJykucmVkdWNlKChyZXN1bHQsIGNvbXAsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGhleCA9IE1hdGguZmxvb3IoaW5kZXggPT09IDMgPyBjb21wICogMjU1IDogY29tcCkgJiAweGZmO1xuICAgICAgICByZXR1cm4gKHJlc3VsdCA8PCA4KSB8IGhleDtcbiAgICB9LCAwKSA+Pj4gMCk7XG59XG5mdW5jdGlvbiBudW1iZXJUb1JnYkNvbG9yKG51bSkge1xuICAgIHJldHVybiBuZXcgSW50Q29sb3IoWyhudW0gPj4gMTYpICYgMHhmZiwgKG51bSA+PiA4KSAmIDB4ZmYsIG51bSAmIDB4ZmZdLCAncmdiJyk7XG59XG5mdW5jdGlvbiBudW1iZXJUb1JnYmFDb2xvcihudW0pIHtcbiAgICByZXR1cm4gbmV3IEludENvbG9yKFtcbiAgICAgICAgKG51bSA+PiAyNCkgJiAweGZmLFxuICAgICAgICAobnVtID4+IDE2KSAmIDB4ZmYsXG4gICAgICAgIChudW0gPj4gOCkgJiAweGZmLFxuICAgICAgICBtYXBSYW5nZShudW0gJiAweGZmLCAwLCAyNTUsIDAsIDEpLFxuICAgIF0sICdyZ2InKTtcbn1cbmZ1bmN0aW9uIGNvbG9yRnJvbVJnYk51bWJlcih2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBJbnRDb2xvci5ibGFjaygpO1xuICAgIH1cbiAgICByZXR1cm4gbnVtYmVyVG9SZ2JDb2xvcih2YWx1ZSk7XG59XG5mdW5jdGlvbiBjb2xvckZyb21SZ2JhTnVtYmVyKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIEludENvbG9yLmJsYWNrKCk7XG4gICAgfVxuICAgIHJldHVybiBudW1iZXJUb1JnYmFDb2xvcih2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGlzUmdiQ29sb3JDb21wb25lbnQob2JqLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgaXNFbXB0eShvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleSBpbiBvYmogJiYgdHlwZW9mIG9ialtrZXldID09PSAnbnVtYmVyJztcbn1cbmZ1bmN0aW9uIGlzUmdiQ29sb3JPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIChpc1JnYkNvbG9yQ29tcG9uZW50KG9iaiwgJ3InKSAmJlxuICAgICAgICBpc1JnYkNvbG9yQ29tcG9uZW50KG9iaiwgJ2cnKSAmJlxuICAgICAgICBpc1JnYkNvbG9yQ29tcG9uZW50KG9iaiwgJ2InKSk7XG59XG5mdW5jdGlvbiBpc1JnYmFDb2xvck9iamVjdChvYmopIHtcbiAgICByZXR1cm4gaXNSZ2JDb2xvck9iamVjdChvYmopICYmIGlzUmdiQ29sb3JDb21wb25lbnQob2JqLCAnYScpO1xufVxuZnVuY3Rpb24gaXNDb2xvck9iamVjdChvYmopIHtcbiAgICByZXR1cm4gaXNSZ2JDb2xvck9iamVjdChvYmopO1xufVxuZnVuY3Rpb24gZXF1YWxzQ29sb3IodjEsIHYyKSB7XG4gICAgaWYgKHYxLm1vZGUgIT09IHYyLm1vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodjEudHlwZSAhPT0gdjIudHlwZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGNvbXBzMSA9IHYxLmdldENvbXBvbmVudHMoKTtcbiAgICBjb25zdCBjb21wczIgPSB2Mi5nZXRDb21wb25lbnRzKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wczEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNvbXBzMVtpXSAhPT0gY29tcHMyW2ldKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBjcmVhdGVDb2xvckNvbXBvbmVudHNGcm9tUmdiT2JqZWN0KG9iaikge1xuICAgIHJldHVybiAnYScgaW4gb2JqID8gW29iai5yLCBvYmouZywgb2JqLmIsIG9iai5hXSA6IFtvYmouciwgb2JqLmcsIG9iai5iXTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29sb3JTdHJpbmdXcml0ZXIoZm9ybWF0KSB7XG4gICAgY29uc3Qgc3RyaW5naWZ5ID0gZmluZENvbG9yU3RyaW5naWZpZXIoZm9ybWF0KTtcbiAgICByZXR1cm4gc3RyaW5naWZ5XG4gICAgICAgID8gKHRhcmdldCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHdyaXRlUHJpbWl0aXZlKHRhcmdldCwgc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgOiBudWxsO1xufVxuZnVuY3Rpb24gY3JlYXRlQ29sb3JOdW1iZXJXcml0ZXIoc3VwcG9ydHNBbHBoYSkge1xuICAgIGNvbnN0IGNvbG9yVG9OdW1iZXIgPSBzdXBwb3J0c0FscGhhID8gY29sb3JUb1JnYmFOdW1iZXIgOiBjb2xvclRvUmdiTnVtYmVyO1xuICAgIHJldHVybiAodGFyZ2V0LCB2YWx1ZSkgPT4ge1xuICAgICAgICB3cml0ZVByaW1pdGl2ZSh0YXJnZXQsIGNvbG9yVG9OdW1iZXIodmFsdWUpKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gd3JpdGVSZ2JhQ29sb3JPYmplY3QodGFyZ2V0LCB2YWx1ZSwgdHlwZSkge1xuICAgIGNvbnN0IGNjID0gbWFwQ29sb3JUeXBlKHZhbHVlLCB0eXBlKTtcbiAgICBjb25zdCBvYmogPSBjYy50b1JnYmFPYmplY3QoKTtcbiAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgncicsIG9iai5yKTtcbiAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgnZycsIG9iai5nKTtcbiAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgnYicsIG9iai5iKTtcbiAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgnYScsIG9iai5hKTtcbn1cbmZ1bmN0aW9uIHdyaXRlUmdiQ29sb3JPYmplY3QodGFyZ2V0LCB2YWx1ZSwgdHlwZSkge1xuICAgIGNvbnN0IGNjID0gbWFwQ29sb3JUeXBlKHZhbHVlLCB0eXBlKTtcbiAgICBjb25zdCBvYmogPSBjYy50b1JnYmFPYmplY3QoKTtcbiAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgncicsIG9iai5yKTtcbiAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgnZycsIG9iai5nKTtcbiAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgnYicsIG9iai5iKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbG9yT2JqZWN0V3JpdGVyKHN1cHBvcnRzQWxwaGEsIHR5cGUpIHtcbiAgICByZXR1cm4gKHRhcmdldCwgaW5WYWx1ZSkgPT4ge1xuICAgICAgICBpZiAoc3VwcG9ydHNBbHBoYSkge1xuICAgICAgICAgICAgd3JpdGVSZ2JhQ29sb3JPYmplY3QodGFyZ2V0LCBpblZhbHVlLCB0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdyaXRlUmdiQ29sb3JPYmplY3QodGFyZ2V0LCBpblZhbHVlLCB0eXBlKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHNob3VsZFN1cHBvcnRBbHBoYSQxKGlucHV0UGFyYW1zKSB7XG4gICAgdmFyIF9hO1xuICAgIGlmICgoX2EgPSBpbnB1dFBhcmFtcyA9PT0gbnVsbCB8fCBpbnB1dFBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5wdXRQYXJhbXMuY29sb3IpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hbHBoYSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gY3JlYXRlRm9ybWF0dGVyJDEoc3VwcG9ydHNBbHBoYSkge1xuICAgIHJldHVybiBzdXBwb3J0c0FscGhhXG4gICAgICAgID8gKHYpID0+IGNvbG9yVG9IZXhSZ2JhU3RyaW5nKHYsICcweCcpXG4gICAgICAgIDogKHYpID0+IGNvbG9yVG9IZXhSZ2JTdHJpbmcodiwgJzB4Jyk7XG59XG5mdW5jdGlvbiBpc0ZvckNvbG9yKHBhcmFtcykge1xuICAgIGlmICgnY29sb3InIGluIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy52aWV3ID09PSAnY29sb3InKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5jb25zdCBOdW1iZXJDb2xvcklucHV0UGx1Z2luID0gY3JlYXRlUGx1Z2luKHtcbiAgICBpZDogJ2lucHV0LWNvbG9yLW51bWJlcicsXG4gICAgdHlwZTogJ2lucHV0JyxcbiAgICBhY2NlcHQ6ICh2YWx1ZSwgcGFyYW1zKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRm9yQ29sb3IocGFyYW1zKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VDb2xvcklucHV0UGFyYW1zKHBhcmFtcyk7XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHJlc3VsdCksIHsgc3VwcG9ydHNBbHBoYTogc2hvdWxkU3VwcG9ydEFscGhhJDEocGFyYW1zKSB9KSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9LFxuICAgIGJpbmRpbmc6IHtcbiAgICAgICAgcmVhZGVyOiAoYXJncykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3MucGFyYW1zLnN1cHBvcnRzQWxwaGFcbiAgICAgICAgICAgICAgICA/IGNvbG9yRnJvbVJnYmFOdW1iZXJcbiAgICAgICAgICAgICAgICA6IGNvbG9yRnJvbVJnYk51bWJlcjtcbiAgICAgICAgfSxcbiAgICAgICAgZXF1YWxzOiBlcXVhbHNDb2xvcixcbiAgICAgICAgd3JpdGVyOiAoYXJncykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUNvbG9yTnVtYmVyV3JpdGVyKGFyZ3MucGFyYW1zLnN1cHBvcnRzQWxwaGEpO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogKGFyZ3MpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvckNvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgY29sb3JUeXBlOiAnaW50JyxcbiAgICAgICAgICAgIGV4cGFuZGVkOiAoX2EgPSBhcmdzLnBhcmFtcy5leHBhbmRlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmFsc2UsXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGNyZWF0ZUZvcm1hdHRlciQxKGFyZ3MucGFyYW1zLnN1cHBvcnRzQWxwaGEpLFxuICAgICAgICAgICAgcGFyc2VyOiBjcmVhdGVDb2xvclN0cmluZ1BhcnNlcignaW50JyksXG4gICAgICAgICAgICBwaWNrZXJMYXlvdXQ6IChfYiA9IGFyZ3MucGFyYW1zLnBpY2tlcikgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJ3BvcHVwJyxcbiAgICAgICAgICAgIHN1cHBvcnRzQWxwaGE6IGFyZ3MucGFyYW1zLnN1cHBvcnRzQWxwaGEsXG4gICAgICAgICAgICB2YWx1ZTogYXJncy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgIH0sXG59KTtcblxuZnVuY3Rpb24gY29sb3JGcm9tT2JqZWN0KHZhbHVlLCB0eXBlKSB7XG4gICAgaWYgKCFpc0NvbG9yT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbWFwQ29sb3JUeXBlKEludENvbG9yLmJsYWNrKCksIHR5cGUpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ2ludCcpIHtcbiAgICAgICAgY29uc3QgY29tcHMgPSBjcmVhdGVDb2xvckNvbXBvbmVudHNGcm9tUmdiT2JqZWN0KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRDb2xvcihjb21wcywgJ3JnYicpO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICBjb25zdCBjb21wcyA9IGNyZWF0ZUNvbG9yQ29tcG9uZW50c0Zyb21SZ2JPYmplY3QodmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IEZsb2F0Q29sb3IoY29tcHMsICdyZ2InKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcENvbG9yVHlwZShJbnRDb2xvci5ibGFjaygpLCAnaW50Jyk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFN1cHBvcnRBbHBoYShpbml0aWFsVmFsdWUpIHtcbiAgICByZXR1cm4gaXNSZ2JhQ29sb3JPYmplY3QoaW5pdGlhbFZhbHVlKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbG9yT2JqZWN0QmluZGluZ1JlYWRlcih0eXBlKSB7XG4gICAgcmV0dXJuICh2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBjID0gY29sb3JGcm9tT2JqZWN0KHZhbHVlLCB0eXBlKTtcbiAgICAgICAgcmV0dXJuIG1hcENvbG9yVHlwZShjLCAnaW50Jyk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUNvbG9yT2JqZWN0Rm9ybWF0dGVyKHN1cHBvcnRzQWxwaGEsIHR5cGUpIHtcbiAgICByZXR1cm4gKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChzdXBwb3J0c0FscGhhKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sb3JUb09iamVjdFJnYmFTdHJpbmcodmFsdWUsIHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xvclRvT2JqZWN0UmdiU3RyaW5nKHZhbHVlLCB0eXBlKTtcbiAgICB9O1xufVxuY29uc3QgT2JqZWN0Q29sb3JJbnB1dFBsdWdpbiA9IGNyZWF0ZVBsdWdpbih7XG4gICAgaWQ6ICdpbnB1dC1jb2xvci1vYmplY3QnLFxuICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgYWNjZXB0OiAodmFsdWUsIHBhcmFtcykgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghaXNDb2xvck9iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlQ29sb3JJbnB1dFBhcmFtcyhwYXJhbXMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHBhcmFtczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCByZXN1bHQpLCB7IGNvbG9yVHlwZTogKF9hID0gZXh0cmFjdENvbG9yVHlwZShwYXJhbXMpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnaW50JyB9KSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9LFxuICAgIGJpbmRpbmc6IHtcbiAgICAgICAgcmVhZGVyOiAoYXJncykgPT4gY3JlYXRlQ29sb3JPYmplY3RCaW5kaW5nUmVhZGVyKGFyZ3MucGFyYW1zLmNvbG9yVHlwZSksXG4gICAgICAgIGVxdWFsczogZXF1YWxzQ29sb3IsXG4gICAgICAgIHdyaXRlcjogKGFyZ3MpID0+IGNyZWF0ZUNvbG9yT2JqZWN0V3JpdGVyKHNob3VsZFN1cHBvcnRBbHBoYShhcmdzLmluaXRpYWxWYWx1ZSksIGFyZ3MucGFyYW1zLmNvbG9yVHlwZSksXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAoYXJncykgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBzdXBwb3J0c0FscGhhID0gaXNSZ2JhQ29sb3JPYmplY3QoYXJncy5pbml0aWFsVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IENvbG9yQ29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICBjb2xvclR5cGU6IGFyZ3MucGFyYW1zLmNvbG9yVHlwZSxcbiAgICAgICAgICAgIGV4cGFuZGVkOiAoX2EgPSBhcmdzLnBhcmFtcy5leHBhbmRlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmFsc2UsXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGNyZWF0ZUNvbG9yT2JqZWN0Rm9ybWF0dGVyKHN1cHBvcnRzQWxwaGEsIGFyZ3MucGFyYW1zLmNvbG9yVHlwZSksXG4gICAgICAgICAgICBwYXJzZXI6IGNyZWF0ZUNvbG9yU3RyaW5nUGFyc2VyKCdpbnQnKSxcbiAgICAgICAgICAgIHBpY2tlckxheW91dDogKF9iID0gYXJncy5wYXJhbXMucGlja2VyKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAncG9wdXAnLFxuICAgICAgICAgICAgc3VwcG9ydHNBbHBoYTogc3VwcG9ydHNBbHBoYSxcbiAgICAgICAgICAgIHZhbHVlOiBhcmdzLnZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgfSxcbn0pO1xuXG5jb25zdCBTdHJpbmdDb2xvcklucHV0UGx1Z2luID0gY3JlYXRlUGx1Z2luKHtcbiAgICBpZDogJ2lucHV0LWNvbG9yLXN0cmluZycsXG4gICAgdHlwZTogJ2lucHV0JyxcbiAgICBhY2NlcHQ6ICh2YWx1ZSwgcGFyYW1zKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyYW1zLnZpZXcgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm9ybWF0ID0gZGV0ZWN0U3RyaW5nQ29sb3JGb3JtYXQodmFsdWUsIGV4dHJhY3RDb2xvclR5cGUocGFyYW1zKSk7XG4gICAgICAgIGlmICghZm9ybWF0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdHJpbmdpZmllciA9IGZpbmRDb2xvclN0cmluZ2lmaWVyKGZvcm1hdCk7XG4gICAgICAgIGlmICghc3RyaW5naWZpZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlQ29sb3JJbnB1dFBhcmFtcyhwYXJhbXMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHBhcmFtczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCByZXN1bHQpLCB7IGZvcm1hdDogZm9ybWF0LCBzdHJpbmdpZmllcjogc3RyaW5naWZpZXIgfSksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfSxcbiAgICBiaW5kaW5nOiB7XG4gICAgICAgIHJlYWRlcjogKCkgPT4gcmVhZEludENvbG9yU3RyaW5nLFxuICAgICAgICBlcXVhbHM6IGVxdWFsc0NvbG9yLFxuICAgICAgICB3cml0ZXI6IChhcmdzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3cml0ZXIgPSBjcmVhdGVDb2xvclN0cmluZ1dyaXRlcihhcmdzLnBhcmFtcy5mb3JtYXQpO1xuICAgICAgICAgICAgaWYgKCF3cml0ZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUcEVycm9yLm5vdEJpbmRhYmxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gd3JpdGVyO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogKGFyZ3MpID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvckNvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgY29sb3JUeXBlOiBhcmdzLnBhcmFtcy5mb3JtYXQudHlwZSxcbiAgICAgICAgICAgIGV4cGFuZGVkOiAoX2EgPSBhcmdzLnBhcmFtcy5leHBhbmRlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmFsc2UsXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGFyZ3MucGFyYW1zLnN0cmluZ2lmaWVyLFxuICAgICAgICAgICAgcGFyc2VyOiBjcmVhdGVDb2xvclN0cmluZ1BhcnNlcignaW50JyksXG4gICAgICAgICAgICBwaWNrZXJMYXlvdXQ6IChfYiA9IGFyZ3MucGFyYW1zLnBpY2tlcikgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJ3BvcHVwJyxcbiAgICAgICAgICAgIHN1cHBvcnRzQWxwaGE6IGFyZ3MucGFyYW1zLmZvcm1hdC5hbHBoYSxcbiAgICAgICAgICAgIHZhbHVlOiBhcmdzLnZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgfSxcbn0pO1xuXG5jbGFzcyBQb2ludE5kQ29uc3RyYWludCB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IGNvbmZpZy5jb21wb25lbnRzO1xuICAgICAgICB0aGlzLmFzbV8gPSBjb25maWcuYXNzZW1ibHk7XG4gICAgfVxuICAgIGNvbnN0cmFpbih2YWx1ZSkge1xuICAgICAgICBjb25zdCBjb21wcyA9IHRoaXMuYXNtX1xuICAgICAgICAgICAgLnRvQ29tcG9uZW50cyh2YWx1ZSlcbiAgICAgICAgICAgIC5tYXAoKGNvbXAsIGluZGV4KSA9PiB7IHZhciBfYSwgX2I7IHJldHVybiAoX2IgPSAoX2EgPSB0aGlzLmNvbXBvbmVudHNbaW5kZXhdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29uc3RyYWluKGNvbXApKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBjb21wOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXNtXy5mcm9tQ29tcG9uZW50cyhjb21wcyk7XG4gICAgfVxufVxuXG5jb25zdCBjbiQ2ID0gQ2xhc3NOYW1lKCdwbmR0eHQnKTtcbmNsYXNzIFBvaW50TmRUZXh0VmlldyB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy50ZXh0Vmlld3MgPSBjb25maWcudGV4dFZpZXdzO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNuJDYoKSk7XG4gICAgICAgIHRoaXMudGV4dFZpZXdzLmZvckVhY2goKHYpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGF4aXNFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYXhpc0VsZW0uY2xhc3NMaXN0LmFkZChjbiQ2KCdhJykpO1xuICAgICAgICAgICAgYXhpc0VsZW0uYXBwZW5kQ2hpbGQodi5lbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChheGlzRWxlbSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQXhpc0NvbnRyb2xsZXIoZG9jLCBjb25maWcsIGluZGV4KSB7XG4gICAgcmV0dXJuIG5ldyBOdW1iZXJUZXh0Q29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgYXJyYXlQb3NpdGlvbjogaW5kZXggPT09IDAgPyAnZnN0JyA6IGluZGV4ID09PSBjb25maWcuYXhlcy5sZW5ndGggLSAxID8gJ2xzdCcgOiAnbWlkJyxcbiAgICAgICAgcGFyc2VyOiBjb25maWcucGFyc2VyLFxuICAgICAgICBwcm9wczogY29uZmlnLmF4ZXNbaW5kZXhdLnRleHRQcm9wcyxcbiAgICAgICAgdmFsdWU6IGNyZWF0ZVZhbHVlKDAsIHtcbiAgICAgICAgICAgIGNvbnN0cmFpbnQ6IGNvbmZpZy5heGVzW2luZGV4XS5jb25zdHJhaW50LFxuICAgICAgICB9KSxcbiAgICAgICAgdmlld1Byb3BzOiBjb25maWcudmlld1Byb3BzLFxuICAgIH0pO1xufVxuY2xhc3MgUG9pbnROZFRleHRDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgIHRoaXMuYWNzXyA9IGNvbmZpZy5heGVzLm1hcCgoXywgaW5kZXgpID0+IGNyZWF0ZUF4aXNDb250cm9sbGVyKGRvYywgY29uZmlnLCBpbmRleCkpO1xuICAgICAgICB0aGlzLmFjc18uZm9yRWFjaCgoYywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbm5lY3RWYWx1ZXMoe1xuICAgICAgICAgICAgICAgIHByaW1hcnk6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5OiBjLnZhbHVlLFxuICAgICAgICAgICAgICAgIGZvcndhcmQ6IChwKSA9PiBjb25maWcuYXNzZW1ibHkudG9Db21wb25lbnRzKHApW2luZGV4XSxcbiAgICAgICAgICAgICAgICBiYWNrd2FyZDogKHAsIHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcHMgPSBjb25maWcuYXNzZW1ibHkudG9Db21wb25lbnRzKHApO1xuICAgICAgICAgICAgICAgICAgICBjb21wc1tpbmRleF0gPSBzO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnLmFzc2VtYmx5LmZyb21Db21wb25lbnRzKGNvbXBzKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgUG9pbnROZFRleHRWaWV3KGRvYywge1xuICAgICAgICAgICAgdGV4dFZpZXdzOiB0aGlzLmFjc18ubWFwKChhYykgPT4gYWMudmlldyksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgdGV4dENvbnRyb2xsZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3NfO1xuICAgIH1cbn1cblxuY2xhc3MgU2xpZGVySW5wdXRCaW5kaW5nQXBpIGV4dGVuZHMgQmluZGluZ0FwaSB7XG4gICAgZ2V0IG1heCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci52YWx1ZUNvbnRyb2xsZXIuc2xpZGVyQ29udHJvbGxlci5wcm9wcy5nZXQoJ21heCcpO1xuICAgIH1cbiAgICBzZXQgbWF4KG1heCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIudmFsdWVDb250cm9sbGVyLnNsaWRlckNvbnRyb2xsZXIucHJvcHMuc2V0KCdtYXgnLCBtYXgpO1xuICAgIH1cbiAgICBnZXQgbWluKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLnZhbHVlQ29udHJvbGxlci5zbGlkZXJDb250cm9sbGVyLnByb3BzLmdldCgnbWluJyk7XG4gICAgfVxuICAgIHNldCBtaW4obWF4KSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci52YWx1ZUNvbnRyb2xsZXIuc2xpZGVyQ29udHJvbGxlci5wcm9wcy5zZXQoJ21pbicsIG1heCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb25zdHJhaW50JDQocGFyYW1zLCBpbml0aWFsVmFsdWUpIHtcbiAgICBjb25zdCBjb25zdHJhaW50cyA9IFtdO1xuICAgIGNvbnN0IHNjID0gY3JlYXRlU3RlcENvbnN0cmFpbnQocGFyYW1zLCBpbml0aWFsVmFsdWUpO1xuICAgIGlmIChzYykge1xuICAgICAgICBjb25zdHJhaW50cy5wdXNoKHNjKTtcbiAgICB9XG4gICAgY29uc3QgcmMgPSBjcmVhdGVSYW5nZUNvbnN0cmFpbnQocGFyYW1zKTtcbiAgICBpZiAocmMpIHtcbiAgICAgICAgY29uc3RyYWludHMucHVzaChyYyk7XG4gICAgfVxuICAgIGNvbnN0IGxjID0gY3JlYXRlTGlzdENvbnN0cmFpbnQocGFyYW1zLm9wdGlvbnMpO1xuICAgIGlmIChsYykge1xuICAgICAgICBjb25zdHJhaW50cy5wdXNoKGxjKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDb21wb3NpdGVDb25zdHJhaW50KGNvbnN0cmFpbnRzKTtcbn1cbmNvbnN0IE51bWJlcklucHV0UGx1Z2luID0gY3JlYXRlUGx1Z2luKHtcbiAgICBpZDogJ2lucHV0LW51bWJlcicsXG4gICAgdHlwZTogJ2lucHV0JyxcbiAgICBhY2NlcHQ6ICh2YWx1ZSwgcGFyYW1zKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZVJlY29yZChwYXJhbXMsIChwKSA9PiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjcmVhdGVOdW1iZXJUZXh0SW5wdXRQYXJhbXNQYXJzZXIocCkpLCB7IG9wdGlvbnM6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlTGlzdE9wdGlvbnMpLCByZWFkb25seTogcC5vcHRpb25hbC5jb25zdGFudChmYWxzZSkgfSkpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHJlc3VsdCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9LFxuICAgIGJpbmRpbmc6IHtcbiAgICAgICAgcmVhZGVyOiAoX2FyZ3MpID0+IG51bWJlckZyb21Vbmtub3duLFxuICAgICAgICBjb25zdHJhaW50OiAoYXJncykgPT4gY3JlYXRlQ29uc3RyYWludCQ0KGFyZ3MucGFyYW1zLCBhcmdzLmluaXRpYWxWYWx1ZSksXG4gICAgICAgIHdyaXRlcjogKF9hcmdzKSA9PiB3cml0ZVByaW1pdGl2ZSxcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IChhcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXJncy52YWx1ZTtcbiAgICAgICAgY29uc3QgYyA9IGFyZ3MuY29uc3RyYWludDtcbiAgICAgICAgY29uc3QgbGMgPSBjICYmIGZpbmRDb25zdHJhaW50KGMsIExpc3RDb25zdHJhaW50KTtcbiAgICAgICAgaWYgKGxjKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IExpc3RDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICBwcm9wczogbmV3IFZhbHVlTWFwKHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogbGMudmFsdWVzLnZhbHVlKCdvcHRpb25zJyksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZXh0UHJvcHNPYmogPSBjcmVhdGVOdW1iZXJUZXh0UHJvcHNPYmplY3QoYXJncy5wYXJhbXMsIHZhbHVlLnJhd1ZhbHVlKTtcbiAgICAgICAgY29uc3QgZHJjID0gYyAmJiBmaW5kQ29uc3RyYWludChjLCBEZWZpbml0ZVJhbmdlQ29uc3RyYWludCk7XG4gICAgICAgIGlmIChkcmMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2xpZGVyVGV4dENvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjcmVhdGVTbGlkZXJUZXh0UHJvcHMoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0ZXh0UHJvcHNPYmopLCB7IGtleVNjYWxlOiBjcmVhdGVWYWx1ZSh0ZXh0UHJvcHNPYmoua2V5U2NhbGUpLCBtYXg6IGRyYy52YWx1ZXMudmFsdWUoJ21heCcpLCBtaW46IGRyYy52YWx1ZXMudmFsdWUoJ21pbicpIH0pKSksIHsgcGFyc2VyOiBwYXJzZU51bWJlciwgdmFsdWU6IHZhbHVlLCB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IE51bWJlclRleHRDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgIHBhcnNlcjogcGFyc2VOdW1iZXIsXG4gICAgICAgICAgICBwcm9wczogVmFsdWVNYXAuZnJvbU9iamVjdCh0ZXh0UHJvcHNPYmopLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBhcGkoYXJncykge1xuICAgICAgICBpZiAodHlwZW9mIGFyZ3MuY29udHJvbGxlci52YWx1ZS5yYXdWYWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLmNvbnRyb2xsZXIudmFsdWVDb250cm9sbGVyIGluc3RhbmNlb2YgU2xpZGVyVGV4dENvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2xpZGVySW5wdXRCaW5kaW5nQXBpKGFyZ3MuY29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3MuY29udHJvbGxlci52YWx1ZUNvbnRyb2xsZXIgaW5zdGFuY2VvZiBMaXN0Q29udHJvbGxlcikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBMaXN0SW5wdXRCaW5kaW5nQXBpKGFyZ3MuY29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbn0pO1xuXG5jbGFzcyBQb2ludDJkIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG4gICAgZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueV07XG4gICAgfVxuICAgIHN0YXRpYyBpc09iamVjdChvYmopIHtcbiAgICAgICAgaWYgKGlzRW1wdHkob2JqKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHggPSBvYmoueDtcbiAgICAgICAgY29uc3QgeSA9IG9iai55O1xuICAgICAgICBpZiAodHlwZW9mIHggIT09ICdudW1iZXInIHx8IHR5cGVvZiB5ICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzdGF0aWMgZXF1YWxzKHYxLCB2Mikge1xuICAgICAgICByZXR1cm4gdjEueCA9PT0gdjIueCAmJiB2MS55ID09PSB2Mi55O1xuICAgIH1cbiAgICB0b09iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMueCxcbiAgICAgICAgICAgIHk6IHRoaXMueSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5jb25zdCBQb2ludDJkQXNzZW1ibHkgPSB7XG4gICAgdG9Db21wb25lbnRzOiAocCkgPT4gcC5nZXRDb21wb25lbnRzKCksXG4gICAgZnJvbUNvbXBvbmVudHM6IChjb21wcykgPT4gbmV3IFBvaW50MmQoLi4uY29tcHMpLFxufTtcblxuY29uc3QgY24kNSA9IENsYXNzTmFtZSgncDJkJyk7XG5jbGFzcyBQb2ludDJkVmlldyB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiQ1KCkpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBiaW5kVmFsdWUoY29uZmlnLmV4cGFuZGVkLCB2YWx1ZVRvQ2xhc3NOYW1lKHRoaXMuZWxlbWVudCwgY24kNSh1bmRlZmluZWQsICdleHBhbmRlZCcpKSk7XG4gICAgICAgIGNvbnN0IGhlYWRFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoZWFkRWxlbS5jbGFzc0xpc3QuYWRkKGNuJDUoJ2gnKSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChoZWFkRWxlbSk7XG4gICAgICAgIGNvbnN0IGJ1dHRvbkVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbkVsZW0uY2xhc3NMaXN0LmFkZChjbiQ1KCdiJykpO1xuICAgICAgICBidXR0b25FbGVtLmFwcGVuZENoaWxkKGNyZWF0ZVN2Z0ljb25FbGVtZW50KGRvYywgJ3AyZHBhZCcpKTtcbiAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kRGlzYWJsZWQoYnV0dG9uRWxlbSk7XG4gICAgICAgIGhlYWRFbGVtLmFwcGVuZENoaWxkKGJ1dHRvbkVsZW0pO1xuICAgICAgICB0aGlzLmJ1dHRvbkVsZW1lbnQgPSBidXR0b25FbGVtO1xuICAgICAgICBjb25zdCB0ZXh0RWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGV4dEVsZW0uY2xhc3NMaXN0LmFkZChjbiQ1KCd0JykpO1xuICAgICAgICBoZWFkRWxlbS5hcHBlbmRDaGlsZCh0ZXh0RWxlbSk7XG4gICAgICAgIHRoaXMudGV4dEVsZW1lbnQgPSB0ZXh0RWxlbTtcbiAgICAgICAgaWYgKGNvbmZpZy5waWNrZXJMYXlvdXQgPT09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgICBjb25zdCBwaWNrZXJFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcGlja2VyRWxlbS5jbGFzc0xpc3QuYWRkKGNuJDUoJ3AnKSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocGlja2VyRWxlbSk7XG4gICAgICAgICAgICB0aGlzLnBpY2tlckVsZW1lbnQgPSBwaWNrZXJFbGVtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5waWNrZXJFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgY24kNCA9IENsYXNzTmFtZSgncDJkcCcpO1xuY2xhc3MgUG9pbnQyZFBpY2tlclZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMub25Gb2xkYWJsZUNoYW5nZV8gPSB0aGlzLm9uRm9sZGFibGVDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Qcm9wc0NoYW5nZV8gPSB0aGlzLm9uUHJvcHNDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZV8gPSB0aGlzLm9uVmFsdWVDaGFuZ2VfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucHJvcHNfID0gY29uZmlnLnByb3BzO1xuICAgICAgICB0aGlzLnByb3BzXy5lbWl0dGVyLm9uKCdjaGFuZ2UnLCB0aGlzLm9uUHJvcHNDaGFuZ2VfKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiQ0KCkpO1xuICAgICAgICBpZiAoY29uZmlnLmxheW91dCA9PT0gJ3BvcHVwJykge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY24kNCh1bmRlZmluZWQsICdwJykpO1xuICAgICAgICB9XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZENsYXNzTW9kaWZpZXJzKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IHBhZEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBhZEVsZW0uY2xhc3NMaXN0LmFkZChjbiQ0KCdwJykpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRUYWJJbmRleChwYWRFbGVtKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhZEVsZW0pO1xuICAgICAgICB0aGlzLnBhZEVsZW1lbnQgPSBwYWRFbGVtO1xuICAgICAgICBjb25zdCBzdmdFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsICdzdmcnKTtcbiAgICAgICAgc3ZnRWxlbS5jbGFzc0xpc3QuYWRkKGNuJDQoJ2cnKSk7XG4gICAgICAgIHRoaXMucGFkRWxlbWVudC5hcHBlbmRDaGlsZChzdmdFbGVtKTtcbiAgICAgICAgdGhpcy5zdmdFbGVtXyA9IHN2Z0VsZW07XG4gICAgICAgIGNvbnN0IHhBeGlzRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50TlMoU1ZHX05TLCAnbGluZScpO1xuICAgICAgICB4QXhpc0VsZW0uY2xhc3NMaXN0LmFkZChjbiQ0KCdheCcpKTtcbiAgICAgICAgeEF4aXNFbGVtLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4MScsICcwJyk7XG4gICAgICAgIHhBeGlzRWxlbS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneTEnLCAnNTAlJyk7XG4gICAgICAgIHhBeGlzRWxlbS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneDInLCAnMTAwJScpO1xuICAgICAgICB4QXhpc0VsZW0uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3kyJywgJzUwJScpO1xuICAgICAgICB0aGlzLnN2Z0VsZW1fLmFwcGVuZENoaWxkKHhBeGlzRWxlbSk7XG4gICAgICAgIGNvbnN0IHlBeGlzRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50TlMoU1ZHX05TLCAnbGluZScpO1xuICAgICAgICB5QXhpc0VsZW0uY2xhc3NMaXN0LmFkZChjbiQ0KCdheCcpKTtcbiAgICAgICAgeUF4aXNFbGVtLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4MScsICc1MCUnKTtcbiAgICAgICAgeUF4aXNFbGVtLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5MScsICcwJyk7XG4gICAgICAgIHlBeGlzRWxlbS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneDInLCAnNTAlJyk7XG4gICAgICAgIHlBeGlzRWxlbS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneTInLCAnMTAwJScpO1xuICAgICAgICB0aGlzLnN2Z0VsZW1fLmFwcGVuZENoaWxkKHlBeGlzRWxlbSk7XG4gICAgICAgIGNvbnN0IGxpbmVFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsICdsaW5lJyk7XG4gICAgICAgIGxpbmVFbGVtLmNsYXNzTGlzdC5hZGQoY24kNCgnbCcpKTtcbiAgICAgICAgbGluZUVsZW0uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gxJywgJzUwJScpO1xuICAgICAgICBsaW5lRWxlbS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneTEnLCAnNTAlJyk7XG4gICAgICAgIHRoaXMuc3ZnRWxlbV8uYXBwZW5kQ2hpbGQobGluZUVsZW0pO1xuICAgICAgICB0aGlzLmxpbmVFbGVtXyA9IGxpbmVFbGVtO1xuICAgICAgICBjb25zdCBtYXJrZXJFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBtYXJrZXJFbGVtLmNsYXNzTGlzdC5hZGQoY24kNCgnbScpKTtcbiAgICAgICAgdGhpcy5wYWRFbGVtZW50LmFwcGVuZENoaWxkKG1hcmtlckVsZW0pO1xuICAgICAgICB0aGlzLm1hcmtlckVsZW1fID0gbWFya2VyRWxlbTtcbiAgICAgICAgY29uZmlnLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25WYWx1ZUNoYW5nZV8pO1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICB9XG4gICAgZ2V0IGFsbEZvY3VzYWJsZUVsZW1lbnRzKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMucGFkRWxlbWVudF07XG4gICAgfVxuICAgIHVwZGF0ZV8oKSB7XG4gICAgICAgIGNvbnN0IFt4LCB5XSA9IHRoaXMudmFsdWUucmF3VmFsdWUuZ2V0Q29tcG9uZW50cygpO1xuICAgICAgICBjb25zdCBtYXggPSB0aGlzLnByb3BzXy5nZXQoJ21heCcpO1xuICAgICAgICBjb25zdCBweCA9IG1hcFJhbmdlKHgsIC1tYXgsICttYXgsIDAsIDEwMCk7XG4gICAgICAgIGNvbnN0IHB5ID0gbWFwUmFuZ2UoeSwgLW1heCwgK21heCwgMCwgMTAwKTtcbiAgICAgICAgY29uc3QgaXB5ID0gdGhpcy5wcm9wc18uZ2V0KCdpbnZlcnRzWScpID8gMTAwIC0gcHkgOiBweTtcbiAgICAgICAgdGhpcy5saW5lRWxlbV8uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gyJywgYCR7cHh9JWApO1xuICAgICAgICB0aGlzLmxpbmVFbGVtXy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneTInLCBgJHtpcHl9JWApO1xuICAgICAgICB0aGlzLm1hcmtlckVsZW1fLnN0eWxlLmxlZnQgPSBgJHtweH0lYDtcbiAgICAgICAgdGhpcy5tYXJrZXJFbGVtXy5zdHlsZS50b3AgPSBgJHtpcHl9JWA7XG4gICAgfVxuICAgIG9uVmFsdWVDaGFuZ2VfKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICB9XG4gICAgb25Qcm9wc0NoYW5nZV8oKSB7XG4gICAgICAgIHRoaXMudXBkYXRlXygpO1xuICAgIH1cbiAgICBvbkZvbGRhYmxlQ2hhbmdlXygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb21wdXRlT2Zmc2V0KGV2LCBrZXlTY2FsZXMsIGludmVydHNZKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgZ2V0U3RlcEZvcktleShrZXlTY2FsZXNbMF0sIGdldEhvcml6b250YWxTdGVwS2V5cyhldikpLFxuICAgICAgICBnZXRTdGVwRm9yS2V5KGtleVNjYWxlc1sxXSwgZ2V0VmVydGljYWxTdGVwS2V5cyhldikpICogKGludmVydHNZID8gMSA6IC0xKSxcbiAgICBdO1xufVxuY2xhc3MgUG9pbnQyZFBpY2tlckNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMub25QYWRLZXlEb3duXyA9IHRoaXMub25QYWRLZXlEb3duXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUGFkS2V5VXBfID0gdGhpcy5vblBhZEtleVVwXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUG9pbnRlckRvd25fID0gdGhpcy5vblBvaW50ZXJEb3duXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUG9pbnRlck1vdmVfID0gdGhpcy5vblBvaW50ZXJNb3ZlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUG9pbnRlclVwXyA9IHRoaXMub25Qb2ludGVyVXBfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucHJvcHMgPSBjb25maWcucHJvcHM7XG4gICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFBvaW50MmRQaWNrZXJWaWV3KGRvYywge1xuICAgICAgICAgICAgbGF5b3V0OiBjb25maWcubGF5b3V0LFxuICAgICAgICAgICAgcHJvcHM6IHRoaXMucHJvcHMsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnB0SGFuZGxlcl8gPSBuZXcgUG9pbnRlckhhbmRsZXIodGhpcy52aWV3LnBhZEVsZW1lbnQpO1xuICAgICAgICB0aGlzLnB0SGFuZGxlcl8uZW1pdHRlci5vbignZG93bicsIHRoaXMub25Qb2ludGVyRG93bl8pO1xuICAgICAgICB0aGlzLnB0SGFuZGxlcl8uZW1pdHRlci5vbignbW92ZScsIHRoaXMub25Qb2ludGVyTW92ZV8pO1xuICAgICAgICB0aGlzLnB0SGFuZGxlcl8uZW1pdHRlci5vbigndXAnLCB0aGlzLm9uUG9pbnRlclVwXyk7XG4gICAgICAgIHRoaXMudmlldy5wYWRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uUGFkS2V5RG93bl8pO1xuICAgICAgICB0aGlzLnZpZXcucGFkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHRoaXMub25QYWRLZXlVcF8pO1xuICAgIH1cbiAgICBoYW5kbGVQb2ludGVyRXZlbnRfKGQsIG9wdHMpIHtcbiAgICAgICAgaWYgKCFkLnBvaW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWF4ID0gdGhpcy5wcm9wcy5nZXQoJ21heCcpO1xuICAgICAgICBjb25zdCBweCA9IG1hcFJhbmdlKGQucG9pbnQueCwgMCwgZC5ib3VuZHMud2lkdGgsIC1tYXgsICttYXgpO1xuICAgICAgICBjb25zdCBweSA9IG1hcFJhbmdlKHRoaXMucHJvcHMuZ2V0KCdpbnZlcnRzWScpID8gZC5ib3VuZHMuaGVpZ2h0IC0gZC5wb2ludC55IDogZC5wb2ludC55LCAwLCBkLmJvdW5kcy5oZWlnaHQsIC1tYXgsICttYXgpO1xuICAgICAgICB0aGlzLnZhbHVlLnNldFJhd1ZhbHVlKG5ldyBQb2ludDJkKHB4LCBweSksIG9wdHMpO1xuICAgIH1cbiAgICBvblBvaW50ZXJEb3duXyhldikge1xuICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3Q6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25Qb2ludGVyTW92ZV8oZXYpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVQb2ludGVyRXZlbnRfKGV2LmRhdGEsIHtcbiAgICAgICAgICAgIGZvcmNlRW1pdDogZmFsc2UsXG4gICAgICAgICAgICBsYXN0OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUG9pbnRlclVwXyhldikge1xuICAgICAgICB0aGlzLmhhbmRsZVBvaW50ZXJFdmVudF8oZXYuZGF0YSwge1xuICAgICAgICAgICAgZm9yY2VFbWl0OiB0cnVlLFxuICAgICAgICAgICAgbGFzdDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uUGFkS2V5RG93bl8oZXYpIHtcbiAgICAgICAgaWYgKGlzQXJyb3dLZXkoZXYua2V5KSkge1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbZHgsIGR5XSA9IGNvbXB1dGVPZmZzZXQoZXYsIFt0aGlzLnByb3BzLmdldCgneEtleVNjYWxlJyksIHRoaXMucHJvcHMuZ2V0KCd5S2V5U2NhbGUnKV0sIHRoaXMucHJvcHMuZ2V0KCdpbnZlcnRzWScpKTtcbiAgICAgICAgaWYgKGR4ID09PSAwICYmIGR5ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZShuZXcgUG9pbnQyZCh0aGlzLnZhbHVlLnJhd1ZhbHVlLnggKyBkeCwgdGhpcy52YWx1ZS5yYXdWYWx1ZS55ICsgZHkpLCB7XG4gICAgICAgICAgICBmb3JjZUVtaXQ6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblBhZEtleVVwXyhldikge1xuICAgICAgICBjb25zdCBbZHgsIGR5XSA9IGNvbXB1dGVPZmZzZXQoZXYsIFt0aGlzLnByb3BzLmdldCgneEtleVNjYWxlJyksIHRoaXMucHJvcHMuZ2V0KCd5S2V5U2NhbGUnKV0sIHRoaXMucHJvcHMuZ2V0KCdpbnZlcnRzWScpKTtcbiAgICAgICAgaWYgKGR4ID09PSAwICYmIGR5ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZS5zZXRSYXdWYWx1ZSh0aGlzLnZhbHVlLnJhd1ZhbHVlLCB7XG4gICAgICAgICAgICBmb3JjZUVtaXQ6IHRydWUsXG4gICAgICAgICAgICBsYXN0OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIFBvaW50MmRDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB0aGlzLm9uUG9wdXBDaGlsZEJsdXJfID0gdGhpcy5vblBvcHVwQ2hpbGRCbHVyXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUG9wdXBDaGlsZEtleWRvd25fID0gdGhpcy5vblBvcHVwQ2hpbGRLZXlkb3duXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUGFkQnV0dG9uQmx1cl8gPSB0aGlzLm9uUGFkQnV0dG9uQmx1cl8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblBhZEJ1dHRvbkNsaWNrXyA9IHRoaXMub25QYWRCdXR0b25DbGlja18uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGNvbmZpZy52YWx1ZTtcbiAgICAgICAgdGhpcy52aWV3UHJvcHMgPSBjb25maWcudmlld1Byb3BzO1xuICAgICAgICB0aGlzLmZvbGRhYmxlXyA9IEZvbGRhYmxlLmNyZWF0ZShjb25maWcuZXhwYW5kZWQpO1xuICAgICAgICB0aGlzLnBvcENfID1cbiAgICAgICAgICAgIGNvbmZpZy5waWNrZXJMYXlvdXQgPT09ICdwb3B1cCdcbiAgICAgICAgICAgICAgICA/IG5ldyBQb3B1cENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGNvbnN0IHBhZEMgPSBuZXcgUG9pbnQyZFBpY2tlckNvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICBsYXlvdXQ6IGNvbmZpZy5waWNrZXJMYXlvdXQsXG4gICAgICAgICAgICBwcm9wczogbmV3IFZhbHVlTWFwKHtcbiAgICAgICAgICAgICAgICBpbnZlcnRzWTogY3JlYXRlVmFsdWUoY29uZmlnLmludmVydHNZKSxcbiAgICAgICAgICAgICAgICBtYXg6IGNyZWF0ZVZhbHVlKGNvbmZpZy5tYXgpLFxuICAgICAgICAgICAgICAgIHhLZXlTY2FsZTogY29uZmlnLmF4ZXNbMF0udGV4dFByb3BzLnZhbHVlKCdrZXlTY2FsZScpLFxuICAgICAgICAgICAgICAgIHlLZXlTY2FsZTogY29uZmlnLmF4ZXNbMV0udGV4dFByb3BzLnZhbHVlKCdrZXlTY2FsZScpLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICBwYWRDLnZpZXcuYWxsRm9jdXNhYmxlRWxlbWVudHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5vblBvcHVwQ2hpbGRCbHVyXyk7XG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uUG9wdXBDaGlsZEtleWRvd25fKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGlja2VyQ18gPSBwYWRDO1xuICAgICAgICB0aGlzLnRleHRDXyA9IG5ldyBQb2ludE5kVGV4dENvbnRyb2xsZXIoZG9jLCB7XG4gICAgICAgICAgICBhc3NlbWJseTogUG9pbnQyZEFzc2VtYmx5LFxuICAgICAgICAgICAgYXhlczogY29uZmlnLmF4ZXMsXG4gICAgICAgICAgICBwYXJzZXI6IGNvbmZpZy5wYXJzZXIsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogdGhpcy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgUG9pbnQyZFZpZXcoZG9jLCB7XG4gICAgICAgICAgICBleHBhbmRlZDogdGhpcy5mb2xkYWJsZV8udmFsdWUoJ2V4cGFuZGVkJyksXG4gICAgICAgICAgICBwaWNrZXJMYXlvdXQ6IGNvbmZpZy5waWNrZXJMYXlvdXQsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aWV3LnRleHRFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGV4dENfLnZpZXcuZWxlbWVudCk7XG4gICAgICAgIChfYSA9IHRoaXMudmlldy5idXR0b25FbGVtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMub25QYWRCdXR0b25CbHVyXyk7XG4gICAgICAgIChfYiA9IHRoaXMudmlldy5idXR0b25FbGVtZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uUGFkQnV0dG9uQ2xpY2tfKTtcbiAgICAgICAgaWYgKHRoaXMucG9wQ18pIHtcbiAgICAgICAgICAgIHRoaXMudmlldy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucG9wQ18udmlldy5lbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMucG9wQ18udmlldy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGlja2VyQ18udmlldy5lbGVtZW50KTtcbiAgICAgICAgICAgIGNvbm5lY3RWYWx1ZXMoe1xuICAgICAgICAgICAgICAgIHByaW1hcnk6IHRoaXMuZm9sZGFibGVfLnZhbHVlKCdleHBhbmRlZCcpLFxuICAgICAgICAgICAgICAgIHNlY29uZGFyeTogdGhpcy5wb3BDXy5zaG93cyxcbiAgICAgICAgICAgICAgICBmb3J3YXJkOiAocCkgPT4gcCxcbiAgICAgICAgICAgICAgICBiYWNrd2FyZDogKF8sIHMpID0+IHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnZpZXcucGlja2VyRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy52aWV3LnBpY2tlckVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5waWNrZXJDXy52aWV3LmVsZW1lbnQpO1xuICAgICAgICAgICAgYmluZEZvbGRhYmxlKHRoaXMuZm9sZGFibGVfLCB0aGlzLnZpZXcucGlja2VyRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHRleHRDb250cm9sbGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0Q187XG4gICAgfVxuICAgIG9uUGFkQnV0dG9uQmx1cl8oZSkge1xuICAgICAgICBpZiAoIXRoaXMucG9wQ18pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbGVtID0gdGhpcy52aWV3LmVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IG5leHRUYXJnZXQgPSBmb3JjZUNhc3QoZS5yZWxhdGVkVGFyZ2V0KTtcbiAgICAgICAgaWYgKCFuZXh0VGFyZ2V0IHx8ICFlbGVtLmNvbnRhaW5zKG5leHRUYXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnBvcENfLnNob3dzLnJhd1ZhbHVlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25QYWRCdXR0b25DbGlja18oKSB7XG4gICAgICAgIHRoaXMuZm9sZGFibGVfLnNldCgnZXhwYW5kZWQnLCAhdGhpcy5mb2xkYWJsZV8uZ2V0KCdleHBhbmRlZCcpKTtcbiAgICAgICAgaWYgKHRoaXMuZm9sZGFibGVfLmdldCgnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgdGhpcy5waWNrZXJDXy52aWV3LmFsbEZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25Qb3B1cENoaWxkQmx1cl8oZXYpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBvcENfKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMucG9wQ18udmlldy5lbGVtZW50O1xuICAgICAgICBjb25zdCBuZXh0VGFyZ2V0ID0gZmluZE5leHRUYXJnZXQoZXYpO1xuICAgICAgICBpZiAobmV4dFRhcmdldCAmJiBlbGVtLmNvbnRhaW5zKG5leHRUYXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRUYXJnZXQgJiZcbiAgICAgICAgICAgIG5leHRUYXJnZXQgPT09IHRoaXMudmlldy5idXR0b25FbGVtZW50ICYmXG4gICAgICAgICAgICAhc3VwcG9ydHNUb3VjaChlbGVtLm93bmVyRG9jdW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3BDXy5zaG93cy5yYXdWYWx1ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBvblBvcHVwQ2hpbGRLZXlkb3duXyhldikge1xuICAgICAgICBpZiAodGhpcy5wb3BDXykge1xuICAgICAgICAgICAgaWYgKGV2LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcENfLnNob3dzLnJhd1ZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy52aWV3LnBpY2tlckVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChldi5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3LmJ1dHRvbkVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcG9pbnQyZEZyb21Vbmtub3duKHZhbHVlKSB7XG4gICAgcmV0dXJuIFBvaW50MmQuaXNPYmplY3QodmFsdWUpXG4gICAgICAgID8gbmV3IFBvaW50MmQodmFsdWUueCwgdmFsdWUueSlcbiAgICAgICAgOiBuZXcgUG9pbnQyZCgpO1xufVxuZnVuY3Rpb24gd3JpdGVQb2ludDJkKHRhcmdldCwgdmFsdWUpIHtcbiAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgneCcsIHZhbHVlLngpO1xuICAgIHRhcmdldC53cml0ZVByb3BlcnR5KCd5JywgdmFsdWUueSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnN0cmFpbnQkMyhwYXJhbXMsIGluaXRpYWxWYWx1ZSkge1xuICAgIHJldHVybiBuZXcgUG9pbnROZENvbnN0cmFpbnQoe1xuICAgICAgICBhc3NlbWJseTogUG9pbnQyZEFzc2VtYmx5LFxuICAgICAgICBjb21wb25lbnRzOiBbXG4gICAgICAgICAgICBjcmVhdGVEaW1lbnNpb25Db25zdHJhaW50KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zKSwgcGFyYW1zLngpLCBpbml0aWFsVmFsdWUueCksXG4gICAgICAgICAgICBjcmVhdGVEaW1lbnNpb25Db25zdHJhaW50KE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zKSwgcGFyYW1zLnkpLCBpbml0aWFsVmFsdWUueSksXG4gICAgICAgIF0sXG4gICAgfSk7XG59XG5mdW5jdGlvbiBnZXRTdWl0YWJsZU1heERpbWVuc2lvblZhbHVlKHBhcmFtcywgcmF3VmFsdWUpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGlmICghaXNFbXB0eShwYXJhbXMubWluKSB8fCAhaXNFbXB0eShwYXJhbXMubWF4KSkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5hYnMoKF9hID0gcGFyYW1zLm1pbikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMCksIE1hdGguYWJzKChfYiA9IHBhcmFtcy5tYXgpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDApKTtcbiAgICB9XG4gICAgY29uc3Qgc3RlcCA9IGdldFN1aXRhYmxlS2V5U2NhbGUocGFyYW1zKTtcbiAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5hYnMoc3RlcCkgKiAxMCwgTWF0aC5hYnMocmF3VmFsdWUpICogMTApO1xufVxuZnVuY3Rpb24gZ2V0U3VpdGFibGVNYXgocGFyYW1zLCBpbml0aWFsVmFsdWUpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IHhyID0gZ2V0U3VpdGFibGVNYXhEaW1lbnNpb25WYWx1ZShkZWVwTWVyZ2UocGFyYW1zLCAoKF9hID0gcGFyYW1zLngpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHt9KSksIGluaXRpYWxWYWx1ZS54KTtcbiAgICBjb25zdCB5ciA9IGdldFN1aXRhYmxlTWF4RGltZW5zaW9uVmFsdWUoZGVlcE1lcmdlKHBhcmFtcywgKChfYiA9IHBhcmFtcy55KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB7fSkpLCBpbml0aWFsVmFsdWUueSk7XG4gICAgcmV0dXJuIE1hdGgubWF4KHhyLCB5cik7XG59XG5mdW5jdGlvbiBzaG91bGRJbnZlcnRZKHBhcmFtcykge1xuICAgIGlmICghKCd5JyBpbiBwYXJhbXMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgeVBhcmFtcyA9IHBhcmFtcy55O1xuICAgIGlmICgheVBhcmFtcykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAnaW52ZXJ0ZWQnIGluIHlQYXJhbXMgPyAhIXlQYXJhbXMuaW52ZXJ0ZWQgOiBmYWxzZTtcbn1cbmNvbnN0IFBvaW50MmRJbnB1dFBsdWdpbiA9IGNyZWF0ZVBsdWdpbih7XG4gICAgaWQ6ICdpbnB1dC1wb2ludDJkJyxcbiAgICB0eXBlOiAnaW5wdXQnLFxuICAgIGFjY2VwdDogKHZhbHVlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgaWYgKCFQb2ludDJkLmlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VSZWNvcmQocGFyYW1zLCAocCkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY3JlYXRlUG9pbnREaW1lbnNpb25QYXJzZXIocCkpLCB7IGV4cGFuZGVkOiBwLm9wdGlvbmFsLmJvb2xlYW4sIHBpY2tlcjogcC5vcHRpb25hbC5jdXN0b20ocGFyc2VQaWNrZXJMYXlvdXQpLCByZWFkb25seTogcC5vcHRpb25hbC5jb25zdGFudChmYWxzZSksIHg6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlUG9pbnREaW1lbnNpb25QYXJhbXMpLCB5OiBwLm9wdGlvbmFsLm9iamVjdChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNyZWF0ZVBvaW50RGltZW5zaW9uUGFyc2VyKHApKSwgeyBpbnZlcnRlZDogcC5vcHRpb25hbC5ib29sZWFuIH0pKSB9KSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH0sXG4gICAgYmluZGluZzoge1xuICAgICAgICByZWFkZXI6ICgpID0+IHBvaW50MmRGcm9tVW5rbm93bixcbiAgICAgICAgY29uc3RyYWludDogKGFyZ3MpID0+IGNyZWF0ZUNvbnN0cmFpbnQkMyhhcmdzLnBhcmFtcywgYXJncy5pbml0aWFsVmFsdWUpLFxuICAgICAgICBlcXVhbHM6IFBvaW50MmQuZXF1YWxzLFxuICAgICAgICB3cml0ZXI6ICgpID0+IHdyaXRlUG9pbnQyZCxcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IChhcmdzKSA9PiB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IGRvYyA9IGFyZ3MuZG9jdW1lbnQ7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXJncy52YWx1ZTtcbiAgICAgICAgY29uc3QgYyA9IGFyZ3MuY29uc3RyYWludDtcbiAgICAgICAgY29uc3QgZFBhcmFtcyA9IFthcmdzLnBhcmFtcy54LCBhcmdzLnBhcmFtcy55XTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludDJkQ29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgIGF4ZXM6IHZhbHVlLnJhd1ZhbHVlLmdldENvbXBvbmVudHMoKS5tYXAoKGNvbXAsIGkpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVBvaW50QXhpcyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0cmFpbnQ6IGMuY29tcG9uZW50c1tpXSxcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBjb21wLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRlZXBNZXJnZShhcmdzLnBhcmFtcywgKChfYSA9IGRQYXJhbXNbaV0pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHt9KSksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGV4cGFuZGVkOiAoX2EgPSBhcmdzLnBhcmFtcy5leHBhbmRlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmFsc2UsXG4gICAgICAgICAgICBpbnZlcnRzWTogc2hvdWxkSW52ZXJ0WShhcmdzLnBhcmFtcyksXG4gICAgICAgICAgICBtYXg6IGdldFN1aXRhYmxlTWF4KGFyZ3MucGFyYW1zLCB2YWx1ZS5yYXdWYWx1ZSksXG4gICAgICAgICAgICBwYXJzZXI6IHBhcnNlTnVtYmVyLFxuICAgICAgICAgICAgcGlja2VyTGF5b3V0OiAoX2IgPSBhcmdzLnBhcmFtcy5waWNrZXIpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICdwb3B1cCcsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICB9LFxufSk7XG5cbmNsYXNzIFBvaW50M2Qge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwgeiA9IDApIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy56ID0gejtcbiAgICB9XG4gICAgZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueSwgdGhpcy56XTtcbiAgICB9XG4gICAgc3RhdGljIGlzT2JqZWN0KG9iaikge1xuICAgICAgICBpZiAoaXNFbXB0eShvYmopKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeCA9IG9iai54O1xuICAgICAgICBjb25zdCB5ID0gb2JqLnk7XG4gICAgICAgIGNvbnN0IHogPSBvYmouejtcbiAgICAgICAgaWYgKHR5cGVvZiB4ICE9PSAnbnVtYmVyJyB8fFxuICAgICAgICAgICAgdHlwZW9mIHkgIT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICB0eXBlb2YgeiAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc3RhdGljIGVxdWFscyh2MSwgdjIpIHtcbiAgICAgICAgcmV0dXJuIHYxLnggPT09IHYyLnggJiYgdjEueSA9PT0gdjIueSAmJiB2MS56ID09PSB2Mi56O1xuICAgIH1cbiAgICB0b09iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMueCxcbiAgICAgICAgICAgIHk6IHRoaXMueSxcbiAgICAgICAgICAgIHo6IHRoaXMueixcbiAgICAgICAgfTtcbiAgICB9XG59XG5jb25zdCBQb2ludDNkQXNzZW1ibHkgPSB7XG4gICAgdG9Db21wb25lbnRzOiAocCkgPT4gcC5nZXRDb21wb25lbnRzKCksXG4gICAgZnJvbUNvbXBvbmVudHM6IChjb21wcykgPT4gbmV3IFBvaW50M2QoLi4uY29tcHMpLFxufTtcblxuZnVuY3Rpb24gcG9pbnQzZEZyb21Vbmtub3duKHZhbHVlKSB7XG4gICAgcmV0dXJuIFBvaW50M2QuaXNPYmplY3QodmFsdWUpXG4gICAgICAgID8gbmV3IFBvaW50M2QodmFsdWUueCwgdmFsdWUueSwgdmFsdWUueilcbiAgICAgICAgOiBuZXcgUG9pbnQzZCgpO1xufVxuZnVuY3Rpb24gd3JpdGVQb2ludDNkKHRhcmdldCwgdmFsdWUpIHtcbiAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgneCcsIHZhbHVlLngpO1xuICAgIHRhcmdldC53cml0ZVByb3BlcnR5KCd5JywgdmFsdWUueSk7XG4gICAgdGFyZ2V0LndyaXRlUHJvcGVydHkoJ3onLCB2YWx1ZS56KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29uc3RyYWludCQyKHBhcmFtcywgaW5pdGlhbFZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludE5kQ29uc3RyYWludCh7XG4gICAgICAgIGFzc2VtYmx5OiBQb2ludDNkQXNzZW1ibHksXG4gICAgICAgIGNvbXBvbmVudHM6IFtcbiAgICAgICAgICAgIGNyZWF0ZURpbWVuc2lvbkNvbnN0cmFpbnQoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCBwYXJhbXMueCksIGluaXRpYWxWYWx1ZS54KSxcbiAgICAgICAgICAgIGNyZWF0ZURpbWVuc2lvbkNvbnN0cmFpbnQoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCBwYXJhbXMueSksIGluaXRpYWxWYWx1ZS55KSxcbiAgICAgICAgICAgIGNyZWF0ZURpbWVuc2lvbkNvbnN0cmFpbnQoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCBwYXJhbXMueiksIGluaXRpYWxWYWx1ZS56KSxcbiAgICAgICAgXSxcbiAgICB9KTtcbn1cbmNvbnN0IFBvaW50M2RJbnB1dFBsdWdpbiA9IGNyZWF0ZVBsdWdpbih7XG4gICAgaWQ6ICdpbnB1dC1wb2ludDNkJyxcbiAgICB0eXBlOiAnaW5wdXQnLFxuICAgIGFjY2VwdDogKHZhbHVlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgaWYgKCFQb2ludDNkLmlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VSZWNvcmQocGFyYW1zLCAocCkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY3JlYXRlUG9pbnREaW1lbnNpb25QYXJzZXIocCkpLCB7IHJlYWRvbmx5OiBwLm9wdGlvbmFsLmNvbnN0YW50KGZhbHNlKSwgeDogcC5vcHRpb25hbC5jdXN0b20ocGFyc2VQb2ludERpbWVuc2lvblBhcmFtcyksIHk6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlUG9pbnREaW1lbnNpb25QYXJhbXMpLCB6OiBwLm9wdGlvbmFsLmN1c3RvbShwYXJzZVBvaW50RGltZW5zaW9uUGFyYW1zKSB9KSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH0sXG4gICAgYmluZGluZzoge1xuICAgICAgICByZWFkZXI6IChfYXJncykgPT4gcG9pbnQzZEZyb21Vbmtub3duLFxuICAgICAgICBjb25zdHJhaW50OiAoYXJncykgPT4gY3JlYXRlQ29uc3RyYWludCQyKGFyZ3MucGFyYW1zLCBhcmdzLmluaXRpYWxWYWx1ZSksXG4gICAgICAgIGVxdWFsczogUG9pbnQzZC5lcXVhbHMsXG4gICAgICAgIHdyaXRlcjogKF9hcmdzKSA9PiB3cml0ZVBvaW50M2QsXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAoYXJncykgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGFyZ3MudmFsdWU7XG4gICAgICAgIGNvbnN0IGMgPSBhcmdzLmNvbnN0cmFpbnQ7XG4gICAgICAgIGNvbnN0IGRQYXJhbXMgPSBbYXJncy5wYXJhbXMueCwgYXJncy5wYXJhbXMueSwgYXJncy5wYXJhbXMuel07XG4gICAgICAgIHJldHVybiBuZXcgUG9pbnROZFRleHRDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgIGFzc2VtYmx5OiBQb2ludDNkQXNzZW1ibHksXG4gICAgICAgICAgICBheGVzOiB2YWx1ZS5yYXdWYWx1ZS5nZXRDb21wb25lbnRzKCkubWFwKChjb21wLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVQb2ludEF4aXMoe1xuICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50OiBjLmNvbXBvbmVudHNbaV0sXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogY29tcCxcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBkZWVwTWVyZ2UoYXJncy5wYXJhbXMsICgoX2EgPSBkUGFyYW1zW2ldKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7fSkpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBwYXJzZXI6IHBhcnNlTnVtYmVyLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgfSxcbn0pO1xuXG5jbGFzcyBQb2ludDRkIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIHogPSAwLCB3ID0gMCkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnogPSB6O1xuICAgICAgICB0aGlzLncgPSB3O1xuICAgIH1cbiAgICBnZXRDb21wb25lbnRzKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMueCwgdGhpcy55LCB0aGlzLnosIHRoaXMud107XG4gICAgfVxuICAgIHN0YXRpYyBpc09iamVjdChvYmopIHtcbiAgICAgICAgaWYgKGlzRW1wdHkob2JqKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHggPSBvYmoueDtcbiAgICAgICAgY29uc3QgeSA9IG9iai55O1xuICAgICAgICBjb25zdCB6ID0gb2JqLno7XG4gICAgICAgIGNvbnN0IHcgPSBvYmoudztcbiAgICAgICAgaWYgKHR5cGVvZiB4ICE9PSAnbnVtYmVyJyB8fFxuICAgICAgICAgICAgdHlwZW9mIHkgIT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICB0eXBlb2YgeiAhPT0gJ251bWJlcicgfHxcbiAgICAgICAgICAgIHR5cGVvZiB3ICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzdGF0aWMgZXF1YWxzKHYxLCB2Mikge1xuICAgICAgICByZXR1cm4gdjEueCA9PT0gdjIueCAmJiB2MS55ID09PSB2Mi55ICYmIHYxLnogPT09IHYyLnogJiYgdjEudyA9PT0gdjIudztcbiAgICB9XG4gICAgdG9PYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLngsXG4gICAgICAgICAgICB5OiB0aGlzLnksXG4gICAgICAgICAgICB6OiB0aGlzLnosXG4gICAgICAgICAgICB3OiB0aGlzLncsXG4gICAgICAgIH07XG4gICAgfVxufVxuY29uc3QgUG9pbnQ0ZEFzc2VtYmx5ID0ge1xuICAgIHRvQ29tcG9uZW50czogKHApID0+IHAuZ2V0Q29tcG9uZW50cygpLFxuICAgIGZyb21Db21wb25lbnRzOiAoY29tcHMpID0+IG5ldyBQb2ludDRkKC4uLmNvbXBzKSxcbn07XG5cbmZ1bmN0aW9uIHBvaW50NGRGcm9tVW5rbm93bih2YWx1ZSkge1xuICAgIHJldHVybiBQb2ludDRkLmlzT2JqZWN0KHZhbHVlKVxuICAgICAgICA/IG5ldyBQb2ludDRkKHZhbHVlLngsIHZhbHVlLnksIHZhbHVlLnosIHZhbHVlLncpXG4gICAgICAgIDogbmV3IFBvaW50NGQoKTtcbn1cbmZ1bmN0aW9uIHdyaXRlUG9pbnQ0ZCh0YXJnZXQsIHZhbHVlKSB7XG4gICAgdGFyZ2V0LndyaXRlUHJvcGVydHkoJ3gnLCB2YWx1ZS54KTtcbiAgICB0YXJnZXQud3JpdGVQcm9wZXJ0eSgneScsIHZhbHVlLnkpO1xuICAgIHRhcmdldC53cml0ZVByb3BlcnR5KCd6JywgdmFsdWUueik7XG4gICAgdGFyZ2V0LndyaXRlUHJvcGVydHkoJ3cnLCB2YWx1ZS53KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29uc3RyYWludCQxKHBhcmFtcywgaW5pdGlhbFZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludE5kQ29uc3RyYWludCh7XG4gICAgICAgIGFzc2VtYmx5OiBQb2ludDRkQXNzZW1ibHksXG4gICAgICAgIGNvbXBvbmVudHM6IFtcbiAgICAgICAgICAgIGNyZWF0ZURpbWVuc2lvbkNvbnN0cmFpbnQoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCBwYXJhbXMueCksIGluaXRpYWxWYWx1ZS54KSxcbiAgICAgICAgICAgIGNyZWF0ZURpbWVuc2lvbkNvbnN0cmFpbnQoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCBwYXJhbXMueSksIGluaXRpYWxWYWx1ZS55KSxcbiAgICAgICAgICAgIGNyZWF0ZURpbWVuc2lvbkNvbnN0cmFpbnQoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCBwYXJhbXMueiksIGluaXRpYWxWYWx1ZS56KSxcbiAgICAgICAgICAgIGNyZWF0ZURpbWVuc2lvbkNvbnN0cmFpbnQoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCBwYXJhbXMudyksIGluaXRpYWxWYWx1ZS53KSxcbiAgICAgICAgXSxcbiAgICB9KTtcbn1cbmNvbnN0IFBvaW50NGRJbnB1dFBsdWdpbiA9IGNyZWF0ZVBsdWdpbih7XG4gICAgaWQ6ICdpbnB1dC1wb2ludDRkJyxcbiAgICB0eXBlOiAnaW5wdXQnLFxuICAgIGFjY2VwdDogKHZhbHVlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgaWYgKCFQb2ludDRkLmlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VSZWNvcmQocGFyYW1zLCAocCkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY3JlYXRlUG9pbnREaW1lbnNpb25QYXJzZXIocCkpLCB7IHJlYWRvbmx5OiBwLm9wdGlvbmFsLmNvbnN0YW50KGZhbHNlKSwgdzogcC5vcHRpb25hbC5jdXN0b20ocGFyc2VQb2ludERpbWVuc2lvblBhcmFtcyksIHg6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlUG9pbnREaW1lbnNpb25QYXJhbXMpLCB5OiBwLm9wdGlvbmFsLmN1c3RvbShwYXJzZVBvaW50RGltZW5zaW9uUGFyYW1zKSwgejogcC5vcHRpb25hbC5jdXN0b20ocGFyc2VQb2ludERpbWVuc2lvblBhcmFtcykgfSkpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHJlc3VsdCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9LFxuICAgIGJpbmRpbmc6IHtcbiAgICAgICAgcmVhZGVyOiAoX2FyZ3MpID0+IHBvaW50NGRGcm9tVW5rbm93bixcbiAgICAgICAgY29uc3RyYWludDogKGFyZ3MpID0+IGNyZWF0ZUNvbnN0cmFpbnQkMShhcmdzLnBhcmFtcywgYXJncy5pbml0aWFsVmFsdWUpLFxuICAgICAgICBlcXVhbHM6IFBvaW50NGQuZXF1YWxzLFxuICAgICAgICB3cml0ZXI6IChfYXJncykgPT4gd3JpdGVQb2ludDRkLFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogKGFyZ3MpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBhcmdzLnZhbHVlO1xuICAgICAgICBjb25zdCBjID0gYXJncy5jb25zdHJhaW50O1xuICAgICAgICBjb25zdCBkUGFyYW1zID0gW1xuICAgICAgICAgICAgYXJncy5wYXJhbXMueCxcbiAgICAgICAgICAgIGFyZ3MucGFyYW1zLnksXG4gICAgICAgICAgICBhcmdzLnBhcmFtcy56LFxuICAgICAgICAgICAgYXJncy5wYXJhbXMudyxcbiAgICAgICAgXTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludE5kVGV4dENvbnRyb2xsZXIoYXJncy5kb2N1bWVudCwge1xuICAgICAgICAgICAgYXNzZW1ibHk6IFBvaW50NGRBc3NlbWJseSxcbiAgICAgICAgICAgIGF4ZXM6IHZhbHVlLnJhd1ZhbHVlLmdldENvbXBvbmVudHMoKS5tYXAoKGNvbXAsIGkpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVBvaW50QXhpcyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0cmFpbnQ6IGMuY29tcG9uZW50c1tpXSxcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBjb21wLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGRlZXBNZXJnZShhcmdzLnBhcmFtcywgKChfYSA9IGRQYXJhbXNbaV0pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHt9KSksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHBhcnNlcjogcGFyc2VOdW1iZXIsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICB9LFxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnN0cmFpbnQocGFyYW1zKSB7XG4gICAgY29uc3QgY29uc3RyYWludHMgPSBbXTtcbiAgICBjb25zdCBsYyA9IGNyZWF0ZUxpc3RDb25zdHJhaW50KHBhcmFtcy5vcHRpb25zKTtcbiAgICBpZiAobGMpIHtcbiAgICAgICAgY29uc3RyYWludHMucHVzaChsYyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQ29tcG9zaXRlQ29uc3RyYWludChjb25zdHJhaW50cyk7XG59XG5jb25zdCBTdHJpbmdJbnB1dFBsdWdpbiA9IGNyZWF0ZVBsdWdpbih7XG4gICAgaWQ6ICdpbnB1dC1zdHJpbmcnLFxuICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgYWNjZXB0OiAodmFsdWUsIHBhcmFtcykgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VSZWNvcmQocGFyYW1zLCAocCkgPT4gKHtcbiAgICAgICAgICAgIHJlYWRvbmx5OiBwLm9wdGlvbmFsLmNvbnN0YW50KGZhbHNlKSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHAub3B0aW9uYWwuY3VzdG9tKHBhcnNlTGlzdE9wdGlvbnMpLFxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiByZXN1bHQsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfSxcbiAgICBiaW5kaW5nOiB7XG4gICAgICAgIHJlYWRlcjogKF9hcmdzKSA9PiBzdHJpbmdGcm9tVW5rbm93bixcbiAgICAgICAgY29uc3RyYWludDogKGFyZ3MpID0+IGNyZWF0ZUNvbnN0cmFpbnQoYXJncy5wYXJhbXMpLFxuICAgICAgICB3cml0ZXI6IChfYXJncykgPT4gd3JpdGVQcmltaXRpdmUsXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAoYXJncykgPT4ge1xuICAgICAgICBjb25zdCBkb2MgPSBhcmdzLmRvY3VtZW50O1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGFyZ3MudmFsdWU7XG4gICAgICAgIGNvbnN0IGMgPSBhcmdzLmNvbnN0cmFpbnQ7XG4gICAgICAgIGNvbnN0IGxjID0gYyAmJiBmaW5kQ29uc3RyYWludChjLCBMaXN0Q29uc3RyYWludCk7XG4gICAgICAgIGlmIChsYykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBMaXN0Q29udHJvbGxlcihkb2MsIHtcbiAgICAgICAgICAgICAgICBwcm9wczogbmV3IFZhbHVlTWFwKHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogbGMudmFsdWVzLnZhbHVlKCdvcHRpb25zJyksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFRleHRDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgcGFyc2VyOiAodikgPT4gdixcbiAgICAgICAgICAgIHByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdFN0cmluZyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBhcGkoYXJncykge1xuICAgICAgICBpZiAodHlwZW9mIGFyZ3MuY29udHJvbGxlci52YWx1ZS5yYXdWYWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLmNvbnRyb2xsZXIudmFsdWVDb250cm9sbGVyIGluc3RhbmNlb2YgTGlzdENvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGlzdElucHV0QmluZGluZ0FwaShhcmdzLmNvbnRyb2xsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG59KTtcblxuY29uc3QgQ29uc3RhbnRzID0ge1xuICAgIG1vbml0b3I6IHtcbiAgICAgICAgZGVmYXVsdEludGVydmFsOiAyMDAsXG4gICAgICAgIGRlZmF1bHRSb3dzOiAzLFxuICAgIH0sXG59O1xuXG5jb25zdCBjbiQzID0gQ2xhc3NOYW1lKCdtbGwnKTtcbmNsYXNzIE11bHRpTG9nVmlldyB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5vblZhbHVlVXBkYXRlXyA9IHRoaXMub25WYWx1ZVVwZGF0ZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5mb3JtYXR0ZXJfID0gY29uZmlnLmZvcm1hdHRlcjtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiQzKCkpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBjb25zdCB0ZXh0YXJlYUVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgICAgdGV4dGFyZWFFbGVtLmNsYXNzTGlzdC5hZGQoY24kMygnaScpKTtcbiAgICAgICAgdGV4dGFyZWFFbGVtLnN0eWxlLmhlaWdodCA9IGBjYWxjKHZhcigke2dldENzc1ZhcignY29udGFpbmVyVW5pdFNpemUnKX0pICogJHtjb25maWcucm93c30pYDtcbiAgICAgICAgdGV4dGFyZWFFbGVtLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgY29uZmlnLnZpZXdQcm9wcy5iaW5kRGlzYWJsZWQodGV4dGFyZWFFbGVtKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRleHRhcmVhRWxlbSk7XG4gICAgICAgIHRoaXMudGV4dGFyZWFFbGVtXyA9IHRleHRhcmVhRWxlbTtcbiAgICAgICAgY29uZmlnLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25WYWx1ZVVwZGF0ZV8pO1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICB9XG4gICAgdXBkYXRlXygpIHtcbiAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMudGV4dGFyZWFFbGVtXztcbiAgICAgICAgY29uc3Qgc2hvdWxkU2Nyb2xsID0gZWxlbS5zY3JvbGxUb3AgPT09IGVsZW0uc2Nyb2xsSGVpZ2h0IC0gZWxlbS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGxpbmVzID0gW107XG4gICAgICAgIHRoaXMudmFsdWUucmF3VmFsdWUuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGluZXMucHVzaCh0aGlzLmZvcm1hdHRlcl8odmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSBsaW5lcy5qb2luKCdcXG4nKTtcbiAgICAgICAgaWYgKHNob3VsZFNjcm9sbCkge1xuICAgICAgICAgICAgZWxlbS5zY3JvbGxUb3AgPSBlbGVtLnNjcm9sbEhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblZhbHVlVXBkYXRlXygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgfVxufVxuXG5jbGFzcyBNdWx0aUxvZ0NvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBjb25maWcudmFsdWU7XG4gICAgICAgIHRoaXMudmlld1Byb3BzID0gY29uZmlnLnZpZXdQcm9wcztcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IE11bHRpTG9nVmlldyhkb2MsIHtcbiAgICAgICAgICAgIGZvcm1hdHRlcjogY29uZmlnLmZvcm1hdHRlcixcbiAgICAgICAgICAgIHJvd3M6IGNvbmZpZy5yb3dzLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IGNuJDIgPSBDbGFzc05hbWUoJ3NnbCcpO1xuY2xhc3MgU2luZ2xlTG9nVmlldyB7XG4gICAgY29uc3RydWN0b3IoZG9jLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5vblZhbHVlVXBkYXRlXyA9IHRoaXMub25WYWx1ZVVwZGF0ZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5mb3JtYXR0ZXJfID0gY29uZmlnLmZvcm1hdHRlcjtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiQyKCkpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICBjb25zdCBpbnB1dEVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXRFbGVtLmNsYXNzTGlzdC5hZGQoY24kMignaScpKTtcbiAgICAgICAgaW5wdXRFbGVtLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgaW5wdXRFbGVtLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZERpc2FibGVkKGlucHV0RWxlbSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChpbnB1dEVsZW0pO1xuICAgICAgICB0aGlzLmlucHV0RWxlbWVudCA9IGlucHV0RWxlbTtcbiAgICAgICAgY29uZmlnLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25WYWx1ZVVwZGF0ZV8pO1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICB9XG4gICAgdXBkYXRlXygpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy52YWx1ZS5yYXdWYWx1ZTtcbiAgICAgICAgY29uc3QgbGFzdFZhbHVlID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgPVxuICAgICAgICAgICAgbGFzdFZhbHVlICE9PSB1bmRlZmluZWQgPyB0aGlzLmZvcm1hdHRlcl8obGFzdFZhbHVlKSA6ICcnO1xuICAgIH1cbiAgICBvblZhbHVlVXBkYXRlXygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgfVxufVxuXG5jbGFzcyBTaW5nbGVMb2dDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBTaW5nbGVMb2dWaWV3KGRvYywge1xuICAgICAgICAgICAgZm9ybWF0dGVyOiBjb25maWcuZm9ybWF0dGVyLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IHRoaXMudmlld1Byb3BzLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IEJvb2xlYW5Nb25pdG9yUGx1Z2luID0gY3JlYXRlUGx1Z2luKHtcbiAgICBpZDogJ21vbml0b3ItYm9vbCcsXG4gICAgdHlwZTogJ21vbml0b3InLFxuICAgIGFjY2VwdDogKHZhbHVlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZVJlY29yZChwYXJhbXMsIChwKSA9PiAoe1xuICAgICAgICAgICAgcmVhZG9ubHk6IHAucmVxdWlyZWQuY29uc3RhbnQodHJ1ZSksXG4gICAgICAgICAgICByb3dzOiBwLm9wdGlvbmFsLm51bWJlcixcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH0sXG4gICAgYmluZGluZzoge1xuICAgICAgICByZWFkZXI6IChfYXJncykgPT4gYm9vbEZyb21Vbmtub3duLFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogKGFyZ3MpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoYXJncy52YWx1ZS5yYXdWYWx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2luZ2xlTG9nQ29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyOiBCb29sZWFuRm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBhcmdzLnZhbHVlLFxuICAgICAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IE11bHRpTG9nQ29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICBmb3JtYXR0ZXI6IEJvb2xlYW5Gb3JtYXR0ZXIsXG4gICAgICAgICAgICByb3dzOiAoX2EgPSBhcmdzLnBhcmFtcy5yb3dzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBDb25zdGFudHMubW9uaXRvci5kZWZhdWx0Um93cyxcbiAgICAgICAgICAgIHZhbHVlOiBhcmdzLnZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgfSxcbn0pO1xuXG5jbGFzcyBHcmFwaExvZ01vbml0b3JCaW5kaW5nQXBpIGV4dGVuZHMgQmluZGluZ0FwaSB7XG4gICAgZ2V0IG1heCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci52YWx1ZUNvbnRyb2xsZXIucHJvcHMuZ2V0KCdtYXgnKTtcbiAgICB9XG4gICAgc2V0IG1heChtYXgpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLnZhbHVlQ29udHJvbGxlci5wcm9wcy5zZXQoJ21heCcsIG1heCk7XG4gICAgfVxuICAgIGdldCBtaW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIudmFsdWVDb250cm9sbGVyLnByb3BzLmdldCgnbWluJyk7XG4gICAgfVxuICAgIHNldCBtaW4obWluKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci52YWx1ZUNvbnRyb2xsZXIucHJvcHMuc2V0KCdtaW4nLCBtaW4pO1xuICAgIH1cbn1cblxuY29uc3QgY24kMSA9IENsYXNzTmFtZSgnZ3JsJyk7XG5jbGFzcyBHcmFwaExvZ1ZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMub25DdXJzb3JDaGFuZ2VfID0gdGhpcy5vbkN1cnNvckNoYW5nZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblZhbHVlVXBkYXRlXyA9IHRoaXMub25WYWx1ZVVwZGF0ZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbiQxKCkpO1xuICAgICAgICBjb25maWcudmlld1Byb3BzLmJpbmRDbGFzc01vZGlmaWVycyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICB0aGlzLmZvcm1hdHRlcl8gPSBjb25maWcuZm9ybWF0dGVyO1xuICAgICAgICB0aGlzLnByb3BzXyA9IGNvbmZpZy5wcm9wcztcbiAgICAgICAgdGhpcy5jdXJzb3JfID0gY29uZmlnLmN1cnNvcjtcbiAgICAgICAgdGhpcy5jdXJzb3JfLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25DdXJzb3JDaGFuZ2VfKTtcbiAgICAgICAgY29uc3Qgc3ZnRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50TlMoU1ZHX05TLCAnc3ZnJyk7XG4gICAgICAgIHN2Z0VsZW0uY2xhc3NMaXN0LmFkZChjbiQxKCdnJykpO1xuICAgICAgICBzdmdFbGVtLnN0eWxlLmhlaWdodCA9IGBjYWxjKHZhcigke2dldENzc1ZhcignY29udGFpbmVyVW5pdFNpemUnKX0pICogJHtjb25maWcucm93c30pYDtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHN2Z0VsZW0pO1xuICAgICAgICB0aGlzLnN2Z0VsZW1fID0gc3ZnRWxlbTtcbiAgICAgICAgY29uc3QgbGluZUVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgJ3BvbHlsaW5lJyk7XG4gICAgICAgIHRoaXMuc3ZnRWxlbV8uYXBwZW5kQ2hpbGQobGluZUVsZW0pO1xuICAgICAgICB0aGlzLmxpbmVFbGVtXyA9IGxpbmVFbGVtO1xuICAgICAgICBjb25zdCB0b29sdGlwRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9vbHRpcEVsZW0uY2xhc3NMaXN0LmFkZChjbiQxKCd0JyksIENsYXNzTmFtZSgndHQnKSgpKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRvb2x0aXBFbGVtKTtcbiAgICAgICAgdGhpcy50b29sdGlwRWxlbV8gPSB0b29sdGlwRWxlbTtcbiAgICAgICAgY29uZmlnLnZhbHVlLmVtaXR0ZXIub24oJ2NoYW5nZScsIHRoaXMub25WYWx1ZVVwZGF0ZV8pO1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZV8oKTtcbiAgICB9XG4gICAgZ2V0IGdyYXBoRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ZnRWxlbV87XG4gICAgfVxuICAgIHVwZGF0ZV8oKSB7XG4gICAgICAgIGNvbnN0IHsgY2xpZW50V2lkdGg6IHcsIGNsaWVudEhlaWdodDogaCB9ID0gdGhpcy5lbGVtZW50O1xuICAgICAgICBjb25zdCBtYXhJbmRleCA9IHRoaXMudmFsdWUucmF3VmFsdWUubGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgbWluID0gdGhpcy5wcm9wc18uZ2V0KCdtaW4nKTtcbiAgICAgICAgY29uc3QgbWF4ID0gdGhpcy5wcm9wc18uZ2V0KCdtYXgnKTtcbiAgICAgICAgY29uc3QgcG9pbnRzID0gW107XG4gICAgICAgIHRoaXMudmFsdWUucmF3VmFsdWUuZm9yRWFjaCgodiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB4ID0gbWFwUmFuZ2UoaW5kZXgsIDAsIG1heEluZGV4LCAwLCB3KTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBtYXBSYW5nZSh2LCBtaW4sIG1heCwgaCwgMCk7XG4gICAgICAgICAgICBwb2ludHMucHVzaChbeCwgeV0uam9pbignLCcpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubGluZUVsZW1fLnNldEF0dHJpYnV0ZU5TKG51bGwsICdwb2ludHMnLCBwb2ludHMuam9pbignICcpKTtcbiAgICAgICAgY29uc3QgdG9vbHRpcEVsZW0gPSB0aGlzLnRvb2x0aXBFbGVtXztcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlLnJhd1ZhbHVlW3RoaXMuY3Vyc29yXy5yYXdWYWx1ZV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0b29sdGlwRWxlbS5jbGFzc0xpc3QucmVtb3ZlKGNuJDEoJ3QnLCAnYScpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0eCA9IG1hcFJhbmdlKHRoaXMuY3Vyc29yXy5yYXdWYWx1ZSwgMCwgbWF4SW5kZXgsIDAsIHcpO1xuICAgICAgICBjb25zdCB0eSA9IG1hcFJhbmdlKHZhbHVlLCBtaW4sIG1heCwgaCwgMCk7XG4gICAgICAgIHRvb2x0aXBFbGVtLnN0eWxlLmxlZnQgPSBgJHt0eH1weGA7XG4gICAgICAgIHRvb2x0aXBFbGVtLnN0eWxlLnRvcCA9IGAke3R5fXB4YDtcbiAgICAgICAgdG9vbHRpcEVsZW0udGV4dENvbnRlbnQgPSBgJHt0aGlzLmZvcm1hdHRlcl8odmFsdWUpfWA7XG4gICAgICAgIGlmICghdG9vbHRpcEVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGNuJDEoJ3QnLCAnYScpKSkge1xuICAgICAgICAgICAgdG9vbHRpcEVsZW0uY2xhc3NMaXN0LmFkZChjbiQxKCd0JywgJ2EnKSwgY24kMSgndCcsICdpbicpKTtcbiAgICAgICAgICAgIGZvcmNlUmVmbG93KHRvb2x0aXBFbGVtKTtcbiAgICAgICAgICAgIHRvb2x0aXBFbGVtLmNsYXNzTGlzdC5yZW1vdmUoY24kMSgndCcsICdpbicpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblZhbHVlVXBkYXRlXygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgfVxuICAgIG9uQ3Vyc29yQ2hhbmdlXygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVfKCk7XG4gICAgfVxufVxuXG5jbGFzcyBHcmFwaExvZ0NvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMub25HcmFwaE1vdXNlTW92ZV8gPSB0aGlzLm9uR3JhcGhNb3VzZU1vdmVfLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25HcmFwaE1vdXNlTGVhdmVfID0gdGhpcy5vbkdyYXBoTW91c2VMZWF2ZV8uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkdyYXBoUG9pbnRlckRvd25fID0gdGhpcy5vbkdyYXBoUG9pbnRlckRvd25fLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25HcmFwaFBvaW50ZXJNb3ZlXyA9IHRoaXMub25HcmFwaFBvaW50ZXJNb3ZlXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uR3JhcGhQb2ludGVyVXBfID0gdGhpcy5vbkdyYXBoUG9pbnRlclVwXy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnByb3BzID0gY29uZmlnLnByb3BzO1xuICAgICAgICB0aGlzLnZhbHVlID0gY29uZmlnLnZhbHVlO1xuICAgICAgICB0aGlzLnZpZXdQcm9wcyA9IGNvbmZpZy52aWV3UHJvcHM7XG4gICAgICAgIHRoaXMuY3Vyc29yXyA9IGNyZWF0ZVZhbHVlKC0xKTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IEdyYXBoTG9nVmlldyhkb2MsIHtcbiAgICAgICAgICAgIGN1cnNvcjogdGhpcy5jdXJzb3JfLFxuICAgICAgICAgICAgZm9ybWF0dGVyOiBjb25maWcuZm9ybWF0dGVyLFxuICAgICAgICAgICAgcm93czogY29uZmlnLnJvd3MsXG4gICAgICAgICAgICBwcm9wczogdGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiB0aGlzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghc3VwcG9ydHNUb3VjaChkb2MpKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uR3JhcGhNb3VzZU1vdmVfKTtcbiAgICAgICAgICAgIHRoaXMudmlldy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLm9uR3JhcGhNb3VzZUxlYXZlXyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwaCA9IG5ldyBQb2ludGVySGFuZGxlcih0aGlzLnZpZXcuZWxlbWVudCk7XG4gICAgICAgICAgICBwaC5lbWl0dGVyLm9uKCdkb3duJywgdGhpcy5vbkdyYXBoUG9pbnRlckRvd25fKTtcbiAgICAgICAgICAgIHBoLmVtaXR0ZXIub24oJ21vdmUnLCB0aGlzLm9uR3JhcGhQb2ludGVyTW92ZV8pO1xuICAgICAgICAgICAgcGguZW1pdHRlci5vbigndXAnLCB0aGlzLm9uR3JhcGhQb2ludGVyVXBfKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbXBvcnRQcm9wcyhzdGF0ZSkge1xuICAgICAgICByZXR1cm4gaW1wb3J0QmxhZGVTdGF0ZShzdGF0ZSwgbnVsbCwgKHApID0+ICh7XG4gICAgICAgICAgICBtYXg6IHAucmVxdWlyZWQubnVtYmVyLFxuICAgICAgICAgICAgbWluOiBwLnJlcXVpcmVkLm51bWJlcixcbiAgICAgICAgfSksIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2V0KCdtYXgnLCByZXN1bHQubWF4KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2V0KCdtaW4nLCByZXN1bHQubWluKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZXhwb3J0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRCbGFkZVN0YXRlKG51bGwsIHtcbiAgICAgICAgICAgIG1heDogdGhpcy5wcm9wcy5nZXQoJ21heCcpLFxuICAgICAgICAgICAgbWluOiB0aGlzLnByb3BzLmdldCgnbWluJyksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkdyYXBoTW91c2VMZWF2ZV8oKSB7XG4gICAgICAgIHRoaXMuY3Vyc29yXy5yYXdWYWx1ZSA9IC0xO1xuICAgIH1cbiAgICBvbkdyYXBoTW91c2VNb3ZlXyhldikge1xuICAgICAgICBjb25zdCB7IGNsaWVudFdpZHRoOiB3IH0gPSB0aGlzLnZpZXcuZWxlbWVudDtcbiAgICAgICAgdGhpcy5jdXJzb3JfLnJhd1ZhbHVlID0gTWF0aC5mbG9vcihtYXBSYW5nZShldi5vZmZzZXRYLCAwLCB3LCAwLCB0aGlzLnZhbHVlLnJhd1ZhbHVlLmxlbmd0aCkpO1xuICAgIH1cbiAgICBvbkdyYXBoUG9pbnRlckRvd25fKGV2KSB7XG4gICAgICAgIHRoaXMub25HcmFwaFBvaW50ZXJNb3ZlXyhldik7XG4gICAgfVxuICAgIG9uR3JhcGhQb2ludGVyTW92ZV8oZXYpIHtcbiAgICAgICAgaWYgKCFldi5kYXRhLnBvaW50KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnNvcl8ucmF3VmFsdWUgPSAtMTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnNvcl8ucmF3VmFsdWUgPSBNYXRoLmZsb29yKG1hcFJhbmdlKGV2LmRhdGEucG9pbnQueCwgMCwgZXYuZGF0YS5ib3VuZHMud2lkdGgsIDAsIHRoaXMudmFsdWUucmF3VmFsdWUubGVuZ3RoKSk7XG4gICAgfVxuICAgIG9uR3JhcGhQb2ludGVyVXBfKCkge1xuICAgICAgICB0aGlzLmN1cnNvcl8ucmF3VmFsdWUgPSAtMTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZvcm1hdHRlcihwYXJhbXMpIHtcbiAgICByZXR1cm4gIWlzRW1wdHkocGFyYW1zLmZvcm1hdCkgPyBwYXJhbXMuZm9ybWF0IDogY3JlYXRlTnVtYmVyRm9ybWF0dGVyKDIpO1xufVxuZnVuY3Rpb24gY3JlYXRlVGV4dE1vbml0b3IoYXJncykge1xuICAgIHZhciBfYTtcbiAgICBpZiAoYXJncy52YWx1ZS5yYXdWYWx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTaW5nbGVMb2dDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgIGZvcm1hdHRlcjogY3JlYXRlRm9ybWF0dGVyKGFyZ3MucGFyYW1zKSxcbiAgICAgICAgICAgIHZhbHVlOiBhcmdzLnZhbHVlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgTXVsdGlMb2dDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgZm9ybWF0dGVyOiBjcmVhdGVGb3JtYXR0ZXIoYXJncy5wYXJhbXMpLFxuICAgICAgICByb3dzOiAoX2EgPSBhcmdzLnBhcmFtcy5yb3dzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBDb25zdGFudHMubW9uaXRvci5kZWZhdWx0Um93cyxcbiAgICAgICAgdmFsdWU6IGFyZ3MudmFsdWUsXG4gICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVHcmFwaE1vbml0b3IoYXJncykge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIHJldHVybiBuZXcgR3JhcGhMb2dDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgZm9ybWF0dGVyOiBjcmVhdGVGb3JtYXR0ZXIoYXJncy5wYXJhbXMpLFxuICAgICAgICByb3dzOiAoX2EgPSBhcmdzLnBhcmFtcy5yb3dzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBDb25zdGFudHMubW9uaXRvci5kZWZhdWx0Um93cyxcbiAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgbWF4OiAoX2IgPSBhcmdzLnBhcmFtcy5tYXgpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDEwMCxcbiAgICAgICAgICAgIG1pbjogKF9jID0gYXJncy5wYXJhbXMubWluKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiAwLFxuICAgICAgICB9KSxcbiAgICAgICAgdmFsdWU6IGFyZ3MudmFsdWUsXG4gICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgfSk7XG59XG5mdW5jdGlvbiBzaG91bGRTaG93R3JhcGgocGFyYW1zKSB7XG4gICAgcmV0dXJuIHBhcmFtcy52aWV3ID09PSAnZ3JhcGgnO1xufVxuY29uc3QgTnVtYmVyTW9uaXRvclBsdWdpbiA9IGNyZWF0ZVBsdWdpbih7XG4gICAgaWQ6ICdtb25pdG9yLW51bWJlcicsXG4gICAgdHlwZTogJ21vbml0b3InLFxuICAgIGFjY2VwdDogKHZhbHVlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUmVjb3JkKHBhcmFtcywgKHApID0+ICh7XG4gICAgICAgICAgICBmb3JtYXQ6IHAub3B0aW9uYWwuZnVuY3Rpb24sXG4gICAgICAgICAgICBtYXg6IHAub3B0aW9uYWwubnVtYmVyLFxuICAgICAgICAgICAgbWluOiBwLm9wdGlvbmFsLm51bWJlcixcbiAgICAgICAgICAgIHJlYWRvbmx5OiBwLnJlcXVpcmVkLmNvbnN0YW50KHRydWUpLFxuICAgICAgICAgICAgcm93czogcC5vcHRpb25hbC5udW1iZXIsXG4gICAgICAgICAgICB2aWV3OiBwLm9wdGlvbmFsLnN0cmluZyxcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH0sXG4gICAgYmluZGluZzoge1xuICAgICAgICBkZWZhdWx0QnVmZmVyU2l6ZTogKHBhcmFtcykgPT4gKHNob3VsZFNob3dHcmFwaChwYXJhbXMpID8gNjQgOiAxKSxcbiAgICAgICAgcmVhZGVyOiAoX2FyZ3MpID0+IG51bWJlckZyb21Vbmtub3duLFxuICAgIH0sXG4gICAgY29udHJvbGxlcjogKGFyZ3MpID0+IHtcbiAgICAgICAgaWYgKHNob3VsZFNob3dHcmFwaChhcmdzLnBhcmFtcykpIHtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVHcmFwaE1vbml0b3IoYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZVRleHRNb25pdG9yKGFyZ3MpO1xuICAgIH0sXG4gICAgYXBpOiAoYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy5jb250cm9sbGVyLnZhbHVlQ29udHJvbGxlciBpbnN0YW5jZW9mIEdyYXBoTG9nQ29udHJvbGxlcikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBHcmFwaExvZ01vbml0b3JCaW5kaW5nQXBpKGFyZ3MuY29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbn0pO1xuXG5jb25zdCBTdHJpbmdNb25pdG9yUGx1Z2luID0gY3JlYXRlUGx1Z2luKHtcbiAgICBpZDogJ21vbml0b3Itc3RyaW5nJyxcbiAgICB0eXBlOiAnbW9uaXRvcicsXG4gICAgYWNjZXB0OiAodmFsdWUsIHBhcmFtcykgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGFyc2VSZWNvcmQocGFyYW1zLCAocCkgPT4gKHtcbiAgICAgICAgICAgIG11bHRpbGluZTogcC5vcHRpb25hbC5ib29sZWFuLFxuICAgICAgICAgICAgcmVhZG9ubHk6IHAucmVxdWlyZWQuY29uc3RhbnQodHJ1ZSksXG4gICAgICAgICAgICByb3dzOiBwLm9wdGlvbmFsLm51bWJlcixcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcmVzdWx0LFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH0sXG4gICAgYmluZGluZzoge1xuICAgICAgICByZWFkZXI6IChfYXJncykgPT4gc3RyaW5nRnJvbVVua25vd24sXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAoYXJncykgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXJncy52YWx1ZTtcbiAgICAgICAgY29uc3QgbXVsdGlsaW5lID0gdmFsdWUucmF3VmFsdWUubGVuZ3RoID4gMSB8fCBhcmdzLnBhcmFtcy5tdWx0aWxpbmU7XG4gICAgICAgIGlmIChtdWx0aWxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTXVsdGlMb2dDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdFN0cmluZyxcbiAgICAgICAgICAgICAgICByb3dzOiAoX2EgPSBhcmdzLnBhcmFtcy5yb3dzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBDb25zdGFudHMubW9uaXRvci5kZWZhdWx0Um93cyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgU2luZ2xlTG9nQ29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdFN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogYXJncy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgIH0sXG59KTtcblxuY2xhc3MgQmxhZGVBcGlDYWNoZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWFwXyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgZ2V0KGJjKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMubWFwXy5nZXQoYmMpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBudWxsO1xuICAgIH1cbiAgICBoYXMoYmMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwXy5oYXMoYmMpO1xuICAgIH1cbiAgICBhZGQoYmMsIGFwaSkge1xuICAgICAgICB0aGlzLm1hcF8uc2V0KGJjLCBhcGkpO1xuICAgICAgICBiYy52aWV3UHJvcHMuaGFuZGxlRGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1hcF8uZGVsZXRlKGJjKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcGk7XG4gICAgfVxufVxuXG5jbGFzcyBSZWFkV3JpdGVCaW5kaW5nIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBjb25maWcudGFyZ2V0O1xuICAgICAgICB0aGlzLnJlYWRlcl8gPSBjb25maWcucmVhZGVyO1xuICAgICAgICB0aGlzLndyaXRlcl8gPSBjb25maWcud3JpdGVyO1xuICAgIH1cbiAgICByZWFkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkZXJfKHRoaXMudGFyZ2V0LnJlYWQoKSk7XG4gICAgfVxuICAgIHdyaXRlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMud3JpdGVyXyh0aGlzLnRhcmdldCwgdmFsdWUpO1xuICAgIH1cbiAgICBpbmplY3QodmFsdWUpIHtcbiAgICAgICAgdGhpcy53cml0ZSh0aGlzLnJlYWRlcl8odmFsdWUpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0QmluZGluZ0NvbnRyb2xsZXIocGx1Z2luLCBhcmdzKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHJlc3VsdCA9IHBsdWdpbi5hY2NlcHQoYXJncy50YXJnZXQucmVhZCgpLCBhcmdzLnBhcmFtcyk7XG4gICAgaWYgKGlzRW1wdHkocmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgdmFsdWVBcmdzID0ge1xuICAgICAgICB0YXJnZXQ6IGFyZ3MudGFyZ2V0LFxuICAgICAgICBpbml0aWFsVmFsdWU6IHJlc3VsdC5pbml0aWFsVmFsdWUsXG4gICAgICAgIHBhcmFtczogcmVzdWx0LnBhcmFtcyxcbiAgICB9O1xuICAgIGNvbnN0IHBhcmFtcyA9IHBhcnNlUmVjb3JkKGFyZ3MucGFyYW1zLCAocCkgPT4gKHtcbiAgICAgICAgZGlzYWJsZWQ6IHAub3B0aW9uYWwuYm9vbGVhbixcbiAgICAgICAgaGlkZGVuOiBwLm9wdGlvbmFsLmJvb2xlYW4sXG4gICAgICAgIGxhYmVsOiBwLm9wdGlvbmFsLnN0cmluZyxcbiAgICAgICAgdGFnOiBwLm9wdGlvbmFsLnN0cmluZyxcbiAgICB9KSk7XG4gICAgY29uc3QgcmVhZGVyID0gcGx1Z2luLmJpbmRpbmcucmVhZGVyKHZhbHVlQXJncyk7XG4gICAgY29uc3QgY29uc3RyYWludCA9IHBsdWdpbi5iaW5kaW5nLmNvbnN0cmFpbnRcbiAgICAgICAgPyBwbHVnaW4uYmluZGluZy5jb25zdHJhaW50KHZhbHVlQXJncylcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgYmluZGluZyA9IG5ldyBSZWFkV3JpdGVCaW5kaW5nKHtcbiAgICAgICAgcmVhZGVyOiByZWFkZXIsXG4gICAgICAgIHRhcmdldDogYXJncy50YXJnZXQsXG4gICAgICAgIHdyaXRlcjogcGx1Z2luLmJpbmRpbmcud3JpdGVyKHZhbHVlQXJncyksXG4gICAgfSk7XG4gICAgY29uc3QgdmFsdWUgPSBuZXcgSW5wdXRCaW5kaW5nVmFsdWUoY3JlYXRlVmFsdWUocmVhZGVyKHJlc3VsdC5pbml0aWFsVmFsdWUpLCB7XG4gICAgICAgIGNvbnN0cmFpbnQ6IGNvbnN0cmFpbnQsXG4gICAgICAgIGVxdWFsczogcGx1Z2luLmJpbmRpbmcuZXF1YWxzLFxuICAgIH0pLCBiaW5kaW5nKTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gcGx1Z2luLmNvbnRyb2xsZXIoe1xuICAgICAgICBjb25zdHJhaW50OiBjb25zdHJhaW50LFxuICAgICAgICBkb2N1bWVudDogYXJncy5kb2N1bWVudCxcbiAgICAgICAgaW5pdGlhbFZhbHVlOiByZXN1bHQuaW5pdGlhbFZhbHVlLFxuICAgICAgICBwYXJhbXM6IHJlc3VsdC5wYXJhbXMsXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgdmlld1Byb3BzOiBWaWV3UHJvcHMuY3JlYXRlKHtcbiAgICAgICAgICAgIGRpc2FibGVkOiBwYXJhbXMgPT09IG51bGwgfHwgcGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJhbXMuZGlzYWJsZWQsXG4gICAgICAgICAgICBoaWRkZW46IHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5oaWRkZW4sXG4gICAgICAgIH0pLFxuICAgIH0pO1xuICAgIHJldHVybiBuZXcgSW5wdXRCaW5kaW5nQ29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgIGJsYWRlOiBjcmVhdGVCbGFkZSgpLFxuICAgICAgICBwcm9wczogVmFsdWVNYXAuZnJvbU9iamVjdCh7XG4gICAgICAgICAgICBsYWJlbDogJ2xhYmVsJyBpbiBhcmdzLnBhcmFtcyA/IChfYSA9IHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5sYWJlbCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogbnVsbCA6IGFyZ3MudGFyZ2V0LmtleSxcbiAgICAgICAgfSksXG4gICAgICAgIHRhZzogcGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLnRhZyxcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICB2YWx1ZUNvbnRyb2xsZXI6IGNvbnRyb2xsZXIsXG4gICAgfSk7XG59XG5cbmNsYXNzIFJlYWRvbmx5QmluZGluZyB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gY29uZmlnLnRhcmdldDtcbiAgICAgICAgdGhpcy5yZWFkZXJfID0gY29uZmlnLnJlYWRlcjtcbiAgICB9XG4gICAgcmVhZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZGVyXyh0aGlzLnRhcmdldC5yZWFkKCkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVGlja2VyKGRvY3VtZW50LCBpbnRlcnZhbCkge1xuICAgIHJldHVybiBpbnRlcnZhbCA9PT0gMFxuICAgICAgICA/IG5ldyBNYW51YWxUaWNrZXIoKVxuICAgICAgICA6IG5ldyBJbnRlcnZhbFRpY2tlcihkb2N1bWVudCwgaW50ZXJ2YWwgIT09IG51bGwgJiYgaW50ZXJ2YWwgIT09IHZvaWQgMCA/IGludGVydmFsIDogQ29uc3RhbnRzLm1vbml0b3IuZGVmYXVsdEludGVydmFsKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZU1vbml0b3JCaW5kaW5nQ29udHJvbGxlcihwbHVnaW4sIGFyZ3MpIHtcbiAgICB2YXIgX2EsIF9iLCBfYztcbiAgICBjb25zdCByZXN1bHQgPSBwbHVnaW4uYWNjZXB0KGFyZ3MudGFyZ2V0LnJlYWQoKSwgYXJncy5wYXJhbXMpO1xuICAgIGlmIChpc0VtcHR5KHJlc3VsdCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGJpbmRpbmdBcmdzID0ge1xuICAgICAgICB0YXJnZXQ6IGFyZ3MudGFyZ2V0LFxuICAgICAgICBpbml0aWFsVmFsdWU6IHJlc3VsdC5pbml0aWFsVmFsdWUsXG4gICAgICAgIHBhcmFtczogcmVzdWx0LnBhcmFtcyxcbiAgICB9O1xuICAgIGNvbnN0IHBhcmFtcyA9IHBhcnNlUmVjb3JkKGFyZ3MucGFyYW1zLCAocCkgPT4gKHtcbiAgICAgICAgYnVmZmVyU2l6ZTogcC5vcHRpb25hbC5udW1iZXIsXG4gICAgICAgIGRpc2FibGVkOiBwLm9wdGlvbmFsLmJvb2xlYW4sXG4gICAgICAgIGhpZGRlbjogcC5vcHRpb25hbC5ib29sZWFuLFxuICAgICAgICBpbnRlcnZhbDogcC5vcHRpb25hbC5udW1iZXIsXG4gICAgICAgIGxhYmVsOiBwLm9wdGlvbmFsLnN0cmluZyxcbiAgICB9KSk7XG4gICAgY29uc3QgcmVhZGVyID0gcGx1Z2luLmJpbmRpbmcucmVhZGVyKGJpbmRpbmdBcmdzKTtcbiAgICBjb25zdCBidWZmZXJTaXplID0gKF9iID0gKF9hID0gcGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLmJ1ZmZlclNpemUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IChwbHVnaW4uYmluZGluZy5kZWZhdWx0QnVmZmVyU2l6ZSAmJlxuICAgICAgICBwbHVnaW4uYmluZGluZy5kZWZhdWx0QnVmZmVyU2l6ZShyZXN1bHQucGFyYW1zKSkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDE7XG4gICAgY29uc3QgdmFsdWUgPSBuZXcgTW9uaXRvckJpbmRpbmdWYWx1ZSh7XG4gICAgICAgIGJpbmRpbmc6IG5ldyBSZWFkb25seUJpbmRpbmcoe1xuICAgICAgICAgICAgcmVhZGVyOiByZWFkZXIsXG4gICAgICAgICAgICB0YXJnZXQ6IGFyZ3MudGFyZ2V0LFxuICAgICAgICB9KSxcbiAgICAgICAgYnVmZmVyU2l6ZTogYnVmZmVyU2l6ZSxcbiAgICAgICAgdGlja2VyOiBjcmVhdGVUaWNrZXIoYXJncy5kb2N1bWVudCwgcGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLmludGVydmFsKSxcbiAgICB9KTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gcGx1Z2luLmNvbnRyb2xsZXIoe1xuICAgICAgICBkb2N1bWVudDogYXJncy5kb2N1bWVudCxcbiAgICAgICAgcGFyYW1zOiByZXN1bHQucGFyYW1zLFxuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIHZpZXdQcm9wczogVmlld1Byb3BzLmNyZWF0ZSh7XG4gICAgICAgICAgICBkaXNhYmxlZDogcGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLmRpc2FibGVkLFxuICAgICAgICAgICAgaGlkZGVuOiBwYXJhbXMgPT09IG51bGwgfHwgcGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJhbXMuaGlkZGVuLFxuICAgICAgICB9KSxcbiAgICB9KTtcbiAgICBjb250cm9sbGVyLnZpZXdQcm9wcy5iaW5kRGlzYWJsZWQodmFsdWUudGlja2VyKTtcbiAgICBjb250cm9sbGVyLnZpZXdQcm9wcy5oYW5kbGVEaXNwb3NlKCgpID0+IHtcbiAgICAgICAgdmFsdWUudGlja2VyLmRpc3Bvc2UoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IE1vbml0b3JCaW5kaW5nQ29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgIGJsYWRlOiBjcmVhdGVCbGFkZSgpLFxuICAgICAgICBwcm9wczogVmFsdWVNYXAuZnJvbU9iamVjdCh7XG4gICAgICAgICAgICBsYWJlbDogJ2xhYmVsJyBpbiBhcmdzLnBhcmFtcyA/IChfYyA9IHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5sYWJlbCkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogbnVsbCA6IGFyZ3MudGFyZ2V0LmtleSxcbiAgICAgICAgfSksXG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgdmFsdWVDb250cm9sbGVyOiBjb250cm9sbGVyLFxuICAgIH0pO1xufVxuXG5jbGFzcyBQbHVnaW5Qb29sIHtcbiAgICBjb25zdHJ1Y3RvcihhcGlDYWNoZSkge1xuICAgICAgICB0aGlzLnBsdWdpbnNNYXBfID0ge1xuICAgICAgICAgICAgYmxhZGVzOiBbXSxcbiAgICAgICAgICAgIGlucHV0czogW10sXG4gICAgICAgICAgICBtb25pdG9yczogW10sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYXBpQ2FjaGVfID0gYXBpQ2FjaGU7XG4gICAgfVxuICAgIGdldEFsbCgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIC4uLnRoaXMucGx1Z2luc01hcF8uYmxhZGVzLFxuICAgICAgICAgICAgLi4udGhpcy5wbHVnaW5zTWFwXy5pbnB1dHMsXG4gICAgICAgICAgICAuLi50aGlzLnBsdWdpbnNNYXBfLm1vbml0b3JzLFxuICAgICAgICBdO1xuICAgIH1cbiAgICByZWdpc3RlcihidW5kbGVJZCwgcikge1xuICAgICAgICBpZiAoIWlzQ29tcGF0aWJsZShyLmNvcmUpKSB7XG4gICAgICAgICAgICB0aHJvdyBUcEVycm9yLm5vdENvbXBhdGlibGUoYnVuZGxlSWQsIHIuaWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyLnR5cGUgPT09ICdibGFkZScpIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luc01hcF8uYmxhZGVzLnVuc2hpZnQocik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoci50eXBlID09PSAnaW5wdXQnKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbnNNYXBfLmlucHV0cy51bnNoaWZ0KHIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHIudHlwZSA9PT0gJ21vbml0b3InKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbnNNYXBfLm1vbml0b3JzLnVuc2hpZnQocik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlSW5wdXRfKGRvY3VtZW50LCB0YXJnZXQsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW5zTWFwXy5pbnB1dHMucmVkdWNlKChyZXN1bHQsIHBsdWdpbikgPT4gcmVzdWx0ICE9PSBudWxsICYmIHJlc3VsdCAhPT0gdm9pZCAwID8gcmVzdWx0IDogY3JlYXRlSW5wdXRCaW5kaW5nQ29udHJvbGxlcihwbHVnaW4sIHtcbiAgICAgICAgICAgIGRvY3VtZW50OiBkb2N1bWVudCxcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgIH0pLCBudWxsKTtcbiAgICB9XG4gICAgY3JlYXRlTW9uaXRvcl8oZG9jdW1lbnQsIHRhcmdldCwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsdWdpbnNNYXBfLm1vbml0b3JzLnJlZHVjZSgocmVzdWx0LCBwbHVnaW4pID0+IHJlc3VsdCAhPT0gbnVsbCAmJiByZXN1bHQgIT09IHZvaWQgMCA/IHJlc3VsdCA6IGNyZWF0ZU1vbml0b3JCaW5kaW5nQ29udHJvbGxlcihwbHVnaW4sIHtcbiAgICAgICAgICAgIGRvY3VtZW50OiBkb2N1bWVudCxcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIH0pLCBudWxsKTtcbiAgICB9XG4gICAgY3JlYXRlQmluZGluZyhkb2MsIHRhcmdldCwgcGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHRhcmdldC5yZWFkKCk7XG4gICAgICAgIGlmIChpc0VtcHR5KGluaXRpYWxWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUcEVycm9yKHtcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogdGFyZ2V0LmtleSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdub21hdGNoaW5nY29udHJvbGxlcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpYyA9IHRoaXMuY3JlYXRlSW5wdXRfKGRvYywgdGFyZ2V0LCBwYXJhbXMpO1xuICAgICAgICBpZiAoaWMpIHtcbiAgICAgICAgICAgIHJldHVybiBpYztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYyA9IHRoaXMuY3JlYXRlTW9uaXRvcl8oZG9jLCB0YXJnZXQsIHBhcmFtcyk7XG4gICAgICAgIGlmIChtYykge1xuICAgICAgICAgICAgcmV0dXJuIG1jO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBUcEVycm9yKHtcbiAgICAgICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICBrZXk6IHRhcmdldC5rZXksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogJ25vbWF0Y2hpbmdjb250cm9sbGVyJyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNyZWF0ZUJsYWRlKGRvY3VtZW50LCBwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgYmMgPSB0aGlzLnBsdWdpbnNNYXBfLmJsYWRlcy5yZWR1Y2UoKHJlc3VsdCwgcGx1Z2luKSA9PiByZXN1bHQgIT09IG51bGwgJiYgcmVzdWx0ICE9PSB2b2lkIDAgPyByZXN1bHQgOiBjcmVhdGVCbGFkZUNvbnRyb2xsZXIocGx1Z2luLCB7XG4gICAgICAgICAgICBkb2N1bWVudDogZG9jdW1lbnQsXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgfSksIG51bGwpO1xuICAgICAgICBpZiAoIWJjKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHBFcnJvcih7XG4gICAgICAgICAgICAgICAgdHlwZTogJ25vbWF0Y2hpbmd2aWV3JyxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmM7XG4gICAgfVxuICAgIGNyZWF0ZUlucHV0QmluZGluZ0FwaV8oYmMpIHtcbiAgICAgICAgY29uc3QgYXBpID0gdGhpcy5wbHVnaW5zTWFwXy5pbnB1dHMucmVkdWNlKChyZXN1bHQsIHBsdWdpbikgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICgoX2IgPSAoX2EgPSBwbHVnaW4uYXBpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChwbHVnaW4sIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBiYyxcbiAgICAgICAgICAgIH0pKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsKTtcbiAgICAgICAgfSwgbnVsbCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFwaUNhY2hlXy5hZGQoYmMsIGFwaSAhPT0gbnVsbCAmJiBhcGkgIT09IHZvaWQgMCA/IGFwaSA6IG5ldyBCaW5kaW5nQXBpKGJjKSk7XG4gICAgfVxuICAgIGNyZWF0ZU1vbml0b3JCaW5kaW5nQXBpXyhiYykge1xuICAgICAgICBjb25zdCBhcGkgPSB0aGlzLnBsdWdpbnNNYXBfLm1vbml0b3JzLnJlZHVjZSgocmVzdWx0LCBwbHVnaW4pID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoKF9iID0gKF9hID0gcGx1Z2luLmFwaSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwocGx1Z2luLCB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogYmMsXG4gICAgICAgICAgICB9KSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogbnVsbCk7XG4gICAgICAgIH0sIG51bGwpO1xuICAgICAgICByZXR1cm4gdGhpcy5hcGlDYWNoZV8uYWRkKGJjLCBhcGkgIT09IG51bGwgJiYgYXBpICE9PSB2b2lkIDAgPyBhcGkgOiBuZXcgQmluZGluZ0FwaShiYykpO1xuICAgIH1cbiAgICBjcmVhdGVCaW5kaW5nQXBpKGJjKSB7XG4gICAgICAgIGlmICh0aGlzLmFwaUNhY2hlXy5oYXMoYmMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcGlDYWNoZV8uZ2V0KGJjKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNJbnB1dEJpbmRpbmdDb250cm9sbGVyKGJjKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSW5wdXRCaW5kaW5nQXBpXyhiYyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTW9uaXRvckJpbmRpbmdDb250cm9sbGVyKGJjKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9uaXRvckJpbmRpbmdBcGlfKGJjKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBUcEVycm9yLnNob3VsZE5ldmVySGFwcGVuKCk7XG4gICAgfVxuICAgIGNyZWF0ZUFwaShiYykge1xuICAgICAgICBpZiAodGhpcy5hcGlDYWNoZV8uaGFzKGJjKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBpQ2FjaGVfLmdldChiYyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQmluZGluZ0NvbnRyb2xsZXIoYmMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVCaW5kaW5nQXBpKGJjKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhcGkgPSB0aGlzLnBsdWdpbnNNYXBfLmJsYWRlcy5yZWR1Y2UoKHJlc3VsdCwgcGx1Z2luKSA9PiByZXN1bHQgIT09IG51bGwgJiYgcmVzdWx0ICE9PSB2b2lkIDAgPyByZXN1bHQgOiBwbHVnaW4uYXBpKHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IGJjLFxuICAgICAgICAgICAgcG9vbDogdGhpcyxcbiAgICAgICAgfSksIG51bGwpO1xuICAgICAgICBpZiAoIWFwaSkge1xuICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5zaG91bGROZXZlckhhcHBlbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmFwaUNhY2hlXy5hZGQoYmMsIGFwaSk7XG4gICAgfVxufVxuXG5jb25zdCBzaGFyZWRDYWNoZSA9IG5ldyBCbGFkZUFwaUNhY2hlKCk7XG5mdW5jdGlvbiBjcmVhdGVEZWZhdWx0UGx1Z2luUG9vbCgpIHtcbiAgICBjb25zdCBwb29sID0gbmV3IFBsdWdpblBvb2woc2hhcmVkQ2FjaGUpO1xuICAgIFtcbiAgICAgICAgUG9pbnQyZElucHV0UGx1Z2luLFxuICAgICAgICBQb2ludDNkSW5wdXRQbHVnaW4sXG4gICAgICAgIFBvaW50NGRJbnB1dFBsdWdpbixcbiAgICAgICAgU3RyaW5nSW5wdXRQbHVnaW4sXG4gICAgICAgIE51bWJlcklucHV0UGx1Z2luLFxuICAgICAgICBTdHJpbmdDb2xvcklucHV0UGx1Z2luLFxuICAgICAgICBPYmplY3RDb2xvcklucHV0UGx1Z2luLFxuICAgICAgICBOdW1iZXJDb2xvcklucHV0UGx1Z2luLFxuICAgICAgICBCb29sZWFuSW5wdXRQbHVnaW4sXG4gICAgICAgIEJvb2xlYW5Nb25pdG9yUGx1Z2luLFxuICAgICAgICBTdHJpbmdNb25pdG9yUGx1Z2luLFxuICAgICAgICBOdW1iZXJNb25pdG9yUGx1Z2luLFxuICAgICAgICBCdXR0b25CbGFkZVBsdWdpbixcbiAgICAgICAgRm9sZGVyQmxhZGVQbHVnaW4sXG4gICAgICAgIFRhYkJsYWRlUGx1Z2luLFxuICAgIF0uZm9yRWFjaCgocCkgPT4ge1xuICAgICAgICBwb29sLnJlZ2lzdGVyKCdjb3JlJywgcCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBvb2w7XG59XG5cbmNsYXNzIExpc3RCbGFkZUFwaSBleHRlbmRzIEJsYWRlQXBpIHtcbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29udHJvbGxlcikge1xuICAgICAgICBzdXBlcihjb250cm9sbGVyKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyXyA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCAoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgnY2hhbmdlJywgbmV3IFRwQ2hhbmdlRXZlbnQodGhpcywgZXYucmF3VmFsdWUpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBsYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5sYWJlbENvbnRyb2xsZXIucHJvcHMuZ2V0KCdsYWJlbCcpO1xuICAgIH1cbiAgICBzZXQgbGFiZWwobGFiZWwpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLmxhYmVsQ29udHJvbGxlci5wcm9wcy5zZXQoJ2xhYmVsJywgbGFiZWwpO1xuICAgIH1cbiAgICBnZXQgb3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci52YWx1ZUNvbnRyb2xsZXIucHJvcHMuZ2V0KCdvcHRpb25zJyk7XG4gICAgfVxuICAgIHNldCBvcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLnZhbHVlQ29udHJvbGxlci5wcm9wcy5zZXQoJ29wdGlvbnMnLCBvcHRpb25zKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLnZhbHVlLnJhd1ZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLnZhbHVlLnJhd1ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIG9uKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICBjb25zdCBiaCA9IGhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyXy5vbihldmVudE5hbWUsIChldikgPT4ge1xuICAgICAgICAgICAgYmgoZXYpO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IGhhbmRsZXIsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb2ZmKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLmVtaXR0ZXJfLm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmNsYXNzIFNlcGFyYXRvckJsYWRlQXBpIGV4dGVuZHMgQmxhZGVBcGkge1xufVxuXG5jbGFzcyBTbGlkZXJCbGFkZUFwaSBleHRlbmRzIEJsYWRlQXBpIHtcbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29udHJvbGxlcikge1xuICAgICAgICBzdXBlcihjb250cm9sbGVyKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyXyA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCAoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgnY2hhbmdlJywgbmV3IFRwQ2hhbmdlRXZlbnQodGhpcywgZXYucmF3VmFsdWUpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBsYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5sYWJlbENvbnRyb2xsZXIucHJvcHMuZ2V0KCdsYWJlbCcpO1xuICAgIH1cbiAgICBzZXQgbGFiZWwobGFiZWwpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLmxhYmVsQ29udHJvbGxlci5wcm9wcy5zZXQoJ2xhYmVsJywgbGFiZWwpO1xuICAgIH1cbiAgICBnZXQgbWF4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLnZhbHVlQ29udHJvbGxlci5zbGlkZXJDb250cm9sbGVyLnByb3BzLmdldCgnbWF4Jyk7XG4gICAgfVxuICAgIHNldCBtYXgobWF4KSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci52YWx1ZUNvbnRyb2xsZXIuc2xpZGVyQ29udHJvbGxlci5wcm9wcy5zZXQoJ21heCcsIG1heCk7XG4gICAgfVxuICAgIGdldCBtaW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIudmFsdWVDb250cm9sbGVyLnNsaWRlckNvbnRyb2xsZXIucHJvcHMuZ2V0KCdtaW4nKTtcbiAgICB9XG4gICAgc2V0IG1pbihtaW4pIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLnZhbHVlQ29udHJvbGxlci5zbGlkZXJDb250cm9sbGVyLnByb3BzLnNldCgnbWluJywgbWluKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLnZhbHVlLnJhd1ZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLnZhbHVlLnJhd1ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIG9uKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICBjb25zdCBiaCA9IGhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyXy5vbihldmVudE5hbWUsIChldikgPT4ge1xuICAgICAgICAgICAgYmgoZXYpO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IGhhbmRsZXIsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb2ZmKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLmVtaXR0ZXJfLm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmNsYXNzIFRleHRCbGFkZUFwaSBleHRlbmRzIEJsYWRlQXBpIHtcbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29udHJvbGxlcikge1xuICAgICAgICBzdXBlcihjb250cm9sbGVyKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyXyA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci52YWx1ZS5lbWl0dGVyLm9uKCdjaGFuZ2UnLCAoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlcl8uZW1pdCgnY2hhbmdlJywgbmV3IFRwQ2hhbmdlRXZlbnQodGhpcywgZXYucmF3VmFsdWUpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBsYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5sYWJlbENvbnRyb2xsZXIucHJvcHMuZ2V0KCdsYWJlbCcpO1xuICAgIH1cbiAgICBzZXQgbGFiZWwobGFiZWwpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLmxhYmVsQ29udHJvbGxlci5wcm9wcy5zZXQoJ2xhYmVsJywgbGFiZWwpO1xuICAgIH1cbiAgICBnZXQgZm9ybWF0dGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLnZhbHVlQ29udHJvbGxlci5wcm9wcy5nZXQoJ2Zvcm1hdHRlcicpO1xuICAgIH1cbiAgICBzZXQgZm9ybWF0dGVyKGZvcm1hdHRlcikge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIudmFsdWVDb250cm9sbGVyLnByb3BzLnNldCgnZm9ybWF0dGVyJywgZm9ybWF0dGVyKTtcbiAgICB9XG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLnZhbHVlLnJhd1ZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLnZhbHVlLnJhd1ZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIG9uKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICBjb25zdCBiaCA9IGhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbWl0dGVyXy5vbihldmVudE5hbWUsIChldikgPT4ge1xuICAgICAgICAgICAgYmgoZXYpO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IGhhbmRsZXIsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb2ZmKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLmVtaXR0ZXJfLm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmNvbnN0IExpc3RCbGFkZVBsdWdpbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6ICdsaXN0JyxcbiAgICAgICAgdHlwZTogJ2JsYWRlJyxcbiAgICAgICAgY29yZTogVkVSU0lPTiQxLFxuICAgICAgICBhY2NlcHQocGFyYW1zKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZVJlY29yZChwYXJhbXMsIChwKSA9PiAoe1xuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHAucmVxdWlyZWQuY3VzdG9tKHBhcnNlTGlzdE9wdGlvbnMpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBwLnJlcXVpcmVkLnJhdyxcbiAgICAgICAgICAgICAgICB2aWV3OiBwLnJlcXVpcmVkLmNvbnN0YW50KCdsaXN0JyksXG4gICAgICAgICAgICAgICAgbGFiZWw6IHAub3B0aW9uYWwuc3RyaW5nLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCA/IHsgcGFyYW1zOiByZXN1bHQgfSA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXIoYXJncykge1xuICAgICAgICAgICAgY29uc3QgbGMgPSBuZXcgTGlzdENvbnN0cmFpbnQobm9ybWFsaXplTGlzdE9wdGlvbnMoYXJncy5wYXJhbXMub3B0aW9ucykpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjcmVhdGVWYWx1ZShhcmdzLnBhcmFtcy52YWx1ZSwge1xuICAgICAgICAgICAgICAgIGNvbnN0cmFpbnQ6IGxjLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBpYyA9IG5ldyBMaXN0Q29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgcHJvcHM6IG5ldyBWYWx1ZU1hcCh7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGxjLnZhbHVlcy52YWx1ZSgnb3B0aW9ucycpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IExhYmVsZWRWYWx1ZUJsYWRlQ29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgYmxhZGU6IGFyZ3MuYmxhZGUsXG4gICAgICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYXJncy5wYXJhbXMubGFiZWwsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHZhbHVlQ29udHJvbGxlcjogaWMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgYXBpKGFyZ3MpIHtcbiAgICAgICAgICAgIGlmICghKGFyZ3MuY29udHJvbGxlciBpbnN0YW5jZW9mIExhYmVsZWRWYWx1ZUJsYWRlQ29udHJvbGxlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKGFyZ3MuY29udHJvbGxlci52YWx1ZUNvbnRyb2xsZXIgaW5zdGFuY2VvZiBMaXN0Q29udHJvbGxlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgTGlzdEJsYWRlQXBpKGFyZ3MuY29udHJvbGxlcik7XG4gICAgICAgIH0sXG4gICAgfTtcbn0pKCk7XG5cbmNsYXNzIFJvb3RBcGkgZXh0ZW5kcyBGb2xkZXJBcGkge1xuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb250cm9sbGVyLCBwb29sKSB7XG4gICAgICAgIHN1cGVyKGNvbnRyb2xsZXIsIHBvb2wpO1xuICAgIH1cbiAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci52aWV3LmVsZW1lbnQ7XG4gICAgfVxufVxuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuY2xhc3MgUm9vdENvbnRyb2xsZXIgZXh0ZW5kcyBGb2xkZXJDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2MsIGNvbmZpZykge1xuICAgICAgICBzdXBlcihkb2MsIHtcbiAgICAgICAgICAgIGV4cGFuZGVkOiBjb25maWcuZXhwYW5kZWQsXG4gICAgICAgICAgICBibGFkZTogY29uZmlnLmJsYWRlLFxuICAgICAgICAgICAgcHJvcHM6IGNvbmZpZy5wcm9wcyxcbiAgICAgICAgICAgIHJvb3Q6IHRydWUsXG4gICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY29uc3QgY24gPSBDbGFzc05hbWUoJ3NwcicpO1xuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmNsYXNzIFNlcGFyYXRvclZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoY24oKSk7XG4gICAgICAgIGNvbmZpZy52aWV3UHJvcHMuYmluZENsYXNzTW9kaWZpZXJzKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGhyRWxlbSA9IGRvYy5jcmVhdGVFbGVtZW50KCdocicpO1xuICAgICAgICBockVsZW0uY2xhc3NMaXN0LmFkZChjbigncicpKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGhyRWxlbSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBoaWRkZW5cbiAqL1xuY2xhc3MgU2VwYXJhdG9yQ29udHJvbGxlciBleHRlbmRzIEJsYWRlQ29udHJvbGxlciB7XG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGRvYywgY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKSwgeyB2aWV3OiBuZXcgU2VwYXJhdG9yVmlldyhkb2MsIHtcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGNvbmZpZy52aWV3UHJvcHMsXG4gICAgICAgICAgICB9KSB9KSk7XG4gICAgfVxufVxuXG5jb25zdCBTZXBhcmF0b3JCbGFkZVBsdWdpbiA9IHtcbiAgICBpZDogJ3NlcGFyYXRvcicsXG4gICAgdHlwZTogJ2JsYWRlJyxcbiAgICBjb3JlOiBWRVJTSU9OJDEsXG4gICAgYWNjZXB0KHBhcmFtcykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZVJlY29yZChwYXJhbXMsIChwKSA9PiAoe1xuICAgICAgICAgICAgdmlldzogcC5yZXF1aXJlZC5jb25zdGFudCgnc2VwYXJhdG9yJyksXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA/IHsgcGFyYW1zOiByZXN1bHQgfSA6IG51bGw7XG4gICAgfSxcbiAgICBjb250cm9sbGVyKGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXBhcmF0b3JDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgIGJsYWRlOiBhcmdzLmJsYWRlLFxuICAgICAgICAgICAgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBhcGkoYXJncykge1xuICAgICAgICBpZiAoIShhcmdzLmNvbnRyb2xsZXIgaW5zdGFuY2VvZiBTZXBhcmF0b3JDb250cm9sbGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBTZXBhcmF0b3JCbGFkZUFwaShhcmdzLmNvbnRyb2xsZXIpO1xuICAgIH0sXG59O1xuXG5jb25zdCBTbGlkZXJCbGFkZVBsdWdpbiA9IHtcbiAgICBpZDogJ3NsaWRlcicsXG4gICAgdHlwZTogJ2JsYWRlJyxcbiAgICBjb3JlOiBWRVJTSU9OJDEsXG4gICAgYWNjZXB0KHBhcmFtcykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBwYXJzZVJlY29yZChwYXJhbXMsIChwKSA9PiAoe1xuICAgICAgICAgICAgbWF4OiBwLnJlcXVpcmVkLm51bWJlcixcbiAgICAgICAgICAgIG1pbjogcC5yZXF1aXJlZC5udW1iZXIsXG4gICAgICAgICAgICB2aWV3OiBwLnJlcXVpcmVkLmNvbnN0YW50KCdzbGlkZXInKSxcbiAgICAgICAgICAgIGZvcm1hdDogcC5vcHRpb25hbC5mdW5jdGlvbixcbiAgICAgICAgICAgIGxhYmVsOiBwLm9wdGlvbmFsLnN0cmluZyxcbiAgICAgICAgICAgIHZhbHVlOiBwLm9wdGlvbmFsLm51bWJlcixcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0ID8geyBwYXJhbXM6IHJlc3VsdCB9IDogbnVsbDtcbiAgICB9LFxuICAgIGNvbnRyb2xsZXIoYXJncykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSAoX2EgPSBhcmdzLnBhcmFtcy52YWx1ZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMDtcbiAgICAgICAgY29uc3QgZHJjID0gbmV3IERlZmluaXRlUmFuZ2VDb25zdHJhaW50KHtcbiAgICAgICAgICAgIG1heDogYXJncy5wYXJhbXMubWF4LFxuICAgICAgICAgICAgbWluOiBhcmdzLnBhcmFtcy5taW4sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB2ID0gY3JlYXRlVmFsdWUoaW5pdGlhbFZhbHVlLCB7XG4gICAgICAgICAgICBjb25zdHJhaW50OiBkcmMsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB2YyA9IG5ldyBTbGlkZXJUZXh0Q29udHJvbGxlcihhcmdzLmRvY3VtZW50LCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNyZWF0ZVNsaWRlclRleHRQcm9wcyh7XG4gICAgICAgICAgICBmb3JtYXR0ZXI6IChfYiA9IGFyZ3MucGFyYW1zLmZvcm1hdCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogbnVtYmVyVG9TdHJpbmcsXG4gICAgICAgICAgICBrZXlTY2FsZTogY3JlYXRlVmFsdWUoMSksXG4gICAgICAgICAgICBtYXg6IGRyYy52YWx1ZXMudmFsdWUoJ21heCcpLFxuICAgICAgICAgICAgbWluOiBkcmMudmFsdWVzLnZhbHVlKCdtaW4nKSxcbiAgICAgICAgICAgIHBvaW50ZXJTY2FsZTogZ2V0U3VpdGFibGVQb2ludGVyU2NhbGUoYXJncy5wYXJhbXMsIGluaXRpYWxWYWx1ZSksXG4gICAgICAgIH0pKSwgeyBwYXJzZXI6IHBhcnNlTnVtYmVyLCB2YWx1ZTogdiwgdmlld1Byb3BzOiBhcmdzLnZpZXdQcm9wcyB9KSk7XG4gICAgICAgIHJldHVybiBuZXcgTGFiZWxlZFZhbHVlQmxhZGVDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgIGJsYWRlOiBhcmdzLmJsYWRlLFxuICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBhcmdzLnBhcmFtcy5sYWJlbCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdmFsdWU6IHYsXG4gICAgICAgICAgICB2YWx1ZUNvbnRyb2xsZXI6IHZjLFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGFwaShhcmdzKSB7XG4gICAgICAgIGlmICghKGFyZ3MuY29udHJvbGxlciBpbnN0YW5jZW9mIExhYmVsZWRWYWx1ZUJsYWRlQ29udHJvbGxlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKGFyZ3MuY29udHJvbGxlci52YWx1ZUNvbnRyb2xsZXIgaW5zdGFuY2VvZiBTbGlkZXJUZXh0Q29udHJvbGxlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgU2xpZGVyQmxhZGVBcGkoYXJncy5jb250cm9sbGVyKTtcbiAgICB9LFxufTtcblxuY29uc3QgVGV4dEJsYWRlUGx1Z2luID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogJ3RleHQnLFxuICAgICAgICB0eXBlOiAnYmxhZGUnLFxuICAgICAgICBjb3JlOiBWRVJTSU9OJDEsXG4gICAgICAgIGFjY2VwdChwYXJhbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHBhcnNlUmVjb3JkKHBhcmFtcywgKHApID0+ICh7XG4gICAgICAgICAgICAgICAgcGFyc2U6IHAucmVxdWlyZWQuZnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgdmFsdWU6IHAucmVxdWlyZWQucmF3LFxuICAgICAgICAgICAgICAgIHZpZXc6IHAucmVxdWlyZWQuY29uc3RhbnQoJ3RleHQnKSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHAub3B0aW9uYWwuZnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgbGFiZWw6IHAub3B0aW9uYWwuc3RyaW5nLFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCA/IHsgcGFyYW1zOiByZXN1bHQgfSA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXIoYXJncykge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgdiA9IGNyZWF0ZVZhbHVlKGFyZ3MucGFyYW1zLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IGljID0gbmV3IFRleHRDb250cm9sbGVyKGFyZ3MuZG9jdW1lbnQsIHtcbiAgICAgICAgICAgICAgICBwYXJzZXI6IGFyZ3MucGFyYW1zLnBhcnNlLFxuICAgICAgICAgICAgICAgIHByb3BzOiBWYWx1ZU1hcC5mcm9tT2JqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiAoX2EgPSBhcmdzLnBhcmFtcy5mb3JtYXQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICgodikgPT4gU3RyaW5nKHYpKSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdixcbiAgICAgICAgICAgICAgICB2aWV3UHJvcHM6IGFyZ3Mudmlld1Byb3BzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IExhYmVsZWRWYWx1ZUJsYWRlQ29udHJvbGxlcihhcmdzLmRvY3VtZW50LCB7XG4gICAgICAgICAgICAgICAgYmxhZGU6IGFyZ3MuYmxhZGUsXG4gICAgICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYXJncy5wYXJhbXMubGFiZWwsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdmFsdWU6IHYsXG4gICAgICAgICAgICAgICAgdmFsdWVDb250cm9sbGVyOiBpYyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBhcGkoYXJncykge1xuICAgICAgICAgICAgaWYgKCEoYXJncy5jb250cm9sbGVyIGluc3RhbmNlb2YgTGFiZWxlZFZhbHVlQmxhZGVDb250cm9sbGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEoYXJncy5jb250cm9sbGVyLnZhbHVlQ29udHJvbGxlciBpbnN0YW5jZW9mIFRleHRDb250cm9sbGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUZXh0QmxhZGVBcGkoYXJncy5jb250cm9sbGVyKTtcbiAgICAgICAgfSxcbiAgICB9O1xufSkoKTtcblxuZnVuY3Rpb24gY3JlYXRlRGVmYXVsdFdyYXBwZXJFbGVtZW50KGRvYykge1xuICAgIGNvbnN0IGVsZW0gPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbS5jbGFzc0xpc3QuYWRkKENsYXNzTmFtZSgnZGZ3JykoKSk7XG4gICAgaWYgKGRvYy5ib2R5KSB7XG4gICAgICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbTtcbn1cbmZ1bmN0aW9uIGVtYmVkU3R5bGUoZG9jLCBpZCwgY3NzKSB7XG4gICAgaWYgKGRvYy5xdWVyeVNlbGVjdG9yKGBzdHlsZVtkYXRhLXRwLXN0eWxlPSR7aWR9XWApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3R5bGVFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGVFbGVtLmRhdGFzZXQudHBTdHlsZSA9IGlkO1xuICAgIHN0eWxlRWxlbS50ZXh0Q29udGVudCA9IGNzcztcbiAgICBkb2MuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW0pO1xufVxuLyoqXG4gKiBUaGUgcm9vdCBwYW5lIG9mIFR3ZWFrcGFuZS5cbiAqL1xuY2xhc3MgUGFuZSBleHRlbmRzIFJvb3RBcGkge1xuICAgIGNvbnN0cnVjdG9yKG9wdF9jb25maWcpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgY29uZmlnID0gb3B0X2NvbmZpZyAhPT0gbnVsbCAmJiBvcHRfY29uZmlnICE9PSB2b2lkIDAgPyBvcHRfY29uZmlnIDoge307XG4gICAgICAgIGNvbnN0IGRvYyA9IChfYSA9IGNvbmZpZy5kb2N1bWVudCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZ2V0V2luZG93RG9jdW1lbnQoKTtcbiAgICAgICAgY29uc3QgcG9vbCA9IGNyZWF0ZURlZmF1bHRQbHVnaW5Qb29sKCk7XG4gICAgICAgIGNvbnN0IHJvb3RDb250cm9sbGVyID0gbmV3IFJvb3RDb250cm9sbGVyKGRvYywge1xuICAgICAgICAgICAgZXhwYW5kZWQ6IGNvbmZpZy5leHBhbmRlZCxcbiAgICAgICAgICAgIGJsYWRlOiBjcmVhdGVCbGFkZSgpLFxuICAgICAgICAgICAgcHJvcHM6IFZhbHVlTWFwLmZyb21PYmplY3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBjb25maWcudGl0bGUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHZpZXdQcm9wczogVmlld1Byb3BzLmNyZWF0ZSgpLFxuICAgICAgICB9KTtcbiAgICAgICAgc3VwZXIocm9vdENvbnRyb2xsZXIsIHBvb2wpO1xuICAgICAgICB0aGlzLnBvb2xfID0gcG9vbDtcbiAgICAgICAgdGhpcy5jb250YWluZXJFbGVtXyA9IChfYiA9IGNvbmZpZy5jb250YWluZXIpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGNyZWF0ZURlZmF1bHRXcmFwcGVyRWxlbWVudChkb2MpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckVsZW1fLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIHRoaXMuZG9jXyA9IGRvYztcbiAgICAgICAgdGhpcy51c2VzRGVmYXVsdFdyYXBwZXJfID0gIWNvbmZpZy5jb250YWluZXI7XG4gICAgICAgIHRoaXMuc2V0VXBEZWZhdWx0UGx1Z2luc18oKTtcbiAgICB9XG4gICAgZ2V0IGRvY3VtZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jXykge1xuICAgICAgICAgICAgdGhyb3cgVHBFcnJvci5hbHJlYWR5RGlzcG9zZWQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kb2NfO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXJFbGVtID0gdGhpcy5jb250YWluZXJFbGVtXztcbiAgICAgICAgaWYgKCFjb250YWluZXJFbGVtKSB7XG4gICAgICAgICAgICB0aHJvdyBUcEVycm9yLmFscmVhZHlEaXNwb3NlZCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVzZXNEZWZhdWx0V3JhcHBlcl8pIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEVsZW0gPSBjb250YWluZXJFbGVtLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAocGFyZW50RWxlbSkge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsZW0ucmVtb3ZlQ2hpbGQoY29udGFpbmVyRWxlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250YWluZXJFbGVtXyA9IG51bGw7XG4gICAgICAgIHRoaXMuZG9jXyA9IG51bGw7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgcmVnaXN0ZXJQbHVnaW4oYnVuZGxlKSB7XG4gICAgICAgIGlmIChidW5kbGUuY3NzKSB7XG4gICAgICAgICAgICBlbWJlZFN0eWxlKHRoaXMuZG9jdW1lbnQsIGBwbHVnaW4tJHtidW5kbGUuaWR9YCwgYnVuZGxlLmNzcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGx1Z2lucyA9ICdwbHVnaW4nIGluIGJ1bmRsZVxuICAgICAgICAgICAgPyBbYnVuZGxlLnBsdWdpbl1cbiAgICAgICAgICAgIDogJ3BsdWdpbnMnIGluIGJ1bmRsZVxuICAgICAgICAgICAgICAgID8gYnVuZGxlLnBsdWdpbnNcbiAgICAgICAgICAgICAgICA6IFtdO1xuICAgICAgICBwbHVnaW5zLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgICAgIHRoaXMucG9vbF8ucmVnaXN0ZXIoYnVuZGxlLmlkLCBwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldFVwRGVmYXVsdFBsdWdpbnNfKCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyUGx1Z2luKHtcbiAgICAgICAgICAgIGlkOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIHN0cmluZyBsaXRlcmFsIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgZGVmYXVsdCBDU1MgYnkgUm9sbHVwIGF0IHRoZSBjb21waWxhdGlvbiB0aW1lXG4gICAgICAgICAgICBjc3M6ICcudHAtdGJpdl9iLC50cC1jb2x0eHR2X21zLC50cC1jb2xzd3ZfYiwudHAtY2tidl9pLC50cC1zZ2x2X2ksLnRwLW1sbHZfaSwudHAtZ3Jsdl9nLC50cC10eHR2X2ksLnRwLXAyZHB2X3AsLnRwLWNvbHN3dl9zdywudHAtcm90dl9iLC50cC1mbGR2X2IsLnRwLXAyZHZfYiwudHAtYnRudl9iLC50cC1sc3R2X3N7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmU7YXBwZWFyYW5jZTpub25lO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwwKTtib3JkZXItd2lkdGg6MDtmb250LWZhbWlseTppbmhlcml0O2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OmluaGVyaXQ7bWFyZ2luOjA7b3V0bGluZTpub25lO3BhZGRpbmc6MH0udHAtcDJkdl9iLC50cC1idG52X2IsLnRwLWxzdHZfc3tiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJ0bi1iZyk7Ym9yZGVyLXJhZGl1czp2YXIoLS1ibGQtYnIpO2NvbG9yOnZhcigtLWJ0bi1mZyk7Y3Vyc29yOnBvaW50ZXI7ZGlzcGxheTpibG9jaztmb250LXdlaWdodDpib2xkO2hlaWdodDp2YXIoLS1jbnQtdXN6KTtsaW5lLWhlaWdodDp2YXIoLS1jbnQtdXN6KTtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpczt3aGl0ZS1zcGFjZTpub3dyYXB9LnRwLXAyZHZfYjpob3ZlciwudHAtYnRudl9iOmhvdmVyLC50cC1sc3R2X3M6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idG4tYmctaCl9LnRwLXAyZHZfYjpmb2N1cywudHAtYnRudl9iOmZvY3VzLC50cC1sc3R2X3M6Zm9jdXN7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idG4tYmctZil9LnRwLXAyZHZfYjphY3RpdmUsLnRwLWJ0bnZfYjphY3RpdmUsLnRwLWxzdHZfczphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idG4tYmctYSl9LnRwLXAyZHZfYjpkaXNhYmxlZCwudHAtYnRudl9iOmRpc2FibGVkLC50cC1sc3R2X3M6ZGlzYWJsZWR7b3BhY2l0eTouNX0udHAtcm90dl9jPi50cC1jbnR2LnRwLXYtbHN0LC50cC10YnB2X2M+LnRwLWNudHYudHAtdi1sc3QsLnRwLWZsZHZfYz4udHAtY250di50cC12LWxzdHttYXJnaW4tYm90dG9tOmNhbGMoLTEqdmFyKC0tY250LXZwKSl9LnRwLXJvdHZfYz4udHAtZmxkdi50cC12LWxzdCAudHAtZmxkdl9jLC50cC10YnB2X2M+LnRwLWZsZHYudHAtdi1sc3QgLnRwLWZsZHZfYywudHAtZmxkdl9jPi50cC1mbGR2LnRwLXYtbHN0IC50cC1mbGR2X2N7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czowfS50cC1yb3R2X2M+LnRwLWZsZHYudHAtdi1sc3QgLnRwLWZsZHZfYiwudHAtdGJwdl9jPi50cC1mbGR2LnRwLXYtbHN0IC50cC1mbGR2X2IsLnRwLWZsZHZfYz4udHAtZmxkdi50cC12LWxzdCAudHAtZmxkdl9ie2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6MH0udHAtcm90dl9jPio6bm90KC50cC12LWZzdCksLnRwLXRicHZfYz4qOm5vdCgudHAtdi1mc3QpLC50cC1mbGR2X2M+Kjpub3QoLnRwLXYtZnN0KXttYXJnaW4tdG9wOnZhcigtLWNudC11c3ApfS50cC1yb3R2X2M+LnRwLXNwcnY6bm90KC50cC12LWZzdCksLnRwLXRicHZfYz4udHAtc3Bydjpub3QoLnRwLXYtZnN0KSwudHAtZmxkdl9jPi50cC1zcHJ2Om5vdCgudHAtdi1mc3QpLC50cC1yb3R2X2M+LnRwLWNudHY6bm90KC50cC12LWZzdCksLnRwLXRicHZfYz4udHAtY250djpub3QoLnRwLXYtZnN0KSwudHAtZmxkdl9jPi50cC1jbnR2Om5vdCgudHAtdi1mc3Qpe21hcmdpbi10b3A6dmFyKC0tY250LXZwKX0udHAtcm90dl9jPi50cC1zcHJ2Kyo6bm90KC50cC12LWhpZGRlbiksLnRwLXRicHZfYz4udHAtc3BydisqOm5vdCgudHAtdi1oaWRkZW4pLC50cC1mbGR2X2M+LnRwLXNwcnYrKjpub3QoLnRwLXYtaGlkZGVuKSwudHAtcm90dl9jPi50cC1jbnR2Kyo6bm90KC50cC12LWhpZGRlbiksLnRwLXRicHZfYz4udHAtY250disqOm5vdCgudHAtdi1oaWRkZW4pLC50cC1mbGR2X2M+LnRwLWNudHYrKjpub3QoLnRwLXYtaGlkZGVuKXttYXJnaW4tdG9wOnZhcigtLWNudC12cCl9LnRwLXJvdHZfYz4udHAtc3Bydjpub3QoLnRwLXYtaGlkZGVuKSsudHAtc3BydiwudHAtdGJwdl9jPi50cC1zcHJ2Om5vdCgudHAtdi1oaWRkZW4pKy50cC1zcHJ2LC50cC1mbGR2X2M+LnRwLXNwcnY6bm90KC50cC12LWhpZGRlbikrLnRwLXNwcnYsLnRwLXJvdHZfYz4udHAtY250djpub3QoLnRwLXYtaGlkZGVuKSsudHAtY250diwudHAtdGJwdl9jPi50cC1jbnR2Om5vdCgudHAtdi1oaWRkZW4pKy50cC1jbnR2LC50cC1mbGR2X2M+LnRwLWNudHY6bm90KC50cC12LWhpZGRlbikrLnRwLWNudHZ7bWFyZ2luLXRvcDowfS50cC10YnB2X2M+LnRwLWNudHYsLnRwLWZsZHZfYz4udHAtY250dnttYXJnaW4tbGVmdDo0cHh9LnRwLXRicHZfYz4udHAtZmxkdj4udHAtZmxkdl9iLC50cC1mbGR2X2M+LnRwLWZsZHY+LnRwLWZsZHZfYntib3JkZXItdG9wLWxlZnQtcmFkaXVzOnZhcigtLWJsZC1icik7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czp2YXIoLS1ibGQtYnIpfS50cC10YnB2X2M+LnRwLWZsZHYudHAtZmxkdi1leHBhbmRlZD4udHAtZmxkdl9iLC50cC1mbGR2X2M+LnRwLWZsZHYudHAtZmxkdi1leHBhbmRlZD4udHAtZmxkdl9ie2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6MH0udHAtdGJwdl9jIC50cC1mbGR2Pi50cC1mbGR2X2MsLnRwLWZsZHZfYyAudHAtZmxkdj4udHAtZmxkdl9je2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6dmFyKC0tYmxkLWJyKX0udHAtdGJwdl9jPi50cC1jbnR2Ky50cC1mbGR2Pi50cC1mbGR2X2IsLnRwLWZsZHZfYz4udHAtY250disudHAtZmxkdj4udHAtZmxkdl9ie2JvcmRlci10b3AtbGVmdC1yYWRpdXM6MH0udHAtdGJwdl9jPi50cC1jbnR2Ky50cC10YWJ2Pi50cC10YWJ2X3QsLnRwLWZsZHZfYz4udHAtY250disudHAtdGFidj4udHAtdGFidl90e2JvcmRlci10b3AtbGVmdC1yYWRpdXM6MH0udHAtdGJwdl9jPi50cC10YWJ2Pi50cC10YWJ2X3QsLnRwLWZsZHZfYz4udHAtdGFidj4udHAtdGFidl90e2JvcmRlci10b3AtbGVmdC1yYWRpdXM6dmFyKC0tYmxkLWJyKX0udHAtdGJwdl9jIC50cC10YWJ2Pi50cC10YWJ2X2MsLnRwLWZsZHZfYyAudHAtdGFidj4udHAtdGFidl9je2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6dmFyKC0tYmxkLWJyKX0udHAtcm90dl9iLC50cC1mbGR2X2J7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1jbnQtYmcpO2NvbG9yOnZhcigtLWNudC1mZyk7Y3Vyc29yOnBvaW50ZXI7ZGlzcGxheTpibG9jaztoZWlnaHQ6Y2FsYyh2YXIoLS1jbnQtdXN6KSArIDRweCk7bGluZS1oZWlnaHQ6Y2FsYyh2YXIoLS1jbnQtdXN6KSArIDRweCk7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmctbGVmdDp2YXIoLS1jbnQtaHApO3BhZGRpbmctcmlnaHQ6Y2FsYyg0cHggKyB2YXIoLS1jbnQtdXN6KSArIHZhcigtLWNudC1ocCkpO3Bvc2l0aW9uOnJlbGF0aXZlO3RleHQtYWxpZ246bGVmdDt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcDt3aWR0aDoxMDAlO3RyYW5zaXRpb246Ym9yZGVyLXJhZGl1cyAuMnMgZWFzZS1pbi1vdXQgLjJzfS50cC1yb3R2X2I6aG92ZXIsLnRwLWZsZHZfYjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWNudC1iZy1oKX0udHAtcm90dl9iOmZvY3VzLC50cC1mbGR2X2I6Zm9jdXN7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1jbnQtYmctZil9LnRwLXJvdHZfYjphY3RpdmUsLnRwLWZsZHZfYjphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1jbnQtYmctYSl9LnRwLXJvdHZfYjpkaXNhYmxlZCwudHAtZmxkdl9iOmRpc2FibGVke29wYWNpdHk6LjV9LnRwLXJvdHZfbSwudHAtZmxkdl9te2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIGxlZnQsIHZhcigtLWNudC1mZyksIHZhcigtLWNudC1mZykgMnB4LCB0cmFuc3BhcmVudCAycHgsIHRyYW5zcGFyZW50IDRweCwgdmFyKC0tY250LWZnKSA0cHgpO2JvcmRlci1yYWRpdXM6MnB4O2JvdHRvbTowO2NvbnRlbnQ6XCJcIjtkaXNwbGF5OmJsb2NrO2hlaWdodDo2cHg7cmlnaHQ6Y2FsYyh2YXIoLS1jbnQtaHApICsgKHZhcigtLWNudC11c3opICsgNHB4IC0gNnB4KS8yIC0gMnB4KTttYXJnaW46YXV0bztvcGFjaXR5Oi41O3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3RyYW5zZm9ybTpyb3RhdGUoOTBkZWcpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4ycyBlYXNlLWluLW91dDt3aWR0aDo2cHh9LnRwLXJvdHYudHAtcm90di1leHBhbmRlZCAudHAtcm90dl9tLC50cC1mbGR2LnRwLWZsZHYtZXhwYW5kZWQ+LnRwLWZsZHZfYj4udHAtZmxkdl9te3RyYW5zZm9ybTpub25lfS50cC1yb3R2X2MsLnRwLWZsZHZfY3tib3gtc2l6aW5nOmJvcmRlci1ib3g7aGVpZ2h0OjA7b3BhY2l0eTowO292ZXJmbG93OmhpZGRlbjtwYWRkaW5nLWJvdHRvbTowO3BhZGRpbmctdG9wOjA7cG9zaXRpb246cmVsYXRpdmU7dHJhbnNpdGlvbjpoZWlnaHQgLjJzIGVhc2UtaW4tb3V0LG9wYWNpdHkgLjJzIGxpbmVhcixwYWRkaW5nIC4ycyBlYXNlLWluLW91dH0udHAtcm90di50cC1yb3R2LWNwbDpub3QoLnRwLXJvdHYtZXhwYW5kZWQpIC50cC1yb3R2X2MsLnRwLWZsZHYudHAtZmxkdi1jcGw6bm90KC50cC1mbGR2LWV4cGFuZGVkKT4udHAtZmxkdl9je2Rpc3BsYXk6bm9uZX0udHAtcm90di50cC1yb3R2LWV4cGFuZGVkIC50cC1yb3R2X2MsLnRwLWZsZHYudHAtZmxkdi1leHBhbmRlZD4udHAtZmxkdl9je29wYWNpdHk6MTtwYWRkaW5nLWJvdHRvbTp2YXIoLS1jbnQtdnApO3BhZGRpbmctdG9wOnZhcigtLWNudC12cCk7dHJhbnNmb3JtOm5vbmU7b3ZlcmZsb3c6dmlzaWJsZTt0cmFuc2l0aW9uOmhlaWdodCAuMnMgZWFzZS1pbi1vdXQsb3BhY2l0eSAuMnMgbGluZWFyIC4ycyxwYWRkaW5nIC4ycyBlYXNlLWluLW91dH0udHAtdHh0dl9pLC50cC1wMmRwdl9wLC50cC1jb2xzd3Zfc3d7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1iZyk7Ym9yZGVyLXJhZGl1czp2YXIoLS1ibGQtYnIpO2JveC1zaXppbmc6Ym9yZGVyLWJveDtjb2xvcjp2YXIoLS1pbi1mZyk7Zm9udC1mYW1pbHk6aW5oZXJpdDtoZWlnaHQ6dmFyKC0tY250LXVzeik7bGluZS1oZWlnaHQ6dmFyKC0tY250LXVzeik7bWluLXdpZHRoOjA7d2lkdGg6MTAwJX0udHAtdHh0dl9pOmhvdmVyLC50cC1wMmRwdl9wOmhvdmVyLC50cC1jb2xzd3Zfc3c6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1iZy1oKX0udHAtdHh0dl9pOmZvY3VzLC50cC1wMmRwdl9wOmZvY3VzLC50cC1jb2xzd3Zfc3c6Zm9jdXN7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1iZy1mKX0udHAtdHh0dl9pOmFjdGl2ZSwudHAtcDJkcHZfcDphY3RpdmUsLnRwLWNvbHN3dl9zdzphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1iZy1hKX0udHAtdHh0dl9pOmRpc2FibGVkLC50cC1wMmRwdl9wOmRpc2FibGVkLC50cC1jb2xzd3Zfc3c6ZGlzYWJsZWR7b3BhY2l0eTouNX0udHAtbHN0diwudHAtY29sdHh0dl9te3Bvc2l0aW9uOnJlbGF0aXZlfS50cC1sc3R2X3N7cGFkZGluZzowIDIwcHggMCA0cHg7d2lkdGg6MTAwJX0udHAtbHN0dl9tLC50cC1jb2x0eHR2X21te2JvdHRvbTowO21hcmdpbjphdXRvO3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MnB4O3RvcDowfS50cC1sc3R2X20gc3ZnLC50cC1jb2x0eHR2X21tIHN2Z3tib3R0b206MDtoZWlnaHQ6MTZweDttYXJnaW46YXV0bztwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO3dpZHRoOjE2cHh9LnRwLWxzdHZfbSBzdmcgcGF0aCwudHAtY29sdHh0dl9tbSBzdmcgcGF0aHtmaWxsOmN1cnJlbnRDb2xvcn0udHAtc2dsdl9pLC50cC1tbGx2X2ksLnRwLWdybHZfZ3tiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLW1vLWJnKTtib3JkZXItcmFkaXVzOnZhcigtLWJsZC1icik7Ym94LXNpemluZzpib3JkZXItYm94O2NvbG9yOnZhcigtLW1vLWZnKTtoZWlnaHQ6dmFyKC0tY250LXVzeik7c2Nyb2xsYmFyLWNvbG9yOmN1cnJlbnRDb2xvciByZ2JhKDAsMCwwLDApO3Njcm9sbGJhci13aWR0aDp0aGluO3dpZHRoOjEwMCV9LnRwLXNnbHZfaTo6LXdlYmtpdC1zY3JvbGxiYXIsLnRwLW1sbHZfaTo6LXdlYmtpdC1zY3JvbGxiYXIsLnRwLWdybHZfZzo6LXdlYmtpdC1zY3JvbGxiYXJ7aGVpZ2h0OjhweDt3aWR0aDo4cHh9LnRwLXNnbHZfaTo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVyLC50cC1tbGx2X2k6Oi13ZWJraXQtc2Nyb2xsYmFyLWNvcm5lciwudHAtZ3Jsdl9nOjotd2Via2l0LXNjcm9sbGJhci1jb3JuZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLDApfS50cC1zZ2x2X2k6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLC50cC1tbGx2X2k6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iLC50cC1ncmx2X2c6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JhY2tncm91bmQtY2xpcDpwYWRkaW5nLWJveDtiYWNrZ3JvdW5kLWNvbG9yOmN1cnJlbnRDb2xvcjtib3JkZXI6cmdiYSgwLDAsMCwwKSBzb2xpZCAycHg7Ym9yZGVyLXJhZGl1czo0cHh9LnRwLXBuZHR4dHYsLnRwLWNvbHR4dHZfd3tkaXNwbGF5OmZsZXh9LnRwLXBuZHR4dHZfYSwudHAtY29sdHh0dl9je3dpZHRoOjEwMCV9LnRwLXBuZHR4dHZfYSsudHAtcG5kdHh0dl9hLC50cC1jb2x0eHR2X2MrLnRwLXBuZHR4dHZfYSwudHAtcG5kdHh0dl9hKy50cC1jb2x0eHR2X2MsLnRwLWNvbHR4dHZfYysudHAtY29sdHh0dl9je21hcmdpbi1sZWZ0OjJweH0udHAtcm90dnstLWJzLWJnOiB2YXIoLS10cC1iYXNlLWJhY2tncm91bmQtY29sb3IsIGhzbCgyMzAsIDclLCAxNyUpKTstLWJzLWJyOiB2YXIoLS10cC1iYXNlLWJvcmRlci1yYWRpdXMsIDZweCk7LS1icy1mZjogdmFyKC0tdHAtYmFzZS1mb250LWZhbWlseSwgUm9ib3RvIE1vbm8sIFNvdXJjZSBDb2RlIFBybywgTWVubG8sIENvdXJpZXIsIG1vbm9zcGFjZSk7LS1icy1zaDogdmFyKC0tdHAtYmFzZS1zaGFkb3ctY29sb3IsIHJnYmEoMCwgMCwgMCwgMC4yKSk7LS1ibGQtYnI6IHZhcigtLXRwLWJsYWRlLWJvcmRlci1yYWRpdXMsIDJweCk7LS1ibGQtaHA6IHZhcigtLXRwLWJsYWRlLWhvcml6b250YWwtcGFkZGluZywgNHB4KTstLWJsZC12dzogdmFyKC0tdHAtYmxhZGUtdmFsdWUtd2lkdGgsIDE2MHB4KTstLWJ0bi1iZzogdmFyKC0tdHAtYnV0dG9uLWJhY2tncm91bmQtY29sb3IsIGhzbCgyMzAsIDclLCA3MCUpKTstLWJ0bi1iZy1hOiB2YXIoLS10cC1idXR0b24tYmFja2dyb3VuZC1jb2xvci1hY3RpdmUsICNkNmQ3ZGIpOy0tYnRuLWJnLWY6IHZhcigtLXRwLWJ1dHRvbi1iYWNrZ3JvdW5kLWNvbG9yLWZvY3VzLCAjYzhjYWQwKTstLWJ0bi1iZy1oOiB2YXIoLS10cC1idXR0b24tYmFja2dyb3VuZC1jb2xvci1ob3ZlciwgI2JiYmNjNCk7LS1idG4tZmc6IHZhcigtLXRwLWJ1dHRvbi1mb3JlZ3JvdW5kLWNvbG9yLCBoc2woMjMwLCA3JSwgMTclKSk7LS1jbnQtYmc6IHZhcigtLXRwLWNvbnRhaW5lci1iYWNrZ3JvdW5kLWNvbG9yLCByZ2JhKDE4NywgMTg4LCAxOTYsIDAuMSkpOy0tY250LWJnLWE6IHZhcigtLXRwLWNvbnRhaW5lci1iYWNrZ3JvdW5kLWNvbG9yLWFjdGl2ZSwgcmdiYSgxODcsIDE4OCwgMTk2LCAwLjI1KSk7LS1jbnQtYmctZjogdmFyKC0tdHAtY29udGFpbmVyLWJhY2tncm91bmQtY29sb3ItZm9jdXMsIHJnYmEoMTg3LCAxODgsIDE5NiwgMC4yKSk7LS1jbnQtYmctaDogdmFyKC0tdHAtY29udGFpbmVyLWJhY2tncm91bmQtY29sb3ItaG92ZXIsIHJnYmEoMTg3LCAxODgsIDE5NiwgMC4xNSkpOy0tY250LWZnOiB2YXIoLS10cC1jb250YWluZXItZm9yZWdyb3VuZC1jb2xvciwgaHNsKDIzMCwgNyUsIDc1JSkpOy0tY250LWhwOiB2YXIoLS10cC1jb250YWluZXItaG9yaXpvbnRhbC1wYWRkaW5nLCA0cHgpOy0tY250LXZwOiB2YXIoLS10cC1jb250YWluZXItdmVydGljYWwtcGFkZGluZywgNHB4KTstLWNudC11c3A6IHZhcigtLXRwLWNvbnRhaW5lci11bml0LXNwYWNpbmcsIDRweCk7LS1jbnQtdXN6OiB2YXIoLS10cC1jb250YWluZXItdW5pdC1zaXplLCAyMHB4KTstLWluLWJnOiB2YXIoLS10cC1pbnB1dC1iYWNrZ3JvdW5kLWNvbG9yLCByZ2JhKDE4NywgMTg4LCAxOTYsIDAuMSkpOy0taW4tYmctYTogdmFyKC0tdHAtaW5wdXQtYmFja2dyb3VuZC1jb2xvci1hY3RpdmUsIHJnYmEoMTg3LCAxODgsIDE5NiwgMC4yNSkpOy0taW4tYmctZjogdmFyKC0tdHAtaW5wdXQtYmFja2dyb3VuZC1jb2xvci1mb2N1cywgcmdiYSgxODcsIDE4OCwgMTk2LCAwLjIpKTstLWluLWJnLWg6IHZhcigtLXRwLWlucHV0LWJhY2tncm91bmQtY29sb3ItaG92ZXIsIHJnYmEoMTg3LCAxODgsIDE5NiwgMC4xNSkpOy0taW4tZmc6IHZhcigtLXRwLWlucHV0LWZvcmVncm91bmQtY29sb3IsIGhzbCgyMzAsIDclLCA3NSUpKTstLWxibC1mZzogdmFyKC0tdHAtbGFiZWwtZm9yZWdyb3VuZC1jb2xvciwgcmdiYSgxODcsIDE4OCwgMTk2LCAwLjcpKTstLW1vLWJnOiB2YXIoLS10cC1tb25pdG9yLWJhY2tncm91bmQtY29sb3IsIHJnYmEoMCwgMCwgMCwgMC4yKSk7LS1tby1mZzogdmFyKC0tdHAtbW9uaXRvci1mb3JlZ3JvdW5kLWNvbG9yLCByZ2JhKDE4NywgMTg4LCAxOTYsIDAuNykpOy0tZ3J2LWZnOiB2YXIoLS10cC1ncm9vdmUtZm9yZWdyb3VuZC1jb2xvciwgcmdiYSgxODcsIDE4OCwgMTk2LCAwLjEpKX0udHAtYnRudl9ie3dpZHRoOjEwMCV9LnRwLWJ0bnZfdHt0ZXh0LWFsaWduOmNlbnRlcn0udHAtY2tidl9se2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246cmVsYXRpdmV9LnRwLWNrYnZfaXtsZWZ0OjA7b3BhY2l0eTowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowfS50cC1ja2J2X3d7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1iZyk7Ym9yZGVyLXJhZGl1czp2YXIoLS1ibGQtYnIpO2N1cnNvcjpwb2ludGVyO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OnZhcigtLWNudC11c3opO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOnZhcigtLWNudC11c3opfS50cC1ja2J2X3cgc3Zne2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjE2cHg7aW5zZXQ6MDttYXJnaW46YXV0bztvcGFjaXR5OjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTZweH0udHAtY2tidl93IHN2ZyBwYXRoe2ZpbGw6bm9uZTtzdHJva2U6dmFyKC0taW4tZmcpO3N0cm9rZS13aWR0aDoyfS50cC1ja2J2X2k6aG92ZXIrLnRwLWNrYnZfd3tiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWJnLWgpfS50cC1ja2J2X2k6Zm9jdXMrLnRwLWNrYnZfd3tiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWJnLWYpfS50cC1ja2J2X2k6YWN0aXZlKy50cC1ja2J2X3d7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1iZy1hKX0udHAtY2tidl9pOmNoZWNrZWQrLnRwLWNrYnZfdyBzdmd7b3BhY2l0eToxfS50cC1ja2J2LnRwLXYtZGlzYWJsZWQgLnRwLWNrYnZfd3tvcGFjaXR5Oi41fS50cC1jb2x2e3Bvc2l0aW9uOnJlbGF0aXZlfS50cC1jb2x2X2h7ZGlzcGxheTpmbGV4fS50cC1jb2x2X3N7ZmxleC1ncm93OjA7ZmxleC1zaHJpbms6MDt3aWR0aDp2YXIoLS1jbnQtdXN6KX0udHAtY29sdl90e2ZsZXg6MTttYXJnaW4tbGVmdDo0cHh9LnRwLWNvbHZfcHtoZWlnaHQ6MDttYXJnaW4tdG9wOjA7b3BhY2l0eTowO292ZXJmbG93OmhpZGRlbjt0cmFuc2l0aW9uOmhlaWdodCAuMnMgZWFzZS1pbi1vdXQsb3BhY2l0eSAuMnMgbGluZWFyLG1hcmdpbiAuMnMgZWFzZS1pbi1vdXR9LnRwLWNvbHYudHAtY29sdi1leHBhbmRlZC50cC1jb2x2LWNwbCAudHAtY29sdl9we292ZXJmbG93OnZpc2libGV9LnRwLWNvbHYudHAtY29sdi1leHBhbmRlZCAudHAtY29sdl9we21hcmdpbi10b3A6dmFyKC0tY250LXVzcCk7b3BhY2l0eToxfS50cC1jb2x2IC50cC1wb3B2e2xlZnQ6Y2FsYygtMSp2YXIoLS1jbnQtaHApKTtyaWdodDpjYWxjKC0xKnZhcigtLWNudC1ocCkpO3RvcDp2YXIoLS1jbnQtdXN6KX0udHAtY29scHZfaCwudHAtY29scHZfYXB7bWFyZ2luLWxlZnQ6NnB4O21hcmdpbi1yaWdodDo2cHh9LnRwLWNvbHB2X2h7bWFyZ2luLXRvcDp2YXIoLS1jbnQtdXNwKX0udHAtY29scHZfcmdie2Rpc3BsYXk6ZmxleDttYXJnaW4tdG9wOnZhcigtLWNudC11c3ApO3dpZHRoOjEwMCV9LnRwLWNvbHB2X2F7ZGlzcGxheTpmbGV4O21hcmdpbi10b3A6dmFyKC0tY250LXZwKTtwYWRkaW5nLXRvcDpjYWxjKHZhcigtLWNudC12cCkgKyAycHgpO3Bvc2l0aW9uOnJlbGF0aXZlfS50cC1jb2xwdl9hOjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1ncnYtZmcpO2NvbnRlbnQ6XCJcIjtoZWlnaHQ6MnB4O2xlZnQ6Y2FsYygtMSp2YXIoLS1jbnQtaHApKTtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDpjYWxjKC0xKnZhcigtLWNudC1ocCkpO3RvcDowfS50cC1jb2xwdi50cC12LWRpc2FibGVkIC50cC1jb2xwdl9hOjpiZWZvcmV7b3BhY2l0eTouNX0udHAtY29scHZfYXB7YWxpZ24taXRlbXM6Y2VudGVyO2Rpc3BsYXk6ZmxleDtmbGV4OjN9LnRwLWNvbHB2X2F0e2ZsZXg6MTttYXJnaW4tbGVmdDo0cHh9LnRwLXN2cHZ7Ym9yZGVyLXJhZGl1czp2YXIoLS1ibGQtYnIpO291dGxpbmU6bm9uZTtvdmVyZmxvdzpoaWRkZW47cG9zaXRpb246cmVsYXRpdmV9LnRwLXN2cHYudHAtdi1kaXNhYmxlZHtvcGFjaXR5Oi41fS50cC1zdnB2X2N7Y3Vyc29yOmNyb3NzaGFpcjtkaXNwbGF5OmJsb2NrO2hlaWdodDpjYWxjKHZhcigtLWNudC11c3opKjQpO3dpZHRoOjEwMCV9LnRwLXN2cHZfbXtib3JkZXItcmFkaXVzOjEwMCU7Ym9yZGVyOnJnYmEoMjU1LDI1NSwyNTUsLjc1KSBzb2xpZCAycHg7Ym94LXNpemluZzpib3JkZXItYm94O2ZpbHRlcjpkcm9wLXNoYWRvdygwIDAgMXB4IHJnYmEoMCwgMCwgMCwgMC4zKSk7aGVpZ2h0OjEycHg7bWFyZ2luLWxlZnQ6LTZweDttYXJnaW4tdG9wOi02cHg7cG9pbnRlci1ldmVudHM6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMnB4fS50cC1zdnB2OmZvY3VzIC50cC1zdnB2X217Ym9yZGVyLWNvbG9yOiNmZmZ9LnRwLWhwbHZ7Y3Vyc29yOnBvaW50ZXI7aGVpZ2h0OnZhcigtLWNudC11c3opO291dGxpbmU6bm9uZTtwb3NpdGlvbjpyZWxhdGl2ZX0udHAtaHBsdi50cC12LWRpc2FibGVke29wYWNpdHk6LjV9LnRwLWhwbHZfY3tiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVBQUFBQUJDQVlBQUFCdWJhZ1hBQUFBUTBsRVFWUW9VMlA4ejhEd24wR0NnUUVEaTJPSy9SQmdZSGpCZ0lwZm92Rmg4ajhZQklnekZHUXh1cUVnUGhhRE9UNWdPaFBrZEN4T1plQmcrSURGWlppR0FnQ2FTU01ZdGNSSExnQUFBQUJKUlU1RXJrSmdnZz09KTtiYWNrZ3JvdW5kLXBvc2l0aW9uOmxlZnQgdG9wO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6MTAwJSAxMDAlO2JvcmRlci1yYWRpdXM6MnB4O2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjRweDtsZWZ0OjA7bWFyZ2luLXRvcDotMnB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7d2lkdGg6MTAwJX0udHAtaHBsdl9te2JvcmRlci1yYWRpdXM6dmFyKC0tYmxkLWJyKTtib3JkZXI6cmdiYSgyNTUsMjU1LDI1NSwuNzUpIHNvbGlkIDJweDtib3gtc2hhZG93OjAgMCAycHggcmdiYSgwLDAsMCwuMSk7Ym94LXNpemluZzpib3JkZXItYm94O2hlaWdodDoxMnB4O2xlZnQ6NTAlO21hcmdpbi1sZWZ0Oi02cHg7bWFyZ2luLXRvcDotNnB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7d2lkdGg6MTJweH0udHAtaHBsdjpmb2N1cyAudHAtaHBsdl9te2JvcmRlci1jb2xvcjojZmZmfS50cC1hcGx2e2N1cnNvcjpwb2ludGVyO2hlaWdodDp2YXIoLS1jbnQtdXN6KTtvdXRsaW5lOm5vbmU7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJX0udHAtYXBsdi50cC12LWRpc2FibGVke29wYWNpdHk6LjV9LnRwLWFwbHZfYntiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQodG8gdG9wIHJpZ2h0LCAjZGRkIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNkZGQgNzUlKSxsaW5lYXItZ3JhZGllbnQodG8gdG9wIHJpZ2h0LCAjZGRkIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA3NSUsICNkZGQgNzUlKTtiYWNrZ3JvdW5kLXNpemU6NHB4IDRweDtiYWNrZ3JvdW5kLXBvc2l0aW9uOjAgMCwycHggMnB4O2JvcmRlci1yYWRpdXM6MnB4O2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjRweDtsZWZ0OjA7bWFyZ2luLXRvcDotMnB4O292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO3dpZHRoOjEwMCV9LnRwLWFwbHZfY3tpbnNldDowO3Bvc2l0aW9uOmFic29sdXRlfS50cC1hcGx2X217YmFja2dyb3VuZC1jb2xvcjojZmZmO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIHRvcCByaWdodCwgI2RkZCAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZGRkIDc1JSksbGluZWFyLWdyYWRpZW50KHRvIHRvcCByaWdodCwgI2RkZCAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZGRkIDc1JSk7YmFja2dyb3VuZC1zaXplOjEycHggMTJweDtiYWNrZ3JvdW5kLXBvc2l0aW9uOjAgMCw2cHggNnB4O2JvcmRlci1yYWRpdXM6dmFyKC0tYmxkLWJyKTtib3gtc2hhZG93OjAgMCAycHggcmdiYSgwLDAsMCwuMSk7aGVpZ2h0OjEycHg7bGVmdDo1MCU7bWFyZ2luLWxlZnQ6LTZweDttYXJnaW4tdG9wOi02cHg7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7d2lkdGg6MTJweH0udHAtYXBsdl9we2JvcmRlci1yYWRpdXM6dmFyKC0tYmxkLWJyKTtib3JkZXI6cmdiYSgyNTUsMjU1LDI1NSwuNzUpIHNvbGlkIDJweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7aW5zZXQ6MDtwb3NpdGlvbjphYnNvbHV0ZX0udHAtYXBsdjpmb2N1cyAudHAtYXBsdl9we2JvcmRlci1jb2xvcjojZmZmfS50cC1jb2xzd3Z7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvIHRvcCByaWdodCwgI2RkZCAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZGRkIDc1JSksbGluZWFyLWdyYWRpZW50KHRvIHRvcCByaWdodCwgI2RkZCAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNzUlLCAjZGRkIDc1JSk7YmFja2dyb3VuZC1zaXplOjEwcHggMTBweDtiYWNrZ3JvdW5kLXBvc2l0aW9uOjAgMCw1cHggNXB4O2JvcmRlci1yYWRpdXM6dmFyKC0tYmxkLWJyKTtvdmVyZmxvdzpoaWRkZW59LnRwLWNvbHN3di50cC12LWRpc2FibGVke29wYWNpdHk6LjV9LnRwLWNvbHN3dl9zd3tib3JkZXItcmFkaXVzOjB9LnRwLWNvbHN3dl9ie2N1cnNvcjpwb2ludGVyO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OnZhcigtLWNudC11c3opO2xlZnQ6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt3aWR0aDp2YXIoLS1jbnQtdXN6KX0udHAtY29sc3d2X2I6Zm9jdXM6OmFmdGVye2JvcmRlcjpyZ2JhKDI1NSwyNTUsMjU1LC43NSkgc29saWQgMnB4O2JvcmRlci1yYWRpdXM6dmFyKC0tYmxkLWJyKTtjb250ZW50OlwiXCI7ZGlzcGxheTpibG9jaztpbnNldDowO3Bvc2l0aW9uOmFic29sdXRlfS50cC1jb2x0eHR2e2Rpc3BsYXk6ZmxleDt3aWR0aDoxMDAlfS50cC1jb2x0eHR2X217bWFyZ2luLXJpZ2h0OjRweH0udHAtY29sdHh0dl9tc3tib3JkZXItcmFkaXVzOnZhcigtLWJsZC1icik7Y29sb3I6dmFyKC0tbGJsLWZnKTtjdXJzb3I6cG9pbnRlcjtoZWlnaHQ6dmFyKC0tY250LXVzeik7bGluZS1oZWlnaHQ6dmFyKC0tY250LXVzeik7cGFkZGluZzowIDE4cHggMCA0cHh9LnRwLWNvbHR4dHZfbXM6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1iZy1oKX0udHAtY29sdHh0dl9tczpmb2N1c3tiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWJnLWYpfS50cC1jb2x0eHR2X21zOmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWJnLWEpfS50cC1jb2x0eHR2X21te2NvbG9yOnZhcigtLWxibC1mZyl9LnRwLWNvbHR4dHYudHAtdi1kaXNhYmxlZCAudHAtY29sdHh0dl9tbXtvcGFjaXR5Oi41fS50cC1jb2x0eHR2X3d7ZmxleDoxfS50cC1kZnd2e3Bvc2l0aW9uOmFic29sdXRlO3RvcDo4cHg7cmlnaHQ6OHB4O3dpZHRoOjI1NnB4fS50cC1mbGR2e3Bvc2l0aW9uOnJlbGF0aXZlfS50cC1mbGR2X3R7cGFkZGluZy1sZWZ0OjRweH0udHAtZmxkdl9iOmRpc2FibGVkIC50cC1mbGR2X217ZGlzcGxheTpub25lfS50cC1mbGR2X2N7cGFkZGluZy1sZWZ0OjRweH0udHAtZmxkdl9pe2JvdHRvbTowO2NvbG9yOnZhcigtLWNudC1iZyk7bGVmdDowO292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6Y2FsYyh2YXIoLS1jbnQtdXN6KSArIDRweCk7d2lkdGg6bWF4KHZhcigtLWJzLWJyKSw0cHgpfS50cC1mbGR2X2k6OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOmN1cnJlbnRDb2xvcjtib3R0b206MDtjb250ZW50OlwiXCI7bGVmdDowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3dpZHRoOjRweH0udHAtZmxkdl9iOmhvdmVyKy50cC1mbGR2X2l7Y29sb3I6dmFyKC0tY250LWJnLWgpfS50cC1mbGR2X2I6Zm9jdXMrLnRwLWZsZHZfaXtjb2xvcjp2YXIoLS1jbnQtYmctZil9LnRwLWZsZHZfYjphY3RpdmUrLnRwLWZsZHZfaXtjb2xvcjp2YXIoLS1jbnQtYmctYSl9LnRwLWZsZHYudHAtdi1kaXNhYmxlZD4udHAtZmxkdl9pe29wYWNpdHk6LjV9LnRwLWdybHZ7cG9zaXRpb246cmVsYXRpdmV9LnRwLWdybHZfZ3tkaXNwbGF5OmJsb2NrO2hlaWdodDpjYWxjKHZhcigtLWNudC11c3opKjMpfS50cC1ncmx2X2cgcG9seWxpbmV7ZmlsbDpub25lO3N0cm9rZTp2YXIoLS1tby1mZyk7c3Ryb2tlLWxpbmVqb2luOnJvdW5kfS50cC1ncmx2X3R7bWFyZ2luLXRvcDotNHB4O3RyYW5zaXRpb246bGVmdCAuMDVzLHRvcCAuMDVzO3Zpc2liaWxpdHk6aGlkZGVufS50cC1ncmx2X3QudHAtZ3Jsdl90LWF7dmlzaWJpbGl0eTp2aXNpYmxlfS50cC1ncmx2X3QudHAtZ3Jsdl90LWlue3RyYW5zaXRpb246bm9uZX0udHAtZ3Jsdi50cC12LWRpc2FibGVkIC50cC1ncmx2X2d7b3BhY2l0eTouNX0udHAtZ3JsdiAudHAtdHR2e2JhY2tncm91bmQtY29sb3I6dmFyKC0tbW8tZmcpfS50cC1ncmx2IC50cC10dHY6OmJlZm9yZXtib3JkZXItdG9wLWNvbG9yOnZhcigtLW1vLWZnKX0udHAtbGJsdnthbGlnbi1pdGVtczpjZW50ZXI7ZGlzcGxheTpmbGV4O2xpbmUtaGVpZ2h0OjEuMztwYWRkaW5nLWxlZnQ6dmFyKC0tY250LWhwKTtwYWRkaW5nLXJpZ2h0OnZhcigtLWNudC1ocCl9LnRwLWxibHYudHAtbGJsdi1ub2x7ZGlzcGxheTpibG9ja30udHAtbGJsdl9se2NvbG9yOnZhcigtLWxibC1mZyk7ZmxleDoxOy13ZWJraXQtaHlwaGVuczphdXRvO2h5cGhlbnM6YXV0bztvdmVyZmxvdzpoaWRkZW47cGFkZGluZy1sZWZ0OjRweDtwYWRkaW5nLXJpZ2h0OjE2cHh9LnRwLWxibHYudHAtdi1kaXNhYmxlZCAudHAtbGJsdl9se29wYWNpdHk6LjV9LnRwLWxibHYudHAtbGJsdi1ub2wgLnRwLWxibHZfbHtkaXNwbGF5Om5vbmV9LnRwLWxibHZfdnthbGlnbi1zZWxmOmZsZXgtc3RhcnQ7ZmxleC1ncm93OjA7ZmxleC1zaHJpbms6MDt3aWR0aDp2YXIoLS1ibGQtdncpfS50cC1sYmx2LnRwLWxibHYtbm9sIC50cC1sYmx2X3Z7d2lkdGg6MTAwJX0udHAtbHN0dl9ze3BhZGRpbmc6MCAyMHB4IDAgdmFyKC0tYmxkLWhwKTt3aWR0aDoxMDAlfS50cC1sc3R2X217Y29sb3I6dmFyKC0tYnRuLWZnKX0udHAtc2dsdl9pe3BhZGRpbmctbGVmdDp2YXIoLS1ibGQtaHApO3BhZGRpbmctcmlnaHQ6dmFyKC0tYmxkLWhwKX0udHAtc2dsdi50cC12LWRpc2FibGVkIC50cC1zZ2x2X2l7b3BhY2l0eTouNX0udHAtbWxsdl9pe2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OmNhbGModmFyKC0tY250LXVzeikqMyk7bGluZS1oZWlnaHQ6dmFyKC0tY250LXVzeik7cGFkZGluZy1sZWZ0OnZhcigtLWJsZC1ocCk7cGFkZGluZy1yaWdodDp2YXIoLS1ibGQtaHApO3Jlc2l6ZTpub25lO3doaXRlLXNwYWNlOnByZX0udHAtbWxsdi50cC12LWRpc2FibGVkIC50cC1tbGx2X2l7b3BhY2l0eTouNX0udHAtcDJkdntwb3NpdGlvbjpyZWxhdGl2ZX0udHAtcDJkdl9oe2Rpc3BsYXk6ZmxleH0udHAtcDJkdl9ie2hlaWdodDp2YXIoLS1jbnQtdXN6KTttYXJnaW4tcmlnaHQ6NHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOnZhcigtLWNudC11c3opfS50cC1wMmR2X2Igc3Zne2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjE2cHg7bGVmdDo1MCU7bWFyZ2luLWxlZnQ6LThweDttYXJnaW4tdG9wOi04cHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTt3aWR0aDoxNnB4fS50cC1wMmR2X2Igc3ZnIHBhdGh7c3Ryb2tlOmN1cnJlbnRDb2xvcjtzdHJva2Utd2lkdGg6Mn0udHAtcDJkdl9iIHN2ZyBjaXJjbGV7ZmlsbDpjdXJyZW50Q29sb3J9LnRwLXAyZHZfdHtmbGV4OjF9LnRwLXAyZHZfcHtoZWlnaHQ6MDttYXJnaW4tdG9wOjA7b3BhY2l0eTowO292ZXJmbG93OmhpZGRlbjt0cmFuc2l0aW9uOmhlaWdodCAuMnMgZWFzZS1pbi1vdXQsb3BhY2l0eSAuMnMgbGluZWFyLG1hcmdpbiAuMnMgZWFzZS1pbi1vdXR9LnRwLXAyZHYudHAtcDJkdi1leHBhbmRlZCAudHAtcDJkdl9we21hcmdpbi10b3A6dmFyKC0tY250LXVzcCk7b3BhY2l0eToxfS50cC1wMmR2IC50cC1wb3B2e2xlZnQ6Y2FsYygtMSp2YXIoLS1jbnQtaHApKTtyaWdodDpjYWxjKC0xKnZhcigtLWNudC1ocCkpO3RvcDp2YXIoLS1jbnQtdXN6KX0udHAtcDJkcHZ7cGFkZGluZy1sZWZ0OmNhbGModmFyKC0tY250LXVzeikgKyA0cHgpfS50cC1wMmRwdl9we2N1cnNvcjpjcm9zc2hhaXI7aGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmctYm90dG9tOjEwMCU7cG9zaXRpb246cmVsYXRpdmV9LnRwLXAyZHB2LnRwLXYtZGlzYWJsZWQgLnRwLXAyZHB2X3B7b3BhY2l0eTouNX0udHAtcDJkcHZfZ3tkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO2xlZnQ6MDtwb2ludGVyLWV2ZW50czpub25lO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3dpZHRoOjEwMCV9LnRwLXAyZHB2X2F4e29wYWNpdHk6LjE7c3Ryb2tlOnZhcigtLWluLWZnKTtzdHJva2UtZGFzaGFycmF5OjF9LnRwLXAyZHB2X2x7b3BhY2l0eTouNTtzdHJva2U6dmFyKC0taW4tZmcpO3N0cm9rZS1kYXNoYXJyYXk6MX0udHAtcDJkcHZfbXtib3JkZXI6dmFyKC0taW4tZmcpIHNvbGlkIDFweDtib3JkZXItcmFkaXVzOjUwJTtib3gtc2l6aW5nOmJvcmRlci1ib3g7aGVpZ2h0OjRweDttYXJnaW4tbGVmdDotMnB4O21hcmdpbi10b3A6LTJweDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDo0cHh9LnRwLXAyZHB2X3A6Zm9jdXMgLnRwLXAyZHB2X217YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1mZyk7Ym9yZGVyLXdpZHRoOjB9LnRwLXBvcHZ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1icy1iZyk7Ym9yZGVyLXJhZGl1czp2YXIoLS1icy1icik7Ym94LXNoYWRvdzowIDJweCA0cHggdmFyKC0tYnMtc2gpO2Rpc3BsYXk6bm9uZTttYXgtd2lkdGg6dmFyKC0tYmxkLXZ3KTtwYWRkaW5nOnZhcigtLWNudC12cCkgdmFyKC0tY250LWhwKTtwb3NpdGlvbjphYnNvbHV0ZTt2aXNpYmlsaXR5OmhpZGRlbjt6LWluZGV4OjEwMDB9LnRwLXBvcHYudHAtcG9wdi12e2Rpc3BsYXk6YmxvY2s7dmlzaWJpbGl0eTp2aXNpYmxlfS50cC1zbGR2LnRwLXYtZGlzYWJsZWR7b3BhY2l0eTouNX0udHAtc2xkdl90e2JveC1zaXppbmc6Ym9yZGVyLWJveDtjdXJzb3I6cG9pbnRlcjtoZWlnaHQ6dmFyKC0tY250LXVzeik7bWFyZ2luOjAgNnB4O291dGxpbmU6bm9uZTtwb3NpdGlvbjpyZWxhdGl2ZX0udHAtc2xkdl90OjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1pbi1iZyk7Ym9yZGVyLXJhZGl1czoxcHg7Y29udGVudDpcIlwiO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjJweDtpbnNldDowO21hcmdpbjphdXRvO3Bvc2l0aW9uOmFic29sdXRlfS50cC1zbGR2X2t7aGVpZ2h0OjEwMCU7bGVmdDowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowfS50cC1zbGR2X2s6OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWZnKTtib3JkZXItcmFkaXVzOjFweDtjb250ZW50OlwiXCI7ZGlzcGxheTpibG9jaztoZWlnaHQ6MnB4O2luc2V0OjA7bWFyZ2luLWJvdHRvbTphdXRvO21hcmdpbi10b3A6YXV0bztwb3NpdGlvbjphYnNvbHV0ZX0udHAtc2xkdl9rOjphZnRlcntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJ0bi1iZyk7Ym9yZGVyLXJhZGl1czp2YXIoLS1ibGQtYnIpO2JvdHRvbTowO2NvbnRlbnQ6XCJcIjtkaXNwbGF5OmJsb2NrO2hlaWdodDoxMnB4O21hcmdpbi1ib3R0b206YXV0bzttYXJnaW4tdG9wOmF1dG87cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6LTZweDt0b3A6MDt3aWR0aDoxMnB4fS50cC1zbGR2X3Q6aG92ZXIgLnRwLXNsZHZfazo6YWZ0ZXJ7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1idG4tYmctaCl9LnRwLXNsZHZfdDpmb2N1cyAudHAtc2xkdl9rOjphZnRlcntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJ0bi1iZy1mKX0udHAtc2xkdl90OmFjdGl2ZSAudHAtc2xkdl9rOjphZnRlcntiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWJ0bi1iZy1hKX0udHAtc2xkdHh0dntkaXNwbGF5OmZsZXh9LnRwLXNsZHR4dHZfc3tmbGV4OjJ9LnRwLXNsZHR4dHZfdHtmbGV4OjE7bWFyZ2luLWxlZnQ6NHB4fS50cC10YWJ2e3Bvc2l0aW9uOnJlbGF0aXZlfS50cC10YWJ2X3R7YWxpZ24taXRlbXM6ZmxleC1lbmQ7Y29sb3I6dmFyKC0tY250LWJnKTtkaXNwbGF5OmZsZXg7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOnJlbGF0aXZlfS50cC10YWJ2X3Q6aG92ZXJ7Y29sb3I6dmFyKC0tY250LWJnLWgpfS50cC10YWJ2X3Q6aGFzKCo6Zm9jdXMpe2NvbG9yOnZhcigtLWNudC1iZy1mKX0udHAtdGFidl90OmhhcygqOmFjdGl2ZSl7Y29sb3I6dmFyKC0tY250LWJnLWEpfS50cC10YWJ2X3Q6OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOmN1cnJlbnRDb2xvcjtib3R0b206MDtjb250ZW50OlwiXCI7aGVpZ2h0OjJweDtsZWZ0OjA7cG9pbnRlci1ldmVudHM6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowfS50cC10YWJ2LnRwLXYtZGlzYWJsZWQgLnRwLXRhYnZfdDo6YmVmb3Jle29wYWNpdHk6LjV9LnRwLXRhYnYudHAtdGFidi1ub3AgLnRwLXRhYnZfdHtoZWlnaHQ6Y2FsYyh2YXIoLS1jbnQtdXN6KSArIDRweCk7cG9zaXRpb246cmVsYXRpdmV9LnRwLXRhYnYudHAtdGFidi1ub3AgLnRwLXRhYnZfdDo6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6dmFyKC0tY250LWJnKTtib3R0b206MDtjb250ZW50OlwiXCI7aGVpZ2h0OjJweDtsZWZ0OjA7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MH0udHAtdGFidl9pe2JvdHRvbTowO2NvbG9yOnZhcigtLWNudC1iZyk7bGVmdDowO292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6Y2FsYyh2YXIoLS1jbnQtdXN6KSArIDRweCk7d2lkdGg6bWF4KHZhcigtLWJzLWJyKSw0cHgpfS50cC10YWJ2X2k6OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOmN1cnJlbnRDb2xvcjtib3R0b206MDtjb250ZW50OlwiXCI7bGVmdDowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3dpZHRoOjRweH0udHAtdGFidl90OmhvdmVyKy50cC10YWJ2X2l7Y29sb3I6dmFyKC0tY250LWJnLWgpfS50cC10YWJ2X3Q6aGFzKCo6Zm9jdXMpKy50cC10YWJ2X2l7Y29sb3I6dmFyKC0tY250LWJnLWYpfS50cC10YWJ2X3Q6aGFzKCo6YWN0aXZlKSsudHAtdGFidl9pe2NvbG9yOnZhcigtLWNudC1iZy1hKX0udHAtdGFidi50cC12LWRpc2FibGVkPi50cC10YWJ2X2l7b3BhY2l0eTouNX0udHAtdGJpdntmbGV4OjE7bWluLXdpZHRoOjA7cG9zaXRpb246cmVsYXRpdmV9LnRwLXRiaXYrLnRwLXRiaXZ7bWFyZ2luLWxlZnQ6MnB4fS50cC10Yml2Ky50cC10Yml2LnRwLXYtZGlzYWJsZWQ6OmJlZm9yZXtvcGFjaXR5Oi41fS50cC10Yml2X2J7ZGlzcGxheTpibG9jaztwYWRkaW5nLWxlZnQ6Y2FsYyh2YXIoLS1jbnQtaHApICsgNHB4KTtwYWRkaW5nLXJpZ2h0OmNhbGModmFyKC0tY250LWhwKSArIDRweCk7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJX0udHAtdGJpdl9iOmRpc2FibGVke29wYWNpdHk6LjV9LnRwLXRiaXZfYjo6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6dmFyKC0tY250LWJnKTtjb250ZW50OlwiXCI7aW5zZXQ6MCAwIDJweDtwb2ludGVyLWV2ZW50czpub25lO3Bvc2l0aW9uOmFic29sdXRlfS50cC10Yml2X2I6aG92ZXI6OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWNudC1iZy1oKX0udHAtdGJpdl9iOmZvY3VzOjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1jbnQtYmctZil9LnRwLXRiaXZfYjphY3RpdmU6OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWNudC1iZy1hKX0udHAtdGJpdl90e2NvbG9yOnZhcigtLWNudC1mZyk7aGVpZ2h0OmNhbGModmFyKC0tY250LXVzeikgKyA0cHgpO2xpbmUtaGVpZ2h0OmNhbGModmFyKC0tY250LXVzeikgKyA0cHgpO29wYWNpdHk6LjU7b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOnJlbGF0aXZlO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LnRwLXRiaXYudHAtdGJpdi1zZWwgLnRwLXRiaXZfdHtvcGFjaXR5OjF9LnRwLXRicHZfY3twYWRkaW5nLWJvdHRvbTp2YXIoLS1jbnQtdnApO3BhZGRpbmctbGVmdDo0cHg7cGFkZGluZy10b3A6dmFyKC0tY250LXZwKX0udHAtdHh0dntwb3NpdGlvbjpyZWxhdGl2ZX0udHAtdHh0dl9pe3BhZGRpbmctbGVmdDp2YXIoLS1ibGQtaHApO3BhZGRpbmctcmlnaHQ6dmFyKC0tYmxkLWhwKX0udHAtdHh0di50cC10eHR2LWZzdCAudHAtdHh0dl9pe2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjA7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6MH0udHAtdHh0di50cC10eHR2LW1pZCAudHAtdHh0dl9pe2JvcmRlci1yYWRpdXM6MH0udHAtdHh0di50cC10eHR2LWxzdCAudHAtdHh0dl9pe2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6MDtib3JkZXItdG9wLWxlZnQtcmFkaXVzOjB9LnRwLXR4dHYudHAtdHh0di1udW0gLnRwLXR4dHZfaXt0ZXh0LWFsaWduOnJpZ2h0fS50cC10eHR2LnRwLXR4dHYtZHJnIC50cC10eHR2X2l7b3BhY2l0eTouM30udHAtdHh0dl9re2N1cnNvcjpwb2ludGVyO2hlaWdodDoxMDAlO2xlZnQ6Y2FsYyh2YXIoLS1ibGQtaHApIC0gNXB4KTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt3aWR0aDoxMnB4fS50cC10eHR2X2s6OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOnZhcigtLWluLWZnKTtib3JkZXItcmFkaXVzOjFweDtib3R0b206MDtjb250ZW50OlwiXCI7aGVpZ2h0OmNhbGModmFyKC0tY250LXVzeikgLSA0cHgpO2xlZnQ6NTAlO21hcmdpbi1ib3R0b206YXV0bzttYXJnaW4tbGVmdDotMXB4O21hcmdpbi10b3A6YXV0bztvcGFjaXR5Oi4xO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3RyYW5zaXRpb246Ym9yZGVyLXJhZGl1cyAuMXMsaGVpZ2h0IC4xcyx0cmFuc2Zvcm0gLjFzLHdpZHRoIC4xczt3aWR0aDoycHh9LnRwLXR4dHZfazpob3Zlcjo6YmVmb3JlLC50cC10eHR2LnRwLXR4dHYtZHJnIC50cC10eHR2X2s6OmJlZm9yZXtvcGFjaXR5OjF9LnRwLXR4dHYudHAtdHh0di1kcmcgLnRwLXR4dHZfazo6YmVmb3Jle2JvcmRlci1yYWRpdXM6NTAlO2hlaWdodDo0cHg7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTFweCk7d2lkdGg6NHB4fS50cC10eHR2X2d7Ym90dG9tOjA7ZGlzcGxheTpibG9jaztoZWlnaHQ6OHB4O2xlZnQ6NTAlO21hcmdpbjphdXRvO292ZXJmbG93OnZpc2libGU7cG9pbnRlci1ldmVudHM6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt2aXNpYmlsaXR5OmhpZGRlbjt3aWR0aDoxMDAlfS50cC10eHR2LnRwLXR4dHYtZHJnIC50cC10eHR2X2d7dmlzaWJpbGl0eTp2aXNpYmxlfS50cC10eHR2X2die2ZpbGw6bm9uZTtzdHJva2U6dmFyKC0taW4tZmcpO3N0cm9rZS1kYXNoYXJyYXk6MX0udHAtdHh0dl9naHtmaWxsOm5vbmU7c3Ryb2tlOnZhcigtLWluLWZnKX0udHAtdHh0diAudHAtdHR2e21hcmdpbi1sZWZ0OjZweDt2aXNpYmlsaXR5OmhpZGRlbn0udHAtdHh0di50cC10eHR2LWRyZyAudHAtdHR2e3Zpc2liaWxpdHk6dmlzaWJsZX0udHAtdHR2e2JhY2tncm91bmQtY29sb3I6dmFyKC0taW4tZmcpO2JvcmRlci1yYWRpdXM6dmFyKC0tYmxkLWJyKTtjb2xvcjp2YXIoLS1icy1iZyk7cGFkZGluZzoycHggNHB4O3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLCAtMTAwJSl9LnRwLXR0djo6YmVmb3Jle2JvcmRlci1jb2xvcjp2YXIoLS1pbi1mZykgcmdiYSgwLDAsMCwwKSByZ2JhKDAsMCwwLDApIHJnYmEoMCwwLDAsMCk7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDoycHg7Ym94LXNpemluZzpib3JkZXItYm94O2NvbnRlbnQ6XCJcIjtmb250LXNpemU6LjllbTtoZWlnaHQ6NHB4O2xlZnQ6NTAlO21hcmdpbi1sZWZ0Oi0ycHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjEwMCU7d2lkdGg6NHB4fS50cC1yb3R2e2JhY2tncm91bmQtY29sb3I6dmFyKC0tYnMtYmcpO2JvcmRlci1yYWRpdXM6dmFyKC0tYnMtYnIpO2JveC1zaGFkb3c6MCAycHggNHB4IHZhcigtLWJzLXNoKTtmb250LWZhbWlseTp2YXIoLS1icy1mZik7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NTAwO2xpbmUtaGVpZ2h0OjE7dGV4dC1hbGlnbjpsZWZ0fS50cC1yb3R2X2J7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czp2YXIoLS1icy1icik7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6dmFyKC0tYnMtYnIpO2JvcmRlci10b3AtbGVmdC1yYWRpdXM6dmFyKC0tYnMtYnIpO2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOnZhcigtLWJzLWJyKTtwYWRkaW5nLWxlZnQ6Y2FsYyg0cHggKyB2YXIoLS1jbnQtdXN6KSArIHZhcigtLWNudC1ocCkpO3RleHQtYWxpZ246Y2VudGVyfS50cC1yb3R2LnRwLXJvdHYtZXhwYW5kZWQgLnRwLXJvdHZfYntib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjA7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6MDt0cmFuc2l0aW9uLWRlbGF5OjBzO3RyYW5zaXRpb24tZHVyYXRpb246MHN9LnRwLXJvdHYudHAtcm90di1ub3Q+LnRwLXJvdHZfYntkaXNwbGF5Om5vbmV9LnRwLXJvdHZfYjpkaXNhYmxlZCAudHAtcm90dl9te2Rpc3BsYXk6bm9uZX0udHAtcm90dl9jPi50cC1mbGR2LnRwLXYtbHN0Pi50cC1mbGR2X2N7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czp2YXIoLS1icy1icik7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6dmFyKC0tYnMtYnIpfS50cC1yb3R2X2M+LnRwLWZsZHYudHAtdi1sc3Q+LnRwLWZsZHZfaXtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOnZhcigtLWJzLWJyKX0udHAtcm90dl9jPi50cC1mbGR2LnRwLXYtbHN0Om5vdCgudHAtZmxkdi1leHBhbmRlZCk+LnRwLWZsZHZfYntib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOnZhcigtLWJzLWJyKTtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czp2YXIoLS1icy1icil9LnRwLXJvdHZfYz4udHAtZmxkdi50cC12LWxzdC50cC1mbGR2LWV4cGFuZGVkPi50cC1mbGR2X2J7dHJhbnNpdGlvbi1kZWxheTowczt0cmFuc2l0aW9uLWR1cmF0aW9uOjBzfS50cC1yb3R2X2MgLnRwLWZsZHYudHAtdi12bHN0Om5vdCgudHAtZmxkdi1leHBhbmRlZCk+LnRwLWZsZHZfYntib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czp2YXIoLS1icy1icil9LnRwLXJvdHYudHAtcm90di1ub3QgLnRwLXJvdHZfYz4udHAtZmxkdi50cC12LWZzdHttYXJnaW4tdG9wOmNhbGMoLTEqdmFyKC0tY250LXZwKSl9LnRwLXJvdHYudHAtcm90di1ub3QgLnRwLXJvdHZfYz4udHAtZmxkdi50cC12LWZzdD4udHAtZmxkdl9ie2JvcmRlci10b3AtbGVmdC1yYWRpdXM6dmFyKC0tYnMtYnIpO2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOnZhcigtLWJzLWJyKX0udHAtcm90dl9jPi50cC10YWJ2LnRwLXYtbHN0Pi50cC10YWJ2X2N7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czp2YXIoLS1icy1icik7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6dmFyKC0tYnMtYnIpfS50cC1yb3R2X2M+LnRwLXRhYnYudHAtdi1sc3Q+LnRwLXRhYnZfaXtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOnZhcigtLWJzLWJyKX0udHAtcm90di50cC1yb3R2LW5vdCAudHAtcm90dl9jPi50cC10YWJ2LnRwLXYtZnN0e21hcmdpbi10b3A6Y2FsYygtMSp2YXIoLS1jbnQtdnApKX0udHAtcm90di50cC1yb3R2LW5vdCAudHAtcm90dl9jPi50cC10YWJ2LnRwLXYtZnN0Pi50cC10YWJ2X3R7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czp2YXIoLS1icy1icik7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6dmFyKC0tYnMtYnIpfS50cC1yb3R2LnRwLXYtZGlzYWJsZWQsLnRwLXJvdHYgLnRwLXYtZGlzYWJsZWR7cG9pbnRlci1ldmVudHM6bm9uZX0udHAtcm90di50cC12LWhpZGRlbiwudHAtcm90diAudHAtdi1oaWRkZW57ZGlzcGxheTpub25lfS50cC1zcHJ2X3J7YmFja2dyb3VuZC1jb2xvcjp2YXIoLS1ncnYtZmcpO2JvcmRlci13aWR0aDowO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjJweDttYXJnaW46MDt3aWR0aDoxMDAlfS50cC1zcHJ2LnRwLXYtZGlzYWJsZWQgLnRwLXNwcnZfcntvcGFjaXR5Oi41fScsXG4gICAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICAgICAgTGlzdEJsYWRlUGx1Z2luLFxuICAgICAgICAgICAgICAgIFNlcGFyYXRvckJsYWRlUGx1Z2luLFxuICAgICAgICAgICAgICAgIFNsaWRlckJsYWRlUGx1Z2luLFxuICAgICAgICAgICAgICAgIFRhYkJsYWRlUGx1Z2luLFxuICAgICAgICAgICAgICAgIFRleHRCbGFkZVBsdWdpbixcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY29uc3QgVkVSU0lPTiA9IG5ldyBTZW12ZXIoJzQuMC41Jyk7XG5cbmV4cG9ydCB7IEJsYWRlQXBpLCBCdXR0b25BcGksIEZvbGRlckFwaSwgTGlzdEJsYWRlQXBpLCBMaXN0SW5wdXRCaW5kaW5nQXBpLCBQYW5lLCBTZW12ZXIsIFNlcGFyYXRvckJsYWRlQXBpLCBTbGlkZXJCbGFkZUFwaSwgU2xpZGVySW5wdXRCaW5kaW5nQXBpLCBUYWJBcGksIFRhYlBhZ2VBcGksIFRleHRCbGFkZUFwaSwgVHBDaGFuZ2VFdmVudCwgVkVSU0lPTiB9O1xuIiwgImltcG9ydCB7IFBhbmUgfSBmcm9tICd0d2Vha3BhbmUnO1xuaW1wb3J0IHdhaXQgZnJvbSAnLi93YWl0LmpzJztcblxuY2xhc3MgRGVidWdUb29scyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIHRoaXMucGFuZSA9IG5ldyBQYW5lKHtcbiAgICAgICAgICAgIHRpdGxlOiAnRGVidWcgcGFuZWwnLFxuICAgICAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVidWctcGFuZWwnKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICB0aGlzLmxvYWRTdGF0ZSgpO1xuICAgICAgICB0aGlzLmFwcGx5U3RhdGUoKTtcblxuICAgICAgICB0aGlzLnBhbmUuYWRkQnV0dG9uKHtcbiAgICAgICAgICAgIHRpdGxlOiAnVG9nZ2xlJyxcbiAgICAgICAgICAgIGxhYmVsOiAnR3JpZCcsICAgLy8gb3B0aW9uYWxcbiAgICAgICAgfSkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVHcmlkKCk7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnBhbmUuYWRkQnV0dG9uKHtcbiAgICAgICAgICAgIHRpdGxlOiAnT3BlbicsXG4gICAgICAgICAgICBsYWJlbDogJ1NpdGVtYXAnLCAgIC8vIG9wdGlvbmFsXG4gICAgICAgIH0pLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9ICcvc2l0ZW1hcCc7XG4gICAgICAgICAgICAvLyBsb2NhdGlvbi5hc3NpZ24odXJsKTtcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnBhbmUuYWRkQnV0dG9uKHtcbiAgICAgICAgICAgIHRpdGxlOiAnQ2xlYXIgYWxsIEFQSSBjYWNoZScsXG4gICAgICAgICAgICBsYWJlbDogJ0NhY2hlJyxcbiAgICAgICAgfSkub24oJ2NsaWNrJywgYXN5bmMgKGVsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gJy9hcGkvY2xlYXItY2FjaGU/a2V5PWRldmNsZWFyJztcbiAgICAgICAgICAgIGNvbnN0IHQgPSBlbHQudGFyZ2V0O1xuICAgICAgICAgICAgdC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBhd2FpdCB3YWl0KDUwMCk7XG4gICAgICAgICAgICBjb25zdCByID0gYXdhaXQgZmV0Y2godXJsKS50aGVuKHIgPT4gci5qc29uKCkpXG4gICAgICAgICAgICB0LnRpdGxlID0gci5tZXNzYWdlO1xuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXRlID0gKCkgPT4ge1xuXG4gICAgfVxuXG4gICAgc2F2ZVN0YXRlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlLnBhbmVsID0gdGhpcy5wYW5lLmV4cG9ydFN0YXRlKHRoaXMuc3RhdGUucGFuZWwpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZGVidWdTdGF0ZScsIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpKTtcbiAgICB9XG5cbiAgICBsb2FkU3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzdGF0ZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RlYnVnU3RhdGUnKSkgfHwge307XG4gICAgICAgIHN0YXRlLnBhbmVsICYmIHRoaXMucGFuZS5pbXBvcnRTdGF0ZShzdGF0ZS5wYW5lbCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB9XG5cbiAgICBhcHBseVN0YXRlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnRvZ2dsZUdyaWQodGhpcy5zdGF0ZS5ncmlkID8/IGZhbHNlKTtcbiAgICB9XG5cbiAgICB0b2dnbGVHcmlkID0gKG5ld1N0YXRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2lzLWRlYnVnLWdyaWQnLCBuZXdTdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZS5ncmlkID0gc3RhdGU7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IERlYnVnVG9vbHMoKTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7QUFDQSxTQUFTLFVBQVUsR0FBRztBQUNsQixTQUFPO0FBQ1g7QUFDQSxTQUFTLFFBQVEsT0FBTztBQUNwQixTQUFPLFVBQVUsUUFBUSxVQUFVO0FBQ3ZDO0FBQ0EsU0FBUyxXQUFXLE9BQU87QUFDdkIsU0FBTyxVQUFVLFFBQVEsT0FBTyxVQUFVO0FBQzlDO0FBQ0EsU0FBUyxTQUFTLE9BQU87QUFDckIsU0FBTyxVQUFVLFFBQVEsT0FBTyxVQUFVO0FBQzlDO0FBQ0EsU0FBUyxnQkFBZ0IsSUFBSSxJQUFJO0FBQzdCLE1BQUksR0FBRyxXQUFXLEdBQUcsUUFBUTtBQUN6QixXQUFPO0FBQUEsRUFDWDtBQUNBLFdBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRLEtBQUs7QUFDaEMsUUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRztBQUNqQixhQUFPO0FBQUEsSUFDWDtBQUFBLEVBQ0o7QUFDQSxTQUFPO0FBQ1g7QUFDQSxTQUFTLFVBQVUsSUFBSSxJQUFJO0FBQ3ZCLFFBQU0sT0FBTyxNQUFNLEtBQUssb0JBQUksSUFBSSxDQUFDLEdBQUcsT0FBTyxLQUFLLEVBQUUsR0FBRyxHQUFHLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLFNBQU8sS0FBSyxPQUFPLENBQUMsUUFBUSxRQUFRO0FBQ2hDLFVBQU0s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Q2IsWUFBTSxhQUFLLEdBQUc7QUFDZCxZQUFNLElBQUksTUFBTSxNQUFNLEdBQUcsRUFBRSxLQUFLLENBQUFDLE9BQUtBLEdBQUUsS0FBSyxDQUFDO0FBQzdDLFFBQUUsUUFBUSxFQUFFO0FBQUEsSUFFaEIsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUVBLGNBQWMsTUFBTTtBQUFBLEVBRXBCO0FBQUEsRUFFQSxZQUFZLE1BQU07QUFDZCxTQUFLLE1BQU0sUUFBUSxLQUFLLEtBQUssWUFBWSxLQUFLLE1BQU0sS0FBSztBQUN6RCxpQkFBYSxRQUFRLGNBQWMsS0FBSyxVQUFVLEtBQUssS0FBSyxDQUFDO0FBQUEsRUFDakU7QUFBQSxFQUVBLFlBQVksTUFBTTtBQUNkLFFBQUksUUFBUSxLQUFLLE1BQU0sYUFBYSxRQUFRLFlBQVksQ0FBQyxLQUFLLENBQUM7QUFDL0QsVUFBTSxTQUFTLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSztBQUNoRCxTQUFLLFFBQVE7QUFFYixXQUFPLEtBQUs7QUFBQSxFQUNoQjtBQUFBLEVBRUEsYUFBYSxNQUFNO0FBQ2YsU0FBSyxXQUFXLEtBQUssTUFBTSxRQUFRLEtBQUs7QUFBQSxFQUM1QztBQUFBLEVBRUEsYUFBYSxDQUFDLGFBQWE7QUFDdkIsVUFBTSxRQUFRLEtBQUssS0FBSyxVQUFVLE9BQU8saUJBQWlCLFFBQVE7QUFFbEUsU0FBSyxNQUFNLE9BQU87QUFDbEIsV0FBTztBQUFBLEVBQ1g7QUFFSjtBQUVBLElBQU8scUJBQVEsSUFBSSxXQUFXOyIsCiAgIm5hbWVzIjogWyJvcCIsICJyZXN1bHQiLCAiZG9jdW1lbnQiLCAicCIsICJjIiwgIl9hIiwgInYiLCAiciJdCn0K
