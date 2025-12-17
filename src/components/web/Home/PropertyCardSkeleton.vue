<template>
    <div
        v-if="viewMode === 'grid'"
        class="overflow-hidden bg-white shadow-md animate-pulse rounded-xl"
    >
        <div class="h-56 bg-gray-300"></div>
        <div class="p-6">
            <div class="h-6 mb-3 bg-gray-300 rounded"></div>
            <div class="w-3/4 h-4 mb-2 bg-gray-200 rounded"></div>
            <div class="w-1/2 h-4 mb-4 bg-gray-200 rounded"></div>
            <div class="flex gap-4">
                <div class="w-16 h-4 bg-gray-200 rounded"></div>
                <div class="w-16 h-4 bg-gray-200 rounded"></div>
                <div class="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
        </div>
    </div>

    <div v-else class="flex overflow-hidden bg-white shadow-md animate-pulse rounded-xl">
        <div class="flex-shrink-0 h-64 bg-gray-300 w-80"></div>
        <div class="flex-1 p-6">
            <div class="w-3/4 h-8 mb-4 bg-gray-300 rounded"></div>
            <div class="w-1/2 h-4 mb-3 bg-gray-200 rounded"></div>
            <div class="h-4 mb-2 bg-gray-200 rounded"></div>
            <div class="w-5/6 h-4 mb-4 bg-gray-200 rounded"></div>
            <div class="flex gap-6">
                <div class="w-20 h-4 bg-gray-200 rounded"></div>
                <div class="w-20 h-4 bg-gray-200 rounded"></div>
                <div class="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    viewMode: {
        type: String,
        default: 'grid',
    },
});
</script>
