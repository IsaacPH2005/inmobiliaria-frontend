import { httpAsset, http, urlBase } from './http';

export const getTypesPropertyActives = async () => {
    return http().get(`${urlBase}/property-types/activos`);
};
