<template>
    <!-- Hero con Carousel de fondo - Optimizado para WebView -->
    <section class="relative overflow-hidden hero-section">
        <!-- Carousel Background -->
        <div class="absolute inset-0 carousel-container">
            <!-- Imágenes sin transition-group (más compatible con WebView) -->
            <div
                v-for="(image, index) in heroImages"
                :key="index"
                class="absolute inset-0 carousel-slide"
                :class="{ active: currentSlide === index }"
            >
                <img
                    :src="image"
                    :alt="`Hero ${index + 1}`"
                    class="object-cover w-full h-full"
                    loading="eager"
                />
                <!-- Overlay oscuro -->
                <div class="absolute inset-0 hero-overlay"></div>
            </div>

            <!-- Navigation Dots -->
            <div
                class="absolute flex gap-2 transform -translate-x-1/2 bottom-6 left-1/2 md:bottom-8"
            >
                <button
                    v-for="(image, index) in heroImages"
                    :key="`dot-${index}`"
                    @click="goToSlide(index)"
                    class="transition-all duration-300 rounded-full"
                    :class="currentSlide === index ? 'w-10 h-2 bg-white' : 'w-2 h-2 bg-white/40'"
                    :aria-label="`Ir a imagen ${index + 1}`"
                ></button>
            </div>

            <!-- Navigation Arrows -->
            <button
                @click="prevSlide"
                class="absolute z-20 p-2.5 transition-all transform -translate-y-1/2 bg-white/20 rounded-full shadow-lg left-3 md:left-6 top-1/2"
                aria-label="Imagen anterior"
            >
                <ChevronLeft :size="20" class="text-white md:w-6 md:h-6" />
            </button>
            <button
                @click="nextSlide"
                class="absolute z-20 p-2.5 transition-all transform -translate-y-1/2 bg-white/20 rounded-full shadow-lg right-3 md:right-6 top-1/2"
                aria-label="Siguiente imagen"
            >
                <ChevronRight :size="20" class="text-white md:w-6 md:h-6" />
            </button>

            <!-- Progress bar -->
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                    class="h-full transition-all duration-300 bg-white"
                    :style="{ width: progress + '%' }"
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
                    class="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-white rounded-full shadow-lg bg-white/20"
                >
                    <Sparkles :size="16" />
                    Plataforma interna de gestión inmobiliaria
                </div>

                <!-- Título -->
                <h1 class="mb-4 text-3xl font-bold text-white md:text-5xl lg:text-6xl hero-title">
                    Accede, gestiona y comparte propiedades fácilmente
                </h1>
                <p
                    class="max-w-2xl mx-auto mb-8 text-base text-white md:text-lg lg:text-xl hero-subtitle"
                >
                    Todo el material que necesitas, en segundos.
                </p>

                <!-- Búsqueda rápida -->
                <div
                    class="max-w-3xl p-4 mx-auto shadow-2xl md:p-6 rounded-xl md:rounded-2xl bg-white/95"
                >
                    <div class="flex flex-col gap-3 md:flex-row">
                        <!-- Input de búsqueda -->
                        <div class="relative flex-1">
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="Buscar por código, zona o tipo de inmueble…"
                                class="w-full px-4 py-3 text-sm text-gray-700 transition-all border border-gray-300 rounded-lg pl-11 md:text-base focus:outline-none focus:ring-2 focus:border-transparent search-input"
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
                                class="absolute p-1 text-gray-400 transition-colors transform -translate-y-1/2 rounded-full right-3 top-1/2"
                            >
                                <X :size="16" />
                            </button>
                        </div>

                        <!-- Botón de búsqueda -->
                        <button
                            @click="handleSearch"
                            class="flex items-center justify-center px-6 py-3 text-sm font-bold text-white transition-all rounded-lg shadow-lg md:text-base search-button"
                            :style="{ backgroundColor: siteSettings?.color_primario || '#2563eb' }"
                        >
                            <Search :size="20" class="mr-2" /> Buscar
                        </button>
                    </div>
                </div>

                <!-- Stats -->
                <div class="grid max-w-2xl grid-cols-3 gap-4 mx-auto mt-8">
                    <div class="p-3 rounded-lg md:p-4 bg-white/10">
                        <div class="flex items-center justify-center mb-1">
                            <Building2 :size="20" class="text-white md:w-6 md:h-6" />
                        </div>
                        <p class="text-xl font-bold text-white md:text-2xl">20+</p>
                        <p class="text-xs md:text-sm text-white/80">Propiedades</p>
                    </div>
                    <div class="p-3 rounded-lg md:p-4 bg-white/10">
                        <div class="flex items-center justify-center mb-1">
                            <Users :size="20" class="text-white md:w-6 md:h-6" />
                        </div>
                        <p class="text-xl font-bold text-white md:text-2xl">500+</p>
                        <p class="text-xs md:text-sm text-white/80">Clientes</p>
                    </div>
                    <div class="p-3 rounded-lg md:p-4 bg-white/10">
                        <div class="flex items-center justify-center mb-1">
                            <MapPin :size="20" class="text-white md:w-6 md:h-6" />
                        </div>
                        <p class="text-xl font-bold text-white md:text-2xl">9+</p>
                        <p class="text-xs md:text-sm text-white/80">Ciudades</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll Down Indicator -->
        <button
            @click="scrollToProperties"
            class="absolute z-10 flex flex-col items-center gap-1 text-white transform -translate-x-1/2 cursor-pointer bottom-4 left-1/2 scroll-indicator"
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
    const target = window.innerHeight * 0.7;
    window.scrollTo({
        top: target,
        behavior: 'smooth',
    });
};

