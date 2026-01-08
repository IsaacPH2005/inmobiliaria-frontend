<template>
    <div class="property-detail-container">
        <!-- Loading State - Mobile First -->
        <div v-if="loading" class="loading-container">
            <div class="loading-content">
                <div class="loader-wrapper">
                    <Loader2 :size="48" class="animate-spin" :style="{ color: primaryColor }" />
                </div>
                <p class="loading-text">Cargando detalles...</p>
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-container">
            <div class="error-content">
                <div class="error-icon-wrapper">
                    <AlertCircle :size="48" class="error-icon" />
                </div>
                <h2 class="error-title">¡Ups! Algo salió mal</h2>
                <p class="error-message">{{ error }}</p>
                <div class="error-actions">
                    <button @click="fetchPropertyDetails" class="retry-button">
                        <RotateCcw :size="18" />
                        <span>Reintentar</span>
                    </button>
                    <button @click="goBack" class="back-link">
                        <ArrowLeft :size="14" />
                        <span>Volver</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Property Content -->
        <div v-else-if="property.id" class="property-content">
            <!-- Sticky Header -->
            <div v-show="showStickyHeader" class="sticky-header">
                <div class="header-content">
                    <button @click="goBack" class="back-button-header">
                        <ArrowLeft :size="18" />
                        <span class="hidden sm:inline">Volver</span>
                    </button>

                    <div class="header-info">
                        <h2 class="header-title">{{ property.descripcion_corta }}</h2>
                        <p class="header-price">{{ formatPrice(property.price?.precio) }}</p>
                    </div>

                    <div class="header-actions">
                        <button @click="handleShare" class="icon-button" aria-label="Compartir">
                            <Share2 :size="18" />
                        </button>
                        <button
                            @click="handleFavorite"
                            class="icon-button"
                            :class="{ 'favorite-active': isFavorite }"
                            aria-label="Guardar"
                        >
                            <Heart :size="18" :class="{ 'fill-current': isFavorite }" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Hero Section -->
            <div class="hero-section">
                <div class="container-wide">
                    <!-- Breadcrumb -->
                    <nav class="breadcrumb" aria-label="Breadcrumb">
                        <button @click="goBack" class="breadcrumb-link">
                            <Home :size="14" />
                            <span class="hidden xs:inline">Inicio</span>
                        </button>
                        <ChevronRight :size="14" class="breadcrumb-separator" />
                        <span class="truncate breadcrumb-current">{{ property.type?.nombre }}</span>
                        <ChevronRight :size="14" class="hidden breadcrumb-separator sm:inline" />
                        <span class="hidden breadcrumb-current sm:inline">{{
                            property.codigo_interno
                        }}</span>
                    </nav>

                    <!-- Title and Actions -->
                    <div class="hero-header">
                        <div class="hero-left">
                            <h1 class="hero-title">{{ property.descripcion_corta }}</h1>
                            <div class="hero-meta">
                                <span class="meta-item">
                                    <MapPin :size="14" />
                                    <span class="truncate">{{ formatLocation }}</span>
                                </span>
                                <span class="hidden meta-separator xs:inline">•</span>
                                <span class="hidden meta-item xs:flex">
                                    <Eye :size="14" />
                                    <span>{{ formatViews(property.seo?.visitas) }}</span>
                                </span>
                                <span class="hidden meta-separator sm:inline">•</span>
                                <span class="hidden meta-item sm:flex">
                                    <Clock :size="14" />
                                    <span>{{ getTimeAgo(property.created_at) }}</span>
                                </span>
                            </div>
                        </div>

                        <div class="hero-actions">
                            <button @click="handleShare" class="action-button secondary">
                                <Share2 :size="16" />
                                <span class="hidden md:inline">Compartir</span>
                            </button>
                            <button
                                @click="handleFavorite"
                                class="action-button secondary"
                                :class="{ 'favorite-active': isFavorite }"
                            >
                                <Heart :size="16" :class="{ 'fill-current': isFavorite }" />
                                <span class="hidden md:inline">{{
                                    isFavorite ? 'Guardado' : 'Guardar'
                                }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Images Gallery -->
            <div class="gallery-section">
                <div class="container-wide">
                    <PropertyImages
                        :images="property.images"
                        :title="property.nombre"
                        :property-id="property.id"
                        :primary-color="siteSettings.color_primario"
                    />
                </div>
            </div>

            <!-- Main Content -->
            <div class="main-content">
                <div class="container-wide">
                    <div class="content-grid">
                        <!-- Left Column -->
                        <div class="left-column">
                            <!-- Price Card -->
                            <div class="price-card">
                                <div class="price-header">
                                    <div class="price-info">
                                        <p class="price-label">Precio</p>
                                        <h2 class="price-amount" :style="{ color: primaryColor }">
                                            {{ formatPrice(property.price?.precio) }}
                                        </h2>
                                        <p
                                            v-if="property.price?.precio_por_m2"
                                            class="price-per-sqm"
                                        >
                                            {{ formatPrice(property.price.precio_por_m2) }}/m²
                                        </p>
                                    </div>
                                    <div class="badges">
                                        <span
                                            class="badge badge-primary"
                                            :style="{ backgroundColor: primaryColor }"
                                        >
                                            {{ property.type?.nombre }}
                                        </span>
                                        <span class="badge badge-success">
                                            {{ property.operation?.nombre }}
                                        </span>
                                        <span
                                            v-if="property.seo?.destacada"
                                            class="badge badge-warning"
                                        >
                                            <Star :size="12" class="fill-current" />
                                            <span>Destacada</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Tabs -->
                            <div class="tabs-container">
                                <div class="tabs" role="tablist">
                                    <button
                                        v-for="tab in tabs"
                                        :key="tab.id"
                                        @click="activeTab = tab.id"
                                        class="tab"
                                        :class="{ active: activeTab === tab.id }"
                                        :style="
                                            activeTab === tab.id
                                                ? {
                                                      borderBottomColor: primaryColor,
                                                      color: primaryColor,
                                                  }
                                                : {}
                                        "
                                        role="tab"
                                        :aria-selected="activeTab === tab.id"
                                    >
                                        <component :is="tab.icon" :size="16" />
                                        <span class="text-sm sm:text-base">{{ tab.label }}</span>
                                    </button>
                                </div>

                                <!-- Tab Content -->
                                <div class="tab-content" role="tabpanel">
                                    <div v-if="activeTab === 'details'" key="details">
                                        <PropertyDetails
                                            :property="property"
                                            :primary-color="primaryColor"
                                        />
                                    </div>

                                    <div v-else-if="activeTab === 'location'" key="location">
                                        <PropertyLocation
                                            :location="property.location"
                                            :primary-color="primaryColor"
                                        />
                                    </div>

                                    <div v-else-if="activeTab === 'contact'" key="contact">
                                        <ContactForm
                                            :agent-email="
                                                property.agent?.email || 'agente@inmobiliaria.com'
                                            "
                                            :primary-color="primaryColor"
                                            :property-id="property.id"
                                            :property-title="property.descripcion_corta"
                                            @submit="handleContactSubmit"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column -->
                        <div class="right-column">
                            <div class="sticky-sidebar">
                                <!-- Contact Card -->
                                <div class="contact-card">
                                    <h3 class="contact-card-title">¿Te interesa esta propiedad?</h3>

                                    <div class="quick-info">
                                        <div class="info-item">
                                            <span class="info-label">Código</span>
                                            <span class="info-value"
                                                >#{{ property.codigo_interno }}</span
                                            >
                                        </div>
                                        <div class="info-item">
                                            <span class="info-label">Estado</span>
                                            <span
                                                class="info-value status-badge"
                                                :class="
                                                    getStatusClass(property.status?.status?.nombre)
                                                "
                                            >
                                                {{
                                                    property.status?.status?.nombre || 'Disponible'
                                                }}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="contact-buttons">
                                        <button
                                            @click="handleWhatsAppContact"
                                            class="contact-button whatsapp"
                                        >
                                            <Phone :size="18" />
                                            <div class="button-content">
                                                <span class="button-label">WhatsApp</span>
                                                <span class="button-sublabel"
                                                    >Respuesta inmediata</span
                                                >
                                            </div>
                                            <ChevronRight :size="16" class="button-arrow" />
                                        </button>

                                        <button
                                            @click="
                                                activeTab = 'contact';
                                                scrollToTabs();
                                            "
                                            class="contact-button email"
                                            :style="{ backgroundColor: primaryColor }"
                                        >
                                            <Send :size="18" />
                                            <div class="button-content">
                                                <span class="button-label">Enviar mensaje</span>
                                                <span class="button-sublabel"
                                                    >Te responderemos pronto</span
                                                >
                                            </div>
                                            <ChevronRight :size="16" class="button-arrow" />
                                        </button>

                                        <button
                                            @click="handleCallRequest"
                                            class="contact-button call"
                                        >
                                            <PhoneCall :size="18" />
                                            <div class="button-content">
                                                <span class="button-label">Solicitar llamada</span>
                                                <span class="button-sublabel">Te contactamos</span>
                                            </div>
                                            <ChevronRight :size="16" class="button-arrow" />
                                        </button>
                                    </div>

                                    <!-- Agent Info -->
                                    <div v-if="property.agent" class="agent-info">
                                        <div class="agent-avatar">
                                            <User :size="20" />
                                        </div>
                                        <div class="agent-details">
                                            <p class="agent-name">
                                                {{ property.agent.name || 'Agente Inmobiliario' }}
                                            </p>
                                            <p class="agent-email">{{ property.agent.email }}</p>
                                        </div>
                                    </div>

                                    <!-- Security badge -->
                                    <div class="security-badge">
                                        <Shield :size="14" />
                                        <span>Información verificada</span>
                                    </div>
                                </div>

                                <!-- Features Summary Card -->
                                <div class="features-summary">
                                    <h3 class="summary-title">Características principales</h3>
                                    <div class="summary-grid">
                                        <div class="summary-item">
                                            <div
                                                class="summary-icon"
                                                :style="{
                                                    backgroundColor: primaryColor + '20',
                                                    color: primaryColor,
                                                }"
                                            >
                                                <Bed :size="18" />
                                            </div>
                                            <div class="summary-text">
                                                <span class="summary-value">{{
                                                    property.features?.habitaciones || 0
                                                }}</span>
                                                <span class="summary-label">Habitaciones</span>
                                            </div>
                                        </div>
                                        <div class="summary-item">
                                            <div
                                                class="summary-icon"
                                                :style="{
                                                    backgroundColor: primaryColor + '20',
                                                    color: primaryColor,
                                                }"
                                            >
                                                <Bath :size="18" />
                                            </div>
                                            <div class="summary-text">
                                                <span class="summary-value">{{
                                                    property.features?.baños || 0
                                                }}</span>
                                                <span class="summary-label">Baños</span>
                                            </div>
                                        </div>
                                        <div class="summary-item">
                                            <div
                                                class="summary-icon"
                                                :style="{
                                                    backgroundColor: primaryColor + '20',
                                                    color: primaryColor,
                                                }"
                                            >
                                                <Square :size="18" />
                                            </div>
                                            <div class="summary-text">
                                                <span class="summary-value">{{
                                                    property.features?.superficie_total || 0
                                                }}</span>
                                                <span class="summary-label">m²</span>
                                            </div>
                                        </div>
                                        <div class="summary-item">
                                            <div
                                                class="summary-icon"
                                                :style="{
                                                    backgroundColor: primaryColor + '20',
                                                    color: primaryColor,
                                                }"
                                            >
                                                <Car :size="18" />
                                            </div>
                                            <div class="summary-text">
                                                <span class="summary-value">{{
                                                    property.features?.estacionamientos || 0
                                                }}</span>
                                                <span class="summary-label">Parking</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Floating Action Buttons (Mobile Only) - POSICIÓN AJUSTADA -->
            <div class="floating-actions">
                <button
                    @click="handleWhatsAppContact"
                    class="fab fab-whatsapp"
                    aria-label="WhatsApp"
                >
                    <Phone :size="20" />
                </button>
                <button
                    @click="
                        activeTab = 'contact';
                        scrollToTabs();
                    "
                    class="fab fab-message"
                    :style="{ backgroundColor: primaryColor }"
                    aria-label="Mensaje"
                >
                    <Send :size="20" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getProperty } from '@/services/PropertiesService';
