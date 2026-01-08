<template>
    <div class="consignacion-form-container">
        <!-- Header -->
        <div class="form-header">
            <button @click="goBack" class="back-button">
                <ArrowLeft :size="20" />
                <span>Volver</span>
            </button>
            <h1 class="form-title">Nueva Consignación</h1>
        </div>

        <!-- Formulario -->
        <div class="form-wrapper">
            <form @submit.prevent="handleSubmit" class="consignacion-form">
                <!-- Seleccionar Usuario (Consignador) -->
                <div class="form-group">
                    <label for="consignador_id" class="form-label">
                        Consignador
                        <span class="required">*</span>
                    </label>
                    <select
                        id="consignador_id"
                        v-model="form.consignador_id"
                        class="form-input"
                        :class="{ 'input-error': errors.consignador_id }"
                        @change="clearError('consignador_id')"
                        required
                    >
                        <option value="" disabled>Selecciona un usuario</option>
                        <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
                            {{ usuario.nombre_completo }} - {{ usuario.email }}
                        </option>
                    </select>
                    <p v-if="errors.consignador_id" class="error-message">
                        {{ errors.consignador_id }}
                    </p>
                </div>

                <!-- Seleccionar Propiedad (Opcional) -->
                <div class="form-group">
                    <label for="property_id" class="form-label"> Propiedad (Opcional) </label>
                    <div class="property-selector">
                        <select
                            id="property_id"
                            v-model="form.property_id"
                            class="form-input"
                            :class="{ 'input-error': errors.property_id }"
                            @change="handlePropertyChange"
                        >
                            <option :value="null">Sin propiedad vinculada</option>
                            <option
                                v-for="propiedad in propiedades"
                                :key="propiedad.id"
                                :value="propiedad.id"
                            >
                                {{ propiedad.codigo_interno }} - {{ propiedad.nombre }} ({{
                                    propiedad.zona
                                }})
                            </option>
                        </select>
                        <button
                            v-if="form.property_id"
                            type="button"
                            @click="viewPropertyDetails"
                            class="view-property-btn"
                            title="Ver detalles"
                        >
                            <Eye :size="18" />
                        </button>
                    </div>
                    <p v-if="errors.property_id" class="error-message">{{ errors.property_id }}</p>
                    <p v-if="selectedProperty" class="property-info">
                        <MapPin :size="14" />
                        {{ selectedProperty.departamento }}, {{ selectedProperty.ciudad }} -
                        {{ selectedProperty.zona }}
                    </p>
                </div>

                <!-- Tipo de Operación -->
                <div class="form-group">
                    <label for="operacion" class="form-label">
                        Tipo de Operación
                        <span class="required">*</span>
                    </label>
                    <select
                        id="operacion"
                        v-model="form.operacion"
                        class="form-input"
                        :class="{ 'input-error': errors.operacion }"
                        @change="clearError('operacion')"
                        required
                    >
                        <option value="" disabled>Selecciona una operación</option>
                        <option v-for="op in operaciones" :key="op" :value="op">
                            {{ op }}
                        </option>
                    </select>
                    <p v-if="errors.operacion" class="error-message">{{ errors.operacion }}</p>
                </div>

                <!-- Tipo de Inmueble -->
                <div class="form-group">
                    <label for="tipo_inmueble" class="form-label">
                        Tipo de Inmueble
                        <span class="required">*</span>
                    </label>
                    <select
                        id="tipo_inmueble"
                        v-model="form.tipo_inmueble"
                        class="form-input"
                        :class="{ 'input-error': errors.tipo_inmueble }"
                        @change="clearError('tipo_inmueble')"
                        required
                    >
                        <option value="" disabled>Selecciona un tipo</option>
                        <option v-for="tipo in tipos_inmueble" :key="tipo" :value="tipo">
                            {{ tipo }}
                        </option>
                    </select>
                    <p v-if="errors.tipo_inmueble" class="error-message">
                        {{ errors.tipo_inmueble }}
                    </p>
                </div>

                <!-- Zona (Auto-rellena si selecciona propiedad) -->
                <div class="form-group">
                    <label for="zona" class="form-label">
                        Zona
                        <span class="required">*</span>
                    </label>
                    <div class="input-with-badge">
                        <input
                            id="zona"
                            v-model="form.zona"
                            type="text"
                            class="form-input"
                            :class="{ 'input-error': errors.zona }"
                            :readonly="!!form.property_id"
                            placeholder="Ej: Zona Norte, Centro, etc."
                            @input="clearError('zona')"
                            required
                        />
                        <span v-if="form.property_id" class="auto-fill-badge">
                            Auto-completado
                        </span>
                    </div>
                    <p v-if="errors.zona" class="error-message">{{ errors.zona }}</p>
                </div>

                <!-- Características del Inmueble -->
                <div class="form-group">
                    <label for="caracteristicas_inmueble" class="form-label">
                        Características del Inmueble
                        <span class="required">*</span>
                    </label>
                    <textarea
                        id="caracteristicas_inmueble"
                        v-model="form.caracteristicas_inmueble"
                        class="form-textarea"
                        :class="{ 'input-error': errors.caracteristicas_inmueble }"
                        placeholder="Describe las características principales del inmueble..."
                        rows="4"
                        maxlength="500"
                        @input="clearError('caracteristicas_inmueble')"
                        required
                    ></textarea>
                    <p v-if="errors.caracteristicas_inmueble" class="error-message">
                        {{ errors.caracteristicas_inmueble }}
                    </p>
                    <p class="input-hint">
                        {{ form.caracteristicas_inmueble.length }}/500 caracteres
                    </p>
                </div>

                <!-- Presupuesto y Moneda -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="presupuesto" class="form-label">
                            Presupuesto
                            <span class="required">*</span>
                        </label>
                        <div class="input-with-icon">
                            <DollarSign :size="18" class="input-icon" />
                            <input
                                id="presupuesto"
                                v-model="form.presupuesto"
                                type="number"
                                step="0.01"
                                min="0"
                                class="form-input with-icon"
                                :class="{ 'input-error': errors.presupuesto }"
                                placeholder="0.00"
                                @input="clearError('presupuesto')"
                                required
                            />
                        </div>
                        <p v-if="errors.presupuesto" class="error-message">
                            {{ errors.presupuesto }}
                        </p>
                    </div>

                    <div class="form-group">
                        <label for="tipo_moneda" class="form-label">
                            Moneda
                            <span class="required">*</span>
                        </label>
                        <select
                            id="tipo_moneda"
                            v-model="form.tipo_moneda"
                            class="form-input"
                            :class="{ 'input-error': errors.tipo_moneda }"
                            @change="clearError('tipo_moneda')"
                            required
                        >
                            <option
                                v-for="moneda in monedas"
                                :key="moneda.codigo"
                                :value="moneda.codigo"
                            >
                                {{ moneda.codigo }} - {{ moneda.nombre }}
                            </option>
                        </select>
                        <p v-if="errors.tipo_moneda" class="error-message">
                            {{ errors.tipo_moneda }}
                        </p>
                    </div>
                </div>

                <!-- Forma de Pago -->
                <div class="form-group">
                    <label for="forma_pago" class="form-label">
                        Forma de Pago
                        <span class="required">*</span>
                    </label>
                    <select
                        id="forma_pago"
                        v-model="form.forma_pago"
                        class="form-input"
                        :class="{ 'input-error': errors.forma_pago }"
                        @change="clearError('forma_pago')"
                        required
                    >
                        <option value="" disabled>Selecciona forma de pago</option>
                        <option v-for="forma in formas_pago" :key="forma" :value="forma">
                            {{ forma }}
                        </option>
                    </select>
                    <p v-if="errors.forma_pago" class="error-message">{{ errors.forma_pago }}</p>
                </div>

                <!-- Botones de acción -->
                <div class="form-actions">
                    <button
                        type="button"
                        @click="resetForm"
                        class="btn-secondary"
                        :disabled="loading"
                    >
                        <X :size="18" />
                        Cancelar
                    </button>
                    <button type="submit" class="btn-primary" :disabled="loading || loadingData">
                        <div v-if="loading" class="spinner"></div>
                        <Save v-else :size="18" />
                        {{ loading ? 'Guardando...' : 'Guardar Consignación' }}
                    </button>
                </div>
            </form>
        </div>

        <!-- Loading overlay -->
        <div v-if="loadingData" class="loading-overlay">
            <div class="loading-spinner"></div>
            <p>Cargando datos...</p>
        </div>

        <!-- Toast de éxito -->
        <div v-if="showSuccessToast" class="success-toast">
            <CheckCircle :size="20" />
            <span>Consignación creada exitosamente</span>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, DollarSign, Save, X, CheckCircle, Eye, MapPin } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';
