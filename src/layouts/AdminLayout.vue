<template>
    <div class="min-h-screen bg-neutral-50">
        <!-- Mobile Header -->
        <header
            class="fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-200 lg:hidden"
        >
            <div class="flex items-center px-3 h-14">
                <!-- Botón Home Mobile -->
                <button
                    @click="goToHome"
                    class="p-2 mr-2 rounded-lg hover:bg-neutral-100 active:scale-95"
                    title="Ir al sitio web"
                >
                    <Home class="w-5 h-5 text-neutral-600" />
                </button>

                <!-- Botón Menú -->
                <button
                    @click="isSidebarOpen = true"
                    class="p-2 rounded-lg hover:bg-neutral-100 active:scale-95"
                >
                    <Menu class="w-5 h-5 text-neutral-600" />
                </button>

                <!-- Logo Mobile -->
                <router-link to="/admin/dashboard" class="flex items-center justify-center flex-1">
                    <img
                        :src="siteSettings?.logo_url || defaultLogo"
                        :alt="siteSettings?.nombre_sitio || 'InmoAdmin'"
                        class="object-contain w-auto h-7"
                        @error="handleLogoError"
                    />
                </router-link>

                <!-- Perfil Mobile -->
                <div class="relative" ref="profileMobileRef">
                    <button @click="toggleProfileMenu" class="p-1 active:scale-95">
                        <img
                            :src="getUserAvatar"
                            class="object-cover w-8 h-8 rounded-full ring-2 ring-primary-500/20"
                            alt="Avatar"
                            @error="handleAvatarError"
                        />
                    </button>

                    <!-- Dropdown Móvil -->
                    <transition
                        enter-active-class="transition duration-200 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-150 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                    >
                        <div
                            v-if="isProfileMenuOpen"
                            class="absolute right-0 z-50 w-64 mt-2 bg-white border rounded-lg shadow-xl border-neutral-200"
                        >
                            <div class="p-4 border-b border-neutral-200">
                                <div class="flex items-center gap-3 mb-3">
                                    <img
                                        :src="getUserAvatar"
                                        class="object-cover w-12 h-12 rounded-full"
                                        :style="{
                                            boxShadow: `0 0 0 2px ${
                                                siteSettings?.color_primario || '#2563eb'
                                            }20`,
                                        }"
                                        alt="Avatar"
                                    />
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-semibold truncate text-neutral-900">
                                            {{ userFullName }}
                                        </p>
                                        <p class="text-xs truncate text-neutral-500">
                                            {{ userData.email }}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    class="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full"
                                >
                                    <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                                    En línea
                                </span>
                            </div>
                            <div class="py-1">
                                <router-link
                                    to="/admin/profile"
                                    class="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100"
                                    @click="isProfileMenuOpen = false"
                                >
                                    <User class="w-4 h-4" />
                                    Mi Perfil
                                </router-link>
                                <router-link
                                    to="/admin/settings"
                                    class="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100"
                                    @click="isProfileMenuOpen = false"
                                >
                                    <Settings class="w-4 h-4" />
                                    Configuración
                                </router-link>
                                <button
                                    @click="goToHome"
                                    class="flex items-center w-full gap-3 px-4 py-2.5 text-sm transition-colors text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100"
                                >
                                    <ExternalLink class="w-4 h-4" />
                                    Ver Sitio Web
                                </button>
                            </div>
                            <div class="border-t border-neutral-200">
                                <button
                                    @click="handleLogout"
                                    class="flex items-center w-full gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50 active:bg-red-100"
                                >
                                    <LogOut class="w-4 h-4" />
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </header>

        <!-- Overlay para menú de perfil móvil -->
        <div
            v-if="isProfileMenuOpen"
            @click="isProfileMenuOpen = false"
            class="fixed inset-0 z-40 bg-transparent lg:hidden"
        ></div>

        <!-- Overlay móvil sidebar -->
        <div
            v-if="isSidebarOpen"
            @click="isSidebarOpen = false"
            class="fixed inset-0 z-40 transition-opacity bg-black/50 lg:hidden"
        />

        <!-- Sidebar -->
        <aside
            :class="[
                'fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-neutral-200 transform transition-transform duration-300 lg:translate-x-0',
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            ]"
        >
            <!-- Logo Desktop -->
            <router-link
                to="/admin/dashboard"
                class="items-center hidden h-16 gap-3 px-6 transition-all border-b lg:flex border-neutral-200 hover:bg-neutral-50"
            >
                <div class="relative flex items-center justify-center w-full">
                    <img
                        :src="siteSettings?.logo_url || defaultLogo"
                        :alt="siteSettings?.nombre_sitio || 'InmoAdmin Logo'"
                        class="object-contain w-auto h-10 max-w-full"
                        @error="handleLogoError"
                    />
                </div>
            </router-link>

            <!-- Header móvil sidebar -->
            <div
                class="flex items-center justify-between px-4 border-b h-14 lg:hidden border-neutral-200"
            >
                <router-link to="/admin/dashboard" class="flex items-center gap-2">
                    <img
                        :src="siteSettings?.logo_url || defaultLogo"
                        :alt="siteSettings?.nombre_sitio || 'InmoAdmin'"
                        class="object-contain w-auto h-8"
                        @error="handleLogoError"
                    />
                </router-link>
                <button
                    @click="isSidebarOpen = false"
                    class="p-2 rounded-lg hover:bg-neutral-100 active:scale-95"
                >
                    <X class="w-6 h-6" />
                </button>
            </div>

            <!-- Navegación -->
            <nav class="p-3 space-y-1 overflow-y-auto" style="height: calc(100vh - 9.5rem)">
                <!-- Buscador -->
                <div class="mb-3">
                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Buscar en el panel..."
                            class="w-full py-2 pr-3 text-sm transition-all border rounded-lg pl-9 bg-neutral-50 border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
                            :style="{
                                '--tw-ring-color': siteSettings?.color_primario || '#2563eb',
                            }"
                        />
                        <Search
                            class="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-neutral-400"
                        />
                    </div>
                </div>

                <!-- Items del menú -->
                <router-link
                    v-for="item in filteredMenuItems"
                    :key="item.name"
                    :to="item.to"
                    custom
                    v-slot="{ isActive, navigate }"
                >
                    <button
                        @click="
                            () => {
                                navigate();
                                isSidebarOpen = false;
                            }
                        "
                        :class="[
                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                            isActive
                                ? 'shadow-sm text-white'
                                : 'text-neutral-700 hover:bg-neutral-50 active:scale-95',
                        ]"
                        :style="
                            isActive
                                ? {
                                      backgroundColor: siteSettings?.color_primario || '#2563eb',
                                  }
                                : {}
                        "
                    >
                        <component
                            :is="item.icon"
                            :class="[
                                'w-5 h-5 transition-colors flex-shrink-0',
                                isActive ? 'text-white' : 'text-neutral-500',
                            ]"
                        />
                        <span class="flex-1 text-left">{{ item.name }}</span>
                        <span
                            v-if="item.badge"
                            class="px-2 py-0.5 text-xs font-semibold rounded-full flex-shrink-0"
                            :class="
                                isActive
                                    ? 'bg-white/20 text-white'
                                    : 'bg-neutral-100 text-neutral-700'
                            "
                        >
                            {{ item.badge }}
                        </span>
                    </button>
                </router-link>

                <div class="my-3 border-t border-neutral-200"></div>

                <!-- Ver Sitio Web -->
                <button
                    @click="goToHome"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-all active:scale-95"
                >
                    <ExternalLink class="w-5 h-5 text-neutral-500" />
                    <span>Ver Sitio Web</span>
                </button>

                <!-- Configuración -->
                <router-link to="/admin/settings" custom v-slot="{ isActive, navigate }">
                    <button
                        @click="
                            () => {
                                navigate();
                                isSidebarOpen = false;
                            }
                        "
                        :class="[
                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                            isActive
                                ? 'shadow-sm text-white'
                                : 'text-neutral-700 hover:bg-neutral-50 active:scale-95',
                        ]"
                        :style="
                            isActive
                                ? {
                                      backgroundColor: siteSettings?.color_primario || '#2563eb',
                                  }
                                : {}
                        "
                    >
                        <Settings
                            :class="['w-5 h-5', isActive ? 'text-white' : 'text-neutral-500']"
                        />
                        <span>Configuración</span>
                    </button>
                </router-link>

                <!-- Cerrar Sesión -->
                <button
                    @click="handleLogout"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all active:scale-95"
                >
                    <LogOut class="w-5 h-5" />
                    <span>Cerrar Sesión</span>
                </button>
            </nav>

            <!-- Usuario sidebar -->
            <div class="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-neutral-200">
                <div class="flex items-center gap-3">
                    <div class="relative flex-shrink-0">
                        <img
                            :src="getUserAvatar"
                            class="object-cover w-10 h-10 rounded-full"
                            :style="{
                                boxShadow: `0 0 0 2px ${
                                    siteSettings?.color_primario || '#2563eb'
                                }20`,
                            }"
                            alt="Avatar"
                            @error="handleAvatarError"
                        />
                        <div
                            class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"
                        ></div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-semibold truncate text-neutral-900">
                            {{ userFullName }}
                        </p>
                        <p class="text-xs truncate text-neutral-500">{{ userData.email }}</p>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="min-h-screen pt-14 lg:pl-72 lg:pt-0">
            <!-- Top bar desktop -->
            <header
                class="items-center justify-between hidden h-16 px-6 bg-white border-b lg:flex border-neutral-200"
            >
                <div class="flex items-center gap-4">
                    <button
                        @click="goToHome"
                        class="p-2 mr-2 rounded-lg hover:bg-neutral-100 active:scale-95"
                        title="Ir al sitio web"
                    >
                        <Home class="w-5 h-5 text-neutral-600" />
                    </button>
                    <div>
                        <h2 class="text-2xl font-bold text-neutral-900">
                            {{ route.meta.title || 'Dashboard' }}
                        </h2>
                        <p class="text-sm text-neutral-500">
                            {{
                                route.meta.subtitle || `Bienvenido, ${userData.nombre || 'Usuario'}`
                            }}
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <!-- PERFIL CON MENÚ DESKTOP -->
                    <div class="relative" ref="profileRef">
                        <button
                            @click="isProfileMenuOpen = !isProfileMenuOpen"
                            class="flex items-center gap-3 p-2 pr-4 transition-all rounded-lg hover:bg-neutral-100 active:scale-95"
                        >
                            <div class="relative">
                                <img
                                    :src="getUserAvatar"
                                    class="object-cover rounded-full w-9 h-9"
                                    :style="{
                                        boxShadow: `0 0 0 2px ${
                                            siteSettings?.color_primario || '#2563eb'
                                        }20`,
                                    }"
                                    alt="Avatar"
                                    @error="handleAvatarError"
                                />
                                <div
                                    class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"
                                ></div>
                            </div>
                            <span class="text-sm font-medium text-neutral-700">{{
                                userFullName
                            }}</span>
                            <ChevronDown
                                class="w-4 h-4 transition-transform text-neutral-500"
                                :class="{ 'rotate-180': isProfileMenuOpen }"
                            />
                        </button>

                        <!-- Dropdown Desktop -->
                        <transition
                            enter-active-class="transition duration-200 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-150 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <div
                                v-if="isProfileMenuOpen"
                                class="absolute right-0 z-50 w-56 mt-2 bg-white border rounded-lg shadow-lg border-neutral-200"
                            >
                                <div class="p-4 border-b border-neutral-200">
                                    <div class="flex items-center gap-3 mb-2">
                                        <img
                                            :src="getUserAvatar"
                                            class="object-cover w-10 h-10 rounded-full"
                                            :style="{
                                                boxShadow: `0 0 0 2px ${
                                                    siteSettings?.color_primario || '#2563eb'
                                                }20`,
                                            }"
                                            alt="Avatar"
                                        />
                                        <div class="flex-1 min-w-0">
                                            <p
                                                class="text-sm font-semibold truncate text-neutral-900"
                                            >
                                                {{ userFullName }}
                                            </p>
                                            <p class="text-xs truncate text-neutral-500">
                                                {{ userData.email }}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        class="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full"
                                    >
                                        <span
                                            class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"
                                        ></span>
                                        En línea
                                    </span>
                                </div>
                                <div class="py-1">
                                    <router-link
                                        to="/admin/profile"
                                        class="flex items-center gap-3 px-4 py-2 text-sm transition-colors text-neutral-700 hover:bg-neutral-50"
                                        @click="isProfileMenuOpen = false"
                                    >
                                        <User class="w-4 h-4" />
                                        Mi Perfil
                                    </router-link>
                                    <router-link
                                        to="/admin/settings"
                                        class="flex items-center gap-3 px-4 py-2 text-sm transition-colors text-neutral-700 hover:bg-neutral-50"
                                        @click="isProfileMenuOpen = false"
                                    >
                                        <Settings class="w-4 h-4" />
                                        Configuración
                                    </router-link>
                                    <button
                                        @click="goToHome"
                                        class="flex items-center w-full gap-3 px-4 py-2 text-sm transition-colors text-neutral-700 hover:bg-neutral-50"
                                    >
                                        <ExternalLink class="w-4 h-4" />
                                        Ver Sitio Web
                                    </button>
                                </div>
                                <div class="border-t border-neutral-200">
                                    <button
                                        @click="handleLogout"
                                        class="flex items-center w-full gap-3 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                                    >
                                        <LogOut class="w-4 h-4" />
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </header>

            <!-- Contenido de la página -->
            <div class="p-3 sm:p-4 lg:p-6">
                <router-view v-slot="{ Component }">
                    <transition name="page" mode="out-in">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { onClickOutside, onKeyStroke } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

