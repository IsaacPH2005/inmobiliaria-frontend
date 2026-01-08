<template>
    <div class="login-container">
        <!-- Animated background elements -->
        <div class="background-wrapper">
            <!-- Circles decorativos -->
            <div class="bg-circle bg-circle-1"></div>
            <div class="bg-circle bg-circle-2"></div>
            <div class="bg-circle bg-circle-3"></div>

            <!-- Grid pattern -->
            <div class="grid-pattern"></div>
        </div>

        <!-- Back Button - Mobile First -->
        <button @click="goBack" class="back-button" aria-label="Volver">
            <div class="back-button-content">
                <ArrowLeft :size="20" class="back-icon" />
                <span class="back-text">Volver</span>
            </div>
        </button>

        <!-- Login Card - Mobile First -->
        <div class="login-wrapper">
            <!-- Logo -->
            <div class="logo-section">
                <div class="logo-container">
                    <img
                        v-if="siteSettings?.logo_url"
                        src="/images/logos/Logo_blanco.png"
                        :alt="siteSettings?.nombre_sitio || 'Logo'"
                        class="logo-image"
                    />
                </div>
            </div>

            <!-- Card -->
            <div class="login-card">
                <div class="card-content">
                    <!-- Header -->
                    <div class="card-header">
                        <h2 class="card-title">Iniciar Sesión</h2>
                        <p class="card-subtitle">Ingresa tus credenciales para continuar</p>
                    </div>

                    <!-- Formulario -->
                    <form @submit.prevent="handleLogin" class="login-form">
                        <!-- Email -->
                        <div class="form-group">
                            <label for="email" class="form-label">Correo Electrónico</label>
                            <div class="input-wrapper">
                                <input
                                    id="email"
                                    v-model="email"
                                    type="email"
                                    required
                                    autocomplete="email"
                                    placeholder="tu@email.com"
                                    class="form-input"
                                    :class="{ 'input-error': emailError }"
                                    :style="
                                        !emailError
                                            ? {
                                                  '--ring-color':
                                                      siteSettings?.color_primario || '#3B82F6',
                                              }
                                            : {}
                                    "
                                    @input="clearEmailError"
                                />
                                <Mail :size="18" class="input-icon" />
                            </div>
                            <p v-if="emailError" class="error-message">{{ emailError }}</p>
                        </div>

                        <!-- Password -->
                        <div class="form-group">
                            <label for="password" class="form-label">Contraseña</label>
                            <div class="input-wrapper">
                                <input
                                    id="password"
                                    v-model="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    required
                                    autocomplete="current-password"
                                    placeholder="Introduce tu contraseña"
                                    class="form-input password-input"
                                    :class="{ 'input-error': passwordError }"
                                    :style="
                                        !passwordError
                                            ? {
                                                  '--ring-color':
                                                      siteSettings?.color_primario || '#3B82F6',
                                              }
                                            : {}
                                    "
                                    @input="clearPasswordError"
                                />
                                <button
                                    type="button"
                                    @click="togglePasswordVisibility"
                                    class="password-toggle"
                                    aria-label="Mostrar/Ocultar contraseña"
                                >
                                    <Eye v-if="!showPassword" :size="18" />
                                    <EyeOff v-else :size="18" />
                                </button>
                            </div>
                            <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
                        </div>

                        <!-- Remember & Forgot -->
                        <div class="form-actions">
                            <label class="remember-label">
                                <input
                                    v-model="remember"
                                    type="checkbox"
                                    class="remember-checkbox"
                                    :style="{
                                        accentColor: siteSettings?.color_primario || '#3B82F6',
                                    }"
                                />
                                <span class="remember-text">Recordarme</span>
                            </label>
                            <a
                                href="#"
                                class="forgot-link"
                                :style="{ color: siteSettings?.color_primario || '#3B82F6' }"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <!-- Submit Button -->
                        <button
                            type="submit"
                            :disabled="isLoading"
                            class="submit-button"
                            :style="{
                                background: `linear-gradient(135deg, ${
                                    siteSettings?.color_primario || '#3B82F6'
                                }, ${darkenColor(siteSettings?.color_primario || '#3B82F6', 15)})`,
                            }"
                        >
                            <span v-if="isLoading" class="button-content">
                                <svg class="spinner" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        class="spinner-circle"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="spinner-path"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Iniciando sesión...
                            </span>
                            <span v-else class="button-content">
                                <LogIn :size="18" />
                                Iniciar sesión
                            </span>
                        </button>
                    </form>

                    <!-- Register Link -->
                    <p class="register-text">
                        ¿No tienes una cuenta?
                        <a
                            href="#"
                            class="register-link"
                            :style="{ color: siteSettings?.color_primario || '#3B82F6' }"
                        >
                            Regístrate aquí
                        </a>
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <p class="footer-text">
                © {{ currentYear }} {{ siteSettings?.nombre_sitio || 'Tu Empresa' }}. Todos los
                derechos reservados.
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { Mail, Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-vue-next';
import { useSiteSettings } from '@/composables/useSiteSettings';
import { loginBE } from '@/services/AuthService';
import { Buffer } from 'buffer';

const router = useRouter();
const toast = useToast();
const { siteSettings } = useSiteSettings();

const email = ref('');
const password = ref('');
const remember = ref(false);
const isLoading = ref(false);
const showPassword = ref(false);
const emailError = ref('');
const passwordError = ref('');

const currentYear = computed(() => new Date().getFullYear());

const goBack = () => {
    if (window.history.length > 1) {
        router.back();
    } else {
        router.push('/');
    }
};

const clearEmailError = () => {
    emailError.value = '';
};

const clearPasswordError = () => {
    passwordError.value = '';
};

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const validateForm = () => {
    let isValid = true;
    emailError.value = '';
    passwordError.value = '';

    if (!email.value) {
        emailError.value = 'El correo electrónico es requerido';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.value = 'Ingresa un correo electrónico válido';
        isValid = false;
    }

    if (!password.value) {
        passwordError.value = 'La contraseña es requerida';
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.value = 'La contraseña debe tener al menos 6 caracteres';
        isValid = false;
    }

    return isValid;
};

const handleLogin = async () => {
    if (!validateForm()) {
        return;
    }

    isLoading.value = true;

    try {
        const { data } = await loginBE({
            email: email.value,
            password: password.value,
            remember: remember.value,
        });
        console.log(data);
        // 🔹 Usar Buffrr para encriptar el token
        const tokenEncrypt = Buffer.from(data.token).toString('base64');
        localStorage.setItem('token', tokenEncrypt);

        const userData = {
            id: data.user.id,
            nombre: data.user.general_data?.nombre || '',
            apellido: data.user.general_data?.apellido || '',
            email: data.user.email,
            image: data.user.general_data?.image || '',
            role: data.user.roles && data.user.roles.length > 0 ? data.user.roles[0].name : 'user',
        };

        localStorage.setItem('user', JSON.stringify(userData));

        toast.success('¡Inicio de sesión exitoso!', {
            position: 'top-right',
            timeout: 3000,
        });

        setTimeout(() => {
            router.push('/');
        }, 500);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);

        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            if (errors?.email) {
                emailError.value = errors.email[0];
            }
            if (errors?.password) {
                passwordError.value = errors.password[0];
            }
        } else if (error.response?.status === 401) {
            passwordError.value = 'Credenciales incorrectas';
            toast.error('Credenciales inválidas. Por favor, intenta de nuevo.', {
                position: 'top-right',
                timeout: 4000,
            });
        } else {
            toast.error('Error al iniciar sesión. Por favor, intenta de nuevo.', {
                position: 'top-right',
                timeout: 4000,
            });
        }
    } finally {
        isLoading.value = false;
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
/* Reset y base */
* {
    -webkit-tap-highlight-color: transparent;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Container principal - FIX para WebView */
.login-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0a1628 0%, #132540 50%, #1a3a5c 100%);
    overflow: hidden;
    margin: 0;
    padding: 0;
}

/* Background wrapper */
.background-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
}

