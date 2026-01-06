<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <!-- Hero Section - Mobile First -->
        <section
            class="relative py-12 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 sm:py-16 lg:py-20"
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
                    Nuestros Servicios
                </h1>
                <p class="max-w-2xl mx-auto text-base text-blue-100 sm:text-lg lg:text-xl">
                    Soluciones integrales en bienes raíces diseñadas para hacer realidad tus
                    objetivos inmobiliarios
                </p>
            </div>
        </section>

        <!-- Main Services - Mobile First Grid -->
        <section class="py-12 sm:py-16 lg:py-24">
            <div class="container px-4 mx-auto sm:px-6">
                <div class="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <!-- Service Card 1 - Compra y Venta -->
                    <div
                        class="overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl sm:rounded-2xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.99]"
                    >
                        <div class="p-6 text-center sm:p-8">
                            <div
                                class="inline-flex items-center justify-center w-16 h-16 mb-4 transition-transform rounded-full sm:w-20 sm:h-20 sm:mb-6 bg-gradient-to-br from-blue-500 to-blue-600 group-hover:scale-110"
                            >
                                <Home :size="28" class="text-white sm:w-9 sm:h-9" />
                            </div>
                            <h3 class="mb-3 text-xl font-bold text-gray-800 sm:text-2xl sm:mb-4">
                                Compra y Venta
                            </h3>
                            <p
                                class="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base sm:mb-6"
                            >
                                Asesoría especializada en la compra y venta de propiedades. Te
                                acompañamos en cada paso del proceso para garantizar las mejores
                                condiciones.
                            </p>
                            <ul class="space-y-2 text-left text-gray-600 sm:space-y-2.5">
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base">Evaluación de mercado</span>
                                </li>
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base"
                                        >Negociación profesional</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base"
                                        >Gestión documental completa</span
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Service Card 2 - Alquiler -->
                    <div
                        class="overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl sm:rounded-2xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.99]"
                    >
                        <div class="p-6 text-center sm:p-8">
                            <div
                                class="inline-flex items-center justify-center w-16 h-16 mb-4 transition-transform rounded-full sm:w-20 sm:h-20 sm:mb-6 bg-gradient-to-br from-purple-500 to-purple-600 group-hover:scale-110"
                            >
                                <Key :size="28" class="text-white sm:w-9 sm:h-9" />
                            </div>
                            <h3 class="mb-3 text-xl font-bold text-gray-800 sm:text-2xl sm:mb-4">
                                Alquiler y Administración
                            </h3>
                            <p
                                class="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base sm:mb-6"
                            >
                                Gestión integral de propiedades en alquiler. Nos encargamos de todo
                                para que disfrutes de tu inversión sin preocupaciones.
                            </p>
                            <ul class="space-y-2 text-left text-gray-600 sm:space-y-2.5">
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base">Búsqueda de inquilinos</span>
                                </li>
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base"
                                        >Contratos y documentación</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base"
                                        >Mantenimiento preventivo</span
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Service Card 3 - Inversión -->
                    <div
                        class="overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl sm:rounded-2xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.99]"
                    >
                        <div class="p-6 text-center sm:p-8">
                            <div
                                class="inline-flex items-center justify-center w-16 h-16 mb-4 transition-transform rounded-full sm:w-20 sm:h-20 sm:mb-6 bg-gradient-to-br from-green-500 to-green-600 group-hover:scale-110"
                            >
                                <TrendingUp :size="28" class="text-white sm:w-9 sm:h-9" />
                            </div>
                            <h3 class="mb-3 text-xl font-bold text-gray-800 sm:text-2xl sm:mb-4">
                                Asesoría de Inversión
                            </h3>
                            <p
                                class="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base sm:mb-6"
                            >
                                Análisis de mercado y oportunidades de inversión inmobiliaria.
                                Maximiza el retorno de tu capital con estrategias personalizadas.
                            </p>
                            <ul class="space-y-2 text-left text-gray-600 sm:space-y-2.5">
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base"
                                        >Análisis de rentabilidad</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base">Portfolio inmobiliario</span>
                                </li>
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base"
                                        >Proyecciones de mercado</span
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Service Card 4 - Legal -->
                    <div
                        class="overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl sm:rounded-2xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.99]"
                    >
                        <div class="p-6 text-center sm:p-8">
                            <div
                                class="inline-flex items-center justify-center w-16 h-16 mb-4 transition-transform rounded-full sm:w-20 sm:h-20 sm:mb-6 bg-gradient-to-br from-orange-500 to-orange-600 group-hover:scale-110"
                            >
                                <FileText :size="28" class="text-white sm:w-9 sm:h-9" />
                            </div>
                            <h3 class="mb-3 text-xl font-bold text-gray-800 sm:text-2xl sm:mb-4">
                                Asesoría Legal
                            </h3>
                            <p
                                class="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base sm:mb-6"
                            >
                                Soporte legal especializado en transacciones inmobiliarias. Protege
                                tus intereses con asesoría jurídica experta.
                            </p>
                            <ul class="space-y-2 text-left text-gray-600 sm:space-y-2.5">
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base"
                                        >Verificación de documentos</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base"
                                        >Contratos personalizados</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base"
                                        >Resolución de conflictos</span
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Service Card 5 - Marketing -->
                    <div
                        class="overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl sm:rounded-2xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.99]"
                    >
                        <div class="p-6 text-center sm:p-8">
                            <div
                                class="inline-flex items-center justify-center w-16 h-16 mb-4 transition-transform rounded-full sm:w-20 sm:h-20 sm:mb-6 bg-gradient-to-br from-red-500 to-red-600 group-hover:scale-110"
                            >
                                <Camera :size="28" class="text-white sm:w-9 sm:h-9" />
                            </div>
                            <h3 class="mb-3 text-xl font-bold text-gray-800 sm:text-2xl sm:mb-4">
                                Marketing Inmobiliario
                            </h3>
                            <p
                                class="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base sm:mb-6"
                            >
                                Estrategias de marketing digital para destacar tu propiedad. Alcanza
                                a más compradores potenciales con campañas efectivas.
                            </p>
                            <ul class="space-y-2 text-left text-gray-600 sm:space-y-2.5">
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base">Fotografía profesional</span>
                                </li>
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base">Tours virtuales 360°</span>
                                </li>
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base"
                                        >Campañas en redes sociales</span
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Service Card 6 - Valuación -->
                    <div
                        class="overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-xl sm:rounded-2xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.99]"
                    >
                        <div class="p-6 text-center sm:p-8">
                            <div
                                class="inline-flex items-center justify-center w-16 h-16 mb-4 transition-transform rounded-full sm:w-20 sm:h-20 sm:mb-6 bg-gradient-to-br from-indigo-500 to-indigo-600 group-hover:scale-110"
                            >
                                <Calculator :size="28" class="text-white sm:w-9 sm:h-9" />
                            </div>
                            <h3 class="mb-3 text-xl font-bold text-gray-800 sm:text-2xl sm:mb-4">
                                Valuación de Propiedades
                            </h3>
                            <p
                                class="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base sm:mb-6"
                            >
                                Avalúos precisos basados en análisis de mercado. Conoce el valor
                                real de tu propiedad con estudios técnicos detallados.
                            </p>
                            <ul class="space-y-2 text-left text-gray-600 sm:space-y-2.5">
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base">Inspección detallada</span>
                                </li>
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base">Análisis comparativo</span>
                                </li>
                                <li class="flex items-start">
                                    <Check
                                        :size="18"
                                        class="flex-shrink-0 mt-0.5 mr-2 text-green-500 sm:w-5 sm:h-5"
                                    />
                                    <span class="text-sm sm:text-base"
                                        >Informe técnico certificado</span
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section - Mobile First -->
        <section class="py-12 bg-gradient-to-r from-blue-600 to-blue-800 sm:py-16">
            <div class="container px-4 mx-auto text-center sm:px-6">
                <h2 class="mb-4 text-2xl font-bold text-white sm:text-3xl sm:mb-6 lg:text-4xl">
                    ¿Listo para comenzar?
                </h2>
                <p class="max-w-2xl mx-auto mb-6 text-base text-blue-100 sm:text-lg sm:mb-8">
                    Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos
                    inmobiliarios
                </p>
                <router-link
                    to="/contacto"
                    class="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-blue-600 transition-all duration-200 bg-white shadow-xl sm:px-8 sm:py-4 sm:text-lg rounded-xl sm:rounded-full hover:shadow-2xl hover:scale-105 active:scale-95"
                >
                    <MessageCircle :size="20" class="sm:w-6 sm:h-6" />
                    <span>Contactar Ahora</span>
                </router-link>
            </div>
        </section>
    </div>
</template>

<script setup>
import {
    Home,
    Key,
    TrendingUp,
    FileText,
    Camera,
    Calculator,
    Check,
    MessageCircle,
} from 'lucide-vue-next';
</script>

<style scoped>
/* Touch optimization */
* {
    -webkit-tap-highlight-color: transparent;
}

/* Smooth transitions */
@media (hover: hover) {
    .hover\:shadow-2xl:hover {
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .hover\:-translate-y-1:hover {
        transform: translateY(-0.25rem);
    }

    .hover\:scale-105:hover {
        transform: scale(1.05);
    }
}
</style>
