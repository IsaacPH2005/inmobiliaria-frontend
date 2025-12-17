<template>
    <div
        class="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#132540] to-[#1a3a5c]"
    >
        <!-- Animated background elements -->
        <div class="absolute inset-0 overflow-hidden">
            <!-- Circles decorativos -->
            <div
                class="absolute top-0 left-0 rounded-full w-96 h-96 bg-blue-500/5 blur-3xl animate-pulse"
            ></div>
            <div
                class="absolute bottom-0 right-0 rounded-full w-96 h-96 bg-purple-500/5 blur-3xl animate-pulse"
                style="animation-delay: 1s"
            ></div>
            <div
                class="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 blur-3xl animate-pulse"
                style="animation-delay: 2s"
            ></div>

            <!-- Grid pattern -->
            <div
                class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItMnptMCAwdjItMnptMCAwdjItMnptMCAwdjItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"
            ></div>
        </div>

        <!-- Login Card -->
        <div class="relative z-10 w-full max-w-md px-4 mx-auto">
            <!-- Logo -->
            <div class="mb-8 text-center animate-fade-in-down">
                <div class="flex items-center justify-center mb-6">
                    <!-- Logo personalizado - puedes reemplazar con tu logo -->
                    <div class="relative">
                        <img
                            v-if="siteSettings?.logo_url"
                            src="/images/logos/Logo_blanco.png"
                            :alt="siteSettings?.nombre_sitio || 'Logo'"
                            class="w-auto h-16"
                        />
                    </div>
                </div>
            </div>

            <!-- Card -->
            <div
                class="overflow-hidden shadow-2xl backdrop-blur-lg bg-white/95 rounded-2xl animate-fade-in-up"
            >
                <div class="p-8 sm:p-10">
                    <!-- Header -->
                    <div class="mb-8 text-center">
                        <h2 class="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
                        <p class="mt-2 text-sm text-gray-600">
                            Ingresa tus credenciales para continuar
                        </p>
                    </div>

                    <!-- Formulario -->
                    <form @submit.prevent="handleLogin" class="space-y-6">
                        <!-- Email -->
                        <div class="space-y-2">
                            <label for="email" class="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <div class="relative">
                                <input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    required
                                    placeholder="tu@email.com"
                                    class="w-full px-4 py-3 text-gray-800 transition-all duration-200 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-offset-0 placeholder:text-gray-400"
                                    :class="
                                        errors.email
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'focus:ring-blue-500 focus:border-blue-500'
                                    "
                                    :style="
                                        !errors.email
                                            ? {
                                                  '--tw-ring-color':
                                                      siteSettings?.color_primario || '#3B82F6',
                                              }
                                            : {}
                                    "
                                />
                                <Mail
                                    :size="20"
                                    class="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
                                />
                            </div>
                            <p v-if="errors.email" class="text-xs text-red-500">
                                {{ errors.email }}
                            </p>
                        </div>

                        <!-- Password -->
                        <div class="space-y-2">
                            <label for="password" class="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <div class="relative">
                                <input
                                    id="password"
                                    v-model="form.password"
                                    :type="showPassword ? 'text' : 'password'"
                                    required
                                    placeholder="Introduce tu contraseña"
                                    class="w-full px-4 py-3 pr-12 text-gray-800 transition-all duration-200 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-offset-0 placeholder:text-gray-400"
                                    :class="
                                        errors.password
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'focus:ring-blue-500 focus:border-blue-500'
                                    "
                                    :style="
                                        !errors.password
                                            ? {
                                                  '--tw-ring-color':
                                                      siteSettings?.color_primario || '#3B82F6',
                                              }
                                            : {}
                                    "
                                />
                                <button
                                    type="button"
                                    @click="showPassword = !showPassword"
                                    class="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                                >
                                    <Eye v-if="!showPassword" :size="20" />
                                    <EyeOff v-else :size="20" />
                                </button>
                            </div>
                            <p v-if="errors.password" class="text-xs text-red-500">
                                {{ errors.password }}
                            </p>
                        </div>

                        <!-- Remember & Forgot -->
                        <div class="flex items-center justify-between">
                            <label class="flex items-center cursor-pointer group">
                                <input
                                    v-model="form.remember"
                                    type="checkbox"
                                    class="w-4 h-4 text-blue-600 transition-all border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                                    :style="{
                                        accentColor: siteSettings?.color_primario || '#3B82F6',
                                    }"
                                />
                                <span class="ml-2 text-sm text-gray-600 group-hover:text-gray-800">
                                    Recordarme
                                </span>
                            </label>
                            <a
                                href="#"
                                class="text-sm font-medium transition-colors"
                                :style="{ color: siteSettings?.color_primario || '#3B82F6' }"
                                @mouseover="e => (e.target.style.opacity = '0.8')"
                                @mouseleave="e => (e.target.style.opacity = '1')"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <!-- Submit Button -->
                        <button
                            type="submit"
                            :disabled="loading"
                            class="relative w-full py-3 font-semibold text-white transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            :style="{
                                background: `linear-gradient(135deg, ${
                                    siteSettings?.color_primario || '#3B82F6'
                                }, ${darkenColor(siteSettings?.color_primario || '#3B82F6', 15)})`,
                            }"
                        >
                            <span v-if="loading" class="flex items-center justify-center gap-2">
                                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Iniciando sesión...
                            </span>
                            <span v-else class="flex items-center justify-center gap-2">
                                <LogIn :size="20" />
                                Iniciar sesión
                            </span>
                        </button>
                    </form>

                    <!-- Register Link -->
                    <p class="mt-6 text-sm text-center text-gray-600">
                        ¿No tienes una cuenta?
                        <a
                            href="#"
                            class="font-semibold transition-colors"
                            :style="{ color: siteSettings?.color_primario || '#3B82F6' }"
                            @mouseover="e => (e.target.style.opacity = '0.8')"
                            @mouseleave="e => (e.target.style.opacity = '1')"
                        >
                            Regístrate aquí
                        </a>
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <p class="mt-6 text-xs text-center text-white/60">
                © {{ new Date().getFullYear() }} {{ siteSettings?.nombre_sitio || 'Tu Empresa' }}.
                Todos los derechos reservados.
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { Mail, Eye, EyeOff, LogIn } from 'lucide-vue-next';
import { useSiteSettings } from '@/composables/useSiteSettings';

