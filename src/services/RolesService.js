import { httpAsset, http, urlBase } from './http';

export const getRoles = async () => {
    return http().get(`${urlBase}/roles`);
};
