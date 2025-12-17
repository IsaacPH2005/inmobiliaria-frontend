<template>
    <!-- Hero con Carousel de fondo - Altura reducida -->
    <section class="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <!-- Carousel Background -->
        <div class="absolute inset-0">
            <transition-group name="fade" tag="div" class="relative w-full h-full">
                <div
                    v-for="(image, index) in heroImages"
                    :key="index"
                    v-show="currentSlide === index"
                    class="absolute inset-0"
                >
                    <img
                        :src="image"
                        :alt="`Hero ${index + 1}`"
                        class="object-cover w-full h-full"
                    />
                    <!-- Overlay oscuro mejorado con gradiente -->
                    <div
                        class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"
                    ></div>
                </div>
            </transition-group>

            <!-- Navigation Dots - Mejorados -->
            <div
                class="absolute flex gap-2 transform -translate-x-1/2 bottom-6 left-1/2 md:bottom-8"
            >
                <button
                    v-for="(image, index) in heroImages"
                    :key="`dot-${index}`"
                    @click="goToSlide(index)"
                    class="transition-all duration-300 rounded-full group"
                    :class="currentSlide === index ? 'w-10 h-2' : 'w-2 h-2'"
                    :aria-label="`Ir a imagen ${index + 1}`"
                >
                    <div
                        class="w-full h-full transition-all duration-300 rounded-full"
                        :class="
                            currentSlide === index
                                ? 'bg-white shadow-lg'
                                : 'bg-white/40 group-hover:bg-white/70'
                        "
                    ></div>
                </button>
            </div>

            <!-- Navigation Arrows - Mejorados -->
            <button
                @click="prevSlide"
                class="absolute z-20 p-2.5 transition-all transform -translate-y-1/2 bg-white/20 rounded-full shadow-lg left-3 md:left-6 top-1/2 backdrop-blur-md hover:bg-white/30 hover:scale-110 active:scale-95"
                aria-label="Imagen anterior"
            >
                <ChevronLeft :size="20" class="text-white md:w-6 md:h-6" />
            </button>
            <button
                @click="nextSlide"
                class="absolute z-20 p-2.5 transition-all transform -translate-y-1/2 bg-white/20 rounded-full shadow-lg right-3 md:right-6 top-1/2 backdrop-blur-md hover:bg-white/30 hover:scale-110 active:scale-95"
                aria-label="Siguiente imagen"
            >
                <ChevronRight :size="20" class="text-white md:w-6 md:h-6" />
            </button>

            <!-- Progress bar del autoplay -->
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                    class="h-full transition-all duration-300 bg-white"
                    :style="{ width: `${progress}%` }"
                ></div>
            </div>
        </div>

        <!-- Content -->
        <div
            class="relative z-10 flex flex-col items-center justify-center h-full px-4 pb-16 md:pb-20"
        >
            <div class="w-full max-w-4xl mx-auto text-center">
                <!-- Badge superior -->
                <div
                    class="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-white rounded-full shadow-lg bg-white/20 backdrop-blur-md animate-fade-in-down"
                >
                    <Sparkles :size="16" />
                    Más de 500 propiedades disponibles
                </div>

                <!-- Título animado -->
                <h1
                    class="mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl animate-fade-in-up"
                    style="text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3)"
                >
                    Encuentra tu Hogar Ideal
                </h1>
                <p
                    class="max-w-2xl mx-auto mb-8 text-base text-white md:text-lg lg:text-xl animate-fade-in-up"
                    style="animation-delay: 0.1s; text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3)"
                >
                    Descubre las mejores propiedades en las ubicaciones más exclusivas
                </p>

                <!-- Búsqueda rápida mejorada -->
                <div
                    class="max-w-3xl p-4 mx-auto shadow-2xl md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md bg-white/95 animate-fade-in-up"
                    style="animation-delay: 0.2s"
                >
                    <div class="flex flex-col gap-3 md:flex-row">
                        <!-- Input de búsqueda -->
                        <div class="relative flex-1">
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="¿Qué estás buscando? Ej: Casa en Zona Sur"
                                class="w-full px-4 py-3 text-sm text-gray-700 transition-all border border-gray-300 rounded-lg pl-11 md:text-base focus:outline-none focus:ring-2 focus:border-transparent"
                                :style="{
                                    '--tw-ring-color': siteSettings?.color_primario || '#2563eb',
                                }"
                                @keyup.enter="handleSearch"
                            />
                            <Search
                                :size="20"
                                class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                            />

                            <!-- Clear button -->
                            <button
                                v-if="searchQuery"
                                @click="searchQuery = ''"
                                class="absolute p-1 text-gray-400 transition-colors transform -translate-y-1/2 rounded-full right-3 top-1/2 hover:text-gray-600 hover:bg-gray-100"
                            >
                                <X :size="16" />
                            </button>
                        </div>

                        <!-- Botón de búsqueda -->
                        <button
                            @click="handleSearch"
                            class="flex items-center justify-center px-6 py-3 text-sm font-bold text-white transition-all rounded-lg shadow-lg md:text-base hover:shadow-xl hover:scale-105 active:scale-95"
                            :style="{
                                background: `linear-gradient(to right, ${
                                    siteSettings?.color_primario || '#2563eb'
                                }, ${darkenColor(siteSettings?.color_primario || '#2563eb', 10)})`,
                            }"
                            @mouseenter="e => (e.target.style.opacity = '0.9')"
                            @mouseleave="e => (e.target.style.opacity = '1')"
                        >
                            <Search :size="20" class="mr-2" /> Buscar
                        </button>
                    </div>
                </div>

                <!-- Stats -->
                <div
                    class="grid max-w-2xl grid-cols-3 gap-4 mx-auto mt-8 animate-fade-in-up"
                    style="animation-delay: 0.3s"
                >
                    <div class="p-3 rounded-lg md:p-4 bg-white/10 backdrop-blur-md">
                        <div class="flex items-center justify-center mb-1">
                            <Building2 :size="20" class="text-white md:w-6 md:h-6" />
                        </div>
                        <p class="text-xl font-bold text-white md:text-2xl">500+</p>
                        <p class="text-xs md:text-sm text-white/80">Propiedades</p>
                    </div>
                    <div class="p-3 rounded-lg md:p-4 bg-white/10 backdrop-blur-md">
                        <div class="flex items-center justify-center mb-1">
                            <Users :size="20" class="text-white md:w-6 md:h-6" />
                        </div>
                        <p class="text-xl font-bold text-white md:text-2xl">1000+</p>
                        <p class="text-xs md:text-sm text-white/80">Clientes</p>
                    </div>
                    <div class="p-3 rounded-lg md:p-4 bg-white/10 backdrop-blur-md">
                        <div class="flex items-center justify-center mb-1">
                            <MapPin :size="20" class="text-white md:w-6 md:h-6" />
                        </div>
                        <p class="text-xl font-bold text-white md:text-2xl">10+</p>
                        <p class="text-xs md:text-sm text-white/80">Ciudades</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll Down Indicator -->
        <button
            @click="scrollToProperties"
            class="absolute z-10 flex flex-col items-center gap-1 text-white transition-opacity transform -translate-x-1/2 cursor-pointer bottom-4 left-1/2 animate-bounce hover:opacity-80"
        >
            <span class="text-xs font-medium">Explorar</span>
            <ChevronDown :size="24" class="opacity-75" />
        </button>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Search,
    X,
    Sparkles,
    Building2,
    Users,
    MapPin,
} from 'lucide-vue-next';
import { useSiteSettings } from '@/composables/useSiteSettings';

