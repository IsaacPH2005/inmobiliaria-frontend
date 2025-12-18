<template>
    <article
        class="relative overflow-hidden transition-all duration-300 bg-white border-2 border-gray-200 shadow-lg cursor-pointer group rounded-2xl hover:shadow-2xl hover:border-primary"
        :style="cssVars"
        @click="handleClick"
    >
        <!-- Badge destacado -->
        <div
            v-if="property.seo?.destacada"
            class="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-yellow-500 to-yellow-600 animate-pulse-slow"
        >
            <Star :size="16" fill="currentColor" />
            Destacada
        </div>

        <!-- Badge operación -->
        <div
            class="absolute z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg top-4 right-4"
        >
            {{ property.operation?.nombre }}
        </div>

        <!-- Imagen con overlay hover -->
        <div class="relative h-56 overflow-hidden bg-gray-200">
            <img
                :src="getMainImage"
                :alt="property.descripcion_corta"
                class="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
                @error="handleImageError"
            />

            <!-- Gradient overlay -->
            <div
                class="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70"
            ></div>

            <!-- Contador de imágenes -->
            <div
                class="absolute flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white transition-all duration-300 bg-black/60 backdrop-blur-sm rounded-lg shadow-lg bottom-4 right-4 group-hover:bg-primary group-hover:scale-110"
            >
                <span>📷</span>
                {{ property.images?.length || 0 }}
            </div>

            <!-- Hover overlay con botón "Ver más" -->
            <div
                class="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 backdrop-blur-sm group-hover:opacity-100"
            >
                <div
                    class="px-6 py-3 text-sm font-bold text-white transition-all duration-300 transform scale-90 border-2 border-white rounded-full group-hover:scale-100 bg-primary"
                >
                    Ver Detalles
                </div>
            </div>
        </div>

        <!-- Contenido de la card -->
        <div class="p-5">
            <!-- Encabezado con tipo y código -->
            <div class="flex items-center justify-between gap-2 mb-3">
                <span class="px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-100 text-primary">
                    {{ property.type?.nombre }}
                </span>
                <span
                    class="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg"
                >
                    #{{ property.codigo_interno }}
                </span>
            </div>

            <!-- Título -->
            <h3
                class="mb-3 text-lg font-bold text-gray-900 transition-colors duration-200 line-clamp-2 group-hover:text-primary"
            >
                {{ property.descripcion_corta || 'Propiedad sin título' }}
            </h3>

            <!-- Precio destacado -->
            <div class="mb-4">
                <p class="text-3xl font-bold text-gray-900">
                    {{ formatPrice(property.price?.precio) }}
                    <span class="text-base font-semibold text-gray-600">
                        {{ property.price?.currency?.code || 'USD' }}
                    </span>
                </p>
            </div>

            <!-- Ubicación -->
            <div class="flex items-start gap-2 pb-4 mb-4 border-b border-gray-100">
                <MapPin :size="18" class="flex-shrink-0 mt-0.5 text-gray-400" />
                <p class="text-sm font-medium text-gray-700 line-clamp-2">
                    {{ formatLocation }}
                </p>
            </div>

            <!-- Características principales -->
            <div class="grid grid-cols-3 gap-3 mb-4">
                <div
                    class="flex flex-col items-center p-2 transition-all duration-200 rounded-lg bg-gray-50 group-hover:bg-primary/5"
                >
                    <Bed :size="20" class="mb-1 text-gray-600 group-hover:text-primary" />
                    <span class="text-xs font-bold text-gray-900">{{
                        property.features?.habitaciones || 0
                    }}</span>
                    <span class="text-xs text-gray-500">Hab</span>
                </div>
                <div
                    class="flex flex-col items-center p-2 transition-all duration-200 rounded-lg bg-gray-50 group-hover:bg-primary/5"
                >
                    <Bath :size="20" class="mb-1 text-gray-600 group-hover:text-primary" />
                    <span class="text-xs font-bold text-gray-900">{{
                        property.features?.baños || 0
                    }}</span>
                    <span class="text-xs text-gray-500">Baños</span>
                </div>
                <div
                    class="flex flex-col items-center p-2 transition-all duration-200 rounded-lg bg-gray-50 group-hover:bg-primary/5"
                >
                    <Square :size="20" class="mb-1 text-gray-600 group-hover:text-primary" />
                    <span class="text-xs font-bold text-gray-900">{{
                        property.features?.superficie_total || 0
                    }}</span>
                    <span class="text-xs text-gray-500">m²</span>
                </div>
            </div>

            <!-- Característica adicional: Estacionamientos -->
            <div
                v-if="property.features?.estacionamientos"
                class="flex items-center gap-2 pb-4 mb-4 text-sm text-gray-600 border-b border-gray-100"
            >
                <span class="text-base">🚗</span>
                <span class="font-medium"
                    >{{ property.features.estacionamientos }} Estacionamiento(s)</span
                >
            </div>

            <!-- Descripción -->
            <p class="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-2">
                {{ property.descripcion || 'Excelente propiedad disponible.' }}
            </p>

            <!-- Footer con estado y acción -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <!-- Estado -->
                <div class="flex items-center gap-2">
                    <div
                        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200"
                        :class="getStatusClass(property.status?.status?.nombre)"
                    >
                        <span class="w-2 h-2 bg-current rounded-full animate-pulse"></span>
                        {{ property.status?.status?.nombre || 'Disponible' }}
                    </div>
                </div>

                <!-- Botón Ver detalles -->
                <button
                    class="flex items-center gap-1 text-sm font-bold transition-all duration-200 text-primary hover:gap-2"
                    @click.stop="handleClick"
                >
                    Ver detalles
                    <ChevronRight
                        :size="18"
                        class="transition-transform duration-200 group-hover:translate-x-1"
                    />
                </button>
            </div>

            <!-- Condición del inmueble -->
            <div v-if="property.status?.condition?.nombre" class="mt-3">
                <span
                    class="inline-block px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg"
                >
                    {{ property.status.condition.nombre }}
                </span>
            </div>
        </div>

        <!-- Border animado al hacer hover -->
        <div
            class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 rounded-2xl ring-2 ring-primary ring-offset-2"
        ></div>
    </article>
