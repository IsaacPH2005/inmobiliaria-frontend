<template>
    <div class="min-h-screen p-4 sm:p-6 bg-neutral-50">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold sm:text-3xl text-neutral-900">Mi Perfil</h1>
            <p class="mt-1 text-sm sm:text-base text-neutral-500">
                Gestiona tu información personal y configuración
            </p>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <!-- Sidebar - Información del Usuario -->
            <div class="lg:col-span-1">
                <div
                    class="overflow-hidden bg-white border shadow-sm rounded-xl border-neutral-200"
                >
                    <!-- Banner superior con gradiente -->
                    <div
                        class="relative h-24 sm:h-32"
                        :style="{
                            background: `linear-gradient(135deg, ${
                                siteSettings?.color_primario || '#2563eb'
                            }, ${darkenColor(siteSettings?.color_primario || '#2563eb', 20)})`,
                        }"
                    >
                        <div
                            class="absolute inset-0 opacity-20 bg-gradient-to-br from-white/20"
                        ></div>
                    </div>

                    <!-- Avatar -->
                    <div class="relative px-4 pb-6 sm:px-6">
                        <div class="flex justify-center -mt-12 sm:-mt-16">
                            <div class="relative">
                                <div
                                    v-if="avatarPreview || user?.avatar"
                                    class="w-24 h-24 overflow-hidden bg-white border-4 border-white rounded-full shadow-lg sm:w-32 sm:h-32"
                                >
                                    <img
                                        :src="avatarPreview || getAvatarUrl(user?.avatar)"
                                        alt="Avatar"
                                        class="object-cover w-full h-full"
                                        @error="handleImageError"
                                    />
                                </div>
                                <div
                                    v-else
                                    class="flex items-center justify-center w-24 h-24 text-3xl font-bold text-white bg-white border-4 border-white rounded-full shadow-lg sm:w-32 sm:h-32 sm:text-4xl"
                                    :style="{
                                        background: `linear-gradient(135deg, ${
                                            siteSettings?.color_primario || '#2563eb'
                                        }, ${darkenColor(
                                            siteSettings?.color_primario || '#2563eb',
                                            20
                                        )})`,
                                    }"
                                >
                                    {{ getInitials() }}
                                </div>

                                <!-- Botón de cambiar foto -->
                                <button
                                    @click="$refs.avatarInput.click()"
                                    class="absolute bottom-0 right-0 p-2 text-white transition-all rounded-full shadow-lg active:scale-95"
                                    :style="{
                                        backgroundColor: siteSettings?.color_primario || '#2563eb',
                                    }"
                                    title="Cambiar foto"
                                >
                                    <Camera :size="16" class="sm:w-[18px] sm:h-[18px]" />
                                </button>
                                <input
                                    type="file"
                                    ref="avatarInput"
                                    @change="handleAvatar"
                                    accept="image/*"
                                    class="hidden"
                                />
                            </div>
                        </div>

                        <!-- Información básica -->
                        <div class="mt-4 text-center">
                            <h2 class="text-xl font-bold sm:text-2xl text-neutral-900">
                                {{ user?.general_data?.nombre }} {{ user?.general_data?.apellido }}
                            </h2>
                            <p class="mt-1 text-xs truncate sm:text-sm text-neutral-500">
                                {{ user?.email }}
                            </p>

                            <!-- Estado -->
                            <div class="flex items-center justify-center gap-2 mt-3">
                                <span
                                    class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full"
                                    :class="
                                        user?.estado
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    "
                                >
                                    <div
                                        class="w-2 h-2 rounded-full"
                                        :class="user?.estado ? 'bg-green-500' : 'bg-gray-500'"
                                    ></div>
                                    {{ user?.estado ? 'Activo' : 'Inactivo' }}
                                </span>
                            </div>
                        </div>

                        <!-- Estadísticas -->
                        <div class="grid grid-cols-2 gap-3 mt-6 sm:gap-4">
                            <div class="p-3 text-center rounded-lg sm:p-4 bg-neutral-50">
                                <p class="text-xl font-bold sm:text-2xl text-neutral-900">
                                    {{ user?.roles?.length || 0 }}
                                </p>
                                <p class="text-xs text-neutral-500">Roles</p>
                            </div>
                            <div class="p-3 text-center rounded-lg sm:p-4 bg-neutral-50">
                                <p class="text-xl font-bold sm:text-2xl text-neutral-900">
                                    {{ user?.permissions?.length || 0 }}
                                </p>
                                <p class="text-xs text-neutral-500">Permisos</p>
                            </div>
                        </div>

                        <!-- Información adicional -->
                        <div class="pt-4 mt-6 space-y-3 border-t border-neutral-200">
                            <div class="flex items-center gap-3 text-xs sm:text-sm">
                                <Mail :size="16" class="flex-shrink-0 text-neutral-400" />
                                <span class="truncate text-neutral-600">{{ user?.email }}</span>
                            </div>
                            <div
                                v-if="user?.general_data?.celular"
                                class="flex items-center gap-3 text-xs sm:text-sm"
                            >
                                <Phone :size="16" class="flex-shrink-0 text-neutral-400" />
                                <span class="text-neutral-600">{{
                                    user?.general_data?.celular
                                }}</span>
                            </div>
                            <div
                                v-if="user?.general_data?.ciudad"
                                class="flex items-center gap-3 text-xs sm:text-sm"
                            >
                                <MapPin :size="16" class="flex-shrink-0 text-neutral-400" />
                                <span class="text-neutral-600"
                                    >{{ user?.general_data?.ciudad }},
                                    {{ user?.general_data?.departamento }}</span
                                >
                            </div>
                            <div class="flex items-center gap-3 text-xs sm:text-sm">
                                <Calendar :size="16" class="flex-shrink-0 text-neutral-400" />
                                <span class="text-neutral-600"
                                    >Miembro desde {{ formatDate(user?.created_at) }}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contenido Principal -->
            <div class="lg:col-span-2">
                <!-- Tabs -->
                <div
                    class="mb-6 overflow-hidden bg-white border shadow-sm rounded-xl border-neutral-200"
                >
                    <div class="border-b border-neutral-200">
                        <div class="flex gap-2 p-2 overflow-x-auto">
                            <button
                                @click="activeTab = 'personal'"
                                :class="[
                                    'flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap active:scale-95',
                                    activeTab === 'personal'
                                        ? 'text-white shadow-sm'
                                        : 'text-neutral-600 hover:bg-neutral-50',
                                ]"
                                :style="
                                    activeTab === 'personal'
                                        ? {
                                              backgroundColor:
                                                  siteSettings?.color_primario || '#2563eb',
                                          }
                                        : {}
                                "
                            >
                                <User :size="16" class="sm:w-[18px] sm:h-[18px]" />
                                <span class="hidden sm:inline">Información Personal</span>
                                <span class="sm:hidden">Personal</span>
                            </button>
                            <button
                                @click="activeTab = 'contact'"
                                :class="[
                                    'flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap active:scale-95',
                                    activeTab === 'contact'
                                        ? 'text-white shadow-sm'
                                        : 'text-neutral-600 hover:bg-neutral-50',
                                ]"
                                :style="
                                    activeTab === 'contact'
                                        ? {
                                              backgroundColor:
                                                  siteSettings?.color_primario || '#2563eb',
                                          }
                                        : {}
                                "
                            >
                                <Phone :size="16" class="sm:w-[18px] sm:h-[18px]" />
                                Contacto
                            </button>
                            <button
                                @click="activeTab = 'security'"
                                :class="[
                                    'flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap active:scale-95',
                                    activeTab === 'security'
                                        ? 'text-white shadow-sm'
                                        : 'text-neutral-600 hover:bg-neutral-50',
                                ]"
                                :style="
                                    activeTab === 'security'
                                        ? {
                                              backgroundColor:
                                                  siteSettings?.color_primario || '#2563eb',
                                          }
                                        : {}
                                "
                            >
                                <Shield :size="16" class="sm:w-[18px] sm:h-[18px]" />
                                Seguridad
                            </button>
                        </div>
                    </div>

                    <!-- Loading State -->
                    <div
                        v-if="loading"
                        class="flex flex-col items-center justify-center p-12 sm:p-16"
                    >
                        <div
                            class="w-12 h-12 border-4 rounded-full border-t-transparent animate-spin"
                            :style="{
                                borderColor: `${
                                    siteSettings?.color_primario || '#2563eb'
                                } transparent transparent transparent`,
                            }"
                        ></div>
                        <p class="mt-4 text-sm text-neutral-500">Cargando datos...</p>
                    </div>

                    <!-- Tab Content -->
                    <div v-else class="p-4 sm:p-6">
                        <!-- Tab: Información Personal -->
                        <div v-if="activeTab === 'personal'">
                            <form @submit.prevent="updateProfile" class="space-y-4 sm:space-y-6">
                                <div class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                                    <!-- Nombre -->
                                    <div>
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Nombre <span class="text-red-500">*</span>
                                        </label>
                                        <input
                                            v-model="form.general_data.nombre"
                                            required
                                            class="w-full px-4 py-2 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                            :style="{
                                                '--tw-ring-color':
                                                    siteSettings?.color_primario || '#2563eb',
                                            }"
                                            placeholder="Juan"
                                        />
                                    </div>

                                    <!-- Apellido -->
                                    <div>
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Apellido <span class="text-red-500">*</span>
                                        </label>
                                        <input
                                            v-model="form.general_data.apellido"
                                            required
                                            class="w-full px-4 py-2 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                            :style="{
                                                '--tw-ring-color':
                                                    siteSettings?.color_primario || '#2563eb',
                                            }"
                                            placeholder="Pérez"
                                        />
                                    </div>

                                    <!-- Documento -->
                                    <div>
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Documento de Identidad
                                        </label>
                                        <input
                                            v-model="form.general_data.documento_identidad"
                                            class="w-full px-4 py-2 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                            :style="{
                                                '--tw-ring-color':
                                                    siteSettings?.color_primario || '#2563eb',
                                            }"
                                            placeholder="12345678"
                                        />
                                    </div>

                                    <!-- Fecha de Nacimiento -->
                                    <div>
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Fecha de Nacimiento
                                        </label>
                                        <input
                                            v-model="form.general_data.nacimiento"
                                            type="date"
                                            class="w-full px-4 py-2 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                            :style="{
                                                '--tw-ring-color':
                                                    siteSettings?.color_primario || '#2563eb',
                                            }"
                                        />
                                    </div>

                                    <!-- Género -->
                                    <div>
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Género
                                        </label>
                                        <select
                                            v-model="form.general_data.genero"
                                            class="w-full px-4 py-2 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                            :style="{
                                                '--tw-ring-color':
                                                    siteSettings?.color_primario || '#2563eb',
                                            }"
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="masculino">Masculino</option>
                                            <option value="femenino">Femenino</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>

                                    <!-- Código Postal -->
                                    <div>
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Código Postal
                                        </label>
                                        <input
                                            v-model="form.general_data.codigo_postal"
                                            class="w-full px-4 py-2 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                            :style="{
                                                '--tw-ring-color':
                                                    siteSettings?.color_primario || '#2563eb',
                                            }"
                                            placeholder="0000"
                                        />
                                    </div>
                                </div>

                                <!-- Notas -->
                                <div>
                                    <label
                                        class="block mb-1.5 text-sm font-medium text-neutral-700"
                                    >
                                        Notas
                                    </label>
                                    <textarea
                                        v-model="form.general_data.notas"
                                        rows="3"
                                        class="w-full px-4 py-2 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                        :style="{
                                            '--tw-ring-color':
                                                siteSettings?.color_primario || '#2563eb',
                                        }"
                                        placeholder="Información adicional..."
                                    ></textarea>
                                </div>

                                <!-- Botón Guardar -->
                                <div class="flex justify-end">
                                    <button
                                        type="submit"
                                        :disabled="saving"
                                        class="px-4 py-2 text-sm font-medium text-white transition-all rounded-lg shadow-md sm:px-6 sm:py-3 hover:shadow-lg disabled:opacity-50 active:scale-95"
                                        :style="{
                                            backgroundColor:
                                                siteSettings?.color_primario || '#2563eb',
                                        }"
                                    >
                                        <span v-if="saving" class="flex items-center gap-2">
                                            <svg
                                                class="w-5 h-5 animate-spin"
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
                                            Guardando...
                                        </span>
                                        <span v-else class="flex items-center gap-2">
                                            <Save :size="18" />
                                            Guardar Cambios
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- Tab: Contacto -->
                        <div v-if="activeTab === 'contact'">
                            <form @submit.prevent="updateProfile" class="space-y-4 sm:space-y-6">
                                <div class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                                    <!-- Email -->
                                    <div class="sm:col-span-2">
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Email <span class="text-red-500">*</span>
                                        </label>
                                        <div class="relative">
                                            <Mail
                                                :size="18"
                                                class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                                            />
                                            <input
                                                v-model="form.email"
                                                type="email"
                                                required
                                                class="w-full py-2 pl-10 pr-4 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                                :style="{
                                                    '--tw-ring-color':
                                                        siteSettings?.color_primario || '#2563eb',
                                                }"
                                                placeholder="usuario@ejemplo.com"
                                            />
                                        </div>
                                    </div>

                                    <!-- Celular -->
                                    <div>
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Celular
                                        </label>
                                        <div class="relative">
                                            <Phone
                                                :size="18"
                                                class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                                            />
                                            <input
                                                v-model="form.general_data.celular"
                                                type="tel"
                                                class="w-full py-2 pl-10 pr-4 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                                :style="{
                                                    '--tw-ring-color':
                                                        siteSettings?.color_primario || '#2563eb',
                                                }"
                                                placeholder="+591 70123456"
                                            />
                                        </div>
                                    </div>

                                    <!-- Dirección -->
                                    <div class="sm:col-span-2">
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Dirección
                                        </label>
                                        <div class="relative">
                                            <MapPin
                                                :size="18"
                                                class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                                            />
                                            <input
                                                v-model="form.general_data.direccion"
                                                class="w-full py-2 pl-10 pr-4 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                                :style="{
                                                    '--tw-ring-color':
                                                        siteSettings?.color_primario || '#2563eb',
                                                }"
                                                placeholder="Av. Principal #123"
                                            />
                                        </div>
                                    </div>

                                    <!-- Ciudad -->
                                    <div>
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Ciudad
                                        </label>
                                        <input
                                            v-model="form.general_data.ciudad"
                                            class="w-full px-4 py-2 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                            :style="{
                                                '--tw-ring-color':
                                                    siteSettings?.color_primario || '#2563eb',
                                            }"
                                            placeholder="La Paz"
                                        />
                                    </div>

                                    <!-- Departamento -->
                                    <div>
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Departamento
                                        </label>
                                        <input
                                            v-model="form.general_data.departamento"
                                            class="w-full px-4 py-2 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                            :style="{
                                                '--tw-ring-color':
                                                    siteSettings?.color_primario || '#2563eb',
                                            }"
                                            placeholder="La Paz"
                                        />
                                    </div>
                                </div>

                                <!-- Contacto de Emergencia -->
                                <div class="pt-4 border-t sm:pt-6 border-neutral-200">
                                    <h3
                                        class="mb-4 text-base font-semibold sm:text-lg text-neutral-900"
                                    >
                                        Contacto de Emergencia
                                    </h3>
                                    <div class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                                        <div>
                                            <label
                                                class="block mb-1.5 text-sm font-medium text-neutral-700"
                                            >
                                                Nombre
                                            </label>
                                            <input
                                                v-model="
                                                    form.general_data.contacto_emergencia_nombre
                                                "
                                                class="w-full px-4 py-2 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                                :style="{
                                                    '--tw-ring-color':
                                                        siteSettings?.color_primario || '#2563eb',
                                                }"
                                                placeholder="María Pérez"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-1.5 text-sm font-medium text-neutral-700"
                                            >
                                                Teléfono
                                            </label>
                                            <div class="relative">
                                                <Phone
                                                    :size="18"
                                                    class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                                                />
                                                <input
                                                    v-model="
                                                        form.general_data
                                                            .contacto_emergencia_telefono
                                                    "
                                                    type="tel"
                                                    class="w-full py-2 pl-10 pr-4 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                                    :style="{
                                                        '--tw-ring-color':
                                                            siteSettings?.color_primario ||
                                                            '#2563eb',
                                                    }"
                                                    placeholder="+591 71234567"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Botón Guardar -->
                                <div class="flex justify-end">
                                    <button
                                        type="submit"
                                        :disabled="saving"
                                        class="px-4 py-2 text-sm font-medium text-white transition-all rounded-lg shadow-md sm:px-6 sm:py-3 hover:shadow-lg disabled:opacity-50 active:scale-95"
                                        :style="{
                                            backgroundColor:
                                                siteSettings?.color_primario || '#2563eb',
                                        }"
                                    >
                                        <span v-if="saving" class="flex items-center gap-2">
                                            <svg
                                                class="w-5 h-5 animate-spin"
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
                                            Guardando...
                                        </span>
                                        <span v-else class="flex items-center gap-2">
                                            <Save :size="18" />
                                            Guardar Cambios
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- Tab: Seguridad -->
                        <div v-if="activeTab === 'security'">
                            <form @submit.prevent="updatePassword" class="space-y-4 sm:space-y-6">
                                <div class="p-4 border-l-4 border-blue-500 rounded-lg bg-blue-50">
                                    <div class="flex items-start gap-3">
                                        <Shield
                                            :size="20"
                                            class="flex-shrink-0 mt-0.5 text-blue-600"
                                        />
                                        <div>
                                            <p class="text-sm font-medium text-blue-900">
                                                Seguridad de tu cuenta
                                            </p>
                                            <p class="mt-1 text-xs text-blue-700">
                                                Asegúrate de usar una contraseña segura con al menos
                                                8 caracteres.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-y-4">
                                    <!-- Contraseña Actual -->
                                    <div>
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Contraseña Actual
                                        </label>
                                        <div class="relative">
                                            <Lock
                                                :size="18"
                                                class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                                            />
                                            <input
                                                v-model="passwordForm.current_password"
                                                :type="showCurrentPassword ? 'text' : 'password'"
                                                class="w-full py-2 pl-10 pr-10 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                                :style="{
                                                    '--tw-ring-color':
                                                        siteSettings?.color_primario || '#2563eb',
                                                }"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                @click="showCurrentPassword = !showCurrentPassword"
                                                class="absolute transform -translate-y-1/2 right-3 top-1/2"
                                            >
                                                <component
                                                    :is="showCurrentPassword ? EyeOff : Eye"
                                                    :size="18"
                                                    class="text-gray-400"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Nueva Contraseña -->
                                    <div>
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Nueva Contraseña
                                        </label>
                                        <div class="relative">
                                            <Lock
                                                :size="18"
                                                class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                                            />
                                            <input
                                                v-model="passwordForm.new_password"
                                                :type="showNewPassword ? 'text' : 'password'"
                                                class="w-full py-2 pl-10 pr-10 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                                :style="{
                                                    '--tw-ring-color':
                                                        siteSettings?.color_primario || '#2563eb',
                                                }"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                @click="showNewPassword = !showNewPassword"
                                                class="absolute transform -translate-y-1/2 right-3 top-1/2"
                                            >
                                                <component
                                                    :is="showNewPassword ? EyeOff : Eye"
                                                    :size="18"
                                                    class="text-gray-400"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Confirmar Nueva Contraseña -->
                                    <div>
                                        <label
                                            class="block mb-1.5 text-sm font-medium text-neutral-700"
                                        >
                                            Confirmar Nueva Contraseña
                                        </label>
                                        <div class="relative">
                                            <Lock
                                                :size="18"
                                                class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                                            />
                                            <input
                                                v-model="passwordForm.new_password_confirmation"
                                                :type="showConfirmPassword ? 'text' : 'password'"
                                                class="w-full py-2 pl-10 pr-10 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:border-transparent"
                                                :style="{
                                                    '--tw-ring-color':
                                                        siteSettings?.color_primario || '#2563eb',
                                                }"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                @click="showConfirmPassword = !showConfirmPassword"
                                                class="absolute transform -translate-y-1/2 right-3 top-1/2"
                                            >
                                                <component
                                                    :is="showConfirmPassword ? EyeOff : Eye"
                                                    :size="18"
                                                    class="text-gray-400"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Botón Actualizar Contraseña -->
                                <div class="flex justify-end">
                                    <button
                                        type="submit"
                                        :disabled="savingPassword"
                                        class="px-4 py-2 text-sm font-medium text-white transition-all rounded-lg shadow-md sm:px-6 sm:py-3 hover:shadow-lg disabled:opacity-50 active:scale-95"
                                        :style="{
                                            backgroundColor:
                                                siteSettings?.color_primario || '#2563eb',
                                        }"
                                    >
                                        <span v-if="savingPassword" class="flex items-center gap-2">
                                            <svg
                                                class="w-5 h-5 animate-spin"
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
                                            Actualizando...
                                        </span>
                                        <span v-else class="flex items-center gap-2">
                                            <Key :size="18" />
                                            Actualizar Contraseña
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Camera,
    Shield,
    Lock,
    Eye,
    EyeOff,
    Save,
    Key,
} from 'lucide-vue-next';
import { showUser, updateUser } from '@/services/UserService';
import { useSiteSettings } from '@/composables/useSiteSettings';

