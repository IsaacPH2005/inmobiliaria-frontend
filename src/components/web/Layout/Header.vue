<template>
    <header
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        :class="[
            scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg'
                : 'bg-white/90 backdrop-blur-sm shadow-md',
        ]"
    >
        <!-- Top Info Bar (Optional) -->
        <div
            v-if="!scrolled"
            class="hidden border-b border-gray-100 lg:block bg-gradient-to-r from-gray-50 to-white"
        >
            <div class="container px-4 py-2 mx-auto lg:px-6">
                <div class="flex items-center justify-between text-sm text-gray-600">
                    <div class="flex items-center space-x-6">
                        <a
                            href="tel:+59144444444"
                            class="flex items-center space-x-2 transition-colors hover:text-blue-600"
                        >
                            <Phone :size="16" />
                            <span>+591 4 444 4444</span>
                        </a>
                        <a
                            href="mailto:info@inmobiliaria.com"
                            class="flex items-center space-x-2 transition-colors hover:text-blue-600"
                        >
                            <Mail :size="16" />
                            <span>info@inmobiliaria.com</span>
                        </a>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="text-gray-500">Síguenos:</span>
                        <a href="#" class="p-1 transition-colors hover:text-blue-600">
                            <Facebook :size="16" />
                        </a>
                        <a href="#" class="p-1 transition-colors hover:text-blue-600">
                            <Instagram :size="16" />
                        </a>
                        <a href="#" class="p-1 transition-colors hover:text-blue-600">
                            <Linkedin :size="16" />
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Navigation -->
        <div class="container px-4 py-4 mx-auto lg:px-6">
            <div class="flex items-center justify-between">
                <!-- Logo Section - Enhanced -->
                <router-link to="/" class="relative flex items-center space-x-3 group">
                    <div class="relative">
                        <img
                            v-if="siteSettings.logo_url"
                            :src="siteSettings.logo_url"
                            :alt="siteSettings.nombre_sitio || 'Inmobiliaria'"
                            class="object-contain h-12 w-auto max-w-[180px] lg:h-14 transition-transform duration-300 group-hover:scale-105"
                        />
                        <div
                            v-else
                            class="relative flex items-center justify-center w-12 h-12 overflow-hidden transition-all duration-300 rounded-xl lg:w-14 lg:h-14 group-hover:rotate-6 group-hover:shadow-lg"
                            :style="{
                                background: `linear-gradient(135deg, ${
                                    siteSettings.color_primario || '#3B82F6'
                                } 0%, ${adjustColor(
                                    siteSettings.color_primario || '#3B82F6',
                                    -20
                                )} 100%)`,
                            }"
                        >
                            <span class="text-xl font-bold text-white lg:text-2xl">
                                {{
                                    siteSettings.nombre_sitio
                                        ? siteSettings.nombre_sitio.charAt(0)
                                        : 'I'
                                }}
                            </span>
                            <div
                                class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-white/20 group-hover:opacity-100"
                            ></div>
                        </div>
                    </div>

                    <!-- Company Name (Optional) -->
                    <div
                        v-if="siteSettings.nombre_sitio && !siteSettings.logo_url"
                        class="hidden lg:block"
                    >
                        <h1 class="text-lg font-bold text-gray-900">
                            {{ siteSettings.nombre_sitio }}
                        </h1>
                        <p class="text-xs text-gray-500">Tu hogar ideal te espera</p>
                    </div>
                </router-link>

                <!-- Desktop Navigation - Enhanced -->
                <nav class="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-2">
                    <router-link
                        to="/"
                        class="relative px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg xl:px-5 xl:text-base group hover:text-blue-600"
                        active-class="text-blue-600"
                    >
                        <span class="flex items-center space-x-2">
                            <Home :size="18" class="transition-transform group-hover:scale-110" />
                            <span>Inicio</span>
                        </span>
                        <span
                            class="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 rounded-full group-hover:w-full"
                            :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                        ></span>
                    </router-link>

                    <a
                        href="#propiedades"
                        @click.prevent="scrollToSection('propiedades')"
                        class="relative px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg xl:px-5 xl:text-base group hover:text-blue-600"
                    >
                        <span class="flex items-center space-x-2">
                            <Building2
                                :size="18"
                                class="transition-transform group-hover:scale-110"
                            />
                            <span>Propiedades</span>
                        </span>
                        <span
                            class="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 rounded-full group-hover:w-full"
                            :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                        ></span>
                    </a>

                    <router-link
                        to="/servicios"
                        class="relative px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg xl:px-5 xl:text-base group hover:text-blue-600"
                        active-class="text-blue-600"
                    >
                        <span class="flex items-center space-x-2">
                            <Briefcase
                                :size="18"
                                class="transition-transform group-hover:scale-110"
                            />
                            <span>Servicios</span>
                        </span>
                        <span
                            class="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 rounded-full group-hover:w-full"
                            :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                        ></span>
                    </router-link>

                    <router-link
                        to="/nosotros"
                        class="relative px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg xl:px-5 xl:text-base group hover:text-blue-600"
                        active-class="text-blue-600"
                    >
                        <span class="flex items-center space-x-2">
                            <Users :size="18" class="transition-transform group-hover:scale-110" />
                            <span>Nosotros</span>
                        </span>
                        <span
                            class="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 rounded-full group-hover:w-full"
                            :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                        ></span>
                    </router-link>

                    <!-- CTA Button -->
                    <router-link
                        to="/contacto"
                        class="relative flex items-center px-6 py-2.5 ml-4 text-sm font-semibold text-white transition-all duration-300 rounded-lg shadow-md xl:px-7 xl:text-base hover:shadow-xl hover:scale-105 group overflow-hidden"
                        :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                    >
                        <span
                            class="absolute inset-0 w-0 transition-all duration-300 bg-white/20 group-hover:w-full"
                        ></span>
                        <MessageCircle
                            :size="18"
                            class="relative mr-2 transition-transform group-hover:rotate-12"
                        />
                        <span class="relative">Contacto</span>
                    </router-link>
                </nav>

                <!-- Mobile menu button - Enhanced -->
                <button
                    @click="toggleMenu"
                    class="relative z-50 p-2.5 text-gray-700 transition-all duration-200 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Toggle menu"
                >
                    <div class="relative w-6 h-6">
                        <span
                            class="absolute block w-6 h-0.5 bg-current transition-all duration-300 ease-out"
                            :class="menuOpen ? 'top-3 rotate-45' : 'top-1'"
                        ></span>
                        <span
                            class="absolute block w-6 h-0.5 bg-current transition-all duration-300 ease-out top-3"
                            :class="menuOpen ? 'opacity-0' : 'opacity-100'"
                        ></span>
                        <span
                            class="absolute block w-6 h-0.5 bg-current transition-all duration-300 ease-out"
                            :class="menuOpen ? 'top-3 -rotate-45' : 'top-5'"
                        ></span>
                    </div>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation - Enhanced -->
        <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="-translate-y-full opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition-all ease-in duration-250"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-full opacity-0"
        >
            <nav
                v-if="menuOpen"
                class="fixed inset-x-0 max-h-[calc(100vh-80px)] overflow-y-auto bg-white border-t border-gray-100 shadow-2xl lg:hidden"
                :style="{ top: scrolled ? '72px' : '112px' }"
            >
                <div class="px-4 py-6 space-y-2">
                    <router-link
                        v-for="item in mobileMenuItems"
                        :key="item.path"
                        :to="item.path"
                        class="flex items-center px-4 py-3.5 text-base font-medium text-gray-700 transition-all duration-200 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 group"
                        active-class="text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100"
                        @click="menuOpen = false"
                    >
                        <component
                            :is="item.icon"
                            :size="22"
                            class="mr-3 transition-transform group-hover:scale-110"
                        />
                        <span>{{ item.label }}</span>
                        <ChevronRight
                            :size="18"
                            class="ml-auto transition-transform group-hover:translate-x-1"
                        />
                    </router-link>

                    <a
                        href="#propiedades"
                        @click.prevent="
                            scrollToSection('propiedades');
                            menuOpen = false;
                        "
                        class="flex items-center px-4 py-3.5 text-base font-medium text-gray-700 transition-all duration-200 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 group"
                    >
                        <Building2
                            :size="22"
                            class="mr-3 transition-transform group-hover:scale-110"
                        />
                        <span>Propiedades</span>
                        <ChevronRight
                            :size="18"
                            class="ml-auto transition-transform group-hover:translate-x-1"
                        />
                    </a>

                    <div class="py-3">
                        <div class="border-t border-gray-200"></div>
                    </div>

                    <router-link
                        to="/contacto"
                        class="flex items-center justify-center px-4 py-4 text-base font-semibold text-white transition-all duration-200 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] group relative overflow-hidden"
                        :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                        @click="menuOpen = false"
                    >
                        <span
                            class="absolute inset-0 w-0 transition-all duration-300 bg-white/20 group-hover:w-full"
                        ></span>
                        <MessageCircle :size="20" class="relative mr-2" />
                        <span class="relative">Contactar Ahora</span>
                    </router-link>
                </div>
            </nav>
        </transition>

        <!-- Backdrop Overlay - Enhanced -->
        <transition
            enter-active-class="transition-opacity duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity ease-in duration-250"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="menuOpen"
                @click="menuOpen = false"
                class="fixed inset-0 z-30 bg-gradient-to-b from-black/60 to-black/40 lg:hidden backdrop-blur-sm"
            ></div>
        </transition>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
    Home,
    Building2,
    Briefcase,
    Users,
    MessageCircle,
    Phone,
    Mail,
    Facebook,
    Instagram,
    Linkedin,
    ChevronRight,
} from 'lucide-vue-next';

const props = defineProps({
    siteSettings: {
        type: Object,
        required: true,
    },
});

const router = useRouter();
const route = useRoute();
const menuOpen = ref(false);
const scrolled = ref(false);

const mobileMenuItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/servicios', label: 'Servicios', icon: Briefcase },
    { path: '/nosotros', label: 'Nosotros', icon: Users },
];

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

// Handle scroll effect
const handleScroll = () => {
    scrolled.value = window.scrollY > 20;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

// Prevent body scroll when menu is open
watch(menuOpen, isOpen => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

const scrollToSection = sectionId => {
    if (route.path !== '/') {
        router.push('/').then(() => {
            setTimeout(() => scrollToElement(sectionId), 300);
        });
    } else {
        scrollToElement(sectionId);
    }
};

const scrollToElement = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerOffset = scrolled.value ? 72 : 112;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
};

// Helper function to adjust color brightness
const adjustColor = (color, amount) => {
    const clamp = val => Math.min(Math.max(val, 0), 255);
    const num = parseInt(color.replace('#', ''), 16);
    const r = clamp((num >> 16) + amount);
    const g = clamp(((num >> 8) & 0x00ff) + amount);
    const b = clamp((num & 0x0000ff) + amount);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};
</script>
