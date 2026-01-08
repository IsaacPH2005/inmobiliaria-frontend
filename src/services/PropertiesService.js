// src/services/PropertiesService.js
import { httpAsset, http, urlBase, httpDownload } from './http';

export const getProperties = async (params = '') => {
    return http().get(`${urlBase}/properties${params}`);
};
export const getPropertiesActives = async (params = '') => {
    return http().get(`${urlBase}/properties-actives${params}`);
};
/**
 * Descargar imagen de propiedad por ID
 * @param {number} propertyId - ID de la propiedad
 * @param {number} imageId - ID de la imagen
 * @returns {Promise} - Promise con blob de la imagen
 */
export const downloadPropertyImage = async (propertyId, imageId) => {
    return httpDownload().get(`${urlBase}/properties/${propertyId}/images/${imageId}/download`);
};

/**
 * Descargar imagen por URL
 * @param {string} imageUrl - URL de la imagen
 * @param {string} filename - Nombre del archivo (opcional)
 * @returns {Promise} - Promise con blob de la imagen
 */
export const downloadImageByUrl = async (imageUrl, filename = null) => {
    return httpDownload().post(`${urlBase}/images/download`, {
        image_url: imageUrl,
        filename: filename,
    });
};

export const getProperty = async id => {
    return http().get(`${urlBase}/properties/${id}`);
};

export const createProperty = async data => {
    return httpAsset().post(`${urlBase}/properties`, data);
};

export const updateProperty = async (id, data) => {
    return httpAsset().post(`${urlBase}/properties/${id}`, data);
};

export const deleteProperty = async id => {
    return http().delete(`${urlBase}/properties/${id}`);
};

export const uploadImages = async (propertyId, data) => {
    return httpAsset().post(`${urlBase}/properties/${propertyId}/images`, data);
};

export const deleteImage = async (propertyId, imageId) => {
    return http().delete(`${urlBase}/properties/${propertyId}/images/${imageId}`);
};

export const setFeaturedImage = async (propertyId, imageId) => {
    return http().post(`${urlBase}/properties/${propertyId}/images/${imageId}/featured`);
};

export const reorderImages = async (propertyId, data) => {
    return http().post(`${urlBase}/properties/${propertyId}/images/reorder`, data);
};

export const getPropertysActives = async id => {
    return http().get(`${urlBase}/propertys-actives`);
};

// ✅ Toggle activo/inactivo
export const toggleActive = async id => {
    return http().patch(`${urlBase}/property/${id}/activo`);
};

// 🆕 NUEVAS RUTAS PARA USUARIO AUTENTICADO

/**
 * Obtener propiedades del usuario autenticado (agente)
 * @param {string} params - Parámetros de query (ej: '?page=1&per_page=12')
 * @returns {Promise} - Promise con las propiedades del usuario
 */
export const getPropertiesUserAuth = async (params = '') => {
    return http().get(`${urlBase}/properties-user-auth${params}`);
};

/**
 * Crear nueva propiedad para el usuario autenticado
 * @param {FormData} data - Datos de la propiedad (puede incluir imágenes)
 * @returns {Promise} - Promise con la propiedad creada
 */
export const createPropertyUserAuth = async data => {
    return httpAsset().post(`${urlBase}/properties-user-auth`, data);
};

// ✅ USER AUTH: Actualizar solo propiedades del usuario (sin user_id)
export const updatePropertyUserAuth = async (id, data) => {
    data.append('_method', 'PUT');
    return httpAsset().post(`${urlBase}/properties-user-auth/${id}`, data);
};