const toast = useToast();
const { siteSettings } = useSiteSettings();

// Estado
const loading = ref(true);
const saving = ref(false);
const savingPassword = ref(false);
const activeTab = ref('personal');
const user = ref(null);
const avatarPreview = ref(null);
const avatarFile = ref(null);
const avatarInput = ref(null);
const userId = ref(null);

// Mostrar/ocultar contraseñas
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

// Formulario principal
const form = reactive({
    email: '',
    general_data: {
        nombre: '',
        apellido: '',
        documento_identidad: '',
        celular: '',
        nacimiento: '',
        genero: '',
        direccion: '',
        ciudad: '',
        departamento: '',
        codigo_postal: '',
        contacto_emergencia_nombre: '',
        contacto_emergencia_telefono: '',
        notas: '',
    },
});

// Formulario de contraseña
const passwordForm = reactive({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
});

// GET USER ID FROM LOCALSTORAGE
const getUserIdFromLocalStorage = () => {
    try {
        const userString = localStorage.getItem('user');
        if (userString) {
            const userData = JSON.parse(userString);
            return userData.id || null;
        }
        return null;
    } catch (error) {
        console.error('Error al obtener user_id del localStorage:', error);
        return null;
    }
};

// Cargar datos del usuario
const loadUserData = async () => {
    loading.value = true;
    try {
        // Get user ID from localStorage
        const id = getUserIdFromLocalStorage();

        if (!id) {
            toast.error('No se encontró el ID del usuario. Por favor, inicia sesión nuevamente.');
            return;
        }

        userId.value = id;
        console.log('Loading user data for ID:', userId.value);

        const { data } = await showUser(userId.value);
        user.value = data.data || data;

        console.log('User data loaded:', user.value);

        // Cargar datos al formulario
        form.email = user.value.email || '';

        if (user.value.general_data) {
            Object.keys(form.general_data).forEach(key => {
                if (key === 'nacimiento' && user.value.general_data[key]) {
                    const date = new Date(user.value.general_data[key]);
                    form.general_data[key] = date.toISOString().split('T')[0];
                } else {
                    form.general_data[key] = user.value.general_data[key] || '';
                }
            });
        }
    } catch (error) {
        console.error('Error al cargar datos:', error);
        toast.error('Error al cargar los datos del usuario');
    } finally {
        loading.value = false;
    }
};

