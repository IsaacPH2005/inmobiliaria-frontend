import { httpAsset, http, urlBase } from './http';

export const getFeaturesActives = async () => {
    return http().get(`${urlBase}/features-activos`);
};
