<template>
    <!-- Backdrop con animación -->
    <transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
            @click.self="handleClose"
        >
            <!-- Modal Container con animación -->
            <transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="scale-95 translate-y-4 opacity-0"
                enter-to-class="scale-100 translate-y-0 opacity-100"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
            >
                <div
                    class="relative w-full max-w-6xl max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    @click.stop
                >
                    <!-- Header Sticky con degradado -->
                    <div
                        class="sticky top-0 z-20 border-b shadow-sm bg-gradient-to-r from-white to-gray-50"
                    >
                        <div class="flex items-center justify-between p-4 md:p-6">
                            <div class="flex-1 pr-4">
                                <h3
                                    class="text-xl font-bold text-gray-800 md:text-2xl line-clamp-1"
                                >
                                    {{ property.descripcion_corta }}
                                </h3>
                                <p
                                    v-if="property.location"
                                    class="flex items-center mt-1 text-sm text-gray-600"
                                >
                                    <MapPin :size="14" class="mr-1" />
                                    {{ property.location?.ciudad }}, {{ property.location?.zona }}
                                </p>
                            </div>

                            <!-- Botones de acción del header -->
                            <div class="flex items-center gap-2">
                                <!-- Compartir rápido -->
                                <button
                                    @click="showShareMenu = !showShareMenu"
                                    class="relative p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100"
                                    title="Compartir"
                                >
                                    <Share2 :size="20" />

                                    <!-- Mini menú compartir -->
                                    <div
                                        v-if="showShareMenu"
                                        class="absolute right-0 z-30 p-2 mt-2 bg-white border rounded-lg shadow-xl top-full w-36"
                                        @click.stop
                                    >
                                        <button
                                            @click="shareWhatsApp"
                                            class="flex items-center w-full px-3 py-2 text-sm text-left transition-colors rounded hover:bg-green-50"
                                        >
                                            <MessageCircle :size="16" class="mr-2 text-green-600" />
                                            WhatsApp
                                        </button>
                                        <button
                                            @click="copyLink"
                                            class="flex items-center w-full px-3 py-2 text-sm text-left transition-colors rounded hover:bg-gray-50"
                                        >
                                            <LinkIcon :size="16" class="mr-2 text-gray-600" />
                                            Copiar link
                                        </button>
                                    </div>
                                </button>

                                <!-- Favorito -->
                                <button
                                    @click="toggleFavorite"
                                    class="p-2 transition-colors rounded-full hover:bg-gray-100"
                                    :class="isFavorite ? 'text-red-500' : 'text-gray-500'"
                                    title="Agregar a favoritos"
                                >
                                    <Heart
                                        :size="20"
                                        :fill="isFavorite ? 'currentColor' : 'none'"
                                    />
                                </button>

                                <!-- Cerrar -->
                                <button
                                    @click="handleClose"
                                    class="p-2 text-gray-500 transition-all rounded-full hover:bg-gray-100 hover:text-gray-700 hover:rotate-90"
                                >
                                    <X :size="24" />
                                </button>
                            </div>
                        </div>

                        <!-- Progress bar mientras carga -->
                        <div v-if="loading" class="h-1 overflow-hidden bg-gray-200">
                            <div class="h-full bg-blue-500 animate-progress"></div>
                        </div>
                    </div>

                    <!-- Modal Content Scrollable -->
                    <div class="flex-1 overflow-y-auto">
                        <!-- Loading State -->
                        <div v-if="loading" class="flex flex-col items-center justify-center h-96">
                            <Loader2
                                :size="48"
                                class="mb-4 animate-spin"
                                :style="{ color: primaryColor }"
                            />
                            <p class="text-gray-500">Cargando detalles de la propiedad...</p>
                        </div>

                        <!-- Error State -->
                        <div
                            v-else-if="error"
                            class="relative px-6 py-4 m-6 border-l-4 border-red-500 rounded-r-lg bg-red-50"
                        >
                            <div class="flex items-start">
                                <AlertCircle
                                    :size="24"
                                    class="mr-3 text-red-600 flex-shrink-0 mt-0.5"
                                />
                                <div class="flex-1">
                                    <strong class="block font-bold text-red-800"
                                        >Error al cargar</strong
                                    >
                                    <span class="block mt-1 text-sm text-red-700">{{ error }}</span>
                                    <button
                                        @click="$emit('retry')"
                                        class="flex items-center mt-3 text-sm font-medium text-red-800 hover:text-red-900"
                                    >
                                        <RotateCcw :size="16" class="mr-1" />
                                        Intentar nuevamente
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Property Details -->
                        <div v-else-if="property.id" class="p-4 md:p-6">
                            <!-- Property Images Gallery -->
                            <PropertyImages
                                :images="property.images"
                                :title="property.descripcion_corta"
                                :primary-color="primaryColor"
                                class="mb-6"
                            />

                            <!-- Price destacado -->
                            <div
                                class="p-6 mb-6 rounded-xl"
                                :style="{ backgroundColor: primaryColor + '10' }"
                            >
                                <div
                                    class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
                                >
                                    <div>
                                        <p class="mb-1 text-sm font-medium text-gray-600">Precio</p>
                                        <h2
                                            class="text-4xl font-bold"
                                            :style="{ color: primaryColor }"
                                        >
                                            {{ formatPrice(property.price?.precio) }}
                                        </h2>
                                    </div>
                                    <div class="flex gap-2">
                                        <span
                                            class="px-4 py-2 text-sm font-bold text-white rounded-full"
                                            :style="{ backgroundColor: primaryColor }"
                                        >
                                            {{ property.type?.nombre }}
                                        </span>
                                        <span
                                            class="px-4 py-2 text-sm font-bold text-white bg-green-600 rounded-full"
                                        >
                                            {{ property.operation?.nombre }}
                                        </span>
                                        <span
                                            v-if="property.seo?.destacada"
                                            class="flex items-center px-4 py-2 text-sm font-bold text-white bg-yellow-600 rounded-full"
                                        >
                                            <Star :size="16" class="mr-1" />
                                            Destacada
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Tabs de navegación -->
                            <div class="mb-6 border-b">
                                <div class="flex gap-1 overflow-x-auto">
                                    <button
                                        v-for="tab in tabs"
                                        :key="tab.id"
                                        @click="activeTab = tab.id"
                                        class="flex items-center px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap"
                                        :class="
                                            activeTab === tab.id
                                                ? 'border-b-2 text-blue-600'
                                                : 'text-gray-600 hover:text-gray-800'
                                        "
                                        :style="
                                            activeTab === tab.id
                                                ? { borderColor: primaryColor, color: primaryColor }
                                                : {}
                                        "
                                    >
                                        <component :is="tab.icon" :size="18" class="mr-2" />
                                        {{ tab.label }}
                                    </button>
                                </div>
                            </div>

                            <!-- Tab Content -->
                            <div class="mb-6">
                                <!-- Detalles -->
                                <div v-show="activeTab === 'details'">
                                    <PropertyDetails
                                        :property="property"
                                        :primary-color="primaryColor"
                                    />
                                </div>

                                <!-- Contacto -->
                                <div v-show="activeTab === 'contact'" class="max-w-2xl mx-auto">
                                    <ContactForm
                                        :agent-email="'agente@inmobiliaria.com'"
                                        :primary-color="primaryColor"
                                        :property-id="property.id"
                                        @submit="handleContactSubmit"
                                    />
                                </div>

                                <!-- Ubicación -->
                                <div v-show="activeTab === 'location'">
                                    <PropertyLocation
                                        :location="property.location"
                                        :primary-color="primaryColor"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Sticky con CTA -->
                    <div class="sticky bottom-0 z-20 p-4 bg-white border-t shadow-lg md:p-6">
                        <div
                            class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                        >
                            <div class="flex items-center gap-4">
                                <div class="flex items-center gap-2 text-sm text-gray-600">
                                    <Eye :size="18" />
                                    <span>{{ property.views || 0 }} vistas</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock :size="18" />
                                    <span
                                        >Publicado hace {{ getTimeAgo(property.created_at) }}</span
                                    >
                                </div>
                            </div>
                            <div class="flex gap-3">
                                <button
                                    @click="handleWhatsAppContact"
                                    class="flex items-center justify-center flex-1 px-6 py-3 font-bold text-white transition-all bg-green-600 rounded-lg shadow-md md:flex-initial hover:bg-green-700 hover:shadow-lg hover:scale-105"
                                >
                                    <Phone :size="20" class="mr-2" />
                                    Contactar por WhatsApp
                                </button>
                                <button
                                    @click="activeTab = 'contact'"
                                    class="flex items-center justify-center flex-1 px-6 py-3 font-bold text-white transition-all rounded-lg shadow-md md:flex-initial hover:shadow-lg hover:scale-105"
                                    :style="{ backgroundColor: primaryColor }"
                                >
                                    <Send :size="20" class="mr-2" />
                                    Enviar Mensaje
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
    X,
    Loader2,
    AlertCircle,
    MapPin,
    Share2,
    Heart,
    Star,
    Eye,
    Clock,
    Phone,
    Send,
    RotateCcw,
    MessageCircle,
    LinkIcon,
    FileText,
    MapPinned,
    MessageSquare,
} from 'lucide-vue-next';
import PropertyImages from './PropertyImages.vue';
import PropertyDetails from './PropertyDetails.vue';
import ContactForm from './ContactForm.vue';
import PropertyLocation from './PropertyLocation.vue';

