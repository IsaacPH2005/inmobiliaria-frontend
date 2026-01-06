import PropertyDetails from '@/components/web/Home/PropertyDetails.vue';
import PropertyModal from '@/components/web/Home/PropertyModal.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import LayoutWeb from '@/layouts/web/LayoutWeb.vue';
import DashboardAdmin from '@/pages/admin/DashboardAdmin.vue';
import Profile from '@/pages/admin/Profile.vue';
import PropertiesAdmin from '@/pages/admin/PropertiesAdmin.vue';
import SiteSettingsAdmin from '@/pages/admin/SiteSettingsAdmin.vue';
import UsersAdmin from '@/pages/admin/UsersAdmin.vue';
import Login from '@/pages/auth/Login.vue';
import Register from '@/pages/auth/Register.vue';
import Notfound from '@/pages/notfound.vue';
import ContactoPage from '@/pages/web/ContactoPage.vue';
import HomePage from '@/pages/web/HomePage.vue';
import NosotrosPage from '@/pages/web/NosotrosPage.vue';
import ServiciosPage from '@/pages/web/ServiciosPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(''),
    routes: [
        // Auth Routes
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                title: 'Iniciar Sesión',
                requiresGuest: true,
            },
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                title: 'Registrarse',
                requiresGuest: true,
            },
        },

        // Web Routes
        {
            path: '/',
            component: LayoutWeb,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: HomePage,
                    meta: { title: 'Inicio - Inmobiliaria' },
                },
                {
                    path: 'propiedad/:id',
                    name: 'PropertyDetail',
                    component: PropertyModal,
                    meta: { title: 'Detalle de Propiedad' },
                },
                {
                    path: 'servicios',
                    name: 'Servicios',
                    component: ServiciosPage,
                    meta: { title: 'Servicios - Inmobiliaria' },
                },
                {
                    path: 'nosotros',
                    name: 'Nosotros',
                    component: NosotrosPage,
                    meta: { title: 'Sobre Nosotros - Inmobiliaria' },
                },
                {
                    path: 'contacto',
                    name: 'Contacto',
                    component: ContactoPage,
                    meta: { title: 'Contacto - Inmobiliaria' },
                },
            ],
        },

        // Admin Routes
        {
            path: '/admin',
            component: AdminLayout,
            children: [
                {
                    path: '',
                    redirect: '/admin/dashboard',
                },
                {
                    path: 'dashboard',
                    name: 'admin-dashboard',
                    component: DashboardAdmin,
                    meta: {
                        title: 'Dashboard - Admin',
                    },
                },
                {
                    path: 'properties',
                    name: 'admin-properties',
                    component: PropertiesAdmin,
                    meta: {
                        title: 'Propiedades - Admin',
                    },
                },
                {
                    path: 'users',
                    name: 'admin-users',
                    component: UsersAdmin,
                    meta: {
                        title: 'Usuarios - Admin',
                    },
                },
                {
                    path: 'profile',
                    name: 'admin-profile',
                    component: Profile,
                    meta: {
                        title: 'Perfil - Admin',
                        requiresAuth: true,
                    },
                },
                {
                    path: 'settings',
                    name: 'admin-settings',
                    component: SiteSettingsAdmin,
                    meta: {
                        title: 'Configuración - Admin',
                    },
                },
            ],
        },

        // 404 - Debe estar al final
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: Notfound,
            meta: { title: '404 - Página no encontrada' },
        },
    ],

    // 🔹 SCROLL BEHAVIOR - Ir al inicio al cambiar de página
    scrollBehavior(to, from, savedPosition) {
        // Si el usuario usa el botón "atrás" del navegador, mantener posición
        if (savedPosition) {
            return savedPosition;
        }

        // Si la ruta tiene un hash (#propiedades, #contacto, etc.)
        if (to.hash) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        el: to.hash,
                        behavior: 'smooth',
                        top: 90, // Offset para header fijo (ajusta según tu header)
                    });
                }, 300);
            });
        }

        // Por defecto, ir al inicio de la página
        return {
            top: 0,
            behavior: 'instant', // 'smooth' para animación suave
        };
    },
});

// 🔹 NAVIGATION GUARDS
router.beforeEach((to, from, next) => {
    // Actualizar título de la página
    document.title = to.meta.title || 'Inmobiliaria';

    // Verificar autenticación (puedes personalizar esta lógica)
    const isAuthenticated = !!localStorage.getItem('auth_token'); // Ajusta según tu auth

    // Si la ruta requiere autenticación y no está autenticado
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({
            name: 'login',
            query: { redirect: to.fullPath },
        });
        return;
    }

    // Si está autenticado e intenta ir a login/register, redirigir al dashboard
    if (to.meta.requiresGuest && isAuthenticated) {
        next({ name: 'admin-dashboard' });
        return;
    }

    next();
});

// 🔹 AFTER EACH - Scroll to top después de cada navegación
router.afterEach((to, from) => {
    // Asegurar scroll al inicio en páginas web (no admin)
    if (!to.path.startsWith('/admin') && !to.hash) {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'instant',
            });
        }, 100);
    }
});

export default router;
