import{i as R,ka as l,pa as F,ra as q}from"./chunk-FORXNZXY.js";import{$ as d,Hb as M,I as h,Ib as I,K as m,M as v,N as k,Pb as C,R as a,Ta as w,Ua as D,Xa as S,c as y,cc as j,ea as f,gb as x,ja as g}from"./chunk-MWIEHVRQ.js";import{a as c,b as u}from"./chunk-DAQOROHW.js";var O={production:!0,apiUrl:"https://worthy-love-9e46cd36dc.strapiapp.com"};var P=O.apiUrl;function oe(e){e||(e=a(d));let o=new y(t=>{if(e.destroyed){t.next();return}return e.onDestroy(t.next.bind(t))});return t=>t.pipe(h(o))}function re(e,o){let n=!o?.manualCleanup?o?.injector?.get(d)??a(d):null,r=z(o?.equal),s;o?.requireSync?s=f({kind:0},{equal:r}):s=f({kind:1,value:o?.initialValue},{equal:r});let p,b=e.subscribe({next:i=>s.set({kind:1,value:i}),error:i=>{s.set({kind:2,error:i}),p?.()},complete:()=>{p?.()}});if(o?.requireSync&&s().kind===0)throw new m(601,!1);return p=n?.onDestroy(b.unsubscribe.bind(b)),j(()=>{let i=s();switch(i.kind){case 1:return i.value;case 2:throw i.error;case 0:throw new m(601,!1)}},{equal:o?.equal})}function z(e=Object.is){return(o,t)=>o.kind===1&&t.kind===1&&e(o.value,t.value)}var U=`
    .p-skeleton {
        display: block;
        overflow: hidden;
        background: dt('skeleton.background');
        border-radius: dt('skeleton.border.radius');
    }

    .p-skeleton::after {
        content: '';
        animation: p-skeleton-animation 1.2s infinite;
        height: 100%;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(-100%);
        z-index: 1;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), dt('skeleton.animation.background'), rgba(255, 255, 255, 0));
    }

    [dir='rtl'] .p-skeleton::after {
        animation-name: p-skeleton-animation-rtl;
    }

    .p-skeleton-circle {
        border-radius: 50%;
    }

    .p-skeleton-animation-none::after {
        animation: none;
    }

    @keyframes p-skeleton-animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }

    @keyframes p-skeleton-animation-rtl {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(-100%);
        }
    }
`;var T={root:{position:"relative"}},B={root:({instance:e})=>["p-skeleton p-component",{"p-skeleton-circle":e.shape==="circle","p-skeleton-animation-none":e.animation==="none"}]},E=(()=>{class e extends F{name="skeleton";theme=U;classes=B;inlineStyles=T;static \u0275fac=(()=>{let t;return function(r){return(t||(t=g(e)))(r||e)}})();static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})();var X=(()=>{class e extends q{styleClass;shape="rectangle";animation="wave";borderRadius;size;width="100%";height="1rem";_componentStyle=a(E);get containerStyle(){let t=this._componentStyle?.inlineStyles.root,n;return this.size?n=u(c({},t),{width:this.size,height:this.size,borderRadius:this.borderRadius}):n=u(c({},t),{width:this.width,height:this.height,borderRadius:this.borderRadius}),n}static \u0275fac=(()=>{let t;return function(r){return(t||(t=g(e)))(r||e)}})();static \u0275cmp=w({type:e,selectors:[["p-skeleton"]],hostVars:7,hostBindings:function(n,r){n&2&&(x("aria-hidden",!0)("data-pc-name","skeleton")("data-pc-section","root"),M(r.containerStyle),I(r.cn(r.cx("root"),r.styleClass)))},inputs:{styleClass:"styleClass",shape:"shape",animation:"animation",borderRadius:"borderRadius",size:"size",width:"width",height:"height"},features:[C([E]),S],decls:0,vars:0,template:function(n,r){},dependencies:[R,l],encapsulation:2,changeDetection:0})}return e})(),we=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=D({type:e});static \u0275inj=k({imports:[X,l,l]})}return e})();export{P as a,oe as b,re as c,X as d,we as e};
