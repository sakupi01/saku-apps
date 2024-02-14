import{c}from"./clsx-B-dksMZM.js";const s=({children:o,className:n,appName:p})=>React.createElement("button",{type:"submit",className:c("px-4 py-2 text-black bg-green-500 rounded-md shadow-md hover:bg-blue-500",n),onClick:()=>alert(`Hello from your ${p} app!`)},o);s.__docgenInfo={description:"",methods:[],displayName:"Button",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},appName:{required:!0,tsType:{name:"string"},description:""}}};const m={title:"Button",component:s,tags:["autodocs"],parameters:{layout:"fullscreen"},argTypes:{}},e={args:{children:"Button",appName:"app"}};var t,r,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    children: "Button",
    appName: "app"
  }
}`,...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};const u=["Default"];export{e as Default,u as __namedExportsOrder,m as default};
