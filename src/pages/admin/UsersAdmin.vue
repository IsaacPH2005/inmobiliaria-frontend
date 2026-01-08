<template>
    <div class="p-4 sm:p-6">
        <!-- Header - Mobile First -->
        <div
            class="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between sm:mb-8"
        >
            <div>
                <h1 class="text-2xl font-bold sm:text-3xl text-neutral-900">Usuarios</h1>
                <p class="mt-1 text-sm sm:text-base text-neutral-500">
                    Gestiona todos los usuarios del sistema
                </p>
            </div>
            <button
                @click="openCreateModal"
                class="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 font-medium text-white transition-all duration-300 rounded-lg shadow-md hover:shadow-lg active:scale-95"
                :style="{
                    backgroundColor: siteSettings?.color_primario || '#2563eb',
                }"
                @mouseenter="e => (e.target.style.opacity = '0.9')"
                @mouseleave="e => (e.target.style.opacity = '1')"
            >
                <UserPlus class="w-5 h-5" />
                <span class="text-sm sm:text-base">Nuevo Usuario</span>
            </button>
        </div>

        <!-- Estadísticas - Mobile First Grid -->
        <div class="grid grid-cols-2 gap-3 mb-6 sm:gap-4 lg:grid-cols-4">
            <!-- Total -->
            <div
                class="p-4 transition-shadow bg-white border shadow-sm sm:p-5 rounded-xl border-neutral-200 hover:shadow-md"
            >
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-xs font-medium sm:text-sm text-neutral-500">
                            Total Usuarios
                        </p>
                        <p class="mt-1 text-2xl font-bold sm:mt-2 sm:text-3xl text-neutral-900">
                            {{ statistics.total }}
                        </p>
                    </div>
                    <div
                        class="flex items-center justify-center w-10 h-10 rounded-lg sm:w-12 sm:h-12"
                        :style="{
                            backgroundColor: `${siteSettings?.color_primario || '#2563eb'}20`,
                        }"
                    >
                        <Users
                            class="w-5 h-5 sm:w-6 sm:h-6"
                            :style="{ color: siteSettings?.color_primario || '#2563eb' }"
                        />
                    </div>
                </div>
            </div>

            <!-- Activos -->
            <div
                class="p-4 transition-shadow bg-white border shadow-sm sm:p-5 rounded-xl border-neutral-200 hover:shadow-md"
            >
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-xs font-medium sm:text-sm text-neutral-500">Activos</p>
                        <p class="mt-1 text-2xl font-bold text-green-600 sm:mt-2 sm:text-3xl">
                            {{ statistics.active }}
                        </p>
                    </div>
                    <div
                        class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg sm:w-12 sm:h-12"
                    >
                        <CheckCircle class="w-5 h-5 text-green-600 sm:w-6 sm:h-6" />
                    </div>
                </div>
            </div>

            <!-- Inactivos -->
            <div
                class="p-4 transition-shadow bg-white border shadow-sm sm:p-5 rounded-xl border-neutral-200 hover:shadow-md"
            >
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-xs font-medium sm:text-sm text-neutral-500">Inactivos</p>
                        <p class="mt-1 text-2xl font-bold text-red-600 sm:mt-2 sm:text-3xl">
                            {{ statistics.inactive }}
                        </p>
                    </div>
                    <div
                        class="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg sm:w-12 sm:h-12"
                    >
                        <Lock class="w-5 h-5 text-red-600 sm:w-6 sm:h-6" />
                    </div>
                </div>
            </div>

            <!-- Agentes -->
            <div
                class="col-span-2 p-4 transition-shadow bg-white border shadow-sm sm:p-5 rounded-xl border-neutral-200 hover:shadow-md lg:col-span-1"
            >
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-xs font-medium sm:text-sm text-neutral-500">Agentes</p>
                        <p class="mt-1 text-2xl font-bold text-orange-600 sm:mt-2 sm:text-3xl">
                            {{ statistics.agents }}
                        </p>
                    </div>
                    <div
                        class="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg sm:w-12 sm:h-12"
                    >
                        <Briefcase class="w-5 h-5 text-orange-600 sm:w-6 sm:h-6" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Filtros - Mobile First -->
        <div class="p-4 mb-6 bg-white border shadow-sm sm:p-5 rounded-xl border-neutral-200">
            <div class="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <!-- Buscador -->
                <div class="sm:col-span-2 lg:col-span-1">
                    <label class="block mb-1.5 text-sm font-medium text-neutral-700">Buscar</label>
                    <div class="relative">
                        <Search
                            class="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-neutral-400"
                        />
                        <input
                            v-model="filters.search"
                            @input="debouncedFetch"
                            type="text"
                            placeholder="Nombre, email..."
                            class="w-full py-2 pl-10 pr-4 text-sm border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:border-transparent"
                            :style="{
                                '--tw-ring-color': siteSettings?.color_primario || '#2563eb',
                            }"
                        />
                    </div>
                </div>

                <!-- Rol -->
                <div>
                    <label class="block mb-1.5 text-sm font-medium text-neutral-700">Rol</label>
                    <select
                        v-model="filters.role"
                        @change="fetchUsers"
                        class="w-full px-3 py-2 text-sm border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:border-transparent"
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

                <!-- Estado -->
                <div>
                    <label class="block mb-1.5 text-sm font-medium text-neutral-700">Estado</label>
                    <select
                        v-model="filters.status"
                        @change="fetchUsers"
                        class="w-full px-3 py-2 text-sm border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:border-transparent"
                        :style="{
                            '--tw-ring-color': siteSettings?.color_primario || '#2563eb',
                        }"
                    >
                        <option value="">Todos</option>
                        <option value="1">Activos</option>
                        <option value="0">Inactivos</option>
                    </select>
                </div>

                <!-- Limpiar -->
                <div class="flex items-end sm:col-span-2 lg:col-span-1">
                    <button
                        @click="clearFilters"
                        class="w-full px-4 py-2 text-sm font-medium transition-colors rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200 active:scale-95"
                    >
                        Limpiar filtros
                    </button>
                </div>
            </div>
        </div>

        <!-- Contador de resultados -->
        <div v-if="!loading && users.length > 0" class="mb-3 text-xs sm:text-sm text-neutral-600">
            Mostrando <span class="font-semibold">{{ users.length }}</span> de
            <span class="font-semibold">{{ pagination.total }}</span> usuarios
        </div>

        <!-- Contenedor de tabla/cards -->
        <div class="overflow-hidden bg-white border shadow-sm rounded-xl border-neutral-200">
            <!-- Loading State -->
            <div v-if="loading" class="flex flex-col items-center justify-center p-12 sm:p-16">
                <div
                    class="w-12 h-12 border-4 rounded-full border-t-transparent animate-spin"
                    :style="{
                        borderColor: `${
                            siteSettings?.color_primario || '#2563eb'
                        } transparent transparent transparent`,
                    }"
                ></div>
                <p class="mt-4 text-sm text-neutral-500">Cargando usuarios...</p>
            </div>

            <!-- Empty State -->
            <div
                v-else-if="!loading && (!users || users.length === 0)"
                class="py-12 text-center sm:py-16"
            >
                <Users class="w-16 h-16 mx-auto mb-4 text-neutral-300 sm:w-20 sm:h-20" />
                <h3 class="mb-2 text-base font-semibold sm:text-lg text-neutral-900">
                    No hay usuarios
                </h3>
                <p class="mb-6 text-sm text-neutral-500 sm:text-base">
                    Comienza creando el primer usuario
                </p>
                <button
                    @click="openCreateModal"
                    class="inline-flex items-center gap-2 px-5 py-2.5 font-medium text-white transition-all duration-300 rounded-lg shadow-md hover:shadow-lg active:scale-95"
                    :style="{ backgroundColor: siteSettings?.color_primario || '#2563eb' }"
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
                                            v-if="user.avatar && getAvatarUrl(user.avatar)"
                                            class="w-10 h-10 overflow-hidden rounded-full ring-2 ring-neutral-100"
                                        >
                                            <img
                                                :src="getAvatarUrl(user.avatar)"
                                                :alt="user.general_data?.nombre || 'Avatar'"
                                                class="object-cover w-full h-full"
                                                @error="handleImageError"
                                            />
                                        </div>
                                        <div
                                            v-else
                                            class="flex items-center justify-center w-10 h-10 text-sm font-bold text-white rounded-full ring-2 ring-neutral-100"
                                            :style="{
                                                background: `linear-gradient(135deg, ${
                                                    siteSettings?.color_primario || '#2563eb'
                                                }, ${darkenColor(
                                                    siteSettings?.color_primario || '#2563eb',
                                                    20
                                                )})`,
                                            }"
                                        >
                                            {{ getInitials(user.general_data?.nombre) }}
                                        </div>
                                        <div
                                            class="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full"
                                            :class="user.estado ? 'bg-green-500' : 'bg-gray-400'"
                                        ></div>
                                    </div>
                                    <div class="min-w-0">
                                        <p class="text-sm font-semibold text-neutral-900">
                                            {{ user.general_data?.nombre }}
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
                                <div
                                    v-if="user.general_data?.celular"
                                    class="text-xs text-neutral-500"
                                >
                                    {{ user.general_data.celular }}
                                </div>
                            </td>

                            <!-- Rol -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    v-if="user.roles && user.roles.length > 0"
                                    class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full"
                                    :class="getRoleBadgeClass(user.roles[0].name)"
                                >
                                    <Shield class="w-3 h-3" />
                                    {{ formatRoleName(user.roles[0].name) }}
                                </span>
                                <span
                                    v-else
                                    class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                                >
                                    <Shield class="w-3 h-3" />
                                    Usuario
                                </span>
                            </td>

                            <!-- Estado -->
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full"
                                    :class="
                                        user.estado
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    "
                                >
                                    <div
                                        class="w-1.5 h-1.5 rounded-full"
                                        :class="user.estado ? 'bg-green-500' : 'bg-gray-500'"
                                    ></div>
                                    {{ user.estado ? 'Activo' : 'Inactivo' }}
                                </span>
                            </td>

                            <!-- Fecha -->
                            <td class="px-6 py-4 text-sm whitespace-nowrap text-neutral-500">
                                {{ formatDate(user.created_at) }}
                            </td>

                            <!-- Acciones -->
                            <td class="px-6 py-4 text-right whitespace-nowrap">
                                <div class="flex items-center justify-end gap-1">
                                    <button
                                        @click="openEditModal(user)"
                                        class="p-2 transition-all rounded-lg hover:bg-blue-50 active:scale-95"
                                        :style="{
                                            color: siteSettings?.color_primario || '#2563eb',
                                        }"
                                        title="Editar"
                                    >
                                        <Edit class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="toggleUserStatus(user)"
                                        class="p-2 transition-all rounded-lg text-neutral-600 hover:bg-neutral-100 active:scale-95"
                                        :title="user.estado ? 'Desactivar' : 'Activar'"
                                    >
                                        <component
                                            :is="user.estado ? Lock : Unlock"
                                            class="w-4 h-4"
                                        />
                                    </button>
                                    <button
                                        @click="confirmDelete(user)"
                                        class="p-2 text-red-600 transition-all rounded-lg hover:bg-red-50 active:scale-95"
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
                    class="p-4 transition-colors hover:bg-neutral-50 active:bg-neutral-100"
                >
                    <div class="flex items-start gap-3 mb-3">
                        <!-- Avatar -->
                        <div class="relative flex-shrink-0">
                            <div
                                v-if="user.avatar && getAvatarUrl(user.avatar)"
                                class="w-12 h-12 overflow-hidden rounded-full ring-2 ring-neutral-100"
                            >
                                <img
                                    :src="getAvatarUrl(user.avatar)"
                                    :alt="user.general_data?.nombre"
                                    class="object-cover w-full h-full"
                                    @error="handleImageError"
                                />
                            </div>
                            <div
                                v-else
                                class="flex items-center justify-center w-12 h-12 text-base font-bold text-white rounded-full ring-2 ring-neutral-100"
                                :style="{
                                    background: `linear-gradient(135deg, ${
                                        siteSettings?.color_primario || '#2563eb'
                                    }, ${darkenColor(
                                        siteSettings?.color_primario || '#2563eb',
                                        20
                                    )})`,
                                }"
                            >
                                {{ getInitials(user.general_data?.nombre) }}
                            </div>
                            <div
                                class="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full"
                                :class="user.estado ? 'bg-green-500' : 'bg-gray-400'"
                            ></div>
                        </div>

                        <!-- Info -->
                        <div class="flex-1 min-w-0">
                            <h3 class="text-sm font-semibold sm:text-base text-neutral-900">
                                {{ user.general_data?.nombre }}
                            </h3>
                            <p class="text-xs truncate sm:text-sm text-neutral-500">
                                {{ user.email }}
                            </p>
                            <p v-if="user.general_data?.celular" class="text-xs text-neutral-400">
                                {{ user.general_data.celular }}
                            </p>
                        </div>
                    </div>

                    <!-- Badges -->
                    <div class="flex flex-wrap gap-2 mb-3">
                        <span
                            v-if="user.roles && user.roles.length > 0"
                            class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                            :class="getRoleBadgeClass(user.roles[0].name)"
                        >
                            <Shield class="w-3 h-3" />
                            {{ formatRoleName(user.roles[0].name) }}
                        </span>
                        <span
                            v-else
                            class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full"
                        >
                            <Shield class="w-3 h-3" />
                            Usuario
                        </span>
                        <span
                            class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
                            :class="
                                user.estado
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                            "
                        >
                            <div
                                class="w-1.5 h-1.5 rounded-full"
                                :class="user.estado ? 'bg-green-500' : 'bg-gray-500'"
                            ></div>
                            {{ user.estado ? 'Activo' : 'Inactivo' }}
                        </span>
                    </div>

                    <!-- Fecha -->
                    <p class="mb-3 text-xs text-neutral-500">
                        Creado: {{ formatDate(user.created_at) }}
                    </p>

                    <!-- Acciones Mobile -->
                    <div class="grid grid-cols-3 gap-2">
                        <button
                            @click="openEditModal(user)"
                            class="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white transition-all rounded-lg shadow-sm active:scale-95"
                            :style="{ backgroundColor: siteSettings?.color_primario || '#2563eb' }"
                        >
                            <Edit class="w-4 h-4" />
                            <span class="hidden sm:inline">Editar</span>
                        </button>
                        <button
                            @click="toggleUserStatus(user)"
                            class="flex items-center justify-center px-3 py-2 text-xs font-medium transition-all border rounded-lg text-neutral-700 border-neutral-300 hover:bg-neutral-100 active:scale-95"
                            :title="user.estado ? 'Desactivar' : 'Activar'"
                        >
                            <component :is="user.estado ? Lock : Unlock" class="w-4 h-4" />
                        </button>
                        <button
                            @click="confirmDelete(user)"
                            class="flex items-center justify-center px-3 py-2 text-xs font-medium text-red-600 transition-all border border-red-300 rounded-lg hover:bg-red-50 active:scale-95"
                        >
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Paginación Mobile-First -->
        <div v-if="pagination.last_page > 1" class="flex flex-col items-center gap-4 mt-6">
            <div class="text-xs sm:text-sm text-neutral-600">
                Página {{ pagination.current_page }} de {{ pagination.last_page }}
            </div>

            <!-- Mobile Pagination -->
            <div class="flex items-center justify-center gap-2 lg:hidden">
                <button
                    @click="changePage(pagination.current_page - 1)"
                    :disabled="pagination.current_page === 1"
                    class="px-3 py-2 text-sm font-medium transition-all bg-white border rounded-lg border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                    Anterior
                </button>

                <span class="px-3 py-2 text-sm font-semibold text-neutral-900">
                    {{ pagination.current_page }}
                </span>

                <button
                    @click="changePage(pagination.current_page + 1)"
                    :disabled="pagination.current_page === pagination.last_page"
                    class="px-3 py-2 text-sm font-medium transition-all bg-white border rounded-lg border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                    Siguiente
                </button>
            </div>

            <!-- Desktop Pagination -->
            <div class="items-center hidden gap-2 lg:flex">
                <button
                    @click="changePage(1)"
                    :disabled="pagination.current_page === 1"
                    class="p-2 transition-all bg-white border rounded-lg border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    title="Primera página"
                >
                    <ChevronsLeft class="w-5 h-5" />
                </button>

                <button
                    @click="changePage(pagination.current_page - 1)"
                    :disabled="pagination.current_page === 1"
                    class="px-4 py-2 font-medium transition-all bg-white border rounded-lg border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                    Anterior
                </button>

                <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="changePage(page)"
                    :class="[
                        'px-4 py-2 rounded-lg font-medium transition-all active:scale-95',
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
                    class="px-4 py-2 font-medium transition-all bg-white border rounded-lg border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                    Siguiente
                </button>

                <button
                    @click="changePage(pagination.last_page)"
                    :disabled="pagination.current_page === pagination.last_page"
                    class="p-2 transition-all bg-white border rounded-lg border-neutral-300 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
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
                    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    @click="handleBackdropClick"
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
                            class="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl rounded-xl"
                        >
                            <div
                                class="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b sm:p-6 border-neutral-200"
                            >
                                <h2 class="text-xl font-bold sm:text-2xl text-neutral-900">
                                    {{ editingUser ? 'Editar' : 'Nuevo' }} Usuario
                                </h2>
                                <button
                                    @click="handleCloseModal"
                                    class="p-2 transition-all rounded-lg hover:bg-neutral-100 active:scale-95"
                                    title="Cerrar modal"
                                >
                                    <X class="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            </div>
                            <UserForm
                                :user="editingUser"
                                @saved="onUserSaved"
                                @cancel="handleCloseModal"
                            />
                        </div>
                    </Transition>
                </div>
            </Transition>
        </Teleport>

        <!-- Modal de confirmación para cerrar el formulario -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition-opacity duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="showConfirmClose"
                    class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60"
                    @click="showConfirmClose = false"
                >
                    <Transition
                        enter-active-class="transition-all duration-200"
                        enter-from-class="scale-90 opacity-0"
                        enter-to-class="scale-100 opacity-100"
                        leave-active-class="transition-all duration-200"
                        leave-from-class="scale-100 opacity-100"
                        leave-to-class="scale-90 opacity-0"
                    >
                        <div
                            v-if="showConfirmClose"
                            @click.stop
                            class="w-full max-w-md p-6 bg-white shadow-2xl rounded-xl"
                        >
                            <div class="flex items-center gap-3 mb-4">
                                <div
                                    class="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-red-100 rounded-full"
                                >
                                    <svg
                                        class="w-6 h-6 text-red-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-lg font-bold text-neutral-900">
                                        ¿Cerrar sin guardar?
                                    </h3>
                                    <p class="text-sm text-neutral-500">
                                        Los cambios no guardados se perderán
                                    </p>
                                </div>
                            </div>

                            <div class="flex gap-3 mt-6">
                                <button
                                    @click="showConfirmClose = false"
                                    class="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Continuar editando
                                </button>
                                <button
                                    @click="confirmCloseModal"
                                    class="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Cerrar sin guardar
                                </button>
                            </div>
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
    showUser,
} from '@/services/UserService';
import { useSiteSettings } from '@/composables/useSiteSettings';

