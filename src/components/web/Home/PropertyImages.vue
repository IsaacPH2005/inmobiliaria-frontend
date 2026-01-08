<template>
    <div class="property-images-section">
        <!-- Main Image Grid Layout - Mobile First -->
        <div class="images-wrapper">
            <div class="images-grid">
                <!-- Imagen Principal -->
                <div class="main-image-container" @click="openGalleryView(0)">
                    <img
                        :src="mainImage"
                        :alt="displayTitle"
                        class="main-image"
                        loading="eager"
                        decoding="async"
                    />

                    <!-- Ver todas las fotos button -->
                    <button @click.stop="openGalleryView(0)" class="view-all-button">
                        <Image :size="16" />
                        <span class="hidden xs:inline">Ver todas</span>
                        <span>{{ images.length }}</span>
                    </button>

                    <!-- Image counter badge -->
                    <div class="counter-badge">
                        <Camera :size="14" />
                        <span class="text-xs">1/{{ images.length }}</span>
                    </div>
                </div>

                <!-- Thumbnails Grid -->
                <div
                    v-for="(image, index) in displayThumbnails"
                    :key="index"
                    class="thumbnail-container"
                    @click="openGalleryView(index + 1)"
                >
                    <img
                        :src="image.image_url"
                        :alt="`${displayTitle} - Imagen ${index + 2}`"
                        class="thumbnail-image"
                        loading="lazy"
                        decoding="async"
                    />

                    <!-- Image number badge -->
                    <div class="thumbnail-number">{{ index + 2 }}</div>

                    <!-- Overlay "Ver más" -->
                    <div v-if="index === 3 && images.length > 5" class="more-photos-overlay">
                        <Plus :size="28" class="mb-1" />
                        <span class="more-number">+{{ images.length - 5 }}</span>
                        <span class="more-text">más fotos</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Gallery View (Fullscreen) -->
        <div v-if="isGalleryOpen" class="gallery-fullscreen">
            <!-- Header -->
            <div class="gallery-header">
                <div class="header-left">
                    <button @click="closeGalleryView" class="close-button">
                        <ArrowLeft :size="18" />
                        <span class="hidden sm:inline">Volver</span>
                    </button>
                    <div class="header-info">
                        <h2 class="gallery-title">{{ displayTitle }}</h2>
                        <p class="gallery-counter">{{ galleryIndex + 1 }} / {{ images.length }}</p>
                    </div>
                </div>

                <div class="header-actions">
                    <!-- Download button -->
                    <button
                        @click="downloadImage"
                        class="header-action-btn"
                        :disabled="isDownloading"
                        aria-label="Descargar"
                    >
                        <Download v-if="!isDownloading" :size="18" />
                        <div v-else class="spinner-small"></div>
                    </button>

                    <!-- Share button -->
                    <button @click="shareImage" class="header-action-btn" aria-label="Compartir">
                        <Share2 :size="18" />
                    </button>

                    <!-- Close button -->
                    <button
                        @click="closeGalleryView"
                        class="header-action-btn close"
                        aria-label="Cerrar"
                    >
                        <X :size="20" />
                    </button>
                </div>
            </div>

            <!-- Main Gallery Content -->
            <div class="gallery-content">
                <div class="gallery-main">
                    <!-- Navigation Arrows -->
                    <button
                        v-if="images.length > 1"
                        @click="prevGalleryImage"
                        class="nav-arrow nav-arrow-left"
                        :style="{ backgroundColor: primaryColor }"
                        aria-label="Anterior"
                    >
                        <ChevronLeft :size="24" class="text-white" />
                    </button>

                    <!-- Main Image -->
                    <div class="main-image-wrapper">
                        <img
                            :src="currentImage"
                            :alt="`${displayTitle} - Imagen ${galleryIndex + 1}`"
                            class="gallery-main-image"
                            @click="toggleZoom"
                        />

                        <!-- Image info overlay -->
                        <div class="image-info-overlay">
                            <div class="info-badge">
                                <Eye :size="14" />
                                <span class="text-xs"
                                    >{{ galleryIndex + 1 }}/{{ images.length }}</span
                                >
                            </div>
                        </div>
                    </div>

                    <button
                        v-if="images.length > 1"
                        @click="nextGalleryImage"
                        class="nav-arrow nav-arrow-right"
                        :style="{ backgroundColor: primaryColor }"
                        aria-label="Siguiente"
                    >
                        <ChevronRight :size="24" class="text-white" />
                    </button>
                </div>

                <!-- Sidebar (Desktop only) -->
                <div class="gallery-sidebar">
                    <div class="sidebar-header">
                        <h3>Todas las fotos</h3>
                        <p class="text-xs text-gray-500">{{ images.length }} imágenes</p>
                    </div>
                    <div class="sidebar-thumbnails">
                        <div
                            v-for="(image, index) in images"
                            :key="'gallery-thumb-' + index"
                            @click="selectImage(index)"
                            class="sidebar-thumb"
                            :class="{ active: galleryIndex === index }"
                            :style="galleryIndex === index ? { borderColor: primaryColor } : {}"
                        >
                            <img
                                :src="image.image_url"
                                :alt="`Thumbnail ${index + 1}`"
                                class="sidebar-thumb-image"
                                loading="lazy"
                            />

                            <div
                                v-if="galleryIndex === index"
                                class="active-indicator"
                                :style="{ backgroundColor: primaryColor }"
                            >
                                <Check :size="18" class="text-white" />
                            </div>

                            <div class="sidebar-thumb-number">{{ index + 1 }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Thumbnails (Mobile Only) -->
            <div class="mobile-thumbnails">
                <div class="mobile-thumbnails-scroll" ref="mobileThumbnailsRef">
                    <div
                        v-for="(image, index) in images"
                        :key="'mobile-thumb-' + index"
                        @click="selectImage(index)"
                        class="mobile-thumb"
                        :class="{ active: galleryIndex === index }"
                        :style="galleryIndex === index ? { borderColor: primaryColor } : {}"
                    >
                        <img
                            :src="image.image_url"
                            :alt="`Thumbnail ${index + 1}`"
                            class="mobile-thumb-image"
                            loading="lazy"
                        />
                        <div
                            v-if="galleryIndex === index"
                            class="mobile-thumb-active"
                            :style="{ backgroundColor: primaryColor }"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onUnmounted, onMounted } from 'vue';
