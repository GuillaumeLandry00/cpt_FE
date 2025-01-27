import axios from "axios";
import { BASE_URL } from "../../constants/constantes";
import { IResponse } from "../../interface/interfaces";
import { authToken } from "../agent/authentification";

export const addProduct = async (label: string, taxe: string, tps: string, tvq: string, rabais: string, opc: string) => {
    try {

        const params = new URLSearchParams();
        params.append("label", label);
        params.append("taxe", taxe);
        params.append("tps", tps);
        params.append("tvq", tvq);
        params.append("rabais", rabais);
        params.append("opc", opc);


        //We make the request
        const response: IResponse = await axios({
            method: "post",
            url: BASE_URL + `product`,
            data: params,
            headers: { 'content-type': 'application/x-www-form-urlencoded', "x-access-token": localStorage.getItem('token') as string },
        });
        authToken(response.data);
        return response.data;
    } catch (error) {

    }
}