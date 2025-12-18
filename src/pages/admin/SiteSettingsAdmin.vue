<!-- src/views/SiteSettingsView.vue -->
<template>
    <div class="min-h-screen p-4 lg:p-6">
        <!-- Header -->
        <div class="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 class="text-3xl font-bold text-neutral-900">Configuración del Sitio</h1>
                <p class="mt-1 text-neutral-500">
                    Personaliza el nombre, logo, descripción y colores de tu sitio web
                </p>
            </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="max-w-2xl mx-auto">
            <div class="p-8 bg-white border rounded-xl border-neutral-200 animate-pulse">
                <div class="h-12 mb-6 bg-gray-200 rounded-lg"></div>
                <div class="space-y-4">
                    <div class="h-10 bg-gray-200 rounded-lg"></div>
                    <div class="h-10 bg-gray-200 rounded-lg"></div>
                    <div class="h-10 bg-gray-200 rounded-lg"></div>
                    <div class="h-10 bg-gray-200 rounded-lg"></div>
                    <div class="h-12 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        </div>

        <!-- Formulario Principal -->
        <div v-else class="max-w-2xl mx-auto">
            <form
                @submit.prevent="updateSettings"
                class="bg-white border shadow-sm rounded-xl border-neutral-200"
            >
                <!-- Preview del sitio -->
                <div class="p-8 border-b border-neutral-200">
                    <h3 class="mb-4 text-xl font-bold text-neutral-900">Vista previa</h3>
                    <div
                        class="flex items-center gap-6 p-6 bg-gradient-to-r from-neutral-50 to-white rounded-xl"
                    >
                        <!-- Logo Preview -->
                        <div class="flex-shrink-0">
                            <div
                                :style="{ backgroundColor: settings.color_primario || '#3B82F6' }"
                                class="flex items-center justify-center w-20 h-20 rounded-lg"
                            >
                                <img
                                    v-if="settings.logo_url"
                                    :src="settings.logo_url"
                                    :alt="settings.nombre_sitio"
                                    class="object-contain rounded max-w-16 max-h-16"
                                    @error="logoError = true"
                                />
                                <div v-else class="text-lg font-bold text-white">
                                    {{ settings.nombre_sitio?.charAt(0) || 'B' }}
                                </div>
                            </div>
                            <p class="mt-2 text-xs text-center truncate text-neutral-500 max-w-20">
                                {{ settings.nombre_sitio }}
                            </p>
                        </div>

                        <!-- Nombre y descripción -->
                        <div class="flex-1 min-w-0">
                            <h2
                                class="text-2xl font-bold truncate"
                                :style="{ color: settings.color_primario || '#3B82F6' }"
                            >
                                {{ settings.nombre_sitio || 'BlazeCart' }}
                            </h2>
                            <p class="mt-1 text-neutral-600 line-clamp-2">
                                {{ settings.descripcion || 'Plataforma de comercio electrónico' }}
                            </p>
                        </div>

                        <!-- Status mantenimiento -->
                        <div
                            v-if="settings.mantenimiento"
                            class="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-full"
                        >
                            En Mantenimiento
                        </div>
                    </div>
                </div>

                <!-- Logo y Favicon -->
                <div class="p-8">
                    <h3 class="mb-6 text-xl font-bold text-neutral-900">Logo y Favicon</h3>

                    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <!-- Logo -->
                        <div>
                            <label class="block mb-3 text-sm font-semibold text-neutral-700">
                                Logo del Sitio
                            </label>
                            <div
                                class="relative p-8 text-center transition-colors border-2 border-dashed cursor-pointer rounded-xl border-neutral-300 hover:border-primary-400 hover:bg-neutral-50"
                                :class="{
                                    'border-primary-500 bg-primary-50': logoFile,
                                    'border-red-500 bg-red-50': logoError,
                                }"
                                @click="$refs.logoInput.click()"
                            >
                                <input
                                    ref="logoInput"
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml,image/webp"
                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    @change="handleLogoUpload"
                                />

                                <div v-if="logoPreview" class="mb-4">
                                    <img
                                        :src="logoPreview"
                                        class="object-contain max-w-full mx-auto rounded-lg shadow-md max-h-32"
                                        :alt="settings.nombre_sitio"
                                    />
                                </div>

                                <div v-else-if="settings.logo_url" class="mb-4">
                                    <img
                                        :src="settings.logo_url"
                                        class="object-contain max-w-full mx-auto rounded-lg shadow-md max-h-32"
                                        :alt="settings.nombre_sitio"
                                        @error="logoError = true"
                                    />
                                </div>

                                <div v-else class="flex flex-col items-center justify-center">
                                    <Image class="w-12 h-12 mb-3 text-neutral-400" />
                                    <p class="mb-1 text-sm font-medium text-neutral-900">
                                        {{ logoFile ? 'Logo seleccionado' : 'Sube tu logo' }}
                                    </p>
                                    <p class="text-xs text-neutral-500">JPG, PNG, SVG (Máx. 2MB)</p>
                                </div>

                                <!-- Botones de acción -->
                                <div
                                    v-if="settings.logo_url"
                                    class="flex gap-2 pt-4 mt-4 border-t border-neutral-200"
                                >
                                    <button
                                        type="button"
                                        @click="confirmDeleteLogo"
                                        class="flex-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 class="w-3 h-3 mr-1" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Favicon -->
                    </div>
                </div>

                <!-- Configuración general -->
                <div class="p-8">
                    <h3 class="mb-6 text-xl font-bold text-neutral-900">Configuración General</h3>

                    <div class="space-y-6">
                        <!-- Nombre del sitio -->
                        <div>
                            <label class="block mb-2 text-sm font-semibold text-neutral-700">
                                Nombre del Sitio *
                            </label>
                            <input
                                v-model="form.nombre_sitio"
                                type="text"
                                class="w-full px-4 py-3 transition-all border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="BlazeCart"
                            />
                        </div>

                        <!-- Descripción -->
                        <div>
                            <label class="block mb-2 text-sm font-semibold text-neutral-700">
                                Descripción
                            </label>
                            <textarea
                                v-model="form.descripcion"
                                rows="3"
                                class="w-full px-4 py-3 transition-all border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                                placeholder="Describe tu plataforma en pocas palabras..."
                            ></textarea>
                        </div>

                        <!-- Palabras clave -->
                        <div>
                            <label class="block mb-2 text-sm font-semibold text-neutral-700">
                                Palabras Clave (SEO)
                            </label>
                            <input
                                v-model="form.palabras_clave"
                                type="text"
                                class="w-full px-4 py-3 transition-all border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="ecommerce, propiedades, bolivia, laravel"
                            />
                            <p class="mt-1 text-xs text-neutral-500">
                                Separa con comas: ecommerce, inmuebles, la paz
                            </p>
                        </div>

                        <!-- Color primario -->
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label class="block mb-2 text-sm font-semibold text-neutral-700">
                                    Color Primario
                                </label>
                                <div class="relative">
                                    <input
                                        v-model="form.color_primario"
                                        type="color"
                                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div
                                        :style="{ backgroundColor: form.color_primario }"
                                        class="w-full h-12 border shadow-sm cursor-pointer rounded-xl border-neutral-300"
                                    ></div>
                                </div>
                            </div>

                            <div class="flex items-end">
                                <label class="block mb-2 text-sm font-semibold text-neutral-700">
                                    Modo Mantenimiento
                                </label>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input
                                        v-model="form.mantenimiento"
                                        type="checkbox"
                                        class="sr-only peer"
                                    />
                                    <div
                                        class="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"
                                    ></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Acciones -->
                <div
                    class="flex flex-col gap-3 p-8 border-t bg-neutral-50 border-neutral-200 sm:flex-row sm:justify-between"
                >
                    <div class="text-sm text-neutral-600">* Campos requeridos</div>
                    <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <button
                            type="button"
                            @click="resetForm"
                            class="px-6 py-3 text-sm font-medium transition-all bg-white border text-neutral-700 border-neutral-300 rounded-xl hover:bg-neutral-50 hover:shadow-sm"
                        >
                            Restablecer
                        </button>
                        <button
                            :disabled="saving"
                            class="px-6 py-3 text-sm font-medium text-white transition-all border bg-primary-600 border-primary-600 rounded-xl hover:bg-primary-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span v-if="saving" class="flex items-center gap-2">
                                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                        class="opacity-25"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Guardando...
                            </span>
                            <span v-else>Guardar Configuración</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <!-- Toast notifications -->
        <Toast />
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { Image, Trash2 } from 'lucide-vue-next';
import { getSiteSettings, updateSiteSettings } from '@/services/SiteSettingsService';

