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
        @reset-filters="resetFilters"
        @change-page="changePage"
        @view-property="viewProperty"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getProperties } from '@/services/PropertiesService';
import { useSiteSettings } from '@/composables/useSiteSettings';
import HeroSection from '@/components/web/Home/HeroSection.vue';
import AdvancedSearchFilters from '@/components/web/Home/AdvancedSearchFilters.vue';
import PropertyGrid from '@/components/web/Home/PropertyGrid.vue';

const { siteSettings } = useSiteSettings();
const router = useRouter();

// Estados
const loading = ref(true);
const error = ref(null);
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

        if (filters.value.features.length > 0) {
            params.append('features', filters.value.features.join(','));
        }

        const response = await getProperties(`?${params.toString()}`);
        properties.value = response.data.data || response.data;

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

const viewProperty = propertyId => {
    console.log('Navigating to property:', propertyId); // Debug
    router.push(`/propiedad/${propertyId}`);
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

onMounted(() => {
    fetchProperties();
});
</script>
