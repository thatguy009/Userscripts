// ==UserScript==
// @name         Video speed, other stuff
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Shift 2 to speed up x2, Shift 1 of regular
// @author       You
// @match        *://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/thatguy009/Userscripts/main/Video%20speed%20change%20on%20keypad%20plus%20minus.js
// ==/UserScript==
//TODO: Automate version increments commit (pre\post?)

(function () {
    'use strict';
    try {
        console.log(`Keypress video changer loaded on: ${location.href}`);
        document.addEventListener("keypress", function (evt) {
            const speed = (evt.keyCode == 45);
            const normal = (evt.keyCode == 43);
            console.log(`Pressed key: ${evt.keyCode}`);
            console.log(`Pressed key: ${evt.code}`);
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
        for (const a of document.getElementsByTagName('video')) {
            a.playbackRate = a.playbackRate == 1 ? 2 : a.playbackRate + 0.5;
            console.log(`Set video ${a.src} speed to ${a.playbackRate}`);
            ShowSpeedChange(a);
        }
    }

    function RegularSpeed() {
        for (const b of document.getElementsByTagName('video')) {
            b.playbackRate = 1;
            ShowSpeedChange(b);
        }
        console.log("Set video speed to 1");
    }

    //TODO: Test this on a variety of websites
    function ShowSpeedChange(vid) {
        const rect = vid.getBoundingClientRect();
        const txtID = `_speedText_${Date.parse(new Date())}${Math.random()}`;
        const speedText = document.createElement("p");
        speedText.className = txtID;
        speedText.style.fontSize = "large";
        speedText.style.color = "white";
        speedText.style.position = "fixed";
        speedText.style.top = `${(rect.top + 20).toString()}px`;
        speedText.style.left = `${(rect.left + 20).toString()}px`;
        speedText.style.zIndex = vid.style.zIndex + 100;
        speedText.style.textShadow = "black 0px 0px 8px";
        speedText.innerText = `Speed set to: x${vid.playbackRate}`;
        document.body.appendChild(speedText);

        setTimeout(function () {
            const doc = document.getElementById(txtID);
            if (doc !== null) {
                doc.remove();
            } else {
                document.querySelectorAll("[id^='_speedText_']").forEach(e => e.remove());
            }
        }, 250);
    }
})();