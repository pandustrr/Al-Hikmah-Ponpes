import{j as e,L as t}from"./app-BxjEA7uM.js";function i({items:r=[]}){return r.length===0?null:e.jsxs("div",{className:"bg-white border-y border-sage-light py-2 overflow-hidden",children:[e.jsxs("div",{className:"max-w-7xl mx-auto px-4 flex items-center",children:[e.jsx("div",{className:"flex-shrink-0 bg-brand-primary text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1 mr-4 z-10",children:"TERKINI"}),e.jsx("div",{className:"relative flex-grow overflow-hidden h-6",children:e.jsxs("div",{className:"absolute whitespace-nowrap animate-marquee flex items-center gap-8",children:[r.map((a,s)=>e.jsxs(t,{href:`/berita/${a.slug}`,className:"text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors flex items-center gap-2",children:[e.jsx("span",{className:"text-sage-mid",children:"•"}),a.judul]},s)),r.length<5&&r.map((a,s)=>e.jsxs(t,{href:`/berita/${a.slug}`,className:"text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors flex items-center gap-2",children:[e.jsx("span",{className:"text-sage-mid",children:"•"}),a.judul]},`dup-${s}`))]})})]}),e.jsx("style",{dangerouslySetInnerHTML:{__html:`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}})]})}export{i as default};
