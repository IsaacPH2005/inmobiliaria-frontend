<template>
    <section class="sticky top-[72px] z-40 bg-white border-b shadow-md">
        <div class="container px-4 py-4 mx-auto">
            <!-- Filtros principales - Línea única -->
            <div
                class="flex items-center gap-3 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
                <!-- Tipo de Operación -->
                <div class="flex flex-shrink-0 gap-2">
                    <button
                        v-for="operation in operationTypes"
                        :key="operation.value"
                        @click="localFilters.operation_type = operation.value"
                        :class="[
                            'px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap flex items-center gap-2',
                            localFilters.operation_type === operation.value
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm',
                        ]"
                    >
                        <component :is="operation.icon" :size="16" />
                        {{ operation.label }}
                    </button>
                </div>

                <!-- Separador vertical -->
                <div class="flex-shrink-0 w-px h-8 bg-gray-300"></div>

                <!-- Tipo de Propiedad -->
                <div class="relative flex-shrink-0 min-w-[180px]">
                    <select
                        v-model="localFilters.property_type"
                        @change="applyFilters"
                        class="w-full py-2 pl-3 pr-10 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
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
                        class="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-3 top-1/2"
                    />
                </div>

                <!-- Ubicación -->
                <div class="relative flex-shrink-0 min-w-[180px]">
                    <select
                        v-model="localFilters.location"
                        @change="applyFilters"
                        class="w-full py-2 pl-3 pr-10 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    >
                        <option value="">📍 Ciudad</option>
                        <option value="Cochabamba">Cochabamba</option>
                        <option value="La Paz">La Paz</option>
                        <option value="Santa Cruz">Santa Cruz</option>
                        <option value="Sucre">Sucre</option>
                    </select>
                    <ChevronDown
                        :size="16"
                        class="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-3 top-1/2"
                    />
                </div>

                <!-- Rango de Precio -->
                <div
                    class="flex items-center flex-shrink-0 gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg"
                >
                    <span class="text-gray-400">💲</span>
                    <input
                        v-model.number="localFilters.min_price"
                        @input.debounce="applyFilters"
                        type="number"
                        placeholder="Mín"
                        class="w-20 text-sm font-medium text-gray-700 bg-transparent focus:outline-none"
                    />
                    <span class="text-gray-300">-</span>
                    <input
                        v-model.number="localFilters.max_price"
                        @input.debounce="applyFilters"
                        type="number"
                        placeholder="Máx"
                        class="w-20 text-sm font-medium text-gray-700 bg-transparent focus:outline-none"
                    />
                </div>

                <!-- Más Filtros -->
                <button
                    @click="showAdvanced = !showAdvanced"
                    :class="[
                        'px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap flex items-center gap-2 flex-shrink-0',
                        activeFiltersCount > 0
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm',
                    ]"
                >
                    <SlidersHorizontal :size="16" />
                    Más filtros
                    <span
                        v-if="activeFiltersCount > 0"
                        class="ml-1 px-1.5 py-0.5 text-xs bg-white/30 rounded-full"
                    >
                        {{ activeFiltersCount }}
                    </span>
                    <ChevronDown
                        :size="14"
                        class="transition-transform"
                        :class="{ 'rotate-180': showAdvanced }"
                    />
                </button>

                <!-- Botón Buscar -->
                <button
                    @click="applyFilters"
                    class="flex items-center flex-shrink-0 gap-2 px-6 py-2 ml-auto text-sm font-bold text-white transition-all rounded-lg shadow-lg bg-primary hover:bg-primary/90 hover:shadow-xl whitespace-nowrap"
                >
                    <Search :size="16" />
                    Buscar {{ propertiesCount }}
                </button>
            </div>

            <!-- Filtros Avanzados (Colapsables) -->
            <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="-translate-y-2 opacity-0 max-h-0"
                enter-to-class="max-h-screen translate-y-0 opacity-100"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="max-h-screen translate-y-0 opacity-100"
                leave-to-class="-translate-y-2 opacity-0 max-h-0"
            >
                <div v-if="showAdvanced" class="pt-4 mt-4 overflow-hidden border-t border-gray-200">
                    <div class="grid grid-cols-2 gap-4 mb-6 md:grid-cols-3 lg:grid-cols-6">
                        <!-- Habitaciones -->
                        <div>
                            <label
                                class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                                <Home :size="12" />
                                Habitaciones
                            </label>
                            <div class="flex gap-1">
                                <button
                                    v-for="num in [1, 2, 3, 4, 5]"
                                    :key="`bed-${num}`"
                                    @click="toggleFilter('bedrooms', num)"
                                    :class="[
                                        'flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all shadow-sm border',
                                        localFilters.bedrooms === num
                                            ? 'bg-primary text-white border-primary shadow-md'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md',
                                    ]"
                                >
                                    {{ num }}{{ num === 5 ? '+' : '' }}
                                </button>
                            </div>
                        </div>

                        <!-- Baños -->
                        <div>
                            <label
                                class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                                🚿 Baños
                            </label>
                            <div class="flex gap-1">
                                <button
                                    v-for="num in [1, 2, 3, 4]"
                                    :key="`bath-${num}`"
                                    @click="toggleFilter('bathrooms', num)"
                                    :class="[
                                        'flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all shadow-sm border',
                                        localFilters.bathrooms === num
                                            ? 'bg-primary text-white border-primary shadow-md'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md',
                                    ]"
                                >
                                    {{ num }}{{ num === 4 ? '+' : '' }}
                                </button>
                            </div>
                        </div>

                        <!-- Parking -->
                        <div>
                            <label
                                class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                                🚗 Parking
                            </label>
                            <div class="flex gap-1">
                                <button
                                    v-for="num in [1, 2, 3, 4]"
                                    :key="`parking-${num}`"
                                    @click="toggleFilter('parking', num)"
                                    :class="[
                                        'flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all shadow-sm border',
                                        localFilters.parking === num
                                            ? 'bg-primary text-white border-primary shadow-md'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md',
                                    ]"
                                >
                                    {{ num }}{{ num === 4 ? '+' : '' }}
                                </button>
                            </div>
                        </div>

                        <!-- Zona/Calle -->
                        <div class="lg:col-span-2">
                            <label
                                class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                                📌 Zona / Calle
                            </label>
                            <input
                                v-model="localFilters.street"
                                @input.debounce="applyFilters"
                                type="text"
                                placeholder="Ej: Norte, Centro, Av. Principal..."
                                class="w-full px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm transition-all"
                            />
                        </div>

                        <!-- Estado -->
                        <div>
                            <label
                                class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                                ⭐ Estado
                            </label>
                            <div class="relative">
                                <select
                                    v-model="localFilters.status"
                                    @change="applyFilters"
                                    class="w-full px-3 py-2.5 pr-8 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm transition-all"
                                >
                                    <option value="">Todos</option>
                                    <option value="1">Disponible</option>
                                    <option value="2">Reservado</option>
                                    <option value="3">Vendido/Alquilado</option>
                                </select>
                                <ChevronDown
                                    :size="14"
                                    class="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-2 top-1/2"
                                />
                            </div>
                        </div>

                        <!-- Superficie -->
                        <div>
                            <label
                                class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                                📏 Superficie m²
                            </label>
                            <input
                                v-model.number="localFilters.min_area"
                                @input.debounce="applyFilters"
                                type="number"
                                placeholder="Mín m²"
                                class="w-full px-3 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm transition-all"
                            />
                        </div>
                    </div>

                    <!-- Características -->
                    <div class="mb-6">
                        <label
                            class="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700"
                        >
                            ✨ Características
                        </label>
                        <div class="flex flex-wrap gap-2">
                            <label
                                v-for="feature in features"
                                :key="feature.value"
                                :class="[
                                    'inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-all shadow-sm border hover:shadow-md hover:scale-[1.02]',
                                    localFilters.features.includes(feature.value)
                                        ? 'bg-primary text-white border-primary shadow-md'
                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300',
                                ]"
                            >
                                <input
                                    type="checkbox"
                                    :value="feature.value"
                                    v-model="localFilters.features"
                                    @change="applyFilters"
                                    class="sr-only"
                                />
                                <span class="mr-2 text-lg">{{ feature.icon }}</span>
                                {{ feature.label }}
                            </label>
                        </div>
                    </div>

                    <!-- Botón Limpiar Filtros -->
                    <div v-if="activeFiltersCount > 0" class="flex justify-center lg:justify-end">
                        <button
                            @click="resetFilters"
                            class="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-red-600 transition-all rounded-xl bg-red-50 hover:bg-red-100 hover:shadow-md border border-red-200 hover:border-red-300 shadow-sm"
                        >
                            <X :size="16" />
                            Limpiar todos los filtros ({{ activeFiltersCount }})
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Tag, Home, DollarSign, SlidersHorizontal, ChevronDown, Search, X } from 'lucide-vue-next';
import { useSiteSettings } from '@/composables/useSiteSettings';

