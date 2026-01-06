<template>
    <section
        class="sticky z-40 bg-white border-b shadow-md"
        :class="showAdvanced ? 'top-[64px] lg:top-[72px]' : 'top-[64px] lg:top-[72px]'"
    >
        <div class="container px-3 py-3 mx-auto sm:px-4 lg:py-4">
            <!-- Mobile: Búsqueda rápida colapsada -->
            <div class="block lg:hidden">
                <!-- Botones principales mobile -->
                <div class="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
                    <button
                        @click="localFilters.operation_type = ''"
                        :class="[
                            'px-3 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 flex-shrink-0',
                            localFilters.operation_type === ''
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 active:bg-gray-200',
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
                            'px-3 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 flex-shrink-0',
                            localFilters.operation_type === operation.id
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 active:bg-gray-200',
                        ]"
                    >
                        <component :is="operation.icon" :size="14" />
                        {{ operation.nombre }}
                    </button>
                </div>

                <!-- Grid de filtros principales mobile -->
                <div class="grid grid-cols-2 gap-2 mb-3">
                    <!-- Tipo de Propiedad -->
                    <div class="relative">
                        <select
                            v-model="localFilters.property_type"
                            @change="applyFilters"
                            class="w-full py-2.5 pl-3 pr-8 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
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
                            class="w-full py-2.5 pl-3 pr-8 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
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
                            class="w-full py-2.5 pl-3 pr-8 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                <div class="flex gap-2 mb-3">
                    <div class="relative flex-1">
                        <span class="absolute text-xs text-gray-400 -translate-y-1/2 left-3 top-1/2"
                            >💲</span
                        >
                        <input
                            v-model.number="localFilters.min_price"
                            @input="applyFilters"
                            type="number"
                            placeholder="Precio mín"
                            class="w-full py-2.5 pl-8 pr-3 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                    </div>
                    <div class="relative flex-1">
                        <span class="absolute text-xs text-gray-400 -translate-y-1/2 left-3 top-1/2"
                            >💲</span
                        >
                        <input
                            v-model.number="localFilters.max_price"
                            @input="applyFilters"
                            type="number"
                            placeholder="Precio máx"
                            class="w-full py-2.5 pl-8 pr-3 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                    </div>
                </div>

                <!-- Botones de acción mobile -->
                <div class="grid grid-cols-2 gap-2">
                    <button
                        @click="showAdvanced = !showAdvanced"
                        :class="[
                            'px-3 py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5',
                            activeFiltersCount > 0
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 active:bg-gray-200',
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
                        class="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-bold text-white transition-all rounded-lg shadow-md bg-primary active:scale-95"
                    >
                        <Search :size="14" />
                        Buscar ({{ propertiesCount }})
                    </button>
                </div>

                <!-- Botón mostrar todos mobile -->
                <button
                    @click="showAllProperties"
                    class="flex items-center justify-center w-full gap-2 px-3 py-2.5 mt-2 text-xs font-bold text-white transition-all bg-green-600 rounded-lg shadow-md active:scale-95"
                >
                    <Eye :size="14" />
                    Mostrar todas las propiedades
                </button>
            </div>

            <!-- Desktop: Filtros en línea (original mejorado) -->
            <div class="hidden lg:block">
                <div
                    class="flex items-center gap-3 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                >
                    <!-- Tipo de Operación -->
                    <div class="flex flex-shrink-0 gap-2">
                        <button
                            @click="localFilters.operation_type = ''"
                            :class="[
                                'px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap flex items-center gap-2',
                                localFilters.operation_type === ''
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm',
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
                                'px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap flex items-center gap-2',
                                localFilters.operation_type === operation.id
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm',
                            ]"
                        >
                            <component :is="operation.icon" :size="16" />
                            {{ operation.nombre }}
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
                            class="w-full py-2 pl-3 pr-10 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
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
                            class="w-full py-2 pl-3 pr-10 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                            @input="applyFilters"
                            type="number"
                            placeholder="Mín"
                            class="w-20 text-sm font-medium text-gray-700 bg-transparent focus:outline-none"
                        />
                        <span class="text-gray-300">-</span>
                        <input
                            v-model.number="localFilters.max_price"
                            @input="applyFilters"
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

                    <!-- Botón Mostrar Todos -->
                    <button
                        @click="showAllProperties"
                        class="flex items-center flex-shrink-0 gap-2 px-6 py-2 text-sm font-bold text-white transition-all bg-green-600 rounded-lg shadow-lg hover:bg-green-700 hover:shadow-xl whitespace-nowrap"
                    >
                        <Eye :size="16" />
                        Mostrar todos
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
            </div>

            <!-- Filtros Avanzados (Responsive para Mobile y Desktop) -->
            <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="-translate-y-2 opacity-0 max-h-0"
                enter-to-class="max-h-[2000px] translate-y-0 opacity-100"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="max-h-[2000px] translate-y-0 opacity-100"
                leave-to-class="-translate-y-2 opacity-0 max-h-0"
            >
                <div
                    v-if="showAdvanced"
                    class="pt-3 mt-3 overflow-hidden border-t border-gray-200 lg:pt-4 lg:mt-4"
                >
                    <!-- Grid responsive: 1 columna en mobile, 3 en tablet, 6 en desktop -->
                    <div
                        class="grid grid-cols-1 gap-3 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-4 lg:mb-6"
                    >
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
                                        'flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-sm border',
                                        localFilters.bedrooms === num
                                            ? 'bg-primary text-white border-primary shadow-md'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-95',
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
                                        'flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-sm border',
                                        localFilters.bathrooms === num
                                            ? 'bg-primary text-white border-primary shadow-md'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-95',
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
                                        'flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-sm border',
                                        localFilters.parking === num
                                            ? 'bg-primary text-white border-primary shadow-md'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-95',
                                    ]"
                                >
                                    {{ num }}{{ num === 4 ? '+' : '' }}
                                </button>
                            </div>
                        </div>

                        <!-- Zona/Calle -->
                        <div class="sm:col-span-2 lg:col-span-2">
                            <label
                                class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                                📌 Zona / Calle
                            </label>
                            <input
                                v-model="localFilters.street"
                                @input="applyFilters"
                                type="text"
                                placeholder="Ej: Norte, Centro, Av. Principal..."
                                class="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm transition-all"
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
                                    class="w-full px-3 py-2 sm:py-2.5 pr-8 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm transition-all"
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
                                class="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                                📏 Superficie m²
                            </label>
                            <input
                                v-model.number="localFilters.min_area"
                                @input="applyFilters"
                                type="number"
                                placeholder="Mín m²"
                                class="w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm transition-all"
                            />
                        </div>
                    </div>

                    <!-- Características - Responsive -->
                    <div class="mb-4 lg:mb-6">
                        <label
                            class="flex items-center gap-2 mb-3 text-xs font-semibold text-gray-700 sm:text-sm lg:mb-4"
                        >
                            ✨ Características
                        </label>
                        <div class="flex flex-wrap gap-2">
                            <label
                                v-for="feature in features"
                                :key="feature.id"
                                :class="[
                                    'inline-flex items-center px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg cursor-pointer transition-all shadow-sm border active:scale-95',
                                    localFilters.features.includes(feature.id)
                                        ? 'bg-primary text-white border-primary shadow-md'
                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300',
                                ]"
                            >
                                <input
                                    type="checkbox"
                                    :value="feature.id"
                                    v-model="localFilters.features"
                                    @change="applyFilters"
                                    class="sr-only"
                                />
                                <span class="mr-1.5 sm:mr-2 text-base sm:text-lg">{{
                                    feature.icon
                                }}</span>
                                {{ feature.nombre }}
                            </label>
                        </div>
                    </div>

                    <!-- Botón Limpiar Filtros - Responsive -->
                    <div v-if="activeFiltersCount > 0" class="flex justify-center lg:justify-end">
                        <button
                            @click="resetFilters"
                            class="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold text-red-600 transition-all rounded-xl bg-red-50 hover:bg-red-100 active:scale-95 border border-red-200 hover:border-red-300 shadow-sm w-full sm:w-auto justify-center"
                        >
                            <X :size="16" />
                            Limpiar filtros ({{ activeFiltersCount }})
                        </button>
                    </div>
                </div>
            </Transition>
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
    Chuquisaca: [
        'Sucre',
        'Yotala',
        'Tarabuco',
        'Padilla',
        'Monteagudo',
        'Zudáñez',
        'Cuchumuela',
        'Tomina',
        'Villa Serrano',
        'Huacareta',
    ],
    'La Paz': [
        'La Paz',
        'El Alto',
        'Viacha',
        'Caranavi',
        'Coroico',
        'Achacachi',
        'Copacabana',
        'Sorata',
        'Laja',
        'Pucarani',
    ],
    Cochabamba: [
        'Cochabamba',
        'Sacaba',
        'Quillacollo',
        'Vinto',
        'Tiquipaya',
        'Colcapirhua',
        'Sipe Sipe',
        'Cliza',
        'Tolata',
        'Punata',
    ],
    Oruro: [
        'Oruro',
        'Huanuni',
        'Machacamarca',
        'Poopó',
        'Challapata',
        'Huayllamarca',
        'Sebástian Pagador',
        'Chuquihuata',
        'Eucaliptus',
        'Salinas de Garci Mendoza',
    ],
    Potosí: [
        'Potosí',
        'Llallagua',
        'Uyuni',
        'Tupiza',
        'Villazón',
        'Betanzos',
        'Puna',
        'Ckochas',
        'Toro Toro',
        'Cotagaita',
    ],
    Tarija: [
        'Tarija',
        'Yacuiba',
        'Bermejo',
        'Villa Montes',
        'Padcaya',
        'Caraparí',
        'Entre Ríos',
        'San Lorenzo',
        'Yunchará',
        'El Puente',
    ],
    'Santa Cruz': [
        'Santa Cruz de la Sierra',
        'Warnes',
        'Montero',
        'Portachuelo',
        'Okinyawa',
        'Cotoca',
        'La Guardia',
        'El Torno',
        'Roboré',
        'San José de Chiquitos',
    ],
    Beni: [
        'Trinidad',
        'Riberalta',
        'Guayaramerín',
        'Rurrenabaque',
        'San Borja',
        'Santa Ana del Yacuma',
        'Magdalena',
        'Reyes',
        'San Ignacio de Moxos',
        'Loreto',
    ],
    Pando: [
        'Cobija',
        'Porvenir',
        'Filadelfia',
        'Bella Vista',
        'Puerto Rico',
        'San Pedro',
        'Nueva Esperanza',
        'El Carmen',
        'Bolpebra',
        'Santuario',
    ],
});

const localFilters = ref({
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
    setTimeout(() => applyFilters(), 300);
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

/* Scrollbar styling */
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

/* Hide scrollbar completely on mobile */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
