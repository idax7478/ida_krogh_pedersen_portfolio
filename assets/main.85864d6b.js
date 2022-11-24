const dt=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};dt();function ht(t,e){t.indexOf(e)===-1&&t.push(e)}const tt=(t,e,n)=>Math.min(Math.max(n,t),e),m={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},_=t=>typeof t=="number",E=t=>Array.isArray(t)&&!_(t[0]),pt=(t,e,n)=>{const i=e-t;return((n-t)%i+i)%i+t};function mt(t,e){return E(t)?t[pt(0,t.length,e)]:t}const et=(t,e,n)=>-n*t+n*e+t,nt=()=>{},T=t=>t,W=(t,e,n)=>e-t===0?1:(n-t)/(e-t);function it(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const s=W(0,e,i);t.push(et(n,1,s))}}function gt(t){const e=[0];return it(e,t-1),e}function yt(t,e=gt(t.length),n=T){const i=t.length,s=i-e.length;return s>0&&it(e,s),r=>{let a=0;for(;a<i-2&&!(r<e[a+1]);a++);let o=tt(0,1,W(e[a],e[a+1],r));return o=mt(n,a)(o),et(t[a],t[a+1],o)}}const st=t=>Array.isArray(t)&&_(t[0]),N=t=>typeof t=="object"&&Boolean(t.createAnimation),D=t=>typeof t=="function",vt=t=>typeof t=="string",F={ms:t=>t*1e3,s:t=>t/1e3},rt=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,Tt=1e-7,bt=12;function At(t,e,n,i,s){let r,a,o=0;do a=e+(n-e)/2,r=rt(a,i,s)-t,r>0?n=a:e=a;while(Math.abs(r)>Tt&&++o<bt);return a}function R(t,e,n,i){if(t===e&&n===i)return T;const s=r=>At(r,0,1,t,n);return r=>r===0||r===1?r:rt(s(r),e,i)}const St=(t,e="end")=>n=>{n=e==="end"?Math.min(n,.999):Math.max(n,.001);const i=n*t,s=e==="end"?Math.floor(i):Math.ceil(i);return tt(0,1,s/t)},G={ease:R(.25,.1,.25,1),"ease-in":R(.42,0,1,1),"ease-in-out":R(.42,0,.58,1),"ease-out":R(0,0,.58,1)},Ot=/\((.*?)\)/;function H(t){if(D(t))return t;if(st(t))return R(...t);if(G[t])return G[t];if(t.startsWith("steps")){const e=Ot.exec(t);if(e){const n=e[1].split(",");return St(parseFloat(n[0]),n[1].trim())}}return T}class at{constructor(e,n=[0,1],{easing:i,duration:s=m.duration,delay:r=m.delay,endDelay:a=m.endDelay,repeat:o=m.repeat,offset:d,direction:g="normal"}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=T,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((h,l)=>{this.resolve=h,this.reject=l}),i=i||m.easing,N(i)){const h=i.createAnimation(n);i=h.easing,n=h.keyframes||n,s=h.duration||s}this.repeat=o,this.easing=E(i)?T:H(i),this.updateDuration(s);const b=yt(n,d,E(i)?i.map(H):T);this.tick=h=>{var l;r=r;let p=0;this.pauseTime!==void 0?p=this.pauseTime:p=(h-this.startTime)*this.rate,this.t=p,p/=1e3,p=Math.max(p-r,0),this.playState==="finished"&&this.pauseTime===void 0&&(p=this.totalDuration);const S=p/this.duration;let V=Math.floor(S),y=S%1;!y&&S>=1&&(y=1),y===1&&V--;const O=V%2;(g==="reverse"||g==="alternate"&&O||g==="alternate-reverse"&&!O)&&(y=1-y);const P=p>=this.totalDuration?1:Math.min(y,1),f=b(this.easing(P));e(f),this.pauseTime===void 0&&(this.playState==="finished"||p>=this.totalDuration+a)?(this.playState="finished",(l=this.resolve)===null||l===void 0||l.call(this,f)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class wt{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const U=new WeakMap;function ot(t){return U.has(t)||U.set(t,{transforms:[],values:new Map}),U.get(t)}function Et(t,e){return t.has(e)||t.set(e,new wt),t.get(e)}const Dt=["","X","Y","Z"],Pt=["translate","scale","rotate","skew"],j={x:"translateX",y:"translateY",z:"translateZ"},J={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},xt={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:J,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:T},skew:J},I=new Map,X=t=>`--motion-${t}`,q=["x","y","z"];Pt.forEach(t=>{Dt.forEach(e=>{q.push(t+e),I.set(X(t+e),xt[t])})});const Mt=(t,e)=>q.indexOf(t)-q.indexOf(e),Rt=new Set(q),ct=t=>Rt.has(t),Ft=(t,e)=>{j[e]&&(e=j[e]);const{transforms:n}=ot(t);ht(n,e),t.style.transform=It(n)},It=t=>t.sort(Mt).reduce(Vt,"").trim(),Vt=(t,e)=>`${t} ${e}(var(${X(e)}))`,K=t=>t.startsWith("--"),Q=new Set;function $t(t){if(!Q.has(t)){Q.add(t);try{const{syntax:e,initialValue:n}=I.has(t)?I.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch{}}}const z=(t,e)=>document.createElement("div").animate(t,e),Y={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{z({opacity:[1]})}catch{return!1}return!0},finished:()=>Boolean(z({opacity:[0,1]},{duration:.001}).finished),linearEasing:()=>{try{z({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},C={},w={};for(const t in Y)w[t]=()=>(C[t]===void 0&&(C[t]=Y[t]()),C[t]);const Lt=.015,_t=(t,e)=>{let n="";const i=Math.round(e/Lt);for(let s=0;s<i;s++)n+=t(W(0,i-1,s))+", ";return n.substring(0,n.length-2)},k=(t,e)=>D(t)?w.linearEasing()?`linear(${_t(t,e)})`:m.easing:st(t)?jt(t):t,jt=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`;function qt(t,e){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:e());return t}const Ut=t=>Array.isArray(t)?t:[t];function B(t){return j[t]&&(t=j[t]),ct(t)?X(t):t}const L={get:(t,e)=>{e=B(e);let n=K(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&n!==0){const i=I.get(e);i&&(n=i.initialValue)}return n},set:(t,e,n)=>{e=B(e),K(e)?t.style.setProperty(e,n):t.style[e]=n}};function lt(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function zt(t,e){var n;let i=(e==null?void 0:e.toDefaultUnit)||T;const s=t[t.length-1];if(vt(s)){const r=((n=s.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";r&&(i=a=>a+r)}return i}function Ct(){return window.__MOTION_DEV_TOOLS_RECORD}function Nt(t,e,n,i={},s){const r=Ct(),a=i.record!==!1&&r;let o,{duration:d=m.duration,delay:g=m.delay,endDelay:b=m.endDelay,repeat:h=m.repeat,easing:l=m.easing,direction:p,offset:S,allowWebkitAcceleration:V=!1}=i;const y=ot(t),O=ct(e);let P=w.waapi();O&&Ft(t,e);const f=B(e),x=Et(y.values,f),v=I.get(f);return lt(x.animation,!(N(l)&&x.generator)&&i.record!==!1),()=>{const $=()=>{var c,M;return(M=(c=L.get(t,f))!==null&&c!==void 0?c:v==null?void 0:v.initialValue)!==null&&M!==void 0?M:0};let u=qt(Ut(n),$);const Z=zt(u,v);if(N(l)){const c=l.createAnimation(u,e!=="opacity",$,f,x);l=c.easing,u=c.keyframes||u,d=c.duration||d}if(K(f)&&(w.cssRegisterProperty()?$t(f):P=!1),O&&!w.linearEasing()&&(D(l)||E(l)&&l.some(D))&&(P=!1),P){v&&(u=u.map(A=>_(A)?v.toDefaultUnit(A):A)),u.length===1&&(!w.partialKeyframes()||a)&&u.unshift($());const c={delay:F.ms(g),duration:F.ms(d),endDelay:F.ms(b),easing:E(l)?void 0:k(l,d),direction:p,iterations:h+1,fill:"both"};o=t.animate({[f]:u,offset:S,easing:E(l)?l.map(A=>k(A,d)):void 0},c),o.finished||(o.finished=new Promise((A,ft)=>{o.onfinish=A,o.oncancel=ft}));const M=u[u.length-1];o.finished.then(()=>{L.set(t,f,M),o.cancel()}).catch(nt),V||(o.playbackRate=1.000001)}else if(s&&O)u=u.map(c=>typeof c=="string"?parseFloat(c):c),u.length===1&&u.unshift(parseFloat($())),o=new s(c=>{L.set(t,f,Z?Z(c):c)},u,Object.assign(Object.assign({},i),{duration:d,easing:l}));else{const c=u[u.length-1];L.set(t,f,v&&_(c)?v.toDefaultUnit(c):c)}return a&&r(t,e,u,{duration:d,delay:g,easing:l,repeat:h,offset:S},"motion-one"),x.setAnimation(o),o}}const Kt=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function Bt(t,e){var n;return typeof t=="string"?e?((n=e[t])!==null&&n!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const Wt=t=>t(),ut=(t,e,n=m.duration)=>new Proxy({animations:t.map(Wt).filter(Boolean),duration:n,options:e},Zt),Xt=t=>t.animations[0],Zt={get:(t,e)=>{const n=Xt(t);switch(e){case"duration":return t.duration;case"currentTime":return F.s((n==null?void 0:n[e])||0);case"playbackRate":case"playState":return n==null?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(Gt)).catch(nt)),t.finished;case"stop":return()=>{t.animations.forEach(i=>lt(i))};case"forEachNative":return i=>{t.animations.forEach(s=>i(s,t))};default:return typeof(n==null?void 0:n[e])>"u"?void 0:()=>t.animations.forEach(i=>i[e]())}},set:(t,e,n)=>{switch(e){case"currentTime":n=F.ms(n);case"currentTime":case"playbackRate":for(let i=0;i<t.animations.length;i++)t.animations[i][e]=n;return!0}return!1}},Gt=t=>t.finished;function Ht(t,e,n){return D(t)?t(e,n):t}function Jt(t){return function(n,i,s={}){n=Bt(n);const r=n.length,a=[];for(let o=0;o<r;o++){const d=n[o];for(const g in i){const b=Kt(s,g);b.delay=Ht(b.delay,o,r);const h=Nt(d,g,i[g],b,t);a.push(h)}}return ut(a,s,s.duration)}}const Qt=Jt(at);function Yt(t,e={}){return ut([()=>{const n=new at(t,[0,1],e);return n.finished.catch(()=>{}),n}],e,e.duration)}function kt(t,e,n){return(D(t)?Yt:Qt)(t,e,n)}kt("body",{opacity:[0,1]},{duration:5});