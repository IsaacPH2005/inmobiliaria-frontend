<template>
    <div class="min-h-screen p-4 lg:p-6 bg-neutral-50">
        <!-- Welcome Section -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-neutral-900 lg:text-3xl">
                ¡Bienvenido de vuelta, {{ userName }}!
            </h1>
            <p class="mt-1 text-sm text-neutral-600 lg:text-base">
                Aquí está el resumen de tu inmobiliaria hoy
            </p>
        </div>

        <!-- Stats Cards Grid -->
        <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
            <!-- Card 1: Total Propiedades -->
            <div
                class="relative p-5 overflow-hidden transition-all duration-300 bg-white border rounded-xl border-neutral-200 hover:shadow-lg group"
            >
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-3">
                        <div
                            class="flex items-center justify-center w-12 h-12 transition-colors rounded-lg bg-primary-100 group-hover:bg-primary-200"
                        >
                            <svg
                                class="w-6 h-6 text-primary-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <span
                            class="px-2 py-1 text-xs font-semibold rounded-full text-secondary-700 bg-secondary-100"
                        >
                            +12%
                        </span>
                    </div>
                    <p class="text-sm font-medium text-neutral-600">Total Propiedades</p>
                    <p class="mt-1 text-3xl font-bold text-neutral-900">{{ totalProperties }}</p>
                    <p class="mt-2 text-xs text-neutral-500">
                        {{ availableProperties }} disponibles
                    </p>
                </div>
                <div
                    class="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 transition-transform duration-300 rounded-full opacity-10 bg-primary-500 group-hover:scale-110"
                />
            </div>

            <!-- Card 2: Clientes Activos -->
            <div
                class="relative p-5 overflow-hidden transition-all duration-300 bg-white border rounded-xl border-neutral-200 hover:shadow-lg group"
            >
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-3">
                        <div
                            class="flex items-center justify-center w-12 h-12 transition-colors rounded-lg bg-secondary-100 group-hover:bg-secondary-200"
                        >
                            <svg
                                class="w-6 h-6 text-secondary-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </div>
                        <span
                            class="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full"
                        >
                            +8%
                        </span>
                    </div>
                    <p class="text-sm font-medium text-neutral-600">Clientes Activos</p>
                    <p class="mt-1 text-3xl font-bold text-neutral-900">{{ activeClients }}</p>
                    <p class="mt-2 text-xs text-neutral-500">{{ newClients }} nuevos este mes</p>
                </div>
                <div
                    class="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 transition-transform duration-300 rounded-full opacity-10 bg-secondary-500 group-hover:scale-110"
                />
            </div>

            <!-- Card 3: Ingresos Mensuales -->
            <div
                class="relative p-5 overflow-hidden transition-all duration-300 bg-white border rounded-xl border-neutral-200 hover:shadow-lg group"
            >
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-3">
                        <div
                            class="flex items-center justify-center w-12 h-12 transition-colors rounded-lg bg-accent-100 group-hover:bg-accent-200"
                        >
                            <svg
                                class="w-6 h-6 text-accent-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <span
                            class="px-2 py-1 text-xs font-semibold rounded-full text-secondary-700 bg-secondary-100"
                        >
                            +24%
                        </span>
                    </div>
                    <p class="text-sm font-medium text-neutral-600">Ingresos Mensuales</p>
                    <p class="mt-1 text-3xl font-bold text-neutral-900">{{ monthlyRevenue }}</p>
                    <p class="mt-2 text-xs text-neutral-500">vs. mes anterior</p>
                </div>
                <div
                    class="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 transition-transform duration-300 rounded-full opacity-10 bg-accent-500 group-hover:scale-110"
                />
            </div>

            <!-- Card 4: Visitas Programadas -->
            <div
                class="relative p-5 overflow-hidden transition-all duration-300 bg-white border rounded-xl border-neutral-200 hover:shadow-lg group"
            >
                <div class="relative z-10">
                    <div class="flex items-center justify-between mb-3">
                        <div
                            class="flex items-center justify-center w-12 h-12 transition-colors bg-purple-100 rounded-lg group-hover:bg-purple-200"
                        >
                            <svg
                                class="w-6 h-6 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <span
                            class="px-2 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full"
                        >
                            Hoy
                        </span>
                    </div>
                    <p class="text-sm font-medium text-neutral-600">Visitas Programadas</p>
                    <p class="mt-1 text-3xl font-bold text-neutral-900">{{ scheduledVisits }}</p>
                    <p class="mt-2 text-xs text-neutral-500">{{ pendingVisits }} pendientes</p>
                </div>
                <div
                    class="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 transition-transform duration-300 bg-purple-500 rounded-full opacity-10 group-hover:scale-110"
                />
            </div>
        </div>

        <!-- Charts & Activity Section -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <!-- Recent Activity -->
            <div class="lg:col-span-2">
                <div class="p-6 bg-white border rounded-xl border-neutral-200">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-bold text-neutral-900">Actividad Reciente</h2>
                        <button
                            class="text-sm font-medium transition-colors text-primary-600 hover:text-primary-700"
                        >
                            Ver todo
                        </button>
                    </div>

                    <div class="space-y-4">
                        <div
                            v-for="activity in recentActivities"
                            :key="activity.id"
                            class="flex items-start gap-4 p-3 transition-colors rounded-lg hover:bg-neutral-50"
                        >
                            <div
                                :class="[
                                    'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                                    activity.type === 'new'
                                        ? 'bg-secondary-100 text-secondary-600'
                                        : activity.type === 'sale'
                                        ? 'bg-accent-100 text-accent-600'
                                        : 'bg-primary-100 text-primary-600',
                                ]"
                            >
                                <svg
                                    class="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        v-if="activity.type === 'new'"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                    <path
                                        v-else-if="activity.type === 'sale'"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                    <path
                                        v-else
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-neutral-900">
                                    {{ activity.title }}
                                </p>
                                <p class="mt-1 text-sm text-neutral-600">
                                    {{ activity.description }}
                                </p>
                                <p class="mt-1 text-xs text-neutral-400">{{ activity.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="space-y-6">
                <!-- Quick Actions Card -->
                <div class="p-6 bg-white border rounded-xl border-neutral-200">
                    <h2 class="mb-4 text-lg font-bold text-neutral-900">Acciones Rápidas</h2>
                    <div class="space-y-3">
                        <button
                            class="flex items-center justify-between w-full p-3 text-left transition-all border rounded-lg border-neutral-200 hover:border-primary-500 hover:bg-primary-50 group"
                        >
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-primary-100 group-hover:bg-primary-200"
                                >
                                    <svg
                                        class="w-5 h-5 text-primary-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-neutral-900"
                                    >Nueva Propiedad</span
                                >
                            </div>
                            <svg
                                class="w-5 h-5 transition-transform text-neutral-400 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        <button
                            class="flex items-center justify-between w-full p-3 text-left transition-all border rounded-lg border-neutral-200 hover:border-secondary-500 hover:bg-secondary-50 group"
                        >
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-secondary-100 group-hover:bg-secondary-200"
                                >
                                    <svg
                                        class="w-5 h-5 text-secondary-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-neutral-900"
                                    >Nuevo Cliente</span
                                >
                            </div>
                            <svg
                                class="w-5 h-5 transition-transform text-neutral-400 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>

                        <button
                            class="flex items-center justify-between w-full p-3 text-left transition-all border rounded-lg border-neutral-200 hover:border-accent-500 hover:bg-accent-50 group"
                        >
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-accent-100 group-hover:bg-accent-200"
                                >
                                    <svg
                                        class="w-5 h-5 text-accent-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-neutral-900"
                                    >Programar Visita</span
                                >
                            </div>
                            <svg
                                class="w-5 h-5 transition-transform text-neutral-400 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Top Properties -->
                <div class="p-6 bg-white border rounded-xl border-neutral-200">
                    <h2 class="mb-4 text-lg font-bold text-neutral-900">Propiedades Destacadas</h2>
                    <div class="space-y-3">
                        <div
                            v-for="property in topProperties"
                            :key="property.id"
                            class="flex items-center gap-3 p-3 transition-colors rounded-lg hover:bg-neutral-50"
                        >
                            <img
                                :src="property.image"
                                :alt="property.name"
                                class="object-cover w-12 h-12 rounded-lg"
                                onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'"
                            />
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold truncate text-neutral-900">
                                    {{ property.name }}
                                </p>
                                <p class="text-xs text-neutral-600">{{ property.price }}</p>
                            </div>
                            <div
                                class="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full text-secondary-700 bg-secondary-100"
                            >
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                    />
                                </svg>
                                <span>{{ property.views }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// User data
const userName = ref('Administrador');

// Stats
const totalProperties = ref(248);
const availableProperties = ref(186);
const activeClients = ref(342);
const newClients = ref(28);
const monthlyRevenue = ref('$124,500');
const scheduledVisits = ref(15);
const pendingVisits = ref(8);

// Recent Activities
const recentActivities = ref([
    {
        id: 1,
        type: 'new',
        title: 'Nueva propiedad agregada',
        description: 'Casa de 3 habitaciones en Zona Norte',
        time: 'Hace 5 minutos',
    },
    {
        id: 2,
        type: 'sale',
        title: 'Venta completada',
        description: 'Apartamento en Centro - $85,000',
        time: 'Hace 1 hora',
    },
    {
        id: 3,
        type: 'visit',
        title: 'Visita programada',
        description: 'Casa Colonial - Mañana 10:00 AM',
        time: 'Hace 2 horas',
    },
    {
        id: 4,
        type: 'new',
        title: 'Nuevo cliente registrado',
        description: 'Juan Pérez - Buscando apartamento',
        time: 'Hace 3 horas',
    },
]);

// Top Properties
const topProperties = ref([
    {
        id: 1,
        name: 'Casa Moderna Zona Norte',
        price: '$250,000',
        views: '128',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
    },
    {
        id: 2,
        name: 'Apartamento Centro',
        price: '$120,000',
        views: '95',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    },
    {
        id: 3,
        name: 'Villa con Piscina',
        price: '$380,000',
        views: '87',
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400',
    },
]);
</script>

<style scoped>
/* Smooth animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f5f5f5;
}

::-webkit-scrollbar-thumb {
    background: #d4d4d4;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #a3a3a3;
}
</style>
