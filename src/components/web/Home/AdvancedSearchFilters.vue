<template>
    <section class="py-6 bg-white border-b shadow-sm sticky top-[72px] z-40" :style="cssVars">
        <div class="container px-4 mx-auto">
            <!-- Filtros principales en una línea -->
            <div class="flex flex-wrap items-center gap-3 mb-3">
                <!-- Tipo de operación -->
                <div class="flex gap-2">
                    <button
                        v-for="operation in operationTypes"
                        :key="operation.value"
                        @click="localFilters.operation_type = operation.value"
                        class="flex items-center px-4 py-2.5 text-sm font-semibold transition-all rounded-xl shadow-sm hover:shadow-md"
                        :class="
                            localFilters.operation_type === operation.value
                                ? 'bg-primary text-white scale-105 shadow-primary/30'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        "
                    >
                        <component :is="operation.icon" :size="18" class="mr-2" />
                        {{ operation.label }}
                    </button>
                </div>

                <div class="hidden w-px h-10 bg-gray-200 md:block"></div>

                <!-- Tipo de propiedad -->
                <div class="relative">
                    <select
                        v-model="localFilters.property_type"
                        class="pl-4 pr-10 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm hover:shadow-md transition-all appearance-none cursor-pointer"
                    >
                        <option value="">🏠 Tipo de propiedad</option>
                        <option value="1">🏡 Casa</option>
                        <option value="2">🏢 Departamento</option>
                        <option value="3">📐 Terreno</option>
                        <option value="4">🏛️ Oficina</option>
                        <option value="5">🏪 Local Comercial</option>
                        <option value="6">🏬 Edificio</option>
                    </select>
                    <ChevronDown
                        :size="16"
                        class="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2"
                    />
                </div>

                <!-- Ubicación -->
                <div class="relative">
                    <select
                        v-model="localFilters.location"
                        class="pl-4 pr-10 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm hover:shadow-md transition-all appearance-none cursor-pointer"
                    >
                        <option value="">📍 Ciudad</option>
                        <option value="Cochabamba">Cochabamba</option>
                        <option value="La Paz">La Paz</option>
                        <option value="Santa Cruz">Santa Cruz</option>
                        <option value="Sucre">Sucre</option>
                    </select>
                    <ChevronDown
                        :size="16"
                        class="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2"
                    />
                </div>

                <!-- Precio -->
                <div
                    class="flex items-center gap-2 p-2 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
                >
                    <DollarSign :size="16" class="ml-1 text-gray-400" />
                    <input
                        v-model.number="localFilters.min_price"
                        type="number"
                        placeholder="Min"
                        class="w-24 px-2 py-1 text-sm font-medium text-gray-700 bg-transparent focus:outline-none"
                    />
                    <span class="text-gray-300">|</span>
                    <input
                        v-model.number="localFilters.max_price"
                        type="number"
                        placeholder="Max"
                        class="w-24 px-2 py-1 text-sm font-medium text-gray-700 bg-transparent focus:outline-none"
                    />
                </div>

                <!-- Botón más filtros -->
                <button
                    @click="showAdvanced = !showAdvanced"
                    class="flex items-center px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm hover:shadow-md"
                >
                    <SlidersHorizontal :size="18" class="mr-2" />
                    Más filtros
                    <ChevronDown
                        :size="16"
                        class="ml-2 transition-transform duration-200"
                        :class="{ 'rotate-180': showAdvanced }"
                    />
                </button>

                <div class="flex-1"></div>

                <!-- Botones de acción -->
                <button
                    v-if="activeFiltersCount > 0"
                    @click="resetFilters"
                    class="flex items-center px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all hover:text-red-600 hover:bg-red-50 rounded-xl"
                >
                    <X :size="18" class="mr-1.5" />
                    Limpiar
                </button>
                <button
                    @click="applyFilters"
                    class="flex items-center px-6 py-2.5 text-sm font-bold text-white transition-all rounded-xl shadow-md bg-primary hover:shadow-lg hover:scale-105 hover:shadow-primary/30"
                >
                    <Search :size="18" class="mr-2" />
                    Buscar
                    <span
                        v-if="activeFiltersCount > 0"
                        class="ml-2 px-2 py-0.5 text-xs bg-white/20 rounded-full"
                    >
                        {{ activeFiltersCount }}
                    </span>
                </button>
            </div>

            <!-- Filtros avanzados colapsables -->
            <transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="scale-95 -translate-y-4 opacity-0"
                enter-to-class="scale-100 translate-y-0 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="scale-100 translate-y-0 opacity-100"
                leave-to-class="scale-95 -translate-y-4 opacity-0"
            >
                <div
                    v-if="showAdvanced"
                    class="p-5 mt-4 border border-gray-200 shadow-inner bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl"
                >
                    <div class="grid grid-cols-2 gap-4 mb-5 md:grid-cols-4 lg:grid-cols-6">
                        <!-- Habitaciones -->
                        <div>
                            <label
                                class="flex items-center gap-2 mb-2.5 text-xs font-bold text-gray-700 uppercase tracking-wide"
                            >
                                <Home :size="14" class="text-primary" />
                                Habitaciones
                            </label>
                            <div class="flex gap-1.5">
                                <button
                                    v-for="num in [1, 2, 3, 4, 5]"
                                    :key="`bed-${num}`"
                                    @click="
                                        localFilters.bedrooms =
                                            localFilters.bedrooms === num ? null : num
                                    "
                                    class="flex items-center justify-center flex-1 px-2 py-2 text-sm font-bold transition-all rounded-lg hover:scale-110"
                                    :class="
                                        localFilters.bedrooms === num
                                            ? 'bg-primary text-white shadow-md shadow-primary/30'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'
                                    "
                                >
                                    {{ num }}{{ num === 5 ? '+' : '' }}
                                </button>
                            </div>
                        </div>

                        <!-- Baños -->
                        <div>
                            <label
                                class="flex items-center gap-2 mb-2.5 text-xs font-bold text-gray-700 uppercase tracking-wide"
                            >
                                <span>🚿</span>
                                Baños
                            </label>
                            <div class="flex gap-1.5">
                                <button
                                    v-for="num in [1, 2, 3, 4]"
                                    :key="`bath-${num}`"
                                    @click="
                                        localFilters.bathrooms =
                                            localFilters.bathrooms === num ? null : num
                                    "
                                    class="flex items-center justify-center flex-1 px-2 py-2 text-sm font-bold transition-all rounded-lg hover:scale-110"
                                    :class="
                                        localFilters.bathrooms === num
                                            ? 'bg-primary text-white shadow-md shadow-primary/30'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'
                                    "
                                >
                                    {{ num }}{{ num === 4 ? '+' : '' }}
                                </button>
                            </div>
                        </div>

                        <!-- Estacionamientos -->
                        <div>
                            <label
                                class="flex items-center gap-2 mb-2.5 text-xs font-bold text-gray-700 uppercase tracking-wide"
                            >
                                <span>🚗</span>
                                Parking
                            </label>
                            <div class="flex gap-1.5">
                                <button
                                    v-for="num in [1, 2, 3, 4]"
                                    :key="`parking-${num}`"
                                    @click="
                                        localFilters.parking =
                                            localFilters.parking === num ? null : num
                                    "
                                    class="flex items-center justify-center flex-1 px-2 py-2 text-sm font-bold transition-all rounded-lg hover:scale-110"
                                    :class="
                                        localFilters.parking === num
                                            ? 'bg-primary text-white shadow-md shadow-primary/30'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'
                                    "
                                >
                                    {{ num }}{{ num === 4 ? '+' : '' }}
                                </button>
                            </div>
                        </div>

                        <!-- Zona/Calle -->
                        <div>
                            <label
                                class="flex items-center gap-2 mb-2.5 text-xs font-bold text-gray-700 uppercase tracking-wide"
                            >
                                📌 Zona o Calle
                            </label>
                            <input
                                v-model="localFilters.street"
                                type="text"
                                placeholder="Ej: Zona Sur"
                                class="w-full px-3 py-2 text-sm font-medium text-gray-700 transition-all bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary hover:shadow-md"
                            />
                        </div>

                        <!-- Estado -->
                        <div>
                            <label
                                class="flex items-center gap-2 mb-2.5 text-xs font-bold text-gray-700 uppercase tracking-wide"
                            >
                                ⭐ Estado
                            </label>
                            <div class="relative">
                                <select
                                    v-model="localFilters.status"
                                    class="w-full px-3 py-2 pr-8 text-sm font-medium text-gray-700 transition-all bg-white border border-gray-200 rounded-lg shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary hover:shadow-md"
                                >
                                    <option value="">Todos</option>
                                    <option value="new">A estrenar</option>
                                    <option value="good">Buen estado</option>
                                    <option value="remodel">A remodelar</option>
                                    <option value="construction">En construcción</option>
                                </select>
                                <ChevronDown
                                    :size="14"
                                    class="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none right-2 top-1/2"
                                />
                            </div>
                        </div>

                        <!-- Superficie -->
                        <div>
                            <label
                                class="flex items-center gap-2 mb-2.5 text-xs font-bold text-gray-700 uppercase tracking-wide"
                            >
                                📏 Superficie (m²)
                            </label>
                            <input
                                v-model.number="localFilters.min_area"
                                type="number"
                                placeholder="Min m²"
                                class="w-full px-3 py-2 text-sm font-medium text-gray-700 transition-all bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary hover:shadow-md"
                            />
                        </div>
                    </div>

                    <!-- Características -->
                    <div>
                        <label
                            class="flex items-center gap-2 mb-3 text-xs font-bold tracking-wide text-gray-700 uppercase"
                        >
                            ✨ Características
                        </label>
                        <div class="flex flex-wrap gap-2.5">
                            <label
                                v-for="feature in features"
                                :key="feature.value"
                                class="group flex items-center px-4 py-2.5 text-sm font-semibold transition-all bg-white border-2 rounded-xl cursor-pointer hover:scale-105 shadow-sm hover:shadow-md"
                                :class="{
                                    'border-primary bg-primary/5 text-primary shadow-primary/20':
                                        localFilters.features.includes(feature.value),
                                    'border-gray-200 text-gray-700 hover:border-gray-300':
                                        !localFilters.features.includes(feature.value),
                                }"
                            >
                                <input
                                    type="checkbox"
                                    :value="feature.value"
                                    v-model="localFilters.features"
                                    class="mr-2.5 w-4 h-4 rounded accent-primary cursor-pointer"
                                />
                                <span>{{ feature.icon }}</span>
                                <span class="ml-1.5">{{ feature.label }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Tag, Home, DollarSign, SlidersHorizontal, ChevronDown, Search, X } from 'lucide-vue-next';