import { useSiteSettings } from '@/composables/useSiteSettings';
import {
    ArrowLeft,
    Loader2,
    AlertCircle,
    RotateCcw,
    MapPin,
    Star,
    Eye,
    Clock,
    Phone,
    Send,
    FileText,
    MapPinned,
    MessageSquare,
    Share2,
    Heart,
    Home,
    ChevronRight,
    User,
    Shield,
    Bed,
    Bath,
    Square,
    Car,
    PhoneCall,
} from 'lucide-vue-next';
import PropertyImages from '@/components/web/Home/PropertyImages.vue';
import PropertyDetails from '@/components/web/Home/PropertyDetails.vue';
import ContactForm from '@/components/web/Home/ContactForm.vue';
import PropertyLocation from '@/components/web/Home/PropertyLocation.vue';

const route = useRoute();
const router = useRouter();
const { siteSettings } = useSiteSettings();

const property = ref({});
const loading = ref(true);
const error = ref(null);
const activeTab = ref('details');
const showStickyHeader = ref(false);
const isFavorite = ref(false);

const primaryColor = siteSettings.color_primario || '#3B82F6';

const tabs = [
    { id: 'details', label: 'Detalles', icon: FileText },
    { id: 'location', label: 'Ubicación', icon: MapPinned },
    { id: 'contact', label: 'Contacto', icon: MessageSquare },
];

