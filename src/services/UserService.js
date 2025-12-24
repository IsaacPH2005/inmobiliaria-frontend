import { httpAsset, http, urlBase } from './http';

export const getUsersActives = async () => {
    return http().get(`${urlBase}/users-activos`);
};

export const getUsers = (params = '') => {
    return http().get(`${urlBase}/users${params}`);
};

export const showUser = id => {
    return http().get(`${urlBase}/users-show/${id}`);
};

export const createUser = data => {
    return httpAsset().post(`${urlBase}/users-store`, data);
};

// Corregido para que coincida con la ruta del backend
export const updateUser = (id, data) => {
    return httpAsset().post(`${urlBase}/users-update/${id}`, data);
};

export const deleteUser = id => {
    return http().delete(`${urlBase}/users/${id}`);
};

export const toggleUserStatus = id => {
    return http().patch(`${urlBase}/users/${id}/toggle-status`);
};

export const getUserStatistics = () => {
    return http().get(`${urlBase}/users/statistics`);
};

// Funciones para manejar avatares
export const updateUserAvatar = (id, data) => {
    return httpAsset().post(`${urlBase}/users-avatar/${id}`, data);
};

export const deleteUserAvatar = id => {
    return http().delete(`${urlBase}/users-avatar/${id}`);
};

export const getUserAvatar = id => {
    return http().get(`${urlBase}/users-avatar/${id}`);
};