import { useSiteSettings } from '@/composables/useSiteSettings';

const emit = defineEmits(['search', 'reset']);
const { siteSettings } = useSiteSettings();

const showAdvanced = ref(false);

// CSS Variables dinámicas basadas en el color primario
const cssVars = computed(() => ({
    '--color-primary': siteSettings.value.color_primario || '#3B82F6',
}));

const operationTypes = [
    { value: '1', label: 'Venta', icon: Tag },
    { value: '2', label: 'Alquiler', icon: Home },
    { value: '3', label: 'Anticrético', icon: DollarSign },
];

const features = [
    { value: 'pool', label: 'Piscina', icon: '🏊' },
    { value: 'garden', label: 'Jardín', icon: '🌳' },
    { value: 'security', label: 'Seguridad', icon: '🔒' },
    { value: 'wifi', label: 'Internet', icon: '📶' },
    { value: 'balcony', label: 'Balcón', icon: '🏞️' },
    { value: 'ac', label: 'A/C', icon: '❄️' },
    { value: 'gym', label: 'Gimnasio', icon: '💪' },
    { value: 'elevator', label: 'Ascensor', icon: '🛗' },
];

const localFilters = ref({
    operation_type: '1',
    property_type: '',
    location: '',
    min_price: null,
    max_price: null,
    bedrooms: null,
    bathrooms: null,
    parking: null,
    street: '',
    status: '',
    min_area: null,
    features: [],
});

