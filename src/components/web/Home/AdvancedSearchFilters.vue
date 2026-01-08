<template>
    <section class="sticky z-40 bg-white border-b shadow-md top-16 lg:top-20">
        <div class="container px-3 py-3 mx-auto sm:px-4 lg:py-4">
            <!-- Mobile: Filtros colapsables -->
            <div class="block lg:hidden">
                <!-- Resumen compacto cuando está colapsado -->
                <div
                    v-if="!showMobileFilters"
                    class="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
                >
                    <div class="flex items-center gap-2 text-xs text-gray-600">
                        <Search :size="14" />
                        <span class="font-medium">
                            {{ propertiesCount }} propiedad{{ propertiesCount !== 1 ? 'es' : '' }}
                        </span>
                        <span
                            v-if="activeFiltersCount > 0"
                            class="px-2 py-0.5 text-xs font-bold text-white rounded-full bg-primary"
                        >
                            {{ activeFiltersCount }} filtros
                        </span>
                    </div>
                    <button
                        @click="showMobileFilters = true"
                        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-lg shadow-md bg-primary active:opacity-80"
                    >
                        <SlidersHorizontal :size="14" />
                        Filtrar
                    </button>
                </div>

                <!-- Contenido de filtros mobile -->
                <div v-show="showMobileFilters" class="space-y-3">
                    <!-- Botones principales mobile -->
                    <div class="flex gap-2 overflow-x-auto scrollbar-hide">
                        <button
                            @click="localFilters.operation_type = ''"
                            :class="[
                                'px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap flex items-center gap-1.5 flex-shrink-0',
                                localFilters.operation_type === ''
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700',
                            ]"
                        >
                            <Eye :size="14" />
                            Todos
                        </button>

                        <button
                            v-for="operation in operationTypes"
                            :key="operation.id"
                            @click="localFilters.operation_type = operation.id"
                            :class="[
                                'px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap flex items-center gap-1.5 flex-shrink-0',
                                localFilters.operation_type === operation.id
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700',
                            ]"
                        >
                            <component :is="operation.icon" :size="14" />
                            {{ operation.nombre }}
                        </button>
                    </div>

                    <!-- Grid de filtros principales mobile -->
                    <div class="grid grid-cols-2 gap-2">
                        <!-- Tipo de Propiedad -->
                        <div class="relative">
                            <select
                                v-model="localFilters.property_type"
                                @change="applyFilters"
                                class="w-full py-2.5 pl-3 pr-8 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none"
                            >
                                <option value="">🏠 Tipo</option>
                                <option
                                    v-for="(item, index) in propertiesType"
                                    :key="index"
                                    :value="item.id"
                                >
                                    {{ item.nombre }}
                                </option>
                            </select>
                            <ChevronDown
                                :size="14"
                                class="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-2 top-1/2"
                            />
                        </div>

                        <!-- Departamento -->
                        <div class="relative">
                            <select
                                v-model="localFilters.departamento"
                                @change="handleDepartamentoChange"
                                class="w-full py-2.5 pl-3 pr-8 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none"
                            >
                                <option value="">🗺️ Departamento</option>
                                <option v-for="depto in departamentos" :key="depto" :value="depto">
                                    {{ depto }}
                                </option>
                            </select>
                            <ChevronDown
                                :size="14"
                                class="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-2 top-1/2"
                            />
                        </div>

                        <!-- Ciudad -->
                        <div class="relative col-span-2">
                            <select
                                v-model="localFilters.location"
                                @change="applyFilters"
                                :disabled="!localFilters.departamento"
                                class="w-full py-2.5 pl-3 pr-8 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">
                                    {{
                                        localFilters.departamento
                                            ? '📍 Ciudad'
                                            : '📍 Seleccione departamento primero'
                                    }}
                                </option>
                                <option v-for="city in availableCities" :key="city" :value="city">
                                    {{ city }}
                                </option>
                            </select>
                            <ChevronDown
                                :size="14"
                                class="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-2 top-1/2"
                            />
                        </div>
                    </div>

                    <!-- Precio mobile -->
                    <div class="flex gap-2">
                        <div class="relative flex-1">
                            <span
                                class="absolute text-xs text-gray-400 -translate-y-1/2 left-3 top-1/2"
                                >💲</span
                            >
                            <input
                                v-model.number="localFilters.min_price"
                                @input="debouncedApplyFilters"
                                type="number"
                                placeholder="Precio mín"
                                class="w-full py-2.5 pl-8 pr-3 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div class="relative flex-1">
                            <span
                                class="absolute text-xs text-gray-400 -translate-y-1/2 left-3 top-1/2"
                                >💲</span
                            >
                            <input
                                v-model.number="localFilters.max_price"
                                @input="debouncedApplyFilters"
                                type="number"
                                placeholder="Precio máx"
                                class="w-full py-2.5 pl-8 pr-3 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <!-- Botones de acción mobile -->
                    <div class="grid grid-cols-2 gap-2">
                        <button
                            @click="showAdvanced = !showAdvanced"
                            :class="[
                                'px-3 py-2.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5',
                                activeFiltersCount > 0
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700',
                            ]"
                        >
                            <SlidersHorizontal :size="14" />
                            Filtros
                            <span
                                v-if="activeFiltersCount > 0"
                                class="px-1.5 py-0.5 text-xs bg-white/30 rounded-full font-bold"
                            >
                                {{ activeFiltersCount }}
                            </span>
                        </button>

                        <button
                            @click="applyFilters"
                            class="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-white rounded-lg shadow-md bg-primary"
                        >
                            <Search :size="14" />
                            Buscar ({{ propertiesCount }})
                        </button>
                    </div>

                    <!-- Botón mostrar todos mobile -->
                    <button
                        @click="showAllProperties"
                        class="flex items-center justify-center w-full gap-2 px-3 py-2.5 text-xs font-bold text-white bg-green-600 rounded-lg shadow-md"
                    >
                        <Eye :size="14" />
                        Mostrar todas las propiedades
                    </button>
                </div>

                <!-- Botón flotante para cerrar filtros -->
                <button
                    v-if="showMobileFilters"
                    @click="showMobileFilters = false"
                    class="fixed z-50 flex items-center gap-2 px-4 py-3 text-sm font-bold text-white rounded-full shadow-2xl bottom-6 right-6 bg-primary"
                >
                    <ChevronDown :size="18" class="rotate-180" />
                    Ocultar
                </button>
            </div>

            <!-- Desktop: Filtros en línea -->
            <div class="hidden lg:block">
                <div class="flex items-center gap-3 pb-2 overflow-x-auto">
                    <!-- Tipo de Operación -->
                    <div class="flex flex-shrink-0 gap-2">
                        <button
                            @click="localFilters.operation_type = ''"
                            :class="[
                                'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap flex items-center gap-2',
                                localFilters.operation_type === ''
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                            ]"
                        >
                            <Eye :size="16" />
                            Todos
                        </button>

                        <button
                            v-for="operation in operationTypes"
                            :key="operation.id"
                            @click="localFilters.operation_type = operation.id"
                            :class="[
                                'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap flex items-center gap-2',
                                localFilters.operation_type === operation.id
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                            ]"
                        >
                            <component :is="operation.icon" :size="16" />
                            {{ operation.nombre }}
                        </button>
                    </div>

                    <div class="flex-shrink-0 w-px h-8 bg-gray-300"></div>

                    <!-- Tipo de Propiedad -->
                    <div class="relative flex-shrink-0 min-w-[180px]">
                        <select
                            v-model="localFilters.property_type"
                            @change="applyFilters"
                            class="w-full py-2 pl-3 pr-10 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer"
                        >
                            <option value="">🏠 Tipo de propiedad</option>
                            <option
                                v-for="(item, index) in propertiesType"
                                :key="index"
                                :value="item.id"
                            >
                                {{ item.nombre }}
                            </option>
                        </select>
                        <ChevronDown
                            :size="16"
                            class="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-3 top-1/2"
                        />
                    </div>

                    <!-- Departamento -->
                    <div class="relative flex-shrink-0 min-w-[180px]">
                        <select
                            v-model="localFilters.departamento"
                            @change="handleDepartamentoChange"
                            class="w-full py-2 pl-3 pr-10 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer"
                        >
                            <option value="">🗺️ Departamento</option>
                            <option v-for="depto in departamentos" :key="depto" :value="depto">
                                {{ depto }}
                            </option>
                        </select>
                        <ChevronDown
                            :size="16"
                            class="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-3 top-1/2"
                        />
                    </div>

                    <!-- Ciudad -->
                    <div class="relative flex-shrink-0 min-w-[180px]">
                        <select
                            v-model="localFilters.location"
                            @change="applyFilters"
                            :disabled="!localFilters.departamento"
                            class="w-full py-2 pl-3 pr-10 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">
                                {{
                                    localFilters.departamento
                                        ? '📍 Ciudad'
                                        : '📍 Seleccione departamento primero'
                                }}
                            </option>
                            <option v-for="city in availableCities" :key="city" :value="city">
                                {{ city }}
                            </option>
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
                            @input="debouncedApplyFilters"
                            type="number"
                            placeholder="Mín"
                            class="w-20 text-sm font-medium text-gray-700 bg-transparent focus:outline-none"
                        />
                        <span class="text-gray-300">-</span>
                        <input
                            v-model.number="localFilters.max_price"
                            @input="debouncedApplyFilters"
                            type="number"
                            placeholder="Máx"
                            class="w-20 text-sm font-medium text-gray-700 bg-transparent focus:outline-none"
                        />
                    </div>

                    <!-- Más Filtros -->
                    <button
                        @click="showAdvanced = !showAdvanced"
                        :class="[
                            'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap flex items-center gap-2 flex-shrink-0',
                            activeFiltersCount > 0
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
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
                            :class="['transition-transform', { 'rotate-180': showAdvanced }]"
                        />
                    </button>

                    <!-- Botón Mostrar Todos -->
                    <button
                        @click="showAllProperties"
                        class="flex items-center flex-shrink-0 gap-2 px-6 py-2 text-sm font-bold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 whitespace-nowrap"
                    >
                        <Eye :size="16" />
                        Mostrar todos
                    </button>

                    <!-- Botón Buscar -->
                    <button
                        @click="applyFilters"
                        class="flex items-center flex-shrink-0 gap-2 px-6 py-2 ml-auto text-sm font-bold text-white rounded-lg shadow-lg bg-primary hover:opacity-90 whitespace-nowrap"
                    >
                        <Search :size="16" />
                        Buscar {{ propertiesCount }}
                    </button>
                </div>
            </div>

            <!-- Filtros Avanzados -->
            <div v-show="showAdvanced" class="pt-3 mt-3 border-t border-gray-200 lg:pt-4 lg:mt-4">
                <!-- Grid responsive -->
                <div
                    class="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-4 lg:mb-6"
                >
                    <!-- Habitaciones -->
                    <div>
                        <label
                            class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase"
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
                                    'flex-1 py-2 text-xs font-semibold rounded-lg border',
                                    localFilters.bedrooms === num
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-white text-gray-700 border-gray-200',
                                ]"
                            >
                                {{ num }}{{ num === 5 ? '+' : '' }}
                            </button>
                        </div>
                    </div>

                    <!-- Baños -->
                    <div>
                        <label
                            class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase"
                        >
                            🚿 Baños
                        </label>
                        <div class="flex gap-1">
                            <button
                                v-for="num in [1, 2, 3, 4]"
                                :key="`bath-${num}`"
                                @click="toggleFilter('bathrooms', num)"
                                :class="[
                                    'flex-1 py-2 text-xs font-semibold rounded-lg border',
                                    localFilters.bathrooms === num
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-white text-gray-700 border-gray-200',
                                ]"
                            >
                                {{ num }}{{ num === 4 ? '+' : '' }}
                            </button>
                        </div>
                    </div>

                    <!-- Parking -->
                    <div>
                        <label
                            class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase"
                        >
                            🚗 Parking
                        </label>
                        <div class="flex gap-1">
                            <button
                                v-for="num in [1, 2, 3, 4]"
                                :key="`parking-${num}`"
                                @click="toggleFilter('parking', num)"
                                :class="[
                                    'flex-1 py-2 text-xs font-semibold rounded-lg border',
                                    localFilters.parking === num
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-white text-gray-700 border-gray-200',
                                ]"
                            >
                                {{ num }}{{ num === 4 ? '+' : '' }}
                            </button>
                        </div>
                    </div>

                    <!-- Zona/Calle -->
                    <div class="sm:col-span-2 lg:col-span-2">
                        <label
                            class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase"
                        >
                            📌 Zona / Calle
                        </label>
                        <input
                            v-model="localFilters.street"
                            @input="debouncedApplyFilters"
                            type="text"
                            placeholder="Ej: Norte, Centro, Av. Principal..."
                            class="w-full px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg"
                        />
                    </div>

                    <!-- Estado -->
                    <div>
                        <label
                            class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase"
                        >
                            ⭐ Estado
                        </label>
                        <div class="relative">
                            <select
                                v-model="localFilters.status"
                                @change="applyFilters"
                                class="w-full px-3 py-2 pr-8 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer"
                            >
                                <option value="">Todos</option>
                                <option
                                    v-for="(item, index) in propertiesStatus"
                                    :key="index"
                                    :value="item.id"
                                >
                                    {{ item.nombre }}
                                </option>
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
                            class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase"
                        >
                            📏 Superficie m²
                        </label>
                        <input
                            v-model.number="localFilters.min_area"
                            @input="debouncedApplyFilters"
                            type="number"
                            placeholder="Mín m²"
                            class="w-full px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                <!-- Características -->
                <div class="mb-4 lg:mb-6">
                    <label
                        class="flex items-center gap-2 mb-3 text-xs font-semibold text-gray-700 lg:mb-4"
                    >
                        ✨ Características
                    </label>
                    <div class="flex flex-wrap gap-2">
                        <label
                            v-for="feature in features"
                            :key="feature.id"
                            :class="[
                                'inline-flex items-center px-3 py-2 text-xs font-medium rounded-lg cursor-pointer border',
                                localFilters.features.includes(feature.id)
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-gray-700 border-gray-200',
                            ]"
                        >
                            <input
                                type="checkbox"
                                :value="feature.id"
                                v-model="localFilters.features"
                                @change="applyFilters"
                                class="sr-only"
                            />
                            <span class="mr-1.5">{{ feature.icon }}</span>
                            {{ feature.nombre }}
                        </label>
                    </div>
                </div>

                <!-- Botón Limpiar Filtros -->
                <div v-if="activeFiltersCount > 0" class="flex justify-center lg:justify-end">
                    <button
                        @click="resetFilters"
                        class="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 sm:px-6"
                    >
                        <X :size="16" />
                        Limpiar filtros ({{ activeFiltersCount }})
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import {
    Tag,
    Home,
    DollarSign,
    SlidersHorizontal,
    ChevronDown,
    Search,
    X,
    Eye,
} from 'lucide-vue-next';
import { useSiteSettings } from '@/composables/useSiteSettings';
import { getTypesPropertyActives } from '@/services/TyperPropertyService';
import { getOperationTypesActives } from '@/services/OperationPropertyService';
import { getFeaturesActives } from '@/services/FeaturesPropertyService';
import { getStatusesPropertyActives } from '@/services/StatusesPropertyService';

