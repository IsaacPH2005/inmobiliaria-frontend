<template>
    <header class="sticky top-0 z-50 bg-white shadow-md backdrop-blur-sm bg-opacity-95">
        <div class="container flex items-center justify-between px-4 py-3 mx-auto lg:px-6">
            <!-- Logo Section -->
            <router-link
                to="/"
                class="flex items-center space-x-3 transition-transform hover:scale-105"
            >
                <img
                    v-if="siteSettings.logo_url"
                    :src="siteSettings.logo_url"
                    :alt="siteSettings.nombre_sitio || 'Inmobiliaria'"
                    class="object-contain h-10 w-auto max-w-[160px] lg:h-12"
                />
                <!-- Fallback: círculo con inicial -->
                <div
                    v-else
                    class="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-all rounded-lg lg:w-12 lg:h-12 hover:rotate-6"
                    :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                >
                    <span class="text-lg font-bold text-white lg:text-xl">
                        {{ siteSettings.nombre_sitio ? siteSettings.nombre_sitio.charAt(0) : 'I' }}
                    </span>
                </div>
                <!--  <span
                    v-if="siteSettings.nombre_sitio"
                    class="hidden text-xl font-bold text-gray-800 sm:block"
                >
                    {{ siteSettings.nombre_sitio }}
                </span> -->
            </router-link>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
                <a
                    href="#"
                    class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100 lg:px-4 lg:text-base"
                    :class="{ 'text-blue-600 bg-blue-50': isActive('home') }"
                >
                    <Home :size="18" class="mr-2" />
                    Inicio
                </a>
                <a
                    href="#"
                    class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100 lg:px-4 lg:text-base"
                >
                    <Building2 :size="18" class="mr-2" />
                    Propiedades
                </a>
                <a
                    href="#"
                    class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100 lg:px-4 lg:text-base"
                >
                    <Briefcase :size="18" class="mr-2" />
                    Servicios
                </a>
                <a
                    href="#"
                    class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100 lg:px-4 lg:text-base"
                >
                    <Users :size="18" class="mr-2" />
                    Nosotros
                </a>
                <a
                    href="#"
                    class="flex items-center px-3 py-2 ml-2 text-sm font-semibold text-white transition-all duration-200 rounded-lg shadow-md hover:shadow-lg hover:scale-105 lg:px-6 lg:text-base"
                    :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                >
                    <MessageCircle :size="18" class="mr-2" />
                    Contacto
                </a>
            </nav>

            <!-- Mobile menu button -->
            <button
                @click="toggleMenu"
                class="p-2 text-gray-600 transition-colors duration-200 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-label="Toggle menu"
            >
                <Menu v-if="!menuOpen" :size="24" />
                <X v-else :size="24" />
            </button>
        </div>

        <!-- Mobile Navigation -->
        <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="scale-95 opacity-0"
            enter-to-class="scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="scale-100 opacity-100"
            leave-to-class="scale-95 opacity-0"
        >
            <nav
                v-if="menuOpen"
                class="px-4 py-4 bg-white border-t border-gray-100 shadow-lg md:hidden"
            >
                <div class="space-y-1">
                    <a
                        href="#"
                        class="flex items-center px-4 py-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100"
                        :class="{ 'text-blue-600 bg-blue-50': isActive('home') }"
                        @click="menuOpen = false"
                    >
                        <Home :size="20" class="mr-3 text-gray-500" />
                        Inicio
                    </a>
                    <a
                        href="#"
                        class="flex items-center px-4 py-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100"
                        @click="menuOpen = false"
                    >
                        <Building2 :size="20" class="mr-3 text-gray-500" />
                        Propiedades
                    </a>
                    <a
                        href="#"
                        class="flex items-center px-4 py-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100"
                        @click="menuOpen = false"
                    >
                        <Briefcase :size="20" class="mr-3 text-gray-500" />
                        Servicios
                    </a>
                    <a
                        href="#"
                        class="flex items-center px-4 py-3 text-base font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100"
                        @click="menuOpen = false"
                    >
                        <Users :size="20" class="mr-3 text-gray-500" />
                        Nosotros
                    </a>

                    <!-- Divider -->
                    <div class="py-2">
                        <div class="border-t border-gray-200"></div>
                    </div>

                    <a
                        href="#"
                        class="flex items-center justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 rounded-lg shadow-md hover:shadow-lg"
                        :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                        @click="menuOpen = false"
                    >
                        <MessageCircle :size="20" class="mr-2" />
                        Contacto
                    </a>
                </div>
            </nav>
        </transition>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { Home, Building2, Briefcase, Users, MessageCircle, Menu, X } from 'lucide-vue-next';

const props = defineProps({
    siteSettings: {
        type: Object,
        required: true,
    },
});

const menuOpen = ref(false);

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

// Helper para marcar ruta activa (puedes integrar con vue-router)
const isActive = route => {
    // Ejemplo simple - integra con useRoute() de vue-router
    return false;
};
</script>
