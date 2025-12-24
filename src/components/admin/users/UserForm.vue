<template>
    <form @submit.prevent="saveUser" class="p-6 space-y-6">
        <!-- Tabs -->
        <div class="border-b border-neutral-200">
            <div class="flex gap-4 -mb-px overflow-x-auto">
                <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    type="button"
                    @click="activeTab = tab.id"
                    :class="[
                        'px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2',
                        activeTab === tab.id
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-500 hover:text-neutral-700',
                    ]"
                >
                    <component :is="tab.icon" class="w-4 h-4" />
                    {{ tab.label }}
                </button>
            </div>
        </div>

        <!-- Tab: Datos Básicos -->
        <div v-show="activeTab === 'basic'" class="space-y-6">
            <!-- Avatar -->
            <div class="flex items-center gap-6">
                <div class="relative">
                    <!-- Preview del avatar -->
                    <div
                        v-if="getDisplayAvatar()"
                        class="w-24 h-24 overflow-hidden bg-gray-200 rounded-full ring-4 ring-primary-100"
                    >
                        <img
                            :src="getDisplayAvatar()"
                            alt="Avatar"
                            class="object-cover w-full h-full"
                            @error="handleImageError"
                        />
                    </div>
                    <!-- Avatar por defecto con iniciales -->
                    <div
                        v-else
                        class="flex items-center justify-center w-24 h-24 text-3xl font-bold text-white rounded-full bg-gradient-to-br from-primary-500 to-primary-700 ring-4 ring-primary-100"
                    >
                        {{
                            getInitials(`${form.general_data.nombre} ${form.general_data.apellido}`)
                        }}
                    </div>

                    <!-- Botón de cámara -->
                    <button
                        type="button"
                        @click="$refs.avatarInput.click()"
                        class="absolute bottom-0 right-0 p-2 text-white transition-transform rounded-full shadow-lg bg-primary-600 hover:bg-primary-700 hover:scale-110"
                        title="Cambiar foto"
                    >
                        <Camera class="w-4 h-4" />
                    </button>
                </div>

                <div class="flex-1">
                    <input
                        type="file"
                        ref="avatarInput"
                        @change="handleAvatar"
                        accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                        class="hidden"
                    />
                    <p class="text-sm font-medium text-neutral-700">Foto de perfil</p>
                    <p class="text-xs text-neutral-500">JPG, PNG, GIF o WebP - Máximo 5MB</p>

                    <div class="flex gap-2 mt-2">
                        <button
                            v-if="avatarPreview || props.user?.avatar"
                            type="button"
                            @click="removeAvatar"
                            class="text-xs text-red-600 transition-colors hover:text-red-700"
                        >
                            <X class="inline w-3 h-3 mr-1" />
                            Eliminar foto
                        </button>
                    </div>
                </div>
            </div>

            <!-- Email -->
            <div>
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

            <!-- Contraseñas - SOLO EN MODO CREACIÓN -->
            <template v-if="!props.user">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <!-- Contraseña -->
                    <div>
                        <label class="block mb-1 text-sm font-medium text-neutral-700">
                            Contraseña <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                            <Lock
                                class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                            />
                            <input
                                v-model="form.password"
                                :type="showPassword ? 'text' : 'password'"
                                required
                                minlength="8"
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
                        <p class="mt-1 text-xs text-neutral-500">Mínimo 8 caracteres</p>
                    </div>

                    <!-- Confirmar Contraseña -->
                    <div>
                        <label class="block mb-1 text-sm font-medium text-neutral-700">
                            Confirmar Contraseña <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                            <Lock
                                class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                            />
                            <input
                                v-model="form.password_confirmation"
                                :type="showPasswordConfirm ? 'text' : 'password'"
                                required
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
                </div>
            </template>

            <!-- Estado -->
            <div class="flex items-center gap-2">
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
                        Documento de Identidad <span class="text-red-500">*</span>
                    </label>
                    <input
                        v-model="form.general_data.documento_identidad"
                        required
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
                        Celular Principal <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <Phone
                            class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                        />
                        <input
                            v-model="form.general_data.celular"
                            type="tel"
                            required
                            class="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="+591 70123456"
                        />
                    </div>
                </div>

                <!-- Dirección -->
                <div class="md:col-span-2">
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Dirección <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <MapPin
                            class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                        />
                        <input
                            v-model="form.general_data.direccion"
                            required
                            class="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Av. Principal #123"
                        />
                    </div>
                </div>

                <!-- Ciudad -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Ciudad <span class="text-red-500">*</span>
                    </label>
                    <input
                        v-model="form.general_data.ciudad"
                        required
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Cochabamba"
                    />
                </div>

                <!-- Departamento -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Departamento <span class="text-red-500">*</span>
                    </label>
                    <input
                        v-model="form.general_data.departamento"
                        required
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Cochabamba"
                    />
                </div>

                <!-- Contacto de Emergencia -->
                <div class="md:col-span-2">
                    <h3 class="mb-3 text-sm font-semibold text-neutral-700">
                        Contacto de Emergencia
                    </h3>
                </div>

                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">Nombre</label>
                    <input
                        v-model="form.general_data.contacto_emergencia_nombre"
                        class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="María Pérez"
                    />
                </div>

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

        <!-- Tab: Roles -->
        <div v-show="activeTab === 'roles'" class="space-y-6">
            <div>
                <h3 class="mb-3 text-sm font-semibold text-neutral-700">Asignar Roles</h3>
                <p class="mb-4 text-xs text-neutral-500">
                    Selecciona uno o varios roles manteniendo presionada la tecla Ctrl (o Cmd en
                    Mac)
                </p>

                <select
                    v-model="form.roles"
                    multiple
                    size="5"
                    class="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                    <option v-for="role in availableRoles" :key="role.id" :value="role.name">
                        {{ role.name }}
                    </option>
                </select>

                <!-- Roles seleccionados -->
                <div v-if="form.roles.length > 0" class="mt-4">
                    <h4 class="text-sm font-medium text-neutral-700">Roles seleccionados:</h4>
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span
                            v-for="roleName in form.roles"
                            :key="roleName"
                            class="px-3 py-1 text-sm rounded-full bg-primary-100 text-primary-800"
                        >
                            {{ roleName }}
                        </span>
                    </div>
                </div>
                <div v-else class="mt-2 text-sm text-amber-600">
                    No se ha seleccionado ningún rol para este usuario
                </div>
            </div>
        </div>

        <!-- Tab: Seguridad (Solo en edición) -->
        <div v-show="activeTab === 'security' && props.user" class="space-y-6">
            <div class="p-4 border rounded-lg bg-amber-50 border-amber-200">
                <div class="flex items-start gap-3">
                    <AlertTriangle class="w-5 h-5 mt-0.5 text-amber-600" />
                    <div>
                        <h4 class="font-semibold text-amber-900">Cambiar Contraseña</h4>
                        <p class="text-sm text-amber-700">
                            Solo completa estos campos si deseas cambiar la contraseña del usuario.
                            De lo contrario, déjalos en blanco.
                        </p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <!-- Nueva Contraseña -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Nueva Contraseña
                    </label>
                    <div class="relative">
                        <Lock
                            class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                        />
                        <input
                            v-model="form.password"
                            :type="showPassword ? 'text' : 'password'"
                            minlength="8"
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
                    <p class="mt-1 text-xs text-neutral-500">Mínimo 8 caracteres</p>
                </div>

                <!-- Confirmar Nueva Contraseña -->
                <div>
                    <label class="block mb-1 text-sm font-medium text-neutral-700">
                        Confirmar Nueva Contraseña
                    </label>
                    <div class="relative">
                        <Lock
                            class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                        />
                        <input
                            v-model="form.password_confirmation"
                            :type="showPasswordConfirm ? 'text' : 'password'"
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
import { ref, reactive, watch, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import {
    User,
    FileText,
    Phone,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Camera,
    MapPin,
    X,
    AlertTriangle,
    Shield,
} from 'lucide-vue-next';
import { createUser, updateUser, updateUserAvatar, deleteUserAvatar } from '@/services/UserService';
import { urlBase } from '@/services/http';
import { getRoles } from '@/services/RolesService';

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
const imageLoadError = ref(false);

// Lista de roles disponibles
const availableRoles = ref([]);

// Tabs configuration
const tabs = computed(() => {
    const baseTabs = [
        { id: 'basic', label: 'Datos Básicos', icon: User },
        { id: 'personal', label: 'Datos Personales', icon: FileText },
        { id: 'contact', label: 'Contacto', icon: Phone },
        { id: 'roles', label: 'Roles', icon: Shield },
    ];

    // Agregar tab de seguridad solo en modo edición
    if (props.user) {
        baseTabs.push({ id: 'security', label: 'Seguridad', icon: Lock });
    }

    return baseTabs;
});

// Función para cargar roles
const fetchRoles = async () => {
    try {
        const response = await getRoles();
        availableRoles.value = response.data.data;
    } catch (error) {
        console.error('Error al cargar roles:', error);
        toast.error('Error al cargar los roles');
    }
};

// Cargar roles al montar
onMounted(() => {
    fetchRoles();
});

// Formulario reactivo
const form = reactive({
    email: '',
    password: '',
    password_confirmation: '',
    estado: true,
    roles: [],
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
    form.roles = [];

    Object.keys(form.general_data).forEach(key => {
        form.general_data[key] = '';
    });

    avatarPreview.value = null;
    avatarFile.value = null;
    imageLoadError.value = false;
    activeTab.value = 'basic';
};

// Obtener avatar para mostrar
const getDisplayAvatar = () => {
    if (avatarPreview.value) {
        return avatarPreview.value;
    }

    if (imageLoadError.value) {
        return null;
    }

    const avatar = props.user?.avatar;
    if (!avatar) return null;

    // Si es un objeto
    if (typeof avatar === 'object' && avatar.image_url) {
        return getAvatarUrl(avatar.image_url);
    }

    // Si es un string
    if (typeof avatar === 'string') {
        return getAvatarUrl(avatar);
    }

    return null;
};

// Función mejorada para construir URL del avatar
const getAvatarUrl = path => {
    if (!path || typeof path !== 'string') return null;

    // Ya es una URL completa
    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    // Construir URL relativa
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${urlBase}${cleanPath}`;
};

// Manejar error de carga de imagen
const handleImageError = () => {
    imageLoadError.value = true;
};

// Manejar avatar
const handleAvatar = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
        toast.error('Solo se permiten archivos de imagen');
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen no debe superar los 5MB');
        return;
    }

    avatarFile.value = file;
    avatarPreview.value = URL.createObjectURL(file);
    imageLoadError.value = false;
};

// Eliminar avatar
const removeAvatar = async () => {
    if (props.user?.id && props.user?.avatar) {
        try {
            await deleteUserAvatar(props.user.id);
            toast.success('Avatar eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar avatar:', error);
            toast.error('Error al eliminar el avatar');
        }
    }

    avatarPreview.value = null;
    avatarFile.value = null;
    imageLoadError.value = false;
    if (avatarInput.value) {
        avatarInput.value.value = '';
    }
};

// Obtener iniciales
const getInitials = name => {
    if (!name || name.trim() === ' ') return '?';
    return name
        .split(' ')
        .filter(n => n)
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

    // Validar contraseña requerida solo en creación
    if (!props.user && !form.password) {
        toast.error('La contraseña es obligatoria al crear un usuario');
        return;
    }

    // Validar longitud mínima de contraseña
    if (form.password && form.password.length < 8) {
        toast.error('La contraseña debe tener al menos 8 caracteres');
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

        // ✅ AGREGAR _method PUT SOLO AL EDITAR
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

        // Roles
        if (form.roles.length > 0) {
            form.roles.forEach(roleName => {
                formDataObj.append('roles[]', roleName);
            });
        }

        // Datos personales
        Object.keys(form.general_data).forEach(key => {
            if (form.general_data[key] !== null && form.general_data[key] !== '') {
                formDataObj.append(`general_data[${key}]`, form.general_data[key]);
            }
        });

        let response;
        if (props.user) {
            response = await updateUser(props.user.id, formDataObj);
        } else {
            response = await createUser(formDataObj);
        }

        // Subir avatar si hay uno seleccionado
        if (avatarFile.value) {
            const userId = props.user?.id || response.data.data.id;
            const avatarFormData = new FormData();
            avatarFormData.append('avatar', avatarFile.value);

            try {
                await updateUserAvatar(userId, avatarFormData);
                toast.success('Avatar actualizado correctamente');
            } catch (error) {
                console.error('Error al subir avatar:', error);
                toast.warning('Usuario guardado pero hubo un error al subir el avatar');
            }
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

            // Cargar roles
            if (newUser.roles && Array.isArray(newUser.roles)) {
                form.roles = newUser.roles.map(role => role.name);
            } else {
                form.roles = [];
            }

            // Cargar general_data
            if (newUser.general_data) {
                Object.keys(form.general_data).forEach(key => {
                    if (key === 'nacimiento' && newUser.general_data[key]) {
                        const date = new Date(newUser.general_data[key]);
                        form.general_data[key] = date.toISOString().split('T')[0];
                    } else {
                        form.general_data[key] = newUser.general_data[key] || '';
                    }
                });
            }

            // Reset password y avatar
            form.password = '';
            form.password_confirmation = '';
            avatarPreview.value = null;
            avatarFile.value = null;
            imageLoadError.value = false;
            activeTab.value = 'basic';
        } else {
            resetForm();
        }
    },
    { immediate: true, deep: true }
);
</script>

<style scoped>
.border-b-2 {
    transition: all 0.2s ease;
}
</style>
