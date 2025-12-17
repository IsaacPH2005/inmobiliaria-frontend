// src/services/PropertiesService.js
import { httpAsset, http, urlBase } from './http';

export const getProperties = async (params = '') => {
    return http().get(`${urlBase}/properties${params}`);
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