// Computed
const formatLocation = computed(() => {
    const loc = property.value.location;
    if (!loc) return 'Ubicación no disponible';

    const parts = [];
    if (loc.zona) parts.push(loc.zona);
    if (loc.ciudad) parts.push(loc.ciudad);

    return parts.join(', ');
});

// Debounce helper
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Methods
const fetchPropertyDetails = async () => {
    try {
        loading.value = true;
        error.value = null;
        const response = await getProperty(route.params.id);
        property.value = response.data;

        const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
        isFavorite.value = favorites.includes(property.value.id);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
        error.value =
            'No pudimos cargar los detalles de la propiedad. Por favor, intenta nuevamente.';
        console.error('Error fetching property details:', err);
    } finally {
        loading.value = false;
    }
};

const goBack = () => {
    router.push('/');
};

const handleContactSubmit = formData => {
    console.log('Form submitted:', formData);
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
};

const handleWhatsAppContact = () => {
    const message = `Hola, estoy interesado en la propiedad: ${property.value.descripcion_corta} (Código: ${property.value.codigo_interno})`;
    const phone = '59176543210';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
};

const handleCallRequest = () => {
    activeTab.value = 'contact';
    scrollToTabs();
};

const handleShare = async () => {
    const shareData = {
        title: property.value.descripcion_corta,
        text: `Mira esta propiedad: ${property.value.descripcion_corta}`,
        url: window.location.href,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            if (err.name !== 'AbortError') {
                copyToClipboard(window.location.href);
            }
        }
    } else {
        copyToClipboard(window.location.href);
    }
};

