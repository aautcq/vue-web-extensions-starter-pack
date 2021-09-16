/*
** foreground/index.js
** Temporary workaround for keeping background service worker awake
** See https://bugs.chromium.org/p/chromium/issues/detail?id=1024211
** Vue web extension starter pack app | 2021
*/

'use strict';


// init -----------------------------------------------------------------------


window.webextension = window.webextension || {};


// methods --------------------------------------------------------------------


// send data to background
window.webextension.send = window.webextension.send || ((label, data = null) => new Promise((resolve, reject) => {
  chrome.runtime.sendMessage({
    message: label,
    payload: data,
  }, (res) => {
    if (res.message === 'success') {
      resolve(res.payload);
      return true;
    } else if (res.message === 'error') {
      reject();
      return false;
    }
  });
}));

// scraper --------------------------------------------------------------------


// scrap data and send to background

// ping background every second
setInterval(() => {
  try { // add .catch() with empty callback to avoid "context invalidated" error
    window.webextension.send('ping').catch(() => {});
  } catch (e) {}
}, 1000);