const toast = useToast();
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
const showConfirmClose = ref(false);
const editingUser = ref(null);

// Páginas visibles
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

// Usuarios
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

// Estadísticas
const fetchStatistics = async () => {
    try {
        const response = await getUserStatistics();
        const payload = response.data?.data || response.data || {};

        statistics.value.total = payload.total || 0;
        statistics.value.active = payload.active || 0;
        statistics.value.inactive = payload.inactive || 0;

        const adminsRole = Array.isArray(payload.total_by_role)
            ? payload.total_by_role.find(r => r.name === 'admin')
            : null;
        statistics.value.admins = adminsRole?.total || 0;

        const agentsRole = Array.isArray(payload.total_by_role)
            ? payload.total_by_role.find(r => r.name === 'agente')
            : null;
        statistics.value.agents = agentsRole?.total || 0;
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

const openEditModal = async user => {
    try {
        const loadingToast = toast.info('Cargando datos del usuario...', {
            timeout: false,
        });

        const { data } = await showUser(user.id);
        editingUser.value = data.data || data;
        toast.dismiss(loadingToast);
        showModal.value = true;
    } catch (error) {
        console.error('Error al cargar usuario:', error);
        toast.error(error.response?.data?.message || 'Error al cargar los datos del usuario');
    }
};

// Manejo del clic en el backdrop
const handleBackdropClick = () => {
    showConfirmClose.value = true;
};

// Manejo del cierre con el botón X
const handleCloseModal = () => {
    showConfirmClose.value = true;
};

// Confirmar cierre del modal
const confirmCloseModal = () => {
    showConfirmClose.value = false;
    closeModal();
};

const onUserSaved = () => {
    closeModal();
    fetchUsers();
    fetchStatistics();
};

const closeModal = () => {
    showModal.value = false;
    editingUser.value = null;
};

const toggleUserStatus = async user => {
    const action = user.estado ? 'desactivar' : 'activar';

    if (confirm(`¿Estás seguro de ${action} a ${user.general_data?.nombre}?`)) {
        try {
            await toggleStatus(user.id);
            toast.success(`Usuario ${action === 'activar' ? 'activado' : 'desactivado'}`, {
                position: 'top-right',
                timeout: 3000,
            });
            fetchUsers();
            fetchStatistics();
        } catch (error) {
            console.error('Error al cambiar estado:', error);
            toast.error('Error al cambiar el estado del usuario');
        }
    }
};

const confirmDelete = user => {
    if (
        confirm(
            `¿Estás seguro de eliminar a "${user.general_data?.nombre}"? Esta acción no se puede deshacer.`
        )
    ) {
        deleteUser(user.id)
            .then(() => {
                toast.success('Usuario eliminado correctamente', {
                    position: 'top-right',
                    timeout: 3000,
                });
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

// Utils
const getInitials = name => {
    if (!name || typeof name !== 'string') return '?';
    return name
        .split(' ')
        .filter(n => n.trim())
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

const formatDate = date => {
    if (!date) return '';
    try {
        return new Date(date).toLocaleDateString('es-BO', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch (error) {
        console.error('Error al formatear fecha:', error);
        return '';
    }
};

// Avatar URL
const getAvatarUrl = avatar => {
    if (!avatar) return '';

    if (typeof avatar === 'object' && avatar !== null) {
        if (avatar.image_url) {
            return getAvatarUrl(avatar.image_url);
        }
        return '';
    }

    if (typeof avatar !== 'string') return '';

    if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
        return avatar;
    }

    const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    if (avatar.startsWith('/storage/')) {
        return `${baseUrl}${avatar}`;
    }

    if (avatar.startsWith('storage/')) {
        return `${baseUrl}/${avatar}`;
    }

    return `${baseUrl}/storage/${avatar}`;
};

const handleImageError = event => {
    if (!event.target) return;

    event.target.style.display = 'none';

    const parent = event.target.parentElement;
    if (parent && !parent.querySelector('.fallback-avatar')) {
        const userName = event.target.alt || '?';
        const initials = getInitials(userName);

        const fallbackDiv = document.createElement('div');
        fallbackDiv.className =
            'fallback-avatar flex items-center justify-center w-full h-full text-sm font-bold text-white rounded-full';
        fallbackDiv.style.background = `linear-gradient(135deg, ${
            siteSettings.value?.color_primario || '#2563eb'
        }, ${darkenColor(siteSettings.value?.color_primario || '#2563eb', 20)})`;
        fallbackDiv.textContent = initials;

        parent.appendChild(fallbackDiv);
    }
};

const formatRoleName = role => {
    if (!role) return 'Usuario';

    const formatted = role.charAt(0).toUpperCase() + role.slice(1);

    const roleTranslations = {
        Admin: 'Administrador',
        Agent: 'Agente',
        User: 'Usuario',
    };

    return roleTranslations[formatted] || formatted;
};

const getRoleBadgeClass = role => {
    if (!role) return 'bg-gray-100 text-gray-800';

    const roleLower = role.toLowerCase();

    if (roleLower === 'admin') {
        return 'bg-purple-100 text-purple-800';
    } else if (roleLower === 'agent') {
        return 'bg-orange-100 text-orange-800';
    } else {
        return 'bg-gray-100 text-gray-800';
    }
};

const darkenColor = (color, percent) => {
    if (!color || typeof color !== 'string') return '#1e40af';

    const hex = color.replace('#', '');

    if (!/^[0-9A-F]{6}$/i.test(hex)) return '#1e40af';

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
/* Touch optimization */
* {
    -webkit-tap-highlight-color: transparent;
}

/* Custom scrollbar */
.overflow-x-auto::-webkit-scrollbar {
    height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}

/* Modal scrollbar */
.max-h-\[90vh\]::-webkit-scrollbar {
    width: 6px;
}

.max-h-\[90vh\]::-webkit-scrollbar-track {
    background: transparent;
}

.max-h-\[90vh\]::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
}

.max-h-\[90vh\]::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}
</style>
