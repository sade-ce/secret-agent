(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1001:function(t,e,n){"use strict";n.r(e);var r,i=n(56),o=n(82),a=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=function(t,e,n,r){var i,o=arguments.length,a=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,r);else for(var s=t.length-1;s>=0;s--)(i=t[s])&&(a=(o<3?i(a):o>3?i(e,n,a):i(e,n))||a);return o>3&&a&&Object.defineProperty(e,n,a),a},u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return a(e,t),Object.defineProperty(e.prototype,"subtitles",{get:function(){return this.$page.record.subtitles.filter((function(t,e,n){return[2,3].includes(t.depth)}))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"currentPath",{get:function(){return this.$route.matched[0].path},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"editLink",{get:function(){var t=this.currentPath;return 1==(t.match(new RegExp("/","g"))||[]).length&&(t+="/README"),"https://github.com/ulixee/secret-agent/blob/master/website"+t+".md"},enumerable:!0,configurable:!0}),e=s([Object(i.a)({metaInfo:function(){var t=this.$page.record,e=t.title,n=t.headings;return{title:e||(n.length?n[0].value:void 0)}},components:{GithubLogo:o.a}})],e)}(i.b),c=(n(771),n(1)),l=n(772),f=Object(c.a)(u,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("CoreLayout",{staticClass:"has-sidebar AwaitedDomPage",attrs:{footer:!1}},[n("div",{staticClass:"container flex flex-align-top"},[n("Section",{staticClass:"doc-content flex-fit",attrs:{container:"base"}},[n("VueRemarkContent",{staticClass:"post mb"}),n("p",[n("a",{staticClass:"github-edit-link",attrs:{href:t.editLink,target:"_blank"}},[n("GithubLogo"),n("span",[t._v("Edit this page on GitHub")])],1)])],1),n("div",{staticClass:"sidebar sidebar--right hide-for-small"},[t.subtitles.length>0&&3!==t.subtitles[0].depth?[n("h3",[t._v("On this page")]),t.subtitles.length?n("ul",{staticClass:"menu-item submenu"},t._l(t.subtitles,(function(e){return n("li",{key:e.value,staticClass:"submenu__item",class:"submenu__item-depth-"+e.depth},[n("a",{staticClass:"submenu__link",attrs:{href:e.anchor}},[t._v(t._s(e.value))])])})),0):t._e()]:t._e()],2)],1)])}),[],!1,null,null,null);"function"==typeof l.default&&Object(l.default)(f);e.default=f.exports},707:function(t,e,n){},708:function(t,e){},771:function(t,e,n){"use strict";var r=n(707);n.n(r).a},772:function(t,e,n){"use strict";var r=n(708),i=n.n(r);e.default=i.a}}]);