const props = defineProps({
    property: {
        type: Object,
        required: true,
    },
    loading: Boolean,
    error: String,
    primaryColor: {
        type: String,
        default: '#3B82F6',
    },
});

const emit = defineEmits(['close', 'submit-form', 'retry']);

const activeTab = ref('details');
const showShareMenu = ref(false);
const isFavorite = ref(false);

const tabs = [
    { id: 'details', label: 'Detalles', icon: FileText },
    { id: 'location', label: 'Ubicación', icon: MapPinned },
    { id: 'contact', label: 'Contacto', icon: MessageSquare },
];

const handleClose = () => {
    emit('close');
};

const handleContactSubmit = formData => {
    emit('submit-form', { ...formData, property_id: props.property.id });
};

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
    // Aquí puedes agregar lógica para guardar en favoritos
};

const shareWhatsApp = () => {
    const url = window.location.href;
    const text = `¡Mira esta propiedad! ${props.property.descripcion_corta}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    showShareMenu.value = false;
};

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        alert('¡Enlace copiado al portapapeles!');
    } catch (err) {
        console.error('Error al copiar:', err);
    }
    showShareMenu.value = false;
};

const handleWhatsAppContact = () => {
    const message = `Hola, estoy interesado en la propiedad: ${props.property.descripcion_corta}`;
    const phone = '59176543210'; // Número de contacto
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
};

const formatPrice = price => {
    if (!price) return '';
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

const getTimeAgo = date => {
    if (!date) return 'recientemente';
    const now = new Date();
    const past = new Date(date);
    const diffTime = Math.abs(now - past);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'hoy';
    if (diffDays === 1) return 'ayer';
    if (diffDays < 30) return `${diffDays} días`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses`;
    return `${Math.floor(diffDays / 365)} años`;
};

// Cerrar menú de compartir al hacer click fuera
const handleClickOutside = e => {
    if (showShareMenu.value && !e.target.closest('.share-menu')) {
        showShareMenu.value = false;
    }
};

if (typeof window !== 'undefined') {
    window.addEventListener('click', handleClickOutside);
}
</script>

<style scoped>
/* Animación de progreso */
@keyframes progress {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(400%);
    }
}

.animate-progress {
    animation: progress 1.5s ease-in-out infinite;
}

/* Scrollbar personalizado */
.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
