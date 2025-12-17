import { httpAsset, http, urlBase } from './http';

export const getCurrencyPropertyActives = async () => {
    return http().get(`${urlBase}/currencies-activos`);
};
