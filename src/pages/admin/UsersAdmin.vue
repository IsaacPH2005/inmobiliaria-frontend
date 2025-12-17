<template>
    <div class="p-4 lg:p-6">
        <!-- Header -->
        <div class="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 class="text-3xl font-bold text-neutral-900">Usuarios</h1>
                <p class="mt-1 text-neutral-500">Gestiona todos los usuarios del sistema</p>
            </div>
            <button
                @click="openCreateModal"
                class="flex items-center gap-2 px-5 py-3 font-medium text-white transition-all duration-300 rounded-lg hover:shadow-lg"
                :style="{
                    backgroundColor: siteSettings?.color_primario || '#2563eb',
                    '&:hover': {
                        backgroundColor: darkenColor(siteSettings?.color_primario || '#2563eb', 10),
                    },
                }"
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
                <UserPlus class="w-5 h-5" />
                Nuevo Usuario
            </button>
        </div>

        <!-- Estadísticas -->
        <div class="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
            <div class="p-5 bg-white border shadow-sm rounded-xl border-neutral-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-500">Total Usuarios</p>
                        <p class="mt-2 text-3xl font-bold text-neutral-900">
                            {{ statistics.total }}
                        </p>
                    </div>
                    <div
                        class="p-3 rounded-lg"
                        :style="{
                            backgroundColor: `${siteSettings?.color_primario || '#2563eb'}20`,
                        }"
                    >
                        <Users
                            class="w-8 h-8"
                            :style="{ color: siteSettings?.color_primario || '#2563eb' }"
                        />
                    </div>
                </div>
            </div>

            <div class="p-5 bg-white border shadow-sm rounded-xl border-neutral-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-500">Activos</p>
                        <p class="mt-2 text-3xl font-bold text-green-600">
                            {{ statistics.active }}
                        </p>
                    </div>
                    <div class="p-3 bg-green-100 rounded-lg">
                        <CheckCircle class="w-8 h-8 text-green-600" />
                    </div>
                </div>
            </div>

            <div class="p-5 bg-white border shadow-sm rounded-xl border-neutral-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-500">Administradores</p>
                        <p class="mt-2 text-3xl font-bold text-purple-600">
                            {{ statistics.admins }}
                        </p>
                    </div>
                    <div class="p-3 bg-purple-100 rounded-lg">
                        <Shield class="w-8 h-8 text-purple-600" />
                    </div>
                </div>
            </div>

            <div class="p-5 bg-white border shadow-sm rounded-xl border-neutral-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-neutral-500">Agentes</p>
                        <p class="mt-2 text-3xl font-bold text-orange-600">
                            {{ statistics.agents }}
                        </p>
                    </div>
                    <div class="p-3 bg-orange-100 rounded-lg">
                        <Briefcase class="w-8 h-8 text-orange-600" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Filtros y buscador -->
        <div class="p-5 mb-6 bg-white border shadow-sm rounded-xl border-neutral-200">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">Buscar</label>
                    <div class="relative">
                        <Search
                            class="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-neutral-400"
                        />
                        <input
                            v-model="filters.search"
                            @input="debouncedFetch"
                            type="text"
                            placeholder="Nombre, email..."
                            class="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:border-transparent"
                            :style="{
                                '--tw-ring-color': siteSettings?.color_primario || '#2563eb',
                            }"
                        />
                    </div>
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">Rol</label>
                    <select
                        v-model="filters.role"
                        @change="fetchUsers"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:border-transparent"
                        :style="{
                            '--tw-ring-color': siteSettings?.color_primario || '#2563eb',
                        }"
                    >
                        <option value="">Todos los roles</option>
                        <option value="admin">Administrador</option>
                        <option value="agent">Agente</option>
                        <option value="user">Usuario</option>
                    </select>
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">Estado</label>
                    <select
                        v-model="filters.status"
                        @change="fetchUsers"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:border-transparent"
                        :style="{
                            '--tw-ring-color': siteSettings?.color_primario || '#2563eb',
                        }"
                    >
                        <option value="">Todos</option>
                        <option value="1">Activos</option>
                        <option value="0">Inactivos</option>
                    </select>
                </div>

                <div class="flex items-end">
                    <button
                        @click="clearFilters"
                        class="w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        Limpiar filtros
                    </button>
                </div>
            </div>
        </div>

        <!-- Indicador de resultados -->
        <div v-if="!loading && users.length > 0" class="mb-4 text-sm text-gray-600">
            Mostrando {{ users.length }} de {{ pagination.total }} usuarios
        </div>

        <!-- Tabla -->
        <div class="overflow-hidden bg-white border shadow-sm rounded-xl border-neutral-200">
            <!-- Loading -->
            <div v-if="loading" class="p-8 text-center">
                <div
                    class="inline-block w-8 h-8 border-4 rounded-full border-t-transparent animate-spin"
                    :style="{
                        borderColor: `${
                            siteSettings?.color_primario || '#2563eb'
                        } transparent transparent transparent`,
                    }"
                ></div>
                <p class="mt-4 text-sm text-neutral-500">Cargando usuarios...</p>
            </div>

            <!-- Empty state -->
            <div v-else-if="!loading && (!users || users.length === 0)" class="py-12 text-center">
                <Users class="w-16 h-16 mx-auto mb-4 text-neutral-300" />
                <h3 class="mb-2 text-lg font-semibold text-neutral-900">No hay usuarios</h3>
                <p class="mb-4 text-neutral-500">Comienza creando el primer usuario</p>
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
                            (e.target.style.backgroundColor =
                                siteSettings?.color_primario || '#2563eb')
                    "
                >
                    <UserPlus class="w-5 h-5" />
                    Nuevo Usuario
                </button>
            </div>

            <!-- Tabla Desktop -->
            <div v-else class="hidden overflow-x-auto lg:block">
                <table class="w-full">
                    <thead class="bg-neutral-50">
                        <tr>
                            <th
                                class="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-neutral-600"
                            >
                                Usuario
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-neutral-600"
                            >
                                Contacto
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-neutral-600"
                            >
                                Rol
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-neutral-600"
                            >
                                Estado
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-neutral-600"
                            >
                                Fecha
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-semibold tracking-wider text-right uppercase text-neutral-600"
                            >
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-neutral-200">
                        <tr
                            v-for="user in users"
                            :key="user.id"
                            class="transition-colors hover:bg-neutral-50"
                        >
                            <!-- Usuario -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <div class="relative flex-shrink-0">
                                        <div
                                            v-if="user.avatar"
                                            class="w-10 h-10 overflow-hidden rounded-full"
                                        >
                                            <img
                                                :src="getAvatarUrl(user.avatar)"
                                                :alt="user.name"
                                                class="object-cover w-full h-full"
                                                @error="handleImageError"
                                            />
                                        </div>
                                        <div
                                            v-else
                                            class="flex items-center justify-center w-10 h-10 text-sm font-bold text-white rounded-full"
                                            :style="{
                                                background: `linear-gradient(135deg, ${
                                                    siteSettings?.color_primario || '#2563eb'
                                                }, ${darkenColor(
                                                    siteSettings?.color_primario || '#2563eb',
                                                    20
                                                )})`,
                                            }"
                                        >
                                            {{ getInitials(user.name) }}
                                        </div>
                                        <div
                                            class="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full"
                                            :class="user.is_active ? 'bg-green-500' : 'bg-gray-400'"
                                        ></div>
                                    </div>
                                    <div class="min-w-0">
                                        <p class="text-sm font-semibold text-neutral-900">
                                            {{ user.name }}
                                        </p>
                                        <p class="text-xs truncate text-neutral-500">
                                            ID: {{ user.id }}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <!-- Contacto -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-neutral-900">{{ user.email }}</div>
                                <div v-if="user.phone" class="text-xs text-neutral-500">
                                    {{ user.phone }}
                                </div>
                            </td>

                            <!-- Rol -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full"
                                    :class="getRoleClass(user.role)"
                                >
                                    <Shield class="w-3 h-3" />
                                    {{ getRoleLabel(user.role) }}
                                </span>
                            </td>

                            <!-- Estado -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full"
                                    :class="
                                        user.is_active
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    "
                                >
                                    <div
                                        class="w-1.5 h-1.5 rounded-full"
                                        :class="user.is_active ? 'bg-green-500' : 'bg-gray-500'"
                                    ></div>
                                    {{ user.is_active ? 'Activo' : 'Inactivo' }}
                                </span>
                            </td>

                            <!-- Fecha -->
                            <td class="px-6 py-4 text-sm whitespace-nowrap text-neutral-500">
                                {{ formatDate(user.created_at) }}
                            </td>

                            <!-- Acciones -->
                            <td class="px-6 py-4 text-right whitespace-nowrap">
                                <div class="flex items-center justify-end gap-2">
                                    <button
                                        @click="openEditModal(user)"
                                        class="p-2 transition-all rounded-lg hover:bg-opacity-10"
                                        :style="{
                                            color: siteSettings?.color_primario || '#2563eb',
                                            '&:hover': {
                                                backgroundColor: `${
                                                    siteSettings?.color_primario || '#2563eb'
                                                }10`,
                                            },
                                        }"
                                        @mouseenter="
                                            e =>
                                                (e.target.style.backgroundColor = `${
                                                    siteSettings?.color_primario || '#2563eb'
                                                }10`)
                                        "
                                        @mouseleave="
                                            e => (e.target.style.backgroundColor = 'transparent')
                                        "
                                        title="Editar"
                                    >
                                        <Edit class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="toggleUserStatus(user)"
                                        class="p-2 transition-all rounded-lg text-neutral-600 hover:bg-neutral-100"
                                        :title="user.is_active ? 'Desactivar' : 'Activar'"
                                    >
                                        <component
                                            :is="user.is_active ? Lock : Unlock"
                                            class="w-4 h-4"
                                        />
                                    </button>
                                    <button
                                        @click="confirmDelete(user)"
                                        class="p-2 text-red-600 transition-all rounded-lg hover:bg-red-50"
                                        title="Eliminar"
                                    >
                                        <Trash2 class="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Cards Mobile/Tablet -->
            <div class="divide-y lg:hidden divide-neutral-200">
                <div
                    v-for="user in users"
                    :key="user.id"
                    class="p-4 transition-colors hover:bg-neutral-50"
                >
                    <div class="flex items-start gap-4 mb-3">
                        <!-- Avatar -->
                        <div class="relative flex-shrink-0">
                            <div v-if="user.avatar" class="w-12 h-12 overflow-hidden rounded-full">
                                <img
                                    :src="getAvatarUrl(user.avatar)"
                                    :alt="user.name"
                                    class="object-cover w-full h-full"
                                    @error="handleImageError"
                                />
                            </div>
                            <div
                                v-else
                                class="flex items-center justify-center w-12 h-12 text-base font-bold text-white rounded-full"
                                :style="{
                                    background: `linear-gradient(135deg, ${
                                        siteSettings?.color_primario || '#2563eb'
                                    }, ${darkenColor(
                                        siteSettings?.color_primario || '#2563eb',
                                        20
                                    )})`,
                                }"
                            >
                                {{ getInitials(user.name) }}
                            </div>
                            <div
                                class="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full"
                                :class="user.is_active ? 'bg-green-500' : 'bg-gray-400'"
                            ></div>
                        </div>

                        <!-- Info -->
                        <div class="flex-1 min-w-0">
                            <h3 class="text-base font-semibold text-neutral-900">
                                {{ user.name }}
                            </h3>
                            <p class="text-sm truncate text-neutral-500">{{ user.email }}</p>
                            <p v-if="user.phone" class="text-xs text-neutral-400">
                                {{ user.phone }}
                            </p>
                        </div>
                    </div>

                    <!-- Badges -->
                    <div class="flex flex-wrap gap-2 mb-3">
                        <span
                            class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                            :class="getRoleClass(user.role)"
                        >
                            <Shield class="w-3 h-3" />
                            {{ getRoleLabel(user.role) }}
                        </span>
                        <span
                            class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                            :class="
                                user.is_active
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                            "
                        >
                            <div
                                class="w-1.5 h-1.5 rounded-full"
                                :class="user.is_active ? 'bg-green-500' : 'bg-gray-500'"
                            ></div>
                            {{ user.is_active ? 'Activo' : 'Inactivo' }}
                        </span>
                    </div>

                    <!-- Fecha -->
                    <p class="mb-3 text-xs text-neutral-500">
                        Creado: {{ formatDate(user.created_at) }}
                    </p>

                    <!-- Acciones -->
                    <div class="flex gap-2">
                        <button
                            @click="openEditModal(user)"
                            class="flex-1 px-3 py-2 text-sm font-medium text-white transition-all rounded-lg"
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
                            <Edit class="inline w-4 h-4 mr-1" />
                            Editar
                        </button>
                        <button
                            @click="toggleUserStatus(user)"
                            class="px-3 py-2 text-sm font-medium transition-all border rounded-lg text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                            :title="user.is_active ? 'Desactivar' : 'Activar'"
                        >
                            <component :is="user.is_active ? Lock : Unlock" class="w-4 h-4" />
                        </button>
                        <button
                            @click="confirmDelete(user)"
                            class="px-3 py-2 text-sm font-medium text-red-600 transition-all border border-red-300 rounded-lg hover:bg-red-50"
                        >
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Paginación -->
        <div v-if="pagination.last_page > 1" class="flex flex-col items-center gap-4 mt-6">
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
                            class="w-full max-w-2xl max-h-screen overflow-y-auto bg-white shadow-2xl rounded-xl"
                        >
                            <div
                                class="flex items-center justify-between p-6 border-b border-neutral-200"
                            >
                                <h2 class="text-2xl font-bold">
                                    {{ editingUser ? 'Editar' : 'Nuevo' }} Usuario
                                </h2>
                                <button
                                    @click="closeModal"
                                    class="p-2 transition-all duration-300 rounded-lg hover:bg-neutral-100"
                                >
                                    <X class="w-6 h-6" />
                                </button>
                            </div>
                            <UserForm
                                :user="editingUser"
                                @saved="onUserSaved"
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
    UserPlus,
    Users,
    Search,
    Shield,
    Briefcase,
    CheckCircle,
    Trash2,
    Lock,
    Unlock,
    Edit,
    X,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-vue-next';
