/*
** popup/services/messaging.js
** Vue web extension starter pack app | 2021
*/

'use strict';


export default {
  send: (label, data = null) => new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      message: label,
      payload: data,
    }, (res) => {
      if (res.message === 'success') {
        resolve(res.payload);
        return true;
      } else if (res.message === 'error') {
        reject(res.payload);
        return false;
      }
    });
  })
}
