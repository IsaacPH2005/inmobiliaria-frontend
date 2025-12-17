<template>
    <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useSiteSettings } from '@/composables/useSiteSettings';

const { loadSettings } = useSiteSettings();

onMounted(() => {
    loadSettings();
});
</script>
