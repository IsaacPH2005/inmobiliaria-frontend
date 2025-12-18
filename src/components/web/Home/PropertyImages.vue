<template>
    <div class="property-images-section">
        <!-- Main Image Grid Layout -->
        <div class="images-wrapper">
            <!-- Layout con imagen principal grande y grid de thumbnails -->
            <div class="images-grid">
                <!-- Imagen Principal (2x2) -->
                <div class="main-image-container" @click="openGalleryView(0)">
                    <img :src="mainImage" :alt="title" class="main-image" loading="eager" />

                    <!-- Overlay gradient -->
                    <div class="image-overlay"></div>

                    <!-- Ver todas las fotos button -->
                    <button @click.stop="openGalleryView(0)" class="view-all-button">
                        <Image :size="18" />
                        <span>Ver todas las {{ images.length }} fotos</span>
                    </button>

                    <!-- Image counter badge -->
                    <div class="counter-badge">
                        <Camera :size="16" />
                        <span>1 / {{ images.length }}</span>
                    </div>

                    <!-- Zoom hint -->
                    <div class="zoom-hint">
                        <Maximize2 :size="16" />
                        <span>Click para ampliar</span>
                    </div>
                </div>

                <!-- Thumbnails Grid (4 imágenes pequeñas) -->
                <div
                    v-for="(image, index) in displayThumbnails"
                    :key="index"
                    class="thumbnail-container"
                    @click="openGalleryView(index + 1)"
                >
                    <img
                        :src="image.image_url"
                        :alt="`${title} - Imagen ${index + 2}`"
                        class="thumbnail-image"
                        loading="lazy"
                    />

                    <!-- Overlay hover -->
                    <div class="thumbnail-overlay"></div>

                    <!-- Image number badge -->
                    <div class="thumbnail-number">{{ index + 2 }}</div>

                    <!-- Overlay "Ver más" en la última imagen -->
                    <div v-if="index === 3 && images.length > 5" class="more-photos-overlay">
                        <Plus :size="48" class="mb-2" />
                        <span class="more-number">+{{ images.length - 5 }}</span>
                        <span class="more-text">más fotos</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Gallery View (Fullscreen) -->
        <teleport to="body">
            <transition name="gallery-fade">
                <div v-if="isGalleryOpen" class="gallery-fullscreen" @click="closeGalleryView">
                    <!-- Header -->
                    <div class="gallery-header">
                        <div class="header-left">
                            <button @click.stop="closeGalleryView" class="close-button">
                                <ArrowLeft :size="20" />
                                <span class="hidden md:inline">Volver</span>
                            </button>
                            <div class="header-info">
                                <h2 class="gallery-title">{{ title }}</h2>
                                <p class="gallery-counter">
                                    Foto {{ galleryIndex + 1 }} de {{ images.length }}
                                </p>
                            </div>
                        </div>

                        <div class="header-actions">
                            <!-- Share button -->
                            <button
                                @click.stop="shareImage"
                                class="header-action-btn"
                                title="Compartir"
                            >
                                <Share2 :size="20" />
                            </button>

                            <!-- Download button -->
                            <button
                                @click.stop="downloadImage"
                                class="header-action-btn"
                                title="Descargar"
                            >
                                <Download :size="20" />
                            </button>

                            <!-- Close button -->
                            <button @click.stop="closeGalleryView" class="header-action-btn close">
                                <X :size="24" />
                            </button>
                        </div>
                    </div>

                    <!-- Main Gallery Content -->
                    <div class="gallery-content">
                        <!-- Main Image Area -->
                        <div class="gallery-main" @click.stop>
                            <!-- Navigation Arrows -->
                            <button
                                v-if="images.length > 1"
                                @click.stop="prevGalleryImage"
                                class="nav-arrow nav-arrow-left"
                                :style="{ color: primaryColor }"
                                aria-label="Imagen anterior"
                            >
                                <ChevronLeft :size="32" />
                            </button>

                            <!-- Main Image -->
                            <div class="main-image-wrapper" @click.stop>
                                <img
                                    :src="images[galleryIndex]?.image_url"
                                    :alt="`${title} - Imagen ${galleryIndex + 1}`"
                                    class="gallery-main-image"
                                    :class="{ zoomed: isZoomed }"
                                    @click="toggleZoom"
                                />

                                <!-- Zoom controls -->
                                <div class="zoom-controls">
                                    <button @click.stop="toggleZoom" class="zoom-button">
                                        <component :is="isZoomed ? ZoomOut : ZoomIn" :size="18" />
                                        <span>{{ isZoomed ? 'Alejar' : 'Acercar' }}</span>
                                    </button>
                                </div>

                                <!-- Image info overlay -->
                                <div class="image-info-overlay">
                                    <div class="info-badge">
                                        <Eye :size="16" />
                                        <span>{{ galleryIndex + 1 }} de {{ images.length }}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                v-if="images.length > 1"
                                @click.stop="nextGalleryImage"
                                class="nav-arrow nav-arrow-right"
                                :style="{ color: primaryColor }"
                                aria-label="Imagen siguiente"
                            >
                                <ChevronRight :size="32" />
                            </button>
                        </div>

                        <!-- Sidebar con thumbnails (Desktop) -->
                        <div class="gallery-sidebar" @click.stop>
                            <div class="sidebar-header">
                                <h3>Todas las fotos</h3>
                            </div>
                            <div class="sidebar-thumbnails">
                                <div
                                    v-for="(image, index) in images"
                                    :key="'gallery-thumb-' + index"
                                    @click.stop="selectImage(index)"
                                    class="sidebar-thumb"
                                    :class="{ active: galleryIndex === index }"
                                    :style="
                                        galleryIndex === index ? { borderColor: primaryColor } : {}
                                    "
                                >
                                    <img
                                        :src="image.image_url"
                                        :alt="`Thumbnail ${index + 1}`"
                                        class="sidebar-thumb-image"
                                    />

                                    <!-- Active indicator -->
                                    <div
                                        v-if="galleryIndex === index"
                                        class="active-indicator"
                                        :style="{ backgroundColor: primaryColor }"
                                    >
                                        <Check :size="20" class="text-white" />
                                    </div>

                                    <!-- Image number -->
                                    <div class="sidebar-thumb-number">
                                        {{ index + 1 }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Thumbnails Strip (Mobile) -->
                    <div class="mobile-thumbnails" @click.stop>
                        <div class="mobile-thumbnails-scroll">
                            <div
                                v-for="(image, index) in images"
                                :key="'mobile-thumb-' + index"
                                @click.stop="selectImage(index)"
                                class="mobile-thumb"
                                :class="{ active: galleryIndex === index }"
                                :style="
                                    galleryIndex === index
                                        ? { borderColor: primaryColor, transform: 'scale(1.1)' }
                                        : {}
                                "
                            >
                                <img
                                    :src="image.image_url"
                                    :alt="`Thumbnail ${index + 1}`"
                                    class="mobile-thumb-image"
                                />
                                <div
                                    v-if="galleryIndex === index"
                                    class="mobile-thumb-active"
                                    :style="{ backgroundColor: primaryColor }"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <!-- Keyboard shortcuts hint -->
                    <div class="keyboard-hints">
                        <span><kbd>←</kbd> <kbd>→</kbd> Navegar</span>
                        <span><kbd>ESC</kbd> Cerrar</span>
                        <span><kbd>Z</kbd> Zoom</span>
                    </div>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import {
    ChevronLeft,
    ChevronRight,
    X,
    Check,
    Image,
    ZoomIn,
    ZoomOut,
    Download,
    ArrowLeft,
    Share2,
    Plus,
    Camera,
    Maximize2,
    Eye,
} from 'lucide-vue-next';

const props = defineProps({
    images: {
        type: Array,
        required: true,
        default: () => [],
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

const galleryIndex = ref(0);
const isGalleryOpen = ref(false);
const isZoomed = ref(false);

// Imagen principal (primera imagen)
const mainImage = computed(() => {
    if (!props.images || props.images.length === 0) {
        return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
    }
    return props.images[0]?.image_url;
});

// Mostrar 4 thumbnails (índices 1-4)
const displayThumbnails = computed(() => {
    if (props.images.length <= 1) return [];
    return props.images.slice(1, 5);
});

// Abrir vista de galería
const openGalleryView = index => {
    galleryIndex.value = index;
    isGalleryOpen.value = true;
    isZoomed.value = false;
    document.body.style.overflow = 'hidden';
};

// Cerrar vista de galería
const closeGalleryView = () => {
    isGalleryOpen.value = false;
    isZoomed.value = false;
    document.body.style.overflow = '';
};

// Seleccionar imagen
const selectImage = index => {
    galleryIndex.value = index;
    isZoomed.value = false;
};

// Navegación de galería
const prevGalleryImage = () => {
    if (galleryIndex.value > 0) {
        galleryIndex.value--;
    } else {
        galleryIndex.value = props.images.length - 1;
    }
    isZoomed.value = false;
};

const nextGalleryImage = () => {
    if (galleryIndex.value < props.images.length - 1) {
        galleryIndex.value++;
    } else {
        galleryIndex.value = 0;
    }
    isZoomed.value = false;
};

// Toggle zoom
const toggleZoom = () => {
    isZoomed.value = !isZoomed.value;
};

// Descargar imagen
const downloadImage = () => {
    const link = document.createElement('a');
    link.href = props.images[galleryIndex.value]?.image_url;
    link.download = `${props.title}-${galleryIndex.value + 1}.jpg`;
    link.target = '_blank';
    link.click();
};

// Compartir imagen
const shareImage = async () => {
    const imageUrl = props.images[galleryIndex.value]?.image_url;

    if (navigator.share) {
        try {
            await navigator.share({
                title: props.title,
                text: `Mira esta propiedad: ${props.title}`,
                url: window.location.href,
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.log('Error al compartir:', err);
                copyToClipboard(window.location.href);
            }
        }
    } else {
        copyToClipboard(window.location.href);
    }
};

const copyToClipboard = text => {
    navigator.clipboard.writeText(text);
    // Podrías usar un toast notification aquí
    alert('Enlace copiado al portapapeles');
};

// Soporte para teclas del teclado
const handleKeydown = e => {
    if (!isGalleryOpen.value) return;

    if (e.key === 'Escape') closeGalleryView();
    if (e.key === 'ArrowLeft') prevGalleryImage();
    if (e.key === 'ArrowRight') nextGalleryImage();
    if (e.key === 'z' || e.key === 'Z') toggleZoom();
};

// Agregar event listener
if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown);
}

// Limpiar al desmontar
onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeydown);
    }
    document.body.style.overflow = '';
});
</script>

