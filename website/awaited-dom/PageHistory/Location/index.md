# Location

<div class='overview'>The <strong><code>Location</code></strong> interface represents the location (URL) of the object it is linked to. Changes done on it are reflected on the object it relates to. Both the <a href="/en-US/docs/Web/API/Document" title="The Document interface represents any web page loaded in the browser and serves as an entry point into the web page's content, which is the DOM tree."><code>Document</code></a> and <a href="/en-US/docs/Web/API/Window" title="The Window interface represents a window containing a DOM document; the document property points to the DOM document loaded in that window."><code>Window</code></a> interface have such a linked <code>Location</code>, accessible via <a href="/en-US/docs/Web/API/Document/location" title="The Document.location read-only property returns a Location object, which contains information about the URL of the document and provides methods for changing that URL and loading another URL."><code>Document.location</code></a> and <a href="/en-US/docs/Web/API/Window/location" title="The Window.location read-only property returns a Location object with information about the current location of the document."><code>Window.location</code></a> respectively.</div>

## Properties

<ul class="items properties">
  <li>
    <a href="">hash</a>
    <div>Is a <a href="/en-US/docs/Web/API/USVString" title="USVString corresponds to the set of all possible sequences of unicode scalar values. USVString maps to a String when returned in JavaScript; it's generally only used for APIs that perform text processing and need a string of unicode scalar values to operate on. USVString is equivalent to DOMString except for not allowing unpaired surrogate codepoints. Unpaired surrogate codepoints present in USVString are converted by the browser to Unicode 'replacement character' U+FFFD, (�)."><code>USVString</code></a> containing a <code>'#'</code> followed by the fragment identifier of the URL.</div>
  </li>
  <li>
    <a href="">host</a>
    <div>Is a <a href="/en-US/docs/Web/API/USVString" title="USVString corresponds to the set of all possible sequences of unicode scalar values. USVString maps to a String when returned in JavaScript; it's generally only used for APIs that perform text processing and need a string of unicode scalar values to operate on. USVString is equivalent to DOMString except for not allowing unpaired surrogate codepoints. Unpaired surrogate codepoints present in USVString are converted by the browser to Unicode 'replacement character' U+FFFD, (�)."><code>USVString</code></a> containing the host, that is the <em>hostname</em>, a <code>':'</code>, and the <em>port</em> of the URL.</div>
  </li>
  <li>
    <a href="">hostname</a>
    <div>Is a <a href="/en-US/docs/Web/API/USVString" title="USVString corresponds to the set of all possible sequences of unicode scalar values. USVString maps to a String when returned in JavaScript; it's generally only used for APIs that perform text processing and need a string of unicode scalar values to operate on. USVString is equivalent to DOMString except for not allowing unpaired surrogate codepoints. Unpaired surrogate codepoints present in USVString are converted by the browser to Unicode 'replacement character' U+FFFD, (�)."><code>USVString</code></a> containing the domain of the URL.</div>
  </li>
  <li>
    <a href="">href</a>
    <div>Is a stringifier that returns a <a href="/en-US/docs/Web/API/USVString" title="USVString corresponds to the set of all possible sequences of unicode scalar values. USVString maps to a String when returned in JavaScript; it's generally only used for APIs that perform text processing and need a string of unicode scalar values to operate on. USVString is equivalent to DOMString except for not allowing unpaired surrogate codepoints. Unpaired surrogate codepoints present in USVString are converted by the browser to Unicode 'replacement character' U+FFFD, (�)."><code>USVString</code></a> containing the entire URL. If changed, the associated document navigates to the new page. It can be set from a different origin than the associated document.</div>
  </li>
  <li>
    <a href="">origin</a>
    <div>Returns a <a href="/en-US/docs/Web/API/USVString" title="USVString corresponds to the set of all possible sequences of unicode scalar values. USVString maps to a String when returned in JavaScript; it's generally only used for APIs that perform text processing and need a string of unicode scalar values to operate on. USVString is equivalent to DOMString except for not allowing unpaired surrogate codepoints. Unpaired surrogate codepoints present in USVString are converted by the browser to Unicode 'replacement character' U+FFFD, (�)."><code>USVString</code></a> containing the canonical form of the origin of the specific location.</div>
  </li>
  <li>
    <a href="">pathname</a>
    <div>Is a <a href="/en-US/docs/Web/API/USVString" title="USVString corresponds to the set of all possible sequences of unicode scalar values. USVString maps to a String when returned in JavaScript; it's generally only used for APIs that perform text processing and need a string of unicode scalar values to operate on. USVString is equivalent to DOMString except for not allowing unpaired surrogate codepoints. Unpaired surrogate codepoints present in USVString are converted by the browser to Unicode 'replacement character' U+FFFD, (�)."><code>USVString</code></a> containing an initial <code>'/'</code> followed by the path of the URL.</div>
  </li>
  <li>
    <a href="">port</a>
    <div>Is a <a href="/en-US/docs/Web/API/USVString" title="USVString corresponds to the set of all possible sequences of unicode scalar values. USVString maps to a String when returned in JavaScript; it's generally only used for APIs that perform text processing and need a string of unicode scalar values to operate on. USVString is equivalent to DOMString except for not allowing unpaired surrogate codepoints. Unpaired surrogate codepoints present in USVString are converted by the browser to Unicode 'replacement character' U+FFFD, (�)."><code>USVString</code></a> containing the port number of the URL.</div>
  </li>
  <li>
    <a href="">protocol</a>
    <div>Is a <a href="/en-US/docs/Web/API/USVString" title="USVString corresponds to the set of all possible sequences of unicode scalar values. USVString maps to a String when returned in JavaScript; it's generally only used for APIs that perform text processing and need a string of unicode scalar values to operate on. USVString is equivalent to DOMString except for not allowing unpaired surrogate codepoints. Unpaired surrogate codepoints present in USVString are converted by the browser to Unicode 'replacement character' U+FFFD, (�)."><code>USVString</code></a> containing the protocol scheme of the URL, including the final <code>':'</code>.</div>
  </li>
  <li>
    <a href="">search</a>
    <div>Is a <a href="/en-US/docs/Web/API/USVString" title="USVString corresponds to the set of all possible sequences of unicode scalar values. USVString maps to a String when returned in JavaScript; it's generally only used for APIs that perform text processing and need a string of unicode scalar values to operate on. USVString is equivalent to DOMString except for not allowing unpaired surrogate codepoints. Unpaired surrogate codepoints present in USVString are converted by the browser to Unicode 'replacement character' U+FFFD, (�)."><code>USVString</code></a> containing a <code>'?'</code> followed by the parameters or "querystring" of the URL. Modern browsers provide <a href="/en-US/docs/Web/API/URLSearchParams/get#Example">URLSearchParams</a> and <a href="/en-US/docs/Web/API/URL/searchParams#Example">URL.searchParams</a> to make it easy to parse out the parameters from the querystring.</div>
  </li>
