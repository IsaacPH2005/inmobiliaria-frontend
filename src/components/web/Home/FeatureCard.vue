<template>
    <div class="flex flex-col items-center p-4 bg-white shadow-sm rounded-xl">
        <div class="p-3 mb-2 rounded-full" :style="{ backgroundColor: primaryColor + '20' }">
            <component :is="icon" :size="32" :style="{ color: primaryColor }" />
        </div>
        <span class="font-medium text-gray-800">{{ value }}</span>
        <span class="text-sm text-gray-600">{{ label }}</span>
    </div>
</template>

<script setup>
defineProps({
    icon: {
        type: [Object, Function], // ✅ Acepta tanto Object como Function
        required: true,
    },
    value: {
        type: [String, Number],
        required: true,
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
</script>
