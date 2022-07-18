// ==UserScript==
// @name         Custom context menu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  custom context menu for various sites
// @author       You
// @run-at       context-menu
// @match        *://*/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

GM_registerMenuCommand("Default menu", () => {
    alert(`Called Default menu on ${location.href}`);
    debugger;
});

["Thing 1", "Thing 2", "Thing 3"].forEach(thing => GM_registerMenuCommand(`Alert for ${thing}`, () => {
    alert(thing);
}));

if (location.hostname == "e621.net") {
    const s = location.search;
    const search = unescape(s.substring(s.indexOf('=') + 1).split('&')[0]).split('+').filter(t => t.indexOf('order:') == -1);

    ["-id", "id", "score"].forEach(searchType => GM_registerMenuCommand(`Sort by ${searchType}`, () => {
        location.search = `?tags=${escape(search.join('+'))}+order:${escape(searchType)}`;
    }));

    ["score:>=100", "favcount:>=100"].forEach(filterType => GM_registerMenuCommand(`Add Filter ${filterType}`, () => {
        search.push(filterType);
        location.search = `?tags=${escape(search.join('+'))}`;
    }));
}