<style scoped>
/* Images Section */
.property-images-section {
    margin-bottom: 2rem;
}

.images-wrapper {
    border-radius: 1rem;
    overflow: hidden;
}

.images-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
}

@media (min-width: 768px) {
    .images-grid {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 0.75rem;
    }
}

/* Main Image Container */
.main-image-container {
    position: relative;
    overflow: hidden;
    background-color: #f3f4f6;
    border-radius: 1rem;
    height: 24rem;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

@media (min-width: 768px) {
    .main-image-container {
        grid-column: span 2;
        grid-row: span 2;
        height: 500px;
    }
}

.main-image-container:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-image-container:hover .main-image {
    transform: scale(1.05);
}

.image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.main-image-container:hover .image-overlay {
    opacity: 1;
}

/* Buttons and Badges */
.view-all-button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(12px);
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
    z-index: 10;
}

.view-all-button:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 8px 12px -2px rgba(0, 0, 0, 0.3);
}

.counter-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(12px);
    color: white;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.zoom-hint {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.875rem;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(12px);
    color: white;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.main-image-container:hover .zoom-hint {
    opacity: 1;
}

/* Thumbnails */
.thumbnail-container {
    position: relative;
    overflow: hidden;
    background-color: #f3f4f6;
    border-radius: 0.75rem;
    height: 12rem;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

@media (min-width: 768px) {
    .thumbnail-container {
        height: 242px;
    }
}

.thumbnail-container:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.thumbnail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.thumbnail-container:hover .thumbnail-image {
    transform: scale(1.1);
}

.thumbnail-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.thumbnail-container:hover .thumbnail-overlay {
    opacity: 1;
}

.thumbnail-number {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    padding: 0.25rem 0.625rem;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    color: white;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 600;
}

.more-photos-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    color: white;
    text-align: center;
}

.more-number {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.more-text {
    font-size: 0.875rem;
    font-weight: 500;
}

/* Gallery Fullscreen */
.gallery-fullscreen {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
}

.gallery-fade-enter-active,
.gallery-fade-leave-active {
    transition: opacity 0.3s ease;
}

.gallery-fade-enter-from,
.gallery-fade-leave-to {
    opacity: 0;
}

/* Gallery Header */
.gallery-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    min-width: 0;
}

.close-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    background-color: #f3f4f6;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s ease;
}

