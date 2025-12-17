<template>
    <form @submit.prevent="saveProperty" class="p-6 space-y-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- Información básica -->
            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Tipo de Inmueble <span class="text-red-500">*</span>
                </label>
                <select
                    v-model="form.property_type_id"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                    <option value="">Seleccionar tipo</option>
                    <option v-for="type in typesPropertyList" :key="type.id" :value="type.id">
                        {{ type.nombre }}
                    </option>
                </select>
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Operación <span class="text-red-500">*</span>
                </label>
                <select
                    v-model="form.operation_type_id"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                    <option value="">Seleccionar operación</option>
                    <option v-for="op in operationTypesList" :key="op.id" :value="op.id">
                        {{ op.nombre }}
                    </option>
                </select>
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Agente <span class="text-red-500">*</span>
                </label>
                <select
                    v-model="form.user_id"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                    <option value="">Seleccionar agente</option>
                    <option v-for="agent in agentsList" :key="agent.id" :value="agent.id">
                        {{ agent.general_data?.nombre || agent.email }}
                        {{ agent.general_data?.apellido || '' }}
                    </option>
                </select>
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Código Interno <span class="text-red-500">*</span>
                </label>
                <input
                    v-model="form.codigo_interno"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <!-- Precio y moneda -->
            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Precio <span class="text-red-500">*</span>
                </label>
                <input
                    v-model.number="form.precio"
                    type="number"
                    step="0.01"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Moneda <span class="text-red-500">*</span>
                </label>
                <select
                    v-model="form.currency_id"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                    <option value="">Seleccionar moneda</option>
                    <option
                        v-for="currency in currenciesList"
                        :key="currency.id"
                        :value="currency.id"
                    >
                        {{ currency.code }} - {{ currency.nombre }}
                    </option>
                </select>
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Precio Alquiler
                </label>
                <input
                    v-model.number="form.precio_alquiler"
                    type="number"
                    step="0.01"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <!-- Ubicación -->
            <div class="md:col-span-2">
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Departamento <span class="text-red-500">*</span>
                </label>
                <input
                    v-model="form.departamento"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Ciudad <span class="text-red-500">*</span>
                </label>
                <input
                    v-model="form.ciudad"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Zona <span class="text-red-500">*</span>
                </label>
                <input
                    v-model="form.zona"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div class="md:col-span-2">
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Dirección <span class="text-red-500">*</span>
                </label>
                <input
                    v-model="form.direccion"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div class="md:col-span-2">
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Dirección Completa
                </label>
                <input
                    v-model="form.direccion_completa"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700"> Latitud </label>
                <input
                    v-model.number="form.latitud"
                    type="number"
                    step="0.00000001"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700"> Longitud </label>
                <input
                    v-model.number="form.longitud"
                    type="number"
                    step="0.00000001"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <!-- Características -->
            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Superficie Total (m²) <span class="text-red-500">*</span>
                </label>
                <input
                    v-model.number="form.superficie_total"
                    type="number"
                    step="0.01"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Superficie Construida (m²)
                </label>
                <input
                    v-model.number="form.superficie_construida"
                    type="number"
                    step="0.01"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Habitaciones <span class="text-red-500">*</span>
                </label>
                <input
                    v-model.number="form.habitaciones"
                    type="number"
                    min="0"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Baños <span class="text-red-500">*</span>
                </label>
                <input
                    v-model.number="form.baños"
                    type="number"
                    min="0"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Medios Baños <span class="text-red-500">*</span>
                </label>
                <input
                    v-model.number="form.medio_baños"
                    type="number"
                    min="0"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Estacionamientos <span class="text-red-500">*</span>
                </label>
                <input
                    v-model.number="form.estacionamientos"
                    type="number"
                    min="0"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700"> Pisos </label>
                <input
                    v-model.number="form.pisos"
                    type="number"
                    min="0"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Piso Ubicación
                </label>
                <input
                    v-model.number="form.piso_ubicacion"
                    type="number"
                    min="0"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Antigüedad (años)
                </label>
                <input
                    v-model.number="form.antiguedad"
                    type="number"
                    min="0"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <!-- Estado y condición -->
            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Estado <span class="text-red-500">*</span>
                </label>
                <select
                    v-model="form.status_id"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                    <option value="">Seleccionar estado</option>
                    <option v-for="status in statusesList" :key="status.id" :value="status.id">
                        {{ status.nombre }}
                    </option>
                </select>
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Condición <span class="text-red-500">*</span>
                </label>
                <select
                    v-model="form.condition_id"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                    <option value="">Seleccionar condición</option>
                    <option
                        v-for="condition in conditionsList"
                        :key="condition.id"
                        :value="condition.id"
                    >
                        {{ condition.nombre }}
                    </option>
                </select>
            </div>

            <!-- Descripciones -->
            <div class="md:col-span-2">
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Descripción Corta
                </label>
                <textarea
                    v-model="form.descripcion_corta"
                    rows="2"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
            </div>

            <div class="md:col-span-2">
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Descripción Completa
                </label>
                <textarea
                    v-model="form.descripcion"
                    rows="4"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
            </div>

            <div class="md:col-span-2">
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Notas Internas
                </label>
                <textarea
                    v-model="form.notas_internas"
                    rows="2"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
            </div>

            <!-- Características adicionales -->
            <div class="md:col-span-2">
                <label class="block mb-1 text-sm font-medium text-neutral-700">
                    Características Adicionales
                </label>
                <div class="grid grid-cols-2 gap-2 mt-2">
                    <label
                        v-for="feature in featuresList"
                        :key="feature.id"
                        class="flex items-center"
                    >
                        <input
                            type="checkbox"
                            :value="feature.id"
                            v-model="form.additional_features"
                            class="mr-2 rounded text-primary-600 focus:ring-primary-500"
                        />
                        {{ feature.nombre }}
                    </label>
                </div>
            </div>

            <!-- SEO -->
            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700"> Slug </label>
                <input
                    v-model="form.slug"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-neutral-700"> Orden </label>
                <input
                    v-model.number="form.orden"
                    type="number"
                    min="0"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <!-- Estados -->
            <div class="flex items-center">
                <input
                    type="checkbox"
                    id="datos_completos"
                    v-model="form.datos_completos"
                    class="mr-2 rounded text-primary-600 focus:ring-primary-500"
                />
                <label for="datos_completos" class="text-sm font-medium text-neutral-700">
                    Datos Completos
                </label>
            </div>

            <div class="flex items-center">
                <input
                    type="checkbox"
                    id="tiene_imagenes"
                    v-model="form.tiene_imagenes"
                    class="mr-2 rounded text-primary-600 focus:ring-primary-500"
                />
                <label for="tiene_imagenes" class="text-sm font-medium text-neutral-700">
                    Tiene Imágenes
                </label>
            </div>

            <div class="flex items-center">
                <input
                    type="checkbox"
                    id="publicable"
                    v-model="form.publicable"
                    class="mr-2 rounded text-primary-600 focus:ring-primary-500"
                />
                <label for="publicable" class="text-sm font-medium text-neutral-700">
                    Publicable
                </label>
            </div>

            <div class="flex items-center">
                <input
                    type="checkbox"
                    id="destacada"
                    v-model="form.destacada"
                    class="mr-2 rounded text-primary-600 focus:ring-primary-500"
                />
                <label for="destacada" class="text-sm font-medium text-neutral-700">
                    Destacada
                </label>
            </div>

            <div class="flex items-center">
                <input
                    type="checkbox"
                    id="activa"
                    v-model="form.activa"
                    class="mr-2 rounded text-primary-600 focus:ring-primary-500"
                />
                <label for="activa" class="text-sm font-medium text-neutral-700"> Activa </label>
            </div>

            <!-- Imágenes - MEJORADO -->
            <div class="md:col-span-2">
                <label class="block mb-2 text-sm font-medium text-neutral-700">
                    Imágenes
                    <span v-if="images.length > 0" class="text-xs text-gray-500">
                        ({{ images.length }} imagen{{ images.length !== 1 ? 'es' : '' }})
                    </span>
                </label>

                <!-- Imágenes existentes y nuevas -->
                <div v-if="images.length > 0" class="grid grid-cols-2 gap-4 mb-4 md:grid-cols-4">
                    <div
                        v-for="(img, index) in images"
                        :key="img.id || `new-${index}`"
                        class="relative group"
                    >
                        <div
                            class="relative overflow-hidden border-2 border-gray-200 rounded-lg aspect-square"
                        >
                            <img
                                :src="img.preview"
                                :alt="`Imagen ${index + 1}`"
                                class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />

                            <!-- Overlay con acciones -->
                            <div
                                class="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black opacity-0 bg-opacity-40 group-hover:opacity-100"
                            >
                                <button
                                    type="button"
                                    @click="removeImage(index)"
                                    class="p-2 text-white transition-colors bg-red-500 rounded-full hover:bg-red-600"
                                    title="Eliminar imagen"
                                >
                                    <X class="w-5 h-5" />
                                </button>
                            </div>

                            <!-- Badge para imágenes existentes -->
                            <div
                                v-if="img.existing"
                                class="absolute top-0 right-0 px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-bl-lg"
                            >
                                Existente
                            </div>

                            <!-- Badge para imágenes nuevas -->
                            <div
                                v-else
                                class="absolute top-0 right-0 px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-bl-lg"
                            >
                                Nueva
                            </div>
                        </div>

                        <!-- Nombre del archivo -->
                        <p class="mt-1 text-xs text-center text-gray-500 truncate">
                            {{ img.file?.name || img.preview.split('/').pop() }}
                        </p>
                    </div>
                </div>

                <!-- Área de drop para nuevas imágenes -->
                <div
                    class="p-8 text-center transition-colors border-2 border-dashed rounded-lg border-neutral-300 hover:border-primary-400 hover:bg-primary-50/30"
                >
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        @change="handleImages"
                        class="hidden"
                        ref="fileInput"
                    />
                    <button
                        type="button"
                        @click="$refs.fileInput.click()"
                        class="transition-colors text-primary-600 hover:text-primary-700"
                    >
                        <Upload class="w-12 h-12 mx-auto mb-3" />
                        <p class="font-medium">
                            {{
                                images.length > 0
                                    ? 'Agregar más imágenes'
                                    : 'Arrastra imágenes o haz clic para seleccionar'
                            }}
                        </p>
                        <p class="mt-1 text-xs text-gray-500">Máximo 2MB por imagen</p>
                    </button>
                </div>
            </div>
        </div>

        <div class="flex justify-end gap-3 pt-6 border-t">
            <button
                type="button"
                @click="$emit('cancel')"
                class="px-6 py-3 transition-colors border rounded-lg border-neutral-300 hover:bg-neutral-50"
            >
                Cancelar
            </button>
            <button
                type="submit"
                :disabled="saving"
                class="px-6 py-3 font-medium text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
            >
                <span v-if="saving">
                    <svg class="inline w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
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
                    Guardando...
                </span>
                <span v-else> {{ props.property ? 'Actualizar' : 'Crear' }} Propiedad </span>
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { Upload, X } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';
import { createProperty, updateProperty } from '@/services/PropertiesService';
import { getFeaturesActives } from '@/services/FeaturesPropertyService';
import { getConditionPropertyActives } from '@/services/ConditionPropertyService';
import { getStatusesPropertyActives } from '@/services/StatusesPropertyService';
import { getOperationTypesActives } from '@/services/OperationPropertyService';
import { getCurrencyPropertyActives } from '@/services/CurrencyPropertyService';
import { getTypesPropertyActives } from '@/services/TyperPropertyService';
import { getUsersActives } from '@/services/UserService';

