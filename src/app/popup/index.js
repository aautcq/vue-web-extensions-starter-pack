/*
** popup/index.js
** Vue web extension starter pack app | 2021
*/

'use strict';

import '@/assets/stylesheets/popup.scss';
import '@/app/popup/features/force-redraw';
import _ from 'lodash';
import { createApp } from 'vue';
import App from '@/app/popup/App.vue';
import store from '@/app/popup/store';

const app = createApp(App);

app
  .use(store)
  .mount('#app');
