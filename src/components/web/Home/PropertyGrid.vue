<template>
    <section class="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div class="container px-4 mx-auto">
            <!-- Header con estadísticas -->
            <div class="mb-8">
                <div
                    class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
                >
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800 md:text-3xl">
                            Propiedades Disponibles
                        </h2>
                        <p
                            v-if="!loading && properties.length > 0"
                            class="mt-1 text-sm text-gray-600"
                        >
                            Mostrando {{ properties.length }} de {{ pagination.total }} propiedades
                        </p>
                    </div>

                    <!-- Ordenamiento -->
                    <div v-if="!loading && properties.length > 0" class="flex items-center gap-3">
                        <label class="text-sm font-medium text-gray-700">Ordenar por:</label>
                        <select
                            v-model="sortBy"
                            @change="$emit('sort-change', sortBy)"
                            class="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="recent">Más recientes</option>
                            <option value="price_asc">Precio: Menor a Mayor</option>
                            <option value="price_desc">Precio: Mayor a Menor</option>
                            <option value="area_desc">Superficie: Mayor a Menor</option>
                        </select>

                        <!-- Vista Grid/List Toggle -->
                        <div class="hidden gap-1 p-1 bg-gray-100 rounded-lg md:flex">
                            <button
                                @click="viewMode = 'grid'"
                                :class="[
                                    'p-2 rounded transition-colors',
                                    viewMode === 'grid'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700',
                                ]"
                            >
                                <LayoutGrid :size="18" />
                            </button>
                            <button
                                @click="viewMode = 'list'"
                                :class="[
                                    'p-2 rounded transition-colors',
                                    viewMode === 'list'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700',
                                ]"
                            >
                                <List :size="18" />
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
                class="relative px-6 py-4 mb-4 text-red-700 border-l-4 border-red-500 rounded-lg shadow-sm bg-red-50"
                role="alert"
            >
                <div class="flex items-start">
                    <AlertCircle :size="24" class="mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                        <strong class="block font-bold">Error al cargar propiedades</strong>
                        <span class="block mt-1 text-sm">{{ error }}</span>
                        <button
                            @click="$emit('retry')"
                            class="flex items-center mt-3 text-sm font-medium text-red-800 hover:text-red-900"
                        >
                            <RotateCcw :size="16" class="mr-1" />
                            Intentar nuevamente
                        </button>
                    </div>
                </div>
            </div>

            <!-- Empty State mejorado -->
            <div v-else-if="properties.length === 0" class="py-16 text-center">
                <div class="max-w-md mx-auto">
                    <div class="relative mb-6">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
                        </div>
                        <Home :size="80" class="relative mx-auto text-gray-300" />
                    </div>
                    <h3 class="mb-2 text-xl font-bold text-gray-800">
                        No se encontraron propiedades
                    </h3>
                    <p class="mb-6 text-gray-600">
                        No hay propiedades que coincidan con los filtros seleccionados. Intenta
                        ajustar tus criterios de búsqueda.
                    </p>
                    <button
                        @click="$emit('reset-filters')"
                        class="inline-flex items-center px-6 py-3 font-medium text-blue-600 transition-all bg-blue-100 rounded-lg hover:bg-blue-200 hover:shadow-md"
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
                    class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
                >
                    <PropertyCard
                        v-for="property in properties"
                        :key="property.id"
                        :property="property"
                        :primary-color="primaryColor"
                        @click="$emit('open-modal', property)"
                        class="transform transition-all duration-300 hover:scale-[1.02]"
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
                    />
                </div>
            </div>

            <!-- Pagination mejorada -->
            <div v-if="!loading && !error && pagination.last_page > 1" class="mt-12">
                <nav class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                    <!-- Info de página -->
                    <p class="text-sm text-gray-600">
                        Página <span class="font-medium">{{ pagination.current_page }}</span> de
                        <span class="font-medium">{{ pagination.last_page }}</span>
                    </p>

                    <!-- Botones de paginación -->
                    <div class="flex items-center gap-2">
                        <!-- Primera página -->
                        <button
                            v-if="pagination.current_page > 2"
                            @click="$emit('change-page', 1)"
                            class="px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <ChevronsLeft :size="18" />
                        </button>

                        <!-- Anterior -->
                        <button
                            @click="$emit('change-page', pagination.current_page - 1)"
                            :disabled="pagination.current_page === 1"
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft :size="18" class="mr-1" />
                            <span class="hidden sm:inline">Anterior</span>
                        </button>

                        <!-- Números de página (responsive) -->
                        <div class="hidden gap-1 md:flex">
                            <button
                                v-for="page in visiblePages"
                                :key="page"
                                @click="page !== '...' && $emit('change-page', page)"
                                :disabled="page === '...'"
                                :class="[
                                    'min-w-[40px] px-3 py-2 text-sm font-medium border rounded-lg transition-all',
                                    page === pagination.current_page
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                        : page === '...'
                                        ? 'bg-white text-gray-400 border-gray-300 cursor-default'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
                                ]"
                            >
                                {{ page }}
                            </button>
                        </div>

                        <!-- Siguiente -->
                        <button
                            @click="$emit('change-page', pagination.current_page + 1)"
                            :disabled="pagination.current_page === pagination.last_page"
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span class="hidden sm:inline">Siguiente</span>
                            <ChevronRight :size="18" class="ml-1" />
                        </button>

                        <!-- Última página -->
                        <button
                            v-if="pagination.current_page < pagination.last_page - 1"
                            @click="$emit('change-page', pagination.last_page)"
                            class="px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <ChevronsRight :size="18" />
                        </button>
                    </div>

                    <!-- Ir a página específica (solo desktop) -->
                    <div class="items-center hidden gap-2 lg:flex">
                        <span class="text-sm text-gray-600">Ir a página:</span>
                        <input
                            type="number"
                            :min="1"
                            :max="pagination.last_page"
                            v-model.number="goToPage"
                            @keyup.enter="handleGoToPage"
                            class="w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            @click="handleGoToPage"
                            class="px-3 py-1 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
                        >
                            Ir
                        </button>
                    </div>
                </nav>
            </div>

            <!-- Volver arriba (solo móvil) -->
            <div v-if="!loading && properties.length > 0" class="mt-8 text-center md:hidden">
                <button
                    @click="scrollToTop"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
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

const emit = defineEmits(['open-modal', 'reset-filters', 'change-page', 'sort-change', 'retry']);

const viewMode = ref('grid'); // 'grid' o 'list'
const sortBy = ref('recent');
const goToPage = ref(1);

// Calcular páginas visibles para la paginación
const visiblePages = computed(() => {
    const pages = [];
    const current = props.pagination.current_page;
    const last = props.pagination.last_page;

    if (last <= 7) {
        // Mostrar todas las páginas si son 7 o menos
        for (let i = 1; i <= last; i++) {
            pages.push(i);
        }
    } else {
        // Mostrar con elipsis
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
    }
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>
