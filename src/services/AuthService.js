import { http, urlBase } from './http';
export const loginBE = credenciales => {
    return http().post(`${urlBase}/login`, credenciales);
};
export const logoutBE = () => {
    return http().post(`${urlBase}/logout`);
};
export const registerBE = datosUsuario => {
    return http().post(`${urlBase}/register`, datosUsuario);
};