const handleFavorite = () => {
    isFavorite.value = !isFavorite.value;

    const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
    if (isFavorite.value) {
        favorites.push(property.value.id);
    } else {
        const index = favorites.indexOf(property.value.id);
        if (index > -1) favorites.splice(index, 1);
    }
    localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
};

const copyToClipboard = text => {
    // WebView-compatible fallback
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        alert('Enlace copiado al portapapeles');
    } catch (err) {
        alert('No se pudo copiar el enlace');
    }

    document.body.removeChild(textArea);
};

const scrollToTabs = () => {
    setTimeout(() => {
        const tabsElement = document.querySelector('.tabs-container');
        if (tabsElement) {
            const offset = 100;
            const elementPosition = tabsElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    }, 100);
};

const formatPrice = price => {
    if (!price) return 'Precio no disponible';
    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: property.value.price?.currency?.code || 'BOB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};

const formatViews = views => {
    if (!views) return '0';
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return views.toString();
};

const getTimeAgo = date => {
    if (!date) return 'recientemente';
    const now = new Date();
    const past = new Date(date);
    const diffTime = Math.abs(now - past);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'hoy';
    if (diffDays === 1) return 'ayer';
    if (diffDays < 30) return `hace ${diffDays} días`;
    if (diffDays < 365) return `hace ${Math.floor(diffDays / 30)} meses`;
    return `hace ${Math.floor(diffDays / 365)} años`;
};

const getStatusClass = status => {
    const statusMap = {
        Disponible: 'status-available',
        Vendida: 'status-sold',
        Alquilada: 'status-rented',
        Reservada: 'status-reserved',
    };
    return statusMap[status] || 'status-default';
};

const handleScroll = debounce(() => {
    showStickyHeader.value = window.scrollY > 400;
}, 100);

onMounted(() => {
    fetchPropertyDetails();
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Base - Mobile First */
* {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
}

/* Permitir selección en inputs y texto */
input,
textarea,
[contenteditable],
p,
span,
h1,
h2,
h3,
h4,
h5,
h6 {
    -webkit-user-select: text;
    user-select: text;
}

.property-detail-container {
    min-height: 100vh;
    background-color: #f9fafb;
}

/* Loading State */
.loading-container {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #667eea;
    z-index: 9999;
    padding: 1rem;
}

.loading-content {
    text-align: center;
}

.loader-wrapper {
    display: inline-block;
    margin-bottom: 1rem;
    color: white;
}

.loading-text {
    margin-top: 1rem;
    color: white;
    font-size: 1rem;
    font-weight: 600;
}

@media (min-width: 640px) {
    .loading-text {
        font-size: 1.25rem;
    }
}

.loading-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
}

.loading-dots span {
    width: 0.5rem;
    height: 0.5rem;
    background-color: white;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) {
    animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes bounce {
    0%,
    80%,
    100% {
        transform: scale(0);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Error State */
.error-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background-color: #f9fafb;
}

.error-content {
    text-align: center;
    max-width: 400px;
    width: 100%;
}

.error-icon-wrapper {
    display: inline-flex;
    padding: 1rem;
    background-color: #fee2e2;
    border-radius: 50%;
    margin-bottom: 1rem;
}

.error-icon {
    color: #ef4444;
}

.error-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.5rem;
}

.error-message {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.error-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.retry-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 2rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    min-height: 44px;
    transition: all 0.2s;
}

@media (hover: hover) {
    .retry-button:hover {
        background-color: #2563eb;
        transform: translateY(-1px);
    }
}

.retry-button:active {
    transform: scale(0.98);
}

.back-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    color: #6b7280;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.625rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    min-height: 44px;
    transition: all 0.2s;
}

@media (hover: hover) {
    .back-link:hover {
        color: #111827;
        background-color: #f3f4f6;
    }
}

/* Property Content */
.property-content {
    min-height: 100vh;
    padding-bottom: 6rem; /* Espacio extra para los botones flotantes */
}

/* Sticky Header */
.sticky-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40;
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0.75rem 1rem;
    gap: 0.75rem;
}

@media (min-width: 640px) {
    .header-content {
        padding: 0.875rem 1.5rem;
    }
}

.back-button-header {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    background-color: #f3f4f6;
    border: none;
    border-radius: 0.625rem;
    font-weight: 500;
    cursor: pointer;
    color: #374151;
    font-size: 0.875rem;
    min-height: 44px;
    transition: all 0.2s;
}

@media (hover: hover) {
    .back-button-header:hover {
        background-color: #e5e7eb;
    }
}

.header-info {
    flex: 1;
    min-width: 0;
}

.header-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.header-price {
    font-size: 0.75rem;
    color: #6b7280;
}

.header-actions {
    display: flex;
    gap: 0.375rem;
}

.icon-button {
    padding: 0.5rem;
    background-color: #f3f4f6;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    color: #374151;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

@media (hover: hover) {
    .icon-button:hover {
        background-color: #e5e7eb;
        transform: translateY(-1px);
    }
}

.icon-button.favorite-active {
    color: #ef4444;
}

/* Hero Section */
.hero-section {
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem 0;
}

@media (min-width: 640px) {
    .hero-section {
        padding: 1.5rem 0;
    }
}

.container-wide {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
}

@media (min-width: 640px) {
    .container-wide {
        padding: 0 1.5rem;
    }
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.breadcrumb-link {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: #6b7280;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: all 0.2s;
}

@media (hover: hover) {
    .breadcrumb-link:hover {
        background-color: #f3f4f6;
        color: #111827;
    }
}

.breadcrumb-separator {
    color: #d1d5db;
}

.breadcrumb-current {
    color: #111827;
    font-size: 0.875rem;
    font-weight: 500;
}

.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.hero-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
}

.hero-left {
    flex: 1;
    min-width: 0;
}

.hero-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.5rem;
}

@media (min-width: 640px) {
    .hero-title {
        font-size: 2rem;
    }
}

.hero-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    color: #6b7280;
    font-size: 0.875rem;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 0.375rem;
}

.meta-separator {
    color: #d1d5db;
}

.hero-actions {
    display: none;
}

@media (min-width: 768px) {
    .hero-actions {
        display: flex;
        gap: 0.75rem;
    }
}

.action-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    min-height: 44px;
    transition: all 0.2s;
}

