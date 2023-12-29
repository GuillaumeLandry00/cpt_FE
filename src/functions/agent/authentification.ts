import axios from "axios"
import { resolve } from "path";
import { BASE_URL, SITE_URL } from "../../constants/constantes"

export const checkLoginStatus = async (email: string, password: string): Promise<any> => {
    try {
        const response: any = await axios.post(BASE_URL + "auth/login", { "email": email, "password": password });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function will send a request for changing a password
 */
export const sendPasswordResetToken = async (email: string) => {
    try {

        const response = await axios.post(BASE_URL + "auth/lostpassword", { email: email });
        return response.data;
    } catch (error: unknown) {
        console.log(error);
    }
}

export const changePassword = async (password: string, token: string) => {
    try {

        const response = await axios.post(BASE_URL + "auth/changepassword", { password: password, token: token });
        return response.data.response;

    } catch (error: unknown) {
        console.log(error);

    }
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

export const checkToken = () => {
    if (!localStorage.getItem("utilisateur") || !localStorage.getItem("token")) {
        window.location.href = SITE_URL;
    }
}

export const authToken = (response: any) => {

    //Token failed so we delete the old one
    if (response.code && response.code == 500) {
        localStorage.removeItem("token");
        localStorage.removeItem("clientsCache");
        window.location.href = `${SITE_URL}?token_failed=true`;
    }

}