const emit = defineEmits(['search', 'reset', 'show-all']);
const props = defineProps({
    propertiesCount: {
        type: Number,
        default: 0,
    },
});

const { siteSettings } = useSiteSettings();
const showAdvanced = ref(false);
const showMobileFilters = ref(false);

const features = ref([]);
const operationTypes = ref([]);

const departamentos = ref([
    'Chuquisaca',
    'La Paz',
    'Cochabamba',
    'Oruro',
    'Potosí',
    'Tarija',
    'Santa Cruz',
    'Beni',
    'Pando',
]);

const ciudadesPorDepartamento = ref({
    Chuquisaca: ['Sucre', 'Yotala', 'Tarabuco', 'Padilla', 'Monteagudo'],
    'La Paz': ['La Paz', 'El Alto', 'Viacha', 'Caranavi', 'Coroico'],
    Cochabamba: ['Cochabamba', 'Sacaba', 'Quillacollo', 'Vinto', 'Tiquipaya'],
    Oruro: ['Oruro', 'Huanuni', 'Machacamarca', 'Poopó', 'Challapata'],
    Potosí: ['Potosí', 'Llallagua', 'Uyuni', 'Tupiza', 'Villazón'],
    Tarija: ['Tarija', 'Yacuiba', 'Bermejo', 'Villa Montes', 'Padcaya'],
    'Santa Cruz': ['Santa Cruz de la Sierra', 'Warnes', 'Montero', 'Portachuelo', 'Cotoca'],
    Beni: ['Trinidad', 'Riberalta', 'Guayaramerín', 'Rurrenabaque', 'San Borja'],
    Pando: ['Cobija', 'Porvenir', 'Filadelfia', 'Bella Vista', 'Puerto Rico'],
});