.action-button.secondary {
    background-color: #f3f4f6;
    color: #374151;
}

@media (hover: hover) {
    .action-button.secondary:hover {
        background-color: #e5e7eb;
        transform: translateY(-1px);
    }
}

.action-button.favorite-active {
    color: #ef4444;
}

/* Gallery Section */
.gallery-section {
    background-color: white;
    padding: 1rem 0;
}

@media (min-width: 640px) {
    .gallery-section {
        padding: 1.5rem 0;
    }
}

/* Main Content */
.main-content {
    padding: 1rem 0 6rem 0; /* Bottom padding para botones flotantes */
}

@media (min-width: 640px) {
    .main-content {
        padding: 1.5rem 0 6rem 0;
    }
}

@media (min-width: 768px) {
    .main-content {
        padding: 1.5rem 0; /* En desktop no necesitamos el padding extra */
    }
}

.content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 1024px) {
    .content-grid {
        grid-template-columns: 1fr 380px;
        gap: 2rem;
    }
}

/* Left Column */
.left-column {
    min-width: 0;
}

/* Price Card */
.price-card {
    background-color: white;
    border-radius: 0.75rem;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
    border: 1px solid #e5e7eb;
}

@media (min-width: 640px) {
    .price-card {
        padding: 1.5rem;
    }
}