// Lucide Icons
import {
    Menu,
    X,
    Home,
    Search,
    Building2,
    Users,
    User,
    Settings,
    LogOut,
    ChevronDown,
    ExternalLink,
} from 'lucide-vue-next';

// Composables
import { useSiteSettings } from '@/composables/useSiteSettings';
import { logoutBE } from '@/services/AuthService';
import useAlert from '@/composables/useAlert';

// Vue Router & Toast
const route = useRoute();
const router = useRouter();
const toast = useToast();

// Site Settings
const { siteSettings, loadSettings } = useSiteSettings();

// Logo por defecto
const defaultLogo =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTIwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHg9IjIiIHk9IjIiIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgcng9IjgiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+PHBhdGggZD0iTTIwIDEyTDI4IDE3LjVWMjhDMjggMjguNTMwNCAyNy43ODkzIDI5LjAzOTEgMjcuNDE0MiAyOS40MTQyQzI3LjAzOTEgMjkuNzg5MyAyNi41MzA0IDMwIDI2IDMwSDE0QzEzLjQ2OTYgMzAgMTIuOTYwOSAyOS43ODkzIDEyLjU4NTggMjkuNDE0MkMxMi4yMTA3IDI5LjAzOTEgMTIgMjguNTMwNCAxMiAyOFYxNy41TDIwIDEyWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNiAzMFYyMUgyNFYzMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjx0ZXh0IHg9IjQ4IiB5PSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFFMjkzQiI+SW1tb0FkbWluPC90ZXh0Pjx0ZXh0IHg9IjQ4IiB5PSIzMiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNjQ3NDhCIj5QYW5lbCBkZSBDb250cm9sPC90ZXh0Pjxkl WZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIyIiB5MT0iMiIgeDI9IjM4IiB5Mj0iMzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjMjU2M0VCIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMUU0MEFGIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+';

