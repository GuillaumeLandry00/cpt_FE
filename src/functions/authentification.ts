import axios from "axios"
import { BASE_URL, SITE_URL } from "../constants/constantes"

export const checkLoginStatus = async (): Promise<any> => {
    try {
        const response: any = await axios.post(BASE_URL + "auth/login", { "email": "landry.guillaume00@hotmail.com", "password": "54321Guy" });
        return response.data;
    } catch (error) {
        console.log(error);
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

export const authToken = (response: any) => {
    //Token failed so we delete the old one
    if (response.code && response.code == 500) {
        localStorage.setItem("token", "");
        window.location.href = `${SITE_URL}?token_failed=true`;
    }

}