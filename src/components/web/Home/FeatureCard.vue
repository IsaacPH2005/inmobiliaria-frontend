<template>
    <div class="flex flex-col items-center p-4 bg-white shadow-sm rounded-xl">
        <div class="p-3 mb-2 rounded-full" :style="{ backgroundColor: primaryColor + '20' }">
            <component :is="icon" :size="32" :style="{ color: primaryColor }" />
        </div>
        <span class="font-medium text-gray-800">{{ displayValue }}</span>
        <span class="text-sm text-gray-600">{{ label }}</span>
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
        required: false, // ✅ Cambiar a false para permitir undefined
        default: 0, // ✅ Valor por defecto
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

// ✅ Computed para manejar valores null/undefined
const displayValue = computed(() => {
    if (props.value === null || props.value === undefined || props.value === '') {
        return '0';
    }
    return props.value;
});
</script>
