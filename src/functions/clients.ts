import axios from "axios"
import { BASE_URL } from "../constants/constantes"

export const getAllClient = async () => {
    try {
        const response: any = await axios.get(BASE_URL + "client/");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getClient = async (id: number) => {
    try {
        const response: any = await axios.get(BASE_URL + "client/" + id);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}