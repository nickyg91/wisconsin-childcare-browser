import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import mitt from 'mitt';
const emitter = mitt();
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.config.globalProperties.emitter = emitter;
app.mount('#app');
