!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["kotlin-wasm-benchmark"]=t():e["kotlin-wasm-benchmark"]=t()}(this,(()=>(()=>{"use strict";var e,t,n,r,o={81:(e,t,n)=>{n.a(e,(async(e,r)=>{try{n.r(t),n.d(t,{default:()=>e});var o=n(104);const e=(await(0,o._)()).exports;r()}catch(e){r(e)}}),1)},104:(e,t,n)=>{async function r(e={},t=!0){new WeakMap;const n={"kotlin.captureStackTrace":()=>(new Error).stack,"kotlin.wasm.internal.throwJsError":(e,t,n)=>{const r=new Error;throw r.message=e,r.name=t,r.stack=n,r},"kotlin.wasm.internal.intToExternref":e=>e,"kotlin.wasm.internal.importStringFromWasm":(e,t,n)=>{const r=new Uint16Array(a.memory.buffer,e,t),o=String.fromCharCode.apply(null,r);return null==n?o:n+o},"kotlin.wasm.internal.getJsEmptyString":()=>"","kotlin.wasm.internal.isNullish":e=>null==e,"kotlin.js.jsArraySet":(e,t,n)=>{e[t]=n},"kotlin.js.JsArray_$external_fun":()=>new Array};let r,o,a;const s="undefined"!=typeof process&&"node"===process.release.name,i=!s&&("undefined"!=typeof d8||"undefined"!=typeof inIon||"undefined"!=typeof jscOptions),l=!s&&!i&&"undefined"!=typeof window;if(!s&&!i&&!l)throw"Supported JS engine not detected";const c="./kotlin-wasm-benchmark-wasm-js.wasm",m={js_code:n};try{if(s){o=(await import("node:module")).default.createRequire("file:///C:/Users/alina/Projects/julia-fractal/kotlin-impl/build/js/packages/kotlin-wasm-benchmark-wasm-js/kotlin/kotlin-wasm-benchmark-wasm-js.uninstantiated.mjs");const e=o("fs"),t=o("path"),n=o("url").fileURLToPath("file:///C:/Users/alina/Projects/julia-fractal/kotlin-impl/build/js/packages/kotlin-wasm-benchmark-wasm-js/kotlin/kotlin-wasm-benchmark-wasm-js.uninstantiated.mjs"),a=t.dirname(n),s=e.readFileSync(t.resolve(a,c)),i=new WebAssembly.Module(s);r=new WebAssembly.Instance(i,m)}if(i){const e=read(c,"binary"),t=new WebAssembly.Module(e);r=new WebAssembly.Instance(t,m)}l&&(r=(await WebAssembly.instantiateStreaming(fetch(c),m)).instance)}catch(e){if(e instanceof WebAssembly.CompileError){let e="Please make sure that your runtime environment supports the latest version of Wasm GC and Exception-Handling proposals.\nFor more information, see https://kotl.in/wasm-help\n";if(l)console.error(e);else{const t="\n"+e;"undefined"!=typeof console&&void 0!==console.log?console.log(t):print(t)}}throw e}return a=r.exports,t&&a._initialize(),{instance:r,exports:a}}n.d(t,{_:()=>r})}},a={};function s(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={exports:{}};return o[e](n,n.exports,s),n.exports}return e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",r=e=>{e&&!e.d&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},s.a=(o,a,s)=>{var i;s&&((i=[]).d=1);var l,c,m,p=new Set,f=o.exports,u=new Promise(((e,t)=>{m=t,c=e}));u[t]=f,u[e]=e=>(i&&e(i),p.forEach(e),u.catch((e=>{}))),o.exports=u,a((o=>{var a;l=(o=>o.map((o=>{if(null!==o&&"object"==typeof o){if(o[e])return o;if(o.then){var a=[];a.d=0,o.then((e=>{s[t]=e,r(a)}),(e=>{s[n]=e,r(a)}));var s={};return s[e]=e=>e(a),s}}var i={};return i[e]=e=>{},i[t]=o,i})))(o);var s=()=>l.map((e=>{if(e[n])throw e[n];return e[t]})),c=new Promise((t=>{(a=()=>t(s)).r=0;var n=e=>e!==i&&!p.has(e)&&(p.add(e),e&&!e.d&&(a.r++,e.push(a)));l.map((t=>t[e](n)))}));return a.r?c:s()}),(e=>(e?m(u[n]=e):c(f),r(i)))),i&&(i.d=0)},s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s(81)})()));
//# sourceMappingURL=kotlin-wasm-benchmark.js.map