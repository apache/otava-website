"use strict";(self.webpackChunkapache_website_template=self.webpackChunkapache_website_template||[]).push([[48],{6396:(e,t,n)=>{n.r(t),n.d(t,{default:()=>pe});var a=n(6672),o=n(3526),i=n(2247),s=n(6012),l=n(9317),r=n(4223),c=n(2248),d=n(3179),u=n(1509);const m={backToTopButton:"backToTopButton_PBWZ",backToTopButtonShow:"backToTopButtonShow_K3CP"};var h=n(3420);function b(){const{shown:e,scrollToTop:t}=function(e){let{threshold:t}=e;const[n,o]=(0,a.useState)(!1),i=(0,a.useRef)(!1),{startScroll:s,cancelScroll:l}=(0,d.gk)();return(0,d.Mq)(((e,n)=>{let{scrollY:a}=e;const s=n?.scrollY;s&&(i.current?i.current=!1:a>=s?(l(),o(!1)):a<t?o(!1):a+window.innerHeight<document.documentElement.scrollHeight&&o(!0))})),(0,u.$)((e=>{e.location.hash&&(i.current=!0,o(!1))})),{shown:n,scrollToTop:()=>s(0)}}({threshold:300});return(0,h.jsx)("button",{"aria-label":(0,c.T)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,o.A)("clean-btn",s.G.common.backToTopButton,m.backToTopButton,e&&m.backToTopButtonShow),type:"button",onClick:t})}var p=n(7708),x=n(5291),f=n(714),j=n(1371),_=n(6063);function v(e){return(0,h.jsx)("svg",{width:"20",height:"20","aria-hidden":"true",...e,children:(0,h.jsxs)("g",{fill:"#7a7a7a",children:[(0,h.jsx)("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),(0,h.jsx)("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})]})})}const g="collapseSidebarButton_lBzZ",A="collapseSidebarButtonIcon_Gw6s";function C(e){let{onClick:t}=e;return(0,h.jsx)("button",{type:"button",title:(0,c.T)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,c.T)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,o.A)("button button--secondary button--outline",g),onClick:t,children:(0,h.jsx)(v,{className:A})})}var k=n(9924),S=n(3377);const T=Symbol("EmptyContext"),N=a.createContext(T);function I(e){let{children:t}=e;const[n,o]=(0,a.useState)(null),i=(0,a.useMemo)((()=>({expandedItem:n,setExpandedItem:o})),[n]);return(0,h.jsx)(N.Provider,{value:i,children:t})}var w=n(7823),y=n(5334),B=n(4826),L=n(9595);function E(e){let{collapsed:t,categoryLabel:n,onClick:a}=e;return(0,h.jsx)("button",{"aria-label":t?(0,c.T)({id:"theme.DocSidebarItem.expandCategoryAriaLabel",message:"Expand sidebar category '{label}'",description:"The ARIA label to expand the sidebar category"},{label:n}):(0,c.T)({id:"theme.DocSidebarItem.collapseCategoryAriaLabel",message:"Collapse sidebar category '{label}'",description:"The ARIA label to collapse the sidebar category"},{label:n}),"aria-expanded":!t,type:"button",className:"clean-btn menu__caret",onClick:a})}function G(e){let{item:t,onItemClick:n,activePath:i,level:r,index:c,...d}=e;const{items:u,label:m,collapsible:b,className:p,href:x}=t,{docs:{sidebar:{autoCollapseCategories:f}}}=(0,j.p)(),_=function(e){const t=(0,L.A)();return(0,a.useMemo)((()=>e.href&&!e.linkUnlisted?e.href:!t&&e.collapsible?(0,l.Nr)(e):void 0),[e,t])}(t),v=(0,l.w8)(t,i),g=(0,y.ys)(x,i),{collapsed:A,setCollapsed:C}=(0,w.u)({initialState:()=>!!b&&(!v&&t.collapsed)}),{expandedItem:k,setExpandedItem:I}=function(){const e=(0,a.useContext)(N);if(e===T)throw new S.dV("DocSidebarItemsExpandedStateProvider");return e}(),G=function(e){void 0===e&&(e=!A),I(e?null:c),C(e)};return function(e){let{isActive:t,collapsed:n,updateCollapsed:o}=e;const i=(0,S.ZC)(t);(0,a.useEffect)((()=>{t&&!i&&n&&o(!1)}),[t,i,n,o])}({isActive:v,collapsed:A,updateCollapsed:G}),(0,a.useEffect)((()=>{b&&null!=k&&k!==c&&f&&C(!0)}),[b,k,c,C,f]),(0,h.jsxs)("li",{className:(0,o.A)(s.G.docs.docSidebarItemCategory,s.G.docs.docSidebarItemCategoryLevel(r),"menu__list-item",{"menu__list-item--collapsed":A},p),children:[(0,h.jsxs)("div",{className:(0,o.A)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":g}),children:[(0,h.jsx)(B.A,{className:(0,o.A)("menu__link",{"menu__link--sublist":b,"menu__link--sublist-caret":!x&&b,"menu__link--active":v}),onClick:b?e=>{n?.(t),x?G(!1):(e.preventDefault(),G())}:()=>{n?.(t)},"aria-current":g?"page":void 0,role:b&&!x?"button":void 0,"aria-expanded":b&&!x?!A:void 0,href:b?_??"#":_,...d,children:m}),x&&b&&(0,h.jsx)(E,{collapsed:A,categoryLabel:m,onClick:e=>{e.preventDefault(),G()}})]}),(0,h.jsx)(w.N,{lazy:!0,as:"ul",className:"menu__list",collapsed:A,children:(0,h.jsx)(V,{items:u,tabIndex:A?-1:0,onItemClick:n,activePath:i,level:r+1})})]})}var M=n(8946),H=n(8400);const P="menuExternalLink_R1Is";function R(e){let{item:t,onItemClick:n,activePath:a,level:i,index:r,...c}=e;const{href:d,label:u,className:m,autoAddBaseUrl:b}=t,p=(0,l.w8)(t,a),x=(0,M.A)(d);return(0,h.jsx)("li",{className:(0,o.A)(s.G.docs.docSidebarItemLink,s.G.docs.docSidebarItemLinkLevel(i),"menu__list-item",m),children:(0,h.jsxs)(B.A,{className:(0,o.A)("menu__link",!x&&P,{"menu__link--active":p}),autoAddBaseUrl:b,"aria-current":p?"page":void 0,to:d,...x&&{onClick:n?()=>n(t):void 0},...c,children:[u,!x&&(0,h.jsx)(H.A,{})]})},u)}const W="menuHtmlItem_HzVw";function D(e){let{item:t,level:n,index:a}=e;const{value:i,defaultStyle:l,className:r}=t;return(0,h.jsx)("li",{className:(0,o.A)(s.G.docs.docSidebarItemLink,s.G.docs.docSidebarItemLinkLevel(n),l&&[W,"menu__list-item"],r),dangerouslySetInnerHTML:{__html:i}},a)}function z(e){let{item:t,...n}=e;switch(t.type){case"category":return(0,h.jsx)(G,{item:t,...n});case"html":return(0,h.jsx)(D,{item:t,...n});default:return(0,h.jsx)(R,{item:t,...n})}}function U(e){let{items:t,...n}=e;const a=(0,l.Y)(t,n.activePath);return(0,h.jsx)(I,{children:a.map(((e,t)=>(0,h.jsx)(z,{item:e,index:t,...n},t)))})}const V=(0,a.memo)(U),F="menu_UDKU",Y="menuWithAnnouncementBar_xYjx";function Z(e){let{path:t,sidebar:n,className:i}=e;const l=function(){const{isActive:e}=(0,k.M)(),[t,n]=(0,a.useState)(e);return(0,d.Mq)((t=>{let{scrollY:a}=t;e&&n(0===a)}),[e]),e&&t}();return(0,h.jsx)("nav",{"aria-label":(0,c.T)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,o.A)("menu thin-scrollbar",F,l&&Y,i),children:(0,h.jsx)("ul",{className:(0,o.A)(s.G.docs.docSidebarMenu,"menu__list"),children:(0,h.jsx)(V,{items:n,activePath:t,level:1})})})}const K="sidebar_OXGh",O="sidebarWithHideableNavbar_irIu",q="sidebarHidden_IG7c",X="sidebarLogo_Pd3h";function J(e){let{path:t,sidebar:n,onCollapse:a,isHidden:i}=e;const{navbar:{hideOnScroll:s},docs:{sidebar:{hideable:l}}}=(0,j.p)();return(0,h.jsxs)("div",{className:(0,o.A)(K,s&&O,i&&q),children:[s&&(0,h.jsx)(_.A,{tabIndex:-1,className:X}),(0,h.jsx)(Z,{path:t,sidebar:n}),l&&(0,h.jsx)(C,{onClick:a})]})}const $=a.memo(J);var Q=n(2361),ee=n(5413);const te=e=>{let{sidebar:t,path:n}=e;const a=(0,ee.M)();return(0,h.jsx)("ul",{className:(0,o.A)(s.G.docs.docSidebarMenu,"menu__list"),children:(0,h.jsx)(V,{items:t,activePath:n,onItemClick:e=>{"category"===e.type&&e.href&&a.toggle(),"link"===e.type&&a.toggle()},level:1})})};function ne(e){return(0,h.jsx)(Q.GX,{component:te,props:e})}const ae=a.memo(ne);function oe(e){const t=(0,f.l)(),n="desktop"===t||"ssr"===t,a="mobile"===t;return(0,h.jsxs)(h.Fragment,{children:[n&&(0,h.jsx)($,{...e}),a&&(0,h.jsx)(ae,{...e})]})}const ie={expandButton:"expandButton_mz0v",expandButtonIcon:"expandButtonIcon_h9xT"};function se(e){let{toggleSidebar:t}=e;return(0,h.jsx)("div",{className:ie.expandButton,title:(0,c.T)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,c.T)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t,children:(0,h.jsx)(v,{className:ie.expandButtonIcon})})}const le={docSidebarContainer:"docSidebarContainer_URiv",docSidebarContainerHidden:"docSidebarContainerHidden_pzlu",sidebarViewport:"sidebarViewport_Ytds"};function re(e){let{children:t}=e;const n=(0,r.t)();return(0,h.jsx)(a.Fragment,{children:t},n?.name??"noSidebar")}function ce(e){let{sidebar:t,hiddenSidebarContainer:n,setHiddenSidebarContainer:i}=e;const{pathname:l}=(0,x.zy)(),[r,c]=(0,a.useState)(!1),d=(0,a.useCallback)((()=>{r&&c(!1),!r&&(0,p.O)()&&c(!0),i((e=>!e))}),[i,r]);return(0,h.jsx)("aside",{className:(0,o.A)(s.G.docs.docSidebarContainer,le.docSidebarContainer,n&&le.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(le.docSidebarContainer)&&n&&c(!0)},children:(0,h.jsx)(re,{children:(0,h.jsxs)("div",{className:(0,o.A)(le.sidebarViewport,r&&le.sidebarViewportHidden),children:[(0,h.jsx)(oe,{sidebar:t,path:l,onCollapse:d,isHidden:r}),r&&(0,h.jsx)(se,{toggleSidebar:d})]})})})}const de={docMainContainer:"docMainContainer_GJ24",docMainContainerEnhanced:"docMainContainerEnhanced_tAne",docItemWrapperEnhanced:"docItemWrapperEnhanced_tbGt"};function ue(e){let{hiddenSidebarContainer:t,children:n}=e;const a=(0,r.t)();return(0,h.jsx)("main",{className:(0,o.A)(de.docMainContainer,(t||!a)&&de.docMainContainerEnhanced),children:(0,h.jsx)("div",{className:(0,o.A)("container padding-top--md padding-bottom--lg",de.docItemWrapper,t&&de.docItemWrapperEnhanced),children:n})})}const me={docRoot:"docRoot_NSiN",docsWrapper:"docsWrapper_Zh8j"};function he(e){let{children:t}=e;const n=(0,r.t)(),[o,i]=(0,a.useState)(!1);return(0,h.jsxs)("div",{className:me.docsWrapper,children:[(0,h.jsx)(b,{}),(0,h.jsxs)("div",{className:me.docRoot,children:[n&&(0,h.jsx)(ce,{sidebar:n.items,hiddenSidebarContainer:o,setHiddenSidebarContainer:i}),(0,h.jsx)(ue,{hiddenSidebarContainer:o,children:t})]})]})}var be=n(8117);function pe(e){const t=(0,l.B5)(e);if(!t)return(0,h.jsx)(be.A,{});const{docElement:n,sidebarName:a,sidebarItems:c}=t;return(0,h.jsx)(i.e3,{className:(0,o.A)(s.G.page.docsDocPage),children:(0,h.jsx)(r.V,{name:a,items:c,children:(0,h.jsx)(he,{children:n})})})}},8117:(e,t,n)=>{n.d(t,{A:()=>l});n(6672);var a=n(3526),o=n(2248),i=n(5060),s=n(3420);function l(e){let{className:t}=e;return(0,s.jsx)("main",{className:(0,a.A)("container margin-vert--xl",t),children:(0,s.jsx)("div",{className:"row",children:(0,s.jsxs)("div",{className:"col col--6 col--offset-3",children:[(0,s.jsx)(i.A,{as:"h1",className:"hero__title",children:(0,s.jsx)(o.A,{id:"theme.NotFound.title",description:"The title of the 404 page",children:"Page Not Found"})}),(0,s.jsx)("p",{children:(0,s.jsx)(o.A,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page",children:"We could not find what you were looking for."})}),(0,s.jsx)("p",{children:(0,s.jsx)(o.A,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page",children:"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."})})]})})})}}}]);