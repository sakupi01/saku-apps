function T(e,t){for(var r=0;r<t.length;r++){const n=t[r];if(typeof n!="string"&&!Array.isArray(n)){for(const u in n)if(u!=="default"&&!(u in e)){const c=Object.getOwnPropertyDescriptor(n,u);c&&Object.defineProperty(e,u,c.get?c:{enumerable:!0,get:()=>n[u]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var Z=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function M(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function ee(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var r=function n(){return this instanceof n?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(n){var u=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(r,n,u.get?u:{enumerable:!0,get:function(){return e[n]}})}),r}var O={exports:{}},o={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y=Symbol.for("react.element"),V=Symbol.for("react.portal"),F=Symbol.for("react.fragment"),N=Symbol.for("react.strict_mode"),U=Symbol.for("react.profiler"),q=Symbol.for("react.provider"),L=Symbol.for("react.context"),z=Symbol.for("react.forward_ref"),B=Symbol.for("react.suspense"),H=Symbol.for("react.memo"),G=Symbol.for("react.lazy"),w=Symbol.iterator;function W(e){return e===null||typeof e!="object"?null:(e=w&&e[w]||e["@@iterator"],typeof e=="function"?e:null)}var R={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$=Object.assign,k={};function p(e,t,r){this.props=e,this.context=t,this.refs=k,this.updater=r||R}p.prototype.isReactComponent={};p.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};p.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function C(){}C.prototype=p.prototype;function v(e,t,r){this.props=e,this.context=t,this.refs=k,this.updater=r||R}var b=v.prototype=new C;b.constructor=v;$(b,p.prototype);b.isPureReactComponent=!0;var E=Array.isArray,P=Object.prototype.hasOwnProperty,S={current:null},x={key:!0,ref:!0,__self:!0,__source:!0};function A(e,t,r){var n,u={},c=null,s=null;if(t!=null)for(n in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(c=""+t.key),t)P.call(t,n)&&!x.hasOwnProperty(n)&&(u[n]=t[n]);var f=arguments.length-2;if(f===1)u.children=r;else if(1<f){for(var i=Array(f),a=0;a<f;a++)i[a]=arguments[a+2];u.children=i}if(e&&e.defaultProps)for(n in f=e.defaultProps,f)u[n]===void 0&&(u[n]=f[n]);return{$$typeof:y,type:e,key:c,ref:s,props:u,_owner:S.current}}function J(e,t){return{$$typeof:y,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function g(e){return typeof e=="object"&&e!==null&&e.$$typeof===y}function K(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var j=/\/+/g;function m(e,t){return typeof e=="object"&&e!==null&&e.key!=null?K(""+e.key):t.toString(36)}function _(e,t,r,n,u){var c=typeof e;(c==="undefined"||c==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(c){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case y:case V:s=!0}}if(s)return s=e,u=u(s),e=n===""?"."+m(s,0):n,E(u)?(r="",e!=null&&(r=e.replace(j,"$&/")+"/"),_(u,t,r,"",function(a){return a})):u!=null&&(g(u)&&(u=J(u,r+(!u.key||s&&s.key===u.key?"":(""+u.key).replace(j,"$&/")+"/")+e)),t.push(u)),1;if(s=0,n=n===""?".":n+":",E(e))for(var f=0;f<e.length;f++){c=e[f];var i=n+m(c,f);s+=_(c,t,r,i,u)}else if(i=W(e),typeof i=="function")for(e=i.call(e),f=0;!(c=e.next()).done;)c=c.value,i=n+m(c,f++),s+=_(c,t,r,i,u);else if(c==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function d(e,t,r){if(e==null)return e;var n=[],u=0;return _(e,n,"","",function(c){return t.call(r,c,u++)}),n}function Q(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var l={current:null},h={transition:null},X={ReactCurrentDispatcher:l,ReactCurrentBatchConfig:h,ReactCurrentOwner:S};function D(){throw Error("act(...) is not supported in production builds of React.")}o.Children={map:d,forEach:function(e,t,r){d(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return d(e,function(){t++}),t},toArray:function(e){return d(e,function(t){return t})||[]},only:function(e){if(!g(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};o.Component=p;o.Fragment=F;o.Profiler=U;o.PureComponent=v;o.StrictMode=N;o.Suspense=B;o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=X;o.act=D;o.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var n=$({},e.props),u=e.key,c=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(c=t.ref,s=S.current),t.key!==void 0&&(u=""+t.key),e.type&&e.type.defaultProps)var f=e.type.defaultProps;for(i in t)P.call(t,i)&&!x.hasOwnProperty(i)&&(n[i]=t[i]===void 0&&f!==void 0?f[i]:t[i])}var i=arguments.length-2;if(i===1)n.children=r;else if(1<i){f=Array(i);for(var a=0;a<i;a++)f[a]=arguments[a+2];n.children=f}return{$$typeof:y,type:e.type,key:u,ref:c,props:n,_owner:s}};o.createContext=function(e){return e={$$typeof:L,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:q,_context:e},e.Consumer=e};o.createElement=A;o.createFactory=function(e){var t=A.bind(null,e);return t.type=e,t};o.createRef=function(){return{current:null}};o.forwardRef=function(e){return{$$typeof:z,render:e}};o.isValidElement=g;o.lazy=function(e){return{$$typeof:G,_payload:{_status:-1,_result:e},_init:Q}};o.memo=function(e,t){return{$$typeof:H,type:e,compare:t===void 0?null:t}};o.startTransition=function(e){var t=h.transition;h.transition={};try{e()}finally{h.transition=t}};o.unstable_act=D;o.useCallback=function(e,t){return l.current.useCallback(e,t)};o.useContext=function(e){return l.current.useContext(e)};o.useDebugValue=function(){};o.useDeferredValue=function(e){return l.current.useDeferredValue(e)};o.useEffect=function(e,t){return l.current.useEffect(e,t)};o.useId=function(){return l.current.useId()};o.useImperativeHandle=function(e,t,r){return l.current.useImperativeHandle(e,t,r)};o.useInsertionEffect=function(e,t){return l.current.useInsertionEffect(e,t)};o.useLayoutEffect=function(e,t){return l.current.useLayoutEffect(e,t)};o.useMemo=function(e,t){return l.current.useMemo(e,t)};o.useReducer=function(e,t,r){return l.current.useReducer(e,t,r)};o.useRef=function(e){return l.current.useRef(e)};o.useState=function(e){return l.current.useState(e)};o.useSyncExternalStore=function(e,t,r){return l.current.useSyncExternalStore(e,t,r)};o.useTransition=function(){return l.current.useTransition()};o.version="18.3.1";O.exports=o;var I=O.exports;const Y=M(I),te=T({__proto__:null,default:Y},[I]);export{te as $,Y as R,ee as a,Z as c,M as g,I as r};