const localFilters = ref({
    operation_type: '',
    property_type: '',
    departamento: '',
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

const propertiesType = ref([]);
const propertiesStatus = ref([]);

const availableCities = computed(() => {
    if (!localFilters.value.departamento) return [];
    return ciudadesPorDepartamento.value[localFilters.value.departamento] || [];
});

const handleDepartamentoChange = () => {
    localFilters.value.location = '';
    applyFilters();
};

const listFeatures = async () => {
    try {
        const { data } = await getFeaturesActives();
        features.value = data.datos;
    } catch (error) {
        console.log(error);
    }
};

const listOperationTypes = async () => {
    try {
        const { data } = await getOperationTypesActives();
        operationTypes.value = data.datos;
    } catch (error) {
        console.log(error);
    }
};

const listPropertiesType = async () => {
    try {
        const { data } = await getTypesPropertyActives();
        propertiesType.value = data.datos;
    } catch (error) {
        console.log(error);
    }
};

const listStatuses = async () => {
    try {
        const { data } = await getStatusesPropertyActives();
        propertiesStatus.value = data.datos;
    } catch (error) {
        console.log(error);
    }
};

const activeFiltersCount = computed(() => {
    let count = 0;
    if (localFilters.value.operation_type && localFilters.value.operation_type !== '') count++;
    if (localFilters.value.property_type) count++;
    if (localFilters.value.departamento) count++;
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
    applyFilters();
};

// Debounce para inputs de texto y números
let debounceTimer = null;
const debouncedApplyFilters = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        applyFilters();
    }, 500);
};