const props = defineProps(['property']);
const emit = defineEmits(['saved', 'cancel']);

const toast = useToast();
const saving = ref(false);
const fileInput = ref(null);

const featuresList = ref([]);
const conditionsList = ref([]);
const statusesList = ref([]);
const operationTypesList = ref([]);
const currenciesList = ref([]);
const typesPropertyList = ref([]);
const agentsList = ref([]);

// Formulario reactivo
const form = reactive({
    property_type_id: '',
    operation_type_id: '',
    user_id: '',
    codigo_interno: '',
    descripcion: '',
    descripcion_corta: '',
    notas_internas: '',
    precio: 0,
    currency_id: '',
    precio_alquiler: null,
    departamento: '',
    ciudad: '',
    zona: '',
    direccion: '',
    direccion_completa: '',
    latitud: null,
    longitud: null,
    superficie_total: 0,
    superficie_construida: null,
    habitaciones: 0,
    baños: 0,
    medio_baños: 0,
    estacionamientos: 0,
    pisos: null,
    piso_ubicacion: null,
    antiguedad: null,
    status_id: '',
    condition_id: '',
    datos_completos: false,
    tiene_imagenes: false,
    publicable: false,
    slug: '',
    destacada: false,
    activa: true,
    orden: 0,
    additional_features: [],
});

