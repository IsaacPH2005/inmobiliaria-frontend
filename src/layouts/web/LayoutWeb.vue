<template>
    <div class="app-layout">
        <Header :site-settings="siteSettings" />

        <main class="main-content">
            <router-view />
        </main>

        <Footer :site-settings="siteSettings" />
    </div>
</template>

<script setup>
import Header from '@/components/web/Layout/Header.vue';
import Footer from '@/components/web/Layout/Footer.vue';
import { useSiteSettings } from '@/composables/useSiteSettings';

// Usar el composable que comparte el estado global
const { siteSettings } = useSiteSettings();
</script>

<style scoped>
.app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex: 1;
}
</style>
