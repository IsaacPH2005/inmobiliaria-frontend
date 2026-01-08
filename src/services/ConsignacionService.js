// src/services/ConsignacionesService.js
import { http, urlBase } from './http';

export const getConsignaciones = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return http().get(`${urlBase}/consignaciones${queryString ? '?' + queryString : ''}`);
};

export const getConsignacionById = async id => {
    return http().get(`${urlBase}/consignaciones/${id}`);
};

export const createConsignacion = async data => {
    return http().post(`${urlBase}/consignaciones`, data);
};

export const updateConsignacion = async (id, data) => {
    return http().put(`${urlBase}/consignaciones/${id}`, data);
};

export const deleteConsignacion = async id => {
    return http().delete(`${urlBase}/consignaciones/${id}`);
};

export const getMisConsignaciones = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return http().get(`${urlBase}/mis-consignaciones${queryString ? '?' + queryString : ''}`);
};

/**
 * Obtener datos para el formulario (usuarios, propiedades, etc.)
 */
export const getFormData = async () => {
    return http().get(`${urlBase}/consignaciones/form-data`);
};

/**
 * Obtener información de una propiedad específica
 */
export const getPropertyInfo = async propertyId => {
    return http().get(`${urlBase}/consignaciones/property/${propertyId}`);
};
