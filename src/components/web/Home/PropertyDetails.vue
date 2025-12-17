<template>
    <div>
        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between mb-4">
            <h1 class="text-3xl font-bold text-gray-800 md:text-4xl">
                {{ property.descripcion_corta }}
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

        <!-- Description -->
        <div class="p-6 mb-6 rounded-xl" :style="{ backgroundColor: primaryColor + '10' }">
            <h3 class="flex items-center mb-2 text-xl font-bold text-gray-800">
                <FileText :size="20" class="mr-2" />
                Descripción
            </h3>
            <p class="text-gray-700">{{ property.descripcion }}</p>
        </div>

        <!-- Features -->
        <div class="mb-6">
            <h3 class="flex items-center mb-4 text-xl font-bold text-gray-800">
                <CheckSquare :size="20" class="mr-2" />
                Características
            </h3>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
                <FeatureCard
                    :icon="Home"
                    :value="property.features?.habitaciones"
                    label="Habitaciones"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    :icon="Bath"
                    :value="property.features?.baños"
                    label="Baños"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    :icon="Droplet"
                    :value="property.features?.medio_baños"
                    label="Medio Baños"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    :icon="Building"
                    :value="property.features?.pisos"
                    label="Pisos"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    :icon="Maximize"
                    :value="`${property.features?.superficie_total} m²`"
                    label="Superficie Total"
                    :primary-color="primaryColor"
                />
                <FeatureCard
                    :icon="Car"
                    :value="property.features?.estacionamientos"
                    label="Estacionamientos"
                    :primary-color="primaryColor"
                />
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
                    <div class="flex items-start">
                        <MapPin
                            :size="20"
                            class="flex-shrink-0 mr-3 mt-0.5"
                            :style="{ color: primaryColor }"
                        />
                        <div>
                            <p class="font-medium text-gray-800">Dirección</p>
                            <p class="text-gray-700">{{ property.location?.direccion_completa }}</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <Building
                            :size="20"
                            class="flex-shrink-0 mr-3 mt-0.5"
                            :style="{ color: primaryColor }"
                        />
                        <div>
                            <p class="font-medium text-gray-800">Zona</p>
                            <p class="text-gray-700">{{ property.location?.zona }}</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <Globe
                            :size="20"
                            class="flex-shrink-0 mr-3 mt-0.5"
                            :style="{ color: primaryColor }"
                        />
                        <div>
                            <p class="font-medium text-gray-800">Ciudad</p>
                            <p class="text-gray-700">
                                {{ property.location?.ciudad }},
                                {{ property.location?.departamento }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Map Placeholder -->
                <div class="h-64 mt-4 overflow-hidden bg-gray-200 rounded-lg">
                    <img
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                        alt="Mapa de ubicación"
                        class="object-cover w-full h-full"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    Star,
    Hash,
    FileText,
    CheckSquare,
    Home,
    Bath,
    Droplet,
    Building,
    Maximize,
    Car,
    MapPin,
    Globe,
} from 'lucide-vue-next';
import FeatureCard from './FeatureCard.vue';

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
