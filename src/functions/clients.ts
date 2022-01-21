import axios from "axios"
import { BASE_URL } from "../constants/constantes"
import { IResponse } from "../interface/interfaces";

export const getAllClient = async (): Promise<any> => {
    try {
        const response: IResponse = await axios.get(BASE_URL + "client/");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const getClient = async (id: number): Promise<any> => {
    try {
        const response: IResponse = await axios.get(BASE_URL + "client/" + id);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getClientSearch = async (search: string): Promise<any> => {
    try {
        const response: IResponse = await axios.get(BASE_URL + `client/?search=${search}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