const emit = defineEmits(['search']);

// Usar el composable para obtener configuración del sitio
const { siteSettings } = useSiteSettings();

// Imágenes del carrusel
const heroImages = ref([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
]);

const currentSlide = ref(0);
const progress = ref(0);
const searchQuery = ref('');

let autoplayInterval = null;
let progressInterval = null;

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % heroImages.value.length;
    resetProgress();
};

const prevSlide = () => {
    currentSlide.value =
        currentSlide.value === 0 ? heroImages.value.length - 1 : currentSlide.value - 1;
    resetProgress();
};

const goToSlide = index => {
    currentSlide.value = index;
    resetProgress();
};

const resetProgress = () => {
    progress.value = 0;
    stopProgress();
    startProgress();
};

const startProgress = () => {
    progressInterval = setInterval(() => {
        progress.value += 2;
        if (progress.value >= 100) {
            progress.value = 0;
        }
    }, 100);
};

const stopProgress = () => {
    if (progressInterval) {
        clearInterval(progressInterval);
    }
};

const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
        nextSlide();
    }, 5000);
    startProgress();
};

const stopAutoplay = () => {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
    }
    stopProgress();
};

const handleSearch = () => {
    if (searchQuery.value.trim()) {
        emit('search', { query: searchQuery.value });
    }
};

const scrollToProperties = () => {
    window.scrollTo({
        top: window.innerHeight * 0.7,
        behavior: 'smooth',
    });
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

onMounted(() => {
    startAutoplay();
});

onBeforeUnmount(() => {
    stopAutoplay();
});
</script>

<style scoped>
/* Animaciones mejoradas */
@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-in-down {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
}

.animate-fade-in-down {
    animation: fade-in-down 0.6s ease-out forwards;
}

/* Transición del carousel suavizada */
.fade-enter-active {
    transition: opacity 1.2s ease;
}

.fade-leave-active {
    transition: opacity 0.8s ease;
}

.fade-enter-from {
    opacity: 0;
}

.fade-leave-to {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}

/* Animación del bounce más suave */
@keyframes bounce {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.animate-bounce {
    animation: bounce 2s infinite;
}

/* Focus ring personalizado */
input:focus {
    ring-color: v-bind('siteSettings?.color_primario || "#2563eb"');
}
</style>