const activeFiltersCount = computed(() => {
    let count = 0;
    if (localFilters.value.property_type) count++;
    if (localFilters.value.location) count++;
    if (localFilters.value.min_price) count++;
    if (localFilters.value.max_price) count++;
    if (localFilters.value.bedrooms) count++;
    if (localFilters.value.bathrooms) count++;
    if (localFilters.value.parking) count++;
    if (localFilters.value.street) count++;
    if (localFilters.value.status) count++;
    if (localFilters.value.min_area) count++;
    count += localFilters.value.features.length;
    return count;
});

const applyFilters = () => {
    emit('search', { ...localFilters.value });
};

const resetFilters = () => {
    localFilters.value = {
        operation_type: '1',
        property_type: '',
        location: '',
        min_price: null,
        max_price: null,
        bedrooms: null,
        bathrooms: null,
        parking: null,
        street: '',
        status: '',
        min_area: null,
        features: [],
    };
    emit('reset');
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

.shadow-primary\/30 {
    box-shadow: 0 4px 6px -1px var(--color-primary), 0 2px 4px -1px var(--color-primary);
    opacity: 0.3;
}

.shadow-primary\/20 {
    box-shadow: 0 2px 4px -1px var(--color-primary);
    opacity: 0.2;
}

.focus\:ring-primary\/50:focus {
    --tw-ring-color: var(--color-primary);
    --tw-ring-opacity: 0.5;
}

.focus\:border-primary:focus {
    border-color: var(--color-primary);
}

.accent-primary {
    accent-color: var(--color-primary);
}
</style>
