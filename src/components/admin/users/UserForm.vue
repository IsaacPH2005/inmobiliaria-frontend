<template>
    <form @submit.prevent="saveUser" class="p-6 space-y-6">
        <!-- Tabs para organizar información -->
        <div class="border-b border-neutral-200">
            <div class="flex gap-4 -mb-px">
                <button
                    type="button"
                    @click="activeTab = 'basic'"
                    :class="[
                        'px-4 py-2 font-medium border-b-2 transition-colors',
                        activeTab === 'basic'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-500 hover:text-neutral-700',
                    ]"
                >
                    <User class="inline w-4 h-4 mr-2" />
                    Datos Básicos
                </button>
                <button
                    type="button"
                    @click="activeTab = 'personal'"
                    :class="[
                        'px-4 py-2 font-medium border-b-2 transition-colors',
                        activeTab === 'personal'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-500 hover:text-neutral-700',
                    ]"
                >
                    <FileText class="inline w-4 h-4 mr-2" />
                    Datos Personales
                </button>
                <button
                    type="button"
                    @click="activeTab = 'contact'"
                    :class="[
                        'px-4 py-2 font-medium border-b-2 transition-colors',
                        activeTab === 'contact'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-500 hover:text-neutral-700',
                    ]"
                >
                    <Phone class="inline w-4 h-4 mr-2" />
                    Contacto
                </button>
            </div>
        </div>

        <!-- Tab: Datos Básicos -->
        <div v-show="activeTab === 'basic'" class="space-y-6">
            <!-- Avatar -->
            <div class="flex items-center gap-6">
                <div class="relative">
                    <div
                        v-if="avatarPreview || form.avatar"
                        class="w-24 h-24 overflow-hidden bg-gray-200 rounded-full"
                    >
                        <img
                            :src="avatarPreview || getAvatarUrl(form.avatar)"
                            alt="Avatar"
                            class="object-cover w-full h-full"
                        />
                    </div>
                    <div
                        v-else
                        class="flex items-center justify-center w-24 h-24 text-3xl font-bold text-white rounded-full bg-gradient-to-br from-primary-500 to-primary-700"
                    >
                        {{
                            getInitials(`${form.general_data.nombre} ${form.general_data.apellido}`)
                        }}
                    </div>
                    <button
                        type="button"
                        @click="$refs.avatarInput.click()"
                        class="absolute bottom-0 right-0 p-2 text-white rounded-full bg-primary-600 hover:bg-primary-700"
                    >
                        <Camera class="w-4 h-4" />
                    </button>
                </div>
                <div>
                    <input
                        type="file"
                        ref="avatarInput"
                        @change="handleAvatar"
                        accept="image/*"
                        class="hidden"
                    />
                    <p class="text-sm font-medium text-neutral-700">Foto de perfil</p>
                    <p class="text-xs text-neutral-500">JPG, PNG máximo 2MB</p>
                    <button
                        v-if="avatarPreview || form.avatar"
                        type="button"
                        @click="removeAvatar"
                        class="mt-2 text-xs text-red-600 hover:text-red-700"
                    >
                        Eliminar foto
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <!-- Email -->
                <div class="md:col-span-2">
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Email <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <Mail
                            class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                        />
                        <input
                            v-model="form.email"
                            type="email"
                            required
                            class="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="usuario@ejemplo.com"
                        />
                    </div>
                </div>

                <!-- Contraseña -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Contraseña <span v-if="!props.user" class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <Lock
                            class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                        />
                        <input
                            v-model="form.password"
                            :type="showPassword ? 'text' : 'password'"
                            :required="!props.user"
                            class="w-full py-2 pl-10 pr-10 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            @click="showPassword = !showPassword"
                            class="absolute transform -translate-y-1/2 right-3 top-1/2"
                        >
                            <component
                                :is="showPassword ? EyeOff : Eye"
                                class="w-5 h-5 text-gray-400"
                            />
                        </button>
                    </div>
                    <p v-if="props.user" class="mt-1 text-xs text-neutral-500">
                        Dejar en blanco para mantener la contraseña actual
                    </p>
                    <p v-else class="mt-1 text-xs text-neutral-500">Mínimo 8 caracteres</p>
                </div>

                <!-- Confirmar Contraseña -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Confirmar Contraseña
                        <span v-if="!props.user || form.password" class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <Lock
                            class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                        />
                        <input
                            v-model="form.password_confirmation"
                            :type="showPasswordConfirm ? 'text' : 'password'"
                            :required="!props.user || form.password"
                            class="w-full py-2 pl-10 pr-10 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            @click="showPasswordConfirm = !showPasswordConfirm"
                            class="absolute transform -translate-y-1/2 right-3 top-1/2"
                        >
                            <component
                                :is="showPasswordConfirm ? EyeOff : Eye"
                                class="w-5 h-5 text-gray-400"
                            />
                        </button>
                    </div>
                </div>

                <!-- Estado -->
                <div class="flex items-center gap-2 md:col-span-2">
                    <input
                        type="checkbox"
                        id="estado"
                        v-model="form.estado"
                        class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
                    />
                    <label for="estado" class="text-sm font-medium text-neutral-700">
                        Usuario activo
                    </label>
                </div>
            </div>
        </div>

        <!-- Tab: Datos Personales -->
        <div v-show="activeTab === 'personal'" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <!-- Nombre -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Nombre <span class="text-red-500">*</span>
                    </label>
                    <input
                        v-model="form.general_data.nombre"
                        required
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Isaac"
                    />
                </div>

                <!-- Apellido -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Apellido <span class="text-red-500">*</span>
                    </label>
                    <input
                        v-model="form.general_data.apellido"
                        required
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Parisaca"
                    />
                </div>

                <!-- Documento de Identidad -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Documento de Identidad
                    </label>
                    <input
                        v-model="form.general_data.documento_identidad"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="12345678"
                    />
                </div>

                <!-- Fecha de Nacimiento -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Fecha de Nacimiento
                    </label>
                    <input
                        v-model="form.general_data.nacimiento"
                        type="date"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>

                <!-- Género -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">Género</label>
                    <select
                        v-model="form.general_data.genero"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                        <option value="">Seleccionar</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>

                <!-- Código Postal -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Código Postal
                    </label>
                    <input
                        v-model="form.general_data.codigo_postal"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0000"
                    />
                </div>

                <!-- Notas -->
                <div class="md:col-span-2">
                    <label class="block mb-1 text-sm font-medium text-neutral-700">Notas</label>
                    <textarea
                        v-model="form.general_data.notas"
                        rows="3"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Información adicional sobre el usuario..."
                    ></textarea>
                </div>
            </div>
        </div>

        <!-- Tab: Contacto -->
        <div v-show="activeTab === 'contact'" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <!-- Celular Principal -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Celular Principal
                    </label>
                    <div class="relative">
                        <Phone
                            class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                        />
                        <input
                            v-model="form.general_data.celular"
                            type="tel"
                            class="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="+591 70123456"
                        />
                    </div>
                </div>

                <!-- Dirección -->
                <div class="md:col-span-2">
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Dirección
                    </label>
                    <div class="relative">
                        <MapPin
                            class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                        />
                        <input
                            v-model="form.general_data.direccion"
                            class="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Av. Principal #123"
                        />
                    </div>
                </div>

                <!-- Ciudad -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">Ciudad</label>
                    <input
                        v-model="form.general_data.ciudad"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="La Paz"
                    />
                </div>

                <!-- Departamento -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Departamento
                    </label>
                    <input
                        v-model="form.general_data.departamento"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="La Paz"
                    />
                </div>

                <!-- Contacto de Emergencia -->
                <div class="md:col-span-2">
                    <h3 class="mb-3 text-sm font-semibold text-neutral-700">
                        Contacto de Emergencia
                    </h3>
                </div>

                <!-- Nombre Contacto Emergencia -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">Nombre</label>
                    <input
                        v-model="form.general_data.contacto_emergencia_nombre"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="María Pérez"
                    />
                </div>

                <!-- Teléfono Contacto Emergencia -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Teléfono
                    </label>
                    <div class="relative">
                        <Phone
                            class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                        />
                        <input
                            v-model="form.general_data.contacto_emergencia_telefono"
                            type="tel"
                            class="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="+591 71234567"
                        />
                    </div>
                </div>
            </div>
        </div>

        <!-- Botones de acción -->
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
                class="px-6 py-3 font-medium text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span v-if="saving" class="flex items-center">
                    <svg class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
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
                <span v-else>{{ props.user ? 'Actualizar' : 'Crear' }} Usuario</span>
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { User, FileText, Phone, Mail, Lock, Eye, EyeOff, Camera, MapPin } from 'lucide-vue-next';
import { createUser, updateUser } from '@/services/UserService';

