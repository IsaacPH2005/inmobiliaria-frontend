<template>
    <div
        class="flex flex-col items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-4"
    >
        <!-- Icon Container - Responsive size -->
        <div
            class="flex items-center justify-center w-10 h-10 mb-2 rounded-full sm:w-12 sm:h-12"
            :style="{ backgroundColor: primaryColor + '15' }"
        >
            <component
                :is="icon"
                :size="iconSize"
                :style="{ color: primaryColor }"
                class="flex-shrink-0"
            />
        </div>

        <!-- Value - Optimized typography -->
        <span class="text-base font-bold text-gray-800 sm:text-lg">
            {{ displayValue }}
        </span>

        <!-- Label - Responsive text -->
        <span class="text-xs text-center text-gray-600 sm:text-sm">
            {{ label }}
        </span>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    icon: {
        type: [Object, Function],
        required: true,
    },
    value: {
        type: [String, Number],
        required: false,
        default: 0,
    },
    label: {
        type: String,
        required: true,
    },
    primaryColor: {
        type: String,
        default: '#3B82F6',
    },
});

// Display value handler
const displayValue = computed(() => {
    if (props.value === null || props.value === undefined || props.value === '') {
        return '0';
    }
    return props.value;
});

// Responsive icon size
const iconSize = computed(() => {
    // Mobile: 20px, Desktop: 24px
    return window.innerWidth < 640 ? 20 : 24;
});
</script>

<style scoped>
/* Touch-friendly for WebView */
* {
    -webkit-tap-highlight-color: transparent;
}

/* Smooth transitions - WebView compatible */
div {
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

/* Ensure text doesn't overflow */
span {
    overflow-wrap: break-word;
    word-wrap: break-word;
}
</style>