import UserForm from '@/components/admin/users/UserForm.vue';
import {
    getUsers,
    deleteUser,
    toggleUserStatus as toggleStatus,
    getUserStatistics,
    showUser, // ⭐ IMPORTAR showUser
} from '@/services/UserService';
import { useSiteSettings } from '@/composables/useSiteSettings';

const toast = useToast();

// Usar el composable que comparte el estado global
const { siteSettings } = useSiteSettings();

const loading = ref(true);
const users = ref([]);
const pagination = ref({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 12,
});

const statistics = ref({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
    agents: 0,
    users: 0,
});

const filters = reactive({
    search: '',
    role: '',
    status: '',
    per_page: 12,
    page: 1,
});

const showModal = ref(false);
const editingUser = ref(null);

// Computed para páginas visibles
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
    await Promise.all([fetchUsers(), fetchStatistics()]);
});

const fetchUsers = async () => {
    loading.value = true;
    try {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.role) params.append('role', filters.role);
        if (filters.status !== '') params.append('status', filters.status);
        params.append('page', filters.page);
        params.append('per_page', filters.per_page);

        const response = await getUsers(`?${params.toString()}`);

        if (response.data.data) {
            users.value = response.data.data;
            pagination.value = {
                current_page: response.data.current_page,
                last_page: response.data.last_page,
                total: response.data.total,
                per_page: response.data.per_page,
            };
        } else {
            users.value = response.data;
        }
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        toast.error('Error al cargar usuarios');
        users.value = [];
    } finally {
        loading.value = false;
    }
};

