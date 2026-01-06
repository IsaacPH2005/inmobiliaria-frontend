<!-- LayoutWeb.vue -->
<template>
    <div class="flex flex-col min-h-screen bg-gray-50">
        <Header :site-settings="siteSettings" />

        <div class="h-[72px] lg:h-[92px]"></div>

        <main class="flex-grow w-full">
            <!-- 🔹 SIN TRANSITION - Solución más simple -->
            <router-view :key="$route.path" />
        </main>

        <Footer :site-settings="siteSettings" />
    </div>
</template>

<script setup>
import Header from '@/components/web/Layout/Header.vue';
import Footer from '@/components/web/Layout/Footer.vue';
import { useSiteSettings } from '@/composables/useSiteSettings';

const { siteSettings } = useSiteSettings();
</script>