// Manejar avatar
const handleAvatar = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
        toast.error('Solo se permiten archivos de imagen');
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        toast.error('La imagen no debe superar los 2MB');
        return;
    }

    avatarFile.value = file;
    avatarPreview.value = URL.createObjectURL(file);
};

// Actualizar perfil
const updateProfile = async () => {
    saving.value = true;
    try {
        const formDataObj = new FormData();
        formDataObj.append('_method', 'PUT');
        formDataObj.append('email', form.email);

        // Avatar
        if (avatarFile.value) {
            formDataObj.append('avatar', avatarFile.value);
        }

        // Datos personales
        Object.keys(form.general_data).forEach(key => {
            if (form.general_data[key] !== null && form.general_data[key] !== '') {
                formDataObj.append(`general_data[${key}]`, form.general_data[key]);
            }
        });

        await updateUser(userId.value, formDataObj);
        toast.success('Perfil actualizado correctamente', {
            position: 'top-right',
            timeout: 3000,
        });

        await loadUserData();

        // Update localStorage
        const localUser = JSON.parse(localStorage.getItem('user'));
        localUser.nombre = form.general_data.nombre;
        localUser.apellido = form.general_data.apellido;
        localUser.email = form.email;
        if (user.value.avatar) {
            localUser.image = getAvatarUrl(user.value.avatar);
        }
        localStorage.setItem('user', JSON.stringify(localUser));

        avatarPreview.value = null;
        avatarFile.value = null;
    } catch (error) {
        console.error('Error al actualizar:', error);
        toast.error(error.response?.data?.message || 'Error al actualizar el perfil');
    } finally {
        saving.value = false;
    }
};