import {
    ChevronLeft,
    ChevronRight,
    X,
    Check,
    Image,
    ArrowLeft,
    Share2,
    Plus,
    Camera,
    Eye,
    Download,
} from 'lucide-vue-next';
import { downloadPropertyImage, downloadImageByUrl } from '@/services/PropertiesService';

const props = defineProps({
    images: {
        type: Array,
        required: true,
        default: () => [],
    },
    title: {
        type: String,
        required: false,
        default: 'Propiedad',
    },
    primaryColor: {
        type: String,
        default: '#3B82F6',
    },
    propertyId: {
        type: Number,
        required: false,
        default: null,
    },
});

const galleryIndex = ref(0);
const isGalleryOpen = ref(false);
const isZoomed = ref(false);
const isDownloading = ref(false);
const mobileThumbnailsRef = ref(null);

const displayTitle = computed(() => {
    return props.title || 'Propiedad';
});

const mainImage = computed(() => {
    if (!props.images || props.images.length === 0) {
        return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80';
    }
    return props.images[0]?.image_url;
});

const displayThumbnails = computed(() => {
    if (props.images.length <= 1) return [];
    return props.images.slice(1, 5);
});

const currentImage = computed(() => {
    return props.images[galleryIndex.value]?.image_url;
});

const openGalleryView = index => {
    galleryIndex.value = index;
    isGalleryOpen.value = true;
    isZoomed.value = false;
    document.body.style.overflow = 'hidden';
};

const closeGalleryView = () => {
    isGalleryOpen.value = false;
    isZoomed.value = false;
    document.body.style.overflow = '';
};