.close-button:hover {
    background-color: #e5e7eb;
}

.header-info {
    flex: 1;
    min-width: 0;
}

.gallery-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.gallery-counter {
    font-size: 0.875rem;
    color: #6b7280;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.header-action-btn {
    padding: 0.625rem;
    background-color: #f3f4f6;
    border: none;
    border-radius: 0.5rem;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s ease;
}

.header-action-btn:hover {
    background-color: #e5e7eb;
    transform: scale(1.05);
}

.header-action-btn.close {
    color: #ef4444;
}

/* Gallery Content */
.gallery-content {
    display: flex;
    height: 100vh;
    padding-top: 5rem;
    padding-bottom: 6rem;
}

@media (min-width: 768px) {
    .gallery-content {
        padding-bottom: 0;
    }
}

.gallery-main {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb;
    padding: 2rem;
}

.main-image-wrapper {
    position: relative;
    max-width: 80rem;
    max-height: 100%;
    width: 100%;
}

.gallery-main-image {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: contain;
    border-radius: 0.75rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: zoom-in;
}

.gallery-main-image.zoomed {
    transform: scale(1.5);
    cursor: zoom-out;
}

/* Navigation Arrows */
.nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    padding: 1rem;
    background-color: white;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
}

.nav-arrow:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

.nav-arrow-left {
    left: 1rem;
}

