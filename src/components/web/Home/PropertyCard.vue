<template>
    <div class="property-card" :class="{ 'cursor-pointer': true }" @click="$emit('click')">
        <!-- Image Section -->
        <div class="image-container">
            <img
                v-if="property.images && property.images.length > 0"
                :src="property.images[0].image_url"
                :alt="property.nombre || property.descripcion_whatsapp || 'Propiedad'"
                class="property-image"
                loading="lazy"
            />
            <div v-else class="image-placeholder">
                <Home :size="48" class="placeholder-icon" />
            </div>

            <!-- Badges -->
            <div class="badges-container">
                <span
                    v-if="property.status?.status?.nombre"
                    class="badge status-badge"
                    :class="getStatusClass(property.status.status.nombre)"
                >
                    {{ property.status.status.nombre }}
                </span>
                <span v-if="property.seo?.destacada" class="badge featured-badge">
                    <Star :size="12" class="fill-current" />
                    Destacada
                </span>
            </div>

            <!-- Favorite Button -->
            <button
                @click.stop="toggleFavorite"
                class="favorite-button"
                :class="{ 'is-favorite': isFavorite }"
                :aria-label="isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'"
            >
                <Heart :size="20" :class="{ 'fill-current': isFavorite }" />
            </button>
        </div>

        <!-- Content Section -->
        <div class="card-content">
            <!-- Header -->
            <div class="card-header">
                <!-- 🔹 NOMBRE DE LA PROPIEDAD (Prioridad) -->
                <h3 class="property-title">
                    {{ property.nombre || getDefaultTitle }}
                </h3>

                <!-- Location -->
                <p class="property-location">
                    <MapPin :size="14" />
                    <span>{{ formatLocation }}</span>
                </p>
            </div>

            <!-- Price -->
            <div class="price-section">
                <p class="price-amount" :style="{ color: primaryColor }">
                    {{ formatPrice }}
                </p>
                <p class="price-label">
                    {{ property.operation?.nombre || 'En venta' }}
                </p>
            </div>

            <!-- Description -->
            <!-- 🔹 DESCRIPCIÓN WHATSAPP (Prioridad sobre Facebook) -->
            <p
                v-if="property.descripcion_whatsapp || property.descripcion_facebook"
                class="property-description"
            >
                {{ property.descripcion_whatsapp || property.descripcion_facebook }}
            </p>

            <!-- Features Grid -->
            <div class="features-grid">
                <div class="feature-item">
                    <Bed :size="16" :style="{ color: primaryColor }" />
                    <span>{{ property.features?.habitaciones || 0 }}</span>
                </div>
                <div class="feature-item">
                    <Bath :size="16" :style="{ color: primaryColor }" />
                    <span>{{ property.features?.baños || 0 }}</span>
                </div>
                <div class="feature-item">
                    <Car :size="16" :style="{ color: primaryColor }" />
                    <span>{{ property.features?.estacionamientos || 0 }}</span>
                </div>
                <div class="feature-item">
                    <Ruler :size="16" :style="{ color: primaryColor }" />
                    <span>{{ property.features?.superficie_total || 0 }} m²</span>
                </div>
            </div>

            <!-- Footer -->
            <div class="card-footer">
                <div class="property-type">
                    <Building2 :size="14" />
                    <span>{{ property.type?.nombre || 'Propiedad' }}</span>
                </div>
                <div class="property-code">#{{ property.codigo_interno }}</div>
            </div>

            <!-- 🔹 ENLACE GOOGLE DRIVE (Opcional) -->
            <div v-if="property.enlace" class="drive-link">
                <a
                    :href="property.enlace"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                    class="drive-button"
                >
                    <FolderOpen :size="14" />
                    <span>Ver documentos</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
    Home,
    Heart,
    MapPin,
    Bed,
    Bath,
    Car,
    Ruler,
    Building2,
    Star,
    FolderOpen,
} from 'lucide-vue-next';

const props = defineProps({
    property: {
        type: Object,
        required: true,
    },
    primaryColor: {
        type: String,
        default: '#3B82F6',
    },
});

const emit = defineEmits(['click']);

const isFavorite = ref(false);

// Computed Properties
const formatLocation = computed(() => {
    const loc = props.property.location;
    if (!loc) return 'Ubicación no disponible';

    const parts = [];
    if (loc.zona) parts.push(loc.zona);
    if (loc.ciudad) parts.push(loc.ciudad);

    return parts.join(', ') || 'Ubicación no disponible';
});