const images = ref([]);
const imagesToDelete = ref([]); // NUEVO: Array para almacenar IDs de imágenes a eliminar

// Función para resetear el formulario
const resetForm = () => {
    Object.keys(form).forEach(key => {
        if (key === 'additional_features') {
            form[key] = [];
        } else if (['datos_completos', 'tiene_imagenes', 'publicable', 'destacada'].includes(key)) {
            form[key] = false;
        } else if (key === 'activa') {
            form[key] = true;
        } else if (
            [
                'orden',
                'habitaciones',
                'baños',
                'medio_baños',
                'estacionamientos',
                'precio',
            ].includes(key)
        ) {
            form[key] = 0;
        } else if (
            [
                'precio_alquiler',
                'latitud',
                'longitud',
                'superficie_construida',
                'pisos',
                'piso_ubicacion',
                'antiguedad',
            ].includes(key)
        ) {
            form[key] = null;
        } else {
            form[key] = '';
        }
    });
    images.value = [];
    imagesToDelete.value = [];
};

// Función para manejar imágenes
const handleImages = e => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        if (!file.type.match('image.*')) {
            toast.error('Solo se permiten archivos de imagen');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Las imágenes no deben superar los 2MB');
            return;
        }

        images.value.push({
            file,
            preview: URL.createObjectURL(file),
            existing: false,
        });
    });

    // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
    e.target.value = '';
};

