<template>
    <div class="property-detail-container">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
            <div class="loading-content">
                <div class="loader-wrapper">
                    <Loader2 :size="64" class="animate-spin" :style="{ color: primaryColor }" />
                    <div class="loader-circle" :style="{ borderColor: primaryColor }"></div>
                </div>
                <p class="loading-text">Cargando detalles de la propiedad...</p>
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
                    <AlertCircle :size="64" class="error-icon" />
                </div>
                <h2 class="error-title">¡Ups! Algo salió mal</h2>
                <p class="error-message">{{ error }}</p>
                <div class="error-actions">
                    <button @click="fetchPropertyDetails" class="retry-button">
                        <RotateCcw :size="20" />
                        <span>Intentar nuevamente</span>
                    </button>
                    <button @click="goBack" class="back-link">
                        <ArrowLeft :size="16" />
                        <span>Volver al inicio</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Property Content -->
        <div v-else-if="property.id" class="property-content">
            <!-- Sticky Header -->
            <transition name="slide-down">
                <div v-show="showStickyHeader" class="sticky-header">
                    <div class="header-content">
                        <button @click="goBack" class="back-button-header">
                            <ArrowLeft :size="20" />
                            <span class="hidden md:inline">Volver</span>
                        </button>

                        <div class="header-info">
                            <h2 class="header-title">{{ property.descripcion_corta }}</h2>
                            <p class="header-price">{{ formatPrice(property.price?.precio) }}</p>
                        </div>

                        <div class="header-actions">
                            <button
                                @click="handleShare"
                                class="icon-button"
                                title="Compartir"
                                aria-label="Compartir propiedad"
                            >
                                <Share2 :size="20" />
                            </button>
                            <button
                                @click="handleFavorite"
                                class="icon-button"
                                :class="{ 'favorite-active': isFavorite }"
                                title="Guardar"
                                aria-label="Guardar en favoritos"
                            >
                                <Heart :size="20" :class="{ 'fill-current': isFavorite }" />
                            </button>
                        </div>
                    </div>
                </div>
            </transition>

            <!-- Hero Section -->
            <div class="hero-section">
                <div class="container-wide">
                    <!-- Breadcrumb -->
                    <nav class="breadcrumb" aria-label="Breadcrumb">
                        <button @click="goBack" class="breadcrumb-link">
                            <Home :size="16" />
                            <span>Inicio</span>
                        </button>
                        <ChevronRight :size="16" class="breadcrumb-separator" />
                        <span class="breadcrumb-current">{{ property.type?.nombre }}</span>
                        <ChevronRight :size="16" class="breadcrumb-separator" />
                        <span class="breadcrumb-current">{{ property.codigo_interno }}</span>
                    </nav>

                    <!-- Title and Actions -->
                    <div class="hero-header">
                        <div class="hero-left">
                            <h1 class="hero-title">{{ property.descripcion_corta }}</h1>
                            <div class="hero-meta">
                                <span class="meta-item">
                                    <MapPin :size="16" />
                                    <span>{{ formatLocation }}</span>
                                </span>
                                <span class="meta-separator">•</span>
                                <span class="meta-item">
                                    <Eye :size="16" />
                                    <span>{{ formatViews(property.seo?.visitas) }} visitas</span>
                                </span>
                                <span class="meta-separator">•</span>
                                <span class="meta-item">
                                    <Clock :size="16" />
                                    <span>{{ getTimeAgo(property.created_at) }}</span>
                                </span>
                            </div>
                        </div>

                        <div class="hero-actions">
                            <button @click="handleShare" class="action-button secondary">
                                <Share2 :size="18" />
                                <span>Compartir</span>
                            </button>
                            <button
                                @click="handleFavorite"
                                class="action-button secondary"
                                :class="{ 'favorite-active': isFavorite }"
                            >
                                <Heart :size="18" :class="{ 'fill-current': isFavorite }" />
                                <span>{{ isFavorite ? 'Guardado' : 'Guardar' }}</span>
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
                        :title="property.descripcion_corta"
                        :primary-color="primaryColor"
                    />
                </div>
            </div>

            <!-- Main Content -->
            <div class="main-content">
                <div class="container-wide">
                    <div class="content-grid">
                        <!-- Left Column - Property Details -->
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
                                            <Star :size="14" class="fill-current" />
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
                                        <component :is="tab.icon" :size="20" />
                                        <span>{{ tab.label }}</span>
                                    </button>
                                </div>

                                <!-- Tab Content -->
                                <div class="tab-content" role="tabpanel">
                                    <transition name="fade" mode="out-in">
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
                                                    property.agent?.email ||
                                                    'agente@inmobiliaria.com'
                                                "
                                                :primary-color="primaryColor"
                                                :property-id="property.id"
                                                :property-title="property.descripcion_corta"
                                                @submit="handleContactSubmit"
                                            />
                                        </div>
                                    </transition>
                                </div>
                            </div>
                        </div>

                        <!-- Right Column - Contact Card -->
                        <div class="right-column">
                            <div class="sticky-sidebar">
                                <!-- Contact Card -->
                                <div class="contact-card">
                                    <h3 class="contact-card-title">
                                        ¿Interesado en esta propiedad?
                                    </h3>

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
                                            <Phone :size="20" />
                                            <div class="button-content">
                                                <span class="button-label">WhatsApp</span>
                                                <span class="button-sublabel"
                                                    >Respuesta inmediata</span
                                                >
                                            </div>
                                            <ChevronRight :size="18" class="button-arrow" />
                                        </button>

                                        <button
                                            @click="
                                                activeTab = 'contact';
                                                scrollToTabs();
                                            "
                                            class="contact-button email"
                                            :style="{ backgroundColor: primaryColor }"
                                        >
                                            <Send :size="20" />
                                            <div class="button-content">
                                                <span class="button-label">Enviar mensaje</span>
                                                <span class="button-sublabel"
                                                    >Te responderemos pronto</span
                                                >
                                            </div>
                                            <ChevronRight :size="18" class="button-arrow" />
                                        </button>

                                        <button
                                            @click="handleCallRequest"
                                            class="contact-button call"
                                        >
                                            <PhoneCall :size="20" />
                                            <div class="button-content">
                                                <span class="button-label">Solicitar llamada</span>
                                                <span class="button-sublabel">Te contactamos</span>
                                            </div>
                                            <ChevronRight :size="18" class="button-arrow" />
                                        </button>
                                    </div>

                                    <!-- Agent Info -->
                                    <div v-if="property.agent" class="agent-info">
                                        <div class="agent-avatar">
                                            <User :size="24" />
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
                                        <Shield :size="16" />
                                        <span>Información verificada y segura</span>
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
                                                <Bed :size="20" />
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
                                                <Bath :size="20" />
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
                                                <Square :size="20" />
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
                                                <Car :size="20" />
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

            <!-- Similar Properties Section -->
            <div class="similar-section">
                <div class="container-wide">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">Propiedades similares</h2>
                            <p class="section-description">
                                Otras propiedades que podrían interesarte
                            </p>
                        </div>
                        <button class="view-all-button" :style="{ color: primaryColor }">
                            Ver todas
                            <ChevronRight :size="18" />
                        </button>
                    </div>
                    <div class="similar-placeholder">
                        <Building2 :size="48" class="placeholder-icon" />
                        <p>Próximamente: Propiedades similares</p>
                    </div>
                </div>
            </div>

            <!-- Floating Action Buttons (Mobile) -->
            <div class="floating-actions">
                <button
                    @click="handleWhatsAppContact"
                    class="fab fab-whatsapp"
                    aria-label="Contactar por WhatsApp"
                >
                    <Phone :size="24" />
                </button>
                <button
                    @click="
                        activeTab = 'contact';
                        scrollToTabs();
                    "
                    class="fab fab-message"
                    :style="{ backgroundColor: primaryColor }"
                    aria-label="Enviar mensaje"
                >
                    <Send :size="24" />
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
    Building2,
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

