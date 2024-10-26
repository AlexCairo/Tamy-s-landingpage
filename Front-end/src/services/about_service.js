import { Api } from "../helpers/Api";
const PREFIX_URL = '/about';

export const obtenerInformación = async() => {
    const result = await Api().get(`${PREFIX_URL}`);
    return result;
}

export const editarInformación = async(info) => {
    const result = await Api().put(`${PREFIX_URL}`,info);
    return result;
}