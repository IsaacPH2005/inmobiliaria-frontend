<template>
    <div class="min-h-screen nosotros-page bg-gradient-to-b from-gray-50 to-white">
        <!-- Hero Section - Mobile First -->
        <section
            class="relative py-12 overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 sm:py-16 lg:py-20"
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
                    Sobre Nosotros
                </h1>
                <p class="max-w-2xl mx-auto text-base text-purple-100 sm:text-lg lg:text-xl">
                    Más de una década conectando personas con sus hogares ideales
                </p>
            </div>
        </section>

        <!-- Mission & Vision - Mobile First -->
        <section class="py-12 sm:py-16 lg:py-24">
            <div class="container px-4 mx-auto sm:px-6">
                <div class="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
                    <!-- Mission -->
                    <div
                        class="overflow-hidden transition-all duration-300 bg-white shadow-xl group rounded-xl sm:rounded-2xl hover:shadow-2xl active:scale-[0.99]"
                    >
                        <div class="p-6 sm:p-8 lg:p-12">
                            <div
                                class="inline-flex items-center justify-center mb-4 transition-transform rounded-full w-14 h-14 sm:w-16 sm:h-16 sm:mb-6 bg-gradient-to-br from-blue-500 to-blue-600 group-hover:scale-110"
                            >
                                <Target :size="26" class="text-white sm:w-8 sm:h-8" />
                            </div>
                            <h2 class="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl sm:mb-4">
                                Nuestra Misión
                            </h2>
                            <p class="text-sm leading-relaxed text-gray-600 sm:text-base">
                                Facilitar el acceso a propiedades inmobiliarias de calidad,
                                brindando un servicio profesional, transparente y personalizado que
                                supere las expectativas de nuestros clientes. Nos comprometemos a
                                ser el puente confiable entre vendedores y compradores, garantizando
                                transacciones seguras y exitosas.
                            </p>
                        </div>
                    </div>

                    <!-- Vision -->
                    <div
                        class="overflow-hidden transition-all duration-300 bg-white shadow-xl group rounded-xl sm:rounded-2xl hover:shadow-2xl active:scale-[0.99]"
                    >
                        <div class="p-6 sm:p-8 lg:p-12">
                            <div
                                class="inline-flex items-center justify-center mb-4 transition-transform rounded-full w-14 h-14 sm:w-16 sm:h-16 sm:mb-6 bg-gradient-to-br from-purple-500 to-purple-600 group-hover:scale-110"
                            >
                                <Eye :size="26" class="text-white sm:w-8 sm:h-8" />
                            </div>
                            <h2 class="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl sm:mb-4">
                                Nuestra Visión
                            </h2>
                            <p class="text-sm leading-relaxed text-gray-600 sm:text-base">
                                Ser la inmobiliaria líder reconocida por nuestra innovación,
                                integridad y excelencia en el servicio. Aspiramos a transformar la
                                experiencia inmobiliaria mediante tecnología de vanguardia y un
                                equipo humano comprometido con el éxito de cada cliente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Values - Mobile First -->
        <section class="py-12 bg-gray-50 sm:py-16 lg:py-24">
            <div class="container px-4 mx-auto sm:px-6">
                <div class="mb-8 text-center sm:mb-12">
                    <h2
                        class="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl sm:mb-4 lg:text-4xl"
                    >
                        Nuestros Valores
                    </h2>
                    <p class="max-w-2xl mx-auto text-base text-gray-600 sm:text-lg">
                        Los principios que guían cada una de nuestras acciones
                    </p>
                </div>

                <div class="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <!-- Value 1 - Integridad -->
                    <div
                        class="p-5 text-center transition-all duration-300 bg-white shadow-lg sm:p-6 rounded-xl hover:shadow-xl hover:-translate-y-1 active:scale-[0.99]"
                    >
                        <div
                            class="inline-flex items-center justify-center mb-3 rounded-full w-14 h-14 sm:w-16 sm:h-16 sm:mb-4 bg-gradient-to-br from-blue-500 to-blue-600"
                        >
                            <Shield :size="24" class="text-white sm:w-7 sm:h-7" />
                        </div>
                        <h3 class="mb-2 text-lg font-bold text-gray-800 sm:text-xl sm:mb-3">
                            Integridad
                        </h3>
                        <p class="text-sm text-gray-600 sm:text-base">
                            Actuamos con honestidad y transparencia en cada transacción
                        </p>
                    </div>

                    <!-- Value 2 - Excelencia -->
                    <div
                        class="p-5 text-center transition-all duration-300 bg-white shadow-lg sm:p-6 rounded-xl hover:shadow-xl hover:-translate-y-1 active:scale-[0.99]"
                    >
                        <div
                            class="inline-flex items-center justify-center mb-3 rounded-full w-14 h-14 sm:w-16 sm:h-16 sm:mb-4 bg-gradient-to-br from-green-500 to-green-600"
                        >
                            <Award :size="24" class="text-white sm:w-7 sm:h-7" />
                        </div>
                        <h3 class="mb-2 text-lg font-bold text-gray-800 sm:text-xl sm:mb-3">
                            Excelencia
                        </h3>
                        <p class="text-sm text-gray-600 sm:text-base">
                            Nos esforzamos por superar expectativas en cada servicio
                        </p>
                    </div>

                    <!-- Value 3 - Compromiso -->
                    <div
                        class="p-5 text-center transition-all duration-300 bg-white shadow-lg sm:p-6 rounded-xl hover:shadow-xl hover:-translate-y-1 active:scale-[0.99]"
                    >
                        <div
                            class="inline-flex items-center justify-center mb-3 rounded-full w-14 h-14 sm:w-16 sm:h-16 sm:mb-4 bg-gradient-to-br from-purple-500 to-purple-600"
                        >
                            <Heart :size="24" class="text-white sm:w-7 sm:h-7" />
                        </div>
                        <h3 class="mb-2 text-lg font-bold text-gray-800 sm:text-xl sm:mb-3">
                            Compromiso
                        </h3>
                        <p class="text-sm text-gray-600 sm:text-base">
                            Dedicación total con los objetivos de nuestros clientes
                        </p>
                    </div>

                    <!-- Value 4 - Innovación -->
                    <div
                        class="p-5 text-center transition-all duration-300 bg-white shadow-lg sm:p-6 rounded-xl hover:shadow-xl hover:-translate-y-1 active:scale-[0.99]"
                    >
                        <div
                            class="inline-flex items-center justify-center mb-3 rounded-full w-14 h-14 sm:w-16 sm:h-16 sm:mb-4 bg-gradient-to-br from-orange-500 to-orange-600"
                        >
                            <Lightbulb :size="24" class="text-white sm:w-7 sm:h-7" />
                        </div>
                        <h3 class="mb-2 text-lg font-bold text-gray-800 sm:text-xl sm:mb-3">
                            Innovación
                        </h3>
                        <p class="text-sm text-gray-600 sm:text-base">
                            Utilizamos tecnología de punta para mejorar tu experiencia
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats Section - Mobile First -->
        <section class="py-12 bg-gradient-to-r from-indigo-600 to-purple-700 sm:py-16 lg:py-24">
            <div class="container px-4 mx-auto sm:px-6">
                <div class="grid gap-6 text-center sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
                    <div class="p-4 transition-all duration-300 rounded-lg hover:bg-white/10">
                        <div class="mb-1 text-4xl font-bold text-white sm:text-5xl sm:mb-2">
                            10+
                        </div>
                        <p class="text-base text-purple-100 sm:text-lg">Años de Experiencia</p>
                    </div>
                    <div class="p-4 transition-all duration-300 rounded-lg hover:bg-white/10">
                        <div class="mb-1 text-4xl font-bold text-white sm:text-5xl sm:mb-2">
                            5000+
                        </div>
                        <p class="text-base text-purple-100 sm:text-lg">Propiedades Vendidas</p>
                    </div>
                    <div class="p-4 transition-all duration-300 rounded-lg hover:bg-white/10">
                        <div class="mb-1 text-4xl font-bold text-white sm:text-5xl sm:mb-2">
                            98%
                        </div>
                        <p class="text-base text-purple-100 sm:text-lg">Clientes Satisfechos</p>
                    </div>
                    <div class="p-4 transition-all duration-300 rounded-lg hover:bg-white/10">
                        <div class="mb-1 text-4xl font-bold text-white sm:text-5xl sm:mb-2">
                            50+
                        </div>
                        <p class="text-base text-purple-100 sm:text-lg">Profesionales</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Why Choose Us - Mobile First -->
        <section class="py-12 sm:py-16 lg:py-24">
            <div class="container px-4 mx-auto sm:px-6">
                <div class="mb-8 text-center sm:mb-12">
                    <h2
                        class="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl sm:mb-4 lg:text-4xl"
                    >
                        ¿Por Qué Elegirnos?
                    </h2>
                    <p class="max-w-2xl mx-auto text-base text-gray-600 sm:text-lg">
                        Estas son las razones por las que miles de clientes confían en nosotros
                    </p>
                </div>

                <div class="grid gap-6 sm:gap-8 lg:grid-cols-3">
                    <!-- Reason 1 -->
                    <div class="p-6 bg-white shadow-lg sm:p-8 rounded-xl sm:rounded-2xl">
                        <div
                            class="inline-flex items-center justify-center mb-3 bg-blue-100 rounded-lg w-11 h-11 sm:w-12 sm:h-12 sm:mb-4"
                        >
                            <CheckCircle :size="22" class="text-blue-600 sm:w-6 sm:h-6" />
                        </div>
                        <h3 class="mb-2 text-lg font-bold text-gray-800 sm:text-xl sm:mb-3">
                            Experiencia Comprobada
                        </h3>
                        <p class="text-sm leading-relaxed text-gray-600 sm:text-base">
                            Más de una década en el mercado inmobiliario nos respalda. Conocemos
                            cada detalle del sector y te guiamos con experiencia probada.
                        </p>
                    </div>

                    <!-- Reason 2 -->
                    <div class="p-6 bg-white shadow-lg sm:p-8 rounded-xl sm:rounded-2xl">
                        <div
                            class="inline-flex items-center justify-center mb-3 bg-green-100 rounded-lg w-11 h-11 sm:w-12 sm:h-12 sm:mb-4"
                        >
                            <Users :size="22" class="text-green-600 sm:w-6 sm:h-6" />
                        </div>
                        <h3 class="mb-2 text-lg font-bold text-gray-800 sm:text-xl sm:mb-3">
                            Atención Personalizada
                        </h3>
                        <p class="text-sm leading-relaxed text-gray-600 sm:text-base">
                            Cada cliente es único. Nos tomamos el tiempo de entender tus necesidades
                            para ofrecerte soluciones a medida.
                        </p>
                    </div>

                    <!-- Reason 3 -->
                    <div class="p-6 bg-white shadow-lg sm:p-8 rounded-xl sm:rounded-2xl">
                        <div
                            class="inline-flex items-center justify-center mb-3 bg-purple-100 rounded-lg w-11 h-11 sm:w-12 sm:h-12 sm:mb-4"
                        >
                            <Zap :size="22" class="text-purple-600 sm:w-6 sm:h-6" />
                        </div>
                        <h3 class="mb-2 text-lg font-bold text-gray-800 sm:text-xl sm:mb-3">
                            Proceso Ágil
                        </h3>
                        <p class="text-sm leading-relaxed text-gray-600 sm:text-base">
                            Tecnología y métodos eficientes que aceleran cada etapa sin comprometer
                            la calidad del servicio.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section - Mobile First -->
        <section class="py-12 bg-gradient-to-r from-blue-600 to-indigo-700 sm:py-16">
            <div class="container px-4 mx-auto text-center sm:px-6">
                <h2 class="mb-4 text-2xl font-bold text-white sm:text-3xl sm:mb-6 lg:text-4xl">
                    ¿Hablamos de tu proyecto?
                </h2>
                <p class="max-w-2xl mx-auto mb-6 text-base text-blue-100 sm:text-lg sm:mb-8">
                    Estamos listos para ayudarte a encontrar la propiedad perfecta o vender tu
                    inmueble al mejor precio
                </p>
                <router-link
                    to="/contacto"
                    class="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-blue-600 transition-all duration-200 bg-white shadow-xl sm:px-8 sm:py-4 sm:text-lg rounded-xl sm:rounded-full hover:shadow-2xl hover:scale-105 active:scale-95"
                >
                    <MessageCircle :size="20" class="sm:w-6 sm:h-6" />
                    <span>Contáctanos Ahora</span>
                </router-link>
            </div>
        </section>
    </div>
</template>

<script setup>
import {
    Target,
    Eye,
    Shield,
    Award,
    Heart,
    Lightbulb,
    CheckCircle,
    Users,
    Zap,
    MessageCircle,
} from 'lucide-vue-next';
</script>

<style scoped>
/* Touch optimization */
* {
    -webkit-tap-highlight-color: transparent;
}

/* Smooth transitions for hover states */
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

    .hover\:bg-white\/10:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
}
</style>
