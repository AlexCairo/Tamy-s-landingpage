import axios from "axios";
import { URL_API } from "./config";

export const Api = () => {
    const token = localStorage.getItem('token');
    const apiAxios = axios.create({
        baseURL : URL_API+"/api",
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`,
        }
    });
    return apiAxios;
}