const props = defineProps(['user']);
const emit = defineEmits(['saved', 'cancel']);

const toast = useToast();
const saving = ref(false);
const activeTab = ref('basic');
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const avatarInput = ref(null);
const avatarPreview = ref(null);
const avatarFile = ref(null);

// Formulario reactivo con estructura correcta
const form = reactive({
    email: '',
    password: '',
    password_confirmation: '',
    estado: true, // Cambiado de is_active a estado
    avatar: null,
    general_data: {
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
        contacto_emergencia_nombre: '',
        contacto_emergencia_telefono: '',
        notas: '',
    },
});

// Resetear formulario
const resetForm = () => {
    form.email = '';
    form.password = '';
    form.password_confirmation = '';
    form.estado = true;
    form.avatar = null;

    Object.keys(form.general_data).forEach(key => {
        form.general_data[key] = '';
    });

    avatarPreview.value = null;
    avatarFile.value = null;
};

// Manejar avatar
const handleAvatar = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
        toast.error('Solo se permiten archivos de imagen');
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        toast.error('La imagen no debe superar los 2MB');
        return;
    }

    avatarFile.value = file;
    avatarPreview.value = URL.createObjectURL(file);
};

// Eliminar avatar
const removeAvatar = () => {
    avatarPreview.value = null;
    avatarFile.value = null;
    form.avatar = null;
    if (avatarInput.value) {
        avatarInput.value.value = '';
    }
};

