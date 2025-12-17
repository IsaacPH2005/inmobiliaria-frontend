<template>
    <div
        class="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
    >
        <!-- Background Images -->
        <div class="absolute inset-0 z-0">
            <div
                v-for="(image, index) in backgroundImages"
                :key="index"
                :class="[
                    'absolute inset-0 bg-cover bg-center transition-all duration-[4000ms] ease-in-out',
                    currentImageIndex === index ? 'opacity-50 scale-100' : 'opacity-0 scale-105',
                ]"
                :style="{ backgroundImage: `url(${image})` }"
            />
            <div
                class="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/80 to-slate-900/85"
            />
            <div class="absolute inset-0 backdrop-blur-[2px]" />
        </div>

        <!-- Image Indicators -->
        <div
            v-if="backgroundImages.length > 1"
            class="absolute z-30 top-4 right-4 sm:top-6 sm:right-6"
        >
            <div
                class="flex items-center gap-3 px-5 py-3 border shadow-2xl rounded-2xl bg-slate-900/95 backdrop-blur-xl border-white/20"
            >
                <div class="flex gap-2.5">
                    <button
                        v-for="(_, index) in backgroundImages"
                        :key="index"
                        @click="setCurrentImage(index)"
                        :class="[
                            'transition-all duration-300 border rounded-full',
                            currentImageIndex === index
                                ? 'bg-blue-500 w-8 h-2.5 border-blue-400'
                                : 'bg-white/30 w-2.5 h-2.5 border-white/40 hover:bg-white/50 hover:scale-110',
                        ]"
                        :aria-label="`Ver imagen ${index + 1}`"
                    />
                </div>
                <div class="w-px h-5 bg-white/30" />
                <span class="text-sm font-bold tracking-wide text-white">
                    {{ currentImageIndex + 1 }}/{{ backgroundImages.length }}
                </span>
            </div>
        </div>

        <!-- Building Icon -->
        <div class="absolute z-20 hidden lg:block top-1/4 left-10 animate-float" aria-hidden="true">
            <div
                class="p-4 border shadow-2xl bg-blue-600/20 backdrop-blur-md rounded-2xl border-white/20"
            >
                <svg
                    class="w-20 h-20 text-white drop-shadow-2xl"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 3L2 9v12h20V9l-10-6zm-8 7.5l8-4.8 8 4.8V19h-6v-5h-4v5H4v-8.5z" />
                    <rect x="6" y="13" width="2" height="2" />
                    <rect x="10" y="13" width="2" height="2" />
                    <rect x="14" y="13" width="2" height="2" />
                    <rect x="6" y="9" width="2" height="2" />
                    <rect x="10" y="9" width="2" height="2" />
                    <rect x="14" y="9" width="2" height="2" />
                </svg>
            </div>
        </div>

        <!-- Main Content -->
        <div class="relative z-10 w-full max-w-4xl px-4 py-8 sm:px-6">
            <!-- Header -->
            <div class="mb-8 text-center">
                <!-- Logo Container -->
                <div
                    class="inline-block p-5 mb-6 transition-all duration-300 bg-white border-2 shadow-2xl rounded-3xl backdrop-blur-sm border-blue-200/50 hover:shadow-blue-500/20 hover:scale-105 hover:border-blue-300"
                >
                    <img
                        src="#"
                        alt="Logo Inmobiliaria"
                        class="h-12 mx-auto sm:h-14"
                        onerror="this.style.display='none'"
                    />
                </div>

                <!-- Title Card -->
                <div
                    class="p-6 border-2 shadow-2xl rounded-2xl bg-slate-900/90 backdrop-blur-lg border-white/20"
                >
                    <h1
                        class="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-lg"
                    >
                        Crear Cuenta
                    </h1>
                    <p class="text-base font-semibold text-blue-200 sm:text-lg">
                        Completa tus datos para unirte al equipo
                    </p>
                    <div
                        class="w-24 h-1 mx-auto mt-5 rounded-full shadow-lg bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-blue-500/50"
                    />
                </div>
            </div>

            <!-- Register Form -->
            <div
                class="overflow-hidden bg-white border-2 shadow-2xl backdrop-blur-md rounded-3xl border-blue-100/30"
            >
                <!-- Top Accent Bar -->
                <div
                    class="h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 shadow-lg"
                    aria-hidden="true"
                />

                <div class="p-7 sm:p-9">
                    <form @submit.prevent="handleRegister" class="space-y-8">
                        <!-- Error Message -->
                        <transition
                            enter-active-class="transition duration-300 ease-out"
                            enter-from-class="-translate-y-2 opacity-0"
                            enter-to-class="translate-y-0 opacity-100"
                            leave-active-class="transition duration-200 ease-in"
                            leave-from-class="translate-y-0 opacity-100"
                            leave-to-class="-translate-y-2 opacity-0"
                        >
                            <div
                                v-if="error"
                                class="p-5 border-l-4 border-red-500 shadow-lg rounded-r-xl bg-red-50"
                                role="alert"
                            >
                                <div class="flex items-start gap-4">
                                    <div
                                        class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-500 rounded-full shadow-md"
                                    >
                                        <svg
                                            class="w-5 h-5 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="text-base font-bold text-red-900">
                                            Error en el Registro
                                        </h4>
                                        <p class="mt-1.5 text-sm font-medium text-red-800">
                                            {{ error }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </transition>

                        <!-- Datos de Cuenta -->
                        <div class="pb-6 border-b-2 border-slate-200">
                            <h3
                                class="flex items-center gap-3 mb-6 text-xl font-bold text-slate-900"
                            >
                                <div
                                    class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-xl"
                                >
                                    <svg
                                        class="w-6 h-6 text-blue-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>
                                Datos de Cuenta
                            </h3>

                            <div class="space-y-5">
                                <!-- Email -->
                                <div>
                                    <label
                                        for="email"
                                        class="block mb-3 text-base font-bold text-slate-900"
                                    >
                                        Correo Electrónico *
                                    </label>
                                    <input
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        required
                                        autocomplete="email"
                                        class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                        placeholder="correo@ejemplo.com"
                                    />
                                </div>

                                <!-- Password Fields -->
                                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            for="password"
                                            class="block mb-3 text-base font-bold text-slate-900"
                                        >
                                            Contraseña *
                                        </label>
                                        <input
                                            id="password"
                                            v-model="form.password"
                                            type="password"
                                            required
                                            minlength="8"
                                            autocomplete="new-password"
                                            class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                            placeholder="Mínimo 8 caracteres"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            for="password_confirmation"
                                            class="block mb-3 text-base font-bold text-slate-900"
                                        >
                                            Confirmar Contraseña *
                                        </label>
                                        <input
                                            id="password_confirmation"
                                            v-model="form.password_confirmation"
                                            type="password"
                                            required
                                            autocomplete="new-password"
                                            class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                            placeholder="Confirma tu contraseña"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Datos Personales -->
                        <div class="pb-6 border-b-2 border-slate-200">
                            <h3
                                class="flex items-center gap-3 mb-6 text-xl font-bold text-slate-900"
                            >
                                <div
                                    class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-xl"
                                >
                                    <svg
                                        class="w-6 h-6 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        />
                                    </svg>
                                </div>
                                Datos Personales
                            </h3>

                            <div class="space-y-5">
                                <!-- Nombre y Apellido -->
                                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            for="nombre"
                                            class="block mb-3 text-base font-bold text-slate-900"
                                        >
                                            Nombre *
                                        </label>
                                        <input
                                            id="nombre"
                                            v-model="form.nombre"
                                            type="text"
                                            required
                                            class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            for="apellido"
                                            class="block mb-3 text-base font-bold text-slate-900"
                                        >
                                            Apellido *
                                        </label>
                                        <input
                                            id="apellido"
                                            v-model="form.apellido"
                                            type="text"
                                            required
                                            class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                            placeholder="Tu apellido"
                                        />
                                    </div>
                                </div>

                                <!-- Documento y Celular -->
                                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            for="documento_identidad"
                                            class="block mb-3 text-base font-bold text-slate-900"
                                        >
                                            Documento de Identidad *
                                        </label>
                                        <input
                                            id="documento_identidad"
                                            v-model="form.documento_identidad"
                                            type="text"
                                            required
                                            class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                            placeholder="CI/DNI/Pasaporte"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            for="celular"
                                            class="block mb-3 text-base font-bold text-slate-900"
                                        >
                                            Celular *
                                        </label>
                                        <input
                                            id="celular"
                                            v-model="form.celular"
                                            type="tel"
                                            required
                                            class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                            placeholder="+591 12345678"
                                        />
                                    </div>
                                </div>

                                <!-- Fecha Nacimiento y Género -->
                                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            for="nacimiento"
                                            class="block mb-3 text-base font-bold text-slate-900"
                                        >
                                            Fecha de Nacimiento
                                        </label>
                                        <input
                                            id="nacimiento"
                                            v-model="form.nacimiento"
                                            type="date"
                                            class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            for="genero"
                                            class="block mb-3 text-base font-bold text-slate-900"
                                        >
                                            Género
                                        </label>
                                        <select
                                            id="genero"
                                            v-model="form.genero"
                                            class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                        >
                                            <option value="">Selecciona...</option>
                                            <option value="masculino">Masculino</option>
                                            <option value="femenino">Femenino</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Dirección -->
                        <div class="pb-6">
                            <h3
                                class="flex items-center gap-3 mb-6 text-xl font-bold text-slate-900"
                            >
                                <div
                                    class="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-xl"
                                >
                                    <svg
                                        class="w-6 h-6 text-orange-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>
                                Dirección
                            </h3>

                            <div class="space-y-5">
                                <!-- Dirección completa -->
                                <div>
                                    <label
                                        for="direccion"
                                        class="block mb-3 text-base font-bold text-slate-900"
                                    >
                                        Dirección *
                                    </label>
                                    <input
                                        id="direccion"
                                        v-model="form.direccion"
                                        type="text"
                                        required
                                        class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                        placeholder="Calle, número, zona"
                                    />
                                </div>

                                <!-- Ciudad, Departamento, Código Postal -->
                                <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                    <div>
                                        <label
                                            for="ciudad"
                                            class="block mb-3 text-base font-bold text-slate-900"
                                        >
                                            Ciudad *
                                        </label>
                                        <input
                                            id="ciudad"
                                            v-model="form.ciudad"
                                            type="text"
                                            required
                                            class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                            placeholder="Tu ciudad"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            for="departamento"
                                            class="block mb-3 text-base font-bold text-slate-900"
                                        >
                                            Departamento *
                                        </label>
                                        <input
                                            id="departamento"
                                            v-model="form.departamento"
                                            type="text"
                                            required
                                            class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                            placeholder="Departamento"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            for="codigo_postal"
                                            class="block mb-3 text-base font-bold text-slate-900"
                                        >
                                            Código Postal
                                        </label>
                                        <input
                                            id="codigo_postal"
                                            v-model="form.codigo_postal"
                                            type="text"
                                            class="w-full px-5 py-4 text-base font-medium transition-all duration-200 border-2 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 bg-slate-50 border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 hover:border-slate-400 hover:shadow-md"
                                            placeholder="CP (opcional)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <button
                            type="submit"
                            :disabled="loading"
                            class="w-full px-6 py-4 text-lg font-bold text-white transition-all duration-200 shadow-xl rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-blue-500/30 active:scale-[0.98]"
                        >
                            <span v-if="!loading" class="flex items-center justify-center gap-3">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                                    />
                                </svg>
                                <span>Registrar Cuenta</span>
                            </span>
                            <span v-else class="flex items-center justify-center gap-3">
                                <svg class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    />
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                <span>Registrando...</span>
                            </span>
                        </button>

                        <!-- Security Notice -->
                        <div class="pt-5 border-t-2 border-slate-200">
                            <div
                                class="flex items-center justify-center gap-3 p-4 shadow-sm bg-green-50 rounded-xl"
                            >
                                <svg
                                    class="flex-shrink-0 w-6 h-6 text-green-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <div class="text-left">
                                    <span class="block text-sm font-bold text-green-900">
                                        Registro Seguro SSL/TLS 256-bit
                                    </span>
                                    <span class="block mt-1 text-xs font-semibold text-green-700">
                                        Tus datos están protegidos
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Login Link -->
            <div class="mt-8 text-center">
                <div
                    class="p-6 border-2 shadow-2xl rounded-2xl bg-slate-900/90 backdrop-blur-lg border-white/20"
                >
                    <p class="text-base font-bold text-white">
                        ¿Ya tienes una cuenta?
                        <router-link
                            to="/login"
                            class="ml-2 text-blue-300 underline transition-all hover:text-blue-200 decoration-blue-400/50 underline-offset-4 hover:decoration-blue-300"
                        >
                            Inicia Sesión Aquí
                        </router-link>
                    </p>
                    <div
                        class="flex items-center justify-center gap-3 mt-4 text-sm font-semibold text-white/80"
                    >
                        <span>© 2025 Inmobiliaria Premium</span>
                        <span class="text-white/50">•</span>
                        <span>v1.0.0</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAlert } from '@/composables/useAlert';