const fetchStatistics = async () => {
    try {
        const response = await getUserStatistics();
        statistics.value = response.data;
    } catch (error) {
        console.error('Error al cargar estadísticas:', error);
    }
};

const debouncedFetch = debounce(() => {
    filters.page = 1;
    fetchUsers();
}, 500);

const changePage = page => {
    if (page >= 1 && page <= pagination.value.last_page) {
        filters.page = page;
        pagination.value.current_page = page;
        fetchUsers();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const openCreateModal = () => {
    editingUser.value = null;
    showModal.value = true;
};

// ⭐ FUNCIÓN ACTUALIZADA PARA USAR showUser
const openEditModal = async user => {
    try {
        // Mostrar loading mientras se carga
        const loadingToast = toast.info('Cargando datos del usuario...', {
            timeout: false,
        });

        // Llamar al servicio showUser
        const { data } = await showUser(user.id);

        console.log('Usuario cargado para edición:', data);

        // Asignar los datos completos del usuario
        editingUser.value = data.data || data;

        // Cerrar toast de loading
        toast.dismiss(loadingToast);

        // Abrir modal
        showModal.value = true;
    } catch (error) {
        console.error('Error al cargar usuario:', error);
        toast.error(error.response?.data?.message || 'Error al cargar los datos del usuario');
    }
};

const onUserSaved = () => {
    closeModal();
    fetchUsers();
    fetchStatistics();
    toast.success(editingUser.value ? 'Usuario actualizado' : 'Usuario creado');
};

const closeModal = () => {
    showModal.value = false;
    editingUser.value = null;
};

const toggleUserStatus = async user => {
    const action = user.is_active ? 'desactivar' : 'activar';

    if (confirm(`¿Estás seguro de ${action} a ${user.name}?`)) {
        try {
            await toggleStatus(user.id);
            toast.success(`Usuario ${action === 'activar' ? 'activado' : 'desactivado'}`);
            fetchUsers();
            fetchStatistics();
        } catch (error) {
            console.error('Error al cambiar estado:', error);
            toast.error('Error al cambiar el estado del usuario');
        }
    }
};

const confirmDelete = user => {
    if (confirm(`¿Estás seguro de eliminar a "${user.name}"? Esta acción no se puede deshacer.`)) {
        deleteUser(user.id)
            .then(() => {
                toast.success('Usuario eliminado correctamente');
                fetchUsers();
                fetchStatistics();
            })
            .catch(error => {
                console.error('Error al eliminar:', error);
                toast.error(error.response?.data?.message || 'Error al eliminar el usuario');
            });
    }
};

const clearFilters = () => {
    filters.search = '';
    filters.role = '';
    filters.status = '';
    filters.page = 1;
    fetchUsers();
};

// Utilidades
const getInitials = name => {
    if (!name) return '?';
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

const getRoleLabel = role => {
    const roles = {
        admin: 'Administrador',
        agent: 'Agente',
        user: 'Usuario',
    };
    return roles[role] || role;
};

const getRoleClass = role => {
    const classes = {
        admin: 'bg-purple-100 text-purple-800',
        agent: 'bg-blue-100 text-blue-800',
        user: 'bg-gray-100 text-gray-800',
    };
    return classes[role] || 'bg-gray-100 text-gray-800';
};

const formatDate = date => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-BO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const getAvatarUrl = avatar => {
    if (!avatar) return '';
    if (avatar.startsWith('http')) return avatar;
    return `${import.meta.env.VITE_API_URL}/storage/${avatar}`;
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
/* Scrollbar personalizado para la tabla */
.overflow-x-auto::-webkit-scrollbar {
    height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* Focus ring personalizado con color primario */
input:focus,
select:focus {
    ring-color: v-bind('siteSettings?.color_primario || "#2563eb"');
}
</style>
