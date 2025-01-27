import axios from "axios";
import { BASE_URL } from "../../constants/constantes";
import { IResponse } from "../../interface/interfaces";
import { authToken } from "../agent/authentification";

export const addAiport = async (label: string) => {
    try {

        const params = new URLSearchParams();
        params.append("label", label);

        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `airport`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {

    }
}