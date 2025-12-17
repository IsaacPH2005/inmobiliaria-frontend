<template>
    <div class="max-w-4xl p-4 mx-auto bg-white rounded-lg shadow-lg">
        <div class="flex flex-col gap-4 md:flex-row">
            <div class="relative flex-1">
                <select
                    v-model="localFilters.property_type"
                    class="w-full px-4 py-3 pl-10 text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Tipo de propiedad</option>
                    <option value="1">Casa</option>
                    <option value="2">Departamento</option>
                    <option value="3">Terreno</option>
                    <option value="4">Oficina</option>
                </select>
                <Building2
                    :size="20"
                    class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                />
            </div>

            <div class="relative flex-1">
                <select
                    v-model="localFilters.operation_type"
                    class="w-full px-4 py-3 pl-10 text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Operación</option>
                    <option value="1">Venta</option>
                    <option value="2">Alquiler</option>
                </select>
                <DollarSign
                    :size="20"
                    class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                />
            </div>

            <div class="relative flex-1">
                <select
                    v-model="localFilters.location"
                    class="w-full px-4 py-3 pl-10 text-gray-700 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Ubicación</option>
                    <option value="Cochabamba">Cochabamba</option>
                    <option value="La Paz">La Paz</option>
                    <option value="Santa Cruz">Santa Cruz</option>
                </select>
                <MapPin
                    :size="20"
                    class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                />
            </div>

            <button
                @click="applyFilters"
                class="flex items-center justify-center px-6 py-3 font-bold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
                <Search :size="20" class="mr-2" />
                Buscar
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Building2, DollarSign, MapPin, Search } from 'lucide-vue-next';

const emit = defineEmits(['search']);

const localFilters = ref({
    property_type: '',
    operation_type: '',
    location: '',
});

const applyFilters = () => {
    emit('search', localFilters.value);
};
</script>