// Actualizar contraseña
const updatePassword = async () => {
    if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
        toast.error('Las contraseñas no coinciden');
        return;
    }

    if (passwordForm.new_password.length < 8) {
        toast.error('La contraseña debe tener al menos 8 caracteres');
        return;
    }

    savingPassword.value = true;
    try {
        const formDataObj = new FormData();
        formDataObj.append('_method', 'PUT');
        formDataObj.append('current_password', passwordForm.current_password);
        formDataObj.append('password', passwordForm.new_password);
        formDataObj.append('password_confirmation', passwordForm.new_password_confirmation);

        await updateUser(userId.value, formDataObj);
        toast.success('Contraseña actualizada correctamente', {
            position: 'top-right',
            timeout: 3000,
        });

        // Limpiar formulario
        passwordForm.current_password = '';
        passwordForm.new_password = '';
        passwordForm.new_password_confirmation = '';
    } catch (error) {
        console.error('Error al actualizar contraseña:', error);
        toast.error(error.response?.data?.message || 'Error al actualizar la contraseña');
    } finally {
        savingPassword.value = false;
    }
};

// Utilidades
const getInitials = () => {
    if (!user.value?.general_data) return '?';
    const nombre = user.value.general_data.nombre || '';
    const apellido = user.value.general_data.apellido || '';
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase() || '?';
};

