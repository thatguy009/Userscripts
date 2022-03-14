// ==UserScript==
// @name         Override window.open to confirm the use actually wants to open a new window
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Shift 2 to speed up x2, Shift 1 of regular
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

window.open = (open => {

    return function (url, name, features) {
        // set name if missing here
        name = name || "default_window_name";
        if (confirm("Open " + url + "?")) {
            return open.call(window, url, name, features);
        }
    };
})(window.open);