/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $def2de46b9306e8a$var$t = globalThis, $def2de46b9306e8a$export$b4d10f6001c083c2 = $def2de46b9306e8a$var$t.ShadowRoot && (void 0 === $def2de46b9306e8a$var$t.ShadyCSS || $def2de46b9306e8a$var$t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $def2de46b9306e8a$var$s = Symbol(), $def2de46b9306e8a$var$o = new WeakMap;
class $def2de46b9306e8a$export$505d1e8739bad805 {
    constructor(t, e, o){
        if (this._$cssResult$ = !0, o !== $def2de46b9306e8a$var$s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = e;
    }
    get styleSheet() {
        let t = this.o;
        const s = this.t;
        if ($def2de46b9306e8a$export$b4d10f6001c083c2 && void 0 === t) {
            const e = void 0 !== s && 1 === s.length;
            e && (t = $def2de46b9306e8a$var$o.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), e && $def2de46b9306e8a$var$o.set(s, t));
        }
        return t;
    }
    toString() {
        return this.cssText;
    }
}
const $def2de46b9306e8a$export$8d80f9cac07cdb3 = (t)=>new $def2de46b9306e8a$export$505d1e8739bad805("string" == typeof t ? t : t + "", void 0, $def2de46b9306e8a$var$s), $def2de46b9306e8a$export$dbf350e5966cf602 = (t, ...e)=>{
    const o = 1 === t.length ? t[0] : e.reduce((e, s, o)=>e + ((t)=>{
            if (!0 === t._$cssResult$) return t.cssText;
            if ("number" == typeof t) return t;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(s) + t[o + 1], t[0]);
    return new $def2de46b9306e8a$export$505d1e8739bad805(o, t, $def2de46b9306e8a$var$s);
}, $def2de46b9306e8a$export$2ca4a66ec4cecb90 = (s, o)=>{
    if ($def2de46b9306e8a$export$b4d10f6001c083c2) s.adoptedStyleSheets = o.map((t)=>t instanceof CSSStyleSheet ? t : t.styleSheet);
    else for (const e of o){
        const o = document.createElement("style"), n = $def2de46b9306e8a$var$t.litNonce;
        void 0 !== n && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
    }
}, $def2de46b9306e8a$export$ee69dfd951e24778 = $def2de46b9306e8a$export$b4d10f6001c083c2 ? (t)=>t : (t)=>t instanceof CSSStyleSheet ? ((t)=>{
        let e = "";
        for (const s of t.cssRules)e += s.cssText;
        return $def2de46b9306e8a$export$8d80f9cac07cdb3(e);
    })(t) : t;


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const { is: $19fe8e3abedf4df0$var$i, defineProperty: $19fe8e3abedf4df0$var$e, getOwnPropertyDescriptor: $19fe8e3abedf4df0$var$h, getOwnPropertyNames: $19fe8e3abedf4df0$var$r, getOwnPropertySymbols: $19fe8e3abedf4df0$var$o, getPrototypeOf: $19fe8e3abedf4df0$var$n } = Object, $19fe8e3abedf4df0$var$a = globalThis, $19fe8e3abedf4df0$var$c = $19fe8e3abedf4df0$var$a.trustedTypes, $19fe8e3abedf4df0$var$l = $19fe8e3abedf4df0$var$c ? $19fe8e3abedf4df0$var$c.emptyScript : "", $19fe8e3abedf4df0$var$p = $19fe8e3abedf4df0$var$a.reactiveElementPolyfillSupport, $19fe8e3abedf4df0$var$d = (t, s)=>t, $19fe8e3abedf4df0$export$7312b35fbf521afb = {
    toAttribute (t, s) {
        switch(s){
            case Boolean:
                t = t ? $19fe8e3abedf4df0$var$l : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, s) {
        let i = t;
        switch(s){
            case Boolean:
                i = null !== t;
                break;
            case Number:
                i = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    i = JSON.parse(t);
                } catch (t) {
                    i = null;
                }
        }
        return i;
    }
}, $19fe8e3abedf4df0$export$53a6892c50694894 = (t, s)=>!$19fe8e3abedf4df0$var$i(t, s), $19fe8e3abedf4df0$var$b = {
    attribute: !0,
    type: String,
    converter: $19fe8e3abedf4df0$export$7312b35fbf521afb,
    reflect: !1,
    useDefault: !1,
    hasChanged: $19fe8e3abedf4df0$export$53a6892c50694894
};
Symbol.metadata ??= Symbol("metadata"), $19fe8e3abedf4df0$var$a.litPropertyMetadata ??= new WeakMap;
class $19fe8e3abedf4df0$export$c7c07a37856565d extends HTMLElement {
    static addInitializer(t) {
        this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
        return this.finalize(), this._$Eh && [
            ...this._$Eh.keys()
        ];
    }
    static createProperty(t, s = $19fe8e3abedf4df0$var$b) {
        if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
            const i = Symbol(), h = this.getPropertyDescriptor(t, i, s);
            void 0 !== h && $19fe8e3abedf4df0$var$e(this.prototype, t, h);
        }
    }
    static getPropertyDescriptor(t, s, i) {
        const { get: e, set: r } = $19fe8e3abedf4df0$var$h(this.prototype, t) ?? {
            get () {
                return this[s];
            },
            set (t) {
                this[s] = t;
            }
        };
        return {
            get: e,
            set (s) {
                const h = e?.call(this);
                r?.call(this, s), this.requestUpdate(t, h, i);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) ?? $19fe8e3abedf4df0$var$b;
    }
    static _$Ei() {
        if (this.hasOwnProperty($19fe8e3abedf4df0$var$d("elementProperties"))) return;
        const t = $19fe8e3abedf4df0$var$n(this);
        t.finalize(), void 0 !== t.l && (this.l = [
            ...t.l
        ]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
        if (this.hasOwnProperty($19fe8e3abedf4df0$var$d("finalized"))) return;
        if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($19fe8e3abedf4df0$var$d("properties"))) {
            const t = this.properties, s = [
                ...$19fe8e3abedf4df0$var$r(t),
                ...$19fe8e3abedf4df0$var$o(t)
            ];
            for (const i of s)this.createProperty(i, t[i]);
        }
        const t = this[Symbol.metadata];
        if (null !== t) {
            const s = litPropertyMetadata.get(t);
            if (void 0 !== s) for (const [t, i] of s)this.elementProperties.set(t, i);
        }
        this._$Eh = new Map;
        for (const [t, s] of this.elementProperties){
            const i = this._$Eu(t, s);
            void 0 !== i && this._$Eh.set(i, t);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s) {
        const i = [];
        if (Array.isArray(s)) {
            const e = new Set(s.flat(1 / 0).reverse());
            for (const s of e)i.unshift((0, $def2de46b9306e8a$export$ee69dfd951e24778)(s));
        } else void 0 !== s && i.push((0, $def2de46b9306e8a$export$ee69dfd951e24778)(s));
        return i;
    }
    static _$Eu(t, s) {
        const i = s.attribute;
        return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    constructor(){
        super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
    }
    _$Ev() {
        this._$ES = new Promise((t)=>this.enableUpdating = t), this._$AL = new Map, this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t)=>t(this));
    }
    addController(t) {
        (this._$EO ??= new Set).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
        this._$EO?.delete(t);
    }
    _$E_() {
        const t = new Map, s = this.constructor.elementProperties;
        for (const i of s.keys())this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
        t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
        const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return (0, $def2de46b9306e8a$export$2ca4a66ec4cecb90)(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
        this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t)=>t.hostConnected?.());
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        this._$EO?.forEach((t)=>t.hostDisconnected?.());
    }
    attributeChangedCallback(t, s, i) {
        this._$AK(t, i);
    }
    _$ET(t, s) {
        const i = this.constructor.elementProperties.get(t), e = this.constructor._$Eu(t, i);
        if (void 0 !== e && !0 === i.reflect) {
            const h = (void 0 !== i.converter?.toAttribute ? i.converter : $19fe8e3abedf4df0$export$7312b35fbf521afb).toAttribute(s, i.type);
            this._$Em = t, null == h ? this.removeAttribute(e) : this.setAttribute(e, h), this._$Em = null;
        }
    }
    _$AK(t, s) {
        const i = this.constructor, e = i._$Eh.get(t);
        if (void 0 !== e && this._$Em !== e) {
            const t = i.getPropertyOptions(e), h = "function" == typeof t.converter ? {
                fromAttribute: t.converter
            } : void 0 !== t.converter?.fromAttribute ? t.converter : $19fe8e3abedf4df0$export$7312b35fbf521afb;
            this._$Em = e, this[e] = h.fromAttribute(s, t.type) ?? this._$Ej?.get(e) ?? null, this._$Em = null;
        }
    }
    requestUpdate(t, s, i) {
        if (void 0 !== t) {
            const e = this.constructor, h = this[t];
            if (i ??= e.getPropertyOptions(t), !((i.hasChanged ?? $19fe8e3abedf4df0$export$53a6892c50694894)(h, s) || i.useDefault && i.reflect && h === this._$Ej?.get(t) && !this.hasAttribute(e._$Eu(t, i)))) return;
            this.C(t, s, i);
        }
        !1 === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t, s, { useDefault: i, reflect: e, wrapped: h }, r) {
        i && !(this._$Ej ??= new Map).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), !0 !== h || void 0 !== r) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), !0 === e && this._$Em !== t && (this._$Eq ??= new Set).add(t));
    }
    async _$EP() {
        this.isUpdatePending = !0;
        try {
            await this._$ES;
        } catch (t) {
            Promise.reject(t);
        }
        const t = this.scheduleUpdate();
        return null != t && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
            if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
                for (const [t, s] of this._$Ep)this[t] = s;
                this._$Ep = void 0;
            }
            const t = this.constructor.elementProperties;
            if (t.size > 0) for (const [s, i] of t){
                const { wrapped: t } = i, e = this[s];
                !0 !== t || this._$AL.has(s) || void 0 === e || this.C(s, void 0, i, e);
            }
        }
        let t = !1;
        const s = this._$AL;
        try {
            t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((t)=>t.hostUpdate?.()), this.update(s)) : this._$EM();
        } catch (s) {
            throw t = !1, this._$EM(), s;
        }
        t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
        this._$EO?.forEach((t)=>t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$EM() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$ES;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        this._$Eq &&= this._$Eq.forEach((t)=>this._$ET(t, this[t])), this._$EM();
    }
    updated(t) {}
    firstUpdated(t) {}
}
$19fe8e3abedf4df0$export$c7c07a37856565d.elementStyles = [], $19fe8e3abedf4df0$export$c7c07a37856565d.shadowRootOptions = {
    mode: "open"
}, $19fe8e3abedf4df0$export$c7c07a37856565d[$19fe8e3abedf4df0$var$d("elementProperties")] = new Map, $19fe8e3abedf4df0$export$c7c07a37856565d[$19fe8e3abedf4df0$var$d("finalized")] = new Map, $19fe8e3abedf4df0$var$p?.({
    ReactiveElement: $19fe8e3abedf4df0$export$c7c07a37856565d
}), ($19fe8e3abedf4df0$var$a.reactiveElementVersions ??= []).push("2.1.0");


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $f58f44579a4747ac$var$t = globalThis, $f58f44579a4747ac$var$i = $f58f44579a4747ac$var$t.trustedTypes, $f58f44579a4747ac$var$s = $f58f44579a4747ac$var$i ? $f58f44579a4747ac$var$i.createPolicy("lit-html", {
    createHTML: (t)=>t
}) : void 0, $f58f44579a4747ac$var$e = "$lit$", $f58f44579a4747ac$var$h = `lit$${Math.random().toFixed(9).slice(2)}$`, $f58f44579a4747ac$var$o = "?" + $f58f44579a4747ac$var$h, $f58f44579a4747ac$var$n = `<${$f58f44579a4747ac$var$o}>`, $f58f44579a4747ac$var$r = document, $f58f44579a4747ac$var$l = ()=>$f58f44579a4747ac$var$r.createComment(""), $f58f44579a4747ac$var$c = (t)=>null === t || "object" != typeof t && "function" != typeof t, $f58f44579a4747ac$var$a = Array.isArray, $f58f44579a4747ac$var$u = (t)=>$f58f44579a4747ac$var$a(t) || "function" == typeof t?.[Symbol.iterator], $f58f44579a4747ac$var$d = "[ \t\n\f\r]", $f58f44579a4747ac$var$f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $f58f44579a4747ac$var$v = /-->/g, $f58f44579a4747ac$var$_ = />/g, $f58f44579a4747ac$var$m = RegExp(`>|${$f58f44579a4747ac$var$d}(?:([^\\s"'>=/]+)(${$f58f44579a4747ac$var$d}*=${$f58f44579a4747ac$var$d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), $f58f44579a4747ac$var$p = /'/g, $f58f44579a4747ac$var$g = /"/g, $f58f44579a4747ac$var$$ = /^(?:script|style|textarea|title)$/i, $f58f44579a4747ac$var$y = (t)=>(i, ...s)=>({
            _$litType$: t,
            strings: i,
            values: s
        }), $f58f44579a4747ac$export$c0bb0b647f701bb5 = $f58f44579a4747ac$var$y(1), $f58f44579a4747ac$export$7ed1367e7fa1ad68 = $f58f44579a4747ac$var$y(2), $f58f44579a4747ac$export$47d5b44d225be5b4 = $f58f44579a4747ac$var$y(3), $f58f44579a4747ac$export$9c068ae9cc5db4e8 = Symbol.for("lit-noChange"), $f58f44579a4747ac$export$45b790e32b2810ee = Symbol.for("lit-nothing"), $f58f44579a4747ac$var$A = new WeakMap, $f58f44579a4747ac$var$C = $f58f44579a4747ac$var$r.createTreeWalker($f58f44579a4747ac$var$r, 129);
function $f58f44579a4747ac$var$P(t, i) {
    if (!$f58f44579a4747ac$var$a(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== $f58f44579a4747ac$var$s ? $f58f44579a4747ac$var$s.createHTML(i) : i;
}
const $f58f44579a4747ac$var$V = (t, i)=>{
    const s = t.length - 1, o = [];
    let r, l = 2 === i ? "<svg>" : 3 === i ? "<math>" : "", c = $f58f44579a4747ac$var$f;
    for(let i = 0; i < s; i++){
        const s = t[i];
        let a, u, d = -1, y = 0;
        for(; y < s.length && (c.lastIndex = y, u = c.exec(s), null !== u);)y = c.lastIndex, c === $f58f44579a4747ac$var$f ? "!--" === u[1] ? c = $f58f44579a4747ac$var$v : void 0 !== u[1] ? c = $f58f44579a4747ac$var$_ : void 0 !== u[2] ? ($f58f44579a4747ac$var$$.test(u[2]) && (r = RegExp("</" + u[2], "g")), c = $f58f44579a4747ac$var$m) : void 0 !== u[3] && (c = $f58f44579a4747ac$var$m) : c === $f58f44579a4747ac$var$m ? ">" === u[0] ? (c = r ?? $f58f44579a4747ac$var$f, d = -1) : void 0 === u[1] ? d = -2 : (d = c.lastIndex - u[2].length, a = u[1], c = void 0 === u[3] ? $f58f44579a4747ac$var$m : '"' === u[3] ? $f58f44579a4747ac$var$g : $f58f44579a4747ac$var$p) : c === $f58f44579a4747ac$var$g || c === $f58f44579a4747ac$var$p ? c = $f58f44579a4747ac$var$m : c === $f58f44579a4747ac$var$v || c === $f58f44579a4747ac$var$_ ? c = $f58f44579a4747ac$var$f : (c = $f58f44579a4747ac$var$m, r = void 0);
        const x = c === $f58f44579a4747ac$var$m && t[i + 1].startsWith("/>") ? " " : "";
        l += c === $f58f44579a4747ac$var$f ? s + $f58f44579a4747ac$var$n : d >= 0 ? (o.push(a), s.slice(0, d) + $f58f44579a4747ac$var$e + s.slice(d) + $f58f44579a4747ac$var$h + x) : s + $f58f44579a4747ac$var$h + (-2 === d ? i : x);
    }
    return [
        $f58f44579a4747ac$var$P(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : 3 === i ? "</math>" : "")),
        o
    ];
};
class $f58f44579a4747ac$var$N {
    constructor({ strings: t, _$litType$: s }, n){
        let r;
        this.parts = [];
        let c = 0, a = 0;
        const u = t.length - 1, d = this.parts, [f, v] = $f58f44579a4747ac$var$V(t, s);
        if (this.el = $f58f44579a4747ac$var$N.createElement(f, n), $f58f44579a4747ac$var$C.currentNode = this.el.content, 2 === s || 3 === s) {
            const t = this.el.content.firstChild;
            t.replaceWith(...t.childNodes);
        }
        for(; null !== (r = $f58f44579a4747ac$var$C.nextNode()) && d.length < u;){
            if (1 === r.nodeType) {
                if (r.hasAttributes()) for (const t of r.getAttributeNames())if (t.endsWith($f58f44579a4747ac$var$e)) {
                    const i = v[a++], s = r.getAttribute(t).split($f58f44579a4747ac$var$h), e = /([.?@])?(.*)/.exec(i);
                    d.push({
                        type: 1,
                        index: c,
                        name: e[2],
                        strings: s,
                        ctor: "." === e[1] ? $f58f44579a4747ac$var$H : "?" === e[1] ? $f58f44579a4747ac$var$I : "@" === e[1] ? $f58f44579a4747ac$var$L : $f58f44579a4747ac$var$k
                    }), r.removeAttribute(t);
                } else t.startsWith($f58f44579a4747ac$var$h) && (d.push({
                    type: 6,
                    index: c
                }), r.removeAttribute(t));
                if ($f58f44579a4747ac$var$$.test(r.tagName)) {
                    const t = r.textContent.split($f58f44579a4747ac$var$h), s = t.length - 1;
                    if (s > 0) {
                        r.textContent = $f58f44579a4747ac$var$i ? $f58f44579a4747ac$var$i.emptyScript : "";
                        for(let i = 0; i < s; i++)r.append(t[i], $f58f44579a4747ac$var$l()), $f58f44579a4747ac$var$C.nextNode(), d.push({
                            type: 2,
                            index: ++c
                        });
                        r.append(t[s], $f58f44579a4747ac$var$l());
                    }
                }
            } else if (8 === r.nodeType) {
                if (r.data === $f58f44579a4747ac$var$o) d.push({
                    type: 2,
                    index: c
                });
                else {
                    let t = -1;
                    for(; -1 !== (t = r.data.indexOf($f58f44579a4747ac$var$h, t + 1));)d.push({
                        type: 7,
                        index: c
                    }), t += $f58f44579a4747ac$var$h.length - 1;
                }
            }
            c++;
        }
    }
    static createElement(t, i) {
        const s = $f58f44579a4747ac$var$r.createElement("template");
        return s.innerHTML = t, s;
    }
}
function $f58f44579a4747ac$var$S(t, i, s = t, e) {
    if (i === $f58f44579a4747ac$export$9c068ae9cc5db4e8) return i;
    let h = void 0 !== e ? s._$Co?.[e] : s._$Cl;
    const o = $f58f44579a4747ac$var$c(i) ? void 0 : i._$litDirective$;
    return h?.constructor !== o && (h?._$AO?.(!1), void 0 === o ? h = void 0 : (h = new o(t), h._$AT(t, s, e)), void 0 !== e ? (s._$Co ??= [])[e] = h : s._$Cl = h), void 0 !== h && (i = $f58f44579a4747ac$var$S(t, h._$AS(t, i.values), h, e)), i;
}
class $f58f44579a4747ac$var$M {
    constructor(t, i){
        this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    u(t) {
        const { el: { content: i }, parts: s } = this._$AD, e = (t?.creationScope ?? $f58f44579a4747ac$var$r).importNode(i, !0);
        $f58f44579a4747ac$var$C.currentNode = e;
        let h = $f58f44579a4747ac$var$C.nextNode(), o = 0, n = 0, l = s[0];
        for(; void 0 !== l;){
            if (o === l.index) {
                let i;
                2 === l.type ? i = new $f58f44579a4747ac$var$R(h, h.nextSibling, this, t) : 1 === l.type ? i = new l.ctor(h, l.name, l.strings, this, t) : 6 === l.type && (i = new $f58f44579a4747ac$var$z(h, this, t)), this._$AV.push(i), l = s[++n];
            }
            o !== l?.index && (h = $f58f44579a4747ac$var$C.nextNode(), o++);
        }
        return $f58f44579a4747ac$var$C.currentNode = $f58f44579a4747ac$var$r, e;
    }
    p(t) {
        let i = 0;
        for (const s of this._$AV)void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
}
class $f58f44579a4747ac$var$R {
    get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, i, s, e){
        this.type = 2, this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = e?.isConnected ?? !0;
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, i = this) {
        t = $f58f44579a4747ac$var$S(this, t, i), $f58f44579a4747ac$var$c(t) ? t === $f58f44579a4747ac$export$45b790e32b2810ee || null == t || "" === t ? (this._$AH !== $f58f44579a4747ac$export$45b790e32b2810ee && this._$AR(), this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee) : t !== this._$AH && t !== $f58f44579a4747ac$export$9c068ae9cc5db4e8 && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : $f58f44579a4747ac$var$u(t) ? this.k(t) : this._(t);
    }
    O(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    T(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
    }
    _(t) {
        this._$AH !== $f58f44579a4747ac$export$45b790e32b2810ee && $f58f44579a4747ac$var$c(this._$AH) ? this._$AA.nextSibling.data = t : this.T($f58f44579a4747ac$var$r.createTextNode(t)), this._$AH = t;
    }
    $(t) {
        const { values: i, _$litType$: s } = t, e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = $f58f44579a4747ac$var$N.createElement($f58f44579a4747ac$var$P(s.h, s.h[0]), this.options)), s);
        if (this._$AH?._$AD === e) this._$AH.p(i);
        else {
            const t = new $f58f44579a4747ac$var$M(e, this), s = t.u(this.options);
            t.p(i), this.T(s), this._$AH = t;
        }
    }
    _$AC(t) {
        let i = $f58f44579a4747ac$var$A.get(t.strings);
        return void 0 === i && $f58f44579a4747ac$var$A.set(t.strings, i = new $f58f44579a4747ac$var$N(t)), i;
    }
    k(t) {
        $f58f44579a4747ac$var$a(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const h of t)e === i.length ? i.push(s = new $f58f44579a4747ac$var$R(this.O($f58f44579a4747ac$var$l()), this.O($f58f44579a4747ac$var$l()), this, this.options)) : s = i[e], s._$AI(h), e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR(t = this._$AA.nextSibling, i) {
        for(this._$AP?.(!1, !0, i); t && t !== this._$AB;){
            const i = t.nextSibling;
            t.remove(), t = i;
        }
    }
    setConnected(t) {
        void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t));
    }
}
class $f58f44579a4747ac$var$k {
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    constructor(t, i, s, e, h){
        this.type = 1, this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee;
    }
    _$AI(t, i = this, s, e) {
        const h = this.strings;
        let o = !1;
        if (void 0 === h) t = $f58f44579a4747ac$var$S(this, t, i, 0), o = !$f58f44579a4747ac$var$c(t) || t !== this._$AH && t !== $f58f44579a4747ac$export$9c068ae9cc5db4e8, o && (this._$AH = t);
        else {
            const e = t;
            let n, r;
            for(t = h[0], n = 0; n < h.length - 1; n++)r = $f58f44579a4747ac$var$S(this, e[s + n], i, n), r === $f58f44579a4747ac$export$9c068ae9cc5db4e8 && (r = this._$AH[n]), o ||= !$f58f44579a4747ac$var$c(r) || r !== this._$AH[n], r === $f58f44579a4747ac$export$45b790e32b2810ee ? t = $f58f44579a4747ac$export$45b790e32b2810ee : t !== $f58f44579a4747ac$export$45b790e32b2810ee && (t += (r ?? "") + h[n + 1]), this._$AH[n] = r;
        }
        o && !e && this.j(t);
    }
    j(t) {
        t === $f58f44579a4747ac$export$45b790e32b2810ee ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
    }
}
class $f58f44579a4747ac$var$H extends $f58f44579a4747ac$var$k {
    constructor(){
        super(...arguments), this.type = 3;
    }
    j(t) {
        this.element[this.name] = t === $f58f44579a4747ac$export$45b790e32b2810ee ? void 0 : t;
    }
}
class $f58f44579a4747ac$var$I extends $f58f44579a4747ac$var$k {
    constructor(){
        super(...arguments), this.type = 4;
    }
    j(t) {
        this.element.toggleAttribute(this.name, !!t && t !== $f58f44579a4747ac$export$45b790e32b2810ee);
    }
}
class $f58f44579a4747ac$var$L extends $f58f44579a4747ac$var$k {
    constructor(t, i, s, e, h){
        super(t, i, s, e, h), this.type = 5;
    }
    _$AI(t, i = this) {
        if ((t = $f58f44579a4747ac$var$S(this, t, i, 0) ?? $f58f44579a4747ac$export$45b790e32b2810ee) === $f58f44579a4747ac$export$9c068ae9cc5db4e8) return;
        const s = this._$AH, e = t === $f58f44579a4747ac$export$45b790e32b2810ee && s !== $f58f44579a4747ac$export$45b790e32b2810ee || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, h = t !== $f58f44579a4747ac$export$45b790e32b2810ee && (s === $f58f44579a4747ac$export$45b790e32b2810ee || e);
        e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
    }
}
class $f58f44579a4747ac$var$z {
    constructor(t, i, s){
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        $f58f44579a4747ac$var$S(this, t);
    }
}
const $f58f44579a4747ac$export$8613d1ca9052b22e = {
    M: $f58f44579a4747ac$var$e,
    P: $f58f44579a4747ac$var$h,
    A: $f58f44579a4747ac$var$o,
    C: 1,
    L: $f58f44579a4747ac$var$V,
    R: $f58f44579a4747ac$var$M,
    D: $f58f44579a4747ac$var$u,
    V: $f58f44579a4747ac$var$S,
    I: $f58f44579a4747ac$var$R,
    H: $f58f44579a4747ac$var$k,
    N: $f58f44579a4747ac$var$I,
    U: $f58f44579a4747ac$var$L,
    B: $f58f44579a4747ac$var$H,
    F: $f58f44579a4747ac$var$z
}, $f58f44579a4747ac$var$j = $f58f44579a4747ac$var$t.litHtmlPolyfillSupport;
$f58f44579a4747ac$var$j?.($f58f44579a4747ac$var$N, $f58f44579a4747ac$var$R), ($f58f44579a4747ac$var$t.litHtmlVersions ??= []).push("3.3.0");
const $f58f44579a4747ac$export$b3890eb0ae9dca99 = (t, i, s)=>{
    const e = s?.renderBefore ?? i;
    let h = e._$litPart$;
    if (void 0 === h) {
        const t = s?.renderBefore ?? null;
        e._$litPart$ = h = new $f58f44579a4747ac$var$R(i.insertBefore($f58f44579a4747ac$var$l(), t), t, void 0, s ?? {});
    }
    return h._$AI(t), h;
};




/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $ab210b2da7b39b9d$var$s = globalThis;
class $ab210b2da7b39b9d$export$3f2f9f5909897157 extends (0, $19fe8e3abedf4df0$export$c7c07a37856565d) {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0;
    }
    createRenderRoot() {
        const t = super.createRenderRoot();
        return this.renderOptions.renderBefore ??= t.firstChild, t;
    }
    update(t) {
        const r = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = (0, $f58f44579a4747ac$export$b3890eb0ae9dca99)(r, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
        return 0, $f58f44579a4747ac$export$9c068ae9cc5db4e8;
    }
}
$ab210b2da7b39b9d$export$3f2f9f5909897157._$litElement$ = !0, $ab210b2da7b39b9d$export$3f2f9f5909897157["finalized"] = !0, $ab210b2da7b39b9d$var$s.litElementHydrateSupport?.({
    LitElement: $ab210b2da7b39b9d$export$3f2f9f5909897157
});
const $ab210b2da7b39b9d$var$o = $ab210b2da7b39b9d$var$s.litElementPolyfillSupport;
$ab210b2da7b39b9d$var$o?.({
    LitElement: $ab210b2da7b39b9d$export$3f2f9f5909897157
});
const $ab210b2da7b39b9d$export$f5c524615a7708d6 = {
    _$AK: (t, e, r)=>{
        t._$AK(e, r);
    },
    _$AL: (t)=>t._$AL
};
($ab210b2da7b39b9d$var$s.litElementVersions ??= []).push("4.2.0");


/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $a00bca1a101a9088$export$6acf61af03e62db = !1;




const $3cb55e3e7ebd776a$export$a970e6ec17c9a61d = "simple_plant_extended";
const $3cb55e3e7ebd776a$export$31089ea8b3e502e3 = "simple-plant-extended-card";
const $3cb55e3e7ebd776a$export$112ee299e69fdf7 = "Simple Plant Extended Card";
const $3cb55e3e7ebd776a$export$ce612590f71e0c8a = "Custom card for simple-plant-extended integration";
const $3cb55e3e7ebd776a$export$d5e7ce6d07daf10f = "v1.0.0";
const $3cb55e3e7ebd776a$export$6af2e7fd4d06fd68 = "jo-anb";



const $13632afec4749c69$export$9dd6ff9ea0189349 = (0, $def2de46b9306e8a$export$dbf350e5966cf602)`
    .hidden {
        display: none !important;
    }

    .card-content {
        padding: 0px;
        position: relative;
    }

    .info {
        padding: 16px;
    }

    .title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    .activity-button {
        margin-top: 8px;
        position: static;
    }

    .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }
    .border_row {
        border-top: 1px solid var(--divider-color);
        border-bottom: 1px solid var(--divider-color);
    }

    .content {
        position: relative;
        overflow: hidden;
    }

    .mark-action-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
    }

    .mark-action {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        padding: 2px;
        border: 1px solid var(--divider-color);
        background: rgba(var(--rgb-card-background-color), 0.2);
        color: var(--secondary-text-color);
    }

    .mark-action.is-due {
        color: var(--warning-color);
        border-color: rgba(var(--rgb-warning-color, 255, 193, 7), 0.6);
        background: rgba(var(--rgb-warning-color, 255, 193, 7), 0.15);
    }

    .mark-action.is-done {
        opacity: 0.75;
    }

    .content p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .sub_content {
        font-size: 14px;
        flex-grow: 2;
        gap: 8px;
        align-items: center;
        justify-content: flex-between;
    }

    .grow {
        flex-grow: 2;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 4px;
    }
    .sub_content_conditional {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 0px;
    }

    .right-actions {
        margin-left: auto;
        justify-content: flex-end;
        align-self: center;
        display: flex;
        align-items: center;
        gap: 0px;
    }

    .right-actions sub-icon-content {
        display: inline-flex;
        align-items: center;
    }

    .right-align {
        margin-left: auto;
        justify-content: flex-end;
    }

    .status-pill {
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 999px;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        border: 1px solid var(--divider-color);
    }

    .status-pill.is-on {
        background: rgba(var(--rgb-primary-color), 0.12);
        color: var(--primary-color);
        border-color: rgba(var(--rgb-primary-color), 0.35);
    }

    .status-pill.is-off {
        opacity: 0.6;
    }

    .status-off {
        opacity: 0.7;
    }

    .sub {
        position: absolute;
        top:0;
        left: 0;
        transform: translateY(100%);
        color: var(--secondary-text-color);
        font-size: 12px;
    }


    h1 {
        font-weight: normal;
        font-size: 24px;

        margin-top: 8px;
        margin-bottom: 0px;
        line-height: 24px;
        height: 48px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .section-title {
        padding: 12px 0 8px;
        font-weight: 600;
        font-size: 14px;
    }

    .overview-title {
        font-size: clamp(12px, 2.2vw, 16px);
    }

    .overview-summary {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 8px;
    }

    .overview-total-pill {
        cursor: pointer;
        background: var(--secondary-background-color);
    }

    .overview-task-pills {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 8px;
    }

    .overview-task-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border-radius: 999px;
        border: 1px solid var(--divider-color);
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: clamp(10px, 1.8vw, 12px);
        cursor: pointer;
    }

    .overview-subtitle {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: clamp(10px, 1.8vw, 12px);
        color: var(--secondary-text-color);
    }

    .overview-subtitle-text {
        white-space: nowrap;
    }

    .overview-subtitle-line {
        flex: 1;
        height: 1px;
        background: var(--divider-color);
    }

    .overview-task-pill:hover {
        border-color: rgba(var(--rgb-primary-color), 0.45);
        background: rgba(var(--rgb-primary-color), 0.12);
    }

    .overview-task-icon {
        width: 16px;
        height: 16px;
    }

    .overview-task-count {
        font-weight: 600;
    }

    .details-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
        padding-bottom: 12px;
    }

    .detail-item {
        padding: 8px;
        border-radius: 8px;
        background: var(--secondary-background-color);
    }

    .detail-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.4px;
    }

    .detail-value {
        font-size: 13px;
        margin-top: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .detail-value-editable {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .detail-edit-icon {
        width: 14px;
        height: 14px;
        color: var(--secondary-text-color);
    }

    .activity-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 8px 0 16px;
        max-height: 380px;
        overflow: auto;
    }

    .activity-item {
        border-left: 2px solid var(--divider-color);
        padding-left: 12px;
    }

    .activity-time {
        font-size: 11px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
    }

    .activity-action {
        font-size: 13px;
        font-weight: 600;
        text-transform: capitalize;
    }

    .activity-note,
    .activity-change {
        font-size: 12px;
        color: var(--secondary-text-color);
    }

    .activity-empty {
        font-size: 12px;
        color: var(--secondary-text-color);
    }

    .notes-row {
        cursor: pointer;
        gap: 12px;
    }

    .notes-preview {
        font-size: 12px;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .notes-input {
        display: flex;
        gap: 8px;
        align-items: center;
        padding-top: 8px;
    }

    .notes-input ha-textfield {
        flex: 1;
    }

    .details-button {
        width: 100%;
        margin-top: 12px;
        --mdc-theme-primary: var(--primary-color);
    }

    .details-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 4px 0 12px;
    }

    .details-edit {
        display: grid;
        gap: 8px;
        padding: 4px 0 12px;
    }

    .details-select-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.4px;
    }

    .details-select {
        padding: 10px 12px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
    }

    .details-input {
        padding: 10px 12px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        width: 100%;
        box-sizing: border-box;
    }

    .details-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding: 8px;
        border-radius: 8px;
        background: var(--secondary-background-color);
    }

    .details-row-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.4px;
    }

    .overview-row-label {
        display: flex;
        align-items: center;
        gap: 8px;
        text-transform: none;
        letter-spacing: 0;
        font-size: clamp(11px, 2vw, 14px);
        color: var(--primary-text-color);
        cursor: pointer;
    }

    .overview-row {
        flex-direction: column;
        align-items: stretch;
    }

    .overview-row-main {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .overview-plant-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .overview-plant-image {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        object-fit: cover;
        background: var(--secondary-background-color);
        border: 1px solid var(--divider-color);
        flex-shrink: 0;
    }

    .overview-plant-icon {
        width: 28px;
        height: 28px;
        color: var(--secondary-text-color);
        flex-shrink: 0;
    }

    .overview-row-value {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        justify-content: flex-start;
        font-size: clamp(10px, 1.8vw, 12px);
    }

    .overview-dialog-actions {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 8px;
    }

    .overview-task-row-label {
        display: block;
        font-size: 11px;
        color: var(--secondary-text-color);
        text-transform: none;
        letter-spacing: 0;
        margin-top: 2px;
    }

    .overview-task-action {
        margin-left: 4px;
    }

    .details-row-value {
        font-size: 13px;
        text-align: right;
    }

    .detail-clickable {
        cursor: pointer;
    }

    .confirm-body {
        padding: 4px 0 12px;
        color: var(--secondary-text-color);
        font-size: 14px;
    }

    .confirm-actions {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding-top: 8px;
    }

    .confirm-button {
        flex: 1;
    }

    .confirm-button.primary {
        --mdc-theme-primary: var(--primary-color);
    }

    hui-image {
        aspect-ratio: 1 / 1;
        border-radius: var(--ha-card-border-radius,12px);
        overflow: hidden;
    }

    ha-button {
        width: 100%;
        margin-top: 8px;
    }


    ha-icon {
        // display: flex;
        position: relative;
    }

    .action-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--secondary-background-color);
        border: 1px solid var(--divider-color);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
    }

    .action-icon.clickable:hover {
        background: rgba(var(--rgb-primary-color), 0.18);
        border-color: rgba(var(--rgb-primary-color), 0.45);
    }

    .action-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--secondary-background-color);
        border: 1px solid var(--divider-color);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
    }

    ha-icon[data-color] {
        color: var(--color);
    }



    .floating-icon-button {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background-color: rgba(var(--rgb-card-background-color), 0.2);
        border-radius: 48px;
    }

    ha-icon-button,
    mwc-button,
    .clickable {
        cursor: pointer;
    }

    ha-icon-button ha-icon::after {
        content: attr(data-days, "");
        position: absolute;
        top: calc( 50% + 5px );
        left: 0px;
        transform: translateY(-50%);
        width: 100%;
        font-size: 10px;
    }
    
    .sub_icon {
        width: 28px;
        height: 28px;
        display: block !important;
    }
    sub-icon-content ha-icon::after {
        content: attr(data-days, "");
        position: absolute;
        top: calc( 50% - 2px );
        left: -2px;
        transform: translateY(-50%);
        width: 100%;
        font-size: 8px;
        text-align: center;
    }
    .sub_icon_button {
        // display: block;
        cursor: pointer;
        // background-color: rgb(0,0,0);
        // border-radius: 50%;
    }
    .sub_icon_button:hover {
        color: green;
    }
    .repeat_icon {
        color: var(--secondary-text-color);
        width: 28px;
        height: 28px;
        display: block !important;
    }
