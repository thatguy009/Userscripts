// ==UserScript==
// @name         Override window.open and other dialog functions
// @namespace    https://github.com/thatguy009
// @version      0.2
// @description
// @author       You
// @match        *://*/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/a11y-dialog@7/dist/a11y-dialog.min.js
// ==/UserScript==

//TODO: Other dialog functions

window.open = ((open) => (url, name = "default_window_name", features) => {
  if (confirm(`Open ${url}?`)) {
    return open.call(window, url, name, features);
  }
})(window.open);