const toast = useToast();

const loading = ref(true);
const saving = ref(false);
const settings = ref({});
const form = reactive({
    nombre_sitio: '',
    descripcion: '',
    palabras_clave: '',
    color_primario: '#3B82F6',
    mantenimiento: false,
});

const logoPreview = ref('');
const faviconPreview = ref('');
const logoFile = ref(null);
const faviconFile = ref(null);
const logoError = ref(false);
const faviconError = ref(false);

onMounted(async () => {
    await loadSettings();
});

const loadSettings = async () => {
    try {
        loading.value = true;
        const response = await getSiteSettings();
        settings.value = response.data.data || {};
        console.log(settings.value);
        // Llenar formulario
        Object.keys(form).forEach(key => {
            if (settings.value[key] !== undefined) {
                form[key] = settings.value[key];
            }
        });
    } catch (error) {
        console.error('Error cargando configuración:', error);
        toast.error('Error al cargar la configuración');
    } finally {
        loading.value = false;
    }
};

const handleLogoUpload = event => {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            toast.error('El logo no puede exceder 2MB');
            return;
        }
        logoFile.value = file;
        logoPreview.value = URL.createObjectURL(file);
        logoError.value = false;
    }
};

const handleFaviconUpload = event => {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            toast.error('El favicon no puede exceder 2MB');
            return;
        }
        faviconFile.value = file;
        faviconPreview.value = URL.createObjectURL(file);
        faviconError.value = false;
    }
};

