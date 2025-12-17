import Swal from 'sweetalert2';
import { isDarkMode } from './useDarkMode';

export const useAlert = () => {
    // Función helper para obtener los estilos según el modo y la configuración de Tailwind
    const getThemeStyles = () => {
        const dark = isDarkMode.value;
        return {
            // Backgrounds basados en la paleta neutral
            background: dark ? '#171717' : '#ffffff', // neutral-900 : white
            color: dark ? '#fafafa' : '#171717', // neutral-50 : neutral-900

            // Colores de botones basados en primary, secondary y accent
            confirmButtonColor: '#2563eb', // primary-600
            cancelButtonColor: dark ? '#525252' : '#a3a3a3', // neutral-600 : neutral-400

            // Clases de popup mejoradas
            popup: dark
                ? 'rounded-2xl shadow-2xl bg-neutral-900 text-neutral-50 border-2 border-neutral-800'
                : 'rounded-2xl shadow-2xl bg-white text-neutral-900 border-2 border-neutral-200',

            // Títulos con mejor tipografía
            title: dark
                ? 'text-2xl font-bold text-neutral-50 mb-2'
                : 'text-2xl font-bold text-neutral-900 mb-2',

            // Contenido con mejor legibilidad
            content: dark
                ? 'text-base font-medium text-neutral-300'
                : 'text-base font-medium text-neutral-700',

            // Botones confirm con primary colors
            confirmButton: dark
                ? 'px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                : 'px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',

            // Botones cancel con neutral colors
            cancelButton: dark
                ? 'px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                : 'px-6 py-3 bg-neutral-400 hover:bg-neutral-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',

            // Botón de error con accent colors
            errorButton: dark
                ? 'px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                : 'px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',

            // Botón de success con secondary colors
            successButton: dark
                ? 'px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                : 'px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
        };
    };

    const showSuccess = (title, text = '', options = {}) => {
        const theme = getThemeStyles();
        const dark = isDarkMode.value;
        return Swal.fire({
            icon: 'success',
            title,
            text,
            confirmButtonColor: '#16a34a', // secondary-600
            background: theme.background,
            color: theme.color,
            iconColor: '#22c55e', // secondary-500
            showConfirmButton: true,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                popup: theme.popup,
                title: dark
                    ? 'text-2xl font-bold text-secondary-400 mb-3'
                    : 'text-2xl font-bold text-secondary-600 mb-3',
                content: theme.content,
                confirmButton: theme.successButton,
                timerProgressBar: 'bg-secondary-500',
            },
            ...options,
        });
    };

    const showError = (title, text = '') => {
        const theme = getThemeStyles();
        const dark = isDarkMode.value;
        return Swal.fire({
            icon: 'error',
            title,
            text,
            confirmButtonColor: '#ea580c', // accent-600
            background: theme.background,
            color: theme.color,
            iconColor: '#f97316', // accent-500
            showConfirmButton: true,
            customClass: {
                popup: theme.popup,
                title: dark
                    ? 'text-2xl font-bold text-accent-400 mb-3'
                    : 'text-2xl font-bold text-accent-600 mb-3',
                content: theme.content,
                confirmButton: theme.errorButton,
            },
        });
    };

    const showWarning = (title, text = '') => {
        const theme = getThemeStyles();
        const dark = isDarkMode.value;
        return Swal.fire({
            icon: 'warning',
            title,
            text,
            confirmButtonColor: '#ea580c', // accent-600
            background: theme.background,
            color: theme.color,
            iconColor: '#fb923c', // accent-400
            showConfirmButton: true,
            customClass: {
                popup: theme.popup,
                title: dark
                    ? 'text-2xl font-bold text-accent-300 mb-3'
                    : 'text-2xl font-bold text-accent-600 mb-3',
                content: theme.content,
                confirmButton: theme.errorButton,
            },
        });
    };

    const showConfirm = (title, text = '') => {
        const theme = getThemeStyles();
        const dark = isDarkMode.value;
        return Swal.fire({
            icon: 'question',
            title,
            text,
            showCancelButton: true,
            confirmButtonColor: '#2563eb', // primary-600
            cancelButtonColor: dark ? '#525252' : '#a3a3a3', // neutral-600 : neutral-400
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Cancelar',
            background: theme.background,
            color: theme.color,
            iconColor: '#3b82f6', // primary-500
            customClass: {
                popup: theme.popup,
                title: dark
                    ? 'text-2xl font-bold text-primary-400 mb-3'
                    : 'text-2xl font-bold text-primary-600 mb-3',
                content: theme.content,
                confirmButton: theme.confirmButton,
                cancelButton: theme.cancelButton,
                actions: 'gap-3',
            },
        }).then(result => {
            return result.isConfirmed;
        });
    };

    const showValidationErrors = errors => {
        const theme = getThemeStyles();
        const dark = isDarkMode.value;

        let errorHtml = `<div class="text-left space-y-3 max-h-96 overflow-y-auto p-2">`;

        Object.keys(errors).forEach(field => {
            const fieldName = field.replace('general_data.', '').replace('_', ' ');
            const capitalizedField = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
            const errorClass = dark
                ? 'text-accent-300 bg-accent-900/20 border-accent-700'
                : 'text-accent-700 bg-accent-50 border-accent-300';

            if (Array.isArray(errors[field])) {
                errors[field].forEach(error => {
                    errorHtml += `
                        <div class="${errorClass} border-l-4 rounded-r-lg p-4 shadow-sm">
                            <p class="font-bold text-sm mb-1">${capitalizedField}</p>
                            <p class="text-sm font-medium">${error}</p>
                        </div>
                    `;
                });
            } else {
                errorHtml += `
                    <div class="${errorClass} border-l-4 rounded-r-lg p-4 shadow-sm">
                        <p class="font-bold text-sm mb-1">${capitalizedField}</p>
                        <p class="text-sm font-medium">${errors[field]}</p>
                    </div>
                `;
            }
        });

        errorHtml += '</div>';

        return Swal.fire({
            icon: 'error',
            title: 'Errores de Validación',
            html: errorHtml,
            confirmButtonColor: '#ea580c', // accent-600
            background: theme.background,
            color: theme.color,
            iconColor: '#f97316', // accent-500
            width: '600px',
            customClass: {
                popup: theme.popup,
                title: dark
                    ? 'text-2xl font-bold text-accent-400 mb-4'
                    : 'text-2xl font-bold text-accent-600 mb-4',
                htmlContainer: 'text-left',
                confirmButton: theme.errorButton,
            },
        });
    };

    const showLoading = (title = 'Procesando...') => {
        const theme = getThemeStyles();
        const dark = isDarkMode.value;
        return Swal.fire({
            title,
            html: '<p class="text-sm font-medium mt-2">Por favor espere un momento</p>',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            background: theme.background,
            color: theme.color,
            didOpen: () => {
                Swal.showLoading();
                // Aplicar estilos al spinner de carga
                const loader = document.querySelector('.swal2-loader');
                if (loader) {
                    if (dark) {
                        loader.style.borderColor = '#3b82f6 transparent #3b82f6 transparent'; // primary-500
                    } else {
                        loader.style.borderColor = '#2563eb transparent #2563eb transparent'; // primary-600
                    }
                    loader.style.borderWidth = '4px';
                    loader.style.width = '3rem';
                    loader.style.height = '3rem';
                }
            },
            customClass: {
                popup: theme.popup,
                title: dark
                    ? 'text-2xl font-bold text-primary-400 mb-2'
                    : 'text-2xl font-bold text-primary-600 mb-2',
                htmlContainer: dark
                    ? 'text-base font-medium text-neutral-400'
                    : 'text-base font-medium text-neutral-600',
            },
        });
    };

    const closeLoading = () => {
        Swal.close();
    };

    // Nueva función para alertas informativas
    const showInfo = (title, text = '') => {
        const theme = getThemeStyles();
        const dark = isDarkMode.value;
        return Swal.fire({
            icon: 'info',
            title,
            text,
            confirmButtonColor: '#2563eb', // primary-600
            background: theme.background,
            color: theme.color,
            iconColor: '#3b82f6', // primary-500
            showConfirmButton: true,
            customClass: {
                popup: theme.popup,
                title: dark
                    ? 'text-2xl font-bold text-primary-400 mb-3'
                    : 'text-2xl font-bold text-primary-600 mb-3',
                content: theme.content,
                confirmButton: theme.confirmButton,
            },
        });
    };

    // Nueva función para alertas con HTML personalizado
    const showCustomHtml = (title, html, options = {}) => {
        const theme = getThemeStyles();
        const dark = isDarkMode.value;
        return Swal.fire({
            title,
            html,
            confirmButtonColor: '#2563eb', // primary-600
            background: theme.background,
            color: theme.color,
            customClass: {
                popup: theme.popup,
                title: dark
                    ? 'text-2xl font-bold text-neutral-50 mb-3'
                    : 'text-2xl font-bold text-neutral-900 mb-3',
                htmlContainer: 'text-left',
                confirmButton: theme.confirmButton,
            },
            ...options,
        });
    };

    return {
        showSuccess,
        showError,
        showWarning,
        showConfirm,
        showValidationErrors,
        showLoading,
        closeLoading,
        showInfo,
        showCustomHtml,
    };
};

export default useAlert;
