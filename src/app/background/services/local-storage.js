/*
** background/services/local-storage.js
** Vue web extension starter pack app | 2021
*/

'use strict';

export default {
  get: (id) => new Promise((resolve, reject) => {
    chrome.storage.local.get(id, (data) => {
      if (chrome.runtime.lastError) {
        reject();
        return false;
      } else {
        resolve(data[id]);
        return true;
      }
    })
  }),
  save: (id, data) => new Promise((resolve, reject) => {
    let obj = {};
    obj[id] = data;
    chrome.storage.local.set(obj, () => {
      if (chrome.runtime.lastError) {
        reject();
        return false;
      } else {
        resolve();
        return true;
      }
    });
  })
}