// Función para eliminar una imagen - MEJORADA
const removeImage = index => {
    const imageToRemove = images.value[index];

    // Si es una imagen existente (tiene ID), agregarla a la lista de eliminación
    if (imageToRemove.existing && imageToRemove.id) {
        imagesToDelete.value.push(imageToRemove.id);
        console.log('Imagen marcada para eliminar:', imageToRemove.id);
    }

    // Revocar la URL del preview si es una nueva imagen
    if (!imageToRemove.existing && imageToRemove.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
    }

    // Eliminar la imagen del array
    images.value.splice(index, 1);

    toast.info(imageToRemove.existing ? 'Imagen marcada para eliminar' : 'Imagen removida');
};

// Listar caracteristicas
const listFeatures = async () => {
    try {
        const { data } = await getFeaturesActives();
        featuresList.value = data.datos || [];
    } catch (error) {
        console.error('Error al cargar características:', error);
    }
};

// Listar condiciones de la propiedad
const listConditions = async () => {
    try {
        const { data } = await getConditionPropertyActives();
        conditionsList.value = data.datos || [];
    } catch (error) {
        console.error('Error al cargar condiciones:', error);
    }
};

// Listar estados de la propiedad
const listStatuses = async () => {
    try {
        const { data } = await getStatusesPropertyActives();
        statusesList.value = data.datos || [];
    } catch (error) {
        console.error('Error al cargar estados:', error);
    }
};

