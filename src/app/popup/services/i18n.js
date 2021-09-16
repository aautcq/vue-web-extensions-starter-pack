/*
** popup/services/i18n.js
** Vue web extension starter pack app | 2021
*/

'use strict';


export default {
  get: (label, infos) => {
    return chrome.i18n.getMessage(label, infos);
  }
}
