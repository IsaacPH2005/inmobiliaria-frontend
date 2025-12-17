import { ref } from 'vue';

/**
 * @description Estado reactivo (singleton) para el modo oscuro.
 * Al ser exportado directamente, cualquier componente que lo importe compartirá la misma instancia.
 */
export const isDarkMode = ref(false);

/**
 * @description Actualiza la clase 'dark' en el elemento <html> de la página.
 */
const updateHtmlClass = () => {
    const htmlEl = document.documentElement;
    if (isDarkMode.value) {
        htmlEl.classList.add('dark');
    } else {
        htmlEl.classList.remove('dark');
    }
};

/**
 * @description Alterna entre modo claro y oscuro, guarda la preferencia en localStorage.
 */
export const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('darkMode', isDarkMode.value.toString());
    updateHtmlClass();
};

/**
 * @description Inicializa el estado del modo oscuro al cargar la aplicación.
 * Carga la preferencia desde localStorage o detecta la del sistema operativo.
 */
export const initializeDarkMode = () => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
        isDarkMode.value = savedMode === 'true';
    } else {
        // Si no hay preferencia guardada, usa la del sistema
        isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    updateHtmlClass();
};
