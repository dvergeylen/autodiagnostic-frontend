var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function r(e){e.forEach(t)}function s(e){return"function"==typeof e}function c(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function i(t,...n){if(null==t)return e;const r=t.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}function o(e,t,n){e.$$.on_destroy.push(i(t,n))}function a(e,t,n=t){return e.set(n),t}let l,u=!1;function d(e,t,n,r){for(;e<t;){const s=e+(t-e>>1);n(s)<=r?e=s+1:t=s}return e}function f(e,t){u?(!function(e){if(e.hydrate_init)return;e.hydrate_init=!0;const t=e.childNodes,n=new Int32Array(t.length+1),r=new Int32Array(t.length);n[0]=-1;let s=0;for(let e=0;e<t.length;e++){const c=d(1,s+1,(e=>t[n[e]].claim_order),t[e].claim_order)-1;r[e]=n[c]+1;const i=c+1;n[i]=e,s=Math.max(i,s)}const c=[],i=[];let o=t.length-1;for(let e=n[s]+1;0!=e;e=r[e-1]){for(c.push(t[e-1]);o>=e;o--)i.push(t[o]);o--}for(;o>=0;o--)i.push(t[o]);c.reverse(),i.sort(((e,t)=>e.claim_order-t.claim_order));for(let t=0,n=0;t<i.length;t++){for(;n<c.length&&i[t].claim_order>=c[n].claim_order;)n++;const r=n<c.length?c[n]:null;e.insertBefore(i[t],r)}}(e),(void 0===e.actual_end_child||null!==e.actual_end_child&&e.actual_end_child.parentElement!==e)&&(e.actual_end_child=e.firstChild),t!==e.actual_end_child?e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling):t.parentNode!==e&&e.appendChild(t)}function p(e,t,n){u&&!n?f(e,t):(t.parentNode!==e||n&&t.nextSibling!==n)&&e.insertBefore(t,n||null)}function m(e){e.parentNode.removeChild(e)}function g(e){return document.createElement(e)}function h(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function v(e){return document.createTextNode(e)}function $(){return v(" ")}function b(){return v("")}function y(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function w(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function x(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function k(e,t,n){e.classList[n?"add":"remove"](t)}function _(e){l=e}function N(){if(!l)throw new Error("Function called outside component initialization");return l}function q(e){N().$$.on_mount.push(e)}const j=[],O=[],P=[],E=[],S=Promise.resolve();let C=!1;function T(){C||(C=!0,S.then(R))}function A(e){P.push(e)}let M=!1;const I=new Set;function R(){if(!M){M=!0;do{for(let e=0;e<j.length;e+=1){const t=j[e];_(t),H(t.$$)}for(_(null),j.length=0;O.length;)O.pop()();for(let e=0;e<P.length;e+=1){const t=P[e];I.has(t)||(I.add(t),t())}P.length=0}while(j.length);for(;E.length;)E.pop()();C=!1,M=!1,I.clear()}}function H(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(A)}}const L=new Set;let z;function D(){z={r:0,c:[],p:z}}function U(){z.r||r(z.c),z=z.p}function G(e,t){e&&e.i&&(L.delete(e),e.i(t))}function F(e,t,n,r){if(e&&e.o){if(L.has(e))return;L.add(e),z.c.push((()=>{L.delete(e),r&&(n&&e.d(1),r())})),e.o(t)}}function B(e,t){e.d(1),t.delete(e.key)}function J(e,t,n,r,s,c,i,o,a,l,u,d){let f=e.length,p=c.length,m=f;const g={};for(;m--;)g[e[m].key]=m;const h=[],v=new Map,$=new Map;for(m=p;m--;){const e=d(s,c,m),o=n(e);let a=i.get(o);a?r&&a.p(e,t):(a=l(o,e),a.c()),v.set(o,h[m]=a),o in g&&$.set(o,Math.abs(m-g[o]))}const b=new Set,y=new Set;function w(e){G(e,1),e.m(o,u),i.set(e.key,e),u=e.first,p--}for(;f&&p;){const t=h[p-1],n=e[f-1],r=t.key,s=n.key;t===n?(u=t.first,f--,p--):v.has(s)?!i.has(r)||b.has(r)?w(t):y.has(s)?f--:$.get(r)>$.get(s)?(y.add(r),w(t)):(b.add(s),f--):(a(n,i),f--)}for(;f--;){const t=e[f];v.has(t.key)||a(t,i)}for(;p;)w(h[p-1]);return h}function Q(e){e&&e.c()}function V(e,n,c,i){const{fragment:o,on_mount:a,on_destroy:l,after_update:u}=e.$$;o&&o.m(n,c),i||A((()=>{const n=a.map(t).filter(s);l?l.push(...n):r(n),e.$$.on_mount=[]})),u.forEach(A)}function K(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function W(t,s,c,i,o,a,d=[-1]){const f=l;_(t);const p=t.$$={fragment:null,ctx:null,props:a,update:e,not_equal:o,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:s.context||[]),callbacks:n(),dirty:d,skip_bound:!1};let g=!1;if(p.ctx=c?c(t,s.props||{},((e,n,...r)=>{const s=r.length?r[0]:n;return p.ctx&&o(p.ctx[e],p.ctx[e]=s)&&(!p.skip_bound&&p.bound[e]&&p.bound[e](s),g&&function(e,t){-1===e.$$.dirty[0]&&(j.push(e),T(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}(t,e)),n})):[],p.update(),g=!0,r(p.before_update),p.fragment=!!i&&i(p.ctx),s.target){if(s.hydrate){u=!0;const e=function(e){return Array.from(e.childNodes)}(s.target);p.fragment&&p.fragment.l(e),e.forEach(m)}else p.fragment&&p.fragment.c();s.intro&&G(t.$$.fragment),V(t,s.target,s.anchor,s.customElement),u=!1,R()}_(f)}class X{$destroy(){K(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Y=[];function Z(e,t){return{subscribe:ee(e,t).subscribe}}function ee(t,n=e){let r;const s=[];function i(e){if(c(t,e)&&(t=e,r)){const e=!Y.length;for(let e=0;e<s.length;e+=1){const n=s[e];n[1](),Y.push(n,t)}if(e){for(let e=0;e<Y.length;e+=2)Y[e][0](Y[e+1]);Y.length=0}}}return{set:i,update:function(e){i(e(t))},subscribe:function(c,o=e){const a=[c,o];return s.push(a),1===s.length&&(r=n(i)||e),c(t),()=>{const e=s.indexOf(a);-1!==e&&s.splice(e,1),0===s.length&&(r(),r=null)}}}}const te=ee({gender:"",language:"fr",attribution:{leader:0,bricoleur:0,coequipier:0,planificateur:0,idealiste:0,creatif:0,audacieux:0,explorateur:0},nodes:{}}),ne=function(t,n,c){const o=!Array.isArray(t),a=o?[t]:t,l=n.length<2;return Z(c,(t=>{let c=!1;const u=[];let d=0,f=e;const p=()=>{if(d)return;f();const r=n(o?u[0]:u,t);l?t(r):f=s(r)?r:e},m=a.map(((e,t)=>i(e,(e=>{u[t]=e,d&=~(1<<t),c&&p()}),(()=>{d|=1<<t}))));return c=!0,p(),function(){r(m),f()}}))}(te,(e=>Object.keys(e.nodes).reduce(((e,t)=>t>e?t:e),"1")));var re;!function(e){e[e.UNSTARTED=0]="UNSTARTED",e[e.ONGOING=1]="ONGOING",e[e.PAUSED=2]="PAUSED",e[e.FINISHED=3]="FINISHED",e[e.ERROR=4]="ERROR"}(re||(re={}));const se=ee(re.UNSTARTED);function ce(e){let t,n,r;return{c(){t=g("button"),t.textContent="Continuer",w(t,"class","svelte-1wkgo86"),k(t,"pressed",!e[0])},m(s,c){p(s,t,c),n||(r=y(t,"click",e[4]),n=!0)},p(e,n){1&n&&k(t,"pressed",!e[0])},d(e){e&&m(t),n=!1,r()}}}function ie(t){let n,s,c,i,o,a,l,u,d,h,b,x,_,N,q,j,O=t[1]&&t[2]&&ce(t);return{c(){n=g("main"),s=g("h1"),s.textContent="Voyage au bout du monde",c=$(),i=g("h3"),i.textContent="Une aventure d'introspection",o=$(),a=g("div"),O&&O.c(),l=$(),u=g("button"),u.textContent="Nouvelle Partie",d=$(),h=g("div"),b=v("Protagoniste:\n    "),x=g("button"),x.innerHTML='<svg class="icon svelte-1wkgo86"><use href="assets/sprite_icons.svg#mars"></use></svg>\n      Masculin',_=$(),N=g("button"),N.innerHTML='<svg class="icon svelte-1wkgo86"><use href="assets/sprite_icons.svg#venus"></use></svg>\n      Féminin',w(s,"class","svelte-1wkgo86"),w(u,"class","svelte-1wkgo86"),k(u,"pressed",t[0]),w(a,"class","is-grid svelte-1wkgo86"),w(x,"class","svelte-1wkgo86"),w(N,"class","svelte-1wkgo86"),w(h,"class","is-grid protagoniste svelte-1wkgo86"),k(h,"is-hidden",!t[0]),w(n,"class","svelte-1wkgo86")},m(e,r){p(e,n,r),f(n,s),f(n,c),f(n,i),f(n,o),f(n,a),O&&O.m(a,null),f(a,l),f(a,u),f(n,d),f(n,h),f(h,b),f(h,x),f(h,_),f(h,N),q||(j=[y(u,"click",t[3]),y(x,"click",t[8]),y(N,"click",t[9])],q=!0)},p(e,[t]){e[1]&&e[2]?O?O.p(e,t):(O=ce(e),O.c(),O.m(a,l)):O&&(O.d(1),O=null),1&t&&k(u,"pressed",e[0]),1&t&&k(h,"is-hidden",!e[0])},i:e,o:e,d(e){e&&m(n),O&&O.d(),q=!1,r(j)}}}function oe(e,t,n){let r,s;var c;o(e,se,(e=>n(10,r=e))),o(e,te,(e=>n(7,s=e)));let i,l=!1,u=!1;function d(){a(se,r=re.ONGOING,r)}function f(e){a(te,s.gender=e,s),a(te,s.nodes={},s),d()}return e.$$.update=()=>{128&e.$$.dirty&&n(1,u=0===Object.entries(s.nodes).length),192&e.$$.dirty&&n(2,i=((null===n(6,c=null==s?void 0:s.gender)||void 0===c?void 0:c.length)||0)>0)},[l,u,i,function(){n(0,l=!l)},d,f,c,s,()=>f("m"),()=>f("f")]}class ae extends X{constructor(e){super(),W(this,e,oe,ie,c,{})}}function le(t){let n,r,s,c,i,o,a,l,u,d,v,b,x,k,_,N,q,j,O,P,E,S,C;return{c(){n=g("div"),r=h("svg"),s=h("use"),c=$(),i=h("svg"),o=h("use"),a=$(),l=h("svg"),u=h("use"),d=$(),v=h("svg"),b=h("use"),x=$(),k=h("svg"),_=h("use"),N=$(),q=h("svg"),j=h("use"),O=$(),P=h("svg"),E=h("use"),w(s,"href","assets/sprite_icons.svg#home"),w(r,"class","icon navbar-icon svelte-1mz4axq"),w(o,"href","assets/sprite_icons.svg#square"),w(i,"class","icon navbar-icon svelte-1mz4axq"),w(u,"href","assets/sprite_icons.svg#square"),w(l,"class","icon navbar-icon svelte-1mz4axq"),w(b,"href","assets/sprite_icons.svg#square"),w(v,"class","icon navbar-icon svelte-1mz4axq"),w(_,"href","assets/sprite_icons.svg#square"),w(k,"class","icon navbar-icon svelte-1mz4axq"),w(j,"href","assets/sprite_icons.svg#square"),w(q,"class","icon navbar-icon svelte-1mz4axq"),w(E,"href","assets/sprite_icons.svg#square"),w(P,"class","icon navbar-icon svelte-1mz4axq"),w(n,"id","navbar"),w(n,"class","is-flex is-justify-content-center svelte-1mz4axq")},m(e,m){p(e,n,m),f(n,r),f(r,s),f(n,c),f(n,i),f(i,o),f(n,a),f(n,l),f(l,u),f(n,d),f(n,v),f(v,b),f(n,x),f(n,k),f(k,_),f(n,N),f(n,q),f(q,j),f(n,O),f(n,P),f(P,E),S||(C=y(r,"click",t[0]),S=!0)},p:e,i:e,o:e,d(e){e&&m(n),S=!1,C()}}}function ue(e){return[function(){se.set(re.PAUSED)}]}class de extends X{constructor(e){super(),W(this,e,ue,le,c,{})}}function fe(t){let n;return{c(){n=g("div"),n.innerHTML="<p>JON / Ayria :</p>",w(n,"class","is-flex header svelte-cjqldj")},m(e,t){p(e,n,t)},p:e,i:e,o:e,d(e){e&&m(n)}}}class pe extends X{constructor(e){super(),W(this,e,null,fe,c,{})}}const me=Z({},(function(e){const t=Array.from(Array(6).keys()).map((async e=>{const t=await fetch(`chapters/chapitre${String(e+1).padStart(2,"0")}.json`);if(t.ok){const e=await t.text();return JSON.parse(e)}throw new Error(`Impossible de lire le scénario n°${String(e+1).padStart(2,"0")}`)}));return Promise.all(t).then((t=>{const n=t.reduce(((e,t)=>Object.assign(Object.assign({},e),{[t.metadata.chapter]:t.dialogNodes})),{});e(n)})).catch((t=>{e({error:t.message})})),function(){}}));function ge(e,t,n){const r=e.slice();return r[22]=t[n],r}function he(e,t,n){const r=e.slice();return r[25]=t[n],r}function ve(t){let n;return{c(){n=g("p"),n.textContent="Chargement...",w(n,"class","svelte-1wyktwc")},m(e,t){p(e,n,t)},p:e,d(e){e&&m(n)}}}function $e(e){let t,n,r,s,c,i,o,a,l,u=[],d=new Map,h=[],v=new Map,y=e[3];const x=e=>e[25];for(let t=0;t<y.length;t+=1){let n=he(e,y,t),r=x(n);d.set(r,u[t]=ke(r,n))}let _=e[7];const N=e=>e[22];for(let t=0;t<_.length;t+=1){let n=ge(e,_,t),r=N(n);v.set(r,h[t]=Oe(r,n))}let q=e[4]&&Pe(e),j=e[5]&&Ee(e);return{c(){t=g("div");for(let e=0;e<u.length;e+=1)u[e].c();n=$(),r=g("div"),r.innerHTML='<p class="svelte-1wyktwc">...</p>',s=$(),c=g("div"),i=g("div");for(let e=0;e<h.length;e+=1)h[e].c();o=$(),q&&q.c(),a=$(),j&&j.c(),l=b(),w(r,"id","typing-container"),w(r,"class","svelte-1wyktwc"),k(r,"is-hidden",!e[8]),k(r,"npc1",e[9]),k(r,"player",e[10]),w(t,"id","dialog-container"),w(t,"class","svelte-1wyktwc"),w(i,"class","player svelte-1wyktwc"),k(i,"is-inline-flex",e[7].reduce(e[16],!1)),w(c,"id","answer-container"),w(c,"class","svelte-1wyktwc")},m(e,d){p(e,t,d);for(let e=0;e<u.length;e+=1)u[e].m(t,null);f(t,n),f(t,r),p(e,s,d),p(e,c,d),f(c,i);for(let e=0;e<h.length;e+=1)h[e].m(i,null);p(e,o,d),q&&q.m(e,d),p(e,a,d),j&&j.m(e,d),p(e,l,d)},p(e,s){15&s&&(y=e[3],u=J(u,s,x,1,e,y,d,t,B,ke,n,he)),256&s&&k(r,"is-hidden",!e[8]),512&s&&k(r,"npc1",e[9]),1024&s&&k(r,"player",e[10]),8327&s&&(_=e[7],h=J(h,s,N,1,e,_,v,i,B,Oe,null,ge)),133&s&&k(i,"is-inline-flex",e[7].reduce(e[16],!1)),e[4]?q?q.p(e,s):(q=Pe(e),q.c(),q.m(a.parentNode,a)):q&&(q.d(1),q=null),e[5]?j?j.p(e,s):(j=Ee(e),j.c(),j.m(l.parentNode,l)):j&&(j.d(1),j=null)},d(e){e&&m(t);for(let e=0;e<u.length;e+=1)u[e].d();e&&m(s),e&&m(c);for(let e=0;e<h.length;e+=1)h[e].d();e&&m(o),q&&q.d(e),e&&m(a),j&&j.d(e),e&&m(l)}}}function be(e){let t;function n(e,t){return e[0][e[2]][e[25]].text[e[1].language]instanceof Object?xe:we}let r=n(e),s=r(e);return{c(){t=g("p"),s.c(),w(t,"class","svelte-1wyktwc")},m(e,n){p(e,t,n),s.m(t,null)},p(e,c){r===(r=n(e))&&s?s.p(e,c):(s.d(1),s=r(e),s&&(s.c(),s.m(t,null)))},d(e){e&&m(t),s.d()}}}function ye(e){let t,n,r;return{c(){t=g("img"),t.src!==(n=e[0][e[2]][e[25]].imagePath)&&w(t,"src",n),w(t,"alt",r=e[0][e[2]][e[25]].imageAlt),w(t,"class","svelte-1wyktwc")},m(e,n){p(e,t,n)},p(e,s){13&s&&t.src!==(n=e[0][e[2]][e[25]].imagePath)&&w(t,"src",n),13&s&&r!==(r=e[0][e[2]][e[25]].imageAlt)&&w(t,"alt",r)},d(e){e&&m(t)}}}function we(e){let t,n=e[0][e[2]][e[25]].text[e[1].language]+"";return{c(){t=v(n)},m(e,n){p(e,t,n)},p(e,r){15&r&&n!==(n=e[0][e[2]][e[25]].text[e[1].language]+"")&&x(t,n)},d(e){e&&m(t)}}}function xe(e){let t,n=e[0][e[2]][e[25]].text[e[1].language][e[1].gender]+"";return{c(){t=v(n)},m(e,n){p(e,t,n)},p(e,r){15&r&&n!==(n=e[0][e[2]][e[25]].text[e[1].language][e[1].gender]+"")&&x(t,n)},d(e){e&&m(t)}}}function ke(e,t){let n;function r(e,t){return e[0][e[2]][e[25]].imagePath?ye:be}let s=r(t),c=s(t);return{key:e,first:null,c(){n=g("div"),c.c(),w(n,"class","svelte-1wyktwc"),k(n,"npc1","NPC1"===t[0][t[2]][t[25]].character),k(n,"player","Player"===t[0][t[2]][t[25]].character),k(n,"narrator","Narrator"===t[0][t[2]][t[25]].character),this.first=n},m(e,t){p(e,n,t),c.m(n,null)},p(e,i){s===(s=r(t=e))&&c?c.p(t,i):(c.d(1),c=s(t),c&&(c.c(),c.m(n,null))),13&i&&k(n,"npc1","NPC1"===t[0][t[2]][t[25]].character),13&i&&k(n,"player","Player"===t[0][t[2]][t[25]].character),13&i&&k(n,"narrator","Narrator"===t[0][t[2]][t[25]].character)},d(e){e&&m(n),c.d()}}}function _e(e){let t,n,r,s;function c(e,t){return e[0][e[2]][e[22]].text[e[1].language]instanceof Object?je:qe}let i=c(e),o=i(e);function a(){return e[15](e[22])}return{c(){t=g("p"),o.c(),n=$(),w(t,"class","choice svelte-1wyktwc")},m(e,c){p(e,t,c),o.m(t,null),f(t,n),r||(s=y(t,"click",a),r=!0)},p(r,s){i===(i=c(e=r))&&o?o.p(e,s):(o.d(1),o=i(e),o&&(o.c(),o.m(t,n)))},d(e){e&&m(t),o.d(),r=!1,s()}}}function Ne(e){let t,n,r,s,c;function i(){return e[14](e[22])}return{c(){t=g("img"),t.src!==(n=e[0][e[2]][e[22]].imagePath)&&w(t,"src",n),w(t,"alt",r=e[0][e[2]][e[22]].imageAlt),w(t,"class","svelte-1wyktwc")},m(e,n){p(e,t,n),s||(c=y(t,"click",i),s=!0)},p(s,c){e=s,133&c&&t.src!==(n=e[0][e[2]][e[22]].imagePath)&&w(t,"src",n),133&c&&r!==(r=e[0][e[2]][e[22]].imageAlt)&&w(t,"alt",r)},d(e){e&&m(t),s=!1,c()}}}function qe(e){let t,n=e[0][e[2]][e[22]].text[e[1].language]+"";return{c(){t=v(n)},m(e,n){p(e,t,n)},p(e,r){135&r&&n!==(n=e[0][e[2]][e[22]].text[e[1].language]+"")&&x(t,n)},d(e){e&&m(t)}}}function je(e){let t,n=e[0][e[2]][e[22]].text[e[1].language][e[1].gender]+"";return{c(){t=v(n)},m(e,n){p(e,t,n)},p(e,r){135&r&&n!==(n=e[0][e[2]][e[22]].text[e[1].language][e[1].gender]+"")&&x(t,n)},d(e){e&&m(t)}}}function Oe(e,t){let n,r;function s(e,t){return e[0][e[2]][e[22]].imagePath?Ne:_e}let c=s(t),i=c(t);return{key:e,first:null,c(){n=b(),i.c(),r=b(),this.first=n},m(e,t){p(e,n,t),i.m(e,t),p(e,r,t)},p(e,n){c===(c=s(t=e))&&i?i.p(t,n):(i.d(1),i=c(t),i&&(i.c(),i.m(r.parentNode,r)))},d(e){e&&m(n),i.d(e),e&&m(r)}}}function Pe(e){let t,n,r,s,c,i,o;return{c(){t=g("div"),n=g("p"),r=v("Continuer (Chapitre "),s=v(e[6]),c=v(") →"),w(n,"class","svelte-1wyktwc"),w(t,"id","next-chapter-container"),w(t,"class","svelte-1wyktwc")},m(a,l){p(a,t,l),f(t,n),f(n,r),f(n,s),f(n,c),i||(o=y(t,"click",e[12]),i=!0)},p(e,t){64&t&&x(s,e[6])},d(e){e&&m(t),i=!1,o()}}}function Ee(t){let n,r,s;return{c(){n=g("div"),n.innerHTML='<p class="svelte-1wyktwc">Fin de l&#39;Aventure (Résultats) →</p>',w(n,"id","next-chapter-container"),w(n,"class","svelte-1wyktwc")},m(e,c){p(e,n,c),r||(s=y(n,"click",t[11]),r=!0)},p:e,d(e){e&&m(n),r=!1,s()}}}function Se(t){let n;function r(e,t){return e[0][e[2]]?$e:ve}let s=r(t),c=s(t);return{c(){n=g("div"),c.c(),w(n,"id","dialog-container-background"),w(n,"class","svelte-1wyktwc")},m(e,t){p(e,n,t),c.m(n,null)},p(e,[t]){s===(s=r(e))&&c?c.p(e,t):(c.d(1),c=s(e),c&&(c.c(),c.m(n,null)))},i:e,o:e,d(e){e&&m(n),c.d()}}}function Ce(e,t,n){let r,s,c;o(e,me,(e=>n(0,r=e))),o(e,te,(e=>n(1,s=e))),o(e,ne,(e=>n(2,c=e)));var i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(s,c){function i(e){try{a(r.next(e))}catch(e){c(e)}}function o(e){try{a(r.throw(e))}catch(e){c(e)}}function a(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,o)}a((r=r.apply(e,t||[])).next())}))};let l,u,d=!1,f=!1,p=[],m=!1,g=!1,h=!1;function v(e,t=!1){var i;const o=t?["1"]:r[c][e].nextNodes,l=Object.entries(r[c]).filter((([e,t])=>o.includes(t.id))).map((([e,t])=>t));r[c][e||"1"].character;const $=l.reduce(((e,t)=>"Player"===e||"Player"===t.character?"Player":e),(null===(i=l[0])||void 0===i?void 0:i.character)||"NPC1");if(n(9,g="NPC1"===$),n(10,h="Player"===$),0===l.length){const e=Object.keys(r).reduce(((e,t)=>Number(t)>e?Number(t):e),1);n(6,u=Number(c)+1),e>=u?n(4,d=!0):n(5,f=!0)}else if("Player"===$&&l.length>1){setTimeout((()=>{!function(e){n(7,p=e)}(o)}),1e3)}else if("Narrator"===$)a(te,s.nodes[c]=[...s.nodes[c]||[],o[0]],s),v(o[0]);else{const e=Math.floor(251*Math.random()+500);setTimeout((()=>{n(8,m=!0);const e=Math.floor(1001*Math.random()+1e3);setTimeout((()=>{n(8,m=!1),a(te,s.nodes[c]=[...s.nodes[c]||[],o[0]],s),v(o[0])}),e)}),e)}}function $(e){n(7,p=[]),a(te,s.nodes[c]=[...s.nodes[c]||[],e],s),"Player"===r[c][e].character&&a(te,s.attribution=Object.keys(s.attribution).reduce(((t,[n,s])=>Object.assign(Object.assign({},t),{[n]:s+r[c][e].attribution[n]})),{leader:0,bricoleur:0,coequipier:0,planificateur:0,idealiste:0,creatif:0,audacieux:0,explorateur:0}),s),v(e)}function b(){if(Object.keys(r).length>0){const e=l[l.length-1];v(e,void 0===e)}else setTimeout(b,10)}var y;q((()=>i(void 0,void 0,void 0,(function*(){b()})))),y=()=>{window.scrollTo(0,document.body.scrollHeight)},N().$$.after_update.push(y);return e.$$.update=()=>{1&e.$$.dirty&&Object.keys(r).includes("error")&&se.set(re.ERROR),6&e.$$.dirty&&n(3,l=s.nodes[c]||[])},[r,s,c,l,d,f,u,p,m,g,h,function(){se.set(re.FINISHED)},function(){return i(this,void 0,void 0,(function*(){a(te,s.nodes[String(u)]=[],s),n(4,d=!1),yield(T(),S),v(void 0,!0)}))},$,e=>$(e),e=>$(e),(e,t)=>e||r[c][t].imagePath]}class Te extends X{constructor(e){super(),W(this,e,Ce,Se,c,{})}}function Ae(t){let n,r,s,c,i,o,a;return r=new de({}),c=new pe({}),o=new Te({}),{c(){n=g("main"),Q(r.$$.fragment),s=$(),Q(c.$$.fragment),i=$(),Q(o.$$.fragment),w(n,"class","svelte-12r0jps")},m(e,t){p(e,n,t),V(r,n,null),f(n,s),V(c,n,null),f(n,i),V(o,n,null),a=!0},p:e,i(e){a||(G(r.$$.fragment,e),G(c.$$.fragment,e),G(o.$$.fragment,e),a=!0)},o(e){F(r.$$.fragment,e),F(c.$$.fragment,e),F(o.$$.fragment,e),a=!1},d(e){e&&m(n),K(r),K(c),K(o)}}}class Me extends X{constructor(e){super(),W(this,e,null,Ae,c,{})}}function Ie(t){let n,r,s,c,i,o,a,l,u,d,h,b,y,k,_,N;return{c(){n=g("h3"),r=v("Le Planificateur ["),s=v(t[0]),c=v("]"),i=$(),o=g("h4"),o.textContent="🎯 Points forts :",a=$(),l=g("ul"),l.innerHTML='<li class="svelte-1dq7d4c"># Sens de la réflexion, de l&#39;analyse</li> \n  <li class="svelte-1dq7d4c"># Poursuite d&#39;objectifs structurés</li> \n  <li class="svelte-1dq7d4c"># Scénarisation fine des actions</li> \n  <li class="svelte-1dq7d4c"># Goût pour l&#39;anticipation et l&#39;évaluation</li>',u=$(),d=g("h4"),d.textContent="📜 Description :",h=$(),b=g("p"),b.textContent="S'il y a bien quelqu'un qui sait où il va, et comment il va y aller, c'est toi ! Et oui, avant d'agir, tu réfléchis, tu imagines, tu projettes les choses pour qu'elles se déroulent comme tu le souhaiterais. Que me faudra-t-il avoir ? Qui pourra m'aider ? Que dois-je savoir ou savoir faire ? Etc. Cela veut dire que tu as d'abord déterminé, de façon précise, ton ou tes objectifs. S'ensuit la mise au point d'un plan balisé en quelques grandes étapes. Bref, tu mets au point une véritable scénarisation de tes actions. Et tu définis souvent plusieurs scenarii (plan A, B, C …) pour t'assurer de tout anticiper, tout maîtriser.",y=$(),k=g("p"),k.textContent="Une fois ton plan lancé, tu t'attaches à suivre, pas à pas, chacune des tâches prévues. Cela te permet de bien évaluer ton avancement et donc de vérifier si tu es dans les temps par rapport à tes prévisions de départ. Cette maîtrise de choses et de leur déroulement, mais aussi ton état permanent de vigilance sur ce qui se passe et pourrait mettre à mal tes plans, te permet d'absorber les obstacles et surprises rencontrés en effectuant rapidement les changements nécessaires. Cette flexibilité doit garantir la poursuite de ton objectif de départ.",_=$(),N=g("p"),N.textContent="Un conseil : ne reste pas trop absorbé par ton besoin de tout contrôler, lâche prise aussi, en accueillant les imprévus pour explorer autre chose, cela te permettra de combiner les talents du planificateur et du bricoleur, deux profils souvent opposés, alors qu'ils sont en réalité très complémentaires !",w(n,"class","svelte-1dq7d4c"),w(l,"class","strengths svelte-1dq7d4c")},m(e,t){p(e,n,t),f(n,r),f(n,s),f(n,c),p(e,i,t),p(e,o,t),p(e,a,t),p(e,l,t),p(e,u,t),p(e,d,t),p(e,h,t),p(e,b,t),p(e,y,t),p(e,k,t),p(e,_,t),p(e,N,t)},p(e,[t]){1&t&&x(s,e[0])},i:e,o:e,d(e){e&&m(n),e&&m(i),e&&m(o),e&&m(a),e&&m(l),e&&m(u),e&&m(d),e&&m(h),e&&m(b),e&&m(y),e&&m(k),e&&m(_),e&&m(N)}}}function Re(e,t,n){let{score:r=0}=t;return e.$$set=e=>{"score"in e&&n(0,r=e.score)},[r]}class He extends X{constructor(e){super(),W(this,e,Re,Ie,c,{score:0})}}function Le(e){let t,n,r,s,c,i,o,a,l,u;var d=e[0][ze];return d&&(l=new d({props:{score:5}})),{c(){t=g("main"),n=g("div"),n.innerHTML="<h1>Félicitations!</h1> \n    <p>Belle aventure ! Félicitations et merci d’avoir joué ! <br/>\n      Voici les résultats du test :</p>",r=$(),s=g("div"),s.innerHTML='<h3 class="svelte-126j98e">Ton profil:</h3> \n    <h2 class="svelte-126j98e">Le planificateur</h2>',c=$(),i=g("div"),i.innerHTML='<img src="/assets/profile_results.svg" alt="Graphe des résultats" class="svelte-126j98e"/>',o=$(),a=g("div"),l&&Q(l.$$.fragment),w(n,"id","congratulations"),w(s,"id","profile"),w(s,"class","svelte-126j98e"),w(i,"id","graph"),w(i,"class","svelte-126j98e"),w(a,"id","description"),w(a,"class","svelte-126j98e"),w(t,"class","svelte-126j98e")},m(e,d){p(e,t,d),f(t,n),f(t,r),f(t,s),f(t,c),f(t,i),f(t,o),f(t,a),l&&V(l,a,null),u=!0},p(e,[t]){if(d!==(d=e[0][ze])){if(l){D();const e=l;F(e.$$.fragment,1,0,(()=>{K(e,1)})),U()}d?(l=new d({props:{score:5}}),Q(l.$$.fragment),G(l.$$.fragment,1),V(l,a,null)):l=null}},i(e){u||(l&&G(l.$$.fragment,e),u=!0)},o(e){l&&F(l.$$.fragment,e),u=!1},d(e){e&&m(t),l&&K(l)}}}let ze="planificateur";function De(e){const t={planificateur:He};return q((()=>{window.scrollTo(0,0)})),[t]}class Ue extends X{constructor(e){super(),W(this,e,De,Le,c,{})}}function Ge(t){let n,r,s,c,i,o,a,l,u,d;return{c(){n=g("main"),r=g("h1"),r.textContent="Voyage au bout du monde",s=$(),c=g("h3"),c.textContent="Une aventure d'introspection",i=$(),o=g("div"),a=g("p"),l=v("Une erreur est survenue lors du chargement des chapitres du jeu: "),u=g("br"),d=v(t[0]),w(r,"class","svelte-hxqzcc"),w(a,"class","error svelte-hxqzcc"),w(o,"class","error-container svelte-hxqzcc"),w(n,"class","svelte-hxqzcc")},m(e,t){p(e,n,t),f(n,r),f(n,s),f(n,c),f(n,i),f(n,o),f(o,a),f(a,l),f(a,u),f(a,d)},p:e,i:e,o:e,d(e){e&&m(n)}}}function Fe(e,t,n){let r;o(e,me,(e=>n(1,r=e)));return[r.error]}class Be extends X{constructor(e){super(),W(this,e,Fe,Ge,c,{})}}function Je(e){let t,n;return t=new ae({}),{c(){Q(t.$$.fragment)},m(e,r){V(t,e,r),n=!0},i(e){n||(G(t.$$.fragment,e),n=!0)},o(e){F(t.$$.fragment,e),n=!1},d(e){K(t,e)}}}function Qe(e){let t,n;return t=new Be({}),{c(){Q(t.$$.fragment)},m(e,r){V(t,e,r),n=!0},i(e){n||(G(t.$$.fragment,e),n=!0)},o(e){F(t.$$.fragment,e),n=!1},d(e){K(t,e)}}}function Ve(e){let t,n;return t=new Ue({}),{c(){Q(t.$$.fragment)},m(e,r){V(t,e,r),n=!0},i(e){n||(G(t.$$.fragment,e),n=!0)},o(e){F(t.$$.fragment,e),n=!1},d(e){K(t,e)}}}function Ke(e){let t,n;return t=new Me({}),{c(){Q(t.$$.fragment)},m(e,r){V(t,e,r),n=!0},i(e){n||(G(t.$$.fragment,e),n=!0)},o(e){F(t.$$.fragment,e),n=!1},d(e){K(t,e)}}}function We(e){let t,n,r,s;const c=[Ke,Ve,Qe,Je],i=[];function o(e,t){return e[0]?0:e[1]?1:e[2]?2:3}return t=o(e),n=i[t]=c[t](e),{c(){n.c(),r=b()},m(e,n){i[t].m(e,n),p(e,r,n),s=!0},p(e,[s]){let a=t;t=o(e),t!==a&&(D(),F(i[a],1,1,(()=>{i[a]=null})),U(),n=i[t],n||(n=i[t]=c[t](e),n.c()),G(n,1),n.m(r.parentNode,r))},i(e){s||(G(n),s=!0)},o(e){F(n),s=!1},d(e){i[t].d(e),e&&m(r)}}}function Xe(e,t,n){let r;o(e,se,(e=>n(3,r=e)));let s=!1,c=!1,i=!1;return q((()=>{const e=window.localStorage;e&&e.getItem("state")&&te.set(JSON.parse(e.getItem("state")))})),e.$$.update=()=>{8&e.$$.dirty&&n(0,s=r===re.ONGOING),8&e.$$.dirty&&n(1,c=r===re.FINISHED),8&e.$$.dirty&&n(2,i=r===re.ERROR)},[s,c,i,r]}return new class extends X{constructor(e){super(),W(this,e,Xe,We,c,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