// Listar operaciones de la propiedad
const listOperationTypes = async () => {
    try {
        const { data } = await getOperationTypesActives();
        operationTypesList.value = data.datos || [];
    } catch (error) {
        console.error('Error al cargar operaciones:', error);
    }
};

// Listar monedas de la propiedad
const listCurrencies = async () => {
    try {
        const { data } = await getCurrencyPropertyActives();
        currenciesList.value = data.datos || [];
    } catch (error) {
        console.error('Error al cargar monedas:', error);
    }
};

// Listar tipos de la propiedad
const listTypesPropertyActives = async () => {
    try {
        const { data } = await getTypesPropertyActives();
        typesPropertyList.value = data.datos || [];
    } catch (error) {
        console.error('Error al cargar tipos:', error);
    }
};

// Listar agentes
const listAgentsActives = async () => {
    try {
        const { data } = await getUsersActives();
        agentsList.value = data.data || [];
    } catch (error) {
        console.error('Error al cargar agentes:', error);
    }
};

const saveProperty = async () => {
    const requiredFields = [
        'property_type_id',
        'operation_type_id',
        'user_id',
        'codigo_interno',
        'precio',
        'currency_id',
        'departamento',
        'ciudad',
        'zona',
        'direccion',
        'superficie_total',
        'habitaciones',
        'baños',
        'medio_baños',
        'estacionamientos',
        'status_id',
        'condition_id',
    ];

    for (const field of requiredFields) {
        if (!form[field] && form[field] !== 0) {
            toast.error(`El campo ${field} es requerido`);
            return;
        }
    }

    saving.value = true;

    try {
        const formDataObj = new FormData();

        // Agregar método PUT si estamos editando
        if (props.property) {
            formDataObj.append('_method', 'PUT');
        }

        // Agregar todos los campos del formulario
        Object.keys(form).forEach(key => {
            if (key === 'additional_features') {
                form[key].forEach((featureId, index) => {
                    formDataObj.append(`additional_features[${index}]`, featureId);
                });
            } else {
                const value = form[key];

                // Solo agregar el campo si tiene un valor válido
                if (value !== null && value !== '' && value !== undefined) {
                    // Convertir booleanos a 0 o 1 para Laravel
                    if (typeof value === 'boolean') {
                        formDataObj.append(key, value ? '1' : '0');
                    } else {
                        formDataObj.append(key, value);
                    }
                }
            }
        });

        // NUEVO: Agregar imágenes a eliminar
        if (imagesToDelete.value.length > 0) {
            imagesToDelete.value.forEach((imageId, index) => {
                formDataObj.append(`imagenes_a_eliminar[${index}]`, imageId);
            });
            console.log('Imágenes a eliminar:', imagesToDelete.value);
        }

        // Agregar solo las nuevas imágenes (no las existentes)
        let newImagesCount = 0;
        images.value.forEach(img => {
            if (!img.existing && img.file) {
                formDataObj.append(`imagenes[${newImagesCount}]`, img.file);
                newImagesCount++;
            }
        });

        console.log('Nuevas imágenes a subir:', newImagesCount);

        let response;
        if (props.property) {
            response = await updateProperty(props.property.id, formDataObj);
        } else {
            response = await createProperty(formDataObj);
        }

        emit('saved');
        toast.success(`Propiedad ${props.property ? 'actualizada' : 'creada'} correctamente`);

        // Resetear formulario después de guardar exitosamente
        if (!props.property) {
            resetForm();
        } else {
            // Limpiar array de imágenes a eliminar después de guardar
            imagesToDelete.value = [];
        }
    } catch (error) {
        console.error('Error al guardar propiedad:', error);
        toast.error(error.response?.data?.message || 'Error al guardar la propiedad');
    } finally {
        saving.value = false;
    }
};