const emit = defineEmits(['search', 'reset']);
const props = defineProps({
    propertiesCount: {
        type: Number,
        default: 0,
    },
});

const { siteSettings } = useSiteSettings();
const showAdvanced = ref(false);

const operationTypes = [
    { value: '1', label: 'Venta', icon: Tag },
    { value: '2', label: 'Alquiler', icon: Home },
    { value: '3', label: 'Anticrético', icon: DollarSign },
];

const features = [
    { value: 'pool', label: 'Piscina', icon: '🏊' },
    { value: 'garden', label: 'Jardín', icon: '🌳' },
    { value: 'security', label: 'Seguridad 24h', icon: '🔒' },
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

const toggleFilter = (key, value) => {
    localFilters.value[key] = localFilters.value[key] === value ? null : value;
    // Auto-apply después de 500ms
    setTimeout(() => applyFilters(), 300);
};

const applyFilters = () => {
    // Transformar features para el backend
    const filtersToEmit = {
        ...localFilters.value,
        operation_type_id: localFilters.value.operation_type,
        property_type_id: localFilters.value.property_type,
    };

    emit('search', filtersToEmit);
    showAdvanced.value = false;
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

// Auto-apply en cambios críticos
watch(
    () => localFilters.value.operation_type,
    () => {
        applyFilters();
    },
    { immediate: true }
);
</script>

<style scoped>
.bg-primary {
    background-color: v-bind('siteSettings.color_primario || "#3B82F6"');
}

.text-primary {
    color: v-bind('siteSettings.color_primario || "#3B82F6"');
}

.focus\:ring-primary\/30:focus {
    --tw-ring-color: color-mix(
        in srgb,
        v-bind('siteSettings.color_primario || "#3B82F6"') 30%,
        transparent
    );
}

.focus\:border-primary:focus {
    border-color: v-bind('siteSettings.color_primario || "#3B82F6"');
}

/* Scrollbar personalizado */
.scrollbar-thin::-webkit-scrollbar {
    height: 6px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 3px;
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
    background-color: transparent;
}
</style>
