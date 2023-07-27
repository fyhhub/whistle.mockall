import{a as y,o as g,b as h,d as q,n as A,u as k,r as C,e as J,f as T,g as R,h as z,i as H,c as L}from"./runtime-dom.esm-bundler-4968a867.js";const F={style:{position:"relative"}},M=["contentEditable","innerHTML"],W={key:0,class:"error-popup",style:{display:"none",position:"absolute",bottom:"6px",right:"24px",color:"#d23b3b","font-size":"12px","font-weight":"600","user-select":"none"}},I={__name:"LiteJsonEditor",props:{modelValue:{type:[String,Object,null],required:!0},indent:{type:Number,default:3},dark:Boolean,formatting:Object,withoutEdit:Boolean,withoutError:Boolean},emits:["update:modelValue"],setup(i,{emit:d}){const o=i,u=y(()=>({number:"#a9dc76",braces:"#84aecc",brackets:"#d26a6a",colon:o.dark?"#ffffff":"#4f4f4f",comma:o.dark?"#ffff25":"#f8c33b",string:o.dark?"#78dce8":"#5f9fca",string_quotes:"#e393ff",key:"#ff6188",key_quotes:"#fc9867",null:"#cccccc",true:o.dark?"#c2e69f":"#8ccf79",false:"#e69fc2"})),r=y(()=>o.formatting?Object.keys(u.value).reduce((e,n)=>{var t;return{...e,[n]:(t=o.formatting[n])!=null?t:u.value[n]}},{}):u.value),w=e=>{const n=document.getSelection();if(n.rangeCount>0){const t=n.getRangeAt(0),a=t.cloneRange();a.selectNodeContents(e),a.setEnd(t.endContainer,t.endOffset);const l=a.toString(),s=l[l.length-1],c=b(l,s);return{character:s,occurrence:c,section:l}}return null},E=(e,n)=>{const t=window.getSelection(),a=document.createRange();let l=V(e),s=n.occurrence,c=0,p;for(let m=0;m<l.length&&(p=l[m],c=S(p.textContent,n.character,s),!(c>=0));m++)s-=b(p.textContent,n.character);c++,a.setStart(p,c),a.setEnd(p,c),t.removeAllRanges(),t.addRange(a)},x=e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),S=(e,n,t)=>{const a=e.split(n,t).join(n).length;return a===e.length?-1:a},b=(e,n)=>n?e.replace(new RegExp(`[^${x(n)}]`,"g"),"").length:0,V=e=>{let n,t=[],a=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null,!1);for(;n=a.nextNode();)t.push(n);return t},_=(e,n=0)=>{if(e===null)return`<span style="color: ${r.value.null}">null</span>`;let t="";return t+=`<span style="color: ${r.value.braces}">{</span>
`,Object.keys(e).forEach((a,l,s)=>t+=`${"&nbsp;".repeat(n+o.indent)}<span style="color: ${r.value.key}"><span style="color: ${r.value.key_quotes}">"</span>${a}<span style="color: ${r.value.key_quotes}">"</span></span><span style="color: ${r.value.colon}">:</span>${f(e[a],n+o.indent)}${l<s.length-1?`<span style="color: ${r.value.comma}">,</span>`:""}
`),t+="&nbsp;".repeat(n),t+=`<span style="color: ${r.value.braces}">}</span>`,t},N=(e,n=0)=>{let t="";return t+=`<span style="color: ${r.value.brackets}">[</span>
`,e.forEach((a,l,s)=>t+=`${"&nbsp;".repeat(n+o.indent)}<span>${f(a,n+o.indent)}</span>${l<s.length-1?`<span style="color: ${r.value.comma}">,</span>`:""}
`),t+="&nbsp;".repeat(n),t+=`<span style="color: ${r.value.brackets}">]</span>`,t},O=e=>`<span style="color: ${r.value.string}"><span style="color: ${r.value.string_quotes}">"</span>${e}<span style="color: ${r.value.string_quotes}">"</span></span>`,j=e=>`<span style="color: ${r.value[e]}">${e}</span>`,B=e=>`<span style="color: ${r.value.number}">${e}</span>`,f=(e,n=0)=>{const t=Array.isArray(e)?"array":typeof e;return v[t]?v[t](e,n):e},v={object:_,array:N,string:O,boolean:j,number:B},$=y({get:()=>o.modelValue?f(typeof o.modelValue=="string"?JSON.parse(o.modelValue):o.modelValue):"",set:async e=>{try{const n=e.innerText.split(/[\xa0\n]+/).join("");let t=n?JSON.parse(n):null,a;if(typeof o.modelValue=="string"?(t=t?JSON.stringify(t):"",a=t!==o.modelValue):a=JSON.stringify(t)!==JSON.stringify(o.modelValue),o.withoutError||(e.nextElementSibling.style.display="none"),a){const l=t&&w(e);d("update:modelValue",t),l&&(await T(),E(e,l))}}catch{o.withoutError||(e.nextElementSibling.style.display="block")}}});return(e,n)=>(g(),h("div",F,[q("div",{style:A([i.dark&&"background: #252530; color: #ffffff","height: 100%; width: 100%; padding: 4px; border-radius: inherit; font-family: monospace; overflow: auto; outline: none; white-space: pre-wrap; box-sizing: border-box"]),contentEditable:!i.withoutEdit,onKeyup:n[0]||(n[0]=t=>$.value=t.target),innerHTML:k($)},null,44,M),C(e.$slots,"default",{},()=>[i.withoutError?J("",!0):(g(),h("div",W,"Incorrect JSON format"))])]))}},K=R({__name:"App",setup(i){const d=z();return window.whistleBridge.addNetworkListener(function(o){}),(o,u)=>(g(),H(k(I),{modelValue:d.value,"onUpdate:modelValue":u[0]||(u[0]=r=>d.value=r)},null,8,["modelValue"]))}});L(K).mount("#app");