import { createConsignacion, getFormData, getPropertyInfo } from '@/services/ConsignacionService';
/* import {} from '@/services/ConsignacionesService'; */

const router = useRouter();
const toast = useToast();

// Estado del formulario
const form = reactive({
    consignador_id: '',
    property_id: null,
    operacion: '',
    tipo_inmueble: '',
    caracteristicas_inmueble: '',
    zona: '',
    forma_pago: '',
    presupuesto: '',
    tipo_moneda: 'BOB',
});

// Datos del formulario
const usuarios = ref([]);
const propiedades = ref([]);
const tipos_inmueble = ref([]);
const operaciones = ref([]);
const formas_pago = ref([]);
const monedas = ref([]);
const selectedProperty = ref(null);

// Estado de errores
const errors = reactive({
    consignador_id: '',
    property_id: '',
    operacion: '',
    tipo_inmueble: '',
    caracteristicas_inmueble: '',
    zona: '',
    forma_pago: '',
    presupuesto: '',
    tipo_moneda: '',
});

const loading = ref(false);
const loadingData = ref(false);
const showSuccessToast = ref(false);

// Cargar datos del formulario
const loadFormData = async () => {
    loadingData.value = true;
    try {
        const { data } = await getFormData();
        console.log(data);
        usuarios.value = data.data.usuarios;
        propiedades.value = data.data.propiedades;
        tipos_inmueble.value = data.data.tipos_inmueble;
        operaciones.value = data.data.operaciones;
        formas_pago.value = data.data.formas_pago;
        monedas.value = data.data.monedas;

        // Asignar usuario logueado por defecto
        const userId = getUserId();
        if (userId) {
            form.consignador_id = userId;
        }
    } catch (error) {
        console.error('Error al cargar datos:', error);
        toast.error('Error al cargar los datos del formulario');
    } finally {
        loadingData.value = false;
    }
};