// Cargar datos al montar el componente
onMounted(async () => {
    await Promise.all([
        listFeatures(),
        listConditions(),
        listStatuses(),
        listOperationTypes(),
        listCurrencies(),
        listTypesPropertyActives(),
        listAgentsActives(),
    ]);
});

// Watch para cargar datos de la propiedad cuando se está editando
watch(
    () => props.property,
    newProperty => {
        if (newProperty) {
            // Limpiar array de imágenes a eliminar
            imagesToDelete.value = [];

            // Mapear los datos anidados a la estructura plana del formulario
            form.property_type_id = newProperty.property_type_id || '';
            form.operation_type_id = newProperty.operation_type_id || '';
            form.user_id = newProperty.user_id || '';
            form.codigo_interno = newProperty.codigo_interno || '';
            form.descripcion = newProperty.descripcion || '';
            form.descripcion_corta = newProperty.descripcion_corta || '';
            form.notas_internas = newProperty.notas_internas || '';

            // Datos de precio
            if (newProperty.price) {
                form.precio = parseFloat(newProperty.price.precio) || 0;
                form.currency_id = newProperty.price.currency_id || '';
                form.precio_alquiler = parseFloat(newProperty.price.precio_alquiler) || null;
            }

            // Datos de ubicación
            if (newProperty.location) {
                form.departamento = newProperty.location.departamento || '';
                form.ciudad = newProperty.location.ciudad || '';
                form.zona = newProperty.location.zona || '';
                form.direccion = newProperty.location.direccion || '';
                form.direccion_completa = newProperty.location.direccion_completa || '';
                form.latitud = parseFloat(newProperty.location.latitud) || null;
                form.longitud = parseFloat(newProperty.location.longitud) || null;
            }

            // Datos de características
            if (newProperty.features) {
                form.superficie_total = parseFloat(newProperty.features.superficie_total) || 0;
                form.superficie_construida =
                    parseFloat(newProperty.features.superficie_construida) || null;
                form.habitaciones = parseInt(newProperty.features.habitaciones) || 0;
                form.baños = parseInt(newProperty.features.baños) || 0;
                form.medio_baños = parseInt(newProperty.features.medio_baños) || 0;
                form.estacionamientos = parseInt(newProperty.features.estacionamientos) || 0;
                form.pisos = parseInt(newProperty.features.pisos) || null;
                form.piso_ubicacion = parseInt(newProperty.features.piso_ubicacion) || null;
                form.antiguedad = parseInt(newProperty.features.antiguedad) || null;
            }

            // Datos de estado
            if (newProperty.status) {
                form.status_id = newProperty.status.status_id || '';
                form.condition_id = newProperty.status.condition_id || '';
                form.datos_completos = !!newProperty.status.datos_completos;
                form.tiene_imagenes = !!newProperty.status.tiene_imagenes;
                form.publicable = !!newProperty.status.publicable;
            }

            // Datos de SEO
            if (newProperty.seo) {
                form.slug = newProperty.seo.slug || '';
                form.destacada = !!newProperty.seo.destacada;
                form.activa = !!newProperty.seo.activa;
                form.orden = parseInt(newProperty.seo.orden) || 0;
            }

            // Características adicionales
            form.additional_features = newProperty.additional_features?.map(f => f.id) || [];

            // Imágenes - MEJORADO con ID
            if (newProperty.images && newProperty.images.length > 0) {
                images.value = newProperty.images.map(img => ({
                    id: img.id, // IMPORTANTE: Guardar el ID
                    preview: img.image_url,
                    existing: true,
                }));
            } else {
                images.value = [];
            }
        } else {
            resetForm();
        }
    },
    { immediate: true, deep: true }
);
</script>
