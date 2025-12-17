<template>
    <HeroSection />

    <!-- Filtros avanzados pegajosos -->
    <AdvancedSearchFilters @search="applyFilters" @reset="resetFilters" />

    <PropertyGrid
        :properties="properties"
        :loading="loading"
        :error="error"
        :pagination="pagination"
        :primary-color="siteSettings.color_primario || '#3B82F6'"
        @open-modal="openPropertyModal"
        @reset-filters="resetFilters"
        @change-page="changePage"
    />

    <PropertyModal
        v-if="showPropertyModal"
        :property="selectedProperty"
        :loading="modalLoading"
        :error="modalError"
        :primary-color="siteSettings.color_primario || '#3B82F6'"
        @close="closePropertyModal"
        @submit-form="submitForm"
    />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getProperties, getProperty } from '@/services/PropertiesService';
import { useSiteSettings } from '@/composables/useSiteSettings';
import HeroSection from '@/components/web/Home/HeroSection.vue';
import AdvancedSearchFilters from '@/components/web/Home/AdvancedSearchFilters.vue';
import PropertyGrid from '@/components/web/Home/PropertyGrid.vue';
import PropertyModal from '@/components/web/Home/PropertyModal.vue';

const { siteSettings } = useSiteSettings();

// Estados
const loading = ref(true);
const error = ref(null);
const showPropertyModal = ref(false);
const modalLoading = ref(false);
const modalError = ref(null);
const selectedProperty = ref({});
const properties = ref([]);
const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
});

const filters = ref({
    operation_type: '1',
    property_type: '',
    location: '',
    min_price: null,
    max_price: null,
    bedrooms: null,
    bathrooms: null,
    parking: null,
    street: '',
    status: '',
    min_area: null,
    features: [],
    page: 1,
});

// Métodos
const fetchProperties = async () => {
    try {
        loading.value = true;
        error.value = null;

        const params = new URLSearchParams();

        // Agregar todos los filtros
        Object.keys(filters.value).forEach(key => {
            if (filters.value[key] && key !== 'features') {
                if (key === 'property_type') {
                    params.append('property_type_id', filters.value[key]);
                } else if (key === 'operation_type') {
                    params.append('operation_type_id', filters.value[key]);
                } else {
                    params.append(key, filters.value[key]);
                }
            }
        });

        // Agregar features
        if (filters.value.features.length > 0) {
            params.append('features', filters.value.features.join(','));
        }

        const response = await getProperties(`?${params.toString()}`);
        properties.value = response.data.data || response.data;
        console.log(properties.value);
        if (response.data.meta) {
            pagination.value = {
                current_page: response.data.meta.current_page,
                last_page: response.data.meta.last_page,
                per_page: response.data.meta.per_page,
                total: response.data.meta.total,
            };
        }
    } catch (err) {
        error.value = 'Error al cargar las propiedades. Por favor, intenta nuevamente.';
        console.error('Error fetching properties:', err);
    } finally {
        loading.value = false;
    }
};

const fetchPropertyDetails = async id => {
    try {
        modalLoading.value = true;
        modalError.value = null;
        const response = await getProperty(id);
        selectedProperty.value = response.data;
    } catch (err) {
        modalError.value = 'Error al cargar los detalles de la propiedad';
        console.error('Error fetching property details:', err);
    } finally {
        modalLoading.value = false;
    }
};

const openPropertyModal = property => {
    showPropertyModal.value = true;
    selectedProperty.value = property;
    fetchPropertyDetails(property.id);
    document.body.style.overflow = 'hidden';
};

const closePropertyModal = () => {
    showPropertyModal.value = false;
    selectedProperty.value = {};
    document.body.style.overflow = '';
};

const applyFilters = newFilters => {
    filters.value = { ...newFilters, page: 1 };
    fetchProperties();
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
};

const resetFilters = () => {
    filters.value = {
        operation_type: '1',
        property_type: '',
        location: '',
        min_price: null,
        max_price: null,
        bedrooms: null,
        bathrooms: null,
        parking: null,
        street: '',
        status: '',
        min_area: null,
        features: [],
        page: 1,
    };
    fetchProperties();
};

const changePage = page => {
    if (page < 1 || page > pagination.value.last_page) return;
    filters.value.page = page;
    fetchProperties();
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
};

const submitForm = formData => {
    console.log('Form submitted:', formData);
    alert('Mensaje enviado exitosamente. Nos contactaremos pronto.');
    closePropertyModal();
};

onMounted(() => {
    fetchProperties();
});

onBeforeUnmount(() => {
    document.body.style.overflow = '';
});
</script>
