import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';
import loading from './views/loading.vue';
import permisson from './directives/permisson';

import { createPinia } from 'pinia';

const app = createApp(App);

app.component('loading', loading);

app.use(createPinia());
app.use(router);
app.use(store);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);
app.directive('permisson', permisson);

app.mount('#app');
