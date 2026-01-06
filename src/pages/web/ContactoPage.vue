<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <!-- Hero Section - Mobile First -->
        <section
            class="relative py-12 overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 sm:py-16 lg:py-20"
        >
            <div class="absolute inset-0 opacity-10">
                <div
                    class="absolute inset-0"
                    style="
                        background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
                    "
                ></div>
            </div>
            <div class="container relative px-4 mx-auto text-center sm:px-6">
                <h1 class="mb-4 text-3xl font-bold text-white sm:text-4xl sm:mb-6 lg:text-5xl">
                    Contáctanos
                </h1>
                <p class="max-w-2xl mx-auto text-base text-blue-100 sm:text-lg lg:text-xl">
                    Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto
                    contigo lo antes posible
                </p>
            </div>
        </section>

        <!-- Contact Section - Mobile First -->
        <section class="py-12 sm:py-16 lg:py-24">
            <div class="container px-4 mx-auto sm:px-6">
                <div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    <!-- Contact Information - Mobile First -->
                    <div class="space-y-6 sm:space-y-8">
                        <div>
                            <h2 class="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl sm:mb-6">
                                Información de Contacto
                            </h2>
                            <p
                                class="mb-6 text-base leading-relaxed text-gray-600 sm:text-lg sm:mb-8"
                            >
                                ¿Tienes alguna pregunta? Nos encantaría escucharte. Contáctanos a
                                través de cualquiera de estos medios.
                            </p>
                        </div>

                        <!-- Contact Cards - Mobile optimized -->
                        <div class="space-y-3 sm:space-y-4">
                            <!-- Phone -->
                            <div
                                class="flex items-start p-4 transition-all duration-300 bg-white shadow-lg sm:p-6 rounded-xl hover:shadow-xl active:scale-[0.99]"
                            >
                                <div
                                    class="flex items-center justify-center flex-shrink-0 mr-3 bg-blue-100 rounded-lg w-11 h-11 sm:w-12 sm:h-12 sm:mr-4"
                                >
                                    <Phone :size="20" class="text-blue-600 sm:w-6 sm:h-6" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="mb-1 text-base font-bold text-gray-800 sm:text-lg">
                                        Teléfono
                                    </h3>
                                    <a
                                        href="tel:+5911234567"
                                        class="block text-sm text-gray-600 transition-colors sm:text-base hover:text-blue-600"
                                    >
                                        +591 123 4567
                                    </a>
                                    <a
                                        href="tel:+5919876543"
                                        class="block text-sm text-gray-600 transition-colors sm:text-base hover:text-blue-600"
                                    >
                                        +591 987 6543
                                    </a>
                                </div>
                            </div>

                            <!-- Email -->
                            <div
                                class="flex items-start p-4 transition-all duration-300 bg-white shadow-lg sm:p-6 rounded-xl hover:shadow-xl active:scale-[0.99]"
                            >
                                <div
                                    class="flex items-center justify-center flex-shrink-0 mr-3 bg-green-100 rounded-lg w-11 h-11 sm:w-12 sm:h-12 sm:mr-4"
                                >
                                    <Mail :size="20" class="text-green-600 sm:w-6 sm:h-6" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="mb-1 text-base font-bold text-gray-800 sm:text-lg">
                                        Email
                                    </h3>
                                    <a
                                        href="mailto:info@inmobiliaria.com"
                                        class="block text-sm text-gray-600 break-all transition-colors sm:text-base hover:text-green-600"
                                    >
                                        info@inmobiliaria.com
                                    </a>
                                    <a
                                        href="mailto:ventas@inmobiliaria.com"
                                        class="block text-sm text-gray-600 break-all transition-colors sm:text-base hover:text-green-600"
                                    >
                                        ventas@inmobiliaria.com
                                    </a>
                                </div>
                            </div>

                            <!-- Address -->
                            <div
                                class="flex items-start p-4 transition-all duration-300 bg-white shadow-lg sm:p-6 rounded-xl hover:shadow-xl active:scale-[0.99]"
                            >
                                <div
                                    class="flex items-center justify-center flex-shrink-0 mr-3 bg-purple-100 rounded-lg w-11 h-11 sm:w-12 sm:h-12 sm:mr-4"
                                >
                                    <MapPin :size="20" class="text-purple-600 sm:w-6 sm:h-6" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="mb-1 text-base font-bold text-gray-800 sm:text-lg">
                                        Dirección
                                    </h3>
                                    <p class="text-sm text-gray-600 sm:text-base">
                                        Av. Heroínas #123<br />
                                        Cochabamba, Bolivia
                                    </p>
                                </div>
                            </div>

                            <!-- Hours -->
                            <div
                                class="flex items-start p-4 transition-all duration-300 bg-white shadow-lg sm:p-6 rounded-xl hover:shadow-xl active:scale-[0.99]"
                            >
                                <div
                                    class="flex items-center justify-center flex-shrink-0 mr-3 bg-orange-100 rounded-lg w-11 h-11 sm:w-12 sm:h-12 sm:mr-4"
                                >
                                    <Clock :size="20" class="text-orange-600 sm:w-6 sm:h-6" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="mb-1 text-base font-bold text-gray-800 sm:text-lg">
                                        Horario de Atención
                                    </h3>
                                    <p class="text-sm text-gray-600 sm:text-base">
                                        Lunes - Viernes: 8:00 - 18:00
                                    </p>
                                    <p class="text-sm text-gray-600 sm:text-base">
                                        Sábados: 9:00 - 13:00
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Social Media - Mobile optimized -->
                        <div class="p-5 bg-white shadow-lg sm:p-6 rounded-xl">
                            <h3 class="mb-3 text-base font-bold text-gray-800 sm:text-lg sm:mb-4">
                                Síguenos en Redes Sociales
                            </h3>
                            <div class="flex gap-3 sm:gap-4">
                                <a
                                    href="#"
                                    class="flex items-center justify-center text-white transition-all duration-300 bg-blue-600 rounded-lg w-11 h-11 sm:w-12 sm:h-12 hover:bg-blue-700 hover:scale-110 active:scale-95"
                                    aria-label="Facebook"
                                >
                                    <Facebook :size="20" class="sm:w-6 sm:h-6" />
                                </a>
                                <a
                                    href="#"
                                    class="flex items-center justify-center text-white transition-all duration-300 bg-pink-600 rounded-lg w-11 h-11 sm:w-12 sm:h-12 hover:bg-pink-700 hover:scale-110 active:scale-95"
                                    aria-label="Instagram"
                                >
                                    <Instagram :size="20" class="sm:w-6 sm:h-6" />
                                </a>
                                <a
                                    href="#"
                                    class="flex items-center justify-center text-white transition-all duration-300 bg-green-600 rounded-lg w-11 h-11 sm:w-12 sm:h-12 hover:bg-green-700 hover:scale-110 active:scale-95"
                                    aria-label="WhatsApp"
                                >
                                    <MessageCircle :size="20" class="sm:w-6 sm:h-6" />
                                </a>
                                <a
                                    href="#"
                                    class="flex items-center justify-center text-white transition-all duration-300 bg-blue-500 rounded-lg w-11 h-11 sm:w-12 sm:h-12 hover:bg-blue-600 hover:scale-110 active:scale-95"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin :size="20" class="sm:w-6 sm:h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form - Mobile First -->
                    <div class="p-6 bg-white shadow-2xl sm:p-8 lg:p-10 rounded-xl sm:rounded-2xl">
                        <h2 class="mb-4 text-xl font-bold text-gray-800 sm:text-2xl sm:mb-6">
                            Envíanos un Mensaje
                        </h2>

                        <!-- Success Message -->
                        <transition
                            enter-active-class="transition duration-200 ease-out"
                            enter-from-class="scale-95 opacity-0"
                            enter-to-class="scale-100 opacity-100"
                        >
                            <div
                                v-if="formSubmitted"
                                class="flex items-start gap-3 p-4 mb-4 text-green-800 bg-green-100 border border-green-200 rounded-lg sm:mb-6"
                            >
                                <CheckCircle
                                    :size="20"
                                    class="flex-shrink-0 mt-0.5 sm:w-6 sm:h-6"
                                />
                                <div>
                                    <p class="text-sm font-semibold sm:text-base">
                                        ¡Mensaje enviado exitosamente!
                                    </p>
                                    <p class="text-xs sm:text-sm">
                                        Nos pondremos en contacto contigo pronto.
                                    </p>
                                </div>
                            </div>
                        </transition>

                        <!-- Error Message -->
                        <transition
                            enter-active-class="transition duration-200 ease-out"
                            enter-from-class="scale-95 opacity-0"
                            enter-to-class="scale-100 opacity-100"
                        >
                            <div
                                v-if="formError"
                                class="flex items-start gap-3 p-4 mb-4 text-red-800 bg-red-100 border border-red-200 rounded-lg sm:mb-6"
                            >
                                <AlertCircle
                                    :size="20"
                                    class="flex-shrink-0 mt-0.5 sm:w-6 sm:h-6"
                                />
                                <div>
                                    <p class="text-sm font-semibold sm:text-base">
                                        Error al enviar el mensaje
                                    </p>
                                    <p class="text-xs sm:text-sm">Por favor, intenta nuevamente.</p>
                                </div>
                            </div>
                        </transition>

                        <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
                            <!-- Name -->
                            <div>
                                <label
                                    for="name"
                                    class="block mb-2 text-sm font-semibold text-gray-700"
                                >
                                    Nombre Completo <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                                    >
                                        <User :size="18" class="text-gray-400 sm:w-5 sm:h-5" />
                                    </div>
                                    <input
                                        id="name"
                                        v-model="formData.name"
                                        type="text"
                                        required
                                        class="w-full py-3 pl-10 pr-4 text-sm text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg sm:text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        :class="{
                                            'border-red-500 focus:ring-red-500': errors.name,
                                        }"
                                        placeholder="Tu nombre completo"
                                        @input="clearError('name')"
                                    />
                                </div>
                                <p v-if="errors.name" class="mt-1 text-xs text-red-500 sm:text-sm">
                                    {{ errors.name }}
                                </p>
                            </div>

                            <!-- Email -->
                            <div>
                                <label
                                    for="email"
                                    class="block mb-2 text-sm font-semibold text-gray-700"
                                >
                                    Correo Electrónico <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                                    >
                                        <Mail :size="18" class="text-gray-400 sm:w-5 sm:h-5" />
                                    </div>
                                    <input
                                        id="email"
                                        v-model="formData.email"
                                        type="email"
                                        required
                                        class="w-full py-3 pl-10 pr-4 text-sm text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg sm:text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        :class="{
                                            'border-red-500 focus:ring-red-500': errors.email,
                                        }"
                                        placeholder="tu@email.com"
                                        @input="clearError('email')"
                                    />
                                </div>
                                <p v-if="errors.email" class="mt-1 text-xs text-red-500 sm:text-sm">
                                    {{ errors.email }}
                                </p>
                            </div>

                            <!-- Phone -->
                            <div>
                                <label
                                    for="phone"
                                    class="block mb-2 text-sm font-semibold text-gray-700"
                                >
                                    Teléfono <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                                    >
                                        <Phone :size="18" class="text-gray-400 sm:w-5 sm:h-5" />
                                    </div>
                                    <input
                                        id="phone"
                                        v-model="formData.phone"
                                        type="tel"
                                        required
                                        class="w-full py-3 pl-10 pr-4 text-sm text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg sm:text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        :class="{
                                            'border-red-500 focus:ring-red-500': errors.phone,
                                        }"
                                        placeholder="+591 123 4567"
                                        @input="clearError('phone')"
                                    />
                                </div>
                                <p v-if="errors.phone" class="mt-1 text-xs text-red-500 sm:text-sm">
                                    {{ errors.phone }}
                                </p>
                            </div>

                            <!-- Subject -->
                            <div>
                                <label
                                    for="subject"
                                    class="block mb-2 text-sm font-semibold text-gray-700"
                                >
                                    Asunto <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                                    >
                                        <FileText :size="18" class="text-gray-400 sm:w-5 sm:h-5" />
                                    </div>
                                    <select
                                        id="subject"
                                        v-model="formData.subject"
                                        required
                                        class="w-full py-3 pl-10 pr-10 text-sm text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg appearance-none sm:text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        :class="{
                                            'border-red-500 focus:ring-red-500': errors.subject,
                                        }"
                                        @change="clearError('subject')"
                                    >
                                        <option value="" disabled>Selecciona un asunto</option>
                                        <option value="Consulta sobre propiedad">
                                            Consulta sobre propiedad
                                        </option>
                                        <option value="Agendar visita">Agendar visita</option>
                                        <option value="Vender mi propiedad">
                                            Vender mi propiedad
                                        </option>
                                        <option value="Alquilar propiedad">
                                            Alquilar propiedad
                                        </option>
                                        <option value="Información general">
                                            Información general
                                        </option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                    <div
                                        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                    >
                                        <ChevronDown
                                            :size="18"
                                            class="text-gray-400 sm:w-5 sm:h-5"
                                        />
                                    </div>
                                </div>
                                <p
                                    v-if="errors.subject"
                                    class="mt-1 text-xs text-red-500 sm:text-sm"
                                >
                                    {{ errors.subject }}
                                </p>
                            </div>

                            <!-- Message -->
                            <div>
                                <label
                                    for="message"
                                    class="block mb-2 text-sm font-semibold text-gray-700"
                                >
                                    Mensaje <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <textarea
                                        id="message"
                                        v-model="formData.message"
                                        required
                                        rows="4"
                                        maxlength="1000"
                                        class="w-full px-4 py-3 text-sm text-gray-700 transition-all duration-200 border border-gray-300 rounded-lg resize-none sm:text-base sm:rows-5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        :class="{
                                            'border-red-500 focus:ring-red-500': errors.message,
                                        }"
                                        placeholder="Cuéntanos cómo podemos ayudarte..."
                                        @input="clearError('message')"
                                    ></textarea>
                                </div>
                                <p
                                    v-if="errors.message"
                                    class="mt-1 text-xs text-red-500 sm:text-sm"
                                >
                                    {{ errors.message }}
                                </p>
                                <p class="mt-1 text-xs text-gray-500 sm:text-sm">
                                    {{ formData.message.length }} / 1000 caracteres
                                </p>
                            </div>

                            <!-- Submit Button - Mobile optimized -->
                            <button
                                type="submit"
                                :disabled="isSubmitting"
                                class="flex items-center justify-center w-full gap-2 px-6 py-3 text-base font-semibold text-white transition-all duration-200 rounded-lg shadow-lg sm:py-4 sm:text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                            >
                                <Send v-if="!isSubmitting" :size="18" class="sm:w-5 sm:h-5" />
                                <Loader v-else :size="18" class="animate-spin sm:w-5 sm:h-5" />
                                <span>{{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- Map Section - Mobile First -->
        <section class="py-12 bg-gray-50 sm:py-16">
            <div class="container px-4 mx-auto sm:px-6">
                <div class="mb-6 text-center sm:mb-8">
                    <h2 class="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl sm:mb-4">
                        Encuéntranos
                    </h2>
                    <p class="text-base text-gray-600 sm:text-lg">Visítanos en nuestra oficina</p>
                </div>
                <div class="overflow-hidden shadow-2xl rounded-xl sm:rounded-2xl">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.434958537628!2d-66.15695498509103!3d-17.394116788084344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e373925dc0c5f7%3A0x6b2eceb3b685ec44!2sCochabamba%2C%20Bolivia!5e0!3m2!1sen!2sbo!4v1635789123456!5m2!1sen!2sbo"
                        width="100%"
                        height="300"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                        class="w-full sm:h-96 lg:h-[450px]"
                        title="Ubicación de la oficina"
                    ></iframe>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Facebook,
    Instagram,
    MessageCircle,
    Linkedin,
    User,
    FileText,
    Send,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    Loader,
} from 'lucide-vue-next';

// Form data
const formData = reactive({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
});

// Form state
const errors = reactive({});
const isSubmitting = ref(false);
const formSubmitted = ref(false);
const formError = ref(false);

// Validation
const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
        newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 3) {
        newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.email.trim()) {
        newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Ingresa un email válido';
    }

    if (!formData.phone.trim()) {
        newErrors.phone = 'El teléfono es requerido';
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
        newErrors.phone = 'Ingresa un teléfono válido';
    }

    if (!formData.subject) {
        newErrors.subject = 'Selecciona un asunto';
    }

    if (!formData.message.trim()) {
        newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
        newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    Object.assign(errors, newErrors);
    return Object.keys(newErrors).length === 0;
};

const clearError = field => {
    if (errors[field]) {
        delete errors[field];
    }
    formSubmitted.value = false;
    formError.value = false;
};

// Submit handler
const handleSubmit = async () => {
    if (!validateForm()) {
        return;
    }

    isSubmitting.value = true;
    formError.value = false;

    try {
        // Aquí debes integrar tu API de backend
        // const response = await axios.post('/api/contact', formData);

        // Simulación de envío
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success
        formSubmitted.value = true;

        // Reset form
        Object.keys(formData).forEach(key => {
            formData[key] = '';
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
            formSubmitted.value = false;
        }, 5000);
    } catch (error) {
        console.error('Error submitting form:', error);
        formError.value = true;

        setTimeout(() => {
            formError.value = false;
        }, 5000);
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
/* Touch optimization */
* {
    -webkit-tap-highlight-color: transparent;
}

/* Loading animation */
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Smooth transitions for hover states */
@media (hover: hover) {
    .hover\:shadow-xl:hover {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .hover\:scale-110:hover {
        transform: scale(1.1);
    }
}
</style>
