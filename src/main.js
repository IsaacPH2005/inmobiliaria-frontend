import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import 'sweetalert2/dist/sweetalert2.min.css';
// Importa Toastification para Vue 3
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Estilos por defecto
const app = createApp(App);

app.use(createPinia());
app.use(Toast, {
    // Configuración básica (opcional, pero recomendada)
    transition: 'Vue-Toastification__bounce',
    maxToasts: 3,
    newestOnTop: true,
    position: 'top-right',
    timeout: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
});
app.use(router);

app.mount('#app');
