/*
** background/services/api.js
** Vue web extension starter pack app | 2021
*/

'use strict';

import localStorageService from '@/app/background/services/local-storage';

const REQUEST_OPTIONS = {
  get: {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      'dataType': 'json'
    })
  },
  post: {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      'dataType': 'json'
    }),
    body: null
  }
};

// apply user token to request header
const applyToken = (method) => new Promise((resolve, reject) => {
  localStorageService
    .get('userToken')
    .then((token) => {
      if (!token) {
        reject();
        return false;
      }
      REQUEST_OPTIONS[method].headers.set('Authorization', token);
      resolve();
    })
    .catch(() => reject());
});

export default {
  get: (url) => new Promise((resolve, reject) => {
    applyToken('get')
      .then(() => {
        fetch(`${process.env.API_URL}${url}`, REQUEST_OPTIONS.get)
          .then((rawRes) => {
            rawRes.json()
              .then((res) => rawRes.ok ? resolve(res) : reject(res))
              .catch((res) => reject(res));
          })
          .catch((res) => reject(res));
      })
      .catch((res) => reject(res));
  }),
  post: (url, data, withToken = true) => new Promise((resolve, reject) => {
    const promise = withToken ? applyToken('post') : new Promise((resolve, reject) => resolve());
    promise
      .then(() => {
        REQUEST_OPTIONS.post.body = JSON.stringify(data);

        fetch(`${process.env.API_URL}${url}`, REQUEST_OPTIONS.post)
          .then((rawRes) => {
            rawRes.json()
              .then((res) => rawRes.ok ? resolve(res) : reject(res))
              .catch((res) => reject(res));
          })
          .catch((res) => reject(res));
      })
      .catch((res) => reject(res));
  })
}
