// ==UserScript==
// @name         Video speed, other stuff
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Shift 2 to speed up x2, Shift 1 of regular
// @author       You
// @match        *://*/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/thatguy009/Userscripts/main/Video%20speed%20change%20on%20keypad%20plus%20minus.js
// @updateURL    https://raw.githubusercontent.com/thatguy009/Userscripts/main/Video%20speed%20change%20on%20keypad%20plus%20minus.js
// ==/UserScript==
//TODO: Automate version increments commit (pre\post?)

(function () {
  console.log(`Keypress video changer loaded on: ${location.href}`);
  document.addEventListener("keypress", (evt) => {
    if (evt.code == "NumpadAdd") {
      RegularSpeed();
    } else if (evt.code == "NumpadSubtract") {
      SpeedUp();
    }
  });

  function SpeedUp() {
    for (const a of document.getElementsByTagName("video")) {
      a.playbackRate = a.playbackRate == 1 ? 2 : a.playbackRate + 0.5;
      ShowSpeedChange(a);
    }
  }

  function RegularSpeed() {
    for (const b of document.getElementsByTagName("video")) {
      b.playbackRate = 1;
      ShowSpeedChange(b);
    }
  }

  function ShowSpeedChange(vid) {
    const rect = vid.getBoundingClientRect();
    const txtID = `_speedText_${Date.parse(new Date())}${Math.random()}`;
    const innerText = `Speed set to: x${vid.playbackRate}`;

    const speedText = document.createElement("p");

    speedText.className = txtID;
    speedText.style.fontSize = "large";
    speedText.style.color = "white";
    speedText.style.position = "fixed";
    speedText.style.top = `${(rect.top + 20).toString()}px`;
    speedText.style.left = `${(rect.left + 20).toString()}px`;
    speedText.style.zIndex = vid.style.zIndex + 100;
    speedText.style.textShadow = "black 0px 0px 8px";
    speedText.innerText = innerText;

    document.body.appendChild(speedText);

    console.log(`Set video ${vid.src} speed to ${vid.playbackRate}`);

    setTimeout(
      () =>
        document
          .querySelectorAll("[class^='_speedText_']")
          .forEach((e) => e.remove()),
      250,
    );
  }
})();
