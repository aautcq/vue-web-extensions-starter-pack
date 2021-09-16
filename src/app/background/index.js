/*
** background/index.js
** Vue web extension starter pack app | 2021
*/

'use strict';

import _ from 'lodash';
import localStorageService from '@/app/background/services/local-storage';

self.onactivate = () => console.log('Starting background service worker');


// methods --------------------------------------------------------------------


const helloWorld = (sendResponse) => {
  sendResponse({ message: 'success' });
}

// handle messages from popin and foreground
const handleRequest = (message, sendResponse, data = null) => {
  if (message === 'hello-world') {
    helloWorld(sendResponse);
    return true;
  } else if (message === 'ping') { // thx Google for making me write this shite
    console.log('Pinged by foreground script');
    return true;
  }
}


// listeners ------------------------------------------------------------------


// init stored data
chrome.runtime.onInstalled.addListener(() => {
  localStorageService.save('userToken', null);
});

// listen for messages from popup and foreground
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  handleRequest(request.message, sendResponse, request.payload);
  return true;
});

// inject foreground script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ['./foreground.js'],
      })
      .then(() => console.log('Injected foreground script'))
      .catch(() => console.log('Error injecting foreground script'));
  }
});
