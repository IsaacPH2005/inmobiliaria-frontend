import { httpAsset, http, urlBase } from './http';

export const getOperationTypesActives = async () => {
    return http().get(`${urlBase}/operation-types-activos`);
};