// Manejar cambio de propiedad
const handlePropertyChange = async () => {
    if (form.property_id) {
        try {
            const { data } = await getPropertyInfo(form.property_id);
            selectedProperty.value = data.data;

            // Auto-rellenar zona
            form.zona = data.data.zona || '';

            // Auto-rellenar tipo de inmueble si coincide
            if (tipos_inmueble.value.includes(data.data.tipo_inmueble)) {
                form.tipo_inmueble = data.data.tipo_inmueble;
            }

            // Auto-rellenar operación si coincide
            if (operaciones.value.includes(data.data.operacion)) {
                form.operacion = data.data.operacion;
            }

            toast.success('Información de la propiedad cargada');
        } catch (error) {
            console.error('Error al cargar propiedad:', error);
            toast.error('Error al cargar información de la propiedad');
        }
    } else {
        selectedProperty.value = null;
        form.zona = '';
    }
};

// Ver detalles de la propiedad
const viewPropertyDetails = () => {
    if (selectedProperty.value) {
        const message = `
📍 ${selectedProperty.value.nombre}
🏷️ Código: ${selectedProperty.value.codigo_interno}
📍 Ubicación: ${selectedProperty.value.departamento}, ${selectedProperty.value.ciudad}
🗺️ Zona: ${selectedProperty.value.zona}
🏠 Tipo: ${selectedProperty.value.tipo_inmueble}
💰 Precio: ${selectedProperty.value.precio} ${selectedProperty.value.moneda}
        `.trim();

        alert(message);
    }
};

// Obtener usuario logueado
const getUserId = () => {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        return userData.id;
    }
    return null;
};

// Limpiar error individual
const clearError = field => {
    errors[field] = '';
};

// Validar formulario
const validateForm = () => {
    let isValid = true;

    // Resetear errores
    Object.keys(errors).forEach(key => {
        errors[key] = '';
    });

    // Validaciones
    if (!form.consignador_id) {
        errors.consignador_id = 'El consignador es requerido';
        isValid = false;
    }

    if (!form.operacion) {
        errors.operacion = 'La operación es requerida';
        isValid = false;
    }

    if (!form.tipo_inmueble) {
        errors.tipo_inmueble = 'El tipo de inmueble es requerido';
        isValid = false;
    }

    if (!form.zona.trim()) {
        errors.zona = 'La zona es requerida';
        isValid = false;
    }

    if (!form.caracteristicas_inmueble.trim()) {
        errors.caracteristicas_inmueble = 'Las características son requeridas';
        isValid = false;
    } else if (form.caracteristicas_inmueble.length > 500) {
        errors.caracteristicas_inmueble = 'Máximo 500 caracteres';
        isValid = false;
    }

    if (!form.presupuesto) {
        errors.presupuesto = 'El presupuesto es requerido';
        isValid = false;
    } else if (parseFloat(form.presupuesto) <= 0) {
        errors.presupuesto = 'El presupuesto debe ser mayor a 0';
        isValid = false;
    }

    if (!form.tipo_moneda) {
        errors.tipo_moneda = 'La moneda es requerida';
        isValid = false;
    }

    if (!form.forma_pago) {
        errors.forma_pago = 'La forma de pago es requerida';
        isValid = false;
    }

    return isValid;
};

