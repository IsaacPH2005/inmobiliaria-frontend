<template>
    <section class="py-12 bg-gradient-to-b from-gray-50 to-white" :style="cssVars">
        <div class="container px-4 mx-auto">
            <!-- Header con estadísticas -->
            <div class="mb-10">
                <div
                    class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
                >
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                            Propiedades Disponibles
                        </h2>
                        <p
                            v-if="!loading && properties.length > 0"
                            class="flex items-center gap-2 mt-2 text-sm font-medium text-gray-600"
                        >
                            <span
                                class="flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full bg-primary"
                            >
                                {{ properties.length }}
                            </span>
                            de {{ pagination.total }} propiedades encontradas
                        </p>
                    </div>

                    <!-- Ordenamiento y Vista -->
                    <div
                        v-if="!loading && properties.length > 0"
                        class="flex flex-wrap items-center gap-3"
                    >
                        <div
                            class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-xl"
                        >
                            <label class="text-sm font-semibold text-gray-700">Ordenar:</label>
                            <select
                                v-model="sortBy"
                                @change="$emit('sort-change', sortBy)"
                                class="text-sm font-medium text-gray-700 bg-transparent border-none cursor-pointer focus:outline-none focus:ring-0"
                            >
                                <option value="recent">🆕 Más recientes</option>
                                <option value="price_asc">💰 Precio: Menor → Mayor</option>
                                <option value="price_desc">💎 Precio: Mayor → Menor</option>
                                <option value="area_desc">📐 Superficie: Mayor → Menor</option>
                            </select>
                        </div>

                        <!-- Vista Grid/List Toggle -->
                        <div
                            class="hidden gap-1 p-1 bg-white border border-gray-200 shadow-sm md:flex rounded-xl"
                        >
                            <button
                                @click="viewMode = 'grid'"
                                :class="[
                                    'p-2.5 rounded-lg transition-all font-medium',
                                    viewMode === 'grid'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                                ]"
                                title="Vista en cuadrícula"
                            >
                                <LayoutGrid :size="20" />
                            </button>
                            <button
                                @click="viewMode = 'list'"
                                :class="[
                                    'p-2.5 rounded-lg transition-all font-medium',
                                    viewMode === 'list'
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                                ]"
                                title="Vista en lista"
                            >
                                <List :size="20" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading State con skeleton -->
            <div v-if="loading">
                <div
                    class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
                    :class="viewMode === 'grid' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'"
                >
                    <PropertyCardSkeleton v-for="i in 6" :key="i" :view-mode="viewMode" />
                </div>
            </div>

            <!-- Error State -->
            <div
                v-else-if="error"
                class="relative px-8 py-6 mb-4 border-l-4 border-red-500 shadow-lg rounded-2xl bg-gradient-to-r from-red-50 to-red-100/50"
                role="alert"
            >
                <div class="flex items-start">
                    <div
                        class="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-red-200 rounded-full"
                    >
                        <AlertCircle :size="28" class="text-red-600" />
                    </div>
                    <div class="ml-4">
                        <strong class="block text-lg font-bold text-red-900"
                            >Error al cargar propiedades</strong
                        >
                        <span class="block mt-1 text-sm text-red-700">{{ error }}</span>
                        <button
                            @click="$emit('retry')"
                            class="flex items-center px-4 py-2 mt-4 text-sm font-semibold text-white transition-all bg-red-600 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg hover:scale-105"
                        >
                            <RotateCcw :size="16" class="mr-2" />
                            Intentar nuevamente
                        </button>
                    </div>
                </div>
            </div>

            <!-- Empty State mejorado -->
            <div v-else-if="properties.length === 0" class="py-20">
                <div class="max-w-xl mx-auto text-center">
                    <!-- Ilustración animada -->
                    <div class="relative mb-8">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="w-40 h-40 rounded-full bg-primary/10 animate-pulse"></div>
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="w-32 h-32 rounded-full bg-primary/20"></div>
                        </div>
                        <div class="relative flex items-center justify-center">
                            <Home :size="96" class="text-gray-300" />
                        </div>
                    </div>

                    <h3 class="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
                        🔍 No se encontraron propiedades
                    </h3>
                    <p class="mb-8 text-base text-gray-600 md:text-lg">
                        No hay propiedades que coincidan con tus criterios de búsqueda.
                        <br class="hidden sm:block" />
                        Intenta ajustar los filtros para ver más resultados.
                    </p>

                    <!-- Sugerencias -->
                    <div
                        class="p-6 mb-8 text-left bg-white border border-gray-200 shadow-sm rounded-2xl"
                    >
                        <h4 class="mb-3 text-sm font-bold tracking-wide text-gray-700 uppercase">
                            💡 Sugerencias:
                        </h4>
                        <ul class="space-y-2 text-sm text-gray-600">
                            <li class="flex items-start">
                                <span class="mr-2 text-primary">•</span>
                                Amplía tu rango de precios
                            </li>
                            <li class="flex items-start">
                                <span class="mr-2 text-primary">•</span>
                                Prueba con una ubicación diferente
                            </li>
                            <li class="flex items-start">
                                <span class="mr-2 text-primary">•</span>
                                Reduce la cantidad de filtros seleccionados
                            </li>
                        </ul>
                    </div>

                    <button
                        @click="$emit('reset-filters')"
                        class="inline-flex items-center px-8 py-3.5 text-base font-bold text-white transition-all rounded-xl bg-primary shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <RotateCcw :size="20" class="mr-2" />
                        Limpiar todos los filtros
                    </button>
                </div>
            </div>

            <!-- Properties Grid/List -->
            <div v-else>
                <!-- Grid View -->
                <div
                    v-if="viewMode === 'grid'"
                    class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:gap-10"
                >
                    <PropertyCard
                        v-for="property in properties"
                        :key="property.id"
                        :property="property"
                        :primary-color="primaryColor"
                        @click="$emit('open-modal', property)"
                        class="transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                    />
                </div>

                <!-- List View -->
                <div v-else class="space-y-6">
                    <PropertyCardList
                        v-for="property in properties"
                        :key="property.id"
                        :property="property"
                        :primary-color="primaryColor"
                        @click="$emit('open-modal', property)"
                        class="transition-all duration-200 transform hover:shadow-xl"
                    />
                </div>
            </div>

            <!-- Pagination mejorada -->
            <div v-if="!loading && !error && pagination.last_page > 1" class="mt-16">
                <nav class="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
                    <!-- Info de página -->
                    <div
                        class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-xl"
                    >
                        <span class="text-sm text-gray-600">Página</span>
                        <span class="px-3 py-1 text-sm font-bold text-white rounded-lg bg-primary">
                            {{ pagination.current_page }}
                        </span>
                        <span class="text-sm text-gray-600">de</span>
                        <span
                            class="px-3 py-1 text-sm font-bold text-gray-700 bg-gray-100 rounded-lg"
                        >
                            {{ pagination.last_page }}
                        </span>
                    </div>

                    <!-- Botones de paginación -->
                    <div class="flex items-center gap-2">
                        <!-- Primera página -->
                        <button
                            v-if="pagination.current_page > 2"
                            @click="$emit('change-page', 1)"
                            class="p-2.5 text-gray-700 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:shadow-md hover:scale-105"
                            title="Primera página"
                        >
                            <ChevronsLeft :size="20" />
                        </button>

                        <!-- Anterior -->
                        <button
                            @click="$emit('change-page', pagination.current_page - 1)"
                            :disabled="pagination.current_page === 1"
                            class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105"
                        >
                            <ChevronLeft :size="18" class="mr-1.5" />
                            <span class="hidden sm:inline">Anterior</span>
                        </button>

                        <!-- Números de página (responsive) -->
                        <div class="hidden gap-1.5 md:flex">
                            <button
                                v-for="page in visiblePages"
                                :key="page"
                                @click="page !== '...' && $emit('change-page', page)"
                                :disabled="page === '...'"
                                :class="[
                                    'min-w-[44px] px-4 py-2.5 text-sm font-bold border-2 rounded-xl transition-all shadow-sm',
                                    page === pagination.current_page
                                        ? 'bg-primary text-white border-primary shadow-md scale-110'
                                        : page === '...'
                                        ? 'bg-white text-gray-400 border-gray-200 cursor-default'
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50 hover:bg-gray-50 hover:scale-105',
                                ]"
                            >
                                {{ page }}
                            </button>
                        </div>

                        <!-- Siguiente -->
                        <button
                            @click="$emit('change-page', pagination.current_page + 1)"
                            :disabled="pagination.current_page === pagination.last_page"
                            class="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105"
                        >
                            <span class="hidden sm:inline">Siguiente</span>
                            <ChevronRight :size="18" class="ml-1.5" />
                        </button>

                        <!-- Última página -->
                        <button
                            v-if="pagination.current_page < pagination.last_page - 1"
                            @click="$emit('change-page', pagination.last_page)"
                            class="p-2.5 text-gray-700 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:shadow-md hover:scale-105"
                            title="Última página"
                        >
                            <ChevronsRight :size="20" />
                        </button>
                    </div>

                    <!-- Ir a página específica (solo desktop) -->
                    <div
                        class="items-center hidden gap-3 px-4 py-2 bg-white border border-gray-200 shadow-sm lg:flex rounded-xl"
                    >
                        <span class="text-sm font-semibold text-gray-700">Ir a:</span>
                        <input
                            type="number"
                            :min="1"
                            :max="pagination.last_page"
                            v-model.number="goToPage"
                            @keyup.enter="handleGoToPage"
                            class="w-16 px-2 py-1.5 text-sm font-medium text-center text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        />
                        <button
                            @click="handleGoToPage"
                            class="px-4 py-1.5 text-sm font-bold text-white transition-all rounded-lg bg-primary hover:shadow-md hover:scale-105"
                        >
                            Ir
                        </button>
                    </div>
                </nav>
            </div>

            <!-- Volver arriba (solo móvil) -->
            <div v-if="!loading && properties.length > 0" class="mt-10 text-center md:hidden">
                <button
                    @click="scrollToTop"
                    class="inline-flex items-center px-6 py-3 text-sm font-semibold text-gray-700 transition-all bg-white border border-gray-300 shadow-md rounded-xl hover:bg-gray-50 hover:shadow-lg hover:scale-105"
                >
                    <ArrowUp :size="18" class="mr-2" />
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

const emit = defineEmits(['open-modal', 'reset-filters', 'change-page', 'sort-change', 'retry']);

const viewMode = ref('grid');
const sortBy = ref('recent');
const goToPage = ref(1);

// CSS Variables dinámicas
const cssVars = computed(() => ({
    '--color-primary': props.primaryColor || '#3B82F6',
}));

// Calcular páginas visibles para la paginación
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
        emit('change-page', page);
        goToPage.value = page;
    }
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

.bg-primary\/10 {
    background-color: var(--color-primary);
    opacity: 0.1;
}

.bg-primary\/20 {
    background-color: var(--color-primary);
    opacity: 0.2;
}

.hover\:border-primary\/50:hover {
    border-color: var(--color-primary);
    opacity: 0.5;
}

.focus\:ring-primary\/50:focus {
    --tw-ring-color: var(--color-primary);
    --tw-ring-opacity: 0.5;
}

.focus\:border-primary:focus {
    border-color: var(--color-primary);
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