// Estado UI
const isSidebarOpen = ref(false);
const isProfileMenuOpen = ref(false);
const searchQuery = ref('');

// USER DATA FROM LOCALSTORAGE
const userData = ref({
    id: null,
    nombre: '',
    apellido: '',
    email: '',
    image: '',
    role: 'user',
});

// Referencias para menús
const profileRef = ref(null);
const profileMobileRef = ref(null);

// Load user from localStorage
const loadUserData = () => {
    try {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            userData.value = {
                id: user.id || null,
                nombre: user.nombre || '',
                apellido: user.apellido || '',
                email: user.email || '',
                image: user.image || '',
                role: user.role || 'user',
            };
            console.log('User data loaded:', userData.value);
        } else {
            console.warn('No user data found in localStorage');
            router.push('/login');
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        toast.error('Error al cargar datos del usuario');
        router.push('/login');
    }
};

// Computed: Full name
const userFullName = computed(() => {
    const nombre = userData.value.nombre || '';
    const apellido = userData.value.apellido || '';
    return `${nombre} ${apellido}`.trim() || 'Usuario';
});

// Computed: Avatar URL
const getUserAvatar = computed(() => {
    if (userData.value.image && userData.value.image.trim() !== '') {
        return userData.value.image;
    }

    const name = encodeURIComponent(userFullName.value);
    const bgColor = (siteSettings.value?.color_primario || '#2563eb').replace('#', '');

    return `https://ui-avatars.com/api/?name=${name}&background=${bgColor}&color=fff&bold=true&size=128`;
});