/* Circles decorativos */
.bg-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    animation: pulse 3s ease-in-out infinite;
}

.bg-circle-1 {
    top: 0;
    left: 0;
    width: 280px;
    height: 280px;
    background: rgba(59, 130, 246, 0.05);
}

.bg-circle-2 {
    bottom: 0;
    right: 0;
    width: 280px;
    height: 280px;
    background: rgba(168, 85, 247, 0.05);
    animation-delay: 1s;
}

.bg-circle-3 {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 280px;
    height: 280px;
    background: rgba(6, 182, 212, 0.05);
    animation-delay: 2s;
}

@media (min-width: 640px) {
    .bg-circle-1,
    .bg-circle-2,
    .bg-circle-3 {
        width: 384px;
        height: 384px;
    }
}

/* Grid pattern */
.grid-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItMnptMCAwdjItMnptMCAwdjItMnptMCAwdjItMnoiLz48L2c+PC9nPjwvc3ZnPg==');
    opacity: 0.3;
}

/* Back Button */
.back-button {
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 50;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: transform 0.2s;
}

.back-button:active {
    transform: scale(0.95);
}

.back-button-content {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background 0.2s;
}

.back-button:hover .back-button-content {
    background: rgba(255, 255, 255, 0.2);
}

.back-icon {
    color: white;
    transition: transform 0.2s;
}