const formatPrice = computed(() => {
    const price = props.property.price?.precio;
    if (!price) return 'Precio no disponible';

    const currencyCode = props.property.price?.currency?.code || 'BOB';

    return new Intl.NumberFormat('es-BO', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
});

// 🔹 TÍTULO POR DEFECTO SI NO HAY NOMBRE
const getDefaultTitle = computed(() => {
    const type = props.property.type?.nombre || 'Propiedad';
    const zone = props.property.location?.zona || 'Sin zona';
    return `${type} en ${zone}`;
});

// Methods
const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;

    const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
    if (isFavorite.value) {
        favorites.push(props.property.id);
    } else {
        const index = favorites.indexOf(props.property.id);
        if (index > -1) favorites.splice(index, 1);
    }
    localStorage.setItem('favoriteProperties', JSON.stringify(favorites));
};

const getStatusClass = status => {
    const statusLower = status?.toLowerCase() || '';

    if (statusLower.includes('disponible')) return 'status-available';
    if (statusLower.includes('vendida') || statusLower.includes('alquilada')) return 'status-sold';
    if (statusLower.includes('reservada')) return 'status-reserved';

    return 'status-default';
};

onMounted(() => {
    // Load favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
    isFavorite.value = favorites.includes(props.property.id);
});
</script>

<style scoped>
.property-card {
    background-color: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.property-card:hover {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
}

/* Image Section */
.image-container {
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
    background-color: #f3f4f6;
}

.property-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.property-card:hover .property-image {
    transform: scale(1.05);
}

.image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.placeholder-icon {
    color: rgba(255, 255, 255, 0.5);
}

/* Badges */
.badges-container {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 10;
}

.badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    backdrop-filter: blur(8px);
}

.status-badge {
    text-transform: uppercase;
    letter-spacing: 0.025em;
}

.status-available {
    background-color: rgba(16, 185, 129, 0.9);
}

.status-sold {
    background-color: rgba(239, 68, 68, 0.9);
}

.status-reserved {
    background-color: rgba(245, 158, 11, 0.9);
}

.status-default {
    background-color: rgba(107, 114, 128, 0.9);
}

.featured-badge {
    background-color: rgba(245, 158, 11, 0.9);
}

.fill-current {
    fill: currentColor;
}

/* Favorite Button */
.favorite-button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #6b7280;
    transition: all 0.3s;
    z-index: 10;
}

.favorite-button:hover {
    background-color: white;
    transform: scale(1.1);
    color: #ef4444;
}

.favorite-button.is-favorite {
    color: #ef4444;
    background-color: #fee2e2;
}

/* Card Content */
.card-content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.card-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.property-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
    line-height: 1.3;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.property-location {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: #6b7280;
    font-size: 0.875rem;
    font-weight: 500;
}

.property-location span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Price Section */
.price-section {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem;
}

.price-amount {
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1;
    margin: 0;
}

.price-label {
    font-size: 0.875rem;
    color: #6b7280;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
}

/* Description */
.property-description {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
}

/* Features Grid */
.features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
    padding: 1rem 0;
    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
}

.feature-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;
    text-align: center;
}

.feature-item span {
    font-size: 0.875rem;
    font-weight: 600;
    color: #111827;
}

/* Card Footer */
.card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
}

.property-type {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: #6b7280;
    font-size: 0.875rem;
    font-weight: 500;
}

.property-code {
    font-size: 0.75rem;
    font-weight: 700;
    color: #9ca3af;
    letter-spacing: 0.05em;
}

/* 🔹 DRIVE LINK STYLES */
.drive-link {
    margin-top: 0.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid #e5e7eb;
}

.drive-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.875rem;
    background-color: #f3f4f6;
    border-radius: 0.5rem;
    color: #4b5563;
    font-size: 0.8125rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
}

.drive-button:hover {
    background-color: #e5e7eb;
    color: #111827;
    transform: translateX(2px);
}

/* Responsive */
@media (max-width: 640px) {
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
    }

    .property-title {
        font-size: 1rem;
    }

    .price-amount {
        font-size: 1.25rem;
    }

    .card-content {
        padding: 1rem;
    }
}
</style>
