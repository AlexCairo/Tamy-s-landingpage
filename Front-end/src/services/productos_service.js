import { Api } from "../helpers/Api";
import { URL_API } from "../helpers/config";
const PREFIX_URL = "/data";

export const obtenerProductos = async() => {
    const result = await Api().get(`${PREFIX_URL}`);
    return result;
}

export const eliminarProducto = async(id) => {
    const result = await Api().delete(`${PREFIX_URL}/${id}`);
    return  result;
}

export const actualizarProducto = async(id, formData) => {
    const result = await Api().put(`${URL_API}/api${PREFIX_URL}/${id}`,formData,{
        headers : {
            'Content-Type': 'multipart/form-data',
        }
    })
    return result;
}

export const agregarProducto = async(formData) => {
    const result =  await Api().post(`${URL_API}/api${PREFIX_URL}`,formData,{
        headers : {
            'Content-Type': 'multipart/form-data',
        }
    })
    return result;
}