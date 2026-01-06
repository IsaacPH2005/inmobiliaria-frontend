<template>
    <section class="py-8 bg-gradient-to-b from-gray-50 to-white sm:py-12 lg:py-16">
        <div class="container px-3 mx-auto sm:px-4 lg:px-6">
            <!-- Header con estadísticas - Mobile First -->
            <div class="mb-6 sm:mb-8">
                <div
                    class="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between"
                >
                    <div class="flex-1">
                        <h2 class="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
                            Propiedades Disponibles
                        </h2>
                        <p
                            v-if="!loading && properties.length > 0"
                            class="mt-1 text-xs text-gray-600 sm:text-sm"
                        >
                            <span class="font-medium">{{ properties.length }}</span> de
                            <span class="font-medium">{{ pagination.total }}</span> propiedades
                        </p>
                    </div>

                    <!-- Ordenamiento Mobile First -->
                    <div
                        v-if="!loading && properties.length > 0"
                        class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"
                    >
                        <label class="text-xs font-semibold text-gray-700 uppercase sm:text-sm"
                            >Ordenar:</label
                        >
                        <div class="flex gap-2">
                            <select
                                v-model="sortBy"
                                @change="$emit('sort-change', sortBy)"
                                class="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm sm:flex-none sm:px-4 sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="recent">🆕 Recientes</option>
                                <option value="price_asc">💰 Precio ↑</option>
                                <option value="price_desc">💰 Precio ↓</option>
                                <option value="area_desc">📏 Área ↓</option>
                            </select>

                            <!-- Vista Grid/List Toggle - Responsive -->
                            <div class="flex gap-1 p-1 bg-gray-100 rounded-lg">
                                <button
                                    @click="viewMode = 'grid'"
                                    :class="[
                                        'p-2 rounded-md transition-all duration-200',
                                        viewMode === 'grid'
                                            ? 'bg-white text-blue-600 shadow-md scale-105'
                                            : 'text-gray-500 hover:text-gray-700 active:scale-95',
                                    ]"
                                    aria-label="Vista en cuadrícula"
                                >
                                    <LayoutGrid :size="16" class="sm:w-5 sm:h-5" />
                                </button>
                                <button
                                    @click="viewMode = 'list'"
                                    :class="[
                                        'p-2 rounded-md transition-all duration-200',
                                        viewMode === 'list'
                                            ? 'bg-white text-blue-600 shadow-md scale-105'
                                            : 'text-gray-500 hover:text-gray-700 active:scale-95',
                                    ]"
                                    aria-label="Vista en lista"
                                >
                                    <List :size="16" class="sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading State con skeleton - Mobile First -->
            <div v-if="loading">
                <div
                    class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8"
                    :class="viewMode === 'grid' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'"
                >
                    <PropertyCardSkeleton v-for="i in 6" :key="i" :view-mode="viewMode" />
                </div>
            </div>

            <!-- Error State - Mobile First -->
            <div
                v-else-if="error"
                class="relative px-4 py-4 mb-4 text-red-700 border border-red-200 shadow-lg rounded-xl bg-gradient-to-br from-red-50 to-red-100 sm:px-6 sm:py-5"
                role="alert"
            >
                <div class="flex items-start gap-3">
                    <div
                        class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-200 rounded-full sm:w-12 sm:h-12"
                    >
                        <AlertCircle :size="20" class="text-red-600 sm:w-6 sm:h-6" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <strong class="block text-sm font-bold sm:text-base"
                            >Error al cargar propiedades</strong
                        >
                        <span class="block mt-1 text-xs text-red-600 sm:text-sm">{{ error }}</span>
                        <button
                            @click="$emit('retry')"
                            class="inline-flex items-center gap-1.5 mt-3 px-4 py-2 text-xs font-semibold text-red-700 bg-white border border-red-300 rounded-lg shadow-sm sm:text-sm hover:bg-red-50 active:scale-95 transition-all"
                        >
                            <RotateCcw :size="14" class="sm:w-4 sm:h-4" />
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Empty State mejorado - Mobile First -->
            <div v-else-if="properties.length === 0" class="py-12 text-center sm:py-16 lg:py-20">
                <div class="max-w-sm mx-auto sm:max-w-md">
                    <div class="relative mb-6 sm:mb-8">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div
                                class="w-24 h-24 bg-blue-100 rounded-full opacity-20 sm:w-32 sm:h-32 animate-pulse"
                            ></div>
                        </div>
                        <div class="relative flex items-center justify-center">
                            <Home :size="64" class="text-gray-300 sm:w-20 sm:h-20" />
                        </div>
                    </div>
                    <h3 class="mb-2 text-lg font-bold text-gray-800 sm:text-xl lg:text-2xl">
                        No hay propiedades disponibles
                    </h3>
                    <p class="mb-6 text-sm text-gray-600 sm:text-base sm:mb-8">
                        No encontramos propiedades con estos filtros. Prueba ajustar tu búsqueda.
                    </p>
                    <button
                        @click="$emit('reset-filters')"
                        class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-600 transition-all bg-blue-100 rounded-xl shadow-md sm:px-8 sm:py-3.5 sm:text-base hover:bg-blue-200 hover:shadow-lg active:scale-95"
                    >
                        <RotateCcw :size="18" class="sm:w-5 sm:h-5" />
                        Limpiar filtros
                    </button>
                </div>
            </div>

            <!-- Properties Grid/List - Mobile First -->
            <div v-else>
                <!-- Grid View -->
                <div
                    v-if="viewMode === 'grid'"
                    class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8 lg:grid-cols-3"
                >
                    <PropertyCard
                        v-for="property in properties"
                        :key="property.id"
                        :property="property"
                        :primary-color="primaryColor"
                        @click="handlePropertyClick(property.id)"
                        class="transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    />
                </div>

                <!-- List View -->
                <div v-else class="space-y-4 sm:space-y-6">
                    <PropertyCardList
                        v-for="property in properties"
                        :key="property.id"
                        :property="property"
                        :primary-color="primaryColor"
                        @click="handlePropertyClick(property.id)"
                        class="cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-[0.99]"
                    />
                </div>
            </div>

            <!-- Pagination mejorada - Mobile First -->
            <div v-if="!loading && !error && pagination.last_page > 1" class="mt-8 sm:mt-12">
                <nav class="flex flex-col gap-4 sm:gap-6">
                    <!-- Info de página - Mobile -->
                    <div class="flex items-center justify-center">
                        <p class="text-xs font-medium text-gray-600 sm:text-sm">
                            Página
                            <span
                                class="inline-flex items-center justify-center min-w-[28px] h-7 px-2 mx-1 text-sm font-bold text-white bg-blue-600 rounded-lg shadow-sm"
                            >
                                {{ pagination.current_page }}
                            </span>
                            de
                            <span class="mx-1 font-bold text-gray-800">{{
                                pagination.last_page
                            }}</span>
                        </p>
                    </div>

                    <!-- Botones de paginación - Mobile First -->
                    <div class="flex flex-wrap items-center justify-center gap-2">
                        <!-- Primera página - Solo desktop -->
                        <button
                            v-if="pagination.current_page > 2"
                            @click="handlePageChange(1)"
                            class="hidden p-2 text-gray-700 transition-all bg-white border border-gray-300 rounded-lg shadow-sm sm:inline-flex hover:bg-gray-50 active:scale-95"
                            aria-label="Primera página"
                        >
                            <ChevronsLeft :size="18" />
                        </button>

                        <!-- Anterior -->
                        <button
                            @click="handlePageChange(pagination.current_page - 1)"
                            :disabled="pagination.current_page === 1"
                            class="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm sm:px-5 sm:py-2.5 sm:text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                        >
                            <ChevronLeft :size="16" class="sm:w-5 sm:h-5" />
                            <span class="hidden xs:inline">Anterior</span>
                        </button>

                        <!-- Números de página - Responsive -->
                        <div class="flex gap-1 sm:gap-2">
                            <button
                                v-for="page in visiblePages"
                                :key="page"
                                @click="page !== '...' && handlePageChange(page)"
                                :disabled="page === '...'"
                                :class="[
                                    'min-w-[36px] sm:min-w-[44px] h-9 sm:h-11 px-2 sm:px-3 text-xs sm:text-sm font-semibold border rounded-lg transition-all shadow-sm',
                                    page === pagination.current_page
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                                        : page === '...'
                                        ? 'bg-white text-gray-400 border-gray-200 cursor-default'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:scale-95',
                                ]"
                            >
                                {{ page }}
                            </button>
                        </div>

                        <!-- Siguiente -->
                        <button
                            @click="handlePageChange(pagination.current_page + 1)"
                            :disabled="pagination.current_page === pagination.last_page"
                            class="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm sm:px-5 sm:py-2.5 sm:text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                        >
                            <span class="hidden xs:inline">Siguiente</span>
                            <ChevronRight :size="16" class="sm:w-5 sm:h-5" />
                        </button>

                        <!-- Última página - Solo desktop -->
                        <button
                            v-if="pagination.current_page < pagination.last_page - 1"
                            @click="handlePageChange(pagination.last_page)"
                            class="hidden p-2 text-gray-700 transition-all bg-white border border-gray-300 rounded-lg shadow-sm sm:inline-flex hover:bg-gray-50 active:scale-95"
                            aria-label="Última página"
                        >
                            <ChevronsRight :size="18" />
                        </button>
                    </div>

                    <!-- Ir a página específica - Desktop only -->
                    <div class="items-center justify-center hidden gap-2 lg:flex">
                        <span class="text-sm font-medium text-gray-600">Ir a:</span>
                        <input
                            type="number"
                            :min="1"
                            :max="pagination.last_page"
                            v-model.number="goToPage"
                            @keyup.enter="handleGoToPage"
                            class="w-16 px-3 py-2 text-sm font-medium text-center text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            :placeholder="pagination.current_page"
                        />
                        <button
                            @click="handleGoToPage"
                            class="px-4 py-2 text-sm font-semibold text-white transition-all bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95"
                        >
                            Ir
                        </button>
                    </div>
                </nav>
            </div>

            <!-- Volver arriba - Mobile optimizado -->
            <div v-if="!loading && properties.length > 0" class="mt-8 text-center sm:mt-10">
                <button
                    @click="scrollToTop"
                    class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 transition-all bg-white border-2 border-gray-300 rounded-full shadow-lg sm:px-8 hover:bg-gray-50 hover:shadow-xl active:scale-95"
                >
                    <ArrowUp :size="18" class="animate-bounce" />
                    Volver arriba
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
    Home,
    Loader2,
    AlertCircle,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    LayoutGrid,
    List,
    ArrowUp,
} from 'lucide-vue-next';
import PropertyCard from './PropertyCard.vue';
import PropertyCardList from './PropertyCardList.vue';
import PropertyCardSkeleton from './PropertyCardSkeleton.vue';

