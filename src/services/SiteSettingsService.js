// src/services/SiteSettingsService.js - CORREGIDO
import { http, httpAsset, urlBase } from './http';

export const getSiteSettings = () => {
    return http().get(`${urlBase}/admin/site-settings`);
};

export const updateSiteSettings = data => {
    const formData = new FormData();

    // ✅ CONVERSIÓN BOOLEAN explícita para FormData
    Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
            if (key === 'mantenimiento') {
                // FormData siempre envía strings, usar '0'/'1'
                formData.append(key, data[key] ? '1' : '0');
            } else if (data[key] instanceof File) {
                formData.append(key, data[key]);
            } else {
                formData.append(key, data[key]);
            }
        }
    });

    return httpAsset().post(`${urlBase}/admin/site-settings`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteSiteLogo = id => {
    return http().delete(`${urlBase}/admin/site-settings/${id}/logo`);
};

export const deleteSiteFavicon = id => {
    return http().delete(`${urlBase}/admin/site-settings/${id}/favicon`);
};
