<template>
    <div
        class="overflow-hidden transition-all duration-300 bg-white shadow-lg cursor-pointer rounded-xl hover:shadow-xl hover:-translate-y-2"
        @click="$emit('click', property)"
    >
        <div class="relative h-56 bg-gray-200">
            <img
                :src="
                    property.images[0]?.image_url ||
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                "
                :alt="property.descripcion_corta"
                class="object-cover w-full h-full"
                loading="lazy"
            />
            <div
                v-if="property.seo?.destacada"
                class="absolute px-3 py-1 text-sm font-bold text-white bg-yellow-600 rounded-full top-4 right-4"
            >
                <Star :size="16" class="inline mr-1" />
                Destacada
            </div>
        </div>
        <div class="p-6">
            <div class="flex items-start justify-between mb-2">
                <h3 class="text-xl font-bold text-gray-800">
                    {{ property.descripcion_corta }}
                </h3>
                <span class="font-bold" :style="{ color: primaryColor }">
                    {{ formatPrice(property.price?.precio) }}
                </span>
            </div>
            <div class="flex items-center mb-4 space-x-4 text-sm text-gray-600">
                <div class="flex items-center">
                    <Bed :size="16" class="mr-1" />
                    {{ property.features?.habitaciones }}
                </div>
                <div class="flex items-center">
                    <Bath :size="16" class="mr-1" />
                    {{ property.features?.baños }}
                </div>
                <div class="flex items-center">
                    <Square :size="16" class="mr-1" />
                    {{ property.features?.superficie_total }} m²
                </div>
            </div>
            <p class="mb-4 text-gray-700 line-clamp-2">
                {{ property.descripcion }}
            </p>
            <div class="flex items-center justify-between">
                <div class="flex items-center text-gray-500">
                    <MapPin :size="16" class="mr-1" />
                    {{ property.location?.ciudad }}
                </div>
                <button
                    class="flex items-center font-medium transition-colors hover:underline"
                    :style="{ color: primaryColor }"
                >
                    Ver detalles
                    <ChevronRight :size="16" class="ml-1" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Star, Bed, Bath, Square, MapPin, ChevronRight } from 'lucide-vue-next';

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
