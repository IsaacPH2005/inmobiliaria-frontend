<template>
    <div>
        <!-- Main Image con zoom -->
        <div
            class="relative mb-4 overflow-hidden bg-gray-200 rounded-xl shadow-xl md:h-[500px] group"
        >
            <img
                :src="mainImage"
                :alt="title"
                class="object-cover w-full h-full transition-transform duration-700 cursor-zoom-in group-hover:scale-110"
                loading="lazy"
                @click="openLightbox(currentImageIndex)"
            />

            <!-- Overlay gradient para mejor contraste -->
            <div
                class="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100"
            ></div>

            <!-- Navigation Buttons -->
            <button
                v-if="images.length > 1"
                @click.stop="prevImage"
                class="absolute p-3 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-lg left-4 top-1/2 bg-opacity-80 backdrop-blur-sm hover:bg-opacity-100 hover:scale-110"
            >
                <ChevronLeft :size="24" class="text-gray-800" />
            </button>
            <button
                v-if="images.length > 1"
                @click.stop="nextImage"
                class="absolute p-3 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-lg right-4 top-1/2 bg-opacity-80 backdrop-blur-sm hover:bg-opacity-100 hover:scale-110"
            >
                <ChevronRight :size="24" class="text-gray-800" />
            </button>

            <!-- Image Counter con estilo mejorado -->
            <div
                class="absolute flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-full shadow-lg bg-black/60 backdrop-blur-md bottom-4 right-4"
            >
                <Image :size="16" />
                {{ currentImageIndex + 1 }} / {{ images.length }}
            </div>

            <!-- Fullscreen Button -->
            <button
                @click.stop="openLightbox(currentImageIndex)"
                class="absolute flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all rounded-full shadow-lg bg-black/60 backdrop-blur-md bottom-4 left-4 hover:bg-black/80"
            >
                <Maximize2 :size="16" />
                Ver en pantalla completa
            </button>

            <!-- Indicador de zoom -->
            <div
                class="absolute px-3 py-1 text-xs font-medium text-white transition-opacity rounded-full opacity-0 bg-black/60 backdrop-blur-md top-4 right-4 group-hover:opacity-100"
            >
                <ZoomIn :size="14" class="inline mr-1" />
                Click para ampliar
            </div>
        </div>

        <!-- Thumbnails con scroll mejorado -->
        <div class="relative">
            <!-- Gradientes en los bordes para indicar scroll -->
            <div
                class="absolute left-0 z-10 w-12 h-full pointer-events-none bg-gradient-to-r from-white to-transparent"
            ></div>
            <div
                class="absolute right-0 z-10 w-12 h-full pointer-events-none bg-gradient-to-l from-white to-transparent"
            ></div>

            <div class="flex gap-3 pb-2 overflow-x-auto scrollbar-hide">
                <div
                    v-for="(image, index) in images"
                    :key="index"
                    class="relative flex-shrink-0 overflow-hidden transition-all bg-gray-200 border-2 rounded-lg cursor-pointer group/thumb"
                    :class="[
                        'w-20 h-20 md:w-24 md:h-24',
                        currentImageIndex === index
                            ? 'border-blue-500 ring-2 ring-blue-200 scale-105'
                            : 'border-transparent hover:border-gray-300 hover:scale-105',
                    ]"
                    @click="setImage(index)"
                >
                    <img
                        :src="image.image_url"
                        :alt="`${title} - Imagen ${index + 1}`"
                        class="object-cover w-full h-full transition-transform duration-300 group-hover/thumb:scale-110"
                        loading="lazy"
                    />

                    <!-- Overlay en thumbnail -->
                    <div
                        class="absolute inset-0 transition-opacity bg-black/30"
                        :class="
                            currentImageIndex === index
                                ? 'opacity-0'
                                : 'opacity-0 group-hover/thumb:opacity-0'
                        "
                    ></div>

                    <!-- Indicador de imagen activa -->
                    <div
                        v-if="currentImageIndex === index"
                        class="absolute inset-0 flex items-center justify-center bg-blue-600/20"
                    >
                        <Check :size="24" class="text-white drop-shadow-lg" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Lightbox Modal -->
        <transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isLightboxOpen"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
                @click="closeLightbox"
            >
                <!-- Lightbox Content -->
                <div class="relative w-full h-full p-4 md:p-8" @click.stop>
                    <!-- Close Button -->
                    <button
                        @click="closeLightbox"
                        class="absolute p-3 text-white transition-all rounded-full shadow-lg bg-white/10 backdrop-blur-md top-4 right-4 hover:bg-white/20 hover:rotate-90"
                    >
                        <X :size="24" />
                    </button>

                    <!-- Image Info -->
                    <div
                        class="absolute px-4 py-2 text-white rounded-full shadow-lg bg-black/60 backdrop-blur-md top-4 left-4"
                    >
                        <p class="text-sm font-medium">{{ title }}</p>
                        <p class="text-xs text-gray-300">
                            Imagen {{ lightboxIndex + 1 }} de {{ images.length }}
                        </p>
                    </div>

                    <!-- Main Lightbox Image -->
                    <div class="flex items-center justify-center w-full h-full">
                        <img
                            :src="images[lightboxIndex]?.image_url"
                            :alt="`${title} - Imagen ${lightboxIndex + 1}`"
                            class="object-contain max-w-full max-h-full transition-transform duration-300 rounded-lg shadow-2xl"
                            :class="{ 'scale-150': isZoomed }"
                            @click="toggleZoom"
                        />
                    </div>

                    <!-- Navigation Arrows -->
                    <button
                        v-if="images.length > 1"
                        @click.stop="prevLightboxImage"
                        class="absolute p-4 text-white transition-all transform -translate-y-1/2 rounded-full shadow-lg bg-white/10 backdrop-blur-md left-4 top-1/2 hover:bg-white/20 hover:scale-110"
                    >
                        <ChevronLeft :size="32" />
                    </button>
                    <button
                        v-if="images.length > 1"
                        @click.stop="nextLightboxImage"
                        class="absolute p-4 text-white transition-all transform -translate-y-1/2 rounded-full shadow-lg bg-white/10 backdrop-blur-md right-4 top-1/2 hover:bg-white/20 hover:scale-110"
                    >
                        <ChevronRight :size="32" />
                    </button>

                    <!-- Thumbnails Strip en Lightbox -->
                    <div
                        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-[90%] overflow-hidden"
                    >
                        <div class="flex gap-2 overflow-x-auto scrollbar-hide">
                            <div
                                v-for="(image, index) in images"
                                :key="'lightbox-' + index"
                                @click.stop="lightboxIndex = index"
                                class="flex-shrink-0 w-16 h-16 overflow-hidden transition-all bg-gray-800 border-2 rounded-lg cursor-pointer md:w-20 md:h-20 hover:scale-110"
                                :class="
                                    lightboxIndex === index
                                        ? 'border-white ring-2 ring-white/50 scale-110'
                                        : 'border-transparent opacity-60 hover:opacity-100'
                                "
                            >
                                <img
                                    :src="image.image_url"
                                    :alt="`Thumbnail ${index + 1}`"
                                    class="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Zoom Toggle -->
                    <button
                        @click.stop="toggleZoom"
                        class="absolute flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all rounded-full shadow-lg bg-white/10 backdrop-blur-md bottom-20 right-4 hover:bg-white/20"
                    >
                        <component :is="isZoomed ? ZoomOut : ZoomIn" :size="18" />
                        {{ isZoomed ? 'Alejar' : 'Acercar' }}
                    </button>

                    <!-- Download Button -->
                    <button
                        @click.stop="downloadImage"
                        class="absolute flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all rounded-full shadow-lg bg-white/10 backdrop-blur-md bottom-20 left-4 hover:bg-white/20"
                    >
                        <Download :size="18" />
                        Descargar
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
    X,
    Check,
    Image,
    ZoomIn,
    ZoomOut,
    Download,
} from 'lucide-vue-next';

