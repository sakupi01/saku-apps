import{j as o}from"./jsx-runtime-DEdD30eg.js";import{D as v}from"./divider-CEoC2itV.js";import{r as i}from"./index-RYns6xqu.js";import"./clsx-B-dksMZM.js";/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),g=(...t)=>t.filter((e,r,n)=>!!e&&n.indexOf(e)===r).join(" ");/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=i.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:n,className:c="",children:a,iconNode:s,...l},d)=>i.createElement("svg",{ref:d,...w,width:e,height:e,stroke:t,strokeWidth:n?Number(r)*24/Number(e):r,className:g("lucide",c),...l},[...s.map(([m,u])=>i.createElement(m,u)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=(t,e)=>{const r=i.forwardRef(({className:n,...c},a)=>i.createElement(j,{ref:a,iconNode:e,className:g(`lucide-${b(t)}`,n),...c}));return r.displayName=`${t}`,r};/**
 * @license lucide-react v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=T("Logs",[["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 18h8",key:"oe0vm4"}],["path",{d:"M13 6h8",key:"15sg57"}],["path",{d:"M3 12h1",key:"lp3yf2"}],["path",{d:"M3 18h1",key:"1eiwyy"}],["path",{d:"M3 6h1",key:"rgxa97"}],["path",{d:"M8 12h1",key:"1con00"}],["path",{d:"M8 18h1",key:"13wk12"}],["path",{d:"M8 6h1",key:"tn6mkg"}]]);function N(){const t=i.useRef();i.useEffect(()=>{const e=document.querySelectorAll("h2, h3, h4"),r=document.querySelectorAll(".toc ul li a"),n=Array.from(e),c=Array.from(r),a=s=>{var l;for(const d of s){const m=n.indexOf(d.target),u=document.querySelector(".is-active");d.isIntersecting&&(u!==null&&u.classList.remove("is-active"),(l=c[m])==null||l.classList.add("is-active"))}};t.current=new IntersectionObserver(a,{rootMargin:"0px 0px -100% 0px",threshold:0});for(const s of e)t.current.observe(s);return()=>{var s;return(s=t.current)==null?void 0:s.disconnect()}},[])}const x=({nodes:t,githubLink:e,backToTopLink:r})=>t!=null&&t.length?o.jsxs("div",{className:`hidden md:block w-[60px] h-[60px] fixed left-8 
    transition-all ease-out duration-[0.5s]
    origin-top-left
    has-[:hover]:w-[250px] has-[:hover]:h-[85vh]
    [&>.menu]:has-[:hover]:visible [&>.menu]:has-[:hover]:opacity-100 
    [&>.menu]:has-[:hover]:delay-[0.4s]
     [&>.menu-icon]:has-[:hover]:text-blossom 
     rounded-full border border-neutral-200 shadow-sm`,children:[o.jsx("div",{className:`menu-icon p-2 md:p-3 rounded-full transition-all duration-[0.3s] ease-in-out 
      flex items-center justify-center`,children:o.jsx(L,{className:"w-8 h-8 md:w-10 md:h-10",strokeWidth:1})}),o.jsxs("div",{className:"menu p-4 max-w-[250px] md:flex flex-col gap-2 sticky top-2 hidden opacity-0",children:[o.jsx("div",{className:"toc",children:k(t)}),o.jsx(v,{}),e&&e,r]})]}):null;function k(t){return o.jsx("ul",{className:"list-none pl-2",children:t.map(e=>{var r;return o.jsxs("li",{children:[A({node:e}),((r=e.children)==null?void 0:r.length)>0&&e.depth<3&&k(e.children)]},e.data.hProperties.id)})})}const A=({node:t})=>{const e=t.data.hProperties.id;return N(),o.jsx("button",{type:"button",onClick:r=>{r.preventDefault();const n=document.getElementById(e);n==null||n.scrollIntoView({behavior:"smooth",block:"start"})},children:o.jsx("a",{href:`#${e}`,children:t.value})})};x.__docgenInfo={description:"",methods:[],displayName:"Toc",props:{nodes:{required:!0,tsType:{name:"Array",elements:[{name:"any"}],raw:"any[]"},description:""},githubLink:{required:!1,tsType:{name:"ReactNode"},description:""},backToTopLink:{required:!0,tsType:{name:"ReactNode"},description:""}}};const q={title:"Toc",component:x,tags:["autodocs"],parameters:{layout:"fullscreen"},argTypes:{}},h={args:{nodes:[],githubLink:null,backToTopLink:null}};var p,f,y;h.parameters={...h.parameters,docs:{...(p=h.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    nodes: [],
    githubLink: null,
    backToTopLink: null
  }
}`,...(y=(f=h.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};const O=["Default"];export{h as Default,O as __namedExportsOrder,q as default};
