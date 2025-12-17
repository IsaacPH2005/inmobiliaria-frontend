<template>
    <div class="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
        <h3 class="flex items-center mb-4 text-xl font-bold text-gray-800">
            <Share2 :size="20" class="mr-2" />
            Compartir
        </h3>
        <div class="grid grid-cols-2 gap-3">
            <button
                @click="shareWhatsApp"
                class="flex items-center justify-center px-4 py-3 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
            >
                <MessageCircle :size="18" class="mr-2" />
                WhatsApp
            </button>
            <button
                @click="shareFacebook"
                class="flex items-center justify-center px-4 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
                <Facebook :size="18" class="mr-2" />
                Facebook
            </button>
            <button
                @click="shareTwitter"
                class="flex items-center justify-center px-4 py-3 text-white transition-colors rounded-lg bg-sky-500 hover:bg-sky-600"
            >
                <Twitter :size="18" class="mr-2" />
                Twitter
            </button>
            <button
                @click="copyLink"
                class="flex items-center justify-center px-4 py-3 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            >
                <Link :size="18" class="mr-2" />
                Copiar Link
            </button>
        </div>
    </div>
</template>

<script setup>
import { Share2, MessageCircle, Facebook, Twitter, Link } from 'lucide-vue-next';

const props = defineProps({
    property: {
        type: Object,
        required: true,
    },
    primaryColor: {
        type: String,
        default: '#3B82F6',
    },
});

const shareWhatsApp = () => {
    const url = window.location.href;
    const text = `¡Mira esta propiedad! ${props.property.descripcion_corta}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
};

const shareFacebook = () => {
    const url = window.location.href;
    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        '_blank'
    );
};

const shareTwitter = () => {
    const url = window.location.href;
    const text = `¡Mira esta propiedad! ${props.property.descripcion_corta}`;
    window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
            text
        )}`,
        '_blank'
    );
};

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        alert('¡Enlace copiado al portapapeles!');
    } catch (err) {
        console.error('Error al copiar:', err);
    }
};
</script>