const selectImage = index => {
    galleryIndex.value = index;
    isZoomed.value = false;

    if (mobileThumbnailsRef.value) {
        const thumb = mobileThumbnailsRef.value.children[index];
        if (thumb) {
            thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }
};

const prevGalleryImage = () => {
    if (galleryIndex.value > 0) {
        galleryIndex.value--;
    } else {
        galleryIndex.value = props.images.length - 1;
    }
    isZoomed.value = false;
    selectImage(galleryIndex.value);
};

const nextGalleryImage = () => {
    if (galleryIndex.value < props.images.length - 1) {
        galleryIndex.value++;
    } else {
        galleryIndex.value = 0;
    }
    isZoomed.value = false;
    selectImage(galleryIndex.value);
};

const toggleZoom = () => {
    isZoomed.value = !isZoomed.value;
};

// Función helper para descargar desde blob
const downloadFileFromBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }, 100);
};

// Función de descarga usando el servicio
const downloadImage = async () => {
    if (isDownloading.value) return;

    const currentImageData = props.images[galleryIndex.value];
    const imageId = currentImageData?.id;
    const imageUrl = currentImageData?.image_url;
    const fileName = `${displayTitle.value.replace(/\s+/g, '_')}_${galleryIndex.value + 1}.jpg`;

    isDownloading.value = true;

    try {
        // Método 1: Si tenemos propertyId e imageId, usar endpoint del backend
        if (props.propertyId && imageId) {
            console.log('Descargando con backend:', props.propertyId, imageId);
            const response = await downloadPropertyImage(props.propertyId, imageId);
            downloadFileFromBlob(response.data, fileName);
            console.log('✅ Descarga completada:', fileName);
        }
        // Método 2: Si solo tenemos la URL, usar endpoint alternativo
        else if (imageUrl) {
            console.log('Descargando por URL:', imageUrl);
            const response = await downloadImageByUrl(imageUrl, fileName);
            downloadFileFromBlob(response.data, fileName);
            console.log('✅ Descarga completada:', fileName);
        }
        // Método 3: Fallback con fetch
        else {
            console.log('Usando método fallback con fetch');
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            downloadFileFromBlob(blob, fileName);
            console.log('✅ Descarga completada (fallback):', fileName);
        }
    } catch (error) {
        console.error('❌ Error al descargar:', error);

        // Fallback final: link directo
        try {
            console.log('Intentando descarga directa...');
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = fileName;
            link.target = '_blank';
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log('✅ Descarga directa iniciada');
        } catch (fallbackError) {
            console.error('❌ Error en fallback:', fallbackError);
            alert('No se pudo descargar la imagen. Intenta de nuevo.');
        }
    } finally {
        isDownloading.value = false;
    }
};

const shareImage = async () => {
    const imageUrl = props.images[galleryIndex.value]?.image_url;

    if (navigator.share) {
        try {
            await navigator.share({
                title: displayTitle.value,
                text: `Imagen ${galleryIndex.value + 1} de ${displayTitle.value}`,
                url: window.location.href,
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                copyToClipboard(imageUrl);
            }
        }
    } else {
        copyToClipboard(imageUrl);
    }
};

const copyToClipboard = text => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        alert('Enlace copiado');
    } catch (err) {
        console.error('Error copying:', err);
    }

    document.body.removeChild(textArea);
};

const handleKeydown = e => {
    if (!isGalleryOpen.value) return;

    if (e.key === 'Escape') closeGalleryView();
    if (e.key === 'ArrowLeft') prevGalleryImage();
    if (e.key === 'ArrowRight') nextGalleryImage();
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
});
</script>

<style scoped>
* {
    -webkit-tap-highlight-color: transparent;
}

.property-images-section {
    margin-bottom: 1rem;
}

@media (min-width: 640px) {
    .property-images-section {
        margin-bottom: 1.5rem;
    }
}

.images-wrapper {
    border-radius: 0.75rem;
    overflow: hidden;
}

.images-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
}

