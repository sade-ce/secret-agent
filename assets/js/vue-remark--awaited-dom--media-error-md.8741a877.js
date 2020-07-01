(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{695:function(e,t,r){"use strict";t.a={name:"VueRemarkRoot",render:function(e){return e("div",null,this.$slots.default)}}},859:function(e,t,r){"use strict";r.r(t);var o=r(1),a=r(695),i=r(0);function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}i.a.config.optionMergeStrategies;var s={VueRemarkRoot:a.a},d=function(e){var t=e.options.components=e.options.components||{},r=e.options.computed=e.options.computed||{};Object.keys(s).forEach((function(e){"object"===n(s[e])&&"function"==typeof s[e].render?t[e]=s[e]:r[e]=function(){return s[e]}}))},c=i.a.config.optionMergeStrategies,u="__vueRemarkFrontMatter",l={excerpt:null,title:"MediaError"};var p=function(e){e.options[u]&&(e.options[u]=l),i.a.util.defineReactive(e.options,u,l),e.options.computed=c.computed({$frontmatter:function(){return e.options[u]}},e.options.computed)},h=Object(o.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("VueRemarkRoot",[r("h1",{attrs:{id:"mediaerror"}},[r("a",{attrs:{href:"#mediaerror","aria-hidden":"true"}},[e._v("#")]),e._v("MediaError")]),r("div",{staticClass:"overview"},[r("span",{staticClass:"seoSummary"},[e._v("The "),r("code",[r("strong",[e._v("MediaError")])]),e._v(" interface represents an error which occurred while handling media in an HTML media element based on "),r("a",{attrs:{href:"/en-US/docs/Web/API/HTMLMediaElement",title:"The HTMLMediaElement interface adds to HTMLElement the properties and methods needed to support basic media-related capabilities that are common to audio and video."}},[r("code",[e._v("HTMLMediaElement")])]),e._v(", such as "),r("a",{attrs:{href:"/en-US/docs/Web/HTML/Element/audio",title:"The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element:&nbsp;the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream."}},[r("code",[e._v("<audio>")])]),e._v(" or "),r("a",{attrs:{href:"/en-US/docs/Web/HTML/Element/video",title:"The&nbsp;HTML Video element&nbsp;(<video>) embeds a media player which supports video playback into the document.&nbsp;You can use&nbsp;<video>&nbsp;for audio content as well, but the <audio> element may provide a more appropriate user experience."}},[r("code",[e._v("<video>")])]),e._v(".")])]),r("div",{staticClass:"overview"},[e._v("A "),r("code",[e._v("MediaError")]),e._v(" object describes the error in general terms using a numeric "),r("code",[e._v("code")]),e._v(" categorizing the kind of error, and a "),r("code",[e._v("message")]),e._v(", which provides specific diagnostics about what went wrong.")]),r("h2",{attrs:{id:"properties"}},[r("a",{attrs:{href:"#properties","aria-hidden":"true"}},[e._v("#")]),e._v("Properties")]),r("h3",{attrs:{id:"code"}},[r("a",{attrs:{href:"#code","aria-hidden":"true"}},[e._v("#")]),e._v(".code "),r("div",{staticClass:"specs"},[r("i",[e._v("W3C")])])]),r("p",[e._v("A number which represents the general type of error that occurred, as follows: "),r("table",{staticClass:"standard-table"})]),r("thead",[r("tr",[r("th",{attrs:{scope:"col"}},[e._v("Name")]),r("th",{attrs:{scope:"col"}},[e._v("Value")]),r("th",{attrs:{scope:"col"}},[e._v("Description")])])]),r("tbody",[r("tr",[r("td",[r("code",[e._v("MEDIA_ERR_ABORTED")])]),r("td",[r("code",[e._v("1")])]),r("td",[e._v("The fetching of the associated resource was aborted by the user's request.")])]),r("tr",[r("td",[r("code",[e._v("MEDIA_ERR_NETWORK")])]),r("td",[r("code",[e._v("2")])]),r("td",[e._v("Some kind of network error occurred which prevented the media from being successfully fetched, despite having previously been available.")])]),r("tr",[r("td",[r("code",[e._v("MEDIA_ERR_DECODE")])]),r("td",[r("code",[e._v("3")])]),r("td",[e._v("Despite having previously been determined to be usable, an error occurred while trying to decode the media resource, resulting in an error.")])]),r("tr",[r("td",[r("code",[e._v("MEDIA_ERR_SRC_NOT_SUPPORTED")])]),r("td",[r("code",[e._v("4")])]),r("td",[e._v("The associated resource or media provider object (such as a "),r("a",{attrs:{href:"/en-US/docs/Web/API/MediaStream",title:"The MediaStream interface represents a stream of media content. A stream consists of several tracks such as&nbsp;video or audio tracks. Each track is specified as an instance of MediaStreamTrack."}},[r("code",[e._v("MediaStream")])]),e._v(") has been found to be unsuitable.")])])]),r("h4",{attrs:{id:"type-null"}},[r("a",{attrs:{href:"#type-null","aria-hidden":"true"}},[e._v("#")]),r("strong",[e._v("Type")]),e._v(": "),r("code",{pre:!0},[e._v("null")])]),r("h3",{attrs:{id:"message"}},[r("a",{attrs:{href:"#message","aria-hidden":"true"}},[e._v("#")]),e._v(".message "),r("div",{staticClass:"specs"},[r("i",[e._v("W3C")])])]),r("p",[e._v("A "),r("a",{attrs:{href:"/en-US/docs/Web/API/DOMString",title:"DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String."}},[r("code",[e._v("DOMString")])]),e._v(" object containing a human-readable string which provides "),r("em",[e._v("specific diagnostic information")]),e._v(" to help the reader understand the error condition which occurred; specifically, it isn't simply a summary of what the error code means, but actual diagnostic information to help in understanding what exactly went wrong. This text and its format is not defined by the specification and will vary from one "),r("a",{staticClass:"glossaryLink",attrs:{href:"/en-US/docs/Glossary/user_agent",title:"user agent: A user agent is a computer program representing a person, for example, a browser in a Web context."}},[e._v("user agent")]),e._v(" to another. If no diagnostics are available, or no explanation can be provided, this value is an empty string ("),r("code",[e._v('""')]),e._v(").")]),r("h4",{attrs:{id:"type-null-1"}},[r("a",{attrs:{href:"#type-null-1","aria-hidden":"true"}},[e._v("#")]),r("strong",[e._v("Type")]),e._v(": "),r("code",{pre:!0},[e._v("null")])]),r("h2",{attrs:{id:"methods"}},[r("a",{attrs:{href:"#methods","aria-hidden":"true"}},[e._v("#")]),e._v("Methods")]),r("h2",{attrs:{id:"events"}},[r("a",{attrs:{href:"#events","aria-hidden":"true"}},[e._v("#")]),e._v("Events")])])}),[],!1,null,null,null);"function"==typeof d&&d(h),"function"==typeof p&&p(h);t.default=h.exports}}]);