// Methods
const fetchPropertyDetails = async () => {
    try {
        loading.value = true;
        error.value = null;
        const response = await getProperty(route.params.id);
        property.value = response.data;

        // Cargar favoritos del localStorage
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
    navigator.clipboard.writeText(text);
    alert('Enlace copiado al portapapeles');
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

const handleScroll = () => {
    showStickyHeader.value = window.scrollY > 400;
};

onMounted(() => {
    fetchPropertyDetails();
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Base Styles */
.property-detail-container {
    min-height: 100vh;
    background-color: #f9fafb;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}

/* Loading State */
.loading-container {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 9999;
}

.loading-content {
    text-align: center;
}

.loader-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 1.5rem;
}

.loader-circle {
    position: absolute;
    inset: -10px;
    border: 3px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: rotate 2s linear infinite;
}

@keyframes rotate {
    to {
        transform: rotate(360deg);
    }
}

.loading-text {
    margin-top: 1rem;
    color: white;
    font-size: 1.25rem;
    font-weight: 600;
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
    padding: 2rem;
    background-color: #f9fafb;
}

.error-content {
    text-align: center;
    max-width: 500px;
}

.error-icon-wrapper {
    display: inline-flex;
    padding: 1.5rem;
    background-color: #fee2e2;
    border-radius: 50%;
    margin-bottom: 1.5rem;
    animation: shake 0.5s;
}

@keyframes shake {
    0%,
    100% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-10px);
    }
    75% {
        transform: translateX(10px);
    }
}

.error-icon {
    color: #ef4444;
}

.error-title {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.75rem;
}

.error-message {
    color: #6b7280;
    font-size: 1.125rem;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.error-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

.retry-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2.5rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
}

.retry-button:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.4);
}

