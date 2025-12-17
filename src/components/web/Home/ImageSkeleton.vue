<template>
    <div class="animate-pulse">
        <!-- Main skeleton -->
        <div class="relative mb-4 overflow-hidden bg-gray-300 rounded-xl md:h-[500px] h-64">
            <div class="flex items-center justify-center w-full h-full">
                <Image :size="64" class="text-gray-400" />
            </div>
        </div>

        <!-- Thumbnails skeleton -->
        <div class="flex gap-3 pb-2">
            <div
                v-for="i in 5"
                :key="i"
                class="flex-shrink-0 w-20 h-20 bg-gray-300 rounded-lg md:w-24 md:h-24"
            ></div>
        </div>
    </div>
</template>

<script setup>
import { Image } from 'lucide-vue-next';
</script>
