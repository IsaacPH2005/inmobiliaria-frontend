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
import HomePage from '@/pages/web/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/',
            component: LayoutWeb,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: HomePage,
                },
            ],
        },
        {
            path: '/dashboard-admin',
            component: AdminLayout,
            children: [
                {
                    path: '/dashboard',
                    name: 'admin-dashboard',
                    component: DashboardAdmin,
                },
                {
                    path: '/properties',
                    name: 'admin-properties',
                    component: PropertiesAdmin,
                },
                {
                    path: '/users',
                    name: 'admin-users',
                    component: UsersAdmin,
                },
                {
                    path: '/profile',
                    name: 'admin-profile',
                    component: Profile,
                },
                {
                    path: '/settings',
                    name: 'admin-settings',
                    component: SiteSettingsAdmin,
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
});

export default router;
