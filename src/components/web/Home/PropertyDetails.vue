<template>
    <div>
        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between mb-4">
            <!-- 🔹 NOMBRE DE LA PROPIEDAD (Prioridad sobre descripcion_corta) -->
            <h1 class="text-3xl font-bold text-gray-800 md:text-4xl">
                {{
                    property.nombre ||
                    property.descripcion_whatsapp ||
                    property.descripcion_corta ||
                    'Propiedad sin nombre'
                }}
            </h1>
            <div class="flex items-center mt-2 space-x-2 md:mt-0">
                <span
                    class="px-3 py-1 text-sm font-bold text-white rounded-full"
                    :style="{ backgroundColor: primaryColor }"
                >
                    {{ property.type?.nombre }}
                </span>
                <span class="px-3 py-1 text-sm font-bold text-white bg-green-600 rounded-full">
                    {{ property.operation?.nombre }}
                </span>
                <span
                    v-if="property.seo?.destacada"
                    class="flex items-center px-3 py-1 text-sm font-bold text-white bg-yellow-600 rounded-full"
                >
                    <Star :size="16" class="mr-1" />
                    Destacada
                </span>
            </div>
        </div>

        <!-- Price -->
        <div class="mb-6">
            <h2 class="text-4xl font-bold" :style="{ color: primaryColor }">
                {{ formatPrice(property.price?.precio) }}
            </h2>
            <p class="flex items-center text-gray-600">
                <Hash :size="16" class="mr-1" />
                Código: {{ property.codigo_interno }}
            </p>
        </div>

        <!-- 🔹 ENLACE GOOGLE DRIVE -->
        <div
            v-if="property.enlace"
            class="p-6 mb-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl"
        >
            <h3 class="flex items-center mb-4 text-xl font-bold text-gray-800">
                <FolderOpen :size="20" class="mr-2" :style="{ color: primaryColor }" />
                Documentos de la Propiedad
            </h3>
            <div
                class="flex flex-col gap-4 p-4 rounded-lg sm:flex-row sm:items-center sm:justify-between bg-gray-50"
            >
                <div class="flex items-center gap-3">
                    <div
                        class="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm"
                    >
                        <FolderOpen :size="24" :style="{ color: primaryColor }" />
                    </div>
                    <div>
                        <p class="font-semibold text-gray-800">Carpeta de Google Drive</p>
                        <p class="text-sm text-gray-600">Fotos, planos y documentos adicionales</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <a
                        :href="property.enlace"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg shadow-md hover:opacity-90"
                        :style="{ backgroundColor: primaryColor }"
                    >
                        <ExternalLink :size="16" class="mr-2" />
                        Abrir carpeta
                    </a>
                    <button
                        @click="copyToClipboard(property.enlace, 'enlace')"
                        class="inline-flex items-center px-3 py-2 text-sm font-semibold transition-all bg-white border-2 rounded-lg shadow-sm hover:bg-gray-50"
                        :class="
                            copiedStates.enlace
                                ? 'border-green-500 text-green-700'
                                : 'border-gray-300 text-gray-700'
                        "
                        :style="
                            copiedStates.enlace
                                ? {}
                                : { borderColor: primaryColor, color: primaryColor }
                        "
                    >
                        <Check v-if="copiedStates.enlace" :size="16" class="mr-1" />
                        <Copy v-else :size="16" class="mr-1" />
                        {{ copiedStates.enlace ? '¡Copiado!' : 'Copiar' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- 🔹 DESCRIPCIÓN PARA WHATSAPP -->
        <div
            v-if="property.descripcion_whatsapp"
            class="p-6 mb-6 bg-white border-l-4 border-green-500 shadow-sm rounded-xl"
        >
            <div class="flex items-center justify-between mb-4">
                <h3 class="flex items-center text-xl font-bold text-gray-800">
                    <Phone :size="20" class="mr-2 text-green-600" />
                    Descripción para WhatsApp
                </h3>
                <div class="flex items-center gap-2">
                    <span
                        class="inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-full"
                    >
                        <Phone :size="12" class="mr-1" />
                        WhatsApp
                    </span>
                    <button
                        @click="copyToClipboard(property.descripcion_whatsapp, 'whatsapp')"
                        class="inline-flex items-center px-3 py-2 text-sm font-semibold transition-all rounded-lg shadow-sm"
                        :class="
                            copiedStates.whatsapp
                                ? 'bg-green-100 text-green-700 border-2 border-green-500'
                                : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                        "
                    >
                        <Check v-if="copiedStates.whatsapp" :size="16" class="mr-1" />
                        <Copy v-else :size="16" class="mr-1" />
                        {{ copiedStates.whatsapp ? '¡Copiado!' : 'Copiar' }}
                    </button>
                </div>
            </div>
            <div class="p-4 rounded-lg bg-gray-50">
                <p class="text-gray-700 whitespace-pre-wrap">{{ property.descripcion_whatsapp }}</p>
            </div>
            <div class="flex items-center gap-2 mt-3 text-sm text-gray-600">
                <Info :size="14" />
                <span>Texto optimizado para compartir por WhatsApp</span>
            </div>
        </div>

        <!-- 🔹 DESCRIPCIÓN PARA FACEBOOK -->
        <div
            v-if="property.descripcion_facebook"
            class="p-6 mb-6 bg-white border-l-4 border-blue-500 shadow-sm rounded-xl"
        >
            <div class="flex items-center justify-between mb-4">
                <h3 class="flex items-center text-xl font-bold text-gray-800">
                    <Share2 :size="20" class="mr-2 text-blue-600" />
                    Descripción para Facebook
                </h3>
                <div class="flex items-center gap-2">
                    <span
                        class="inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full"
                    >
                        <Share2 :size="12" class="mr-1" />
                        Facebook
                    </span>
                    <button
                        @click="copyToClipboard(property.descripcion_facebook, 'facebook')"
                        class="inline-flex items-center px-3 py-2 text-sm font-semibold transition-all rounded-lg shadow-sm"
                        :class="
                            copiedStates.facebook
                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                                : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                        "
                    >
                        <Check v-if="copiedStates.facebook" :size="16" class="mr-1" />
                        <Copy v-else :size="16" class="mr-1" />
                        {{ copiedStates.facebook ? '¡Copiado!' : 'Copiar' }}
                    </button>
                </div>
            </div>
            <div class="p-4 rounded-lg bg-gray-50">
                <p class="text-gray-700 whitespace-pre-wrap">{{ property.descripcion_facebook }}</p>
            </div>
            <div class="flex items-center gap-2 mt-3 text-sm text-gray-600">
                <Info :size="14" />
                <span>Texto optimizado para publicaciones en Facebook</span>
            </div>
        </div>

        <!-- Description (Fallback para compatibilidad) -->
        <div
            v-if="
                property.descripcion &&
                !property.descripcion_whatsapp &&
                !property.descripcion_facebook
            "
            class="p-6 mb-6 rounded-xl"
            :style="{ backgroundColor: primaryColor + '10' }"
        >
            <h3 class="flex items-center mb-2 text-xl font-bold text-gray-800">
                <FileText :size="20" class="mr-2" />
                Descripción
            </h3>
            <p class="text-gray-700 whitespace-pre-wrap">{{ property.descripcion }}</p>
        </div>

        <!-- Features -->
        <div class="mb-6">
            <h3 class="flex items-center mb-4 text-xl font-bold text-gray-800">
                <CheckSquare :size="20" class="mr-2" />
                Características
            </h3>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                <FeatureCard
                    :icon="Home"
                    :value="property.features?.habitaciones ?? 0"
                    label="Habitaciones"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    :icon="Bath"
                    :value="property.features?.baños ?? 0"
                    label="Baños"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    :icon="Droplet"
                    :value="property.features?.medio_baños ?? 0"
                    label="Medio Baños"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    :icon="Building"
                    :value="property.features?.pisos ?? 0"
                    label="Pisos"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    :icon="Maximize"
                    :value="formatSuperficie(property.features?.superficie_total)"
                    label="Superficie Total"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    :icon="Square"
                    :value="formatSuperficie(property.features?.superficie_construida)"
                    label="Superficie Construida"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    :icon="Car"
                    :value="property.features?.estacionamientos ?? 0"
                    label="Estacionamientos"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    v-if="property.features?.antiguedad"
                    :icon="Calendar"
                    :value="`${property.features.antiguedad} años`"
                    label="Antigüedad"
                    :primary-color="primaryColor"
                />
            </div>
        </div>

        <!-- Características Adicionales -->
        <div v-if="hasAdditionalFeatures" class="mb-6">
            <h3 class="flex items-center mb-4 text-xl font-bold text-gray-800">
                <CheckCircle :size="20" class="mr-2" />
                Características Adicionales
            </h3>
            <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                <div
                    v-for="feature in additionalFeatures"
                    :key="feature.id"
                    class="flex items-center p-3 transition-all bg-white rounded-lg shadow-sm hover:shadow-md"
                >
                    <Check :size="18" :style="{ color: primaryColor }" class="flex-shrink-0 mr-2" />
                    <span class="text-sm font-medium text-gray-700">{{ feature.nombre }}</span>
                </div>
            </div>
        </div>

        <!-- Location -->
        <div class="mb-6">
            <h3 class="flex items-center mb-4 text-xl font-bold text-gray-800">
                <MapPin :size="20" class="mr-2" />
                Ubicación
            </h3>
            <div class="p-6 bg-white shadow-sm rounded-xl">
                <div class="mb-4 space-y-3">
                    <div v-if="property.location?.direccion_completa" class="flex items-start">
                        <MapPin
                            :size="20"
                            class="flex-shrink-0 mr-3 mt-0.5"
                            :style="{ color: primaryColor }"
                        />
                        <div>
                            <p class="font-medium text-gray-800">Dirección</p>
                            <p class="text-gray-700">{{ property.location.direccion_completa }}</p>
                        </div>
                    </div>
                    <div v-if="property.location?.zona" class="flex items-start">
                        <Building
                            :size="20"
                            class="flex-shrink-0 mr-3 mt-0.5"
                            :style="{ color: primaryColor }"
                        />
                        <div>
                            <p class="font-medium text-gray-800">Zona</p>
                            <p class="text-gray-700">{{ property.location.zona }}</p>
                        </div>
                    </div>
                    <div v-if="property.location?.ciudad" class="flex items-start">
                        <Globe
                            :size="20"
                            class="flex-shrink-0 mr-3 mt-0.5"
                            :style="{ color: primaryColor }"
                        />
                        <div>
                            <p class="font-medium text-gray-800">Ciudad</p>
                            <p class="text-gray-700">
                                {{ property.location.ciudad }}
                                <span v-if="property.location?.departamento">
                                    , {{ property.location.departamento }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Google Maps Embed con Marcador -->
                <div class="mt-4 overflow-hidden bg-gray-200 rounded-lg shadow-inner h-96">
                    <iframe
                        v-if="mapEmbedUrl"
                        :src="mapEmbedUrl"
                        width="100%"
                        height="100%"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                        class="w-full h-full"
                        title="Mapa de ubicación"
                    ></iframe>

                    <!-- Fallback: Imagen placeholder -->
                    <div v-else class="relative w-full h-full">
                        <img
                            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Mapa de ubicación no disponible"
                            class="object-cover w-full h-full"
                            loading="lazy"
                        />
                        <div class="absolute inset-0 flex items-center justify-center bg-black/50">
                            <p class="px-4 font-medium text-center text-white">
                                Ubicación no disponible en el mapa
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Botones de acción -->
                <div class="flex flex-wrap gap-3 mt-4">
                    <a
                        v-if="property.location?.google_maps_url"
                        :href="property.location.google_maps_url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-all rounded-lg shadow-md hover:opacity-90"
                        :style="{ backgroundColor: primaryColor }"
                    >
                        <ExternalLink :size="16" class="mr-2" />
                        Ver en Google Maps
                    </a>
                </div>
            </div>
        </div>

        <!-- Estado y Condición -->
        <div class="p-6 mb-6 bg-white shadow-sm rounded-xl">
            <h3 class="flex items-center mb-4 text-xl font-bold text-gray-800">
                <Info :size="20" class="mr-2" />
                Información del Inmueble
            </h3>
            <div class="grid gap-4 md:grid-cols-2">
                <div class="p-4 rounded-lg bg-gray-50">
                    <p class="mb-1 text-sm font-medium text-gray-600">Estado</p>
                    <p class="text-lg font-bold text-gray-800">
                        {{ property.status?.status?.nombre || 'No especificado' }}
                    </p>
                </div>
                <div class="p-4 rounded-lg bg-gray-50">
                    <p class="mb-1 text-sm font-medium text-gray-600">Condición</p>
                    <p class="text-lg font-bold text-gray-800">
                        {{ property.status?.condition?.nombre || 'No especificado' }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import {
    Star,
    Hash,
    FileText,
    CheckSquare,
    CheckCircle,
    Check,
    Home,
    Bath,
    Droplet,
    Building,
    Maximize,
    Square,
    Car,
    Calendar,
    MapPin,
    Globe,
    Info,
    ExternalLink,
    Navigation,
    Phone,
    Share2,
    Copy,
    FolderOpen,
} from 'lucide-vue-next';
import FeatureCard from './FeatureCard.vue';

const props = defineProps({
    property: {
        type: Object,
        required: true,
    },
    primaryColor: {
        type: String,
        default: '#3B82F6',
    },
});

// 🔹 Estados de copiado
const copiedStates = reactive({
    whatsapp: false,
    facebook: false,
    enlace: false,
});

// 🔹 Función para copiar al portapapeles
const copyToClipboard = async (text, type) => {
    try {
        await navigator.clipboard.writeText(text);
        copiedStates[type] = true;

        // Resetear después de 2 segundos
        setTimeout(() => {
            copiedStates[type] = false;
        }, 2000);
    } catch (err) {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar el texto. Por favor, intenta nuevamente.');
    }
};

// Función para extraer coordenadas de una URL de Google Maps
const extractCoordinatesFromUrl = url => {
    if (!url) return null;

    const patterns = [
        /@(-?\d+\.\d+),(-?\d+\.\d+)/,
        /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
        /query=place_id:.*@(-?\d+\.\d+),(-?\d+\.\d+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return {
                lat: parseFloat(match[1]),
                lng: parseFloat(match[2]),
            };
        }
    }

    return null;
};

// URL del mapa con marcador
const mapEmbedUrl = computed(() => {
    const loc = props.property.location;
    if (!loc) return null;

    const coordinates = extractCoordinatesFromUrl(loc.google_maps_url);

    if (coordinates) {
        return `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    }

    const address = [
        loc.direccion_completa || loc.direccion,
        loc.zona,
        loc.ciudad,
        loc.departamento,
        'Bolivia',
    ]
        .filter(Boolean)
        .join(', ');

    if (!address) return null;

    const encodedAddress = encodeURIComponent(address);
    return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
});

// Formatear precio
const formatPrice = price => {
    if (!price) return 'Precio no disponible';
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: props.property.price?.currency?.code || 'BOB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

// Formatear superficie
const formatSuperficie = value => {
    if (!value || value === null || value === 0) {
        return '0 m²';
    }
    return `${parseFloat(value).toFixed(0)} m²`;
};

// Verificar si hay características adicionales
const hasAdditionalFeatures = computed(() => {
    return additionalFeatures.value.length > 0;
});

// Características adicionales desde la API
const additionalFeatures = computed(() => {
    return props.property.additional_features || [];
});
</script>

<style scoped>
.whitespace-pre-wrap {
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>
