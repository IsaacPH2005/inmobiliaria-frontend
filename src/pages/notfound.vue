<template>
    <div
        class="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
        <div class="w-full max-w-2xl text-center">
            <!-- Animación 404 -->
            <div class="relative mb-8">
                <div class="absolute inset-0 flex items-center justify-center opacity-10">
                    <div
                        class="rounded-full w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-600 blur-3xl animate-pulse"
                    ></div>
                </div>

                <div class="relative">
                    <!-- Número 404 animado -->
                    <div class="flex items-center justify-center gap-4 mb-6">
                        <span
                            class="font-black text-transparent text-9xl bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text animate-bounce"
                            style="animation-delay: 0s; animation-duration: 2s"
                        >
                            4
                        </span>
                        <div class="relative">
                            <div
                                class="w-24 h-24 border-8 border-blue-600 rounded-full animate-spin-slow"
                            ></div>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <Home :size="40" class="text-blue-600" />
                            </div>
                        </div>
                        <span
                            class="font-black text-transparent text-9xl bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text animate-bounce"
                            style="animation-delay: 0.2s; animation-duration: 2s"
                        >
                            4
                        </span>
                    </div>

                    <!-- Iconos flotantes decorativos -->
                    <div class="absolute top-0 left-10 animate-float">
                        <AlertCircle :size="32" class="text-orange-400 opacity-70" />
                    </div>
                    <div
                        class="absolute top-10 right-10 animate-float"
                        style="animation-delay: 0.5s"
                    >
                        <SearchX :size="28" class="text-red-400 opacity-70" />
                    </div>
                    <div
                        class="absolute bottom-0 left-20 animate-float"
                        style="animation-delay: 1s"
                    >
                        <MapPin :size="24" class="text-purple-400 opacity-70" />
                    </div>
                </div>
            </div>

            <!-- Texto principal -->
            <div class="mb-8 space-y-4">
                <h1 class="text-4xl font-bold text-gray-800 md:text-5xl">
                    ¡Oops! Página no encontrada
                </h1>
                <p class="text-lg text-gray-600 md:text-xl">
                    Parece que la página que buscas se mudó a otra dirección o nunca existió.
                </p>
                <p class="text-sm text-gray-500">
                    No te preocupes, podemos ayudarte a encontrar lo que necesitas.
                </p>
            </div>

            <!-- Sugerencias -->
            <div
                class="p-6 mb-8 bg-white border shadow-lg rounded-2xl border-gray-200/50 backdrop-blur-sm"
            >
                <h2 class="mb-4 text-lg font-semibold text-gray-700">¿Qué puedes hacer?</h2>
                <div class="grid gap-4 md:grid-cols-3">
                    <div
                        class="p-4 transition-all duration-300 rounded-xl bg-blue-50 hover:bg-blue-100 hover:shadow-md"
                    >
                        <Search :size="24" class="mx-auto mb-2 text-blue-600" />
                        <p class="text-sm font-medium text-gray-700">Buscar propiedades</p>
                    </div>
                    <div
                        class="p-4 transition-all duration-300 rounded-xl bg-indigo-50 hover:bg-indigo-100 hover:shadow-md"
                    >
                        <Building2 :size="24" class="mx-auto mb-2 text-indigo-600" />
                        <p class="text-sm font-medium text-gray-700">Ver catálogo</p>
                    </div>
                    <div
                        class="p-4 transition-all duration-300 rounded-xl bg-purple-50 hover:bg-purple-100 hover:shadow-md"
                    >
                        <Phone :size="24" class="mx-auto mb-2 text-purple-600" />
                        <p class="text-sm font-medium text-gray-700">Contactar soporte</p>
                    </div>
                </div>
            </div>

            <!-- Botones de acción -->
            <div class="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                    @click="goHome"
                    class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-all duration-300 shadow-lg rounded-xl hover:shadow-xl hover:scale-105"
                    :style="{
                        background: `linear-gradient(135deg, ${
                            siteSettings?.color_primario || '#2563eb'
                        }, ${darkenColor(siteSettings?.color_primario || '#2563eb', 20)})`,
                    }"
                >
                    <Home :size="20" />
                    Volver al Inicio
                </button>

                <button
                    @click="goBack"
                    class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-gray-700 transition-all duration-300 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-lg hover:scale-105"
                >
                    <ArrowLeft :size="20" />
                    Página Anterior
                </button>
            </div>

            <!-- Enlaces rápidos -->
            <div class="mt-12">
                <p class="mb-4 text-sm font-semibold tracking-wide text-gray-600 uppercase">
                    Enlaces rápidos
                </p>
                <div class="flex flex-wrap justify-center gap-4 text-sm">
                    <router-link
                        to="/"
                        class="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                    >
                        Inicio
                    </router-link>
                    <span class="text-gray-300">•</span>
                    <router-link
                        to="/propiedades"
                        class="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                    >
                        Propiedades
                    </router-link>
                    <span class="text-gray-300">•</span>
                    <router-link
                        to="/contacto"
                        class="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                    >
                        Contacto
                    </router-link>
                    <span class="text-gray-300">•</span>
                    <router-link
                        to="/nosotros"
                        class="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                    >
                        Nosotros
                    </router-link>
                </div>
            </div>

            <!-- Footer mensaje -->
            <div class="mt-12 text-xs text-gray-400">
                <p>Error 404 - Página no encontrada</p>
                <p class="mt-1">
                    Si crees que esto es un error, por favor
                    <a href="mailto:soporte@tudominio.com" class="text-blue-600 hover:underline">
                        contacta a soporte
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {
    Home,
    ArrowLeft,
    AlertCircle,
    SearchX,
    MapPin,
    Search,
    Building2,
    Phone,
} from 'lucide-vue-next';
import { useSiteSettings } from '@/composables/useSiteSettings';

const router = useRouter();
const { siteSettings } = useSiteSettings();

const goHome = () => {
    router.push('/');
};

const goBack = () => {
    if (window.history.length > 2) {
        router.back();
    } else {
        router.push('/');
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
</script>

<style scoped>
@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
}

@keyframes spin-slow {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

.animate-spin-slow {
    animation: spin-slow 3s linear infinite;
}

.animate-bounce {
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-25px);
    }
}
</style>
