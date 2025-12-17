<template>
    <div class="space-y-6">
        <!-- Información de ubicación -->
        <div class="grid gap-4 md:grid-cols-2">
            <div class="p-4 bg-white border rounded-lg">
                <div class="flex items-start">
                    <MapPin
                        :size="20"
                        class="flex-shrink-0 mt-1 mr-3"
                        :style="{ color: primaryColor }"
                    />
                    <div>
                        <p class="text-sm font-medium text-gray-600">Dirección</p>
                        <p class="mt-1 text-gray-800">{{ location?.direccion_completa }}</p>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-white border rounded-lg">
                <div class="flex items-start">
                    <Building
                        :size="20"
                        class="flex-shrink-0 mt-1 mr-3"
                        :style="{ color: primaryColor }"
                    />
                    <div>
                        <p class="text-sm font-medium text-gray-600">Zona</p>
                        <p class="mt-1 text-gray-800">{{ location?.zona }}</p>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-white border rounded-lg">
                <div class="flex items-start">
                    <Globe
                        :size="20"
                        class="flex-shrink-0 mt-1 mr-3"
                        :style="{ color: primaryColor }"
                    />
                    <div>
                        <p class="text-sm font-medium text-gray-600">Ciudad</p>
                        <p class="mt-1 text-gray-800">
                            {{ location?.ciudad }}, {{ location?.departamento }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-white border rounded-lg">
                <div class="flex items-start">
                    <Navigation
                        :size="20"
                        class="flex-shrink-0 mt-1 mr-3"
                        :style="{ color: primaryColor }"
                    />
                    <div>
                        <p class="text-sm font-medium text-gray-600">Coordenadas</p>
                        <p class="mt-1 text-sm text-gray-800">
                            {{ location?.latitude || 'N/A' }}, {{ location?.longitude || 'N/A' }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mapa -->
        <div class="overflow-hidden bg-gray-200 rounded-lg shadow-lg h-96">
            <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Mapa de ubicación"
                class="object-cover w-full h-full"
            />
            <!-- Aquí puedes integrar Google Maps o Leaflet -->
        </div>

        <!-- Botones de acción -->
        <div class="flex gap-3">
            <button
                @click="openInMaps"
                class="flex items-center justify-center flex-1 px-4 py-3 font-medium text-white transition-all rounded-lg shadow-md hover:shadow-lg"
                :style="{ backgroundColor: primaryColor }"
            >
                <ExternalLink :size="18" class="mr-2" />
                Abrir en Google Maps
            </button>
            <button
                @click="getDirections"
                class="flex items-center justify-center flex-1 px-4 py-3 font-medium text-gray-700 transition-all bg-white border rounded-lg hover:bg-gray-50"
            >
                <Navigation :size="18" class="mr-2" />
                Cómo llegar
            </button>
        </div>
    </div>
</template>

<script setup>
import { MapPin, Building, Globe, Navigation, ExternalLink } from 'lucide-vue-next';

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

const openInMaps = () => {
    const address = encodeURIComponent(props.location?.direccion_completa || '');
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
};

const getDirections = () => {
    const address = encodeURIComponent(props.location?.direccion_completa || '');
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
};
</script>