</ul>

## Methods

<ul class="items methods">
  <li>
    <a href="">assign()</a>
    <div>Loads the resource at the URL provided in parameter.</div>
  </li>
  <li>
    <a href="">reload()</a>
    <div>Reloads the resource from the current URL. Its optional unique parameter is a <a href="/en-US/docs/Web/API/Boolean" title="REDIRECT Boolean [en-US]"><code>Boolean</code></a>, which, when it is <code>true</code>, causes the page to always be reloaded from the server. If it is <code>false</code> or not specified, the browser may reload the page from its cache.</div>
  </li>
  <li>
    <a href="">replace()</a>
    <div>Replaces the current resource with the one at the provided URL. The difference from the <code>assign()</code> method is that after using <code>replace()</code> the current page will not be saved in session <a href="/en-US/docs/Web/API/History" title="The History interface allows&nbsp;manipulation of&nbsp;the browser session history, that is the pages visited in the tab or frame that the current page is loaded in."><code>History</code></a>, meaning the user won't be able to use the <em>back</em> button to navigate to it.</div>
  </li>
  <li>
    <a href="">toString()</a>
    <div>Returns a <a href="/en-US/docs/Web/API/USVString" title="USVString corresponds to the set of all possible sequences of unicode scalar values. USVString maps to a String when returned in JavaScript; it's generally only used for APIs that perform text processing and need a string of unicode scalar values to operate on. USVString is equivalent to DOMString except for not allowing unpaired surrogate codepoints. Unpaired surrogate codepoints present in USVString are converted by the browser to Unicode 'replacement character' U+FFFD, (�)."><code>USVString</code></a> containing the whole URL. It is a synonym for <a href="/en-US/docs/Web/API/HTMLHyperlinkElementUtils/href" title="The HTMLHyperlinkElementUtils.href property is a stringifier that returns a USVString containing the whole URL, and allows the href to be updated."><code>HTMLHyperlinkElementUtils.href</code></a>, though it can't be used to modify the value.</div>
  </li>
</ul>

## Events