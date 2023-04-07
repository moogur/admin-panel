import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { App } from '@app';
import router from '@router';

import '@shared/styles/index.scss';

createApp(App).use(createPinia()).use(router).mount('body');
