<template>
    <div
        class="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm cursor-pointer group rounded-xl sm:rounded-2xl md:flex-row hover:shadow-2xl hover:border-blue-200 hover:-translate-y-1 active:scale-[0.99]"
        @click="$emit('click', property)"
    >
        <!-- Imagen - Mobile First -->
        <div
            class="relative flex-shrink-0 h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 sm:h-56 md:w-80 md:h-auto lg:w-96"
        >
            <img
                :src="
                    (property.images && property.images[0]?.image_url) ||
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
                "
                :alt="
                    property.nombre || property.descripcion_whatsapp || property.descripcion_corta
                "
                class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
            />

            <!-- Overlay gradient -->
            <div
                class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100"
            ></div>

            <!-- Badges superiores - Mobile optimized -->
            <div class="absolute flex flex-col gap-1.5 top-3 left-3 sm:gap-2 sm:top-4 sm:left-4">
                <span
                    v-if="property.seo?.destacada"
                    class="inline-flex items-center px-2.5 py-1 text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg backdrop-blur-sm"
                >
                    <Star :size="12" class="mr-1 fill-current sm:w-3.5 sm:h-3.5" />
                    Destacada
                </span>
                <span
                    v-if="property.type?.nombre"
                    class="inline-flex items-center px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-white bg-black/70 rounded-full backdrop-blur-sm"
                >
                    {{ property.type.nombre }}
                </span>
            </div>

            <!-- Código de propiedad - Mobile optimized -->
            <div
                class="absolute px-2.5 py-1 text-[10px] sm:text-xs font-bold text-white bg-black/70 rounded-lg backdrop-blur-sm bottom-3 right-3 sm:bottom-4 sm:right-4"
            >
                #{{ property.codigo_interno }}
            </div>

            <!-- Botón de favorito - Mobile optimized -->
            <button
                @click.stop="toggleFavorite"
                class="absolute p-2 transition-all duration-300 rounded-full shadow-lg bg-white/95 backdrop-blur-sm top-3 right-3 sm:top-4 sm:right-4 hover:bg-white hover:scale-110 active:scale-95"
                :class="isFavorite ? 'text-red-500' : 'text-gray-400'"
                aria-label="Agregar a favoritos"
            >
                <Heart :size="18" class="sm:w-5 sm:h-5" :class="{ 'fill-current': isFavorite }" />
            </button>

            <!-- Contador de imágenes - Mobile -->
            <div
                v-if="property.images && property.images.length > 1"
                class="absolute flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-black/70 rounded-lg backdrop-blur-sm bottom-3 left-3 sm:bottom-4 sm:left-4"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                </svg>
                {{ property.images.length }}
            </div>
        </div>

        <!-- Contenido - Mobile First -->
        <div class="flex flex-col justify-between flex-1 p-4 sm:p-5 lg:p-6 xl:p-8">
            <div>
                <!-- Header con precio - Mobile First -->
                <div class="flex flex-col gap-2 mb-3 sm:gap-3 sm:mb-4">
                    <div class="flex-1 min-w-0">
                        <!-- Nombre de la propiedad -->
                        <h3
                            class="mb-1.5 text-lg font-bold text-gray-900 transition-colors sm:text-xl sm:mb-2 lg:text-2xl group-hover:text-gray-700 line-clamp-2"
                        >
                            {{ property.nombre || getDefaultTitle }}
                        </h3>

                        <!-- Ubicación -->
                        <div class="flex items-center text-gray-600">
                            <MapPin
                                :size="14"
                                class="mr-1.5 flex-shrink-0 sm:w-4 sm:h-4"
                                :style="{ color: primaryColor }"
                            />
                            <span class="text-xs font-medium sm:text-sm lg:text-base">
                                {{ formatLocation }}
                            </span>
                        </div>
                    </div>

                    <!-- Precio - Mobile optimized -->
                    <div class="flex items-baseline gap-2">
                        <span
                            class="text-2xl font-bold sm:text-3xl lg:text-4xl"
                            :style="{ color: primaryColor }"
                        >
                            {{ formatPrice(property.price?.precio) }}
                        </span>
                        <span class="text-xs font-semibold text-gray-500 uppercase sm:text-sm">
                            {{ property.operation?.nombre || 'En venta' }}
                        </span>
                    </div>
                </div>

                <!-- Descripción - Mobile optimized -->
                <p
                    v-if="
                        property.descripcion_whatsapp ||
                        property.descripcion_facebook ||
                        property.descripcion
                    "
                    class="mb-4 text-xs leading-relaxed text-gray-700 sm:text-sm sm:mb-5 lg:mb-6 line-clamp-2 sm:line-clamp-3"
                >
                    {{
                        property.descripcion_whatsapp ||
                        property.descripcion_facebook ||
                        property.descripcion
                    }}
                </p>

                <!-- Características - Mobile First Grid -->
                <div
                    class="grid grid-cols-2 gap-2 pb-4 mb-4 border-b border-gray-100 sm:gap-3 sm:pb-5 sm:mb-5 lg:grid-cols-4 lg:gap-4 lg:pb-6 lg:mb-6"
                >
                    <!-- Habitaciones -->
                    <div
                        class="flex items-center gap-2 p-2 transition-all duration-200 rounded-lg sm:gap-2.5 sm:p-3 bg-gray-50 group-hover:bg-white group-hover:shadow-md"
                    >
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full sm:w-10 sm:h-10"
                            :style="{ backgroundColor: primaryColor + '15' }"
                        >
                            <Bed
                                :size="16"
                                class="sm:w-5 sm:h-5"
                                :style="{ color: primaryColor }"
                            />
                        </div>
                        <div class="min-w-0">
                            <span class="block text-base font-bold text-gray-900 sm:text-lg">{{
                                property.features?.habitaciones || 0
                            }}</span>
                            <span class="text-[10px] text-gray-500 sm:text-xs truncate"
                                >Habitaciones</span
                            >
                        </div>
                    </div>

                    <!-- Baños -->
                    <div
                        class="flex items-center gap-2 p-2 transition-all duration-200 rounded-lg sm:gap-2.5 sm:p-3 bg-gray-50 group-hover:bg-white group-hover:shadow-md"
                    >
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full sm:w-10 sm:h-10"
                            :style="{ backgroundColor: primaryColor + '15' }"
                        >
                            <Bath
                                :size="16"
                                class="sm:w-5 sm:h-5"
                                :style="{ color: primaryColor }"
                            />
                        </div>
                        <div class="min-w-0">
                            <span class="block text-base font-bold text-gray-900 sm:text-lg">{{
                                property.features?.baños || 0
                            }}</span>
                            <span class="text-[10px] text-gray-500 sm:text-xs truncate">Baños</span>
                        </div>
                    </div>

                    <!-- Superficie -->
                    <div
                        class="flex items-center gap-2 p-2 transition-all duration-200 rounded-lg sm:gap-2.5 sm:p-3 bg-gray-50 group-hover:bg-white group-hover:shadow-md"
                    >
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full sm:w-10 sm:h-10"
                            :style="{ backgroundColor: primaryColor + '15' }"
                        >
                            <Square
                                :size="16"
                                class="sm:w-5 sm:h-5"
                                :style="{ color: primaryColor }"
                            />
                        </div>
                        <div class="min-w-0">
                            <span class="block text-base font-bold text-gray-900 sm:text-lg">{{
                                property.features?.superficie_total || 0
                            }}</span>
                            <span class="text-[10px] text-gray-500 sm:text-xs truncate">m²</span>
                        </div>
                    </div>

                    <!-- Parking -->
                    <div
                        class="flex items-center gap-2 p-2 transition-all duration-200 rounded-lg sm:gap-2.5 sm:p-3 bg-gray-50 group-hover:bg-white group-hover:shadow-md"
                    >
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full sm:w-10 sm:h-10"
                            :style="{ backgroundColor: primaryColor + '15' }"
                        >
                            <Car
                                :size="16"
                                class="sm:w-5 sm:h-5"
                                :style="{ color: primaryColor }"
                            />
                        </div>
                        <div class="min-w-0">
                            <span class="block text-base font-bold text-gray-900 sm:text-lg">{{
                                property.features?.estacionamientos || 0
                            }}</span>
                            <span class="text-[10px] text-gray-500 sm:text-xs truncate"
                                >Parking</span
                            >
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer con acciones - Mobile First -->
            <div
                class="flex flex-col gap-2.5 sm:gap-3 md:flex-row md:items-center md:justify-between"
            >
                <!-- Estado - Mobile optimized -->
                <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span
                        class="px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-full"
                        :class="getStatusClass(property.status?.status?.nombre)"
                    >
                        {{ property.status?.status?.nombre || 'Disponible' }}
                    </span>
                    <span
                        v-if="property.operation?.nombre"
                        class="px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-full shadow-sm"
                    >
                        {{ property.operation.nombre }}
                    </span>
                </div>

                <!-- Botón Ver detalles - Mobile First -->
                <button
                    class="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 rounded-xl shadow-md sm:px-6 sm:py-3 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group/btn"
                    :style="{ backgroundColor: primaryColor }"
                >
                    <span class="sm:inline">Ver detalles</span>
                    <ChevronRight
                        :size="16"
                        class="transition-transform duration-300 sm:w-5 sm:h-5 group-hover/btn:translate-x-1"
                    />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Star, MapPin, Bed, Bath, Square, Car, ChevronRight, Heart } from 'lucide-vue-next';

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