.price-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
}

.price-info {
    flex: 1;
}

.price-label {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
}

.price-amount {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
}

@media (min-width: 640px) {
    .price-amount {
        font-size: 2.25rem;
    }
}

.price-per-sqm {
    font-size: 0.875rem;
    color: #6b7280;
}

.badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
}

.badge-success {
    background-color: #10b981;
}

.badge-warning {
    background-color: #f59e0b;
}

/* Tabs */
.tabs-container {
    background-color: white;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
    overflow: hidden;
}

.tabs {
    display: flex;
    border-bottom: 1px solid #e5e7eb;
    overflow-x: auto;
    scrollbar-width: none;
}

.tabs::-webkit-scrollbar {
    display: none;
}

.tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    color: #6b7280;
    font-weight: 500;
    min-height: 56px;
    white-space: nowrap;
    transition: all 0.2s;
}

@media (hover: hover) {
    .tab:hover {
        background-color: #f9fafb;
    }
}

.tab.active {
    font-weight: 600;
}

.tab-content {
    padding: 1.25rem;
}

@media (min-width: 640px) {
    .tab-content {
        padding: 1.5rem;
    }
}

/* Right Column */
.right-column {
    min-width: 0;
}

.sticky-sidebar {
    position: sticky;
    top: 5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* Contact Card */
.contact-card {
    background-color: white;
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid #e5e7eb;
}

@media (min-width: 640px) {
    .contact-card {
        padding: 1.5rem;
    }
}

.contact-card-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1rem;
}