const props = defineProps({
    images: {
        type: Array,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    primaryColor: {
        type: String,
        default: '#3B82F6',
    },
});

const currentImageIndex = ref(0);
const isLightboxOpen = ref(false);
const lightboxIndex = ref(0);
const isZoomed = ref(false);

const mainImage = computed(() => {
    if (!props.images || props.images.length === 0) {
        return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }
    return props.images[currentImageIndex.value]?.image_url;
});

const prevImage = () => {
    if (currentImageIndex.value > 0) {
        currentImageIndex.value--;
    } else {
        currentImageIndex.value = props.images.length - 1;
    }
};

const nextImage = () => {
    if (currentImageIndex.value < props.images.length - 1) {
        currentImageIndex.value++;
    } else {
        currentImageIndex.value = 0;
    }
};

const setImage = index => {
    currentImageIndex.value = index;
};

const openLightbox = index => {
    lightboxIndex.value = index;
    isLightboxOpen.value = true;
    isZoomed.value = false;
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    isLightboxOpen.value = false;
    isZoomed.value = false;
    document.body.style.overflow = '';
};

const prevLightboxImage = () => {
    if (lightboxIndex.value > 0) {
        lightboxIndex.value--;
    } else {
        lightboxIndex.value = props.images.length - 1;
    }
    isZoomed.value = false;
};

const nextLightboxImage = () => {
    if (lightboxIndex.value < props.images.length - 1) {
        lightboxIndex.value++;
    } else {
        lightboxIndex.value = 0;
    }
    isZoomed.value = false;
};

const toggleZoom = () => {
    isZoomed.value = !isZoomed.value;
};

const downloadImage = () => {
    const link = document.createElement('a');
    link.href = props.images[lightboxIndex.value]?.image_url;
    link.download = `${props.title}-${lightboxIndex.value + 1}.jpg`;
    link.click();
};

// Soporte para teclas del teclado
const handleKeydown = e => {
    if (!isLightboxOpen.value) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightboxImage();
    if (e.key === 'ArrowRight') nextLightboxImage();
};

if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown);
}
</script>

<style scoped>
/* Ocultar scrollbar pero mantener funcionalidad */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Animación de zoom */
.scale-150 {
    cursor: zoom-out;
}

.cursor-zoom-in {
    cursor: zoom-in;
}
</style>
