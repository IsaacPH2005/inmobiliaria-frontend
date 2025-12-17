import { httpAsset, http, urlBase } from './http';

export const getStatusesPropertyActives = async () => {
    return http().get(`${urlBase}/property-estados-activos`);
};
