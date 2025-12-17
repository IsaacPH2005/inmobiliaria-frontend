<template>
    <div class="p-4 lg:p-6">
        <!-- Header -->
        <div class="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 class="text-3xl font-bold text-neutral-900">Propiedades</h1>
                <p class="mt-1 text-neutral-500">
                    Gestiona todas las propiedades de la inmobiliaria
                </p>
            </div>
            <button
                @click="openCreateModal"
                class="flex items-center gap-2 px-5 py-3 font-medium text-white transition-all duration-300 rounded-lg hover:shadow-lg"
                :style="{ backgroundColor: siteSettings?.color_primario || '#2563eb' }"
                @mouseenter="
                    e =>
                        (e.target.style.backgroundColor = darkenColor(
                            siteSettings?.color_primario || '#2563eb',
                            10
                        ))
                "
                @mouseleave="
                    e =>
                        (e.target.style.backgroundColor = siteSettings?.color_primario || '#2563eb')
                "
            >
                <Plus class="w-5 h-5" />
                Nueva Propiedad
            </button>
        </div>

        <!-- Filtros y buscador -->
        <div class="p-5 mb-6 bg-white border shadow-sm rounded-xl border-neutral-200">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">Buscar</label>
                    <div class="relative">
                        <Search
                            class="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-neutral-400"
                        />
                        <input
                            v-model="filters.buscar"
                            @input="debouncedFetch"
                            type="text"
                            placeholder="Código, dirección, zona..."
                            class="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:border-transparent"
                            :style="{
                                '--tw-ring-color': siteSettings?.color_primario || '#2563eb',
                            }"
                        />
                    </div>
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">Tipo</label>
                    <select
                        v-model="filters.tipo_inmueble"
                        @change="fetchProperties"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:border-transparent"
                        :style="{ '--tw-ring-color': siteSettings?.color_primario || '#2563eb' }"
                    >
                        <option value="">Todos los tipos</option>
                        <option v-for="type in propertyTypes" :key="type.id" :value="type.id">
                            {{ type.nombre }}
                        </option>
                    </select>
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">Operación</label>
                    <select
                        v-model="filters.tipo_operacion"
                        @change="fetchProperties"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:border-transparent"
                        :style="{ '--tw-ring-color': siteSettings?.color_primario || '#2563eb' }"
                    >
                        <option value="">Todas</option>
                        <option v-for="op in operationTypes" :key="op.id" :value="op.id">
                            {{ op.nombre }}
                        </option>
                    </select>
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">Estado</label>
                    <select
                        v-model="filters.estado"
                        @change="fetchProperties"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:border-transparent"
                        :style="{ '--tw-ring-color': siteSettings?.color_primario || '#2563eb' }"
                    >
                        <option value="">Todos</option>
                        <option v-for="status in statuses" :key="status.id" :value="status.id">
                            {{ status.nombre }}
                        </option>
                    </select>
                </div>

                <!-- Filtro Activo/Inactivo -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700"
                        >Visibilidad</label
                    >
                    <select
                        v-model="filters.activa"
                        @change="fetchProperties"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:border-transparent"
                        :style="{ '--tw-ring-color': siteSettings?.color_primario || '#2563eb' }"
                    >
                        <option value="">Todas</option>
                        <option value="1">Activas</option>
                        <option value="0">Inactivas</option>
                    </select>
                </div>
            </div>

            <!-- Botón para limpiar filtros -->
            <div class="flex justify-end mt-4">
                <button
                    @click="clearFilters"
                    class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                    Limpiar filtros
                </button>
            </div>
        </div>

        <!-- Indicador de resultados -->
        <div v-if="!loading && properties.length > 0" class="mb-4 text-sm text-gray-600">
            Mostrando {{ properties.length }} de {{ pagination.total }} propiedades
        </div>

        <!-- Loading con skeletons -->
        <div v-if="loading" class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div
                v-for="i in 6"
                :key="i"
                class="overflow-hidden bg-white border rounded-xl border-neutral-200 animate-pulse"
            >
                <div class="h-48 bg-gray-200"></div>
                <div class="p-5">
                    <div class="h-6 mb-2 bg-gray-200 rounded"></div>
                    <div class="h-4 mb-4 bg-gray-200 rounded"></div>
                    <div class="flex gap-4 mb-4">
                        <div class="w-8 h-4 bg-gray-200 rounded"></div>
                        <div class="w-8 h-4 bg-gray-200 rounded"></div>
                        <div class="w-8 h-4 bg-gray-200 rounded"></div>
                        <div class="w-12 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div class="flex gap-2">
                        <div class="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                        <div class="w-10 h-10 bg-gray-200 rounded-lg"></div>
                        <div class="w-10 h-10 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty state -->
        <div
            v-else-if="!loading && (!properties || properties.length === 0)"
            class="py-12 text-center bg-white border rounded-xl border-neutral-200"
        >
            <Home class="w-16 h-16 mx-auto mb-4 text-neutral-300" />
            <h3 class="mb-2 text-lg font-semibold text-neutral-900">No hay propiedades</h3>
            <p class="mb-4 text-neutral-500">Comienza creando tu primera propiedad</p>
            <button
                @click="openCreateModal"
                class="inline-flex items-center gap-2 px-5 py-2 font-medium text-white transition-all duration-300 rounded-lg hover:shadow-lg"
                :style="{ backgroundColor: siteSettings?.color_primario || '#2563eb' }"
                @mouseenter="
                    e =>
                        (e.target.style.backgroundColor = darkenColor(
                            siteSettings?.color_primario || '#2563eb',
                            10
                        ))
                "
                @mouseleave="
                    e =>
                        (e.target.style.backgroundColor = siteSettings?.color_primario || '#2563eb')
                "
            >
                <Plus class="w-5 h-5" />
                Nueva Propiedad
            </button>
        </div>

        <!-- Lista de propiedades -->
        <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div
                v-for="property in properties"
                :key="property.id"
                class="overflow-hidden transition-all duration-300 bg-white border shadow-sm rounded-xl border-neutral-200 hover:shadow-lg hover:-translate-y-1"
            >
                <!-- Imagen -->
                <div class="relative h-48 bg-neutral-100">
                    <img
                        v-if="property.images && property.images.length > 0"
                        :src="property.images[0].image_url"
                        :alt="`Propiedad ${property.codigo_interno}`"
                        class="object-cover w-full h-full transition-opacity duration-300"
                        @error="handleImageError"
                    />
                    <div v-else class="flex items-center justify-center w-full h-full">
                        <Home class="w-16 h-16 text-neutral-300" />
                    </div>

                    <!-- Badges -->
                    <div class="absolute flex flex-wrap gap-2 top-3 left-3">
                        <span
                            v-if="property.status?.status?.nombre"
                            class="px-3 py-1 text-xs font-bold text-white rounded-full"
                            :class="getStatusColor(property.status.status.nombre)"
                        >
                            {{ property.status.status.nombre }}
                        </span>
                        <span
                            v-if="property.seo?.destacada"
                            class="px-3 py-1 text-xs font-bold text-white bg-orange-500 rounded-full"
                        >
                            Destacada
                        </span>
                    </div>

                    <!-- Toggle Activo/Inactivo -->
                    <div class="absolute top-3 right-3">
                        <button
                            @click="handleToggleActive(property)"
                            :disabled="togglingId === property.id"
                            class="relative inline-flex items-center h-6 transition-all duration-300 rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            :class="property.seo?.activa ? 'bg-green-500' : 'bg-gray-400'"
                            :style="
                                property.seo?.activa
                                    ? { backgroundColor: siteSettings?.color_primario || '#22c55e' }
                                    : {}
                            "
                            :title="
                                property.seo?.activa
                                    ? 'Propiedad Activa - Click para desactivar'
                                    : 'Propiedad Inactiva - Click para activar'
                            "
                        >
                            <span
                                class="inline-block w-4 h-4 transition-transform duration-300 transform bg-white rounded-full shadow-lg"
                                :class="property.seo?.activa ? 'translate-x-6' : 'translate-x-1'"
                            ></span>
                            <span
                                v-if="togglingId === property.id"
                                class="absolute inset-0 flex items-center justify-center"
                            >
                                <svg
                                    class="w-4 h-4 text-white animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>

                    <!-- Código de propiedad -->
                    <div
                        class="absolute px-3 py-1 text-xs font-semibold text-white bg-black bg-opacity-50 rounded-lg bottom-3 right-3"
                    >
                        {{ property.codigo_interno || 'Sin código' }}
                    </div>
                </div>

                <!-- Contenido -->
                <div class="p-5">
                    <!-- Header con badge de estado activo -->
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                                <h3 class="text-lg font-bold truncate text-neutral-900">
                                    {{ property.type?.nombre || 'Sin tipo' }} en
                                    {{ property.location?.zona || 'Sin zona' }}
                                </h3>
                                <!-- Badge de estado -->
                                <span
                                    class="px-2 py-0.5 text-xs font-semibold rounded-full"
                                    :class="
                                        property.seo?.activa
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    "
                                >
                                    {{ property.seo?.activa ? 'Activa' : 'Inactiva' }}
                                </span>
                            </div>
                            <p class="mt-1 text-sm text-neutral-500">
                                {{ property.location?.ciudad || 'Sin ciudad' }},
                                {{ property.location?.departamento || 'Sin departamento' }}
                            </p>
                        </div>
                        <div class="ml-2 text-right">
                            <div
                                class="text-2xl font-bold"
                                :style="{ color: siteSettings?.color_primario || '#2563eb' }"
                            >
                                {{ property.price?.currency?.code || '$' }}
                                {{ formatPrice(property.price?.precio) }}
                            </div>
                            <div class="text-xs text-neutral-500">
                                {{ property.operation?.nombre || 'Sin operación' }}
                            </div>
                        </div>
                    </div>

                    <p class="mb-4 text-sm text-neutral-600 line-clamp-2">
                        {{
                            property.descripcion_corta || property.descripcion || 'Sin descripción'
                        }}
                    </p>

                    <!-- Características -->
                    <div class="grid grid-cols-2 gap-3 mb-4">
                        <div class="flex items-center gap-2 text-sm text-neutral-600">
                            <Bed
                                class="w-4 h-4"
                                :style="{ color: siteSettings?.color_primario || '#2563eb' }"
                            />
                            <span>{{ property.features?.habitaciones || 0 }} Habitaciones</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-neutral-600">
                            <Bath
                                class="w-4 h-4"
                                :style="{ color: siteSettings?.color_primario || '#2563eb' }"
                            />
                            <span>{{ property.features?.baños || 0 }} Baños</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-neutral-600">
                            <Car
                                class="w-4 h-4"
                                :style="{ color: siteSettings?.color_primario || '#2563eb' }"
                            />
                            <span
                                >{{
                                    property.features?.estacionamientos || 0
                                }}
                                Estacionamientos</span
                            >
                        </div>
                        <div class="flex items-center gap-2 text-sm text-neutral-600">
                            <Ruler
                                class="w-4 h-4"
                                :style="{ color: siteSettings?.color_primario || '#2563eb' }"
                            />
                            <span>{{ property.features?.superficie_total || 0 }} m²</span>
                        </div>
                    </div>

                    <!-- Acciones -->
                    <div class="flex gap-2">
                        <button
                            @click="openEditModal(property)"
                            class="flex-1 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg hover:shadow-md"
                            :style="{ backgroundColor: siteSettings?.color_primario || '#2563eb' }"
                            @mouseenter="
                                e =>
                                    (e.target.style.backgroundColor = darkenColor(
                                        siteSettings?.color_primario || '#2563eb',
                                        10
                                    ))
                            "
                            @mouseleave="
                                e =>
                                    (e.target.style.backgroundColor =
                                        siteSettings?.color_primario || '#2563eb')
                            "
                        >
                            Editar
                        </button>
                        <button
                            @click="duplicateProperty(property.id)"
                            class="p-2 transition-all duration-300 border rounded-lg border-neutral-300 hover:bg-neutral-50 hover:shadow-md"
                            title="Duplicar propiedad"
                        >
                            <Copy class="w-5 h-5" />
                        </button>
                        <button
                            @click="confirmDelete(property)"
                            class="p-2 text-red-600 transition-all duration-300 border border-red-300 rounded-lg hover:bg-red-50 hover:shadow-md"
                            title="Eliminar propiedad"
                        >
                            <Trash2 class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Paginación -->
        <div v-if="pagination.last_page > 1" class="flex flex-col items-center gap-4 mt-8">
            <div class="text-sm text-gray-600">
                Página {{ pagination.current_page }} de {{ pagination.last_page }}
            </div>
            <div class="flex items-center gap-2">
                <button
                    @click="changePage(1)"
                    :disabled="pagination.current_page === 1"
                    class="px-3 py-2 font-medium transition-all duration-300 bg-white border rounded-lg border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Primera página"
                >
                    <ChevronsLeft class="w-5 h-5" />
                </button>

                <button
                    @click="changePage(pagination.current_page - 1)"
                    :disabled="pagination.current_page === 1"
                    class="px-4 py-2 font-medium transition-all duration-300 bg-white border rounded-lg border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Anterior
                </button>

                <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="changePage(page)"
                    :class="[
                        'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                        pagination.current_page === page
                            ? 'text-white shadow-md'
                            : 'bg-white border border-neutral-300 hover:bg-neutral-50 hover:shadow-sm',
                    ]"
                    :style="
                        pagination.current_page === page
                            ? {
                                  backgroundColor: siteSettings?.color_primario || '#2563eb',
                              }
                            : {}
                    "
                >
                    {{ page }}
                </button>

                <button
                    @click="changePage(pagination.current_page + 1)"
                    :disabled="pagination.current_page === pagination.last_page"
                    class="px-4 py-2 font-medium transition-all duration-300 bg-white border rounded-lg border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente
                </button>

                <button
                    @click="changePage(pagination.last_page)"
                    :disabled="pagination.current_page === pagination.last_page"
                    class="px-3 py-2 font-medium transition-all duration-300 bg-white border rounded-lg border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Última página"
                >
                    <ChevronsRight class="w-5 h-5" />
                </button>
            </div>
        </div>

        <!-- Modal Crear/Editar -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition-opacity duration-300"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-300"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="showModal"
                    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                    @click="closeModal"
                >
                    <Transition
                        enter-active-class="transition-transform duration-300"
                        enter-from-class="scale-95 opacity-0"
                        enter-to-class="scale-100 opacity-100"
                        leave-active-class="transition-transform duration-300"
                        leave-from-class="scale-100 opacity-100"
                        leave-to-class="scale-95 opacity-0"
                    >
                        <div
                            v-if="showModal"
                            @click.stop
                            class="w-full max-w-4xl max-h-screen overflow-y-auto bg-white shadow-2xl rounded-xl"
                        >
                            <div
                                class="flex items-center justify-between p-6 border-b border-neutral-200"
                            >
                                <h2 class="text-2xl font-bold">
                                    {{ editingProperty ? 'Editar' : 'Nueva' }} Propiedad
                                </h2>
                                <button
                                    @click="closeModal"
                                    class="p-2 transition-all duration-300 rounded-lg hover:bg-neutral-100"
                                >
                                    <X class="w-6 h-6" />
                                </button>
                            </div>
                            <PropertyForm
                                :property="editingProperty"
                                @saved="onPropertySaved"
                                @cancel="closeModal"
                            />
                        </div>
                    </Transition>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import {
    Plus,
    Search,
    Home,
    Bed,
    Bath,
    Car,
    Ruler,
    Copy,
    Trash2,
    X,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-vue-next';
import PropertyForm from '@/components/admin/Properties/PropertyForm.vue';
import {
    getProperties,
    deleteProperty,
    getProperty,
    toggleActive,
} from '@/services/PropertiesService';
import { getTypesPropertyActives } from '@/services/TyperPropertyService';
import { getOperationTypesActives } from '@/services/OperationPropertyService';
import { getStatusesPropertyActives } from '@/services/StatusesPropertyService';
import { useSiteSettings } from '@/composables/useSiteSettings';

const toast = useToast();

// Usar el composable que comparte el estado global
const { siteSettings } = useSiteSettings();

const loading = ref(true);
const properties = ref([]);
const pagination = ref({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 12,
});

const propertyTypes = ref([]);
const operationTypes = ref([]);
const statuses = ref([]);

const filters = reactive({
    buscar: '',
    tipo_inmueble: '',
    tipo_operacion: '',
    estado: '',
    activa: '', // Nuevo filtro
    por_pagina: 12,
    pagina: 1,
});

const showModal = ref(false);
const editingProperty = ref(null);
const togglingId = ref(null); // Para controlar el loading del toggle

// Computed para páginas visibles en la paginación
const visiblePages = computed(() => {
    const pages = [];
    const currentPage = pagination.value.current_page;
    const lastPage = pagination.value.last_page;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(lastPage, currentPage + 2);

    if (currentPage <= 3) {
        end = Math.min(5, lastPage);
    }
    if (currentPage >= lastPage - 2) {
        start = Math.max(1, lastPage - 4);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
});

onMounted(async () => {
    await Promise.all([fetchProperties(), fetchReferenceData()]);
});

const fetchProperties = async () => {
    loading.value = true;
    try {
        const response = await getProperties();
        console.log('Properties response:', response);

        if (Array.isArray(response.data)) {
            properties.value = response.data;
        } else if (response.data.data) {
            properties.value = response.data.data;
            if (response.data.meta) {
                pagination.value = response.data.meta;
            }
        } else {
            properties.value = [];
        }

        console.log('Properties loaded:', properties.value.length);
    } catch (error) {
        console.error('Error al cargar propiedades:', error);
        toast.error('Error al cargar propiedades');
        properties.value = [];
    } finally {
        loading.value = false;
    }
};

const fetchReferenceData = async () => {
    try {
        const [typesRes, opsRes, statusesRes] = await Promise.all([
            getTypesPropertyActives(),
            getOperationTypesActives(),
            getStatusesPropertyActives(),
        ]);

        propertyTypes.value = typesRes.data.datos || typesRes.data || [];
        operationTypes.value = opsRes.data.datos || opsRes.data || [];
        statuses.value = statusesRes.data.datos || statusesRes.data || [];

        console.log('Reference data loaded');
    } catch (error) {
        console.error('Error al cargar datos de referencia:', error);
        toast.error('Error al cargar datos de referencia');
    }
};

// Toggle activo/inactivo
const handleToggleActive = async property => {
    togglingId.value = property.id;

    try {
        const { data } = await toggleActive(property.id);

        // Actualizar la propiedad en la lista
        const index = properties.value.findIndex(p => p.id === property.id);
        if (index !== -1) {
            properties.value[index] = data.data;
        }

        toast.success(data.message || 'Estado actualizado correctamente');
    } catch (error) {
        console.error('Error al cambiar estado:', error);
        toast.error(error.response?.data?.message || 'Error al cambiar el estado');
    } finally {
        togglingId.value = null;
    }
};

const debouncedFetch = debounce(() => {
    filters.pagina = 1;
    fetchProperties();
}, 500);

const changePage = page => {
    if (page >= 1 && page <= pagination.value.last_page) {
        filters.pagina = page;
        pagination.value.current_page = page;
        fetchProperties();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const openCreateModal = () => {
    editingProperty.value = null;
    showModal.value = true;
};

const openEditModal = async property => {
    try {
        const { data } = await getProperty(property.id);
        console.log(data);
        editingProperty.value = data;
        showModal.value = true;
    } catch (error) {
        console.log(error);
        toast.error('Error al cargar la propiedad');
    }
};

const onPropertySaved = () => {
    closeModal();
    fetchProperties();
    toast.success(editingProperty.value ? 'Propiedad actualizada' : 'Propiedad creada');
};

const closeModal = () => {
    showModal.value = false;
    editingProperty.value = null;
};

const confirmDelete = property => {
    const direccion = property.location?.direccion || property.codigo_interno || 'esta propiedad';

    if (confirm(`¿Estás seguro de eliminar "${direccion}"? Esta acción no se puede deshacer.`)) {
        deleteProperty(property.id)
            .then(() => {
                toast.success('Propiedad eliminada correctamente');
                fetchProperties();
            })
            .catch(error => {
                console.error('Error al eliminar:', error);
                toast.error('Error al eliminar la propiedad');
            });
    }
};

const duplicateProperty = async id => {
    toast.info('Función de duplicar en desarrollo');
};

const clearFilters = () => {
    filters.buscar = '';
    filters.tipo_inmueble = '';
    filters.tipo_operacion = '';
    filters.estado = '';
    filters.activa = '';
    filters.pagina = 1;
    fetchProperties();
};

// Utilidades
const formatPrice = price => {
    if (!price) return '0';
    return new Intl.NumberFormat('es-BO').format(price);
};

const getStatusColor = statusName => {
    const statusLower = statusName.toLowerCase();

    if (statusLower.includes('disponible')) return 'bg-green-500';
    if (statusLower.includes('reservada')) return 'bg-yellow-500';
    if (statusLower.includes('vendida') || statusLower.includes('alquilada')) return 'bg-red-500';
    if (statusLower.includes('inactiva')) return 'bg-gray-500';

    return 'bg-blue-500';
};

const handleImageError = event => {
    event.target.style.display = 'none';
};

// Función para oscurecer colores
const darkenColor = (color, percent) => {
    if (!color) return '#1e40af';

    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const newR = Math.max(0, Math.floor(r * (1 - percent / 100)));
    const newG = Math.max(0, Math.floor(g * (1 - percent / 100)));
    const newB = Math.max(0, Math.floor(b * (1 - percent / 100)));

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB
        .toString(16)
        .padStart(2, '0')}`;
};

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Focus ring personalizado */
input:focus,
select:focus {
    ring-color: v-bind('siteSettings?.color_primario || "#2563eb"');
}
</style>