</template>

<script setup>
import { computed } from 'vue';
import { Star, Bed, Bath, Square, MapPin, ChevronRight } from 'lucide-vue-next';

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

// Definir el emit correctamente
const emit = defineEmits(['click']);

// Método para manejar el clic
const handleClick = () => {
    console.log('PropertyCard clicked:', props.property.id); // Debug
    emit('click');
};

// CSS Variables dinámicas
const cssVars = computed(() => ({
    '--color-primary': props.primaryColor || '#3B82F6',
}));

// Obtener imagen principal
const getMainImage = computed(() => {
    if (props.property.featured_image) {
        return props.property.featured_image;
    }
    if (props.property.images && props.property.images.length > 0) {
        return props.property.images[0].image_url;
    }
    return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
});

// Formatear ubicación
const formatLocation = computed(() => {
    const loc = props.property.location;
    if (!loc) return 'Ubicación no disponible';

    const parts = [];
    if (loc.zona) parts.push(loc.zona);
    if (loc.ciudad) parts.push(loc.ciudad);
    if (loc.departamento && loc.departamento !== loc.ciudad) parts.push(loc.departamento);

    return parts.length > 0 ? parts.join(', ') : 'Ubicación no especificada';
});

// Formatear precio
const formatPrice = price => {
    if (!price) return '0';
    return new Intl.NumberFormat('es-BO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

// Obtener clase de estado
const getStatusClass = status => {
    const statusMap = {
        Disponible: 'bg-green-100 text-green-700',
        Vendida: 'bg-red-100 text-red-700',
        Alquilada: 'bg-blue-100 text-blue-700',
        Reservada: 'bg-yellow-100 text-yellow-700',
        'En proceso': 'bg-orange-100 text-orange-700',
    };
    return statusMap[status] || 'bg-gray-100 text-gray-700';
};

// Manejar error de imagen
const handleImageError = event => {
    event.target.src =
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
};
</script>

<style scoped>
.bg-primary {
    background-color: var(--color-primary);
}

.text-primary {
    color: var(--color-primary);
}

.border-primary {
    border-color: var(--color-primary);
}

.bg-primary\/10 {
    background-color: var(--color-primary);
    opacity: 0.1;
}

.bg-primary\/5 {
    background-color: var(--color-primary);
    opacity: 0.05;
}

.ring-primary {
    --tw-ring-color: var(--color-primary);
}

.group-hover\:text-primary:hover {
    color: var(--color-primary);
}

.group-hover\:bg-primary:hover {
    background-color: var(--color-primary);
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

@keyframes pulse-slow {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.8;
    }
}

.animate-pulse-slow {
    animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