@media (min-width: 768px) {
    .images-grid {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 0.75rem;
    }
}

.main-image-container {
    position: relative;
    overflow: hidden;
    background-color: #f3f4f6;
    border-radius: 0.75rem;
    height: 16rem;
    cursor: pointer;
}

@media (min-width: 640px) {
    .main-image-container {
        height: 20rem;
    }
}

@media (min-width: 768px) {
    .main-image-container {
        grid-column: span 2;
        grid-row: span 2;
        height: 400px;
    }
}

.main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.view-all-button {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.625rem 0.875rem;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    border: none;
    border-radius: 0.625rem;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    z-index: 10;
    min-height: 44px;
}

.counter-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    border-radius: 9999px;
    font-weight: 600;
}

.thumbnail-container {
    position: relative;
    overflow: hidden;
    background-color: #f3f4f6;
    border-radius: 0.625rem;
    height: 10rem;
    cursor: pointer;
}

@media (min-width: 768px) {
    .thumbnail-container {
        height: 192px;
    }
}

.thumbnail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.thumbnail-number {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    padding: 0.25rem 0.5rem;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    border-radius: 0.375rem;
    font-size: 0.6875rem;
    font-weight: 600;
}

.more-photos-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.85);
    color: white;
}

.more-number {
    font-size: 1.5rem;
    font-weight: bold;
}

.more-text {
    font-size: 0.75rem;
}

.gallery-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
}

.gallery-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
    z-index: 10;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    min-width: 0;
}

.close-button {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    background-color: #f3f4f6;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    color: #374151;
    cursor: pointer;
    font-size: 0.875rem;
    min-height: 44px;
}

.header-info {
    flex: 1;
    min-width: 0;
}

.gallery-title {
    font-size: 0.875rem;
    font-weight: 700;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.gallery-counter {
    font-size: 0.75rem;
    color: #6b7280;
}

.header-actions {
    display: flex;
    gap: 0.375rem;
}

.header-action-btn {
    padding: 0.5rem;
    background-color: #f3f4f6;
    border: none;
    border-radius: 0.5rem;
    color: #374151;
    cursor: pointer;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.header-action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.header-action-btn.close {
    color: #ef4444;
}

/* Spinner para descarga */
.spinner-small {
    width: 18px;
    height: 18px;
    border: 2px solid #e5e7eb;
    border-top-color: #374151;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.gallery-content {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.gallery-main {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000000;
    padding: 1rem;
}

.main-image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-main-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
}

.nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    padding: 0.75rem;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    min-height: 48px;
    min-width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-arrow-left {
    left: 0.5rem;
}

.nav-arrow-right {
    right: 0.5rem;
}

.image-info-overlay {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
}

.info-badge {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    border-radius: 0.5rem;
    font-weight: 600;
}

.gallery-sidebar {
    display: none;
}

@media (min-width: 768px) {
    .gallery-sidebar {
        display: block;
        width: 18rem;
        background-color: white;
        border-left: 1px solid #e5e7eb;
        overflow-y: auto;
    }
}

.sidebar-header {
    padding: 1rem;
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
}

.sidebar-header h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
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
}

.sidebar-thumb.active {
    border-width: 3px;
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
    background: rgba(0, 0, 0, 0.85);
    color: white;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
}

.mobile-thumbnails {
    display: flex;
    background-color: white;
    border-top: 1px solid #e5e7eb;
    padding: 0.625rem;
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
    width: 100%;
}

.mobile-thumb {
    position: relative;
    flex-shrink: 0;
    width: 4rem;
    height: 4rem;
    border-radius: 0.5rem;
    overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer;
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

.hidden {
    display: none;
}

.text-xs {
    font-size: 0.75rem;
}

.text-white {
    color: white;
}

.text-gray-500 {
    color: #6b7280;
}

.mb-1 {
    margin-bottom: 0.25rem;
}

@media (min-width: 400px) {
    .xs\:inline {
        display: inline;
    }
}

@media (min-width: 640px) {
    .sm\:inline {
        display: inline;
    }
}
</style>
