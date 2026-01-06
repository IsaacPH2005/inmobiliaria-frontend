<template>
    <div>
        <!-- Header -->
        <div class="mb-6">
            <h3 class="flex items-center text-2xl font-bold text-gray-800 sm:text-3xl">
                <MapPin :size="22" class="mr-2 sm:w-6 sm:h-6" />
                Ubicación
            </h3>
        </div>

        <!-- Información de ubicación en tarjetas -->
        <div class="p-4 mb-6 bg-white shadow-sm sm:p-6 rounded-xl">
            <div class="space-y-3 sm:space-y-4">
                <div v-if="location?.direccion_completa" class="flex items-start gap-2.5 sm:gap-3">
                    <div
                        class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg sm:w-12 sm:h-12"
                        :style="{ backgroundColor: primaryColor + '15' }"
                    >
                        <MapPin :size="18" class="sm:w-5 sm:h-5" :style="{ color: primaryColor }" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-800 sm:text-base">Dirección</p>
                        <p class="mt-1 text-sm text-gray-700 sm:text-base">
                            {{ location.direccion_completa }}
                        </p>
                    </div>
                </div>

                <div v-if="location?.zona" class="flex items-start gap-2.5 sm:gap-3">
                    <div
                        class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg sm:w-12 sm:h-12"
                        :style="{ backgroundColor: primaryColor + '15' }"
                    >
                        <Building
                            :size="18"
                            class="sm:w-5 sm:h-5"
                            :style="{ color: primaryColor }"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-800 sm:text-base">Zona</p>
                        <p class="mt-1 text-sm text-gray-700 sm:text-base">{{ location.zona }}</p>
                    </div>
                </div>

                <div v-if="location?.ciudad" class="flex items-start gap-2.5 sm:gap-3">
                    <div
                        class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg sm:w-12 sm:h-12"
                        :style="{ backgroundColor: primaryColor + '15' }"
                    >
                        <Globe :size="18" class="sm:w-5 sm:h-5" :style="{ color: primaryColor }" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-800 sm:text-base">Ciudad</p>
                        <p class="mt-1 text-sm text-gray-700 sm:text-base">
                            {{ location.ciudad }}
                            <span v-if="location?.departamento">
                                , {{ location.departamento }}
                            </span>
                        </p>
                    </div>
                </div>

                <div v-if="hasValidCoordinates" class="flex items-start gap-2.5 sm:gap-3">
                    <div
                        class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg sm:w-12 sm:h-12"
                        :style="{ backgroundColor: primaryColor + '15' }"
                    >
                        <Navigation
                            :size="18"
                            class="sm:w-5 sm:h-5"
                            :style="{ color: primaryColor }"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold text-gray-800 sm:text-base">Coordenadas</p>
                        <p class="mt-1 font-mono text-xs text-gray-700 sm:text-sm">
                            {{ formatCoordinates }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Google Maps Embed -->
            <div
                class="mt-4 overflow-hidden bg-gray-200 rounded-lg shadow-inner sm:mt-6 h-80 sm:h-96"
            >
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

                <!-- Fallback: Sin ubicación -->
                <div v-else class="relative w-full h-full">
                    <img
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                        alt="Mapa de ubicación no disponible"
                        class="object-cover w-full h-full"
                        loading="lazy"
                    />
                    <div class="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div class="px-4 text-center">
                            <MapPin :size="48" class="mx-auto mb-3 text-white sm:w-16 sm:h-16" />
                            <p class="text-sm font-semibold text-white sm:text-base">
                                Ubicación no disponible en el mapa
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botones de acción -->
            <div class="flex flex-col gap-2.5 mt-4 sm:flex-row sm:gap-3 sm:mt-6">
                <a
                    v-if="hasValidCoordinates"
                    :href="googleMapsUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-all rounded-lg shadow-md sm:text-base hover:opacity-90 hover:shadow-lg active:scale-95"
                    :style="{ backgroundColor: primaryColor }"
                >
                    <ExternalLink :size="16" class="sm:w-5 sm:h-5" />
                    Ver en Google Maps
                </a>

                <button
                    v-if="hasValidCoordinates"
                    @click="getDirections"
                    class="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all bg-white border-2 border-gray-300 rounded-lg shadow-sm sm:text-base hover:bg-gray-50 hover:border-gray-400 hover:shadow-md active:scale-95"
                >
                    <Navigation :size="16" class="sm:w-5 sm:h-5" />
                    Cómo llegar
                </button>

                <button
                    v-if="hasValidCoordinates"
                    @click="shareLocation"
                    class="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all rounded-lg shadow-sm sm:text-base active:scale-95"
                    :class="
                        copiedLocation
                            ? 'bg-green-100 text-green-700 border-2 border-green-500'
                            : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
                    "
                >
                    <Check v-if="copiedLocation" :size="16" class="sm:w-5 sm:h-5" />
                    <Share2 v-else :size="16" class="sm:w-5 sm:h-5" />
                    <span>{{ copiedLocation ? '¡Copiado!' : 'Compartir ubicación' }}</span>
                </button>
            </div>
        </div>

        <!-- Referencias (si existen) -->
        <div
            v-if="location?.referencias"
            class="p-4 mb-6 bg-white border-l-4 shadow-sm sm:p-6 rounded-xl"
            :style="{ borderColor: primaryColor }"
        >
            <div class="flex items-start gap-3">
                <div
                    class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg sm:w-12 sm:h-12"
                    :style="{ backgroundColor: primaryColor + '15' }"
                >
                    <Info :size="18" class="sm:w-5 sm:h-5" :style="{ color: primaryColor }" />
                </div>
                <div class="flex-1 min-w-0">
                    <p
                        class="text-sm font-semibold uppercase sm:text-base"
                        :style="{ color: primaryColor }"
                    >
                        Referencias de la ubicación
                    </p>
                    <p
                        class="mt-1 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap sm:text-base"
                    >
                        {{ location.referencias }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
    MapPin,
    Building,
    Globe,
    Navigation,
    ExternalLink,
    Info,
    Share2,
    Check,
} from 'lucide-vue-next';

const props = defineProps({
    location: {
        type: Object,
        required: true,
    },
    primaryColor: {
        type: String,
        default: '#3B82F6',
    },
});

const copiedLocation = ref(false);

// Función para extraer coordenadas de URL de Google Maps
const extractCoordinatesFromUrl = url => {
    if (!url) return null;

    const patterns = [
        /@(-?\d+\.\d+),(-?\d+\.\d+)/,
        /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
        /query=place_id:.*@(-?\d+\.\d+),(-?\d+\.\d+)/,
        /q=(-?\d+\.\d+),(-?\d+\.\d+)/,
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

// Verificar si hay coordenadas válidas
const hasValidCoordinates = computed(() => {
    if (props.location?.latitude && props.location?.longitude) {
        return true;
    }
    const coords = extractCoordinatesFromUrl(props.location?.google_maps_url);
    return coords !== null;
});

// Obtener coordenadas (de campos directos o de URL)
const getCoordinates = computed(() => {
    if (props.location?.latitude && props.location?.longitude) {
        return {
            lat: parseFloat(props.location.latitude),
            lng: parseFloat(props.location.longitude),
        };
    }
    return extractCoordinatesFromUrl(props.location?.google_maps_url);
});

// Formatear coordenadas
const formatCoordinates = computed(() => {
    const coords = getCoordinates.value;
    if (!coords) return 'No disponibles';
    return `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
});

// URL del mapa embebido
const mapEmbedUrl = computed(() => {
    const coords = getCoordinates.value;

    if (coords) {
        return `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    }

    // Fallback: usar dirección como búsqueda
    const loc = props.location;
    const address = [
        loc?.direccion_completa || loc?.direccion,
        loc?.zona,
        loc?.ciudad,
        loc?.departamento,
        'Bolivia',
    ]
        .filter(Boolean)
        .join(', ');

    if (!address) return null;

    const encodedAddress = encodeURIComponent(address);
    return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
});

// URL para abrir en Google Maps
const googleMapsUrl = computed(() => {
    const coords = getCoordinates.value;
    if (coords) {
        return `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
    }

    const loc = props.location;
    const address = [
        loc?.direccion_completa || loc?.direccion,
        loc?.zona,
        loc?.ciudad,
        loc?.departamento,
    ]
        .filter(Boolean)
        .join(', ');

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
});

// Obtener direcciones
const getDirections = () => {
    const coords = getCoordinates.value;
    if (coords) {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;
        window.open(url, '_blank');
    }
};

// Compartir ubicación
const shareLocation = async () => {
    const url = googleMapsUrl.value;

    const shareData = {
        title: 'Ubicación de la propiedad',
        text: `Ubicación: ${props.location?.direccion_completa || 'Propiedad'}`,
        url: url,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            if (err.name !== 'AbortError') {
                copyToClipboard(url);
            }
        }
    } else {
        copyToClipboard(url);
    }
};

// Copiar al portapapeles
const copyToClipboard = async text => {
    try {
        await navigator.clipboard.writeText(text);
        copiedLocation.value = true;

        setTimeout(() => {
            copiedLocation.value = false;
        }, 2000);
    } catch (err) {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar el enlace. Por favor, intenta nuevamente.');
    }
};
</script>

<style scoped>
.whitespace-pre-wrap {
    white-space: pre-wrap;
    word-wrap: break-word;
}

/* Touch optimization */
* {
    -webkit-tap-highlight-color: transparent;
}

/* Loading skeleton para iframe */
iframe {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
</style>