.nav-arrow-right {
    right: 1rem;
}

/* Zoom Controls */
.zoom-controls {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
}

.zoom-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(12px);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
}

.zoom-button:hover {
    background: rgba(0, 0, 0, 0.9);
}

.image-info-overlay {
    position: absolute;
    top: 1rem;
    left: 1rem;
}

.info-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(12px);
    color: white;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
}

/* Sidebar */
.gallery-sidebar {
    display: none;
    width: 20rem;
    background-color: white;
    border-left: 1px solid #e5e7eb;
    overflow-y: auto;
}

@media (min-width: 768px) {
    .gallery-sidebar {
        display: block;
    }
}

.sidebar-header {
    position: sticky;
    top: 0;
    padding: 1rem;
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
    z-index: 10;
}

.sidebar-header h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.sidebar-thumbnails {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.sidebar-thumb {
    position: relative;
    aspect-ratio: 16 / 9;
    border-radius: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s ease;
}

.sidebar-thumb:hover {
    border-color: #d1d5db;
}

.sidebar-thumb.active {
    border-width: 3px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.sidebar-thumb-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.active-indicator {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
}

.sidebar-thumb-number {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    padding: 0.25rem 0.5rem;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(8px);
    color: white;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
}

/* Mobile Thumbnails */
.mobile-thumbnails {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    border-top: 1px solid #e5e7eb;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    padding: 0.75rem;
}

@media (min-width: 768px) {
    .mobile-thumbnails {
        display: none;
    }
}

.mobile-thumbnails-scroll {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.mobile-thumbnails-scroll::-webkit-scrollbar {
    display: none;
}

.mobile-thumb {
    position: relative;
    flex-shrink: 0;
    width: 5rem;
    height: 5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;
}

.mobile-thumb.active {
    border-width: 3px;
}

.mobile-thumb-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.mobile-thumb:not(.active) .mobile-thumb-image {
    opacity: 0.6;
}

.mobile-thumb-active {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.25rem;
}

/* Keyboard Hints */
.keyboard-hints {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    align-items: center;
    gap: 1.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(12px);
    color: white;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}

@media (min-width: 1024px) {
    .keyboard-hints {
        display: flex;
    }
}

kbd {
    padding: 0.25rem 0.5rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.75rem;
}
</style>
