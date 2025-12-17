import { httpAsset, http, urlBase } from './http';

export const getConditionPropertyActives = async () => {
    return http().get(`${urlBase}/property-conditions-activos`);
};