onMounted(() => {
    startAutoplay();
});

onBeforeUnmount(() => {
    stopAutoplay();
});
</script>

<style scoped>
/* Hero Section - Altura fija para WebView */
.hero-section {
    height: 70vh;
    min-height: 500px;
}

@media (min-width: 768px) {
    .hero-section {
        height: 80vh;
        min-height: 600px;
    }
}

/* Carousel Container */
.carousel-container {
    width: 100%;
    height: 100%;
}

/* Carousel Slides - Transición simple compatible con WebView */
.carousel-slide {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.8s ease-in-out;
    -webkit-transition: opacity 0.8s ease-in-out;
}

.carousel-slide.active {
    opacity: 1;
    visibility: visible;
    z-index: 1;
}

/* Hero Overlay - Gradiente simplificado */
.hero-overlay {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
}

/* Text Shadows - Compatibilidad WebView */
.hero-title {
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
}

/* Search Input Focus */
.search-input:focus {
    ring-color: #2563eb;
    -webkit-ring-color: #2563eb;
}

/* Button Hover - Simplificado */
.search-button:active {
    opacity: 0.9;
    transform: scale(0.98);
}

/* Scroll Indicator Animation - Compatible con WebView */
.scroll-indicator {
    animation: bounce-simple 2s infinite;
    -webkit-animation: bounce-simple 2s infinite;
}

@keyframes bounce-simple {
    0%,
    100% {
        transform: translateY(0) translateX(-50%);
    }
    50% {
        transform: translateY(-10px) translateX(-50%);
    }
}

@-webkit-keyframes bounce-simple {
    0%,
    100% {
        -webkit-transform: translateY(0) translateX(-50%);
    }
    50% {
        -webkit-transform: translateY(-10px) translateX(-50%);
    }
}

/* Backdrop Blur Fallback */
@supports not (backdrop-filter: blur(10px)) {
    .bg-white\/20 {
        background-color: rgba(255, 255, 255, 0.25);
    }
    .bg-white\/95 {
        background-color: rgba(255, 255, 255, 0.98);
    }
}
</style>