const emit = defineEmits(['click']);

const isFavorite = ref(false);

// Título por defecto
const getDefaultTitle = computed(() => {
    const type = props.property.type?.nombre || 'Propiedad';
    const zone = props.property.location?.zona || 'Sin zona';
    return `${type} en ${zone}`;
});

// Formatear ubicación
const formatLocation = computed(() => {
    const loc = props.property.location;
    if (!loc) return 'Ubicación no disponible';

    const parts = [];
    if (loc.zona) parts.push(loc.zona);
    if (loc.ciudad) parts.push(loc.ciudad);

    return parts.join(', ') || 'Ubicación no disponible';
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

// Toggle favorito
const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;

    const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
    if (isFavorite.value) {
        favorites.push(props.property.id);
    } else {
        const index = favorites.indexOf(props.property.id);
        if (index > -1) favorites.splice(index, 1);
    }
    localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
};

// Clase de estado
const getStatusClass = status => {
    const statusLower = status?.toLowerCase() || '';

    if (statusLower.includes('disponible')) return 'bg-green-100 text-green-800';
    if (statusLower.includes('vendida') || statusLower.includes('alquilada'))
        return 'bg-red-100 text-red-800';
    if (statusLower.includes('reservada')) return 'bg-yellow-100 text-yellow-800';

    return 'bg-gray-100 text-gray-800';
};

onMounted(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
    isFavorite.value = favorites.includes(props.property.id);
});
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Smooth transitions */
* {
    -webkit-tap-highlight-color: transparent;
}
</style>