// Enviar formulario
const handleSubmit = async () => {
    if (!validateForm()) {
        toast.error('Por favor completa todos los campos correctamente');
        return;
    }

    loading.value = true;

    try {
        // Crear consignación
        const { data } = await createConsignacion(form);

        // Mostrar toast de éxito
        showSuccessToast.value = true;
        setTimeout(() => {
            showSuccessToast.value = false;
        }, 3000);

        toast.success('¡Consignación creada exitosamente!');

        // Resetear formulario
        resetForm();

        // Redireccionar después de 1.5 segundos
        setTimeout(() => {
            router.push('/');
        }, 1500);
    } catch (error) {
        console.error('Error al crear consignación:', error);

        // Mostrar errores del backend
        if (error.response?.data?.errors) {
            Object.keys(error.response.data.errors).forEach(key => {
                if (errors.hasOwnProperty(key)) {
                    errors[key] = error.response.data.errors[key][0];
                }
            });
        }

        toast.error(
            error.response?.data?.message || 'Error al crear la consignación. Intenta nuevamente.'
        );
    } finally {
        loading.value = false;
    }
};

// Resetear formulario
const resetForm = () => {
    const userId = getUserId();

    form.consignador_id = userId || '';
    form.property_id = null;
    form.operacion = '';
    form.tipo_inmueble = '';
    form.caracteristicas_inmueble = '';
    form.zona = '';
    form.forma_pago = '';
    form.presupuesto = '';
    form.tipo_moneda = 'BOB';

    selectedProperty.value = null;

    // Limpiar errores
    Object.keys(errors).forEach(key => {
        errors[key] = '';
    });
};

// Volver atrás
const goBack = () => {
    if (window.history.length > 1) {
        router.back();
    } else {
        router.push('/');
    }
};

// Cargar datos al montar
onMounted(() => {
    loadFormData();
});
</script>

<style scoped>
/* Container principal */
.consignacion-form-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
    padding: 1rem;
    position: relative;
}

@media (min-width: 768px) {
    .consignacion-form-container {
        padding: 2rem;
    }
}

/* Header */
.form-header {
    margin-bottom: 1.5rem;
}

.back-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    color: #374151;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 1rem;
    transition: all 0.2s;
}

.back-button:hover {
    background: #f9fafb;
    border-color: #d1d5db;
}

.form-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    margin: 0;
}

@media (min-width: 768px) {
    .form-title {
        font-size: 2rem;
    }
}

/* Form wrapper */
.form-wrapper {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.05);
}

@media (min-width: 768px) {
    .form-wrapper {
        padding: 2.5rem;
    }
}

/* Form */
.consignacion-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* Form group */
.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
}

.required {
    color: #ef4444;
    margin-left: 0.25rem;
}

/* Property selector */
.property-selector {
    display: flex;
    gap: 0.5rem;
}

.property-selector select {
    flex: 1;
}

.view-property-btn {
    padding: 0.75rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.view-property-btn:hover {
    background: #2563eb;
}

.property-info {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0;
    padding: 0.5rem;
    background: #f3f4f6;
    border-radius: 0.375rem;
}

/* Input with badge */
.input-with-badge {
    position: relative;
}

.auto-fill-badge {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.25rem 0.625rem;
    background: #10b981;
    color: white;
    font-size: 0.625rem;
    font-weight: 600;
    border-radius: 9999px;
    pointer-events: none;
}

/* Inputs */
.form-input,
.form-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: #111827;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    transition: all 0.2s;
    outline: none;
}

.form-input:focus,
.form-textarea:focus {
    background: white;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:readonly {
    background: #f3f4f6;
    cursor: not-allowed;
}

.form-input.input-error,
.form-textarea.input-error {
    border-color: #ef4444;
}

.form-input.input-error:focus,
.form-textarea.input-error:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-textarea {
    resize: vertical;
    min-height: 100px;
}

/* Input with icon */
.input-with-icon {
    position: relative;
}

.input-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    pointer-events: none;
}

.form-input.with-icon {
    padding-left: 2.75rem;
}

/* Error message */
.error-message {
    font-size: 0.75rem;
    color: #ef4444;
    margin: 0;
}

/* Input hint */
.input-hint {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0;
}

/* Form row */
.form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

@media (min-width: 640px) {
    .form-row {
        grid-template-columns: 2fr 1fr;
    }
}

/* Form actions */
.form-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
}

@media (min-width: 640px) {
    .form-actions {
        flex-direction: row;
        justify-content: flex-end;
    }
}

/* Buttons */
.btn-primary,
.btn-secondary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    min-height: 48px;
}

.btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
}

.btn-primary:active:not(:disabled) {
    transform: translateY(0);
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-secondary {
    background: white;
    color: #6b7280;
    border: 1px solid #e5e7eb;
}

.btn-secondary:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #d1d5db;
}

/* Spinner */
.spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Loading overlay */
.loading-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    z-index: 9999;
    color: white;
}

.loading-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

/* Success toast */
.success-toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: #10b981;
    color: white;
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
    animation: slideIn 0.3s ease-out;
    z-index: 9999;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@media (max-width: 640px) {
    .success-toast {
        left: 1rem;
        right: 1rem;
        bottom: 1rem;
    }
}
</style>