.back-button:hover .back-icon {
    transform: translateX(-4px);
}

.back-text {
    display: none;
    font-size: 14px;
    font-weight: 500;
    color: white;
}

@media (min-width: 640px) {
    .back-button {
        top: 24px;
        left: 24px;
    }

    .back-button-content {
        padding: 10px 16px;
    }

    .back-text {
        display: inline;
    }
}

/* Login Wrapper */
.login-wrapper {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 448px;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media (min-width: 640px) {
    .login-wrapper {
        padding: 0 24px;
    }
}

/* Logo Section */
.logo-section {
    margin-bottom: 24px;
    text-align: center;
    animation: fadeInDown 0.6s ease-out;
}

.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
}

.logo-image {
    width: auto;
    height: 48px;
}

@media (min-width: 640px) {
    .logo-section {
        margin-bottom: 32px;
    }

    .logo-container {
        margin-bottom: 24px;
    }

    .logo-image {
        height: 64px;
    }
}

/* Login Card */
.login-card {
    width: 100%;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    backdrop-filter: blur(16px);
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    animation: fadeInUp 0.6s ease-out 0.2s both;
}

@media (min-width: 640px) {
    .login-card {
        border-radius: 16px;
    }
}

/* Card Content */
.card-content {
    padding: 24px;
}

@media (min-width: 640px) {
    .card-content {
        padding: 32px;
    }
}

@media (min-width: 1024px) {
    .card-content {
        padding: 40px;
    }
}

/* Card Header */
.card-header {
    margin-bottom: 24px;
    text-align: center;
}

@media (min-width: 640px) {
    .card-header {
        margin-bottom: 32px;
    }
}

.card-title {
    font-size: 20px;
    font-weight: 700;
    color: #1f2937;
}

@media (min-width: 640px) {
    .card-title {
        font-size: 24px;
    }
}

.card-subtitle {
    margin-top: 8px;
    font-size: 14px;
    color: #6b7280;
}

/* Form */
.login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

@media (min-width: 640px) {
    .login-form {
        gap: 24px;
    }
}

/* Form Group */
.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
}

/* Input Wrapper */
.input-wrapper {
    position: relative;
}

.form-input {
    width: 100%;
    padding: 12px 16px;
    padding-right: 44px;
    font-size: 14px;
    color: #1f2937;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    transition: all 0.2s;
    outline: none;
}

.form-input::placeholder {
    color: #9ca3af;
}

.form-input:focus {
    background-color: white;
    border-color: var(--ring-color, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input.input-error {
    border-color: #ef4444;
}

.form-input.input-error:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

@media (min-width: 640px) {
    .form-input {
        font-size: 16px;
    }
}

.password-input {
    padding-right: 48px;
}

.input-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    pointer-events: none;
}

@media (min-width: 640px) {
    .input-icon {
        width: 20px;
        height: 20px;
    }
}

.password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
}

.password-toggle:hover {
    color: #4b5563;
}

.password-toggle:active {
    transform: translateY(-50%) scale(0.95);
}

.error-message {
    font-size: 12px;
    color: #ef4444;
}

@media (min-width: 640px) {
    .error-message {
        font-size: 14px;
    }
}

/* Form Actions */
.form-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
}

@media (min-width: 640px) {
    .form-actions {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 0;
    }
}

.remember-label {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.remember-checkbox {
    width: 16px;
    height: 16px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    transition: all 0.2s;
    cursor: pointer;
}

.remember-checkbox:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.remember-text {
    margin-left: 8px;
    font-size: 14px;
    color: #4b5563;
}

.remember-label:hover .remember-text {
    color: #1f2937;
}

.forgot-link {
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: opacity 0.2s;
}

.forgot-link:hover {
    opacity: 0.8;
}

/* Submit Button */
.submit-button {
    position: relative;
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    border: none;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.2s;
}

.submit-button:hover:not(:disabled) {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: scale(1.02);
}

.submit-button:active:not(:disabled) {
    transform: scale(0.98);
}

.submit-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

@media (min-width: 640px) {
    .submit-button {
        font-size: 18px;
    }
}

.button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.spinner {
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
}

.spinner-circle {
    opacity: 0.25;
}

.spinner-path {
    opacity: 0.75;
}

/* Register Text */
.register-text {
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
    color: #4b5563;
}

@media (min-width: 640px) {
    .register-text {
        margin-top: 24px;
    }
}

.register-link {
    font-weight: 600;
    text-decoration: none;
    transition: opacity 0.2s;
}

.register-link:hover {
    opacity: 0.8;
}

/* Footer */
.footer-text {
    margin-top: 16px;
    font-size: 12px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
}

@media (min-width: 640px) {
    .footer-text {
        margin-top: 24px;
    }
}

/* Animations */
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