// CERRAR MENÚ AL HACER CLIC FUERA - Desktop
onClickOutside(profileRef, () => {
    isProfileMenuOpen.value = false;
});

// CERRAR MENÚ AL HACER CLIC FUERA - Mobile
onClickOutside(profileMobileRef, () => {
    if (window.innerWidth < 1024) {
        isProfileMenuOpen.value = false;
    }
});

// Cerrar con Escape
onKeyStroke('Escape', () => {
    isProfileMenuOpen.value = false;
    isSidebarOpen.value = false;
});

// Menú items
const menuItems = ref([
    { name: 'Dashboard', to: '/admin/dashboard', icon: Home },
    {
        name: 'Consignaciones',
        to: '/admin/properties-agent',
        icon: Building2,
    },
    {
        name: 'Propiedades',
        to: '/admin/properties',
        icon: Building2,
    },
    { name: 'Usuarios', to: '/admin/users', icon: Users },
]);

// Filtrar items del menú por búsqueda
const filteredMenuItems = computed(() => {
    if (!searchQuery.value.trim()) return menuItems.value;

    const query = searchQuery.value.toLowerCase();
    return menuItems.value.filter(item => item.name.toLowerCase().includes(query));
});

const toggleProfileMenu = () => {
    isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

// Ir al home del sitio web
const goToHome = () => {
    router.push('/');
    isProfileMenuOpen.value = false;
    isSidebarOpen.value = false;
};

// Maneja el cierre de sesión del usuario
const handleLogout = async () => {
    const { showConfirm } = useAlert();
    const result = await showConfirm(
        '¿Cerrar sesión?',
        '¿Estás seguro de que quieres cerrar tu sesión actual?'
    );

    if (result) {
        try {
            const { data } = await logoutBE();
            console.log(data);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
};

// Manejo de errores de imágenes
const handleLogoError = event => {
    event.target.src = defaultLogo;
};

const handleAvatarError = event => {
    const name = encodeURIComponent(userFullName.value);
    const bgColor = (siteSettings.value?.color_primario || '#2563eb').replace('#', '');
    event.target.src = `https://ui-avatars.com/api/?name=${name}&background=${bgColor}&color=fff&bold=true&size=128`;
};

// Actualizar favicon dinámicamente
watch(
    () => siteSettings.value?.favicon_url,
    newFavicon => {
        if (newFavicon) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = newFavicon;
        }
    },
    { immediate: true }
);

// Actualizar título dinámicamente
watch(
    () => siteSettings.value?.nombre_sitio,
    newTitle => {
        if (newTitle) {
            document.title = `${newTitle} - Admin Panel`;
        }
    },
    { immediate: true }
);

// Cargar configuración y usuario al montar
onMounted(async () => {
    loadUserData();
    await loadSettings();
    console.log('Site Settings loaded:', siteSettings.value);
});
</script>

<style scoped>
/* Touch optimization */
* {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
}

/* Input y textarea siguen siendo seleccionables */
input,
textarea,
[contenteditable] {
    -webkit-user-select: text;
    user-select: text;
}

/* Animaciones de página */
.page-enter-active,
.page-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
    opacity: 0;
    transform: translateY(10px);
}
.page-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

/* Smooth scroll */
nav {
    scrollbar-width: thin;
    scrollbar-color: #d1d5db transparent;
}

nav::-webkit-scrollbar {
    width: 6px;
}

nav::-webkit-scrollbar-track {
    background: transparent;
}

nav::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 3px;
}

nav::-webkit-scrollbar-thumb:hover {
    background-color: #9ca3af;
}

/* Prevenir zoom en input en mobile */
@media screen and (max-width: 1024px) {
    input,
    select,
    textarea {
        font-size: 16px !important;
    }
}

/* Mejor rendering en WebView */
* {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Mejor performance en animaciones */
.transition-transform,
.transition-all {
    will-change: transform;
}
</style>
