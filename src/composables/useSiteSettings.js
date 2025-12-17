import { ref } from 'vue';
import { getSiteSettings } from '@/services/SiteSettingsService';

// Estado global compartido
const siteSettings = ref({
    nombre_sitio: 'Inmobiliaria',
    logo_url: '',
    color_primario: '#3B82F6',
    descripcion: 'Tu socio confiable en el mundo inmobiliario desde 2005.',
});

let isLoaded = false;

export function useSiteSettings() {
    const loadSettings = async () => {
        if (isLoaded) return; // Cargar solo una vez

        try {
            const response = await getSiteSettings();
            if (response.data) {
                siteSettings.value = response.data.data;
                console.log(siteSettings.value);
            }
            isLoaded = true;
        } catch (error) {
            console.error('Error cargando configuraciones del sitio:', error);
        }
    };

    return {
        siteSettings,
        loadSettings,
    };
}
