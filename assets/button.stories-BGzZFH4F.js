import{j as $}from"./jsx-runtime-DRTy3Uxn.js";import{c as H}from"./clsx-B-dksMZM.js";import"./index-BBkUAzwr.js";function E(t){var r,e,n="";if(typeof t=="string"||typeof t=="number")n+=t;else if(typeof t=="object")if(Array.isArray(t))for(r=0;r<t.length;r++)t[r]&&(e=E(t[r]))&&(n&&(n+=" "),n+=e);else for(r in t)t[r]&&(n&&(n+=" "),n+=r);return n}function J(){for(var t,r,e=0,n="";e<arguments.length;)(t=arguments[e++])&&(r=E(t))&&(n&&(n+=" "),n+=r);return n}const x=t=>typeof t=="boolean"?"".concat(t):t===0?"0":t,f=J,L=(t,r)=>e=>{var n;if((r==null?void 0:r.variants)==null)return f(t,e==null?void 0:e.class,e==null?void 0:e.className);const{variants:d,defaultVariants:o}=r,T=Object.keys(d).map(s=>{const a=e==null?void 0:e[s],u=o==null?void 0:o[s];if(a===null)return null;const i=x(a)||x(u);return d[s][i]}),p=e&&Object.entries(e).reduce((s,a)=>{let[u,i]=a;return i===void 0||(s[u]=i),s},{}),K=r==null||(n=r.compoundVariants)===null||n===void 0?void 0:n.reduce((s,a)=>{let{class:u,className:i,...U}=a;return Object.entries(U).every(W=>{let[h,y]=W;return Array.isArray(y)?y.includes({...o,...p}[h]):{...o,...p}[h]===y})?[...s,u,i]:s},[]);return f(t,T,K,e==null?void 0:e.class,e==null?void 0:e.className)},M=L("button",{variants:{intent:{primary:["bg-button-primary","text-base","border-none","rounded-md","hover:bg-button-primary-hover","hover:text-white"],secondary:["bg-button-secondary","text-base","border-basic","rounded-md","hover:bg-button-secondary-hover","hover:text-white"],subtle:["bg-button-subtle","text-base","border-basic","rounded-md","hover:bg-button-subtle-hover","hover:text-white"],ghost:["bg-button-ghost","text-base","border-basic","rounded-md","hover:bg-button-ghost-hover","hover:text-white"],"square-icon":["bg-primary-subtle","text-tag","border-none","rounded-md","hover:bg-primary"],"round-icon":["bg-primary-subtle","text-tag","border-none","rounded-full","hover:bg-primary"]},size:{small:["text-sm","py-1","px-2"],medium:["text-base","py-2","px-4"],square:["text-base","py-2","px-2"],round:["text-base","py-2","px-2"]}},defaultVariants:{intent:"primary",size:"medium"}}),G=({children:t,intent:r,size:e,className:n,onClick:d,...o})=>$.jsx("button",{type:"button",className:H(M({intent:r,size:e}),n,"transition-all duration-400 ease-in-out"),onClick:d,...o,children:t});G.__docgenInfo={description:"",methods:[],displayName:"Button",composes:["VariantProps"]};const Z={title:"Button",component:G,tags:["autodocs"],parameters:{layout:"fullscreen"},argTypes:{}},c={args:{intent:"primary",size:"medium"}},m={args:{intent:"secondary",size:"medium"}},l={args:{intent:"subtle",size:"medium"}},b={args:{intent:"ghost",size:"medium"}},g={args:{intent:"square-icon",size:"square",children:"🌟"}},v={args:{intent:"round-icon",size:"square",children:"🌟"}};var z,S,q;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    intent: "primary",
    size: "medium"
  }
}`,...(q=(S=c.parameters)==null?void 0:S.docs)==null?void 0:q.source}}};var N,V,j;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    intent: "secondary",
    size: "medium"
  }
}`,...(j=(V=m.parameters)==null?void 0:V.docs)==null?void 0:j.source}}};var C,D,I;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    intent: "subtle",
    size: "medium"
  }
}`,...(I=(D=l.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var O,w,A;b.parameters={...b.parameters,docs:{...(O=b.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    intent: "ghost",
    size: "medium"
  }
}`,...(A=(w=b.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var F,_,k;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    intent: "square-icon",
    size: "square",
    children: "🌟"
  }
}`,...(k=(_=g.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var B,P,R;v.parameters={...v.parameters,docs:{...(B=v.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    intent: "round-icon",
    size: "square",
    children: "🌟"
  }
}`,...(R=(P=v.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};const ee=["Default","Secondary","Subtle","Ghost","SquareIcon","RoundIcon"];export{c as Default,b as Ghost,v as RoundIcon,m as Secondary,g as SquareIcon,l as Subtle,ee as __namedExportsOrder,Z as default};