// Obtener URL del avatar
const getAvatarUrl = avatar => {
    if (!avatar) return '';
    if (avatar.startsWith('http')) return avatar;
    return `${import.meta.env.VITE_API_URL}/storage/${avatar}`;
};

// Obtener iniciales
const getInitials = name => {
    if (!name) return '?';
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

// Guardar usuario
const saveUser = async () => {
    // Validar contraseñas
    if (form.password && form.password !== form.password_confirmation) {
        toast.error('Las contraseñas no coinciden');
        return;
    }

    // Validar campos requeridos
    if (!form.email || !form.general_data.nombre || !form.general_data.apellido) {
        toast.error('Por favor completa todos los campos requeridos');
        return;
    }

    saving.value = true;

    try {
        const formDataObj = new FormData();

        // Agregar método PUT si estamos editando
        if (props.user) {
            formDataObj.append('_method', 'PUT');
        }

        // Datos básicos
        formDataObj.append('email', form.email);
        formDataObj.append('estado', form.estado ? '1' : '0');

        // Contraseña (solo si se proporciona)
        if (form.password) {
            formDataObj.append('password', form.password);
            formDataObj.append('password_confirmation', form.password_confirmation);
        }

        // Avatar
        if (avatarFile.value) {
            formDataObj.append('avatar', avatarFile.value);
        }

        // Datos personales
        Object.keys(form.general_data).forEach(key => {
            if (form.general_data[key] !== null && form.general_data[key] !== '') {
                // Formatear fecha de nacimiento si existe
                if (key === 'nacimiento' && form.general_data[key]) {
                    formDataObj.append(`general_data[${key}]`, form.general_data[key]);
                } else {
                    formDataObj.append(`general_data[${key}]`, form.general_data[key]);
                }
            }
        });

        let response;
        if (props.user) {
            response = await updateUser(props.user.id, formDataObj);
        } else {
            response = await createUser(formDataObj);
        }

        emit('saved');
        toast.success(`Usuario ${props.user ? 'actualizado' : 'creado'} correctamente`);

        if (!props.user) {
            resetForm();
        }
    } catch (error) {
        console.error('Error al guardar usuario:', error);
        const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error ||
            'Error al guardar el usuario';
        toast.error(errorMessage);

        // Mostrar errores de validación si existen
        if (error.response?.data?.errors) {
            Object.values(error.response.data.errors).forEach(errors => {
                errors.forEach(error => toast.error(error));
            });
        }
    } finally {
        saving.value = false;
    }
};

// Watch para cargar datos del usuario al editar
watch(
    () => props.user,
    newUser => {
        if (newUser) {
            console.log('Cargando usuario:', newUser);

            form.email = newUser.email || '';
            form.estado = newUser.estado === 1 || newUser.estado === true;
            form.avatar = newUser.avatar || null;

            // Cargar general_data si existe
            if (newUser.general_data) {
                Object.keys(form.general_data).forEach(key => {
                    if (key === 'nacimiento' && newUser.general_data[key]) {
                        // Formatear fecha para input type="date"
                        const date = new Date(newUser.general_data[key]);
                        form.general_data[key] = date.toISOString().split('T')[0];
                    } else {
                        form.general_data[key] = newUser.general_data[key] || '';
                    }
                });
            }

            // No cargar la contraseña por seguridad
            form.password = '';
            form.password_confirmation = '';

            // Reset avatar preview
            avatarPreview.value = null;
            avatarFile.value = null;
        } else {
            resetForm();
        }
    },
    { immediate: true, deep: true }
);
</script>

<style scoped>
/* Estilos para los tabs */
.border-b-2 {
    transition: all 0.2s ease;
}
</style>
