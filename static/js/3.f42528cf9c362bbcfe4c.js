webpackJsonp([3],{811:function(t,e,a){function n(t){a(833)}var o=a(127)(a(818),a(844),n,"data-v-497c7ea4",null);t.exports=o.exports},818:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{renderedMarkdown:""}},methods:{getReadme:function(){var t=this;this.$gitHubApi.getReadme(this).then(function(e){e.data&&(t.renderedMarkdown=t.$marked(e.data))})},back:function(){this.$router.go(-1)}},mounted:function(){var t=this;this.$nextTick(function(){t.getReadme()})}}},825:function(t,e,a){e=t.exports=a(809)(!1),e.push([t.i,".back[data-v-497c7ea4]{text-align:right;font-size:14px;color:#999;line-height:1;margin-bottom:2rem;border-bottom:1px solid #eee;padding-bottom:12px}.back span[data-v-497c7ea4]{cursor:pointer}.about-me[data-v-497c7ea4]{padding:60px 1rem 20px}",""])},833:function(t,e,a){var n=a(825);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(810)("1d35ea72",n,!0,{})},844:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"about-me"},[a("div",{staticClass:"back"},[a("span",{on:{click:t.back}},[t._v("<<返回")])]),t._v(" "),a("div",{staticClass:"about-main"},[a("article",{staticClass:"markdown-body",domProps:{innerHTML:t._s(t.renderedMarkdown)}})])])},staticRenderFns:[]}}});