import './assets/styles/app.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Globals from './helpers/globals.js';
import App from './App.vue'
import translations from './assets/translations/translations.json';

const pinia = createPinia()
const app = createApp(App).mixin(Globals);
app.config.globalProperties.$translations = translations

app.use(pinia)
app.mount('#app')