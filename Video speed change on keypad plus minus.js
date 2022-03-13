// ==UserScript==
// @name         Video speed, other stuff
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Shift 2 to speed up x2, Shift 1 of regular
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    try {
        console.log("Keypress video changer loaded on: " + location.href);
        var eventt = document.addEventListener("keypress", function (evt) {
            var speed = (evt.keyCode == 45);
            var normal = (evt.keyCode == 43);
            console.log("Pressed key: " + evt.keyCode);
            if (normal) {
                RegularSpeed();
            } else if (speed) {
                console.log("Speed up clicked");
                SpeedUp();
            }
        });
    } catch (error) {
        //do nothing
    }

    function SpeedUp() {
        for (var a of document.getElementsByTagName('video')) {
            if (a.playbackRate == 1) {
                a.playbackRate = 2;
            } else {
                a.playbackRate = a.playbackRate + 0.5;
            }
            console.log("Set video " + a.src + " speed to " + a.playbackRate);
            ShowSpeedChange(a);
        }
    }

    function RegularSpeed() {
        for (var b of document.getElementsByTagName('video')) {
            b.playbackRate = 1;
            ShowSpeedChange(b);
        }
        console.log("Set video speed to 1");
    }
    if (location.href.indexOf("youtube") > -1) {
        setInterval(function () {
            var closeBtn = document.querySelector('.close-button');
            if (closeBtn !== null) {
                closeBtn.click();
                console.log('Closed add window');
            }
        }, 500);
    }
    function ShowSpeedChange(vid) {
        let rect = vid.getBoundingClientRect();
        var txtID = "_speedText_" + Date.parse(new Date()) + Math.random();
        let speedText = document.createElement("p");
        speedText.id = txtID;
        speedText.style.fontSize = "large";
        speedText.style.color = "white";
        speedText.style.position = "fixed";
        speedText.style.top = (rect.top + 20).toString() + "px";
        speedText.style.left = (rect.left + 20).toString() + "px";
        speedText.style.zIndex = vid.style.zIndex + 100;
        speedText.style.textShadow = "black 0px 0px 8px";
        speedText.innerText = "Speed set to: x" + vid.playbackRate;
        document.body.appendChild(speedText);

        setTimeout(function () {
            let doc = document.getElementById(txtID);
            if (doc !== null) {
                doc.remove();
            } else {
                //Just in case there are multiples
                document.querySelectorAll("[id^='_speedText_']").forEach(e => e.remove());
            }
        }, 250);
    }
})();

window.open = function (open) {

    return function (url, name, features) {
        // set name if missing here
        name = name || "default_window_name";
        if (confirm("Open " + url + "?")) {
            return open.call(window, url, name, features);
        }
    };
}(window.open);