const applyFilters = () => {
    const filtersToEmit = {
        ...localFilters.value,
        operation_type_id: localFilters.value.operation_type,
        property_type_id: localFilters.value.property_type,
    };

    console.log('Filtros aplicados:', filtersToEmit);
    emit('search', filtersToEmit);
    showAdvanced.value = false;
};

const resetFilters = () => {
    localFilters.value = {
        operation_type: '1',
        property_type: '',
        departamento: '',
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

const showAllProperties = () => {
    localFilters.value = {
        operation_type: '',
        property_type: '',
        departamento: '',
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

    console.log('Mostrando todas las propiedades');
    emit('show-all');
    showAdvanced.value = false;
};

onMounted(() => {
    listFeatures();
    listPropertiesType();
    listOperationTypes();
    listStatuses();
});

/* watch(
    () => localFilters.value.operation_type,
    () => {
        applyFilters();
    },
    { immediate: true }
); */
</script>

<style scoped>
* {
    -webkit-tap-highlight-color: transparent;
}

.bg-primary {
    background-color: v-bind('siteSettings.color_primario || "#3B82F6"');
}

.text-primary {
    color: v-bind('siteSettings.color_primario || "#3B82F6"');
}

/* Hide scrollbar on mobile */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Smooth transitions only for simple properties */
button,
select,
input {
    transition: background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
}
</style>