const props = defineProps({
    properties: {
        type: Array,
        required: true,
    },
    loading: Boolean,
    error: String,
    pagination: {
        type: Object,
        required: true,
    },
    primaryColor: {
        type: String,
        default: '#3B82F6',
    },
});

const emit = defineEmits([
    'open-modal',
    'reset-filters',
    'change-page',
    'sort-change',
    'retry',
    'view-property',
]);

const viewMode = ref('grid');
const sortBy = ref('recent');
const goToPage = ref(1);

const handlePropertyClick = propertyId => {
    console.log('Property clicked:', propertyId);
    emit('view-property', propertyId);
};

const handlePageChange = page => {
    if (page >= 1 && page <= props.pagination.last_page) {
        emit('change-page', page);
        goToPage.value = page;
    }
};

const visiblePages = computed(() => {
    const pages = [];
    const current = props.pagination.current_page;
    const last = props.pagination.last_page;

    if (last <= 7) {
        for (let i = 1; i <= last; i++) {
            pages.push(i);
        }
    } else {
        if (current <= 3) {
            pages.push(1, 2, 3, 4, '...', last);
        } else if (current >= last - 2) {
            pages.push(1, '...', last - 3, last - 2, last - 1, last);
        } else {
            pages.push(1, '...', current - 1, current, current + 1, '...', last);
        }
    }

    return pages;
});

const handleGoToPage = () => {
    const page = goToPage.value;
    if (page >= 1 && page <= props.pagination.last_page) {
        handlePageChange(page);
    }
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
/* Breakpoint personalizado para muy pequeñas pantallas */
@media (min-width: 400px) {
    .xs\:inline {
        display: inline;
    }
}

/* Animación bounce suave */
@keyframes bounce {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-4px);
    }
}

.animate-bounce {
    animation: bounce 2s infinite;
}

/* Mejora del focus para accesibilidad */
button:focus-visible,
select:focus-visible,
input:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}
</style>
