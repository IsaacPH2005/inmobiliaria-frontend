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

export const updateUser = (id, data) => {
    return httpAsset().put(`${urlBase}/users/${id}`, data);
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
