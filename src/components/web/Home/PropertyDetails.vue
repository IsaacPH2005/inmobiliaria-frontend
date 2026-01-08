<template>
    <div class="px-3 py-4 space-y-4 sm:px-4 md:px-6 md:space-y-6">
        <!-- 🔥 ALERTA DE REVISIÓN PENDIENTE - SUPERIOR LLAMATIVA -->
        <div
            v-if="needsReview"
            class="sticky z-30 p-4 overflow-hidden border-2 border-red-600 rounded-lg shadow-xl top-2 sm:p-5"
            style="
                background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
                animation: alertPulse 2s ease-in-out infinite;
            "
        >
            <div class="flex items-start gap-3">
                <div class="flex-shrink-0 p-2 bg-white rounded-full bg-opacity-20">
                    <AlertTriangle :size="24" class="text-white animate-pulse" />
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-base font-bold text-white sm:text-lg">
                        ⚠️ REVISIÓN PENDIENTE DE SUPERVISOR
                    </h3>
                    <p class="mt-1 text-sm text-white sm:text-base text-opacity-95">
                        Esta propiedad requiere aprobación antes de ser publicada. Los datos y la
                        información deben ser verificados por un supervisor.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-3">
                        <span
                            v-if="!property.status?.datos_completos"
                            class="inline-flex items-center px-2 py-1 text-xs font-bold text-white bg-white rounded-full bg-opacity-20 sm:text-sm"
                        >
                            <AlertCircle :size="14" class="mr-1" />
                            Datos incompletos
                        </span>
                        <span
                            v-if="!property.status?.publicable"
                            class="inline-flex items-center px-2 py-1 text-xs font-bold text-white bg-white rounded-full bg-opacity-20 sm:text-sm"
                        >
                            <XCircle :size="14" class="mr-1" />
                            No publicable
                        </span>
                        <span
                            v-if="!property.seo?.activa"
                            class="inline-flex items-center px-2 py-1 text-xs font-bold text-white bg-white rounded-full bg-opacity-20 sm:text-sm"
                        >
                            <EyeOff :size="14" class="mr-1" />
                            Inactiva
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Header Mobile-First -->
        <div class="space-y-3">
            <h1 class="text-2xl font-bold leading-tight text-gray-800 sm:text-3xl md:text-4xl">
                {{
                    property.nombre ||
                    property.descripcion_whatsapp ||
                    property.descripcion_corta ||
                    'Propiedad sin nombre'
                }}
            </h1>

            <!-- Tags - Stack en mobile, inline en desktop -->
            <div class="flex flex-wrap gap-2">
                <span
                    class="inline-block px-3 py-1 text-xs font-bold text-white rounded-full sm:text-sm"
                    :style="{ backgroundColor: primaryColor }"
                >
                    {{ property.type?.nombre }}
                </span>
                <span
                    class="inline-block px-3 py-1 text-xs font-bold text-white bg-green-600 rounded-full sm:text-sm"
                >
                    {{ property.operation?.nombre }}
                </span>
                <span
                    v-if="property.seo?.destacada"
                    class="inline-flex items-center px-3 py-1 text-xs font-bold text-white bg-yellow-600 rounded-full sm:text-sm"
                >
                    <Star :size="14" class="mr-1" />
                    Destacada
                </span>
            </div>
        </div>

        <!-- Price - Prominente en mobile -->
        <div
            class="p-4 bg-white border-2 rounded-lg shadow-sm"
            :style="{ borderColor: primaryColor }"
        >
            <h2 class="text-3xl font-bold sm:text-4xl" :style="{ color: primaryColor }">
                {{ formatPrice(property.price?.precio) }}
            </h2>
            <p class="flex items-center mt-1 text-sm text-gray-600">
                <Hash :size="14" class="mr-1" />
                Código: {{ property.codigo_interno }}
            </p>
        </div>

        <!-- 🔹 Google Drive Link - Optimizado para mobile -->
        <div
            v-if="property.enlace"
            class="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm"
        >
            <h3 class="flex items-center mb-3 text-lg font-bold text-gray-800">
                <FolderOpen :size="18" class="mr-2" :style="{ color: primaryColor }" />
                Documentos
            </h3>
            <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div
                        class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-lg shadow-sm"
                    >
                        <FolderOpen :size="20" :style="{ color: primaryColor }" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-800">Carpeta de Google Drive</p>
                        <p class="text-xs text-gray-600 truncate">Fotos, planos y documentos</p>
                    </div>
                </div>

                <!-- Botones full-width en mobile -->
                <div class="flex flex-col gap-2 sm:flex-row">
                    <a
                        :href="property.enlace"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center justify-center flex-1 px-4 py-3 text-sm font-semibold text-white rounded-lg shadow-md"
                        :style="{ backgroundColor: primaryColor }"
                    >
                        <ExternalLink :size="16" class="mr-2" />
                        Abrir carpeta
                    </a>
                    <button
                        @click="copyToClipboard(property.enlace, 'enlace')"
                        class="flex items-center justify-center flex-1 px-4 py-3 text-sm font-semibold border-2 rounded-lg shadow-sm"
                        :class="
                            copiedStates.enlace
                                ? 'border-green-500 text-green-700 bg-green-50'
                                : 'border-gray-300 text-gray-700 bg-white'
                        "
                    >
                        <Check v-if="copiedStates.enlace" :size="16" class="mr-1" />
                        <Copy v-else :size="16" class="mr-1" />
                        {{ copiedStates.enlace ? '¡Copiado!' : 'Copiar' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- 🔹 WhatsApp Description -->
        <div
            v-if="property.descripcion_whatsapp"
            class="p-4 bg-white border-l-4 border-green-500 rounded-lg shadow-sm"
        >
            <div class="flex items-start justify-between mb-3">
                <h3 class="flex items-center text-lg font-bold text-gray-800">
                    <Phone :size="18" class="mr-2 text-green-600" />
                    WhatsApp
                </h3>
                <button
                    @click="copyToClipboard(property.descripcion_whatsapp, 'whatsapp')"
                    class="flex items-center flex-shrink-0 px-3 py-2 text-xs font-semibold border-2 rounded-lg"
                    :class="
                        copiedStates.whatsapp
                            ? 'bg-green-50 text-green-700 border-green-500'
                            : 'bg-gray-50 text-gray-700 border-gray-300'
                    "
                >
                    <Check v-if="copiedStates.whatsapp" :size="14" class="mr-1" />
                    <Copy v-else :size="14" class="mr-1" />
                    {{ copiedStates.whatsapp ? '¡Copiado!' : 'Copiar' }}
                </button>
            </div>
            <div class="p-3 rounded-lg bg-gray-50">
                <p class="text-sm text-gray-700 whitespace-pre-wrap">
                    {{ property.descripcion_whatsapp }}
                </p>
            </div>
        </div>

        <!-- 🔹 Facebook Description -->
        <div
            v-if="property.descripcion_facebook"
            class="p-4 bg-white border-l-4 border-blue-500 rounded-lg shadow-sm"
        >
            <div class="flex items-start justify-between mb-3">
                <h3 class="flex items-center text-lg font-bold text-gray-800">
                    <Share2 :size="18" class="mr-2 text-blue-600" />
                    Facebook
                </h3>
                <button
                    @click="copyToClipboard(property.descripcion_facebook, 'facebook')"
                    class="flex items-center flex-shrink-0 px-3 py-2 text-xs font-semibold border-2 rounded-lg"
                    :class="
                        copiedStates.facebook
                            ? 'bg-blue-50 text-blue-700 border-blue-500'
                            : 'bg-gray-50 text-gray-700 border-gray-300'
                    "
                >
                    <Check v-if="copiedStates.facebook" :size="14" class="mr-1" />
                    <Copy v-else :size="14" class="mr-1" />
                    {{ copiedStates.facebook ? '¡Copiado!' : 'Copiar' }}
                </button>
            </div>
            <div class="p-3 rounded-lg bg-gray-50">
                <p class="text-sm text-gray-700 whitespace-pre-wrap">
                    {{ property.descripcion_facebook }}
                </p>
            </div>
        </div>

        <!-- Description Fallback -->
        <div
            v-if="
                property.descripcion &&
                !property.descripcion_whatsapp &&
                !property.descripcion_facebook
            "
            class="p-4 rounded-lg"
            :style="{ backgroundColor: primaryColor + '10' }"
        >
            <h3 class="flex items-center mb-2 text-lg font-bold text-gray-800">
                <FileText :size="18" class="mr-2" />
                Descripción
            </h3>
            <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ property.descripcion }}</p>
        </div>

        <!-- Features - Grid optimizado mobile -->
        <div>
            <h3 class="flex items-center mb-3 text-lg font-bold text-gray-800">
                <CheckSquare :size="18" class="mr-2" />
                Características
            </h3>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
                    label="Sup. Construida"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    :icon="Car"
                    :value="property.features?.estacionamientos ?? 0"
                    label="Parking"
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

        <!-- Additional Features -->
        <div v-if="hasAdditionalFeatures">
            <h3 class="flex items-center mb-3 text-lg font-bold text-gray-800">
                <CheckCircle :size="18" class="mr-2" />
                Características Adicionales
            </h3>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                <div
                    v-for="feature in additionalFeatures"
                    :key="feature.id"
                    class="flex items-center p-3 bg-white rounded-lg shadow-sm"
                >
                    <Check :size="16" :style="{ color: primaryColor }" class="flex-shrink-0 mr-2" />
                    <span class="text-sm font-medium text-gray-700">{{ feature.nombre }}</span>
                </div>
            </div>
        </div>

        <!-- Location -->
        <div>
            <h3 class="flex items-center mb-3 text-lg font-bold text-gray-800">
                <MapPin :size="18" class="mr-2" />
                Ubicación
            </h3>
            <div class="p-4 bg-white rounded-lg shadow-sm">
                <div class="mb-4 space-y-3">
                    <div v-if="property.location?.direccion_completa" class="flex items-start">
                        <MapPin
                            :size="18"
                            class="flex-shrink-0 mr-2 mt-0.5"
                            :style="{ color: primaryColor }"
                        />
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-800">Dirección</p>
                            <p class="text-sm text-gray-700">
                                {{ property.location.direccion_completa }}
                            </p>
                        </div>
                    </div>
                    <div v-if="property.location?.zona" class="flex items-start">
                        <Building
                            :size="18"
                            class="flex-shrink-0 mr-2 mt-0.5"
                            :style="{ color: primaryColor }"
                        />
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-800">Zona</p>
                            <p class="text-sm text-gray-700">{{ property.location.zona }}</p>
                        </div>
                    </div>
                    <div v-if="property.location?.ciudad" class="flex items-start">
                        <Globe
                            :size="18"
                            class="flex-shrink-0 mr-2 mt-0.5"
                            :style="{ color: primaryColor }"
                        />
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-800">Ciudad</p>
                            <p class="text-sm text-gray-700">
                                {{ property.location.ciudad }}
                                <span v-if="property.location?.departamento">
                                    , {{ property.location.departamento }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Map - Altura optimizada mobile -->
                <div
                    class="h-64 overflow-hidden bg-gray-200 rounded-lg shadow-inner sm:h-80 md:h-96"
                >
                    <iframe
                        v-if="mapEmbedUrl"
                        :src="mapEmbedUrl"
                        width="100%"
                        height="100%"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        class="w-full h-full"
                        title="Mapa de ubicación"
                    ></iframe>

                    <div v-else class="relative w-full h-full">
                        <img
                            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=800&q=80"
                            alt="Mapa no disponible"
                            class="object-cover w-full h-full"
                            loading="lazy"
                        />
                        <div class="absolute inset-0 flex items-center justify-center bg-black/50">
                            <p class="px-4 text-sm font-medium text-center text-white">
                                Ubicación no disponible
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Action button -->
                <a
                    v-if="property.location?.google_maps_url"
                    :href="property.location.google_maps_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center w-full gap-2 px-4 py-3 mt-4 text-sm font-medium text-white rounded-lg shadow-md"
                    :style="{ backgroundColor: primaryColor }"
                >
                    <ExternalLink :size="16" />
                    Ver en Google Maps
                </a>
            </div>
        </div>

        <!-- Status & Condition -->
        <div class="p-4 bg-white rounded-lg shadow-sm">
            <h3 class="flex items-center mb-3 text-lg font-bold text-gray-800">
                <Info :size="18" class="mr-2" />
                Información del Inmueble
            </h3>
            <div class="grid gap-3 sm:grid-cols-2">
                <div class="p-3 rounded-lg bg-gray-50">
                    <p class="mb-1 text-xs font-medium text-gray-600">Estado</p>
                    <p class="text-base font-bold text-gray-800">
                        {{ property.status?.status?.nombre || 'No especificado' }}
                    </p>
                </div>
                <div class="p-3 rounded-lg bg-gray-50">
                    <p class="mb-1 text-xs font-medium text-gray-600">Condición</p>
                    <p class="text-base font-bold text-gray-800">
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
    Phone,
    Share2,
    Copy,
    FolderOpen,
    AlertTriangle, // 🔥 NUEVO
    AlertCircle, // 🔥 NUEVO
    XCircle, // 🔥 NUEVO
    EyeOff, // 🔥 NUEVO
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

const copiedStates = reactive({
    whatsapp: false,
    facebook: false,
    enlace: false,
});

// 🔥 COMPUTED: Verificar si necesita revisión
const needsReview = computed(() => {
    const status = props.property.status;
    const seo = props.property.seo;

    return (
        (status && !status.datos_completos) ||
        (status && !status.publicable) ||
        (seo && !seo.activa)
    );
});

const copyToClipboard = async (text, type) => {
    try {
        await navigator.clipboard.writeText(text);
        copiedStates[type] = true;

        setTimeout(() => {
            copiedStates[type] = false;
        }, 2000);
    } catch (err) {
        console.error('Error al copiar:', err);

        // Fallback para WebView Android
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            copiedStates[type] = true;
            setTimeout(() => {
                copiedStates[type] = false;
            }, 2000);
        } catch (err2) {
            alert('No se pudo copiar el texto');
        }

        document.body.removeChild(textArea);
    }
};

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

const formatPrice = price => {
    if (!price) return 'Precio no disponible';
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: props.property.price?.currency?.code || 'BOB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

const formatSuperficie = value => {
    if (!value || value === null || value === 0) {
        return '0 m²';
    }
    return `${parseFloat(value).toFixed(0)} m²`;
};

const hasAdditionalFeatures = computed(() => {
    return additionalFeatures.value.length > 0;
});

const additionalFeatures = computed(() => {
    return props.property.additional_features || [];
});
</script>

<style scoped>
/* Mobile-first optimizations */
.whitespace-pre-wrap {
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

/* Touch-friendly buttons */
button,
a {
    min-height: 44px;
    -webkit-tap-highlight-color: transparent;
}

/* Smooth transitions for WebView */
* {
    transition: background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
}

/* Optimize iframe for WebView */
iframe {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}

/* 🔥 ANIMACIÓN DE PULSO PARA LA ALERTA */
@keyframes alertPulse {
    0%,
    100% {
        box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
    }
    50% {
        box-shadow: 0 0 20px 10px rgba(220, 38, 38, 0);
    }
}

/* Animación de pulso del icono */
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
</style>