const confirmDeleteLogo = async () => {
    if (confirm('¿Eliminar el logo actual?')) {
        try {
            await deleteSiteLogo(settings.value.id);
            settings.value.logo = null;
            settings.value.logo_url = '';
            logoPreview.value = '';
            toast.success('Logo eliminado');
            loadSettings(); // Recargar para consistencia
        } catch (error) {
            console.error('Error eliminando logo:', error);
            toast.error('Error al eliminar logo');
        }
    }
};

const confirmDeleteFavicon = async () => {
    if (confirm('¿Eliminar el favicon actual?')) {
        try {
            await deleteSiteFavicon(settings.value.id);
            settings.value.favicon = null;
            settings.value.favicon_url = '';
            faviconPreview.value = '';
            toast.success('Favicon eliminado');
            loadSettings();
        } catch (error) {
            console.error('Error eliminando favicon:', error);
            toast.error('Error al eliminar favicon');
        }
    }
};

// En src/views/SiteSettingsView.vue - updateSettings()
const updateSettings = async () => {
    if (!form.nombre_sitio.trim()) {
        toast.error('El nombre del sitio es requerido');
        return;
    }

    try {
        saving.value = true;

        // ✅ Boolean nativo para el objeto data
        const data = {
            nombre_sitio: form.nombre_sitio,
            descripcion: form.descripcion || null,
            palabras_clave: form.palabras_clave || null,
            color_primario: form.color_primario || null,
            mantenimiento: !!form.mantenimiento, // ✅ Fuerza boolean true/false
        };

        // Agregar archivos si existen
        if (logoFile.value) data.logo = logoFile.value;
        if (faviconFile.value) data.favicon = faviconFile.value;

        console.log('Enviando datos:', data); // Debug

        const response = await updateSiteSettings(data);

        settings.value = response.data.data;
        toast.success('Configuración actualizada correctamente');

        // Limpiar previews
        if (logoFile.value) {
            URL.revokeObjectURL(logoPreview.value);
            logoFile.value = null;
            logoPreview.value = '';
        }
        if (faviconFile.value) {
            URL.revokeObjectURL(faviconPreview.value);
            faviconFile.value = null;
            faviconPreview.value = '';
        }
    } catch (error) {
        console.error('Error actualizando:', error);
        toast.error(error.response?.data?.message || 'Error al guardar');
    } finally {
        saving.value = false;
    }
};

const resetForm = () => {
    Object.keys(form).forEach(key => {
        if (settings.value[key] !== undefined) {
            form[key] = settings.value[key];
        }
    });
    toast.info('Formulario restablecido');
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
