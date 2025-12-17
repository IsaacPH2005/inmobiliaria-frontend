<template>
    <div
        class="flex flex-col overflow-hidden transition-all duration-300 bg-white shadow-md cursor-pointer rounded-xl md:flex-row hover:shadow-xl"
        @click="$emit('click', property)"
    >
        <!-- Imagen -->
        <div class="relative flex-shrink-0 h-64 bg-gray-200 md:w-80 md:h-auto">
            <img
                :src="
                    property.images[0]?.image_url ||
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
                "
                :alt="property.descripcion_corta"
                class="object-cover w-full h-full"
                loading="lazy"
            />
            <div
                v-if="property.seo?.destacada"
                class="absolute flex items-center px-3 py-1 text-sm font-bold text-white bg-yellow-600 rounded-full top-4 left-4"
            >
                <Star :size="16" class="mr-1" />
                Destacada
            </div>
        </div>

        <!-- Contenido -->
        <div class="flex flex-col justify-between flex-1 p-6">
            <div>
                <div class="flex items-start justify-between mb-3">
                    <h3 class="text-2xl font-bold text-gray-800">
                        {{ property.descripcion_corta }}
                    </h3>
                    <span class="ml-4 text-2xl font-bold" :style="{ color: primaryColor }">
                        {{ formatPrice(property.price?.precio) }}
                    </span>
                </div>

                <div class="flex items-center mb-3 text-gray-600">
                    <MapPin :size="18" class="mr-1" />
                    {{ property.location?.ciudad }}, {{ property.location?.zona }}
                </div>

                <p class="mb-4 text-gray-700 line-clamp-2">
                    {{ property.descripcion }}
                </p>

                <div class="flex flex-wrap gap-4 mb-4">
                    <div class="flex items-center text-gray-700">
                        <Bed :size="20" class="mr-2" />
                        <span class="font-medium">{{ property.features?.habitaciones }}</span>
                        <span class="ml-1 text-sm">hab.</span>
                    </div>
                    <div class="flex items-center text-gray-700">
                        <Bath :size="20" class="mr-2" />
                        <span class="font-medium">{{ property.features?.baños }}</span>
                        <span class="ml-1 text-sm">baños</span>
                    </div>
                    <div class="flex items-center text-gray-700">
                        <Square :size="20" class="mr-2" />
                        <span class="font-medium">{{ property.features?.superficie_total }}</span>
                        <span class="ml-1 text-sm">m²</span>
                    </div>
                    <div
                        v-if="property.features?.estacionamientos"
                        class="flex items-center text-gray-700"
                    >
                        <Car :size="20" class="mr-2" />
                        <span class="font-medium">{{ property.features?.estacionamientos }}</span>
                        <span class="ml-1 text-sm">est.</span>
                    </div>
                </div>
            </div>

            <button
                class="flex items-center self-start font-medium transition-colors"
                :style="{ color: primaryColor }"
            >
                Ver detalles completos
                <ChevronRight :size="18" class="ml-1" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { Star, MapPin, Bed, Bath, Square, Car, ChevronRight } from 'lucide-vue-next';

defineProps({
    property: {
        type: Object,
        required: true,
    },
    primaryColor: {
        type: String,
        default: '#3B82F6',
    },
});

defineEmits(['click']);

const formatPrice = price => {
    if (!price) return '';
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};
</script>
