<template>
    <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <!-- Top Info Bar - Desktop Only -->
        <div class="hidden border-b border-gray-100 lg:block bg-gray-50">
            <div class="container px-4 py-2 mx-auto">
                <div class="flex items-center justify-between text-sm text-gray-600">
                    <!-- Contact Info -->
                    <div class="flex items-center space-x-6">
                        <a
                            href="tel:+59172714730"
                            class="flex items-center space-x-2 transition-colors hover:text-blue-600"
                        >
                            <Phone :size="16" />
                            <span>727 14730</span>
                        </a>
                        <a
                            href="tel:+59169445851"
                            class="flex items-center space-x-2 transition-colors hover:text-blue-600"
                        >
                            <Phone :size="16" />
                            <span>694 45851</span>
                        </a>
                        <a
                            href="mailto:contacto@residenciaconsultora.com"
                            class="flex items-center space-x-2 transition-colors hover:text-blue-600"
                        >
                            <Mail :size="16" />
                            <span>contacto@residenciaconsultora.com</span>
                        </a>
                    </div>

                    <!-- Social Media & Login -->
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-3">
                            <span class="text-gray-500">Síguenos:</span>
                            <a
                                href="https://www.facebook.com/ResidenciaConsultora"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="transition-colors hover:text-blue-600"
                                aria-label="Facebook"
                            >
                                <Facebook :size="18" />
                            </a>
                            <a
                                href="https://www.instagram.com/inmobiliaria.residencial/"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="transition-colors hover:text-pink-600"
                                aria-label="Instagram"
                            >
                                <Instagram :size="18" />
                            </a>
                        </div>

                        <!-- Login Button -->
                        <router-link
                            to="/login"
                            class="flex items-center px-4 py-1.5 text-sm font-medium text-white transition-all rounded-md hover:opacity-90"
                            :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                        >
                            <LogIn :size="16" class="mr-1.5" />
                            <span>Login</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Navigation -->
        <div class="container px-3 py-3 mx-auto sm:px-4 sm:py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <router-link to="/" class="flex items-center space-x-2 group">
                    <img
                        v-if="siteSettings.logo_url"
                        :src="siteSettings.logo_url"
                        :alt="siteSettings.nombre_sitio"
                        class="object-contain h-10 transition-transform duration-200 sm:h-12 group-hover:scale-105"
                    />
                    <div
                        v-else
                        class="flex items-center justify-center w-10 h-10 rounded-lg sm:w-12 sm:h-12"
                        :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                    >
                        <span class="text-xl font-bold text-white sm:text-2xl">
                            {{ siteSettings.nombre_sitio?.charAt(0) || 'I' }}
                        </span>
                    </div>
                </router-link>

                <!-- Mobile Action Buttons (Top Right) -->
                <div class="flex items-center gap-2 lg:hidden">
                    <!-- Login Button Mobile -->
                    <router-link
                        to="/login"
                        class="flex items-center justify-center p-2 text-gray-700 transition-all border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95"
                        aria-label="Login"
                    >
                        <LogIn :size="18" />
                    </router-link>

                    <!-- Profile Button Mobile -->
                    <router-link
                        to="/perfil"
                        class="flex items-center justify-center p-2 text-white transition-all rounded-lg shadow-sm hover:shadow-md active:scale-95"
                        :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                        aria-label="Perfil"
                    >
                        <User :size="18" />
                    </router-link>
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden space-x-1 lg:flex">
                    <router-link
                        to="/"
                        class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:text-blue-600 hover:bg-gray-50"
                        active-class="text-blue-600 bg-gray-50"
                    >
                        Inicio
                    </router-link>
                    <a
                        href="#propiedades"
                        @click.prevent="scrollToSection('propiedades')"
                        class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:text-blue-600 hover:bg-gray-50"
                    >
                        Propiedades
                    </a>
                    <router-link
                        to="/formulario"
                        class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:text-blue-600 hover:bg-gray-50"
                        active-class="text-blue-600 bg-gray-50"
                    >
                        Formulario
                    </router-link>
                    <router-link
                        to="/perfil"
                        class="px-5 py-2 ml-2 text-sm font-semibold text-white transition-all rounded-lg shadow-sm hover:shadow-md"
                        :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                    >
                        Perfil
                    </router-link>
                </nav>
            </div>
        </div>

        <!-- Mobile Bottom Navigation -->
        <div
            class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg lg:hidden"
        >
            <div class="grid grid-cols-3 gap-1 p-2">
                <!-- Inicio Button -->
                <router-link
                    to="/"
                    class="flex flex-col items-center justify-center py-2.5 text-xs font-medium transition-all rounded-lg active:scale-95"
                    :class="
                        route.path === '/'
                            ? 'text-white'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    "
                    :style="
                        route.path === '/'
                            ? { backgroundColor: siteSettings.color_primario || '#3B82F6' }
                            : {}
                    "
                >
                    <Home :size="20" class="mb-1" />
                    <span>Inicio</span>
                </router-link>

                <!-- Propiedades Button -->
                <a
                    href="#propiedades"
                    @click.prevent="scrollToSection('propiedades')"
                    class="flex flex-col items-center justify-center py-2.5 text-xs font-medium text-gray-600 transition-all rounded-lg hover:text-gray-900 hover:bg-gray-50 active:scale-95"
                >
                    <Building2 :size="20" class="mb-1" />
                    <span>Propiedades</span>
                </a>

                <!-- Formulario Button -->
                <router-link
                    to="/formulario"
                    class="flex flex-col items-center justify-center py-2.5 text-xs font-medium transition-all rounded-lg active:scale-95"
                    :class="
                        route.path === '/formulario'
                            ? 'text-white'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    "
                    :style="
                        route.path === '/formulario'
                            ? { backgroundColor: siteSettings.color_primario || '#3B82F6' }
                            : {}
                    "
                >
                    <FileText :size="20" class="mb-1" />
                    <span>Formulario</span>
                </router-link>
            </div>
        </div>

        <!-- Contact Info Floating Button (Mobile) -->
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="translate-y-full opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-full opacity-0"
        >
            <button
                v-if="showContactButton"
                @click="toggleContactModal"
                class="fixed z-40 p-3 text-white rounded-full shadow-2xl bottom-20 right-4 lg:hidden active:scale-95"
                :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                aria-label="Contacto"
            >
                <Phone :size="20" />
            </button>
        </Transition>

        <!-- Contact Modal (Mobile) -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition-opacity duration-300"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="contactModalOpen"
                    @click="toggleContactModal"
                    class="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm lg:hidden"
                >
                    <Transition
                        enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="translate-y-full"
                        enter-to-class="translate-y-0"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="translate-y-0"
                        leave-to-class="translate-y-full"
                    >
                        <div
                            v-if="contactModalOpen"
                            @click.stop
                            class="w-full max-w-lg p-6 mb-2 bg-white shadow-2xl rounded-t-3xl"
                        >
                            <!-- Header -->
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-lg font-bold text-gray-900">Contáctanos</h3>
                                <button
                                    @click="toggleContactModal"
                                    class="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 active:scale-95"
                                >
                                    <X :size="20" />
                                </button>
                            </div>

                            <!-- Contact Links -->
                            <div class="space-y-3">
                                <a
                                    href="tel:+59172714730"
                                    class="flex items-center p-3 space-x-3 transition-all border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 active:scale-95"
                                >
                                    <div
                                        class="flex items-center justify-center w-10 h-10 rounded-full"
                                        :style="{
                                            backgroundColor:
                                                siteSettings.color_primario + '20' || '#3B82F620',
                                        }"
                                    >
                                        <Phone
                                            :size="18"
                                            :style="{
                                                color: siteSettings.color_primario || '#3B82F6',
                                            }"
                                        />
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500">Teléfono 1</p>
                                        <p class="font-semibold text-gray-900">727 14730</p>
                                    </div>
                                </a>

                                <a
                                    href="tel:+59169445851"
                                    class="flex items-center p-3 space-x-3 transition-all border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 active:scale-95"
                                >
                                    <div
                                        class="flex items-center justify-center w-10 h-10 rounded-full"
                                        :style="{
                                            backgroundColor:
                                                siteSettings.color_primario + '20' || '#3B82F620',
                                        }"
                                    >
                                        <Phone
                                            :size="18"
                                            :style="{
                                                color: siteSettings.color_primario || '#3B82F6',
                                            }"
                                        />
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-500">Teléfono 2</p>
                                        <p class="font-semibold text-gray-900">694 45851</p>
                                    </div>
                                </a>

                                <a
                                    href="mailto:contacto@residenciaconsultora.com"
                                    class="flex items-center p-3 space-x-3 transition-all border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 active:scale-95"
                                >
                                    <div
                                        class="flex items-center justify-center w-10 h-10 rounded-full"
                                        :style="{
                                            backgroundColor:
                                                siteSettings.color_primario + '20' || '#3B82F620',
                                        }"
                                    >
                                        <Mail
                                            :size="18"
                                            :style="{
                                                color: siteSettings.color_primario || '#3B82F6',
                                            }"
                                        />
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-xs text-gray-500">Email</p>
                                        <p class="font-semibold text-gray-900 truncate">
                                            contacto@residenciaconsultora.com
                                        </p>
                                    </div>
                                </a>
                            </div>

                            <!-- Social Media -->
                            <div class="pt-4 mt-4 border-t border-gray-200">
                                <p class="mb-3 text-sm font-semibold text-gray-700">
                                    Síguenos en redes sociales
                                </p>
                                <div class="flex gap-3">
                                    <a
                                        href="https://www.facebook.com/ResidenciaConsultora"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95"
                                    >
                                        <Facebook :size="20" />
                                        <span class="text-sm font-medium">Facebook</span>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/inmobiliaria.residencial/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-white transition-all rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 active:scale-95"
                                    >
                                        <Instagram :size="20" />
                                        <span class="text-sm font-medium">Instagram</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </Transition>
        </Teleport>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
    Phone,
    Mail,
    Facebook,
    Instagram,
    LogIn,
    User,
    Home,
    Building2,
    FileText,
    X,
} from 'lucide-vue-next';

const props = defineProps({
    siteSettings: {
        type: Object,
        required: true,
    },
});

const router = useRouter();
const route = useRoute();
const scrolled = ref(false);
const contactModalOpen = ref(false);
const showContactButton = ref(true);

const handleScroll = () => {
    scrolled.value = window.scrollY > 20;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
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
        const offset = 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
};

const toggleContactModal = () => {
    contactModalOpen.value = !contactModalOpen.value;
};
</script>

<style scoped>
* {
    -webkit-tap-highlight-color: transparent;
}

/* Prevent body scroll when modal is open */
body:has(.contact-modal-open) {
    overflow: hidden;
}
</style>
