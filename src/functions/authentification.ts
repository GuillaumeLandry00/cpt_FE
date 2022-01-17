import axios from "axios"
import { BASE_URL } from "../constants/constantes"

export const checkLoginStatus = async (): Promise<any> => {
    try {
        const response: any = await axios.post(BASE_URL + "auth/login", { "email": "landry.guillaume00@hotmail.com", "password": "54321Guy" });
        return response.data;
    } catch (error) {

    }
}

/**
 * This function check 
 * @returns boolean
 */
export const redirectLogin = (): boolean => {
    let rtr: boolean = false;

    if (localStorage.getItem("token") !== "") {
        rtr = true;
    }

    return rtr;
}

export const checkAuth = async (): Promise<any> => {
    try {
        let token = localStorage.getItem('token');

        //we send the request
        if (token) {
            const response: any = await axios.get(BASE_URL + "auth/check", {
                headers: {
                    "x-access-token": token
                }
            });
            return response.data;
        }

    } catch (error) {

    }
}