`;


//---- DATE ----
// https://stackoverflow.com/a/15289883/13597384
function $feccc7a5980a21d5$var$dateDiffInDays(a, b) {
    const _MS_PER_DAY = 86400000;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
function $feccc7a5980a21d5$var$relativeDays(isoDateString) {
    const today = new Date(Date.now());
    const dateB = new Date(Date.parse(isoDateString));
    return $feccc7a5980a21d5$var$dateDiffInDays(today, dateB);
}
function $feccc7a5980a21d5$export$6270e84457db9b38(isoDateString, local = "en", today = "today") {
    const diff_days = $feccc7a5980a21d5$var$relativeDays(isoDateString);
    const relativeTimeFormat = new Intl.RelativeTimeFormat(local, {
        style: "long"
    });
    if (diff_days === 0) return today;
    else return relativeTimeFormat.format(diff_days, "day");
}
function $feccc7a5980a21d5$export$629b0a497aa65267(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();
    return inputDate.getFullYear() === today.getFullYear() && inputDate.getMonth() === today.getMonth() && inputDate.getDate() === today.getDate();
}
function $feccc7a5980a21d5$export$fc5014aa3db48558(dateString) {
    const inputDate = new Date(dateString);
    const now = new Date();
    return inputDate < now;
}
function $feccc7a5980a21d5$export$416492d1a5f46c79(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    // Clear time part to ensure whole-day comparison
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    const millisecondsPerDay = 86400000;
    const diff = Math.abs(d2 - d1);
    return Math.floor(diff / millisecondsPerDay);
}


class $a399cc6bbb0eb26a$export$5cbd5455d3b33941 extends (0, $ab210b2da7b39b9d$export$3f2f9f5909897157) {
    static{
        this.keys = [
            "mark_watered",
            "todo",
            "problem",
            "last_watered",
            "picture",
            "status",
            "days_between_waterings",
            "health",
            "next_watering",
            "mark_fertilized",
            "fertilization_problem",
            "fertilization_todo",
            "feed_method",
            "days_between_fertilizations",
            "last_fertilized",
            "next_fertilization",
            "misting_enabled",
            "cleaning_enabled",
            "misting_problem",
            "cleaning_problem",
            "misting_todo",
            "cleaning_todo",
            "next_misting",
            "next_cleaning",
            "days_between_mistings",
            "days_between_cleanings",
            "illumination",
            "mark_misted",
            "mark_cleaned",
            "last_misted",
            "last_cleaned",
            "current_humidity",
            "current_temperature",
            "current_light",
            "size",
            "location",
            "soil_type",
            "distance_to_window",
            "pot_diameter",
            "species",
            "notes",
            "plant_age_days"
        ];
    }
    set hass(hass) {
        // Triggered everytime a state change and more
        this._hass = hass;
        if (this._plant_card_el) this._plant_card_el.hass = hass;
        this._update_entites();
    }
    static{
        // Reactive properties, a change on one of those triggers a re-render
        this.properties = {
            _device_id: {
                type: String,
                state: true
            },
            _translations_loaded: {
                type: Boolean,
                state: true
            },
            _activity_dialog_open: {
                type: Boolean,
                state: true
            },
            _notes_dialog_open: {
                type: Boolean,
                state: true
            },
            _new_note: {
                type: String,
                state: true
            },
            _confirm_dialog_open: {
                type: Boolean,
                state: true
            },
            _confirm_action: {
                type: String,
                state: true
            },
            _confirm_message: {
                type: String,
                state: true
            },
            _details_dialog_open: {
                type: Boolean,
                state: true
            },
            _edit_acquisition_date: {
                type: String,
                state: true
            },
            _edit_distance_to_window: {
                type: String,
                state: true
            },
            _edit_pot_diameter: {
                type: String,
                state: true
            },
            _edit_humidity_sensor: {
                type: String,
                state: true
            },
            _edit_temperature_sensor: {
                type: String,
                state: true
            },
            _edit_light_sensor: {
                type: String,
                state: true
            },
            _overview_task_dialog_open: {
                type: Boolean,
                state: true
            },
            _overview_task_type: {
                type: String,
                state: true
            },
            _overview_task_title: {
                type: String,
                state: true
            },
            _overview_task_items: {
                type: Array,
                state: true
            },
            _plant_dialog_open: {
                type: Boolean,
                state: true
            },
            _plant_dialog_device: {
                type: String,
                state: true
            },
            _states_updated: {
                type: Boolean,
                state: true,
                hasChanged (newVal, _oldVal) {
                    return newVal // Only re-render if _states_updated is true
                    ;
                }
            }
        };
    }
    static{
        this.styles = (0, $13632afec4749c69$export$9dd6ff9ea0189349);
    }
    setConfig(config) {
        // Triggers everytime the config of the card change
        if (!config.device && config.mode !== "overview") throw new Error("You need to define a name");
        const merged = {
            mode: "device",
            overview_filter: "overdue",
            show_misting: true,
            show_cleaning: true,
            show_activity: true,
            show_details: true,
            show_notes: true,
            ...config
        };
        this._config = merged;
        this._device_id = merged.device;
        // while editing the entity in the card editor
        if (this._hass) this.hass = this._hass;
        this._config_updated = true;
    }
    _moreInfo(entity_key) {
        const event = new CustomEvent("hass-more-info", {
            bubbles: true,
            composed: true,
            detail: {
                entityId: this._entity_ids[entity_key],
                view: 'info'
            }
        });
        this.dispatchEvent(event);
    }
    _navigateToDevice(deviceId) {
        window.history.pushState(null, "", `/config/devices/device/${deviceId}`);
        window.dispatchEvent(new Event("location-changed"));
    }
    _openActivityDialog() {
        this._activity_dialog_open = true;
    }
    _closeActivityDialog() {
        this._activity_dialog_open = false;
    }
    _openNotesDialog() {
        this._notes_dialog_open = true;
    }
    _closeNotesDialog() {
        this._notes_dialog_open = false;
        this._new_note = "";
    }
    _openConfirm(action) {
        this._confirm_action = action;
        this._confirm_message = this._buildConfirmMessage(action);
        this._confirm_dialog_open = true;
    }
    _buildConfirmMessage(action) {
        const plant = this._device_name || "";
        const actionLabelMap = {
            water: this._translations["action_water"] || "watered",
            feed: this._translations["action_feed"] || "fertilized",
            mist: this._translations["action_mist"] || "misted",
            clean: this._translations["action_clean"] || "cleaned"
        };
        const actionLabel = actionLabelMap[action] || action;
        return `${plant} ${this._translations["confirm_mark"] || "mark as"} ${actionLabel}`;
    }
    _closeConfirm() {
        this._confirm_dialog_open = false;
        this._confirm_action = null;
        this._confirm_message = "";
    }
    _openDetailsDialog() {
        const getAttr = (key, attr)=>this._entity_states.get(key)?.attributes?.[attr];
        const getState = (key)=>this._entity_states.get(key)?.state;
        this._edit_acquisition_date = getAttr("status", "acquisition_date") || "";
        this._edit_distance_to_window = getState("distance_to_window") || "";
        this._edit_pot_diameter = getState("pot_diameter") || "";
        this._edit_humidity_sensor = getAttr("status", "humidity_sensor") || "";
        this._edit_temperature_sensor = getAttr("status", "temperature_sensor") || "";
        this._edit_light_sensor = getAttr("status", "light_sensor") || "";
        this._details_dialog_open = true;
    }
    _closeDetailsDialog() {
        this._details_dialog_open = false;
    }
    _updateConfigField(field, value) {
        const entityId = this._entity_ids["status"] || this._entity_ids["notes"];
        const payload = {
            device_id: this._device_id,
            [field]: value
        };
        if (entityId) payload.entity_id = entityId;
        this._hass.callService("simple_plant_extended", "update_config", payload);
    }
    _updateNumberField(key, value) {
        const entityId = this._entity_ids[key];
        if (!entityId) return;
        const parsed = parseFloat(value);
        if (Number.isNaN(parsed)) return;
        this._hass.callService("number", "set_value", {
            entity_id: entityId,
            value: parsed
        });
    }
    _confirmProceed() {
        if (this._confirm_action) this._handleButton(this._confirm_action);
        this._closeConfirm();
    }
    _updateNewNote(ev) {
        this._new_note = ev.target.value;
    }
    async _addNote() {
        const note = this._new_note.trim();
        if (!note) return;
        this._hass.callService("simple_plant_extended", "add_note", {
            entity_id: this._entity_ids["notes"],
            note: note
        });
        this._new_note = "";
    }
    // Create card and its content
    render() {
        const mode = this._config?.mode ?? "device";
        if (mode === "overview") return this._renderOverview();
        if (this._config_updated) {
            // Re fetching device specific information
            this._get_friendly_name();
            this._fetch_entities();
            this._config_updated = false;
        }
        // Updating states
        if (!this._entity_states.size) this._update_entites();
        this._states_updated = false; // resetting for future use
        this._loadTranslations();
        // compute strings
        const local = this._hass.language;
        const today = this._translations["today"];
        const show_misting = this._config?.show_misting ?? true;
        const show_cleaning = this._config?.show_cleaning ?? true;
        const show_activity = this._config?.show_activity ?? true;
        const show_details = this._config?.show_details ?? true;
        const show_notes = this._config?.show_notes ?? true;
        const getEntity = (key)=>this._entity_states.get(key);
        const normalize = (value)=>{
            if (!value || value === "unknown" || value === "unavailable") return "";
            return value;
        };
        const getState = (key)=>normalize(getEntity(key)?.state);
        const getAttr = (key, attr)=>getEntity(key)?.attributes?.[attr];
        const getStatusAttr = (attr)=>getAttr("status", attr);
        const titleCase = (value)=>value.replace(/_/g, " ").replace(/\b\w/g, (char)=>char.toUpperCase());
        const localizeSelectState = (key, value)=>{
            const translationKey = `component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.entity.select.${key}.state.${value}`;
            const localized = this._hass.localize(translationKey);
            if (!localized || localized === translationKey) return titleCase(value);
            return localized;
        };
        const localizeEntityName = (domain, key, fallback)=>{
            const translationKey = `component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.entity.${domain}.${key}.name`;
            const localized = this._hass.localize(translationKey);
            if (!localized || localized === translationKey) return fallback;
            return localized;
        };
        const localizeConfigLabel = (key, fallback)=>{
            const configKey = `component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.config.step.user.data.${key}`;
            const optionsKey = `component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.options.step.plant.data.${key}`;
            const configLocalized = this._hass.localize(configKey);
            if (configLocalized && configLocalized !== configKey) return configLocalized;
            const optionsLocalized = this._hass.localize(optionsKey);
            if (optionsLocalized && optionsLocalized !== optionsKey) return optionsLocalized;
            return fallback;
        };
        const formatAge = (daysValue)=>{
            const days = parseInt(daysValue, 10);
            if (Number.isNaN(days) || days < 0) return "";
            const years = Math.floor(days / 365);
            const months = Math.floor(days % 365 / 30);
            const parts = [];
            if (years > 0) parts.push(`${years}y`);
            parts.push(`${months}m`);
            return parts.join(" ");
        };
        //HEALTH Constants
        const health_key_prefix = "component.simple_plant_extended.entity.select.health.state";
        const health_key = `${health_key_prefix}.${this._entity_states.get("health").state}`;
        const health = this._hass.localize(health_key);
        const healthColor = this._entity_states.get("health").attributes.color;
        //WATERING Constants
        const days_between_label = this._entity_states.get("days_between_waterings").attributes.friendly_name;
        const days_between_value = parseInt(this._entity_states.get("days_between_waterings").state);
        const next_date = this._entity_states.get("next_watering").state;
        const watering_can_color = this._entity_states.get("next_watering").attributes.color;
        const late = this._entity_states.get("problem").state === "on";
        const days_until_watering = (0, $feccc7a5980a21d5$export$416492d1a5f46c79)(new Date(), next_date);
        const water_todo = this._entity_states.get("todo").state === "on";
        //FEED Constants
        const next_feed_date = this._entity_states.get("next_fertilization").state;
        const late_feed = this._entity_states.get("fertilization_problem").state === "on";
        const feed_method_state = String(this._entity_states.get("feed_method").state);
        const feed_method = localizeSelectState("feed_method", feed_method_state);
        const feed_interval = this._entity_states.get("days_between_fertilizations").state;
        const feed_icon_color = this._entity_states.get("next_fertilization").attributes.color;
        const days_until_feed = (0, $feccc7a5980a21d5$export$416492d1a5f46c79)(new Date(), next_feed_date);
        const feed_todo = (0, $feccc7a5980a21d5$export$629b0a497aa65267)(next_feed_date) || this._entity_states.get("fertilization_problem").state === "on";
        //CARE Constants
        const next_clean_date = this._entity_states.get("next_cleaning").state;
        const next_mist_date = this._entity_states.get("next_misting").state;
        const mist = this._entity_states.get("misting_enabled").state;
        const clean = this._entity_states.get("cleaning_enabled").state;
        const mist_label = localizeEntityName("select", "misting_enabled", "Mist");
        const clean_label = localizeEntityName("select", "cleaning_enabled", "Clean");
        const mist_state_label = localizeSelectState("misting_enabled", String(mist));
        const clean_state_label = localizeSelectState("cleaning_enabled", String(clean));
        const mist_enabled = String(mist) === "on";
        const clean_enabled = String(clean) === "on";
        const care_mist_class = mist == 'on' ? "" : "hidden";
        const care_clean_class = clean == 'on' ? "" : "hidden";
        const mist_interval = parseInt(this._entity_states.get("days_between_mistings").state);
        const clean_interval = parseInt(this._entity_states.get("days_between_cleanings").state);
        const now = new Date();
        const days_until_clean = (0, $feccc7a5980a21d5$export$416492d1a5f46c79)(now, next_clean_date);
        const days_until_mist = (0, $feccc7a5980a21d5$export$416492d1a5f46c79)(now, next_mist_date);
        const late_clean = this._entity_states.get("cleaning_problem").state === "on";
        const late_mist = this._entity_states.get("misting_problem").state === "on";
        const clean_icon_color = late_clean ? "Tomato" : (0, $feccc7a5980a21d5$export$629b0a497aa65267)(next_clean_date) ? "Goldenrod" : "white";
        const mist_icon_color = late_mist ? "Tomato" : (0, $feccc7a5980a21d5$export$629b0a497aa65267)(next_mist_date) ? "Goldenrod" : "white";
        const clean_todo = this._entity_states.get("cleaning_todo").state === "on";
        const mist_todo = this._entity_states.get("misting_todo").state === "on";
        //DETAILS Constants
        const light_state = this._entity_states.get("illumination").state.toLowerCase();
        const light_key_prefix = "component.simple_plant_extended.entity.select.illumination.state";
        const light_key = `${light_key_prefix}.${this._entity_states.get("illumination").state}`;
        const light = this._hass.localize(light_key);
        const light_color = light_state === "sunny" ? "gold" : light_state === "partly_sunny" ? "darkgoldenrod" : "dimgrey";
        const light_icon = light_state == 'sunny' ? "mdi:white-balance-sunny" : light_state == 'partly_sunny' ? "mdi:weather-partly-cloudy" : light_state == 'shade' ? "mdi:weather-cloudy" : "mdi:theme-light-dark";
        const activityLog = getEntity("status")?.attributes?.activity_log;
        const activityItems = Array.isArray(activityLog) ? activityLog : [];
        const formatAction = (action)=>action.replace(/_/g, " ");
        const notesLog = getEntity("status")?.attributes?.notes_log;
        const notesItems = Array.isArray(notesLog) ? notesLog : [];
        const currentHumidity = this._edit_humidity_sensor || "";
        const currentTemperature = this._edit_temperature_sensor || "";
        const currentLight = this._edit_light_sensor || "";
        const otherHumiditySensors = new Set([
            currentTemperature,
            currentLight
        ].filter((value)=>Boolean(value)));
        const otherTemperatureSensors = new Set([
            currentHumidity,
            currentLight
        ].filter((value)=>Boolean(value)));
        const otherLightSensors = new Set([
            currentHumidity,
            currentTemperature
        ].filter((value)=>Boolean(value)));
        const sensorStates = Object.values(this._hass.states || {}).filter((state)=>state?.entity_id?.startsWith("sensor."));
        const toOption = (state)=>({
                id: state.entity_id,
                name: state.attributes?.friendly_name || state.entity_id
            });
        const sensorOptionsHumidity = sensorStates.filter((state)=>state.attributes?.device_class === "humidity").filter((state)=>!otherHumiditySensors.has(state.entity_id)).map(toOption).sort((a, b)=>a.name.localeCompare(b.name));
        const sensorOptionsTemperature = sensorStates.filter((state)=>state.attributes?.device_class === "temperature").filter((state)=>!otherTemperatureSensors.has(state.entity_id)).map(toOption).sort((a, b)=>a.name.localeCompare(b.name));
        const sensorOptionsLight = sensorStates.filter((state)=>state.attributes?.device_class === "illuminance").filter((state)=>!otherLightSensors.has(state.entity_id)).map(toOption).sort((a, b)=>a.name.localeCompare(b.name));
        const notSetLabel = this._translations["not_set"] || "\u2014";
        const detailItems = [
            {
                label: localizeEntityName("text", "species", "Species"),
                key: "species",
                value: getState("species"),
                type: "readonly"
            },
            {
                label: localizeEntityName("select", "size", "Size"),
                key: "size",
                value: getState("size") ? localizeSelectState("size", getState("size")) : "",
                type: "editable"
            },
            {
                label: localizeEntityName("select", "location", "Location"),
                key: "location",
                value: getState("location") ? localizeSelectState("location", getState("location")) : "",
                type: "editable"
            },
            {
                label: localizeEntityName("select", "soil_type", "Soil"),
                key: "soil_type",
                value: getState("soil_type") ? localizeSelectState("soil_type", getState("soil_type")) : "",
                type: "editable"
            },
            {
                label: localizeEntityName("number", "distance_to_window", "Distance"),
                key: "distance_to_window",
                value: getState("distance_to_window"),
                unit: getAttr("distance_to_window", "unit_of_measurement"),
                type: "editable"
            },
            {
                label: localizeEntityName("number", "pot_diameter", "Pot"),
                key: "pot_diameter",
                value: getState("pot_diameter"),
                unit: getAttr("pot_diameter", "unit_of_measurement"),
                type: "editable"
            },
            {
                label: localizeEntityName("sensor", "current_humidity", "Humidity"),
                key: "current_humidity",
                value: getState("current_humidity"),
                unit: getAttr("current_humidity", "unit_of_measurement"),
                type: "readonly"
            },
            {
                label: localizeEntityName("sensor", "current_temperature", "Temperature"),
                key: "current_temperature",
                value: getState("current_temperature"),
                unit: getAttr("current_temperature", "unit_of_measurement"),
                type: "readonly"
            },
            {
                label: localizeEntityName("sensor", "current_light", "Light"),
                key: "current_light",
                value: getState("current_light"),
                unit: getAttr("current_light", "unit_of_measurement"),
                type: "readonly"
            },
            {
                label: localizeEntityName("sensor", "plant_age_days", "Age"),
                key: "plant_age_days",
                value: formatAge(getState("plant_age_days")),
                type: "readonly"
            }
        ].filter((item)=>item.value);
        const detailItemsAll = [
            {
                label: localizeEntityName("text", "species", "Species"),
                key: "species",
                value: getState("species"),
                type: "readonly"
            },
            {
                label: localizeEntityName("text", "notes", "Notes"),
                key: "notes",
                value: getState("notes"),
                type: "editable"
            },
            {
                label: localizeEntityName("select", "size", "Size"),
                key: "size",
                value: getState("size") ? localizeSelectState("size", getState("size")) : "",
                type: "editable"
            },
            {
                label: localizeEntityName("select", "location", "Location"),
                key: "location",
                value: getState("location") ? localizeSelectState("location", getState("location")) : "",
                type: "editable"
            },
            {
                label: localizeEntityName("select", "soil_type", "Soil"),
                key: "soil_type",
                value: getState("soil_type") ? localizeSelectState("soil_type", getState("soil_type")) : "",
                type: "editable"
            }
        ];
        // return card
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <ha-card>
                <div class="card-content">
                    <div class="img-header"></div>
                        <hui-image
                            .hass=${this._hass}
                            .entity=${this._entity_ids["picture"]}
                            .fitMode=${"cover"}
                            @click="${()=>this._moreInfo("picture")}"
                        ></hui-image>
                        <ha-icon-button class="floating-icon-button"
                            .label=${days_between_label}
                            @click="${()=>this._moreInfo("days_between_waterings")}"
                        >
                            <ha-icon
                                data-days="${days_between_value}"
                                .icon=${"mdi:calendar-blank"}></ha-icon>
                        </ha-icon-button>
                    </div>
                    <div class="info">
                        <div class="title-row">
                            <h1 @click="${()=>this._navigateToDevice(this._device_id)}">
                                ${this._device_name}
                            </h1>
                            ${show_activity ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                                <ha-icon-button class="activity-button" @click="${()=>this._openActivityDialog()}">
                                    <ha-icon .icon=${"mdi:timeline"}></ha-icon>
                                </ha-icon-button>
                            ` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}
                        </div>
                        <div class="border_row">
                            <div class="row sub_content water_info">
                                <span class="action-icon clickable" @click=${()=>this._openConfirm("water")}>
                                    <ha-icon
                                        data-color
                                        style="--color: ${watering_can_color};"
                                        .icon=${"mdi:watering-can"}
                                    ></ha-icon>
                                </span>
                                <div class="grow">
                                    <div class="content">
                                        <p class="">${this._translations["watering"] || "Watering"}</p>
                                    </div>
                                </div>
                                <div class="right-actions">
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon repeat_icon sub_icon_button" @click="${()=>this._moreInfo("days_between_waterings")}" 
                                            data-days="${String(days_between_value)}"
                                            .icon=${"mdi:repeat"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon"
                                            data-color
                                            style="--color: ${watering_can_color};"
                                            data-days="${late ? 0 - days_until_watering : days_until_watering}"
                                            .icon=${"mdi:calendar-blank"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                </div>
                            </div>


                            <div class="row sub_content feed_info">
                                <span class="action-icon clickable" @click=${()=>this._openConfirm("feed")}>
                                    <ha-icon
                                        data-color
                                        style="--color: ${feed_icon_color};"
                                        .icon=${"mdi:seed"}
                                    ></ha-icon>
                                </span>
                                <div class="grow">
                                    <div class="content" @click="${()=>this._moreInfo("feed_method")}">
                                        <p class=" sub_icon_button">${feed_method}</p>
                                    </div>
                                </div>
                                <div class="sub_content_conditional right-actions">
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon repeat_icon sub_icon_button" @click="${()=>this._moreInfo("days_between_fertilizations")}" 
                                            data-days="${parseInt(feed_interval)}"
                                            .icon=${"mdi:repeat"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon"
                                            data-color
                                            style="--color: ${feed_icon_color};"
                                            data-days="${late_feed ? 0 - days_until_feed : days_until_feed}"
                                            .icon=${"mdi:calendar-blank"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                </div>
                            </div>

                            ${show_misting ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                            <div class="row sub_content mist_info ${mist_enabled ? "status-on" : "status-off"}">
                                <span class="action-icon clickable" @click=${()=>this._openConfirm("mist")}>
                                    <ha-icon
                                        .icon=${"mdi:spray-bottle"}
                                        data-color
                                        style="--color: ${mist_icon_color};"
                                    ></ha-icon>
                                </span>
                                <div class="grow">
                                    <div class="content sub_icon_button" @click="${()=>this._moreInfo("misting_enabled")}">
                                        <p class="">${mist_label}</p>
                                    </div>
                                    <span class="status-pill ${mist_enabled ? "is-on" : "is-off"}">
                                        ${mist_state_label}
                                    </span>
                                </div>
                                <div class="sub_content_conditional ${care_mist_class} right-actions">
                                    <sub-icon-content @click="${()=>this._moreInfo("days_between_mistings")}">
                                        <ha-icon class="sub_icon repeat_icon sub_icon_button"
                                            data-days="${late_mist ? 0 - mist_interval : mist_interval}"
                                            .icon=${"mdi:repeat"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                    <sub-icon-content>
                                        <ha-icon class="sub_icon"
                                            data-color
                                            style="--color: ${mist_icon_color};"
                                            data-days="${days_until_mist}"
                                            .icon=${"mdi:calendar-blank"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                </div>
                            </div>
                            ` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}

                            ${show_cleaning ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                            <div class="row sub_content clean_info ${clean_enabled ? "status-on" : "status-off"}">
                                <span class="action-icon clickable" @click=${()=>this._openConfirm("clean")}>
                                    <ha-icon
                                        .icon=${"mdi:liquid-spot"}
                                        data-color
                                        style="--color: ${clean_icon_color};"
                                    ></ha-icon>
                                </span>
                                <div class="grow">
                                    <div class="content sub_icon_button" @click="${()=>this._moreInfo("cleaning_enabled")}">
                                        <p class="">${clean_label}</p>
                                    </div>
                                    <span class="status-pill ${clean_enabled ? "is-on" : "is-off"}">
                                        ${clean_state_label}
                                    </span>
                                </div>
                                <div class="sub_content_conditional ${care_clean_class} right-actions">
                                    <sub-icon-content @click="${()=>this._moreInfo("days_between_cleanings")}">
                                        <ha-icon class="sub_icon repeat_icon sub_icon_button"
                                            data-days="${late_clean ? 0 - clean_interval : clean_interval}"
                                            .icon=${"mdi:repeat"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                    <sub-icon-content >
                                        <ha-icon class="sub_icon"
                                            data-color
                                            style="--color: ${clean_icon_color};"
                                            data-days="${days_until_clean}"
                                            .icon=${"mdi:calendar-blank"}>
                                        </ha-icon>
                                    </sub-icon-content>
                                </div>
                            </div>
                            ` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}
                        </div>
                        <div class="border_row">
                            <div class="row">
                                <ha-icon
                                    .icon=${light_icon}
                                    data-color
                                    style="--color: ${light_color};"
                                ></ha-icon>
                                <div class="content sub_icon_button" @click="${()=>this._moreInfo("illumination")}">
                                    <p>${light}</p>
                                </div>
                            </div>
                        </div>
                        <div class="border_row">
                            <div class="row">
                                <ha-icon
                                    .icon=${"mdi:heart-pulse"}
                                    data-color
                                    style="--color: ${healthColor};"
                                ></ha-icon>
                                <div class="content sub_icon_button" @click="${()=>this._moreInfo("health")}">
                                    <p>${health}</p>
                                </div>
                            </div>
                        </div>
                        ${show_notes ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                        <div class="border_row">
                            <div class="row notes-row" @click=${this._openNotesDialog}>
                                <ha-icon .icon=${"mdi:note-text"}></ha-icon>
                                <div class="content">
                                    <p>${this._translations["notes"] || "Notes"}</p>
                                    <div class="notes-preview">
                                        ${getState("notes") || this._translations["no_notes"] || "No notes"}
                                    </div>
                                </div>
                                <ha-icon class="detail-edit-icon" .icon=${"mdi:chevron-right"}></ha-icon>
                            </div>
                        </div>
                        ` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}
                        ${show_details ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                        <div class="border_row">
                            <div class="section-title">${this._translations["details"] || "Details"}</div>
                            <div class="details-grid">
                                ${detailItems.map((item)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                                    <div class="detail-item">
                                        <div class="detail-label">${item.label}</div>
                                        <div
                                            class="detail-value ${item.type === "editable" ? "detail-value-editable" : ""}"
                                            @click=${()=>item.type === "editable" ? this._moreInfo(item.key) : undefined}
                                        >
                                            ${item.value}${item.unit ? ` ${item.unit}` : ""}
                                            ${item.type === "editable" ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<ha-icon class="detail-edit-icon" .icon=${"mdi:pencil"}></ha-icon>` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}
                                        </div>
                                    </div>
                                `)}
                            </div>
                        </div>
                        ` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}
                        <mwc-button class="details-button" @click=${()=>this._openDetailsDialog()}>
                            ${this._translations["more_details"] || "More details"}
                        </mwc-button>
                    </div>
                </div>
            </ha-card>
            <ha-dialog .open=${this._activity_dialog_open} @closed=${this._closeActivityDialog}>
                <div slot="heading">${this._translations["activity"] || "Activity"}</div>
                <div class="activity-list">
                    ${activityItems.length ? activityItems.map((item)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                        <div class="activity-item">
                            <div class="activity-time">${(0, $feccc7a5980a21d5$export$6270e84457db9b38)(item.timestamp, local, today)}</div>
                            <div class="activity-action">${formatAction(item.action || "")}</div>
                            ${item.note ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="activity-note">${item.note}</div>` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}
                            ${item.old && item.new ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="activity-change">${item.old} → ${item.new}</div>` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}
                        </div>
                    `) : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="activity-empty">${this._translations["no_activity"] || "No activity yet"}</div>`}
                </div>
                <mwc-button slot="primaryAction" @click=${this._closeActivityDialog}>
                    ${this._translations["close"] || "Close"}
                </mwc-button>
            </ha-dialog>
            <ha-dialog .open=${this._notes_dialog_open} @closed=${this._closeNotesDialog}>
                <div slot="heading">${this._translations["notes"] || "Notes"}</div>
                <div class="activity-list">
                    ${notesItems.length ? notesItems.map((item)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                        <div class="activity-item">
                            <div class="activity-time">${(0, $feccc7a5980a21d5$export$6270e84457db9b38)(item.timestamp, local, today)}</div>
                            <div class="activity-note">${item.note}</div>
                        </div>
                    `) : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="activity-empty">${this._translations["no_notes"] || "No notes"}</div>`}
                </div>
                <div class="notes-input">
                    <ha-textfield
                        .value=${this._new_note}
                        .label=${this._translations["add_note"] || "Add note"}
                        @input=${this._updateNewNote}
                    ></ha-textfield>
                    <mwc-button @click=${this._addNote}>${this._translations["add"] || "Add"}</mwc-button>
                </div>
                <mwc-button slot="primaryAction" @click=${this._closeNotesDialog}>
                    ${this._translations["close"] || "Close"}
                </mwc-button>
            </ha-dialog>
            <ha-dialog .open=${this._confirm_dialog_open} @closed=${this._closeConfirm}>
                <div slot="heading">${this._translations["confirm_title"] || "Confirm"}</div>
                <div class="confirm-body">${this._confirm_message}</div>
                <div class="confirm-actions">
                    <mwc-button class="confirm-button secondary" @click=${this._closeConfirm}>
                        ${this._translations["cancel"] || "Cancel"}
                    </mwc-button>
                    <mwc-button class="confirm-button primary" @click=${this._confirmProceed}>
                        ${this._translations["confirm"] || "Confirm"}
                    </mwc-button>
                </div>
            </ha-dialog>
            <ha-dialog .open=${this._details_dialog_open} @closed=${this._closeDetailsDialog}>
                <div slot="heading">${this._translations["details"] || "Details"}</div>
                <div class="details-edit">
                    <label class="details-select-label">
                        ${localizeConfigLabel("acquisition_date", "Acquisition date")}
                    </label>
                    <input
                        class="details-input"
                        type="date"
                        .value=${this._edit_acquisition_date}
                        @input=${(ev)=>{
            this._edit_acquisition_date = ev.target.value;
        }}
                        @change=${(ev)=>{
            const value = ev.target.value;
            this._edit_acquisition_date = value;
            this._updateConfigField("acquisition_date", value);
        }}
                    />
                    <label class="details-select-label">
                        ${localizeEntityName("number", "distance_to_window", "Distance")}
                    </label>
                    <input
                        class="details-input"
                        type="number"
                        .value=${this._edit_distance_to_window}
                        @input=${(ev)=>{
            this._edit_distance_to_window = ev.target.value;
        }}
                        @change=${(ev)=>{
            const value = ev.target.value;
            this._edit_distance_to_window = value;
            this._updateNumberField("distance_to_window", value);
        }}
                    />
                    <label class="details-select-label">
                        ${localizeEntityName("number", "pot_diameter", "Pot")}
                    </label>
                    <input
                        class="details-input"
                        type="number"
                        .value=${this._edit_pot_diameter}
                        @input=${(ev)=>{
            this._edit_pot_diameter = ev.target.value;
        }}
                        @change=${(ev)=>{
            const value = ev.target.value;
            this._edit_pot_diameter = value;
            this._updateNumberField("pot_diameter", value);
        }}
                    />
                    <label class="details-select-label">
                        ${localizeConfigLabel("humidity_sensor", "Humidity sensor")}
                    </label>
                    <select
                        class="details-select"
                        .value=${this._edit_humidity_sensor || ""}
                        @change=${(ev)=>{
            const value = ev.target.value;
            this._edit_humidity_sensor = value;
            this._updateConfigField("humidity_sensor", value);
        }}
                    >
                        <option value="">${notSetLabel}</option>
                        ${sensorOptionsHumidity.map((opt)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                            <option value=${opt.id}>${opt.name}</option>
                        `)}
                    </select>
                    <label class="details-select-label">
                        ${localizeConfigLabel("temperature_sensor", "Temperature sensor")}
                    </label>
                    <select
                        class="details-select"
                        .value=${this._edit_temperature_sensor || ""}
                        @change=${(ev)=>{
            const value = ev.target.value;
            this._edit_temperature_sensor = value;
            this._updateConfigField("temperature_sensor", value);
        }}
                    >
                        <option value="">${notSetLabel}</option>
                        ${sensorOptionsTemperature.map((opt)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                            <option value=${opt.id}>${opt.name}</option>
                        `)}
                    </select>
                    <label class="details-select-label">
                        ${localizeConfigLabel("light_sensor", "Light sensor")}
                    </label>
                    <select
                        class="details-select"
                        .value=${this._edit_light_sensor || ""}
                        @change=${(ev)=>{
            const value = ev.target.value;
            this._edit_light_sensor = value;
            this._updateConfigField("light_sensor", value);
        }}
                    >
                        <option value="">${notSetLabel}</option>
                        ${sensorOptionsLight.map((opt)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                            <option value=${opt.id}>${opt.name}</option>
                        `)}
                    </select>
                </div>
                <div class="details-list">
                    ${detailItemsAll.map((item)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                        <div class="details-row ${item.type === "editable" ? "detail-clickable" : ""}" @click=${()=>item.type === "editable" ? this._moreInfo(item.key) : undefined}>
                            <div class="details-row-label">${item.label}</div>
                            <div class="details-row-value">
                                ${item.value ? `${item.value}${item.unit ? ` ${item.unit}` : ""}` : this._translations["not_set"] || "\u2014"}
                            </div>
                        </div>
                    `)}
                </div>
                <mwc-button slot="primaryAction" @click=${this._closeDetailsDialog}>
                    ${this._translations["close"] || "Close"}
                </mwc-button>
            </ha-dialog>
        `;
    }
    _renderOverview() {
        if (!this._hass) return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``;
        this._loadTranslations();
        const filter = this._config?.overview_filter ?? "overdue";
        const deviceEntitiesMap = new Map();
        for (const entity of Object.values(this._hass.entities || {}))if (entity?.entity_id && entity?.device_id) {
            const list = deviceEntitiesMap.get(entity.device_id) || [];
            list.push(entity.entity_id);
            deviceEntitiesMap.set(entity.device_id, list);
        }
        const taskDefs = this._getTaskDefs();
        const deviceStats = new Map();
        const deviceTaskCounts = new Map();
        const totals = {
            overdue: 0,
            today: 0
        };
        const taskCounts = new Map();
        const devices = Object.values(this._hass.devices || {});
        const findEntityId = (entities, prefix)=>entities.find((id)=>id.startsWith(prefix));
        const isTaskEnabled = (entities, taskKey)=>{
            if (taskKey === "mist") {
                const id = findEntityId(entities, "select.simple_plant_extended_misting_enabled_");
                return !id || this._hass.states[id]?.state === "on";
            }
            if (taskKey === "clean") {
                const id = findEntityId(entities, "select.simple_plant_extended_cleaning_enabled_");
                return !id || this._hass.states[id]?.state === "on";
            }
            return true;
        };
        for (const device of devices){
            const entities = deviceEntitiesMap.get(device.id) || [];
            const stats = {
                overdue: 0,
                today: 0
            };
            const perTask = new Map();
            let hasTask = false;
            for (const def of taskDefs){
                if (!isTaskEnabled(entities, def.key)) continue;
                const problemId = findEntityId(entities, def.problemPrefix);
                const todoId = findEntityId(entities, def.todoPrefix);
                const isProblem = problemId && this._hass.states[problemId]?.state === "on";
                const isTodo = todoId && this._hass.states[todoId]?.state === "on" && !isProblem;
                if (!isProblem && !isTodo) continue;
                hasTask = true;
                const taskStats = perTask.get(def.key) || {
                    overdue: 0,
                    today: 0
                };
                const typeCounts = taskCounts.get(def.key) || {
                    overdue: 0,
                    today: 0
                };
                if (isProblem) {
                    stats.overdue += 1;
                    totals.overdue += 1;
                    taskStats.overdue += 1;
                    typeCounts.overdue += 1;
                }
                if (isTodo) {
                    stats.today += 1;
                    totals.today += 1;
                    taskStats.today += 1;
                    typeCounts.today += 1;
                }
                perTask.set(def.key, taskStats);
                taskCounts.set(def.key, typeCounts);
            }
            if (hasTask) {
                deviceStats.set(device.id, stats);
                deviceTaskCounts.set(device.id, perTask);
            }
        }
        const imageEntityByDevice = new Map();
        for (const entity of Object.values(this._hass.entities || {}))if (entity?.device_id && entity?.entity_id?.startsWith("image.simple_plant_extended_picture_")) imageEntityByDevice.set(entity.device_id, entity.entity_id);
        const rows = Array.from(deviceStats.entries()).map(([deviceId, stats])=>{
            if (filter === "overdue" && stats.overdue === 0) return null;
            if (filter === "today" && stats.today === 0) return null;
            const device = devices.find((d)=>d.id === deviceId);
            const name = device?.name || deviceId;
            const imageEntityId = imageEntityByDevice.get(deviceId);
            const imageState = imageEntityId ? this._hass.states[imageEntityId] : undefined;
            const imageSrc = imageState?.attributes?.entity_picture ? this._hass.hassUrl ? this._hass.hassUrl(imageState.attributes.entity_picture) : imageState.attributes.entity_picture : "";
            const perTask = deviceTaskCounts.get(deviceId) || new Map();
            return {
                deviceId: deviceId,
                name: name,
                stats: stats,
                imageSrc: imageSrc,
                perTask: perTask
            };
        }).filter(Boolean);
        const taskPills = taskDefs.map((def)=>{
            const counts = taskCounts.get(def.key) || {
                overdue: 0,
                today: 0
            };
            const count = filter === "overdue" ? counts.overdue : filter === "today" ? counts.today : counts.overdue + counts.today;
            if (!count) return null;
            return {
                ...def,
                count: count
            };
        }).filter(Boolean);
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <ha-card>
                <div class="card-content">
                    <div class="info">
                        <div class="section-title overview-title">${this._translations["plant_tasks"] || "Plant tasks"}</div>
                        <div class="overview-summary">
                            ${filter !== "today" ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                                      <button class="overview-total-pill status-pill is-on" @click=${()=>this._openOverviewTotalsDialog("overdue")}>
                                          ${totals.overdue} ${this._translations["overdue"] || "Overdue"}
                                      </button>
                                  ` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}
                            ${filter !== "overdue" ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                                      <button class="overview-total-pill status-pill" @click=${()=>this._openOverviewTotalsDialog("today")}>
                                          ${totals.today} ${this._translations["today"] || "Today"}
                                      </button>
                                  ` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}
                        </div>
                        <div class="overview-task-pills">
                            ${taskPills.map((pill)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                                    <button class="overview-task-pill" @click=${()=>this._openOverviewTaskDialog(pill.key)}>
                                        <ha-icon class="overview-task-icon" .icon=${pill.icon}></ha-icon>
                                        <span class="overview-task-count">${pill.count}</span>
                                    </button>
                                `)}
                        </div>
                        <div class="details-list">
                            ${rows.length ? rows.map((row)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                                          <div class="details-row detail-clickable overview-row">
                                              <div class="overview-row-main">
                                                  <div class="overview-row-label" @click=${()=>this._openPlantDialog(row.deviceId)}>
                                                      ${row.imageSrc ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<img class="overview-plant-image" src=${row.imageSrc} alt="" />` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<ha-icon class="overview-plant-icon" .icon=${"mdi:flower"}></ha-icon>`}
                                                      <span class="overview-plant-name">${row.name}</span>
                                                  </div>
                                                  <div class="overview-subtitle">
                                                      <span class="overview-subtitle-text">
                                                          ${filter === "overdue" ? `${row.stats.overdue} ${this._translations["overdue"] || "Overdue"}` : filter === "today" ? `${row.stats.today} ${this._translations["today"] || "Today"}` : `${row.stats.overdue + row.stats.today} ${this._translations["tasks"] || "Tasks"}`}
                                                      </span>
                                                      <span class="overview-subtitle-line"></span>
                                                  </div>
                                                  <div class="overview-row-value">
                                                      ${taskDefs.map((def)=>{
                const counts = row.perTask.get(def.key) || {
                    overdue: 0,
                    today: 0
                };
                const count = filter === "overdue" ? counts.overdue : filter === "today" ? counts.today : counts.overdue + counts.today;
                if (!count) return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``;
                return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                                                              <button class="overview-task-pill" @click=${()=>this._openOverviewTaskDialog(def.key, row.deviceId)}>
                                                                  <ha-icon class="overview-task-icon" .icon=${def.icon}></ha-icon>
                                                                  <span class="overview-task-count">${count}</span>
                                                              </button>
                                                          `;
            })}
                                                  </div>
                                              </div>
                                          </div>
                                      `) : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="activity-empty">${this._translations["no_activity"] || "No activity yet"}</div>`}
                        </div>
                    </div>
                </div>
                <ha-dialog .open=${this._overview_task_dialog_open} @closed=${this._closeOverviewTaskDialog}>
                    <div slot="heading">${this._overview_task_title || this._translations["tasks"] || "Tasks"}</div>
                    ${this._overview_task_items.length ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                              <div class="overview-dialog-actions">
                                  <mwc-button @click=${this._markAllOverviewTasks}>
                                      ${this._translations["confirm"] || "Confirm"} ${this._translations["all"] || "All"}
                                  </mwc-button>
                              </div>
                          ` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}
                    <div class="details-list">
                        ${this._overview_task_items.length ? this._overview_task_items.map((item)=>(0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                                      <div class="details-row">
                                          <div class="details-row-label">
                                              ${item.name}
                                              ${item.taskLabel ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<span class="overview-task-row-label">${item.taskLabel}</span>` : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}
                                          </div>
                                          <div class="details-row-value">
                                              <span class="status-pill ${item.status === "overdue" ? "is-on" : ""}">
                                                  ${item.status === "overdue" ? this._translations["overdue"] || "Overdue" : this._translations["today"] || "Today"}
                                              </span>
                                              <ha-icon-button
                                                  class="overview-task-action"
                                                  .label=${this._translations["confirm"] || "Confirm"}
                                                  .disabled=${!item.actionEntityId}
                                                  @click=${(ev)=>{
                ev.stopPropagation();
                if (item.actionEntityId) this._pressActionButton(item.actionEntityId);
            }}
                                              >
                                                  <ha-icon .icon=${"mdi:check"}></ha-icon>
                                              </ha-icon-button>
                                          </div>
                                      </div>
                                  `) : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div class="activity-empty">${this._translations["no_activity"] || "No activity yet"}</div>`}
                    </div>
                    <mwc-button slot="primaryAction" @click=${this._closeOverviewTaskDialog}>
                        ${this._translations["close"] || "Close"}
                    </mwc-button>
                </ha-dialog>
                <ha-dialog .open=${this._plant_dialog_open} @closed=${this._closePlantDialog}>
                    <div slot="heading">${this._plant_dialog_device || ""}</div>
                    ${this._plant_card_el ? this._plant_card_el : (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)``}
                    <mwc-button slot="primaryAction" @click=${this._closePlantDialog}>
                        ${this._translations["close"] || "Close"}
                    </mwc-button>
                </ha-dialog>
            </ha-card>
        `;
    }
    async _openPlantDialog(deviceId) {
        const device = Object.values(this._hass.devices || {}).find((d)=>d.id === deviceId);
        this._plant_dialog_device = device?.name || deviceId;
        this._plant_dialog_open = true;
        if (!this._helpers) {
            const loader = window.loadCardHelpers;
            if (loader) this._helpers = await loader();
        }
        const config = {
            type: `custom:${(0, $3cb55e3e7ebd776a$export$31089ea8b3e502e3)}`,
            device: deviceId
        };
        if (this._helpers?.createCardElement) {
            this._plant_card_el = this._helpers.createCardElement(config);
            this._plant_card_el.hass = this._hass;
        }
    }
    _closePlantDialog() {
        this._plant_dialog_open = false;
    }
    _openOverviewTaskDialog(taskKey, deviceId) {
        this._overview_task_type = taskKey;
        const def = this._getTaskDef(taskKey);
        this._overview_task_title = def?.label || this._translations["tasks"] || "Tasks";
        this._overview_task_items = this._buildOverviewTaskItems(taskKey, undefined, deviceId);
        this._overview_task_dialog_open = true;
    }
    _openOverviewTotalsDialog(status) {
        this._overview_task_type = status;
        this._overview_task_title = status === "overdue" ? this._translations["overdue"] || "Overdue" : this._translations["today"] || "Today";
        this._overview_task_items = this._buildOverviewTaskItems(undefined, status);
        this._overview_task_dialog_open = true;
    }
    _closeOverviewTaskDialog() {
        this._overview_task_dialog_open = false;
        this._overview_task_type = null;
        this._overview_task_title = null;
        this._overview_task_items = [];
    }
    _buildOverviewTaskItems(taskKey, statusFilter, deviceIdFilter) {
        if (!this._hass) return [];
        const filter = this._config?.overview_filter ?? "overdue";
        const taskDefs = this._getTaskDefs();
        const def = taskKey ? taskDefs.find((item)=>item.key === taskKey) : null;
        const deviceEntitiesMap = new Map();
        for (const entity of Object.values(this._hass.entities || {}))if (entity?.entity_id && entity?.device_id) {
            const list = deviceEntitiesMap.get(entity.device_id) || [];
            list.push(entity.entity_id);
            deviceEntitiesMap.set(entity.device_id, list);
        }
        const devices = Object.values(this._hass.devices || {});
        const deviceSlugMap = new Map();
        for (const [deviceId, entities] of deviceEntitiesMap.entries()){
            const pictureEntity = entities.find((id)=>id.startsWith("image.simple_plant_extended_picture_"));
            if (pictureEntity) deviceSlugMap.set(deviceId, pictureEntity.replace("image.simple_plant_extended_picture_", ""));
        }
        const items = [];
        const findEntityId = (entities, prefix)=>entities.find((id)=>id.startsWith(prefix));
        const isTaskEnabled = (entities, key)=>{
            if (key === "mist") {
                const id = findEntityId(entities, "select.simple_plant_extended_misting_enabled_");
                return !id || this._hass.states[id]?.state === "on";
            }
            if (key === "clean") {
                const id = findEntityId(entities, "select.simple_plant_extended_cleaning_enabled_");
                return !id || this._hass.states[id]?.state === "on";
            }
            return true;
        };
        for (const device of devices){
            if (deviceIdFilter && device.id !== deviceIdFilter) continue;
            const entities = deviceEntitiesMap.get(device.id) || [];
            const defsToCheck = def ? [
                def
            ] : taskDefs;
            for (const itemDef of defsToCheck){
                if (!isTaskEnabled(entities, itemDef.key)) continue;
                const problemId = findEntityId(entities, itemDef.problemPrefix);
                const todoId = findEntityId(entities, itemDef.todoPrefix);
                let actionId = findEntityId(entities, itemDef.actionPrefix);
                if (!actionId) {
                    const slug = deviceSlugMap.get(device.id);
                    if (slug) actionId = `${itemDef.actionPrefix}${slug}`;
                }
                const isProblem = problemId && this._hass.states[problemId]?.state === "on";
                const isTodo = todoId && this._hass.states[todoId]?.state === "on" && !isProblem;
                if ((statusFilter === "overdue" || statusFilter == null && (filter === "overdue" || filter === "all")) && isProblem) items.push({
                    deviceId: device.id,
                    name: device.name,
                    status: "overdue",
                    actionEntityId: actionId,
                    taskLabel: itemDef.label
                });
                if ((statusFilter === "today" || statusFilter == null && (filter === "today" || filter === "all")) && isTodo) items.push({
                    deviceId: device.id,
                    name: device.name,
                    status: "today",
                    actionEntityId: actionId,
                    taskLabel: itemDef.label
                });
            }
        }
        return items;
    }
    _pressActionButton(entityId) {
        this._hass.callService("button", "press", {}, {
            entity_id: entityId
        });
    }
    _getTaskDefs() {
        return [
            {
                key: "water",
                label: this._translations["watering"] || "Watering",
                icon: "mdi:watering-can",
                problemPrefix: "binary_sensor.simple_plant_extended_problem_",
                todoPrefix: "binary_sensor.simple_plant_extended_todo_",
                actionPrefix: "button.simple_plant_extended_mark_watered_"
            },
            {
                key: "feed",
                label: this._translations["feed_button"] || "Fertilize",
                icon: "mdi:seed",
                problemPrefix: "binary_sensor.simple_plant_extended_fertilization_problem_",
                todoPrefix: "binary_sensor.simple_plant_extended_fertilization_todo_",
                actionPrefix: "button.simple_plant_extended_mark_fertilized_"
            },
            {
                key: "mist",
                label: this._translations["mark_mist"] || "Misting",
                icon: "mdi:spray-bottle",
                problemPrefix: "binary_sensor.simple_plant_extended_misting_problem_",
                todoPrefix: "binary_sensor.simple_plant_extended_misting_todo_",
                actionPrefix: "button.simple_plant_extended_mark_misted_"
            },
            {
                key: "clean",
                label: this._translations["mark_clean"] || "Cleaning",
                icon: "mdi:liquid-spot",
                problemPrefix: "binary_sensor.simple_plant_extended_cleaning_problem_",
                todoPrefix: "binary_sensor.simple_plant_extended_cleaning_todo_",
                actionPrefix: "button.simple_plant_extended_mark_cleaned_"
            }
        ];
    }
    _getTaskDef(taskKey) {
        return this._getTaskDefs().find((item)=>item.key === taskKey);
    }
    static getConfigElement() {
        // Create and return an editor element for UI card edition
        return document.createElement(`${(0, $3cb55e3e7ebd776a$export$31089ea8b3e502e3)}-editor`);
    }
    getCardSize() {
        return 10;
    }
    // The rules for sizing your card in the grid in sections view
    // https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/#sizing-in-sections-view
    getGridOptions() {
        return {
            columns: 6,
            min_columns: 6,
            max_columns: 9,
            min_rows: 8,
            max_rows: 8
        };
    }
    // Specific to Simple Plant
    _handleButton(type) {
        if (type == "water") this._hass.callService("button", "press", {}, {
            entity_id: this._entity_ids["mark_watered"]
        });
        if (type == "feed") this._hass.callService("button", "press", {}, {
            entity_id: this._entity_ids["mark_fertilized"]
        });
        if (type == "clean") this._hass.callService("button", "press", {}, {
            entity_id: this._entity_ids["mark_cleaned"]
        });
        if (type == "mist") this._hass.callService("button", "press", {}, {
            entity_id: this._entity_ids["mark_misted"]
        });
    }
    _update_entites() {
        // Update values of entities that got updated
        var trigger_update = false;
        if (!this._entity_ids || !this._hass) return;
        for (const [key, id] of Object.entries(this._entity_ids)){
            if (!this._entity_states.has(key) || this._entity_states.get(key).state != this._hass.states[id].state) trigger_update = true;
            this._entity_states.set(key, this._hass.states[id]);
        }
        if (trigger_update) this._states_updated = true;
    }
    _get_friendly_name() {
        if (!this._device_id || !this._hass) return;
        const device = Object.values(this._hass.devices).find((device)=>device.id == this._device_id);
        if (device) this._device_name = device.name;
        else throw new Error("Couldn't find selected device");
    }
    _fetch_entities() {
        // Get entities from given device
        if (!this._device_id || !this._hass) return;
        const entities = Object.values(this._hass.entities);
        const device_entities = entities.filter((entity)=>entity.device_id == this._device_id);
        const entity_ids = device_entities.map(({ entity_id: entity_id })=>entity_id);
        // parse entities
        entity_ids.forEach((id)=>{
            $a399cc6bbb0eb26a$export$5cbd5455d3b33941.keys.forEach((key)=>{
                if (id.includes(key)) // Associate the corresponding key with the matched string
                this._entity_ids[key] = id;
            });
        });
    }
    async _loadTranslations() {
        if (!this._hass || this._translations_loaded) return;
        if (typeof this._hass.loadBackendTranslation === "function") await this._hass.loadBackendTranslation("config", (0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d));
        const localizeFirst = (keys, fallback)=>{
            for (const key of keys){
                const localized = this._hass.localize(key);
                if (localized && localized !== key) return localized;
            }
            return fallback;
        };
        const language = this._hass.language || "en";
        const fallbackMap = {
            nl: {
                no_activity: "Nog geen activiteit",
                more_details: "Meer details",
                plant_tasks: "Planttaken",
                overdue: "Te laat",
                today: "Vandaag",
                tasks: "Taken",
                all: "Alles",
                interval: "Elke",
                method: "Methode",
                no_notes: "Geen notities"
            },
            fr: {
                no_activity: "Aucune activit\xe9 pour le moment",
                more_details: "Plus de d\xe9tails",
                plant_tasks: "T\xe2ches des plantes",
                overdue: "En retard",
                today: "Aujourd'hui",
                tasks: "T\xe2ches",
                all: "Tout",
                interval: "Chaque",
                method: "M\xe9thode",
                no_notes: "Aucune note"
            },
            ru: {
                no_activity: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0438",
                more_details: "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435",
                plant_tasks: "\u0417\u0430\u0434\u0430\u0447\u0438 \u0440\u0430\u0441\u0442\u0435\u043D\u0438\u0439",
                overdue: "\u041F\u0440\u043E\u0441\u0440\u043E\u0447\u0435\u043D\u043E",
                today: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F",
                tasks: "\u0417\u0430\u0434\u0430\u0447\u0438",
                all: "\u0412\u0441\u0435",
                interval: "\u041A\u0430\u0436\u0434\u044B\u0439",
                method: "\u041C\u0435\u0442\u043E\u0434",
                no_notes: "\u0417\u0430\u043C\u0435\u0442\u043E\u043A \u043D\u0435\u0442"
            }
        };
        const fallbackFor = (key, fallback)=>fallbackMap[language]?.[key] || fallback;
        const translation_key = `component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.entity.button.mark_watered.name`;
        const feed_translation_key = `component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.entity.feed.name`;
        this._translations["button"] = this._hass.localize(translation_key) || "Mark as watered";
        this._translations["feed_button"] = this._hass.localize(feed_translation_key) || "Mark fertilized";
        this._translations["cancel"] = this._hass.localize("ui.dialogs.generic.cancel");
        this._translations["close"] = this._hass.localize("ui.common.close");
        this._translations["today"] = this._hass.localize("ui.components.calendar.today");
        this._translations["late"] = this._hass.localize(`component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.entity.binary_sensor.problem.name`);
        this._translations["interval"] = localizeFirst([
            "ui.common.interval",
            "ui.common.every"
        ], fallbackFor("interval", "Every"));
        this._translations["method"] = localizeFirst([
            "ui.common.method"
        ], fallbackFor("method", "Method"));
        this._translations["watering"] = this._hass.localize(`component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.entity.button.mark_watered.name`) || "Watering";
        this._translations["details"] = this._hass.localize("ui.common.details") || "Details";
        this._translations["activity"] = this._hass.localize("ui.panel.logbook") || "Activity";
        this._translations["no_activity"] = localizeFirst([
            "ui.panel.logbook.no_entries",
            "ui.panel.logbook.no_entries_found",
            "ui.panel.logbook.empty",
            "ui.common.no_entries"
        ], fallbackFor("no_activity", "No activity yet"));
        this._translations["plant_tasks"] = localizeFirst([
            "ui.panel.lovelace.editor.card.generic.tasks",
            "ui.common.tasks"
        ], fallbackFor("plant_tasks", "Plant tasks"));
        this._translations["overdue"] = localizeFirst([
            "ui.common.overdue"
        ], fallbackFor("overdue", "Overdue"));
        this._translations["today"] = localizeFirst([
            "ui.components.calendar.today",
            "ui.common.today"
        ], fallbackFor("today", "Today"));
        this._translations["tasks"] = localizeFirst([
            "ui.common.tasks"
        ], fallbackFor("tasks", "Tasks"));
        this._translations["all"] = localizeFirst([
            "ui.common.all"
        ], fallbackFor("all", "All"));
        this._translations["notes"] = this._hass.localize("component.simple_plant_extended.entity.text.notes.name") || "Notes";
        this._translations["no_notes"] = this._hass.localize("component.simple_plant_extended.entity.text.notes.name") ? `${this._hass.localize("component.simple_plant_extended.entity.text.notes.name")}: ${this._translations["no_activity"]}` : fallbackFor("no_notes", "No notes");
        this._translations["add_note"] = this._hass.localize("ui.common.add") || "Add note";
        this._translations["add"] = this._hass.localize("ui.common.add") || "Add";
        this._translations["mark_mist"] = this._hass.localize(`component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.entity.button.mark_misted.name`) || "Mark misted";
        this._translations["mark_clean"] = this._hass.localize(`component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.entity.button.mark_cleaned.name`) || "Mark cleaned";
        this._translations["confirm_title"] = this._hass.localize("ui.dialogs.confirmation.title") || "Confirm";
        this._translations["confirm"] = this._hass.localize("ui.common.confirm") || "Confirm";
        this._translations["confirm_mark"] = this._hass.localize("ui.common.mark") || "mark as";
        this._translations["action_water"] = this._hass.localize(`component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.entity.button.mark_watered.name`) || "watered";
        this._translations["action_feed"] = this._hass.localize(`component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.entity.button.mark_fertilized.name`) || "fertilized";
        this._translations["action_mist"] = this._hass.localize(`component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.entity.button.mark_misted.name`) || "misted";
        this._translations["action_clean"] = this._hass.localize(`component.${(0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)}.entity.button.mark_cleaned.name`) || "cleaned";
        this._translations["more_details"] = localizeFirst([
            "ui.panel.lovelace.editor.card.generic.show_more",
            "ui.common.show_more",
            "ui.common.more_info",
            "ui.common.more_details"
        ], fallbackFor("more_details", "More details"));
        this._translations["not_set"] = this._hass.localize("ui.common.unavailable") || "\u2014";
        this._translations_loaded = true;
    }
    constructor(...args){
        super(...args), this._translations_loaded = false, this._states_updated = true, this._activity_dialog_open = false, this._notes_dialog_open = false, this._new_note = "", this._confirm_dialog_open = false, this._confirm_action = null, this._confirm_message = "", this._details_dialog_open = false, this._edit_acquisition_date = "", this._edit_distance_to_window = "", this._edit_pot_diameter = "", this._edit_humidity_sensor = "", this._edit_temperature_sensor = "", this._edit_light_sensor = "", this._overview_task_dialog_open = false, this._overview_task_type = null, this._overview_task_title = null, this._overview_task_items = [], this._plant_dialog_open = false, this._plant_dialog_device = null, this._plant_card_el = null, this._helpers = null, this._entity_ids = {}, this._entity_states = new Map(), this._config_updated = true, this._translations = {
            "button": "Mark as Watered",
            "feed_button": "Mark Fertilized",
            "cancel": "Cancel",
            "today": "today"
        }, this._markAllOverviewTasks = ()=>{
            const unique = new Set(this._overview_task_items.map((item)=>item.actionEntityId).filter((id)=>Boolean(id)));
            for (const entityId of unique)this._pressActionButton(entityId);
        };
    }
}




class $d067581fc0d59830$export$22bae9358daff77d extends (0, $ab210b2da7b39b9d$export$3f2f9f5909897157) {
    static{
        this.schema = [
            {
                name: "mode",
                label: "Mode",
                selector: {
                    select: {
                        options: [
                            "device",
                            "overview"
                        ],
                        custom_value: false
                    }
                }
            },
            {
                name: "device",
                selector: {
                    device: {
                        integration: (0, $3cb55e3e7ebd776a$export$a970e6ec17c9a61d)
                    }
                }
            },
            {
                name: "overview_filter",
                label: "Overview filter",
                selector: {
                    select: {
                        options: [
                            "overdue",
                            "today",
                            "all"
                        ],
                        custom_value: false
                    }
                }
            },
            {
                name: "show_misting",
                label: "Show misting",
                selector: {
                    boolean: {}
                }
            },
            {
                name: "show_cleaning",
                label: "Show cleaning",
                selector: {
                    boolean: {}
                }
            },
            {
                name: "show_activity",
                label: "Show activity timeline",
                selector: {
                    boolean: {}
                }
            },
            {
                name: "show_details",
                label: "Show details",
                selector: {
                    boolean: {}
                }
            },
            {
                name: "show_notes",
                label: "Show notes",
                selector: {
                    boolean: {}
                }
            }
        ];
    }
    static{
        this.properties = {
            _config: {
                state: true
            }
        };
    }
    set hass(hass) {
        this._hass = hass;
    }
    // setConfig works the same way as for the card itself
    setConfig(config) {
        this._config = {
            mode: "device",
            overview_filter: "overdue",
            show_misting: true,
            show_cleaning: true,
            show_activity: true,
            show_details: true,
            show_notes: true,
            ...config
        };
    }
    // This function is called when the input element of the editor loses focus
    _valueChanged(ev) {
        if (!this._config || !this._hass) return;
        const _config = Object.assign({}, this._config);
        _config.mode = ev.detail.value.mode ?? "device";
        _config.device = ev.detail.value.device;
        _config.overview_filter = ev.detail.value.overview_filter ?? "overdue";
        _config.show_misting = ev.detail.value.show_misting ?? true;
        _config.show_cleaning = ev.detail.value.show_cleaning ?? true;
        _config.show_activity = ev.detail.value.show_activity ?? true;
        _config.show_details = ev.detail.value.show_details ?? true;
        _config.show_notes = ev.detail.value.show_notes ?? true;
        this._config = _config;
        const event = new CustomEvent("config-changed", {
            detail: {
                config: _config
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
    render() {
        if (!this._hass || !this._config) return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`<div>Invalid</div>`;
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <ha-form
                .hass=${this._hass}
                .data=${this._config}
                .schema=${$d067581fc0d59830$export$22bae9358daff77d.schema}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }
    constructor(...args){
        super(...args), this._computeLabel = (schema)=>{
            let label = this.hass?.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
            if (label) return label;
            label = this.hass?.localize(`ui.panel.lovelace.editor.card.${schema.label}`);
            if (label) return label;
            return schema.label;
        };
    }
}



console.info(`%c \u{1FAB4} ${(0, $3cb55e3e7ebd776a$export$112ee299e69fdf7)} \u{1FAB4} %c ${(0, $3cb55e3e7ebd776a$export$d5e7ce6d07daf10f)} \n%c  By @${(0, $3cb55e3e7ebd776a$export$6af2e7fd4d06fd68)}`, "color: green; background: white; font-weight: bold; border: solid 1px green; border-radius: 4px 0 0 4px", "color: white; background: green; font-weight: bold; border: solid 1px green; border-radius:  0 4px 4px 0", "color: green;");
customElements.define(`${(0, $3cb55e3e7ebd776a$export$31089ea8b3e502e3)}-editor`, (0, $d067581fc0d59830$export$22bae9358daff77d));
customElements.define((0, $3cb55e3e7ebd776a$export$31089ea8b3e502e3), (0, $a399cc6bbb0eb26a$export$5cbd5455d3b33941));
// Register for the visual selection in the UI
window.customCards = window.customCards || [];
window.customCards.push({
    type: (0, $3cb55e3e7ebd776a$export$31089ea8b3e502e3),
    name: (0, $3cb55e3e7ebd776a$export$112ee299e69fdf7),
    description: (0, $3cb55e3e7ebd776a$export$ce612590f71e0c8a)
});


//# sourceMappingURL=simple-plant-extended-card.js.map
