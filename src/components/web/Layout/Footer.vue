<template>
    <footer class="text-gray-800 bg-white border-t border-gray-200">
        <!-- Main Footer Content -->
        <div class="container px-4 py-12 mx-auto sm:px-6 lg:px-8 lg:py-16">
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-12">
                <!-- Brand Section -->
                <div class="space-y-4 sm:col-span-2 lg:col-span-1">
                    <div class="flex items-center space-x-3">
                        <!-- Logo del sitio -->
                        <img
                            v-if="siteSettings.logo_url"
                            :src="siteSettings.logo_url"
                            :alt="siteSettings.nombre_sitio || 'Inmobiliaria'"
                            class="object-contain h-12 w-auto max-w-[160px]"
                        />
                        <!-- Fallback: círculo con inicial -->
                        <div
                            v-else
                            class="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform rounded-full hover:scale-105"
                            :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                        >
                            <span class="text-xl font-bold text-white">
                                {{
                                    siteSettings.nombre_sitio
                                        ? siteSettings.nombre_sitio.charAt(0)
                                        : 'I'
                                }}
                            </span>
                        </div>
                    </div>
                    <p class="text-sm leading-relaxed text-gray-600 lg:text-base">
                        {{
                            siteSettings.descripcion ||
                            'Tu socio confiable en el mundo inmobiliario desde 2005.'
                        }}
                    </p>

                    <!-- Social Media Icons -->
                    <div class="flex pt-2 space-x-4">
                        <a
                            href="#"
                            class="text-gray-500 transition-all duration-200 hover:text-blue-600 hover:scale-110"
                            aria-label="Facebook"
                        >
                            <Facebook :size="24" />
                        </a>
                        <a
                            href="#"
                            class="text-gray-500 transition-all duration-200 hover:text-pink-600 hover:scale-110"
                            aria-label="Instagram"
                        >
                            <Instagram :size="24" />
                        </a>
                        <a
                            href="#"
                            class="text-gray-500 transition-all duration-200 hover:text-sky-500 hover:scale-110"
                            aria-label="Twitter"
                        >
                            <Twitter :size="24" />
                        </a>
                        <a
                            href="#"
                            class="text-gray-500 transition-all duration-200 hover:text-blue-700 hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <Linkedin :size="24" />
                        </a>
                    </div>
                </div>

                <!-- Enlaces Rápidos -->
                <div>
                    <h3
                        class="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase lg:mb-6"
                    >
                        Enlaces Rápidos
                    </h3>
                    <ul class="space-y-3">
                        <li>
                            <a
                                href="#"
                                class="flex items-center text-sm text-gray-600 transition-all duration-200 hover:text-gray-900 hover:translate-x-1"
                            >
                                <ChevronRight :size="16" class="mr-1" />
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="flex items-center text-sm text-gray-600 transition-all duration-200 hover:text-gray-900 hover:translate-x-1"
                            >
                                <ChevronRight :size="16" class="mr-1" />
                                Propiedades
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="flex items-center text-sm text-gray-600 transition-all duration-200 hover:text-gray-900 hover:translate-x-1"
                            >
                                <ChevronRight :size="16" class="mr-1" />
                                Servicios
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="flex items-center text-sm text-gray-600 transition-all duration-200 hover:text-gray-900 hover:translate-x-1"
                            >
                                <ChevronRight :size="16" class="mr-1" />
                                Nosotros
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                class="flex items-center text-sm text-gray-600 transition-all duration-200 hover:text-gray-900 hover:translate-x-1"
                            >
                                <ChevronRight :size="16" class="mr-1" />
                                Contacto
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Contacto -->
                <div>
                    <h3
                        class="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase lg:mb-6"
                    >
                        Contacto
                    </h3>
                    <ul class="space-y-4">
                        <li>
                            <a
                                href="#"
                                class="flex items-start text-sm text-gray-600 transition-colors duration-200 group hover:text-gray-900"
                            >
                                <MapPin
                                    :size="20"
                                    class="flex-shrink-0 mr-3 text-gray-500 transition-colors group-hover:text-blue-600"
                                />
                                <span>Calle Principal 123, Ciudad</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="tel:+15551234567"
                                class="flex items-start text-sm text-gray-600 transition-colors duration-200 group hover:text-gray-900"
                            >
                                <Phone
                                    :size="20"
                                    class="flex-shrink-0 mr-3 text-gray-500 transition-colors group-hover:text-blue-600"
                                />
                                <span>+1 (555) 123-4567</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:info@inmobiliaria.com"
                                class="flex items-start text-sm text-gray-600 transition-colors duration-200 group hover:text-gray-900"
                            >
                                <Mail
                                    :size="20"
                                    class="flex-shrink-0 mr-3 text-gray-500 transition-colors group-hover:text-blue-600"
                                />
                                <span>info@inmobiliaria.com</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Newsletter -->
                <div>
                    <h3
                        class="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase lg:mb-6"
                    >
                        Suscríbete
                    </h3>
                    <p class="mb-4 text-sm leading-relaxed text-gray-600">
                        Recibe las últimas propiedades y ofertas exclusivas.
                    </p>
                    <form @submit.prevent="handleSubscribe" class="space-y-3">
                        <div class="relative">
                            <input
                                v-model="email"
                                type="email"
                                placeholder="tu@correo.com"
                                required
                                class="w-full px-4 py-3 pr-10 text-sm text-gray-900 placeholder-gray-500 transition-all duration-200 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:bg-white"
                                :class="{ 'focus:ring-blue-500': !siteSettings.color_primario }"
                                :style="{
                                    '--tw-ring-color': siteSettings.color_primario || '#3B82F6',
                                }"
                            />
                            <Mail
                                :size="18"
                                class="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2"
                            />
                        </div>
                        <button
                            type="submit"
                            class="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white transition-all duration-200 rounded-lg shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            :style="{ backgroundColor: siteSettings.color_primario || '#3B82F6' }"
                        >
                            <span>Suscribirse</span>
                            <Send :size="18" class="ml-2" />
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-200 bg-gray-50">
            <div class="container px-4 py-6 mx-auto sm:px-6 lg:px-8">
                <div
                    class="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0"
                >
                    <p class="flex items-center text-sm text-center text-gray-600 sm:text-left">
                        <span class="mr-1">&copy; {{ new Date().getFullYear() }}</span>
                        <span class="font-semibold text-gray-900">
                            {{ siteSettings.nombre_sitio || 'Inmobiliaria' }}
                        </span>
                        <span class="ml-1">. Todos los derechos reservados.</span>
                    </p>

                    <div class="flex space-x-6">
                        <a
                            href="#"
                            class="flex items-center text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900"
                        >
                            <Shield :size="16" class="mr-1" />
                            Privacidad
                        </a>
                        <a
                            href="#"
                            class="flex items-center text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900"
                        >
                            <FileText :size="16" class="mr-1" />
                            Términos
                        </a>
                        <a
                            href="#"
                            class="flex items-center text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900"
                        >
                            <Cookie :size="16" class="mr-1" />
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    MapPin,
    Phone,
    Mail,
    Send,
    ChevronRight,
    Shield,
    FileText,
    Cookie,
} from 'lucide-vue-next';

const props = defineProps({
    siteSettings: {
        type: Object,
        required: true,
    },
});
console.log(props.siteSettings);
const email = ref('');

const handleSubscribe = () => {
    console.log('Email suscrito:', email.value);
    // Aquí implementar lógica de suscripción
    email.value = '';
};
</script>
