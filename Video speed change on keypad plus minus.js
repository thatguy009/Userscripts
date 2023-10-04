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

(() => {
  console.log(`Keypress video changer loaded on: ${location.href}`);

  //Bind the speed change functions to the numpad plus and minus keys.
  document.addEventListener("keypress", (evt) => {
    if (evt.code == "NumpadAdd") {
      RegularSpeed();
    } else if (evt.code == "NumpadSubtract") {
      SpeedUp();
    }
  });

  /**
   * Increases the playback speed of all video elements on the page by 0.5 or sets it to 2 if it's currently at 1.
   * @returns {void}
   */
  function SpeedUp() {
    for (const a of document.getElementsByTagName("video")) {
      a.playbackRate = a.playbackRate == 1 ? 2 : a.playbackRate + 0.5;
      ShowSpeedChange(a);
    }
  }

  /**
   * Sets the playback speed of all video elements to regular speed (1x).
   * @function
   * @name RegularSpeed
   * @returns {void}
   */
  function RegularSpeed() {
    for (const b of document.getElementsByTagName("video")) {
      b.playbackRate = 1;
      ShowSpeedChange(b);
    }
  }

  /**
   * Displays the current playback speed of a video and removes it after 250ms.
   * @param {HTMLVideoElement} vid - The video element to display the speed for.
   */
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