import { registerBE } from '@/services/AuthService';
import { Buffer } from 'buffer';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { showSuccess, showError, showLoading, closeLoading, showValidationErrors } = useAlert();

const form = ref({
    email: '',
    password: '',
    password_confirmation: '',
    nombre: '',
    apellido: '',
    documento_identidad: '',
    celular: '',
    direccion: '',
    ciudad: '',
    departamento: '',
    nacimiento: '',
    genero: '',
    codigo_postal: '',
});

const loading = ref(false);
const error = ref('');
const currentImageIndex = ref(0);

const backgroundImages = ref(['/images/imovelwebcomunicacaoltda_quintoandarperu_image_638.jpeg']);

let imageSliderInterval = null;

const setCurrentImage = index => {
    currentImageIndex.value = index;
    if (imageSliderInterval) {
        clearInterval(imageSliderInterval);
        startImageSlider();
    }
};

const handleRegister = async () => {
    loading.value = true;
    error.value = '';

    try {
        showLoading('Creando tu cuenta...');
        const { data } = await registerBE(form.value);

        const tokenEncrypt = Buffer.from(data.token).toString('base64');
        localStorage.setItem('token', tokenEncrypt);

        const userData = {
            id: data.user.id,
            nombre: data.user.general_data.nombre,
            apellido: data.user.general_data.apellido,
            email: data.user.email,
            image: '',
            role: data.user.roles.length > 0 ? data.user.roles[0].name : 'agente',
        };

        localStorage.setItem('user', JSON.stringify(userData));
        closeLoading();

        showSuccess(
            '¡Cuenta Creada Exitosamente!',
            `Bienvenido ${userData.nombre}, tu cuenta ha sido registrada correctamente.`
        );

        setTimeout(() => {
            if (userData.role === 'admin') {
                router.push({ path: '/datos-revelantes' });
            } else if (userData.role === 'agente') {
                router.push({ path: '/agente/dashboard' });
            } else {
                router.push({ path: '/dashboard' });
            }
        }, 1500);
    } catch (err) {
        console.error('Error en registro:', err);
        closeLoading();

        if (err.response?.data?.errors) {
            // Mostrar errores de validación con el nuevo componente
            showValidationErrors(err.response.data.errors);
            error.value = 'Por favor revisa los campos marcados';
        } else {
            const errorMsg =
                err.response?.data?.message || 'Error al crear la cuenta. Intente nuevamente.';
            error.value = errorMsg;
            showError('Error en el registro', errorMsg);
        }
    } finally {
        loading.value = false;
    }
};

const startImageSlider = () => {
    if (backgroundImages.value.length > 1) {
        imageSliderInterval = setInterval(() => {
            currentImageIndex.value = (currentImageIndex.value + 1) % backgroundImages.value.length;
        }, 7000);
    }
};

onMounted(() => {
    startImageSlider();
});

onUnmounted(() => {
    if (imageSliderInterval) {
        clearInterval(imageSliderInterval);
    }
});
</script>

<style scoped>
@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-12px);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Custom focus styles */
button:focus-visible,
input:focus-visible,
select:focus-visible,
a:focus-visible {
    outline: 3px solid #3b82f6;
    outline-offset: 3px;
}

/* Ensure proper viewport height on mobile */
@supports (-webkit-touch-callout: none) {
    .min-h-screen {
        min-height: -webkit-fill-available;
    }
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: #3b82f6;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #2563eb;
}
</style>
