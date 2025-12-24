<template>
    <div
        class="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm cursor-pointer group rounded-2xl md:flex-row hover:shadow-2xl hover:border-transparent hover:-translate-y-1"
        @click="$emit('click', property)"
    >
        <!-- Imagen -->
        <div
            class="relative flex-shrink-0 h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 md:w-96 md:h-auto"
        >
            <img
                :src="
                    (property.images && property.images[0]?.image_url) ||
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
                "
                :alt="
                    property.nombre || property.descripcion_whatsapp || property.descripcion_corta
                "
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
            />

            <!-- Overlay gradient -->
            <div
                class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:opacity-100"
            ></div>

            <!-- Badges superiores -->
            <div class="absolute flex flex-col gap-2 top-4 left-4">
                <span
                    v-if="property.seo?.destacada"
                    class="inline-flex items-center px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg backdrop-blur-sm"
                >
                    <Star :size="14" class="mr-1 fill-current" />
                    Destacada
                </span>
                <span
                    v-if="property.type?.nombre"
                    class="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-black/60 rounded-full backdrop-blur-sm"
                >
                    {{ property.type.nombre }}
                </span>
            </div>

            <!-- Código de propiedad -->
            <div
                class="absolute px-3 py-1.5 text-xs font-bold text-white bg-black/60 rounded-lg backdrop-blur-sm bottom-4 right-4"
            >
                #{{ property.codigo_interno }}
            </div>

            <!-- Botón de favorito -->
            <button
                @click.stop="toggleFavorite"
                class="absolute p-2.5 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-full shadow-lg top-4 right-4 hover:bg-white hover:scale-110"
                :class="isFavorite ? 'text-red-500' : 'text-gray-400'"
            >
                <Heart :size="20" :class="{ 'fill-current': isFavorite }" />
            </button>
        </div>

        <!-- Contenido -->
        <div class="flex flex-col justify-between flex-1 p-6 lg:p-8">
            <div>
                <!-- Header con precio -->
                <div class="flex flex-col gap-3 mb-4 sm:flex-row sm:items-start sm:justify-between">
                    <div class="flex-1 min-w-0">
                        <!-- 🔹 NOMBRE DE LA PROPIEDAD -->
                        <h3
                            class="mb-2 text-2xl font-bold text-gray-900 transition-colors lg:text-3xl group-hover:text-gray-700 line-clamp-2"
                        >
                            {{ property.nombre || getDefaultTitle }}
                        </h3>

                        <!-- Ubicación -->
                        <div class="flex items-center text-gray-600">
                            <MapPin
                                :size="18"
                                class="mr-1.5 flex-shrink-0"
                                :style="{ color: primaryColor }"
                            />
                            <span class="text-sm font-medium lg:text-base">
                                {{ formatLocation }}
                            </span>
                        </div>
                    </div>

                    <!-- Precio -->
                    <div class="flex flex-col items-start sm:items-end">
                        <span
                            class="text-3xl font-bold lg:text-4xl"
                            :style="{ color: primaryColor }"
                        >
                            {{ formatPrice(property.price?.precio) }}
                        </span>
                        <span class="text-sm font-semibold text-gray-500 uppercase">
                            {{ property.operation?.nombre || 'En venta' }}
                        </span>
                    </div>
                </div>

                <!-- 🔹 Descripción (WhatsApp prioridad) -->
                <p
                    v-if="
                        property.descripcion_whatsapp ||
                        property.descripcion_facebook ||
                        property.descripcion
                    "
                    class="mb-6 text-gray-700 line-clamp-3 lg:line-clamp-2"
                >
                    {{
                        property.descripcion_whatsapp ||
                        property.descripcion_facebook ||
                        property.descripcion
                    }}
                </p>

                <!-- Características -->
                <div
                    class="grid grid-cols-2 gap-4 pb-6 mb-6 border-b border-gray-100 sm:grid-cols-4 lg:gap-6"
                >
                    <div
                        class="flex items-center gap-3 p-3 transition-all duration-200 rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-sm"
                    >
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full"
                            :style="{ backgroundColor: primaryColor + '15' }"
                        >
                            <Bed :size="20" :style="{ color: primaryColor }" />
                        </div>
                        <div>
                            <span class="block text-lg font-bold text-gray-900">{{
                                property.features?.habitaciones || 0
                            }}</span>
                            <span class="text-xs text-gray-500">Habitaciones</span>
                        </div>
                    </div>

                    <div
                        class="flex items-center gap-3 p-3 transition-all duration-200 rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-sm"
                    >
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full"
                            :style="{ backgroundColor: primaryColor + '15' }"
                        >
                            <Bath :size="20" :style="{ color: primaryColor }" />
                        </div>
                        <div>
                            <span class="block text-lg font-bold text-gray-900">{{
                                property.features?.baños || 0
                            }}</span>
                            <span class="text-xs text-gray-500">Baños</span>
                        </div>
                    </div>

                    <div
                        class="flex items-center gap-3 p-3 transition-all duration-200 rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-sm"
                    >
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full"
                            :style="{ backgroundColor: primaryColor + '15' }"
                        >
                            <Square :size="20" :style="{ color: primaryColor }" />
                        </div>
                        <div>
                            <span class="block text-lg font-bold text-gray-900">{{
                                property.features?.superficie_total || 0
                            }}</span>
                            <span class="text-xs text-gray-500">m²</span>
                        </div>
                    </div>

                    <div
                        class="flex items-center gap-3 p-3 transition-all duration-200 rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-sm"
                    >
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full"
                            :style="{ backgroundColor: primaryColor + '15' }"
                        >
                            <Car :size="20" :style="{ color: primaryColor }" />
                        </div>
                        <div>
                            <span class="block text-lg font-bold text-gray-900">{{
                                property.features?.estacionamientos || 0
                            }}</span>
                            <span class="text-xs text-gray-500">Parking</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer con acciones -->
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <!-- Estado -->
                <div class="flex items-center gap-2">
                    <span
                        class="px-3 py-1.5 text-xs font-semibold rounded-full"
                        :class="getStatusClass(property.status?.status?.nombre)"
                    >
                        {{ property.status?.status?.nombre || 'Disponible' }}
                    </span>
                    <span
                        v-if="property.operation?.nombre"
                        class="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-full"
                    >
                        {{ property.operation.nombre }}
                    </span>
                </div>

                <!-- Botón Ver detalles -->
                <button
                    class="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 group"
                    :style="{ backgroundColor: primaryColor }"
                >
                    <span>Ver detalles completos</span>
                    <ChevronRight
                        :size="18"
                        class="transition-transform duration-300 group-hover:translate-x-1"
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

// 🔹 TÍTULO POR DEFECTO
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
</style>