.quick-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info-label {
    font-size: 0.875rem;
    color: #6b7280;
}

.info-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: #111827;
}

.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
}

.status-available {
    background-color: #d1fae5;
    color: #065f46;
}

.status-sold {
    background-color: #fee2e2;
    color: #991b1b;
}

.status-rented {
    background-color: #dbeafe;
    color: #1e40af;
}

.status-reserved {
    background-color: #fef3c7;
    color: #92400e;
}

.status-default {
    background-color: #f3f4f6;
    color: #374151;
}

.contact-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
}

.contact-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    min-height: 56px;
    transition: all 0.2s;
}

.contact-button.whatsapp {
    background-color: #25d366;
    color: white;
}

@media (hover: hover) {
    .contact-button.whatsapp:hover {
        background-color: #20ba5a;
        transform: translateY(-1px);
    }
}

.contact-button.email {
    color: white;
}

.contact-button.call {
    background-color: #f3f4f6;
    color: #374151;
}

@media (hover: hover) {
    .contact-button.call:hover {
        background-color: #e5e7eb;
        transform: translateY(-1px);
    }
}

.button-content {
    flex: 1;
    text-align: left;
}

.button-label {
    display: block;
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 0.125rem;
}

.button-sublabel {
    display: block;
    font-size: 0.75rem;
    opacity: 0.8;
}

.button-arrow {
    opacity: 0.6;
}

/* Agent Info */
.agent-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.75rem;
    margin-bottom: 1rem;
}

.agent-avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    flex-shrink: 0;
}

.agent-details {
    flex: 1;
    min-width: 0;
}

.agent-name {
    font-weight: 600;
    color: #111827;
    font-size: 0.875rem;
    margin-bottom: 0.125rem;
}

.agent-email {
    font-size: 0.75rem;
    color: #6b7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Security Badge */
.security-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background-color: #f0fdf4;
    border-radius: 0.5rem;
    color: #15803d;
    font-size: 0.75rem;
    font-weight: 500;
}

/* Features Summary */
.features-summary {
    background-color: white;
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid #e5e7eb;
}

@media (min-width: 640px) {
    .features-summary {
        padding: 1.5rem;
    }
}

.summary-title {
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1rem;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.summary-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.summary-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.summary-text {
    flex: 1;
    min-width: 0;
}

.summary-value {
    display: block;
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
}

.summary-label {
    display: block;
    font-size: 0.75rem;
    color: #6b7280;
}

/* Floating Action Buttons - POSICIÓN AJUSTADA MÁS ARRIBA */
.floating-actions {
    position: fixed;
    bottom: 5.5rem; /* Aumentado de 1rem a 5.5rem para evitar choque con header */
    right: 1rem;
    z-index: 30;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

/* En caso de tener AdminLayout con header fijo en mobile */
@media (max-width: 1024px) {
    .floating-actions {
        bottom: 9.5rem; /* Espacio suficiente sobre el header móvil */
    }
}

@media (min-width: 768px) {
    .floating-actions {
        display: none;
    }
}

.fab {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fab:active {
    transform: scale(0.95);
}

@media (hover: hover) {
    .fab:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
}

.fab-whatsapp {
    background-color: #25d366;
}

@media (hover: hover) {
    .fab-whatsapp:hover {
        background-color: #20ba5a;
    }
}

/* Utility Classes */
.hidden {
    display: none;
}

@media (min-width: 400px) {
    .xs\:inline {
        display: inline;
    }
    .xs\:flex {
        display: flex;
    }
}

@media (min-width: 640px) {
    .sm\:inline {
        display: inline;
    }
    .sm\:flex {
        display: flex;
    }
}

@media (min-width: 768px) {
    .md\:inline {
        display: inline;
    }
}

.text-sm {
    font-size: 0.875rem;
}

.text-base {
    font-size: 1rem;
}

.fill-current {
    fill: currentColor;
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* Optimización WebView */
* {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Prevenir zoom en inputs en mobile */
@media screen and (max-width: 768px) {
    input,
    select,
    textarea {
        font-size: 16px !important;
    }
}

/* Smooth transitions */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
}
</style>
