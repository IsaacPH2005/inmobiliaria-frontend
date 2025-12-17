<template>
    <div class="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
        <h3 class="mb-4 text-xl font-bold text-gray-800">Contactar Agente</h3>

        <div
            class="flex items-center p-4 mb-6 rounded-lg"
            :style="{ backgroundColor: primaryColor + '10' }"
        >
            <div
                class="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-3 rounded-full"
                :style="{ backgroundColor: primaryColor }"
            >
                <User :size="24" class="text-white" />
            </div>
            <div>
                <p class="font-medium text-gray-800">Agente Inmobiliario</p>
                <p class="text-sm text-gray-600">{{ agentEmail }}</p>
            </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label for="name" class="block mb-1 text-sm font-medium text-gray-700">
                    Nombre
                </label>
                <div class="relative">
                    <input
                        type="text"
                        id="name"
                        v-model="form.name"
                        class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        :style="{ '--tw-ring-color': primaryColor }"
                        required
                    />
                    <User
                        :size="18"
                        class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                    />
                </div>
            </div>

            <div>
                <label for="email" class="block mb-1 text-sm font-medium text-gray-700">
                    Correo
                </label>
                <div class="relative">
                    <input
                        type="email"
                        id="email"
                        v-model="form.email"
                        class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        :style="{ '--tw-ring-color': primaryColor }"
                        required
                    />
                    <Mail
                        :size="18"
                        class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                    />
                </div>
            </div>

            <div>
                <label for="phone" class="block mb-1 text-sm font-medium text-gray-700">
                    Teléfono
                </label>
                <div class="relative">
                    <input
                        type="tel"
                        id="phone"
                        v-model="form.phone"
                        class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        :style="{ '--tw-ring-color': primaryColor }"
                        required
                    />
                    <Phone
                        :size="18"
                        class="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                    />
                </div>
            </div>

            <div>
                <label for="message" class="block mb-1 text-sm font-medium text-gray-700">
                    Mensaje
                </label>
                <div class="relative">
                    <textarea
                        id="message"
                        v-model="form.message"
                        rows="4"
                        class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        :style="{ '--tw-ring-color': primaryColor }"
                        required
                    ></textarea>
                    <MessageSquare :size="18" class="absolute text-gray-400 left-3 top-3" />
                </div>
            </div>

            <button
                type="submit"
                class="flex items-center justify-center w-full py-3 font-bold text-white transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105"
                :style="{ backgroundColor: primaryColor }"
            >
                <Send :size="18" class="mr-2" />
                Enviar Mensaje
            </button>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { User, Mail, Phone, MessageSquare, Send } from 'lucide-vue-next';

defineProps({
    agentEmail: {
        type: String,
        default: 'agente@inmobiliaria.com',
    },
    primaryColor: {
        type: String,
        default: '#3B82F6',
    },
});

const emit = defineEmits(['submit']);

const form = reactive({
    name: '',
    email: '',
    phone: '',
    message: '',
});

const handleSubmit = () => {
    emit('submit', { ...form });
    // Reset form
    form.name = '';
    form.email = '';
    form.phone = '';
    form.message = '';
};
</script>