.retry-button:active {
    transform: translateY(0);
}

.back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #6b7280;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.2s;
    font-size: 0.9375rem;
}

.back-link:hover {
    color: #111827;
    background-color: #f3f4f6;
}

/* Property Content */
.property-content {
    min-height: 100vh;
}

/* Sticky Header */
.sticky-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40;
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0.875rem 1.5rem;
    gap: 1rem;
}

.back-button-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    background-color: #f3f4f6;
    border: none;
    border-radius: 0.625rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    color: #374151;
}

.back-button-header:hover {
    background-color: #e5e7eb;
    transform: translateX(-2px);
}

.hidden {
    display: none;
}

@media (min-width: 768px) {
    .md\:inline {
        display: inline;
    }
}

.header-info {
    flex: 1;
    min-width: 0;
}

.header-title {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.125rem;
}

.header-price {
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
}

.header-actions {
    display: flex;
    gap: 0.5rem;
}

.icon-button {
    padding: 0.625rem;
    background-color: #f3f4f6;
    border: none;
    border-radius: 0.625rem;
    cursor: pointer;
    transition: all 0.2s;
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-button:hover {
    background-color: #e5e7eb;
    transform: scale(1.05);
    color: #111827;
}

.icon-button.favorite-active {
    color: #ef4444;
    background-color: #fee2e2;
}

.fill-current {
    fill: currentColor;
}

/* Hero Section */
.hero-section {
    background-color: white;
    padding: 1.5rem 0 1rem;
}

.container-wide {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
}

.breadcrumb-link {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: #6b7280;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.375rem 0.625rem;
    border-radius: 0.375rem;
    transition: all 0.2s;
}

.breadcrumb-link:hover {
    color: #111827;
    background-color: #f3f4f6;
}

.breadcrumb-separator {
    color: #d1d5db;
}

.breadcrumb-current {
    color: #111827;
    font-weight: 500;
}

.hero-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
}

.hero-left {
    flex: 1;
    min-width: 0;
}

.hero-title {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.75rem;
    line-height: 1.2;
}

.hero-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
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
    gap: 0.75rem;
}

@media (min-width: 768px) {
    .hero-actions {
        display: flex;
    }
}

.action-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 0.625rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9375rem;
}

.action-button.secondary {
    background-color: #f3f4f6;
    color: #374151;
}

.action-button.secondary:hover {
    background-color: #e5e7eb;
    transform: translateY(-1px);
}

.action-button.favorite-active {
    color: #ef4444;
}

/* Gallery Section */
.gallery-section {
    background-color: white;
    padding: 1.5rem 0 2rem;
}

/* Main Content */
.main-content {
    padding: 2rem 0 3rem;
}

.content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}

@media (min-width: 1024px) {
    .content-grid {
        grid-template-columns: 1fr 400px;
    }
}

/* Left Column */
.left-column {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* Price Card */
.price-card {
    background-color: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
}

.price-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.price-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.price-info {
    flex: 1;
    min-width: 200px;
}

.price-label {
    color: #6b7280;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.price-amount {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.5rem;
}

.price-per-sqm {
    color: #6b7280;
    font-size: 0.9375rem;
    font-weight: 500;
}

.badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: flex-start;
}

.badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
}

.badge-primary {
    background-color: #3b82f6;
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
    border-radius: 1rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
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
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    color: #6b7280;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
    font-size: 0.9375rem;
}

.tab:hover {
    color: #111827;
    background-color: #f9fafb;
}

.tab.active {
    font-weight: 600;
}

.tab-content {
    padding: 2rem;
    min-height: 200px;
}

/* Right Column */
.right-column {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

@media (min-width: 1024px) {
    .sticky-sidebar {
        position: sticky;
        top: 6rem;
    }
}

/* Contact Card */
.contact-card {
    background-color: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.contact-card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1.25rem;
}

.quick-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info-label {
    color: #6b7280;
    font-size: 0.875rem;
    font-weight: 500;
}

.info-value {
    color: #111827;
    font-weight: 600;
}

.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
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
    gap: 1rem;
    padding: 1rem 1.25rem;
    border: none;
    border-radius: 0.875rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
}

.contact-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s;
}

.contact-button:hover::before {
    transform: translateX(100%);
}

.contact-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.2);
}

.contact-button.whatsapp {
    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
}

.contact-button.email {
    background-color: #3b82f6;
}

.contact-button.call {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.button-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    flex: 1;
}

.button-label {
    font-size: 0.9375rem;
}

.button-sublabel {
    font-size: 0.75rem;
    opacity: 0.9;
    font-weight: 400;
    margin-top: 0.125rem;
}

.button-arrow {
    opacity: 0.7;
    transition: transform 0.3s;
}

.contact-button:hover .button-arrow {
    transform: translateX(4px);
}

.agent-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}

.agent-avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.agent-details {
    flex: 1;
    min-width: 0;
}

.agent-name {
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.25rem;
}

.agent-email {
    font-size: 0.875rem;
    color: #6b7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.security-badge {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.875rem;
    background-color: #ecfdf5;
    border-radius: 0.625rem;
    color: #065f46;
    font-size: 0.875rem;
    font-weight: 500;
}

/* Features Summary */
.features-summary {
    background-color: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.summary-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1.25rem;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.summary-item {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
    transition: all 0.2s;
}

.summary-item:hover {
    background-color: #f3f4f6;
    transform: translateY(-1px);
}

.summary-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.625rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.summary-text {
    display: flex;
    flex-direction: column;
}

.summary-value {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    line-height: 1;
}

.summary-label {
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: 500;
    margin-top: 0.25rem;
}

/* Similar Section */
.similar-section {
    padding: 3rem 0 4rem;
    background-color: #ffffff;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.section-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: #111827;
}

.section-description {
    color: #6b7280;
    font-size: 1rem;
    margin-top: 0.5rem;
}

.view-all-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background-color: transparent;
    border: 2px solid currentColor;
    border-radius: 0.625rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.view-all-button:hover {
    background-color: currentColor;
    color: white !important;
}

.similar-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    background-color: #f9fafb;
    border-radius: 1rem;
    border: 2px dashed #e5e7eb;
}

.placeholder-icon {
    color: #9ca3af;
    margin-bottom: 1rem;
}

/* Floating Action Buttons */
.floating-actions {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 30;
}

@media (min-width: 1024px) {
    .floating-actions {
        display: none;
    }
}

.fab {
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 50%;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
}

.fab:hover {
    transform: scale(1.1);
    box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.4);
}

.fab:active {
    transform: scale(0.95);
}

.fab-whatsapp {
    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
}

.fab-message {
    background-color: #3b82f6;
}

/* Animations */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Responsive */
@media (max-width: 768px) {
    .hero-title {
        font-size: 1.5rem;
    }

    .price-amount {
        font-size: 2rem;
    }

    .tab-content {
        padding: 1.25rem;
    }

    .contact-card,
    .features-summary {
        padding: 1.25rem;
    }

    .summary-grid {
        grid-template-columns: 1fr;
    }

    .price-header {
        flex-direction: column;
    }

    .badges {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .container-wide {
        padding: 0 1rem;
    }

    .hero-title {
        font-size: 1.25rem;
    }

    .price-amount {
        font-size: 1.75rem;
    }

    .contact-button {
        padding: 0.875rem 1rem;
    }

    .tab {
        padding: 0.875rem 1rem;
    }
}
</style>