const getAvatarUrl = avatar => {
    if (!avatar) return '';

    // Si es objeto, extraer la URL
    if (typeof avatar === 'object' && avatar !== null) {
        if (avatar.image_url) {
            return getAvatarUrl(avatar.image_url);
        }
        return '';
    }

    // Si no es string, retornar vacío
    if (typeof avatar !== 'string') return '';

    // Si ya es URL completa, retornar tal cual
    if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
        return avatar;
    }

    // Construir URL completa
    const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

    // Si ya tiene /storage/ al inicio
    if (avatar.startsWith('/storage/')) {
        return `${baseUrl}${avatar}`;
    }

    // Si tiene storage/ pero sin la barra inicial
    if (avatar.startsWith('storage/')) {
        return `${baseUrl}/${avatar}`;
    }

    // Agregar /storage/ si no lo tiene
    return `${baseUrl}/storage/${avatar}`;
};

const handleImageError = event => {
    console.error('Error loading image:', event.target.src);
    event.target.style.display = 'none';

    // Mostrar iniciales en su lugar
    const parent = event.target.parentElement;
    if (parent && !parent.querySelector('.fallback-avatar')) {
        const initials = getInitials();
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className =
            'fallback-avatar flex items-center justify-center w-full h-full text-4xl font-bold text-white rounded-full';
        fallbackDiv.style.background = `linear-gradient(135deg, ${
            siteSettings.value?.color_primario || '#2563eb'
        }, ${darkenColor(siteSettings.value?.color_primario || '#2563eb', 20)})`;
        fallbackDiv.textContent = initials;
        parent.appendChild(fallbackDiv);
    }
};

const formatDate = date => {
    if (!date) return '';
    try {
        return new Date(date).toLocaleDateString('es-BO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (error) {
        return '';
    }
};

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

onMounted(() => {
    loadUserData();
});
</script>

<style scoped>
/* Touch optimization */
* {
    -webkit-tap-highlight-color: transparent;
}

/* Smooth transitions */
input:focus,
select:focus,
textarea:focus {
    transition: all 0.2s ease;
}

/* Hide scrollbar for tabs on mobile */
.overflow-x-auto::-webkit-scrollbar {
    display: none;
}

.overflow-x-auto {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