const router = useRouter();
const toast = useToast();
const { siteSettings } = useSiteSettings();
const loading = ref(false);
const showPassword = ref(false);

const form = reactive({
    email: '',
    password: '',
    remember: false,
});

const errors = reactive({
    email: '',
    password: '',
});

const handleLogin = async () => {
    // Limpiar errores
    errors.email = '';
    errors.password = '';

    // Validaciones básicas
    if (!form.email) {
        errors.email = 'El correo electrónico es requerido';
        return;
    }

    if (!form.password) {
        errors.password = 'La contraseña es requerida';
        return;
    }

    if (form.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
        return;
    }

    loading.value = true;

    try {
        // Simular llamada API (reemplaza con tu lógica de autenticación)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Aquí deberías llamar a tu servicio de autenticación
        // const response = await login(form.email, form.password);

        toast.success('¡Inicio de sesión exitoso!');
        router.push('/dashboard');
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        toast.error('Credenciales inválidas. Por favor, intenta de nuevo.');
        errors.password = 'Credenciales incorrectas';
    } finally {
        loading.value = false;
    }
};

const darkenColor = (color, percent) => {
    if (!color) return '#1e40af';

    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const newR = Math.max(0, Math.floor(r * (1 - percent / 100)));
    const newG = Math.max(0, Math.floor(g * (1 - percent / 100)));
    const newB = Math.max(0, Math.floor(b * (1 - percent / 100)));

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB
        .toString(16)
        .padStart(2, '0')}`;
};
</script>

<style scoped>
@keyframes fade-in-down {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-down {
    animation: fade-in-down 0.6s ease-out;
}

.animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out 0.2s both;
}

/* Smooth focus transitions */
input:focus {
    transition: all 0.2s ease;
}

/* Custom scrollbar for mobile */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
}
</style>
