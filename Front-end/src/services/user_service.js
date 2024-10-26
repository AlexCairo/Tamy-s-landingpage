import axios from "axios";
import { URL_API } from "../helpers/config";

const PREFIX_URL = 'api/user/login';

export const loginUser = async (datos) => {
    const result = await axios.post(`${URL_API}/${PREFIX_URL}`,datos);
    return result;
}